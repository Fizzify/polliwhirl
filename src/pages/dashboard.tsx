import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../components/elements/button";
import SectionLayout from "../components/layouts/secion";
import { trpc } from "../utils/trpc";

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>Please login.</div>;
  }

  const { data, isLoading } = trpc.poll.getPolls.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SectionLayout>
      <div className="flex flex-col text-center">
        <h1 className="text-6xl font-bold">Dashboard</h1>
        <p>Welcome, {session.user?.name}</p>
        <div className="m-5 space-x-4">
          <Link href="create">
            <Button>Create</Button>
          </Link>
          <Button type="alert" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>

        <div className="my-4 grid grid-cols-4 gap-4">
          {data?.polls.map((poll) => (
            <PollItem
              key={poll.id}
              id={poll.id}
              question={poll.question}
              totalVotes={poll.voted.length}
            />
          ))}
        </div>
      </div>
    </SectionLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

interface IPollItem {
  id: string;
  question: string;
  totalVotes: number;
}

const PollItem = ({ id, question, totalVotes }: IPollItem) => {
  const { refetch } = trpc.poll.getPolls.useQuery();
  const { mutate } = trpc.poll.deletePoll.useMutation({
    onSuccess: () => refetch(),
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(`${window.location.origin}/polls/${id}`);
  };

  const handlePollDelete = (pollId: string) => {
    mutate(pollId);
  };

  return (
    <div className="space-y-4 rounded-lg border-2 border-primaryBlue bg-veryDarkBlue py-32 px-6 transition hover:bg-darkerBlue">
      <h2 className="text-4xl font-bold">{question}</h2>
      <p>Total votes: {totalVotes}</p>
      <Link href={`/polls/${id}`}>
        <Button type="green">Go to Poll</Button>
      </Link>
      <Button onClick={handleCopy} type="primary">
        Copy Link
      </Button>
      <Button onClick={() => handlePollDelete(id)} type="alert">
        Delete Poll
      </Button>
    </div>
  );
};
