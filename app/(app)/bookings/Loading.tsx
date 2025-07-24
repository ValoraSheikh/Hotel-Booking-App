import React from "react";

const Loading = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
          </div>

          <div className="mb-8">
            <div className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 gap-2">
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="bg-white rounded-sm shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-24 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-sm shadow p-6">
                <div className="flex items-center space-x-4">
                  <div className="h-24 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
