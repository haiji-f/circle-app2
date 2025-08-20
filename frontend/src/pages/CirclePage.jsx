// // frontend/src/pages/CirclePage.jsx

// import React, { useState } from "react";
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import QRCode from "react-qr-code";
// import { mockFullActivities, mockSchedulesByCircle } from "../data/mockData";
// import './CirclePageCalendar.css'; 

// const Icon = ({ children, size = 24, className = "" }) => (
//   <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
// );
// const ArrowLeftIcon = (props) => <Icon {...props}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>;
// const UsersIcon = (props) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
// const Share2Icon = (props) => <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></Icon>;
// const ActivityIcon = (props) => <Icon {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Icon>;
// const CalendarIconSVG = (props) => <Icon {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>;
// const XIcon = (props) => <Icon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
// const CopyIcon = (props) => <Icon {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>;

// const InviteModal = ({ link, onClose }) => {
//   if (!link) return null;
//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(link).then(() => {
//       alert("招待リンクをコピーしました！");
//     }).catch(err => {
//       console.error('コピーに失敗しました: ', err);
//     });
//   };
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fade-in">
//       <div className="bg-white rounded-2xl shadow-xl p-6 m-4 w-full max-w-sm text-center">
//         <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-bold text-gray-800">メンバーを招待</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><XIcon size={24} /></button>
//         </div>
//         <p className="text-gray-600 mb-6">このQRコードまたはリンクを共有して、メンバーを招待しましょう。</p>
//         <div className="p-4 bg-white rounded-lg flex justify-center"><QRCode value={link} size={192} /></div>
//         <div className="relative flex items-center bg-gray-100 rounded-lg p-2 mt-4">
//           <input type="text" value={link} readOnly className="bg-transparent text-sm text-gray-700 w-full outline-none pr-10" />
//           <button onClick={copyToClipboard} className="absolute right-2 p-1.5 text-gray-500 hover:bg-gray-200 rounded-md" title="コピー"><CopyIcon size={18} /></button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const CirclePage = ({ circle, onBack, onNavigate }) => {
//   if (!circle) {
//     return <div className="p-6 text-center text-gray-500">サークル情報が見つかりません。</div>;
//   }
  
//   const [date, setDate] = useState(new Date());
//   const circleSchedule = mockSchedulesByCircle[circle.id] || [];

//   const eventDates = new Set(
//     circleSchedule.map(item => new Date(item.date).toDateString())
//   );

//   const tileContent = ({ date, view }) => {
//     if (view === 'month' && eventDates.has(date.toDateString())) {
//       return <div className="event-dot"></div>;
//     }
//   };

//   const selectedDayEvents = circleSchedule.filter(
//     item => new Date(item.date).toDateString() === date.toDateString()
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [inviteLink, setInviteLink] = useState("");

//   const handleInviteClick = () => {
//     const currentUrl = window.location.href;
//     setInviteLink(currentUrl); 
//     setIsModalOpen(true);
//   };

//   return (
//     <div className="animate-fade-in bg-gray-50 min-h-screen">
//       {isModalOpen && <InviteModal link={inviteLink} onClose={() => setIsModalOpen(false)} />}
      
//       <div className="relative p-4 bg-white border-b shadow-sm">
//         <button onClick={onBack} className="absolute top-1/2 -translate-y-1/2 left-4 text-gray-600 hover:text-gray-900"><ArrowLeftIcon size={24} /></button>
//         <div className="flex items-center justify-between ml-16">
//             <div className="flex items-center">
//                 <img src={circle.image} alt={circle.name} className="w-16 h-16 rounded-full border-2 border-white shadow-md" onError={(e) => { e.target.src = "https://placehold.co/100x100/e2e8f0/334155?text=Error"; }} />
//                 <div className="ml-4">
//                     <h1 className="text-2xl font-bold text-gray-800">{circle.name}</h1>
//                     <div className="flex items-center text-sm text-gray-500 mt-1"><UsersIcon size={14} className="mr-1.5" /><span>メンバー 35名</span></div>
//                 </div>
//             </div>
//             <button onClick={handleInviteClick} className="flex items-center bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"><Share2Icon size={16} className="mr-2" />招待</button>
//         </div>
//       </div>
      
