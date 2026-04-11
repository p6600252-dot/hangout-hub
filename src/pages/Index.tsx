import { MapPin, Search, Coffee, UtensilsCrossed, ShoppingBag, TreePine, Sparkles } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Cafes", icon: Coffee },
  { name: "Restaurants", icon: UtensilsCrossed },
  { name: "Malls", icon: ShoppingBag },
  { name: "Parks", icon: TreePine },
  { name: "Hangout Spots", icon: Sparkles },
];

const locations = [
  "Bandra", "Andheri", "Malad", "Juhu", "Powai",
  "Colaba", "Lower Parel", "Worli", "Dadar", "Kurla",
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Smart Hangout Finder</h1>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/30 py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Discover Real Places Near You
          </h2>
          <p className="text-muted-foreground mb-8">
            Find cafes, restaurants, parks and hangout spots with real data, real reviews, and real directions.
          </p>

          {/* Search Bar */}
          <div className="flex items-center bg-card border rounded-xl shadow-sm overflow-hidden max-w-xl mx-auto">
            <Search className="h-5 w-5 text-muted-foreground ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Location Selector */}
      <section className="container mx-auto px-4 py-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Select Location
        </h3>
        <div className="flex flex-wrap gap-2">
          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc === selectedLocation ? "" : loc)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLocation === loc
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              {loc}
            </button>
          ))}
        </div>
      </section>

      {/* Category Selector */}
      <section className="container mx-auto px-4 py-6">
        <h3 className="text-sm font-semibold text-muted-foreground mb-3">Browse Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-card-foreground border-border hover:border-primary/50"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Results placeholder */}
      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-muted-foreground">
          {selectedLocation || selectedCategory
            ? `Showing results for ${[selectedCategory, selectedLocation].filter(Boolean).join(" in ")}...`
            : "Select a location and category to discover places"}
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        <p>Smart Hangout Finder &copy; {new Date().getFullYear()} — Real places, real data</p>
        <p className="mt-1 text-xs">Information may change, verify before visiting</p>
      </footer>
    </div>
  );
}
