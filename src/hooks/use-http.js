import { useState, useCallback } from "react";

const useHttp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const sendRequest = useCallback(
		async (requestConfig, handleData = null, handleError = null) => {
			setIsLoading(true);
			setError(null);
			try {
				const response = await fetch(requestConfig.url, {
					method: requestConfig.method || "GET",
					headers: requestConfig.headers || {},
					body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
				});
				if (!response.ok) {
					throw new Error("Something went wrong while sending request!");
				}
				if (handleData != null && typeof handleData === "function") {
					const responseData = await response.json();
					handleData(responseData);
				}
			} catch (error) {
				setError(error.message);
				handleError(error);
			}
			setIsLoading(false);
		},
		[]
	);

	return [sendRequest, isLoading, error];
};

export default useHttp;
