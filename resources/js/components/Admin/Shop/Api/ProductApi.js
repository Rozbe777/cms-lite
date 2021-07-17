import Webservice from "../../../../classes/webservice";
import {BASE_URL, TOKEN} from "../../../../services/Type";
import {Request} from "../../../../services/AdminService/Api";

export default class ProductApi{

    _productIds = [];
    _searchElements = {};
    _updateData;

    get productIds() {
        return this._productIds;
    }

    set productIds(idList) {
        this._productIds= idList;
    }

    get searchElement(){
        return this._searchElements;
    }

    set searchElement(searchElement){
        this._searchElements = searchElement;
    }

    set updateData(updateData){
        this._updateData =updateData;
    }

    get updateData(){
        return this._updateData;
    }



    async create(data) {
        try {
            let response = await Request.AddNewProduct(data);
            return new Promise((resolve => {
                resolve(response)
            }))
        } catch (error) {
            return new Promise((reject) => {
                reject(error)
            })
        }
    }

    async getAll() {
        let params= this._searchElements;
        try {
            let response = await Request.GetAllProducts(params);
            return new Promise((resolve) => {
                resolve(response);
            })

        } catch (error) {
            return new Promise((reject) => {
                reject(error);
            })
        }
    }

    async update(){
        let params = this.getContentDataUpdate();
        try{
            let response = await Request.UpdateDataProduct(params);
            return new Promise(resolve => {
                resolve(response);
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }


    async delete() {
        let params = {
            productIds: this._productIds
        }
        try {
            let response = await Request.GroupDelProduct(params);
            return new Promise(resolve => {
                resolve(response);
            })
        } catch (error) {
            return new Promise(reject => {
                reject(error);
            })
        }
    }

    async getAllTags(){
        try{
            let response = await Request.GetAllTags();
            return new Promise(resolve => {
                resolve(response)
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }

}
