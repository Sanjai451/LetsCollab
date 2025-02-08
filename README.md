# Let's Collab

## Overview

**Let's Collab** is a real-time collaboration platform built using **React, Node.js, Express, MongoDB, and Socket.IO**. It allows multiple users to join a single room and work collaboratively in three different modes:

- **Typing Mode**: Users can write and edit text together.
- **Drawing Mode**: Users can collaboratively draw on a shared canvas.
- **Coding Mode**: Users can write and edit code in real-time.

The application ensures data persistence by using **SessionStorage** for storing in-session code and **MongoDB** for long-term storage.

---

## Features

✅ **Real-time Collaboration** – Users can join rooms and collaborate in real time.

✅ **Multiple Modes** – Choose between text editing, drawing, or coding.

✅ **Persistent Code Storage** – Uses **SessionStorage** for session-based storage and **MongoDB** for saving typed content.

✅ **Socket.IO Integration** – Ensures smooth real-time updates between connected users.

✅ **Multi-user Rooms** – Multiple users can join and collaborate on the same project simultaneously.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-time Communication**: Socket.IO
- **Storage**: SessionStorage (for temporary storage), MongoDB (for persistent storage)

---

## Screenshots

![Landing Page](<Screenshot 2025-02-08 211203.png>)
*Landing page of Let's Collab, showcasing the collaboration modes.*

![Live Text Editor](<Screenshot 2025-02-08 211220.png> )
*User can Generate Room ID or Manually Enter the room ID to Collaborate with others.*

![Drawing Mode](<Screenshot 2025-02-08 211246.png> )
*Drawing mode where change are updated instantly.*

![Coding Mode](<Screenshot 2025-02-08 211254.png> )
*Coding Mode to execute code.*

![Live](<Screenshot 2025-02-08 211306.png>)
*Demonstration of execution of code in mulitple languages and output can be copied.*

![Live ](<Screenshot 2025-02-08 211319.png>)
*User dashboard with options to create or join a collaboration room.*

![Live](<Screenshot 2025-02-08 211343.png>)
*Showcasing language selection for code execution.*


![Live](<Screenshot 2025-02-08 211401.png>)
*User an copy their room ID and Share with Other using the HELP menu in sidebar*


## How It Works

### 🔹 Creating & Joining a Room

1. Open the application and create a new collaboration room.
2. Share the unique room ID with other participants.
3. Users can join the same room and collaborate in real time.

### 🔹 Choosing Collaboration Mode

- **Text Mode**: Type and edit text collaboratively.
- **Drawing Mode**: Use a shared whiteboard for sketching ideas.
- **Code Mode**: Write and edit code together.

### 🔹 Data Persistence

- **SessionStorage**: Stores code temporarily within the session.
- **LocalStorage**: Stores the Room ID to manage session.
- **MongoDB**: Saves user-typed content for future retrieval.

---

## Future Enhancements

🔹 **User Authentication** – Implement login/signup with JWT authentication.

🔹 **Syntax Highlighting** – Improve code mode with syntax highlighting.

🔹 **Version Control** – Track changes and allow users to revert edits.

🔹 **Files** – Allow users to file from their computer.

---

## Contributing

1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Make necessary changes and commit.
4. Push changes and create a pull request.

---

## Contact

📧 **Email:** [sanjaikumar451@gmail.com](mailto:sanjaikumar451@gmail.com)

🔗 **GitHub:** [github.com/Sanjai451](https://github.com/Sanjai451)

---

## License

This project is licensed under the **MIT License**.
