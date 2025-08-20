import React, { useState, useEffect } from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { allCirclesData } from '../data/mockData';
import { getCookie } from '../utils/cookies'; // 作成したクッキー関数をインポート

// viewHistoryプロパティはもう受け取りません
const HistoryPage = ({ onViewCircle }) => {
  const [viewedCircles, setViewedCircles] = useState([]);

  // コンポーネントが読み込まれた時に一度だけクッキーから履歴を取得します
  useEffect(() => {
    const historyIds = getCookie('viewHistory') || [];
    const circles = historyIds
      .map(id => allCirclesData.find(c => c.id === id))
      .filter(Boolean); // 見つからなかったサークルを除外
    setViewedCircles(circles);
  }, []); // 空の配列[]は、初回レンダリング時のみ実行するという意味です

  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">閲覧履歴</h1>
      <div className="space-y-4">
        {viewedCircles.length > 0 ? (
          viewedCircles.map((circle) => (
            <div
              key={circle.id}
              onClick={() => onViewCircle(circle)}
              className="flex items-center p-4 bg-white rounded-xl cursor-pointer hover:bg-gray-50 transition-colors shadow-md"
            >
              <div className="text-3xl mr-4">{circle.icon}</div>
              <div className="flex-grow">
                <h3 className="font-bold text-gray-800">{circle.name}</h3>
                <p className="text-sm text-gray-500">{circle.description}</p>
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500">
            <Clock size={48} className="mx-auto mb-4" />
            <p>最近閲覧したサークルはありません。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
