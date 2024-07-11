import { useEffect, useState } from "react";
import './ProgressBar.css';

function ProgressBar() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 18));
        }, 1000);

        if (progress >= 100) {
            clearInterval(timer);
            setProgress(0);
        }

        return () => {
            clearInterval(timer);
        };
    }, [progress]);


    return (
        <div className="container">
            <p>Loading Data...</p>
            <div className="progress2 progress-moved">
                <div className="progress-bar2">
                </div>
            </div>
        </div>
    );
}

export { ProgressBar }