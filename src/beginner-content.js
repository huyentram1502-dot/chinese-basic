
// ==========================================
// PANDA BEGINNER - CHƯƠNG TRÌNH NHẬP MÔN
// ==========================================

// 1. DANH SÁCH 21 THANH MẪU (声母)
export const initials = [
  { id: 1, hanzi: 'b', pronunciation: 'b', guide: 'Hai môi khép lại, bật hơi nhẹ.', example: 'bā' },
  { id: 2, hanzi: 'p', pronunciation: 'p', guide: 'Hai môi khép lại rồi bật luồng hơi mạnh.', example: 'pā' },
  { id: 3, hanzi: 'm', pronunciation: 'm', guide: 'Hai môi khép lại, phát âm qua mũi.', example: 'mā' },
  { id: 4, hanzi: 'f', pronunciation: 'f', guide: 'Răng trên chạm nhẹ môi dưới.', example: 'fā' },
  { id: 5, hanzi: 'd', pronunciation: 'd', guide: 'Đầu lưỡi chạm lợi trên, bật âm không bật hơi.', example: 'dā' },
  { id: 6, hanzi: 't', pronunciation: 't', guide: 'Đầu lưỡi chạm lợi trên, bật hơi mạnh.', example: 'tā' },
  { id: 7, hanzi: 'n', pronunciation: 'n', guide: 'Đầu lưỡi chạm lợi trên, âm đi qua mũi.', example: 'nā' },
  { id: 8, hanzi: 'l', pronunciation: 'l', guide: 'Đầu lưỡi chạm lợi trên, luồng hơi đi hai bên.', example: 'lā' },
  { id: 9, hanzi: 'g', pronunciation: 'g', guide: 'Cuống lưỡi chạm ngạc mềm, không bật hơi.', example: 'gā' },
  { id: 10, hanzi: 'k', pronunciation: 'k', guide: 'Cuống lưỡi chạm ngạc mềm, bật hơi mạnh.', example: 'kā' },
  { id: 11, hanzi: 'h', pronunciation: 'h', guide: 'Phát âm từ cổ họng, hơi thoát ra.', example: 'hā' },
  { id: 12, hanzi: 'j', pronunciation: 'j', guide: 'Đầu lưỡi đặt thấp, mặt lưỡi nâng gần ngạc cứng.', example: 'jī' },
  { id: 13, hanzi: 'q', pronunciation: 'q', guide: 'Vị trí giống j nhưng bật hơi mạnh.', example: 'qī' },
  { id: 14, hanzi: 'x', pronunciation: 'x', guide: 'Mặt lưỡi nâng gần ngạc cứng, tạo âm xát.', example: 'xī' },
  { id: 15, hanzi: 'zh', pronunciation: 'zh', guide: 'Đầu lưỡi cong nhẹ về phía sau.', example: 'zhī' },
  { id: 16, hanzi: 'ch', pronunciation: 'ch', guide: 'Giống zh nhưng bật hơi mạnh.', example: 'chī' },
  { id: 17, hanzi: 'sh', pronunciation: 'sh', guide: 'Đầu lưỡi cong nhẹ, tạo âm xát.', example: 'shī' },
  { id: 18, hanzi: 'r', pronunciation: 'r', guide: 'Đầu lưỡi cong nhẹ, phát âm hữu thanh.', example: 'rì' },
  { id: 19, hanzi: 'z', pronunciation: 'z', guide: 'Đầu lưỡi gần răng trên, không bật hơi.', example: 'zī' },
  { id: 20, hanzi: 'c', pronunciation: 'c', guide: 'Giống z nhưng bật hơi mạnh.', example: 'cī' },
  { id: 21, hanzi: 's', pronunciation: 's', guide: 'Đưa luồng hơi qua khe giữa lưỡi và răng.', example: 'sī' }
]

