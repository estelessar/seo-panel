"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react"

interface DomainSelectorProps {
  value: string
  onChange: (value: string) => void
}

export function DomainSelector({ value, onChange }: DomainSelectorProps) {
  const [domains, setDomains] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Örnek domainler, gerçek uygulamada API'den gelecek
    setDomains(["example.com", "test.com", "demo.com"])
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <Select disabled>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Yükleniyor..." />
        </SelectTrigger>
      </Select>
    )
  }

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Domain seçin" />
      </SelectTrigger>
      <SelectContent>
        {domains.map((domain) => (
          <SelectItem key={domain} value={domain}>
            {domain}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
