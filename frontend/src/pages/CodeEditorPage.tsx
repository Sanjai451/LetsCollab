import { useRef, useState } from 'react';
import axios, { AxiosInstance } from 'axios'
import '../Styles/CodeEditor.css'
import CodeMirror, {
    Extension,
    ViewUpdate,
} from "@uiw/react-codemirror"
import { editorThemes } from '../resources/Themes';
import CodeHelper from '../Component/CodeHelper';


const pistonBaseUrl = "https://emkc.org/api/v2/piston"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: pistonBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})


const CodeEditorPage = () => {
    const [extensions, setExtensions] = useState<Extension[]>([])
    const theme =  "Basic Dark";
    const [displayCodeHelper, setDisplayCodeHelper] = useState<boolean>(false)
    const [codes, setCodes] = useState<string>('')
    const [outputFromAPI, setOutputFromAPI] = useState<string>('')
    const [language, SetLanguage] = useState<string>('javascript')
    const onCodeChange = (code: string, view: ViewUpdate) => {
        
        console.log("code" , code )
        setCodes(code)
        console.log(view)
    }
    
    function handleOptions(): void {
        setDisplayCodeHelper(!displayCodeHelper)
    }

    const handleRunCode = async ():Promise<void> =>  {
        // console.log(codes)
        try {
            const response = await axiosInstance.post('/execute', {
                "language": language,
                "version": "*",
                "files": [
                  {
                    "name": "main.js",
                    "content": `${codes}`
                  }
                ]
              }
              );
      
            console.log(response.data.run.stdout || response.data.run.stderr);
            setOutputFromAPI(response.data.run.stdout || response.data.run.stderr)
          } catch (error) {
            console.log("Error executing code.");
          } 
    }

    return (
        <>
            <CodeMirror
                theme={editorThemes[theme]}
                onChange={onCodeChange}
                extensions={extensions}
                minHeight="100%"
                maxWidth="100vw"
                className='editorComponent'
            />
            <CodeHelper displayCodeHelper={displayCodeHelper} handleRunCode={handleRunCode} outputFromAPI={outputFromAPI}  SetLanguage={SetLanguage} language={language}/>
            <div className='helper_more' onClick={handleOptions}><img src="https://img.icons8.com/?size=100&id=9978&format=png&color=000000" alt="" /></div>
        </>

    )
}

export default CodeEditorPage