import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Home = async () => {
  const clerkUser = await currentUser();
  if(!clerkUser) redirect('/landing');

// Define the interface for room documents
interface RoomDocument {
  id: string;
  metadata: {
    title: string;
    creatorId: string;
    email: string;
  };
  createdAt: string;
}

// Define the interface for the response data
interface ImportedRoomData {
  id: string;
  metadata: {
    title: string;
    creatorId: string;
    email: string;
  };
  createdAt: string;
}

// interface RoomMetadata {
//   title: string;
//   creatorId: string;
//   email: string;
// }

// // interface RoomData {
//   id: string;
//   metadata: RoomMetadata;
//   createdAt: string;
// }

// Fetch documents with the specified type
const documentsResponse = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
const roomDocuments: RoomDocument[] = documentsResponse ? (documentsResponse.data as unknown as ImportedRoomData[]).map((doc: ImportedRoomData) => ({
  id: doc.id,
  metadata: {
    title: doc.metadata.title,
    creatorId: doc.metadata.creatorId,
    email: doc.metadata.email,
  },
  createdAt: doc.createdAt,
})) : [];

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDocuments.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h3 className="text-28-semibold">All documents</h3>
            <AddDocumentBtn 
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className="document-ul">
            {roomDocuments.map(({ id, metadata, createdAt }: RoomDocument) => (
              <li key={id} className="document-list-item">
                <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                  <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                    <Image 
                      src="/assets/icons/doc.svg"
                      alt="file"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="line-clamp-1 text-lg">{metadata.title}</p>
                    <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
                  </div>
                </Link>
                <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ): (
        <div className="document-list-empty">
          <Image 
            src="/assets/icons/doc.svg"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />

          <AddDocumentBtn 
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
    </main>
  )
}
  
  export default Home