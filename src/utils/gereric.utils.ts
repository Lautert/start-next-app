export function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export const toMask = (mask: string, value: any, char: string = '#') => {

	// value.toString().split(/(?=)/).forEach((v: string) => {
	// 	mask = mask.replace(regex, v);
	// });
	let regex = new RegExp("[^" + char + "]", "g");
	value = value.toString();
	mask.replace(regex, "").split(/(?=)/).forEach((v: string, i: number) => {
		mask = mask.replace(char, value[i]);
	});

	return mask;
}

const toDateBRByDate = (date: Date, withHour: boolean = false) => {
	let y = (date.getUTCFullYear()).toString();
	let m = (date.getUTCMonth() + 1).toString().padStart(2, "0");
	let d = (date.getUTCDate()).toString().padStart(2, "0");
	let h = (date.getUTCHours()).toString().padStart(2, "0");
	let i = (date.getUTCMinutes()).toString().padStart(2, "0");
	let s = (date.getUTCSeconds()).toString().padStart(2, "0");
	let mask = withHour ? '##/##/#### ##:##:##' : '##/##/####';

	return toMask(mask, d + m + y + h + i + s, '#');
}

const toDateBRByString = (date: String, withHour: boolean = false) => {

	let y = "";
	let m = "";
	let d = "";
	let h = "";
	let i = "";
	let s = "";

	// DATE BR
	let matchs = date.match(/(\d{2}).(\d{2}).(\d{4})(.?(\d{2}).(\d{2})(.(\d{2}))?)?/);
	if (matchs) {
		y = matchs[3];
		m = matchs[2];
		d = matchs[1];

		h = matchs[5] || "00";
		i = matchs[6] || "00";
		s = matchs[8] || "00";
	}

	// DATE EUA
	matchs = date.match(/(\d{4}).(\d{2}).(\d{2})(.?(\d{2}).(\d{2})(.(\d{2}))?)?/);
	if (matchs) {
		y = matchs[1];
		m = matchs[2];
		d = matchs[3];

		h = matchs[5] || "00";
		i = matchs[6] || "00";
		s = matchs[8] || "00";
	}

	let mask = withHour ? '##/##/#### ##:##:##' : '##/##/####';
	return toMask(mask, d + m + y + h + i + s, "#");
}

export const toDateBR = (value: any, withHour: boolean = false): string => {
	if (value instanceof Date) {
		return toDateBRByDate(value, withHour);
	} else
		if (value instanceof String || typeof value == "string") {
			return toDateBRByString(value, withHour);
		}
	return value;
}

export const stringToDate = (date: string | Date | null | undefined, withHour: boolean = true): Date | undefined => {
	if (!date) return undefined;
	let y = 0;
	let m = 0;
	let d = 0;
	let h = 0;
	let i = 0;
	let s = 0;

	if (date instanceof Date) {
		y = date.getUTCFullYear();
		m = date.getUTCMonth();
		d = date.getUTCDate();
		h = date.getUTCHours();
		i = date.getUTCMinutes();
		s = date.getUTCSeconds();
	} else {
		// DATE BR
		let matchs = date.match(/(\d{4})[-/](\d{2})[-/](\d{2})([T ]?(\d{2}):(\d{2})(:(\d{2}))?)?/);
		if (matchs) {
			y = Number.parseInt(matchs[1]);
			m = (Number.parseInt(matchs[2]) - 1);
			d = Number.parseInt(matchs[3]);

			h = Number.parseInt(matchs[5] || "0");
			i = Number.parseInt(matchs[6] || "0");
			s = Number.parseInt(matchs[8] || "0");
		}
	}
	return new Date(y, m, d, h, i, s);
}

const thousandSeparator = (value: string, separador: string = '.'): string => {
	const parts = value.match(/(\d+),(\d+)/);
	if (parts) {
		let numberPart: string = parts[1];
		numberPart = numberPart.split(/(?=(?:.{3})*$)/).join(separador);
		return numberPart + "," + parts[2];
	}
	return value;
}

const toNumberBRByNumber = (value: Number, needDecimal: boolean): string => {
	let number = value.toString().replace(',', '').replace('.', ',');
	if (!needDecimal) {
		return number;
	}
	let decimal = "";
	const hasDecimal = number.match(/,(\d+)/);
	if (hasDecimal) {
		decimal = hasDecimal[1];
	}
	decimal = decimal.padEnd(2, "0");
	let integer: any = number.match(/^(\d+)(,|$)/);
	integer = integer ? integer[1] : "0";
	let finalNumber = integer + "," + decimal;
	return thousandSeparator(finalNumber);
}

export const toNumberBR = (value: any, prefix: string = "R$ ", needDecimal: boolean = true): string => {
	if (value == null) {
		return "";
	}
	// const valueSize = Number.parseFloat(value).toString().length;
	if (value instanceof Number || /^\d+([,.]\d+)?$/.test(value)) {
		return prefix + toNumberBRByNumber(Number.parseFloat(value), needDecimal).toString();
	}
	return value.toString();
}

export const toNumberEUA = (value: string) => {
	const parts = value.split(',');
	if (parts) {
		let numberPart = parts[0].replace(/\D/g, '');
		let decimalPart = "00";
		if(parts[1]){
			decimalPart = parts[1].replace(/\D/g, '');
		}
		return numberPart+"."+decimalPart;
	}
	return value;
	// let decimal = /^\d+,(\d+)$/.test(value) ? value.replace(/^\d+,(\d+)$/, '$1').length : 0;
	// let regex = new RegExp('(\\d+)(\\d{' + decimal + '})');
	// return value.replace(/\D/g, '').replace(regex, '$1.$2');
}

export const ucwords = (str: string): string => {
	return str.replace(/(\b[a-z])/ig, function ($1) {
		return $1.toUpperCase();
	});
}

// CONVERT CAMELCASE TO LOWER CASE STRING SEPARATED BY UNDERLINE
export const underscore = (str: string): string => {
	return str.replace(/([a-z])([A-Z])/g, function ($0, $1, $2) {
		return $1 + "_" + $2;
	}).toLowerCase();
}

// CONVERT STRING SEPARATED BY UNDERLINE TO WORDS WITH FIRST LETTER UPPER
export const humanize = (str: string): string => {
	return ucwords(str.replace('_', ' '));
}

// CONVERT STRING SEPARATED BY UNDERLINE TO CAMELCASE
export const camelize = (str: string): string => {
	return ucwords(str.replace('_', ' ')).replace(' ', '');
}

// CONVERT TO WORDS WITH FIRST LETTER UPPER
export const _humanize = (str: string): string => {
	return humanize(underscore(str));
}
