import React from "react";
import { Modal } from "antd";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Upload from "./Upload";
import { Switch } from "antd";
import { Input } from "antd";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";

const { confirm } = Modal;
export default class FetchProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      id: "",
      provisible: false,
      image: "",
      soldby: " ",
      portion: "",
      measurementswt: "",
      description: "",
      swch: true,
      barcode: "",
      name: "",
      price: "",
      discount: "",
      department:"",
      category: "",
      subCategory: "",
      model: "",
      brand: "",
      weightValue: "",
      volumeValue: "",
      lenght: "",
      width: "",
      depth: "",
      height: " ",
      soldbyswt: " ",
      volumeswt: "",
      weightswt: "",
      descModal: false,
      descModalDetails: '',
      data:[],

      nameError:'',
      priceError:'',
      discountError:''
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
  descModalHandleCancel = () => {
    this.setState({ descModal: false })
  }
  handleImage = (file)=>{
    this.setState({image: file});

  }
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
  deleteHandler = id => {
    fetch(`/product/${id}`, {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    }).then(res => {
      if (res.status === 200) {
        this.props.fetchProductsHandler();
      }
    });
  };
  edit = id => {
    let editableArrary = this.props.products.filter(item => item._id === id);
    const [editable = {}] = editableArrary;
    const {
      _id = "",
      description = "",
      discount = "",
      name = "",
      price = "",
      barcode = "",
      department = "",
      category = "",
      subCategory = "",
      model = " ",
      brand = " ",
      measurement = " ",
      soldByObject = " ",
      portionn = " ",
      image = " "
    } = editable;
    const {
      unit = " ",
      lenght = " ",
      width = " ",
      height = " ",
      depth = " "
    } = measurement;
    const { soldBy = " ", soldbyswt = " " } = soldByObject;
    const { portion = " ", portionswt = " ", portionValue = " " } = portionn;
    this.setState({
      id: _id,
      description,
      price,
      name,
      model,
      subCategory,
      category,
      department,
      brand,
      barcode,
      discount,
      length: lenght,
      soldby: soldBy,
      soldbyswt,
      measurementswt: unit,
      height,
      width,
      portion,
      depth,
      image,
      provisible: true,
      //portion
    });

    portion === "volume"
      ? this.setState({ volumeswt: portionswt })
      : this.setState({ weightswt: portionswt });
    portion === "volume"
      ? this.setState({ volumeValue: portionValue })
      : this.setState({ weightValue: portionValue });
  };

  handleEdit = e => {
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
      soldbyswt: this.state.soldby === "measurement" ? this.state.soldbyswt : ""
    });
    let measurement = JSON.stringify({
      unit: this.state.measurementswt,
      height: this.state.height,
      weight: this.state.width,
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
    if(this.state.name !==''&&this.state.price!==''&& 100 > Number(this.state.discount)&&this.state.department!==''
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
      data.append("department",this.state.department);
      data.append("category", this.state.category);
      data.append("subCategory", this.state.subCategory);
      data.append("brand", this.state.brand);
      data.append("model", this.state.model);
      data.append("description", this.state.description);
      data.append("portionn", portionn);
      data.append("measurement", measurement);
      data.append("file", this.state.image);
      if(!this.state.image){
        alert("Please enter an image!");
      }else{
        fetch(`/product/${this.state.id}`, {
        method: "PATCH",
        body: data
      }).then(res => {
        if (res.status === 201) {
          this.setState({
            id: " ",
            description: "",
            price: "",
            name: "",
            model: "",
            subCategory: "",
            category: "",
            department:"",
            brand: "",
            barcode: "",
            discount: "",
            image: "",
            weightValue: "",
            volumeValue: "",
            length: "",
            width: "",
            depth: "",
            height: "",
            measurementswt: ""
          });
          this.setState({ provisible: false });
          this.props.fetchProductsHandler();
          this.setState({nameError:''});
          this.setState({priceError:''});
          this.setState({discountError:''});
        }
      });
      }
    }

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

  render() {
    const { products } = this.props;
    const { descModalDetails } = this.state;
    let data = this.state.data;

    let categorydata = [];
    let subcategorydata = []; 
    let branddata = [];
    let brandmodeldata = [];
    for (var i = data.length - 1; i >= 0; i--) {
      if(data[i].sector === 'Category') categorydata.push(data[i]);
      if(data[i].sector === 'Subcategory') subcategorydata.push(data[i]);
      if(data[i].sector === 'Brand') branddata.push(data[i]);
      if(data[i].sector === 'Brandmodel') brandmodeldata.push(data[i]);
    }

    return ( 
      <div>
        <MDBTable style={{ margin: "auto" }}>
          <MDBTableHead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Barcode</th>
              <th>Department</th>
              <th>Category</th>
              <th>Sub_Category</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Sold_By</th>
              <th>Product_Portion</th>
              <th>Measurement</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {products.length &&
              // eslint-disable-next-line array-callback-return
              products.map(product => {
                let dep=this.state.data.filter(item=>item._id===product.department);
                if (
                  !!product.portionn &&
                  !!product.soldByObject &&
                  !!product.measurement
                ) {
                  //console.log(product.portionn.portion);
                  return (
                    <tr key={product._id}>
                      <td>
                        {" "}
                        <img
                          width={50} 
                          alt={product.name}
                          src={`/${product.image}`}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.discount}</td>
                      <td>{product.barcode}</td>
                      <td>{dep.length?dep[0].title:""}</td>
                      <td>{this.state.data.filter(item=>item._id===product.category).map(item=>item.title)}</td>
                      <td>{this.state.data.filter(item=>item._id===product.subCategory).map(item=>item.title)}</td>
                      <td>{this.state.data.filter(item=>item._id===product.model).map(item=>item.title)}</td>
                      <td>{this.state.data.filter(item=>item._id===product.brand).map(item=>item.title)}</td>
                      <td>
                        {product.soldByObject.soldBy}/
                        {product.soldByObject.soldbyswt}
                      </td>
                      <td>
                        {product.portionn.portion}:
                        {product.portionn.portionValue}
                        {product.portionn.portionswt}
                      </td>
                      <td>
                        {product.measurement.unit}/<br />
                        {product.measurement.height}H,
                        {product.measurement.width}W<br />
                        {product.measurement.lenght}L,
                        {product.measurement.depth}D
                      </td>
                      <td onClick={() => this.setState({ descModal: true, descModalDetails: product })}>{product.description}</td>
                      <td>
                        <DeleteForeverIcon
                          onClick={() => {
                            this.showDeleteConfirm(product._id);
                          }}
                        />
                        <EditIcon
                          onClick={() => {
                            this.edit(product._id);
                          }}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
          </MDBTableBody>
        </MDBTable>

        <Modal
          width="700px"
          visible={this.state.provisible}
          title="Update Products"
          onCancel={() => {
            this.setState({ provisible: false });
            this.setState({nameError:''});
            this.setState({priceError:''});
            this.setState({discountError:''});
          }}
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
                    value={this.state.soldby}
                    type="radio"
                    checked={this.state.soldby === "unit"}
                    className="custom-control-input"
                    id="radio1"
                    name="soldby"
                    onClick={() => {
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
                    value={this.state.soldby}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.soldby === "portion"}
                    id="radio2"
                    name="soldby"
                    onClick={() => {
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
                    value={this.state.soldby}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.soldby === "measurement"}
                    id="radio3"
                    name="soldby"
                    onClick={() => {
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
                      checked={this.state.soldbyswt === "normal"}
                      onChange={this.onChangeSoldBy}
                      style={{ margin: "0px 4px 0px 4px" }}
                    />
                    Normal
                  </div>
                </div>
              </MDBCol>
              <MDBCol md="4">
                <Upload
                  handleImage={this.handleImage}
                  defaultV={`/${this.state.image}`}
                />
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
                    this.setState({nameError:''})
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
            
            {this.state.soldby==='portion'?
            <div>
              <h6>
              <b>Product Portion:</b>
            </h6>
            <br />
            <MDBRow>
              <MDBCol md="12">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    value={this.state.portion}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.portion === "volume"}
                    id="radio4"
                    name="portion"
                    onClick={() => {
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
                    checked={this.state.volumeswt === "liter"}
                    onChange={this.onChangeVolume}
                    style={{ margin: "0px 4px 0px 4px" }}
                  />
                  <span> liter </span>
                </div>
                <Input
                  defaultValue="00"
                  value={this.state.volumeValue}
                  onChange={e => {
                    e.preventDefault();
                    this.setState({ volumeValue: e.target.value });
                  }}
                  style={{ width: "60px", marginLeft: "20px" }}
                />
              </MDBCol>
              <MDBCol md="12" style={{ marginTop: "3%" }}>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    value={this.state.portion}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.portion === "weight"}
                    id="radio5"
                    name="portion"
                    onClick={() => {
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
                    checked={this.state.weightswt === "kg"}
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
            </div>
            :null
            }
            {this.state.soldby ==='measurement'?
            <div>
              <h6 style={{ marginTop: "2%" }}>
              <b>Product Measurement:</b>
            </h6>
            <br />
            <MDBRow>
              <MDBCol md="12">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    defaultChecked={this.state.measurementswt}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.measurementswt === "cm"}
                    id="radio6"
                    name="measurementswt"
                    onClick={() => {
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
                    defaultChecked={this.state.measurementswt}
                    type="radio"
                    className="custom-control-input"
                    checked={this.state.measurementswt === "meters"}
                    id="radio7"
                    name="measurementswt"
                    onClick={() => {
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
            </div>
            :null}

            
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
                </FormControl>{" "}
                
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
                    {/* {optionItems_brandmodel} */}
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
                </FormControl>
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
              <MDBBtn color="info" outline onClick={this.handleEdit}>
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
