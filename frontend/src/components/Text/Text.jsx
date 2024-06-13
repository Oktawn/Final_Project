
function Text({ words, incorrectIndices }) {
    // const inputWord = input.split(' ')
    return (
        <p>
            {
                words.map((word, index) => (
                    <span key={index}
                        className={incorrectIndices.includes(index) ? 'incorrect' : ""}>
                        {word + " "}
                    </span>
                ))
            }
        </p>
    )
}

export { Text };