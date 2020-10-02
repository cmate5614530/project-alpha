/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './editor.css';
import { Modal } from 'antd';
import Upload from './Upload';

const { confirm } = Modal;

const Setting = () => {

    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [image, setImage] = useState('');
    const [setting, setSetting] = useState('');
    const [id, setId] = useState('');
    const [edittitle, setEditTitle] = useState('');
    const [editdes, setEditDes] = useState('');
    const [editimage, seteditImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [defaultimage, setDefaultImage] = useState(undefined);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails, setdescModalDetails] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    useEffect(() => {
        fetchSettingData();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', 'sociallink');
        data.append('description', des);
        data.append('file', image);
        if(!image){
            alert("Please enter an icon image!");
        }else{
            fetch('/setting', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchSettingData();
                    setSuccessMsg("Successfully saved!");
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
        }
    }
    const descModalHandleCancel = () => {
        setdescModal(false)
    }
    const handleImage = (file) => {
        setImage(file);
        setSuccessMsg('');
    }
    const imageSelectedEditHandler = (file) => {
        seteditImage(file)
    }
    const fetchSettingData = () => {
        setDes('');
        setImage('');
        setTitle('');
        fetch(`/setting`)
            .then(res => res.json())
            .then(res => {
                let socialarray =[];
                if(!!res.result){
                    let mixdata = res.result;
                    for (var i = mixdata.length - 1; i >= 0; i--) {
                        if(mixdata[i].title === 'sociallink') socialarray.push(mixdata[i]);
                    }
                }
                setSetting(socialarray);
            })
            .catch(error => {
                console.log('Please check your internet connection..!');
            })
    }
    const edit = (id) => {
        let editableArrary = setting.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', description = '',  image = '' } = editable;
        setId(_id);
        setEditTitle(title);
        setDefaultImage(image);
        setEditDes(description);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('title', 'sociallink');
        data.append('description', editdes);
        if (editimage !== '') {
            data.append('file', editimage);
        } else {
            data.append('file', image);
        }
            fetch(`/setting/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditTitle('');
                setEditDes('');
                seteditImage('');
                setVisible(!visible);
                fetchSettingData();
            }
        })
    }

    const deleteHandler = (id) => {
        fetch(`/setting/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchSettingData();
                }
            })
    }
    const showDeleteConfirm = (id) => {
        confirm({
            title: 'Do you Want to delete this item?',
            onOk() {
                deleteHandler(id);
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }


    return (
        <MDBContainer className="text-center">
            <p className="h4 text-center mb-4">Social Links</p>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    value={des}
                                    onChange={(e) => {
                                        setDes(e.target.value);
                                        setSuccessMsg('');
                                    }}
                                    type="text" label=" Link" rows="3" />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol md="12">
                                <InputLabel htmlFor="icon" style={{ width: '100%', textAlign: 'left' }}>Icon</InputLabel>
                                <Upload name="icon" handleImage={handleImage} />
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
                </MDBCol>
                <MDBCol md="6">
                    <MDBTable style={{ marginTop: '25px', }}>
                        <MDBTableHead >
                            <tr>
                                <th>Icon</th>
                                <th>Link</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                setting.length ?
                                    setting.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        width={50}
                                                        alt={item.title}
                                                        src={`/${item.image}`}
                                                    />
                                                </td>
                                                <td onClick={() => {
                                                    setdescModalDetails(item)
                                                    setdescModal(true)
                                                }}>{item.description.substring(0, 35)}</td>
                                                <td>
                                                    <DeleteForeverIcon onClick={() => showDeleteConfirm(item._id)} />
                                                    <EditIcon onClick={() => edit(item._id)} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                    : null
                            }
                        </MDBTableBody>
                    </MDBTable>
                </MDBCol>
            </MDBRow>
            <Modal
                visible={visible}
                title="Edit Social Link"
                onOk={handleEdit}
                onCancel={() => { setVisible(!visible) }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                value={editdes}
                                onChange={(e) => {
                                    let description = e.target.value;
                                    setEditDes(description);

                                }}
                                type="text" label=" Link" rows="3" />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <Upload handleImage={imageSelectedEditHandler} defaultV={`/${defaultimage}`} />
                            {/* <input
                                type='file'
                                onChange={imageSelectedEditHandler}
                            /> */}
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                title="Description"
                visible={descModal}
                footer={null}
                onCancel={descModalHandleCancel}
            >
                <p>{descModalDetails.description}</p>
            </Modal>
        </MDBContainer>
    );
};

export default Setting;