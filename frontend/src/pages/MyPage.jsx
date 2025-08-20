// import React, { useState, useEffect } from 'react';
// import { Calendar, Bell, ChevronRight } from 'lucide-react';
// import useSimpleRouter from '../hooks/useSimpleRouter';

// const MyPage = ({ onViewCircle, currentUser }) => {
//     const { navigate } = useSimpleRouter();
    
//     // 1. サーバーから取得したデータを保存するためのStateを定義します。
//     const [joinedCircles, setJoinedCircles] = useState([]);
//     const [mySchedule, setMySchedule] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // 2. コンポーネントが読み込まれた時に、バックエンドからデータを取得します。
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // 参加中のサークルリストを取得するAPIを呼び出します (例: /api/users/me/circles)
//                 const circlesResponse = await fetch('/api/followed'); 
//                 if (!circlesResponse.ok) throw new Error('サークル情報の取得に失敗しました。');
//                 const circlesData = await circlesResponse.json();
//                 setJoinedCircles(circlesData);

//                 // 自分のスケジュールを取得するAPIを呼び出します (例: /api/users/me/schedules)
//                 const scheduleResponse = await fetch('/api/user_schedules');
//                 if (!scheduleResponse.ok) throw new Error('スケジュール情報の取得に失敗しました。');
//                 const scheduleData = await scheduleResponse.json();
//                 setMySchedule(scheduleData);

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         // currentUser情報がある場合のみデータを取得します。
//         if (currentUser) {
//             fetchData();
//         }
//     }, [currentUser]); // currentUserが変更されたときに再取得します。

//     // データ取得中はローディング画面を表示します。
//     if (isLoading) {
//         return <div className="page-container text-center pt-20">読み込み中...</div>;
//     }

//     // エラーが発生した場合、エラーメッセージを表示します。
//     if (error) {
//         return <div className="page-container text-center pt-20 text-red-500">エラー: {error}</div>;
//     }

//     return (
//         <div className="mypage-container">
//             <div className="mypage-header">
//                 <h1>{currentUser ? `${currentUser.name}さん` : 'マイページ'}</h1>
//                 <button
//                     type="button"
//                     className="notification-bell"
//                     aria-label="通知を見る"
//                     onClick={() => navigate('/notifications')}
//                 >
//                     <Bell />
//                     <span className="notification-badge">3</span>
//                 </button>
//             </div>

//             <div className="card">
//                 <h2 className="card-title">
//                     <Calendar />
//                     あなたの予定
//                 </h2>
//                 <ul className="schedule-list">
//                 {mySchedule.length > 0 ? mySchedule.slice(0,3).map((item, index) => (
//                     <li key={index} className="schedule-item">
//                     <span className="date">{new Date(item.start_at).toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}</span>
//                     {/* item.circle_name を削除し、item.title を表示 */}
//                      <span className="event">{item.title}</span>
//                          </li>
//                     )) : <p className="text-gray-500 text-sm">今後の予定はありません。</p>}
//                 </ul>
//             </div>

//             <div className="card">
//                 <h2 className="card-title">参加中のサークル</h2>
//                 <div className="circle-list">
//                     {joinedCircles.length > 0 ? joinedCircles.map(circle => (
//                         <div key={circle.id} onClick={() => onViewCircle(circle)} className="circle-item">
//                             <div className="icon"> {/* アイコン表示は別途実装が必要です */} 💻 </div>
//                             <div className="info">
//                                 <h3>{circle.name}</h3>
//                                 <p>{circle.description}</p>
//                             </div>
//                             <ChevronRight className="arrow" />
//                         </div>
//                     )) : <p className="text-gray-500 text-sm">参加中のサークルはありません。</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default MyPage;

// import React, { useState, useEffect } from 'react';
// // アイコンのインポート方法を、これまでの修正に合わせて変更
// import * as Lucide from 'lucide-react';
// import useSimpleRouter from '../hooks/useSimpleRouter';

