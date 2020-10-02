import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { Select, Empty, Button, Pagination } from 'antd';
import { Contact,Fabmine } from './index';
import Header2 from '../Header2';
import ItemProduct from './ItemProduct';
import MenuItem from '@material-ui/core/MenuItem';


class Products extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productCount: '',
            currentPage: 1,
            data:[]
        }
    }
    componentDidMount() {
        fetch('/managesector', {
                method: 'GET',
            }).then(res => res.json())
                .then((res) => {
                    if (!!res.result) {
                        this.setState({data:res.result});
                    }
          });
            this.fetchProductsHandler();
    }

    fetchProductsHandler = (page) => {
        let data = {
            page: page || 1
        };
        fetch("/product/get", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ products: res.result[0].data, productCount: res.result[0].total[0].value });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }
    fetchProductsByCategory = (data) => {
        fetch("/product/category", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ products: res.result });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }
    onChangeCategory = (value) => {
        let data = {
            category: value
        }
        fetch("/product/category", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ products: res.result });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }
    onChangeSubCategory = (value) => {
        let data = {
            subCategory: value
        }
        fetch("/product/sub-category", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ products: res.result });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }

    onChangeBrand = (value) => {
        let data = {
            model: value
        }
        fetch("/product/brand", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ products: res.result });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }

    clearHandler = () => {
        this.fetchProductsHandler();
        
    }

    onPageChange = (page) => {
        this.fetchProductsHandler(page);
        this.setState({ currentPage: page });
    }


    render() {
        const { products } = this.state;
        let data = this.state.data;      
        let categorydata = [];
        let subcategorydata = [];
        let branddata = [];
        let brandmodeldata = [];
        for (var i = data.length - 1; i >= 0; i--) {
          if(data[i].sector === 'Category') categorydata.push(data[i]);
          if(data[i].sector === 'Subcategory') subcategorydata.push(data[i]);
          if(data[i].sector === 'Brand') branddata.push(data[i]);
          if(data[i].sector === 'Model') brandmodeldata.push(data[i]);
        }
        let optionItems_category = categorydata.map((data) =>
                <MenuItem value={data._id}>{data.title}</MenuItem>
            );
        let optionItems_subcategory = subcategorydata.map((data) =>
                <MenuItem value={data._id}>{data.title}</MenuItem>
            );
        let optionItems_brand = branddata.map((data) =>
                <MenuItem value={data._id}>{data.title}</MenuItem>
            );
        return (
            <>
                <Header2 />

                <div className='container products'>
                    <div className='filters'>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select a Category"
                            onChange={this.onChangeCategory}
                        >
                            {optionItems_category}
                        </Select>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select a Sub-Category"
                            onChange={this.onChangeSubCategory}
                        >
                            {optionItems_subcategory}
                        </Select>
                        <Select
                            style={{ width: 200 }}
                            placeholder="Select Brand"
                            onChange={this.onChangeBrand}
                        >
                            {optionItems_brand}
                        </Select>
                        <Button onClick={this.clearHandler}>Clear</Button>
                    </div>
                    <section className='product-wrapper'>
                        {
                            products.length && data.length?
                                products.map(product => (
                                    <div className='item product' key={product._id}  style={{minWidth:350}}>
                                        <div className='team-main'>
                                            <MDBContainer>
                                                <MDBRow>
                                                    <MDBCol key={product._id} style={{ minHeight: '250px', }} >
                                                        <ItemProduct item={product} sect={data}/>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBContainer>
                                        </div>
                                    </div>
                                ))

                                :
                                <Empty />
                        }
                    </section>
                    {
                        products.length ?
                            <Pagination current={this.state.currentPage} pageSize={9} defaultPageSize={9} onChange={this.onPageChange} total={this.state.productCount} />
                            : null
                    }
                </div>
                        <Fabmine
        />
                <Contact />
            </>
        )
    }
}


export default Products;
