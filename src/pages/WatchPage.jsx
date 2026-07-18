function WatchPage({params}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-chill-dark">
            <div className="text-center text-white">
                <h1 className="text-3xl font-bold mb-4">Watch Page</h1>
                <p className="text-white/60">Film ID: {params.id}</p>
                <p className="text-white/40">Coming Soon - Video</p>
            </div>
        </div>
    )
}

export default WatchPage;