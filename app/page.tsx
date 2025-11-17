"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExhibitionMap } from "@/components/ExhibitionMap";
import { ImmersiveExperience } from "@/components/ImmersiveExperience";
import { CulturalAssessment } from "@/components/CulturalAssessment";
import { CaseLibrarySearch } from "@/components/CaseLibrarySearch";
import { ExhibitionDetail } from "@/components/ExhibitionDetail";
import { useExhibitionStore } from "@/app/store";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Map3d, Zap, Users, BookOpen } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("overview");
  const { setImmersiveMode } = useExhibitionStore();

  const handleEnterImmersive = () => {
    setImmersiveMode(true);
    setActiveTab("immersive");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-blue-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                海尔文化展
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                探索七大战略阶段和企业文化价值观
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">海尔企业文化展厅数字化平台</p>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            {/* Navigation tabs */}
            <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-800/50 to-slate-800/30 border border-blue-500/30 p-1 rounded-lg mb-8">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-500"
              >
                <Map3d className="w-4 h-4" />
                <span className="hidden sm:inline">展厅总览</span>
              </TabsTrigger>
              <TabsTrigger
                value="immersive"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-500"
              >
                <Zap className="w-4 h-4" />
                <span className="hidden sm:inline">沉浸漫游</span>
              </TabsTrigger>
              <TabsTrigger
                value="assessment"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-600 data-[state=active]:to-amber-500"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">文化测评</span>
              </TabsTrigger>
              <TabsTrigger
                value="library"
                className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-emerald-500"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">案例库</span>
              </TabsTrigger>
            </TabsList>

            {/* Overview tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* 3D Map */}
                <div className="lg:col-span-2">
                  <div className="bg-slate-800/30 border border-blue-500/30 rounded-lg overflow-hidden">
                    <div className="h-96 md:h-[500px]">
                      <ExhibitionMap />
                    </div>
                  </div>
                </div>

                {/* Exhibition detail sidebar */}
                <div className="flex flex-col gap-4">
                  <div className="flex-1 bg-slate-800/30 rounded-lg overflow-hidden">
                    <ExhibitionDetail />
                  </div>

                  {/* Action buttons */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnterImmersive}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    进入沉浸式漫游
                  </motion.button>
                </div>
              </motion.div>

              {/* Features overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                {[
                  {
                    title: "3D 交互地图",
                    desc: "可点击的展厅平面图，支持多视角浏览",
                  },
                  {
                    title: "沉浸式体验",
                    desc: "方向键操控，自由探索展厅内部",
                  },
                  {
                    title: "文化值测评",
                    desc: "生成个人文化画像，沉淀行为数据",
                  },
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-4 bg-gradient-to-br from-slate-800/50 to-slate-900 border border-blue-500/20 rounded-lg card-hover"
                  >
                    <h3 className="font-bold text-blue-300 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Immersive tab */}
            <TabsContent value="immersive">
              <AnimatePresence>
                <ImmersiveExperience />
              </AnimatePresence>
            </TabsContent>

            {/* Assessment tab */}
            <TabsContent value="assessment">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="max-w-2xl mx-auto">
                  <CulturalAssessment />
                </div>
              </motion.div>
            </TabsContent>

            {/* Library tab */}
            <TabsContent value="library">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CaseLibrarySearch />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-500/20 bg-slate-950/50 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>© 2024 Haier Culture Exhibition Platform | 海尔文化展数字化平台</p>
          <p className="mt-2 text-xs">
            Built with Next.js • Three.js • React Three Fiber
          </p>
        </div>
      </footer>
    </main>
  );
}
