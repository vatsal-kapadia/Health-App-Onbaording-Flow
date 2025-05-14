
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Option {
  id: string;
  label: string;
}

interface MultiSelectChipsProps {
  options: Option[];
  onChange: (selectedIds: string[]) => void;
}

const MultiSelectChips = ({ options, onChange }: MultiSelectChipsProps) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(item => item !== id)
      : [...selected, id];
    
    setSelected(newSelected);
    onChange(newSelected);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => toggleOption(option.id)}
          className={cn(
            "chip",
            selected.includes(option.id) ? "chip-active" : "chip-inactive"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default MultiSelectChips;
