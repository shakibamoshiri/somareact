import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import { shallow, mount, render } from 'enzyme';
import SlickZ from './SlickZ.js';


const titles = [ "A", "B", "C" ];
const children = [
    <h1>one</h1>,
    <h1>one</h1>,
    <h1>one</h1> 
];
let length = -1,
    dom,
    labels;

describe('SlickZ Component:', () => {

    dom = shallow( <SlickZ titles={ titles } children={ children } /> );
    it( `for  ${titles.length} titles we should have ${titles.length} labels`, () => {
        length = dom.find( ".slick-z-indicator > label" ).length;
        expect( length ).toBe( titles.length );
    })

    it( `for ${children.length} children we should have ${children.length} sections`, () => {
        length = dom.find( ".slick-z > section" ).length;
        expect( length ).toBe( children.length );
    })

    it( "Initial state.activeSwitch should be 1", () => {
        expect( dom.state( 'activeSwitch' ) ).toBe( 1 );
    })

    it( "label.dataset.switch should be equal to array index", () => {
        dom.find( ".slick-z-indicator" ).children().forEach( ( label, index ) => {
            expect( +label.prop( "data-switch" ) ).toBe( index );
        });
    })
});

