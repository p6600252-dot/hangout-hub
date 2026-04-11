import { Category } from "@/data/places";
import { Coffee, UtensilsCrossed, ShoppingBag, Zap, TreePine, Sparkles } from "lucide-react";

const CATEGORIES: { name: Category; icon: typeof Coffee; color: string }[] = [
  { name: "Cafes", icon: Coffee, color: "text-amber-600" },
  { name: "Restaurants", icon: UtensilsCrossed, color: "text-red-500" },
  { name: "Malls", icon: ShoppingBag, color: "text-pink-500" },
  { name: "Fast Food", icon: Zap, color: "text-orange-500" },
  { name: "Parks", icon: TreePine, color: "text-green-600" },
  { name: "Hangout Spots", icon: Sparkles, color: "text-purple-500" },
];

interface CategorySelectorProps {
  selected: Category | "";
  onSelect: (cat: Category | "") => void;
}

export default function CategorySelector({ selected, onSelect }: CategorySelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-muted-foreground mb-3">Browse Categories</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.name}
              onClick={() => onSelect(cat.name === selected ? "" : cat.name)}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all ${
                selected === cat.name
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-card-foreground border-border hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <Icon className={`h-5 w-5 ${selected === cat.name ? "" : cat.color}`} />
              <span className="text-xs font-medium leading-tight text-center">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
