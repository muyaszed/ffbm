import { ReactElement, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import { CgMenuRound } from "react-icons/cg";
import { FaUser } from "react-icons/fa";
import { Link } from "remix";
import { Category } from "~/services/category";

export type MenuHeaderProps = {
  logo?: string;
  title: string;
  children: ReactElement;
  categories: Category[];
  handleAuth: () => void;
};

export default function MenuHeader({
  logo,
  title,
  children,
  categories,
  handleAuth,
}: MenuHeaderProps) {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [mainContainerSlideTransition, setmainContainerSlideTransition] =
    useState<string>("");

  function renderLogo() {
    if (!logo) {
      return (
        <Link to="/">
          <div className="main-header-title">{title}</div>
        </Link>
      );
    }

    return (
      <Link to="/">
        <div className="main-header-logo-wrapper">
          <img className="main-header-logo" src={logo} alt="Logo" />
        </div>
      </Link>
    );
  }

  function toggleSearchInput() {
    setShowSearch((prevState) => !prevState);
  }

  function renderSearchIcon() {
    if (showSearch) {
      return <IoMdClose />;
    }

    return <BiSearchAlt />;
  }

  function renderSearchInput() {
    if (!showSearch) {
      return null;
    }

    return <input className="search-input" type="text" name="search-input" />;
  }

  function handleMenuSlide(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    event.stopPropagation();
    console.log(event.currentTarget.id);
    if (
      !mainContainerSlideTransition &&
      event.currentTarget.id === "burger-btn"
    ) {
      setmainContainerSlideTransition("main-nav-slide");
    } else {
      setmainContainerSlideTransition("");
    }
  }

  return (
    <div className={`${mainContainerSlideTransition} main-nav-container `}>
      <div className="main-menu">
        <ul>
          <li className="category-item-header">All Categories</li>
          {categories.map((category) => (
            <li key={category.id}>{category.attributes.name}</li>
          ))}
        </ul>
      </div>

      <div className="main-header-container" onClick={handleMenuSlide}>
        <div className="main-header-upper">
          <div className="main-header-upper-left">
            {renderLogo()}
            {renderSearchInput()}
          </div>
          <div className="main-header-upper-right-large">
            <input
              className="search-input-large"
              type="text"
              name="search-input-large"
            />
            <button className="search-button">
              <BiSearchAlt />
            </button>
            <div className="user-profile-large-wrapper" onClick={handleAuth}>
              <FaUser />
              <div className="auth-text">Login or Signup</div>
            </div>
          </div>
          <div className="main-header-upper-right" onClick={toggleSearchInput}>
            {renderSearchIcon()}
          </div>
        </div>
        <div className="main-header-lower">
          <div
            className="main-header-lower-hamburger"
            onClick={handleMenuSlide}
            id="burger-btn"
          >
            <CgMenuRound />
          </div>
          <div className="main-header-lower-profile" onClick={handleAuth}>
            <FaUser />
          </div>
        </div>
        <div className="main-content">{children}</div>
      </div>
    </div>
  );
}
