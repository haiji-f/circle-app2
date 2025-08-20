import React from 'react';
import { ChevronRight } from 'lucide-react';

// App.jsxからcurrentUserを受け取るように変更
const SettingsPage = ({ onNavigate, currentUser }) => {
    const settingsItems = [
        { name: 'プロフィール編集', action: () => onNavigate('/settings/profile') },
        { name: '通知設定', action: () => onNavigate('/settings/notifications') },
        { name: 'お問い合わせ', action: () => onNavigate('/settings/contact') },
        { name: 'ヘルプ', action: () => onNavigate('/settings/help') },
        { name: 'ログアウト', action: () => {}, isDestructive: true },
    ];
    
    return (
    <div className="animate-fade-in bg-gray-50 h-full">
        <div className="p-4 bg-white border-b"><h1 className="text-3xl font-bold text-gray-800">設定</h1></div>
        
        {/* currentUserが存在する場合のみプロフィール情報を表示 */}
        {currentUser && (
            <div className="p-4 flex items-center space-x-4 mt-4">
                <img src="https://placehold.co/100x100/e2e8f0/334155?text=User" alt="User" className="w-20 h-20 rounded-full" />
                <div>
                    <p className="font-bold text-xl text-gray-800">{currentUser.name}</p>
                    <p className="text-gray-500">{currentUser.email}</p>
                </div>
            </div>
        )}

        <div className="mt-6 mx-2 bg-white rounded-lg shadow-sm">
            {settingsItems.map((item, index, arr) => (
                <div key={item.name} onClick={item.action} className={`flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${index !== arr.length - 1 ? 'border-b' : ''} ${item.isDestructive ? 'text-red-500' : 'text-gray-700'}`}>
                    <span className="text-lg">{item.name}</span>
                    {!item.isDestructive && <ChevronRight className="text-gray-400" />}
                </div>
            ))}
        </div>
    </div>
    );
};

export default SettingsPage;
