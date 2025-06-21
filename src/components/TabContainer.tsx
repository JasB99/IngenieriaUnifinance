import { useState, type ReactElement } from "react";
import TabButton from "./ui/TabButton";

interface TabItem {
  id: string;
  label: string;
}

interface TabContainerProps {
  tabs: TabItem[];
  tabContent: Record<string, ReactElement>;
  initialActiveTab?: string;
}

export default function TabContainer(props: TabContainerProps) {
  const [activeTab, setActiveTab] = useState<string>(
    props.initialActiveTab || "tab1",
  );

  return (
    <div
      className="
    w-[93%] lg:w-[full] 
    rounded-md bg-white p-4 sm:px-5 md:px-4 lg:px-0  
      dark:bg-outer-space-950"
    >
      <div
        className="
      flex flex-wrap border-b font-blinker 
      text-base sm:text-base md:text-lg lg:text-xl
      justify-start
      dark:border-black-haze-50 border-outer-space-900"
      >
        {props.tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
      {props.tabContent[activeTab]}
    </div>
  );
}
