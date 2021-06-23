import React, { Component } from 'react';

interface Props {
	activeTab: string,
	name: string,
	onClick: (label:string) => void,
}

class Tab extends React.Component<Props> {

	onClick = () => {
		const { name, onClick } = this.props;
		onClick(name);
	}

	render() {
		const {
			onClick,
			props: {
				activeTab,
				name,
			},
		} = this;

		let className = 'tab-list-item';
		if (activeTab === name) {
			className += ' tab-list-active';
		}

		return (
			<li
				className={className}
				onClick={onClick}
			>
				{name}
			</li>
		);
	}
}

export default Tab;