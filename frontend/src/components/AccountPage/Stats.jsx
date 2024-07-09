
function Stats({ stats }) {


    return (
        <div className="stats-page">
            <div>
                <div className="text">tests started</div>
                <p>{stats.start}</p>
            </div>
            <div>
                <div className="text">tests completed</div>
                <p>{stats.pass}({(stats.pass / stats.start * 100).toFixed(0)})%</p>
            </div>
            <div>
                <div className="text">highest wpm</div>
                <p>{stats.max_wpm}</p>
            </div>
            <div>
                <div className="text">average wpm</div>
                <p>{stats.avg_wpm}</p>
            </div>
            <div>
                <div className="text">highest raw wpm</div>
                <p>{stats.max_raw}</p>
            </div>
            <div>
                <div className="text">average raw wpm</div>
                <p>{stats.avg_raw}</p>
            </div>
            <div>
                <div className="text">highest accuracy</div>
                <p>{stats.max_acc}%</p>
            </div>
            <div>
                <div className="text">average accuracy</div>
                <p>{stats.avg_acc}%</p>
            </div>
        </div>
    )
}

export { Stats };