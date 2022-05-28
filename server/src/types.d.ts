declare module 'vfile-message' {
	export interface VFileMessage extends Error {
		[key: string]: unknown;
	}
}
