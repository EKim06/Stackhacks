export default {
  name: 'eboard',
  title: 'Eboard',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'string' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)'
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full Instagram profile URL (e.g. https://www.instagram.com/username)'
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Full GitHub profile URL (e.g. https://github.com/username)'
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address (e.g. name@example.com)'
    },
  ],
}