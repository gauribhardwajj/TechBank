import { useState } from "react";
import { getusers, sendmoney } from "../utils/request";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

function TransferMoney({ users }) {
  const router = useRouter();
  const [fromUser, setFromUser] = useState("");
  const [toUser, setToUser] = useState(router.query.id);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidated = () => {
    if (!fromUser) {
      setError("Select sender details");
      return false;
    }
    if (!toUser) {
      setError("Select receiver details");
      return false;
    }
    if (!amount) {
      setError("Enter Amount");
      return false;
    }
    if (fromUser === toUser) {
      setError("Sender can only send money to others but not himself");
      return false;
    }
    return true;
  };

  const transferMoney = async (e) => {
    e.preventDefault();
    if (error || loading) return;
    if (!isValidated()) return;

    setLoading(true);

    // send money
    const payload = {
      fromUser,
      toUser,
      amount,
    };
    const res = await sendmoney(payload);

    if (res.hasError) {
      setError(res.errorMessage);
    } else {
      setError("");
      setFromUser("");
      setToUser("");
      setAmount("");
      setSuccess(res.data.message);
    }

    setLoading(false);
    setError("");
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 antialiased">
      <Head>
        <title>Transfer-Money</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Navbar />

      <main className="mx-auto flex h-full w-screen items-center justify-between px-5 md:max-w-screen-2xl md:px-0 xl:max-w-screen-xl">
        <div className="w-full py-5">
          <section className="relative mx-auto flex w-full max-w-screen-md flex-col items-center gap-y-8 gap-x-16 border-[0.2px] bg-white p-11 shadow-sm">
            <h1 className="text-2xl">Transfer Money</h1>

            {error && (
              <p className="text-red-500 text-center capitalize font-semibold text-sm">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-500 text-center capitalize font-semibold text-sm">
                {success}
              </p>
            )}
            <form
              onSubmit={transferMoney}
              className="flex flex-col gap-y-1 items-center justify-center"
            >
              <div className="w-full">
                <label htmlFor="subject" className="label">
                  From:
                </label>
                <input
                  className="input"
                  list="branch"
                  value={fromUser}
                  onChange={(e) => {
                    setFromUser(e.target.value);
                    setError("");
                  }}
                />
                <datalist className="input" name="branch" id="branch">
                  {users?.data?.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="w-full">
                <label htmlFor="subject" className="label">
                  To:
                </label>
                <input
                  className="input"
                  list="branch"
                  value={toUser}
                  onChange={(e) => {
                    setToUser(e.target.value);
                    setError("");
                  }}
                />
                <datalist className="input" name="branch" id="branch">
                  {users?.data?.map((user) => (
                    <option key={user.name} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="w-full">
                <label htmlFor="amount" className="label">
                  Amount:
                </label>
                <input
                  className="input"
                  type="text"
                  name="amount"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 rounded-md bg-black p-2 px-3 font-semibold uppercase text-slate-100 transition-all hover:bg-purple-500 hover:text-white hover:ring-2 hover:ring-purple-500 cursor-pointer text-center"
              >
                Send
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TransferMoney;

export async function getServerSideProps(context) {
  const users = await getusers();

  return {
    props: { users },
  };
}
