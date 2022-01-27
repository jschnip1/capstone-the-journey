const url = "http://localhost:8080/trip/location";

export async function saveTripLocation(tripLocation, token) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(tripLocation)
    }

    if (tripLocation.tripLocationId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/${tripLocation.tripLocationId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        }
        if (response.status !== 204) {
            return Promise.reject("Could not update TripLocation");
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
        return Promise.reject("TripLocation not created.");
    }
}

export async function deleteByKey(locationId, tripId, token) {
    const init = {
        method: "DELETE",
        headers: {
            "Authorized": `Bearer ${token}` 
        }
    };
    const response = await fetch(`${url}/${tripId}/${locationId}`);
    if (response.status !== 204) {
        return Promise.reject(`Could not delete tripLocation with key: TripId = ${tripId} and LocationId = ${locationId}`);
    }
}