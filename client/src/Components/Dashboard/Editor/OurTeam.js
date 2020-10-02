import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Rating from '@material-ui/lab/Rating';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Modal } from 'antd';
import EditIcon from '@material-ui/icons/Edit';
import Upload from './Upload'

const { confirm } = Modal;

const OurTeam = () => {
    // name, rating, description
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [teams, setTeams] = useState('');

    const [id, setId] = useState('');
    const [editrating, setEditrating] = useState('');
    const [editname, setEditName] = useState('');
    const [editdes, setEditDes] = useState('');
    const [editimage, seteditImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [defaultimage, setDefaultImage] = useState(undefined);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails, setdescModalDetails] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', name);
        data.append('rating', rating);
        data.append('description', description);
        data.append('file', image);
        if(!image){
            alert("Please enter an image!");
        }else{
            fetch('/team', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    setSuccessMsg("Successfully saved!");
                    fetchTeamData();   
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
        }
    }

    const handleImage = (file) => {
        setImage(file);
        setSuccessMsg('');
    }
    const imageSelectedEditHandler = (file) => {
        seteditImage(file)
    }
    const descModalHandleCancel = () => {
        setdescModal(false)
    }
    const edit = (id) => {
        let editableArrary = teams.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', description = '', name = '', rating = '', image = '' } = editable;
        setId(_id);
        setEditrating(rating);
        setEditName(name);
        setDefaultImage(image);
        seteditImage(image);
        setEditDes(description);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('name', editname);
        data.append('rating', editrating);
        data.append('description', editdes);
        if (editimage !== '') {
            data.append('file', editimage);
        } else {
            data.append('file', image);
        }
            fetch(`/team/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditrating('');
                setEditName('');
                setEditDes('');
                seteditImage('');
                setVisible(!visible);
                fetchTeamData();
            }
        })
    }
    const fetchTeamData = () => {
        setRating(0);
        setDescription('');
        setName('');
        setImage('');
        fetch(`/team`)
            .then(res => res.json())
            .then(res => {
                setTeams(res.result)
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    useEffect(() => {
        fetchTeamData();
    }, []);
    const deleteHandler = (id) => {
        fetch(`/team/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchTeamData();
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
        <MDBContainer>
            <p className="h4 text-center mb-4">Team</p>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    label="Name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        setSuccessMsg('');
                                    }}
                                />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <Rating name='rating' value={rating} precision={0.5} onChange={(e) => {
                                    setRating(parseFloat(e.target.value));
                                    setSuccessMsg('');
                                }} />
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
                                <Upload handleImage={handleImage} />
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
                                <th>Name</th>
                                <th>Rating</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                teams.length ?
                                    teams.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>
                                                    <img
                                                        width={50}
                                                        alt={item._id}
                                                        src={`/${item.image}`}
                                                    />
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.rating}</td>
                                                <td onClick={() => {
                                                    setdescModalDetails(item)
                                                    setdescModal(true)
                                                }}>{item.description.substring(0, 15)}</td>
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
                <form onSubmit={submitHandler} encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Name"
                                type="text"
                                value={editname}
                                onChange={(e) => {
                                    setEditName(e.target.value);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <Rating name='rating' value={editrating} precision={0.5} onChange={(e) => {
                                setEditrating(parseFloat(e.target.value));
                            }} />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                type="textarea"
                                label="Description"
                                rows="3"
                                value={editdes}
                                onChange={(e) => {
                                    setEditDes(e.target.value);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="12">
                            <Upload handleImage={imageSelectedEditHandler} defaultV={`/${defaultimage}`} />
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

export default OurTeam;