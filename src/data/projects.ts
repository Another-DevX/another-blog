export interface Project {
	name: string;
	description: string;
	github: string;
	technologies: string[];
	featured?: boolean;
	reference?: {
		label: string;
		url: string;
	};
	repositories?: {
		label: string;
		url: string;
	}[];
}

export interface OpenSourceContribution {
	name: string;
	organization: string;
	description: string;
	repository: string;
	technologies: string[];
	pullRequests: {
		label: string;
		url: string;
		status: "merged" | "open" | "closed";
	}[];
}

export const projects: Project[] = [
	{
		name: "RLOX",
		description:
			"Implementation of the LOX programming language interpreter in Rust. It includes the complete front-end—lexer, parser, AST generation, error reporting, and a tree-walk interpreter—without the bytecode VM.",
		github: "https://github.com/Another-DevX/another-RLOX",
		technologies: ["Rust", "Interpreters", "Language design"],
		featured: true,
		reference: {
			label: "Crafting Interpreters",
			url: "https://craftinginterpreters.com/",
		},
	},
	{
		name: "AnotherLISP",
		description:
			"A small LISP-like language implemented in Rust and C. It features a simple REPL, parsing, basic evaluation rules, and fundamental LISP primitives, with an emphasis on learning language design.",
		github: "https://github.com/Another-DevX/Another-LISP",
		technologies: ["Rust", "C", "LISP"],
		reference: {
			label: "Build Your Own Lisp",
			url: "https://www.buildyourownlisp.com/",
		},
	},
	{
		name: "AnotherPhysicsEngine",
		description:
			"A handmade physics engine in C++ and Rust using RK45 integrators. It includes interactive Lorenz-attractor, particle-collision, and pendulum simulations, with real-time SDL rendering for trajectories and phase spaces.",
		github: "https://github.com/Another-DevX/Physics-simulation",
		technologies: ["C++", "Rust", "SDL", "RK45"],
		featured: true,
	},
	{
		name: "Fluid Mechanics",
		description:
			"A real-time 2D fluid solver in C++, developed after deriving the Navier–Stokes equations for incompressible, inviscid fluids from first principles. It implements advection, pressure projection, boundary handling, and an SFML visualization pipeline.",
		github: "https://github.com/Another-DevX/FluidMechanics",
		technologies: ["C++", "SFML", "Fluid dynamics"],
		featured: true,
	},
	{
		name: "TBP & RTBP Simulations",
		description:
			"An exploration of the Three-Body and Restricted Three-Body Problems using symplectic and RK45 integrators. The simulations and Poincaré sections reveal qualitative chaotic behavior through numerical experimentation.",
		github:
			"https://github.com/Another-DevX/003_EstudiantesMetodosCompu/tree/main/Estudiantes/Manco/proyecto",
		technologies: ["Numerical methods", "RK45", "Dynamical systems"],
	},
	{
		name: "Zero to Zero-Knowledge Workshop",
		description:
			"A practical ETHCDM 2025 workshop introducing zero-knowledge proofs with Noir. The material takes participants from foundational concepts and circuit building to proof generation and on-chain smart-contract verification.",
		github: "https://github.com/Another-DevX/zero-to-zero-knowledge",
		technologies: ["Noir", "Zero knowledge", "Smart contracts"],
	},
	{
		name: "px402",
		description:
			"A privacy-preserving implementation of the x402 payment protocol. It combines Noir circuits, a Merkle-tree shielded pool, Solidity contracts, a payment facilitator, and on-chain settlement for private web payments.",
		github: "https://github.com/Ariiellus/px402",
		featured: true,
		technologies: ["Noir", "Solidity", "x402", "Merkle trees", "TypeScript"],
	},
	{
		name: "Naive ZK-SNARK",
		description:
			"A minimal zero-knowledge argument of polynomial divisibility implemented in Rust using arkworks and pairing-based commitments inspired by KZG.",
		github: "https://github.com/Another-DevX/naive-zk-snark",
		technologies: ["Rust", "arkworks", "ZK-SNARKs", "KZG"],
		reference: {
			label: "Why and How zk-SNARK Works",
			url: "https://arxiv.org/abs/1906.07221",
		},
	},
	{
		name: "ZK Token Gating & Merkle Membership",
		description:
			"A pair of zero-knowledge experiments for private access control: a token-gated system that proves eligibility without exposing wallet details, and a circuit that proves a private leaf belongs to a Merkle tree without revealing the member or its position.",
		github: "https://github.com/Another-DevX/zk-token-gating",
		technologies: ["Zero knowledge", "Token gating", "Merkle trees", "Privacy"],
		repositories: [
			{
				label: "zk-token-gating",
				url: "https://github.com/Another-DevX/zk-token-gating",
			},
			{
				label: "merkle-tree-membership-circuit",
				url: "https://github.com/Another-DevX/merkle-tree-membership-circuit",
			},
		],
	},
];