// 2. VẬN MẪU (韵母)
export const finals = [
  {
    group: 'Vận mẫu đơn',
    items: [
      { pinyin: 'a', example: 'ā', guide: 'Miệng mở rộng.' },
      { pinyin: 'o', example: 'ō', guide: 'Môi tròn.' },
      { pinyin: 'e', example: 'ē', guide: 'Miệng mở vừa, lưỡi lùi về sau.' },
      { pinyin: 'i', example: 'ī', guide: 'Khóe miệng kéo sang hai bên.' },
      { pinyin: 'u', example: 'ū', guide: 'Môi tròn và nhô ra.' },
      { pinyin: 'ü', example: 'ǖ', guide: 'Môi tròn, lưỡi giữ vị trí âm i.' }
    ]
  },
  {
    group: 'Vận mẫu kép',
    items: [
      { pinyin: 'ai', example: 'ài', guide: 'Chuyển từ a sang i.' },
      { pinyin: 'ei', example: 'éi', guide: 'Chuyển từ e sang i.' },
      { pinyin: 'ui', example: 'uǐ', guide: 'Chuyển từ u sang i.' },
      { pinyin: 'ao', example: 'ǎo', guide: 'Chuyển từ a sang o.' },
      { pinyin: 'ou', example: 'òu', guide: 'Chuyển từ o sang u.' },
      { pinyin: 'iu', example: 'iú', guide: 'Chuyển từ i sang ou.' }
    ]
  },
  {
    group: 'Vận mẫu mũi',
    items: [
      { pinyin: 'an', example: 'ān', guide: 'Kết thúc bằng âm mũi n.' },
      { pinyin: 'en', example: 'ēn', guide: 'Kết thúc bằng âm mũi n.' },
      { pinyin: 'in', example: 'īn', guide: 'Âm i kết thúc bằng n.' },
      { pinyin: 'un', example: 'ūn', guide: 'Âm u kết thúc bằng n.' },
      { pinyin: 'ün', example: 'ǖn', guide: 'Âm ü kết thúc bằng n.' },
      { pinyin: 'ang', example: 'áng', guide: 'Kết thúc bằng âm mũi ng.' },
      { pinyin: 'eng', example: 'ēng', guide: 'Kết thúc bằng âm mũi ng.' },
      { pinyin: 'ing', example: 'īng', guide: 'Âm i kết thúc bằng ng.' },
      { pinyin: 'ong', example: 'ōng', guide: 'Âm o kết thúc bằng ng.' }
    ]
  }
]

// 3. BỐN THANH ĐIỆU VÀ THANH NHẸ
export const tones = [
  {
    id: 1,
    name: 'Thanh 1',
    symbol: 'ā',
    contour: '55',
    description: 'Cao và ngang, giữ giọng ổn định.',
    example: 'mā',
    meaning: 'Mẹ'
  },
  {
    id: 2,
    name: 'Thanh 2',
    symbol: 'á',
    contour: '35',
    description: 'Giọng đi lên giống ngữ điệu hỏi nhẹ.',
    example: 'má',
    meaning: 'Cây gai'
  },
  {
    id: 3,
    name: 'Thanh 3',
    symbol: 'ǎ',
    contour: '214',
    description: 'Giọng xuống thấp rồi đi lên; trong lời nói thực tế thường biến điệu.',
    example: 'mǎ',
    meaning: 'Ngựa'
  },
  {
    id: 4,
    name: 'Thanh 4',
    symbol: 'à',
    contour: '51',
    description: 'Giọng đi xuống nhanh và dứt khoát.',
    example: 'mà',
    meaning: 'Mà'
  },
  {
    id: 5,
    name: 'Thanh nhẹ',
    symbol: 'ma',
    contour: 'nhẹ',
    description: 'Đọc nhẹ, ngắn, không nhấn mạnh.',
    example: 'ma',
    meaning: 'Trợ từ nghi vấn'
  }
]

