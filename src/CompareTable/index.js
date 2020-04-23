import React from 'react';

import './index.css';

export default function CompareTable(props){
    const { selectedProducts, selectedProductsKeys, renderTableContent } = props;
    return (
        <React.Fragment>
            <table>
                <tbody>
                    <tr>
                        <th>FILTERS</th>
                        { selectedProductsKeys.map((item) => <th key={item}>{selectedProducts[item].name}</th>) }
                    </tr>
                    {Object.keys(renderTableContent).map((key)=>{
                        return <tr key={key}>
                            <td>{key}</td>
                            {renderTableContent[key].map((item)=>{
                                if(key === "colors"){
                                    return <td key={key+Math.random()}>{item.map((color)=>{
                                        return <div className="colorTableContent" style={{ backgroundColor: color }} />
                                    })}</td>
                                } else {
                                    return <td key={key+Math.random()}>{typeof item == "object" ? item.join(", ") : item}</td>
                                }
                            })}
                        </tr>
                    })}
                </tbody>
            </table>
        </React.Fragment>
    );
}
