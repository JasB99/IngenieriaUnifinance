import { useState } from "react";
import { FiDollarSign } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";

interface CategoryOption {
  value: string;
  label: string;
}

interface BudgetSectionProps {
  titleForm: string;
  titleInfo: string;
  titleLabel: string;
  titlePlaceholder: string;
  initialDateLabel: string;
  finalDateLabel: string;
  categories: CategoryOption[]; // Añadido para recibir categorías
}

export default function BudgetSection(props: BudgetSectionProps) {
  // State for the form
  const [form, setForm] = useState({
    title: "",
    initialDate: "",
    finalDate: "",
  });
  const [budget, setBudget] = useState<string | null>(null);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // State for categories added to the budget
  const [categories, setCategories] = useState<
    { name: string; amount: string }[]
  >([]);

  // Saved dates when budget is set
  const [savedInitialDate, setSavedInitialDate] = useState("");
  const [savedFinalDate, setSavedFinalDate] = useState("");

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit (for now, just prevent default and clear form)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBudget(form.title);
    setSavedInitialDate(form.initialDate);
    setSavedFinalDate(form.finalDate);
    setIsEditingBudget(false);
    setForm({ title: "", initialDate: "", finalDate: "" });
  };

  // Handler for adding a category
  const handleAddCategory = () => {
    if (category && amount) {
      setCategories((prev) => [...prev, { name: category, amount }]);
      setCategory("");
      setAmount("");
    }
  };

  // UI state: show only budget+dates at first, then show category/amount after budget is set
  const showBudgetForm = !budget || isEditingBudget;

  // Helper to format date as '15 abril 2025'
  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <section
      className="mt-9 text-outer-space-900 bg-white flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:items-start font-blinker mb-5
  dark:bg-outer-space-950 dark:text-white "
    >
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[35%]
      dark:bg-outer-space-800"
      >
        <div
          className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleForm}</h2>
        </div>

        <form className="p-5" onSubmit={handleFormSubmit}>
          {/* Presupuesto Total */}
          <div>
            <label className="font-semibold text-xl  block">
              {props.titleLabel}
            </label>

            {/* Input for budget amount */}
            <div className="flex items-center relative">
              <span className="absolute left-3 mt-2.5 text-xl ">
                <FiDollarSign />
              </span>
              <input
                className="w-full rounded-md p-3 pl-10 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
                type="number"
                name="title"
                placeholder={props.titlePlaceholder}
                value={
                  budget && !isEditingBudget
                    ? Number(budget).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })
                    : form.title
                }
                onChange={handleFormChange}
                disabled={!showBudgetForm}
              />
              {budget && !isEditingBudget && (
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-cornflower-blue-500"
                  onClick={() => {
                    setIsEditingBudget(true);
                    setForm({ ...form, title: budget || "" });
                  }}
                >
                  <span>
                    <FaRegEdit className="text-3xl mt-1  hover:text-cornflower-blue-500 cursor-pointer" />
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Initial/Final Date (only when adding/editing budget) */}
          {showBudgetForm && (
            <>
              <div className="mt-3">
                <label className="block text-xl font-semibold ">
                  {props.initialDateLabel}
                </label>
                <input
                  name="initialDate"
                  type="date"
                  className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                  dark:outline-black-haze-50 dark:bg-outer-space-800"
                  value={form.initialDate}
                  onChange={handleFormChange}
                  disabled={!showBudgetForm}
                />
              </div>
              {/* Final Date */}
              <div className="mt-3">
                <label className="block text-xl font-semibold  ">
                  {props.finalDateLabel}
                </label>
                <input
                  name="finalDate"
                  type="date"
                  className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2 
                  dark:outline-black-haze-50 dark:bg-outer-space-800"
                  value={form.finalDate}
                  onChange={handleFormChange}
                  disabled={!showBudgetForm}
                />
              </div>
            </>
          )}

          {/* Category/Amount (only after budget is set and not editing) */}
          {!showBudgetForm && (
            <>
              <div className="mt-3">
                <label className="font-semibold text-xl mb-2 block ">
                  Categoría
                </label>
                <div className="relative">
                  <select
                    id="categoria"
                    name="category"
                    className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 appearance-none pr-10 cursor-pointer dark:outline-black-haze-50 dark:bg-outer-space-800 "
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Seleccionar categoría</option>
                    {props.categories &&
                      props.categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                    <SlArrowDown className="w-4 h-4 outline-outer-space-900" />
                  </div>
                </div>
              </div>

              {/* Input for amount */}
              <div className="mt-3">
                <label className="font-semibold text-xl mb-2 block ">
                  Agregar Monto
                </label>
                <div className="flex items-center relative">
                  <span className="absolute left-3 mt-0.5 text-xl ">
                    <FiDollarSign />
                  </span>
                  <input
                    className="w-full rounded-md p-3 pl-10 text-xl font-normal outline-outer-space-900 outline-1 mt-2 dark:outline-black-haze-50 dark:bg-outer-space-800"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full rounded-md p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
                onClick={handleAddCategory}
              >
                Agregar Categoría
              </button>
            </>
          )}

          {/* Guardar Presupuesto button only if editing or not set */}
          {showBudgetForm && (
            <button
              type="submit"
              className="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
            >
              Guardar Presupuesto
            </button>
          )}
        </form>
      </section>

      {/* Sección de información de presupuesto */}
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[65%]
      dark:bg-outer-space-800 "
      >
        <div
          className="p-5 flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl w-full
        dark:border-black-haze-50"
        >
          <h2>{props.titleInfo}</h2>
        </div>
        <div className="w-full flex flex-col gap-6 my-6">
          {/* Main budget card */}
          {budget ? (
            <>
              <div
                className="bg-white rounded-2xl p-8 
              flex flex-col sm:flex-row md:flex-row lg:flex-row 
              justify-between  mx-6
              dark:bg-outer-space-700 "
              >
                <div>
                  <div className="font-semibold text-2xl mb-2">
                    Presupuesto Total
                  </div>
                  <div className="text-xl  mb-2">
                    $
                    {Number(budget).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-lg ">
                    {formatDate(savedInitialDate)} -{" "}
                    {formatDate(savedFinalDate)}
                  </div>
                </div>
                <div
                  className="flex justify-between flex-row sm:flex-col md:flex-col lg:flex-col 
                 sm:items-end md:items-end lg:items-end gap-6 mt-2 sm:mt-auto md:mt-auto lg:mt-auto"
                >
                  <div className="flex items-end text-xl ">
                    $
                    {Number(budget).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </div>
                  <div className="text-2xl ">100%</div>
                </div>
              </div>

              {/* Category cards */}
              {categories.map((cat, idx) => {
                const percent = budget
                  ? Math.round((Number(cat.amount) / Number(budget)) * 100)
                  : 0;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-8 flex flex-col sm:flex-row md:flex-row lg:flex-row justify-between mx-6
                    dark:bg-outer-space-700 "
                  >
                    <div>
                      <div className="font-semibold text-2xl mb-2">
                        Presupuesto Total
                      </div>
                      <div className="text-xl mb-2">
                        $
                        {Number(budget).toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </div>
                      <div className="text-lg ">
                        {formatDate(savedInitialDate)} -{" "}
                        {formatDate(savedFinalDate)}
                      </div>
                    </div>

                    <div className="flex justify-between flex-col sm:flex-col md:flex-col lg:flex-col sm:items-end md:items-end lg:items-end mt-2 sm:mt-auto md:mt-auto lg:mt-auto">
                      <div className="font-semibold text-2xl">{cat.name}</div>
                      <div className="flex flex-row justify-between sm:flex-col md:flex-col lg:flex-col sm:items-end md:items-end lg:items-end gap-2">
                        <div className="text-xl flex items-end">
                          $
                          {Number(cat.amount).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                        <div className="text-2xl">{percent}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="text-center text-xl py-6">Agregar Presupuesto</p>
          )}
        </div>
      </section>
    </section>
  );
}
