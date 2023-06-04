import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="p-4 bg-gray-100 dark:bg-black min-h-screen flex flex-col justify-center items-center text-black">
      <section className="max-w-md mx-auto bg-white dark:bg-[#232323] dark:text-white p-8 rounded-lg shadow-md hover:shadow-indigo-500">
        <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
        <p className="text-lg mb-6">
          Learn and grow with our interactive quizzes.
        </p>
        <button className="bg-indigo-500 hover:bg-indigo-800 text-white py-2 px-4 rounded mb-4">
          <a href="/quiz"> Take the quiz </a>
        </button>
        <p className="dark:text-white text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 dark:text-blue-400 hover:underline">
            Log In
          </a>
        </p>
      </section>
    </section>
  );
}
