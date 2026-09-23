import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'c40cpl3j', // Find this in your sanity.cli.js or Sanity manage dashboard
  dataset: 'production', 
  useCdn: !import.meta.env.DEV, // false in dev mode for instant updates on refresh; true in production for fast CDN caching
  apiVersion: '2026-03-10', // Use today's date
});