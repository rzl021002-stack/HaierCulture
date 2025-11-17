"use client";

import { motion } from "framer-motion";
import { ChevronRight, Volume2, VideoPlay } from "lucide-react";
import { useExhibitionStore } from "@/app/store";

export function ExhibitionDetail() {
  const { currentExhibition, isAudioPlaying, setAudioPlaying } =
    useExhibitionStore();

  if (!currentExhibition) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-full flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-gray-400">选择一个展区查看详情</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-blue-500/30 overflow-y-auto"
    >
      {/* Stage indicator */}
      <div className="flex items-center gap-2 mb-6">
        <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
        <p className="text-sm text-gray-400">第{currentExhibition.stage}阶段</p>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-white glow-effect">
        {currentExhibition.name}
      </h1>

      {/* Description */}
      <p className="text-lg text-gray-300 mb-8 leading-relaxed">
        {currentExhibition.description}
      </p>

      {/* Media controls */}
      <div className="space-y-3 mb-8">
        {currentExhibition.audioUrl && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setAudioPlaying(!isAudioPlaying)}
            className="w-full flex items-center justify-between px-4 py-3 bg-blue-600/30 border border-blue-400/50 rounded-lg hover:bg-blue-600/50 transition"
          >
            <div className="flex items-center gap-3">
              <Volume2 className="w-5 h-5" />
              <span>播放音频讲解</span>
            </div>
            {isAudioPlaying && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />}
          </motion.button>
        )}

        {currentExhibition.videoUrl && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-between px-4 py-3 bg-purple-600/30 border border-purple-400/50 rounded-lg hover:bg-purple-600/50 transition"
          >
            <div className="flex items-center gap-3">
              <VideoPlay className="w-5 h-5" />
              <span>播放视频</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        )}
      </div>

      {/* Highlights */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">核心要点</h2>
        <div className="space-y-2">
          {currentExhibition.highlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-slate-700/50 rounded-lg"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">
                {index + 1}
              </span>
              <p className="text-gray-200">{highlight}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Additional info */}
      <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4">
        <h3 className="font-semibold mb-3">相关信息</h3>
        <div className="space-y-2 text-sm text-gray-300">
          <p>📍 位置：({currentExhibition.position[0]}, {currentExhibition.position[1]})</p>
          <p>🏷️ ID：{currentExhibition.id}</p>
          <p>📖 阶段编号：{currentExhibition.stage}</p>
        </div>
      </div>
    </motion.div>
  );
}
