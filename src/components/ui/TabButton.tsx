interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function TabButton(props: TabButtonProps) {
  const buttonClasses = `
   px-3 sm:px-2 md:px-3 lg:px-4 py-2 
   font-semibold cursor-pointer animation ease-in-out duration-400 "
    ${
      props.isActive
        ? "border-b-4 border-cornflower-blue-400 text-cornflower-blue-400 transition duration-600"
        : "dark:text-white text-outer-space-900 hover:text-cornflower-blue-400  hover:scale-110 transition duration-400"
    }
  `;

  return (
    <button className={buttonClasses} onClick={props.onClick}>
      {props.label}
    </button>
  );
}
