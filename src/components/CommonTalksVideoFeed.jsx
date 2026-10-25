import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Pause, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Tag, 
  Sparkles, 
  PlusCircle, 
  User, 
  Volume2, 
  VolumeX, 
  Maximize2,
  CheckCircle2
} from 'lucide-react';

export default function CommonTalksVideoFeed({ 
  videos = [], 
  onUploadVideo, 
  presentDistrict,
  selectedTopic = 'all',
  onSelectTopic
}) {
  const [activeTopic, setActiveTopic] = useState('all');
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [likedVideoIds, setLikedVideoIds] = useState(new Set());
  const [likeCounts, setLikeCounts] = useState({});

  const topics = [
    'all',
    'Work & Life Balance',
    'Consumer Habits',
    'Digital Living',
    'Daily Culture'
  ];

  const handleTogglePlay = (videoId) => {
    setPlayingVideoId(prev => prev === videoId ? null : videoId);
  };

  const handleToggleLike = (videoId, currentLikes) => {
    setLikedVideoIds(prev => {
      const next = new Set(prev);
      const isLiked = next.has(videoId);
      if (isLiked) {
        next.delete(videoId);
        setLikeCounts(c => ({ ...c, [videoId]: (c[videoId] ?? currentLikes) - 1 }));
      } else {
        next.add(videoId);
        setLikeCounts(c => ({ ...c, [videoId]: (c[videoId] ?? currentLikes) + 1 }));
      }
      return next;
    });
  };

  const filteredVideos = videos.filter(video => {
    if (activeTopic === 'all') return true;
    return video.topic?.toLowerCase() === activeTopic.toLowerCase();
  });

  return (
    <div className="bg-white rounded-3xl border border-surface-border p-6 sm:p-8 shadow-card my-10" id="common-talks-videos">
      {/* Feed Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-border">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 text-brand-700 border border-brand-200">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              Community Voices
            </span>
            <span className="text-xs text-ink-secondary">
              • {videos.length} Video Opinions
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-ink-primary">
            Common Talks Video Feed
          </h3>
          <p className="text-sm text-ink-secondary mt-1">
            Real citizen perspectives, personal stories, and opinions on everyday life in your district.
          </p>
        </div>

        {/* Upload Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onUploadVideo && onUploadVideo()}
            className="inline-flex items-center justify-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow-green-glow transition-all duration-200"
          >
            <Video className="w-4 h-4" />
            <span>Upload Your Video</span>
          </button>
        </div>
      </div>

      {/* Topic Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {topics.map(topic => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTopic === topic
                ? 'bg-brand-500 text-white shadow-xs'
                : 'bg-surface-subtle text-ink-secondary hover:bg-gray-100 hover:text-ink-primary border border-surface-borderLight'
            }`}
          >
            {topic === 'all' ? 'All Topics' : topic}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      {filteredVideos.length === 0 ? (
        <div className="text-center py-12 bg-surface-subtle rounded-2xl border border-dashed border-surface-border">
          <Video className="w-12 h-12 text-ink-muted mx-auto mb-3 opacity-60" />
          <h4 className="text-base font-bold text-ink-primary mb-1">
            No videos in this topic yet
          </h4>
          <p className="text-xs text-ink-secondary mb-4 max-w-sm mx-auto">
            Be the first citizen from your district to share a video opinion on this topic!
          </p>
          <button
            onClick={() => onUploadVideo && onUploadVideo()}
            className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Upload First Video</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredVideos.map((video) => {
            const isPlaying = playingVideoId === video.id;
            const isLiked = likedVideoIds.has(video.id);
            const displayLikes = likeCounts[video.id] ?? video.likes ?? 0;

            return (
              <div
                key={video.id}
                className={`group bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 ${
                  video.isUserUpload
                    ? 'border-brand-400 shadow-md ring-2 ring-brand-400/20'
                    : 'border-surface-border hover:border-brand-200 hover:shadow-card'
                }`}
              >
                {/* Video Viewport / Thumbnail */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
                  {video.videoUrl ? (
                    <video
                      id={`player-${video.id}`}
                      src={video.videoUrl}
                      controls={isPlaying}
                      autoPlay={isPlaying}
                      playsInline
                      className="w-full h-full object-contain"
                      onPlay={() => setPlayingVideoId(video.id)}
                      onPause={() => {
                        if (playingVideoId === video.id) setPlayingVideoId(null);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white/50">
                      <Video className="w-10 h-10" />
                    </div>
                  )}

                  {/* Play overlay button if paused */}
                  {!isPlaying && (
                    <div 
                      onClick={() => handleTogglePlay(video.id)}
                      className="absolute inset-0 bg-black/30 hover:bg-black/20 flex items-center justify-center cursor-pointer transition-colors group/overlay"
                    >
                      <div className="w-13 h-13 rounded-full bg-brand-500/90 text-white flex items-center justify-center shadow-lg group-hover/overlay:scale-110 group-hover/overlay:bg-brand-500 transition-all">
                        <Play className="w-6 h-6 ml-0.5 fill-current" />
                      </div>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    {video.isUserUpload ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-brand-500 text-white font-bold text-[11px] shadow-sm tracking-wide">
                        <Sparkles className="w-3 h-3" />
                        YOUR UPLOAD
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-white font-medium text-[11px]">
                        <Tag className="w-3 h-3 text-brand-400" />
                        {video.topic}
                      </span>
                    )}

                    {video.duration && (
                      <span className="px-2 py-0.5 rounded-md bg-black/70 text-white font-mono text-[10px]">
                        {video.duration}
                      </span>
                    )}
                  </div>
                </div>

                {/* Video Info Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Author & District */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-7 h-7 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                          {video.author ? video.author.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-ink-primary truncate">
                            {video.author}
                          </p>
                          <span className="text-[11px] text-ink-muted flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 text-brand-500 shrink-0" />
                            {video.district || 'Telangana'} • {video.createdAt || 'Recently'}
                          </span>
                        </div>
                      </div>

                      {video.isUserUpload && (
                        <span className="shrink-0 text-[10px] font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2 py-0.5 rounded-full">
                          Live Now
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="text-sm font-bold text-ink-primary line-clamp-2 mb-1.5 group-hover:text-brand-600 transition-colors">
                      {video.title}
                    </h4>

                    {/* Description */}
                    {video.description && (
                      <p className="text-xs text-ink-secondary line-clamp-2 mb-3">
                        {video.description}
                      </p>
                    )}
                  </div>

                  {/* Actions & Stats Footer */}
                  <div className="pt-3 border-t border-surface-borderLight flex items-center justify-between text-xs text-ink-secondary">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleLike(video.id, video.likes || 0)}
                        className={`inline-flex items-center gap-1.5 font-medium transition-colors ${
                          isLiked ? 'text-red-600 font-bold' : 'hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current text-red-600' : ''}`} />
                        <span>{displayLikes}</span>
                      </button>

                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-ink-muted" />
                        <span>Opinions</span>
                      </span>
                    </div>

                    <span className="text-[11px] text-ink-muted">
                      {video.views ? `${video.views} views` : 'New'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
