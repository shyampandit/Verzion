import React, { useState } from 'react';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import SVGIcon from '../../containers/SVGicon';
import { HeaderWrap } from '../../css/components/header';

const Header = props => {

    return (
        <HeaderWrap className="main-header d-flex justify-content-between">
            <div className='d-flex align-items-center pl-4'>
                <button onClick={props.onClick}> <SVGIcon name='hamburger' width='29' height='14' /></button>
                <a href="#" className="logo pl-3">
                    <img className='img-fluid' src={require('../../images/logo.png')} alt='' />
                </a>
            </div>
            <Navbar>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="/"><SVGIcon name='help' width='13.876' height='20.995' /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/"><SVGIcon name='setting' width='24.005' height='24' /></NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/"><SVGIcon name='notification' width='22' height='24' /></NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='d-flex align-items-center'>
                            <div className='d-flex align-items-center'>
                                <img className='img-fluid' src={require('../../images/profile.png')} alt='' />
                                <div>
                                    <p>Welcome</p>
                                    <strong>John Smith</strong>
                                    <SVGIcon name='downArrow' width='13.016' height='7.993' />
                                </div>

                            </div>
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem>
                                Option 1
                                </DropdownItem>
                            <DropdownItem>
                                Option 2
                                </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem>
                                Reset
                                </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </HeaderWrap>
    )
}
export default Header;