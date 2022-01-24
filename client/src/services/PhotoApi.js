const url = "http://localhost:8080/photo";

export async function fetchAll() {
    const response = await fetch(url);
    if (response.status !== 200) {
        return Promise.reject("Could not fetch photos.");
    }
    return await response.json();
}

export async function fetchById(id) {
    const response = await fetch(`${url}/photoId/${id}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch photo");
    }
    return await response.json();
}

export async function fetchByLocationId(id) {
    const response = await fetch(`${url}/tripLocationId/${id}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch photos by location.");
    }
    return await response.json();
}

export async function save(photo, token) {
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(photo)
    }
    const response = await fetch(url, init);
    if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    } else if (response.status === 201) {
        return await response.json();
    }
    return Promise.reject("Photo not created.");
}

export async function deleteById(id, token) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorized": `Bearer ${token}`
        }
    };
    const response = await fetch(`${url}/${id}`, init);
    if (response.status !== 204) {
        return Promise.reject(`Could not delete comment: ${id}`);
    }
}