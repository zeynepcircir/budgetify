import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl">💸</span>
          </div>
          <h1 className="text-2xl font-bold">Giderlerim, uygulamasına hoş geldin.</h1>
          <p className="text-gray-400 mt-2">
            Gelir ve giderlerini takip et. Mali sağlığını denetle.
          </p>
        </div>
        <div className="flex space-x-4 justify-center">
          <button
            onClick={() => router.push("/signup")}
            className="px-6 py-2 bg-green-500 rounded text-black hover:bg-green-600"
          >
            Hemen kaydol →
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2 border border-green-500 rounded text-green-500 hover:bg-green-500 hover:text-black"
          >
            Giriş yap
          </button>
        </div>
      </div>
    </main>
  );
}
