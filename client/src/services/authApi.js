export async function authenticate(credentials) {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(credentials)
    };
  
    const response = await fetch(`http://localhost:8080/authenticate`, init);
  
    if (response.status === 403) {
      return Promise.reject(["Login failed."]);
    } else if (response.status === 200) {
      return response.json();
    }
    return Promise.reject(["Login failed for an unexpected reason."]);
}
  