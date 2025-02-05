const mongoose = require("mongoose")
const Document = require("./model/Document.js") 

mongoose.connect("mongodb://localhost/google-docs-clone")
    .then(()=> console.log("Connected to MongoDB"))

const io = require("socket.io")(3001, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
})

const defaultValue = ""

io.on("connection", socket => {
    socket.on("get-document", async documentId => {
        // console.log(documentId)
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document)

    socket.on("send-changes", delta => { //recieve and send the changes to others
    //   console.log(delta.ops[1])
    // console.log("changes deceted")
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
    console.log("document saving ")
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}