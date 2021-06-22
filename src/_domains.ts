import { ENVIRONMENT } from "./_env";
import * as localstore from "../src/utils/local-storage";
// import { show as showDomain, hidden as hiddenDomain } from "src/framework/components/Aside/store/action";

export interface Domain {
	service: string;
	domain: string;
	status?: boolean;
}

const defaultDomain =
	ENVIRONMENT === 'local' ?
		'http://192.168.0.101' :
		`http://${window.location.hostname}`
	;

export let domains: Domain[] = [];
domains = [
	{ service: 'Teste', domain: `${defaultDomain}:8080` },
];

const exists = localstore.get<Domain[]>("domains");
if (!exists) {
	localstore.set("domains", domains);
} else
	if (exists && exists.length !== domains.length) {
		const currentList: Domain[] = exists;
		domains.map((curr, i) => {
			if (currentList[i] !== undefined) {
				domains[i] = currentList[i];
			}
			return null;
		});
		localstore.set("domains", domains);
	}

const x = localstore.get('allowChangeDomain');
if (!x) {
	localstore.set("allowChangeDomain", false);
}

export const getDomain = (name: string): string => {
	const domains = localstore.get<Domain[]>("domains");
	return domains?.filter((curr: Domain) => curr.service === name)[0]?.domain || defaultDomain;
};

declare global {
	interface Window { allowChangeDomain: (bool?: boolean) => void; }
}

// window.allowChangeDomain = (bool?: boolean) => {
// 	if (typeof bool !== "boolean") bool = true;
// 	if (bool) {
// 		store.dispatch(showDomain());
// 	} else {
// 		store.dispatch(hiddenDomain());
// 	}
// 	localstore.set("allowChangeDomain", bool);
// };
