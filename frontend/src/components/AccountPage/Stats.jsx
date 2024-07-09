import ky from "ky";
import { useEffect, useState } from "react";

async function getStats() {
    const stats = await ky.get("http://localhost:3000/stats/1").json();
    return stats[0];
}

function Stats() {
    const [stats, setStats] = useState({ "start": 0 });

    useEffect(() => {
        const fetchData = async () => {
            const newStats = await getStats();
            setStats(newStats);
        };


        fetchData();

    }, []);

    console.log(stats);

    return (
        <div>
            <div>
                <p>tests started</p>
                <p>{stats.start}</p>
            </div>
            <div>
                <p>tests completed</p>
                <p>{stats.pass} ({(stats.pass / stats.start * 100).toFixed(0)})%</p>
            </div>
            <div>
                <p>highest wpm</p>
                <p>{stats.max_wpm}</p>
            </div>
            <div>
                <p>average wpm</p>
                <p>{stats.avg_wpm}</p>
            </div>
            <div>
                <p>highest raw wpm</p>
                <p>{stats.max_raw}</p>
            </div>
            <div>
                <p>average raw wpm</p>
                <p>{stats.avg_raw}</p>
            </div>
            <div>
                <p>highest accuracy</p>
                <p>{stats.max_acc}%</p>
            </div>
            <div>
                <p>average accuracy</p>
                <p>{stats.avg_acc}%</p>
            </div>
        </div>
    )
}

export { Stats };