import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/** Conteneur du site d'origine : max-w-7xl px-4 sm:px-6 lg:px-8. */
export function Container({ children, className = "" }: ContainerProps) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
