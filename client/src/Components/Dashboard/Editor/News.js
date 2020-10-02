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

const News = () => {

    const [sector, setSector] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [image, setImage] = useState('');
    const [news, setNews] = useState('');
    const [id, setId] = useState('');
    const [editsector, setEditSector] = useState('');
    const [edittitle, setEditTitle] = useState('');
    const [editdes, setEditDes] = useState('');
    const [editimage, seteditImage] = useState('');
    const [visible, setVisible] = useState(false);
    const [defaultimage, setDefaultImage] = useState(undefined);

    const [descModal, setdescModal] = useState(false);
    const [descModalDetails, setdescModalDetails] = useState('');
    const [optionData, setOptionData] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    useEffect(() => {
        fetchNewsData();
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
    const submitHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('description', des);
        data.append('sector', sector);
        data.append('file', image);
        if(!title || !des || !sector || !image){
            alert("Please enter title, description, sector and image correctly!")
        }else{
            fetch('/news', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchNewsData();
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
        setSuccessMsg('');
        setImage(file)
    }
    const imageSelectedEditHandler = (file) => {
        seteditImage(file)
    }
    const fetchNewsData = () => {
        setDes('');
        setImage('');
        setSector('');
        setTitle('');
        fetch(`/news`)
            .then(res => res.json())
            .then(res => {
                setNews(res.result)
            })
            .catch(error => {
                console.log('Please check your internet connection..!');
            })
    }
    const edit = (id) => {
        let editableArrary = news.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', description = '', title = '', sector = '', image = '' } = editable;
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setDefaultImage(image);
        setEditDes(description);
        setVisible(!visible);
    }
    const handleEdit = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('title', edittitle);
        data.append('description', editdes);
        data.append('sector', editsector);
        if (editimage !== '') {
            data.append('file', editimage);
        } else {
            data.append('file', image);
        }
            fetch(`/news/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditDes('');
                seteditImage('');
                setVisible(!visible);
                fetchNewsData();
            }
        })
    }

    const deleteHandler = (id) => {
        fetch(`/news/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchNewsData();
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
            <p className="h4 text-center mb-4">News</p>
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
                                <MDBInput
                                    value={des}
                                    onChange={(e) => {
                                        setDes(e.target.value);
                                        setSuccessMsg('');
                                    }}
                                    type="textarea" label=" News Description" rows="3" />
                            </MDBCol>
                        </MDBRow>


                        <MDBRow style={{ marginTop: '2%' }}>
                            <MDBCol md={12}>
                                <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                    <InputLabel htmlFor="Sector" style={{ width: '100%', textAlign: 'left' }}>Sector</InputLabel>
                                    <Select
                                        style={{ width: '100%', textAlign: 'left' }}
                                        value={sector}
                                        onChange={(e) => {
                                            setSector(e.target.value);
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
                            <MDBCol md="12">
                                <Upload handleImage={handleImage} />
                                {/* <input
                                    type='file'
                                    onChange={handleImage}
                                /> */}
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
                                <th>Details</th>
                                <th>Sector</th>
                                <th>Actions</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {
                                news.length ?
                                    news.map(item => {
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
                                                <td onClick={() => {
                                                    setdescModalDetails(item)
                                                    setdescModal(true)
                                                }}>{item.description.substring(0, 35)}</td>
                                                <td>{item.sector}</td>
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
                            <MDBInput
                                value={editdes}
                                onChange={(e) => {
                                    let description = e.target.value;
                                    setEditDes(description);

                                }}
                                type="textarea" label=" News Description" rows="3" />
                        </MDBCol>
                    </MDBRow>


                    <MDBRow style={{ marginTop: '2%' }}>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="Sector" style={{ width: '100%', textAlign: 'left' }}>Sector</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editsector}
                                    onChange={(e) => {
                                        let editsector = e.target.value;
                                        setEditSector(editsector);

                                    }}
                                    inputProps={{
                                        name: 'Sector',
                                        id: 'Sector',
                                    }}
                                >
                                    <MenuItem value='A'>Sector A</MenuItem>
                                    <MenuItem value='B'>Sector B</MenuItem>
                                    <MenuItem value='C'>Sector C</MenuItem>
                                </Select>
                            </FormControl>
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

export default News;