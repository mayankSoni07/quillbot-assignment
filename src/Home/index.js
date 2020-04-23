import React from 'react';

import { getProductsData, getImage } from '../Utilities/commonMethods';

import './index.css';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsData: getProductsData()
        };
    }

    renderProducts(product){
        console.log('sdf: ', product)
       return <div className="product-container">
                {product.restaurantList.map((item)=>{
                    return <div key={item.id} className="product-list-view">
                            <div className="bg-white">
                                <div className="product-list-thumb">
                                    <img alt={item.name} className="item-img" src={getImage()} />
                                </div>
                                <div className="product-footer">
                                    <div className="product-item-name">{item.name}</div>
                                    <div className="product-item-food-type">{item.food_types.join(", ")}</div>
                                    <div className="product-item-triplet">
                                        <div className="product-item-rate flex-value">
                                            <span className={"star-tag" + " green-tag"} >4.1</span>
                                        </div>
                                        <div className="">.</div>
                                        <div className="flex-gap"></div>
                                        <div className="product-item-price flex-value">51 min</div>
                                        <div className="flex-gap"></div>
                                        <div className="">.</div>
                                        <div className="flex-gap"></div>
                                        <div className="product-item-description flex-value">2300 for</div>
                                    </div>
                                </div>
                                <div className={"overlay"}>
                                    <span onClick={() => console.log('hello world')}>QUICK VIEW</span>
                                </div>
                            </div>
                    </div>
                })}
            </div>
    }

    render(){
        const { productsData } = this.state;
        return (
            <React.Fragment>
                {productsData.map((product)=>{
                    return <div className="product-container-full">
                        <div className="category-label">{product.category.toUpperCase()}</div>
                        {this.renderProducts(product)}
                    </div>
                })}
            </React.Fragment>
        );
    }
}

export default Home;
