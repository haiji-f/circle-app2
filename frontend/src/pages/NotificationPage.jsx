// frontend/src/pages/NotificationPage.jsx
import React from 'react';
import { ArrowLeft, Bell } from 'lucide-react';

// 仮のお知らせデータ
const mockNotifications = [
  { id: 1, circle: 'コーディングサークル', title: '来週の勉強会はReact特集です！', date: '2025-08-14', read: false },
  { id: 2, circle: '写真サークル', title: '週末の撮影会、中止のお知らせ', date: '2025-08-13', read: false },
  { id: 3, circle: 'バンドサークル', title: '新メンバーが加入しました！', date: '2025-08-12', read: true },
];

const NotificationPage = ({ onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">お知らせ</h1>
      </div>
      <div className="p-4 space-y-4">
        {mockNotifications.length > 0 ? (
          mockNotifications.map(item => (
            <div key={item.id} className={`p-4 rounded-lg shadow-sm ${item.read ? 'bg-white' : 'bg-blue-50'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500 mt-1">{item.circle}</p>
                </div>
                {!item.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1 ml-2"></div>}
              </div>
              <p className="text-xs text-gray-400 text-right mt-2">{item.date}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <Bell size={48} className="mx-auto mb-4" />
            <p>新しいお知らせはありません。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
