export interface AxiosResponse {
	response: {
		data: ApiError;
	};
}

export interface ApiError {
	error_code: string;
	error_description: string;
}
