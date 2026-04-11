import { MapPin, Search, Heart, User, LogOut, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  user?: { email?: string; displayName?: string } | null;
  onLogout?: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Smart Hangout Finder</h1>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-muted-foreground hidden sm:block">
                Hi, {user.displayName || user.email?.split("@")[0]} 👋
              </span>
              <Link to="/favorites" className="p-2 rounded-lg hover:bg-accent transition-colors">
                <Heart className="h-5 w-5 text-muted-foreground" />
              </Link>
              <button onClick={onLogout} className="p-2 rounded-lg hover:bg-accent transition-colors">
                <LogOut className="h-5 w-5 text-muted-foreground" />
              </button>
            </>
          ) : (
            <Link to="/auth" className="flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              <LogIn className="h-4 w-4" /> Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
