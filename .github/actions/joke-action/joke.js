const fetch = require('node-fetch');

async function getJoke() {
  try {
    const response = await fetch('https://icanhazdadjokes.com/', {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    if (!data || !data.joke) {
      throw new Error('Invalid response from API');
    }
    console.log(`::set-output name=joke-output::${data.joke}`);
  } catch (error) {
    console.error('Failed to fetch joke:', error.message);
    console.log('::set-output name=joke-output::Fallback joke: Why did the chicken cross the road? To get to the other side!');
  }
}

getJoke();
