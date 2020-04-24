import { PRODUCTS_DATA, IMAGES_DATA } from './commonConstants';

export function getProductsData(){
    return PRODUCTS_DATA;
}

export function getHandledData(){
    let obj = {};
    obj["productsData"] = getProductsData();
    obj["exclusiveProducts"] = [];
    obj["seeAllProducts"] = [];
    obj["loadMoreData"] = {};

    obj.productsData.map((item)=>{
        obj.loadMoreData[item.category] = item.restaurantList.length > 5 ? 5 : item.restaurantList.length;
        item.restaurantList.map((prod)=>{
            obj.seeAllProducts.push(prod);
            if(prod.isExlusive){
                obj.exclusiveProducts.push(prod);
            }
        })
    })
    return obj;
}

export function getImage(){
    let randomNumberFromOneToTen = Math.floor(Math.random()*10);
    return IMAGES_DATA[randomNumberFromOneToTen];
}