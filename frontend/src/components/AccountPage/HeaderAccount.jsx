function HeaderAccount({ stats }) {



    const nickname = "Oktawn";
    const date = "14 June 2022";
    return (
        <div className="account">
            <div className="user-img">
                <img src="https://cdn.discordapp.com/avatars/298016102804619264/0ecfa645065209157fe3148b8bf78492.png" alt="" className="img-acc" aria-hidden="true" />
                <div>
                    <div className="user">{nickname}</div>
                    <div className="text"> Joined {date}</div>
                </div>
            </div>
            <div className="separator"></div>
            <div className="short-stats">
                <span>
                    <div className="text">test started</div>
                    <p>{stats.start}</p >
                </span>
                <span>
                    <div className="text">test completed</div>
                    <p>{stats.pass}</p >
                </span>
                <span>
                    <div className="text">test accuracy</div >
                    <p >{stats.avg_acc}% </p>
                </span>
            </div>
        </div>
    );
}

export { HeaderAccount };