import React, { Component } from 'react';
import { Sidebar } from '../../css/components/sidebar';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SVGIcon from '../../containers/SVGicon';
import { NavLink as RRNavLink } from 'react-router-dom';

export default class SideBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const sidebarClass = !this.props.isopen ? 'sidenav open' : 'sidenav';
    return (
      <Sidebar className={sidebarClass}>
        <Nav>
          <NavItem>
            <NavLink to="/home" exact activeClassName="active" tag={RRNavLink}><SVGIcon name='home' width='14.216' height='16' /> Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/dashboard" activeClassName="active" tag={RRNavLink}><SVGIcon name='dashboard' width='16.563' height='16.563' />Dashboard</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/invoice" activeClassName="active" tag={RRNavLink}><SVGIcon name='invoice' width='17.975' height='18.361' />Upload Invoice</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/workflow" activeClassName="active" tag={RRNavLink}><SVGIcon name='workflow' width='16.218' height='16.229' />Workflow</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/report" activeClassName="active" tag={RRNavLink}><SVGIcon name='reports' width='14.607' height='18.894' />Reports</NavLink>
          </NavItem>
        </Nav>

      </Sidebar>
    )
  }
}