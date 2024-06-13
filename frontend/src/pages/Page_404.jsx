export function Page_404() {
    return (

        <div className="page404">
            <div className="image">
                <img src="404.png" alt="" />
            </div>
            <div>
                <h1>404</h1>
                Ooops! Looks like this page or resource doesn't exist.
            </div>
            <button><a href="/"> Go Home</a></button>
        </div>
    )
}