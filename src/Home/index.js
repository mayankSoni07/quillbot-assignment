import React from 'react';

import { getProductsData } from '../Utilities/commonMethods';
import { FILTERS } from '../Utilities/commonConstants';

import CompareTable from '../CompareTable';
import AddRemoveModal from '../AddRemoveModal';

import './index.css';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            productsData: getProductsData(),
            selectedProducts: {},
            isAddRemoveAttributesOpen: false,
            allFilters: FILTERS,
            selectedFilters: FILTERS
        };
        this.hoverButtonClick = this.hoverButtonClick.bind(this);
        this.addRemoveOnClick = this.addRemoveOnClick.bind(this);
        this.setUpdatedFilters = this.setUpdatedFilters.bind(this);
    }

    setUpdatedFilters(param){
        let objToSet = {};
        if(param.allFilters)
            objToSet["allFiters"] = param.allFilters;
        if(param.selectedFilters){
            let renderTableContent = this.createRenderTableContent(param.selectedFilters);
            objToSet["selectedFilters"] = param.selectedFilters;
            objToSet["renderTableContent"] = renderTableContent;
        }
        this.setState({ ...objToSet });
    }

    createRenderTableContent(selectedFilters){
        let renderTableContent = [];
        let { selectedProducts } = this.state;
        selectedFilters.map((filter)=>{
            renderTableContent[filter] = [];
            Object.keys(selectedProducts).map((key)=>{
                renderTableContent[filter].push(selectedProducts[key][filter]);
            })
        });
        return renderTableContent;
    }

    /** Hover button click functionality */
    hoverButtonClick(item){
        let { selectedProducts, selectedFilters } = this.state;

        if(Object.keys(selectedProducts).includes(item.id))
            delete selectedProducts[item.id]
        else
            selectedProducts[item.id] = item;

        /** Object to render table */
        let renderTableContent = [];
        renderTableContent = this.createRenderTableContent(selectedFilters);

        this.setState({ selectedProducts: selectedProducts, renderTableContent: renderTableContent });
    }

    /** Add/Remove button click functionality */
    addRemoveOnClick(){
        let { isAddRemoveAttributesOpen } = this.state;
        this.setState({ isAddRemoveAttributesOpen : !isAddRemoveAttributesOpen })
    }

    render(){
        const { productsData, selectedProducts, renderTableContent, isAddRemoveAttributesOpen, selectedFilters } = this.state;
        let selectedProductsKeys = Object.keys(selectedProducts);
        return (
            <React.Fragment>
                
                {/* Add/remove attributes button */}
                <button className="add-remove-button" onClick={this.addRemoveOnClick}>Add/Remove Attributes</button>

                {/* Add/remove attributes Modal */}
                {isAddRemoveAttributesOpen && 
                    <AddRemoveModal 
                        addRemoveOnClick={this.addRemoveOnClick} 
                        setUpdatedFilters={this.setUpdatedFilters}
                        selectedFilters={this.state.selectedFilters}
                     />
                }

                {/* Render products */}
                <div className="product-container-full">
                    <div className="product-container">
                        {productsData.map((item)=>{
                            return <div key={item.id} className="product-list-view">
                                    <div className="bg-white">
                                        <div className="product-list-thumb">
                                            <div className={selectedProductsKeys.includes(item.id) ? "overlay-active" : "overlay"}>
                                                <span onClick={() => this.hoverButtonClick(item)}>
                                                    {selectedProductsKeys.includes(item.id) ? "REMOVE" : "COMPARE" }
                                                </span>
                                            </div>
                                            <img alt={item.name} className="item-img" src={item.image} />
                                        </div>
                                        <div className="product-footer">
                                            <div className="product-item-name">{item.name}</div>
                                            <div className="product-item-price">{item.price}</div>
                                            <div className="product-item-description">{item.description}</div>
                                        </div>
                                    </div>
                            </div>
                        })}
                    </div>
                    {/* Render compare table */}
                    {selectedProductsKeys.length > 0 && selectedFilters.length > 0 && 
                        <CompareTable 
                            selectedProducts={selectedProducts} 
                            renderTableContent={renderTableContent} 
                            selectedProductsKeys={selectedProductsKeys}
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Home;
