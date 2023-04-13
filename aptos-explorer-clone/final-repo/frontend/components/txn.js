import { useContext } from "react";
import Link from "next/link";
import { ArrowLeft, Checkmark, Copy, Search } from "@web3uikit/icons";
import TxnContext from "./txnContext.js";

export default function Txn() {
  const { hash, version, txnStatus, sender, txnFunction, amount } =
    useContext(TxnContext);

  return (
    <section className="w-full min-h-screen pt-16 px-32">
      <Link href="/">
        <section className="flex items-center text-sm text-[#06f7f7]">
          <ArrowLeft fontSize="20px" className="mr-2" />
          BACK
        </section>
      </Link>
      <section className="w-full h-16 flex items-center bg-[#131615] mt-6 border border-[#282b2a] hover:border-[#06f7f783] rounded-xl">
        <Search fontSize="30px" className="w-14" />
        <input
          type="text"
          id="inputfield"
          name="inputField"
          maxLength="120"
          placeholder="Search Explorer"
          required
          className="w-full h-5/6 bg-[#131615] text-lg placeholder-neutral-500 focus:outline-none"
        />
      </section>
      <section className="mt-12">
        <h2>Transaction</h2>
        <section className="w-fit flex items-center bg-[#363a39] mt-4 py-2 px-4 rounded-2xl">
          <span className="text-sm">{hash}</span>
          <Copy fontSize="20px" className="ml-2" />
        </section>
        <section className="flex justify-between w-4/6 h-16 text-[#909099] mt-8 border-2 border-[#181b19] rounded-2xl">
          <section className="flex justify-center items-center w-1/5 text-[#fafafa] bg-[#1b1f1e]">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="BarChartOutlinedIcon"
              className="w-6 h-6 fill-[#fafafa] mr-2"
            >
              <path d="M4 9h4v11H4zm12 4h4v7h-4zm-6-9h4v16h-4z"></path>
            </svg>
            Overview
          </section>
          <section className="flex justify-center items-center w-1/5 border-x-2 border-x-[#181b19]">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="AccountBalanceWalletOutlinedIcon"
              className="w-6 h-6 fill-[#909099] mr-2"
            >
              <path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28c.59-.35 1-.98 1-1.72V9c0-.74-.41-1.37-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z"></path>
              <circle cx="16" cy="12" r="1.5"></circle>
            </svg>
            Balance Change
          </section>
          <section className="flex justify-center items-center w-1/5">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CallMergeOutlinedIcon"
              className="w-6 h-6 fill-[#909099] mr-2"
            >
              <path d="M17 20.41 18.41 19 15 15.59 13.59 17 17 20.41zM7.5 8H11v5.59L5.59 19 7 20.41l6-6V8h3.5L12 3.5 7.5 8z"></path>
            </svg>
            Events
          </section>
          <section className="flex justify-center items-center w-1/5 border-x-2 border-x-[#181b19]">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="FileCopyOutlinedIcon"
              className="w-6 h-6 fill-[#909099] mr-2"
            >
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4H8c-1.1 0-1.99.9-1.99 2L6 21c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V11l-6-6zM8 21V7h6v5h5v9H8z"></path>
            </svg>
            Payload
          </section>
          <section className="flex justify-center items-center w-1/5">
            <svg
              focusable="false"
              aria-hidden="true"
              viewBox="0 0 24 24"
              data-testid="CodeOutlinedIcon"
              className="w-6 h-6 fill-[#909099] mr-2"
            >
              <path d="M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"></path>
            </svg>
            Changes
          </section>
        </section>
      </section>
      <section className="h-72 flex bg-[#1b1f1e] mt-6 pl-8 rounded-2xl">
        <section className="w-80 h-full flex flex-col justify-evenly text-[#909099]">
          <span>Version:</span>
          <span>Status:</span>
          <span>Sender:</span>
          <span>Function:</span>
          <span>Amount:</span>
        </section>
        <section className="w-96 h-full flex flex-col justify-evenly">
          <span>{version}</span>
          <span className="flex justify-center items-center text-[#00bfa5] bg-[#00bfa61c] py-1 text-center rounded-2xl">
            <Checkmark fontSize="15px" className="mr-2" />
            {txnStatus ? "Success" : "Unsuccessful"}
          </span>
          <span className="flex justify-center items-center bg-[#363a39] py-1 text-center rounded-2xl">
            {sender.slice(0, 6)}...{sender.slice(62)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-4 h-4  ml-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </span>
          <span className="bg-[#0ea4e921] text-[#83cbed] py-1 text-center rounded-2xl">
            {txnFunction}
          </span>
          <span>{amount} APT</span>
        </section>
      </section>
    </section>
  );
}
