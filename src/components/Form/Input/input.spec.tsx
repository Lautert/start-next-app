import React from 'react';
import { mount, shallow } from 'enzyme';

import Input from './Input';

describe('Common Input', () => {
	let wrapper;

	beforeEach(() => (wrapper = shallow(<Input
		name="test-input"
	/>)));

	it('should render a <div />', () => {
		expect(wrapper.find('div').length).toEqual(1);
	});

	it('Input -> Commun', () => {
		const wrapper = mount(<Input name="test-input" />);
		var div = wrapper.children('div');
		expect(div.length).toEqual(1);

		expect(div.find('input').props().name).toEqual('test-input');
		expect(div.hasClass('template_imput')).toBe(true);
	});

	it('Input -> Icon', () => {
		const wrapper = mount(<Input
			name="test-input"
			icon="user"
		/>);

		var div = wrapper.children('div');

		expect(div.children('span').children('i').length).toEqual(1);
		expect(div.children('span').children('i').hasClass('icon-user')).toBe(true);
	});

	it('Input -> Value', () => {
		const wrapper = mount(<Input
			name="test-input"
			value="R$ 15,99"
		/>);
		expect(wrapper.find('input').props().value).toEqual('R$ 15,99');
	});

	it('Input -> Mask', () => {
		const wrapper = mount(<Input
			name="test-input"
			mask="99.999.999/9999-99"
			value="13033315000187"
		/>);
		expect(wrapper.find('input').props().value).toEqual('13.033.315/0001-87');
	});
});


