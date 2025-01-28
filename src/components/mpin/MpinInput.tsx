import type React from "react"
import { Input } from "@/components/ui/input"

interface MpinInputProps {
  id?: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

export const MpinInput: React.FC<MpinInputProps> = ({ value, onChange, error, placeholder = "••••" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (/^\d{0,4}$/.test(newValue)) {
      onChange(newValue)
    }
  }

  return (
    <div className="space-y-2 w-full">
      <Input
        type="password"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={4}
        value={value}
        onChange={handleChange}
        className="text-center text-2xl tracking-widest w-full"
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500 text-center">{error}</p>}
    </div>
  )
}

