import { lesson01 } from './lessons/HSK3/lesson-01.js'
export const stages = [
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
  },
  {
    level: 'HSK 3',
    book: 'Panda World HSK 3',
    totalLessons: 20,
    lessons: [
      { id: 1, title: '谈人物特征', vietnamese: 'Bàn về đặc trưng nhân vật' },
      { id: 2, title: '谈家乡', vietnamese: 'Bàn về quê hương' },
      { id: 3, title: '谈生活习惯', vietnamese: 'Bàn về thói quen cuộc sống' },
      { id: 4, title: '谈住房', vietnamese: 'Bàn về nhà ở' },
      { id: 5, title: '谈考试', vietnamese: 'Bàn về thi cử' },
      { id: 6, title: '谈购物', vietnamese: 'Bàn về mua sắm' },
      { id: 7, title: '谈假日经历', vietnamese: 'Bàn về trải nghiệm ngày nghỉ' },
      { id: 8, title: '各有所爱', vietnamese: 'Mỗi người có sở thích riêng' },
      { id: 9, title: '谈职业', vietnamese: 'Bàn về nghề nghiệp' },
      { id: 10, title: '谈旅行计划', vietnamese: 'Bàn về kế hoạch du lịch' },
      { id: 11, title: '谈休闲娱乐', vietnamese: 'Bàn về vui chơi giải trí' },
      { id: 12, title: '谈时尚', vietnamese: 'Bàn về thời thượng' },
      { id: 13, title: '售后服务', vietnamese: 'Dịch vụ sau bán hàng' },
      { id: 14, title: '祝贺', vietnamese: 'Chúc mừng' },
      { id: 15, title: '谈压力', vietnamese: 'Bàn về áp lực' },
      { id: 16, title: '网络与手机', vietnamese: 'Mạng internet và điện thoại' },
      { id: 17, title: '谈私家车', vietnamese: 'Bàn về xe tư nhân' },
      { id: 18, title: '环境', vietnamese: 'Môi trường' },
      { id: 19, title: '地理', vietnamese: 'Địa lý' },
      { id: 20, title: '历史', vietnamese: 'Lịch sử' }
    ].map((lesson, index) => ({
      ...lesson,
      level: 'HSK 3',
      stages,
      order: index + 1,
      passingScore: 80,
      unlocked: index === 0,
      // Liên kết dữ liệu bài học
      content: index === 0 ? lesson01 : null
    }))
  }
]