// 4. CÁC BÀI LUYỆN GHÉP PINYIN
export const pinyinExercises = [
  {
    id: 1,
    initial: 'b',
    final: 'ā',
    answer: 'bā',
    meaning: 'Tám'
  },
  {
    id: 2,
    initial: 'm',
    final: 'ā',
    answer: 'mā',
    meaning: 'Mẹ'
  },
  {
    id: 3,
    initial: 'n',
    final: 'ǐ',
    answer: 'nǐ',
    meaning: 'Bạn'
  },
  {
    id: 4,
    initial: 'h',
    final: 'ǎo',
    answer: 'hǎo',
    meaning: 'Tốt'
  },
  {
    id: 5,
    initial: 'd',
    final: 'à',
    answer: 'dà',
    meaning: 'To, lớn'
  }
]

// 5. HỘI THOẠI CƠ BẢN
export const beginnerConversations = [
  {
    id: 1,
    hanzi: '你好！',
    pinyin: 'Nǐ hǎo!',
    meaning: 'Xin chào!',
    reply: '你好！',
    replyPinyin: 'Nǐ hǎo!',
    replyMeaning: 'Xin chào!'
  },
  {
    id: 2,
    hanzi: '谢谢你！',
    pinyin: 'Xièxie nǐ!',
    meaning: 'Cảm ơn bạn!',
    reply: '不客气！',
    replyPinyin: 'Bú kèqi!',
    replyMeaning: 'Không có gì!'
  },
  {
    id: 3,
    hanzi: '再见！',
    pinyin: 'Zàijiàn!',
    meaning: 'Tạm biệt!',
    reply: '明天见！',
    replyPinyin: 'Míngtiān jiàn!',
    replyMeaning: 'Ngày mai gặp lại!'
  },
  {
    id: 4,
    hanzi: '我叫小明。',
    pinyin: 'Wǒ jiào Xiǎomíng.',
    meaning: 'Tôi tên là Tiểu Minh.',
    reply: '你叫什么名字？',
    replyPinyin: 'Nǐ jiào shénme míngzi?',
    replyMeaning: 'Bạn tên là gì?'
  }
]

// 6. LỘ TRÌNH 10 BÀI NHẬP MÔN
export const beginnerLessons = [
  {
    id: 1,
    title: 'Làm quen với Pinyin',
    description: 'Tìm hiểu Pinyin và cách đọc tiếng Trung.',
    icon: '🔤',
    type: 'intro'
  },
  {
    id: 2,
    title: '21 thanh mẫu',
    description: 'Học cách phát âm các phụ âm tiếng Trung.',
    icon: '🗣️',
    type: 'initials'
  },
  {
    id: 3,
    title: 'Vận mẫu đơn',
    description: 'Luyện sáu nguyên âm cơ bản.',
    icon: '🎵',
    type: 'finals'
  },
  {
    id: 4,
    title: 'Vận mẫu kép',
    description: 'Luyện cách kết hợp các nguyên âm.',
    icon: '🎼',
    type: 'finals'
  },
  {
    id: 5,
    title: 'Vận mẫu mũi',
    description: 'Phân biệt âm cuối n và ng.',
    icon: '👃',
    type: 'finals'
  },
  {
    id: 6,
    title: 'Bốn thanh điệu',
    description: 'Nhận biết và luyện năm thanh điệu.',
    icon: '🎶',
    type: 'tones'
  },
  {
    id: 7,
    title: 'Ghép âm Pinyin',
    description: 'Kết hợp thanh mẫu, vận mẫu và thanh điệu.',
    icon: '🧩',
    type: 'blending'
  },
  {
    id: 8,
    title: 'Luyện nghe và nhận diện',
    description: 'Nghe và chọn âm Pinyin chính xác.',
    icon: '🎧',
    type: 'listening'
  },
  {
    id: 9,
    title: 'Làm quen chữ Hán',
    description: 'Nhận biết một số chữ Hán thường gặp.',
    icon: '✍️',
    type: 'hanzi'
  },
  {
    id: 10,
    title: 'Giao tiếp đầu tiên',
    description: 'Thực hành những câu tiếng Trung đơn giản.',
    icon: '💬',
    type: 'conversation'
  }
]
