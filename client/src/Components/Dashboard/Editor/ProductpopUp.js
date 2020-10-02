import React from "react";
import { Modal } from "antd";
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Upload from "./Upload";
import { Switch } from "antd";
import { Input } from "antd";
import { Button } from "antd";

export default class ProductpopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      provisible: false,
      image: "",
      soldby: "unit",
      soldbyswt: "normal ",
      volumeswt: "liter",
      weightswt: "kg",
      portion: "volume",
      measurementswt: "cm",
      description: "",
      swch: true,
      barcode: "",
      name: "",
      price: "",
      discount: "",
      category: "",
      subCategory: "",
      model: "",
      brand: "",
      volumeValue: "",
      weightValue: "",
      lenght: "",
      width: "",
      depth: "",
      height: "",
      portionName: "",
      portionswt: "",
      portionValue: "",
      data:[],
      department:""
    };
  }

  componentDidMount(){
    //let initialPlanets = [];
    fetch('/managesector', {
      method: 'GET',
    }).then(res => res.json())
      .then((res) => {
        if (!!res.result) {
          this.setState({data:res.result});

        }
      });
  }
  handleImage = file => {
    this.setState({ image: file });
  };
  showProModal = e => { 
    e.preventDefault();
    this.setState({ provisible: true });
  };
  handleCancel = e => {
    this.setState({ provisible: false });
    this.setState({nameError:''});
    this.setState({priceError:''});
    this.setState({discountError:''});
  };

  onChangeSoldBy = checked => {
    checked === true
      ? this.setState({ soldbyswt: "normal" })
      : this.setState({ soldbyswt: "m2" });
  };
  onChangeVolume = checked => {
    checked === true
      ? this.setState({ volumeswt: "liter" })
      : this.setState({ volumeswt: "ml" });
  };
  onChangeWeight = checked => {
    checked === true
      ? this.setState({ weightswt: "kg" })
      : this.setState({ weightswt: "grm" });
  };

  submitHandler = e => {
    e.preventDefault();
    let data = new FormData();

    let portionn = JSON.stringify({
      portion: this.state.portion,
      portionValue:
        this.state.portion === "volume"
          ? this.state.volumeValue
          : this.state.weightValue,
      portionswt:
        this.state.portion === "volume"
          ? this.state.volumeswt
          : this.state.weightswt
    });
    let soldByObject = JSON.stringify({
      soldBy: this.state.soldby,
      soldbyswt:
        this.state.soldby === "measurement" ? this.state.soldbyswt : " "
    });
    let measurement = JSON.stringify({
      unit: this.state.measurementswt,
      height: this.state.height,
      width: this.state.width,
      depth: this.state.depth,
      lenght: this.state.length
    });
    if(this.state.name ===''){
      this.setState({nameError:'please input product name!'})
    }
    if(this.state.price===''){
      this.setState({priceError:'please input price!'})
    }
    if(100<=Number(this.state.discount)){
      this.setState({discountError:'This field can not be large than 100%!'})
    }
    if(this.state.department===''||this.state.category===''||this.state.subCategory===''||this.state.model===''||this.state.brand===''){
      alert("Please enter  department, category, sub_categoy, model and brand correctly!");
    }
    if(this.state.name !==''&&this.state.price!==''&&100>Number(this.state.discount)&&this.state.department!==''
    &&this.state.category!==''&&this.state.subCategory!==''&&this.state.model!==''&& this.state.brand!==''){
      data.append("soldByObject", soldByObject);
      data.append("barcode", this.state.barcode);
      data.append("name", this.state.name);
      data.append("price", this.state.price);
      if(this.state.discount===''){
        data.append("discount", 0);
      }else{
        data.append("discount", this.state.discount);
      }
      
      data.append("department", this.state.department);
      data.append("category", this.state.category);
      data.append("subCategory",this.state.subCategory);
      data.append("model", this.state.model);
      data.append("brand", this.state.brand);
      data.append("description", this.state.description);
      data.append("portionn", portionn);
      data.append("measurement", measurement);
      data.append("file", this.state.image);

      if(!this.state.image){
        alert("Please enter an image!");
      }else{
        fetch("/product", {
        method: "POST",
        body: data
      })
        .then(res => {
          if (res.status === 200) {
            this.props.fetchProductsHandler();
            this.handleCancel();
            this.setState({
              description: "",
              price: "",
              name: "",
              model: "",
              subCategory: "",
              department:"",
              category: "",
              brand: "",
              barcode: "",
              discount: "",
              image: "",
              weightValue: "",
              volumeValue: "",
              length: "",
              width: "",
              depth: "",
              height: ""
            });
          }
        })
        .catch(error => {
          console.log("Please check your connection", error);
        });
      }
    }
  };

  render() {
        let data = this.state.data;
        
        
        let categorydata = [];
        let subcategorydata = [];
        let branddata = [];
        let brandmodeldata = [];
        let departmentdata =[];
        for (var i = data.length - 1; i >= 0; i--) {
          if(data[i].sector === 'Department') departmentdata.push(data[i]);
          if(data[i].sector === 'Category') categorydata.push(data[i]);
          if(data[i].sector === 'Subcategory') subcategorydata.push(data[i]);
          if(data[i].sector === 'Brand') branddata.push(data[i]);
          if(data[i].sector === 'Model') brandmodeldata.push(data[i]);
        }

    return (
      <>
        <Button type="primary" onClick={this.showProModal}>
          <MDBIcon icon="plus" /> Product
        </Button>
        <Modal
          width="700px"
          visible={this.state.provisible}
          title="Product"
          onCancel={this.handleCancel}
          footer={null}
        >
          <form encType="multipart/form-data">
            <MDBRow>
              <MDBCol md="8">
                <h6>
                  <b>Product Sold By:</b>
                </h6>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.soldby}
                    type="radio"
                    className="custom-control-input"
                    id="radio1"
                    name="soldby"
                    onChange={e => {
                      console.log(e);
                      this.setState({
                        soldby: "unit"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio1">
                    Unit
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.soldby === "portion"}
                    type="radio"
                    className="custom-control-input"
                    id="radio2"
                    name="soldby"
                    onClick={e => {
                      this.setState({
                        soldby: "portion"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio2">
                    Portion
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.soldby === "measurement"}
                    type="radio"
                    className="custom-control-input"
                    id="radio3"
                    name="soldby"
                    onClick={e => {
                      this.setState({
                        soldby: "measurement"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio3">
                    Measurement
                  </label>

                  <div style={{ paddingLeft: "13px" }}>
                    {" "}
                    m<sup>2</sup>
                    <Switch
                      defaultChecked
                      onChange={this.onChangeSoldBy}
                      style={{ margin: "0px 4px 0px 4px" }}
                    />
                    Normal
                  </div>
                </div>
              </MDBCol>
              <MDBCol md="4">
                <Upload handleImage={this.handleImage} />
              </MDBCol>
            </MDBRow>

            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  label="Product Barcode"
                  type="text"
                  value={this.state.barcode}
                  onChange={e => {
                    let barcode = e.target.value;
                    this.setState({ barcode });
                  }}
                />

                <MDBInput
                  label="Product Name"
                  type="text"
                  value={this.state.name}
                  onChange={e => {
                    let name = e.target.value;
                    this.setState({ name });
                    this.setState({nameError:''});
                  }}
                />
                <p style={{color:'red'}}>{this.state.nameError}</p>
                <MDBInput
                  label="Product Price"
                  type="number"
                  min="0"
                  value={this.state.price}
                  onChange={e => {
                    let price = e.target.value;
                    this.setState({ price });
                    this.setState({priceError:''});
                  }}
                />
                <p style={{color:'red'}}>{this.state.priceError}</p>
                <MDBInput
                  label="Product Discount in %"
                  type="number"
                  min="0"
                  max={this.state.price}
                  value={this.state.discount}
                  onChange={e => {
                    this.setState({ discount: e.target.value });
                    this.setState({discountError:''});
                  }}
                />
                <p style={{color:'red'}}>{this.state.discountError}</p>
              </MDBCol>
            </MDBRow>
            {
              this.state.soldby === 'portion'?
            <div>
                <h6>
              <b>Product Portion:</b>
            </h6>
            <br></br>
            <MDBRow>
              <MDBCol md="12">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.portion === "volume"}
                    type="radio"
                    className="custom-control-input"
                    id="radio4"
                    name="portion"
                    onClick={e => {
                      this.setState({
                        portion: "volume"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio4">
                    Volume
                  </label>
                </div>

                <div className="custom-control  custom-control-inline">
                  <span> ml</span>
                  <Switch
                    defaultChecked
                    onChange={this.onChangeVolume}
                    style={{ margin: "0px 4px 0px 4px" }}
                  />
                  <span> liter </span>
                </div>
                <Input
                  defaultValue="00"
                  style={{ width: "60px", marginLeft: "20px" }}
                  value={this.state.volumeValue}
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ volumeValue: e.target.value });
                  }}
                />
              </MDBCol>
              <MDBCol md="12" style={{ marginTop: "3%" }}>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.portion === "weight"}
                    type="radio"
                    className="custom-control-input"
                    id="radio5"
                    name="portion"
                    onClick={e => {
                      this.setState({
                        portion: "weight"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio5">
                    Weight
                  </label>
                </div>
                <div className="custom-control  custom-control-inline">
                  <span> grms</span>
                  <Switch
                    defaultChecked
                    onChange={this.onChangeWeight}
                    style={{ margin: "0px 4px 0px 4px", marginLeft: "23px" }}
                  />
                  <span> kg</span>
                </div>
                <Input
                  defaultValue="00"
                  value={this.state.weightValue}
                  onChange={e => {
                    e.preventDefault();
                    this.setState({
                      weightValue: e.target.value
                    });
                  }}
                  style={{ width: "60px", marginLeft: "28px" }}
                />
              </MDBCol>
            </MDBRow>
            </div>  :null
            }
            {this.state.soldby === 'measurement'?
            <div>
            <h6 style={{ marginTop: "2%" }}>
              <b>Product Measurement:</b>
            </h6>
            <br />
            <MDBRow>
              <MDBCol md="12">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.measurementswt === "cm"}
                    type="radio"
                    className="custom-control-input"
                    id="radio6"
                    name="measurementswt"
                    onClick={e => {
                      this.setState({
                        measurementswt: "cm"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio6">
                    cm
                  </label>
                </div>
                <div
                  className="custom-control custom-radio custom-control-inline"
                  style={{ marginLeft: "6%" }}
                >
                  <input
                    defaultChecked={this.state.measurementswt === "meters"}
                    type="radio"
                    className="custom-control-input"
                    id="radio7"
                    name="measurementswt"
                    onClick={e => {
                      this.setState({
                        measurementswt: "meters"
                      });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="radio7">
                    meters
                  </label>
                </div>
              </MDBCol>
              <MDBRow style={{ marginTop: "4%" }}>
                <MDBCol md="12">
                  <div className="custom-control  custom-control-inline">
                    <Input
                      defaultValue="00"
                      style={{ width: "60px" }}
                      prefix="L:"
                      value={this.state.length}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          length: e.target.value
                        });
                      }}
                    />
                  </div>
                  <div className="custom-control  custom-control-inline">
                    <Input
                      defaultValue="00"
                      style={{ width: "60px" }}
                      prefix="W:"
                      value={this.state.width}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          width: e.target.value
                        });
                      }}
                    />
                  </div>
                  <div className="custom-control  custom-control-inline">
                    <Input
                      defaultValue="00"
                      style={{ width: "60px" }}
                      prefix="D:"
                      value={this.state.depth}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          depth: e.target.value
                        });
                      }}
                    />
                  </div>
                  <div className="custom-control  custom-control-inline">
                    <Input
                      defaultValue="00"
                      style={{ width: "60px" }}
                      prefix="H:"
                      value={this.state.height}
                      onChange={e => {
                        e.preventDefault();
                        this.setState({
                          height: e.target.value
                        });
                      }}
                    />
                  </div>
                </MDBCol>
              </MDBRow>
            </MDBRow>
            </div>:null}          
            <MDBRow style={{ marginTop: "5%" }}>
              <MDBCol md={12}>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel style={{ width: "100%", textAlign: "left" }}>
                    Select a Department
                  </InputLabel>
                  <Select
                    value={this.state.department}
                    onChange={e => {
                      this.setState({ department: e.target.value });
                    }}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    
                    {this.state.data.length ? 
                      this.state.data.filter(it=>it.sector==='Department').map(item=>{return(
                        <MenuItem value={item._id}>{item.title}</MenuItem>
                      )})
                    :null}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel style={{ width: "100%", textAlign: "left" }}>
                    Select a Category
                  </InputLabel>
                  <Select
                    value={this.state.category}
                    onChange={e => {
                      this.setState({ category: e.target.value });
                    }}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {this.state.data.length && this.state.department? 
                      this.state.data.filter(it=>it.sector==='Category'&& it.parentId===this.state.department).map(item=>{return(
                        <MenuItem value={item._id}>{item.title}</MenuItem>
                      )})
                    :null}
                    {/* {optionItems_category} */}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel style={{ width: "100%", textAlign: "left" }}>
                    Select a Sub Category
                  </InputLabel>
                  <Select
                    value={this.state.subCategory}
                    onChange={e => {
                      this.setState({ subCategory: e.target.value });
                    }}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {this.state.data.length && this.state.category? 
                      this.state.data.filter(it=>it.sector==='Subcategory'&& it.parentId===this.state.category).map(item=>{return(
                        <MenuItem value={item._id}>{item.title}</MenuItem>
                      )})
                    :null}
                    {/* {optionItems_subcategory} */}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel style={{ width: "100%", textAlign: "left" }}>
                    Select a Brand
                  </InputLabel>
                  <Select
                    value={this.state.model}
                    onChange={e => {
                      this.setState({ model: e.target.value });
                    }}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {this.state.data.length?
                      this.state.data.filter(it=>it.sector==='Brand').map(item=>{
                        return(<MenuItem value={item._id}>{item.title}</MenuItem>)
                      })
                    :null}
                  </Select>
                </FormControl>
                <FormControl style={{ width: "100%", textAlign: "left" }}>
                  <InputLabel style={{ width: "100%", textAlign: "left" }}>
                    Select a Model
                  </InputLabel>
                  <Select
                    value={this.state.brand}
                    onChange={e => {
                      this.setState({ brand: e.target.value });
                    }}
                    style={{ width: "100%", textAlign: "left" }}
                  >
                    {this.state.data.length && this.state.model?
                      this.state.data.filter(it=>it.sector==='Model' && it.parentId === this.state.model).map(item=>{
                        return(<MenuItem value={item._id}>{item.title}</MenuItem>)
                      })
                    :null}
                    {/* {optionItems_brand} */}
                  </Select>
                </FormControl>{" "}
                
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md="12">
                <MDBInput
                  type="textarea"
                  label=" Product Description"
                  rows="2"
                  value={this.state.description}
                  onChange={e => {
                    this.setState({ description: e.target.value });
                  }}
                />
              </MDBCol>
            </MDBRow>

            <div className="text-center mt-4">
              <MDBBtn color="info" outline onClick={this.submitHandler}>
                Save <MDBIcon far icon="paper-plane" className="ml-2" />
              </MDBBtn>
            </div>
          </form>
        </Modal>
      </>
    );
  }
}
