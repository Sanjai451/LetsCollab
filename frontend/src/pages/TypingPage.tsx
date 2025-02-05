import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { useParams } from "react-router-dom";

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
];

export default function TextEditor() {
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
      const id = localStorage.getItem("roomID");
      if (id) {
        setDocumentId(id);
      }
  },[])

  useEffect(() => {
    const s: Socket = io("http://localhost:3001");
    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  useEffect(() => { // to get document from existing 
    if (!socket || !quill) return;

    socket.on("load-document", (document: any) => {
      // console.log("Getting Document From Document ID : " , documentId)
      // console.log(document.data.ops[0].insert)
      quill.setContents(document);
      quill.enable(); 
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => { //to save the document periodically
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => { //to update on changes from others
    if (!socket || !quill) return;

    const handler = (delta: any) => {
      // console.log(delta)
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {  // To handle Changes produced
    if (!socket || !quill) return;

    const handler = (delta: any, _oldDelta: any, source: string) => {
      // console.log(delta.ops[1])
      // console.log(delta)
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  const wrapperRefCallback = useCallback((wrapper: HTMLDivElement | null) => {
    if (!wrapper) return;
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);

    const q = new Quill(editor, {
      theme: "snow",
      modules: { toolbar: TOOLBAR_OPTIONS },
    });

    q.enable(); // ✅ Ensure the editor is enabled for typing
    q.setText("hell")
    setQuill(q);
  }, []);

  return <div className="container typing_component" ref={wrapperRefCallback}></div>;
}
