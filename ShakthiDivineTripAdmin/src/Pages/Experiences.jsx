import { useEffect, useState } from "react";

function Experiences() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 7;

    const loadExperiences = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "http://localhost:5066/api/CustomerExp",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Failed to load experiences.");
            }

            const data = await response.json();

            setExperiences(data);
        } catch (error) {
            console.error("Load experiences error:", error);
            setError("Unable to load customer experiences.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    const handlePublish = async (experienceId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/CustomerExp/${experienceId}/publish`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(
                    message || "Failed to publish experience."
                );
            }

            alert("Experience published successfully.");

            loadExperiences();
        } catch (error) {
            console.error("Publish error:", error);
            alert(error.message);
        }
    };

    const handleUnpublish = async (experienceId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/CustomerExp/${experienceId}/unpublish`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(
                    message || "Failed to unpublish experience."
                );
            }

            alert("Experience unpublished successfully.");

            loadExperiences();
        } catch (error) {
            console.error("Unpublish error:", error);
            alert(error.message);
        }
    };

    const handleDelete = async (experienceId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this experience?"
        );

        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:5066/api/CustomerExp/${experienceId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(
                    message || "Failed to delete experience."
                );
            }

            alert("Experience deleted successfully.");

            loadExperiences();
        } catch (error) {
            console.error("Delete experience error:", error);
            alert(error.message);
        }
    };

    const totalPages = Math.ceil(
        experiences.length / itemsPerPage
    );

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const currentExperiences = experiences.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    return (
        <div className="experiences-page">


            <div className="page-header">
                <div>
                    <h1>Customer Experiences</h1>
                    <p>Manage customer feedback and experiences.</p>
                </div>
            </div>
            {loading && (
                <p>Loading experiences...</p>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                experiences.length === 0 && (
                    <p>No customer experiences found.</p>
                )}

            {!loading &&
                !error &&
                experiences.length > 0 && (
                    <div className="experience-table-container">

                        <table className="experience-table">

                            <thead>
                                <tr>
                                    <th>Customer</th>
                                    <th>Tour</th>
                                    <th>Rating</th>
                                    <th>Experience</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {currentExperiences.map(
                                    (experience) => (
                                        <tr
                                            key={
                                                experience.experienceId
                                            }
                                        >

                                            <td>
                                                {
                                                    experience.customerName
                                                }
                                            </td>

                                            <td>
                                                {
                                                    experience.tourName ??
                                                    "-"
                                                }
                                            </td>

                                            <td>
                                                <span className="experience-rating">
                                                    {"★".repeat(
                                                        experience.rating
                                                    )}
                                                </span>
                                            </td>

                                            <td>
                                                <div className="experience-text">
                                                    {
                                                        experience.experienceText
                                                    }
                                                </div>
                                            </td>

                                            <td>
                                                {experience.isPublishedWithPermission ? (
                                                    <span className="experience-status-published">
                                                        Published
                                                    </span>
                                                ) : (
                                                    <span className="experience-status-unpublished">
                                                        Unpublished
                                                    </span>
                                                )}
                                            </td>

                                            <td>
                                                <div className="experience-actions">

                                                    {experience.isPublishedWithPermission ? (
                                                        <button
                                                            className="unpublish-button"
                                                            onClick={() =>
                                                                handleUnpublish(
                                                                    experience.experienceId
                                                                )
                                                            }
                                                        >
                                                            Unpublish
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="publish-button"
                                                            onClick={() =>
                                                                handlePublish(
                                                                    experience.experienceId
                                                                )
                                                            }
                                                        >
                                                            Publish
                                                        </button>
                                                    )}

                                                    <button
                                                        className="delete-experience-button"
                                                        onClick={() =>
                                                            handleDelete(
                                                                experience.experienceId
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>

                        </table>

                        <div className="pagination">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage - 1
                                    )
                                }
                            >
                                Previous
                            </button>

                            <span>
                                Page {currentPage} of{" "}
                                {totalPages}
                            </span>

                            <button
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={() =>
                                    setCurrentPage(
                                        currentPage + 1
                                    )
                                }
                            >
                                Next
                            </button>

                        </div>

                    </div>
                )}

        </div>
    );
}

export default Experiences;