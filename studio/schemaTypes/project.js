export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string' },
            { name: 'body', title: 'Body', type: 'text' },
          ],
        },
      ],
    },
  ],
}