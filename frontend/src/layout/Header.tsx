import Logo from "@/assets/logo.webp";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header z-999">
      <div>
        <Link to={"/"}>
          <img src={Logo} alt="Shopper logo" />
        </Link>
      </div>
    </header>
  );
};