// // --- 新しく追加するコンポーネント ---
// // データが空の場合に表示する汎用的なコンポーネント
// const EmptyState = ({ icon, title, message, buttonText, onButtonClick }) => {
//   const Icon = icon;
//   return (
//     <div className="text-center p-8 bg-gray-50 rounded-lg">
//       <div className="flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4">
//         <Icon className="text-gray-500" size={32} />
//       </div>
//       <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
//       <p className="text-gray-500 mt-1 mb-4">{message}</p>
//       {buttonText && onButtonClick && (
//         <button
//           onClick={onButtonClick}
//           className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition-all shadow hover:shadow-md flex items-center mx-auto"
//         >
//           {buttonText}
//           <Lucide.ArrowRight size={16} className="ml-2" />
//         </button>
//       )}
//     </div>
//   );
// };


// const MyPage = ({ onViewCircle, currentUser }) => {
//     const { navigate } = useSimpleRouter();
    
//     const [joinedCircles, setJoinedCircles] = useState([]);
//     const [mySchedule, setMySchedule] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             setError(null);
//             try {
//                 const circlesResponse = await fetch('/api/followed'); 
//                 if (!circlesResponse.ok) throw new Error('サークル情報の取得に失敗しました。');
//                 const circlesData = await circlesResponse.json();
//                 setJoinedCircles(circlesData);

//                 const scheduleResponse = await fetch('/api/user_schedules');
//                 if (!scheduleResponse.ok) throw new Error('スケジュール情報の取得に失敗しました。');
//                 const scheduleData = await scheduleResponse.json();
//                 setMySchedule(scheduleData);

//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         if (currentUser) {
//             fetchData();
//         } else {
//             setIsLoading(false);
//         }
//     }, [currentUser]);

//     if (isLoading) {
//         return <div className="page-container text-center pt-20">読み込み中...</div>;
//     }

//     if (error) {
//         return <div className="page-container text-center pt-20 text-red-500">エラー: {error}</div>;
//     }

//     return (
//         <div className="mypage-container p-4">
//             <div className="mypage-header flex justify-between items-center mb-6">
//                 <h1 className="text-3xl font-bold">{currentUser ? `${currentUser.name}さん` : 'マイページ'}</h1>
//                 <button
//                     type="button"
//                     className="notification-bell relative p-2"
//                     aria-label="通知を見る"
//                     onClick={() => navigate('/notifications')}
//                 >
//                     <Lucide.Bell />
//                     <span className="notification-badge absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
//                 </button>
//             </div>

//             <div className="card bg-white rounded-xl shadow-sm p-5 mb-6">
//                 <h2 className="card-title flex items-center text-xl font-semibold mb-4">
//                     <Lucide.Calendar className="mr-2 text-blue-500" />
//                     あなたの予定
//                 </h2>
//                 {mySchedule.length > 0 ? (
//                     <ul className="schedule-list space-y-3">
//                         {mySchedule.slice(0,3).map((item, index) => (
//                             <li key={index} className="schedule-item flex items-center p-3 bg-blue-50 rounded-lg">
//                                 <span className="date font-semibold text-blue-800 w-28">{new Date(item.start_at).toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })}</span>
//                                 <span className="event text-gray-600">{item.title}</span>
//                             </li>
//                         ))}
//                     </ul>
//                 ) : (
//                     // --- ここを修正 ---
//                     <EmptyState 
//                         icon={Lucide.CalendarPlus}
//                         title="今後の予定はありません"
//                         message="サークルのイベントに参加したり、自分で予定を追加してみましょう。"
//                     />
//                 )}
//             </div>

//             <div className="card bg-white rounded-xl shadow-sm p-5">
//                 <h2 className="card-title flex items-center text-xl font-semibold mb-4">参加中のサークル</h2>
//                 {joinedCircles.length > 0 ? (
//                     <div className="circle-list space-y-4">
//                         {joinedCircles.map(circle => (
//                             <div key={circle.id} onClick={() => onViewCircle(circle)} className="circle-item flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
//                                 <div className="icon text-3xl mr-4">💻</div>
//                                 <div className="info flex-grow">
//                                     <h3 className="font-bold">{circle.name}</h3>
//                                     <p className="text-sm text-gray-500">{circle.description}</p>
//                                 </div>
//                                 <Lucide.ChevronRight className="arrow text-gray-400" />
//                             </div>
//                         ))}
//                     </div>
//                 ) : (
//                     // --- ここを修正 ---
//                     <EmptyState 
//                         icon={Lucide.Search}
//                         title="まだサークルに参加していません"
//                         message="新しい活動を始めてみませんか？"
//                         buttonText="サークルを探す"
//                         onButtonClick={() => navigate('/search')}
//                     />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MyPage;


