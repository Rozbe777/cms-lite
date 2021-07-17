import {Request} from "../../../../services/AdminService/Api";

export default class PageApi {
    _moduleId = 0
    _pageIds;

    get moduleId() {
        return this._moduleId;
    }

    set moduleId(value) {
        this._moduleId = value;
    }

    get pageIds() {
        return this._pageIds;
    }

    set pageIds(value) {
        this._pageIds = value;
    }

    async call() {
        try {
            let response = await Request.GetAllPages();
            return new Promise(resolve => {
                resolve(response);
            })
        } catch (error) {
            return new Promise(reject => {
                reject(error);
            })
        }
    }

    async delete() {
        let params = {
            pageIds: this._pageIds
        }
        try {
            let response = await Request.GroupDelPage(params);
            return new Promise(resolve => {
                resolve(response)
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }

    async create(data) {
        let response = await Request.AddNewPage(data);
        try {
            return new Promise(resolve => {
                resolve(response)
            })
        } catch (e) {
            return new Promise(reject => {
                reject(e);
            })
        }
    }
    async edit(data){
        let response = await Request.UpdateDataPage(data);
        try{
            return new Promise(resolve => {
                return resolve(response)
            })
        }catch (e) {
            return new Promise((reject => {
                return reject(e)
            }))
        }
    }

}
