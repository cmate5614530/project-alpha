import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";
import './page.css';
export default props => {
    return (<div id='quote' className='quotes text-center' >
        <div className='block-title'>
            <MDBContainer>
                <h2>Free Quote</h2>
            </MDBContainer>
        </div>
        <div className='quotes-block'>
            <MDBContainer>
                <div className='quotes-block-title'>
                    <h2>Work Process</h2>
                    <hr style={{backgroundColor:'#fb3e3e',width:'45px',height:'1px'}}/>
                </div>
                <div className='quotes-block-content'>
                <MDBRow>   <p className='quotes-block-content-p'>In an idea world this website wouldn't exist,a client would acknowledge the importance of having web copy before the design starts</p></MDBRow>
                    <MDBRow style={{marginTop:'5%'}} >
                        <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                            <div className='quotes-steps'>
                                <MDBIcon icon="pen-fancy" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}} />
                                <h3>Tell us what you need</h3>
                                <p>the big oxmax advised her not to do so.</p>
                            </div>
                        </MDBCol>
                        <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                            <MDBIcon icon="id-card" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}}/>
                            <h4>Get Free quotes</h4>
                            <p>Little Blind Text didn't listen.</p>
                        </MDBCol>
                        <MDBCol md="4" className="text-md-center mt-xl-5 mb-5">
                            <MDBIcon icon="bullseye" className="red-text pr-3" size="3x" style={{marginBottom:'5%'}}/>
                            <h3>Deliver high quailty product</h3>
                            <p>When she reached the first hills.</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBBtn  color="danger">Get Started <MDBIcon icon="arrow-right" className="ml-1" /></MDBBtn>
                </div>
            </MDBContainer>

        </div>

    </div>);
}

