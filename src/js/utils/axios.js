const axios = require("axios").default;

export default () => {
	const instance = axios.create({
		headers: {
			"Content-type": "application/json"
		},
	});
	instance.interceptors.request.use((x) => {
		// to avoid overwriting if another interceptor
		// already defined the same object (meta)
		x.meta = x.meta || {};
		x.meta.requestStartedAt = new Date().getTime();
		return x;
	});

	instance.interceptors.response.use((x) => {
		x.responseTimer = new Date().getTime() - x.config.meta.requestStartedAt;
		return x;
	});

	return instance;
};
