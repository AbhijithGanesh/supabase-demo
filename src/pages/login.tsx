import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  if (!session) {
    return (
      <section
        className="flex flex-1 flex-col items-center justify-center h-screen flex-wrap text-xl"
        style={{ padding: "50px 0 100px 0" }}
      >
        <section className="text-2xl font-semibold font-Inter">Login</section>
        <Auth
          redirectTo="http://localhost:3000/quiz"
          supabaseClient={supabase}
          providers={["github"]}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#060d37",
                  brandAccent: "indigo",
                  messageText: "white",
                  anchorTextColor: "white",
                },
              },
            },
          }}
          theme="dark"
        />
      </section>
    );
  } else {
    useEffect(() => {
      if (session) {
        router.push("/quiz");
      }
    }, [session]);
  }
};

export default AuthPage;
