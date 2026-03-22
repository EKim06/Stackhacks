export default {
  name: 'founder',
  title: 'Founder',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'position', title: 'Position', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
  ],
}