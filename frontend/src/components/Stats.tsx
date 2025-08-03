import React from 'react';

interface StatsProps {
  sectionsCount: number;
  isGenerating: boolean;
}

export default function Stats({ sectionsCount, isGenerating }: StatsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-black mb-4">
        Generation Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {sectionsCount}
          </div>
          <div className="text-sm text-gray-600">
            Sections Generated
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {isGenerating ? '...' : '100%'}
          </div>
          <div className="text-sm text-gray-600">
            Success Rate
          </div>
        </div>
      </div>

      {isGenerating && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-600">
              AI is generating your sections...
            </span>
          </div>
        </div>
      )}
    </div>
  );
} 