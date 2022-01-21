const url = "http://localhost:8080/comment";

export async function fetchAll() {
    const response = await fetch(url);
    if (response.status !== 200) {
        return Promise.reject("Could not fetch all Comments");
    }
    return await response.json();
}

export async function fetchById(id) {
    const response = await fetch(`${url}/${id}`);
    if (response.status === 404) {
        throw new Error(response.statusText);
    }
    if (response.status !== 200) {
        return Promise.reject("Could not fetch comment");
    }
    return await response.json();
}

export async function fetchByTripId(id) {

}

export async function fetchByProfileId(id) {

}

export async function save(comment, token) {
    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(comment)
    };

    if (comment.commentId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/${comment.commentId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        }
        if (response.status !== 204) {
            return Promise.reject("Could not update comment");
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
        return Promise.reject("Comment not created.");
    }
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

export async function deleteByTripId(id, token) {

}