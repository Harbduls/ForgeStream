export type ModuleStatus = "Stable" | "Experimental" | "In Review"
export type IssueStatus = "open" | "assigned" | "closed"
export type Difficulty = "Good First Issue" | "Medium Complexity" | "Advanced"

export const repoStats = {
  totalCommits: 4218,
  openIssues: 37,
  activeModules: 4,
  contributors: 28,
}

export const activityFeed: {
  id: string
  actor: string
  action: string
  target: string
  time: string
  type: "commit" | "issue" | "pr" | "release"
}[] = [
  {
    id: "a1",
    actor: "n.castellano",
    action: "merged PR",
    target: "#412 refactor escrow state machine",
    time: "12m ago",
    type: "pr",
  },
  {
    id: "a2",
    actor: "0xA3f9…D21b",
    action: "opened issue",
    target: "#418 milestone payout rounding error",
    time: "48m ago",
    type: "issue",
  },
  {
    id: "a3",
    actor: "k.ito",
    action: "pushed 6 commits to",
    target: "feat/treasury-router-v2",
    time: "1h ago",
    type: "commit",
  },
  {
    id: "a4",
    actor: "release-bot",
    action: "published",
    target: "forgestream-sdk@0.9.2",
    time: "3h ago",
    type: "release",
  },
  {
    id: "a5",
    actor: "m.okafor",
    action: "closed issue",
    target: "#401 reputation decay overflow",
    time: "5h ago",
    type: "issue",
  },
  {
    id: "a6",
    actor: "l.zhang",
    action: "pushed 2 commits to",
    target: "fix/escrow-auth-check",
    time: "7h ago",
    type: "commit",
  },
]

export const moduleStatusSummary = {
  Stable: 2,
  Experimental: 1,
  "In Review": 1,
}

export type ContractFunction = {
  name: string
  inputs: { name: string; type: string }[]
  output: string
  description: string
}

export type SmartContract = {
  id: string
  name: string
  moduleType: string
  description: string
  functionCount: number
  status: ModuleStatus
  lastUpdated: string
  functions: ContractFunction[]
  stateVariables: { name: string; type: string; description: string }[]
}

