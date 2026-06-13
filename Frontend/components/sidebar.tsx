"use client"

import {
  LayoutDashboard,
  FileCode2,
  Boxes,
  CircleDot,
  Package,
  Users,
  BookText,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type Page =
  | "overview"
  | "contracts"
  | "modules"
  | "issues"
  | "sdk"
  | "contributors"
  | "documentation"

const nav: { id: Page; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "contracts", label: "Smart Contracts", icon: FileCode2 },
  { id: "modules", label: "Modules", icon: Boxes },
  { id: "issues", label: "Issues", icon: CircleDot },
  { id: "sdk", label: "SDK", icon: Package },
  { id: "contributors", label: "Contributors", icon: Users },
  { id: "documentation", label: "Documentation", icon: BookText },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: Page
  onNavigate: (page: Page) => void
}) {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border bg-sidebar">
      <div className="flex h-14 items-center gap-2 border-b border-border px-4">
        <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
          <FileCode2 className="size-4" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">ForgeStream</span>
          <span className="font-mono text-[10px] text-muted-foreground">OSS Toolkit</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 p-2">
        {nav.map((item) => {
          const Icon = item.icon
          const isActive = active === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="border-t border-border p-3">
        <div className="rounded-md bg-muted/60 px-3 py-2">
          <p className="font-mono text-[11px] text-muted-foreground">soroban-cli v22.1</p>
          <p className="font-mono text-[11px] text-muted-foreground">network: testnet</p>
        </div>
      </div>
    </aside>
  )
}
