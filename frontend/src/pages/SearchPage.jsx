// frontend/src/pages/SearchPage.jsx
import React, { useState } from "react";
import {
  Search,
  ChevronRight,
  Users2,
  Award,
  BookOpen,
  Music,
  Users,
} from "lucide-react";
import { allCirclesData } from "../data/mockData";

const SearchPage = ({ onViewCircle }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");
  const categories = [
    { name: "すべて", icon: Users2 },
    { name: "スポーツ", icon: Award },
    { name: "文化", icon: BookOpen },
    { name: "音楽", icon: Music },
    { name: "学習", icon: BookOpen },
    { name: "ボランティア", icon: Users },
  ];
  const filteredCircles = allCirclesData.filter(
    (c) =>
      (selectedCategory === "すべて" || c.category === selectedCategory) &&
      c.name.toLowerCase().includes(keyword.toLowerCase())
  );
  return (
    <div className="p-4 animate-fade-in">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">サークル検索</h1>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="サークル名で検索..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white rounded-full border-2 border-transparent focus:border-blue-500 focus:outline-none transition-all shadow-sm"
        />
      </div>
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold flex items-center transition-all ${
                selectedCategory === cat.name
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              <cat.icon size={16} className="mr-2" />
              {cat.name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-600 mb-3">検索結果</h2>
        <div className="space-y-3">
          {filteredCircles.length > 0 ? (
            filteredCircles.map((circle) => (
              <div
                key={circle.id}
                onClick={() => onViewCircle(circle)}
                className="flex items-center p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors shadow-sm"
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
            <div className="text-center py-10 text-gray-500">
              <p>該当するサークルが見つかりません。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
