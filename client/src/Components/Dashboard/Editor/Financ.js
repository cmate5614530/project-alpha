/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/role-has-required-aria-props */
import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput} from 'mdbreact';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import './finance.css';
import { Modal } from 'antd';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';
import blue from '@material-ui/core/colors/blue';
import { TablePagination } from '@material-ui/core';
import { message,Button } from "antd";
import 'date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Upload from './Upload';
import MyUpload from "./MyUpload";
import { TableHeader } from "material-ui";

const { confirm } = Modal;
const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
const useStyles = makeStyles(theme => ({
    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      gridGap: theme.spacing(3),
    },
    paper1: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:indigo[500]
    },
    paper2: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:teal[500]
    },
    paper3: {
        height:'100px',
        fontWeight:'bold',
        color:'white',
        backgroundColor:pink[500]
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    root: {
        width: '100%',
      },
    container1: {
        maxHeight: 600,
      },
  }));

const Financ = () => {
    const classes = useStyles();
    const [id, setId] = useState('');
    const [visible, setVisible] = useState(false);
    const [newVisible, setNewVisible] = useState(false);
    const [oS, setOS] = useState('');
    const [editOS, setEditOS] = useState('');
    const [emission, setEmission] = React.useState(new Date());
    const [editEmission, setEditEmission] = useState(new Date());
    const [status, setStatus] = useState('');
    const [editStatus, setEditStatus] = useState('');
    const [client, setClient] = useState('');
    const [editClient, setEditClient] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [editPaymentType, setEditPaymentType] = useState('');
    const [collectPaymentType, setCollectPaymentType] = useState('');
    const [collectAmount, setCollectAmount] = useState(0);
    const [amount, setAmount] = useState(0);
    const [editAmount, setEditAmount] = useState(0);
    const [received, setReceived] = useState(0);
    const [editReceived, setEditReceived] = useState(0);
    const [balance, setBalance] = useState(0);
    const [editBalance, setEditBalance] = useState(0);
    const [lastPayment, setLastPayment] = React.useState(new Date());
    const [editLastPayment, setEditLastPayment] = React.useState(new Date());
    const [editOrderDetail, setEditOrderDetail] = React.useState('');
    const [editWorkDetail, setEditWorkDetail] = useState('');
    const [orderDetail, setOrderDetail] = useState('');
    const [workDetail, setWorkDetail] = useState('');

    const [finance, setFinance] = useState([]);

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalReceived, setTotalReceived] = useState(0);
    const [totalCollect, setTotalCollect] = useState(0);
    const [visible1, setVisible1] = useState(false);
    const [visibleEdit, setVisibleEdit] = useState(false);
      // The first commit of Material-UI

    const [from, setFrom] = React.useState(new Date('2020-01-01T00:00:00'));
    const [to, setTo] = React.useState(new Date());
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const [oSError, setOSError] = useState('');
    const [statusError, setStatusError] = useState('');
    const [clientError, setClientError] = useState('');
    const [paymentTypeError, setPaymentTypeError] = useState('');
    const [amountError, setAmountError] = useState('');
    const [receivedError, setRecivedError] = useState('');
    const [image1Error, setImage1Error] = useState('');
    const [image2Error, setImage2Error] = useState('');

    const [searchval, setSearchval]=useState('');
    const [count, setCount]=useState(0);
    const [image1, setImage1]=useState('');
    const [defaultimage1, setDefaultImage1] = useState(undefined);
    const [image2, setImage2]=useState('');
    const [defaultimage2, setDefaultImage2] = useState(undefined);
    const [history, setHistory] = useState([]);
    const [collectHistory, setCollectHistory] = useState([]);

    const [receipt, setReceipt] = useState(undefined);
    useEffect(() => {
        fetchFinanceData();
    }, []);

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const handleEmission = date => {
        setEmission(date);
    }

    const handleEditEmission = date => {
        setEditEmission(date);
    }
    const handleLastPayment = date => {
        setLastPayment(date);
    }

    const handleEditLastPayment = date => {
        setEditLastPayment(date);
    }
    const handleFromDateChange = date => {
        setFrom(date);
        let array = finance.filter(fin=> new Date(fin.emission)-date>=0 && to-new Date(fin.emission)>=0  && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.includes(searchval)===true));
        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    };

    const handleToDateChange = date => {
        setTo(date);
        let array = finance.filter(fin=> new Date(fin.emission)-from>=0 && date-new Date(fin.emission)>=0  && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.includes(searchval)===true));
        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    };

    const handleSearchChange = e => {
        setSearchval(e.target.value);
        let array = finance.filter(fin=>new Date(fin.emission)-from>=0 && to-new Date(fin.emission)>=0 && (fin.client.includes(e.target.value)===true || fin.paymentType.includes(e.target.value)===true || fin.status.includes(e.target.value)===true || fin.os.toString().includes(e.target.value)===true));

        let totalAmount=0;
        let totalReceived=0;
        for(var i=0;i<array.length;i++){
            totalAmount +=Number(array[i].amount);
            totalReceived += Number(array[i].received);
        }
        setTotalAmount(totalAmount);
        setTotalReceived(totalReceived);
        setTotalCollect(Number(totalAmount)-Number(totalReceived));
        setCount(array.length);
    }

    const handleImage1 = (file) => {
        setImage1(file);
        setImage1Error('');
     }

    const handleImage2 = (file) => {
        setImage2(file);
        setImage2Error('');
     }
    
    const handleImage1Edit = (file) => {
        setEditOrderDetail(file);
     }

    const handleReceipt = (file) => {
        setReceipt(file);
    }

    const handleImage2Edit = (file) => {
        setImage2(file);
        setEditWorkDetail(file);
     }
    function formatNumber(num) {
        return num.toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }
    //add new 
    const submitHandler = (e) => {
        e.preventDefault();
        // if(oS === ''){
        //     setOSError('Please fill this field.');
        // }
        if(client === ''){
            setClientError('Please fill this field.');
        }
        if(paymentType === ''){
            setPaymentTypeError('Please fill this field.');
        }
        if(Number(amount) <= 0){
            setAmountError('Please fill this field.');
        }
        if(Number(amount)-Number(received) <0){
            setRecivedError('invalid!');
        }
        if(image1 === ''){
            setImage1Error('Please select the order detail.');
        }
        if(Number(received) >0 && image2 === ''){
            setImage2Error('Please select the receipt image.');
        }
        if(client !== '' && paymentType !== '' && Number(amount)>0 && Number(amount)-Number(received)>=0 && image1 !== '' && ((image2 !== ''&& Number(received)>0) ||(Number(received)===0))){
            let data = new FormData();
            let stat = '';
            data.append('lastPayment', lastPayment);
            if(Number(received)===0){
                stat = 'open';
                data.append('lastPayment', '');
            }
            else if(Number(received)>0 && Number(received)<Number(amount)){
                stat = 'partial';
            }
            else if(Number(received)===Number(amount)){
                stat = 'paid';
            }
            else{
                stat = 'other'
            }
            //data.append('os', oS);
            data.append('emission', emission);
            data.append('status', stat);
            data.append('client', client);
            data.append('paymentType', paymentType);
            data.append('amount', amount);
            data.append('received', Number(received));
            data.append('balance', Number(amount)-Number(received));
            //data.append('lastPayment', lastPayment);
            data.append('orderDetail', image1);
            data.append('workDetail', image2);

            fetch('/finance', {
                method: 'POST',
                body: data
            })
                .then(res => {
                    if (res.status === 200) {
                        //setNewVisible(false);
                        fetchFinanceData();
                    }
                })
                .catch(error => {
                    console.log('Please check your connection');
                })
        }
        
    }

    const fetchFinanceData = () => {
        setFinance('');
        setOS('');
        setEmission(new Date());
        setStatus('');
        setClient('');
        setPaymentType('');
        setAmount(0);
        setReceived(0);
        setBalance(0);
        setLastPayment(new Date());
        setTotalAmount(0);
        setTotalCollect(0);
        setTotalReceived(0);
        setImage1('');
        setImage2('');
        setHistory([]);
        fetch(`/finance`)
            .then(res => res.json())           
            .then(res => {
                if(!!res.result){
                    let sortedArray = res.result.sort((a, b) => a.created_at.valueOf() - b.created_at.valueOf())
                    setFinance(sortedArray);
                    setCount(res.result.length);
                    let finance = res.result;
                    let totalAmount=0;
                    let totalReceived=0;
                    for(var i=0;i<finance.length;i++){
                        totalAmount +=Number(finance[i].amount);
                        totalReceived += Number(finance[i].received);
                    }
                    setTotalAmount(totalAmount);
                    setTotalReceived(totalReceived);
                    setTotalCollect(Number(totalAmount)-Number(totalReceived));
                }               
            })
            .catch(error => {
                console.log('Please check your internet connection..!');
            })
    }
    //in case of collect
    const edit2 = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='', imgName1='',imgName2='',history=[] } = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        setDefaultImage1(imgName1);
        setDefaultImage2(imgName2);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);

        setCollectHistory(history);
        setVisible(!visible);
    }
    //in case of view
    const edit1 = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='',imgName1='', imgName2='', history=[]} = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        setCollectHistory(history);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        setVisible1(!visible1);
    }
    //in case of edit
    const edit = (id) => {
        let editableArrary = finance.filter(item => item._id === id);
        const [editable = {}] = editableArrary;
        const { _id = '', os = '',  emission = '',status='',client='',paymentType='',amount='', received='',balance='',lastPayment='',imgName1='', imgName2='' ,history=[]} = editable;
        setId(_id);
        setEditOS(os);
        setEditEmission(emission);
        setEditStatus(status);
        setEditClient(client);
        setEditPaymentType(paymentType);
        setEditAmount(amount);
        setEditReceived(received);
        setEditBalance(balance);
        setEditOrderDetail(imgName1);
        setEditWorkDetail(imgName2);
        //setEditBalance(Number(amount)-Number(received));
        setEditLastPayment(lastPayment);
        setDefaultImage1(imgName1);
        setDefaultImage2(imgName2);
        setCollectHistory(history);
        setVisibleEdit(!visibleEdit);
    }
    //submit collect
    const submitCollectHandler = (e) => {
        e.preventDefault()
        let data =  new FormData();

        if(collectPaymentType===''){
            alert('please select payment type.');
        }
        else if(Number(collectAmount)<=0 || Number(collectAmount)>Number(editBalance)){
            alert('AmountToCollect field is invalid');
        }
        else if(receipt === ''||receipt ===[] ||receipt ===undefined){
            alert('please insert receipt.')
        }
        else{
            let stat = '';
            if(Number(collectAmount)===0){
                stat = 'open';
            }
            else if(Number(collectAmount)>0 && Number(collectAmount)<Number(editBalance)){
                stat = 'partial';
            }
            else if(Number(collectAmount)===Number(editBalance)){
                stat = 'paid';
            }
            else{
                stat = 'other'
            }
            data.append('paymentType', collectPaymentType);
            data.append('collectAmount', Number(collectAmount));
            data.append('lastPayment', editLastPayment);
            data.append('receipt', receipt);
            data.append('status', stat);

            fetch(`/finance/collect/${id}`, {
                method: 'POST',
                body: data,
                }).then(res => {
                    if (res.status === 201) {
                        setCollectAmount(0);
                        setCollectPaymentType('');
                        setReceipt(undefined);
                        setEditLastPayment(new Date());
                        setId('');
                        setEditOS('');
                        setEditEmission(new Date());
                        setEditStatus('');
                        setEditClient('');
                        setEditPaymentType('');
                        setEditAmount('');
                        setEditReceived('');
                        setEditBalance('');
                        //setEditLastPayment(new Date());
                        setEditOrderDetail('');
                        setEditWorkDetail('');
                        setVisible(false);
                        setVisibleEdit(false);
                        fetchFinanceData();
                    }
                });
        }

    }
    //submit edit
    const submitEditHandler = (e) => {
        e.preventDefault()
        let data = new FormData();
        let stat = '';
        if(Number(editReceived)===0){
            stat = 'open';
        }
        else if(Number(editReceived)>0 && Number(editReceived)<Number(editAmount)){
            stat = 'partial';
        }
        else if(Number(editReceived)===Number(editAmount)){
            stat = 'paid';
        }
        else{
            stat = 'other'
        }
        if(Number(editAmount)<0|| Number(editAmount)<Number(editReceived)+Number(editBalance)){
            alert('Amount field is invalid.');
        }else{
            data.append('os', editOS);
            data.append('emission', editEmission);
            data.append('status', stat);
            data.append('client', editClient);
            data.append('paymentType', editPaymentType);
            data.append('amount', editAmount);
            data.append('received', editReceived);
            data.append('balance', Number(editAmount)-Number(editReceived));
            data.append('lastPayment', editLastPayment);
            data.append('orderDetail', editOrderDetail);
            data.append('workDetail', editWorkDetail);
            fetch(`/finance/${id}`, {
            method: 'PATCH',
            body: data,
            }).then(res => {
                if (res.status === 201) {
                    setId('');
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount('');
                    setEditReceived('');
                    setEditBalance('');
                    setEditLastPayment(new Date());
                    setEditOrderDetail('');
                    setEditWorkDetail('');
                    setVisible(false);
                    setVisibleEdit(false);
                    setCollectHistory([]);
                    fetchFinanceData();
                }
            })
        }
    }

    const deleteHandler = (id) => {
        fetch(`/finance/${id}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        })
            .then(res => {
                if (res.status === 200) {
                    fetchFinanceData();
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
    const addNew=()=>{
        setNewVisible(true);
    }

    return (
        <MDBContainer className="text-center">
            <br></br>
            <br></br>
            <p className="h4 text-center mb-4">Finance  Management</p>
            <Grid container spacing={3}>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total Amount</label>
                    <Paper className={classes.paper1}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalAmount)}</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total Received</label>
                    <Paper className={classes.paper2}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalReceived)}</p>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <label style={{fontWeight:'bold'}}>Total To Collect</label>
                    <Paper className={classes.paper3}>
                        <p style={{fontSize:'15px', textAlign:'left', paddingTop:'10px',paddingLeft:'10px',marginBottom:'0px' }}>R$</p>
                        <p style={{fontSize:'40px',textAlign:'center'}}>{formatNumber(totalCollect)}</p>
                    </Paper>
                </Grid>
            </Grid>
            <br></br>
            <br></br>
            <div style={{textAlign:'left'}}>
                <Fab size="small" color="primary" aria-label="add" name="fabicon" onClick={addNew}>
                        <AddIcon />
                </Fab>
                <label style={{fontWeight:'bold'}}>&nbsp;&nbsp;Add New</label>
            </div>
            <br></br>
            <br></br>
            <MDBRow md={12}>
                <MDBCol md={6}>
                    <MDBRow style={{textAlign:'left'}}>
                        <p style={{fontWeight:'bold'}}>&nbsp;&nbsp;Select Emission Date Period</p>
                    </MDBRow>
                    <MDBRow>            
                        <MDBCol md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline1"
                                        label="From"
                                        value={from}
                                        onChange={handleFromDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                        <MDBCol md={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline2"
                                        label="To"
                                        value={to}
                                        onChange={handleToDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                </MDBCol>
                <MDBCol md={6} style={{textAlign:'right'}}>
                    <MDBRow>
                        <p style={{fontWeight:'bold'}}>Select O.S#, Status, Client or Payment type</p>
                    </MDBRow>
                    <MDBRow>
                        <MDBInput label="search key" value={searchval} onChange={handleSearchChange}></MDBInput>
                    </MDBRow>
                </MDBCol>
            </MDBRow>
            <MDBRow>   
                <MDBCol md="12">
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    <Paper className={classes.root}>
                    <TableContainer className={classes.container1}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead style={{backgroundColor:blue[500], color:'white'}}>
                            <TableRow>
                                <TableCell>O.S #</TableCell>
                                <TableCell>Emission</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Payment type</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Received</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Last Payment</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        
                            {
                                finance.length ?
                                    finance.filter(fin=> new Date(fin.emission)-from>=0 && to-new Date(fin.emission)>=0 && (fin.client.includes(searchval)===true || fin.paymentType.includes(searchval)===true || fin.status.includes(searchval)===true || fin.os.toString().includes(searchval)===true) ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => {
                                        var emissiondate = new Date(item.emission);
                                        var lastPaymentdate = new Date(item.lastPayment);
                                        var editlink = item.balance===0?<a style={{color:'blue'}} onClick={()=>edit1(item._id)}>View</a>:
                                                                        <a style={{color:'green'}} onClick={()=>edit2(item._id)}>Collect</a>;
                                        return (
                                            <TableBody>
                                            <TableRow key={item._id} hover role="checkbox" tabIndex={-1}>
                                                <TableCell>{item.os}</TableCell>
                                                <TableCell>{pad(emissiondate.getDate())}/{pad(emissiondate.getMonth()+1)}/{emissiondate.getFullYear()}</TableCell>
                                                <TableCell>{item.status}</TableCell>
                                                <TableCell>{item.client}</TableCell>
                                                <TableCell>{item.paymentType}</TableCell>
                                                <TableCell>{item.amount}</TableCell>
                                                <TableCell>{item.received}</TableCell>
                                                <TableCell>{item.balance}</TableCell>
                                                {Number(item.received)>0?(<TableCell>{pad(lastPaymentdate.getDate())}/{pad(lastPaymentdate.getMonth()+1)}/{lastPaymentdate.getFullYear()}</TableCell>):<TableCell></TableCell>}
                                                <TableCell>
                                                    {/* <DeleteForeverIcon onClick={() => showDeleteConfirm(item._id)} /> */}
                                                    {editlink}
                                                    &nbsp;&nbsp;
                                                    <a style={{color:'brown'}} onClick={()=>edit(item._id)}>Edit</a>
                                                    &nbsp;&nbsp;
                                                    <a style={{color:'red'}} onClick={()=>showDeleteConfirm(item._id)}>Delete</a>
                                                    {/* <EditIcon onClick={() => edit(item._id)} /> */}
                                                </TableCell>
                                            </TableRow>
                                            </TableBody>
                                        )
                                    })
                                    : null
                            }
                        
                    </Table>
                    </TableContainer>
                    </Paper>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={count}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </MDBCol>
            </MDBRow>
            <Modal
                visible={newVisible}
                title="Add New "
                onOk={submitHandler}
                onCancel={() => { 
                    setOS('');
                    setEmission(new Date());
                    setStatus('');
                    setClient('');
                    setPaymentType('');
                    setAmount(0);
                    setReceived(0);
                    setBalance(0);
                    setLastPayment(new Date());
                    setOSError('');
                    setStatusError('');
                    setClientError('');
                    setPaymentTypeError('');
                    setAmountError('');
                    setRecivedError('');
                    setImage1Error('');
                    setImage2Error('');
                    setNewVisible(!newVisible); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="12"  style={{textAlign:'left'}}>
                            <label>Order Detail</label>
                        </MDBCol>
                        <MDBCol md="12"  style={{textAlign:'left'}}>
                            <MyUpload handleImage={handleImage1}/>
                            <p style={{color:'red'}}>{image1Error}</p>
                        </MDBCol>
                    </MDBRow>
                    {/* <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                value={oS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setOS(os);
                                    setOSError('');
                                }}
                                />
                            <p style={{color:'red'}}>{oSError}</p>
                        </MDBCol>
                    </MDBRow> */}
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline3"
                                        label="Emission Date"
                                        value={emission}
                                        onChange={handleEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client" 
                                type="text"
                                value={client}
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setClient(cl);
                                    setClientError('');
                                }}
                                />
                            <p style={{color:'red'}}>{clientError}</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                        <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={paymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setPaymentType(pt);
                                        setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="check">check</MenuItem>
                                    <MenuItem value="deposit">deposit</MenuItem>
                                    <MenuItem value="transfer">transfer</MenuItem>
                                    <MenuItem value="credit card">credit card</MenuItem>
                                    <MenuItem value="debit card">debit card</MenuItem>
                                    <MenuItem value="other">other</MenuItem>
                                </Select>
                            </FormControl>
                            <p style={{color:'red'}}><br></br>{paymentTypeError}</p>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                min="0"
                                value={amount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setAmount(amount);
                                    setAmountError('');
                                }}
                                />
                            <p style={{color:'red'}}>{amountError}</p>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                min="0"
                                max={amount}
                                value={received}
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setReceived(received);
                                }}
                                />
                            <p style={{color:'red'}}>{receivedError}</p>
                        </MDBCol>
                    
                    <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                disabled
                                value={Number(amount)-Number(received)}
                                
                                />
                        </MDBCol>
                    </MDBRow>
                    {
                        Number(received) > 0 ?
                        <div>
                        <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline4"
                                        label="Last Payment Date"
                                        value={lastPayment}
                                        onChange={handleLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    
                    <MDBRow>
                        <MDBCol md="6">
                        <br></br>
                            <label>Receipt</label>
                            <Upload handleImage={handleImage2}/>
                            <p style={{color:'red'}}>{image2Error}</p>
                        </MDBCol>
                    </MDBRow>
                    </div>
                    :null
                    }
                    
                </form>
            </Modal>
            <Modal
                visible={visible}
                title="Collect Payment "
                onOk={submitCollectHandler}
                onCancel={() => { 
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount(0);
                    setEditReceived(0);
                    setEditBalance(0);
                    setEditLastPayment(new Date());
                    setVisible(!visible); 
                    setCollectAmount(0);
                    setCollectHistory([]);
                    setCollectPaymentType('');
                }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>             
                        <MDBCol md="6">
                            <br></br>
                            <a href={editOrderDetail}>Order Detail</a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                disabled
                                value={editOS}
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setOS(os);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline5"
                                        label="Emission Date"
                                        value={editEmission}
                                        disabled
                                        onChange={handleEditEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client"
                                type="text"
                                value={editClient}
                                disabled
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setClient(cl);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                value={editBalance}
                                disabled
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={12}>
                            Collect History
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PaymentType</TableCell>
                                        <TableCell>CollectAmount</TableCell>
                                        <TableCell>PaymentDate</TableCell>
                                        <TableCell>Receipt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    collectHistory.length?
                                        collectHistory.map(item=>{
                                            return(
                                                <TableRow>
                                                    <TableCell>{item.paymentType?item.paymentType:null}</TableCell>
                                                    <TableCell>{item.collectAmount?item.collectAmount:0}</TableCell>
                                                    <TableCell>{item.paymentDate?pad((new Date(item.paymentDate)).getDate())+'/'+pad((new Date(item.paymentDate)).getMonth()+1)+'/'+(new Date(item.paymentDate)).getFullYear():null}</TableCell>
                                                    <TableCell>{item.receipt?<a href={item.receipt}>view</a>:null}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                                
                                    :null
                                }
                                </TableBody>
                            </Table>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={collectPaymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setCollectPaymentType(pt);
                                        //setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="check">check</MenuItem>
                                    <MenuItem value="deposit">deposit</MenuItem>
                                    <MenuItem value="transfer">transfer</MenuItem>
                                    <MenuItem value="credit card">credit card</MenuItem>
                                    <MenuItem value="debit card">debit card</MenuItem>
                                    <MenuItem value="other">other</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount to collect"
                                type="number"
                                
                                value={collectAmount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setCollectAmount(amount);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    {Number(collectAmount)>0?
                    <div>
                    <MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline6"
                                        label="Payment Date"
                                        value={editLastPayment}
                                        onChange={handleEditLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                        <br></br>
                            <label>Receipt</label>
                            <Upload handleImage={handleReceipt}/>
                            {/* <p style={{color:'red'}}>{image2Error}</p> */}
                        </MDBCol>
                    </MDBRow>
                    </div>:null}
                    
                </form>
            </Modal>
            <Modal
                visible={visibleEdit}
                title="Edit"
                onOk={submitEditHandler}
                onCancel={() => { 
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount(0);
                    setEditReceived(0);
                    setEditBalance(0);
                    setEditLastPayment(new Date());
                    setEditWorkDetail('');
                    setEditOrderDetail('');
                    setVisibleEdit(!visibleEdit); 
                    setCollectHistory([]);
                }}
            >
                <form encType='multipart/form-data'>
                    <MDBRow>
                        <MDBCol md="6">
                            <br></br>
                            <a href={editOrderDetail}>Order Detail</a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <MDBInput
                                label="Service Order Number"
                                type="number"
                                value={editOS}
                                disabled
                                onChange={(e) => {
                                    let os = e.target.value;
                                    setEditOS(os);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline5"
                                        label="Emission Date"
                                        value={editEmission}
                                        onChange={handleEditEmission}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Client"
                                type="text"
                                value={editClient}
                                onChange={(e) => {
                                    let cl = e.target.value;
                                    setEditClient(cl);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={12}>
                            Collect History
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PaymentType</TableCell>
                                        <TableCell>CollectAmount</TableCell>
                                        <TableCell>PaymentDate</TableCell>
                                        <TableCell>Receipt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    collectHistory.length?
                                        collectHistory.map(item=>{
                                            return(
                                                <TableRow>
                                                    <TableCell>{item.paymentType?item.paymentType:null}</TableCell>
                                                    <TableCell>{item.collectAmount?item.collectAmount:0}</TableCell>
                                                    <TableCell>{item.paymentDate?pad((new Date(item.paymentDate)).getDate())+'/'+pad((new Date(item.paymentDate)).getMonth()+1)+'/'+(new Date(item.paymentDate)).getFullYear():null}</TableCell>
                                                    <TableCell>{item.receipt?<a href={item.receipt}>view</a>:null}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                                
                                    :null
                                }
                                </TableBody>
                            </Table>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            {/* <MDBInput
                                label="Payment Type"
                                type="text"
                                value={editPaymentType}
                                onChange={(e) => {
                                    let pt = e.target.value;
                                    setEditPaymentType(pt);
                                }}
                                /> */}
                                <br></br>
                            <FormControl style={{ width: '100%', textAlign: 'left' }}>
                                <InputLabel htmlFor="PaymentType" style={{ width: '100%', textAlign: 'left' }}>Payment Type</InputLabel>
                                <Select
                                    style={{ width: '100%', textAlign: 'left' }}
                                    value={editPaymentType}
                                    inputProps={{
                                        name: 'PaymentType',
                                        id: 'PaymentType',
                                    }}
                                    onChange={(e) => {
                                        let pt = e.target.value;
                                        setEditPaymentType(pt);
                                        //setPaymentTypeError('');
                                    }}
                                    >
                                    <MenuItem value="cash">cash</MenuItem>
                                    <MenuItem value="check">check</MenuItem>
                                    <MenuItem value="deposit">deposit</MenuItem>
                                    <MenuItem value="transfer">transfer</MenuItem>
                                    <MenuItem value="credit card">credit card</MenuItem>
                                    <MenuItem value="debit card">debit card</MenuItem>
                                    <MenuItem value="other">other</MenuItem>
                                </Select>
                            </FormControl>
                        </MDBCol>
                    
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Amount"
                                type="number"
                                
                                value={editAmount}
                                onChange={(e) => {
                                    let amount = e.target.value;
                                    setEditAmount(amount);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Received"
                                type="number"
                                value={editReceived}
                                disabled
                                onChange={(e) => {
                                    let received = e.target.value;
                                    setEditReceived(received);
                                }}
                                />
                        </MDBCol>
                    
                    <MDBCol md="6" style={{textAlign:'left'}}>
                            <MDBInput
                                label="Balance"
                                type="number"
                                value={Number(editAmount)-Number(editReceived)}
                                disabled
                                onChange={(e) => {
                                    let balance = e.target.value;
                                    setEditBalance(balance);
                                }}
                                />
                        </MDBCol>
                    </MDBRow>
                    {Number(editReceived)>0?<MDBRow>
                        <MDBCol md="6" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around">
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline6"
                                        label="Last Payment Date"
                                        value={editLastPayment}
                                        onChange={handleEditLastPayment}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </MDBCol>
                    </MDBRow>:null}
                    {/* <MDBRow>
                        
                        <MDBCol md="6">
                            <br></br>
                            <a href={editWorkDetail}>Receipt</a>
                        </MDBCol>
                    </MDBRow> */}
                </form>
            </Modal>
            <Modal
                visible={visible1}
                title="View Payment "
                footer={null}
                onCancel={() => { 
                    setEditOS('');
                    setEditEmission(new Date());
                    setEditStatus('');
                    setEditClient('');
                    setEditPaymentType('');
                    setEditAmount(0);
                    setEditReceived(0);
                    setEditBalance(0);
                    setEditLastPayment(new Date());
                    setEditWorkDetail('');
                    setEditOrderDetail('');
                    setCollectHistory([]);
                    setVisible1(!visible1); }}
            >
                <form encType='multipart/form-data'>

                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Order Detail:</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <a href={editOrderDetail}>view</a>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Service Order Number:</label>
                        </MDBCol>
                        <MDBCol md="6"  style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editOS}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6">
                            <label style={{fontSize:'larger'}}>Emission:</label>
                        </MDBCol>
                        <MDBCol md="6">
                            <label style={{fontSize:'larger'}}>{pad((new Date(editEmission)).getDate())}/{pad((new Date(editEmission)).getMonth()+1)}/{(new Date(editEmission)).getFullYear()}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Status:</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editStatus}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Client</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editClient}</label>
                        </MDBCol>
                    </MDBRow>
                    {/* <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Payment Type:</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editPaymentType}</label>
                        </MDBCol>
                    </MDBRow> */}
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Amount:</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editAmount}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>Received Amount:</label>
                        </MDBCol>
                        <MDBCol md="6" style={{textAlign:'left'}}>
                            <label style={{fontSize:'larger'}}>{editReceived}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <label style={{fontSize:'larger'}}>Last Payment Date:</label>
                        </MDBCol>
                        <MDBCol md="6" >
                            <label style={{fontSize:'larger'}}>{pad((new Date(editLastPayment)).getDate())}/{pad((new Date(editLastPayment)).getMonth()+1)}/{(new Date(editLastPayment)).getFullYear()}</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md="6" >
                            <label style={{fontSize:'larger'}}>Payment History:</label>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol md={12}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>PaymentType</TableCell>
                                        <TableCell>CollectAmount</TableCell>
                                        <TableCell>PaymentDate</TableCell>
                                        <TableCell>Receipt</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    collectHistory.length?
                                        collectHistory.map(item=>{
                                            return(
                                                <TableRow>
                                                    <TableCell>{item.paymentType?item.paymentType:null}</TableCell>
                                                    <TableCell>{item.collectAmount?item.collectAmount:0}</TableCell>
                                                    <TableCell>{item.paymentDate?pad((new Date(item.paymentDate)).getDate())+'/'+pad((new Date(item.paymentDate)).getMonth()+1)+'/'+(new Date(item.paymentDate)).getFullYear():null}</TableCell>
                                                    <TableCell>{item.receipt?<a href={item.receipt}>view</a>:null}</TableCell>
                                                </TableRow>
                                            )
                                        })
                                                
                                    :null
                                }
                                </TableBody>
                            </Table>
                        </MDBCol>
                    </MDBRow>
                </form>
            </Modal>

        </MDBContainer>
    );
};

export default Financ;