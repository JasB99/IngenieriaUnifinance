import type { ReactElement } from "react";

import Header from "./Header";
import TotalBalanceSection from "./TotalBalanceSection";
import TabContainer from "./TabContainer";

interface headerProps {
  urlImg: string;
  altImg: string;
  button?: React.ReactNode;
}
interface totalBalanceProps {
  titleBalance: string;
  numberBalance: string;
  subtitleIncome: string;
  numberIncome: string;
  subtitleExpense: string;
  numberExpense: string;
}

// Interfaz para un item de Tab (ya la tienes, pero la incluimos por completitud)
interface TabItem {
  id: string;
  label: string;
}

// NUEVA INTERFAZ: Para las props de configuración del TabContainer
interface tabContainerConfigProps {
  tabs: TabItem[];
  tabContent: Record<string, ReactElement>;
  initialActiveTab?: string; // Puede ser opcional
}

interface pageBuilderProps {
  headerProps?: headerProps;
  totalBalanceProps?: totalBalanceProps;
  tabContainerConfig?: tabContainerConfigProps; // AÑADIR NUEVA PROP
}

export default function PageBuilder(props: pageBuilderProps) {
  if (!props.headerProps) return null;
  if (!props.totalBalanceProps) return null;
  if (!props.tabContainerConfig) return null; // AÑADIR VERIFICACIÓN PARA LA NUEVA PROP

  return (
    <div className="bg-white dark:bg-outer-space-950 ">
      <Header {...props.headerProps} />
      <TotalBalanceSection {...props.totalBalanceProps} />
      <div className="flex-grow flex items-center justify-center ">
        <TabContainer
          tabs={props.tabContainerConfig.tabs} // USAR PROP
          tabContent={props.tabContainerConfig.tabContent} // USAR PROP
          initialActiveTab={props.tabContainerConfig.initialActiveTab || "tab1"} // USAR PROP (con valor por defecto si es necesario)
        />
      </div>
    </div>
  );
}
