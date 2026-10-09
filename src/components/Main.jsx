import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "shut up",
    bottomText: "and take my money",
    imageUrl: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMemes, setAllMemes] = useState([]);
  
  
  
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes));
  }, []);
  
  function handleChange(e) {
    const {value, name} = e.currentTarget;
    console.log(name, value);
    setMeme(prevMeme => ({...prevMeme, [name]: value}));
  }
  
  function changeImage() {
    if (allMemes.length === 0) return;
    const rand = Math.floor(Math.random() * allMemes.length);
    const randImageUrl = allMemes[rand].url;
    setMeme(prev => ({
      ...prev, 
      imageUrl: randImageUrl
    }));
  }

  return (
    <main>
      <div className="container">
        <div className="form">
          <label htmlFor="topText">top text
            <input type="text" name="topText" value={meme.topText} id="topText" onChange={handleChange} />
          </label>
          <label htmlFor="bottomText">bottom text
            <input type="text" name="bottomText" value={meme.bottomText} id="bottomText" onChange={handleChange} />
          </label>
          <button type="button" onClick={changeImage}>Get a new meme image 🖼️</button>
        </div>
        <div className="meme-container">
          <img src={meme.imageUrl} alt="meme image" />
          <span className="top">{meme.topText}</span>
          <span className="bottom">{meme.bottomText}</span>
        </div>
      </div>
    </main>
  );
}