import { FieldValidationResult } from 'lc-form-validation';

export interface Login {
	name: string;
	pass: string;
}

export const createEmptyLogin = (): Login => ({
	name: "",
	pass: ""
});

export interface LoginFormErrors {
	name: FieldValidationResult;
	pass: FieldValidationResult;
}

export const createDefaultLoginFormErrors = (): LoginFormErrors => ({
	name: new FieldValidationResult(),
	pass: new FieldValidationResult(),
});
