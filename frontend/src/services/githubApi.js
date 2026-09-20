const API_URL = 'http://localhost:8000/api';

export const analyzeGitHubProfile = async (githubUrl, targetRole) => {
  const response = await fetch(`${API_URL}/github/analyze`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ githubUrl, targetRole }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to analyze GitHub profile');
  }

  return response.json();
};
