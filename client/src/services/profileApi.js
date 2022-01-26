const url = "http://localhost:8080/profile"


export async function getProfilebyProfileId(profileId) {
    const init = {
        method: "GET",
    };
    const response = await fetch(`${url}/profileId/${profileId}`, init);
    if (response.status === 404) {
        return Promise.reject("Profile not found");
    }
    if (response.status === 200) {
        return await response.json();
    }
    return Promise.reject("Could not fetch Profile");
}

export async function getProfileByUsername(username, token) {
    const init = {
        method: "GET",
    };
    const response = await fetch(`${url}/username/${username}`, init);
    if (response.status === 404) {
        return Promise.reject("Profile not found");
    }
    if (response.status === 200) {
        return await response.json();
    }
    return Promise.reject("Could not fetch Profile");
}

export async function save(profile, username, token) {

    const init = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
            // "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(profile)
    };

    if (profile.profileId > 0) {
        init.method = "PUT";
        const response = await fetch(`${url}/${profile.profileId}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status !== 204) {
            return Promise.reject(`Could not update profile: ${profile.profileId}`);
        }
    }
    else {
        init.method = "POST";
        const response = await fetch(`${url}/${username}`, init);
        if (response.status === 400) {
            const errors = await response.json();
            return Promise.reject(errors);
        } else if (response.status === 201) {
            return await response.json();
        }
        return Promise.reject("profile not created!");
    }
};