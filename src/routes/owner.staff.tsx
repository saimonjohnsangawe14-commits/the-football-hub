import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { ownerStaff } from "@/lib/mock-data";
import { PageHeader, Pill } from "@/components/ui-bits";

export const Route = createFileRoute("/owner/staff")({
  head: () => ({ meta: [{ title: "Staff · Owner" }] }),
  component: OwnerStaff,
});

function OwnerStaff() {
  return (
    <div className="space-y-5">
      <PageHeader
        title="Staff"
        subtitle="Shifts & attendance"
        action={
          <button onClick={() => toast.success("Invite sent")} className="inline-flex items-center gap-1 rounded-full gradient-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-glow">
            <Plus className="h-3 w-3" /> Add
          </button>
        }
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface">
        {ownerStaff.map((s, i) => (
          <div key={s.name} className={"flex items-center gap-3 p-3 " + (i > 0 ? "border-t border-border" : "")}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-muted font-display text-[11px] font-bold">{s.name.split(" ").map((x) => x[0]).join("")}</span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">{s.name}</div>
              <div className="text-[11px] text-muted-foreground">{s.role} · {s.shift}</div>
            </div>
            <Pill tone={s.status === "On shift" ? "success" : "warning"}>{s.status}</Pill>
          </div>
        ))}
      </div>
    </div>
  );
}
