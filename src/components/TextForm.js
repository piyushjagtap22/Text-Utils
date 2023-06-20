import React, { useState } from 'react'



export default function TextForm(props) {

  const handleCopClick = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          props.showAlert("Copied to Clipboard!", "success");
        })
        .catch((error) => {
          console.error("Error copying to clipboard:", error);
          props.showAlert("Copy to Clipboard failed!", "error");
        });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed"; // Ensures it's visible even if scrolled
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand("copy");
        const message = successful ? "Copied to Clipboard!" : "Copy to Clipboard failed!";
        props.showAlert(message, successful ? "success" : "error");
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        props.showAlert("Copy to Clipboard failed!", "error");
      }

      document.body.removeChild(textarea);
    }
  };


  const handleDowClick = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'content.txt';
    link.click();
    URL.revokeObjectURL(url);
  }


  const handleCapClick = () => {
    setText(text.toLowerCase().replace(/\b\w/g, function (c) { return c.toUpperCase() }))
  }

  const handleAltClick = () => {

    let result = '';
    let isUpperCase = true;

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);

      if (/[a-zA-Z]/.test(char)) {
        result += isUpperCase ? char.toUpperCase() : char.toLowerCase();
        isUpperCase = !isUpperCase;
      } else {
        result += char;
      }
    }
    setText(result)
  }

  const handleUpClick = () => {
    setText(text.toUpperCase())
  }

  const handleInvClick = () => {
    let invertedStr = '';

    for (let i = 0; i < text.length; i++) {
      const char = text.charAt(i);
      const invertedChar = char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase();
      invertedStr += invertedChar;
    }

    setText(invertedStr);
  }

  const handleLowClick = () => {
    setText(text.toLowerCase())
  }

  const handleClearClick = () => {
    setText('')
  }

  const handleOnChange = (event) => {
    setText(event.target.value);
  }

  const handleSpaceClick = () => {
    setText(text.split(" ").join(""));
  }

  const handleSenClick = () => {
    setText(text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, function (c) { return c.toUpperCase() }));
  }

  const [text, setText] = useState('');

  return (
    <>

      <div className="container" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8" placeholder="Enter your text here" style={{ backgroundColor: props.mode === 'light' ? 'white' : 'grey', color: props.mode === 'light' ? 'black' : 'white' }}></textarea>
        </div>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleUpClick}> Convert to Upper case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleLowClick}> Convert to Lower case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleSenClick}> Convert to Sentence case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleCapClick}> Convert to Capitalized case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleAltClick}> Convert to AlTeRnAtE case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleInvClick}> Convert to iNvErSe case </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleSpaceClick}> Remove Spaces </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleCopClick}> Copy to Clipboard </button>
        <button disabled={text.length === 0} className="btn btn-primary border-dark mx-1 my-1" onClick={handleDowClick}> Download Text File </button>
        <button disabled={text.length === 0} className="btn btn-danger mx-1 my-1" onClick={handleClearClick}> Clear text </button>
      </div>
      <div className="container my-3" style={{ color: props.mode === 'light' ? 'black' : 'white' }}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((ele) => { return ele.length !== 0 }).length} characters</p>
        <p>{parseFloat(0.008 * text.split(" ").filter((ele) => { return ele.length !== 0 }).length.toFixed(3))} Minutes reads</p>
        <h2>{text.split(" ").join("").length === 0 ? 'Please enter text for Preview' : 'Preview'}</h2>
        <p>{text}</p>
      </div>
    </>
  )
}
