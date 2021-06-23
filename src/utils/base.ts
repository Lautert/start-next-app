interface NewBaseInterface {
	base: string[];
	encode: (inteiro: number) => string;
	decode: (value: string) => number;
}

const NewBase: NewBaseInterface = {
	base: (() => {
		let i: number;
		let base: string[] = [];
		for (i = 0; i < 10; i++) { base.push(i.toString()); }
		for (i = 65; i < 91; i++) { base.push(String.fromCharCode(i)); }
		for (i = 97; i < 123; i++) { base.push(String.fromCharCode(i)); }
		return base;
	})(),
	encode: (inteiro: number): string => {

		const base = NewBase.base;

		if (inteiro === undefined || inteiro === null || inteiro < 0 || Number.isNaN(inteiro) || /^[0-9]+$/.test(inteiro.toString()) === false) {
			return '';
		}

		if (inteiro < base.length) {
			return base[inteiro];
		}

		let quocientes: number[] = [];
		let divNumber = inteiro;
		do {
			let div = Math.floor(divNumber / base.length);
			let resto = divNumber - (base.length * div);
			quocientes.push(resto);
			divNumber = div;
		} while (divNumber >= base.length);
		quocientes.push(divNumber);

		return quocientes.reverse().map((curr, i) => {
			return base[quocientes[i]];
		}).join('');
	},
	decode: (value: string): number => {
		const base = NewBase.base;

		if (value === undefined || value === null || value.length === 0 || /^[a-zA-Z0-9]+$/.test(value) === false) {
			return 0;
		}

		if (value.length <= 1) {
			return base.indexOf(value);
		}

		let somar: number[] = [];
		value.split(/(?<=)/).reverse().map((curr, i) => {
			const dec = base.indexOf(curr);
			const numPos = dec * (Math.pow(base.length, i));
			somar.push(numPos);
			return null;
		});
		return somar.reduce((a, b) => a + b, 0)
	}
}

export const encode = NewBase.encode;
export const decode = NewBase.decode;
