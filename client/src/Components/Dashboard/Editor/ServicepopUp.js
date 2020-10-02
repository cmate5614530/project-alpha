import React from "react";
import { Modal } from "antd";
import { MDBRow, MDBCol, MDBBtn, MDBIcon, MDBInput } from "mdbreact";
import { Button } from "antd";
import Upload from './Upload';

export default class ServicepopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      servisible: false,
      name: "",
      description: "",
      type: "",
      price: "",
      image: ""
    };
  }
  submitHandler = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("type", this.state.type);
    data.append("description", this.state.description);
    data.append("price", this.state.price);
    data.append("name", this.state.name);
    data.append("file", this.state.image);
      fetch("/service", {
      method: "POST",
      body: data
    })
      .then(res => {
        if (res.status === 200) {
          this.props.fetchServicesHandler();
          this.setState({
            type: " ",
            name: "",
            price: " ",
            description: " ",
            image: ""
          })
          this.handleCancel();
        }
      })
      .catch(error => {
        console.log("Please check your connection");
      });
    
  };

  showSerModal = e => {
    e.preventDefault();
    this.setState({ servisible: true });
  };
  handleCancel = e => {
    this.setState({ servisible: false });
  };

  handleImage = file => {
    this.setState({ image: file });
  };
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showSerModal}>
          <MDBIcon icon="plus" /> Services
        </Button>
        <Modal
          visible={this.state.servisible}
          title="addService"
          onCancel={this.handleCancel}
          footer={null}
        >
          <form>
            <Upload handleImage={this.handleImage} />
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
              <MDBBtn color="info" outline type="submit" onClick={this.submitHandler}>
                Save <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}
