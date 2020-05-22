import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Badge, Card, Input, CardBody, CardHeader, Col, Row,
UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem , Table, Button, } from 'reactstrap';

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { NavLink as RRNavLink, BrowserRouter, Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import { Document, Page } from 'react-pdf';

import Pagination from './Pagination';

const percentage = 42;
const percentage1 = 4;
const percentage2 = 4;
const percentage3 = 3;
const percentage4 = 9;
const percentage5 = 15;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemList: [],
            rightSection: false,
            activePage: 1,
            contractMatch:0,
            contractNotFound:0,
            pdfBlankInvoice:0,
            pdfBlankAccount:0,
            paymentMatch:0,
            paymentMisMatch:0,
            activeClass:'active',
            activeTab:'today',
            pageOfItems: [],
            numPages: null,
            pageNumber: 1,
        };
        this.onChangePage = this.onChangePage.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.cancelEvent = this.cancelEvent.bind(this);
    }
    state = {
        startDate: null
    };
     cancelEvent(event, picker){
        this.GetList();
    }
    handleEvent(event, picker) { 
        let startDate = moment(picker.startDate).format("YYYY-MM-DD");
        let endDate   = moment(picker.endDate).format("YYYY-MM-DD");
        const searchdate = {
            "startDate" : startDate,
            "endDate"   : endDate,
        }
        // const selfOBJ = this;
        // axios.post('/v1/csv_filter/', searchdate,  { 
        //     headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` } }
        // ).then(function (response) {
        //     if (response.status === 200) {
        //         console.log(response.data);
        //         selfOBJ.setState({ 
        //             csvList: response.data.details 
        //         })
        //     }
        // });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.getItems();

    }

    getItems() {     
        let selfOBJ = this;
        axios.get('/date/20-20-2020')
        .then(function(response){
            console.log(response.data);
            selfOBJ.setState({ 
                itemList: response.data,                
            });
            let pdfBlankInvoice = response.data.filter(function(item) {
                  return item.status == 'Invoice Date Empty';
            });
            let paymentMisMatch = response.data.filter(function(item) {
                  return item.status == 'Payment Mismatch';
            });
            let paymentMatch = response.data.filter(function(item) {
                  return item.status == 'Success';
            });
            let pdfBlankAccount = response.data.filter(function(item) {
                  return item.status == 'Invoice Amount Empty';
            });
            let contractNotFound = response.data.filter(function(item) {
                  return item.status == 'Contract Not Found';
            });
            selfOBJ.setState({pdfBlankInvoice:pdfBlankInvoice.length}); 
            selfOBJ.setState({paymentMisMatch:paymentMisMatch.length});
            selfOBJ.setState({paymentMatch:paymentMatch.length}); 
            selfOBJ.setState({pdfBlankAccount:pdfBlankAccount.length});
            selfOBJ.setState({contractNotFound:contractNotFound.length});
        }).catch(function(error){
            console.log(error);
        });
    }
    showPdf(e, item) {
        this.setState({ rightSection: true });
    }
    handleOptionChange(e){
        if(e.target.value.length>0){        
        let data = this.state.itemList.filter(function(item) {
                  return item.entity_business_name.includes(e.target.value);

         });
        this.setState({ itemList: data });
        }else{
            this.getItems();
        }
       
    }
    activeTab(e,tab){
        this.setState({activeTab:tab});
    }
    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }

    render() {
        const { pageOfItems,itemList,contractMatch,contractNotFound,pdfBlankInvoice,pdfBlankAccount,paymentMatch,paymentMisMatch} = this.state;
        console.log(itemList.length);
        return (
            <>
                <h2>Dashboard</h2>
                <div className='processData'>
                    <div className="d-flex align-items-center pt-4 pb-2 px-4">
                        <span>Process data <strong>{itemList.length}</strong></span>
                        <BrowserRouter>
                            <Nav>
                                <NavItem>
                                    <NavLink className={this.state.activeTab == 'today' ? this.state.activeClass : ''}   onClick={(e) => { this.activeTab(e, 'today')}} > Today</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink  className={this.state.activeTab == 'yesterday' ? this.state.activeClass : ''} onClick={(e) => { this.activeTab(e, 'yesterday')}}> Yesterday</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink  className={this.state.activeTab == 'last7days' ? this.state.activeClass : ''} onClick={(e) => { this.activeTab(e, 'last7days')}}> Last 7 Days</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab == 'last30days' ? this.state.activeClass : ''} onClick={(e) => { this.activeTab(e, 'last30days')}} > Last 30 Days</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className={this.state.activeTab == 'lastquater' ? this.state.activeClass : ''} onClick={(e) => { this.activeTab(e, 'lastquater')}}> Last Qarter</NavLink>
                                </NavItem>
                            </Nav>
                        </BrowserRouter>
                        <DateRangePicker onApply={this.handleEvent} onCancel={this.cancelEvent}>
                                  
                                     <a class="nav-item nav-link" id="calander-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">
                                       <img class="svg-icon" src="icons/calendar.svg"/>Select</a>
                                </DateRangePicker>
                    </div>
                    <ul className='circle'>
                        <li>
                            <CircularProgressbar
                                percentage={percentage}
                                text={`${percentage}`}
                                value={percentage}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#3263C8",
                                    trailColor: "rgba(241, 239, 239,0.2)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>Contract Match</p>
                        </li>
                        <li>
                            <CircularProgressbar
                                percentage={contractNotFound}
                                text={`${contractNotFound}`}
                                value={contractNotFound}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#FF3000",
                                    trailColor: "rgba(241, 239, 239,0.2)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>Contract Not found</p>
                        </li>
                        <li>
                            <CircularProgressbar
                                percentage={pdfBlankInvoice}
                                text={`${pdfBlankInvoice}`}
                                value={pdfBlankInvoice}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#EE910E",
                                    trailColor: "rgba(241, 239, 239,0.2)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>PDF Blank Invoice Data</p>
                        </li>
                        <li>
                            <CircularProgressbar
                                percentage={pdfBlankAccount}
                                text={`${pdfBlankAccount}`}
                                value={pdfBlankAccount}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#18CC1C",
                                    trailColor: "rgba(241, 239, 239,0.2)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>PDF  Blank Account</p>
                        </li>
                        <li>
                            <CircularProgressbar
                                percentage={paymentMatch}
                                text={`${paymentMatch}`}
                                value={paymentMatch}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#CE04CA",
                                    trailColor: "rgba(241, 239, 239,0.2)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>Payment Match</p>
                        </li>
                        <li>
                            <CircularProgressbar
                                percentage={paymentMisMatch}
                                text={`${paymentMisMatch}`}
                                value={paymentMisMatch}
                                strokeWidth={12}
                                styles={buildStyles({
                                    textColor: "white",
                                    pathColor: "#0DB1E1",
                                    trailColor: "rgba(0,0,0,.9)",
                                    strokeLinecap: "butt"
                                })} />
                            <p>Payment Mismatch</p>
                        </li>
                    </ul>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="table-order">
                            <div className="">
                                <div className="row srch-tools">
                                    <div className="col-md-12 d-flex flex-row align-items-center py-3">
                                        <h5 className="card-title"><b>PDF Invoice Data</b></h5>
                                        <div className="card-tools px-3">
                                            <div className="btn-group">
                                                <UncontrolledDropdown nav inNavbar>
                                                    <DropdownToggle nav caret className='d-flex align-items-center'>
                                                        <button type="button" className="btn btn-tool dropdown-toggle" data-toggle="dropdown">
                                                            All Invoice
                                                        </button>
                                                    </DropdownToggle>
                                                    <DropdownMenu right>
                                                        <DropdownItem>
                                                            Another action
                                                            </DropdownItem>
                                                        <DropdownItem>
                                                           Something else here
                                                            </DropdownItem>
                                                       
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>
                                            </div>
                                        </div>
                                        <form className=" search-from px-3">
                                            <div className="input-group input-group-sm">
                                                <div className="input-group-append">
                                                    <button className="btn btn-navbar" type="submit">
                                                        <i className="fas fa-search"></i>
                                                    </button>
                                                </div>
                                                <input className="form-control form-control-navbar" type="search" placeholder="Search here" aria-label="Search"  onChange={(e) => { this.handleOptionChange(e) } } />
                                            </div>
                                        </form>
                                        <a href=""><img className="right-arrow" src="right-arrow.svg" /></a>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-body pdf-table p-0">
                                        <div className="table-responsive">
                                            <table className="table m-0">
                                                <thead>
                                                    <tr>
                                                        <th>File Name</th>
                                                        <th>Invoice Date</th>
                                                        <th>Business Name</th>
                                                        <th>Business Address</th>
                                                        <th>Contract Number</th>
                                                        <th>Invoice Amount</th>
                                                        <th>Processed Date</th>
                                                        <th>Payment Status</th>
                                                        <th>Paid Amount</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {pageOfItems ?
                                                        pageOfItems.map((user, index) => {
                                                            let linkData = <Link to={user.file_name}>{user.file_name}</Link>;
                                                            return (<tr key={index}>
                                                                <td><Link onClick={(e) => { this.showPdf(e, user) }}>{user.file_name}</Link>
                                                                </td>
                                                                <td>{user.entity_date}</td>
                                                                <td>{user.entity_business_name}</td>
                                                                <td>{user.entity_business_address}</td>
                                                                <td>{user.entity_contractnbr}</td>
                                                                <td>{user.entity_total_amount}</td>
                                                                <td>{user.processed_date}</td>
                                                                <td>{user.payment_status}</td>
                                                                <td>{user.payment_amount}</td>
                                                                <td>{user.status}</td>
                                                            </tr>)
                                                        })
                                                        : null
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>                                
                                  <Pagination items={this.state.itemList} onChangePage={this.onChangePage} />
                            </div>

                            {this.state.rightSection === true ?
                                <div className="right-section">
                                    <div className="row srch-tools">
                                        <div className="col-md-12 d-flex flex-row justify-content-between align-items-center py-3">
                                            <div>
                                                <h5 className="card-title"><b>Sacanned from a Xeror Multification Printer(3)_0.pdf</b></h5>
                                            </div>
                                            <div className="card-tools px-3">
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-tool" data-toggle="dropdown">
                                                        Edit This PDF <img className="svg-icon" src="dist/icons/edit-pdf.svg" />
                                                    </button>
                                                </div>
                                                <a className="expand-pdf" href="">
                                                    <iframe src="/pdf/105 Madison OPCO, LLC.pdf" title="title">                                                        
                                                    </iframe>
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card bg-white">

                                        <div className="card-body p-0 text-center">
                                            <img className="" src="dist/img/pdf-img.png" />
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-end clearfix pb-3">
                                        <a href="/" className="btn btn-sm btn-all mr-3">Previous</a>
                                        <a href="/" className="btn btn-sm btn-all">Next</a>
                                    </div>
                                </div>
                                : null}

                        </div>

                    </div>
                </section>

            </>
        )
    }
}

export default Dashboard;