export const openSourceContributions: OpenSourceContribution[] = [
	{
		name: "Foundry",
		organization: "foundry-rs",
		description:
			"Improved smart-contract development ergonomics with a deterministic RNG seed cheatcode and support for verifying Vyper contracts, including the required Vyper JSON code format in the block-explorer tooling.",
		repository: "https://github.com/foundry-rs/foundry",
		technologies: ["Rust", "Solidity", "Vyper", "Testing"],
		pullRequests: [
			{ label: "useSeed cheatcode", url: "https://github.com/foundry-rs/foundry/pull/10698", status: "merged" },
			{ label: "Vyper verification", url: "https://github.com/foundry-rs/foundry/pull/10864", status: "merged" },
			{ label: "Vyper JSON format", url: "https://github.com/foundry-rs/block-explorers/pull/91", status: "merged" },
		],
	},
	{
		name: "Reth",
		organization: "paradigmxyz",
		description:
			"Contributed developer-experience and extensibility improvements to the Rust Ethereum client, adding CLI hardfork activation overrides and making the Ethereum EVM configuration generic over its chain specification.",
		repository: "https://github.com/paradigmxyz/reth",
		technologies: ["Rust", "Ethereum", "EVM", "DevEx"],
		pullRequests: [
			{ label: "Hardfork CLI overrides", url: "https://github.com/paradigmxyz/reth/pull/16589", status: "closed" },
			{ label: "Generic ChainSpec", url: "https://github.com/paradigmxyz/reth/pull/16758", status: "merged" },
		],
	},
	{
		name: "Alloy",
		organization: "alloy-rs",
		description:
			"Implemented a finalized-block stream for Alloy providers using slot-aware polling, caching, and RPC-error fallback, enabling lightweight real-time finality tracking without direct beacon-node integration.",
		repository: "https://github.com/alloy-rs/alloy",
		technologies: ["Rust", "Ethereum RPC", "Streams", "Finality"],
		pullRequests: [
			{ label: "FinalizedBlocksStream", url: "https://github.com/alloy-rs/alloy/pull/2665", status: "open" },
		],
	},
	{
		name: "Safe",
		organization: "safe-global",
		description:
			"Improved ERC-4337 reliability by fixing EntryPoint v0.7 compatibility in the Safe SDK, updating module dependencies, and adding Safe Modules v0.3.0 deployment records for Celo Mainnet.",
		repository: "https://github.com/safe-global/safe-core-sdk",
		technologies: ["TypeScript", "ERC-4337", "Safe SDK", "Celo"],
		pullRequests: [
			{ label: "EntryPoint v0.7 fix", url: "https://github.com/safe-global/safe-core-sdk/pull/1160", status: "closed" },
			{ label: "Module dependency update", url: "https://github.com/safe-global/safe-core-sdk/pull/1209", status: "closed" },
			{ label: "Celo deployments", url: "https://github.com/safe-global/safe-modules-deployments/pull/54", status: "merged" },
		],
	},
	{
		name: "Builder’s Hub",
		organization: "Avalanche",
		description:
			"Contributed UI maintenance and broader platform hardening, from upgrading shared shadcn components to session-derived authorization, Markdown sanitization, and centralized role-based access control.",
		repository: "https://github.com/ava-labs/builders-hub",
		technologies: ["TypeScript", "Next.js", "UI", "Security"],
		pullRequests: [
			{ label: "shadcn UI upgrade", url: "https://github.com/ava-labs/builders-hub/pull/2174", status: "closed" },
			{ label: "Auth & XSS hardening", url: "https://github.com/ava-labs/builders-hub/pull/3819", status: "merged" },
			{ label: "Centralized RBAC", url: "https://github.com/ava-labs/builders-hub/pull/4230", status: "open" },
		],
	},
];
