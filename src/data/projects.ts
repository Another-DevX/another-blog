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
