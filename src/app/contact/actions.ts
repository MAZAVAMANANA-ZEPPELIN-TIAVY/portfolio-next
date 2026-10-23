"use server";

import { Resend } from "resend";
import { site } from "@/data/site";
import { contactFields, contactSchema, validateContact, type ContactState } from "./schema";

/** Champ piège invisible : rempli uniquement par les robots. */
const HONEYPOT_FIELD = "website";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);
}

/**
 * Server Action du formulaire de contact : validation zod, honeypot, envoi par Resend.
 * Variables serveur : RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (cf. .env.example).
 */
export async function sendContactMessage(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Robot : on fait comme si tout s'était bien passé, sans rien envoyer.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim() !== "") {
    return { status: "success" };
  }

  const raw = Object.fromEntries(contactFields.map((field) => [field, String(formData.get(field) ?? "")]));
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return { status: "invalid", errors: validateContact(raw) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("Formulaire de contact : RESEND_API_KEY, CONTACT_TO_EMAIL ou CONTACT_FROM_EMAIL manquant.");
    return { status: "error" };
  }

  const { name, email, phone, subject, message } = parsed.data;
  const rows: [string, string][] = [
    ["Nom", name],
    ["Email", email],
    ["Téléphone / WhatsApp", phone || "—"],
    ["Objet", subject],
  ];

  const text = [...rows.map(([label, value]) => `${label} : ${value}`), "", "Message :", message].join("\n");
  const html = `
    <h2 style="font-family:sans-serif">Nouveau message depuis le portfolio</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${label}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:sans-serif">Message</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(message)}</p>`;

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: `Portfolio ${site.name} <${from}>`,
      to,
      replyTo: email,
      subject: `Portfolio : ${subject} — ${name}`,
      text,
      html,
    });
    if (error) {
      console.error("Formulaire de contact : échec Resend", error.name, error.message);
      return { status: "error" };
    }
  } catch (error) {
    console.error("Formulaire de contact : erreur réseau Resend", error);
    return { status: "error" };
  }

  return { status: "success" };
}
