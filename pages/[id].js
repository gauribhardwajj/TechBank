import { getuser } from "../utils/request";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import Head from "next/head";

function User({ user }) {
  const router = useRouter();

  const transferMoney = async () => {
    router.push({
      pathname: "/transferMoney",
      query: { id: router.query.id },
    });
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 antialiased">
      <Head>
        <title>Banking System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="grid place-items-center h-full mt-24 bg-gray-50">
        <div className="flex flex-col gap-y-2 p-5 border shadow-sm max-w-xl w-full bg-white">
          <div className="flex items-end gap-x-4">
            <p>Name:</p>
            <p className="text-xl">{user?.data?.name}</p>
          </div>
          <div className="flex items-end gap-x-4">
            <p>Email:</p>
            <p className="text-sm">{user?.data?.email}</p>
          </div>
          <div className="flex items-end gap-x-4">
            <p>Current Balance:</p>
            <p className="text-4xl font-semibold">
              {user?.data?.currentBalance}
            </p>
          </div>
          <button
            onClick={transferMoney}
            className="ml-auto rounded-md bg-black p-2 px-3 font-semibold uppercase text-slate-100 transition-all hover:bg-white hover:text-slate-900 hover:ring-2 hover:ring-black cursor-pointer text-center"
          >
            Transfer Money
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;

export async function getServerSideProps(ctx) {
  const user = await getuser(ctx.query.id);

  if (user?.hasError) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user },
  };
}
