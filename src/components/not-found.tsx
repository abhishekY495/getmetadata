export const NotFound = () => {
  return (
    <main class="flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8 text-white">
      <div class="w-full text-center space-y-8">
        <div class="space-y-2">
          <h1 class="text-9xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-neutral-500 to-neutral-600">
            404
          </h1>
          <h2 class="text-2xl font-bold text-gray-200">Page Not Found</h2>
          <p class="text-gray-400 mt-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div class="mt-10 border-t border-gray-800 pt-8">
          <a
            href="/"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-neutral-600 hover:bg-neutral-700 transition-colors duration-300 ease-in-out"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
};
