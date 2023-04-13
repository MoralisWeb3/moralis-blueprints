import Image from "next/image";

import AptosLogo from "../public/assets/AptosLogo.png";

export default function Header() {
  return (
    <section className="w-full h-20">
      <section className="w-full h-full flex justify-between items-center px-6">
        <Image src={AptosLogo} alt="Aptos logo image" width="40" height="40" />
        <section className="w-3/6 flex justify-between font-thin text-gray-200">
          <span>Transactions</span>
          <span>Analytics</span>
          <span>Validators</span>
          <span>Blocks</span>
        </section>
      </section>
    </section>
  );
}
