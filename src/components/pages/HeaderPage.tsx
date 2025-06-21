
import DropdownMenu from "../ui/DropdownMenu";
import ButtonIcon from "../ui/ButtonIcon";
import personIcon from "../../assets/imgs/person.png";
import personIconWhite from "../../assets/imgs/personWhite.png";
import logoUniFinance from "../../assets/imgs/UnifinanceLogo.png";
import logoUnifinanceWhite from "../../assets/imgs/UnifinanceLogoWhite.png";
import { useState, useEffect } from "react";

function getIsDarkMode() {
  // Prioridad: localStorage > clase en html > sistema
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  if (document.documentElement.classList.contains("dark")) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}



export default function Header() {

     const [isDarkMode, setIsDarkMode] = useState(getIsDarkMode());

     useEffect(() => {
        const handler = () => setIsDarkMode(getIsDarkMode());
        window.addEventListener("storage", handler); // por si cambia en otra pestaña
        // Observa cambios en la clase del html
        const observer = new MutationObserver(handler);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
        return () => {
          window.removeEventListener("storage", handler);
          observer.disconnect();
        };
      }, []);

       const btnImage = (
    <ButtonIcon
      style="max-w-12 max-h-12 md:max-w-14 md:max-h-14 lg:max-w-14 lg:max-h-14 
      mr-4 lg:mr-10 md:mr-8 sm:mr-10 
      hover:scale-110 transition duration-600 cursor-pointer"
      urlImg={isDarkMode ? personIconWhite : personIcon}
      altImg={isDarkMode ? "person white" : "person"}
    />
  );

  

  return (
    <header className="bg-black-haze-50 w-full h-40 border-b-4 border-outer-space-900 flex justify-between items-center dark:bg-outer-space-900 dark:border-outer-space-600">
     <img
  className="
    max-h-1/3 max-w-1/3 md:max-h-1/3 md:max-w-1/3 lg:max-h-2/4 lg:max-w-2/4
    ml-6 md:ml-11 sm:ml-10 lg:ml-12"
  src={isDarkMode ? logoUnifinanceWhite : logoUniFinance}
  alt={isDarkMode ? "Logo Unifinance White" : "Logo Unifinance"}
/>

      {/* Usa el botón personalizado como trigger del menú */}
      <DropdownMenu userName="Usuario" trigger={btnImage} />
    </header>
  );
}
