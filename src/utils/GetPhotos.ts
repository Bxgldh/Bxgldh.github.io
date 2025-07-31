import type { PhotoGroup } from '@/types/config';

export async function getPhotoGroups(): Promise<PhotoGroup[]> {
  // 在 Astro/Vite 中需要使用 import.meta.glob 读取文件
  const photoModules = import.meta.glob('/public/photos/**/*.{jpg,png,webp}');
  
  const groups: Record<string, PhotoGroup> = {};

  for (const path in photoModules) {
    // 提取日期和地点（从文件夹名）
    const parts = path.split('/');
    const dirName = parts[3]; // 如 "2023-05-01_Beijing"
    const [time, location] = dirName.split('_');

    if (!groups[dirName]) {
      groups[dirName] = { time, location, photos: [] };
    }

    groups[dirName].photos.push({
      src: path.replace('/public', ''),
      location,
      time
    });
  }

  // 按时间排序
  return Object.values(groups).sort((a, b) => 
    new Date(a.time).getTime() - new Date(b.time).getTime()
  );
}