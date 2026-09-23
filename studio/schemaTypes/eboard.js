export default {
  name: 'eboard',
  title: 'Eboard',
  type: 'document',
  fieldsets: [
    {
      name: 'socials',
      title: 'Social & Contact Links',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. President, Executive Vice President, Tech Lead, Senior Advisor',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'position',
      title: 'Display Order / Position',
      type: 'number',
      description: 'Numeric order for displaying members in the gallery (e.g. 1 for President, 2 for VP, etc.)',
      validation: (Rule) => Rule.integer().positive(),
    },
    {
      name: 'description',
      title: 'Bio / Description',
      type: 'text',
      rows: 3,
      description: 'Brief bio or introduction (1-2 sentences)',
    },
    {
      name: 'image',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
      description: 'Full LinkedIn profile URL (e.g. https://www.linkedin.com/in/username)',
      fieldset: 'socials',
    },
    {
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
      description: 'Full Instagram profile URL (e.g. https://www.instagram.com/username)',
      fieldset: 'socials',
    },
    {
      name: 'github',
      title: 'GitHub URL',
      type: 'url',
      description: 'Full GitHub profile URL (e.g. https://github.com/username)',
      fieldset: 'socials',
    },
    {
      name: 'email',
      title: 'Email Address',
      type: 'string',
      description: 'Contact email address (e.g. name@example.com)',
      fieldset: 'socials',
    },
    {
      name: 'website',
      title: 'Personal Website / Portfolio',
      type: 'url',
      description: 'Personal website or portfolio URL (e.g. https://yourportfolio.com)',
      fieldset: 'socials',
    },
  ],
  orderings: [
    {
      title: 'Display Position (1 -> 10)',
      name: 'positionAsc',
      by: [
        { field: 'position', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title',
      media: 'image',
      position: 'position',
    },
    prepare({ title, subtitle, media, position }) {
      return {
        title: position ? `#${position} - ${title}` : title,
        subtitle: subtitle || 'No title set',
        media,
      }
    },
  },
}