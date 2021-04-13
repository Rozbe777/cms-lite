
import React, { useRef, useEffect ,useState } from "react";
import SunEditor from 'suneditor-react';
import './_Shared/style.scss'; // Import Sun Editor's CSS File

const MyEditor = ({placeholder , defaultVal , editorData : pushEditorData}) => {
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
                setOptions = {{
                    toolbarContainer : '#toolbar_container',
                    showPathLabel : false,
                    charCounter : true,
                    height : 'auto',
                    minHeight : '100px',
                    buttonList : [
                        ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
                        ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
                        ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
                    ]
                }}
                defaultValue={defaultVal}
                onChange={handleChange}
                ref={editorRef}
            />
        </div>
    );
};
export default MyEditor;
