export interface Response<T> {
	code: number;
	message_code?: number;
	message?: string;
	data?: T | null;
}
