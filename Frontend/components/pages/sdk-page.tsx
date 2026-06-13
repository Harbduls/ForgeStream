"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Code2 } from "lucide-react"

function CodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-md border border-border">
      <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground">
        <Terminal className="size-3.5" />
        {label}
      </div>
      <pre className="overflow-x-auto bg-card p-3">
        <code className="font-mono text-xs leading-relaxed text-foreground">{code}</code>
      </pre>
    </div>
  )
}

function MethodList({ methods }: { methods: { name: string; sig: string }[] }) {
  return (
    <div className="flex flex-col gap-2">
      {methods.map((m) => (
        <div
          key={m.name}
          className="flex flex-col gap-0.5 rounded-md border border-border bg-muted/30 px-3 py-2"
        >
          <span className="font-mono text-xs font-semibold text-primary">{m.name}</span>
          <span className="font-mono text-[11px] text-muted-foreground">{m.sig}</span>
        </div>
      ))}
    </div>
  )
}

const jsMethods = [
  { name: "createEscrow", sig: "(params: EscrowParams) => Promise<EscrowId>" },
  { name: "releaseFunds", sig: "(id: EscrowId) => Promise<TxResult>" },
  { name: "getEscrow", sig: "(id: EscrowId) => Promise<EscrowState>" },
  { name: "createPlan", sig: "(milestones: Milestone[]) => Promise<PlanId>" },
  { name: "approveMilestone", sig: "(planId, index) => Promise<TxResult>" },
  { name: "scoreOf", sig: "(address: string) => Promise<number>" },
]

const rustMethods = [
  { name: "Client::new", sig: "(env: &Env, contract_id: &Address) -> Client" },
  { name: "create_escrow", sig: "(&self, args: EscrowArgs) -> Result<u64, Error>" },
  { name: "release_funds", sig: "(&self, id: u64) -> Result<(), Error>" },
  { name: "approve_milestone", sig: "(&self, plan: u64, idx: u32) -> Result<i128, Error>" },
  { name: "score_of", sig: "(&self, subject: Address) -> u64" },
]

export function SdkPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">SDK reference</CardTitle>
        <p className="text-sm text-muted-foreground">
          Client libraries for integrating with ForgeStream Soroban contracts.
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="js">
          <TabsList>
            <TabsTrigger value="js">
              <Code2 className="size-4" />
              JavaScript
            </TabsTrigger>
            <TabsTrigger value="rust">
              <Code2 className="size-4" />
              Rust
            </TabsTrigger>
          </TabsList>

          <TabsContent value="js" className="flex flex-col gap-5 pt-2">
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Installation</h3>
              <CodeBlock label="bash" code="npm install @forgestream/sdk" />
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Example usage</h3>
              <CodeBlock
                label="escrow.ts"
                code={`import { ForgeStream } from "@forgestream/sdk"

const client = new ForgeStream({
  network: "testnet",
  contractId: "CC7D...ESCROW",
})

const id = await client.createEscrow({
  buyer,
  seller,
  amount: 1_000n,
  deadline: 1_750_000_000,
})

await client.releaseFunds(id)`}
              />
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Available methods</h3>
              <MethodList methods={jsMethods} />
            </section>
          </TabsContent>

          <TabsContent value="rust" className="flex flex-col gap-5 pt-2">
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Installation</h3>
              <CodeBlock label="Cargo.toml" code={`[dependencies]
forgestream-sdk = "0.9.2"
soroban-sdk = "22.0.0"`} />
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Example usage</h3>
              <CodeBlock
                label="lib.rs"
                code={`use forgestream_sdk::escrow::Client;
use soroban_sdk::{Env, Address};

pub fn open(env: &Env, id: &Address) -> u64 {
    let client = Client::new(env, id);
    client
        .create_escrow(EscrowArgs {
            buyer,
            seller,
            amount: 1_000,
            deadline: 1_750_000_000,
        })
        .expect("escrow created")
}`}
              />
            </section>
            <section className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-foreground">Available methods</h3>
              <MethodList methods={rustMethods} />
            </section>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
