import { Tldraw } from '@tldraw/tldraw';
import 'tldraw/tldraw.css'
import { useSyncDemo } from '@tldraw/sync'
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000'); // Backend URL

const DrawingPage = () => {

    const store = useSyncDemo({ roomId: 'sanjaiapp' })

  return (
    <div className="draw_component" style={{ width: "100%", height: "100%" }}>
    <Tldraw store={store} />
  </div>
  );
};

export default DrawingPage;