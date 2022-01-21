const url = "http://localhost:8080/trip";

export async function fetchAll() {
    const response = await fetch(url);
    if (response.status !== 200) {
        return Promise.reject("Could not fetch all Trips");
    }
    return await response.json();
}

export async function fetchById(id) {
    const response = await fetch(`${url}/${id}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch trip");
    }
    return await response.json();
}

export async function save(trip, token) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(trip)
    };

    if (trip.tripId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/edit/${trip.tripId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        }
        if (response.status !== 204) {
            return Promise.reject("Could not update trip");
        }
    } else {
        init.method = "POST";
        const response = await fetch(url, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status === 201) {
            return await response.json();
        }
        return Promise.reject("Trip not created.");
    }
}

export async function disableById(trip, token) {
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(trip)
    };
    const response = await fetch(`${url}/disable/${trip.tripId}`, init);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 204) {
        return Promise.reject("Could not disable trip");
    }
}