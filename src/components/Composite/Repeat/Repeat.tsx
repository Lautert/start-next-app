import React from "react";

import './repeat.scss';
import Button from '@/components/Form/Button';
import { PropsTemplateInput } from '@/components/Form/TemplateInput/TemplateInput';

interface PropsRepeat extends Omit<PropsTemplateInput, 'only-icon' | 'with-icon'> {
	onAdd: (() => void) | false;
	onDelete: ((i: number) => void) | false;
	data: any[] | null;
	legend: string | React.ReactNode | React.ReactNode[];
	renderComponent: (data: any, i: number) => React.ReactNode
}

interface StateRepeat {
}

class Repeat extends React.Component<PropsRepeat, StateRepeat>{

	render() {
		return (
			<div
				{...this.props.divProps}
				className={
					'repeat-fieldset ' +
					(this.props.classDiv || "") +
					(this.props.error ? ' error' : '') +
					(this.props.disabled ? ' disabled' : '')
				}>
				<div>
					<div className="legend">
						{typeof this.props.legend === 'string' ?
							<h4>{this.props.legend}</h4> :
							this.props.legend
						}
						{!this.props.onAdd ? null :
							<Button
								onClick={this.props.onAdd}
								icon={"plus"}
								// onlyIcon={true}
								label={false}
								text={"Adicionar"}
								classDiv={""}
								classButton={"bg-success"}
								divProps={{
									style: {
										width: 'auto',
										maxHeight: '36px'
									}
								}}
							/>
						}
					</div>
					<div
						{...this.props.containerProps}
						className={
							"repeat-content " +
							(this.props.classContainer ? this.props.classContainer : "")
						}>
						{
							!this.props.data ? null :
								this.props.data.map((data: any, i: number) => {
									return <div className="repeat-line" key={i}>
										{!this.props.onDelete ? null :
											<div className="repeat-component-icon">
												<Button
													onClick={() => this.props.onDelete && this.props.onDelete(i)}
													icon={"times"}
													onlyIcon={true}
													label={false}
													text={""}
													classDiv={""}
													classButton={"bg-danger"}
													divProps={{
														style: {
															width: 'auto',
														}
													}}
												/>
											</div>
										}
										<div className="repeat-component-render">
											{this.props.renderComponent(data, i)}
										</div>
									</div>
								})
						}
					</div>
				</div>
			</div>
		);
	}
}
export default Repeat;
