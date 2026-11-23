
export const writingExercises = [
  { id: 1, hanzi: '你好', pinyin: 'nǐ hǎo', meaning: 'Xin chào' },
  { id: 2, hanzi: '谢谢', pinyin: 'xièxie', meaning: 'Cảm ơn' },
  { id: 3, hanzi: '再见', pinyin: 'zàijiàn', meaning: 'Tạm biệt' },
  { id: 4, hanzi: '中国', pinyin: 'Zhōngguó', meaning: 'Trung Quốc' },
  { id: 5, hanzi: '学生', pinyin: 'xuésheng', meaning: 'Học sinh, sinh viên' },
  { id: 6, hanzi: '老师', pinyin: 'lǎoshī', meaning: 'Giáo viên' },
  { id: 7, hanzi: '朋友', pinyin: 'péngyou', meaning: 'Bạn bè' },
  { id: 8, hanzi: '学习', pinyin: 'xuéxí', meaning: 'Học tập' }
]

export const sentenceExercises = [
  {
    id: 1,
    meaning: 'Tôi là học sinh.',
    words: ['学生。', '我', '是'],
    answer: ['我', '是', '学生。'],
    explanation: 'Cấu trúc: Chủ ngữ + 是 + Danh từ.'
  },
  {
    id: 2,
    meaning: 'Tôi uống nước.',
    words: ['水。', '喝', '我'],
    answer: ['我', '喝', '水。'],
    explanation: 'Cấu trúc: Chủ ngữ + Động từ + Tân ngữ.'
  },
  {
    id: 3,
    meaning: 'Anh ấy là bạn của tôi.',
    words: ['朋友。', '他', '是', '我的'],
    answer: ['他', '是', '我的', '朋友。'],
    explanation: '我的 nghĩa là của tôi, đứng trước danh từ.'
  },
  {
    id: 4,
    meaning: 'Mẹ tôi rất tốt.',
    words: ['很好。', '妈妈', '我', '的'],
    answer: ['我', '的', '妈妈', '很好。'],
    explanation: '我的妈妈 = mẹ của tôi. 很 đứng trước tính từ.'
  },
  {
    id: 5,
    meaning: 'Bạn có khỏe không?',
    words: ['吗？', '你', '好'],
    answer: ['你', '好', '吗？'],
    explanation: 'Câu hỏi với 吗 đặt 吗 ở cuối câu.'
  }
]

export const grammarLessons = [
  {
    id: 1,
    title: 'Câu khẳng định với 是',
    level: 'HSK 1',
    formula: 'Chủ ngữ + 是 + Danh từ',
    explanation: '是 (shì) có nghĩa là “là”, dùng để giới thiệu hoặc xác định một người, sự vật.',
    examples: [
      {
        hanzi: '我是学生。',
        pinyin: 'Wǒ shì xuésheng.',
        meaning: 'Tôi là học sinh.'
      },
      {
        hanzi: '他是老师。',
        pinyin: 'Tā shì lǎoshī.',
        meaning: 'Anh ấy là giáo viên.'
      }
    ]
  },
  {
    id: 2,
    title: 'Câu phủ định với 不',
    level: 'HSK 1',
    formula: 'Chủ ngữ + 不 + Động từ / Tính từ',
    explanation: '不 (bù) có nghĩa là “không”, thường đứng trước động từ hoặc tính từ.',
    examples: [
      {
        hanzi: '我不是老师。',
        pinyin: 'Wǒ bú shì lǎoshī.',
        meaning: 'Tôi không phải giáo viên.'
      },
      {
        hanzi: '我不好。',
        pinyin: 'Wǒ bù hǎo.',
        meaning: 'Tôi không khỏe / không tốt.'
      }
    ]
  },
  {
    id: 3,
    title: 'Câu hỏi với 吗',
    level: 'HSK 1',
    formula: 'Câu khẳng định + 吗？',
    explanation: '吗 (ma) đặt ở cuối câu để biến câu khẳng định thành câu hỏi có/không.',
    examples: [
      {
        hanzi: '你好吗？',
        pinyin: 'Nǐ hǎo ma?',
        meaning: 'Bạn khỏe không?'
      },
      {
        hanzi: '你是学生吗？',
        pinyin: 'Nǐ shì xuésheng ma?',
        meaning: 'Bạn là học sinh phải không?'
      }
    ]
  },
  {
    id: 4,
    title: 'Sở hữu với 的',
    level: 'HSK 1',
    formula: 'Người sở hữu + 的 + Danh từ',
    explanation: '的 (de) dùng để biểu thị quan hệ sở hữu, tương tự từ “của” trong tiếng Việt.',
    examples: [
      {
        hanzi: '我的朋友。',
        pinyin: 'Wǒ de péngyou.',
        meaning: 'Bạn của tôi.'
      },
      {
        hanzi: '我的妈妈。',
        pinyin: 'Wǒ de māma.',
        meaning: 'Mẹ của tôi.'
      }
    ]
  },
  {
    id: 5,
    title: 'Trạng từ 很',
    level: 'HSK 1',
    formula: 'Chủ ngữ + 很 + Tính từ',
    explanation: '很 (hěn) thường đứng trước tính từ, có thể mang nghĩa “rất” hoặc làm từ nối tự nhiên trong câu miêu tả.',
    examples: [
      {
        hanzi: '我很好。',
        pinyin: 'Wǒ hěn hǎo.',
        meaning: 'Tôi rất khỏe.'
      },
      {
        hanzi: '她很漂亮。',
        pinyin: 'Tā hěn piàoliang.',
        meaning: 'Cô ấy rất xinh đẹp.'
      }
    ]
  }
]
