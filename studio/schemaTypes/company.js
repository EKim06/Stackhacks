export default {
    name: 'company',
    title: 'Company',
    type: 'document',
    fields: [
      { name: 'title', title: 'Title', type: 'string' },
      { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    ],
  }