//       <div className="p-4">
//         <div className="bg-white p-5 rounded-xl shadow-md mb-6">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center"><ActivityIcon className="mr-2 text-green-500" /> サークル活動</h2>
//           <div className="space-y-4">
//             {mockFullActivities.slice(0, 3).map((activity) => (
//               <div key={activity.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
//                 <p className="font-semibold text-gray-800">{activity.title}</p>
//                 <div className="flex justify-between text-xs text-gray-500 mt-1"><span>{activity.author}</span><span>{activity.date}</span></div>
//               </div>
//             ))}
//             <button onClick={() => onNavigate(`/circle_page/${circle.id}/activities`)} className="w-full text-center text-blue-600 font-semibold mt-2 py-2 hover:bg-blue-50 rounded-lg">もっと見る</button>
//           </div>
//         </div>
        
//         <div className="bg-white p-5 rounded-xl shadow-md">
//           <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
//             <CalendarIconSVG className="mr-2 text-purple-500" /> カレンダー
//           </h2>
          
//           <div className="mb-4">
//             <Calendar
//               onChange={setDate}
//               value={date}
//               tileContent={tileContent}
//               locale="ja-JP"
//               className="w-full border-none"
//             />
//           </div>

//           <div>
//             <h3 className="font-semibold text-gray-600 border-b pb-2 mb-3">
//               {date.toLocaleDateString("ja-JP", { month: 'long', day: 'numeric', weekday: 'short' })} の予定
//             </h3>
//             {selectedDayEvents.length > 0 ? (
//               <div className="space-y-2">
//                 {selectedDayEvents.map((item, index) => (
//                   <div key={index} className="p-3 bg-purple-50 rounded-lg">
//                     <p className="font-semibold text-gray-800">{item.event}</p>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p className="text-sm text-gray-500 text-center py-4">この日の予定はありません。</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CirclePage;

// frontend/src/pages/CirclePage.jsx

import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // react-calendarの基本スタイル
import QRCode from "react-qr-code";
import { mockFullActivities, mockSchedulesByCircle } from "../data/mockData";
import './CirclePageCalendar.css'; // react-calendarのカスタムスタイル

// --- アイコンコンポーネント (変更なし) ---
const Icon = ({ children, size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{children}</svg>
);
const ArrowLeftIcon = (props) => <Icon {...props}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>;
const UsersIcon = (props) => <Icon {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></Icon>;
const Share2Icon = (props) => <Icon {...props}><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></Icon>;
const ActivityIcon = (props) => <Icon {...props}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></Icon>;
const CalendarIconSVG = (props) => <Icon {...props}><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></Icon>;
const XIcon = (props) => <Icon {...props}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>;
const CopyIcon = (props) => <Icon {...props}><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></Icon>;


// --- 招待モーダルコンポーネント (CSSクラス適用) ---
const InviteModal = ({ link, onClose }) => {
  if (!link) return null;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      alert("招待リンクをコピーしました！");
    }).catch(err => {
      console.error('コピーに失敗しました: ', err);
    });
  };
  return (
    // {/* 変更: モーダルのコンテナにCSSクラスを適用 */}
    <div className="modal-overlay">
      <div className="modal-content">
        {/* 変更: モーダルのヘッダーにCSSクラスを適用 */}
        <div className="modal-header">
            <h2>メンバーを招待</h2>
            <button onClick={onClose} className="close-button"><XIcon size={24} /></button>
        </div>
        {/* 変更: モーダルのボディ(説明文)にCSSクラスを適用 */}
        <p className="modal-description">このQRコードまたはリンクを共有して、メンバーを招待しましょう。</p>
        {/* 変更: QRコードのコンテナにCSSクラスを適用 */}
        <div className="qr-code-container"><QRCode value={link} size={192} /></div>
        {/* 変更: リンク表示部分にCSSクラスを適用 */}
        <div className="link-container">
          <input type="text" value={link} readOnly className="link-input" />
          <button onClick={copyToClipboard} className="copy-button" title="コピー"><CopyIcon size={18} /></button>
        </div>
      </div>
    </div>
  );
};


