export enum gameColumns {
	TITLE = "TITLE",
	CONSOLE = "CONSOLE",
	REGION = "REGION",
	LANGUAGE = "LANGUAGE",
	EDITION = "EDITION",
	COMPLETE = "COMPLETE",
	CASE_TYPE = "CASE_TYPE",
	MISC = "MISC"
};

export interface GameTemplate {
	TITLE?: string;
	CONSOLE?: string;
	REGION?: string;
	LANGUAGE?: string;
	EDITION?: string;
	COMPLETE?: boolean;
	CASE_TYPE?: string;
}

export interface MinimalGame extends GameTemplate {
	TITLE: string;
	CONSOLE: string;
	MISC?: string | null;
}

export interface Game extends MinimalGame {
	MISC: string | null;
}