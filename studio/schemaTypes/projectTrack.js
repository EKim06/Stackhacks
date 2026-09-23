export default {
  name: 'projectTrack',
  title: 'Project Track',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Track Title',
      type: 'string',
      description: 'Full name of the track (e.g. Web Development, Artificial Intelligence)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'orbitLabel',
      title: 'Orbit Label (Short Caption)',
      type: 'string',
      description: 'Short label displayed under the orbital circle node (e.g. Web, AI, Security, App Decon)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon displayed inside the orbital node',
      options: {
        list: [
          { title: 'Code / Web (Code)', value: 'Code' },
          { title: 'Artificial Intelligence / Brain (Brain)', value: 'Brain' },
          { title: 'Cybersecurity / Shield (Shield)', value: 'Shield' },
          { title: 'App Decon / Repeat (Repeat)', value: 'Repeat' },
          { title: 'Mobile Dev (Smartphone)', value: 'Smartphone' },
          { title: 'Database / Data Science (Database)', value: 'Database' },
          { title: 'Terminal / Systems (Terminal)', value: 'Terminal' },
          { title: 'Hardware / Robotics (Cpu)', value: 'Cpu' },
          { title: 'Architecture / Full Stack (Layers)', value: 'Layers' },
          { title: 'Cloud / Global (Globe)', value: 'Globe' },
          { title: 'Innovation (Sparkles)', value: 'Sparkles' },
          { title: 'Launch / Startups (Rocket)', value: 'Rocket' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'Code',
    },
    {
      name: 'order',
      title: 'Orbit Position / Order',
      type: 'number',
      description: 'Numeric order around the circular orbit (e.g. 1, 2, 3, 4...)',
      validation: (Rule) => Rule.integer().positive(),
    },
    {
      name: 'content',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Detailed description displayed when the track is opened in the center of the orbit',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'relatedTracks',
      title: 'Connected Tracks',
      type: 'array',
      description: 'Select other tracks that connect and pulse when this track is selected',
      of: [
        {
          type: 'reference',
          to: [{ type: 'projectTrack' }],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Orbit Order (1 -> 10)',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'orbitLabel',
      order: 'order',
    },
    prepare({ title, subtitle, order }) {
      const orderPrefix = order != null ? `#${order} ` : ''
      return {
        title: `${orderPrefix}${title}`,
        subtitle: subtitle || 'No label',
      }
    },
  },
}
