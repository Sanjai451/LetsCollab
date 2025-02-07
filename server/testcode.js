// io.on("connection", socket => {
//     socket.on("get-document", async documentId => {
//         // console.log(documentId)
//     const document = await findOrCreateDocument(documentId)
//     socket.join(documentId)
//     socket.emit("load-document", document)

//     socket.on("send-changes", delta => { //recieve and send the changes to others
//     //   console.log(delta.ops[1])
//     // console.log("changes deceted")
//       socket.broadcast.to(documentId).emit("receive-changes", delta)
//     })

//     socket.on("save-document", async data => {
//     console.log("document saving ")
//       await Document.findByIdAndUpdate(documentId, { data })
//     })
    
//   })
// })