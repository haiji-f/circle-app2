// frontend/src/pages/ActivityListPage.jsx
import React from "react";
import { ArrowLeft } from "lucide-react";
import { mockFullActivities } from "../data/mockData";

const ActivityListPage = ({ onBack }) => (
  <div className="animate-fade-in">
    <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b flex items-center">
      <button onClick={onBack} className="mr-4 text-gray-600">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-800">活動一覧</h1>
    </div>
    <div className="p-4 space-y-4">
      {mockFullActivities.map((activity) => (
        <div key={activity.id} className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-bold text-lg text-gray-800">
              {activity.title}
            </h2>
          </div>
          <p className="text-gray-600 mb-3">{activity.content}</p>
          <div className="text-xs text-gray-400 flex justify-between">
            <span>作成者: {activity.author}</span>
            <span>{activity.date}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityListPage;
