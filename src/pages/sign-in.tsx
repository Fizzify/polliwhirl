import type { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ProviderButton from "../components/elements/provider-button";
import SectionLayout from "../components/layouts/secion";

const SignIn = () => {
  return (
    <SectionLayout>
      <div className="flex w-full flex-col">
        <h1 className="text-center text-4xl font-bold">Sign In</h1>
        <div className="mt-10 space-y-8">
          <ProviderButton provider="google" />
          <ProviderButton provider="discord" />
          <ProviderButton provider="github" />
        </div>
      </div>
    </SectionLayout>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
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
