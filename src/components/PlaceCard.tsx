import { Place, getGoogleMapsUrl } from "@/data/places";
import { Star, MapPin, Phone, Clock, ExternalLink, Heart, BadgeCheck, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface PlaceCardProps {
  place: Place;
  isFavorite?: boolean;
  onToggleFavorite?: (placeId: string) => void;
}

export default function PlaceCard({ place, isFavorite, onToggleFavorite }: PlaceCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={imgError ? "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600" : place.imageUrl}
          alt={place.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="absolute top-2 left-2 flex gap-1.5">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
            {place.category}
          </span>
          <span className="bg-secondary text-secondary-foreground text-xs font-medium px-2 py-1 rounded-full">
            {place.priceRange}
          </span>
        </div>
        {place.verified && (
          <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <BadgeCheck className="h-3 w-3" /> Verified
          </div>
        )}
        {onToggleFavorite && (
          <button
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(place.id); }}
            className="absolute bottom-2 right-2 p-2 bg-card/80 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-foreground text-base leading-tight">{place.name}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-foreground">{place.rating}</span>
            <span className="text-xs text-muted-foreground">({place.reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground text-xs mb-2">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">{place.address}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{place.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {place.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Info Row */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{place.openHours}</span>
        </div>
        {place.phone && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
            <Phone className="h-3 w-3" />{place.phone}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={getGoogleMapsUrl(place)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-primary-foreground text-sm font-medium py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" /> Open in Maps
          </a>
        </div>

        {/* Trust footer */}
        <div className="mt-3 pt-2 border-t flex items-center gap-1 text-[10px] text-muted-foreground">
          <AlertTriangle className="h-3 w-3" />
          Updated {place.lastUpdated} · Verify before visiting
        </div>
      </div>
    </div>
  );
}
