interface TotalBalanceProps {
  titleBalance: string;
  numberBalance: string;

  subtitleIncome: string;
  numberIncome: string;

  subtitleExpense: string;
  numberExpense: string;
}

export default function TotalBalanceSection(props: TotalBalanceProps) {
  return (
    <section
      className="
    w-[88%] md:w-[90%] lg:w-[93%]
    p-5 lg:p-7
    dark:bg-shamrock-700 bg-shamrock-400 text-white font-blinker rounded-lg
    flex justify-between items-center gap-2
    relative left-1/2 transform -translate-x-1/2
    mt-10
  "
    >
      <div className="flex flex-col">
        <h2 className="text-base mb-2 lg:text-xl lg:mb-1">
          {props.titleBalance}
        </h2>
        <p className="text-2xl md:text-3xl lg:text-5xl font-semibold">
          {props.numberBalance}
        </p>
      </div>
      <div
        className="
      flex flex-row items-center justify-center text-center
      gap-3 sm:gap-x-20 md:gap-x-32 lg:gap-x-48
      mr-1 md:mr-20 lg:mr-52 sm:mr-14
    "
      >
        <div className="flex flex-col">
          <h3 className="text-base lg:text-xl font-normal">
            {props.subtitleIncome}
          </h3>
          <p className="text-base lg:text-lg font-normal">
            {props.numberIncome}
          </p>
        </div>

        <div className="flex flex-col">
          <h3 className="text-base lg:text-xl font-normal">
            {props.subtitleExpense}
          </h3>
          <p className="text-base lg:text-lg font-normal">
            {props.numberExpense}
          </p>
        </div>
      </div>
    </section>
  );
}
