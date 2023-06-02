import {
  Question,
  QuestionOptions,
} from "@my-supabase-app/components/questions";
import { scrollDown, scrollTop } from "@my-supabase-app/components/scrolls";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export type ResponseType = {
  question_id: number;
  answer_id: number | string;
};

export type ResponseStateTypes = {
  [key: number]: string;
};

export default function MyQuizPage() {
  const currentSession = useSession();
  const router = useRouter();
  const [responses, setResponses] = useState<ResponseStateTypes>({});

  const HandleChange = (props: ResponseType) => {
    let temp_responses: any = responses;
    temp_responses[props?.question_id] = props?.answer_id;
    setResponses(temp_responses);
  };

  if (currentSession) {
    return (
      <>
        <form>
          {QuestionOptions.map((question, index) => (
            <Question
              key={index}
              question={question}
              options={question.options}
              onChange={HandleChange}
            />
          ))}
          <section className="flex flex-auto items-start justify-center w-full py-16">
            <button
              type="button"
              className="text-white bg-indigo-800 hover:bg-indigo-950 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              Submit your answers
            </button>
          </section>
          <section className="hidden lg:flex fixed bottom-4 right-4 flex-col gap-4 text-white mx-8">
            <section className="flex text-3xl mx-2 gap-2">
              <button onClick={scrollTop} className="scroll-button">
                <BsFillCaretUpFill className="hover:text-indigo-600 hover:-translate-y-2" />
              </button>
              <button onClick={scrollDown} className="scroll-button">
                <BsFillCaretDownFill className="hover:text-indigo-600 hover:translate-y-2" />
              </button>
            </section>
          </section>
        </form>
      </>
    );
  } else {
    useEffect(() => {
      router.push("/login");
    }, []);
  }
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
