import { HeaderAccount } from "../components/AccountPage/HeaderAccount";
import { ResultTests } from "../components/AccountPage/ResultTests";
import { Stats } from "../components/AccountPage/Stats";
import "../components/AccountPage/Account.css"
import { StatsStore } from "../State/useState";
import { useEffect } from "react";

function Account() {

    const getStats = StatsStore((state) => state.getStats);
    const stats = StatsStore((state) => state.stats);

    useEffect(() => {
        getStats();
    }, []);


    return (
        <div>
            <HeaderAccount stats={stats} />
            <Stats stats={stats} />
            <ResultTests />
        </div>
    );
}

export default Account;