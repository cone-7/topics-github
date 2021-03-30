const showTopics = (topic) => fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    "Authorization": "bearer " + process.env.REACT_APP_GITHUB_API_TOKEN
  },
  body: JSON.stringify({
    query: `{ topic(name:"${topic}") { relatedTopics { name stargazerCount } } }`
  })
})
  .then(r => r.json())
  .then(data => data);

export default showTopics;