import React, { useState } from 'react';
// User, Lock に加えて Eye, EyeOff アイコンをインポート
import { User, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = ({ onLoginSuccess }) => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // --- ここから追加 ---
  // パスワードを表示するかどうかの状態を管理 (初期値は非表示)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // パスワードの表示/非表示を切り替える関数
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  // --- 追加ここまで ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // APIエンドポイントはプロジェクトに合わせて調整してください
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login_id: loginId, password: password }),
      });

      if (response.ok) {
        const user = await response.json();
        onLoginSuccess(user);
      } else {
        setError('ログインIDまたはパスワードが正しくありません。');
      }
    } catch (err) {
      setError('ログイン中にエラーが発生しました。サーバーが起動しているか確認してください。');
    }
  };

  return (
    <div className="login-page-container animate-fade-in">
      <div className="page-header">
        <h1>ログイン</h1>
      </div>
      <div className="page-container">
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="form-group">
            <label htmlFor="loginId">ログインID</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input 
                type="text" 
                id="loginId" 
                className="form-input" 
                placeholder="taro123" 
                value={loginId} 
                onChange={(e) => setLoginId(e.target.value)} 
                required 
              />
            </div>
          </div>

          {/* --- ここからパスワード入力欄を修正 --- */}
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input 
                // isPasswordVisibleの状態に応じてtypeを 'text' か 'password' に切り替える
                type={isPasswordVisible ? 'text' : 'password'} 
                id="password" 
                className="form-input" 
                placeholder="password123" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              {/* 表示切り替えボタンを追加 */}
              <button 
                type="button" 
                onClick={togglePasswordVisibility} 
                className="visibility-toggle-btn"
                aria-label="パスワードの表示を切り替える"
              >
                {/* isPasswordVisibleの状態に応じてアイコンを切り替える */}
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {/* --- 修正ここまで --- */}

          <button type="submit" className="submit-btn">
            ログインする
          </button>
        </form>
        <p className="login-link">
          アカウントをお持ちでないですか？ <a href="#/register">新規登録はこちら</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;