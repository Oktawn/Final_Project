function Display({ text, input }) {
    const words = text.split(' ');
    const inputWords = input.split(' ');

    return (
        <div className="text-display">
            {words.map((word, index) => {
                let className = '';
                if (index < inputWords.length - 1) {
                    className = word === inputWords[index] ? 'correct' : 'incorrect';
                } else if (index === inputWords.length - 1) {
                    className = 'current';
                }

                return (
                    <span key={index} className={className}>
                        {word}{' '}
                    </span>
                );
            })}
        </div>
    );
};

export { Display };