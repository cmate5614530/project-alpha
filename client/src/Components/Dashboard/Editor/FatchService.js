import React from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBRow,
  MDBInput,
  MDBBtn,
  MDBCol
} from "mdbreact";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Modal } from "antd";
import Upload from './Upload';


const { confirm } = Modal;
export default class FetchService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      type: "",
      name: "",
      price: "",
      description: "",
      id: "",
      servisible: false,
      descModal: false,
      descModalDetails: '',
      image: ""
      // service:""
    };
  }

  deleteHandler = id => {
    fetch(`/service/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        this.props.fetchServicesHandler();
      }
    });
  };
  showDeleteConfirm = id => {
    const state = this;
    confirm({
      title: "Do you Want to delete this item?",
      onOk() {
        state.deleteHandler(id);
      },
      onCancel() {
        console.log("Cancel", id);
      }
    });
  };

  edit = id => {
    let editableArrary = this.props.services.filter(item => item._id === id);
    const [editable = {}] = editableArrary;
    const { _id = "", description = "", type = "", name = "", price = "",image = "" } = editable;
    this.setState({
      id: _id,
      description,
      type,
      name,
      price,
      image
    });

    this.setState({ servisible: true });
  };

  handleEdit = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("type", this.state.type);
    data.append("description", this.state.description);
    data.append("name", this.state.name);
    data.append("price", this.state.price);
    data.append("file", this.state.image);
    if(!this.state.image){
      alert("Please enter an image!");
    }else{
      fetch(`/service/${this.state.id}`, {
      method: "PATCH",
      body: data
    }).then(res => {
      if (res.status === 201) {
        this.setState({
          id: "",
          description: "",
          type: "",
          name: "",
          price: ""
        });
        this.setState({ servisible: false });
        this.props.fetchServicesHandler();
      }
    });
    }
  };

  descModalHandleCancel = () => {
    this.setState({ descModal: false })
  }

  handleImage = file => {
    this.setState({ image: file });
  };

  render() {
    const { services } = this.props;
    const { descModalDetails } = this.state;
    return (
      <div>
        <MDBCol md="8" style={{ margin: "auto" }}>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Image</th>
                <th>Type</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {services.length &&
                services.map(item => {
                  return (
                    <tr key={item._id}>
                      <td><img
                          width={50} 
                          alt={item.name}
                          src={`/${item.image}`}
                        /></td>
                      <td>{item.type}</td>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td onClick={() => this.setState({ descModal: true, descModalDetails: item })}>{item.description.substring(0, 35)}</td>
                      <td>
                        <DeleteForeverIcon
                          onClick={() => {
                            this.showDeleteConfirm(item._id);
                          }}
                        />
                        <EditIcon
                          onClick={() => {
                            this.edit(item._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                })}
            </MDBTableBody>
          </MDBTable>
        </MDBCol>
        <Modal
          visible={this.state.servisible}
          title=" Update Service"
          //  onOk={this.handleEdit}
          onCancel={() => {
            this.setState({ servisible: false });
          }}
          footer={null}
        >
          <form>
            <Upload handleImage={this.handleImage} defaultV={`/${this.state.image}`}/>
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Type"
                  type="text"
                  name="type"
                  value={this.state.type}
                  onChange={e => {
                    this.setState({ type: e.target.value });
                  }}
                />

                <MDBInput
                  label="Name"
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={e => {
                    this.setState({ name: e.target.value });
                  }}
                />
                <MDBInput
                  label="Price"
                  type="text"
                  name="price"
                  value={this.state.price}
                  onChange={e => {
                    this.setState({ price: e.target.value });
                  }}
                />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  type="textarea"
                  label=" Product Description"
                  rows="2"
                  name="des"
                  value={this.state.description}
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </MDBCol>
            </MDBRow>
            <div className="text-center mt-4">
              <MDBBtn
                color="info"
                outline
                type="submit"
                onClick={this.handleEdit}
              >
                update <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </Modal>
        <Modal
          title="Description"
          visible={this.state.descModal}
          footer={null}
          onCancel={this.descModalHandleCancel}
        >
          <p>{descModalDetails.description}</p>
        </Modal>
      </div>
    );
  }
}
