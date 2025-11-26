import React, { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, CloudSun, Wind, Droplets } from 'lucide-react';

interface WeatherData {
  current: {
    temp: number;
    code: number;
  };
  daily: {
    time: string[];
    code: number[];
    max: number[];
    min: number[];
  };
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mapping WMO Weather Codes to Icons
  const getWeatherIcon = (code: number, className = "w-6 h-6") => {
    // 0: Clear sky
    if (code === 0) return <Sun className={`${className} text-yellow-400`} />;
    // 1, 2, 3: Mainly clear, partly cloudy, and overcast
    if ([1, 2, 3].includes(code)) return <CloudSun className={`${className} text-white`} />;
    // 45, 48: Fog
    if ([45, 48].includes(code)) return <Cloud className={`${className} text-gray-300`} />;
    // 51-67: Drizzle / Rain
    if (code >= 51 && code <= 67) return <CloudRain className={`${className} text-blue-300`} />;
    // 80-82: Rain showers
    if (code >= 80 && code <= 82) return <CloudRain className={`${className} text-blue-400`} />;
    // 95+: Thunderstorm
    if (code >= 95) return <Wind className={`${className} text-slate-300`} />;
    
    return <Sun className={`${className} text-yellow-400`} />;
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Rio de Janeiro Coordinates: -22.9068, -43.1729
        const response = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-22.9068&longitude=-43.1729&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=America%2FSao_Paulo"
        );
        const data = await response.json();
        
        setWeather({
          current: {
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code
          },
          daily: {
            time: data.daily.time,
            code: data.daily.weather_code,
            max: data.daily.temperature_2m_max,
            min: data.daily.temperature_2m_min
          }
        });
      } catch (error) {
        console.error("Failed to fetch weather", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading || !weather) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 w-full h-[140px] flex items-center justify-center">
         <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-white w-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
           {getWeatherIcon(weather.current.code, "w-10 h-10")}
           <div>
             <div className="text-3xl font-bold leading-none">{weather.current.temp}°C</div>
             <div className="text-xs text-blue-100 mt-1">Rio de Janeiro</div>
           </div>
        </div>
        <div className="text-right hidden sm:block">
           <div className="text-xs font-bold uppercase tracking-wider opacity-70 mb-1">Hoje</div>
           <div className="text-sm font-medium">{Math.round(weather.daily.max[0])}° / {Math.round(weather.daily.min[0])}°</div>
        </div>
      </div>

      {/* Next 4 Days Forecast */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-white/10">
        {weather.daily.time.slice(1, 5).map((dateStr, idx) => {
          // Fix mapping index (slice 1 means index 0 is actually tomorrow relative to daily arrays if we access them by idx+1)
          const actualIdx = idx + 1; 
          const date = new Date(dateStr + 'T00:00:00'); // Force local time to avoid timezone shifts on simple dates
          const dayName = date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0, 3);
          
          return (
            <div key={dateStr} className="flex flex-col items-center text-center">
               <span className="text-[10px] uppercase font-bold text-blue-100 mb-1">{dayName}</span>
               {getWeatherIcon(weather.daily.code[actualIdx], "w-5 h-5 mb-1")}
               <span className="text-xs font-semibold">{Math.round(weather.daily.max[actualIdx])}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;