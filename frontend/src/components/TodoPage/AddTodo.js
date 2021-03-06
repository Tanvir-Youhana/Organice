import React from "react";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";
import "./Todo.css";
import MoreProperties from "./Dialog/MoreProperties.js";

export default function AddTodo() {
  const [input, setInput] = useState("");
  const { user } = useUserAuth();
  const [dateTime, setDateTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("i am here ");

    if (input !== "") {
      const todosCollec = collection(db, "user", `${user.uid}`, "todos");
      await addDoc(todosCollec, {
        title: input,
        completed: false,
        timeStamp: serverTimestamp(),
        dueDate: dateTime,
        Description: description,
      });
      setInput("");
      setDateTime("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="right-input-component">
        <div className="btn_container">
          <button>SAVE</button>
        </div>

        <MoreProperties
          className="moreColor"
          dateTime={dateTime}
          setDateTime={setDateTime}
          setDescription={setDescription}
        />
      </div>
    </form>
  );
}
