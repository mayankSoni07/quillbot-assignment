import React from 'react';

import { FILTERS } from '../Utilities/commonConstants';

import './index.css';

let SELECT_ALL_KEY = "selectAll";

class AddRemoveModal extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedFilters: props.selectedFilters ? props.selectedFilters : [],
            allFilters: FILTERS,
            searchInput: ""
        };
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }

    /** Used to handle checkbox click. */
    handleCheckbox(e){
        let value = e.target.value;
        let selectedFilters = Object.create(this.state.selectedFilters);
        let allFilters = Object.create(this.state.allFilters);

        if(value !== SELECT_ALL_KEY){
            /** Non SelectAll case */
            if(selectedFilters.includes(value))
                selectedFilters.splice(selectedFilters.indexOf(value), 1);
            else
                selectedFilters.push(value);
        } else {
            /** SelectAll case */
            if(e.target.checked){
                selectedFilters = allFilters;
            } else {
                selectedFilters = [];
            }
        }

        this.props.setUpdatedFilters({ selectedFilters: selectedFilters });
        this.setState({ selectedFilters: selectedFilters });
    }

    /** Used to handle search input functionality */
    handleSearchInput(e){
        let value = e.target.value;
        let allFilters = FILTERS;

        /** Filtered by search input */
        allFilters = allFilters.filter((filter) => filter.includes(value) );

        this.setState({ searchInput: value, allFilters: allFilters });
    }

    render(){
        let { selectedFilters, allFilters, searchInput } = this.state;
        return (
            <React.Fragment>
                <div id="addRemoveModal" className="modal">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="addRemoveHeaderContainer">
                            {/* Close button */}
                            <span className="close" onClick={this.props.addRemoveOnClick}>&times;</span>
                            {/* Modal Header */}
                            <span className="addRemoveHeader">Add/Remove Attributes</span>
                            <div className="seperator" />
                        </div>

                        {/* Search input */}
                        <input 
                            className="searchInput" placeholder="Search Attributes" value={searchInput} 
                            onChange={this.handleSearchInput}
                        />
                        <div className="seperator" />

                        {/* SelectAll input */}
                        {allFilters && allFilters.length > 0 && 
                            <>
                                <div>
                                    <input 
                                        type="checkbox" id={SELECT_ALL_KEY} name={SELECT_ALL_KEY} value={SELECT_ALL_KEY} 
                                        checked={selectedFilters.length === allFilters.length}
                                        onChange={this.handleCheckbox} 
                                    />
                                    <label htmlFor={SELECT_ALL_KEY}><b>Select All</b></label>
                                </div>
                                {/* Alll Filters input except SelectAll */}
                                {allFilters.map((filter)=>{
                                    return <div key={filter}>
                                        <input 
                                            type="checkbox" id={filter} name={filter} value={filter} 
                                            checked={selectedFilters.includes(filter)}
                                            onChange={this.handleCheckbox} 
                                        />
                                        <label htmlFor={filter}>{filter}</label>
                                    </div>
                                })}
                            </>
                        }

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default AddRemoveModal;
