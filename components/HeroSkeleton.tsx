export default function HeroSkeleton() {
  return (
    <section className="relative bg-blue-600 dark:bg-blue-800 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 animate-pulse"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Title skeleton */}
          <div className="mb-6 space-y-3">
            <div className="h-12 md:h-16 bg-white/20 rounded-lg animate-pulse mx-auto max-w-2xl"></div>
            <div className="h-12 md:h-16 bg-white/20 rounded-lg animate-pulse mx-auto max-w-xl"></div>
          </div>

          {/* Subtitle skeleton */}
          <div className="mb-8 space-y-2">
            <div className="h-6 md:h-8 bg-white/15 rounded-lg animate-pulse mx-auto max-w-lg"></div>
            <div className="h-6 md:h-8 bg-white/15 rounded-lg animate-pulse mx-auto max-w-md"></div>
          </div>

          {/* Buttons skeleton */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="h-12 w-40 bg-white/25 rounded-md animate-pulse mx-auto sm:mx-0"></div>
            <div className="h-12 w-32 bg-white/25 rounded-md animate-pulse mx-auto sm:mx-0"></div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center space-x-2 text-white/80">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
          <span className="text-sm">Loading content...</span>
        </div>
      </div>
    </section>
  )
}
