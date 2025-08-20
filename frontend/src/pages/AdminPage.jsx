// frontend/src/pages/AdminPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, Users, ShieldCheck } from 'lucide-react';

// 仮のユーザーデータ
const users = [
  { id: 1, name: '田中 太郎' },
  { id: 2, name: '山田 花子' },
  { id: 3, name: '鈴木 一郎' },
];

const AdminPage = ({ onBack }) => {
  const [selectedUser, setSelectedUser] = useState('');
  
  const handleTransfer = () => {
    if (!selectedUser) {
      alert('譲渡するユーザーを選択してください。');
      return;
    }
    // 確認ダイアログ
    if (window.confirm(`本当に ${selectedUser} さんに管理者権限を譲渡しますか？この操作は取り消せません。`)) {
      // ここに権限譲渡のAPIコールなどのロジックを実装
      console.log(`${selectedUser} に権限を譲渡しました。`);
      alert('管理者権限を譲渡しました。');
      setSelectedUser('');
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">管理者ページ</h1>
      </div>
      <div className="p-4">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <ShieldCheck className="mr-2 text-red-500" />
            管理者権限の譲渡
          </h2>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              新しい管理者をリストから選択してください。この操作は元に戻せません。
            </p>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              >
                <option value="" disabled>譲渡先を選択...</option>
                {users.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleTransfer}
              disabled={!selectedUser}
              className="w-full text-center text-white font-semibold py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-all disabled:bg-gray-300"
            >
              権限を譲渡する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;