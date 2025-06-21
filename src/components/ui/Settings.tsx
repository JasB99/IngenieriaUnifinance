import { SlArrowDown } from "react-icons/sl";
import { useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "@tanstack/react-router";

export default function Settings() {
  // Lee la preferencia guardada o el sistema solo al inicio
  const [isDarkMode, setIsDarkMode] = useState(() => {
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  // Siempre modo claro por defecto
  return false;
});

  // Aplica la clase 'dark' al <html> y guarda preferencia
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <section className="bg-white text-outer-space-900 dark:bg-outer-space-950 dark:text-white sm:h-full md:h-full lg:h-full absolute w-full">
      <section className="flex items-center justify-between relative mt-10">
        <div className="text-outer-space-900 dark:text-white cursor-pointer absolute left-0">
          <Link to="/initialSection">
            <AiFillHome className="w-7 h-7 ml-10 lg:hover:scale-125 transition duration-600 cursor-pointer" />
          </Link>
        </div>
        <h1 className="flex-grow text-outer-space-900 text-2xl text-center font-semibold font-blinker dark:text-white ">
          Configuración
        </h1>
      </section>

      <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row gap-7 items-center justify-center lg:items-start lg:justify-between font-blinker p-10">
        <div className="bg-black-haze-50 h-fit w-full sm:w-3/4 md:w-3/4 lg:w-1/4 dark:bg-outer-space-900 rounded-2xl ">
          <div className="border-b border-outer-space-900 dark:border-black-haze-50 p-5">
            <h2 className="text-2xl">Apariencia</h2>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-3">
              Elige el tema de la aplicación
            </h3>
            <div className="relative mt-3">
              <select
                name="tema"
                id="tema"
                value={isDarkMode ? "oscuro" : "claro"}
                onChange={(e) => setIsDarkMode(e.target.value === "oscuro")}
                className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 appearance-none pr-10 cursor-pointer dark:outline-black-haze-50 dark:bg-outer-space-800 "
              >
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <SlArrowDown className="w-4 h-4 outline-outer-space-900" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black-haze-50 h-fit w-fit sm:w-3/4 md:w-3/4 lg:w-fit dark:bg-outer-space-900 rounded-2xl ">
          <div className="border-b border-outer-space-900 dark:border-black-haze-50 p-5">
            <h2 className="text-2xl">Notificaciones</h2>
          </div>

          <div className="px-5 mt-5 flex flex-row">
            <p className="text-xl font-semibold mb-3 w-[70%]">
              Alertas de Gastos Compartidos Pendientes
            </p>
            <div className="w-[30%] flex justify-end">
              <label className="relative inline-block w-10 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-full h-full  bg-black-haze-300 rounded-full peer-checked:bg-cornflower-blue-400 transition-colors"></div>
                <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-4"></div>
              </label>
            </div>
          </div>

          <div className="px-5 mt-5 flex flex-row justify-between">
            <p className="text-xl font-semibold mb-3 w-[70%]">
              Alertas de Recordatorios
            </p>
            <div className="w-[30%] flex justify-end">
              <label className="relative inline-block w-10 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-full h-full  bg-black-haze-300 rounded-full peer-checked:bg-cornflower-blue-400 transition-colors"></div>
                <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-4"></div>
              </label>
            </div>
          </div>

          <div className="px-5 mt-5 flex flex-row justify-between">
            <p className="text-xl font-semibold mb-3 w-[70%]">
              Alertas de Objetivos Cercanos
            </p>
            <div className="w-[30%] flex justify-end">
              <label className="relative inline-block w-10 h-6 cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-full h-full  bg-black-haze-300 rounded-full peer-checked:bg-cornflower-blue-400 transition-colors"></div>
                <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-4"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-black-haze-50 h-fit  w-fit sm:w-3/4 md:w-3/4 lg:w-1/4 dark:bg-outer-space-900 rounded-2xl ">
          <div className="border-b border-outer-space-900 dark:border-black-haze-50 p-5">
            <h2 className="text-2xl">Tipo de Moneda</h2>
          </div>
          <div className="p-5">
            <h3 className="text-xl font-semibold mb-3">Moneda</h3>
            <div className="relative mt-3">
              <select
                name="Moneda"
                id="Moneda"
                className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 appearance-none pr-10 cursor-pointer dark:outline-black-haze-50 dark:bg-outer-space-800 "
              >
                <option value="claro">Dolar Americano (USD)</option>
                <option value="oscuro">Colones Costarricenses (CRC)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <SlArrowDown className="w-4 h-4 outline-outer-space-900" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
