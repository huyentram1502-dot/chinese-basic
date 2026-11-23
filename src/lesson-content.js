
import { vocabulary } from './vocabulary.js'

// Nội dung học tập theo từng bài
export const lessonContent = {
  'HSK 1': {
    1: {
      title: 'AI小语，你好！',
      vietnamese: 'AI Tiểu Ngữ, xin chào!',

      // Chặng 1: Từ vựng
      vocabulary: vocabulary.filter(
        word => word.level === 'HSK 1' && word.lesson === 1
      ),

      // Chặng 2: Nghe và nhận diện
      listening: [
        {
          id: 1,
          question: 'Nghe phát âm và chọn nghĩa đúng.',
          audio: '你好',
          options: ['Xin chào', 'Cảm ơn', 'Tạm biệt'],
          answer: 'Xin chào'
        },
        {
          id: 2,
          question: 'Nghe phát âm và chọn chữ Hán đúng.',
          audio: '谢谢',
          options: ['再见', '谢谢', '你好'],
          answer: '谢谢'
        },
        {
          id: 3,
          question: 'Nghe phát âm và chọn nghĩa đúng.',
          audio: '再见',
          options: ['Bạn', 'Tạm biệt', 'Tôi'],
          answer: 'Tạm biệt'
        }
      ],

      // Chặng 3: Ngữ pháp
      grammar: [
        {
          title: '1. Cách chào hỏi: 你好',
          formula: '你好！',
          explanation:
            '你好 (nǐ hǎo) có nghĩa là xin chào. Đây là cách chào hỏi phổ biến trong tiếng Trung.',
          examples: [
            {
              hanzi: '你好！',
              pinyin: 'Nǐ hǎo!',
              meaning: 'Xin chào!'
            }
          ]
        },
        {
          title: '2. Đại từ nhân xưng',
          formula: '我 / 你 / 他 / 她',
          explanation:
            '我 là tôi, 你 là bạn, 他 là anh ấy, 她 là cô ấy. 他 và 她 có cùng cách phát âm là tā nhưng khác chữ viết.',
          examples: [
            {
              hanzi: '我',
              pinyin: 'Wǒ',
              meaning: 'Tôi'
            },
            {
              hanzi: '你',
              pinyin: 'Nǐ',
              meaning: 'Bạn'
            },
            {
              hanzi: '他',
              pinyin: 'Tā',
              meaning: 'Anh ấy'
            },
            {
              hanzi: '她',
              pinyin: 'Tā',
              meaning: 'Cô ấy'
            }
          ]
        },
        {
          title: '3. Cách nói cảm ơn và tạm biệt',
          formula: '谢谢！ / 再见！',
          explanation:
            '谢谢 (xièxie) dùng để cảm ơn. 再见 (zàijiàn) dùng khi chia tay hoặc tạm biệt.',
          examples: [
            {
              hanzi: '谢谢你！',
              pinyin: 'Xièxie nǐ!',
              meaning: 'Cảm ơn bạn!'
            },
            {
              hanzi: '明天再见。',
              pinyin: 'Míngtiān zàijiàn.',
              meaning: 'Ngày mai gặp lại.'
            }
          ]
        }
      ],

      // Chặng 4: Ghép câu và luyện viết
      sentence: [
        {
          id: 1,
          question: 'Sắp xếp thành câu có nghĩa: Xin chào!',
          words: ['好', '你'],
          answer: '你好'
        },
        {
          id: 2,
          question: 'Sắp xếp thành câu: Cảm ơn bạn!',
          words: ['你', '谢谢'],
          answer: '谢谢你'
        },
        {
          id: 3,
          question: 'Sắp xếp thành câu: Tạm biệt!',
          words: ['见', '再'],
          answer: '再见'
        }
      ],

      // Chặng 5: Kiểm tra tổng hợp
      quiz: [
        {
          id: 1,
          question: '你好 có nghĩa là gì?',
          options: ['Xin chào', 'Cảm ơn', 'Tạm biệt', 'Tôi'],
          answer: 'Xin chào'
        },
        {
          id: 2,
          question: 'Chữ Hán nào có nghĩa là tôi?',
          options: ['你', '我', '他', '她'],
          answer: '我'
        },
        {
          id: 3,
          question: '谢谢 có nghĩa là gì?',
          options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Bạn'],
          answer: 'Cảm ơn'
        },
        {
          id: 4,
          question: 'Chữ nào có nghĩa là cô ấy?',
          options: ['我', '你', '他', '她'],
          answer: '她'
        },
        {
          id: 5,
          question: '再见 có nghĩa là gì?',
          options: ['Tạm biệt', 'Cảm ơn', 'Xin chào', 'Anh ấy'],
          answer: 'Tạm biệt'
        }
      ]
    }
  }
}

// Lấy nội dung theo cấp độ và bài học
export function getLessonContent(level, lessonId) {
  return lessonContent[level]?.[lessonId] || null
}
