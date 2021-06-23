import React from "react";

import Button, { ButtonTypes } from '@/components/Form/Button';

interface PropsFormFilter {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	onClear: () => void;
}

class FormFilter extends React.Component<PropsFormFilter>{
	render() {
		return (
			<>
				<form className="form-filter" onSubmit={(e) => this.props.onSubmit(e)}>
					<div className="form-filter-fields">
						{this.props.children}
					</div>
					<div className="form-filter-actions">
						<Button
							className="form-filter-clear"
							type={ButtonTypes.BUTTON}
							text="Limpar"
							icon="eraser"
							onClick={() => this.props.onClear()}
							classDiv={false}
							divProps={{
								style: {
									width: '120px'
								}
							}}
						/>
						<Button
							className="form-filter-submit"
							type={ButtonTypes.SUBMIT}
							text="Buscar"
							icon="search"
							classDiv={false}
							divProps={{
								style: {
									width: '120px'
								}
							}}
						/>
					</div>
				</form>
			</>
		);
	}
}
export default FormFilter;
