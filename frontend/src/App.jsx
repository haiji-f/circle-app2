// import { useState, useEffect } from "react"; // useEffectをインポート
// import useSimpleRouter from "./hooks/useSimpleRouter";
// import BottomNavBar from "./components/BottomNavBar.jsx";
// import { setCookie, getCookie } from "./utils/cookies";

// // pages
// import MyPage from "./pages/MyPage.jsx";
// import SearchPage from "./pages/SearchPage.jsx";
// import HistoryPage from "./pages/HistoryPage.jsx";
// import SettingsPage from "./pages/SettingsPage.jsx";
// import CirclePage from "./pages/CirclePage.jsx";
// import ActivityListPage from "./pages/ActivityListPage.jsx";
// import SchedulePage from "./pages/SchedulePage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
// import RegisterPage from "./pages/RegisterPage.jsx";
// import NotificationPage from "./pages/NotificationPage.jsx";
// import AdminPage from "./pages/AdminPage.jsx";
// import CircleEditPage from "./pages/CircleEditPage.jsx";

// // data
// import { allCirclesData } from "./data/mockData";

// // App.cssをインポート
// import './App.css';

// // 未ログイン時に表示するコンポーネント
// const LoginPrompt = ({ onNavigate }) => (
//   <div className="page-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
//     <h2 style={{ marginBottom: '1rem' }}>ログインが必要です</h2>
//     <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
//       この機能を利用するにはログインしてください。
//     </p>
//     <button onClick={() => onNavigate('/login')} className="submit-btn" style={{ maxWidth: '200px', margin: '0 auto' }}>
//       ログインページへ
//     </button>
//   </div>
// );

// export default function App() {
//   const { path, navigate } = useSimpleRouter();
//   //const [viewHistory, setViewHistory] = useState([]); 履歴を管理する必要はない

//   //この下の２行をいじって常時ログイン状態を保たせるから動作チェックしたい時はそれを戻してね
//   // const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理
//   // const [currentUser, setCurrentUser] = useState(null); // 現在ログイン中のユーザー情報を管理

// const [isLoggedIn, setIsLoggedIn] = useState(true); // 常にログイン済みにする
// const [currentUser, setCurrentUser] = useState({ name: "開発用ユーザー", email: "dev@example.com" }); // 開発用の仮ユーザー情報を設定

//   // 2. アプリ起動時に一度だけサーバーにログイン状態を確認するuseEffectを追加します
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const response = await fetch('/api/auth/me');
//         if (response.ok) {
//           const user = await response.json();
//           setIsLoggedIn(true);
//           setCurrentUser(user);
//         }
//       } catch (error) {
//         console.error("ログイン状態の確認に失敗:", error);
//       } finally {
//         setIsLoading(false); // 確認が完了したらロード状態を解除
//       }
//     };
//     checkLoginStatus();
//   }, []); // 空の配列[]は、アプリ起動時に一度だけ実行するという意味



//   // ログイン成功時にLoginPageから呼び出される関数
//   const handleLoginSuccess = (user) => {
//     setIsLoggedIn(true);
//     setCurrentUser(user); // ログインしたユーザー情報を保存
//     navigate('/'); // マイページへ遷移
//   };

//   // ユーザーがサークルページに移動するたびに履歴をクッキーに保存します
//   const handleNavigateToCircle = (circle) => {
//     // 1. 既存の履歴をクッキーから読み込みます
//     const history = getCookie('viewHistory') || [];
    
//     // 2. 新しいサークルIDを先頭に追加し、重複を削除します
//     const newHistory = [circle.id, ...history.filter(id => id !== circle.id)];
    
//     // 3. 更新された履歴をクッキーに保存します（例：30日間有効、最新20件まで）
//     setCookie('viewHistory', newHistory.slice(0, 20), 30);

//     navigate(`/circle_page/${circle.id}`);
//   };

//   const renderPage = () => {
//     // ログインしていなくてもアクセスできる公開ページ
//     if (path === '/login') return <LoginPage onLoginSuccess={handleLoginSuccess} />;
//     if (path === '/register') return <RegisterPage />;
//     if (path === '/search') return <SearchPage onViewCircle={handleNavigateToCircle} />;

//     // 以下はログインが必要な保護されたページ
//     if (!isLoggedIn) {
//       return <LoginPrompt onNavigate={navigate} />;
//     }

//     // --- ログイン済みのユーザーのみアクセス可能 ---
//     if (path.startsWith("/circle_page/")) {
//       const parts = path.split("/");
//       const circleId = parseInt(parts[2], 10);
//       const sub = parts[3];
//       const circle = allCirclesData.find((c) => c.id === circleId);
//       if (!circle) return <div className="p-6 text-center text-gray-500">サークル情報が見つかりません。</div>;

//       if (sub === "activities") return <ActivityListPage circle={circle} onBack={() => navigate(`/circle_page/${circleId}`)} />;
//       if (sub === "schedule")   return <SchedulePage     circle={circle} onBack={() => navigate(`/circle_page/${circleId}`)} />;
//       return <CirclePage circle={circle} onBack={() => navigate("/")} onNavigate={navigate} />;
//     }

//     if (path.startsWith("/settings/")) {
//       return <SettingsPage onNavigate={navigate} currentUser={currentUser} />;
//     }

