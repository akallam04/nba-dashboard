import Image from "next/image";
import type { Player } from "@/types";

interface PlayerCardProps {
  player: Player;
  accentColor: string;
}

export function PlayerCard({ player, accentColor }: PlayerCardProps) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-elevated border border-border">
      <div
        className="relative w-10 h-10 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-sm font-display font-bold"
        style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
      >
        {player.strThumb ? (
          <Image
            src={player.strThumb}
            alt={`${player.strPlayer} photo`}
            fill
            sizes="40px"
            className="object-cover"
          />
        ) : (
          <span aria-hidden="true">
            {player.strPlayer.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-primary truncate leading-tight">
          {player.strPlayer}
        </p>
        <p className="text-xs text-muted truncate">
          {[player.strPosition, player.strNumber ? `#${player.strNumber}` : null]
            .filter(Boolean)
            .join(" · ") || "Player"}
        </p>
      </div>
    </div>
  );
}
