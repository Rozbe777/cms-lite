import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return (
            <div className={"loading"} >
                <div className={"spinner-border"} role={"status"}>
                    <span className={"sr-only"}>در حال ارسال کد تایید ...</span>
                </div>

                <p>در حال بررسی ....</p>

            </div>
        );
    }
}

export default Loading;
