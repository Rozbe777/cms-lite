import React from "react";


const ImageUploaded = ({acceptType}) => {

    return (
        <div className={"col-12"}>
            <div className={"box-image-desc formcreatorss"}>
                            <span style={{width: '97% !important'}}>
                               <input type="file" name="myImage" accept={acceptType ? scceptType : "image/*"}/>
                               <p>برای آپلود فایل کلیک کنید</p>
                            </span>
            </div>
        </div>

    )
}

export default ImageUploaded;
