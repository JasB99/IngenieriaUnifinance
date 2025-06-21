import React from "react";

interface ParticipantsInputProps {
  participantInput: string;
  participants: string[];
  onInputChange: (value: string) => void;
  onAddParticipant: () => void;
  onRemoveParticipant: (name: string) => void;
}

const ParticipantsInput: React.FC<ParticipantsInputProps> = ({
  participantInput,
  participants,
  onInputChange,
  onAddParticipant,
  onRemoveParticipant,
}) => {
  // Handler for Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddParticipant();
    }
  };

  return (
    <div className="mt-3">
      <label
        htmlFor="participantes"
        className="block text-xl font-semibold mb-2 text-outer-space-900 dark:text-white"
      >
        Participantes
      </label>
      <div className="flex gap-2 mb-3 items-center">
        <input
          id="participantes"
          name="participantes"
          type="text"
          className="flex-grow rounded-md  p-3 text-xl font-normal outline-outer-space-900 outline-1
          dark:outline-black-haze-50 dark:bg-outer-space-800"
          placeholder="Nombre"
          value={participantInput}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Agregar participante"
        />
        <button
          type="button"
          onClick={onAddParticipant}
          className="outline-1 outline-outer-space-900 hover:bg-outer-space-900 hover:text-white cursor-pointer text-outer-space-900 rounded-md p-3 text-xl font-semibold h-full w-12 flex items-center justify-center animation ease-in-out duration-400
          dark:outline-black-haze-50 dark:hover:bg-black-haze-50 dark:hover:text-outer-space-900 dark:text-white"
          aria-label="Agregar participante"
        >
          +
        </button>
      </div>
      {/* Chips de Participantes */}
      <div className="flex flex-wrap gap-2">
        {participants.map((participant) => (
          <span
            key={participant}
            className="bg-white text-cornflower-blue-400 px-3 py-1 mb-1 rounded-full text-lg flex items-center gap-1
            dark:bg-outer-space-950 dark:text-black-haze-50"
          >
            {participant}
            <button
              type="button"
              onClick={() => onRemoveParticipant(participant)}
              className="ml-1 text-cornflower-blue-400 hover:text-cornflower-blue-600 font-bold leading-none cursor-pointer animation ease-in-out duration-400
              dark:text-black-haze-50 dark:hover:text-black-haze-200"
              aria-label={`Eliminar participante ${participant}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default ParticipantsInput;
