"use client";

import { useState, useMemo } from "react";
import { useExhibitionStore, exhibitions } from "@/app/store";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export function CaseLibrarySearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<number | null>(null);
  const { searchResults, searchCases, setCurrentExhibition } = useExhibitionStore();

  const filteredResults = useMemo(() => {
    let results = searchQuery ? searchResults : exhibitions;

    if (selectedStage) {
      results = results.filter((ex) => ex.stage === selectedStage);
    }

    return results;
  }, [searchQuery, searchResults, selectedStage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      searchCases(query);
    }
  };

  const stages = Array.from({ length: 7 }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="搜索案例、关键词、战略阶段..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-blue-500/30 rounded-lg focus:outline-none focus:border-blue-500 transition text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Stage filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-300 mb-3">按阶段筛选</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedStage(null)}
            className={`px-3 py-2 rounded-lg transition text-sm font-medium ${
              selectedStage === null
                ? "bg-blue-600 text-white"
                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
            }`}
          >
            全部
          </motion.button>
          {stages.map((stage) => (
            <motion.button
              key={stage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStage(stage)}
              className={`px-3 py-2 rounded-lg transition text-sm font-medium ${
                selectedStage === stage
                  ? "bg-blue-600 text-white"
                  : "bg-slate-700 text-gray-300 hover:bg-slate-600"
              }`}
            >
              第{stage}阶段
            </motion.button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          找到 {filteredResults.length} 个相关内容
        </p>

        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResults.map((exhibition, index) => (
              <motion.div
                key={exhibition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setCurrentExhibition(exhibition)}
                className="group bg-gradient-to-br from-slate-800 to-slate-900 border border-blue-500/30 rounded-lg p-6 hover:border-blue-400 cursor-pointer transition card-hover"
              >
                {/* Stage badge */}
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-500/30 rounded-full text-sm font-medium text-blue-300">
                    第{exhibition.stage}阶段
                  </span>
                  <span className="text-2xl text-gray-600 group-hover:text-blue-400 transition">
                    →
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-blue-300 transition">
                  {exhibition.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4">
                  {exhibition.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {exhibition.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-slate-700/50 rounded text-gray-300"
                    >
                      #{highlight}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 mb-4">未找到相关内容</p>
            <p className="text-sm text-gray-500">
              请尝试其他关键词或选择不同的筛选条件
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
