import { getDomain } from '@/_domains';
import { Response } from '@/commum/model/response';
import { Token } from '@/commum/model/token';
import apiService from '@/commum/services/api.service';

import qs from 'querystring';

const AppDomain = (): string => getDomain('Login');
const ApiRoot: string = 'auth/realms/master/protocol/openid-connect/token';

export interface loginParams{
	client_id: string,
	grant_type: string,
	username: string,
	password: string
}

export const login = (username: string, password: string): Promise<Response<Token>> => {
	const data = {
		client_id: "nbc-web",
		grant_type: "password",
		username: username,
		password: password
	}

	let result: Response<Token> = {
		code: 500,
		message_code: undefined,
		message: undefined,
		data: null
	}
	return new Promise<Response<Token>>((resolve, reject) => {
		let _data: any =  qs.stringify(data);
		apiService.post<Token>(
			`${AppDomain()}/${ApiRoot}`,	// URL
			_data,		// DATA
			{
				'content-type': 'application/x-www-form-urlencoded',	// HEADERS
			},
			{
				responseType: "application/json", // AXIOS CONFIG
				rejectUnauthorized: false
			}
		).then((response) => {
			result.code = 200;
			result.data = response;
			resolve(result)
		})
		.catch((response) => {
			response = response.response || {};
			let body = response.data || {};
			result.message = body.error || 'Serviço fora do ar no momento, tente novamente mais tarde!';
			result.code = response.status || 500;

			if(result.code === 401){
				result.message = "Usuário ou senha incorretos"
			}

			resolve(result);
		});
	});
};
