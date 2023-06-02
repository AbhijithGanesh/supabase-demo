import { Inter } from "next/font/google";
import Options from "./options";

const inter = Inter({ subsets: ["latin"] });

export type QuestionProps = {
  question: string;
  options: string[];
  onChange: (question: string, response: string) => void;
};

export const Question = ({ question, options, onChange }: QuestionProps) => {
  return (
    <>
      <section
        className={`font-${inter.style.fontFamily} py-4 sm:flex-col lg:h-screen lg:flex items-center justify-center lg:px-48`}
      >
        <section className="flex flex-auto flex-col text-white font-semibold text-xl mx-8 lg:w-1/2 sm:col-start-1">
          {"1 out of n"}
          <hr className="text-white bg-white my-2" />
          <section className="flex-col text-lg font-normal">{question}</section>
        </section>
        <section className="w-full sm:col-start-1">
          <Options options={options} />
        </section>
      </section>
    </>
  );
};

export const QuestionOptions = [
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consectetur ante vel nulla rhoncus, vel tincidunt enim ultricies. Cras quis porta nisl, vel accumsan odio.",
    id: 1,
    options: ["Option A", "Option B", "Option C", "Option D"],
  },
  {
    question:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris massa nisl, sagittis maximus tristique vel, venenatis sed ipsum. Sed sit amet tempor sem. Maecenas gravida auctor urna nec egestas. Donec facilisis auctor turpis, nec tincidunt lectus bibendum eu. Cras vel tellus lorem. Aenean rutrum tincidunt odio, eget egestas nisl lacinia sed. Aenean eget blandit massa. Proin ut leo scelerisque, egestas ex vel, sagittis elit. Sed tempor nunc vel metus malesuada sagittis.",
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

export type QuestionOptionType = {
  options: string[];
  id: number;
  question: string;
};
