import React from 'react'

interface CodeHelperProps {
    displayCodeHelper: boolean;
    handleRunCode: () => void; // Assuming this is a function
    outputFromAPI: string | ''; // Assuming output is a string or null
    SetLanguage: (language: string) => void; // Function to set the language
    language: string | ''; // Function to set the language
}

const CodeHelper: React.FC<CodeHelperProps> = ({displayCodeHelper, handleRunCode, outputFromAPI, SetLanguage, language }) => {
  return (
    <>
    {displayCodeHelper && 
            <div className={`code_helper`}  >
                <button onClick={handleRunCode}>Run</button>
                <div>
                    <h4>Output</h4>
                    <textarea name="" id="" value={outputFromAPI}>

                    </textarea>
                    <div>
                        <button><img src="https://img.icons8.com/?size=100&id=30&format=png&color=000000" alt="" />copy</button>
                    </div>
                </div>
                <select name="" id="" value={language} className='select_code' onChange={(e)=>SetLanguage(e.target.value)}>
                        <option value="javascript">javascript</option>
                        <option value="python">python</option>
                        <option value="java">java</option>
                </select>
            </div>
        }
    </>
       
  )
}

export default CodeHelper
