import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from 'mdbreact';
import Upload from './Upload';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';

export default () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [mix, setMix] = useState([]);
    const [defaultimage, setDefaultImage] = useState(undefined);
    const [optionData, setOptionData] = useState('');
    const [successMsg, setSuccessMsg]=useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, image, description });
        let data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('file', image);
        if(!title){
            alert("Please select sector!");
        }else{
            fetch('/mix', {
            method: 'POST',
            body: data
        }).then(res => res.json())
            .then(() => {
                setSuccessMsg("Successfully saved!");
            })
        }
    }

    const handleImage = (file) => {
       setImage(file);
       setSuccessMsg('');
    }

    const setValues = (value) => {
        let defaultValues = mix.find(item => item.title === value);
        if (!!defaultValues) {
            const { description = '', image = ''  } = defaultValues;
            setDefaultImage(image);
            setDescription(description);
        }else{
            setDescription('');
            setDefaultImage('');
        }
    }
    useEffect(() => {
        fetch('/mix', {
            method: 'GET',
        }).then(res => res.json())
            .then((res) => {
                if (!!res.info) {
                    setMix(res.info);
                }
            })
        fetch('/managesector', {
              method: 'GET',
            }).then(res => res.json())
              .then((res) => {
                if (!!res.result) {
                let data = res.result;      
                let categorydata = [];
                for (var i = data.length - 1; i >= 0; i--) {
                  if(data[i].sector === 'Category') categorydata.push(data[i]);
                }
                let optionItems_category = categorydata.map((data) =>
                        <MenuItem value={data.title}>{data.title}</MenuItem>
                    );
                setOptionData(optionItems_category);
            }
          });
    }, []);
    return (
        <MDBContainer>
            <form className='sectors-form' onSubmit={handleSubmit}>
                <p className="h4 text-center mb-4">Sectors</p>
                        <MDBRow >
                            <MDBCol md="6" style={{ margin: 'auto' }}>
                                <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                    <InputLabel htmlFor="Sector" style={{ width: '100%', textAlign: 'left' }}>Sector</InputLabel>
                                    <Select
                                        style={{ width: '100%', textAlign: 'left' }}
                                        value={title}
                                        onChange={(e) => {
                                            setTitle(e.target.value);
                                            setValues(e.target.value);
                                            setSuccessMsg('');
                                        }}
                                        inputProps={{
                                            name: 'Sector',
                                            id: 'Sector', 
                                        }}
                                    >
                                        {optionData}
                                    </Select>
                                </FormControl>
                            </MDBCol>
                        </MDBRow>        
                <MDBRow>
                    <MDBCol md="6" style={{ margin: 'auto' }}>
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
                    <MDBCol md="6" style={{ margin: 'auto' }}>
                        <Upload handleImage={handleImage}  defaultV = {`/${defaultimage}`}/>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol md="6" style={{ margin: 'auto' }}>
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