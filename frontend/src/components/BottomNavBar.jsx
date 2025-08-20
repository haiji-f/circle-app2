// frontend/src/components/BottomNavBar.jsx
import React from 'react';
import { Home, Search, Settings, Clock } from 'lucide-react';

const BottomNavBar = ({ currentPath, onNavigate }) => {
  const navItems = [
    { path: '/', icon: Home, label: 'マイページ' },
    { path: '/search', icon: Search, label: '検索' },
    { path: '/history', icon: Clock, label: '履歴' },
    { path: '/settings', icon: Settings, label: '設定' },
  ];
  return (<div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]"><div className="flex justify-around items-center h-16">{navItems.map(item => { const isActive = currentPath === item.path; const Icon = item.icon; return (<button key={item.path} onClick={() => onNavigate(item.path)} className={`flex flex-col items-center justify-center w-full transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'}`}><Icon size={24} strokeWidth={isActive ? 2.5 : 2} /><span className={`text-xs mt-1 font-semibold ${isActive ? 'font-bold' : ''}`}>{item.label}</span></button>);})}</div></div>);
};

export default BottomNavBar;