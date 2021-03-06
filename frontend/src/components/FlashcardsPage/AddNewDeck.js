import React from "react";
import { useState, useEffect } from "react";
import "./Flashcard.css";

import deckType1 from "./CARDType1.png";
import deckType2 from "./CARDType2.png";
import deckType3 from "./CARDType3.png";

// Backend
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useUserAuth } from "../Context/UserAuthContext";

// Front end
import NewHomeNavbar from "../NavbarPage/NewHomeNavbar";
import { Button } from "@mui/material";

//CSS
import "./Flashcard.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { margin, minHeight, width } from "@mui/system";

function AddNewDeck() {
  return (
    <div className="bg-dark">
      <div>
        <NewHomeNavbar />
      </div>

      {/* Banner below navbar */}
      <section className="bg-dark text-light text-center m-4">
        <p className="h6">Select a Deck type below</p>
      </section>

      {/* Middle Section of Page */}
      <div
        className="bg-light row p-5"
        style={{
          margin: "auto",
          justifyContent: "space-evenly",
          paddingBottom: "auto",
          minHeight: "75vh",
        }}
      >
        <div
          className="card p-3 shadow-lg"
          style={{
            margin: "5%",
            width: "20%",
            height: "50%",
          }}
        >
          <h5 class="card-title text-center p-2 text-primary border-bottom">
            Q/A Deck
          </h5>
          <img src={deckType1} className="card-img-top p-1 mb-2" alt=""></img>

          <p class="card-text p-2">
            A Deck that contains two fields, usually for question and answer
            cards.
          </p>
          <a href="/addQACard" className="btn btn-success">
            Select
          </a>
        </div>

        <div
          className="card p-3 shadow-lg"
          style={{
            margin: "5%",
            width: "20%",
            height: "50%",
          }}
        >
          <h5 class="card-title text-center p-2 text-primary border-bottom">
            Definition Deck
          </h5>
          <img
            src={deckType2}
            class="card-img-top p-1 mb-2"
            alt="IMAGE PREVIEW OF CARD HERE"
          ></img>

          <p class="card-text p-2">
            A Deck that contains three fields for word, definition, and exmaple
            cards.
          </p>
          <a href="/addDefinitionCard" class="btn btn-success">
            Select
          </a>
        </div>

        <div
          className="card p-3 shadow-lg"
          style={{
            margin: "5%",
            width: "20%",
            height: "50%",
          }}
        >
          <h5 class="card-title text-center p-2 text-primary border-bottom">
            Image Deck
          </h5>
          <img
            src={deckType3}
            className="card-img-top p-1 mb-2"
            alt="IMAGE PREVIEW OF CARD HERE"
          ></img>

          <p className="card-text p-2">
            A Deck that contains four fields for word, definition, image and
            example cards.
          </p>
          <a href="/addImageCard" class="btn btn-success">
            Select
          </a>
        </div>
      </div>

      {/* footer */}
      <div className="footer">
        <footer className="p-3 bg-dark text-light text-center position-relative shadow-lg">
          <div className="container">
            <p className="h6">
              Copyright <span className="text-primary">&copy;</span> Senior
              Design Project Spring 2022
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AddNewDeck;
