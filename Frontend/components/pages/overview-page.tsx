import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  GitCommit,
  CircleDot,
  Boxes,
  Users,
  GitPullRequest,
  Package,
} from "lucide-react"
import {
  repoStats,
  activityFeed,
  moduleStatusSummary,
} from "@/lib/data"
import { StatusBadge } from "@/components/status-badge"

const stats = [
  { label: "Total commits", value: repoStats.totalCommits.toLocaleString(), icon: GitCommit },
  { label: "Open issues", value: repoStats.openIssues, icon: CircleDot },
  { label: "Active modules", value: repoStats.activeModules, icon: Boxes },
  { label: "Contributors", value: repoStats.contributors, icon: Users },
]

const activityIcon = {
  commit: GitCommit,
  issue: CircleDot,
  pr: GitPullRequest,
  release: Package,
}

export function OverviewPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label}>
              <CardContent className="flex items-center justify-between gap-3 py-1">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                  <span className="font-mono text-2xl font-semibold tabular-nums text-foreground">
                    {s.value}
                  </span>
                </div>
                <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="size-4" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col">
              {activityFeed.map((a, i) => {
                const Icon = activityIcon[a.type]
                return (
                  <li
                    key={a.id}
                    className="flex items-start gap-3 py-3"
                    style={{
                      borderTop: i === 0 ? undefined : "1px solid var(--border)",
                    }}
                  >
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground">
                      <Icon className="size-3.5" />
                    </div>
                    <div className="flex flex-col gap-0.5 text-sm">
                      <p className="text-foreground">
                        <span className="font-mono font-medium">{a.actor}</span>{" "}
                        <span className="text-muted-foreground">{a.action}</span>{" "}
                        <span className="font-medium">{a.target}</span>
                      </p>
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                  </li>
                )
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Module status</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {Object.entries(moduleStatusSummary).map(([status, count]) => (
              <div
                key={status}
                className="flex items-center justify-between rounded-md border border-border px-3 py-2.5"
              >
                <StatusBadge status={status} />
                <span className="font-mono text-sm font-semibold tabular-nums text-foreground">
                  {count}
                </span>
              </div>
            ))}
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Status reflects audit and release readiness across the four core
              workflow modules.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
