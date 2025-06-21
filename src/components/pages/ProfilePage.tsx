
import Button from "../ui/Button";
import { Link } from "@tanstack/react-router";
import { AiFillHome } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";



export default function ProfilePage() {





  return (
    <section
      className="flex flex-col  h-full lg:h-full text-outer-space-900 font-blinker bg-white
        dark:bg-outer-space-950 dark:text-white p-6 lg:p-0"
    >
      <section className="flex items-center justify-between relative mt-10">
        <div className="text-outer-space-900 dark:text-white cursor-pointer absolute left-0">
          <Link to="/initialSection">
            <AiFillHome className="w-7 h-7 ml-10 lg:hover:scale-125 transition duration-600 cursor-pointer" />
          </Link>
        </div>
        <h1 className="flex-grow text-outer-space-900 text-2xl text-center font-semibold font-blinker dark:text-white ">
          Perfil del usuario
        </h1>
      </section>
      <section className="flex flex-col sm:flex-col md:flex-col lg:flex-row w-full items-center justify-center gap-20 mt-10">
      <div className="bg-black-haze-50 rounded-2xl h-fit 
      w-full sm:w-2/3 md:w-1/2 lg:w-1/3 
      dark:bg-outer-space-800  dark:text-white 
      mb-40 sm:mb-40 md:mb-20 lg:mb-30">
        <div className="flex flex-row justify-between  border-b-2 border-outer-space-900 dark:border-black-haze-50 text-outer-space-900 dark:text-white text-2xl p-5 font-semibold">
            <p>Información personal</p>
            <FaRegEdit className="w-7 h-7 hover:text-cornflower-blue-400 ml-10 lg:hover:scale-125 transition duration-600 cursor-pointer" />
        </div>
        <form className="p-5" action="">
            <div className="">
                <label className="font-semibold text-xl block" htmlFor="">Nombre completo</label>
                <input  className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 " type="text" name="fullname" id="fullname" />
            </div>
            <div>
                <label className="block text-xl font-semibold mb-2 mt-3 " htmlFor="email">Correo electrónico</label>
                <input className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 " type="email" name="email" id="email" />
            </div>
            <Button
                        style="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
                        text="Guardar cambios"
                      />
        </form>
       
      </div>


       <div className="bg-black-haze-50 rounded-2xl h-fit 
      w-full sm:w-2/3 md:w-1/2 lg:w-1/3 
      dark:bg-outer-space-800  dark:text-white 
      mb-40 sm:mb-40 md:mb-20 lg:mb-30">
        <div className="flex flex-row justify-between  border-b-2 border-outer-space-900 dark:border-black-haze-50 text-outer-space-900 dark:text-white text-2xl p-5 font-semibold">
            <p>Configuración de la cuenta</p>
             <FaRegEdit className="w-7 h-7 hover:text-cornflower-blue-400 ml-10 lg:hover:scale-125 transition duration-600 cursor-pointer" />
        </div>
        <form className="p-5" action="">
            <div className="">
                <label className="font-semibold text-xl block" htmlFor="password">Contraseña actual</label>
                <input  className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 " type="password" name="actualPassword" id="actualPassword" />
            </div>
            <div>
                <label className="block text-xl font-semibold mb-2 mt-3 " htmlFor="password">Cambiar contraseña</label>
                <input className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 " type="password" name="newPassword" id="newPassword" />
            </div>
            <Button
                        style="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
                        text="Guardar cambios"
                      />
        </form>
       
      </div> 

      </section>
    </section>
  );
}
