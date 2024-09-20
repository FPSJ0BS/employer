
import Messages from "@/components/dashboard-pages/employers-dashboard/messages";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Messages || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const MessageEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Messages />
    </>
  );
};

export default MessageEmploeeDBPage
