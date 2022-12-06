import { type NextPage } from "next";
import Button from "../components/elements/button";
import SectionLayout from "../components/layouts/secion";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

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

          <img
            className="mx-auto mt-[10%] block animate-bounce"
            width={100}
            height={100}
            src="/caret-down.svg"
            alt="Go down."
          />
        </div>
      </SectionLayout>
      <SectionLayout>
        <h1>BE LOUD</h1>
      </SectionLayout>
    </>
  );
};

export default Home;
