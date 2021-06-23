import {
	createFormValidation,
	ValidationConstraints
} from "lc-form-validation";

import { dataRequired } from '@/utils/form.validations';

const formValidationConstraints: ValidationConstraints = {
	fields: {
		name: [
			{ validator: dataRequired }
		],
		pass: [
			{ validator: dataRequired }
		]
	}
};

export const loginFormValidate = createFormValidation(
	formValidationConstraints
);
