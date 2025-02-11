"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 rounded-lg"
    >
      <Sun className={`h-4 w-4 ${theme === 'dark' ? 'hidden' : 'block'}`} />
      <Moon className={`h-4 w-4 ${theme === 'dark' ? 'block' : 'hidden'}`} />
      <span className="sr-only">Temayı değiştir</span>
    </Button>
  )
}
