import React from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import { useState, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { useUserAuth } from "../Context/UserAuthContext";
import { collection, onSnapshot } from "firebase/firestore";
import "./Flashcard.css";

function StudyEachCard({ deckName }) {
  const ref = useRef();
  const { user } = useUserAuth();
  const [flashCards, setFlashCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  useEffect(() => {
    const DeckCollectionRef = collection(
      db,
      "user",
      `${user.uid}`,
      "flashcard",
      deckName,
      "deck"
    );
    const unsub = onSnapshot(DeckCollectionRef, (queryS) => {
      const FlashCardsArray = [];
      queryS.forEach((doc) => {
        FlashCardsArray.push({ ...doc.data(), id: doc.id });
      });
      console.log(FlashCardsArray);
      setFlashCards(FlashCardsArray);
    });
    return () => unsub();
  }, []);

  const getLength = (flashCards) => {
    for (let i = 0; i < flashCards.length; i++) {
      if (Object.keys(flashCards[0]).length == 3) {
        return 3;
      } else if (Object.keys(flashCards[0]).length == 4) {
        return 4;
      } else {
        return 5;
      }
    }
  };
  return (
    <div>
      <div
        className="text-danger p-3 text-center"
        style={{ justifyContent: "center", fontSize: 25, fontWeight: "bold" }}
      >
        {deckName}
      </div>

      <div className="mb-3">
        <Flippy
          flipOnClick={true}
          flipDirection="vertical"
          ref={ref}
          style={{
            minWidth: "200px",
            height: "350px",
            maxWidth: "50%",
            maxHeight: "50%",
            margin: "0 auto",
            width: "50%",
          }}
        >
          <FrontSide
            style={{
              backgroundColor: "#00203FFF",
            }}
          >
            <h4 className="text-muted"> Question: </h4>
            <div className=" d-flex justify-content-center text-light showFront">
              {flashCards.length > 0 && (
                <h4>{flashCards[currentCard].question}</h4>
              )}
              {flashCards.length > 0 && <p>{flashCards[currentCard].word}</p>}
            </div>
          </FrontSide>

          <BackSide
            style={{
              backgroundColor: "#9CC3D5FF",
              fontSize: 20,
            }}
          >
            <h4 className="text-muted"> Answer: </h4>
            {getLength(flashCards) == 3 && (
              <div className="text-center pt-5 mt-5">
                <p>{flashCards[currentCard].answer}</p>
              </div>
            )}
            {getLength(flashCards) == 4 && (
              <div className="d-flex justify-content-evenly pt-4 mt-3">
                <div className="card bg-secondary m-1 w-50">
                  <div className="card-body text-center">
                    <h5 className="card-title border-bottom text-light">
                      Definition:
                    </h5>
                    <p className="card-text mt-4">
                      {flashCards[currentCard].definition}
                    </p>
                  </div>
                </div>
                <div className="card bg-secondary m-1 w-50">
                  <div className="card-body text-center">
                    <h5 className="card-title border-bottom text-light">
                      Example:
                    </h5>
                    <p className="card-text mt-4">
                      {flashCards[currentCard].example}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {getLength(flashCards) == 5 && (
              <div className="d-flex justify-content-evenly pt-4 mt-2">
                <div className="card bg-secondary m-1 w-50">
                  <div className="card-body text-center">
                    <h5 className="card-title border-bottom text-light">
                      Definition:
                    </h5>
                    <p className="card-text mt-3">
                      {flashCards[currentCard].definition}
                    </p>
                  </div>
                </div>
                <div className="card bg-secondary m-1 w-50">
                  <div className="card-body text-center">
                    <h5 className="card-title border-bottom text-light">
                      Purpose:
                    </h5>
                    <p className="card-text mt-3">
                      {flashCards[currentCard].purpose}
                    </p>
                  </div>
                </div>
                <div className="card bg-secondary m-1 w-50">
                  <div className="card-body text-center">
                    <h5 className="card-title border-bottom text-light">
                      Image:
                    </h5>
                    <img className="photo2" src={flashCards[currentCard].url} />
                  </div>
                </div>
              </div>
            )}
          </BackSide>
        </Flippy>
      </div>
      <div
        style={{ justifyContent: "center", display: "flex", padding: 15 }}
        className="center"
      >
        <button
          className="background-button"
          style={{ marginRight: 10, flexGrow: 2, maxWidth: 300 }}
          onClick={() => {
            if (currentCard > 0) {
              setCurrentCard(currentCard - 1);
            }
          }}
        >
          Prev
        </button>
        <button
          className="background-button"
          style={{ flexGrow: 2, maxWidth: 300 }}
          onClick={() => {
            if (currentCard + 1 < flashCards.length) {
              setCurrentCard(currentCard + 1);
            }
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default StudyEachCard;
