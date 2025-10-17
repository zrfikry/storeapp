import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20">
      <main className="flex flex-col gap-4 row-start-2 items-center w-full max-w-2xl text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">The product you are looking for does not exist or has been removed.</p>
        <Link href="/" className="text-sm text-blue-600 hover:underline">Return to Home</Link>
      </main>
    </div>
  )
}
export default NotFound
