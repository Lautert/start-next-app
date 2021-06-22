import axios, { AxiosRequestConfig } from "axios";
import { ensureAuth } from './auth';

const serialize = (obj: any, prefix?: any): string => {
	var str = [],
		p;
	for (p in obj) {
		if (obj.hasOwnProperty(p)) {
			var k = prefix ? prefix + "[" + p + "]" : p,
				v = obj[p];
			str.push((v !== null && typeof v === "object") ?
				serialize(v, k) :
				encodeURIComponent(k) + "=" + encodeURIComponent(v));
		}
	}
	return str.join("&");
}

type RequestMethod = AxiosRequestConfig["method"];

const Request = async <T>(
	method: RequestMethod,
	url: string,
	data?: object | null,
	header?: Object | null,
	axiosConfig?: Object | null,
	useToken?: boolean
): Promise<T> => {

	let headers = new Headers();
	headers.append('Content-Type', 'application/json');

	if (useToken) {
		headers.append('Authorization', 'Basic ' + await ensureAuth());
	}

	header = header || {};
	Object.assign(headers, header);

	let axiosDefault = {
		url: url,
		data: data,
		method: method,
		headers: headers
	}
	// axiosConfig = axiosConfig || {};
	// Object.assign(axiosDefault, axiosConfig);

	const response = await axios(axiosDefault);
	return response.data;
};

const get = <T>(endpoint: string, data?: any, header?: Object, axiosConfig?: Object, useToken?: boolean): Promise<T> => {
	if (!!data) {
		endpoint += '?' + serialize(data);
	}
	return Request("get", endpoint, null, header, axiosConfig, useToken);
};

const post = <T>(endpoint: string, data?: any, header?: Object, axiosConfig?: Object, useToken?: boolean): Promise<T> => {
	return Request("post", endpoint, data, header, axiosConfig, useToken);
};

const put = <T>(endpoint: string, data?: object, header?: Object, axiosConfig?: Object, useToken?: boolean): Promise<T> => {
	return Request("put", endpoint, data, header, axiosConfig, useToken);
};

const del = <T>(endpoint: string, data?: object, header?: Object, axiosConfig?: Object, useToken?: boolean): Promise<T> => {
	return Request("delete", endpoint, data, header, axiosConfig, useToken);
};

const outservice = {
	get: get,
	post: post,
	put: put,
	del: del
}
export default outservice;
