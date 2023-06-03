import { Question } from "@my-supabase-app/components/questions";
import { scrollDown, scrollTop } from "@my-supabase-app/components/scrolls";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";
import SEO from "../components/seo";

export type ResponseType = {
  question_id: number;
  answer_id: number | string;
};

export type ResponseStateTypes = {
  [key: number]: string;
};

export type QuestionFetch = {
  id: number;
  question: string;
  options: string[];
};

export default function MyQuizPage() {
  const currentSession = useSession();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const [Questions, setQuestions] = useState<QuestionFetch[]>([]);
  const [searchOptions, setSearchOptions] = useState<any>([]);
  const [responses, setResponses] = useState<ResponseStateTypes>({});

  const HandleChange = (props: ResponseType) => {
    let temp_responses: any = responses;
    temp_responses[props?.question_id] = props?.answer_id;
    setResponses(temp_responses);
  };

  useEffect(() => {
    async function fetchData() {
      let { data: question, error } = await supabaseClient
        .from("questions")
        .select("id, question");

      let cleaned_questions: QuestionFetch[] = [];
      question?.forEach((question) =>
        cleaned_questions.push({
          question: question.question,
          id: question.id,
          options: [],
        })
      );

      let option_fetch = await supabaseClient
        .from("options")
        .select("question, is_correct, option, points, id");

      setSearchOptions(option_fetch.data);

      cleaned_questions?.forEach((question: QuestionFetch) => {
        let filtered_options = option_fetch.data?.filter(
          (option: any) => option.question == question.id
        );

        let cleaned_options: string[] = [];
        filtered_options?.forEach((option: any) => {
          cleaned_options.push(option.option);
        });
        question.options = cleaned_options;
      });

      cleaned_questions.sort(
        (question_1: QuestionFetch, question_2: QuestionFetch) =>
          question_1.id - question_2.id
      );
      let dummy_responses: any = {};
      for (let i = 1; i <= cleaned_questions.length; i++) {
        dummy_responses[i] = "";
      }
      setResponses(dummy_responses);
      setQuestions(cleaned_questions);
    }
    fetchData();
  }, [supabaseClient]);

  if (currentSession) {
    return (
      <>
      <SEO title = "Quiz" description = "Attempt the quiz" />
        <form>
          {Questions.map((question: QuestionFetch) => {
            return (
              <Question
                key={question.id}
                question={question.question}
                id={question.id}
                options={question.options}
                onChange={HandleChange}
              />
            );
          })}
          <section className="flex flex-auto items-start justify-center w-full py-16">
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                let cleaned_arr = [];

                for (let i = 0; i < Questions.length; i++) {
                  let body = {
                    submitted_question: Questions[i].id,
                    submitted_by: currentSession.user?.id,
                    submitted_answer: "",
                    is_correct: false,
                    points: 0,
                  };
                  if (responses[i] == "") {
                    console.log(i, "is missing");
                    alert("Please answer all questions");
                    return;
                  } else {
                    let filtered_option = searchOptions.filter(
                      (option: any) => {
                        return option.question == i;
                      }
                    );
                    let option_cleaning = filtered_option.filter(
                      (option: any) => {
                        return option.option === responses[i];
                      }
                    );
                    body.submitted_answer = option_cleaning[0]?.id;
                    body.is_correct = option_cleaning[0]?.is_correct;
                    body.points = option_cleaning[0]?.points;
                  }
                  cleaned_arr.push(body);
                }
                let { data, error } = await supabaseClient
                  .from("submitted_answers")
                  .insert(cleaned_arr);
                if (error) {
                  alert("Something went wrong");
                } else {
                  alert("Your answers have been submitted");
                  router.push("/leaderboard");
                }
              }}
              className="text-white bg-indigo-800 hover:bg-indigo-950 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
            >
              Submit your answers
            </button>
          </section>
          <section className="hidden lg:flex fixed bottom-4 right-4 flex-col gap-4 text-white mx-8">
            <section className="flex text-3xl mx-2 gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  scrollTop();
                }}
                className="scroll-button"
              >
                <BsFillCaretUpFill className="hover:text-indigo-600 hover:-translate-y-2" />
              </button>
              <button
                onClick={(e) => {
                  scrollDown();
                  e.preventDefault();
                }}
                className="scroll-button"
              >
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
