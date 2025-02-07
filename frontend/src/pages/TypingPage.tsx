import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io, Socket } from "socket.io-client";
import { SAVE_INTERVAL_MS, TOOLBAR_OPTIONS } from "../resources/QuillResources";

export default function TextEditor() {
  const [roomId, setRoomId] = useState<string | '12345'>('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quill, setQuill] = useState<Quill | null>(null);

  useEffect(() => {
      const id = localStorage.getItem("roomID");
      if (id) {
        setRoomId(id);
      }
      console.log("📌 Loaded Room ID from Local Storage:", roomId);
  }, []);

  useEffect(() => {
    console.log("🔌 Connecting to Socket...");
    const s: Socket = io("http://localhost:3001");
    setSocket(s);

    return () => {
      console.log("❌ Disconnecting Socket...");
      s.disconnect();
    };
  }, []);

  useEffect(() => { // to get document from existing 
    if (!socket || !quill) return;
    console.log("📥 Requesting Document:", roomId);

    socket.on("load-document", (document: any) => {
      console.log("📂 Document Loaded:", document);
      // console.log("📂 Document :", document.data.ops[0]);
      // quill.updateContents(document.data.ops[0].insert);
      quill.updateContents(document.data.ops)
      quill.enable();
    });

    socket.emit("get-document", roomId);
  }, [socket, quill, roomId]);

  useEffect(() => { //to save the document periodically
    if (!socket || !quill) return;

    const interval = setInterval(() => {
      console.log("💾 Saving Document...");
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      console.log("⏹️ Stopping Auto-Save...");
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => { //to update on changes from others
    if (!socket || !quill) return;

    const handler = (delta: any) => {
      console.log("📩 Received Changes from Server:", delta);
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      console.log("🔇 Stopping Change Listener...");
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  useEffect(() => {  // To handle Changes produced
    if (!socket || !quill) return;

    const handler = (delta: any, _oldDelta: any, source: string) => {
      if (source !== "user") return;
      console.log("✏️ User Made Changes:", delta);
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      console.log("🔇 Stopping User Change Listener...");
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
    // q.setText("Welcome")
    setQuill(q);
  }, []);

  return <div className="container typing_component" ref={wrapperRefCallback}></div>;
}
