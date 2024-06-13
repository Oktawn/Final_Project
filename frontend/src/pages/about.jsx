

function About() {
    return (
        <>stats
            wpm - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.

            raw wpm - calculated just like wpm, but also includes incorrect words.

            acc - percentage of correctly pressed keys.

            char - correct characters / incorrect characters. Calculated after the test has ended.

            consistency - based on the variance of your raw wpm. Closer to 100% is better. Calculated using the coefficient of variation of raw wpm and mapped onto a scale from 0 to 100.</>
    )
}

export default About