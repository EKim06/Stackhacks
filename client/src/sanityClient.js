import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'c40cpl3j', // Find this in your sanity.cli.js or Sanity manage dashboard
  dataset: 'production', 
  useCdn: true, // `true` ensures you get fast, cached responses
  apiVersion: '2026-03-10', // Use today's date
});