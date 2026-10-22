"use client";

import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { budgets, contactForm, projectTypes } from "@/data/contact";
import { SelectField, TextAreaField, TextField } from "./FormFields";

const { fields } = contactForm;

/** Formulaire de contact (interface). L'envoi est branché à l'étape 11. */
export function ContactForm() {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="name"
          type="text"
          label={fields.name.label}
          placeholder={fields.name.placeholder}
          autoComplete="name"
          required
        />
        <TextField
          name="email"
          type="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          name="phone"
          type="tel"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          autoComplete="tel"
        />
        <SelectField
          name="projectType"
          label={fields.projectType.label}
          options={projectTypes}
          placeholder={contactForm.selectPlaceholder}
          defaultValue=""
          required
        />
      </div>

      <SelectField
        name="budget"
        label={fields.budget.label}
        options={budgets}
        placeholder={contactForm.selectPlaceholder}
        defaultValue=""
      />

      <TextAreaField
        name="message"
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        rows={7}
        required
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-slate-500">{contactForm.privacy}</p>
        <Button type="submit" size="xl" className="shrink-0 gap-3 text-sm">
          <Icon name="paperPlane" />
          {contactForm.submit}
        </Button>
      </div>
    </form>
  );
}
