interface HighlightItem {
  title: string;
  value: string;
  unit: string;
  icon: string;
  description?: string;
}

interface WeatherHighlightsProps {
  highlights: HighlightItem[];
}

export default function WeatherHighlights({ highlights }: WeatherHighlightsProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Today's Highlights</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {highlights.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-600">{item.title}</p>
              <span className="text-xl">{item.icon}</span>
            </div>
            <div className="flex items-end space-x-1">
              <span className="text-2xl font-bold text-gray-800">{item.value}</span>
              <span className="text-sm text-gray-500 mb-1">{item.unit}</span>
            </div>
            {item.description && (
              <p className="text-xs text-gray-500 mt-2">{item.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
