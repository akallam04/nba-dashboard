import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeam, getTeamPlayers } from "@/lib/api";
import { normalizeColor, normalizeSocialUrl } from "@/lib/utils";
import type { Team } from "@/types";
import { PlayerCard } from "@/components/PlayerCard";

interface TeamPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: TeamPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const team = await getTeam(id);
    return {
      title: team.strTeam,
      description: team.strDescriptionEN?.slice(0, 160) ?? undefined,
    };
  } catch {
    return { title: "Team Not Found" };
  }
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { id } = await params;

  let team;
  try {
    team = await getTeam(id);
  } catch {
    notFound();
  }

  const players = await getTeamPlayers(id);
  const accentColor = normalizeColor(team.strColour1);
  const secondaryColor = normalizeColor(team.strColour2 || team.strColour1);
  const websiteUrl = normalizeSocialUrl(team.strWebsite, "website");
  const description = team.strDescriptionEN?.trim();
  const paragraphs = description
    ? description.split(/\r?\n\r?\n/).filter(Boolean).slice(0, 3)
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-primary transition-colors duration-150 mb-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
        aria-label="Back to all teams"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-150 group-hover:-translate-x-0.5"
          aria-hidden="true"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        All teams
      </Link>

      {/* Hero */}
      <div
        className="relative rounded-2xl overflow-hidden border border-border mb-10"
        style={{
          background: `linear-gradient(135deg, ${accentColor}20 0%, transparent 50%)`,
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-0.5"
          style={{
            background: `linear-gradient(to right, ${accentColor}, ${secondaryColor})`,
          }}
          aria-hidden="true"
        />
        <div className="p-6 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Badge */}
          <div className="shrink-0 flex flex-col items-center gap-4">
            <div
              className="relative w-36 h-36 md:w-48 md:h-48 rounded-2xl flex items-center justify-center p-4"
              style={{ backgroundColor: `${accentColor}15` }}
            >
              {team.strBadge ? (
                <Image
                  src={team.strBadge}
                  alt={`${team.strTeam} official badge`}
                  fill
                  sizes="(max-width: 768px) 144px, 192px"
                  className="object-contain p-3"
                  priority
                />
              ) : (
                <span className="text-6xl select-none" aria-hidden="true">
                  🏀
                </span>
              )}
            </div>
            {team.strEquipment && (
              <div
                className="relative w-16 h-16 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}10` }}
              >
                <Image
                  src={team.strEquipment}
                  alt={`${team.strTeam} jersey`}
                  fill
                  sizes="64px"
                  className="object-contain p-1"
                />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="mb-1">
              {team.strTeamShort && (
                <span className="text-xs font-mono uppercase tracking-widest text-muted">
                  {team.strTeamShort}
                </span>
              )}
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-primary leading-tight mb-4 tracking-tight">
              {team.strTeam}
            </h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {team.strLeague && (
                <span
                  className="inline-flex items-center h-7 px-3 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${accentColor}20`,
                    color: accentColor,
                    border: `1px solid ${accentColor}40`,
                  }}
                >
                  {team.strLeague}
                </span>
              )}
              {team.strDivision && (
                <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-medium bg-surface text-secondary border border-border">
                  {team.strDivision}
                </span>
              )}
              {team.strCountry && (
                <span className="inline-flex items-center h-7 px-3 rounded-full text-xs font-medium bg-surface text-secondary border border-border">
                  {team.strCountry}
                </span>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <StatCard label="Founded" value={team.intFormedYear || "—"} />
              <StatCard
                label="Arena"
                value={team.strStadium || "—"}
                small
              />
              <StatCard
                label="Capacity"
                value={
                  team.intStadiumCapacity
                    ? Number(team.intStadiumCapacity).toLocaleString()
                    : "—"
                }
              />
              <StatCard label="Location" value={team.strLocation || "—"} small />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {websiteUrl && (
                <a
                  href={websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-10 px-4 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                >
                  Official Website
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15,3 21,3 21,9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              <SocialLinks team={team} />
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {paragraphs.length > 0 && (
        <section className="mb-10" aria-label="Team history">
          <h2 className="font-display font-bold text-xl text-primary mb-4">
            About the {team.strTeam}
          </h2>
          <div className="space-y-4 text-secondary leading-relaxed text-sm md:text-base max-w-3xl">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>
      )}

      {/* Fanart */}
      {team.strFanart1 && (
        <section className="mb-10" aria-label="Team fanart">
          <h2 className="font-display font-bold text-xl text-primary mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[team.strFanart1, team.strFanart2]
              .filter(Boolean)
              .map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden border border-border bg-elevated"
                >
                  <Image
                    src={src!}
                    alt={`${team.strTeam} fanart ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Roster */}
      {players.length > 0 && (
        <section aria-label="Team roster">
          <h2 className="font-display font-bold text-xl text-primary mb-4">
            Roster
            <span className="ml-2 text-sm font-normal text-muted font-body">
              ({players.length} players)
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {players.map((player) => (
              <PlayerCard
                key={player.idPlayer}
                player={player}
                accentColor={accentColor}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="rounded-xl bg-elevated border border-border p-3.5">
      <p className="text-xs text-muted mb-1">{label}</p>
      <p
        className={`font-display font-bold text-primary leading-tight ${small ? "text-sm" : "text-lg"}`}
      >
        {value}
      </p>
    </div>
  );
}

function SocialLinks({ team }: { team: Team }) {
  const links = [
    {
      href: normalizeSocialUrl(team.strTwitter, "twitter"),
      label: "Twitter / X",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.63 5.905-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      href: normalizeSocialUrl(team.strInstagram, "instagram"),
      label: "Instagram",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      href: normalizeSocialUrl(team.strFacebook, "facebook"),
      label: "Facebook",
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
  ].filter((l) => l.href);

  if (!links.length) return null;

  return (
    <>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href!}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${team.strTeam} on ${link.label}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-border bg-elevated text-secondary hover:text-primary hover:border-border-hover hover:bg-surface transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          {link.icon}
        </a>
      ))}
    </>
  );
}
