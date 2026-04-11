import { Location, LOCATIONS } from "@/data/places";
import { MapPin } from "lucide-react";

interface LocationSelectorProps {
  selected: Location | "";
  onSelect: (loc: Location | "") => void;
}

export default function LocationSelector({ selected, onSelect }: LocationSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
        <MapPin className="h-4 w-4 shrink-0" /> Select Location
      </h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelect("")}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !selected
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          }`}
        >
          All
        </button>
        {LOCATIONS.map((loc) => (
          <button
            key={loc}
            onClick={() => onSelect(loc === selected ? "" : loc)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              selected === loc
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-accent"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  );
}
