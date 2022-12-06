import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import CreatePoll from "../components/create-poll";
import SectionLayout from "../components/layouts/secion";

const Create = () => {
  return (
    <SectionLayout>
      <div className="flex flex-col space-y-6 text-center">
        <h1 className="text-6xl font-bold">Create</h1>
        <CreatePoll />
      </div>
    </SectionLayout>
  );
};

export default Create;

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
