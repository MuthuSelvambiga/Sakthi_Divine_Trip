console.log("API FILE LOADED");

const API_BASE_URL =
    "https://sakthidivinetrip-api-dhdcfhdvdfewekau.westus3-01.azurewebsites.net/api";

const IMAGE_BASE_URL =
    "https://sakthidivinetrip-api-dhdcfhdvdfewekau.westus3-01.azurewebsites.net";

const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
        return image;
    }

    if (image.startsWith("/images/")) {
        return `${IMAGE_BASE_URL}${image}`;
    }

    return `${IMAGE_BASE_URL}/images/${image}`;
};


export const getUpcomingTours = async () => {
    const response = await fetch(`${API_BASE_URL}/Tours/upcoming`);

    if (!response.ok) {
        throw new Error("Failed to load upcoming tours.");
    }

    const tours = await response.json();

    return tours.map(tour => ({
        ...tour,
        coverImage: getImageUrl(tour.coverImage)
    }));
};


export const getTourDetails = async (id) => {
    const response = await fetch(`${API_BASE_URL}/Tours/${id}/details`);

    if (!response.ok) {
        throw new Error("Failed to load tour details.");
    }

    const tour = await response.json();

    return {
        ...tour,
        coverImage: getImageUrl(tour.coverImage)
    };
};


export const getPastTours = async () => {
    const response = await fetch(`${API_BASE_URL}/Tours/past`);

    if (!response.ok) {
        throw new Error("Failed to load past tours.");
    }

    const tours = await response.json();

    return tours.map(tour => ({
        ...tour,
        coverImage: getImageUrl(tour.coverImage)
    }));
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