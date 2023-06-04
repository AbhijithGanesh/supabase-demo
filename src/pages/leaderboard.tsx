import { User, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState, useEffect } from "react";

export type BodyType = {
  user: string;
  points: number;
};

const Leaderboard = (): JSX.Element => {
  const [leaderboard, setLeaderboard] = useState<any>([]);
  const client = useSupabaseClient();

  useEffect(() => {
    async function fetchData() {
      let scoreBoard = new Map<string, any>();
      let { data, error } = await client
        .from("submitted_answers")
        .select("submitted_by, points")
        .order("points", { ascending: true });

      let users = await client.from("get_leaderboard").select("*")!;

      data?.map((item) => {
        let obj_find: any = users.data?.filter((user: any) => {
          return item.submitted_by == user.id;
        });
        let user = obj_find[0];

        let body: any = {
          submitted_by: user.email,
          points: 0,
        };
        if (scoreBoard.has(body.submitted_by)) {
          let _obj = scoreBoard.get(body.submitted_by);
          _obj.points += item.points;
        } else {
          scoreBoard.set(body.submitted_by, body);
        }
      });
      setLeaderboard(scoreBoard);
    }
    fetchData();
  }, [client]);

  const users: BodyType[] = [];

  leaderboard.forEach((item: any) => {
    let _body = {
      user: item.submitted_by,
      points: item.points,
    };
    users.push(_body);
  });

  users.sort((a, b) => {
    return b.points - a.points;
  });

  return (
    <>
      <section className="h-screen flex flex-col items-center justify-center px-16">
        <table className="w-full rounded-md text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-md dark:bg-gray-700 dark:text-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item: any) => {
              return (
                <tr>
                  <td
                    scope="col"
                    className="px-6 py-3 text-white hover:text-indigo-200"
                  >
                    {item.user}
                  </td>
                  <td
                    scope="col"
                    className="px-6 py-3 text-white hover:text-indigo-200"
                  >
                    {item.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Leaderboard;
