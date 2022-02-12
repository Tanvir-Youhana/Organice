import React from "react";
import { useState, useEffect } from "react";

// Backend
import {
  collection,
  setDoc,
  addDoc,
  doc,
  serverTimestamp,
  DocumentReference,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button, TextField, TextareaAutosize } from "@mui/material";

//CSS
import "./Flashcard.css";

// creating a collection of flashcards
// added decktitle to the flashcard
function AddQACard() {
  const avatarStyle = { backgroundColor: "indigo" };
  const stylButn = { margin: "8px 0" };
  const stylField = { margin: "8px 0" };
  const { user } = useUserAuth();

  const [deckName, setDeckName] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // const FlashCardRefs = collection(db, "user", user.uid, "flashcard");
  const createDeck = async (e) => {
    e.preventDefault();
    const FlashCardRefs = doc(db, "user", user.uid, "flashcard", deckName);
    var data = {
      deckTitle: deckName,
    };

    if (deckName !== "") {
      await setDoc(FlashCardRefs, data);
      console.log("check firebase");
    }
    var data1 = {
      question: question,
      answer: answer,
    };

    const decksrefs = collection(
      db,
      "user",
      user.uid,
      "flashcard",
      deckName,
      "deck"
    );
    await addDoc(decksrefs, data1);
    console.log("check firebase");
  };

  return (
    <div>
      <div>
        <NewHomeNavbar />
      </div>

      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div style={{ marginBottom: 20 }}>
            Please give your Q/A Deck a name
          </div>
          <TextField
            label="Name of Deck"
            className="textfield-White"
            placeholder="Please enter the name of the Deck"
            fullWidth
            required
            style={stylField}
            onChange={(e) => setDeckName(e.target.value)}
          />
        </div>
      </div>

      {/* Question Answer Add Cards Div */}
      <div className="addnewdeck-header center-text">
        <div id="flex-containerQA">
          <div>Fill in your Question and Answer</div>
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Question"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <TextareaAutosize
            className="textfield-White fields-spacing "
            placeholder="Enter Answer"
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </div>
      <div id="flex-containerbtns">
        <Button className="add-card-btn" style={{ marginTop: 20 }}>
          Add Card
        </Button>

        <Button
          className="finish-deck-btn"
          style={{ marginTop: 20 }}
          onClick={createDeck}
        >
          Finish & Save
        </Button>
      </div>
    </div>
  );
}

export default AddQACard;
