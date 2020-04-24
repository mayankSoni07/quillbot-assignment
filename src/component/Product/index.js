import React from 'react';
import { getImage } from '../../Utilities/commonMethods';

export default function Product(props){
    const { item } = props;
    return <div key={item.name} className="product-list-view">
                <div className="bg-white">
                    <div className="product-list-thumb">
                        {/* Render Image */}
                        <img alt={item.name} className="item-img" src={getImage()} />
                    </div>
                    <div className="product-footer">
                        <div className="product-item-name">{item.name}</div>
                        {/* Render foodtypes by joining all the values of array */}
                        <div className="product-item-food-type">{item.food_types.join(", ")}</div>
                        {/* CSS Handled by Flex */}
                        <div className="product-item-triplet">
                            <div className="product-item-rate flex-value">
                                {/* Render rating in Red/Green according to condition */}
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
                    {/* Render on hover */}
                    <div className={"overlay"}>
                        <div>QUICK VIEW</div>
                    </div>
                </div>
            </div>
}
