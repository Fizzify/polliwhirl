import { type NextPage } from "next";
import Button from "../components/elements/button";
import SectionLayout from "../components/layouts/secion";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <SectionLayout>
        <div className="mt-32 flex h-full w-full flex-col bg-right-top">
          <div className="flex justify-between">
            <div>
              <motion.h1
                className="w-[60%] text-8xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
              >
                Create <span className="text-lightBlue">polls</span> for{" "}
                <span className="text-primaryPurple">people</span>, the{" "}
                <span className="text-primaryGreen">easy</span> way.
              </motion.h1>
              <div className="mt-12 space-x-4">
                <Button type="secondary">Learn More</Button>
                <Link href="/sign-in">
                  <Button>Get Started</Button>
                </Link>
                <motion.p
                  className="mt-10 inline text-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  MVP released! 🎉
                </motion.p>
              </div>
            </div>

            <div className="flex space-x-12">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "60%" }}
                className="w-16 bg-primaryGreen"
              ></motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "80%" }}
                transition={{ delay: 0.5 }}
                className="w-16 bg-lightBlue"
              ></motion.div>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ delay: 1 }}
                className="w-16 bg-primaryPurple"
              ></motion.div>
            </div>
          </div>

          <Image
            className="mx-auto mt-[10%] block animate-bounce"
            width={100}
            height={100}
            src="/caret-down.svg"
            alt="Go down."
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <h2 className="text-6xl font-bold">How it works</h2>
        <p>Still not convinced? Here's how it works.</p>
        <div className="mt-12 flex-col space-y-12">
          <div className="flex items-center">
            <Image
              className="rounded-2xl border-2 border-white"
              width={500}
              height={100}
              src="/showcase/create-poll.png"
              alt="Create a poll."
            />
            <div className="ml-10">
              <h3 className="text-4xl font-bold">Create a poll</h3>
              <p className="text-xl">
                Create a poll with a question and multiple answers.
              </p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-center text-right">
            <Image
              className="rounded-2xl border-2 border-white"
              width={500}
              height={100}
              src="/showcase/manage-polls.png"
              alt="Manage your polls."
            />
            <div className="mr-10">
              <h3 className="text-4xl font-bold">Manage polls</h3>
              <p className="text-xl">
                You can manage your polls through your dashboard.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <Image
              className="rounded-2xl border-2 border-white"
              width={500}
              height={100}
              src="/showcase/share-polls.png"
              alt="Share polls."
            />
            <div className="ml-10">
              <h3 className="text-4xl font-bold">Share polls</h3>
              <p className="text-xl">
                Share your polls with friends, or anyone really, and vote!
              </p>
            </div>
          </div>
        </div>
      </SectionLayout>
    </>
  );
};

export default Home;
