import React, {useEffect, useRef, useState , useContext} from "react";
import SunEditor from 'suneditor-react';
import {FormTheme} from './../../Helper/Context'
import './_Shared/style.scss'; // Import Sun Editor's CSS File
import $ from 'jquery'

const MyEditor = ({label , placeholder , defaultVal , type , editorData : pushEditorData}) => {
    const {formTheme, setFormTheme} = useContext(FormTheme)
    const [editorData , setEditorData] = useState({});
    const editorRef = useRef();


    useEffect(() => {
        if (formTheme){
            $(".sun-editor").css({'background' : 'none'})
            $(".se-toolbar.sun-editor-common").css({'background' : formTheme.topEditorColor})
            $(".se-btn.se-tooltip").css({'color' : formTheme.editorIcon})
            $(".se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable").css({'color' : formTheme.editorContentColor , 'background' : formTheme.editorContentBackground})
            $(".se-btn").hover(function(){
                $(this).css({'color' : formTheme.iconHoverColor})
            },function(){
                $(this).css({'color' : formTheme.editorIcon})
            })
            $(".se-btn:hover").css({'color' : formTheme.iconHoverColor})
        }

    }, []);

    if (formTheme){
        $(".sun-editor").css({'background' : 'none'})
        $(".se-toolbar.sun-editor-common").css({'background' : formTheme.topEditorColor})
        $(".se-btn.se-tooltip").css({'color' : formTheme.editorIcon})
        $(".se-wrapper-inner.se-wrapper-wysiwyg.sun-editor-editable").css({'color' : formTheme.editorContentColor , 'background' : formTheme.editorContentBackground})
        $(".se-btn").hover(function(){
            $(this).css({'color' : formTheme.iconHoverColor})
        },function(){
            $(this).css({'color' : formTheme.editorIcon})
        })
        $(".se-btn:hover").css({'color' : formTheme.iconHoverColor})
    }




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
            ['undo', 'redo', 'fontSize'],
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
            ['undo', 'redo', 'fontSize'],
            ['bold', 'underline', 'italic', 'removeFormat'],
            ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
            ['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
        ]
    }
    return (
        <div>

            <SunEditor
                show={false}
                setOptions={type == 'small' ? smallEditorOptions : perfectEditorOptions}
                defaultValue={defaultVal}
                onChange={handleChange}
                ref={editorRef}
            />
        </div>
    );
};
export default MyEditor;
