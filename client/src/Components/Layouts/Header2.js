import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBInput, MDBContainer, MDBFormInline } from "mdbreact";

export default class Heaher extends Component {
    state = {
        collapsed: false,
        site: ''
    };
    componentDidMount() {
        let _this = this;
        fetch('/basic')
            .then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const { site = '', } = res.info;
                    _this.setState({ site });
                }
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    handleTogglerClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };
    render() {
        const overlay = (
            <div
                id="sidenav-overlay"
                style={{ backgroundColor: "transparent" }}
                onClick={this.handleTogglerClick}
            />
        );
        return (
            <Router>
                <div id="colorlib-page">
                    <div id="container-wrap">
                        <MDBNavbar
                            color="primary-color"
                            dark
                            expand="md"
                            fixed="top"
                            scrolling
                        >
                            <MDBContainer>
                                <MDBNavbarBrand>
                                    <strong className="white-text">{this.state.site}</strong>
                                </MDBNavbarBrand>
                                <MDBNavbarToggler onClick={this.handleTogglerClick} />
                                <MDBCollapse isOpen={this.state.collapsed} navbar>
                                    <MDBNavbarNav left>
                                        <MDBNavItem>
                                            <a className="nav-link Ripple-parent" href='/'>Home</a >
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <a className="nav-link Ripple-parent" href='/products'>Products</a >
                                        </MDBNavItem>
                                        <MDBNavItem>
                                            <a className="nav-link Ripple-parent" href='/services'>Services</a >
                                        </MDBNavItem>
                                    </MDBNavbarNav>
                                    <MDBNavbarNav right>
                                        <MDBNavItem>
                                            <MDBFormInline >
                                                <div className="md-form my-0">
                                                    <MDBInput hint="Bucsa" type="text" containerClass="mt-0 mb-3" />
                                                </div>
                                            </MDBFormInline>
                                        </MDBNavItem>
                                    </MDBNavbarNav>
                                </MDBCollapse>
                            </MDBContainer>
                        </MDBNavbar>
                        {this.state.collapsed && overlay}
                    </div>
                </div>
            </Router>
        )
    }

};