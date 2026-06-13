import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookText, ArrowUpRight } from "lucide-react"

const sections = [
  {
    title: "Getting started",
    items: [
      { label: "Installing the soroban-cli", desc: "Toolchain setup for local builds and testnet deploys." },
      { label: "Project layout", desc: "Workspace structure for ForgeStream modules." },
      { label: "Deploying your first contract", desc: "Compile, optimize, and deploy to testnet." },
    ],
  },
  {
    title: "Core concepts",
    items: [
      { label: "Escrow lifecycle", desc: "States, transitions, and dispute resolution flow." },
      { label: "Milestone payouts", desc: "Staged release of locked capital." },
      { label: "Reputation model", desc: "Attestations, decay, and slashing semantics." },
      { label: "Treasury routing", desc: "Basis-point splits and per-asset accounting." },
    ],
  },
  {
    title: "Contributing",
    items: [
      { label: "Development workflow", desc: "Branching, testing, and review conventions." },
      { label: "Coding standards", desc: "Rust style and Soroban best practices." },
      { label: "Audit checklist", desc: "Pre-release security review requirements." },
    ],
  },
]

export function DocumentationPage() {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardContent className="flex items-center gap-3 py-1">
          <div className="flex size-9 items-center justify-center rounded-md bg-muted text-muted-foreground">
            <BookText className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">Documentation</span>
            <span className="text-xs text-muted-foreground">
              Reference material and guides for ForgeStream maintainers and contributors.
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {sections.map((s) => (
          <Card key={s.title}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              {s.items.map((item) => (
                <button
                  key={item.label}
                  className="group flex items-start justify-between gap-2 rounded-md px-2 py-2 text-left transition-colors hover:bg-muted"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <span className="text-xs text-muted-foreground">{item.desc}</span>
                  </div>
                  <ArrowUpRight className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
