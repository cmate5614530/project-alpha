import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import InputLabel from '@material-ui/core/InputLabel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './editor.css';
import { Modal } from 'antd';
import Upload from './Upload';

const { confirm } = Modal;

const Slide = () => {

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [slide, setSlide] = useState('');
    const [id, setId] = useState('');
    const [edittitle, setEditTitle] = useState('');
    const [editimage, seteditImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [defaultimage, setDefaultImage] = useState(undefined);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    useEffect(() => {
        fetchSlideData();
    }, []);
    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('file', image);
        if(!image || !title){
            alert("Please enter title and image!");
        }else{
            fetch('/slide', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchSlideData();
                    setSuccessMsg("Successfully saved!");
                }
            })
            .catch(() => {
                console.log('Please check your connection');
            })
        }        
    }
    const descModalHandleCancel = () => {
        setdescModal(false)
    }
    const handleImage = (file) => {
        setSuccessMsg('');
        setImage(file);
    }
    const imageSelectedEditHandler = (file) => {
        seteditImage(file)
    }
    const fetchSlideData = () => {

        setImage('');

        setTitle('');
        fetch(`/slide`)
            .then(res => res.json())
            .then(res => {
                setSlide(res.result)
            })
            .catch(() => {
                console.log('Please check your internet connection..!');
            })
    }
    const edit = (id) => {
        let editableArrary = slide.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', image = '' } = editable;
        setId(_id);
        setEditTitle(title);
        setDefaultImage(image);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('title', edittitle);
        if(edittitle === ''){
            alert('Please enter the title!');
        }
        if (editimage !== '') {
            data.append('file', editimage);
        } else {
            data.append('file', image);
        }
            fetch(`/slide/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');

                setEditTitle('');

                seteditImage('');
                setVisible(!visible);
                fetchSlideData();
            }
        })
    }

    const deleteHandler = (id) => {
        fetch(`/slide/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchSlideData();
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
            <p className="h4 text-center mb-4">Dashboard Background Images</p>
            <MDBRow>
                <MDBCol md="6">
                                    <form onSubmit={submitHandler} encType='multipart/form-data'>
                                        <MDBRow>
                                            <MDBCol md="12">
                                                <MDBInput
                                                    label="Title"
                                                    type="text"
                                                    value={title}
                                                    onChange={(e) => {
                                                        setTitle(e.target.value);
                                                        setSuccessMsg('');
                                                    }}
                                                />
                                            </MDBCol>
                                        </MDBRow>
                
                                        
                                        <MDBRow>
                                            <MDBCol md="12">
                                                <InputLabel htmlFor="backgroundimage" style={{ width: '100%', textAlign: 'left' }}>Image</InputLabel>
                                                <Upload name="backgroundimage" handleImage={handleImage} />
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
                                <th>Image</th>
                                <th>Title</th>
       
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                slide.length ?
                                    slide.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        width={50}
                                                        alt={item.title}
                                                        src={`/${item.image}`}
                                                    />
                                                </td>
                                                <td>{item.title}</td>
                                                
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
                title="Edit"
                onOk={handleEdit}
                onCancel={() => { setVisible(!visible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Title"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
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

export default Slide;