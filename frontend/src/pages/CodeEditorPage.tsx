import { useEffect, useState } from 'react';
import '../Styles/CodeEditor.css'
import CodeMirror, {
    Extension,
} from "@uiw/react-codemirror"
import { editorThemes } from '../resources/Themes';
import CodeHelper from '../Component/CodeHelper';
import { io, Socket } from 'socket.io-client';
import { axiosInstance } from '../resources/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';


const SERVER_URL = "http://localhost:3001";

const CodeEditorPage = () => {
    const [extensions] = useState<Extension[]>([])
    const theme =  "Basic Dark";
    const [displayCodeHelper, setDisplayCodeHelper] = useState<boolean>(false)
    const [codes, setCode] = useState<string>("----")
    const [outputFromAPI, setOutputFromAPI] = useState<string>('')
    const [language, SetLanguage] = useState<string>('javascript')
    const [roomId, setRoomID] = useState<string | null>('');
    const [socket, setSocket] = useState<Socket | null>(null);

     // Handle code change and emit to others
     const onCodeChange = (newCode: string) => {
        setCode(newCode);
        console.log("📤 Emitting 'send-code' event:", { roomId, code: newCode });
        sessionStorage.setItem("code", newCode)
        if (socket) {
            socket.emit("send-code", { roomId, code: newCode });
        } else {
            console.warn("⚠️ Socket not initialized yet!");
        }
    };

    const hanldeFromSessions = () =>{
        const c = sessionStorage.getItem("code") 
        if(c){
            setCode(c)
        }
        else{
            setCode("console.log('HELLO WORLD 🧑‍💻)")
        }
    }

    //function to display helper
    function handleOptions(): void {
        setDisplayCodeHelper(!displayCodeHelper)
    }

    //handle run code 🏃‍➡️🏃‍➡️🏃‍➡️
    const handleRunCode = async ():Promise<void> =>  {
        // console.log(codes)
        toast('Code Running ▶️')
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

            if(response.data.run.stdout) toast("Code Executed Successfully ✅✅✅")
            else toast("Error executing code. ❌❌❌")
          } catch (error) {
            toast("Error executing code. ❌❌❌")
            console.log("Error executing code.");
          } 
    }

    // Fetch room ID from local storage
    useEffect(() => {
      const roomId = localStorage.getItem("roomID") || '12345';
      setRoomID(roomId);
      console.log("📌 Room ID:", roomId);

      // Establish Socket connection
      const s: Socket = io(SERVER_URL);
      setSocket(s);

      s.on("joined",()=>{
        toast("new user joined 🤝")
      })

      s.on("userleft",()=>{
        toast("A User Left Room ↩️")
      })

      // Join the room
      s.on("connect", () => {
          console.log("✅ Socket Connected:", s.id);
      });

      // Listen for code updates
      s.on("load-code", (savedCode: string) => {
          console.log("📥 Received 'load-code':", savedCode);
          setCode(savedCode);
      });

      s.on("receive-code", (newCode: string) => {
          console.log("📥 Received 'receive-code':", newCode);
          sessionStorage.setItem("code", newCode)
          setCode(newCode);
      });

      s.emit("join-room", roomId);
      console.log("📤 Emitting 'join-room' event:", roomId);

      
      return () => {
          console.log("🛑 Disconnecting Socket...");
          s.disconnect();
      };

  }, []); // Runs only once on mount

    useEffect(()=>{
        hanldeFromSessions()
    },[])

    return (
        <>
            <div><Toaster/></div>
            <CodeMirror
                theme={editorThemes[theme]}
                onChange={onCodeChange}
                extensions={extensions}
                value={codes}
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