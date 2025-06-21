import { useState } from "react";
import Button from "./ui/Button";

interface Goal {
  id: string;
  title: string;
  requiredAmount: string;
  accumulatedAmount: string;
}

interface GoalsSectionProps {
  titleForm: string;
  titleInfo: string;
  titleLabel: string;
  titlePlaceholder: string;
  amountRequiredLabel: string;
  amountPlaceholder: string;
  accumulatedAmountLabel: string;
  accumulatedPlaceholder: string;
}

export default function GoalsSection(props: GoalsSectionProps) {
  // State for all goals
  const [goals, setGoals] = useState<Goal[]>([]);
  // State for the form (used for add/edit)
  const [form, setForm] = useState({
    id: "",
    title: "",
    requiredAmount: "",
    accumulatedAmount: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update a goal
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.requiredAmount || !form.accumulatedAmount) return;
    if (isEditing) {
      setGoals((prev) =>
        prev.map((g) =>
          g.id === form.id
            ? {
                ...g,
                title: form.title,
                requiredAmount: form.requiredAmount,
                accumulatedAmount: form.accumulatedAmount,
              }
            : g,
        ),
      );
    } else {
      setGoals((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          title: form.title,
          requiredAmount: form.requiredAmount,
          accumulatedAmount: form.accumulatedAmount,
        },
      ]);
    }
    setForm({ id: "", title: "", requiredAmount: "", accumulatedAmount: "" });
    setIsEditing(false);
  };

  // Edit a goal
  const handleEditGoal = (goal: Goal) => {
    setForm(goal);
    setIsEditing(true);
  };

  // Delete a goal
  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
    if (form.id === id) {
      setForm({ id: "", title: "", requiredAmount: "", accumulatedAmount: "" });
      setIsEditing(false);
    }
  };

  return (
    <section
      className="mt-9 text-outer-space-900 bg-white flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:items-start font-blinker mb-5
    dark:bg-outer-space-950 dark:text-white"
    >
      {/* Formulario de metas */}
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[35%]
      dark:bg-outer-space-800 dark:text-white"
      >
        <div
          className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleForm || "Metas"}</h2>
        </div>
        <form className="p-5" onSubmit={handleFormSubmit}>
          {/* Campo para el título de la meta */}
          <div>
            <label className="font-semibold text-xl block">
              {props.titleLabel}
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
              dark:outline-black-haze-50 dark:bg-outer-space-800"
              type="text"
              name="title"
              placeholder={props.titlePlaceholder}
              value={form.title}
              onChange={handleFormChange}
            />
          </div>

          {/* Campo para el monto requerido */}
          <div>
            <label className="font-semibold text-xl mt-3  block">
              {props.amountRequiredLabel}
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
              dark:outline-black-haze-50 dark:bg-outer-space-800"
              type="number"
              name="requiredAmount"
              placeholder={props.amountPlaceholder}
              value={form.requiredAmount}
              onChange={handleFormChange}
            />
          </div>

          {/* Campo para el monto acumulado */}
          <div>
            <label className="font-semibold text-xl block mt-3">
              {props.accumulatedAmountLabel}
            </label>
            <input
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
              dark:outline-black-haze-50 dark:bg-outer-space-800"
              type="number"
              name="accumulatedAmount"
              placeholder={props.accumulatedPlaceholder}
              value={form.accumulatedAmount}
              onChange={handleFormChange}
            />
          </div>
          <Button
            style="w-full rounded-md p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
            text={isEditing ? "Guardar Cambios" : "Agregar Objetivo"}
          />
        </form>
      </section>

      {/* Sección de información de metas */}
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[65%]
      dark:bg-outer-space-800 "
      >
        <div
          className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleInfo || "Tus Metas"}</h2>
        </div>
        <section className="flex flex-col gap-6 my-6">
          {goals.length > 0 ? (
            goals.map((goal) => {
              const progress = Math.min(
                100,
                (Number(goal.accumulatedAmount) / Number(goal.requiredAmount)) *
                  100 || 0,
              );
              return (
                <article
                  key={goal.id}
                  className="p-5 mx-6 bg-white flex flex-col rounded-xl
                  dark:bg-outer-space-700"
                >
                  <div className="flex flex-row justify-between items-center mb-2">
                    <h3 className="font-semibold text-xl">{goal.title}</h3>
                    <div className="flex gap-4">
                      {/* Edit Icon */}
                      <button
                        className="hover:text-cornflower-blue-400 cursor-pointer"
                        onClick={() => handleEditGoal(goal)}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      {/* Delete Icon */}
                      <button
                        className="hover:text-cornflower-blue-400 cursor-pointer"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          viewBox="0 0 24 24"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
                          <line x1="10" y1="11" x2="10" y2="17" />
                          <line x1="14" y1="11" x2="14" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center mb-2">
                    <span className="text-lg font-medium ">
                      ${Number(goal.accumulatedAmount).toFixed(2)}
                    </span>
                    <span className="text-lg font-medium ">
                      ${Number(goal.requiredAmount).toFixed(2)}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-mustard-400 rounded-full relative">
                    <div
                      className="h-1 rounded-full bg-cornflower-blue-400 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="text-center text-xl  py-6">
              No hay metas registradas.
            </p>
          )}
        </section>
      </section>
    </section>
  );
}
