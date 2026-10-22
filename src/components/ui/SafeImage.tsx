"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** next/image qui disparaît si le fichier est introuvable : le fond du parent reste visible (comportement d'origine). */
export function SafeImage(props: ImageProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;
  // alt fourni par l'appelant via props.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} onError={() => setFailed(true)} />;
}
