import chatgptIcon from "../assets/chatgpt-icon.png";

interface LogoProps {
  size?: number;
}

export function Logo({ size = 32 }: LogoProps) {
  return (
    <img
      src={chatgptIcon}
      alt="ChatGPT"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
