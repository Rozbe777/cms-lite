import React from "react";


const ImageUploaded = ({label, placeHolder, name, required , acceptType}) => {

    return (
        <div className={"box-image-desc formcreatorss"}>
                            <span style={{width : '97% !important'}}>
                               <input type="file" name="myImage" accept={acceptType ? scceptType : "image/*"} />
                               <p>برای آپلود فایل کلیک کنید</p>
                            </span>
        </div>
    )
}

export default ImageUploaded;
