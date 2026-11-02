import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Video, 
  Camera, 
  Film, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Tag, 
  Volume2, 
  VolumeX, 
  Play, 
  RotateCcw,
  Smile,
  Hash,
  Send,
  AlertCircle
} from 'lucide-react';
import { uploadCommonTalksVideo } from '../data/commonTalksStore';

export default function InstagramVideoUploadModal({ 
  isOpen, 
  onClose, 
  currentLocation = null, 
  onVideoUploaded = null 
}) {
  if (!isOpen) return null;

  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('🌾 Farmers');
  const [authorName, setAuthorName] = useState('Citizen Voice');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [customLocation, setCustomLocation] = useState(() => {
    if (currentLocation?.locality || currentLocation?.assembly) {
      return `${currentLocation.locality || currentLocation.assembly}, ${currentLocation.city || currentLocation.state || 'Telangana'}`;
    }
    return 'Jubilee Hills, Hyderabad';
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const galleryInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);

  const categories = [
    { label: '🌾 Farmers', value: 'Farmers', telugu: 'రైతు సమస్యలు' },
    { label: '🎓 Students & Jobs', value: 'Students', telugu: 'యువత & ఉపాధి' },
    { label: '👩 Women', value: 'Women', telugu: 'మహిళా సాధికారత' },
    { label: '🏙️ Local Civic', value: 'Civic', telugu: 'స్థానిక సమస్యలు' },
    { label: '💼 Work & Life', value: 'Workers', telugu: 'జీవనశైలి & ఉద్యోగం' },
    { label: '💬 Public Opinion', value: 'Public', telugu: 'ప్రజాభిప్రాయం' }
  ];

  const quickHashtags = [
    '#CommonTalks',
    '#PublicVoice',
    '#YouthJobs',
    '#Farmers',
    '#LocalIssues',
    '#Now9',
    '#Telangana',
    '#AndhraPradesh'
  ];

  const emojis = ['❤️', '🔥', '👏', '🌾', '🎓', '👩', '🏙️', '📢', '👍', '🇮🇳'];

  const handleFileSelected = (file) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setErrorMessage('Please select a valid video file (MP4, MOV, WebM).');
      return;
    }
    setErrorMessage('');
    setVideoFile(file);
    const objectUrl = URL.createObjectURL(file);
    setVideoPreviewUrl(objectUrl);
  };

  const handleAddHashtag = (tag) => {
    setCaption(prev => prev ? `${prev} ${tag}` : tag);
  };

  const handleAddEmoji = (emoji) => {
    setCaption(prev => prev + emoji);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!videoPreviewUrl && !videoFile) {
      setErrorMessage('Please choose or record a video first.');
      return;
    }
    if (!caption.trim()) {
      setErrorMessage('Please write a short caption or title for your video.');
      return;
    }

    setErrorMessage('');
    setIsUploading(true);
    setUploadProgress(20);

    // Instagram-style fast progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          setTimeout(() => {
            const matchedCat = categories.find(c => c.label === category) || categories[0];
            const newVideo = uploadCommonTalksVideo({
              title: caption.trim().split('\n')[0].slice(0, 70),
              caption: caption.trim(),
              author: isAnonymous ? 'Anonymous Citizen' : (authorName.trim() || 'Citizen Voice'),
              authorHandle: isAnonymous ? '@anonymous_citizen' : `@${(authorName || 'citizen').toLowerCase().replace(/\s+/g, '_')}`,
              role: matchedCat.value,
              category: matchedCat.value,
              topic: category,
              location: customLocation,
              district: currentLocation?.district || 'Hyderabad',
              videoUrl: videoPreviewUrl || 'https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4',
              thumbnail: '/assets/news_debate_studio.jpg',
              duration: '0:45'
            });

            setIsUploading(false);
            if (onVideoUploaded) onVideoUploaded(newVideo);
            onClose();
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 180);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      {/* Modal Card (Instagram style) */}
      <div className="w-full sm:max-w-md bg-[#121218] border border-[#262636] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-white">
        
        {/* Instagram Header Bar */}
        <div className="px-4 py-3 border-b border-[#222230] flex items-center justify-between shrink-0 bg-[#161622]">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xs font-semibold py-1 px-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 animate-pulse" />
            <h2 className="text-xs font-black text-white tracking-wide flex items-center gap-1">
              <span>New Reel</span>
              <span className="text-[10px] text-amber-400 font-semibold">• Common Talks</span>
            </h2>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading || (!videoPreviewUrl && !videoFile)}
            className={`text-xs font-extrabold py-1.5 px-3.5 rounded-full transition-all cursor-pointer shadow-sm ${
              isUploading || (!videoPreviewUrl && !videoFile)
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black hover:brightness-110 active:scale-95'
            }`}
          >
            {isUploading ? `${uploadProgress}%` : 'Share'}
          </button>
        </div>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="w-full h-1 bg-gray-800 overflow-hidden shrink-0">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-rose-500 to-purple-500 transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto phone-scroll p-4 space-y-4 touch-pan-y">
          
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-2.5 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. MEDIA SELECTION / PREVIEW (Instagram style) */}
          {!videoPreviewUrl ? (
            <div className="rounded-2xl border-2 border-dashed border-[#2F2F44] hover:border-amber-400/60 bg-[#161622]/60 p-6 text-center transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-rose-500/20 to-purple-500/20 border border-white/10 mx-auto flex items-center justify-center text-amber-400 mb-3 group-hover:scale-105 transition-transform shadow-inner">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-sm font-bold text-white mb-1">
                Upload Citizen Video / Reel
              </h3>
              <p className="text-[11px] text-gray-400 mb-4 max-w-xs mx-auto">
                Share 15-60 second local video opinion on public governance, village issues, or lifestyle.
              </p>

              {/* Dual Action Buttons: Gallery & Camera */}
              <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto">
                {/* Choose from Gallery */}
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="py-2.5 px-3 rounded-xl bg-[#232334] hover:bg-[#2C2C40] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-white/5 active:scale-95"
                >
                  <Upload className="w-3.5 h-3.5 text-amber-400" />
                  <span>Choose Video</span>
                </button>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileSelected(e.target.files?.[0])}
                  className="hidden"
                />

                {/* Record Camera */}
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  <Camera className="w-3.5 h-3.5 text-white" />
                  <span>Record Live</span>
                </button>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="video/*"
                  capture="environment"
                  onChange={(e) => handleFileSelected(e.target.files?.[0])}
                  className="hidden"
                />
              </div>

              {/* Sample Demo Clip Shortcut */}
              <button
                type="button"
                onClick={() => {
                  setVideoPreviewUrl('https://assets.mixkit.co/videos/preview/mixkit-news-anchor-talking-on-a-studio-set-41315-large.mp4');
                  setCaption('రైతులకు సకాలంలో మద్దతు ధర & విత్తనాలు అందాలి. మా గ్రామ అభిప్రాయం #CommonTalks #Farmers');
                }}
                className="mt-3 text-[10px] text-amber-400/80 hover:text-amber-300 underline cursor-pointer"
              >
                Or use Demo Studio Clip ▶
              </button>
            </div>
          ) : (
            /* Selected Video Player Preview (Instagram style) */
            <div className="relative rounded-2xl overflow-hidden bg-black border border-[#2B2B3C] shadow-lg group">
              <video
                ref={videoRef}
                src={videoPreviewUrl}
                autoPlay
                playsInline
                loop
                muted={isMuted}
                className="w-full h-52 object-cover"
              />

              {/* Top Video Badges & Controls */}
              <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                <span className="px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[8.5px] font-black text-amber-400 border border-amber-400/30 flex items-center gap-1">
                  <Film className="w-3 h-3" />
                  <span>PREVIEW REEL</span>
                </span>

                <div className="flex items-center gap-1 pointer-events-auto">
                  <button
                    type="button"
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-amber-400 cursor-pointer"
                    title="Toggle Audio"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setVideoFile(null);
                      setVideoPreviewUrl(null);
                    }}
                    className="p-1 rounded-full bg-black/70 backdrop-blur-md text-white hover:text-red-400 cursor-pointer"
                    title="Change Video"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bottom Video Info */}
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] text-white/80 pointer-events-none bg-black/60 backdrop-blur-xs px-2 py-1 rounded-lg">
                <span className="truncate max-w-[200px]">
                  {videoFile?.name || 'Common Talks Video Reel'}
                </span>
                <span className="font-mono text-amber-300">Ready to Post ✓</span>
              </div>
            </div>
          )}

          {/* 2. INSTAGRAM-STYLE USER HEADER & NAME */}
          <div className="p-3 rounded-2xl bg-[#171722] border border-[#232332] space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
                  <div className="w-full h-full rounded-full bg-[#121218] flex items-center justify-center text-xs font-bold text-white">
                    {isAnonymous ? '🕶️' : (authorName.charAt(0) || '👤')}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">
                    {isAnonymous ? 'Posting Anonymously' : (authorName || 'Citizen Voice')}
                  </h4>
                  <span className="text-[9px] text-gray-400">
                    Posting to Common Talks Community
                  </span>
                </div>
              </div>

              {/* Toggle Anonymous */}
              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                  isAnonymous 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' 
                    : 'bg-[#202030] text-gray-400 border-white/5'
                }`}
              >
                {isAnonymous ? '🕶️ Anonymous' : 'Public Name'}
              </button>
            </div>

            {!isAnonymous && (
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Enter your name or handle..."
                className="w-full bg-[#101018] border border-[#2B2B3E] rounded-xl px-3 py-1.5 text-xs text-white outline-none focus:border-amber-400"
              />
            )}
          </div>

          {/* 3. CAPTION & HASHTAGS (Instagram style) */}
          <div className="p-3 rounded-2xl bg-[#171722] border border-[#232332] space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Caption & Opinion (శీర్షిక / వివరణ)
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption... మీ ఆలోచన లేదా సమస్యను ఇక్కడ పంచుకోండి..."
              className="w-full bg-[#101018] border border-[#2B2B3E] rounded-xl p-2.5 text-xs text-white font-telugu outline-none focus:border-amber-400 resize-none leading-relaxed"
            />

            {/* Quick Emoji Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto phone-scroll pb-1">
              <span className="text-[9px] text-gray-500 font-semibold shrink-0">Emojis:</span>
              {emojis.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddEmoji(emoji)}
                  className="p-1 rounded-lg hover:bg-white/10 text-xs shrink-0 cursor-pointer active:scale-90"
                >
                  {emoji}
                </button>
              ))}
            </div>

            {/* Quick Hashtags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-[#222230]">
              <span className="text-[9px] text-gray-500 font-semibold shrink-0">Hashtags:</span>
              {quickHashtags.map((tag, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAddHashtag(tag)}
                  className="px-2 py-0.5 rounded-full bg-[#202030] hover:bg-[#2A2A40] text-amber-300 text-[9px] font-medium transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* 4. CATEGORY SELECTOR */}
          <div className="p-3 rounded-2xl bg-[#171722] border border-[#232332] space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
              Select Topic Sphere (విభాగం)
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setCategory(cat.label)}
                  className={`py-2 px-2.5 rounded-xl text-[10px] font-bold transition-all text-left flex flex-col cursor-pointer border ${
                    category === cat.label
                      ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-xs'
                      : 'bg-[#101018] text-gray-400 border-[#262638] hover:text-white'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className="text-[8px] opacity-70 font-telugu mt-0.5">{cat.telugu}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. LOCATION TAG */}
          <div className="p-3 rounded-2xl bg-[#171722] border border-[#232332] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <div className="min-w-0">
                <span className="text-[9px] text-gray-400 block">Location Tag</span>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Constituency, City..."
                  className="bg-transparent text-xs text-white font-bold outline-none w-full border-b border-dashed border-gray-600 focus:border-amber-400"
                />
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[8px] font-bold border border-emerald-500/30 shrink-0">
              ✓ Verified
            </span>
          </div>

        </div>

        {/* Modal Bottom Share Button */}
        <div className="p-3 border-t border-[#222230] bg-[#161622] shrink-0">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isUploading || (!videoPreviewUrl && !videoFile)}
            className={`w-full py-3 rounded-2xl font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
              isUploading || (!videoPreviewUrl && !videoFile)
                ? 'bg-[#222230] text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black hover:brightness-110 active:scale-98 shadow-amber-500/20'
            }`}
          >
            {isUploading ? (
              <span>Uploading to Common Talks ({uploadProgress}%)...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Share Reel to Common Talks (పోస్ట్ చేయండి)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

