import React, { useEffect, useState } from "react";

const AdminDashboard = () => {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/messages")
      .then(res => res.json())
      .then(data => setMessages(data));

  }, []);

  return (

    <div>

      <h1>Client Messages</h1>

      {messages.map((msg) => (

        <div key={msg._id} style={{border:"1px solid #ddd", padding:"10px", margin:"10px"}}>

          <h3>{msg.fullName}</h3>

          <p>Email: {msg.email}</p>

          <p>Subject: {msg.subject}</p>

          <p>Company: {msg.company}</p>

          <p>Message: {msg.message}</p>

        </div>

      ))}

    </div>

  );

};

export default AdminDashboard;