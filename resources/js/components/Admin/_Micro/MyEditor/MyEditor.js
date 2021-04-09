
import React, { useRef, useEffect ,useState } from "react";
import SunEditor from 'suneditor-react';
import './_Shared/style.scss'; // Import Sun Editor's CSS File

const MyEditor = ({placeholder , editorData : pushEditorData}) => {
    const [editorData , setEditorData] = useState({});
    const editorRef = useRef();
    useEffect(() => {
        console.log(editorRef.current.editor.core);
    }, []);


    const handleChange = (content) => {
       pushEditorData(content)
    }

    return (
        <div>
            <label>توضیحات</label>
            <SunEditor
                show={false}
                placeholder={placeholder}
                onChange={handleChange}
                ref={editorRef}
            />
        </div>
    );
};
export default MyEditor;
