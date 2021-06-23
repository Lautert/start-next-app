import { stringToDate } from './gereric.utils';
import { FieldValidationResult } from "lc-form-validation";

function _cnpj(cnpj: string): boolean {
	cnpj = cnpj.replace(/[^\d]+/g, '');

	if (cnpj === '') return false;
	if (cnpj.length !== 14) return false;
	if (/^(\d)\1{13}$/.test(cnpj)) return false;

	var tamanho: number = cnpj.length - 2
	var numeros: string = cnpj.substring(0, tamanho);
	var digitos: string = cnpj.substring(tamanho);
	var soma: number = 0;
	var pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2)
			pos = 9;
	}
	let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado.toString() !== digitos.charAt(0)) return false;
	tamanho = tamanho + 1;
	numeros = cnpj.substring(0, tamanho);
	soma = 0;
	pos = tamanho - 7;
	for (let i = tamanho; i >= 1; i--) {
		soma += Number.parseInt(numeros.charAt(tamanho - i)) * pos--;
		if (pos < 2)
			pos = 9;
	}
	resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
	if (resultado.toString() !== digitos.charAt(1)) return false;

	return true;
}

export const cnpj = (value: any, vm: any, customParams: any): FieldValidationResult => {
	let isValid = _cnpj(value);
	let errorMessage = "O CNPJ informado não é válido!";

	const validationResult = new FieldValidationResult();

	validationResult.succeeded = isValid;
	validationResult.type = 'NOT_PRIOR_CURRENT_DATE';
	validationResult.errorMessage = isValid ? '' : errorMessage;
	return validationResult;
}

export const dataRequired = (value: any, vm: any, customParams: any): FieldValidationResult => {
	if (typeof value === 'number') {
		value = value > 0
	}

	let isValid = !!value;
	let errorMessage = 'O campo informado não é valido';

	const validationResult = new FieldValidationResult();

	validationResult.succeeded = isValid;
	validationResult.type = 'NOT_PRIOR_CURRENT_DATE';
	validationResult.errorMessage = isValid ? '' : errorMessage;
	return validationResult;
}

export const dateValidate = (value: any, vm: any, customParams: any): FieldValidationResult => {
	let isValid = !!value;
	let errorMessage = "A data informada não é válida!";

	const validationResult = new FieldValidationResult();

	validationResult.succeeded = isValid;
	validationResult.type = 'NOT_PRIOR_CURRENT_DATE';
	validationResult.errorMessage = isValid ? '' : errorMessage;
	return validationResult;
}

export const dataMaxCurrent = (value: any, vm: any, customParams: any): FieldValidationResult => {
	let isValid = !!value;

	if(isValid){
		if(!(value instanceof Date)){
			value = stringToDate(value.toString());
		}
		isValid = value.getTime() < (new Date()).getTime();
	}

	let errorMessage = "A data informada não pode ser superior a atual";
	const validationResult = new FieldValidationResult();

	validationResult.succeeded = isValid;
	validationResult.type = 'NOT_PRIOR_CURRENT_DATE';
	validationResult.errorMessage = isValid ? '' : errorMessage;
	return validationResult;
}

//Validação de Email
export const emailValidate = (value: any, vm: any, customParams: any): FieldValidationResult => {
	let isValid = /^([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value.toString());
	let errorMessage = "O email informado não é válido";

	const validationResult = new FieldValidationResult();

	validationResult.succeeded = isValid;
	validationResult.type = 'NOT_PRIOR_CURRENT_DATE';
	validationResult.errorMessage = isValid ? '' : errorMessage;
	return validationResult;
}



