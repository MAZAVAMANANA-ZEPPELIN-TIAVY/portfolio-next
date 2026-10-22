type BackgroundDecorProps = {
  /** Dégradé clair sous les halos (page CV). */
  gradient?: boolean;
  /** Troisième halo indigo en bas. */
  thirdHalo?: boolean;
};

/** Halos flous des pages claires. Le parent doit être `relative` (et `isolate` ou `overflow-hidden`). */
export function BackgroundDecor({ gradient = false, thirdHalo = false }: BackgroundDecorProps) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {gradient && <div className="absolute inset-0 bg-linear-to-br from-surface via-white to-blue-50" />}
      <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-primary-soft/50 blur-3xl" />
      <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-accent-soft/40 blur-3xl" />
      {thirdHalo && <div className="absolute bottom-0 left-1/3 h-60 w-60 rounded-full bg-indigo-200/30 blur-3xl" />}
    </div>
  );
}
