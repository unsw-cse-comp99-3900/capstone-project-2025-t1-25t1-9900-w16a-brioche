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
