import { useRef, useState } from "react";
import "./Upload.css";

export default function Upload() {
    const fileInputRef = useRef(null);

    const [files, setFiles] = useState([]); // { name, size, previewUrl, serverUrl?, isUploaded? }
    const [dragOver, setDragOver] = useState(false);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState(null);
    const [toast, setToast] = useState(null);
    const [readyToUpload, setReadyToUpload] = useState(false); // Controls button visibility

    /* ----------------------------- helpers ----------------------------- */

    const showToast = (title, message, type = "info") => {
        setToast({ title, message, type });
        setTimeout(() => setToast(null), 4000);
    };

    const validateFiles = (incoming) => {
        const valid = [];
        const invalid = [];

        incoming.forEach((file) => {
            if (file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024) {
                valid.push(file);
            } else {
                invalid.push(file);
            }
        });

        if (invalid.length) {
            showToast(
                "Some files rejected",
                `${invalid.length} file(s) exceeded 5MB or were not images`,
                "warning"
            );
        }

        return valid.slice(0, 10);
    };

    /* ----------------------------- handlers ----------------------------- */

    const handleFiles = (fileList) => {
        const selected = validateFiles(Array.from(fileList));
        if (!selected.length) {
            setStatus({ text: "No valid images selected", type: "error" });
            return;
        }

        prepareForUpload(selected);
    };

    const prepareForUpload = (selected) => {
        setProgress(0);
        setStatus({ text: "Preparing images...", type: "info" });
        setReadyToUpload(false);

        let uploaded = 0;

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
                uploaded++;
                setProgress(Math.round((uploaded / selected.length) * 100));

                setFiles((prev) => {
                    const entry = previewEntries.find((e) => e.originalFile === file);
                    return entry ? [entry, ...prev] : prev;
                });

                if (uploaded === selected.length) {
                    setStatus({ text: `${uploaded} images ready! Click below to upload to server.`, type: "success" });
                    showToast("Ready!", `${uploaded} images prepared`, "success");
                    setReadyToUpload(true); // Show the upload button
                    setProgress(0);
                }
            }, 500 + index * 400);
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
            const response = await fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setFiles((prev) =>
                    prev.map((entry) => {
                        const serverFile = data.files.find((f) => f.originalName === entry.name);
                        if (serverFile) {
                            return {
                                ...entry,
                                serverUrl: serverFile.url,
                                isUploadedToServer: true,
                            };
                        }
                        return entry;
                    })
                );

                setStatus({ text: "All images uploaded successfully!", type: "success" });
                showToast("Success!", `${data.count} images saved on server`, "success");
            } else {
                throw new Error(data.message || "Upload failed");
            }
        } catch (error) {
            console.error(error);
            setStatus({ text: "Upload failed", type: "error" });
            showToast("Error", error.message || "Failed to upload", "error");
            setReadyToUpload(true); // Allow retry
        } finally {
            setTimeout(() => setStatus(null), 4000);
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
        showToast("Cleared", "All images removed", "info");
    };

    /* ----------------------------- render ----------------------------- */

    return (
        <>
            {/* Hero Section */}
            <section className="contact-hero text-center mb-4">
                <div className="container">
                    <nav aria-label="breadcrumb" className="hero-breadcrumb">
                        <ol className="breadcrumb justify-content-center">
                            <li className="breadcrumb-item"><a href="/">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Upload</li>
                        </ol>
                    </nav>
                    <h1>Let's Create Your Dream Space Together</h1>
                    <p className="lead">
                        Get in touch with our design experts. We're here to listen, understand, and bring your vision to life.
                    </p>
                </div>
            </section>

            <div className="upload-component-container">
                <div className="container">
                    <section className="row justify-content-center">
                        {/* Guidelines */}
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
                                            <p>JPEG, PNG, WebP, GIF (Max 5MB each)</p>
                                        </div>
                                    </li>
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-expand-alt instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Recommended resolution</strong>
                                            <p>At least 1200px on the longest side</p>
                                        </div>
                                    </li>
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-magic instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Automatic optimization</strong>
                                            <p>Images optimized for web viewing</p>
                                        </div>
                                    </li>
                                    <li className="col-lg-4">
                                        <div className="instruction-icon-wrapper">
                                            <i className="fas fa-layer-group instruction-icon"></i>
                                        </div>
                                        <div>
                                            <strong>Batch upload</strong>
                                            <p>Upload up to 10 images at once</p>
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

                                <h2 className="upload-title">Upload Your Images</h2>
                                <p className="upload-text">
                                    Drag & drop images or click browse. JPEG, PNG, WebP, GIF (max 5MB)
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

                                {/* THE MAIN UPLOAD BUTTON */}
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
                        <h2 className="section-title">Uploaded Images</h2>

                        <div className="preview-container">
                            {!files.length && (
                                <div className="empty-preview">
                                    <i className="fas fa-images empty-icon"></i>
                                    <h3>No images uploaded</h3>
                                </div>
                            )}

                            {files.map((entry) => {
                                const size =
                                    entry.size > 1024 * 1024
                                        ? `${(entry.size / 1024 / 1024).toFixed(1)} MB`
                                        : `${(entry.size / 1024).toFixed(1)} KB`;

                                const imageSrc = entry.serverUrl
                                    ? `http://localhost:5000${entry.serverUrl}`
                                    : entry.previewUrl;

                                return (
                                    <div className="preview-item" key={entry.name}>
                                        <img
                                            src={imageSrc}
                                            alt={entry.name}
                                            className="preview-image"
                                            onError={(e) => {
                                                if (entry.previewUrl && !e.target.src.includes("blob:")) {
                                                    e.target.src = entry.previewUrl;
                                                }
                                            }}
                                        />
                                        <div className="preview-info">
                                            <div className="preview-name">{entry.name}</div>
                                            <div className="preview-details">
                                                <span className="preview-size">{size}</span>
                                                {entry.isUploadedToServer && (
                                                    <span className="preview-uploaded badge bg-success ms-2">Uploaded</span>
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

                    {/* Toast */}
                    {toast && (
                        <div className={`toast show toast-${toast.type || "info"}`}>
                            <i className="fas fa-check-circle toast-icon"></i>
                            <div className="toast-content">
                                <h4>{toast.title}</h4>
                                <p>{toast.message}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}