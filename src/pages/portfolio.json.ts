import type { APIRoute } from "astro";
import { openSourceContributions, projects } from "../data/projects";
import { siteConfig } from "../site.config";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
	const baseURL = site ?? new URL("https://an.otherdev.xyz");
	const absoluteURL = (path: string) => new URL(path, baseURL).href;
	const portfolio = {
		schemaVersion: 1,
		profile: {
			name: siteConfig.author,
			role: siteConfig.role,
			email: siteConfig.email,
			github: siteConfig.github,
			linkedin: siteConfig.linkedin,
			website: absoluteURL("/"),
			about: absoluteURL("/about/"),
		},
		portfolio: absoluteURL("/projects/"),
		projects: projects.map((project) => ({
			...project,
			featured: project.featured ?? false,
			portfolioURL: absoluteURL(`/projects/#${project.id}`),
		})),
		openSourceContributions: openSourceContributions.map((contribution) => ({
			...contribution,
			portfolioURL: absoluteURL(`/projects/#contribution-${contribution.id}`),
		})),
	};

	return new Response(JSON.stringify(portfolio, null, 2), {
		headers: {
			"Content-Type": "application/json; charset=utf-8",
			"Cache-Control": "public, max-age=3600",
		},
	});
};
