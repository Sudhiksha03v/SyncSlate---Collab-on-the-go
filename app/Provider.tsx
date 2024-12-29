'use client';

import Loader from '@/components/Loader';
import { getClerkUsers, getDocumentUsers } from '@/lib/actions/user.actions';
import { useUser } from '@clerk/nextjs';
import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react/suspense';
import { ReactNode } from 'react';

// Define types for Clerk user and document user
interface ClerkUser {
  id: string;
  firstName?: string;
  lastName?: string;
  emailAddresses: { emailAddress: string }[];
  profileImageUrl?: string;
}

interface LiveblocksUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  color: string;
}

interface DocumentUser {
  id: string;
  name?: string;
  email?: string;
  avatar?: string;
  color?: string;
}

// Ensure fetchClerkUsers is properly typed
const fetchClerkUsers: (params: { userIds: string[] }) => Promise<(ClerkUser | undefined)[]> = async (params) => {
  // Example API call logic, replace with your implementation
  return [];
};

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }): Promise<LiveblocksUser[]> => {
        const clerkUsers = await fetchClerkUsers({ userIds });

        // Filter and map users, ensuring valid type
        return (clerkUsers || [])
          .filter((user): user is ClerkUser => user !== undefined) // Type guard for filtering undefined
          .map((user) => ({
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Unknown',
            email: user.emailAddresses[0]?.emailAddress || 'No Email',
            avatar: user.profileImageUrl || '',
            color: '#000000', // Default color
          }));
      }}
      resolveMentionSuggestions={async ({ text, roomId }): Promise<string[]> => {
        const emailAddress = clerkUser?.emailAddresses?.[0]?.emailAddress;

        if (!emailAddress) {
          throw new Error('User email address is unavailable.');
        }

        // Explicitly type the result of getDocumentUsers
        const documentUsers: string[] = (await getDocumentUsers({
          roomId,
          currentUser: emailAddress,
          text,
        })) || [];

        return documentUsers; // Only return names
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
