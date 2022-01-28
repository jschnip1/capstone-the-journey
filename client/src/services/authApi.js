export async function authenticate(credentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(`http://localhost:8080/authenticate`, init);

  if (response.status === 403) {
    return Promise.reject(["Login failed."]);
  } else if (response.status === 200) {
    return response.json();
  }
  return Promise.reject(["Login failed for an unexpected reason."]);
}

export async function register(credentials) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  };

  const response = await fetch(`http://localhost:8080/register`, init);
  if (response.status === 201) {
    return Promise.resolve();
  } else if (response.status === 400) {
    const error = await response.json();
    return Promise.reject(error);
  }
  return Promise.reject(["Registration failed for unexpected reason."]);
}
