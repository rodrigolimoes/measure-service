import Logo from "@/assets/logo.webp";

export const Header = () => {
  return (
    <header className="header">
      <div>
        <img src={Logo} alt="Shopper logo" />
      </div>
    </header>
  );
};
