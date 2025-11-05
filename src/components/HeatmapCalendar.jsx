import { useState, useEffect } from 'react';
import { format, eachDayOfInterval, startOfYear, endOfYear, getDay } from 'date-fns';
import './HeatmapCalendar.css';

export default function HeatmapCalendar({ wordCountsByDate }) {
  const [tooltipData, setTooltipData] = useState(null);

  const currentYear = new Date().getFullYear();
  const yearStart = startOfYear(new Date());
  const yearEnd = endOfYear(new Date());

  // Generate all days of the year
  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Calculate max word count for intensity scaling
  const maxWordCount = Math.max(...Object.values(wordCountsByDate || {}), 1);

  // Group days into weeks for grid layout
  const weeks = [];
  let currentWeek = [];

  allDays.forEach((day, index) => {
    const dayOfWeek = getDay(day);

    // Fill empty cells for the first week
    if (index === 0 && dayOfWeek > 0) {
      for (let i = 0; i < dayOfWeek; i++) {
        currentWeek.push(null);
      }
    }

    currentWeek.push(day);

    // Start new week on Sunday
    if (dayOfWeek === 6 || index === allDays.length - 1) {
      // Fill remaining cells for the last week
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  const getIntensityLevel = (wordCount) => {
    if (!wordCount || wordCount === 0) return 0;
    if (wordCount < maxWordCount * 0.25) return 1;
    if (wordCount < maxWordCount * 0.5) return 2;
    if (wordCount < maxWordCount * 0.75) return 3;
    return 4;
  };

  const handleMouseEnter = (day, wordCount, event) => {
    const rect = event.target.getBoundingClientRect();
    setTooltipData({
      date: format(day, 'MMM d, yyyy'),
      wordCount: wordCount || 0,
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  const monthLabels = [];
  let lastMonth = -1;

  return (
    <div className="heatmap-calendar">
      <div className="heatmap-header">
        <h3>Writing Activity - {currentYear}</h3>
        <div className="heatmap-legend">
          <span className="legend-label">Less</span>
          <div className="legend-boxes">
            <div className="legend-box level-0" />
            <div className="legend-box level-1" />
            <div className="legend-box level-2" />
            <div className="legend-box level-3" />
            <div className="legend-box level-4" />
          </div>
          <span className="legend-label">More</span>
        </div>
      </div>

      <div className="heatmap-grid">
        <div className="weekday-labels">
          <div className="weekday-label"></div>
          <div className="weekday-label">Mon</div>
          <div className="weekday-label"></div>
          <div className="weekday-label">Wed</div>
          <div className="weekday-label"></div>
          <div className="weekday-label">Fri</div>
          <div className="weekday-label"></div>
        </div>

        <div className="heatmap-weeks">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="heatmap-week">
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <div key={dayIndex} className="heatmap-day empty" />;
                }

                const dateKey = day.toDateString();
                const wordCount = wordCountsByDate?.[dateKey] || 0;
                const intensityLevel = getIntensityLevel(wordCount);

                return (
                  <div
                    key={dayIndex}
                    className={`heatmap-day level-${intensityLevel}`}
                    onMouseEnter={(e) => handleMouseEnter(day, wordCount, e)}
                    onMouseLeave={handleMouseLeave}
                    data-date={format(day, 'yyyy-MM-dd')}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {tooltipData && (
        <div
          className="heatmap-tooltip"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y}px`,
          }}
        >
          <div className="tooltip-date">{tooltipData.date}</div>
          <div className="tooltip-count">
            {tooltipData.wordCount} {tooltipData.wordCount === 1 ? 'word' : 'words'}
          </div>
        </div>
      )}
    </div>
  );
}
