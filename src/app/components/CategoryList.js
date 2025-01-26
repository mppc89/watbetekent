"use client";

import { useRouter } from "next/navigation";

export default function CategoryList({ categories }) {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/woorden?category=${encodeURIComponent(category)}`);
  };

  const categoryIcons = {
    Jongerentaal: "fa-brands fa-tiktok",
    Afkortingen: "fa-solid fa-hashtag",
    Populair: "fa-solid fa-fire",
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className='p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left'>
          <div className='flex items-center space-x-3 gap-4'>
            {/* Dynamisch icoon of fallback */}
            <i
              className={`${
                categoryIcons[category] || "fa-solid fa-circle text-gray-400"
              } text-2xl`}></i>
            <h3 className='font-semibold text-lg'>{category}</h3>
          </div>
        </button>
      ))}
    </div>
  );
}
