import { minimalSetup, EditorView } from 'codemirror'
import { useEffect, useRef, useState } from 'react';
import CodeMirror, {
    Extension,
    ViewUpdate,
    scrollPastEnd,
} from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript";
import { editorThemes } from '../resources/Themes';

const CodeEditorPage = () => {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [extensions, setExtensions] = useState<Extension[]>([])
    const theme =  "Basic Dark";

    const onCodeChange = (code: string, view: ViewUpdate) => {
        
        console.log("code" , code )
        console.log(view)
    }
    
    // return <div ref={editorRef} id="editor" className='editorComponent' />;
    return (
        <CodeMirror
            theme={editorThemes[theme]}
            onChange={onCodeChange}
            // value={activeFile?.content}
            extensions={extensions}
            minHeight="100%"
            maxWidth="100vw"
            className='editorComponent'
        />
    )
}

export default CodeEditorPage