import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/HomePage.css'
import '../Styles/ButtonStyle.css'
import GradientText from "../Component/GradientText";
import toast, { Toaster } from "react-hot-toast";



const HomePage = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  // Generate a random room ID
  const generateRandomRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomId(randomId);
  };

  const handleJoinRoom = () => {
    if (roomId.trim()) {
      localStorage.setItem('roomID', roomId.trim());
      navigate(`/draw`);
    } else {
      toast("Please enter or generate a room ID. ⚠️");
    }
  };

  return (
    <div className="flex _main_home h-screen">
      {/* Left Side: Image & Description */}
     <div>
     <img
          src="https://i.pinimg.com/736x/fd/c1/ca/fdc1cab1b3cb593ee69f4db764b7482e.jpg"
          alt="Collaboration"
          className="_custom_image"
        />
     </div>
     <Toaster/>
     <div>
        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-100 p-8">
        <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={2}
            showBorder={false}
            className="custom_class"
            >
            <h1>Let's Collab</h1>
        </GradientText>
            <p className="text-lg text-gray-600 mt-2">
            <h3>Code, Draw, and Type together in real-time.</h3>
            </p>
        </div>
        {/* Right Side: Form */}
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="bg-white shadow-lg p-6 rounded-lg w-80">
          <h2 className="text-2xl font-semibold text-center mb-4">Join a Room</h2>
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              placeholder="Enter Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="_input"
            />
          </div>
          <button
              onClick={generateRandomRoomId}
              className="_customButton"
            >
              Generate
            </button>

        <div className="container_button_style">
          <button className="button type--C " onClick={handleJoinRoom}>
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">JOIN</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
          </button>
        </div>

        </div>
      </div>
     </div>     
    </div>
  );
};

export default HomePage;
