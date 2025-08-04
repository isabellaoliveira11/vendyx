// src/components/Calendar.tsx
import { useState } from 'react';
import {
  format,
  getDay,
  startOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameDay,
  isSameMonth,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { CaretLeft, CaretRight } from 'phosphor-react';

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

export function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const generateCalendar = () => {
    const startOfMonthDate = startOfMonth(currentMonth);
    const dayOfWeekOfFirstDay = getDay(startOfMonthDate);
    const adjustStart = dayOfWeekOfFirstDay === 0 ? 6 : dayOfWeekOfFirstDay - 1;

    const startGridDay = new Date(startOfMonthDate);
    startGridDay.setDate(startOfMonthDate.getDate() - adjustStart);
    const endGridDay = new Date(startGridDay);
    endGridDay.setDate(startGridDay.getDate() + 41);

    const days = eachDayOfInterval({ start: startGridDay, end: endGridDay });

    return days.map((day) => ({
      date: day,
      dayNumber: format(day, 'd'),
      isToday: isSameDay(day, new Date()),
      isCurrentMonth: isSameMonth(day, currentMonth),
      key: format(day, 'yyyy-MM-dd'),
    }));
  };

  const calendarDays = generateCalendar();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <div className="flex justify-between items-center mb-3">
        <button onClick={goToPreviousMonth} className="text-gray-500 hover:text-purple-600 p-1 rounded-full">
          <CaretLeft size={20} />
        </button>
        <h5 className="font-bold text-gray-800 text-base">
          {format(currentMonth, 'MMMM yyyy', { locale: ptBR }).toUpperCase()}
        </h5>
        <button onClick={goToNextMonth} className="text-gray-500 hover:text-purple-600 p-1 rounded-full">
          <CaretRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-7 text-center text-xs text-gray-500 mb-1">
        {weekDays.map((dia, i) => (
          <span key={i} className="font-semibold uppercase">{dia}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-1">
        {calendarDays.map((day) => (
          <span
            key={day.key}
            className={`
              w-8 h-8 flex items-center justify-center text-xs rounded-md
              ${day.isToday ? 'bg-purple-600 text-white font-bold' : ''}
              ${!day.isToday && day.isCurrentMonth ? 'text-gray-800 hover:bg-purple-50 cursor-pointer' : ''}
              ${!day.isCurrentMonth ? 'text-gray-300' : ''}
            `}
          >
            {day.dayNumber}
          </span>
        ))}
      </div>
    </div>
  );
}
