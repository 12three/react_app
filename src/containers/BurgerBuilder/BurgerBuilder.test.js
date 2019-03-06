import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BurgerControls from '../../components/BurgerControls/BurgerControls';

configure({
    adapter: new Adapter(),
})

describe('<BurgerBuildr />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder />);
    })

    it('should render <BuildControls /> if recived ingredients', () => {
        wrapper = shallow(<BurgerBuilder ings={{ salad: { amount: 1, price: 1, }}}/>)

        expect(wrapper.find(BurgerControls)).toHaveLength(1);
    })
})