import React from "react";

const Loading = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="text-sm text-gray-600">
              <div className="inline-block h-4 w-12 bg-gray-200 rounded animate-pulse"></div>{" "}
              /
              <div className="inline-block h-4 w-16 bg-gray-200 rounded animate-pulse mx-1"></div>{" "}
              /
              <div className="inline-block h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Section */}
              <div className="bg-white rounded-sm shadow-lg overflow-hidden">
                {/* Image Carousel */}
                <div className="relative h-64 sm:h-80 lg:h-96 bg-gray-200 animate-pulse">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                    <div className="h-10 w-10 bg-gray-300 rounded-full animate-pulse"></div>
                  </div>
                </div>
                {/* Room Info */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse mb-2 sm:mb-0"></div>
                    <div className="text-right">
                      <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center">
                      <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="ml-2 h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Room Overview */}
              <div className="rounded-sm bg-white shadow">
                <div className="p-6">
                  <div className="h-7 w-1/3 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div className="h-16 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 bg-gray-50 rounded-sm">
                      <div className="h-6 w-6 mx-auto mb-2 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-sm">
                      <div className="h-6 w-6 mx-auto mb-2 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-sm">
                      <div className="h-6 w-6 mx-auto mb-2 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-5 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-20 mx-auto bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              <div className="rounded-sm bg-white shadow">
                <div className="p-6">
                  <div className="h-7 w-1/3 bg-gray-200 rounded animate-pulse mb-6"></div>
                  <div className="mb-6">
                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
                        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
                        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3">
                        <div className="h-5 w-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <div className="shadow-xl rounded-sm bg-white">
                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="h-8 w-24 mx-auto bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-32 mx-auto bg-gray-200 rounded animate-pulse mt-1"></div>
                    </div>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                        <div>
                          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                          <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                      </div>
                      <div>
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse mb-1"></div>
                        <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                      <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between">
                          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between">
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                          <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </div>
                      <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-48 mx-auto bg-gray-200 rounded animate-pulse"></div>
                    </div>
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
