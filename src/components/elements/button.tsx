interface IButton {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}

const Button = ({ children, onClick, type, ...props }: IButton) => {
  const determineClassNames = (type: string) => {
    switch (type) {
      case "primary":
        return "bg-primaryBlue font-semibold text-black hover:bg-secondaryBlue";
        break;

      case "secondary":
        return "border-2 text-white transition hover:bg-white hover:text-black";
        break;

      case "alert":
        return "bg-primaryRed font-semibold text-black hover:bg-secondaryRed";
        break;

      case "green":
        return "bg-primaryGreen font-semibold text-black hover:bg-secondaryGreen";
        break;

      default:
        return "bg-primaryBlue font-semibold text-black hover:bg-secondaryBlue";
        break;
    }
  };
  return (
    <button
      className={`mx-auto rounded-full px-10 py-3 text-center text-xl transition ${determineClassNames(
        type ?? "primary"
      )}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
