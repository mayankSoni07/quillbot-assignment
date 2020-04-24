import React from 'react';

import { getProductsData, getImage } from '../Utilities/commonMethods';

import './index.css';

class Home extends React.Component {
    constructor(props){
        super(props);
        let data = getProductsData();
        let exclusiveProducts = [];
        let seeAllProducts = [];
        let loadMoreData = {};

        data.map((item)=>{
            loadMoreData[item.category] = item.restaurantList.length > 5 ? 5 : item.restaurantList.length;
            item.restaurantList.map((prod)=>{
                seeAllProducts.push(prod);
                if(prod.isExlusive){
                    exclusiveProducts.push(prod);
                }
            })
        })

        this.state = {
            productsData: data,
            seeAllProducts: seeAllProducts,
            exclusiveProducts: exclusiveProducts,
            loadMoreData: loadMoreData
        };
    }

    renderProducts(product){
        const { loadMoreData } = this.state;
       return <div className="product-container">
                {product.restaurantList.map((item, index)=>{
                    if(index < loadMoreData[product.category]){
                        return <div key={item.name} className="product-list-view">
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
                                            <div className="product-item-description flex-value">₹ {item.price_for_two} for Two</div>
                                        </div>
                                    </div>
                                    <div className={"overlay"}>
                                        <div>QUICK VIEW</div>
                                    </div>
                                </div>
                        </div>
                    }
                })}
                {product.restaurantList.length > 5 && loadMoreData[product.category] < product.restaurantList.length  && <div className="show-more"
                    onClick={()=>{
                        let temp = loadMoreData;
                        temp[product.category] = temp[product.category] + 6;
                        this.setState({ loadMoreData : temp });
                    }}
                >
                    <span>+{product.restaurantList.length - loadMoreData[product.category]} MORE</span>
                </div>}
            </div>
    }

    render(){
        const { productsData } = this.state;
        console.log('state : ', this.state)
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
