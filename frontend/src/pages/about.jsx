function About() {
    return (
        <div className="about">
            <h2 className="about-h">About</h2>
            <p className="about-p">
                My application is a minimalistic and customizable typing test.
                <br />
                Test yourself in various modes, track your progress and improve your speed.
            </p>

            <h3 className="about-h">Stats</h3>
            <p className="about-p" >
                wpm - total number of characters in correctly typed words (including spaces) and normalized to 60 seconds.
                <br />
                raw wpm - calculated just like wpm, but also includes incorrect words.
                <br />
                acc - percentage of correctly pressed keys.
                <br />
                char - correct characters / incorrect characters. Calculated after the test has ended.
            </p>
            <h3 className="about-h">Results screen</h3>
            <p className="about-p">
                After completing the test, you will be able to see your wpm, original wpm, accuracy, character stats, test duration, and testing information. You can also see a graph of your wpm and raw throughout the test.
                <br />
                Remember that the wpm line is a global average, while the raw wpm line is a local, short-term value. (this means that if you stop, the value will be 0)
            </p>

        </div >
    )
}

export default About