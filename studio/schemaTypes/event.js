export default {
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'date', title: 'Date', type: 'datetime' },
    { name: 'location', title: 'Location', type: 'string' },
    { name: 'rsvpLink', title: 'RSVP Link', type: 'url' },
    { name: 'buttonText', title: 'Button Text', type: 'string', description: 'Custom text for the action button (defaults to "Learn More")' },
    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
  ],
}