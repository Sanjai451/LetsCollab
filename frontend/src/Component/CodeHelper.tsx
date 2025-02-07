import React, { useState } from 'react'
import availableLanguage from '../resources/Languages';
import '../Styles/CodeEditor.css'
import CodeHelperProps from '../resources/CodeHelperProps';
import Options from './Options';
import toast, { Toaster } from 'react-hot-toast';


const CodeHelper: React.FC<CodeHelperProps> = ({displayCodeHelper, handleRunCode, outputFromAPI, SetLanguage, language }) => {

    const [copied, setCopied] = useState(false)

    function handleCopyClipBoardResults(): void {
        //alert with toast
        console.log("copied")
        toast('Copied to Clipboard 📋')
        navigator.clipboard.writeText(outputFromAPI)
        setCopied(true)
    }

  return (
    <>
    {displayCodeHelper && 
            
            <div className={`code_helper`}  >
                <div><Toaster/></div>
                <button onClick={handleRunCode}>Run</button>
                <div>
                    <h4>Output</h4>
                    <textarea name="" id="" value={outputFromAPI}>

                    </textarea>
                    <div>
                        <button 
                            onClick={handleCopyClipBoardResults}
                        >
                            <img src="https://img.icons8.com/?size=100&id=30&format=png&color=000000" alt="copy" />
                            {copied ? 'copied' : 'copy'}
                        </button>
                    </div>
                </div>
                <select name="" id="" value={language} className='select_code' onChange={(e)=>SetLanguage(e.target.value)}>
                {
                    availableLanguage ? (
                        availableLanguage.map((lang, index) => (
                            <Options lang={lang} index={index}/>
                        ))
                    ) : (
                        <>No Languages Found</>
                    )
                }

                </select>
            </div>
        }
    </>
       
  )
}

export default CodeHelper
