
import React, { useRef, useEffect } from "react";
import SunEditor from 'suneditor-react';
import './_Shared/style.scss'; // Import Sun Editor's CSS File

const MyEditor = props => {
    const editorRef = useRef();
    useEffect(() => {
        // Get underlining core object here
        // Notice that useEffect is been used because you have to make sure the editor is rendered.
        console.log(editorRef.current.editor.core);
    }, []);



    return (
        <div>
            <label>توضیحات</label>
            <SunEditor ref={editorRef} />
        </div>
    );
};
export default MyEditor;
