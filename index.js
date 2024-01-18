// Replace 'USERNAME' with the Github username you want to fetch repositories for
const username = 'gaurav147-star';

// Replace 'YOUR_GITHUB_TOKEN' with your actual Github access token (optional but recommended for higher rate limits)
const accessToken = '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';

// API endpoint URL
const apiUrl = `https://api.github.com/users/${username}/repos`;

// Adding access token to the headers if provided
const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

// Function to fetch repositories
const fetchRepositories = async (url, headers) => {
  let allRepositories = [];
  let page = 1;

  while (true) {
    const response = await fetch(`${url}?page=${page}&per_page=100`, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const repositories = await response.json();

    if (repositories.length === 0) {
      // No more repositories, break the loop
      break;
    }

    allRepositories = allRepositories.concat(repositories);
    page++;
  }

  return allRepositories;
};

// Fetching repositories
fetchRepositories(apiUrl, headers)
  .then(repositories => {
    // Handle the repositories data here
    console.log(repositories);
  })
  .catch(error => {
    // Handle errors here
    console.error(error);
  });
