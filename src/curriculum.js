
const stages = [
  {
    id: 1,
    name: 'Từ vựng',
    description: 'Học chữ Hán, Pinyin, nghĩa và phát âm',
    icon: '📚'
  },
  {
    id: 2,
    name: 'Nghe và nhận diện',
    description: 'Nghe âm thanh và nhận biết từ',
    icon: '🎧'
  },
  {
    id: 3,
    name: 'Ngữ pháp',
    description: 'Hiểu cấu trúc và cách sử dụng câu',
    icon: '📖'
  },
  {
    id: 4,
    name: 'Ghép câu và luyện viết',
    description: 'Sắp xếp câu và luyện viết chữ Hán',
    icon: '✍️'
  },
  {
    id: 5,
    name: 'Kiểm tra tổng hợp',
    description: 'Kiểm tra kiến thức toàn bài',
    icon: '🏆'
  }
]

export const curriculum = [
  {
    level: 'HSK 1',
    book: 'New HSK Course 1',
    totalLessons: 15,
    lessons: [
      { id: 1, title: 'AI小语，你好！', vietnamese: 'AI Tiểu Ngữ, xin chào!' },
      { id: 2, title: '我叫李文', vietnamese: 'Tôi tên là Lý Văn' },
      { id: 3, title: '我是中国人', vietnamese: 'Tôi là người Trung Quốc' },
      { id: 4, title: '我有两个孩子', vietnamese: 'Tôi có hai người con' },
      { id: 5, title: '今天我休息', vietnamese: 'Hôm nay tôi nghỉ' },
      { id: 6, title: '你的手机号是多少？', vietnamese: 'Số điện thoại của bạn là bao nhiêu?' },
      { id: 7, title: '我晚上六点半下班', vietnamese: 'Tôi tan làm lúc 6 giờ 30 tối' },
      { id: 8, title: '我爸爸也在医院工作', vietnamese: 'Bố tôi cũng làm việc ở bệnh viện' },
      { id: 9, title: '我明天上午在学校学习', vietnamese: 'Sáng mai tôi học ở trường' },
      { id: 10, title: '这儿的苹果真便宜！', vietnamese: 'Táo ở đây thật rẻ!' },
      { id: 11, title: '我读大学呢', vietnamese: 'Tôi đang học đại học' },
      { id: 12, title: '昨天下雪了', vietnamese: 'Hôm qua trời đã có tuyết' },
      { id: 13, title: '请给我一杯茶', vietnamese: 'Vui lòng cho tôi một tách trà' },
      { id: 14, title: '我看了一个电影', vietnamese: 'Tôi đã xem một bộ phim' },
      { id: 15, title: '大兴机场见！', vietnamese: 'Hẹn gặp ở sân bay Đại Hưng!' }
    ].map((lesson, index) => ({
      ...lesson,
      level: 'HSK 1',
      stages,
      order: index + 1,
      passingScore: 80,
      unlocked: index === 0
    }))
  }
]

export { stages }
