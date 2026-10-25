import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Video, 
  Film, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  FileVideo, 
  RefreshCw,
  MapPin,
  Tag
} from 'lucide-react';

export default function UploadVideoModal({ isOpen, onClose, presentDistrict, onVideoUploaded }) {
  if (!isOpen) return null;

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Work & Life Balance');
  const [description, setDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fileInputRef = useRef(null);

  const topicOptions = [
    'Work & Life Balance',
    'Consumer Habits',
    'Digital Living',
    'Daily Culture',
    'Neighborhood & Civic Voices',
    'Youth & Education'
  ];

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file) => {
    if (!file.type.startsWith('video/')) {
      setErrorMessage('Please select a valid video file (.mp4, .mov, .webm, etc.)');
      return;
    }
    // Limit to 200MB for UX demo
    if (file.size > 200 * 1024 * 1024) {
      setErrorMessage('Video file is too large. Please select a video under 200MB.');
      return;
    }

    setErrorMessage('');
    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!videoFile) {
      setErrorMessage('Please choose or drag & drop a video file first.');
      return;
    }
    if (!title.trim()) {
      setErrorMessage('Please provide a title for your video.');
      return;
    }

    setErrorMessage('');
    setIsUploading(true);
    setUploadProgress(15);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            if (onVideoUploaded) {
              onVideoUploaded({
                id: `user-video-${Date.now()}`,
                title: title.trim(),
                topic: topic,
                description: description.trim() || 'Community perspective shared on Now 9 Common Talks.',
                author: isAnonymous ? 'Anonymous Citizen' : (userName.trim() || 'Community Voice'),
                district: presentDistrict?.districtName || 'Hyderabad',
                state: presentDistrict?.stateName || 'Telangana',
                videoUrl: videoPreviewUrl,
                createdAt: 'Just now',
                likes: 1,
                views: '1',
                isUserUpload: true,
                duration: 'User Upload'
              });
            }
          }, 400);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoPreviewUrl(null);
    setTitle('');
    setDescription('');
    setUserName('');
    setIsSuccess(false);
    setIsUploading(false);
    setUploadProgress(0);
    setErrorMessage('');
  };

  const districtDisplay = presentDistrict?.districtName
    ? `${presentDistrict.districtName} (${presentDistrict.stateName || 'Telangana'})`
    : 'Local District';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-surface-border shadow-2xl overflow-hidden animate-fadeIn relative my-8">
        
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-surface-border flex items-center justify-between bg-gradient-to-r from-brand-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500 text-white flex items-center justify-center shadow-green-glow">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-100/60 px-2 py-0.5 rounded-full">
                  Common Talks
                </span>
                <span className="text-xs text-ink-secondary flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  {districtDisplay}
                </span>
              </div>
              <h2 className="text-xl font-bold text-ink-primary">
                Upload Video Opinion
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-ink-secondary flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {isSuccess ? (
            /* Success confirmation */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-brand-100 text-brand-600 mx-auto flex items-center justify-center mb-6 shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-ink-primary mb-2">
                Video Uploaded Successfully!
              </h3>
              <p className="text-ink-secondary text-sm max-w-md mx-auto mb-6">
                Thank you for contributing your voice to <strong>Common Talks</strong>. Your video will be featured in the community opinions stream for <strong>{districtDisplay}</strong>.
              </p>

              <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 max-w-md mx-auto text-left mb-6">
                <p className="text-xs text-ink-muted uppercase font-semibold mb-1">Uploaded Video</p>
                <p className="text-sm font-bold text-ink-primary truncate">{title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-ink-secondary">
                  <span className="px-2 py-0.5 rounded bg-brand-50 text-brand-700 font-medium">{topic}</span>
                  <span>•</span>
                  <span>{videoFile?.name}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-surface-border hover:bg-gray-50 text-ink-primary text-sm font-semibold transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Upload Another Video</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold shadow-md hover:shadow-green-glow transition-all"
                >
                  View in Common Talks Feed
                </button>
              </div>
            </div>
          ) : (
            /* Upload Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* File Dropzone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-2">
                  Video File (MP4, MOV, WebM)
                </label>

                {!videoPreviewUrl ? (
                  <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-brand-300 hover:border-brand-500 bg-brand-50/30 hover:bg-brand-50/60 rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="w-14 h-14 rounded-2xl bg-white border border-brand-200 text-brand-600 mx-auto flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-xs">
                      <Upload className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-semibold text-ink-primary mb-1">
                      Drag and drop your video file here, or <span className="text-brand-600 underline">browse</span>
                    </p>
                    <p className="text-xs text-ink-secondary">
                      Max file size: 200MB • Landscape or portrait supported
                    </p>
                  </div>
                ) : (
                  <div className="bg-surface-subtle border border-surface-border rounded-2xl p-4 relative">
                    <video
                      src={videoPreviewUrl}
                      controls
                      className="w-full max-h-60 rounded-xl bg-black object-contain mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileVideo className="w-5 h-5 text-brand-600 shrink-0" />
                        <span className="text-xs font-medium text-ink-primary truncate">
                          {videoFile?.name} ({(videoFile?.size / (1024 * 1024)).toFixed(1)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null);
                          URL.revokeObjectURL(videoPreviewUrl);
                          setVideoPreviewUrl(null);
                        }}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Topic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                    Video Title / Question <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., What everyday changes do we need in our neighborhood?"
                    className="w-full px-4 py-2.5 rounded-xl border border-surface-border focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm text-ink-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                    Select Topic
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm text-ink-primary bg-white"
                  >
                    {topicOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                    District / Locality
                  </label>
                  <div className="w-full px-3.5 py-2.5 rounded-xl border border-surface-border bg-gray-50 text-sm text-ink-primary flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-600 shrink-0" />
                    <span className="truncate">{districtDisplay}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink-secondary mb-1.5">
                  Opinion Summary / Context (Optional)
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Share a brief note about what your video covers..."
                  className="w-full px-4 py-2.5 rounded-xl border border-surface-border focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none text-sm text-ink-primary resize-none"
                />
              </div>

              {/* Author / Anonymous */}
              <div className="p-4 bg-surface-subtle border border-surface-border rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex-1 w-full sm:w-auto">
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    disabled={isAnonymous}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder={isAnonymous ? "Posting Anonymously" : "e.g. Ramesh Kumar"}
                    className="w-full px-3 py-1.5 rounded-lg border border-surface-border text-sm disabled:bg-gray-100 disabled:text-gray-400"
                  />
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer pt-1 sm:pt-4">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded border-gray-300 text-brand-600 focus:ring-brand-500 w-4 h-4"
                  />
                  <span className="text-xs font-medium text-ink-primary">Post Anonymously</span>
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Progress Bar while uploading */}
              {isUploading && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-ink-secondary">
                    <span>Uploading Video...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-500 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-surface-border text-ink-secondary hover:bg-gray-50 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:shadow-green-glow transition-all duration-200 disabled:opacity-60"
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      <span>Upload Video</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}
