import React from 'react';
import './Home.css';

import { getHandledData } from '../Utilities/commonMethods';
import { EXCLUSIVE_VALUE, SEE_ALL_VALUE } from '../Utilities/commonConstants';

import Product from '../component/Product';
import Sidebar from '../component/Sidebar';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            ...getHandledData(),
            currentTab: ""
        };

        /* Bind this to functions */
        this.loadMoreProductOnClick = this.loadMoreProductOnClick.bind(this);
        this.changeCurrentTab = this.changeCurrentTab.bind(this);
    }

    /* Used to change current tab value in state */
    changeCurrentTab(value, callback){
        this.setState({ currentTab: value }, callback);
    }

    /* Load more products Functionality */
    loadMoreProductOnClick(product){
        let temp = this.state.loadMoreData;
        temp[product.category] = temp[product.category] + 6;
        this.setState({ loadMoreData : temp });
    }

    renderProducts(product){
        const { loadMoreData, currentTab, exclusiveProducts, seeAllProducts } = this.state;
        return <div className="product-container">
                {/* Render Exclusive products */}
                {currentTab === EXCLUSIVE_VALUE && 
                    exclusiveProducts.map((item) => <Product item={item} />)
                }
                {/* Render See all products */}
                {currentTab === SEE_ALL_VALUE && 
                    seeAllProducts.map((item) => <Product item={item} />)
                }
                {/* Render Remaining products */}
                {(currentTab !== EXCLUSIVE_VALUE && currentTab !== SEE_ALL_VALUE) && <div>
                    {/* Render Items */}
                    {product.restaurantList.map((item, index)=>{
                        if(index < loadMoreData[product.category]){
                            return <Product item={item} />
                        }
                    })}
                    {/* More products button */}
                    {product.restaurantList.length > 5 && loadMoreData[product.category] < product.restaurantList.length  && <div className="show-more"
                        onClick={()=>this.loadMoreProductOnClick(product)}
                    >
                        <span>+{product.restaurantList.length - loadMoreData[product.category]} MORE</span>
                    </div>}
                </div>}
            </div>
    }

    render(){
        const { productsData, exclusiveProducts, seeAllProducts, currentTab } = this.state;
        return (
            <React.Fragment>
                {/* Render Sidebar */}
                <Sidebar 
                    productsData={productsData} 
                    changeCurrentTab={this.changeCurrentTab} 
                    exclusiveRestaurantsLength={exclusiveProducts.length}
                    allProductsRestaurantsLength={seeAllProducts.length}
                />
                {/* Render products */}
                {productsData.map((product)=>{
                    return <div id="parent-container" className="product-container-full">
                        {/* Category Name (Not for Exclusive and See all) */}
                        {(currentTab !== EXCLUSIVE_VALUE && currentTab !== SEE_ALL_VALUE) && 
                            <div id={product.category} className="category-label">{product.category.toUpperCase()}</div>
                        }
                        {/* Render Products */}
                        {this.renderProducts(product)}
                    </div>
                })}
            </React.Fragment>
        );
    }
}

export default Home;
