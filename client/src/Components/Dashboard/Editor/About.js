import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import Upload from './Upload';

export default () => {
    const [title, setTitle] = useState('How We Are');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [mix, setMix] = useState([]);
    const [defaultimage, setDefaultImage] = useState(undefined);
    const [successMsg, setSuccessMsg]= useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, image, description });

        let data = new FormData();
        data.append('title', title);
        data.append('description', description); 
        if(image !== ''){
            data.append('file', image);
        }
            fetch('/mix', {
            method: 'POST',
            body: data 
        }).then(res => res.json())
            .then((res) => {
                //console.log(res);
                setSuccessMsg("Successfully saved!");
            })
              
    }
    const handleImage = (file) => {
        setSuccessMsg('');
        setImage(file);
    }
    const setValues = (value) => {
        let defaultValues = mix.find(item => item.title === value);
        if (!!defaultValues) {
            const { title = '', description = '', image = ''  } = defaultValues;
            setTitle(title);
            setDefaultImage(image);
            setDescription(description);
        }
    }
    useEffect(() => {
        fetch('/mix', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    setMix(res.info);
                    let defaultValues = res.info.find(item => item.title === 'How We Are');
                    if (!!defaultValues) {
                        const { title, description, image = '' } = defaultValues;
                        setTitle(title);
                        setDefaultImage(image);
                        setDescription(description);
                    }
                }
            })
    }, []);
    return (
        <MDBContainer>
            <form className='about-form' onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">About</p>
                <MDBRow>
                    <MDBCol md="12" style={{ margin: 'auto' }}>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={(title === 'How We Are')}
                                type="radio"
                                className="custom-control-input"
                                id="radio1"
                                name="about" onClick={(e) => {
                                    setValues('How We Are')
                                    setTitle('How We Are');
                                    setSuccessMsg('');
                                }}
                            />
                            <label className="custom-control-label" htmlFor="radio1">How We Are</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={(title === 'Our Mission')}
                                type="radio" className="custom-control-input" id="radio2" name="about" onClick={(e) => {
                                    setValues('Our Mission')
                                    setTitle('Our Mission');
                                    setSuccessMsg('');
                                }} />
                            <label className="custom-control-label" htmlFor="radio2">Our Mission</label>
                        </div>
                        <div className="custom-control custom-radio custom-control-inline">
                            <input
                                defaultChecked={(title === 'Our Values')}
                                type="radio" className="custom-control-input" id="radio3" name="about" onClick={(e) => {
                                    setValues('Our Values')
                                    setTitle('Our Values');
                                    setSuccessMsg('');
                                }} />
                            <label className="custom-control-label" htmlFor="radio3">Our Values</label>
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="12">
                        <MDBInput
                            type="textarea"
                            label="Description"
                            rows="3"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setSuccessMsg('');
                            }}
                        />
                    </MDBCol>
                </MDBRow>
                
                <MDBRow>
                    <MDBCol md="12">
                        <Upload handleImage={handleImage}   defaultV = {`/${defaultimage}`}/>
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
