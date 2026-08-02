export interface SiteConfig {
	author: string;
	email: string;
	github: string;
	date: {
		locale: string | string[] | undefined;
		options: Intl.DateTimeFormatOptions;
	};
	description: string;
	lang: string;
	linkedin: string;
	ogLocale: string;
	role: string;
	title: string;
}

export interface SiteMeta {
	articleDate?: string | undefined;
	description?: string;
	ogImage?: string | undefined;
	title: string;
}
