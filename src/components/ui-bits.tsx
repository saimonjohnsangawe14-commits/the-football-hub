import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  back,
  action,
}: {
  title: string;
  subtitle?: string;
  back?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      {back && (
        <Link
          to={back}
          className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-muted text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      )}
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-2xl font-bold leading-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-3 mt-6 flex items-end justify-between gap-3">
      <h2 className="font-display text-base font-bold uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

export function Stat({ label, value, hint, accent }: { label: string; value: ReactNode; hint?: string; accent?: boolean }) {
  return (
    <div className={"rounded-2xl border p-3 " + (accent ? "border-primary/30 bg-primary/5" : "border-border bg-surface")}>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-display text-xl font-bold">{value}</div>
      {hint && <div className="mt-0.5 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "success" | "warning" | "destructive" | "primary" | "accent" }) {
  const tones: Record<string, string> = {
    default: "bg-muted text-muted-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
    primary: "bg-primary/15 text-primary",
    accent: "bg-accent/15 text-accent",
  };
  return (
    <span className={"inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider " + tones[tone]}>
      {children}
    </span>
  );
}

export function Avatar({ initials, size = 36, tone = "muted" }: { initials: string; size?: number; tone?: "muted" | "primary" | "accent" }) {
  const tones: Record<string, string> = {
    muted: "bg-muted text-foreground",
    primary: "gradient-primary text-primary-foreground",
    accent: "gradient-accent text-accent-foreground",
  };
  return (
    <span
      className={"grid shrink-0 place-items-center rounded-full font-display text-xs font-bold " + tones[tone]}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}
