import { ProviderProps, ConversationProps, MessageProps } from "./types";

export const providers: ProviderProps[] = [
  {     
    id: 1,
    name: 'qianfan',
    title: '百度千帆',
    desc: '文心一言 百度出品的大模型',
    models: ['ERNIE-4.0-8K', 'ERNIE-3.5-8K', 'ERNIE-Speed-128K'],
    avatar: 'https://aip-static.cdn.bcebos.com/landing/product/ernie-bote321e5.png',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {     
    id: 2,
    name: 'dashscope', 
    title: '阿里灵积',
    desc: '通义千问',
    // https://help.aliyun.com/zh/dashscope/developer-reference/api-details?spm=a2c4g.11186623.0.0.5bf41507xgULX5#b148acc634pfc
    models: ['qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-vl-plus'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4160791-200-qlqunomdvkyitpedtghnhsgjlutapgfl.jpeg',
    createdAt: '2024-07-03',
    updatedAt: '2024-07-03'
  },
  {     
    id: 3,
    name: 'deepseek', 
    title: 'DeepSeek',
    desc: 'DeepSeek',
    // https://api-docs.deepseek.com/zh-cn/
    models: ['deepseek-chat'],
    avatar: 'https://qph.cf2.poecdn.net/main-thumb-pb-4981273-200-phhqenmywlkiybehuaqvsxpfekviajex.jpeg',
    createdAt: '2024-12-27',
    updatedAt: '2024-12-27'
  }
];

export const conversations: ConversationProps[] = [
    { id: 1, selectedModel: 'GPT-3.5-Turbo', title: '什么是光合作用', createdAt: '2026-01-30', updatedAt: '2026-02-02', providerId: 1 },
    { id: 2, selectedModel: 'GPT-4', title: 'Explain quantum computing in simple terms', createdAt: '2026-01-25', updatedAt: '2026-01-28', providerId: 2 },
    { id: 3, selectedModel: 'GPT-3.5-Turbo', title: 'Teach me about JavaScript', createdAt: '2026-01-20', updatedAt: '2026-01-22', providerId: 3 },
    { id: 4, selectedModel: 'GPT-4', title: 'How does machine learning work?', createdAt: '2026-01-15', updatedAt: '2026-01-18', providerId: 4 },
    { id: 5, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 5 },
    { id: 6, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 6 },
    { id: 7, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 7 },
    { id: 8, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 8 },
    { id: 9, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 9 },
    { id: 10, selectedModel: 'GPT-3.5-Turbo', title: 'Can you write me a short story?', createdAt: '2026-01-10', updatedAt: '2026-01-12', providerId: 10 },
];

export const messages: MessageProps[] = [
    { id: 1, content: '什么是光合作用', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 2, content: '光合作用是植物利用阳光将二氧化碳和水转化为葡萄糖和氧气的过程。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'finished' },
    { id: 3, content: '什么是光合作用', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 4, content: '光合作用是植物利用阳光将二氧化碳和水转化为葡萄糖和氧气的过程。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'finished' },
    { id: 5, content: '什么是二氧化碳', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 1, status: 'finished' },
    { id: 6, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 1, status: 'loading' },
    { id: 7, content: '为什么咬人会疼', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 2, status: 'finished' },
    { id: 8, content: '因为咬人会刺激神经末梢，导致疼痛信号传递到大脑。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 2, status: 'finished' },
    { id: 9, content: '还有补充吗', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 2, status: 'finished' },
    { id: 10, content: '咬人还可能会引起局部组织损伤和炎症反应，进一步加剧疼痛感。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 2, status: 'finished' },
    { id: 11, content: '特朗普是谁', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 3, status: 'finished' },
    { id: 12, content: '唐纳德·特朗普（Donald Trump）是美国第45任总统，任期从2017年1月20日到2021年1月20日。他是商人、电视名人和政治家，以其直言不讳的风格和政策立场而闻名。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 3, status: 'finished' },
    { id: 13, content: '特朗普的出生地在哪里', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 3, status: 'finished' },
    { id: 14, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 3, status: 'loading' },
    { id: 15, content: '道德经是谁写的', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 4, status: 'finished' },
    { id: 16, content: '《道德经》是中国古代哲学家老子（Laozi）所著的一部经典著作，成书于春秋时期。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 4, status: 'finished' },
    { id: 17, content: '道德经的主要内容是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 4, status: 'finished' },
    { id: 18, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 4, status: 'loading' },
    { id: 19, content: '毛泽东思想核心内容是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 5, status: 'finished' },
    { id: 20, content: '毛泽东思想的核心内容包括新民主主义革命理论、社会主义革命和建设理论、人民战争的战略战术、党的建设理论等。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 5, status: 'finished' },
    { id: 21, content: '毛泽东思想对中国革命和建设的影响是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 5, status: 'finished' },
    { id: 22, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 5, status: 'loading' },
    { id: 23, content: '中国的四大发明是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 6, status: 'finished' },
    { id: 24, content: '中国的四大发明包括造纸术、火药、印刷术和指南针。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 6, status: 'finished' },
    { id: 25, content: '中国的四大发明对世界的影响是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 6, status: 'finished' },
    { id: 26, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 6, status: 'loading' },
    { id: 27, content: '美国为什么会成为世界第一强国', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 7, status: 'finished' },
    { id: 28, content: '美国成为世界第一强国的原因包括其丰富的自然资源、强大的工业基础、创新能力、军事力量以及在全球事务中的积极参与等。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 7, status: 'finished' },
    { id: 29, content: '美国的科技创新能力如何', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 7, status: 'finished' },
    { id: 30, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 7, status: 'loading' },
    { id: 31, content: '中国的经济发展模式是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 8, status: 'finished' },
    { id: 32, content: '中国的经济发展模式被称为“社会主义市场经济”，结合了市场机制和政府调控，强调国家在经济发展中的主导作用，同时鼓励私营企业的发展。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 8, status: 'finished' },
    { id: 33, content: '中国的经济发展模式有哪些优势', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 8, status: 'finished' },
    { id: 34, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 8, status: 'loading' },
    { id: 35, content: '德国的工业优势是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 9, status: 'finished' },
    { id: 36, content: '德国的工业优势包括其高质量的制造业、强大的汽车工业、先进的机械工程技术以及在可再生能源领域的创新能力等。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 9, status: 'finished' },
    { id: 37, content: '德国如何保持其工业竞争力', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 9, status: 'finished' },
    { id: 38, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 9, status: 'loading' },
    { id: 39, content: '中国的改革开放有哪些重要成果', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 10, status: 'finished' },
    { id: 40, content: '中国的改革开放取得了显著的经济增长、贫困率大幅下降、国际贸易和投资的增加以及人民生活水平的提高等重要成果。', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 10, status: 'finished' },
    { id: 41, content: '中国的改革开放对世界的影响是什么', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'question', conversationId: 10, status: 'finished' },
    { id: 42, content: '', createdAt: '2026-02-15', updatedAt: '2026-02-15', type: 'answer', conversationId: 10, status: 'loading' }
];