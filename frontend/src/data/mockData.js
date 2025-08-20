// frontend/src/data/mockData.js
export const allCirclesData = [
  { id: 1, name: 'コーディングサークル "CodeCafe"', description: '毎週水曜の夜に集まって一緒に勉強します。', icon: '💻', image: 'https://placehold.co/400x400/a7c7e7/ffffff?text=Code', category: '学習', isJoined: true },
  { id: 2, name: 'バンドサークル "Rock \'n\' Roll"', description: '音楽を愛する人々の集まり！', icon: '🎸', image: 'https://placehold.co/400x400/f2b5d4/ffffff?text=Band', category: '音楽', isJoined: true },
  { id: 3, name: '写真サークル "Click"', description: '毎週末、撮影に出かけます。', icon: '📷', image: 'https://placehold.co/400x400/c1e1c1/ffffff?text=Photo', category: '文化', isJoined: true },
  { id: 4, name: '料理サークル "Yummy"', description: '美味しい料理を作って、みんなで食べましょう。', icon: '🍳', image: 'https://placehold.co/400x400/ffd1a8/ffffff?text=Cook', category: '文化', isJoined: false },
  { id: 5, name: '運動サークル "Energizer"', description: '一緒に汗を流して健康を維持しましょう！', icon: '🏃', image: 'https://placehold.co/400x400/d4a5a5/ffffff?text=Sport', category: 'スポーツ', isJoined: false },
  { id: 6, name: 'ボランティアサークル "Helper"', description: '地域社会に貢献する活動をしています。', icon: '🤝', image: 'https://placehold.co/400x400/a8d8a8/ffffff?text=Help', category: 'ボランティア', isJoined: false },
  { id: 7, name: '英会話サークル "Chatterbox"', description: 'ネイティブスピーカーと楽しく英会話！', icon: '🇬🇧', image: 'https://placehold.co/400x400/f5f5a2/ffffff?text=Chat', category: '学習', isJoined: false },
  { id: 8, name: 'テニスサークル "Smash"', description: '初心者から経験者まで大歓迎です。', icon: '🎾', image: 'https://placehold.co/400x400/b5e7a0/ffffff?text=Tennis', category: 'スポーツ', isJoined: false },
];

export const mockFullActivities = [
    { id: 1, title: '夏合宿の場所投票結果のお知らせ', date: '2024-08-08', author: '田中 圭', content: '先日行われた夏合宿の場所投票の結果、箱根に決定しました！詳細は追って連絡します。'},
    { id: 2, title: '新入部員歓迎会のレポート', date: '2024-08-05', author: '佐藤 美咲', content: '新入部員歓迎会、大盛況でした！参加してくださった皆さん、ありがとうございました。'},
    { id: 3, title: '7月活動報告と会計報告', date: '2024-08-02', author: '鈴木 一郎', content: '7月の活動報告と会計報告をアップロードしました。各自ご確認ください。'},
    { id: 4, title: '次回の写真撮影テーマについて', date: '2024-07-28', author: '高橋 優子', content: '次回の撮影テーマは「夏の色」です。皆さんのアイデアを募集しています！'},
    { id: 5, title: '部室の掃除当番のお知らせ', date: '2024-07-25', author: '渡辺 健太', content: '今週の掃除当番はBチームです。よろしくお願いします。'},
];

export const mockSchedulesByCircle = {
  1: [ // CodeCafe
    { date: '2024-08-14', event: '定例会' },
    { date: '2024-08-21', event: 'React勉強会' },
    { date: '2024-08-28', event: 'アルゴリズム練習' },
  ],
  2: [ // Rock 'n' Roll
    { date: '2024-08-13', event: 'バンド練習' },
    { date: '2024-08-20', event: 'スタジオ練習' },
    { date: '2024-08-27', event: 'パート練習' },
  ],
  3: [ // Click
    { date: '2024-08-10', event: '撮影会 @都心公園' },
    { date: '2024-08-24', event: '夜景撮影 @横浜' },
  ],
};

export const mockUserstoken = [
  {
    user_id: 1,
    username: '田中 太郎',
    email: 'taro.tanaka@example.com',
    login_id: '20030713',
    password: 'astratr3b',
    //↑本番のデータにはハッシュ化必須かも
    icon_url: 'https://plavehold.co/100x100/87ceeb/ffffff?text=TT',
    is_admin: false,
    created_at: '2024-08-01T12:00:00Z',
    last_login_at: '2024-08-12T15:30:00Z'
  },
  {
  user_id: 2,
  username: '山田 花子',
  email: 'hanako.yamada@example.com',
  login_id: 'super_hanako_001',
  password: 'sunsunflower123',
  icon_url: 'https://placehold.co/100x100/f08080/ffffff?text=HY',
  is_admin: true,
  created_at: '2024-08-02T09:15:00Z',
  last_login_at: '2024-08-12T14:45:00Z'
  },
  {
    id: 3,
    email: 'test@example.com',
    password: 'password123', // 注意: 実際のアプリではパスワードを平文で保存しないでください。←多分、ハッシュ化して保存するという意味
    nameKanji: '山田 太郎',
    nameFurigana: 'ヤマダ タロウ',
    faculty: '情報理工学部',
    studentId: '12345678',
  }
]