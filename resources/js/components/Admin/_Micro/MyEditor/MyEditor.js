import React, {useEffect, useRef, useState} from "react";
import SunEditor from 'suneditor-react';
import './_Shared/style.scss'; // Import Sun Editor's CSS File

const MyEditor = ({placeholder , defaultVal , type , editorData : pushEditorData}) => {
    const [editorData , setEditorData] = useState({});
    const editorRef = useRef();
    useEffect(() => {
        console.log(editorRef.current.editor.core);
    }, []);


    const handleChange = (content) => {
        pushEditorData(content)
    }

    let smallEditorOptions = {
        toolbarContainer: '#toolbar_container',
        showPathLabel: false,
        charCounter: true,
        height: 'auto',
        minHeight: '100px',
        buttonList: [
            ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align'],
            ['link', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
        ]
    }
    let perfectEditorOptions = {
        toolbarContainer: '#toolbar_container',
        showPathLabel: false,
        charCounter: true,
        height: 'auto',
        minHeight: '100px',
        buttonList: [
            ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
            ['bold', 'underline', 'italic', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
            ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
        ]
    }
    return (
        <div>
            <label>توضیحات</label>
            <SunEditor
                show={false}
                setOptions={perfectEditorOptions}
                defaultValue={defaultVal}
                onChange={handleChange}
                ref={editorRef}
            />
        </div>
    );
};
export default MyEditor;
