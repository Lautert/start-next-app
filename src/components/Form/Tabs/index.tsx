import React, { Component } from 'react';

import Tab from "./Tab";
import './tab.scss';

interface Props {
	children: Array<any>
}

interface State {
	activeTab: string
}

class Tabs extends React.Component<Props, State> {
	constructor(props:Props) {
		super(props);

		this.state = {
			activeTab: this.props.children[0].props.title,
		};
	}

	onClickTabItem = (tab:string) => {
		this.setState({ activeTab: tab });
	}

	render() {
		const { children } = this.props;
		const { activeTab } = this.state;

		return (
			<div className="tabs">
				<ol className="tab-list">
					{children.map((child: React.ReactElement) => {
						const { title } = child.props;

						return (
							<Tab
								activeTab={activeTab}
								key={title}
								name={title}
								onClick={this.onClickTabItem}
							/>
						);
					})}
				</ol>
				<div className="tab-content">
					{children.map((child: React.ReactElement) => {
						if (child.props.title !== activeTab) return undefined;
						return child.props.children;
					})}
				</div>
			</div>
		);
	}
}

export default Tabs;
