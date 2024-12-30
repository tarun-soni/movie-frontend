import Searchbar from '@/components/searchbar';

export default function HomePage() {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Movie Search</h1>
          <button className="text-sm text-primary hover:underline">
            Logout
          </button>
        </div>
        <Searchbar />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold text-primary">Movie Title</h2>
            <p className="text-sm text-gray-600">Desc </p>
          </div>
        </div>
      </div>
    </div>
  );
}
