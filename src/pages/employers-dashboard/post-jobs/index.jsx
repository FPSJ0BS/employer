
import PostJob from "@/01 - New Code/Employer/Post Job";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Jobs || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const PostJobsEmploeeDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <PostJob />
    </>
  );
};

export default PostJobsEmploeeDBPage
