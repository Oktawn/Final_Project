export function Page_404() {
  return (
    <div className="page404">
      <div>
        <img src="404.png" alt="" style={{ width: "70%" }} />
      </div>
      <div>
        <h1>404</h1>
        Ooops! Looks like this page or resource doesn't exist.
      </div>
      <button>
        <a href="/"> Go Home</a>
      </button>
    </div>
  );
}
