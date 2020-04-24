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
                                            <span className={parseFloat(item.ratings) >= 4 ? "star-tag green-tag" : "star-tag red-tag" } >
                                                <img className="star-img" src={require('./Star.png')}></img>
                                                {item.ratings}
                                            </span>
                                        </div>
                                        <div className="">.</div>
                                        <div className="flex-gap"></div>
                                        <div className="product-item-price flex-value">{item.delivery_time}</div>
                                        <div className="flex-gap"></div>
                                        <div className="">.</div>
                                        <div className="flex-gap"></div>
                                        <div className="product-item-description flex-value">{item.price_for_two} for Two</div>
                                    </div>
                                </div>
                                <div className={"overlay"}>
                                    <div>QUICK VIEW</div>
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
