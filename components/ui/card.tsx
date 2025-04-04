import * as React from "react"

export function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border bg-background p-6 shadow">{children}</div>
}

export function CardContent({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-muted-foreground">{children}</div>
}
