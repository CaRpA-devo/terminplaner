import "./App.css";
import { LoginForm } from "./components/forms/loginForm.comp";
import { Navbar } from "./components/navbar/navbar.comp";

function App() {
    return (
        <>
            <Navbar />
            <LoginForm />
        </>
    );
}

export default App;
