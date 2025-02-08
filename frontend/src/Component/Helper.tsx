import { useState } from 'react'
import '../Styles/Helper.css'
import { handleCopyClipBoardResults } from '../helperFunctions/CopyToClipBoard';

interface PropsForHelper{
    setHelper: React.Dispatch<React.SetStateAction<boolean>>;
}

const Helper : React.FC<PropsForHelper> = ({setHelper}) => {

    const [copied, setCopied] = useState(false)
    const roomId = localStorage.getItem("roomID");
    
    const handleCopy = () =>{
        handleCopyClipBoardResults(roomId, setCopied)
    }
   
    function handleCloseMenu(): void {
        setHelper(prev => !prev); 
      }

  return (
        
    <>
       <div className="full_screen">
            <div className="close">
                <button onClick={handleCloseMenu}>
                    <img src="https://img.icons8.com/?size=100&id=OZuepOQd0omj&format=png&color=000000" alt="close" />
                </button>
            </div>
            <div className="helper">
                <h1>Details</h1>
                <table>
                    <tr>
                        <td><h2>Room ID</h2></td>
                        <td><h3>{roomId}</h3></td>
                        <td>
                            <button onClick={handleCopy}>
                                {copied ? 'copied' : 'copy'}
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
       </div>
    </>

  )
}

export default Helper
