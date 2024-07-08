import "./Account.css";


function HeaderAccount() {
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
            <div>
                <div>
                    <div className="text">test started</div>
                    <div>60</div >
                </div>
                <div>
                    <div className="text">test completed</div>
                    <div>60</div >
                </div>
                <div>
                    <div className="text">test accuracy</div >
                    <div >100%</div>
                </div>
            </div>
        </div>
    );
}

export { HeaderAccount };