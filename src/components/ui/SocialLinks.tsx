import { socials } from "@/data/site";
import { Icon } from "./Icon";

type SocialLinksProps = {
  /** Classes de chaque pastille (couleurs et survol propres à chaque emplacement). */
  itemClassName: string;
  className?: string;
};

export function SocialLinks({ itemClassName, className = "" }: SocialLinksProps) {
  return (
    <ul className={`flex gap-3 ${className}`}>
      {socials.map(({ name, href, icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} (nouvel onglet)`}
            className={`flex h-11 w-11 items-center justify-center rounded-full text-lg transition hover:-translate-y-1 ${itemClassName}`}
          >
            <Icon name={icon} />
          </a>
        </li>
      ))}
    </ul>
  );
}
