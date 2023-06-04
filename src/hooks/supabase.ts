import { supabaseClient } from "@my-supabase-app/supabase";
import { AuthError, Session, SupabaseClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function useSupabase() {
  const [data, setData] = useState<Session | null>();
  const [error, setError] = useState<AuthError>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function LoginStats() {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        setError(error);
        setLoading(false);
      }
      if (data) {
        setData(data.session);
        setLoading(false);
      }
    }

    LoginStats();
  }, [SupabaseClient]);

  return {
    data,
    error,
    loading,
  };
}

export default useSupabase;
