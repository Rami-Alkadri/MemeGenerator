import React, { useState, useRef, useEffect } from "react";

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [memeText, setMemeText] = useState("");
  const [wordList, setWordList] = useState([]);
  const [wikiTitles, setWikiTitles] = useState([]);

  useEffect(() => {
    // Load dictionary words
    fetch("/dictionaryWords.json")
      .then((res) => res.json())
      .then((data) => {
        setWordList(data);
      })
      .catch((err) => {
        console.error("Failed to load dictionaryWords.json:", err);
      });

    // Load wiki titles
    fetch("/wikiTitles.json")
      .then((res) => res.json())
      .then((data) => {
        setWikiTitles(data);
      })
      .catch((err) => {
        console.error("Failed to load wikiTitles.json:", err);
      });
  }, []);

  const canvasRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("File Selected:", file);
    setPreviewURL(URL.createObjectURL(file));
    console.log("Preview URL:", previewURL);
  };

  const generateMemeText = () => {
    const useWikiTitles = Math.random() < 0.5;
    const list = useWikiTitles ? wikiTitles : wordList;
    let selectedText;
    do {
      const index = Math.floor(Math.random() * list.length);
      selectedText = list[index].toUpperCase();
    } while (selectedText.length > 20);
    setMemeText(selectedText);
    console.log("Meme Text:", memeText);
  };

  useEffect(() => {
    if (!selectedFile || !memeText) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.src = previewURL;

    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      let fontSize = 50;
      let text = memeText.trim().toUpperCase();
      let words = text.split(" ");
      let maxWidth = canvas.width * 0.95;

      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      ctx.font = `${fontSize}px Impact`;
      let textWidth = ctx.measureText(text).width;
      if (textWidth > maxWidth) {
        if (words.length > 1) {
          let line = "";
          let lines = [];
          for (let i = 0; i < words.length; i++) {
            let testLine = line + words[i] + " ";
            let testWidth = ctx.measureText(testLine).width;
            if (testWidth > maxWidth) {
              lines.push(line.trim());
              line = words[i] + " ";
            } else {
              line = testLine;
            }
          }
          lines.push(line.trim());

          for (let j = 0; j < lines.length; j++) {
            let y = canvas.height - 25 - (lines.length - 1 - j) * fontSize;
            ctx.fillText(lines[j], canvas.width / 2, y);
            ctx.strokeText(lines[j], canvas.width / 2, y);
          }
        } else {
          while (ctx.measureText(text).width > maxWidth && fontSize > 10) {
            fontSize -= 2;
            ctx.font = `${fontSize}px Impact`;
          }
          ctx.fillText(text, canvas.width / 2, canvas.height - 30);
          ctx.strokeText(text, canvas.width / 2, canvas.height - 30);
        }
      } else {
        ctx.fillText(memeText, canvas.width / 2, canvas.height - 30);
        ctx.strokeText(memeText, canvas.width / 2, canvas.height - 30);
      }
    };
  });

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const imageURI = canvas.toDataURL("image/png");

    let original = selectedFile.name.split(".")[0];
    let fileName = `${original}_bellamy.png`;
    const link = document.createElement("a");
    link.href = imageURI;
    link.download = fileName;
    link.click();
  };

  return (
    <div>
      <h1>Bellamy Generator</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewURL && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={previewURL}
            alt="Preview"
            style={{ width: "300px", height: "auto" }}
          />
          <p>Get Ready to Speak Bellamese</p>
          <button onClick={generateMemeText}>Generate Your Meme</button>
          <p style={{ fontSize: "20px" }}>{memeText}</p>
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            style={{ border: "1px solid black", marginTop: "1rem" }}
          ></canvas>
        </div>
      )}
      {memeText && previewURL && (
        <button onClick={handleDownload} style={{ marginTop: "1rem" }}>Download your meme</button>
      )}
    </div>
  );
}

export default ImageUploader;
