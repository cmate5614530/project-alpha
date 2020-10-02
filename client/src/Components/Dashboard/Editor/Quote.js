import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Modal } from 'antd';
import EditIcon from '@material-ui/icons/Edit';

const { confirm } = Modal;

const Quote = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [quote, setQuote] = useState('');

    const [id, setId] = useState('');
    const [editname, setEditName] = useState('');
    const [editdes, setEditDes] = useState('');
    const [visible, setVisible] = useState(false);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails, setdescModalDetails] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', name);
        data.append('description', description);
        fetch('/quote', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchQuoteData()
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }

    const descModalHandleCancel = () => {
        setdescModal(false)
    }
    const edit = (id) => {
        let editableArrary = quote.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', description = '', name = '' } = editable;
        setId(_id);
        setEditName(name);
        setEditDes(description);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('name', editname);
        data.append('description', editdes);
        fetch(`/quote/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditName('');
                setEditDes('');
                setVisible(!visible);
                fetchQuoteData();
            }
        })
    }
    const fetchQuoteData = () => {
        setDescription('');
        setName('');
        fetch(`/quote`)
            .then(res => res.json())
            .then(res => {
                setQuote(res.result)
            })
            .catch(error => {
                console.log('Please check your connection..!');
            })
    }
    useEffect(() => {
        fetchQuoteData();
    }, []);
    const deleteHandler = (id) => {
        fetch(`/quote/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchQuoteData();
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
            <p className="h4 text-center mb-4">Quote</p>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} encType='multipart/form-data'>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    type="textarea" label=" Text" rows="3" />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol md="12">
                                <MDBInput
                                    label="Link"
                                    type="text"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </MDBCol>
                        </MDBRow>
                        <div className="text-center mt-4">
                            <MDBBtn color="info" outline type="submit">
                                Save <MDBIcon far icon="paper-plane" className="ml-2" />
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
                <MDBCol md="12">
                    <MDBTable style={{ marginTop: '25px', }}>
                        <MDBTableHead >
                            <tr>                            
                                <th>Text</th>
                                <th>Link</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                quote.length ?
                                    quote.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                <td onClick={() => {
                                                    setdescModalDetails(item)
                                                    setdescModal(true)
                                                }}>{item.description.substring(0, 15)}</td>
                                                <td>{item.name}</td>
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
                                type="textarea"
                                label="Text"
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
                            <MDBInput
                                label="Link"
                                type="text"
                                value={editname}
                                onChange={(e) => {
                                    setEditName(e.target.value);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                title="Text"
                visible={descModal}
                footer={null}
                onCancel={descModalHandleCancel}
            >
                <p>{descModalDetails.description}</p>
            </Modal>
        </MDBContainer>
    );
};

export default Quote;