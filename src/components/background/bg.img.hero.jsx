import "../background/bg.img.hero";
import "../background/bg.img.hero.style.css";
import backgroundImage from "/img/hero.png";

export function BackgroundImage({ isBlurred }) {
    return (
        <div
            className={`background ${isBlurred ? "blur" : "clear"}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        />
    );
}
