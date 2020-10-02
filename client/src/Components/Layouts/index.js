import React, { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBView,
  MDBContainer,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import "./index.css";
import { About, Contact, Portfolio, Sectors, Quotes, Signup, Signin } from './Pages';


class AppPage extends Component {
  state = {
    collapsed: false,
    site: "",
  };
  componentDidMount() {
    let _this = this;
    fetch('http://localhost:5000/basic')
      .then(res => res.json())
      .then((res) => {
        if (!!res.info) {
          const { site = '' } = res.info;
          _this.setState({ site })
        }
      }).catch(error => {
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
      <div id="apppage">
        <Router>
          <div id="colorlib-page">
            <div id="container-wrap">
              <MDBNavbar
                color="primary-color"
                dark
                expand="md"
                fixed="top"
                scrolling
                transparent
              >
                <MDBContainer>
                  <MDBNavbarBrand>
                    <strong className="white-text">{this.state.site}</strong>
                  </MDBNavbarBrand>
                  <MDBNavbarToggler onClick={this.handleTogglerClick} />
                  <MDBCollapse isOpen={this.state.collapsed} navbar>
                    <MDBNavbarNav left>
                      <MDBNavItem active>
                        <MDBNavLink to="#!">Home</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="#!">About us</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="#!">Sectors</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="#!">Free Quote</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="#!">Contact Us</MDBNavLink>
                      </MDBNavItem>
                      <MDBNavItem>
                        <MDBNavLink to="/products">Products</MDBNavLink>
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
        <MDBView>
          <MDBMask className="d-flex justify-content-center align-items-center gradient">
            <MDBContainer>
              <MDBRow>
                <MDBCol
                  md="6"
                  className="white-text text-center text-md-left mt-xl-5 mb-5"
                >
                  <MDBAnimation type="fadeInLeft" delay=".3s">
                    <h1 className="h1-responsive font-weight-bold mt-sm-5">
                      Cadastre-se para uma experiência melhor ...
                    </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      Usuário cadastrado, você tem vantagens exclusivas e únicas, o cadastro e grátis e rápido, confira as vantajes.
                    </h6>
                    <MDBFormInline>
                      <Signin />
                      <Signup />
                    </MDBFormInline>
                  </MDBAnimation>
                </MDBCol>

                <MDBCol md="6" xl="5" className="mt-xl-5">
                  <MDBAnimation type="fadeInRight" delay=".3s">
                    <img
                      src="https://pngimage.net/wp-content/uploads/2018/06/happy-client-png-7.png"
                      alt=""
                      className="img-fluid"
                    />
                  </MDBAnimation>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </MDBMask>
        </MDBView>

        <div id="colorlib-main">

          <About />
          <Portfolio />
          <Sectors />
          <Quotes />
          <Contact />
        </div>

      </div>
    );
  }
}

export default AppPage;
