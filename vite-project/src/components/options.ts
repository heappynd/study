function buildOption(label: string, value?: string | number) {
  value = value ? value : label
  return { label, value }
}

function buildOptions(tpl: string[] | Map<string, string | number>) {
  if (Array.isArray(tpl)) {
    return tpl.map((item) => buildOption(item))
  } else {
    const options = []
    for (const [label, value] of tpl) {
      options.push(buildOption(label, value))
    }
    return options
  }
}

export default {
  task_domain: buildOptions(
    new Map([
      ['计算机视觉', 'cv'],
      ['自然语言处理', 'nlp'],
      ['音频处理', 'audio'],
      ['表格数据', 'tabular'],
      ['多模态', 'multimodal'],
      ['强化学习', 'reinforcement_learning'],
      ['未知', 'unknow'],
    ])
  ),
  task_type: {
    cv: [
      { label: '图像分类', value: 'image_classification' },
      { label: '图像分割', value: 'image_segmentation' },
      { label: '目标检测', value: 'object_detection' },
    ],
    nlp: [
      { label: '文本分类', value: 'text_classification' },
      { label: '文本生成', value: 'text_generation' },
      { label: '翻译', value: 'translation' },
      { label: '填空', value: 'fill_mask' },
      { label: 'Token分类', value: 'token_classification' },
      { label: '文本相似度', value: 'sentence_similarity' },
      { label: '问答', value: 'question_answering' },
      { label: '摘要', value: 'summarization' },
      { label: '零样本分类', value: 'zero_shot_classification' },
      { label: '文本到文本生成', value: 'text2text_generation' },
      { label: '对话', value: 'conversational' },
      { label: '表格问答', value: 'table_question_answering' },
    ],
    audio: [
      { label: '音频分类', value: 'audio_classification' },
      { label: '自动语音识别', value: 'automatic_speech_recognition' },
      { label: '文本转语音', value: 'text_to_speech' },
      { label: '音频转音频', value: 'audio_to_audio' },
      { label: '语音活动检测', value: 'voice_activity_detection' },
    ],
    tabular: [
      { label: '分类', value: 'tabular_classification' },
      { label: '回归', value: 'tabular_regression' },
    ],
    multimodal: [
      { label: '特征抽取', value: 'feature_extraction' },
      { label: '文本生成图像', value: 'text_to_image' },
      { label: '图像生成文本', value: 'image_to_text' },
      { label: '视觉问答', value: 'visual_question_answering' },
    ],
    reinforcement_learning: [
      { label: '强化学习', value: 'reinforcement_learning' },
    ],
    unknow: [{ label: '未知', value: 'unknown' }],
  },
  framework: buildOptions([
    'ScikitLearn',
    'Tensorflow',
    'XGBoost',
    'LightGBM',
    'H2O',
    'Keras',
    'PyTorch',
    'SparkMLlib',
    'ONNX',
    'Caffe',
  ]),
  domain: buildOptions(
    new Map([
      ['自然语言处理', 1],
      ['计算机视觉', 2],
      ['知识图谱', 3],
      ['智能决策', 4],
      ['智能语言', 5],
    ])
  ),
} as any
