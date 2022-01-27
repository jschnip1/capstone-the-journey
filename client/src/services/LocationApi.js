const url = "http://localhost:8080/location";

export async function fetchLocationById(locationId) {
    const response = await fetch(`${url}/${locationId}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch location");
    }
    return await response.json();
}

export async function saveLocation(location) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            // "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(location)
    };

    init.method = "POST";
    const response = await fetch(url, init);
    if (response.status === 400) {
        const errors = await response.json();
        return Promise.reject(errors);
    } else if (response.status === 201) {
        return await response.json();
    }
    return Promise.reject("Location not created.");
}

export async function deleteById(locationId, token) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorized": `Bearer ${token}`
        }
    };
    const response = await fetch(`${url}/${locationId}`, init);
    if (response.status !== 204) {
        return Promise.reject(`Could not delete location: ${locationId}`);
    }
}