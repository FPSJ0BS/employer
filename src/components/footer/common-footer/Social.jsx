const Social = () => {
  const socialContent = [
    { id: 1, icon: "fa-facebook-f", link: "https://www.facebook.com/fpsjobdeed/" },
    { id: 2, icon: "fa-youtube", link: "https://www.youtube.com/channel/UCPEX-dhBL7BYaTuaDHlVr6w" },
    { id: 3, icon: "fa-instagram", link: "https://www.instagram.com/fpsjobs/" },
    { id: 4, icon: "fa-linkedin-in", link: "https://cd.linkedin.com/company/fpsjobs" },
  ];
  return (
    <>
      {socialContent.map((item) => (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          key={item.id}
        >
          <i className={`fab ${item.icon}`}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
