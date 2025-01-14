import CollaborativeRoom from "@/components/CollaborativeRoom"
import { getDocument } from "@/lib/actions/room.actions";
import { getClerkUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";

const Document = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params; // Await the params

  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const { id } = resolvedParams; // Destructure 'id' from the awaited params

  const email = clerkUser.emailAddresses[0].emailAddress;
  if (!email) {
    // Handle the case where email is not available
    redirect('/sign-in');
  }

  const room = await getDocument({
    roomId: id,
    userId: clerkUser.emailAddresses[0].emailAddress,
  });

  if (!room) redirect('/');

  const userIds = Object.keys(room.usersAccesses);
  const users = await getClerkUsers({ userIds });

  const usersData = (users || [])
    .filter((user): user is User => user !== undefined)
    .map((user: User) => ({
      ...user,
      userType: (room.usersAccesses[user.email] as string[])?.includes('room:write')
        ? 'editor' as UserType
        : 'viewer' as UserType
    }));

  const currentUserType = (room.usersAccesses[clerkUser.emailAddresses[0].emailAddress] as string[])?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className="flex w-full flex-col items-center">
      <CollaborativeRoom
        roomId={id}
        roomMetadata={{
          creatorId: room.metadata.creatorId as string,
          email: room.metadata.email as string,
          title: room.metadata.title as string
        }}
        users={usersData}
        currentUserType={currentUserType}
      />
    </main>
  );
};

export default Document