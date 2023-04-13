import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import TxnContext from "./txnContext.js";
import { Search } from "@web3uikit/icons";

import AptosLogo from "../public/assets/AptosLogo.png";

export default function Main() {
  const [result, setResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const {
    setHash,
    setVersion,
    setTxnStatus,
    setSender,
    setTxnFunction,
    setAmount,
  } = useContext(TxnContext);

  useEffect(() => {
    async function getTransactions() {
      await axios
        .get("http://localhost:5001/gettransactions")
        .then((response) => {
          setResult(response.data);
          setShowResult(true);
        });
    }

    getTransactions();
  }, []);

  const setTxnContext = (
    hash,
    version,
    txnStatus,
    sender,
    txnFunction,
    amount
  ) => {
    setHash(hash),
      setVersion(version),
      setTxnStatus(txnStatus),
      setSender(sender),
      setTxnFunction(txnFunction),
      setAmount(amount);
  };

  return (
    <section className="w-full min-h-screen pt-16 px-32">
      <h2>Aptos Explorer</h2>
      <p className="text-right mt-10">TOTAL TRANSACTION: 114,504,230</p>
      <section className="flex justify-between mt-4">
        <section className="w-80 h-28 flex flex-col justify-between bg-[#1b1f1e] rounded-lg">
          <span className="text-xs pt-4 pl-4">Total Supply</span>
          <span className="pl-4 pb-8">1,029,909,167</span>
        </section>
        <section className="w-80 h-28 flex flex-col justify-between bg-[#1b1f1e] rounded-lg">
          <span className="text-xs pt-4 pl-4">Actively Staked</span>
          <span className="pl-4 pb-8">849,288,953</span>
        </section>
        <section className="w-80 h-28 flex flex-col justify-evenly bg-[#1b1f1e] pl-4 rounded-lg">
          <span className="text-xs">TPS</span>
          <section className="flex justify-between pb-2">
            <section className="flex flex-col">
              <span className="">7</span>
              <span className="text-[#a1a1aa] text-xs">REAL-TIME</span>
            </section>
            <section className="flex flex-col pr-12">
              <span className="">458</span>
              <span className="text-[#a1a1aa] text-xs">PEAK LAST 30 DAYS</span>
            </section>
          </section>
        </section>
        <section className="w-80 h-28 flex flex-col justify-between bg-[#1b1f1e] rounded-lg">
          <span className="text-xs pt-4 pl-4">Active Validators</span>
          <span className="pl-4 pb-8">104</span>
        </section>
      </section>
      <section className="w-full h-16 flex items-center bg-[#131615] mt-12 border border-[#282b2a] hover:border-[#06f7f783] rounded-xl">
        <Search fontSize="30px" className="w-14" />
        <input
          type="text"
          id="inputField"
          name="inputField"
          maxLength="120"
          placeholder="Search Explorer"
          required
          className="w-full h-5/6 bg-[#131615] text-lg placeholder-neutral-500 focus:outline-none"
        />
      </section>
      <section className="mt-10">
        <h2 className="text-xl">User Transactions</h2>
      </section>
      <section>
        <table className="w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="text-left">
              <th>VERSION</th>
              <th>TYPE</th>
              <th>TIMESTAMP</th>
              <th>SENDER</th>
              <th>SENT TO</th>
              <th className="pl-10">FUNCTION</th>
              <th className="text-right">AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {showResult &&
              result.map((txn, i) => {
                if (txn.events && txn.events[0]?.type) {
                  return (
                    <tr
                      className="bg-[#1b1f1e] h-12 text-sm"
                      key={i}
                      onClick={() =>
                        setTxnContext(
                          txn.hash,
                          txn.version,
                          txn.success,
                          txn.events[0]?.guid.account_address,
                          txn.events[0]?.type.split("::").slice(1).join("::"),
                          Number(txn.events[0].data.amount).toFixed(4)
                        )
                      }
                    >
                      <td className="text-[#06f7f7]">
                        <Link href={`/txn/${txn.version}`}>{txn.version}</Link>
                      </td>
                      <td>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                          />
                        </svg>
                      </td>
                      <td>
                        {
                          new Date(txn.timestamp / 1000)
                            .toLocaleString("sv-SE")
                            .split(" ")[0]
                        }
                      </td>
                      <td>
                        {txn.events[0]?.guid.account_address && (
                          <span className="bg-[#363a39] py-2 px-8 rounded-2xl">
                            {txn.events[0]?.guid.account_address.slice(0, 12)}
                          </span>
                        )}
                      </td>
                      <td>
                        {txn.events[1] && (
                          <span className="bg-[#363a39] py-2 px-8 rounded-2xl">
                            {txn.events[1]
                              ? txn.events[1].guid.account_address.slice(0, 12)
                              : ""}
                          </span>
                        )}
                      </td>
                      <td className="pl-10">
                        {txn.events[0]?.type && (
                          <span className="bg-[#0ea4e921] text-[#83cbed] py-2 px-8 rounded-2xl">
                            {txn.events[0]?.type
                              .split("::")
                              .slice(1)
                              .join("::")}
                          </span>
                        )}
                      </td>
                      <td className="flex flex-col p-2 text-right">
                        <span>
                          {txn.events[0]?.data.amount
                            ? `${Number(txn.events[0].data.amount).toFixed(
                                4
                              )} APT`
                            : "0 APT"}
                        </span>
                        <span className="text-[#909099] text-sm">
                          Gas {Number(txn.gas_used / 100000000).toFixed(8)} APT
                        </span>
                      </td>
                    </tr>
                  );
                }
              })}
          </tbody>
        </table>
      </section>
      <section className="text-center my-10">
        <button className="w-80 h-14 text-black bg-[#06f7f7] rounded-xl">
          VIEW ALL TRANSACTIONS
        </button>
      </section>
      <section className="flex justify-between items-center py-8">
        <section className="flex">
          <Image
            src={AptosLogo}
            alt="Aptos logo image"
            width="50"
            height="50"
          />
          <section className="flex flex-col justify-evenly ml-4 text-xs">
            <span>2023 Aptos Labs</span>
            <section>
              <span className="underline">Privacy</span>
              <span className="ml-2 underline">Terms</span>
            </section>
          </section>
        </section>
        <section className="flex justify-between items-center w-64 h-10">
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15.938 15.939a8.375 8.375 0 0 1-3.443 2.083v-1.498c0-.788-.27-1.368-.81-1.739a8.9 8.9 0 0 0 .932-.136 7.07 7.07 0 0 0 .898-.254c.316-.111.6-.243.85-.396.25-.153.492-.351.723-.596.23-.243.424-.52.58-.83.157-.308.28-.68.372-1.113.09-.433.137-.91.137-1.43 0-1.01-.33-1.87-.987-2.579.3-.78.267-1.63-.098-2.548l-.244-.03c-.17-.02-.473.052-.913.215-.44.163-.932.43-1.48.8a8.984 8.984 0 0 0-2.412-.322 8.8 8.8 0 0 0-2.401.323 8.475 8.475 0 0 0-.982-.581 5.141 5.141 0 0 0-.742-.313 2.579 2.579 0 0 0-.826-.112.62.62 0 0 0-.097.02c-.365.924-.398 1.773-.098 2.548-.658.71-.986 1.57-.986 2.579 0 .52.045.997.137 1.43.09.433.214.805.37 1.113.157.31.35.587.582.83.23.245.472.443.722.596.25.153.534.285.85.396.316.11.615.195.898.254.283.058.594.104.933.136-.534.365-.8.945-.8 1.739v1.527a8.364 8.364 0 0 1-3.541-2.113A8.356 8.356 0 0 1 1.6 10a8.351 8.351 0 0 1 2.46-5.938A8.363 8.363 0 0 1 10 1.602a8.358 8.358 0 0 1 5.938 2.46A8.381 8.381 0 0 1 18.398 10a8.358 8.358 0 0 1-2.46 5.939ZM10 0C4.478 0 0 4.478 0 10c0 5.523 4.478 10 10 10 5.523 0 10-4.477 10-10 0-5.522-4.477-10-10-10Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 71 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <g clipPath="url(#a)">
              <path
                d="M60.105 4.898A58.55 58.55 0 0 0 45.653.415a.22.22 0 0 0-.233.11 40.784 40.784 0 0 0-1.8 3.697c-5.456-.817-10.886-.817-16.23 0-.485-1.164-1.201-2.587-1.828-3.697a.228.228 0 0 0-.233-.11 58.386 58.386 0 0 0-14.451 4.483.207.207 0 0 0-.095.082C1.578 18.73-.944 32.144.293 45.39a.244.244 0 0 0 .093.167c6.073 4.46 11.955 7.167 17.729 8.962a.23.23 0 0 0 .249-.082 42.08 42.08 0 0 0 3.627-5.9.225.225 0 0 0-.123-.312 38.772 38.772 0 0 1-5.539-2.64.228.228 0 0 1-.022-.378 31.17 31.17 0 0 0 1.1-.862.22.22 0 0 1 .23-.03c11.619 5.304 24.198 5.304 35.68 0a.219.219 0 0 1 .233.027c.356.293.728.586 1.103.865a.228.228 0 0 1-.02.378 36.384 36.384 0 0 1-5.54 2.637.227.227 0 0 0-.121.315 47.249 47.249 0 0 0 3.624 5.897.225.225 0 0 0 .249.084c5.801-1.794 11.684-4.502 17.757-8.961a.228.228 0 0 0 .092-.164c1.48-15.315-2.48-28.618-10.497-40.412a.18.18 0 0 0-.093-.084Zm-36.38 32.427c-3.497 0-6.38-3.211-6.38-7.156 0-3.944 2.827-7.156 6.38-7.156 3.583 0 6.438 3.24 6.382 7.156 0 3.945-2.827 7.156-6.381 7.156Zm23.593 0c-3.498 0-6.38-3.211-6.38-7.156 0-3.944 2.826-7.156 6.38-7.156 3.582 0 6.437 3.24 6.38 7.156 0 3.945-2.798 7.156-6.38 7.156Z"
                fill="currentColor"
              ></path>
            </g>
            <defs>
              <clipPath id="a">
                <path fill="currentColor" d="M0 0h71v55H0z"></path>
              </clipPath>
            </defs>
          </svg>
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 22 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 2.013a9.395 9.395 0 0 1-2.593.676A4.348 4.348 0 0 0 21.392.314a9.341 9.341 0 0 1-2.866 1.042A4.62 4.62 0 0 0 15.232 0c-2.493 0-4.514 1.922-4.514 4.292 0 .336.04.664.117.978C7.083 5.09 3.758 3.382 1.532.786A4.115 4.115 0 0 0 .92 2.944c0 1.489.796 2.802 2.007 3.571A4.669 4.669 0 0 1 .884 5.98v.053c0 2.08 1.555 3.815 3.62 4.209a4.744 4.744 0 0 1-2.038.074c.574 1.705 2.241 2.945 4.216 2.98a9.358 9.358 0 0 1-5.605 1.837c-.365 0-.724-.02-1.077-.06A13.257 13.257 0 0 0 6.918 17c8.303 0 12.843-6.54 12.843-12.21 0-.187-.004-.372-.013-.556A8.929 8.929 0 0 0 22 2.013Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            width="60%"
            height="60%"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="2.56 2.54 18.88 18.92"
            focusable="false"
            aria-hidden="true"
          >
            <path
              d="m16.41 8.98.84-.803V8h-2.902l-2.069 5.16L9.927 8H6.883v.177l.98 1.18a.406.406 0 0 1 .133.343v4.641a.534.534 0 0 1-.142.46l-1.104 1.34v.175h3.127v-.176l-1.103-1.338a.553.553 0 0 1-.152-.46v-4.014l2.745 5.989h.32l2.357-5.989v4.773c0 .127 0 .151-.084.235l-.848.823v.176h4.117v-.176l-.818-.804a.245.245 0 0 1-.094-.235V9.215a.245.245 0 0 1 .094-.235Z"
              fill="currentColor"
            ></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.258 2.833a47.721 47.721 0 0 0-10.516 0c-2.012.225-3.637 1.81-3.873 3.832a45.921 45.921 0 0 0 0 10.67c.236 2.022 1.86 3.607 3.873 3.832a47.77 47.77 0 0 0 10.516 0c2.012-.225 3.637-1.81 3.873-3.832a45.925 45.925 0 0 0 0-10.67c-.236-2.022-1.86-3.607-3.873-3.832Zm-10.35 1.49a46.22 46.22 0 0 1 10.184 0c1.33.15 2.395 1.199 2.55 2.517a44.421 44.421 0 0 1 0 10.32 2.89 2.89 0 0 1-2.55 2.516 46.216 46.216 0 0 1-10.184 0 2.89 2.89 0 0 1-2.55-2.516 44.421 44.421 0 0 1 0-10.32 2.89 2.89 0 0 1 2.55-2.516Z"
              fill="currentColor"
            ></path>
          </svg>
          <svg
            width="60%"
            height="60%"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.75 0h12.5C18.32 0 20 1.68 20 3.75v12.5c0 2.07-1.68 3.75-3.75 3.75H3.75C1.68 20 0 18.32 0 16.25V3.75C0 1.68 1.68 0 3.75 0Zm-.673 16.977h3.107l-.018-9.303H3.059l.018 9.303Zm1.475-10.52h-.018c-1.016 0-1.67-.7-1.67-1.571 0-.893.675-1.569 1.709-1.569s1.668.676 1.689 1.569c0 .871-.658 1.571-1.71 1.571Zm9.27 10.52h3.131v-5.403c0-2.791-1.487-4.09-3.476-4.09-1.605 0-2.275.881-2.678 1.503l-.018-1.313H7.632l.018 9.303h3.15V11.71c0-.274.02-.541.102-.737.216-.543.667-1.105 1.502-1.105 1.094 0 1.418.832 1.418 2.055v5.054Z"
              fill="currentColor"
            ></path>
          </svg>
        </section>
      </section>
    </section>
  );
}
