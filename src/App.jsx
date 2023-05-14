import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [showText, setShowText] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imgRef = useRef(new Image());
  const scrollTopRef = useRef(0);
  const totalFrames = 148;
  useEffect(() => {
    contextRef.current = canvasRef.current.getContext("2d");

    const preLoadImages = () => {
      for (let i = 1; i < totalFrames; i++) {
        const img = new Image();
        img.src = `./src/assets/${i.toString().padStart(4, "0")}.jpg`;
      }
    };
    const img = imgRef.current;
    img.src = `./src/assets/0001.jpg`;

    img.onload = () => {
      contextRef.current.drawImage(img, 0, 0);
    };

    const changeImage = (index) => {
      img.src = `./src/assets/${index.toString().padStart(4, "0")}.jpg`;
      contextRef.current.drawImage(img, 0, 0);
    };

    const handleScroll = (e) => {
      // const scrollTop = document.body.scrollTop;
      scrollTopRef.current = document.documentElement.scrollTop;
      console.log(document.documentElement, e.target);
      const maxScrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentScrolled = scrollTopRef.current / (maxScrollable - 1);
      const imageIndex = Math.min(
        totalFrames,
        Math.ceil(percentScrolled * totalFrames)
      );
      if (imageIndex < 130) {
        setShowText(false);
      } else {
        setShowText(true);
      }
      // console.log(scrollTopRef.current, percentScrolled, imageIndex);
      requestAnimationFrame(() => changeImage(imageIndex + 1));
    };
    window.addEventListener("scroll", handleScroll);
    preLoadImages();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <main id={"main"}>
        <section className={"section-container"}>
          <div class="hero">
            <h1 class="hero-text">Wanna Learn Parkour ?</h1>
          </div>
        </section>
        <section className={"section-container"}>
          <div className="canvasContainer">
            <canvas ref={canvasRef} id="scroll-canvas" />
            {showText && <p> Parkour !</p>}
          </div>
        </section>
        <section className={"section-container"}>
          <div class="hero">
            <h1 class="hero-text">Micheal Scott Parkour Company!</h1>
            <h2>Learn from the best</h2>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
