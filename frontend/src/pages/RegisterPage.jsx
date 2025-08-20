import React, { useState } from 'react';
import { User, Book, Hash, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameKanji, setNameKanji] = useState('');
  const [nameFurigana, setNameFurigana] = useState('');
  const [faculty, setFaculty] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // エラーメッセージをリセット

    // バリデーションチェック
    if (!validateEmail(email)) {
      setError('有効なメールアドレスを入力してください。');
      return;
    }
    if (password.length < 8) {
      setError('パスワードは8文字以上で設定してください。');
      return;
    }
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      return;
    }

    // ここでフォームの送信処理を実装します
    alert(`登録情報:\nメールアドレス: ${email}\n名前 (漢字): ${nameKanji}\nフリガナ: ${nameFurigana}\n学部: ${faculty}\n学生番号: ${studentId}`);
  };

  return (
    <div className="login-page-container animate-fade-in">
      <div className="page-header">
        <h1>新規登録</h1>
      </div>
      <div className="page-container">
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
          
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input type="email" id="email" className="form-input" placeholder="example@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">パスワード (8文字以上)</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input type="password" id="password" className="form-input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">パスワード確認</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input type="password" id="confirmPassword" className="form-input" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nameKanji">名前 (漢字)</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input type="text" id="nameKanji" className="form-input" placeholder="山田 太郎" value={nameKanji} onChange={(e) => setNameKanji(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nameFurigana">フリガナ</label>
            <div className="input-wrapper">
              <User className="input-icon" size={20} />
              <input type="text" id="nameFurigana" className="form-input" placeholder="ヤマダ タロウ" value={nameFurigana} onChange={(e) => setNameFurigana(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="faculty">学部</label>
            <div className="input-wrapper">
              <Book className="input-icon" size={20} />
              <input type="text" id="faculty" className="form-input" placeholder="情報理工学部" value={faculty} onChange={(e) => setFaculty(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="studentId">学生番号</label>
            <div className="input-wrapper">
              <Hash className="input-icon" size={20} />
              <input type="text" id="studentId" className="form-input" placeholder="12345678" value={studentId} onChange={(e) => setStudentId(e.target.value)} required />
            </div>
          </div>

          <button type="submit" className="submit-btn">
            登録する
          </button>
        </form>
        <p className="login-link">
          すでにアカウントをお持ちですか？ <a href="#/login">ログイン</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
