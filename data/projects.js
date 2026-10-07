export const projects = [
  {
    slug: 'scalable-url-shortener',
    title: 'Scalable URL Shortener',
    label: '01 / REDIRECTS + SIGNALS',
    summary: 'A serverless URL-shortening application with regional click analytics.',
    problem: 'Handle high-volume redirects without adding analytics latency.',
    solution: 'AWS Lambda and DynamoDB power the application while CloudFront caches redirects near users.',
    role: 'Designed the serverless application, redirect path, and analytics workflow.',
    technologies: ['AWS Lambda', 'Amazon DynamoDB', 'Amazon CloudFront'],
    result: '1M+ redirects/month · p95 latency below 40 ms · approximately 35% lower compute cost'
  },
  {
    slug: 'collaboration-platform',
    title: 'Collaboration Platform',
    label: '02 / STATE + SYNCHRONIZATION',
    summary: 'A real-time editing system for concurrent distributed clients.',
    problem: 'Keep shared document state synchronized while multiple clients edit at once.',
    solution: 'Go, Python, MongoDB, and WebSockets connect persistent storage to synchronized client updates.',
    role: 'Built and refined synchronization, state-management, and concurrent document workflows.',
    technologies: ['Go', 'Python', 'MongoDB', 'WebSockets'],
    result: 'Consistent document state during simultaneous edits across connected clients'
  },
  {
    slug: 'insightflow',
    title: 'InsightFlow',
    label: '03 / QUESTIONS + QUERIES',
    summary: 'An LLM-powered analytics copilot for reliable data exploration and reporting.',
    problem: 'Turn natural-language business questions into useful SQL without sacrificing query safety.',
    solution: 'Python and LLM workflows generate SQL with validation, error handling, and edge-case checks.',
    role: 'Built the analytics assistant, recurring analysis workflows, and SQL validation path.',
    technologies: ['Python', 'LLM', 'SQL'],
    result: 'Faster recurring analysis with more reliable and accurate generated queries'
  }
];
