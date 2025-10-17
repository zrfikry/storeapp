export default function LoadingProduct() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-6 row-start-2 items-start w-full max-w-4xl animate-pulse">
        <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="aspect-square rounded bg-gray-200 dark:bg-white/10" />
          <div className="space-y-3">
            <div className="h-6 w-2/3 bg-gray-200 dark:bg-white/10 rounded" />
            <div className="h-5 w-24 bg-gray-200 dark:bg-white/10 rounded" />
            <div className="h-4 w-40 bg-gray-200 dark:bg-white/10 rounded" />
            <div className="h-24 w-full bg-gray-200 dark:bg-white/10 rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
