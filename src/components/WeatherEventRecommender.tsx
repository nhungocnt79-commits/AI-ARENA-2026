import React from 'react';
import { FESTIVAL_EVENTS, WEATHER_CONDITIONS } from '../data/costumeData';
import { CostumeRootId } from '../types/costume';
import { Calendar, Sun, CloudRain, Flame, CloudFog, MapPin, Sparkles, Check } from 'lucide-react';

interface WeatherEventRecommenderProps {
  selectedEventId: string;
  selectedWeatherId: string;
  onSelectEvent: (eventId: string, recommendedRoot?: CostumeRootId) => void;
  onSelectWeather: (weatherId: string) => void;
}

export const WeatherEventRecommender: React.FC<WeatherEventRecommenderProps> = ({
  selectedEventId,
  selectedWeatherId,
  onSelectEvent,
  onSelectWeather,
}) => {
  const currentEvent = FESTIVAL_EVENTS.find((e) => e.id === selectedEventId) || FESTIVAL_EVENTS[0];
  const currentWeather = WEATHER_CONDITIONS.find((w) => w.id === selectedWeatherId) || WEATHER_CONDITIONS[0];

  const getWeatherIcon = (icon: string) => {
    switch (icon) {
      case 'Sun': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'Flame': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'CloudFog': return <CloudFog className="w-4 h-4 text-sky-600" />;
      case 'CloudRain': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Sun className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-[#E8DEC8] space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E1E]">
          <Calendar className="w-4 h-4" />
          <span>Bối Cảnh Lễ Hội & Điều Kiện Thời Tiết</span>
        </div>
        <span className="text-[11px] text-[#8C7A6B]">
          Tự động gợi ý giải pháp tối ưu
        </span>
      </div>

      {/* Events Selector */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-[#4A3B32] block">
          Chọn Sự Kiện Lễ Hội Tham Dự:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {FESTIVAL_EVENTS.map((event) => {
            const isSelected = selectedEventId === event.id;
            return (
              <button
                key={event.id}
                onClick={() => onSelectEvent(event.id, event.recommendedRoot)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-1.5 ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-2xs'
                    : 'bg-white/70 hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2C241E] truncate">
                    {event.name}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
                </div>
                <div className="text-[10px] text-[#8C7A6B] flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#8B1E1E]" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Event Advice Banner */}
        <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-xs text-[#78350F] flex items-start gap-2 mt-2">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Lời khuyên bối cảnh:</strong> {currentEvent.advice}
          </div>
        </div>
      </div>

      {/* Weather Selector */}
      <div className="space-y-2 pt-2 border-t border-[#E8DEC8]">
        <label className="text-xs font-semibold text-[#4A3B32] block">
          Dự Báo Thời Tiết Ngày Hội:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {WEATHER_CONDITIONS.map((weather) => {
            const isSelected = selectedWeatherId === weather.id;
            return (
              <button
                key={weather.id}
                onClick={() => onSelectWeather(weather.id)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white border-[#8B1E1E] ring-2 ring-[#8B1E1E]/20 shadow-2xs'
                    : 'bg-white/70 hover:bg-white border-[#E8DEC8]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {getWeatherIcon(weather.icon)}
                  <div>
                    <div className="text-xs font-bold text-[#2C241E]">
                      {weather.title}
                    </div>
                    <div className="text-[10px] text-[#8C7A6B]">
                      {weather.temp}
                    </div>
                  </div>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8B1E1E]" />}
              </button>
            );
          })}
        </div>

        {/* Weather Tip */}
        <div className="p-3 bg-sky-50/80 rounded-xl border border-sky-200/80 text-xs text-sky-900 flex items-start gap-2 mt-2">
          <span className="shrink-0 text-sm">💡</span>
          <div>
            <strong>Chất liệu phù hợp:</strong> {currentWeather.tip}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherEventRecommender;
