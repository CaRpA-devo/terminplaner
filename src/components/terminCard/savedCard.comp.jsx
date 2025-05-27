import { useState } from "react";
import { Button } from "../buttons/button.comp";

export function SavedCard({ memo, onDelete }) {
    const [isDone, setIsDone] = useState(false);

    return (
        // TODO Farbe beim durchstreichen ändern
        // TODO Card-Layout anpassen
        <div
            className={`card ${
                isDone ? "bg-violet-950" : "bg-neutral"
            } text-neutral-content flex flex-col  `}
        >
            <div className="card-body items-center text-center">
                <h3 className={`card-title ${isDone ? "line-through" : ""}`}>
                    Termin am {memo.datum}
                </h3>
                <p className={isDone ? "line-through" : ""}>{memo.notiz}</p>
                <div className="card-actions justify-center sm:justify-end  gap-2">
                    <button
                        className=" btn btn-primary p-1 "
                        onClick={() => setIsDone(!isDone)}
                    >
                        {isDone ? "Zurück" : "Erledigt"}
                    </button>
                    <Button
                        color={"btn-secondary p-1  "}
                        text={"Löschen"}
                        onClickHandler={onDelete}
                    />
                </div>
            </div>
        </div>
    );
}
