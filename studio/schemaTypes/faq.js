export default {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'category',
      title: 'Category Key',
      type: 'string',
      description: 'e.g. web-dev, mobile-dev (must match exactly, no spaces)'
    },
    {
      name: 'categoryLabel',
      title: 'Category Label',
      type: 'string',
      description: 'e.g. Web Development'
    },
    {
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    }
  ]
}