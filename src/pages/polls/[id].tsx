import type { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Button from "../../components/elements/button";
import SectionLayout from "../../components/layouts/secion";
import { trpc } from "../../utils/trpc";

const Poll = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  const { data: pollData, refetch: pollRefetch } = trpc.poll.getPoll.useQuery(
    id as string
  );
  const {
    data: optionsData,
    refetch: optionsRefetch,
    isLoading,
  } = trpc.poll.getOptionsFromPoll.useQuery(id as string);
  const { mutate } = trpc.poll.voteOption.useMutation({
    onSuccess() {
      pollRefetch();
      optionsRefetch();
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      optionsRefetch();
    }, 5000);
    return () => clearInterval(interval);
  }, [optionsRefetch]);

  if (isLoading)
    return (
      <SectionLayout>
        <div className="flex flex-col text-center">
          <h1 className="text-6xl font-bold">Loading...</h1>
        </div>
      </SectionLayout>
    );

  const handleVote = (
    e: React.MouseEvent<HTMLButtonElement>,
    optionId: string
  ) => {
    if (!session) return router.push("/sign-in");
    if (pollData?.poll?.voted.includes(session?.user?.id as string)) return;
    mutate({ pollId: id as string, optionId });
  };

  const totalVotes = optionsData?.options.reduce((a, b) => a + b.votes, 0);

  return (
    <SectionLayout>
      <div className="flex flex-col">
        <h1 className="text-6xl font-bold">{pollData?.poll?.question}</h1>
        <p className="mt-4">Total votes: {totalVotes}</p>
        {optionsData?.options
          .sort((a, b) => a.votes + b.votes)
          .map((option) => {
            return (
              <div key={option.id} className="my-4 block text-left">
                <h2 className="font-bold">{option.name}</h2>
                <div
                  style={{ width: `${option.votes}%` }}
                  className={`block bg-primaryGreen py-2 pl-2`}
                >
                  <p>{option.votes}</p>
                </div>
                <Button
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleVote(e, option.id)
                  }
                >
                  Vote
                </Button>
              </div>
            );
          })}
      </div>
    </SectionLayout>
  );
};

export default Poll;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
