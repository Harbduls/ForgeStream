"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { workflowModules } from "@/lib/data"
import { Boxes, CircleDot, Users } from "lucide-react"
import { cn } from "@/lib/utils"

const filters = ["All", "Stable", "Experimental", "Needs Review"] as const
type Filter = (typeof filters)[number]

export function ModulesPage() {
  const [filter, setFilter] = useState<Filter>("All")
  const visible = workflowModules.filter(
    (m) => filter === "All" || m.status === filter,
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-1.5">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
              filter === f
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((m) => (
          <Card key={m.id}>
            <CardContent className="flex flex-col gap-4 py-1">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                    <Boxes className="size-4" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{m.name}</span>
                </div>
                <StatusBadge status={m.status} />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{m.purpose}</p>
              <div className="flex items-center gap-5 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CircleDot className="size-3.5" />
                  {m.openIssues} open issues
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="size-3.5" />
                  {m.contributors} contributors
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
