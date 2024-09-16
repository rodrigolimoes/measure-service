import Logo from "@/assets/logo.webp";

export const Header = () => {
  return (
    <header className="header z-999">
      <div>
        <img src={Logo} alt="Shopper logo" />
      </div>
    </header>
  );
};
