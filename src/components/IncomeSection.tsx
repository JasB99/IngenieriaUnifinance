import { useState } from "react";
import Button from "./ui/Button";
import { SlArrowDown } from "react-icons/sl";
interface CategoryOption {
  value: string;
  label: string;
}
//<SlArrowDown />
interface IncomeSectionProps {
  titleForm: string;
  titleInfo: string;
  typeLabel: string;
  amountLabel: string;
  placeholderAmount: string;
  descriptionLabel: string;
  placeholderDescription: string;
  categoryLabel: string;
  dateLabel: string;
  categories: CategoryOption[];
}

interface Income {
  id: string;
  title: string;
  amount: string;
  category: string;
  date: string;
}

// Formato de fecha para mostrar como '07 marzo 2025'
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function IncomeSection(props: IncomeSectionProps) {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  // Estado para almacenar los ingresos
  // Utilizamos un array de objetos Income para manejar los ingresos
  // Cada objeto tiene un id, title, amount, category y date
  const [incomes, setIncomes] = useState<Income[]>([]);

  // Maneja los cambios en el formulario
  // Actualiza el estado del formulario con los valores ingresados
  // Utiliza el evento ChangeEvent para manejar tanto inputs de tipo texto como selects
  const handleFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validaciones simples: asegurarse de que los campos requeridos no estén vacíos
    const { amount, date, category, description } = form;
    if (!amount || isNaN(Number(amount)) || !date || !category) return;

    // Crea un nuevo objeto Income con los datos del formulario
    // Utiliza Date.now() para generar un id único basado en el tiempo actual
    // El título se establece como la descripción o el monto si no hay descripción
    const newIncome: Income = {
      id: Date.now().toString(),
      title: description || amount,
      amount,
      category,
      date,
    };

    // Agrega el nuevo ingreso al array de ingresos
    setIncomes((prev) => [...prev, newIncome]);
    setForm({ amount: "", description: "", category: "", date: "" });
  };

  return (
    <section className="mt-9 text-outer-space-900 bg-white flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:items-start font-blinker mb-5 dark:bg-outer-space-950 ">
      {/* Sección del formulario */}
      <section
        className="bg-black-haze-50 rounded-2xl h-fit 
      w-full lg:w-[35%]
      dark:bg-outer-space-800  dark:text-white"
      >
        <div
          className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl
        dark:border-black-haze-50"
        >
          <h2>{props.titleForm}</h2>
          <p>{props.typeLabel}</p>
        </div>

        <form className="p-5" onSubmit={handleSubmit}>
          {/* Campo para el monto */}
          <div>
            <label className="font-semibold text-xl block">
              {props.amountLabel}
              <input
                className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
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
                dark:outline-black-haze-50 dark:bg-outer-space-800 "
                type="text"
                name="description"
                placeholder={props.placeholderDescription}
                value={form.description}
                onChange={handleFormChange}
              />
            </label>
          </div>

          {/* Campo para la categoría, */}
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
                 dark:outline-black-haze-50 dark:bg-outer-space-800 "
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

          {/* Campo para la fecha */}
          <div>
            <label
              htmlFor="fecha"
              className="block text-xl font-semibold mb-2 mt-3 "
            >
              {props.dateLabel}
            </label>
            <input
              id="fecha"
              name="date"
              type="date"
              className="w-full rounded-md p-3 text-xl font-normal outline-outer-space-900 outline-1 appearance-none
               dark:outline-black-haze-50 dark:bg-outer-space-800 "
              value={form.date}
              onChange={handleFormChange}
            />
          </div>

          {/* Botón para agregar ingreso */}
          <Button
            style="w-full rounded-md  p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
            text="Agregar Ingreso"
          />
        </form>
      </section>

      {/* Sección de información */}
      <section
        className="bg-black-haze-50 rounded-2xl h-fit w-full lg:w-[65%] 
      dark:bg-outer-space-800 dark:text-white "
      >
        <div className="p-5  flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl dark:border-black-haze-50">
          <h2>{props.titleInfo}</h2>
        </div>
        <section className="flex flex-col gap-6 my-6">
          {incomes.length > 0 ? (
            incomes.map((item) => (
              <article
                key={item.id}
                className="p-5 mx-6 bg-white flex justify-between rounded-xl
                dark:bg-outer-space-700"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-sm sm:text-base md:text-base lg:text-base">
                    {item.category}{" "}
                    <br className="block sm:hidden lg:hidden md:hidden" />{" "}
                    <span className="hidden lg:inline md:inline sm:inline">
                      -
                    </span>{" "}
                    {formatDate(item.date)}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <p
                    className="
                  text-base sm:text-xl md:text-xl lg:text-xl 
                  font-bold bg-mustard-300 rounded-md 
                  px-3 sm:px-4 md:px-5 lg:px-6 py-1
                  dark:text-outer-space-900"
                  >
                    ${item.amount}
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-xl  py-6">
              No hay ingresos registrados aún.
            </p>
          )}
        </section>
      </section>
    </section>
  );
}
