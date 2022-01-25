const url = "http://localhost:8080/item"

export async function fetchByItemId(itemId){
    const response = await fetch(`${url}/${itemId}`)
    if (response.status !== 200) {
        return Promise.reject("Could not find Item")
    }
    return await response.json();
}

export async function fetchByTripId(tripId){
    const response = await fetch(`${url}/trip/${tripId}`)
    if (response.status !== 200) {
        return Promise.reject("Could not find Item")
    }
    return await response.json();
}

export async function save (item, token) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            // "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(item)
    };

    if (item.itemId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/${item.itemId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status !== 204) {
            return Promise.reject(`Could not update item: ${item.itemId}`);
        }
    }
    else {
        init.method = "POST";
        const response = await fetch(`${url}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status === 201) {
            return await response.json();
        }
        return Promise.reject("Item not created!");
    }
}

export async function deleteByItemId (item, token) {
    const init = {
        headers: {
            //"Authorization": `Bearer ${token}`
        },
        method: "DELETE"
    };
    const response = await fetch(`${url}/${item.itemId}`, init);
    if (response.status !== 204) {
        return Promise.reject(`Could not delete agent: ${item.itemId}`);
    }
}