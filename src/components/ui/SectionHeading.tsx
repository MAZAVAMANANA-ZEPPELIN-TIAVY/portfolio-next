type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /** `dark` : section sur fond sombre. */
  tone?: "light" | "dark";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  id,
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "left" ? "text-left" : "mx-auto text-center";
  const dark = tone === "dark";

  return (
    <div className={`max-w-3xl ${alignment} ${className}`}>
      <p className={`text-sm font-bold uppercase tracking-[0.2em] ${dark ? "text-cyan-300" : "text-primary"}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 text-3xl font-black tracking-tight sm:text-4xl ${dark ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-base leading-8 ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>
      )}
    </div>
  );
}
