import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import InputLabel from '@material-ui/core/InputLabel';
import './editor.css';
import Upload from './Upload'
const FormPage = () => {
    const [id, setId] = useState('');
    const [site, setSiteName] = useState('');
    const [email, setEmail] = useState('');
    const [email1, setEmail1] = useState('');
    const [phone, setPhone] = useState('');
    const [officeHours, setOfficeHours] = useState('');
    const [address, setAddress] = useState('');
    const [address1, setAddress1] = useState('');
    const [siteDesc,setSiteDesc] = useState('');
    const [contactText, setContactText] = useState('');
    const [contactDesc,setContactDesc] = useState('');
    const [siteText, setSiteText] = useState('');
    const [siteImg, setSiteImg] = useState('');
    const [quoteText, setQuoteText] = useState('');
    const [quoteLink, setQuoteLink] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [defaultSiteImg, setDefaultSiteImg] = useState(undefined);
    const [successMsg, setSuccessMsg] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('id',id);
        data.append('site',site);
        data.append('email',email);
        data.append('email1',email1);
        data.append('phone',phone);
        data.append('officeHours',officeHours);
        data.append('address',address);
        data.append('address1',address1);
        data.append('siteText',siteText);
        data.append('siteDesc',siteDesc);
        data.append('contactText',contactText);
        data.append('contactDesc',contactDesc);
        data.append('quoteText', quoteText);
        data.append('quoteLink', quoteLink);
        data.append('whatsapp', whatsapp);
        if(siteImg !==''){
            data.append('file', siteImg);
        }       
        
            fetch('/basic', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 201) {
                    setSuccessMsg("Successfully saved!");
                    //alert("Successfully saved!");
                    console.log(res);
                }
            })
            .catch(error => {
                alert("Failed!")
                console.log('Please check your connection');
            })
        
    }
    
    useEffect(() => {
        fetch('/basic', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    const {
                        _id: id = '',
                        site = '',
                        email = '',
                        email1 = '',
                        phone = '',
                        officeHours = '',
                        address = '',
                        address1 = '',
                        siteText = '',
                        siteDesc = '',
                        contactText = '',
                        contactDesc = '',
                        quoteText = '',
                        quoteLink = '',
                        whatsapp = '',
                        siteImg = ''
                    } = res.info;
                    setId(id);
                    setSiteName(site);
                    setEmail(email);
                    setEmail1(email1);
                    setPhone(phone);
                    setOfficeHours(officeHours);
                    setAddress(address);
                    setAddress1(address1);
                    setDefaultSiteImg(siteImg);
                    setSiteText(siteText);
                    setSiteDesc(siteDesc);
                    setContactText(contactText);
                    setContactDesc(contactDesc);
                    setQuoteText(quoteText);
                    setWhatsapp(whatsapp);
                    setQuoteLink(quoteLink);
                }

            })
    }, []);
    const handleImage = (file) => {
        setSuccessMsg('');
        setSiteImg(file);
    }
    return (
        <MDBContainer>
            <form className='basic-form' onSubmit={handleSubmit} encType='multipart/form-data'>
                <p className="h4 text-center mb-4">Basic Information</p>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Site name"
                            type="text"
                            value={site}
                            onChange={(e) => {
                                let site = e.target.value;
                                setSiteName(site);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Site Text"
                            type="text"
                            value={siteText}
                            onChange={(e) => {
                                let siteText = e.target.value;
                                setSiteText(siteText);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Site Description"
                            type="textarea"
                            value={siteDesc}
                            onChange={(e) => {
                                let siteDesc = e.target.value;
                                setSiteDesc(siteDesc);
                                setSuccessMsg('');
                            }}
                        />
                        
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        
                        <InputLabel htmlFor="siteImg" style={{ width: '100%', textAlign: 'left' }}>Site Image</InputLabel>
                        <Upload name="siteImg" handleImage={handleImage} defaultV={`/${defaultSiteImg}`}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Primary Email"
                            type="text"
                            value={email}
                            onChange={(e) => {
                                let email = e.target.value;
                                setEmail(email);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Secondary Email"
                            type="text"
                            value={email1}
                            onChange={(e) => {
                                let email1 = e.target.value;
                                setEmail1(email1);
                                setSuccessMsg('');
                            }}
                        />

                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Primary Phone"
                            type="text"
                            value={phone}
                            onChange={(e) => {
                                let phone = e.target.value;
                                setPhone(phone);
                                setSuccessMsg('');
                            }}
                        />

                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Office hours"
                            type="text"
                            value={officeHours}
                            onChange={(e) => {
                                let officeHours = e.target.value;
                                setOfficeHours(officeHours);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6">
                        <MDBInput
                            label="Address"
                            type="text"
                            value={address}
                            onChange={(e) => {
                                let address = e.target.value;
                                setAddress(address);
                                setSuccessMsg('');
                            }}
                        />

                    </MDBCol>
                    <MDBCol md="6">
                        <MDBInput
                            label="Address 2"
                            type="text"
                            value={address1}
                            onChange={(e) => {
                                let address1 = e.target.value;
                                setAddress1(address1);
                                setSuccessMsg('');
                            }}
                        />

                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Work Process Text"
                            type="textarea"
                            value={quoteText}
                            onChange={(e) => {
                                let quoteText = e.target.value;
                                setQuoteText(quoteText);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Get Started Link"
                            type="text"
                            value={quoteLink}
                            onChange={(e) => {
                                let quoteLink = e.target.value;
                                setQuoteLink(quoteLink);
                                setSuccessMsg('');
                            }}
                        />
                        
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Contact Text"
                            type="textarea"
                            value={contactText}
                            onChange={(e) => {
                                let contactText = e.target.value;
                                setContactText(contactText);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Contact Description"
                            type="textarea"
                            value={contactDesc}
                            onChange={(e) => {
                                let contactDesc = e.target.value;
                                setContactDesc(contactDesc);
                                setSuccessMsg('');
                            }}
                        />
                        
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <MDBInput
                            label="Whatsapp Address"
                            type="text"
                            value={whatsapp}
                            onChange={(e) => {
                                let whatsapp = e.target.value;
                                setWhatsapp(whatsapp);
                                setSuccessMsg('');
                            }}
                        />
                        
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12" style={{textAlign:'center'}}>
                        <p style={{textAlign:'center',backgroundColor:'green', color:'white'}} >{successMsg}</p>
                    </MDBCol>
                </MDBRow>
                <div className="text-center mt-4">
                    <MDBBtn color="info" outline type="submit">
                        Save <MDBIcon far icon="paper-plane" className="ml-2" />
                    </MDBBtn>
                </div>
            </form>

        </MDBContainer>
    );
};

export default FormPage;