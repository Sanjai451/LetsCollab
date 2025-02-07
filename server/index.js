const Document = require("./model/Document.js") 
const connectDB = require("./Connection/mongoDB.js")

connectDB()

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

const roomData= []; // Stores code for each room


io.on("connection", (socket) => {
  console.log("✅ New client connected:", socket.id);

  socket.on("join-room", (roomId) => {
      console.log(`User joined room: ${roomId}`);
      socket.join(roomId);

      const clients = io.sockets.adapter.rooms.get(roomId);
      const numberOfUsers = clients ? clients.size : 0;
      
      roomData.push(socket.id)

      console.log(`Users in room ${roomId}:`, numberOfUsers);

      socket.to(roomId).emit("joined", socket.id)
  });

  socket.on("send-code", ({ roomId, code }) => {
      console.log(`📥 Received code update in room ${roomId}:`, code); // Debug log
      roomData[roomId] = code;
      socket.to(roomId).emit("receive-code", code);
  });

  //typing 
  socket.on("get-document", async (documentId) => {
    console.log("📌 Requested Document ID:", documentId);
    
    const document = await findOrCreateDocument(documentId);
    console.log("📂 Document Loaded:", document);

    socket.join(documentId);
    console.log(`✅ Joined Room: ${documentId}`);

    socket.emit("load-document", document);

    socket.on("send-changes", (delta) => {
        console.log("📩 Received Changes:", delta);
        if (delta.ops && delta.ops.length > 1) {
            console.log("🔍 Change Details:", delta.ops[1]);
        }
        console.log("🔄 Broadcasting changes...");
        socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
        console.log("💾 Saving Document...");
        try {
            await Document.findByIdAndUpdate(documentId, { data });
            console.log("✅ Document Saved Successfully!");
        } catch (error) {
            console.error("❌ Error Saving Document:", error);
        }
    });
  });


  socket.on("disconnect", () => {
      console.log("❌ Client disconnected");

      for (const roomId of roomData) {
console.log("123")
            
            // Notify other users in the room
            socket.to(roomId).emit("userleft", `A user has left room: ${roomId}`);

    }
  });

  
});


async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}