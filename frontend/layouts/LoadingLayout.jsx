import { Outlet } from "react-router-dom";

function LoadingLayout() {
    return (
        <div >
            <Outlet />
        </div>
    )
}

export default LoadingLayout;