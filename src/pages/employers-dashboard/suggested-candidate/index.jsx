import SuggestedCandidate from "@/01 - New Code/Employer/candidates-single-v1/SuggestedCandidate";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Suggested Candidate || FPS JOBS & Tallento.AI",
  description: "Best education Job Portal In India",
};

const SuggestedCandidateEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <SuggestedCandidate />
    </>
  );
};

export default SuggestedCandidateEmploeeDBPage;
