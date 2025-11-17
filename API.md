# API 文档

## 概述

本文档描述海尔文化展平台的 API 接口、数据格式和集成方式。

---

## 目录

1. [状态管理 API](#状态管理-api)
2. [数据结构](#数据结构)
3. [集成指南](#集成指南)
4. [示例代码](#示例代码)

---

## 状态管理 API

### 使用 Zustand 的全局状态

```typescript
import { useExhibitionStore } from '@/app/store';

// 在组件中使用
export function MyComponent() {
  const { 
    currentExhibition,
    setCurrentExhibition,
    isImmersiveMode,
    setImmersiveMode
  } = useExhibitionStore();

  return (
    // 您的组件代码
  );
}
```

### 可用的 Store 方法

#### 展区管理

```typescript
// 设置当前选中的展区
setCurrentExhibition(exhibition: Exhibition | null)

// 获取当前展区
currentExhibition: Exhibition | null
```

#### 沉浸模式

```typescript
// 启用/禁用沉浸模式
setImmersiveMode(enabled: boolean)

// 获取沉浸模式状态
isImmersiveMode: boolean
```

#### 用户档案

```typescript
// 设置用户文化画像
setUserProfile(profile: UserProfile)

// 更新用户文化特征
updateUserTraits(traits: Record<string, number>)

// 获取用户档案
userProfile: UserProfile | null
```

#### 搜索功能

```typescript
// 执行案例库搜索
searchCases(keyword: string)

// 获取搜索结果
searchResults: Exhibition[]

// 设置搜索结果
setSearchResults(results: Exhibition[])
```

#### 音频控制

```typescript
// 设置当前音频 URL
setCurrentAudio(audioUrl: string | null)

// 获取当前音频
currentAudio: string | null

// 设置播放状态
setAudioPlaying(playing: boolean)

// 获取播放状态
isAudioPlaying: boolean
```

---

## 数据结构

### Exhibition（展区）

```typescript
interface Exhibition {
  id: string;                    // 唯一标识符
  name: string;                  // 展区名称
  stage: number;                 // 战略阶段（1-7）
  description: string;           // 详细描述
  highlights: string[];          // 核心亮点数组
  audioUrl?: string;             // 音频讲解 URL
  videoUrl?: string;             // 视频 URL
  position: [number, number, number]; // 3D 坐标 [x, y, z]
}
```

### UserProfile（用户档案）

```typescript
interface UserProfile {
  employeeId: string;            // 员工 ID
  culturalTraits: Record<string, number>;  // 文化特征评分（0-5）
  answers: Record<string, string>;         // 原始答案
}
```

### CulturalDimension（文化维度）

```typescript
interface CulturalDimension {
  id: string;                    // 维度 ID
  label: string;                 // 维度名称
  description: string;           // 问题描述
}
```

---

## 集成指南

### 与 iHaier 系统集成

#### 1. 发送用户档案

```typescript
import axios from 'axios';

async function uploadUserProfile(profile: UserProfile) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_IHAIER_API_URL}/api/profiles`,
      {
        employeeId: profile.employeeId,
        culturalTraits: profile.culturalTraits,
        timestamp: new Date().toISOString(),
        platform: 'haier-culture-exhibition'
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.IHAIER_API_KEY}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to upload profile:', error);
    throw error;
  }
}
```

#### 2. 获取员工数据

```typescript
async function fetchEmployeeData(employeeId: string) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_IHAIER_API_URL}/api/employees/${employeeId}`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.IHAIER_API_KEY}`
      }
    }
  );
  return response.data;
}
```

### 音频播放集成

#### 使用 HTML5 Audio API

```typescript
export function AudioPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { setAudioPlaying } = useExhibitionStore();

  const play = () => {
    audioRef.current?.play();
    setAudioPlaying(true);
  };

  const pause = () => {
    audioRef.current?.pause();
    setAudioPlaying(false);
  };

  return (
    <>
      <audio ref={audioRef} src={url} />
      <button onClick={play}>播放</button>
      <button onClick={pause}>暂停</button>
    </>
  );
}
```

### 视频嵌入

```typescript
export function VideoPlayer({ url }: { url: string }) {
  return (
    <video width="100%" height="auto" controls>
      <source src={url} type="video/mp4" />
      您的浏览器不支持视频播放
    </video>
  );
}
```

---

## 示例代码

### 示例 1: 创建自定义搜索

```typescript
import { useExhibitionStore } from '@/app/store';

