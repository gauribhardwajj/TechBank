import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getusers } from "../utils/request";

const Users = ({ users }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 antialiased">
      <Head>
        <title>All-Users</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />

      <main className="mx-auto flex h-full w-screen items-center justify-between px-5 md:max-w-screen-2xl md:px-0 xl:max-w-screen-xl">
        <div className="w-full py-5">
          <section className="relative mx-auto flex w-full max-w-screen-md flex-col items-center gap-y-8 gap-x-16 border-[0.2px] bg-white p-11 shadow-sm">
            <div className="ml-auto">
              <button
                onClick={() => router.push("/transferMoney")}
                className="ml-auto rounded-md bg-black p-2 px-3 font-semibold uppercase text-slate-100 transition-all hover:bg-purple-500 hover:text-white hover:ring-2 hover:ring-purple-500 cursor-pointer text-center"
              >
                Transfer Money
              </button>
            </div>
            <table className="table-auto mx-auto bg-white border-[0.2px] shadow-sm w-full max-w-screen-md">
              <thead>
                <tr className="p-5 grid grid-cols-3 justify-items-start w-full bg-gray-100 text-xs md:text-base">
                  <th className="capitalize">Name</th>
                  <th className="capitalize hidden lg:block md:block">Email</th>
                  <th className="capitalize">Current Balance</th>
                </tr>
              </thead>
              <tbody className="">
                {users?.data?.length > 0 ? (
                  users?.data?.map((user) => (
                    <tr
                      key={user._id}
                      className="p-5 grid grid-cols-3 justify-items-start w-full text-xs md:text-base"
                    >
                      <td
                        onClick={() => router.push(`/${user._id}`)}
                        key={user._id}
                        className="link"
                      >
                        {user.name}
                      </td>
                      <td className="hidden lg:block md:block">{user.email}</td>
                      <td>{user.currentBalance}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="p-5 grid place-items-center w-full text-xs md:text-base">
                    <td className="text-3xl font-medium">No Classes Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Users;

export async function getServerSideProps(context) {
  const users = await getusers();

  if (users?.hasError) {
    return {
      notFound: true,
    };
  }
  console.log(users);
  return {
    props: { users },
  };
}
