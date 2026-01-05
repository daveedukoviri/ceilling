import { useRef, useState } from "react";
import "./Upload.css";

export default function Upload() {
    const fileInputRef = useRef(null);

    const [files, setFiles] = useState([]); // { name, size, previewUrl, serverUrl?, isUploaded? }
    const [dragOver, setDragOver] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(null);
    const [toast, setToast] = useState(null);
    const [readyToUpload, setReadyToUpload] = useState(false);

    /* ----------------------------- helpers ----------------------------- */

    const showToast = (title, message, type = "info") => {
        setToast({ title, message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const validateFiles = (incoming) => {
        const valid = [];
        const invalid = [];

        incoming.forEach((file) => {
            // Only allow images AND size ≤ 30 KB
            if (file.type.startsWith("image/") && file.size <= 30 * 1024) {
                valid.push(file);
            } else {
                invalid.push(file);
            }
        });

        if (invalid.length) {
            const reasons = [];
            invalid.forEach((f) => {
                if (!f.type.startsWith("image/")) reasons.push(`${f.name} (not an image)`);
                if (f.size > 30 * 1024) reasons.push(`${f.name} (>${30}KB)`);
            });
            showToast(
                "Files rejected",
                `Only images ≤ 30KB allowed. Rejected: ${invalid.length} file(s)`,
                "warning"
            );
        }

        return valid.slice(0, 10); // Max 10 files
    };

    /* ----------------------------- handlers ----------------------------- */

    const handleFiles = (fileList) => {
        const selected = validateFiles(Array.from(fileList));
        if (!selected.length) {
            setStatus({ text: "No valid images selected (must be ≤ 30KB)", type: "error" });
            return;
        }

        prepareForUpload(selected);
    };

    const prepareForUpload = (selected) => {
        setProgress(0);
        setStatus({ text: "Preparing images...", type: "info" });
        setReadyToUpload(false);

        let processed = 0;

        const previewEntries = selected.map((file) => ({
            name: file.name,
            size: file.size,
            originalFile: file,
            previewUrl: URL.createObjectURL(file),
            serverUrl: null,
            isUploadedToServer: false,
        }));

        selected.forEach((file, index) => {
            setTimeout(() => {
                processed++;
                setProgress(Math.round((processed / selected.length) * 100));

                setFiles((prev) => {
                    const entry = previewEntries.find((e) => e.originalFile === file);
                    return entry ? [...prev, entry] : prev; // Add to end or beginning as preferred
                });

                if (processed === selected.length) {
                    setStatus({ text: `${processed} small images ready! Click to upload.`, type: "success" });
                    showToast("Ready!", `${processed} images prepared (≤30KB each)`, "success");
                    setReadyToUpload(true);
                    setProgress(0);
                }
            }, 300 + index * 200);
        });
    };

    const uploadToServer = async () => {
        const toUpload = files.filter((f) => !f.isUploadedToServer);
        if (toUpload.length === 0) return;

        const originalFiles = toUpload.map((f) => f.originalFile);

        const formData = new FormData();
        originalFiles.forEach((file) => {
            formData.append("images", file);
        });

        setReadyToUpload(false);
        setStatus({ text: "Uploading to server...", type: "info" });

        try {
            const response = await fetch("https://ceilling.vercel.app/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                // SUCCESS: Show success message
                setStatus({ text: "All images uploaded successfully!", type: "success" });
                showToast("Uploaded!", `${data.count} images saved on server`, "success");

                // AUTO CLEAR EVERYTHING after 2 seconds
                setTimeout(() => {
                    // Revoke blob URLs
                    files.forEach((f) => {
                        if (f.previewUrl?.startsWith("blob:")) {
                            URL.revokeObjectURL(f.previewUrl);
                        }
                    });

                    // Reset all state
                    setFiles([]);
                    setReadyToUpload(false);
                    setProgress(0);
                    setStatus(null);
                    showToast("Cleared", "All images removed after upload", "info");
                }, 2000);
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (error) {
            console.error(error);
            setStatus({ text: "Upload failed", type: "error" });
            showToast("Error", error.message || "Failed to upload", "error");
            setReadyToUpload(true); // Allow retry
        }
    };

    const removeFile = (name) => {
        setFiles((prev) => {
            const removed = prev.find((f) => f.name === name);
            if (removed?.previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(removed.previewUrl);
            }
            return prev.filter((f) => f.name !== name);
        });
        showToast("Removed", `${name} removed`, "info");
    };

    const clearAll = () => {
        if (!files.length || !window.confirm(`Remove all ${files.length} images?`)) return;

        files.forEach((f) => {
            if (f.previewUrl?.startsWith("blob:")) {
                URL.revokeObjectURL(f.previewUrl);
            }
        });
        setFiles([]);
        setReadyToUpload(false);
        setProgress(0);
        setStatus(null);
        showToast("Cleared", "All images removed", "info");
    };

    /* ----------------------------- render ----------------------------- */

    return (
        <div id="upload">
            {/* Hero Section */}
            <section className="contact-hero text-center mb-4">
                <div className="container">
                    <nav aria-label="breadcrumb" className="hero-breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Upload</li>
                        </ol>
                    </nav>
                    <h1>Upload Small Images</h1>
                    <p className="lead">
                        Only images ≤ 30KB are allowed. Perfect for thumbnails, icons, or quick uploads.
                    </p>
                </div>
            </section>

            <div className="upload-component-container">
                <div className="container">
                    <section className="row justify-content-center">
                        {/* Guidelines - Updated */}
                        <div className="col-lg-12 mb-4">
                            <div className="instructions">
                                <h2 className="instructions-title">
                                    <i className="fas fa-clipboard-list"></i> Upload Guidelines
                                </h2>
                                <ul className="instructions-list row">
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-file-image instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Accepted formats</strong>
                                            <p>JPEG, PNG, WebP, GIF</p>
                                        </div>
                                    </li>
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-weight-hanging instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Max size</strong>
                                            <p><strong>30 KB per image</strong></p>
                                        </div>
                                    </li>
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-layer-group instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Batch upload</strong>
                                            <p>Up to 10 images at once</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Upload Area */}
                        <div className="col-lg-9 mb-4">
                            <div
                                className={`upload-area ${dragOver ? "dragover" : ""}`}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    setDragOver(true);
                                }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragOver(false);
                                    handleFiles(e.dataTransfer.files);
                                }}
                            >
                                <div className="upload-icon-wrapper">
                                    <i className="fas fa-cloud-upload-alt upload-icon"></i>
                                </div>

                                <h2 className="upload-title">Upload Images </h2>
                                <p className="upload-text">
                                    Drag & drop or click browse. Only images under 30KB allowed.
                                </p>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    className="file-input"
                                    onChange={(e) => handleFiles(e.target.files)}
                                />

                                <div className="upload-actions">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <i className="fas fa-folder-open"></i> Browse Files
                                    </button>

                                    <button className="btn btn-secondary" onClick={clearAll}>
                                        <i className="fas fa-times"></i> Clear All
                                    </button>
                                </div>

                                {progress > 0 && (
                                    <div className="progress-bar">
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                )}

                                {status && (
                                    <div className={`upload-status upload-${status.type}`}>
                                        {status.text}
                                    </div>
                                )}

                                {/* Upload to Server Button */}
                                {readyToUpload && (
                                    <div className="text-center mt-4">
                                        <button
                                            className="btn btn-success btn-lg"
                                            onClick={uploadToServer}
                                        >
                                            <i className="fas fa-upload"></i> Upload to Server Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* Preview Section */}
                    <section className="preview-section mb-4">
                        <h2 className="section-title">Selected Images</h2>

                        <div className="preview-container">
                            {!files.length && (
                                <div className="empty-preview">
                                    <i className="fas fa-images empty-icon"></i>
                                    <h3>No images selected</h3>
                                    <p>Upload small images (≤ 30KB each)</p>
                                </div>
                            )}

                            {files.map((entry) => {
                                const size = `${(entry.size / 1024).toFixed(1)} KB`;

                                const imageSrc = entry.serverUrl
                                    ? `http://localhost:5000${entry.serverUrl}`
                                    : entry.previewUrl;

                                return (
                                    <div className="preview-item" key={entry.name}>
                                        <img
                                            src={imageSrc}
                                            alt={entry.name}
                                            className="preview-image"
                                        />
                                        <div className="preview-info">
                                            <div className="preview-name">{entry.name}</div>
                                            <div className="preview-details">
                                                <span className="preview-size">{size}</span>
                                                {entry.isUploadedToServer && (
                                                    <span className="preview-uploaded badge bg-success ms-2">
                                                        Uploaded
                                                    </span>
                                                )}
                                                <span
                                                    className="preview-remove"
                                                    onClick={() => removeFile(entry.name)}
                                                >
                                                    <i className="fas fa-times"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* Toast Notification */}
                    {toast && (
                        <div className={`toast show toast-${toast.type || "info"}`}>
                            <i className={`fas fa-${toast.type === "success" ? "check" : toast.type === "error" ? "exclamation" : "info"}-circle toast-icon`}></i>
                            <div className="toast-content">
                                <h4>{toast.title}</h4>
                                <p>{toast.message}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}