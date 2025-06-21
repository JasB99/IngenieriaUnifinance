import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { Link } from "@tanstack/react-router";
import { IoArrowBack } from "react-icons/io5";
import logoUniFinance from "../../assets/imgs/UnifinanceLogo.png";
import logoUnifinanceWhite from "../../assets/imgs/UnifinanceLogoWhite.png";

function getIsDarkMode() {
  // Prioridad: localStorage > clase en html > sistema
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  if (document.documentElement.classList.contains("dark")) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export default function RegisterPage() {
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
      className="flex flex-col items-center justify-center h-screen  lg:h-full text-outer-space-900 font-blinker bg-white
        dark:bg-outer-space-950 dark:text-white p-6 lg:p-0"
    >
      <div className="text-outer-space-900 dark:text-white cursor-pointer absolute left-0">
        <Link to="/logInSection">
          <IoArrowBack className="w-7 h-7 ml-10 lg:hover:scale-125 transition duration-600 cursor-pointer" />
        </Link>
      </div>
      <img
        className="mx-auto  max-h-2/4 max-w-2/4 sm:max-h-1/2 sm:max-w-1/2 md:max-h-1/3 md:max-w-1/3 lg:max-h-2/12 lg:max-w-2/12 mt-20 mb-10 sm:mt-0 md:mt-0  lg:mt-30 "
        src={logoImage}
        alt="LogoUnifinance"
      />
      <section
        className="bg-black-haze-50 rounded-2xl h-fit 
      w-full sm:w-2/3 md:w-1/2 lg:w-1/3 
      dark:bg-outer-space-800  dark:text-white 
      mb-40 sm:mb-40 md:mb-20 lg:mb-30"
      >
        <div className="border-b-2 border-outer-space-900 dark:border-black-haze-50 text-outer-space-900 dark:text-white text-2xl p-5 font-semibold">
          <p>Crear cuenta</p>
        </div>
        <form className="p-5" action="">
          <div className="">
            <label className="font-semibold text-xl block" htmlFor="email">
              Usuario
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
              type="text"
              name="user"
              id="user"
            />
          </div>
          <div className="mb-2 mt-3">
            <label className="font-semibold text-xl block" htmlFor="email">
              Correo electrónico
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
              type="email"
              name="email"
              id="email"
            />
          </div>
          <div className="mb-2 mt-3">
            <label className="block text-xl font-semibold " htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
              type="password"
              name="password"
              id="password"
            />
          </div>
          <Button
            style="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
            text="Iniciar sesión"
          />
        </form>
        <div className="flex flex-row items-center justify-center gap-2  p-5">
          <p>¿Ya tienes una cuenta?</p>
          <Link to="/logInSection">
            <Button
              style="text-outer-space-900 dark:text-white font-semibold hover:text-cornflower-blue-400 cursor-pointer hover:scale-105 animation ease-in-out duration-400"
              text="Iniciar sesión"
            />
          </Link>
        </div>
      </section>
    </section>
  );
}
