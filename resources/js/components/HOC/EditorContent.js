import React , {useState} 'react';
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';


export const MyEditor = ({editorState}) =>  {
    const [editorState, setEditorState] = React.useState(
        () => EditorState.createEmpty(),
    );

    return <Editor editorState={editorState} onChange={setEditorState} />;
}
