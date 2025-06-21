import React, { useState, useRef, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { BsPerson } from "react-icons/bs";
import { PiStudent } from "react-icons/pi";
import { CiSettings } from "react-icons/ci";
import { FiLogOut } from "react-icons/fi";

interface DropdownMenuProps {
  userName?: string;
  trigger?: React.ReactNode;
}

const menuOptions = [
  {
    label: "Perfil",
    to: "/profileSection",
    icon: <BsPerson />,
  },
  {
    label: "Modo Estudiante",
    to: "/",
    icon: <PiStudent />,
  },
  { divider: true },
  {
    label: "Configuración",
    to: "/settingsSection",
    icon: <CiSettings className="" />,
  },
  {
    label: "Cerrar sesión",
    to: "/",
    icon: <FiLogOut className="" />,
  },
];

export default function DropdownMenu({ trigger }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      {trigger && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
          tabIndex={0}
          role="button"
          style={{ display: "inline-block" }}
        >
          {trigger}
        </div>
      )}
      {open && (
        <div
          className="absolute right-6 sm:right-10 md:right-10 lg:right-12 mt-2 w-56 rounded-xl shadow-lg bg-black-haze-50 border-1 border-outer-space-900 z-50
        dark:bg-outer-space-950 dark:border-black-haze-50 "
        >
          <ul className="py-2">
            {menuOptions.map((option, idx) =>
              option.divider ? (
                <li
                  key={idx}
                  className="border-t border-1 border-outer-space-900 my-2 dark:border-black-haze-50"
                ></li>
              ) : (
                <li key={option.label}>
                  <Link
                    to={option.to}
                    className="flex items-center gap-2 px-5 py-2 cursor-pointer hover:bg-black-haze-200 text-outer-space-900 text-lg font-semibold w-full
                    dark:text-white dark:hover:bg-outer-space-800"
                    onClick={() => setOpen(false)}
                  >
                    {option.icon}
                    {option.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
