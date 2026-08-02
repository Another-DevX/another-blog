import type { APIRoute } from "astro";
import { openSourceContributions, projects } from "../data/projects";
import { siteConfig } from "../site.config";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseURL = site ?? new URL("https://an.otherdev.xyz");
	const absoluteURL = (path: string) => new URL(path, baseURL).href;
	const projectLinks = projects
		.map((project) => `- [${project.name}](${absoluteURL(`/projects/#${project.id}`)}): ${project.description}`)
		.join("\n");
	const contributionLinks = openSourceContributions
		.map((contribution) => `- [${contribution.name}](${absoluteURL(`/projects/#contribution-${contribution.id}`)}): ${contribution.description}`)
		.join("\n");

	const content = `# Another Dev

> ${siteConfig.role} and physics student working across programming languages, computational physics, cryptography, Ethereum infrastructure, privacy, and quantum computing.

This site is the professional portfolio and technical blog of Another Dev. Use the JSON portfolio for the complete canonical inventory, including technologies, featured flags, repositories, references, pull requests, and contribution statuses.

## Canonical resources

- [Machine-readable portfolio](${absoluteURL("/portfolio.json")}): Complete JSON inventory of projects, open-source contributions, links, and flags.
- [Projects and open-source contributions](${absoluteURL("/projects/")}): Human-readable portfolio with all project and contribution details.
- [Professional profile](${absoluteURL("/about/")}): Background, current role, skills, and contact information.
- [Technical writing](${absoluteURL("/posts/")}): Articles about physics, mathematics, privacy, and cryptography.

## Contact and identity

- Email: ${siteConfig.email}
- GitHub: ${siteConfig.github}
- LinkedIn: ${siteConfig.linkedin}

## Projects

${projectLinks}

## Open-source contributions

${contributionLinks}
`;

	return new Response(content, {
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
