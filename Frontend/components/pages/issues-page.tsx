"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { issues, type Difficulty } from "@/lib/data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const groups: Difficulty[] = ["Good First Issue", "Medium Complexity", "Advanced"]
const modules = ["all", "escrow", "milestone", "reputation", "treasury"]

export function IssuesPage() {
  const [moduleFilter, setModuleFilter] = useState("all")
  const [difficultyFilter, setDifficultyFilter] = useState("all")

  const filtered = issues.filter(
    (i) =>
      (moduleFilter === "all" || i.module === moduleFilter) &&
      (difficultyFilter === "all" || i.difficulty === difficultyFilter),
  )

  const visibleGroups =
    difficultyFilter === "all" ? groups : (groups.filter((g) => g === difficultyFilter) as Difficulty[])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-3">
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Module" />
          </SelectTrigger>
          <SelectContent>
            {modules.map((m) => (
              <SelectItem key={m} value={m}>
                {m === "all" ? "All modules" : m.charAt(0).toUpperCase() + m.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-52">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All difficulties</SelectItem>
            {groups.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {visibleGroups.map((group) => {
          const groupIssues = filtered.filter((i) => i.difficulty === group)
          return (
            <Card key={group} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm">
                  <span>{group}</span>
                  <span className="font-mono text-xs font-normal text-muted-foreground">
                    {groupIssues.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-2.5">
                {groupIssues.length === 0 && (
                  <p className="py-6 text-center text-xs text-muted-foreground">
                    No matching issues.
                  </p>
                )}
                {groupIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="rounded-md border border-border bg-muted/30 p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-medium leading-snug text-foreground">
                        {issue.title}
                      </p>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                        {issue.id}
                      </span>
                    </div>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <span className="rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        {issue.module}
                      </span>
                      <StatusBadge status={issue.status} className="text-[10px]" />
                      <span
                        className={cn(
                          "font-mono text-[10px] text-muted-foreground",
                        )}
                      >
                        {issue.effort}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
