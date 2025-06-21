import React, { useState } from "react";
import Button from "./ui/Button"; // Assuming you have a Button component
import { FaRegTrashAlt } from "react-icons/fa"; // Import the trash icon

interface RemindersSectionProps {
  titleForm: string;
  titleInfo: string;
  amountLabel: string;
  placeholderAmount: string;
  dateLabel: string;
  alertTimeLabel: string; // New prop for the alert time label
  placeholderAlertTime?: string; // Optional prop for the alert time input placeholder
  // The 'button' prop is no longer needed since you're using your custom Button component directly
}

// Define an interface for your reminder items to structure the data
interface Reminder {
  id: string;
  title: string;
  date: string;
  alertTime: string;
}

// Helper to format date as '07 March 2025' and time as '08:00 am'
function formatDate(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatTime(timeString: string) {
  if (!timeString) return "";
  // timeString is expected as 'HH:mm' (24h)
  const [hour, minute] = timeString.split(":");
  let h = Number(hour);
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12;
  if (h === 0) h = 12;
  return `${h.toString().padStart(2, "0")}:${minute} ${ampm}`;
}

export default function RemindersSection(props: RemindersSectionProps) {
  // Form state management (for adding new reminders)
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
    alertTime: "",
  });

  // State to manage your reminder items
  const [reminders, setReminders] = useState<Reminder[]>([]);

  // Handle form input changes
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission to add a new reminder
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.alertTime) return;
    const newReminder: Reminder = {
      id: Date.now().toString(),
      title: form.amount, // You can adjust this to use a different field for title
      date: form.date,
      alertTime: form.alertTime,
    };
    setReminders((prev) => [...prev, newReminder]);
    setForm({
      amount: "",
      description: "",
      category: "",
      date: "",
      alertTime: "",
    });
  };

  // Handle deleting a reminder
  const handleDeleteItem = (id: string) => {
    setReminders((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section
      className="mt-9 text-outer-space-900 bg-white flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 lg:items-start font-blinker mb-5
       dark:bg-outer-space-950 dark:text-white"
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

        <form className="p-5" onSubmit={handleSubmit}>
          {/* Input for the amount */}
          <div>
            <label className="font-semibold text-xl block">
              {props.amountLabel}
              <input
                className="w-full rounded-md  p-3 text-xl font-normal outline-outer-space-900 outline-1 mt-2
                dark:outline-black-haze-50 dark:bg-outer-space-800"
                type="text"
                name="amount"
                placeholder={props.placeholderAmount}
                value={form.amount}
                onChange={handleFormChange}
              />
            </label>
          </div>

          {/* New block for Alert Time */}
          <div className="mt-3">
            <label htmlFor="alertTime" className="block text-xl font-semibold ">
              {props.alertTimeLabel}
            </label>
            <input
              id="alertTime"
              name="alertTime"
              type="time" // Use type="time" for time input
              className="w-full rounded-md outline-outer-space-900 outline-1 p-3 text-xl font-normal mt-2
              dark:outline-black-haze-50 dark:bg-outer-space-800"
              value={form.alertTime}
              onChange={handleFormChange}
              placeholder={props.placeholderAlertTime} // Use the new placeholder prop
            />
          </div>

          {/* Input for the date */}
          <div className="mt-3">
            <label htmlFor="fecha" className="block text-xl font-semibold ">
              {props.dateLabel}
            </label>
            <input
              id="fecha"
              name="date"
              type="date"
              className="w-full rounded-md outline-outer-space-900 outline-1 p-3 text-xl font-normal mt-2
              dark:outline-black-haze-50 dark:bg-outer-space-800"
              value={form.date}
              onChange={handleFormChange}
            />
          </div>

          <Button
            style="w-full rounded-md p-3 text-xl font-normal bg-cornflower-blue-400 hover:bg-cornflower-blue-500 cursor-pointer text-white mt-10 mb-3 animation ease-in-out duration-400"
            text="Agregar Recordatorio"
          />
        </form>
      </section>

      {/* Sección de información */}
      <section
        className="bg-outer-space-50 rounded-2xl h-fit w-full lg:w-[65%]
      dark:bg-outer-space-800 "
      >
        <div className="p-5 flex flex-row items-center justify-between border-b border-outer-space-900 font-semibold text-xl dark:border-black-haze-50 ">
          <h2>{props.titleInfo}</h2>
        </div>
        <section className="flex flex-col gap-6 my-6">
          {/* Dynamically render reminders from state */}
          {reminders.length > 0 ? (
            reminders.map((item) => (
              <article
                key={item.id}
                className="p-5 mx-6 bg-white flex justify-between items-center rounded-xl
                dark:bg-outer-space-700"
              >
                <div className="flex flex-col gap-4">
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p>
                    {formatTime(item.alertTime)} - {formatDate(item.date)}
                  </p>
                </div>
                {/* Delete button */}
                <div>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-2 cursor-pointer hover:text-cornflower-blue-400 focus:outline-none focus:ring-2 focus:ring-outer-space-900 rounded-full"
                    aria-label={`Eliminar ${item.title}`}
                  >
                    <FaRegTrashAlt className="text-2xl" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="text-center text-xl  py-6">
              No hay recordatorios para mostrar.
            </p>
          )}
        </section>
      </section>
    </section>
  );
}
