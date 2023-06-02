import { Inter } from "next/font/google";
import Options from "./options";

const inter = Inter({ subsets: ["latin"] });

export type QuestionProps = {
  question: string;
  options: string[];
  id: number;
  onChange: Function;
};

export const Question = (props: QuestionProps) => {
  return (
    <>
      <section
        className={`font-${inter.style.fontFamily} py-4 sm:flex-col lg:h-screen lg:flex items-center justify-center lg:px-48`}
      >
        <section className="flex flex-auto flex-col text-white font-semibold text-xl mx-8 lg:w-1/2 sm:col-start-1">
          {`${props.id} out of 17`}
          <hr className="text-white bg-white my-2" />
          <section className="flex-col text-lg font-normal">
            {props.question}
          </section>
        </section>
        <section className="w-full sm:col-start-1">
          <Options
            question_id={props.id}
            options={props.options}
            onChange={props.onChange}
          />
        </section>
      </section>
    </>
  );
};

export type QuestionOptionType = {
  options: string[];
  id: number;
  question: string;
};
