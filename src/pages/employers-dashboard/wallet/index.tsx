import React from 'react'
import MetaComponent from "@/components/common/MetaComponent";
import Wallet from "../../../01 - New Code/Employer/wallet";

const metadata = {
  title: " Letter || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const WalletEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Wallet />
    </>
  );
};

export default WalletEmploeeDBPage;