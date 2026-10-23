import type { IconType } from "react-icons";
import {
  FaArrowLeft,
  FaArrowRight,
  FaBasketballBall,
  FaBriefcase,
  FaCheck,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight,
  FaCode,
  FaCss3Alt,
  FaDatabase,
  FaDownload,
  FaEnvelope,
  FaExpand,
  FaFacebook,
  FaFolderOpen,
  FaGitAlt,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaHtml5,
  FaImages,
  FaJava,
  FaLanguage,
  FaLaptopCode,
  FaLaravel,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMusic,
  FaPaperPlane,
  FaPhoneAlt,
  FaPhp,
  FaPlane,
  FaReact,
  FaTimes,
  FaUserGraduate,
  FaWhatsapp,
  FaWordpress,
} from "react-icons/fa";
import {
  HiOutlineArrowRight,
  HiOutlineDownload,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlineMenuAlt3,
  HiOutlineX,
} from "react-icons/hi";
// Simple Icons : Font Awesome n'a pas de logo Next.js.
import { SiNextdotjs } from "react-icons/si";
import type { IconName } from "@/data/icons";

/** Table typée : un nom ajouté à IconName sans icône ici fait échouer le build. */
const icons: Record<IconName, IconType> = {
  arrowRight: FaArrowRight,
  arrowRightOutline: HiOutlineArrowRight,
  download: HiOutlineDownload,
  downloadSolid: FaDownload,
  menu: HiOutlineMenuAlt3,
  close: HiOutlineX,
  checkCircle: FaCheckCircle,
  paperPlane: FaPaperPlane,
  folderOpen: FaFolderOpen,
  check: FaCheck,
  images: FaImages,
  arrowLeft: FaArrowLeft,
  chevronLeft: FaChevronLeft,
  chevronRight: FaChevronRight,
  expand: FaExpand,
  times: FaTimes,
  email: FaEnvelope,
  emailOutline: HiOutlineMail,
  phone: FaPhoneAlt,
  location: FaMapMarkerAlt,
  locationOutline: HiOutlineLocationMarker,
  whatsapp: FaWhatsapp,
  facebook: FaFacebook,
  linkedin: FaLinkedin,
  github: FaGithub,
  laptopCode: FaLaptopCode,
  code: FaCode,
  database: FaDatabase,
  userGraduate: FaUserGraduate,
  graduationCap: FaGraduationCap,
  briefcase: FaBriefcase,
  globe: FaGlobe,
  language: FaLanguage,
  basketball: FaBasketballBall,
  music: FaMusic,
  plane: FaPlane,
  html5: FaHtml5,
  css3: FaCss3Alt,
  react: FaReact,
  nextjs: SiNextdotjs,
  php: FaPhp,
  laravel: FaLaravel,
  git: FaGitAlt,
  java: FaJava,
  wordpress: FaWordpress,
};

type IconProps = {
  name: IconName;
  className?: string;
  size?: number | string;
};

/** Icône décorative (aria-hidden) : le texte ou l'aria-label du parent porte le sens. */
export function Icon({ name, className, size }: IconProps) {
  const Component = icons[name];
  return <Component className={className} size={size} aria-hidden="true" focusable="false" />;
}
