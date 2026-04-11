import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import LocationSelector from "@/components/LocationSelector";
import CategorySelector from "@/components/CategorySelector";
import PlaceCard from "@/components/PlaceCard";
import { getPlacesByLocationAndCategory, type Location, type Category } from "@/data/places";
import { Search } from "lucide-react";
import { toast } from "sonner";

export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | "">("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", session.user.id)
          .single();
        if (data) setDisplayName(data.display_name);
      }
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        supabase.from("profiles").select("display_name").eq("user_id", session.user.id).single()
          .then(({ data }) => { if (data) setDisplayName(data.display_name); });
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDisplayName("");
    toast.success("Signed out");
  };

  const toggleFavorite = useCallback((placeId: string) => {
    if (!user) {
      toast.error("Please sign in to save favorites");
      navigate("/auth");
      return;
    }
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(placeId)) next.delete(placeId);
      else next.add(placeId);
      return next;
    });
  }, [user, navigate]);

  const results = getPlacesByLocationAndCategory(selectedLocation, selectedCategory, searchQuery);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        user={user ? { email: user.email, displayName } : null}
        onLogout={handleLogout}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/20 py-12 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Discover Real Places in Mumbai
          </h2>
          <p className="text-muted-foreground mb-6">
            Verified cafes, restaurants, parks & hangout spots with real data and Google Maps directions.
          </p>
          <div className="flex items-center bg-card border rounded-xl shadow-sm overflow-hidden max-w-xl mx-auto">
            <Search className="h-5 w-5 text-muted-foreground ml-4 shrink-0" />
            <input
              type="text"
              placeholder="Search places, cuisines, areas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-3 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <LocationSelector selected={selectedLocation} onSelect={setSelectedLocation} />
        <CategorySelector selected={selectedCategory} onSelect={setSelectedCategory} />

        {/* Results header */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            {selectedLocation || selectedCategory
              ? `${selectedCategory || "All"} ${selectedLocation ? `in ${selectedLocation}` : ""}`
              : "All Places"}
          </h3>
          <span className="text-sm text-muted-foreground">{results.length} results</span>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((place) => (
            <PlaceCard
              key={place.id}
              place={place}
              isFavorite={favorites.has(place.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>

        {results.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No places found. Try adjusting your filters.</p>
          </div>
        )}
      </div>

      <footer className="border-t py-6 text-center text-sm text-muted-foreground mt-8">
        <p>Smart Hangout Finder © {new Date().getFullYear()} — Real places, real data</p>
        <p className="mt-1 text-xs">Information may change, verify before visiting</p>
      </footer>
    </div>
  );
}
