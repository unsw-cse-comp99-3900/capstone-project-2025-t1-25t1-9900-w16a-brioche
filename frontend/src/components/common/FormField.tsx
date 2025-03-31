/**
 * @file FormField.tsx - Defines the FormField component, a reusable form field with a label, optional icon, and children.
 */
import React, { ReactNode } from "react"
import { Label } from "@/components/ui/label"
import { LucideIcon } from "lucide-react"

interface FormFieldProps {
  id: string
  label: string
  icon?: LucideIcon
  required?: boolean
  children: ReactNode
  className?: string
}

/**
 * FormField Component
 *
 * A reusable form field component that includes a label, an optional icon, and the form field itself (children).
 *
 * @param {FormFieldProps} props - The component props.
 * @param {string} props.id - The ID of the form field.
 * @param {string} props.label - The label for the form field.
 * @param {LucideIcon} [props.icon] - An optional icon to display next to the label.
 * @param {boolean} [props.required=false] - Whether the form field is required.
 * @param {ReactNode} props.children - The form field element(s).
 * @param {string} [props.className="sm:col-span-3"] - Optional CSS class name for the form field container.
 * @returns {JSX.Element} A div containing the label and the form field.
 */
const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  icon: Icon,
  required = false,
  children,
  className = "sm:col-span-3",
}) => {
  return (
    <div className={className}>
      <Label
        htmlFor={id}
        className="text-sm font-medium text-secondary-700 flex items-center gap-1"
      >
        {Icon && <Icon className="h-4 w-4 text-secondary-500" />}
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="mt-1">{children}</div>
    </div>
  )
}

export default FormField
