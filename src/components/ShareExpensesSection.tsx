// HomeSection.tsx (con la funcionalidad de participantes)
import Button from "./ui/Button";
import React, { useState } from "react";
import ParticipantsInput from "./ParticipantsInput";
import { SlArrowDown } from "react-icons/sl";
import { IoCloseCircleOutline } from "react-icons/io5";

interface CategoryOption {
  value: string;
  label: string;
}

interface ShareExpensesProps {
  titleForm: string;
  titleInfo: string;
  amountLabel: string;
  placeholderAmount: string;
  descriptionLabel: string;
  placeholderDescription: string;
  categoryLabel: string;
  dateLabel: string;
  categories: CategoryOption[];
}

export interface ShareExpense {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
  participants: string[];
  isPaid: boolean;
}

// Helper to format date as '07 March 2025'
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ShareExpensesSection(props: ShareExpensesProps) {
  // --- Estado para los participantes ---
  const [participantInput, setParticipantInput] = useState<string>("");
  const [participants, setParticipants] = useState<string[]>([]);

  // Optimized handler functions
  const handleAddParticipant = React.useCallback(() => {
    const trimmed = participantInput.trim();
    if (trimmed !== "" && !participants.includes(trimmed)) {
      setParticipants((prev) => [...prev, trimmed]);
      setParticipantInput("");
    }
  }, [participantInput, participants]);

  const handleRemoveParticipant = React.useCallback((nameToRemove: string) => {
    setParticipants((prev) => prev.filter((name) => name !== nameToRemove));
  }, []);
  // ------------------------------------

  // Form state management (for adding new shared expenses)
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    participants: [],
    isPaid: false,
  });
  const [expenses, setExpenses] = useState<ShareExpense[]>([]);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use participants from state, not from form
    if (!form.amount || !form.date || !form.category || !participants.length)
      return;
    const newExpense = {
      id: Date.now().toString(),
      title: form.description || form.amount,
      amount: form.amount,
      category: form.category,
      date: form.date,
      participants: [...participants],
      isPaid: form.isPaid,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setForm({
      amount: "",
      description: "",
      category: "",
      date: "",
      participants: [],
      isPaid: false,
    });
    setParticipants([]); // Clear participants after submit
  };

  const handleTogglePaid = (id: string) => {
    setExpenses((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPaid: !item.isPaid } : item,
      ),
    );
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section
      className="mt-9 text-outer-space-900 bg-white flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:items-start font-blinker mb-5
       dark:bg-outer-space-950 "
    >
      <section
        className="bg-outer-space-50 rounded-2xl  h-fit w-full lg:w-[35%]
      dark:bg-outer-space-800 dark:text-white"
      >
        <div
          className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleForm}</h2>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          {/* Campo para el monto */}
          <div>
            <label className="font-semibold text-xl block">
              {props.amountLabel}
              <input
                className="w-full rounded-md  p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:bg-outer-space-800 dark:outline-black-haze-50"
                type="number"
                name="amount"
                placeholder={props.placeholderAmount}
                value={form.amount}
                onChange={handleFormChange}
              />
            </label>
          </div>

          {/* Campo para la descripción */}
          <div>
            <label className="font-semibold text-xl mt-3 block">
              {props.descriptionLabel}
              <input
                className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:bg-outer-space-800 dark:outline-black-haze-50"
                type="text"
                name="description"
                placeholder={props.placeholderDescription}
                value={form.description}
                onChange={handleFormChange}
              />
            </label>
          </div>

          {/* Campo para la categoría */}
          <div>
            <label
              htmlFor="categoria"
              className="block text-xl font-semibold mt-3 mb-2 "
            >
              {props.categoryLabel}
            </label>
            <div className="relative">
              <select
                id="categoria"
                name="category"
                className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 appearance-none pr-10 cursor-pointer 
                dark:bg-outer-space-800 dark:outline-black-haze-50"
                value={form.category}
                onChange={handleFormChange}
              >
                <option value="">Seleccionar categoría</option>
                {props.categories.map((cat) => (
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

          {/* --- Sección de Participantes como subcomponente --- */}
          <ParticipantsInput
            participantInput={participantInput}
            participants={participants}
            onInputChange={setParticipantInput}
            onAddParticipant={handleAddParticipant}
            onRemoveParticipant={handleRemoveParticipant}
          />
          {/* ------------------------------------------------ */}

          {/* Campo para la fecha */}
          <div>
            <label htmlFor="fecha" className="block text-xl font-semibold  ">
              {props.dateLabel}
            </label>
            <input
              id="fecha"
              name="date"
              type="date"
              className="w-full rounded-md outline-outer-space-900 outline-1 p-3 text-xl font-normal mt-2 mb-3
              dark:bg-outer-space-800 dark:outline-black-haze-50"
              value={form.date}
              onChange={handleFormChange}
            />
          </div>

          {/* Checkbox para indicar si el gasto está pagado */}
          <div>
            <label className="flex items-center gap-1 mt-3">
              <input
                type="checkbox"
                name="isPaid"
                checked={form.isPaid}
                onChange={handleFormChange}
              />
              Pagado
            </label>
          </div>

          {/* Botón para enviar el formulario */}
          <Button
            style="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-6 mb-3 animation ease-in-out duration-400"
            text="Ingresar Gasto Compartido"
          />
        </form>
      </section>

      {/* Sección de información */}
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[65%]
      dark:bg-outer-space-800 dark:outline-black-haze-50 dark:text-white"
      >
        <div
          className="p-5 flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleInfo}</h2>
        </div>
        <section className="flex flex-col gap-6 my-6">
          {expenses.length > 0 ? (
            expenses.map((item) => (
              <article
                key={item.id}
                className="relative p-5 mx-6 bg-white flex flex-col sm:flex-row md:flex-row lg:flex-row items-start  sm:items-center sm:justify-between rounded-xl
                dark:bg-outer-space-700 dark:outline-black-haze-50 "
              >
                {/* Delete X icon */}
                <button
                  type="button"
                  className="cursor-pointer absolute top-2 right-2 p-2 text-cornflower-blue-400 hover:text-cornflower-blue-600 focus:outline-none
                  "
                  aria-label="Eliminar gasto compartido"
                  onClick={() => handleDeleteExpense(item.id)}
                >
                  <IoCloseCircleOutline className=" text-2xl" />
                </button>
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p>
                    {item.category} - {formatDate(item.date)}
                  </p>
                  <div className="flex flex-row gap-1.5 flex-wrap ">
                    {item.participants.map((p: string) => (
                      <span
                        key={p}
                        className="font-semibold bg-black-haze-50 rounded-md px-2 py-0.5 text-sm 
                         dark:bg-outer-space-950 dark:text-black-haze-50"
                      >
                        {p}: $
                        {(
                          Number(item.amount) / item.participants.length
                        ).toFixed(2)}
                      </span>
                    ))}
                  </div>
                  <p className=" text-outer-space-700 dark:text-white">
                    {item.participants.length} participantes
                  </p>
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:gap-14 md:gap-14 lg:gap-14 sm:w-auto ">
                  <p className="text-xl sm:text-right md:text-right lg:text-right">
                    ${item.amount}
                  </p>
                  <p
                    className={` text-center text-base sm:text-xl md:text-xl lg:text-xl font-bold rounded-md px-6 py-1 cursor-pointer select-none ${item.isPaid ? "bg-cornflower-blue-400 text-white" : "bg-mustard-300 text-zinc-900 dark:"}`}
                    onClick={() => handleTogglePaid(item.id)}
                    title="Haz clic para cambiar el estado de pago"
                  >
                    {item.isPaid ? "Pagado" : "Pendiente"}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-xl  py-6">
              No hay gastos compartidos aún.
            </p>
          )}
        </section>
      </section>
    </section>
  );
}
