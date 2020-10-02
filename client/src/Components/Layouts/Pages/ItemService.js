import React from "react";
import {
    MDBContainer,
    MDBRow,
    MDBCol
   
  } from "mdbreact";
import { Modal } from "antd";

export default ({ item }) => {
  const [detailModal, setDetailModal] = React.useState(false);

  const showModelHandler = () => {
    setDetailModal(true);
  };
  const detailModalHandleCancel = () => {
    setDetailModal(false);
  };

  return (
    <>
      <div className="card"
       onClick={showModelHandler}
       style={{marginTop:"6%"}}
       >
        <img
          style={{ maxWidth: "100%",borderRadius: "5px 5px 0px 0px", height: 200  }}
          alt={item._id}
          src={`/${item.image}`}
        />
       
        <div className="card-body">
          <div className="card-title">{item.name}</div>
          <div className="card-text" style={{borderBottom:"1px solid #e8e8e8",height:"100px"}}>{item.description.substring(0, 300)}</div>
        </div>
        <p style={{textAlign:'right',marginRight:'3%'}}><b>$ {item.price}</b></p>
      </div>
      <Modal
        title="Service Details"
        visible={detailModal}
        onCancel={detailModalHandleCancel}
        footer={null}
        width="800px"
        // maxWidth="600px"image
      >
           <MDBContainer>
           <MDBRow style={{ textAlign: 'left' }} >
            
        <MDBCol md="6">
       
        <h3 style={{ fontWeight: '700'}}><b>{item.name}</b></h3>
        <h6><b>$ {item.price}</b></h6>
        <div style={{height: "200px", marginTop: "3%"  }}>{item.description}</div>
              <h6><b>Type: {item.type}</b></h6>
        </MDBCol>
        <MDBCol md="6">
        <img width={"100%"} height={"260px"} alt={item.name} src={`/${item.image}`} />
      
        </MDBCol>
        </MDBRow>
        </MDBContainer>
       
      </Modal>
    </>
  );
};