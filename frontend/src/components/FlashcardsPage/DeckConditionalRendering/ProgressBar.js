import React from "react";
import useStorage from "./useStorage";


function ProgressBar({file, setFile}) {
    const {url, progress} = useStorage(file);
    console.log(progress, url);

  return (
    <div className= "progress-bar">progress</div>
  )
}

export default ProgressBar;