export const smartContracts: SmartContract[] = [
  {
    id: "escrow",
    name: "Escrow Contract",
    moduleType: "Escrow",
    description:
      "Holds funds in trustless custody until release conditions are met. Implements time-locked refunds and arbiter-based dispute resolution.",
    functionCount: 6,
    status: "Stable",
    lastUpdated: "2026-06-10",
    functions: [
      {
        name: "create_escrow",
        inputs: [
          { name: "buyer", type: "Address" },
          { name: "seller", type: "Address" },
          { name: "amount", type: "i128" },
          { name: "deadline", type: "u64" },
        ],
        output: "Result<u64, EscrowError>",
        description: "Initializes a new escrow agreement and returns its id.",
      },
      {
        name: "release_funds",
        inputs: [
          { name: "escrow_id", type: "u64" },
          { name: "caller", type: "Address" },
        ],
        output: "Result<(), EscrowError>",
        description: "Releases held funds to the seller once conditions pass.",
      },
      {
        name: "refund",
        inputs: [{ name: "escrow_id", type: "u64" }],
        output: "Result<(), EscrowError>",
        description: "Returns funds to the buyer after the deadline expires.",
      },
      {
        name: "raise_dispute",
        inputs: [
          { name: "escrow_id", type: "u64" },
          { name: "reason", type: "Symbol" },
        ],
        output: "Result<(), EscrowError>",
        description: "Flags an escrow for arbiter review.",
      },
      {
        name: "resolve_dispute",
        inputs: [
          { name: "escrow_id", type: "u64" },
          { name: "winner", type: "Address" },
        ],
        output: "Result<(), EscrowError>",
        description: "Arbiter assigns funds to the resolved party.",
      },
      {
        name: "get_escrow",
        inputs: [{ name: "escrow_id", type: "u64" }],
        output: "Option<EscrowState>",
        description: "Reads the current state of an escrow.",
      },
    ],
    stateVariables: [
      { name: "escrows", type: "Map<u64, EscrowState>", description: "All escrow agreements keyed by id." },
      { name: "next_id", type: "u64", description: "Monotonic counter for escrow ids." },
      { name: "arbiter", type: "Address", description: "Authorized dispute resolver." },
    ],
  },
  {
    id: "milestone",
    name: "Milestone Contract",
    moduleType: "Milestone",
    description:
      "Manages staged payouts tied to deliverable completion. Each milestone unlocks a fraction of locked capital on approval.",
    functionCount: 5,
    status: "Stable",
    lastUpdated: "2026-06-08",
    functions: [
      {
        name: "create_plan",
        inputs: [
          { name: "owner", type: "Address" },
          { name: "milestones", type: "Vec<Milestone>" },
        ],
        output: "Result<u64, MilestoneError>",
        description: "Creates a milestone payout plan.",
      },
      {
        name: "submit_milestone",
        inputs: [
          { name: "plan_id", type: "u64" },
          { name: "index", type: "u32" },
        ],
        output: "Result<(), MilestoneError>",
        description: "Marks a milestone as submitted for review.",
      },
      {
        name: "approve_milestone",
        inputs: [
          { name: "plan_id", type: "u64" },
          { name: "index", type: "u32" },
        ],
        output: "Result<i128, MilestoneError>",
        description: "Approves a milestone and releases its payout.",
      },
      {
        name: "reject_milestone",
        inputs: [
          { name: "plan_id", type: "u64" },
          { name: "index", type: "u32" },
        ],
        output: "Result<(), MilestoneError>",
        description: "Rejects a submitted milestone for revision.",
      },
      {
        name: "get_plan",
        inputs: [{ name: "plan_id", type: "u64" }],
        output: "Option<MilestonePlan>",
        description: "Reads a milestone plan and its progress.",
      },
    ],
    stateVariables: [
      { name: "plans", type: "Map<u64, MilestonePlan>", description: "Active milestone plans." },
      { name: "locked", type: "Map<u64, i128>", description: "Capital locked per plan." },
    ],
  },
  {
    id: "reputation",
    name: "Reputation Contract",
    moduleType: "Reputation",
    description:
      "Tracks contributor reputation as non-transferable on-chain scores with time decay and weighted attestations.",
    functionCount: 4,
    status: "In Review",
    lastUpdated: "2026-06-11",
    functions: [
      {
        name: "attest",
        inputs: [
          { name: "subject", type: "Address" },
          { name: "weight", type: "u32" },
        ],
        output: "Result<(), RepError>",
        description: "Records a weighted attestation toward a subject.",
      },
      {
        name: "score_of",
        inputs: [{ name: "subject", type: "Address" }],
        output: "u64",
        description: "Returns the current decayed reputation score.",
      },
      {
        name: "decay",
        inputs: [{ name: "subject", type: "Address" }],
        output: "Result<(), RepError>",
        description: "Applies time-based decay to a score.",
      },
      {
        name: "slash",
        inputs: [
          { name: "subject", type: "Address" },
          { name: "amount", type: "u64" },
        ],
        output: "Result<(), RepError>",
        description: "Reduces a score on governance action.",
      },
    ],
    stateVariables: [
      { name: "scores", type: "Map<Address, u64>", description: "Raw reputation totals." },
      { name: "last_update", type: "Map<Address, u64>", description: "Ledger time of last decay." },
    ],
  },
  {
    id: "treasury-router",
    name: "Treasury Router Contract",
    moduleType: "Treasury",
    description:
      "Routes incoming protocol fees across configurable destinations with proportional splits and per-asset accounting.",
    functionCount: 5,
    status: "Experimental",
    lastUpdated: "2026-06-12",
    functions: [
      {
        name: "set_routes",
        inputs: [{ name: "routes", type: "Vec<Route>" }],
        output: "Result<(), RouterError>",
        description: "Configures destination splits (basis points).",
      },
      {
        name: "route",
        inputs: [
          { name: "asset", type: "Address" },
          { name: "amount", type: "i128" },
        ],
        output: "Result<(), RouterError>",
        description: "Splits and forwards an incoming deposit.",
      },
      {
        name: "withdraw",
        inputs: [
          { name: "asset", type: "Address" },
          { name: "to", type: "Address" },
        ],
        output: "Result<i128, RouterError>",
        description: "Withdraws accrued balance for a destination.",
      },
      {
        name: "balance_of",
        inputs: [
          { name: "asset", type: "Address" },
          { name: "dest", type: "Address" },
        ],
        output: "i128",
        description: "Reads accrued balance for a destination.",
      },
      {
        name: "get_routes",
        inputs: [],
        output: "Vec<Route>",
        description: "Returns the active routing table.",
      },
    ],
    stateVariables: [
      { name: "routes", type: "Vec<Route>", description: "Destination split configuration." },
      { name: "ledger", type: "Map<(Address,Address), i128>", description: "Per asset/destination balances." },
    ],
  },
]