// --- メインのCirclePageコンポーネント (CSSクラス適用) ---
const CirclePage = ({ circle, onBack, onNavigate }) => {
  if (!circle) {
    return <div className="page-container text-center">サークル情報が見つかりません。</div>;
  }
  
  const [date, setDate] = useState(new Date());
  const circleSchedule = mockSchedulesByCircle[circle.id] || [];

  const eventDates = new Set(
    circleSchedule.map(item => new Date(item.date).toDateString())
  );

  const tileContent = ({ date, view }) => {
    if (view === 'month' && eventDates.has(date.toDateString())) {
      return <div className="event-dot"></div>;
    }
  };

  const selectedDayEvents = circleSchedule.filter(
    item => new Date(item.date).toDateString() === date.toDateString()
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteLink, setInviteLink] = useState("");

  const handleInviteClick = () => {
    // 本番環境ではドメインを適切に設定する必要があります
    const currentUrl = `${window.location.origin}/circle/${circle.id}`;
    setInviteLink(currentUrl); 
    setIsModalOpen(true);
  };

  return (
    // {/* 変更: ページ全体のコンテナにCSSクラスを適用 */}
    <div className="page-container">
      {isModalOpen && <InviteModal link={inviteLink} onClose={() => setIsModalOpen(false)} />}
      
      {/* 変更: ページ上部のヘッダーにCSSクラスを適用 */}
      <div className="circle-page-header">
        <button onClick={onBack} className="back-button"><ArrowLeftIcon size={24} /></button>
        {/* 変更: サークル情報と招待ボタンをまとめるコンテナ */}
        <div className="circle-info-container">
          {/* 変更: アイコンとサークル名をまとめるコンテナ */}
            <div className="circle-identity">
                <img src={circle.image} alt={circle.name} className="circle-avatar" onError={(e) => { e.target.src = "https://placehold.co/100x100/e2e8f0/334155?text=Error"; }} />
                <div className="circle-details">
                    <h1 className="circle-name">{circle.name}</h1>
                    <div className="member-count"><UsersIcon size={14} /><span>メンバー 35名</span></div>
                </div>
            </div>
            {/* 変更: 招待ボタンにCSSクラスを適用 */}
            <button onClick={handleInviteClick} className="invite-button"><Share2Icon size={16} />招待</button>
        </div>
      </div>
      
      {/* 変更: ページコンテンツのコンテナ */}
      <div className="circle-page-content">
        {/* 変更: カードコンポーネントに 'card' クラスを適用 */}
        <div className="card">
          {/* 変更: カードタイトルに 'card-title' クラスを適用 */}
          <h2 className="card-title"><ActivityIcon className="text-green-500" /> サークル活動</h2>
          {/* 変更: 活動リストのコンテナにCSSクラスを適用 */}
          <div className="activity-list">
            {mockFullActivities.slice(0, 3).map((activity) => (
              // {/* 変更: 活動リストの各項目にCSSクラスを適用 */}
              <div key={activity.id} className="activity-item">
                <p className="title">{activity.title}</p>
                <div className="meta"><span>{activity.author}</span><span>{activity.date}</span></div>
              </div>
            ))}
            <button onClick={() => onNavigate(`/circle_page/${circle.id}/activities`)} className="more-link">もっと見る</button>
          </div>
        </div>
        
        {/* 変更: カードコンポーネントに 'card' クラスを適用 */}
        <div className="card">
          {/* 変更: カードタイトルに 'card-title' クラスを適用 */}
          <h2 className="card-title">
            <CalendarIconSVG className="text-purple-500" /> カレンダー
          </h2>
          
          <div className="calendar-container">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
              locale="ja-JP"
            />
          </div>

        {/* 変更: 選択日のイベントリストにCSSクラスを適用 */}
          <div className="selected-day-events">
            <h3 className="selected-day-title">
              {date.toLocaleDateString("ja-JP", { month: 'long', day: 'numeric', weekday: 'short' })} の予定
            </h3>
            {selectedDayEvents.length > 0 ? (
              <div className="event-list">
                {selectedDayEvents.map((item, index) => (
                  // {/* 変更: イベント項目にCSSクラスを適用 */}
                  <div key={index} className="event-item">
                    <p className="title">{item.event}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-events">この日の予定はありません。</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CirclePage;
