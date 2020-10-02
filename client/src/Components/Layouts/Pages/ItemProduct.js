import React from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBContainer,
  MDBRow,
  MDBCol

} from "mdbreact";
import { Modal } from "antd";

export default ({ item, sect}) => {
  const [detailModal, setDetailModal] = React.useState(false);
  const [cat, setCat] = React.useState('');
  const [sub, setSub] = React.useState('');
  const [bra, setBra] = React.useState('');
  const [mod, setMod] = React.useState('');
  const showModelHandler = () => {
    let cat = sect.filter(it=>it.sector==='Category'&&it._id===item.category);
    setCat(cat[0].title);
    let sub = sect.filter(it=>it.sector==='Subcategory'&&it._id===item.subCategory);
    setSub(sub[0].title);
    let bra = sect.filter(it=>it._id===item.model);
    setBra(bra[0].title);
    let mod = sect.filter(it=>it._id===item.brand);
    setMod(mod[0].title);
    setDetailModal(true);
    console.log(item);
    console.log(sect);
  };
    // fetch('/managesector', {
    //         method: 'GET',
    //     }).then(res => res.json())
    //         .then((res) => {
    //             if (!!res.result) {
    //                 //this.setState({dat:res.result});
    //                 setDat(res.result);
    //                 console.log(res.result);
    //             }
    //   });
  const detailModalHandleCancel = () => {
    setDetailModal(false);
  };

  return (
    <>

      <div
        className="card"
        onClick={showModelHandler}
        style={{ marginTop: "6%" }}
      >
        <img
          style={{ maxWidth: "100%", borderRadius: "5px 5px 0px 0px", height: 200 }}
          alt={item._id}
          src={`/${item.image}`}

        />
        <p style={{ fontSize: '25px', color: 'red', position: 'absolute', marginLeft: '80%' }}><b>{item.discount}<span style={{ fontSize: '25px', color: 'red' }}>%</span></b></p>
        <div className="card-body">
          <div className="card-title">{item.name}</div>
          <div className="card-text" style={{ borderBottom: "1px solid #e8e8e8", height: "100px" }}>{item.description.substring(0, 300)}</div>
        </div>

        <p style={{ textAlign: 'right', marginRight: '3%' }}><b>$ {item.price}</b></p>
      </div>

      <Modal
        title="Product Details"
        visible={detailModal}
        onCancel={detailModalHandleCancel}
        footer={null}
        width="1000px"
      // maxWidth="1000px"
      >
        <MDBContainer>
          <MDBRow style={{ textAlign: 'left' }}>
            <MDBCol md="6">

              <h3 style={{ fontWeight: '700'}}><b>{item.name}</b></h3>
              <h6><b>$ {item.price}</b></h6>
              <div style={{height: "200px", marginTop: "3%"  }}>{item.description}</div>

             
             <h6><b>Sold By:&nbsp;&nbsp;&nbsp;&nbsp;{item.soldByObject.soldBy}/{item.soldByObject.soldbyswt}</b></h6>
             <h6><b>Portion:</b></h6>
             &nbsp;&nbsp;&nbsp;&nbsp;{item.portionn.portion}:&nbsp;&nbsp;&nbsp;&nbsp;{item.portionn.portionValue}&nbsp;&nbsp;{item.portionn.portionswt}
             
             <h6><b>Measurement:</b></h6>
             &nbsp;&nbsp;&nbsp;&nbsp;height:&nbsp;&nbsp;{item.measurement.height}&nbsp;&nbsp;{item.measurement.unit}
             &nbsp;&nbsp;&nbsp;&nbsp;width:&nbsp;&nbsp;{item.measurement.width}&nbsp;&nbsp;{item.measurement.unit}
             &nbsp;&nbsp;&nbsp;&nbsp;length:&nbsp;&nbsp;{item.measurement.lenght}&nbsp;&nbsp;{item.measurement.unit}
             &nbsp;&nbsp;&nbsp;&nbsp;depth:&nbsp;&nbsp;{item.measurement.depth}&nbsp;&nbsp;{item.measurement.unit}
             <div><br/></div>
              {/*<table class="table">
                              
                              <thead>
                               
                              </thead>
                              <tbody>
                                <tr >
                                 <td style={{borderTopStyle:'none'}}></td>
                                  <td style={{borderTopStyle:'none'}}>{item.soldByObject.soldBy}</td>
                                  <td style={{borderTopStyle:'none'}}>{item.soldByObject.soldBy}</td>
                                  <th style={{ borderLeft: '2px solid #e8e8e8',borderTopStyle:'none' }}>Sold By</th>
                                </tr>
                                <tr>
                                 
                                  <td>{item.portionn.portion}</td>
                                  <td>{item.portionn.portionValue}</td>
                                  <td>{item.portionn.portionswt}</td>
                                  <th style={{ borderLeft: '2px solid #e8e8e8' }}>Portion</th>
                                </tr>
                                <tr>
                                 
                                  <td>{item.measurement.unit}</td>
                                  <td>{item.measurement.height}H,
                                      {" "}
                                    {item.measurement.width}w
                                    </td>
                                    <td>
                                    {item.measurement.lenght}L, {" "}
                                    {item.measurement.depth}D
                                        </td>
                                  <th style={{ borderLeft: '2px solid #e8e8e8' }}>Measurement</th>
                                </tr >
                              </tbody>
                            </table>*/}
              
             
            </MDBCol>
            <MDBCol md="6">
              <img width={"100%"} height={"260px"} alt={item.name} src={`/${item.image}`} />
              <MDBTable style={{marginTop:'3%'}}>
                <MDBTableHead>
                  <tr>
                    <th><b>Category</b></th>
                    <th><b>SubCategory</b></th>
                    <th><b>Brand</b></th>
                    <th><b>Model</b></th>
                    
                    
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>{cat}</td>
                    <td>{sub}</td>
                    
                    <td>{bra}</td>
                    <td>{mod}</td>
                    
                  </tr>
                </MDBTableBody>
              </MDBTable>

            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </Modal>
    </>
  );
};