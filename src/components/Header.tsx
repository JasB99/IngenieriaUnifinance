import type React from "react";
import DropdownMenu from "./ui/DropdownMenu";

interface HeaderProps {
  urlImg: string;
  altImg: string;
  button?: React.ReactNode;
}

export default function Header(props: HeaderProps) {
  return (
    <header className="bg-black-haze-50 w-full h-40 border-b-4 border-outer-space-900 flex justify-between items-center dark:bg-outer-space-900 dark:border-outer-space-600">
      <img
        className="
        max-h-1/3 max-w-1/3 md:max-h-1/3 md:max-w-1/3 lg:max-h-2/4 lg:max-w-2/4
        ml-6 md:ml-11 sm:ml-10 lg:ml-12"
        src={props.urlImg}
        alt={props.altImg}
      />
      {/* Usa el botón personalizado como trigger del menú */}
      <DropdownMenu userName="Usuario" trigger={props.button} />
    </header>
  );
}
