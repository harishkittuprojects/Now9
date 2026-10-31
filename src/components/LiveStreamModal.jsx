import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Radio, 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  Users, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Heart, 
  Flame, 
  ThumbsUp, 
  Award, 
  Share2, 
  Settings, 
  CheckCircle2, 
  AlertCircle,
  MapPin,
  Play,
  Square,
  ShieldCheck,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { startLiveBroadcast, endLiveBroadcast, getActiveBroadcast } from '../data/liveBroadcastStore';

export default function LiveStreamModal({ isOpen, onClose, presentDistrict, initialMode = 'conduct' }) {
  if (!isOpen) return null;

  // Modes: 'conduct' (host / studio) or 'watch' (viewer)
  const [streamMode, setStreamMode] = useState(initialMode);
  const [isBroadcasting, setIsBroadcasting] = useState(() => getActiveBroadcast().isLive);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Live Stream Details
  const districtName = presentDistrict?.districtName || 'Nagarkurnool';
  const stateName = presentDistrict?.stateName || 'Telangana';
  const [streamTitle, setStreamTitle] = useState(`${districtName} Live Townhall & Civic Discussion`);
  const [streamCategory, setStreamCategory] = useState('Common Talks');
  
  // Stats
  const [viewerCount, setViewerCount] = useState(1480);
  const [streamDuration, setStreamDuration] = useState(0);

  // Interactive Live Chat
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Suresh V.', district: districtName, text: 'Hello everyone! Glad Now 9 started live streaming for our district.', time: '1 min ago', isHost: false },
    { id: 2, user: 'Now 9 Moderator', district: 'Platform', text: 'Welcome to Now 9 Live Stream. Keep comments respectful and civic-minded.', time: 'Just now', isHost: true },
    { id: 3, user: 'Priya K.', district: 'Hyderabad', text: 'Watching live! What are the key priorities discussed today?', time: 'Just now', isHost: false },
  ]);
  const [chatInput, setChatInput] = useState('');

  // Floating Reactions
  const [floatingReactions, setFloatingReactions] = useState([]);

  const videoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Camera stream setup
  useEffect(() => {
    if (streamMode === 'conduct') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [streamMode]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        mediaStreamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
        setIsMicOn(true);
      }
    } catch (err) {
      console.warn("Webcam access not granted or not available, using simulated stream feed:", err);
      setCameraError('Camera access unavailable. Using Now 9 Studio High-Def Feed.');
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const toggleCamera = () => {
    if (mediaStreamRef.current) {
      const videoTrack = mediaStreamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
        return;
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    if (mediaStreamRef.current) {
      const audioTrack = mediaStreamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
        return;
      }
    }
    setIsMicOn(!isMicOn);
  };

  // Timer while broadcasting
  useEffect(() => {
    let timer;
    if (isBroadcasting) {
      timer = setInterval(() => {
        setStreamDuration(prev => prev + 1);
        setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
      }, 1000);
    } else {
      setStreamDuration(0);
    }
    return () => clearInterval(timer);
  }, [isBroadcasting]);

  // Format seconds to HH:MM:SS
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: Date.now(),
      user: streamMode === 'conduct' ? 'You (Host)' : 'You',
      district: districtName,
      text: chatInput.trim(),
      time: 'Just now',
      isHost: streamMode === 'conduct'
    };

    setChatMessages(prev => [...prev, newMsg]);
    setChatInput('');
  };

  const addReaction = (emoji) => {
    const id = Date.now() + Math.random();
    setFloatingReactions(prev => [...prev, { id, emoji, left: Math.floor(Math.random() * 60) + 20 }]);
    setTimeout(() => {
      setFloatingReactions(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-6xl w-full text-white shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/40 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span>{isBroadcasting ? 'LIVE NOW' : 'STUDIO READY'}</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                {districtName} ({stateName})
              </span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-lg font-medium text-brand-400">
                {streamCategory}
              </span>
            </div>
          </div>

          {/* Mode Switcher (Conduct vs Watch) & Close */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-xl flex items-center text-xs font-semibold">
              <button
                onClick={() => setStreamMode('conduct')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  streamMode === 'conduct'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Conduct Stream (Studio)
              </button>
              <button
                onClick={() => setStreamMode('watch')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  streamMode === 'watch'
                    ? 'bg-brand-500 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Watch Stream
              </button>
            </div>

            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Workspace: Video on Left, Live Chat & Controls on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden min-h-0">
          
          {/* Main Video Stream Player */}
          <div className="lg:col-span-8 bg-black relative flex flex-col justify-between overflow-hidden p-4 sm:p-6 min-h-[380px] lg:min-h-[540px]">
            
            {/* Live Stream Viewport */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none z-10"></div>

            {/* Video element or simulated feed */}
            {streamMode === 'conduct' && isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              /* Simulated Studio Visualizer Feed */
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-brand-950/40 flex flex-col items-center justify-start pt-16 sm:pt-20 px-6 text-center z-0">
                <div className="relative mb-3 sm:mb-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-500/20 border-2 border-brand-500/40 flex items-center justify-center animate-pulse shadow-lg shadow-brand-500/20">
                    <Radio className="w-8 h-8 sm:w-10 sm:h-10 text-brand-400" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight mb-1 drop-shadow-md">
                  Now 9 Live Civic Broadcast
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-sm sm:max-w-md leading-relaxed">
                  {streamMode === 'conduct'
                    ? 'Previewing virtual broadcast studio. Click "Start Live Stream" below to go on-air.'
                    : `Streaming real-time citizen debate and civic townhall from ${districtName}.`}
                </p>

                {cameraError && (
                  <span className="mt-2 text-[11px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-0.5 rounded-full">
                    {cameraError}
                  </span>
                )}
              </div>
            )}

            {/* Top Video Overlay: Title & Live Badges */}
            <div className="relative z-20 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="bg-red-600 text-white text-xs font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    LIVE
                  </span>
                  <span className="bg-black/60 backdrop-blur-md text-xs font-semibold px-2.5 py-0.5 rounded-full text-slate-200 border border-white/10 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-400" />
                    {viewerCount.toLocaleString()} watching
                  </span>
                  {isBroadcasting && (
                    <span className="bg-black/60 backdrop-blur-md text-xs font-mono px-2 py-0.5 rounded-full text-emerald-400 border border-white/10">
                      ⏱ {formatDuration(streamDuration)}
                    </span>
                  )}
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-white drop-shadow-md">
                  {streamTitle}
                </h1>
              </div>

              <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl text-right">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Broadcasting Node</p>
                <p className="text-xs font-bold text-brand-400">1080p 60fps • Ultra Low Latency</p>
              </div>
            </div>

            {/* Floating Reactions Visual Layer */}
            <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
              {floatingReactions.map(r => (
                <div
                  key={r.id}
                  style={{ left: `${r.left}%` }}
                  className="absolute bottom-20 text-3xl animate-floatUp"
                >
                  {r.emoji}
                </div>
              ))}
            </div>

            {/* Bottom Overlay: Stream Controls */}
            <div className="relative z-20 space-y-4">
              {/* Host Broadcast Action Buttons */}
              {streamMode === 'conduct' && (
                <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMic}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isMicOn
                          ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                          : 'bg-red-500/20 text-red-400 border-red-500/40'
                      }`}
                      title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
                    >
                      {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={toggleCamera}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isCameraOn
                          ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                          : 'bg-red-500/20 text-red-400 border-red-500/40'
                      }`}
                      title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
                    >
                      {isCameraOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        isScreenSharing
                          ? 'bg-brand-500 text-white border-brand-400'
                          : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                      }`}
                      title="Share Screen"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Broadcast Trigger */}
                  <div>
                    {!isBroadcasting ? (
                      <button
                        onClick={() => {
                          startLiveBroadcast({
                            title: streamTitle,
                            host: 'Now9 Prime Host',
                            constituency: districtName
                          });
                          setIsBroadcasting(true);
                        }}
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg hover:shadow-red-glow transition-all cursor-pointer"
                      >
                        <Play className="w-4 h-4 fill-white" />
                        <span>Start Live Stream</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          endLiveBroadcast();
                          setIsBroadcasting(false);
                        }}
                        className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-red-400 border border-red-500/40 font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl transition-all cursor-pointer"
                      >
                        <Square className="w-4 h-4 fill-red-400" />
                        <span>End Broadcast & Save</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: Live Chat & Reactions */}
          <div className="lg:col-span-4 bg-slate-950 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 h-[380px] lg:h-auto">
            
            {/* Citizen Chat Header */}
            <div className="p-2.5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Citizen Live Chat</span>
              </div>

              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live
              </span>
            </div>
            {/* Chat Messages Log */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0 text-xs">
              <div className="p-2.5 bg-brand-500/10 border border-brand-500/20 rounded-xl text-slate-300">
                <p className="font-semibold text-brand-400 mb-0.5">📌 Pinned by Now 9 Host</p>
                <p className="text-[11px] leading-relaxed">
                  Welcome to the live public townhall! Ask questions about local development and voice your opinion freely.
                </p>
              </div>

              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold ${msg.isHost ? 'text-amber-400' : 'text-brand-400'}`}>
                      {msg.user}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      • {msg.district}
                    </span>
                    <span className="text-[10px] text-slate-600 ml-auto">
                      {msg.time}
                    </span>
                  </div>
                  <p className="text-slate-200 leading-relaxed bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800/80">
                    {msg.text}
                  </p>
                </div>
              ))}
              <div ref={chatBottomRef} />
            </div>

            {/* Floating Reaction Triggers & Message Input */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/40 space-y-2">
              
              {/* Quick Reactions Bar */}
              <div className="flex items-center justify-around py-1 bg-slate-900 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => addReaction('❤️')}
                  className="hover:scale-125 transition-transform p-1.5 text-base"
                  title="Love"
                >
                  ❤️
                </button>
                <button
                  type="button"
                  onClick={() => addReaction('🔥')}
                  className="hover:scale-125 transition-transform p-1.5 text-base"
                  title="Fire"
                >
                  🔥
                </button>
                <button
                  type="button"
                  onClick={() => addReaction('👏')}
                  className="hover:scale-125 transition-transform p-1.5 text-base"
                  title="Clap"
                >
                  👏
                </button>
                <button
                  type="button"
                  onClick={() => addReaction('👍')}
                  className="hover:scale-125 transition-transform p-1.5 text-base"
                  title="Thumbs Up"
                >
                  👍
                </button>
                <button
                  type="button"
                  onClick={() => addReaction('🇮🇳')}
                  className="hover:scale-125 transition-transform p-1.5 text-base"
                  title="Citizen Voice"
                >
                  🇮🇳
                </button>
              </div>

              {/* Chat Input Box */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send a live public message..."
                  className="flex-1 bg-slate-900 border border-slate-700 focus:border-brand-500 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-brand-500 hover:bg-brand-600 text-white p-2 rounded-xl transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
