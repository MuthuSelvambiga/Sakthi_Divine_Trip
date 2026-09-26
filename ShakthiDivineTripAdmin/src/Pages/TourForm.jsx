import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../config";

function TourForm() {
    const navigate = useNavigate();
    const { id } = useParams();

    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        categoryId: "",
        tourName: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        durationDays: "",
        price: "",
        availableSeats: "",
        coverImage: "",
        earlyBirdPrice: "",
        earlyBirdLimit: "",
        isEarlyBirdActive: false
    });
    useEffect(() => {
        if (!isEditMode) {
            return;
        }

        const loadTour = async () => {
            try {
                setLoading(true);

                const token = localStorage.getItem("token");
                let coverImagePath = formData.coverImage;

                if (formData.coverImage instanceof File) {
                    const imageFormData = new FormData();
                    imageFormData.append("file", formData.coverImage);

                    const uploadResponse = await fetch(
                        `${API_BASE_URL}/Tours/upload-image`,
                        {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            },
                            body: imageFormData
                        }
                    );

                    const uploadText = await uploadResponse.text();

                    if (!uploadResponse.ok) {
                        throw new Error(uploadText || "Image upload failed.");
                    }

                    const uploadData = JSON.parse(uploadText);
                    coverImagePath = uploadData.imagePath;
                }

                const response = await fetch(
                    `${API_BASE_URL}/Tours/${id}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load tour.");
                }

                const tour = await response.json();

                setFormData({
                    categoryId: tour.categoryId ?? "",
                    tourName: tour.tourName ?? "",
                    location: tour.location ?? "",
                    description: tour.description ?? "",
                    startDate: tour.startDate ?? "",
                    endDate: tour.endDate ?? "",
                    durationDays: tour.durationDays ?? "",
                    price: tour.price ?? "",
                    availableSeats: tour.availableSeats ?? "",
                    coverImage: tour.coverImage ?? "",
                    earlyBirdPrice: tour.earlyBirdPrice ?? "",
                    earlyBirdLimit: tour.earlyBirdLimit ?? "",
                    isEarlyBirdActive: tour.isEarlyBirdActive ?? false
                });

            } catch (error) {
                console.error(error);
                setError("Unable to load tour.");
            } finally {
                setLoading(false);
            }
        };

        loadTour();

    }, [id, isEditMode]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            // Start with the existing image value
            let coverImagePath = formData.coverImage || null;

            // Upload image if a new file was selected
            if (formData.coverImage instanceof File) {
                const imageFormData = new FormData();
                imageFormData.append("file", formData.coverImage);

                const uploadResponse = await fetch(
                    `${API_BASE_URL}/Tours/upload-image`,
                    {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: imageFormData
                    }
                );

                const uploadText = await uploadResponse.text();

                if (!uploadResponse.ok) {
                    console.log("Upload status:", uploadResponse.status);
                    console.log("Upload response:", uploadText);

                    throw new Error(
                        `Image upload failed. Status: ${uploadResponse.status}. ${uploadText}`
                    );
                }

                const uploadData = JSON.parse(uploadText);

                coverImagePath = uploadData.imagePath;
            }

            const url = isEditMode
                ? `${API_BASE_URL}/Tours/${id}`
                : `${API_BASE_URL}/Tours`;

            const method = isEditMode ? "PATCH" : "POST";

            const requestBody = {
                categoryId: Number(formData.categoryId),
                tourName: formData.tourName,
                location: formData.location,
                description: formData.description,
                startDate: formData.startDate,
                endDate: formData.endDate || null,
                durationDays: Number(formData.durationDays),
                price: Number(formData.price),
                availableSeats: Number(formData.availableSeats),

                // Use uploaded image path
                coverImage: coverImagePath,

                earlyBirdPrice: formData.earlyBirdPrice
                    ? Number(formData.earlyBirdPrice)
                    : null,

                earlyBirdLimit: formData.earlyBirdLimit
                    ? Number(formData.earlyBirdLimit)
                    : null,

                isEarlyBirdActive: formData.isEarlyBirdActive
            };

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(requestBody)
            });

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || "Failed to save tour."
                );
            }

            alert(
                isEditMode
                    ? "Tour updated successfully!"
                    : "Tour created successfully!"
            );

            navigate("/tours");

        } catch (error) {
            console.error("Save tour error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tour-form-page">

            <div className="page-header">
                <div>
                    <h1>{isEditMode ? "Edit Tour" : "Add Tour"}</h1>

                    <p>
                        {isEditMode
                            ? "Update Sakthi Divine Trip tour details."
                            : "Create a new Sakthi Divine Trip tour."}
                    </p>  </div>
            </div>

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            <form
                className="tour-form"
                onSubmit={handleSubmit}
            >

                <div className="form-section">

                    <h2>Basic Information</h2>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Tour Category</label>

                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select tour duration</option>
                                <option value="1">1 Day</option>
                                <option value="2">2 Days / 1 Night</option>
                                <option value="3">3 Days / 2 Nights</option>
                                <option value="4">4 Days / 3 Nights</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Tour Name</label>

                            <input
                                type="text"
                                name="tourName"
                                value={formData.tourName}
                                onChange={handleChange}
                                placeholder="Example: Kanchipuram Temple Tour"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Example: Kanchipuram"
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description</label>

                            <textarea
                                name="description"
                                rows="4"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the spiritual journey..."
                                required
                            />
                        </div>

                    </div>

                </div>

                <div className="form-section">

                    <h2>Trip Details</h2>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Start Date</label>

                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>End Date</label>

                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Duration (Days)</label>

                            <input
                                type="number"
                                min="1"
                                name="durationDays"
                                value={formData.durationDays}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Available Seats</label>

                            <input
                                type="number"
                                min="1"
                                name="availableSeats"
                                value={formData.availableSeats}
                                onChange={handleChange}
                                required
                            />
                        </div>

                    </div>

                </div>

                <div className="form-section">

                    <h2>Pricing</h2>

                    <div className="form-grid">

                        <div className="form-group">
                            <label>Regular Price</label>

                            <input
                                type="number"
                                min="0"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="1799"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Early Bird Price</label>

                            <input
                                type="number"
                                min="0"
                                name="earlyBirdPrice"
                                value={formData.earlyBirdPrice}
                                onChange={handleChange}
                                placeholder="1699"
                            />
                        </div>

                        <div className="form-group">
                            <label>Early Bird Seat Limit</label>

                            <input
                                type="number"
                                min="1"
                                name="earlyBirdLimit"
                                value={formData.earlyBirdLimit}
                                onChange={handleChange}
                                placeholder="5"
                            />
                        </div>

                        <div className="form-group checkbox-group">

                            <label>
                                <input
                                    type="checkbox"
                                    name="isEarlyBirdActive"
                                    checked={formData.isEarlyBirdActive}
                                    onChange={handleChange}
                                />

                                Enable Early Bird Offer
                            </label>

                        </div>

                    </div>

                </div>

                <div className="form-section">

                    <h2>Website Image</h2>

                    <div className="form-group">
                        <label>Cover Image</label>

                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];

                                if (file) {
                                    setFormData({
                                        ...formData,
                                        coverImage: file
                                    });
                                }
                            }}
                        />
                    </div>

                </div>

                <div className="form-actions">

                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => navigate("/tours")}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="primary-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : isEditMode
                                ? "Update Tour"
                                : "Create Tour"}         </button>

                </div>

            </form>

        </div>
    );
}

export default TourForm;