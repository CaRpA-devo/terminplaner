import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar/navbar.comp";
import { LoginForm } from "./components/forms/loginForm.comp";
import { Button } from "./components/buttons/button.comp";
import { BackgroundImage } from "./components/background/bg.img.hero";
import { TerminCard } from "./components/termincard/termin.card.comp";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    // 🧠 Zustand aus localStorage initialisieren
    const [savedMemos, setSavedMemos] = useState(() => {
        const data = localStorage.getItem("memos");
        return data ? JSON.parse(data) : [];
    });

    // 💾 Bei Änderungen speichern
    useEffect(() => {
        localStorage.setItem("memos", JSON.stringify(savedMemos));
    }, [savedMemos]);

    const handleLogin = (name) => {
        setUsername(name);
        setLoggedIn(true);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername("");
        // KEIN reset von savedMemos hier – sonst wären sie beim Reload weg!
    };

    const handleDeleteMemo = (indexToDelete) => {
        setSavedMemos((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
        );
    };

    return (
        <>
            <Navbar />
            {!isLoggedIn ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <div className="flex flex-col mt-40 items-center gap-4">
                    <BackgroundImage isBlurred={false} />
                    <h1 className="text-2xl font-bold text-center">
                        Willkommen, {username} bei{" "}
                        <span className="text-primary">MemoMe</span> – dein
                        persönliches Erinner-mich!
                    </h1>
                    <Button
                        onClickHandler={handleLogout}
                        color="btn btn-error"
                        text="Logout"
                    />

                    <div>
                        <TerminCard
                            savedMemos={savedMemos}
                            setSavedMemos={setSavedMemos}
                            onDeleteMemo={handleDeleteMemo}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default App;
