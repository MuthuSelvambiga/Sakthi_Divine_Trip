console.log("API FILE LOADED");

const API_BASE_URL = "http://localhost:5066/api";

export const getUpcomingTours = async () => {


    const response = await fetch(`${API_BASE_URL}/Tours/upcoming`);

    if (!response.ok) {
        throw new Error("Failed to load upcoming tours.");
    }

    return response.json();
};
export const getTourDetails = async (id) => {
    const response = await fetch(`${API_BASE_URL}/Tours/${id}/details`);

    if (!response.ok) {
        throw new Error("Failed to load tour details.");
    }

    return response.json();
};
export const getPastTours = async () => {
    const response = await fetch(`${API_BASE_URL}/Tours/past`);

    if (!response.ok) {
        throw new Error("Failed to load past tours.");
    }

    return response.json();
};
export const getPublishedExperiences = async () => {
    const response = await fetch(
        `${API_BASE_URL}/CustomerExp/published`
    );

    if (!response.ok) {
        throw new Error("Failed to load customer experiences.");
    }

    return response.json();
};