import React, { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import useSimpleRouter from '../hooks/useSimpleRouter';
import { allCirclesData } from '../data/mockData'; // サークル情報だけをインポート

const EmptyState = ({ icon, title, message, buttonText, onButtonClick }) => {
  const Icon = icon;
  return (
    <div className="text-center p-8 bg-gray-50 rounded-lg">
      <div className="flex justify-center items-center w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4">
        <Icon className="text-gray-500" size={32} />
      </div>
      <h3 className="font-semibold text-lg text-gray-700">{title}</h3>
      <p className="text-gray-500 mt-1 mb-4">{message}</p>
      {buttonText && onButtonClick && (
        <button
          onClick={onButtonClick}
          className="bg-blue-500 text-white font-semibold px-5 py-2 rounded-full hover:bg-blue-600 transition-all shadow hover:shadow-md flex items-center mx-auto"
        >
          {buttonText}
          <Lucide.ArrowRight size={16} className="ml-2" />
        </button>
      )}
    </div>
  );
};


const MyPage = ({ onViewCircle, currentUser }) => {
    const { navigate } = useSimpleRouter();
    
    // --- ここから修正 ---
    // API通信のロジックを削除し、currentUserから直接データを取得するように変更
    const joinedCircles = allCirclesData.filter(circle => 
      currentUser?.joinedCircleIds?.includes(circle.id)
    );
    const mySchedule = currentUser?.schedule || [];
    // --- 修正ここまで ---

    return (
        <div className="mypage-container p-4">
            <div className="mypage-header flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{currentUser ? `${currentUser.name}さん` : 'マイページ'}</h1>
                <button
                    type="button"
                    className="notification-bell relative p-2"
                    aria-label="通知を見る"
                    onClick={() => navigate('/notifications')}
                >
                    <Lucide.Bell />
                    <span className="notification-badge absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
                </button>
            </div>

            <div className="card bg-white rounded-xl shadow-sm p-5 mb-6">
                <h2 className="card-title flex items-center text-xl font-semibold mb-4">
                    <Lucide.Calendar className="mr-2 text-blue-500" />
                    あなたの予定
                </h2>
                {mySchedule.length > 0 ? (
                    <ul className="schedule-list space-y-3">
                        {mySchedule.slice(0,3).map((item, index) => (
                            <li key={index} className="schedule-item flex items-center p-3 bg-blue-50 rounded-lg">
                                <span className="date font-semibold text-blue-800 w-28">{item.date}</span>
                                <span className="event text-gray-600">{item.event}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <EmptyState 
                        icon={Lucide.CalendarPlus}
                        title="今後の予定はありません"
                        message="サークルのイベントに参加したり、自分で予定を追加してみましょう。"
                    />
                )}
            </div>

            <div className="card bg-white rounded-xl shadow-sm p-5">
                <h2 className="card-title flex items-center text-xl font-semibold mb-4">参加中のサークル</h2>
                {joinedCircles.length > 0 ? (
                    <div className="circle-list space-y-4">
                        {joinedCircles.map(circle => (
                            <div key={circle.id} onClick={() => onViewCircle(circle)} className="circle-item flex items-center p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                                <div className="icon text-3xl mr-4">{circle.icon}</div>
                                <div className="info flex-grow">
                                    <h3 className="font-bold">{circle.name}</h3>
                                    <p className="text-sm text-gray-500">{circle.description}</p>
                                </div>
                                <Lucide.ChevronRight className="arrow text-gray-400" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        icon={Lucide.Search}
                        title="まだサークルに参加していません"
                        message="新しい活動を始めてみませんか？"
                        buttonText="サークルを探す"
                        onButtonClick={() => navigate('/search')}
                    />
                )}
            </div>
        </div>
    );
};

export default MyPage;