export function AdvancedSearch() {
  const { searchCases, searchResults } = useExhibitionStore();

  const handleSearch = (query: string) => {
    searchCases(query);
  };

  return (
    <div>
      <input 
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="搜索..."
      />
      <div>
        {searchResults.map(result => (
          <div key={result.id}>{result.name}</div>
        ))}
      </div>
    </div>
  );
}
```

### 示例 2: 添加新的展区

编辑 `app/store.tsx`：

```typescript
const exhibitions: Exhibition[] = [
  // 现有展区...
  {
    id: 'my-exhibition',
    name: '新展区',
    stage: 1,
    description: '这是一个新的展区',
    highlights: ['特色1', '特色2'],
    position: [2, 0, 0],
    audioUrl: '/audio/my-exhibition.mp3'
  }
];
```

### 示例 3: 自定义展区详情页面

```typescript
import { ExhibitionDetail } from '@/components/ExhibitionDetail';

export function CustomExhibitionDetail() {
  const { currentExhibition } = useExhibitionStore();

  if (!currentExhibition) {
    return <div>未选择展区</div>;
  }

  return (
    <div>
      <h1>{currentExhibition.name}</h1>
      <p>{currentExhibition.description}</p>
      
      {/* 自定义内容 */}
      <div>
        {currentExhibition.highlights.map((highlight, i) => (
          <p key={i}>{highlight}</p>
        ))}
      </div>
    </div>
  );
}
```

### 示例 4: 获取用户档案并上传

```typescript
import { useExhibitionStore } from '@/app/store';
import axios from 'axios';

export function UploadProfile() {
  const { userProfile } = useExhibitionStore();

  const handleUpload = async () => {
    if (!userProfile) return;

    try {
      await axios.post('/api/profiles', {
        employeeId: userProfile.employeeId,
        culturalTraits: userProfile.culturalTraits,
        timestamp: new Date().toISOString()
      });
      alert('档案上传成功！');
    } catch (error) {
      console.error('上传失败:', error);
    }
  };

  return (
    <button onClick={handleUpload}>
      上传我的文化档案
    </button>
  );
}
```

---

## 环境变量

### 需要配置的变量

```bash
# .env.local

# API 配置
NEXT_PUBLIC_API_URL=http://localhost:3000/api
API_SECRET_KEY=your-secret-key

# iHaier 集成
NEXT_PUBLIC_IHAIER_API_URL=https://api.ihaier.com
IHAIER_API_KEY=your-api-key

# 分析
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

---

## 错误处理

### 常见错误代码

| 代码 | 含义 | 解决方案 |
|------|------|--------|
| 400 | 请求格式错误 | 检查请求参数 |
| 401 | 未授权 | 检查 API Key |
| 403 | 禁止访问 | 检查权限设置 |
| 404 | 未找到资源 | 检查 URL |
| 500 | 服务器错误 | 查看服务器日志 |

### 错误处理示例

```typescript
try {
  const result = await uploadProfile(profile);
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('API Error:', error.response?.status);
    console.error('Message:', error.response?.data?.message);
  } else {
    console.error('Unknown error:', error);
  }
}
```

---

## 限制和配额

- API 请求频率限制：100 请求/分钟
- 文件上传大小限制：10MB
- 用户档案保存：无限制
- 搜索结果返回：最多 100 条

---

## 更新日志

### v1.0.0 (2024-11-17)
- 初始版本发布
- 基础 API 实现
- Store 状态管理

---

## 支持

如有问题，请通过以下方式联系：
- GitHub Issues: https://github.com/rzl021002-stack/HaierCulture/issues
- 邮件: rzl021002@example.com

---

**最后更新**: 2024-11-17
