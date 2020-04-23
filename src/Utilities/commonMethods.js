import { PRODUCTS_DATA, IMAGES_DATA } from './commonConstants';


export function getProductsData(){
    return PRODUCTS_DATA;
}

export function getImage(){
    let randomNumberFromOneToTen = Math.floor(Math.random()*10);
    return IMAGES_DATA[randomNumberFromOneToTen];
}