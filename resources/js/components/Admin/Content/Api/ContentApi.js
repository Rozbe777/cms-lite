import Webservice from "../../../../classes/webservice";
import {BASE_URL, TOKEN} from "../../../../services/Type";
import {Request} from "../../../../services/AdminService/Api";
import CategoryApi from "../../Category/Api/CategoryApi";

export default class ContentsApi extends Webservice {

    _contentId = [];
    _searchElements = {};
    _updateData;

    getContentIdList() {
        return this._contentId;
    }

    setContentIdList(idList = []) {
        this._contentId = idList;
    }

    getSearchElement(){
        return this._searchElements;
    }

    setSearchElement(searchElement){
        this._searchElements = searchElement;
    }

    setContentDataUpdate(updateData){
        this._updateData =updateData;
    }

    getContentDataUpdate(){
        return this._updateData;
    }



    async create(data) {
        try {
            let response = await Request.AddNewContent(data);
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
        let params= this.getSearchElement();
        try {
            let response = await Request.GetAllContents(params);
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
            let response = await Request.UpdateDataContent(params);
            return new Promise(resolve => {
                resolve(response);
            })
        }catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }


    async deleteContent() {
        let params = {
            contentIds: this.getContentIdList()
        }
        try {
            let response = await Request.GroupDelContent(params);
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
