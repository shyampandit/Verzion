import React, { Component, lazy, Suspense } from 'react';
import Header from '../../components/header';
import { Nav, NavItem, NavLink } from 'reactstrap';
import SideBar from '../../components/sidebar';
import { DashboardWrap } from '../../css/components/dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';

const Home = lazy(() => import('../Home'));
const dashboard = lazy(() => import('../Dashboard'));
const invoice = lazy(() => import('../Invoice'));
const workflow = lazy(() => import('../Workflow'));
const report = lazy(() => import('../Reports'));

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
        };
        this.handleToggleMenu = this.handleToggleMenu.bind(this);
    }

    handleToggleMenu() {
        this.setState(state => ({
            showSidebar: !state.showSidebar
        }));
    }
    render() {

        const renderRouter = (
            <Switch>
                <Route exact path='/home' component={Home} />
                <Route exact path='/dashboard' component={dashboard} />
                <Route exact path='/invoice' component={invoice} />
                <Route exact path='/workflow' component={workflow} />
                <Route exact path='/report' component={report} />
                <Redirect to='/dashboard' />
            </Switch>
        );
        return (
            <div>
                <Header onClick={this.handleToggleMenu} />
                <div className='d-flex' style={{ minHeight: '100vh' }}>
                    <SideBar isopen={this.state.showSidebar} />
                    <DashboardWrap>
                        <Suspense fallback={<div>Loading...</div>}>{renderRouter}</Suspense>
                    </DashboardWrap>
                </div>
            </div >
        );
    }
}

export default Layout;