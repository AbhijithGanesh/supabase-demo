import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="bg-gray-100 min-h-screen flex flex-col justify-center items-center text-black">
      <section className="max-w-md mx-auto bg-white shadow p-8 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Quiz App</h1>
        <p className="text-lg mb-6">
          Learn and grow with our interactive quizzes.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mb-4">
          <a href="/quiz"> Take the quiz </a>
        </button>
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log In
          </a>
        </p>
      </section>
    </section>
  );
}
