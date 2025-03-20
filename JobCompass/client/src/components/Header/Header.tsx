import { Link } from "react-router-dom";
type HeaderMobilityTypes = {
  mobileState: boolean;
  mobileMapMode: boolean;
  setMobileMapMode: React.Dispatch<React.SetStateAction<boolean>>;
  isHomePage: boolean;
};

function Header({
  mobileState,
  mobileMapMode,
  setMobileMapMode,
  isHomePage,
}: HeaderMobilityTypes) {
  const toggleMapList = () => {
    setMobileMapMode(!mobileMapMode);
  };

  return (
    <header
      className={`homePage__header ${
        mobileState ? "homePage__header--mobile" : ""
      }`}
    >
      <div className="homePage__header__logo">
        <Link to={"/"}>
          <img
            className="homePage__header__logo__image"
            src="/src/assets/Logo/compassfavicon.png"
            alt=""
          />
          <h1>JobCompass</h1>
        </Link>
      </div>
      {mobileState && !isHomePage && (
        <button
          onClick={() => toggleMapList()}
          className="homePage__header--mobile-toggle"
        >
          {mobileMapMode ? "View Jobs" : "View Map"}
        </button>
      )}
      <Link
        className="homePage__header__register-cta construction"
        to={"/user/:id/savedJobs"}
      >
        Saved Jobs
      </Link>
      <Link
        className="homePage__header__signIn-cta construction"
        to={"/signIn"}
      >
        Sign In
      </Link>
      <Link
        className="homePage__header__register-cta construction"
        to={"/register"}
      >
        Register
      </Link>
    </header>
  );
}

export default Header;
