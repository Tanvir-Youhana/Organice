import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
// Justin -> added prompt and answer for testing, 
//  feel free to get rid of it since it is not needed and is extra
//    prompt was meant to imitate flash.question
//    answer imitates the flash.answer
function EachFlashCards({ flash, handleDelete}) {
  return (
    <div className="transparentBg2">
      {/* SHOW THIS DIV IF User has no decks in their data */}
      <div className="flashcard-container"
      >
        <div className="flashcard-prompt"
        >
          <p>Question: {flash.question}</p>
        </div>
        <div className="flashcard-answer">
          Answer: {flash.answer}
        </div>
        <div>
          <button onClick={()=> handleDelete(flash.id)}>
            <DeleteIcon/>
          </button>
        </div>
      
      </div>
    </div>
  );
}

export default EachFlashCards;
