import { Tldraw } from '@tldraw/tldraw';
import 'tldraw/tldraw.css'
import { useSyncDemo } from '@tldraw/sync'
import { useEffect, useState } from 'react';

const DrawingPage = () => {
    const [roomID, setRoomID] = useState<string | null>('')
     
    useEffect(()=>{
      const id = localStorage.getItem('roomID')
      setRoomID(id);
    },[])
    const store = useSyncDemo({ roomId: roomID || 'default' })
    console.log("Room ID : " , roomID)

  return (
    <div className="draw_component" style={{ width: "100%", height: "100%" }}>
    <Tldraw store={store} />
  </div>
  );
};

export default DrawingPage;