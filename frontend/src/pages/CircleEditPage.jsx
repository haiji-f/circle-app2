
// frontend/src/pages/CircleEditPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, Edit3, Image as ImageIcon, Save } from 'lucide-react';

const CircleEditPage = ({ circle, onBack }) => {
  const [name, setName] = useState(circle.name);
  const [description, setDescription] = useState(circle.description);
  const [imagePreview, setImagePreview] = useState(circle.image);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // ここにサークル情報を更新するAPIコールを実装
    console.log('Saving data:', { name, description, image: imagePreview });
    alert('サークル情報を更新しました。');
    onBack();
  };

  return (
    <div className="animate-fade-in">
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm z-10 p-4 border-b flex items-center">
        <button onClick={onBack} className="mr-4 text-gray-600">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">サークル情報編集</h1>
      </div>
      <div className="p-4 space-y-6">
        {/* 写真登録 */}
        <div className="bg-white p-5 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center justify-center">
            <ImageIcon className="mr-2 text-green-500" />
            写真登録
          </h2>
          <img
            src={imagePreview}
            alt="サークルアイコン"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-100"
          />
          <button
            className="w-full text-center text-blue-600 font-semibold py-2 hover:bg-blue-50 rounded-lg border-2 border-blue-500 transition-all"
            onClick={() => document.getElementById('imageUpload').click()}
          >
            画像を変更
          </button>
          <input
            type="file"
            id="imageUpload"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        {/* サークル情報編集 */}
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
            <Edit3 className="mr-2 text-blue-500" />
            情報編集
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">サークル名</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">サークルの説明</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all"
              ></textarea>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center text-center text-white font-semibold py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
        >
          <Save className="mr-2" size={20} />
          保存する
        </button>
      </div>
    </div>
  );
};

export default CircleEditPage;