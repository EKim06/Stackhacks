export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
  ],
}