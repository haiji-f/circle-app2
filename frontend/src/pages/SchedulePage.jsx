// frontend/src/pages/SchedulePage.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { mockSchedulesByCircle } from '../data/mockData';

const SchedulePage = ({ circle, onBack }) => {
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);

    // このサークルのスケジュールのみを取得
    const circleSchedule = mockSchedulesByCircle[circle.id] || [];

    // --- カレンダーロジック ---
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const eventsByDate = circleSchedule.reduce((acc, event) => {
        const date = new Date(event.date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(event.event);
        return acc;
    }, {});

    const changeMonth = (delta) => {
        const newDate = new Date(currentYear, currentMonth + delta, 1);
        setCurrentMonth(newDate.getMonth());
        setCurrentYear(newDate.getFullYear());
        setSelectedDate(null);
    };
    
    const eventsToList = selectedDate 
        ? (eventsByDate[selectedDate] || []).map(eventText => ({ date: selectedDate, event: eventText }))
        : circleSchedule.filter(e => new Date(e.date).getMonth() === currentMonth && new Date(e.date).getFullYear() === currentYear);

    return (
        <div className="animate-fade-in">
            <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b flex items-center">
                <button onClick={onBack} className="mr-4 text-gray-600"><ArrowLeft size={24} /></button>
                <h1 className="text-xl font-bold text-gray-800">{circle.name} スケジュール</h1>
            </div>
            <div className="p-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
                        <h2 className="text-lg font-semibold">{`${currentYear}年 ${currentMonth + 1}月`}</h2>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm text-gray-500 mb-2">
                        <div>日</div><div>月</div><div>火</div><div>水</div><div>木</div><div>金</div><div>土</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {blanks.map(b => <div key={`b-${b}`}></div>)}
                        {days.map(day => {
                            const dateStr = new Date(currentYear, currentMonth, day).toDateString();
                            const eventsOnDay = eventsByDate[dateStr] || [];
                            const isToday = dateStr === today.toDateString();
                            const isSelected = dateStr === selectedDate;
                            const hasEvent = eventsOnDay.length > 0;

                            return (
                                <div 
                                    key={day} 
                                    className={`p-1 rounded-lg flex flex-col items-center justify-start h-20 cursor-pointer transition-colors ${
                                        isSelected 
                                            ? 'bg-blue-200' 
                                            : hasEvent 
                                                ? 'bg-purple-100' 
                                                : 'hover:bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedDate(dateStr)}
                                >
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm mb-1 ${
                                        isToday ? 'bg-blue-600 text-white' : ''
                                    } ${isSelected ? 'font-bold' : ''}`}>
                                        {day}
                                    </span>
                                    {hasEvent && (
                                        <div className="w-full text-center overflow-hidden">
                                            {eventsOnDay.length === 1 ? (
                                                <p className="text-xs text-purple-700 font-semibold truncate">{eventsOnDay[0]}</p>
                                            ) : (
                                                <span className="px-1.5 py-0.5 text-xs bg-purple-500 text-white rounded-full">{eventsOnDay.length}件</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">
                        {selectedDate ? new Date(selectedDate).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric' }) + 'の予定' : `${currentMonth + 1}月の予定一覧`}
                    </h3>
                    <div className="space-y-2">
                        {eventsToList.length > 0 ? eventsToList.map((item, index) => (
                            <div key={index} className="flex items-center bg-white p-3 rounded-lg shadow-sm">
                                <div className="w-12 text-center mr-3">
                                    <p className="font-bold text-lg">{new Date(item.date).getDate()}</p>
                                    <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString('ja-JP', { weekday: 'short' })}</p>
                                </div>
                                <p>{item.event}</p>
                            </div>
                        )) : (
                            <p className="text-gray-500 text-center py-4">{selectedDate ? 'この日の予定はありません。' : 'この月の予定はありません。'}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchedulePage;