
const WeatherImages = ({imageUrl}) => {
    /*render images dynamically */    
    return (
        <div className="p-4">
            <img src={imageUrl} alt="Weather image" />
        </div>
    )
};

export default WeatherImages;