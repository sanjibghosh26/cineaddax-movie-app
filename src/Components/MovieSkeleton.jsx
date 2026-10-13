function MovieSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900">
      {/* Poster Skeleton */}
      <div className="aspect-[2/3] animate-pulse bg-slate-800" />

      {/* Content Skeleton */}
      <div className="space-y-3 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-800" />

        <div className="h-3 w-1/3 animate-pulse rounded bg-slate-800" />
      </div>
    </div>
  );
}

export default MovieSkeleton;