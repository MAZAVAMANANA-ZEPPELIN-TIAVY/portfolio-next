import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlClasses =
  "w-full rounded-2xl border bg-surface px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:bg-white focus:ring-4 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100";
const validClasses = "border-slate-300 focus:border-blue-500 focus:ring-blue-100";

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
};

/** Libellé + champ + message d'erreur relié au champ (aria-describedby, D6). */
function FieldShell({ id, label, required, error, children }: FieldShellProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-600">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Attributs d'accessibilité communs : état invalide et lien vers le message d'erreur. */
function a11y(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  } as const;
}

type CommonProps = {
  name: string;
  label: string;
  error?: string;
};

export function TextField({
  name,
  label,
  error,
  required,
  ...props
}: CommonProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name">) {
  return (
    <FieldShell id={name} label={label} required={required} error={error}>
      <input
        id={name}
        name={name}
        required={required}
        className={`${controlClasses} ${validClasses}`}
        {...a11y(name, error)}
        {...props}
      />
    </FieldShell>
  );
}

export function SelectField({
  name,
  label,
  error,
  required,
  options,
  placeholder,
  ...props
}: CommonProps & { options: readonly string[]; placeholder: string } & Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "name"
  >) {
  return (
    <FieldShell id={name} label={label} required={required} error={error}>
      <select
        id={name}
        name={name}
        required={required}
        className={`${controlClasses} ${validClasses}`}
        {...a11y(name, error)}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

export function TextAreaField({
  name,
  label,
  error,
  required,
  ...props
}: CommonProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name">) {
  return (
    <FieldShell id={name} label={label} required={required} error={error}>
      <textarea
        id={name}
        name={name}
        required={required}
        className={`${controlClasses} ${validClasses} resize-none`}
        {...a11y(name, error)}
        {...props}
      />
    </FieldShell>
  );
}
