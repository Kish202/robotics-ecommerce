import React, { useState } from 'react';
import { Play } from 'lucide-react';
import VideoPlayer from '../common/VideoPlayer';
import Card from '../common/Card';

const VideoDemo = ({ videos = [] }) => {
  const [selectedVideo, setSelectedVideo] = useState(0);

  // Default demo videos if none provided
  const defaultVideos = [
    {
      id: 1,
      title: 'Product Overview',
      description: 'Complete walkthrough of features and capabilities',
      thumbnail: '🎬',
      duration: '3:45',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // placeholder
    },
    {
      id: 2,
      title: 'Setup & Installation',
      description: 'Easy step-by-step guide to get started',
      thumbnail: '🔧',
      duration: '2:30',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
    {
      id: 3,
      title: 'Advanced Features',
      description: 'Discover pro tips and advanced functionality',
      thumbnail: '⚡',
      duration: '4:15',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
    {
      id: 4,
      title: 'Customer Testimonial',
      description: 'Real users share their experiences',
      thumbnail: '💬',
      duration: '2:00',
      url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    },
  ];

  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Video Demonstrations
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Watch detailed product demonstrations and tutorials
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Video Player */}
        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden group">
            {/* Placeholder video player */}
            <div className="w-full h-full flex flex-col items-center justify-center p-8">
              <div className="text-8xl mb-4 animate-pulse">
                {displayVideos[selectedVideo].thumbnail}
              </div>
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-10 h-10 text-white ml-1" />
              </div>
              <p className="text-white text-center text-sm opacity-75">
                Click to play video demonstration
              </p>
            </div>

            {/* If using actual VideoPlayer component */}
            {/* <VideoPlayer
              src={displayVideos[selectedVideo].url}
              poster={displayVideos[selectedVideo].thumbnail}
            /> */}
          </div>

          {/* Current Video Info */}
          <div className="mt-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {displayVideos[selectedVideo].title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {displayVideos[selectedVideo].description}
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                {displayVideos[selectedVideo].duration}
              </span>
              <span>•</span>
              <span>{displayVideos.length} videos available</span>
            </div>
          </div>
        </div>

        {/* Video Playlist */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
            More Videos
          </h4>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
            {displayVideos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => setSelectedVideo(index)}
                className={`
                  w-full text-left p-3 rounded-lg transition-all
                  ${
                    index === selectedVideo
                      ? 'bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-500'
                      : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750'
                  }
                `}
              >
                <div className="flex gap-3">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-16 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <div className="text-3xl">{video.thumbnail}</div>
                    
                    {/* Play icon overlay */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/80 rounded-full flex items-center justify-center">
                        <Play className="w-4 h-4 text-gray-900 ml-0.5" />
                      </div>
                    </div>

                    {/* Duration badge */}
                    <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-xs rounded">
                      {video.duration}
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <h5 className={`
                      font-medium text-sm mb-1 line-clamp-2
                      ${
                        index === selectedVideo
                          ? 'text-blue-600 dark:text-blue-400'
                          : 'text-gray-900 dark:text-white'
                      }
                    `}>
                      {video.title}
                    </h5>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {video.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {displayVideos.length}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Videos</div>
            </div>
            <div className="w-px h-8 bg-gray-300 dark:bg-gray-700"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                15min
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Total Duration</div>
            </div>
          </div>

          <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            View All Tutorials →
          </button>
        </div>
      </div>
    </Card>
  );
};

export default VideoDemo;