export type WorkflowModule = {
  id: string
  name: string
  purpose: string
  openIssues: number
  contributors: number
  status: "Stable" | "Experimental" | "Needs Review"
}

export const workflowModules: WorkflowModule[] = [
  {
    id: "escrow",
    name: "Escrow Module",
    purpose:
      "Trustless fund custody primitives with deadline refunds and arbiter dispute hooks. Exposes a state-machine API consumed by higher-level workflows.",
    openIssues: 9,
    contributors: 11,
    status: "Stable",
  },
  {
    id: "milestone",
    name: "Milestone Module",
    purpose:
      "Staged payout orchestration. Wraps escrow custody with deliverable tracking and proportional release of locked capital.",
    openIssues: 7,
    contributors: 8,
    status: "Stable",
  },
  {
    id: "reputation",
    name: "Reputation Module",
    purpose:
      "Non-transferable scoring with decay and weighted attestations. Currently undergoing audit of the decay overflow boundary.",
    openIssues: 12,
    contributors: 6,
    status: "Needs Review",
  },
  {
    id: "treasury",
    name: "Treasury Module",
    purpose:
      "Fee routing and per-asset accounting across configurable destinations. Splits are expressed in basis points; multi-asset support is experimental.",
    openIssues: 9,
    contributors: 5,
    status: "Experimental",
  },
]

export type Issue = {
  id: string
  title: string
  module: string
  difficulty: Difficulty
  effort: string
  status: IssueStatus
}

export const issues: Issue[] = [
  { id: "#418", title: "Document create_escrow error variants", module: "escrow", difficulty: "Good First Issue", effort: "~2h", status: "open" },
  { id: "#420", title: "Add typed example to Milestone README", module: "milestone", difficulty: "Good First Issue", effort: "~1h", status: "open" },
  { id: "#421", title: "Fix typo in reputation decay docstring", module: "reputation", difficulty: "Good First Issue", effort: "~30m", status: "assigned" },
  { id: "#423", title: "Add unit test for treasury get_routes", module: "treasury", difficulty: "Good First Issue", effort: "~2h", status: "open" },
  { id: "#410", title: "Refactor escrow state machine transitions", module: "escrow", difficulty: "Medium Complexity", effort: "~1d", status: "assigned" },
  { id: "#414", title: "Milestone payout rounding precision", module: "milestone", difficulty: "Medium Complexity", effort: "~1d", status: "open" },
  { id: "#416", title: "Per-asset balance accounting in router", module: "treasury", difficulty: "Medium Complexity", effort: "~2d", status: "open" },
  { id: "#401", title: "Reputation decay overflow on large weights", module: "reputation", difficulty: "Advanced", effort: "~4d", status: "closed" },
  { id: "#408", title: "Arbiter dispute resolution re-entrancy guard", module: "escrow", difficulty: "Advanced", effort: "~3d", status: "open" },
  { id: "#419", title: "Cross-module invariant fuzzing harness", module: "treasury", difficulty: "Advanced", effort: "~5d", status: "open" },
]

export type Contributor = {
  username: string
  wallet: string
  contributions: number
  modules: string[]
  reputation: number
  lastActive: string
}

export const contributors: Contributor[] = [
  { username: "n.castellano", wallet: "0x91c4…7Fa2", contributions: 612, modules: ["escrow", "milestone"], reputation: 9840, lastActive: "12m ago" },
  { username: "k.ito", wallet: "0x3bD1…0e9C", contributions: 488, modules: ["treasury"], reputation: 8120, lastActive: "1h ago" },
  { username: "m.okafor", wallet: "0xA3f9…D21b", contributions: 401, modules: ["reputation", "escrow"], reputation: 7660, lastActive: "5h ago" },
  { username: "l.zhang", wallet: "0x77Ee…4421", contributions: 357, modules: ["escrow"], reputation: 6980, lastActive: "7h ago" },
  { username: "s.haddad", wallet: "0x12Aa…9c0D", contributions: 274, modules: ["milestone", "treasury"], reputation: 5410, lastActive: "1d ago" },
  { username: "p.novak", wallet: "0xC5b8…3aF1", contributions: 198, modules: ["reputation"], reputation: 4220, lastActive: "2d ago" },
  { username: "r.adeyemi", wallet: "0x68Dc…7B22", contributions: 142, modules: ["treasury"], reputation: 3110, lastActive: "3d ago" },
  { username: "j.fontaine", wallet: "0xEf01…55Ad", contributions: 96, modules: ["escrow", "reputation"], reputation: 2040, lastActive: "4d ago" },
]
