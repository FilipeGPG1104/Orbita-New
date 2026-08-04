import logoIcon from "../assets/logo-icon.png";

interface LogoProps {
  className?: string;
}

/** Ícone da marca OrbitalNew (o "N" em órbita), usado na navbar e em placeholders. */
export function Logo({ className = "w-6 h-6" }: LogoProps) {
  return (
    <img src={logoIcon} alt="OrbitalNew" className={`${className} object-contain`} />
  );
}
