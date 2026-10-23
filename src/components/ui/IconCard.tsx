import type { ReactNode } from "react";
import type { IconName } from "@/data/icons";
import { Icon } from "./Icon";

type IconCardProps = {
  icon: IconName;
  title: string;
  /** Valeur affichée sous le libellé (texte ou lien). */
  children: ReactNode;
  className?: string;
};

/** Petite carte libellé / valeur avec icône (contacts du CV). */
export function IconCard({ icon, title, children, className = "" }: IconCardProps) {
  return (
    <div
      className={`rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary">
        <Icon name={icon} />
      </div>
      <p className="text-sm font-semibold text-slate-500">{title}</p>
      <div className="mt-2 break-words text-base font-bold text-ink">{children}</div>
    </div>
  );
}
