import React from 'react';

interface StatsProps {
  sectionsCount: number;
  isGenerating: boolean;
}

export default function Stats({ sectionsCount, isGenerating }: StatsProps) {
  return (
    <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        Generation Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {sectionsCount}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sections Generated
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {isGenerating ? '...' : '100%'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Success Rate
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-600 dark:text-blue-400">
              AI is generating your sections...
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 