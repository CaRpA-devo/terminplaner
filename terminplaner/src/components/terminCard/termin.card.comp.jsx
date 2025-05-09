import { useState } from "react";
import { InputField } from "../forms/inputField.comp";
import { Button } from "../buttons/button.comp";
import { SavedCard } from "./savedCard.comp";

const formatDate = (date) => {
    const d = new Date(date);
    return {
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        weekday: d.getDay() === 0 ? 6 : d.getDay() - 1,
    };
};

const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
    const week1 = new Date(d.getFullYear(), 0, 4);
    return (
        1 +
        Math.round(
            ((d.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7
        )
    );
};

export function TerminCard({ savedMemos, setSavedMemos }) {
    const [datum, setDatum] = useState("");
    const [notiz, setNotiz] = useState("");
    const [openMonth, setOpenMonth] = useState(null); // Zustand für geöffneten Monat

    const handleSave = () => {
        if (datum && notiz) {
            const newMemo = { datum, notiz, done: false }; // Füge ein 'done' Flag hinzu
            setSavedMemos([...savedMemos, newMemo]);
            setDatum("");
            setNotiz("");
        } else {
            alert("Bitte alle Felder ausfüllen!");
        }
    };

    const groupByYearMonthKW = (memos) => {
        const grouped = {};
        memos.forEach((memo) => {
            const date = new Date(memo.datum);
            const { year, month, weekday } = formatDate(date);
            const week = getWeekNumber(date);

            if (!grouped[year]) grouped[year] = {};
            if (!grouped[year][month]) grouped[year][month] = {};
            if (!grouped[year][month][week])
                grouped[year][month][week] = Array(7)
                    .fill()
                    .map(() => []);

            grouped[year][month][week][weekday].push(memo);
        });
        return grouped;
    };

    const today = new Date();
    const currentKW = getWeekNumber(today);
    const currentYear = today.getFullYear();

    const sortedMemos = [...savedMemos].sort(
        (a, b) => new Date(a.datum) - new Date(b.datum)
    );
    const grouped = groupByYearMonthKW(sortedMemos);

    const handleToggleMonth = (month) => {
        // Wenn der angeklickte Monat bereits geöffnet ist, wird er wieder geschlossen, ansonsten geöffnet
        setOpenMonth(openMonth === month ? null : month);
    };

    // Zählen der Termine im Monat (ohne "erledigt" zu berücksichtigen)
    const countMemosForMonth = (month) => {
        let total = 0;
        savedMemos.forEach((memo) => {
            const date = new Date(memo.datum);
            if (date.getMonth() === month) {
                total++;
            }
        });
        return total;
    };

    return (
        <section className="flex justify-center flex-col mt-16 items-center min-h-screen px-4 sm:px-8">
            <div className="card bg-base-100 w-full sm:w-96 shadow-sm">
                <div className="card-body justify-center items-center">
                    <h2 className="card-title">Memo erstellen</h2>
                    <p>
                        Plane hier deine Termine, damit dir nichts mehr
                        durchrutscht. 😊
                    </p>

                    <InputField
                        label="Datum"
                        type="date"
                        placeholder="Datum"
                        aria-label="Datum"
                        value={datum}
                        onChange={(e) => setDatum(e.target.value)}
                        className="input input-primary mt-4 w-full"
                    />

                    <InputField
                        label="Notiz"
                        type="text"
                        placeholder="Was möchtest du dir merken?"
                        aria-label="Notiz"
                        value={notiz}
                        onChange={(e) => setNotiz(e.target.value)}
                        className="input input-secondary mt-4 w-full"
                    />

                    <Button
                        text="Speichern"
                        color="btn btn-primary mt-4 w-full"
                        onClickHandler={handleSave}
                    />
                </div>
            </div>

            <div className="mt-8 p-8 w-full overflow-x-auto">
                {Object.entries(grouped).map(([year, months]) => (
                    <div key={year} className="mt-8">
                        <h3 className="text-2xl mb-4">{year}</h3>
                        {Object.entries(months).map(([month, weeks]) => {
                            const totalMemos = countMemosForMonth(month); // Zählt alle Termine im Monat
                            return (
                                <div key={month} className="mb-8">
                                    <h4
                                        className="text-xl mb-2 cursor-pointer flex justify-between"
                                        onClick={() => handleToggleMonth(month)} // Klicke auf den Monat, um ihn ein-/auszublenden
                                    >
                                        <span>
                                            {new Date(0, month).toLocaleString(
                                                "de-DE",
                                                { month: "long" }
                                            )}
                                        </span>
                                        {/* TODO style änder */}
                                        <span className="text-sm text-gray-500">
                                            {totalMemos} Termine
                                        </span>
                                    </h4>

                                    {/* Hier prüfen wir, ob der Monat geöffnet werden soll */}
                                    {openMonth === month && (
                                        <table className="table-auto w-full border-collapse sm:block">
                                            <thead className="hidden sm:table-header-group">
                                                <tr>
                                                    <th className="border p-2 sm:p-4">
                                                        KW
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Mo
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Di
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Mi
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Do
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Fr
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        Sa
                                                    </th>
                                                    <th className="border p-2 sm:p-4">
                                                        So
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.entries(weeks).map(
                                                    ([kw, weekdays]) => (
                                                        <tr
                                                            key={kw}
                                                            className={`text-center align-top ${
                                                                parseInt(kw) ===
                                                                    currentKW &&
                                                                parseInt(
                                                                    year
                                                                ) ===
                                                                    // TODO color anpassen
                                                                    currentYear
                                                                    ? "bg-yellow-100 font-semibold"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <td className="border p-2 sm:p-4 ">
                                                                KW {kw}
                                                            </td>
                                                            {weekdays.map(
                                                                (
                                                                    dayMemos,
                                                                    dayIdx
                                                                ) => (
                                                                    <td
                                                                        key={
                                                                            dayIdx
                                                                        }
                                                                        className="border p-2 sm:p-4 align-top"
                                                                    >
                                                                        {dayMemos.map(
                                                                            (
                                                                                memo,
                                                                                i
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        i
                                                                                    }
                                                                                    className="mb-2"
                                                                                >
                                                                                    <SavedCard
                                                                                        memo={
                                                                                            memo
                                                                                        }
                                                                                        onDelete={() => {
                                                                                            const updated =
                                                                                                savedMemos.filter(
                                                                                                    (
                                                                                                        m
                                                                                                    ) =>
                                                                                                        m !==
                                                                                                        memo
                                                                                                );
                                                                                            setSavedMemos(
                                                                                                updated
                                                                                            );
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            )
                                                                        )}
                                                                    </td>
                                                                )
                                                            )}
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="block sm:hidden">
                {sortedMemos.map((memo, index) => (
                    <div key={index} className="mb-4">
                        <SavedCard
                            memo={memo}
                            onDelete={() => {
                                const updated = savedMemos.filter(
                                    (_, i) => i !== index
                                );
                                setSavedMemos(updated);
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
