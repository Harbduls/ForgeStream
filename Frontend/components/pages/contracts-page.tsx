"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"
import { smartContracts, type SmartContract } from "@/lib/data"
import { FileCode2, FunctionSquare, Database, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContractsPage() {
  const [selectedId, setSelectedId] = useState(smartContracts[0].id)
  const selected = smartContracts.find((c) => c.id === selectedId) as SmartContract

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
      <div className="flex flex-col gap-3 lg:col-span-2">
        {smartContracts.map((c) => {
          const isActive = c.id === selectedId
          return (
            <button key={c.id} onClick={() => setSelectedId(c.id)} className="text-left">
              <Card
                className={cn(
                  "transition-colors hover:border-primary/40",
                  isActive && "border-primary ring-1 ring-primary/20",
                )}
              >
                <CardContent className="flex flex-col gap-3 py-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex size-8 items-center justify-center rounded-md bg-muted text-muted-foreground">
                        <FileCode2 className="size-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">{c.name}</span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {c.moduleType}
                        </span>
                      </div>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{c.description}</p>
                  <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                    <span>{c.functionCount} functions</span>
                    <span>updated {c.lastUpdated}</span>
                  </div>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>

      <div className="lg:col-span-3">
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground">{selected.name}</span>
                <span className="font-mono text-xs text-muted-foreground">
                  modules::{selected.id.replace(/-/g, "_")}
                </span>
              </div>
              <StatusBadge status={selected.status} />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <section>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <FunctionSquare className="size-4 text-muted-foreground" />
                Functions
              </div>
              <div className="flex flex-col gap-3">
                {selected.functions.map((fn) => (
                  <div key={fn.name} className="rounded-md border border-border bg-muted/40 p-3">
                    <div className="flex flex-wrap items-center gap-x-1 font-mono text-xs">
                      <span className="font-semibold text-primary">{fn.name}</span>
                      <span className="text-muted-foreground">
                        ({fn.inputs.map((i) => `${i.name}: ${i.type}`).join(", ")})
                      </span>
                      <ArrowRight className="size-3 text-muted-foreground" />
                      <span className="text-chart-3">{fn.output}</span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {fn.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            <section>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Database className="size-4 text-muted-foreground" />
                State variables
              </div>
              <div className="overflow-hidden rounded-md border border-border">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/60 font-mono text-muted-foreground">
                    <tr>
                      <th className="px-3 py-2 font-medium">name</th>
                      <th className="px-3 py-2 font-medium">type</th>
                      <th className="px-3 py-2 font-medium">description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected.stateVariables.map((v, i) => (
                      <tr
                        key={v.name}
                        className={cn(i !== 0 && "border-t border-border")}
                      >
                        <td className="px-3 py-2 font-mono font-medium text-foreground">{v.name}</td>
                        <td className="px-3 py-2 font-mono text-chart-3">{v.type}</td>
                        <td className="px-3 py-2 text-muted-foreground">{v.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
