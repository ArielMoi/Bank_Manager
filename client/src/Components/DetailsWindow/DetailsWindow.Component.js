
const DetailsWindow = (details) => {
    return (
        <div>
            <h3>{details.headLine}</h3>
            <h4>{details.subHeadLine}</h4>
            <p>{details.description}</p>
        </div>
    )
}

export default DetailsWindow;