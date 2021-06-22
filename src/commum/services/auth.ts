import * as jwt from "jsonwebtoken";
import { localstore } from '@/utils/local-storage';
import { Token } from '@/commum/model/token';

const ACCESS_TOKEN: string = "access-token";
const REFRESH_TOKEN: string = "refresh-token";

export interface PermissionAccess {
    [key: string]: boolean
}

export interface UserSession {
    permissions: []
}

export interface JWTPayload extends UserSession {
    exp: number;
    roles: string[];
}

export const decodeJWT = (token: string): JWTPayload | undefined => {
    const decoded = jwt.decode(token);
    if (!decoded) return undefined;
    return decoded as JWTPayload;
};

// const getUnixTimestampSeconds = () => {
// 	return Math.round(new Date().getTime() / 1000);
// };

// const getSecondsUntilExpired = () : Number => {
// 	const token = getAccessToken();
// 	if (!token) return 0;
// 	const decoded = decodeJWT(token.access_token);
// 	if (!decoded) return 0;
// 	return decoded.exp - getUnixTimestampSeconds();
// };

export const isAuthenticated = () => {
    return true;
    // const expired = getSecondsUntilExpired() > 0;
    // const token: Token = getAccessToken();
    // return expired && !!token.access_token;
}

export const hasPermission = (role: string) => {
    return true
}

export const hasPermissionPrd = (role: string) => {
    const userSession: UserSession | undefined = localstore.get<UserSession>('UserSession');
    let _result: boolean = false;
    if (userSession) {

        let permissions: PermissionAccess = {};

        // PEGA AS PERMISSIOES QUE ESTAO NO TOKEN
        const token: Token = getAccessToken();
        const tokenData: JWTPayload | undefined = decodeJWT(token.access_token);
        if (tokenData) {
            for (let [key, value] of Object.entries(tokenData.roles)) {
                permissions[key] = true;
                return null;
            }
        }
        // MESCLA COM AS QUE ESTAO NO USUARIO
        if (userSession.permissions) {
            for (let key in userSession.permissions) {
                permissions[key] = userSession.permissions[key];
            }
        }
        // MANTEL APENAS AS "KEYS" DAS QUE TEM PERMISSÃO
        let userPermissions: string[] = [];
        for (let key in permissions) {
            if (permissions[key]) {
                userPermissions.push(key);
            }
        }

        // VERIFICA SE ROLE ESTA DENTRO DAS PERMISSOES
        _result = userPermissions.indexOf(role) > -1;
        if (!_result) {
            _result = userPermissions.indexOf("ROLE_ADMIN") > -1
        }
        return _result;
    }
    return true;
};

export const reset = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
};

export const getAccessToken = (): Token => {
    const token: string = localStorage.getItem(ACCESS_TOKEN) || "";
    return token.length > 0 ? JSON.parse(token) : null;
};

export const getRefreshToken = (): Token => {
    const token: string = localStorage.getItem(REFRESH_TOKEN) || "";
    return token.length > 0 ? JSON.parse(token) : null;
};

export const setAccessToken = (token: Token) => {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(token));
};

export const setRefreshToken = (token: Token) => {
    localStorage.setItem(REFRESH_TOKEN, JSON.stringify(token));
};

const getAccessTokenFromRefreshToken = (token: Token) : Token => {
	return getRefreshToken();
};

export const ensureAuth = async () => {
	try {
		// If access token is expired attempt to get another via the refresh token
		if (!isAuthenticated()) {
			const refreshToken = getRefreshToken();
			if (!refreshToken) throw new Error("Missing refresh token");
			const accessToken = await getAccessTokenFromRefreshToken(refreshToken);
			setAccessToken(accessToken);
		}
		return getAccessToken()!;
	} catch (e) {
		// If unable to get a new id token then purge everything for a fresh login
		// Perform any actions necessary to reflect an unauthenticated state
		reset();
		throw new Error("Unauthorized to complete request");
	}
};
