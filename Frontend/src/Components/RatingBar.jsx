function RatingBar(props) {
    let ratt = []
    if (props.rating >= 0 || props.rating <= 5) {
        for (let i = 0; i < props.rating; i++) {
            ratt.push("good")
        }
        for (let i = ratt.length; i < 5; i++) {
            ratt.push("bad")
        }
    }
    if (props.rating >= 5)
        return (<div className="rating">
            <div className="good"></div>
            <div className="good"></div>
            <div className="good"></div>
            <div className="good"></div>
            <div className="good"></div>
        </div>)
    else if (props.rating >= 5)
        return (
            <div className="rating">
                <div className="bad"></div>
                <div className="bad"></div>
                <div className="bad"></div>
                <div className="bad"></div>
                <div className="bad"></div>
            </div>
        )
    else
        return (<div className="rating">
            {
                ratt.map(r => (
                    <div className={r}></div>
                ))
            }
        </div>)
}

export default RatingBar
