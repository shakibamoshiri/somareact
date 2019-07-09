import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';
import SlickX from './SlickX.js';

const children = [
    <h1>one</h1>,
    <h1>one</h1>,
    <h1>one</h1> 
];
let length = -1,
    dom;

describe('SlickX Component:', () => {

    dom = shallow( <SlickX children={ children } /> );

    it( `for ${children.length} children we should have ${children.length} divs`, () => {
        length = dom.find( ".slick-x > div" ).length;
        expect( length ).toBe( children.length );
    })
});

