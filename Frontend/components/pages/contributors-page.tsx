import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { contributors } from "@/lib/data"
import { Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

function initials(name: string) {
  return name
    .replace(/[^a-zA-Z.]/g, "")
    .split(".")
    .map((p) => p.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function ContributorsPage() {
  const sorted = [...contributors].sort((a, b) => b.reputation - a.reputation)
  const leaders = sorted.slice(0, 3)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
          <Trophy className="size-4 text-chart-4" />
          Top contributors
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {leaders.map((c, i) => (
            <Card key={c.username}>
              <CardContent className="flex items-center gap-3 py-1">
                <span className="font-mono text-lg font-semibold tabular-nums text-muted-foreground">
                  #{i + 1}
                </span>
                <Avatar className="size-10">
                  <AvatarFallback className="bg-muted text-xs font-medium text-muted-foreground">
                    {initials(c.username)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">{c.username}</span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {c.reputation.toLocaleString()} rep
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">All contributors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-xs text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 font-medium">Contributor</th>
                  <th className="px-2 py-2 font-medium">Wallet</th>
                  <th className="px-2 py-2 font-medium">Modules</th>
                  <th className="px-2 py-2 text-right font-medium">Contributions</th>
                  <th className="px-2 py-2 text-right font-medium">Reputation</th>
                  <th className="px-2 py-2 text-right font-medium">Last active</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((c, i) => (
                  <tr key={c.username} className={cn(i !== 0 && "border-t border-border")}>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarFallback className="bg-muted text-[10px] font-medium text-muted-foreground">
                            {initials(c.username)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-foreground">{c.username}</span>
                      </div>
                    </td>
                    <td className="px-2 py-3 font-mono text-xs text-muted-foreground">{c.wallet}</td>
                    <td className="px-2 py-3">
                      <div className="flex flex-wrap gap-1">
                        {c.modules.map((m) => (
                          <span
                            key={m}
                            className="rounded border border-border bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {m}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-2 py-3 text-right font-mono tabular-nums text-foreground">
                      {c.contributions}
                    </td>
                    <td className="px-2 py-3 text-right font-mono tabular-nums text-foreground">
                      {c.reputation.toLocaleString()}
                    </td>
                    <td className="px-2 py-3 text-right text-xs text-muted-foreground">
                      {c.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
