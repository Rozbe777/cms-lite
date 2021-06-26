import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import './_Shared/style.scss'
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


function Previews(props) {
    const [files, setFiles] = useState([]);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                />
            </div>
        </div>
    ));

    useEffect(() => () => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    console.log("______" , files)
    return (
        <section className="container dropzones">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <p style={{textAlign : 'center'}}>تعداد n تا فایل را میتوانید با هم به داخل بکشید تا آپلود شوند!</p>
                <aside style={thumbsContainer}>
                    {thumbs}
                </aside>
            </div>

        </section>
    );
}
export default Previews;
