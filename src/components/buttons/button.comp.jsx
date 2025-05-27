export function Button({ color, onClickHandler, text }) {
    return (
        <>
            <button onClick={onClickHandler} className={`btn ${color} `}>
                {text}
            </button>
        </>
    );
}
