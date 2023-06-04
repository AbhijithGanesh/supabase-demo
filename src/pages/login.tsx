import { Session, SupabaseClient, useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/router";
import { useEffect } from "react";

type LoginPageProps = {
  supabase: SupabaseClient;
};

export const LoginPage = (props: LoginPageProps): JSX.Element => {
  return (
    <section
      className="h-screen flex flex-auto flex-col items-center justify-center text-xl"
      style={{ padding: "50px 0 100px 0" }}
    >
      <section className="text-2xl font-semibold font-Inter">Login</section>
      <Auth
        redirectTo="https://quiz.abhijithganesh.com/quiz"
        supabaseClient={props?.supabase}
        providers={["github", "google"]}
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
};

const AuthPage = () => {
  const currentSession = useSession();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchLoginStats(data: Session | null) {
      if (data) {
        router.push("/quiz");
      }
    }
    fetchLoginStats(currentSession);
  }, [supabaseClient, currentSession]);

  return <LoginPage supabase={supabaseClient} />;
};

export default AuthPage;
