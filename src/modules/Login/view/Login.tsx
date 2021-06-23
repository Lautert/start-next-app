import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import * as localstore from '@/utils/local-storage';

import './login.scss';

// MODULOS
import { Token } from '@/commum/model/token';
import { Response } from '@/commum/model/response';

// LOGIN
import {
	LoginFormErrors,
	Login,
	createEmptyLogin,
	createDefaultLoginFormErrors
} from '../model/login';
import { loginFormValidate } from './login.validate';

// SERVICES
import LoginService from '../services';
import { setAccessToken } from '@/commum/services/auth';
import { toast } from 'react-toastify';

// COMPONENTES
import Header from './Header';
import { lockScreenHidden, lockScreenShow } from '@/components/Composite/LockScreen/reducer/actions';
import Input, { InputTypes } from '@/components/Form/Input/Input';
import Button, { ButtonTypes } from '@/components/Form/Button';
import Check, { InputCheckOptions } from '@/components/Form/Check';

import {
	Container,
	CardGroup,
	Card,
	CardBody
} from 'reactstrap';

interface PropsLoginValidate extends RouteComponentProps {
	lockScreenHidden: () => void;
	lockScreenShow: () => void;
	history: any;
}

interface StateLoginValidate {
	login: Login;
	loginFormErrors: LoginFormErrors;
	lockScreen: boolean;
	saveData: boolean;
}

class LoginValidate extends React.Component<PropsLoginValidate, StateLoginValidate> {

	constructor(props: any) {
		super(props);

		const saveData = localstore.get<boolean>('saveLoginData') || false;
		let login = createEmptyLogin();

		if (saveData) {
			login.name = localstore.get('name') || '';
			login.pass = localstore.get('pass') || '';
		}

		this.state = {
			login: login,
			loginFormErrors: createDefaultLoginFormErrors(),
			lockScreen: false,
			saveData: saveData,
		}
	}

	onLogin() {
		loginFormValidate
			.validateForm(this.state.login)
			.then(formValidationResult => {
				if (formValidationResult.succeeded) {

					this.props.lockScreenShow();

					LoginService.login(this.state.login.name, this.state.login.pass)
						.then((response: Response<Token>) => {
							if (response.code === 200) {
								if (response.data) {
									setAccessToken(response.data);

									const { history } = this.props;
									history.push('/inicio');

									this.props.lockScreenHidden();
								}
							} else {
								this.props.lockScreenHidden();
								toast.warn(response.message || 'Não foi possivel realizar a solicitação');
							}
						})
				} else {
					const updatedLoginFormErrors = {
						...this.state.loginFormErrors,
						...formValidationResult.fieldErrors
					};
					this.setLoginFormErrors(updatedLoginFormErrors);
					// this.showFormMessageErrors();

					this.props.lockScreenHidden();
				}
			});
	}

	setLoginFormErrors(loginForm: LoginFormErrors) {
		this.setState({ loginFormErrors: loginForm });
	}

	onUpdateField(name: string, value: any) {
		this.setState({
			login: {
				...this.state.login,
				[name]: value
			}
		},
			() => {
				loginFormValidate
					.validateField(this.state.login, name, value)
					.then(fieldValidationResult => {
						this.setLoginFormErrors({
							...this.state.loginFormErrors,
							[name]: fieldValidationResult
						});
					});
				if (localstore.get<boolean>('saveLoginData')) {
					localstore.set('name', this.state.login.name);
					localstore.set('pass', this.state.login.pass);
				}
			});
	};

	render() {
		return (
			<>
				<LoginForm
					onLoginRequest={() => this.onLogin()}
					onUpdateField={(name: string, value: any) => this.onUpdateField(name, value)}
					login={this.state.login}
					loginFormErrors={this.state.loginFormErrors}
					saveData={this.state.saveData}
					onUpdateSaveData={(checked) => {
						this.setState({
							saveData: checked
						});
						localstore.set('saveLoginData', checked);
					}}
				/>
			</>
		);
	}
}

interface PropsLoginForm {
	onLoginRequest: () => void;
	onUpdateField: (name: string, value: any) => void;
	onUpdateSaveData: (checked: boolean) => void;
	login: Login;
	loginFormErrors: LoginFormErrors;
	saveData: boolean;
}

class LoginForm extends React.Component<PropsLoginForm> {

	handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const { onLoginRequest } = this.props;

		onLoginRequest();
	}

	handleUpdateValueByEvt(e: React.ChangeEvent<HTMLInputElement>) {
		const { name, value } = e.target
		this.handleUpdateValue(name, value);
	}

	async handleUpdateValue(name: string, value: string) {
		const { onUpdateField } = this.props;
		onUpdateField(name, value);
	}

	render() {
		return (
			<>
				<Header />
				<div className="content-login app flex-row align-items-center">
					<Container style={{ maxWidth: 600 }}>
						<div className="justify-content-center">
							<CardGroup>
								<Card className="p-4">
									<CardBody>
										<form onSubmit={(e) => this.handleSubmit(e)}>
											<h1 className="p-5">Login</h1>
											<p className="p-5 text-muted">Entrar em sua conta NBC Bank</p>
											<div className="content-inputs">
												<Input
													name="name"
													icon="user"
													label={false}
													placeholder="Usuario"
													classDiv="col-12"
													style={{
														marginLeft: '0',
														marginRight: '0'
													}}
													value={this.props.login.name}
													error={this.props.loginFormErrors.name.errorMessage !== ""}
													onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
														this.handleUpdateValueByEvt(evt)
													}}
												/>

												<Input
													name="pass"
													type={InputTypes.PASS}
													label={false}
													icon="lock"
													placeholder="Senha"
													classDiv="col-12"
													style={{
														marginLeft: '0',
														marginRight: '0'
													}}
													value={this.props.login.pass}
													error={this.props.loginFormErrors.pass.errorMessage !== ""}
													onChange={
														(evt: React.ChangeEvent<HTMLInputElement>) =>
															this.handleUpdateValueByEvt(evt)
													}
												/>

												<Check
													label={false}
													options={[
														{ label: "Salvar usuario e senha", checked: this.props.saveData }
													]}
													onChange={(option: InputCheckOptions) => {
														this.props.onUpdateSaveData(option.checked)
													}}
													classDiv="col-12"
													style={{
														marginLeft: '0',
														marginRight: '0'
													}}
												/>
											</div>
											<div className="content-buttons">
												<Button
													text="Entrar"
													type={ButtonTypes.SUBMIT}
													classDiv="primary"
													style={{
														marginLeft: '0',
														marginRight: '0'
													}}
												/>
												<Button
													text="Esqueceu a senha?"
													type={ButtonTypes.BUTTON}
													classDiv="link"
													style={{
														marginLeft: '0',
														marginRight: '0'
													}}
												/>
											</div>
										</form>
									</CardBody>
								</Card>
							</CardGroup>
						</div>
					</Container>
				</div>
			</>
		);
	}
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
	return {
		lockScreenHidden: () => { dispatch(lockScreenHidden()); },
		lockScreenShow: () => { dispatch(lockScreenShow()); }
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginValidate));
