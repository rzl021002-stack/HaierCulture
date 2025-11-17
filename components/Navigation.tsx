"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Map3d, Users, BookOpen, Zap } from "lucide-react";

export function Navigation() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-blue-500/30">
        <TabsTrigger value="overview" className="flex items-center gap-2">
          <Map3d className="w-4 h-4" />
          <span className="hidden sm:inline">总览</span>
        </TabsTrigger>
        <TabsTrigger value="immersive" className="flex items-center gap-2">
          <Zap className="w-4 h-4" />
          <span className="hidden sm:inline">漫游</span>
        </TabsTrigger>
        <TabsTrigger value="assessment" className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="hidden sm:inline">测评</span>
        </TabsTrigger>
        <TabsTrigger value="library" className="flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">案例库</span>
        </TabsTrigger>
      </TabsList>

      {/* Tab contents will be rendered by parent */}
    </Tabs>
  );
}
