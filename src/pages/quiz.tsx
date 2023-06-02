import { Question, QuestionOptions } from "@my-supabase-app/components/questions";
import { scrollDown, scrollTop } from "@my-supabase-app/components/scrolls";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

export default function MyQuizPage() {
  const currentSession = useSession();
  const router = useRouter();
  // @ts-expect-error
  const handleQuestionChange = (question, response) => {
    console.log({
      question: response,
    });
  };

  if (currentSession) {
    return (
      <>
        {QuestionOptions.map((question, index) => (
          <Question
            key={index}
            question={question.question}
            options={question.options}
            onChange={handleQuestionChange}
          />
        ))}
        <section className="fixed bottom-4 right-4 flex flex-col gap-4 text-white mx-8">
          <section className="flex text-3xl mx-2 gap-2">
            <button onClick={scrollTop} className="scroll-button">
              <BsFillCaretUpFill className="hover:text-indigo-600 hover:-translate-y-2" />
            </button>
            <button onClick={scrollDown} className="scroll-button">
              <BsFillCaretDownFill className="hover:text-indigo-600 hover:translate-y-2" />
            </button>
          </section>
        </section>
      </>
    );
  } else {
    useEffect(() => {
      router.push("/login");
    });
  }
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
