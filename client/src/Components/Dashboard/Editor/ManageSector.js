/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol,MDBInput} from 'mdbreact';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './editor.css';
import { Modal } from 'antd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import { makeStyles } from '@material-ui/core/styles';

const { confirm } = Modal;
const useStyles = makeStyles(theme => ({
    divider: {
      margin: theme.spacing(2, 0),
    },
    root: {
        width: '100%',
      },
    tablecontainer: {
        maxHeight: 600,
      },
  }));

const ManageSector = () => {
    const classes = useStyles();

    const [sector, setSector] = useState('');
    const [title, setTitle] = useState('');
    const [manageSector, setManageSector] = useState('');
    const [id, setId] = useState('');
    const [editsector, setEditSector] = useState('');
    const [edittitle, setEditTitle] = useState('');
    const [addNewDepartmentVisible, setAddNewDepartmentVisible]=useState(false);
    const [addNewCategoryVisible, setAddNewCategoryVisible] = useState(false);
    const [addNewSubcategoryVisible, setAddNewSubcategoryVisible]=useState(false);
    const [addNewModelVisible, setAddNewModelVisible]=useState(false);
    const [addNewBrandVisible, setAddNewBrandVisible]=useState(false);
    const [editDepartmentVisible, setEditDepartmentVisible]=useState(false);
    const [editCategoryVisible, setEditCategoryVisible]=useState(false);
    const [editSubcategoryVisible, setEditSubcategoryVisible]=useState(false);
    const [editModelVisible, setEditModelVisible]=useState(false);
    const [editBrandVisible, setEditBrandVisible]=useState(false);

    const [parentId, setParentId]=useState('0');
    const [editParentId, setEditParentId]=useState('0');
    const [grandparentId,setGrandparentId]=useState('0');
    const [editGrandparentId, setEditGrandparentId]=useState('0');
    const [product, setProduct]=useState('');
    useEffect(() => {
        fetchManageSectorData();
        fetchProductsHandler();
    }, []);

    const addNewDepartmentHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('sector', 'Department');
        data.append('parentId','0');
        fetch('/managesector', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                    setAddNewDepartmentVisible(false);
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }
    const addNewCategoryHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('sector', 'Category');
        data.append('parentId',parentId);
        fetch('/managesector', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                    setAddNewCategoryVisible(false);
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }
    
    const addNewSubcategoryHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('sector', 'Subcategory');
        data.append('parentId',parentId);
        fetch('/managesector', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                    setAddNewSubcategoryVisible(false);
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }
    const fetchManageSectorData = () => {
        setSector('');
        setTitle('');
        setParentId('0');
        fetch(`/managesector`)
            .then(res => res.json())
            .then(res => {
                setManageSector(res.result)
            })
            .catch(error => {
                console.log('Please check your internet connection..!');
            })
    }
    const addNewBrandHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('sector', 'Brand');
        data.append('parentId','0');
        fetch('/managesector', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                    setAddNewBrandVisible(false);
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }
    const addNewModelHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', title);
        data.append('sector', 'Model');
        data.append('parentId',parentId);
        fetch('/managesector', {
            method: 'POST',
            body: data
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                    setAddNewModelVisible(false);
                }
            })
            .catch(error => {
                console.log('Please check your connection');
            })
    }
    const editDepartment = (id) => {
        let editableArrary = manageSector.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', sector = '' } = editable;
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setEditDepartmentVisible(!editDepartmentVisible);
    }
    const editCategory = (id) => {
        let editableArrary = manageSector.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', sector = '', parentId='' } = editable;
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setEditParentId(parentId);
        setEditCategoryVisible(!editCategoryVisible);
    }
    const editSubcategory = (id) => {
        let manageSector1=manageSector;
        let editableArrary = manageSector.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', sector = '', parentId='' } = editable;
        let editableArrary1 = manageSector1.filter(item => item._id === parentId);
        console.log(editableArrary1[0].parentId);
        const idd='0';
        if(editableArrary1.length!==0){
            setEditGrandparentId(editableArrary1[0].parentId);
        }else{
            setEditGrandparentId(idd);
        }
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setEditParentId(parentId);

        setEditSubcategoryVisible(!editSubcategoryVisible);
    }
    const editBrand = (id) => {
        let editableArrary = manageSector.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', sector = '' } = editable;
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setEditBrandVisible(!editBrandVisible);
    }
    const editModel = (id) => {
        let editableArrary = manageSector.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', title = '', sector = '', parentId='' } = editable;
        setId(_id);
        setEditSector(sector);
        setEditTitle(title);
        setEditParentId(parentId);
        setEditModelVisible(!editModelVisible);
    }

    const editDepartmentHandler = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('title', edittitle);
        data.append('sector', 'Department');
        data.append('parentId','0');
        fetch(`/managesector/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditDepartmentVisible(!editDepartmentVisible);
                fetchManageSectorData();
            }
        })
    }
    const editCategoryHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', edittitle);
        data.append('sector', 'Category');
        data.append('parentId',editParentId);
        fetch(`/managesector/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditParentId('0');
                setEditCategoryVisible(!editCategoryVisible);
                fetchManageSectorData();
            }
        })
    }
    const editSubcategoryHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', edittitle);
        data.append('sector', 'Subcategory');
        data.append('parentId',editParentId);
        fetch(`/managesector/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditParentId('0');
                setEditGrandparentId('0');
                setEditSubcategoryVisible(!editSubcategoryVisible);
                fetchManageSectorData();
            }
        })
    }
    const editBrandHandler = (e) => {
        e.preventDefault()
        let data = new FormData();
        data.append('title', edittitle);
        data.append('sector', 'Brand');
        data.append('parentId','0');
        fetch(`/managesector/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditBrandVisible(!editBrandVisible);
                fetchManageSectorData();
            }
        })
    }
    const editModelHandler = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('title', edittitle);
        data.append('sector', 'Model');
        data.append('parentId',editParentId);
        fetch(`/managesector/${id}`, {
            method: 'PATCH',
            body: data,
        }).then(res => {
            if (res.status === 201) {
                setId('');
                setEditSector('');
                setEditTitle('');
                setEditParentId('0');
                setEditModelVisible(!editModelVisible);
                fetchManageSectorData();
            }
        })
    }
    const deleteHandler = (id) => {
        fetch(`/managesector/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchManageSectorData();
                }
            })
    }
    const fetchProductsHandler = () => {
        fetch(`/product`)
          .then(res => res.json())
          .then(res => {
            setProduct(res.result);
          })
          .catch(error => {
            console.log("Please check your internet connection..!", error);
          });
    };
    
    const showDeleteDepartmentConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this department?',
            onOk() {
                let usingdep = product.filter(item=>item.department===id);
                let usingsubcategory = manageSector.filter(item=>item.sector==='Category'&&item.parentId===id);
                if(usingdep.length>0||usingsubcategory.length>0){
                    alert("This department is in use. Please delete all dependencies and try again!");
                }else{
                    deleteHandler(id);
                }
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const showDeleteCategoryConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this category?',
            onOk() {
                let usingcat = product.filter(item=>item.category===id);
                let usingsubcategory = manageSector.filter(item=>item.sector==='Subcategory' && item.parentId===id);
                if(usingcat.length>0||usingsubcategory.length>0){
                    alert("This category is in use. Please delete all dependencies and try again!");
                }else{
                    deleteHandler(id);
                }
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const showDeleteSubcategoryConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this sub_category?',
            onOk() {
                let usingsubcat = product.filter(item=>item.subCategory===id);
                if(usingsubcat.length>0){
                    alert("This sub_category is in use. Please delete all dependencies and try again!");
                }else{
                    deleteHandler(id);
                }
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const showDeleteBrandConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this item?',
            onOk() {
                let usingmod = product.filter(item=>item.model===id);
                let usingsubcategory = manageSector.filter(item=>item.sector==='Model'&&item.parentId===id);
                if(usingmod.length>0||usingsubcategory.length>0){
                    alert("This item is in use. Please delete all dependencies and try again!");
                }else{
                    deleteHandler(id);
                }
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const showDeleteModelConfirm = (id) => {
        confirm({
            title: 'Do you want to delete this item?',
            onOk() {
                let usingbra = product.filter(item=>item.brand===id);
                if(usingbra.length>0){
                    alert("This item is in use. Please delete all dependencies and try again!");
                }else{
                    deleteHandler(id);
                }
            },
            onCancel() {
                console.log('Cancel', id);
            },
        });
    }
    const addNewDepartment=()=>{
        setAddNewDepartmentVisible(true);
    }
    const addNewCategory=()=>{
        setAddNewCategoryVisible(true);
    }
    const addNewModel=()=>{
        setAddNewModelVisible(true);
    }
    const addNewBrand=()=>{
        setAddNewBrandVisible(true);
    }
    const addNewSubcategory=()=>{
        setAddNewSubcategoryVisible(true);
    }
    return (
        <MDBContainer className="text-center">
            <p className="h4 text-center mb-4">Sector Management</p>

            <MDBRow>
                <MDBCol md="4">
                    <MDBRow>
                        <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;Department List</label>
                    </MDBRow>
                    <MDBRow style={{paddingLeft:'75%'}}>
                        <a style={{color:'blue'}} onClick={addNewDepartment}>+add new</a>
                    </MDBRow>
                    <TableContainer className={classes.tablecontainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    
                                    <TableCell>Name</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Department').map(item => {
                                            return (
                                                <TableRow key={item._id}>

                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{item.sector}</TableCell>
                                                    <TableCell>
                                                        <DeleteForeverIcon onClick={() => showDeleteDepartmentConfirm(item._id)} />
                                                        <EditIcon onClick={() => editDepartment(item._id)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MDBCol>
                <MDBCol md="4">
                    <MDBRow>
                        <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;Category List</label>
                    </MDBRow>
                    <MDBRow style={{paddingLeft:'75%'}}>
                        <a style={{color:'blue'}} onClick={addNewCategory}>+add new</a>
                    </MDBRow>
                    <TableContainer className={classes.tablecontainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    
                                    <TableCell>Name</TableCell>
                                    <TableCell>Department</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Category').map(item => {
                                            let dep=manageSector.filter(item1=>item1.sector==='Department'&& item1._id===item.parentId);
                                            return (
                                                <TableRow key={item._id}>

                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{dep[0].title}</TableCell>
                                                    <TableCell>
                                                        <DeleteForeverIcon onClick={() => showDeleteCategoryConfirm(item._id)} />
                                                        <EditIcon onClick={() => editCategory(item._id)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MDBCol>
                <MDBCol md="4">
                    <MDBRow>
                        <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;Subcategory List</label>
                    </MDBRow>
                    <MDBRow style={{paddingLeft:'75%'}}>
                        <a style={{color:'blue'}} onClick={addNewSubcategory}>+add new</a>
                    </MDBRow>
                    <TableContainer className={classes.tablecontainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    
                                    <TableCell>Name</TableCell>
                                    <TableCell>Category</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Subcategory').map(item => {
                                            let cat=manageSector.filter(item2=>item2.sector==='Category'&&item2._id===item.parentId);
                                            return (
                                                <TableRow key={item._id}>

                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{cat[0].title}</TableCell>
                                                    <TableCell>
                                                        <DeleteForeverIcon onClick={() => showDeleteSubcategoryConfirm(item._id)} />
                                                        <EditIcon onClick={() => editSubcategory(item._id)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <divider></divider>
            </MDBRow>
            <MDBRow>
                <MDBCol md="4">
                    <MDBRow>
                        <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;Brand List</label>
                    </MDBRow>
                    <MDBRow style={{paddingLeft:'75%'}}>
                        <a style={{color:'blue'}} onClick={addNewBrand}>+add new</a>
                    </MDBRow>
                    <TableContainer className={classes.tablecontainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    
                                    <TableCell>Name</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Brand').map(item => {
                                            return (
                                                <TableRow key={item._id}>

                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{item.sector}</TableCell>
                                                    <TableCell>
                                                        <DeleteForeverIcon onClick={() => showDeleteBrandConfirm(item._id)} />
                                                        <EditIcon onClick={() => editBrand(item._id)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MDBCol>
                <MDBCol md="4">
                    <MDBRow>
                        <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;&nbsp;&nbsp;Model List</label>
                    </MDBRow>
                    <MDBRow style={{paddingLeft:'75%'}}>
                        <a style={{color:'blue'}} onClick={addNewModel}>+add new</a>
                    </MDBRow>
                    <TableContainer className={classes.tablecontainer}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead >
                                <TableRow>
                                    
                                    <TableCell>Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Model').map(item => {
                                            let dep=manageSector.filter(item1=>item1.sector==='Brand'&& item1._id===item.parentId);
                                            return (
                                                <TableRow key={item._id}>

                                                    <TableCell>{item.title}</TableCell>
                                                    <TableCell>{dep[0].title}</TableCell>
                                                    <TableCell>
                                                        <DeleteForeverIcon onClick={() => showDeleteModelConfirm(item._id)} />
                                                        <EditIcon onClick={() => editModel(item._id)} />
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })
                                        : null
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MDBCol>
            </MDBRow>
            
            <Modal
                visible={addNewDepartmentVisible}
                title="Add new department"
                onOk={addNewDepartmentHandler}
                onCancel={() => { setAddNewDepartmentVisible(!addNewDepartmentVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Department Name"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={editDepartmentVisible}
                title="Edit Department"
                onOk={editDepartmentHandler}
                onCancel={() => { setEditDepartmentVisible(!editDepartmentVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Department Name"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                visible={addNewCategoryVisible}
                title="Add new Category"
                onOk={addNewCategoryHandler}
                onCancel={() => { setAddNewCategoryVisible(!addNewCategoryVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="ca" style={{ width: '100%', textAlign: 'left' }}>Department</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={parentId}
                                    onChange={(e) => {
                                        setParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'ca',
                                        id: 'ca',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Department').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput
                                label="Category Name"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={editCategoryVisible}
                title="Edit Category"
                onOk={editCategoryHandler}
                onCancel={() => { setEditCategoryVisible(!editCategoryVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="caa" style={{ width: '100%', textAlign: 'left' }}>Department</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editParentId}
                                    onChange={(e) => {
                                        setEditParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'caa',
                                        id: 'caa',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Department').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="12">
                            <MDBInput
                                label="Category Name"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
                        </MDBCol>
                </form>
            </Modal>
            <Modal
                visible={addNewSubcategoryVisible}
                title="Add new Subcategory"
                onOk={addNewSubcategoryHandler}
                onCancel={() => { setAddNewSubcategoryVisible(!addNewSubcategoryVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="ca1" style={{ width: '100%', textAlign: 'left' }}>Department</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={grandparentId}
                                    onChange={(e) => {
                                        setGrandparentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'ca1',
                                        id: 'ca1',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Department').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        
                        <MDBCol md={12}>
                            <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="ca2" style={{ width: '100%', textAlign: 'left' }}>Category</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={parentId}
                                    onChange={(e) => {
                                        setParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'ca2',
                                        id: 'ca2',
                                    }}
                                >
                                    {
                                    manageSector.length && grandparentId?
                                        manageSector.filter(item=>item.sector==='Category'&& item.parentId===grandparentId).map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput
                                label="Subcategory Name"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={editSubcategoryVisible}
                title="Edit Subcategory"
                onOk={editSubcategoryHandler}
                onCancel={() => { setEditSubcategoryVisible(!editSubcategoryVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="ca11" style={{ width: '100%', textAlign: 'left' }}>Department</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editGrandparentId}
                                    onChange={(e) => {
                                        setEditGrandparentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'ca11',
                                        id: 'ca11',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Department').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        
                        <MDBCol md={12}>
                            <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="ca22" style={{ width: '100%', textAlign: 'left' }}>Category</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editParentId}
                                    onChange={(e) => {
                                        setEditParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'ca22',
                                        id: 'ca22',
                                    }}
                                >
                                    {
                                    manageSector.length && editGrandparentId?
                                        manageSector.filter(item=>item.sector==='Category'&& item.parentId===editGrandparentId).map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput
                                label="Subcategory Name"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={addNewBrandVisible}
                title="Add new Brand"
                onOk={addNewBrandHandler}
                onCancel={() => { setAddNewBrandVisible(!addNewBrandVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Brand Name"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={editBrandVisible}
                title="Edit Brand"
                onOk={editBrandHandler}
                onCancel={() => { setEditBrandVisible(!editBrandVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="12">
                            <MDBInput
                                label="Brand Name"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>
            <Modal
                visible={addNewModelVisible}
                title="Add new Model"
                onOk={addNewModelHandler}
                onCancel={() => { setAddNewModelVisible(!addNewModelVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="mod" style={{ width: '100%', textAlign: 'left' }}>Brand</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={parentId}
                                    onChange={(e) => {
                                        setParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'mod',
                                        id: 'mod',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Brand').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                        <MDBCol md="12">
                            <MDBInput
                                label="Model Name"
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setTitle(title);
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                    
                </form>
            </Modal>
            <Modal
                visible={editModelVisible}
                title="Edit Model"
                onOk={editModelHandler}
                onCancel={() => { setEditModelVisible(!editModelVisible) }}
            >
                <form encType='multipart/form-data'>
                    <MDBCol md={12}>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="model1" style={{ width: '100%', textAlign: 'left' }}>Brand</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editParentId}
                                    onChange={(e) => {
                                        setEditParentId(e.target.value);

                                    }}
                                    inputProps={{
                                        name: 'model1',
                                        id: 'model1',
                                    }}
                                >
                                    {
                                    manageSector.length ?
                                        manageSector.filter(item=>item.sector==='Brand').map(item => {
                                            return (
                                                <MenuItem value={item._id}>{item.title}</MenuItem>
                                            )
                                        })
                                        : null
                                    }
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="12">
                            <MDBInput
                                label="Model Name"
                                type="text"
                                value={edittitle}
                                onChange={(e) => {
                                    let title = e.target.value;
                                    setEditTitle(title);
                                }}
                            />
                        </MDBCol>
                </form>
            </Modal>
        </MDBContainer>
    );
};

export default ManageSector;