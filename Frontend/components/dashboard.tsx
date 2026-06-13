"use client"

import { useState } from "react"
import { Sidebar, type Page } from "@/components/sidebar"
import { OverviewPage } from "@/components/pages/overview-page"
import { ContractsPage } from "@/components/pages/contracts-page"
import { ModulesPage } from "@/components/pages/modules-page"
import { IssuesPage } from "@/components/pages/issues-page"
import { SdkPage } from "@/components/pages/sdk-page"
import { ContributorsPage } from "@/components/pages/contributors-page"
import { DocumentationPage } from "@/components/pages/documentation-page"
import { GitBranch } from "lucide-react"

const titles: Record<Page, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "Repository health and development activity" },
  contracts: { title: "Smart Contracts", subtitle: "Rust Soroban contract modules" },
  modules: { title: "Modules", subtitle: "Reusable blockchain workflow modules" },
  issues: { title: "Issues", subtitle: "OSS contribution board" },
  sdk: { title: "SDK", subtitle: "Client library reference" },
  contributors: { title: "Contributors", subtitle: "Maintainer and contributor activity" },
  documentation: { title: "Documentation", subtitle: "Guides and reference material" },
}

export function Dashboard() {
  const [page, setPage] = useState<Page>("overview")
  const meta = titles[page]

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar active={page} onNavigate={setPage} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-6">
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-foreground">ForgeStream OSS</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{meta.title}</span>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground">
            <GitBranch className="size-3.5" />
            main
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-balance text-foreground">{meta.title}</h1>
              <p className="text-sm text-muted-foreground">{meta.subtitle}</p>
            </div>
            {page === "overview" && <OverviewPage />}
            {page === "contracts" && <ContractsPage />}
            {page === "modules" && <ModulesPage />}
            {page === "issues" && <IssuesPage />}
            {page === "sdk" && <SdkPage />}
            {page === "contributors" && <ContributorsPage />}
            {page === "documentation" && <DocumentationPage />}
          </div>
        </main>
      </div>
    </div>
  )
}
