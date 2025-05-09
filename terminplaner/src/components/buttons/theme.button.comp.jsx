// import { useEffect, useState } from "react";
// import { Button } from "../buttons/button.comp";

// export const ThemeToggle = () => {
//     const [theme, setTheme] = useState("nord"); // spell-checker: disable-line

//     useEffect(() => {
//         document.documentElement.setAttribute("data-theme", theme);
//     }, [theme]);

//     const toggleTheme = () => {
//         setTheme((prev) => (prev === "nord" ? "dark" : "nord")); // spell-checker: disable-line
//     };

//     return (
//         <Button
//             onClickHandler={toggleTheme}
//             text={theme === "dark" ? "🌙 Dunkel" : "❄️ Nord"} // spell-checker: disable-line
//             className="btn btn-sm"
//         />
//     );
// };
