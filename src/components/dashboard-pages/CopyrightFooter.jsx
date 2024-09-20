const CopyrightFooter = () => {
  return (
    <div className="copyright-text">
      <p>
        © {new Date().getFullYear()} FPS JOBS{" "}
        <a
          href="https://themeforest.net/user/ib-themes"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        All Right Reserved.
      </p>
    </div>
  );
};

export default CopyrightFooter;
