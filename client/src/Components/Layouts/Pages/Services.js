import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import {Pagination } from 'antd';
import { Contact,Fabmine } from './index';
import Header2 from '../Header2';
import ItemService from './ItemService';

class Services extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            serviceCount: '',
            currentPage: 1
        }
       
    }
    componentDidMount() {
        this.fetchServicesHandler();
    }

    fetchServicesHandler = (page) => {
        let data = {
            page: page || 1
        };
        fetch("/service/get", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ services: res.result[0].data, serviceCount: res.result[0].total[0].value });
            })
            .catch(error => {
                console.log("Please check your internet connection..!", error);
            });
    }
    onPageChange = (page) => {
        this.fetchServicesHandler(page);
        this.setState({ currentPage: page });
    }

    render() {
        const { services } = this.state;
        return (
            <>
                <Header2 />
                <div className='container services'>
                    <section className='product-wrapper'>
                        {
                            services.length &&
                            services.map(product => (
                                <div className='item product' key={product._id}  style={{minWidth:350}}>
                                    <div className='team-main'>
                                        <MDBContainer>
                                            <MDBRow>
                                                <MDBCol key={product._id} style={{ minHeight: '250px', }}>
                                                    <ItemService item={product} />
                                                </MDBCol>
                                            </MDBRow>
                                        </MDBContainer>
                                    </div>
                                </div>
                            ))
                        }
                    </section>
                    {
                        services.length ?
                            <Pagination current={this.state.currentPage} pageSize={9} defaultPageSize={9} onChange={this.onPageChange} total={this.state.serviceCount} />
                            : null
                    }
                </div>
                <Fabmine />
                <Contact />
            </>
        )
    }
}


export default Services;