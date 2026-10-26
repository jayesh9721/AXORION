import { Icon } from "./icons";

function Chip({ icon, title, sub, className }: { icon: string; title: string; sub: string; className: string }) {
  return (
    <div className={`card absolute flex items-center gap-3 px-3 py-2.5 shadow-xl backdrop-blur ${className}`}>
      <span className="icon-box !h-9 !w-9 !rounded-lg"><Icon name={icon} size={18} /></span>
      <span className="text-xs leading-tight"><b className="block text-sm">{title}</b><span className="text-muted">{sub}</span></span>
    </div>
  );
}

export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md pt-14 pb-10 sm:pb-12" aria-hidden>
      <div className="absolute inset-x-6 inset-y-6 rounded-full bg-accent/30 blur-3xl" />
      <div className="card relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 flex-1 rounded-md bg-surface2 px-3 py-1 text-[11px] text-muted">axorion.in</span>
        </div>
        <div className="space-y-4 p-5">
          <div className="h-3.5 w-3/4 rounded bg-gradient-to-r from-accent2 to-accent" />
          <div className="h-3.5 w-1/2 rounded bg-gradient-to-r from-accent2 to-accent opacity-70" />
          <div className="space-y-2 pt-1">
            <div className="h-2 w-full rounded bg-line" />
            <div className="h-2 w-11/12 rounded bg-line" />
            <div className="h-2 w-2/3 rounded bg-line" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2">
            {[["bolt", "Fast"], ["shield", "Secure"], ["growth", "Scalable"]].map(([i, l]) => (
              <div key={l} className="rounded-xl border border-line bg-surface2 p-3 text-center">
                <Icon name={i} size={18} className="mx-auto text-accent2" />
                <p className="mt-1.5 text-[11px] font-medium">{l}</p>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-1.5 pt-1" style={{ height: 56 }}>
            {[35, 50, 42, 66, 58, 80, 72, 96].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-accent/30 to-accent2" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <Chip icon="ai" title="AI Solutions" sub="Automate & scale" className="float left-0 top-0 sm:-left-8" />
      <Chip icon="web" title="Web Development" sub="Fast & scalable" className="float-slow -right-2 top-1/2 max-sm:hidden sm:-right-8" />
      <Chip icon="growth" title="Digital Growth" sub="Real business impact" className="float bottom-2 left-2 sm:-left-4" />
    </div>
  );
}
