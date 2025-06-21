import ButtonIcon from "../ui/ButtonIcon";
import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import logoUniFinance from "../../assets/imgs/UnifinanceLogo.png";
import logoUnifinanceWhite from "../../assets/imgs/UnifinanceLogoWhite.png";
import personIconWhite from "../../assets/imgs/personWhite.png";

function getIsDarkMode() {
  // Prioridad: localStorage > clase en html > sistema
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  if (document.documentElement.classList.contains("dark")) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function InitialPage() {
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

  const logoImage = isDarkMode ? logoUnifinanceWhite : logoUniFinance;

  return (
    <section
      className="flex flex-col items-center justify-center h-screen text-outer-space-900 font-blinker bg-black-haze-50
    dark:bg-outer-space-950 dark:text-white"
    >
      <img
        className="max-h-2/4 max-w-2/4 lg:max-h-2/5 lg:max-w-2/5 lg:ml-18 "
        src={logoImage}
        alt="LogoUnifinance"
      />
      <h1 className="text-xl text-center mt-3 lg:mt-0 lg:text-2xl  font-semibold lg:mb-4">
        Bienvenido a UniFinance el lugar ideal para administrar tus finanzas
      </h1>
      <p className="text-base mt-2 lg:mt-0 lg:text-lg">
        Puedes iniciar sesión o ingresar en modo invitado
      </p>

      <div className="flex flex-wrap justify-center gap-8 mt-8">
        <div className="w-50 h-50 lg:w-60 lg:h-60 bg-cornflower-blue-400 items-center justify-center rounded-lg flex flex-col">
          <Link to="/logInSection">
            <ButtonIcon
              style="items-center max-w-20 max-h-20 lg:max-w-30 lg:max-h-30 lg:hover:scale-110 transition duration-600 cursor-pointer"
              urlImg={personIconWhite}
              altImg="person"
            />
          </Link>
          <p className="mt-2 text-lg font-semibold text-white">
            Iniciar Sesión
          </p>
        </div>

        <div className="w-50 h-50 lg:w-60 lg:h-60 bg-cornflower-blue-400 items-center justify-center rounded-lg flex flex-col">
          <Link to="/initialSection">
            <ButtonIcon
              style="items-center max-w-20 max-h-20 lg:max-w-30 lg:max-h-30 lg:hover:scale-110 transition duration-600 cursor-pointer"
              urlImg={personIconWhite}
              altImg="person"
            />
          </Link>
          <p className="mt-2 text-lg font-semibold text-white">Modo Invitado</p>
        </div>
      </div>
    </section>
  );
}
