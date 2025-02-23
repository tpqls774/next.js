
export async function getWeather(id: string) {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${id}&appid=${API_KEY}`);
        if (!response.ok) throw new Error("날씨 정보를 불러오는데 실패하였습니다.");
        return response.json();
    } catch(err) {
        console.log(err);
        return null;
    }
}

export default async function WeatherInfo({ id }: { id: string }) {
    const weather = await getWeather(id)
    return (
        <div>
            <h1>{weather.sys.country} {decodeURIComponent(id)}의 날씨</h1>
            <div>
                <h2>weather: {weather.weather[0].main}</h2>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
                <h3>{weather.weather[0].description}</h3>
                <p>temp: {(weather.main.temp - 273.15).toFixed(1)}˚C</p>
                <p>wind: {weather.wind.speed}</p>
                <p>clouds: {weather.clouds.all}</p>
            </div>
        </div>
    )
}
