import { HeaderAccount } from "../components/AccountPage/HeaderAccount";
import { ResultTests } from "../components/AccountPage/ResultTests";
import { Stats } from "../components/AccountPage/Stats";
import "../components/AccountPage/Account.css"
import { StatsStore } from "../State/useState";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

function Account() {

    const getStats = StatsStore((state) => state.getStats);
    const stats = StatsStore((state) => state.stats);
    const [cookies] = useCookies(["user"]);
    const user = cookies.user;
    useEffect(() => {
        getStats(user.user_id);
    }, []);


    return (
        <div>
            <HeaderAccount stats={stats} user={user} />
            <Stats stats={stats} />
            <ResultTests id={user.user_id} />
        </div>
    );
}

export default Account;