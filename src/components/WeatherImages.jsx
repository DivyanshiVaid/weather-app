
const WeatherImages = ({imageUrl}) => {
    return (
        <div className="p-3">
            <img src={imageUrl} alt="Weather image" />
        </div>
    )
};

export default WeatherImages;