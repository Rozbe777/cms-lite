class Webservice {

    get token() {
        return this._token;
    }

    set token(value) {
        this._token = value;
        return this;
    }

    get isFile() {
        return this._isFile;
    }

    set isFile(value) {
        this._isFile = value;
    }

    get body() {
        return this._body;
    }

    set body(value) {
        this._body = value;
    }

    get method() {
        return this._method;
    }

    set method(value) {
        this._method = value;
    }

    get url() {
        return this._url;
    }

    set url(value) {
        this._url = value;
    }

    setUrl(url) {
        this.url = url;
        return this;
    }

    setMethod(method) {
        this.method = method;
    }


    async call() {
        let config = {
            method: this.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                // 'source':(Platform.OS !== 'ios')? 'ANDROID':'IOS',
                'Authorization': `Bearer ${this._token}`
            }
        };
        if (this.body !== null) {
            if (!this.isFile) {
                this.body = JSON.stringify(this.body);
                config = {
                    method: this.method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        /// 'source':(Platform.OS !== 'ios')? 'ANDROID':'IOS',
                        'Authorization': `Bearer ${this._token}`
                    },
                    body: this.body,
                }
            } else {
                let headers = new Headers();
                headers.append('Authorization' , `Bearer ${this._token}`);
                config = {
                    method: this.method,
                    headers: headers,
                    body: this.body,
                }
                // config = {
                //     method: this.method,
                //     headers: {
                //         // Accept: 'application/json',
                //         //'Content-Type': 'application/json',
                //         'Accept': '*/*',
                //         //'source':(Platform.OS !== 'ios')? 'ANDROID':'IOS',
                //         'Content-Type': 'multipart/form-data;',
                //
                //         'Authorization': `Bearer ${this._token}`
                //     },
                //     body: this.body,
                // }
            }

        }



        try {

            let response = await fetch(
                this.url, config
            );

            //MethodNotAllowedHttpException
            if (response.status === 405) {
                return new Promise((resolve, reject) => {
                    reject(response);
                })
            }

            //user unauthorized
            if (response.status === 401) {

                // new Authenticate().logout().then(() => {
                // Actions.push('auth');
                /* }).then((error) => {
                     console.log(error);
                 })*/

                return;
            }
            return new Promise((resolve, reject) => {
                resolve(response);
            });

        } catch (error) {
            // new Toaster().error('There was a problem. Try again');
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    }
}

export const POST_METHOD = 'POST';
export const GET_METHOD = 'GET';
export const PUT_METHOD = 'PUT';
export const EXCEPTION_MESSAGE = 'مشکلی در ارتباط با سرور رخ داده است لطفا درخواست خود را مجدد ارسال نمایید.';
export default Webservice;
