"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { sendContactMessage } from "@/app/contact/actions";
import {
  contactFields,
  emptyContactValues,
  validateContact,
  type ContactErrors,
  type ContactField,
  type ContactState,
  type ContactValues,
} from "@/app/contact/schema";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { contactForm, subjects } from "@/data/contact";
import { contact } from "@/data/site";
import { doneProgress, startProgress } from "@/lib/progress";
import { SelectField, TextAreaField, TextField } from "./FormFields";

const { fields } = contactForm;
const allTouched = Object.fromEntries(contactFields.map((field) => [field, true])) as Record<ContactField, boolean>;

/** Formulaire de contact : validation en direct (D9), Server Action + Resend, message de retour intégré. */
export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactValues>(emptyContactValues);
  // Un champ n'affiche son erreur qu'après avoir été quitté une fois (ou après une tentative d'envoi).
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});

  const [state, formAction, pending] = useActionState(async (previous: ContactState, formData: FormData) => {
    const result = await sendContactMessage(previous, formData);
    if (result.status === "success") setValues(emptyContactValues);
    // Les erreurs renvoyées par le serveur s'affichent telles quelles jusqu'à la prochaine saisie.
    setTouched({});
    return result;
  }, { status: "idle" });

  // Barre de chargement pendant l'envoi, comme NProgress dans l'original.
  useEffect(() => {
    if (!pending) return;
    startProgress();
    return doneProgress;
  }, [pending]);

  const clientErrors = validateContact(values);
  const serverErrors: ContactErrors = state.status === "invalid" ? state.errors : {};
  const errorFor = (field: ContactField) => (touched[field] ? clientErrors[field] : serverErrors[field]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const field = event.target.name as ContactField;
    setValues((current) => ({ ...current, [field]: event.target.value }));
    // Une fois l'erreur affichée, elle se met à jour à chaque frappe.
    if (serverErrors[field]) setTouched((current) => ({ ...current, [field]: true }));
  };
  const onBlur = (event: { target: { name: string } }) =>
    setTouched((current) => ({ ...current, [event.target.name]: true }));

  // Envoi manuel (pas d'`action` sur le <form>) : React 19 réinitialiserait sinon le formulaire après chaque envoi,
  // y compris après une erreur. Formulaire invalide : erreurs affichées et focus sur le premier champ fautif.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstInvalid = contactFields.find((field) => clientErrors[field]);
    if (firstInvalid) {
      setTouched(allTouched);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const formData = new FormData(event.currentTarget);
    startTransition(() => formAction(formData));
  };

  const field = (name: ContactField) => ({
    name,
    value: values[name],
    onChange,
    onBlur,
    error: errorFor(name),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          {...field("name")}
          type="text"
          label={fields.name.label}
          placeholder={fields.name.placeholder}
          autoComplete="name"
          required
        />
        <TextField
          {...field("email")}
          type="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          {...field("phone")}
          type="tel"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          autoComplete="tel"
        />
        <SelectField
          {...field("subject")}
          label={fields.subject.label}
          options={subjects}
          placeholder={contactForm.selectPlaceholder}
          required
        />
      </div>

      <TextAreaField
        {...field("message")}
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        rows={7}
        required
      />

      {/* Honeypot anti-spam : invisible et hors du parcours clavier, ignoré par les humains. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">{contactForm.honeypotLabel}</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">{contactForm.privacy}</p>
        <Button type="submit" size="xl" disabled={pending} className="shrink-0 gap-3 text-sm">
          <Icon name="paperPlane" />
          {pending ? contactForm.sending : contactForm.submit}
        </Button>
      </div>

      <div aria-live="polite" role="status">
        {state.status === "success" && (
          <p className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800">
            <Icon name="checkCircle" className="mt-0.5 shrink-0 text-emerald-600" />
            {contactForm.success}
          </p>
        )}
        {state.status === "error" && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <p className="font-semibold">{contactForm.error}</p>
            <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-bold">
              <a href={contact.emailHref} className="underline underline-offset-2">
                {contact.email}
              </a>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
                WhatsApp
              </a>
            </p>
          </div>
        )}
        {state.status === "invalid" && (
          <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-800">
            {contactForm.invalid}
          </p>
        )}
      </div>
    </form>
  );
}
