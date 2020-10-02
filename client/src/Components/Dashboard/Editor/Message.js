import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Rating from '@material-ui/lab/Rating';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Modal } from 'antd';

const { confirm } = Modal;

const Message = () => {
    const [rating, setRating] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const [id, setId] = useState('');
    const [editrating, setEditrating] = useState('');
    const [editname, setEditName] = useState('');
    const [editdes, setEditDes] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [visible, setVisible] = useState(false);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails, setdescModalDetails] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', name);
        data.append('rating', rating);
        data.append('description', description);
        data.append('email', email);
        fetch('/message', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchMessageData()
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }

    const descModalHandleCancel = () => {
        setdescModal(false)
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('name', editname);
        data.append('rating', editrating);
        data.append('description', editdes);
        data.append('email',editEmail);
        fetch(`/message/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditrating('');
                setEditName('');
                setEditDes('');
                setEditEmail('');
                setVisible(!visible);
                fetchMessageData();
            }
        })
    }
    const fetchMessageData = () => {
        setRating(0);
        setDescription('');
        setName('');
        setEmail('');
        fetch(`/message`)
            .then(res => res.json())
            .then(res => {
                setMessage(res.result)
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    useEffect(() => {
        fetchMessageData();
    }, []);
    const deleteHandler = (id) => {
        fetch(`/message/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchMessageData();
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
            <p className="h4 text-center mb-4">Messages from customers</p>
            <MDBRow>
                
                <MDBCol md="12">
                    <MDBTable style={{ marginTop: '25px', }}>
                        <MDBTableHead >
                            <tr>                            
                                <th>Name</th>
                                <th>Email Address</th>
                                {/*<th>Rating</th>*/}
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                message.length ?
                                    message.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                {/*<td>{item.rating}</td>*/}
                                                <td onClick={() => {
                                                    setdescModalDetails(item)
                                                    setdescModal(true)
                                                }}>{item.description.substring(0, 15)}</td>
                                                <td>
                                                    <DeleteForeverIcon onClick={() => showDeleteConfirm(item._id)} />
                                                    {/*<EditIcon onClick={() => edit(item._id)} />*/}
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
                            <MDBInput
                                label="Email"
                                type="text"
                                value={editEmail}
                                onChange={(e) => {
                                    setEditEmail(e.target.value);
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

export default Message;