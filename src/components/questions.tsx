import { useState } from "react";
import { Inter } from "next/font/google";
import { scrollDown } from "./scrolls";

const inter = Inter({ subsets: ["latin"] });

export const Option = ({ question, option, onChange }: any) => {
  const [selectedOption, setSelectedOption] = useState();

  const [optionA, setOptionA] = useState(false);
  const [optionB, setOptionB] = useState(false);
  const [optionC, setOptionC] = useState(false);
  const [optionD, setOptionD] = useState(false);

  const handleOptionChange = (event: Event) => {
    // @ts-expect-error
    if (event!.target.value === "Option A") {
      setOptionA(!optionA);
      // @ts-expect-error
    } else if (event.target.value === "Option B") {
      setOptionB(!optionB);
      // @ts-expect-error
    } else if (event.target.value === "Option C") {
      setOptionC(!optionC);
      // @ts-expect-error
    } else if (event.target.value === "Option D") {
      setOptionD(!optionD);
    }

    console.log([optionA, optionB, optionC, optionD]);
    let _state = {
      0: optionA,
      1: optionB,
      2: optionC,
      3: optionD,
    };
    // @ts-expect-error
    setSelectedOption(_state);
    onChange(question, selectedOption);
  };

  return (
    <>
      <section className="scroll-bottom flex items-center pl-4 gap-2 bg-[#edeceb] text-black hover:text-white hover:bg-gray-200 rounded-md px-4 my-4">
        <input
          value={option}
          checked={option}
          // @ts-expect-error
          onChange={handleOptionChange}
          onClick={scrollDown}
          type="checkbox"
          name="bordered-checkbox"
          className="w-4 h-4 text-indigo-950 bg-gray-100 border-gray-300 focus:ring-indigo-800 dark:focus:ring-indigo-950 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 rounded-full"
        />
        <label
          htmlFor="bordered-checkbox-2"
          className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          {option}
        </label>
      </section>
    </>
  );
};

export type QuestionProps = {
  question: string;
  options: string[];
  onChange: (question: string, response: string) => void;
};

export const Question = ({ question, options, onChange }: QuestionProps) => {
  return (
    <>
      <section
        className={`flex flex-col justify-center px-48 min-h-screen font-${inter.style.fontFamily}`}
      >
        <section className="text-white font-bold text-3xl ml-8">
          {question}
          <hr className="text-white bg-white my-2" />
        </section>
        <section className="ml-8">
          {options.map((option: any, optionIndex: any) => (
            <Option
              key={optionIndex}
              option={option}
              onChange={onChange}
              question={question}
            />
          ))}
        </section>
      </section>
    </>
  );
};

export const QuestionOptions = [
  {
    question: "Question 1",
    id: 1,
    options: ["Option A", "Option B", "Option C", "Option D"],
  },
  {
    question: "Question 2",
    id: 2,
    options: ["Option A", "Option B", "Option C", "Option D"],
  },
  {
    question: "Question 3",
    id: 3,

    options: ["Option A", "Option B", "Option C", "Option D"],
  },
  {
    question: "Question 4",
    id: 4,
    options: ["Option A", "Option B", "Option C", "Option D"],
  },
];
