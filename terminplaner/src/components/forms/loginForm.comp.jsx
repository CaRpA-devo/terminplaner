import { useState } from "react";
import { Button } from "../buttons/button.comp";
import { InputField } from "../forms/inputField.comp";
import { BackgroundImage } from "../background/bg.img.hero";
import "../forms/loginForm.style.css";

import { ToastContainer, toast } from "react-toastify";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogIn, setLogIn] = useState(false);

    const loginHandler = (event) => {
        event.preventDefault();
        if (username === "Patrick" && password === "12345") {
            setLogIn(true);
        } else {
            toast.error("Zugangsdaten nicht korrekt");
        }
    };

    const logoutHandler = () => {
        setLogIn(false);
        setUsername("");
        setPassword("");
    };

    if (isLogIn) {
        return (
            <div className="logged-in flex flex-col items-center gap-4 ">
                <BackgroundImage isBlurred={!isLogIn} />;
                <h1 className="text-2xl font-bold text-center">
                    Willkommen, {username} bei{" "}
                    <span className="text-primary">MemoMe</span> – dein
                    persönliches Erinner-mich!
                </h1>
                <Button
                    onClickHandler={logoutHandler}
                    color={"btn btn-error"}
                    text={"Logout"}
                />
            </div>
        );
    }

    return (
        <section className="flex justify-center">
            <BackgroundImage isBlurred={!isLogIn} />;
            <form
                onSubmit={loginHandler}
                className="login-form flex flex-col items-center p-4 mt-16 bg-base-300 rounded shadow-md w-80"
            >
                <h1 className="text-2xl font-semibold mb-6 text-center">
                    Login
                </h1>
                <div className="mt-4 flex-1 justify-center">
                    <InputField
                        type="text"
                        placeholder="Benutzername"
                        value={username}
                        aria-label="Benutzername"
                        onChange={(e) => setUsername(e.target.value)}
                        className="input input-primary"
                    />
                    <InputField
                        type="password"
                        placeholder="Passwort"
                        value={password}
                        aria-label="Passwort"
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-accent mt-2"
                    />
                </div>
                <Button color={"btn-secondary mt-6"} text={"Submit"} />
            </form>
            <ToastContainer position="top-center" autoClose={1000} />
        </section>
    );
}
