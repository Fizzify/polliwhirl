import { useRouter } from "next/router";
import React, { useState } from "react";
import Button from "../components/elements/button";
import { trpc } from "../utils/trpc";
import { motion } from "framer-motion";

const CreatePoll = () => {
  const [newPoll, setNewPoll] = useState({
    question: "",
    options: [
      {
        name: "",
      },
    ],
  });
  const router = useRouter();

  const { mutate } = trpc.poll.createPoll.useMutation({
    onSuccess() {
      router.push("/dashboard");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(newPoll);
  };

  const handleAddOption = () => {
    setNewPoll((prevValue) => {
      return {
        ...prevValue,
        options: [...prevValue.options, { name: "" }],
      };
    });
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPoll((prevValue) => {
      return {
        ...prevValue,
        question: e.target.value,
      };
    });
  };

  const handleOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const options = [...newPoll.options];

    options[idx]!.name = e.target.value;

    setNewPoll((prevValue) => {
      return {
        ...prevValue,
        options,
      };
    });
  };

  const handleDeleteOption = (e: React.MouseEvent) => {
    const optionText = (e.target as HTMLButtonElement).parentElement
      ?.children[0]?.textContent;
    const optionNumber = parseInt(
      optionText?.slice(7, optionText.length) ?? "1"
    );
    setNewPoll((prevValue) => {
      return {
        ...prevValue,
        options: [
          ...prevValue.options.filter(
            (option) => prevValue.options.indexOf(option) !== optionNumber - 1
          ),
        ],
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-8">
      <div className="space-y-4">
        <div>
          <label className="block text-xl font-bold" htmlFor="question">
            Question
          </label>
          <input
            className="mt-2 rounded-lg bg-darkerBlue p-2 px-4 placeholder:text-darkBlue"
            onChange={handleQuestionChange}
            placeholder="Enter poll question here"
            name="question"
            autoComplete="off"
          />
        </div>
        {newPoll.options.map((option, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <label className="block text-xl font-bold" htmlFor="question">
              Option {idx + 1}
            </label>
            <input
              className="mt-2 rounded-l-lg bg-darkerBlue p-2 px-4 placeholder:text-darkBlue"
              onChange={(e) => {
                handleOptionChange(e, idx);
              }}
              placeholder={`Enter option ${idx + 1} name here`}
              name="question"
              autoComplete="off"
              value={newPoll.options[idx]?.name}
            />
            <DeleteOptionButton onClick={handleDeleteOption} />
          </motion.div>
        ))}
        <AddOptionButton onClick={handleAddOption} />
      </div>
      <Button>Create Poll</Button>
    </form>
  );
};

export default CreatePoll;

const AddOptionButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="mt-2 rounded-lg bg-primaryPurple px-4 py-1 text-sm font-semibold text-black transition hover:bg-secondaryPurple"
    >
      Add Option
    </button>
  );
};

const DeleteOptionButton: React.FC<{
  onClick: (e: React.MouseEvent) => void;
}> = ({ onClick }: { onClick: (e: React.MouseEvent) => void }) => {
  return (
    <button
      onClick={(e: React.MouseEvent) => onClick(e)}
      type="button"
      className="mt-2 rounded-r-lg bg-primaryRed px-4 py-2 font-semibold text-black transition hover:bg-secondaryRed"
    >
      Delete Option
    </button>
  );
};
