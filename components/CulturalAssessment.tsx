"use client";

import { useState } from "react";
import { useExhibitionStore } from "@/app/store";
import { motion } from "framer-motion";

const culturalDimensions = [
  {
    id: "innovation",
    label: "创新能力",
    description: "你有多倾向于创新和突破传统？",
  },
  {
    id: "collaboration",
    label: "协作精神",
    description: "你有多重视团队合作和沟通？",
  },
  {
    id: "customer-focus",
    label: "客户导向",
    description: "你有多关注客户需求和满意度？",
  },
  {
    id: "excellence",
    label: "追求卓越",
    description: "你有多追求工作质量和完美？",
  },
  {
    id: "ownership",
    label: "主人翁意识",
    description: "你有多强的责任心和归属感？",
  },
  {
    id: "sustainability",
    label: "可持续发展",
    description: "你有多重视可持续和长期发展？",
  },
];

export function CulturalAssessment() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const { setUserProfile, updateUserTraits } = useExhibitionStore();

  const handleAnswer = (value: number) => {
    const dimension = culturalDimensions[currentStep];
    setAnswers((prev) => ({
      ...prev,
      [dimension.id]: value,
    }));

    if (currentStep < culturalDimensions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit({ ...answers, [dimension.id]: value });
    }
  };

  const handleSubmit = (finalAnswers: Record<string, number>) => {
    const profile = {
      employeeId: `EMP_${Date.now()}`,
      culturalTraits: finalAnswers,
      answers: Object.entries(finalAnswers).reduce(
        (acc, [key, value]) => {
          acc[key] = value > 3 ? "强" : value > 2 ? "中" : "弱";
          return acc;
        },
        {} as Record<string, string>
      ),
    };

    setUserProfile(profile);
    updateUserTraits(finalAnswers);
    setShowResult(true);
  };

  const generateCulturalPortrait = () => {
    const traits = Object.entries(answers);
    const sortedTraits = traits.sort(([, a], [, b]) => b - a);
    const topTraits = sortedTraits.slice(0, 3);

    return topTraits.map(([id]) => id);
  };

  if (showResult) {
    const topTraits = generateCulturalPortrait();
    const profile = culturalDimensions.filter((d) =>
      topTraits.includes(d.id)
    );

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-blue-500/30"
      >
        <h2 className="text-3xl font-bold mb-6">你的文化画像</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {profile.map((trait) => (
            <motion.div
              key={trait.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4"
            >
              <h3 className="font-bold text-lg text-blue-300">
                {trait.label}
              </h3>
              <p className="text-sm text-gray-300 mt-2">
                {answers[trait.id] > 4 ? "非常强" : "比较强"} ({answers[trait.id]}/5)
              </p>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-xl">完整评分</h3>
          {culturalDimensions.map((dimension) => (
            <div key={dimension.id} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{dimension.label}</span>
                <span className="text-blue-300">{answers[dimension.id]}/5</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(answers[dimension.id] / 5) * 100}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border border-amber-500/30">
          <p className="text-sm text-gray-300">
            ✨ 你的文化画像已生成，可与 iHaier 系统对接，以沉淀员工文化行为数据。
          </p>
        </div>

        <button
          onClick={() => {
            setCurrentStep(0);
            setAnswers({});
            setShowResult(false);
          }}
          className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          重新测评
        </button>
      </motion.div>
    );
  }

  const dimension = culturalDimensions[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 border border-blue-500/30"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">文化值测评</h2>
        <div className="w-full bg-slate-700 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-cyan-400 h-1 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentStep + 1) / culturalDimensions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {currentStep + 1}/{culturalDimensions.length}
        </p>
      </div>

      <motion.div
        key={dimension.id}
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
      >
        <h3 className="text-xl font-bold mb-2">{dimension.label}</h3>
        <p className="text-gray-300 mb-8">{dimension.description}</p>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((value) => (
            <motion.button
              key={value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswer(value)}
              className={`w-full p-4 rounded-lg transition border ${
                value <= 2
                  ? "border-red-500/30 hover:bg-red-500/20"
                  : value === 3
                  ? "border-yellow-500/30 hover:bg-yellow-500/20"
                  : "border-green-500/30 hover:bg-green-500/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>
                  {value === 1 ? "非常不同意" : ""}
                  {value === 2 ? "不同意" : ""}
                  {value === 3 ? "中立" : ""}
                  {value === 4 ? "同意" : ""}
                  {value === 5 ? "非常同意" : ""}
                </span>
                <span className="text-lg font-bold">{value}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
