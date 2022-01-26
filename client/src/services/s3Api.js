export async function uploadFile (formData) {
    const response = await fetch('http://localhost:8080/api/image/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData
    });
    
    if (response.status !== 400) {
      return await response.json();
    }
    return Promise.reject("could not upload image")
  };