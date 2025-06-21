import { createFileRoute } from "@tanstack/react-router";

import { type ReactElement, useEffect, useState } from "react";

import ButtonIcon from "../ui/ButtonIcon";
import PageBuilder from "../PageBuilder"; // Asumiendo que este es tu Container

import logoImage from "../../assets/imgs/UnifinanceLogo.png";
import logoImageWhite from "../../assets/imgs/UnifinanceLogoWhite.png";
import personIcon from "../../assets/imgs/person.png";
import personIconWhite from "../../assets/imgs/personWhite.png";

// IMPORTAR LOS COMPONENTES DE SECCIÓN NECESARIOS PARA contentMapping
import IncomeSection from "../IncomeSection"; // Ajusta las rutas según tu estructura
import ShareExpensesSection from "../ShareExpensesSection";
import RemindersSection from "../RemindersSection";
import GoalsSection from "../GoalsSection";
import BudgetSection from "../BudgetSection";

const totalBalanceProps = {
  titleBalance: "Balance Total",
  numberBalance: "$12,400.00",
  subtitleIncome: "Ingresos",
  numberIncome: "+$15,000.00",
  subtitleExpense: "Gastos",
  numberExpense: "-$2,600.00",
};

// DEFINIR LA CONFIGURACIÓN DE LOS TABS AQUÍ
interface TabItem {
  // Puedes definir esta interfaz aquí o importarla si PageBuilder la exporta
  id: string;
  label: string;
}

const tabsConfigData: TabItem[] = [
  { id: "tab1", label: "Ingresos/Gastos" },
  { id: "tab2", label: "Gastos Compartidos" },
  { id: "tab3", label: "Recordatorios" },
  { id: "tab4", label: "Objetivos" },
  { id: "tab5", label: "Presupuesto" },
];

const incomeSectionProps = {
  titleForm: "Registrar Movimiento",
  titleInfo: "Movimientos Recientes",
  typeLabel: "Ingreso",
  amountLabel: "¿Cuánto fue?",
  placeholderAmount: "0.00",
  descriptionLabel: "Descripción",
  placeholderDescription: "Ej: Compras, Salario",
  categoryLabel: "Categoría",
  dateLabel: "Fecha",

  categories: [
    { value: "Alimentacion", label: "Alimentación" },
    { value: "Transporte", label: "Transporte" },
    { value: "Hogar", label: "Hogar" },
    { value: "Entretenimiento", label: "Entretenimiento" },
    { value: "Salud", label: "Salud" },
    { value: "Salario", label: "Salario" },
    { value: "Inversiones", label: "Inversiones" },
    { value: "Otros", label: "Otros" },
  ],
};

//Gastos Compartidos
const shareExpensesProps = {
  titleForm: "Registrar Gasto Compartido",
  titleInfo: "Movimientos Recientes",
  amountLabel: "Monto Total",
  placeholderAmount: "0.00",
  descriptionLabel: "Descripción del Gasto",
  placeholderDescription: "Ej: Compras, Salario",
  categoryLabel: "Categoría",
  dateLabel: "Fecha",

  categories: [
    { value: "Alimentacion", label: "Alimentación" },
    { value: "Transporte", label: "Transporte" },
    { value: "Hogar", label: "Hogar" },
    { value: "Entretenimiento", label: "Entretenimiento" },
    { value: "Salud", label: "Salud" },
    { value: "Salario", label: "Salario" },
    { value: "Inversiones", label: "Inversiones" },
    { value: "Otros", label: "Otros" },
  ],
};

const remindersSection = {
  titleForm: "Agregar Recordatorio",
  titleInfo: "Recordatorios recientes",
  amountLabel: "Titulo",
  placeholderAmount: "Ej: Pago de Servicios",
  dateLabel: "Fecha",
  alertTimeLabel: "¿A qué hora quieres la alerta?", // New prop for the alert time label
  placeholderAlertTime: "HH:MM", // New prop for the alert time placeholder
};

const goalsSectionProps = {
  titleForm: "Agregar Objetivo",
  titleInfo: "Objetivos Recientes",
  titleLabel: "Titulo del Objetivo",
  titlePlaceholder: "Ej: Viaje a la playa",
  amountRequiredLabel: "Monto Requerido",
  amountPlaceholder: "Ej: $0.00",
  accumulatedAmountLabel: "Cantidad Acumulado",
  accumulatedPlaceholder: "Ej: $0.00",
};

const budgetSectionProps = {
  titleForm: "Calcular Presupuesto",
  titleInfo: "Presupuesto",
  titleLabel: "Presupuesto Total",
  titlePlaceholder: "$0.00",
  initialDateLabel: "Fecha Inicial",
  finalDateLabel: "Fecha Final",
  // Añadir las categorías igual que en IncomeSection
  categories: [
    { value: "Alimentacion", label: "Alimentación" },
    { value: "Transporte", label: "Transporte" },
    { value: "Hogar", label: "Hogar" },
    { value: "Entretenimiento", label: "Entretenimiento" },
    { value: "Salud", label: "Salud" },
    { value: "Salario", label: "Salario" },
    { value: "Inversiones", label: "Inversiones" },
    { value: "Otros", label: "Otros" },
  ],
};

const contentMappingData: Record<string, ReactElement> = {
  tab1: <IncomeSection {...incomeSectionProps} />,
  tab2: <ShareExpensesSection {...shareExpensesProps} />,
  tab3: <RemindersSection {...remindersSection} />,
  tab4: <GoalsSection {...goalsSectionProps} />,
  tab5: <BudgetSection {...budgetSectionProps} />,
};

const tabContainerConfigData = {
  tabs: tabsConfigData,
  tabContent: contentMappingData,
  initialActiveTab: "tab1", // Opcional, según cómo lo manejes
};

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function getIsDarkMode() {
  // Prioridad: localStorage > clase en html > sistema
  const stored = localStorage.getItem("theme");
  if (stored) return stored === "dark";
  if (document.documentElement.classList.contains("dark")) return true;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function RouteComponent() {
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

  // Botón dinámico según el modo
  const btnImage = (
    <ButtonIcon
      style="max-w-12 max-h-12 md:max-w-14 md:max-h-14 lg:max-w-14 lg:max-h-14 
      mr-4 lg:mr-10 md:mr-8 sm:mr-10 
      hover:scale-110 transition duration-600 cursor-pointer"
      urlImg={isDarkMode ? personIconWhite : personIcon}
      altImg={isDarkMode ? "person white" : "person"}
    />
  );

  // headerProps dinámico según el modo
  const headerProps = {
    urlImg: isDarkMode ? logoImageWhite : logoImage,
    altImg: isDarkMode ? "Logo Unifinance White" : "Logo Unifinance",
    button: btnImage,
  };

  return (
    <PageBuilder
      headerProps={headerProps}
      totalBalanceProps={totalBalanceProps}
      tabContainerConfig={tabContainerConfigData}
    />
  );
}

export default RouteComponent;
