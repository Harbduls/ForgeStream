import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const styles: Record<string, string> = {
  Stable: "border-transparent bg-chart-3/15 text-chart-3",
  Experimental: "border-transparent bg-chart-4/15 text-chart-4",
  "In Review": "border-transparent bg-primary/12 text-primary",
  "Needs Review": "border-transparent bg-chart-4/15 text-chart-4",
  open: "border-transparent bg-primary/12 text-primary",
  assigned: "border-transparent bg-chart-4/15 text-chart-4",
  closed: "border-transparent bg-muted text-muted-foreground",
  "Good First Issue": "border-transparent bg-chart-3/15 text-chart-3",
  "Medium Complexity": "border-transparent bg-chart-4/15 text-chart-4",
  Advanced: "border-transparent bg-destructive/12 text-destructive",
}

export function StatusBadge({
  status,
  className,
}: {
  status: string
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", styles[status] ?? "", className)}
    >
      {status}
    </Badge>
  )
}
