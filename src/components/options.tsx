import { RadioGroup } from "@headlessui/react";
import { ResponseType } from "@my-supabase-app/pages/quiz";
import { useState } from "react";
import { BsCheck } from "react-icons/bs";

export type OptionsProp = {
  question_id: number;
  options: string[];
  onChange: Function;
};

export default function Options(props: OptionsProp) {
  const [selected, setSelected] = useState<string>();

  const handleState = (state: string) => {
    setSelected(state);
    let functionObject: ResponseType = {
      question_id: props?.question_id,
      answer_id: state
    }
    props.onChange(functionObject);
  };

  return (
    <section className="w-full px-4 py-16">
      <section className="mx-auto w-full">
        <RadioGroup value={selected} onChange={handleState}>
          <section className="space-y-2">
            {props.options.map((question: string) => (
              <RadioGroup.Option
                key={question}
                value={question}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-300 hover:bg-indigo-700"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-indigo-900 bg-opacity-75 text-white hover:bg-indigo-600"
                      : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <section className="flex w-full items-center justify-between">
                      <section className="flex items-center">
                        <section className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {question}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          ></RadioGroup.Description>
                        </section>
                      </section>
                      {checked && (
                        <section className="shrink-0 text-white">
                          <BsCheck className="h-6 w-6" />
                        </section>
                      )}
                    </section>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </section>
        </RadioGroup>
      </section>
    </section>
  );
}
