import { create } from 'zustand';

interface Exhibition {
  id: string;
  name: string;
  stage: number;
  description: string;
  highlights: string[];
  audioUrl?: string;
  videoUrl?: string;
  position: [number, number, number];
}

interface UserProfile {
  employeeId: string;
  culturalTraits: Record<string, number>;
  answers: Record<string, string>;
}

interface ExhibitionStore {
  // Current exhibition state
  currentExhibition: Exhibition | null;
  setCurrentExhibition: (exhibition: Exhibition | null) => void;
  
  // Interactive experience
  isImmersiveMode: boolean;
  setImmersiveMode: (enabled: boolean) => void;
  
  // User profile
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
  updateUserTraits: (traits: Record<string, number>) => void;
  
  // Case library
  searchResults: Exhibition[];
  setSearchResults: (results: Exhibition[]) => void;
  searchCases: (keyword: string) => void;
  
  // Audio narration
  currentAudio: string | null;
  setCurrentAudio: (audioUrl: string | null) => void;
  isAudioPlaying: boolean;
  setAudioPlaying: (playing: boolean) => void;
}

const exhibitions: Exhibition[] = [
  {
    id: 'global-brand',
    name: '全球化品牌战略阶段',
    stage: 1,
    description: '海尔开始走向国际市场，建立全球品牌形象',
    highlights: ['品牌国际化', '全球市场拓展', '国际竞争力'],
    position: [-3, 2, 0],
  },
  {
    id: 'international',
    name: '国际化战略阶段',
    stage: 2,
    description: '深入国际市场，建立国际销售网络',
    highlights: ['国际销售网络', '跨国运营', '全球供应链'],
    position: [-1, 2, 0],
  },
  {
    id: 'diversified',
    name: '多元化战略阶段',
    stage: 3,
    description: '拓展多个业务领域，实现集团多元化发展',
    highlights: ['多业务发展', '产业多元化', '协同效应'],
    position: [1, 2, 0],
  },
  {
    id: 'main-business',
    name: '主业战略阶段',
    stage: 4,
    description: '聚焦主业发展，提升核心竞争力',
    highlights: ['主业聚焦', '竞争力提升', '品质优先'],
    position: [3, 2, 0],
  },
  {
    id: 'network',
    name: '网络化战略阶段',
    stage: 5,
    description: '实现网络化转型，建立互联网生态',
    highlights: ['数字化转型', '互联网生态', '智能制造'],
    position: [-3, -2, 0],
  },
  {
    id: 'ecological-brand',
    name: '生态品牌战略阶段',
    stage: 6,
    description: '构建生态品牌体系，打造价值生态',
    highlights: ['生态品牌', '价值创造', '生态协同'],
    position: [-1, -2, 0],
  },
  {
    id: 'moon-river',
    name: '月印万川',
    stage: 7,
    description: '海尔文化的集大成，体现包容、创新、共赢的理念',
    highlights: ['文化融合', '创新驱动', '共赢生态'],
    position: [1, -2, 0],
  },
];

export const useExhibitionStore = create<ExhibitionStore>((set) => ({
  currentExhibition: null,
  setCurrentExhibition: (exhibition) => set({ currentExhibition: exhibition }),
  
  isImmersiveMode: false,
  setImmersiveMode: (enabled) => set({ isImmersiveMode: enabled }),
  
  userProfile: null,
  setUserProfile: (profile) => set({ userProfile: profile }),
  updateUserTraits: (traits) =>
    set((state) => ({
      userProfile: state.userProfile
        ? { ...state.userProfile, culturalTraits: traits }
        : null,
    })),
  
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
  searchCases: (keyword) => {
    const results = exhibitions.filter(
      (ex) =>
        ex.name.toLowerCase().includes(keyword.toLowerCase()) ||
        ex.description.toLowerCase().includes(keyword.toLowerCase()) ||
        ex.highlights.some((h) =>
          h.toLowerCase().includes(keyword.toLowerCase())
        )
    );
    set({ searchResults: results });
  },
  
  currentAudio: null,
  setCurrentAudio: (audioUrl) => set({ currentAudio: audioUrl }),
  isAudioPlaying: false,
  setAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
}));

export { exhibitions };
export type { Exhibition, UserProfile, ExhibitionStore };