//     switch (path) {
//       case "/history":
//         // HistoryPageにviewHistoryプロパティを渡さないように修正
//       return <HistoryPage onViewCircle={handleNavigateToCircle} />;
//       case "/settings":
//         return <SettingsPage onNavigate={navigate} currentUser={currentUser} />;
//       case "/":
//       default:
//         return <MyPage onViewCircle={handleNavigateToCircle} currentUser={currentUser} />;
//       case "/notifications":
//         return <NotificationPage onBack={() => navigate("/")} />;
//       case "/admin":
//         return <AdminPage onBack={() => navigate("/")} />; 
//       case "/circle_edit":
//         return <CircleEditPage onBack={() => navigate("/")} />;
//     }
//   };

//   // サブページ、または未ログイン状態ではナビゲーションバーを非表示
//   const isSettingsSubPage = path.startsWith('/settings/') && path !== '/settings';

//   const isNavBarHidden = path.startsWith("/circle_page/") || isSettingsSubPage || !isLoggedIn;

//   return (
//     <div className="app-shell">
//       <div className="flex-grow overflow-y-auto pb-20">{renderPage()}</div>
//       {!isNavBarHidden && <BottomNavBar currentPath={path} onNavigate={navigate} />}
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import useSimpleRouter from "./hooks/useSimpleRouter";
import BottomNavBar from "./components/BottomNavBar.jsx";
import { setCookie, getCookie } from "./utils/cookies";

// pages
import MyPage from "./pages/MyPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import CirclePage from "./pages/CirclePage.jsx";
import ActivityListPage from "./pages/ActivityListPage.jsx";
import SchedulePage from "./pages/SchedulePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CircleEditPage from "./pages/CircleEditPage.jsx";

// data
import { allCirclesData } from "./data/mockData";

// App.cssをインポート
import './App.css';

const LoginPrompt = ({ onNavigate }) => (
  <div className="page-container" style={{ textAlign: 'center', paddingTop: '5rem' }}>
    <h2 style={{ marginBottom: '1rem' }}>ログインが必要です</h2>
    <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
      この機能を利用するにはログインしてください。
    </p>
    <button onClick={() => onNavigate('/login')} className="submit-btn" style={{ maxWidth: '200px', margin: '0 auto' }}>
      ログインページへ
    </button>
  </div>
);

export default function App() {
  const { path, navigate } = useSimpleRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ 
    name: "開発用ユーザー", 
    email: "dev@example.com",
    // MyPageで使うデータを仮で追加
    joinedCircleIds: [1, 2],
    schedule: [
        { date: '8月6日 (水)', event: 'CodeCafe 定例会', circleId: 1 },
        { date: '8月9日 (土)', event: 'Rock \'n\' Roll バンド練習', circleId: 2 },
    ]
  });

  // --- ここを修正 ---
  // エラーの原因となっているuseEffectを削除またはコメントアウトします
  /*
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const user = await response.json();
          setIsLoggedIn(true);
          setCurrentUser(user);
        }
      } catch (error) {
        console.error("ログイン状態の確認に失敗:", error);
      } finally {
        // setIsLoading is not defined here
      }
    };
    checkLoginStatus();
  }, []);
  */
  // --- 修正ここまで ---

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    navigate('/');
  };

  const handleNavigateToCircle = (circle) => {
    const history = getCookie('viewHistory') || [];
    const newHistory = [circle.id, ...history.filter(id => id !== circle.id)];
    setCookie('viewHistory', newHistory.slice(0, 20), 30);
    navigate(`/circle_page/${circle.id}`);
  };

  const renderPage = () => {
    if (path === '/login') return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    if (path === '/register') return <RegisterPage />;
    if (path === '/search') return <SearchPage onViewCircle={handleNavigateToCircle} />;

    if (!isLoggedIn) {
      return <LoginPrompt onNavigate={navigate} />;
    }

    if (path.startsWith("/circle_page/")) {
      const parts = path.split("/");
      const circleId = parseInt(parts[2], 10);
      const sub = parts[3];
      const circle = allCirclesData.find((c) => c.id === circleId);
      if (!circle) return <div className="p-6 text-center text-gray-500">サークル情報が見つかりません。</div>;

      if (sub === "activities") return <ActivityListPage circle={circle} onBack={() => navigate(`/circle_page/${circleId}`)} />;
      if (sub === "schedule")   return <SchedulePage     circle={circle} onBack={() => navigate(`/circle_page/${circleId}`)} />;
      return <CirclePage circle={circle} onBack={() => navigate("/")} onNavigate={navigate} />;
    }

    if (path.startsWith("/settings/")) {
      return <SettingsPage onNavigate={navigate} currentUser={currentUser} />;
    }

    switch (path) {
      case "/history":
        return <HistoryPage onViewCircle={handleNavigateToCircle} />;
      case "/settings":
        return <SettingsPage onNavigate={navigate} currentUser={currentUser} />;
      case "/":
      default:
        return <MyPage onViewCircle={handleNavigateToCircle} currentUser={currentUser} />;
      case "/notifications":
        return <NotificationPage onBack={() => navigate("/")} />;
      case "/admin":
        return <AdminPage onBack={() => navigate("/")} />; 
      case "/circle_edit":
        return <CircleEditPage onBack={() => navigate("/")} />;
    }
  };

  const isSettingsSubPage = path.startsWith('/settings/') && path !== '/settings';
  const isNavBarHidden = path.startsWith("/circle_page/") || isSettingsSubPage || !isLoggedIn;

  return (
    <div className="app-shell">
      <div className="flex-grow overflow-y-auto pb-20">{renderPage()}</div>
      {!isNavBarHidden && <BottomNavBar currentPath={path} onNavigate={navigate} />}
    </div>
  );
}
