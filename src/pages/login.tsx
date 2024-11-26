import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((user: any) => user.email === email && user.password === password);

    if (!user) {
      alert("E-posta veya şifre hatalı!");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    alert("Giriş başarılı!");
    router.push("/dashboard");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-sm mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-3xl">💸</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-wide">Giriş Yap</h1>
          <p className="text-gray-400 mt-2 text-sm">Bütçenizi kolayca yönetin</p>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400">
              E-posta Adresi
            </label>
            <input
              id="email"
              type="email"
              placeholder="E-postanızı girin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-900 rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400">
              Şifre
            </label>
            <input
              id="password"
              type="password"
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-900 rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-green-500 rounded-lg text-black font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
          >
            Giriş Yap
          </button>
        </div>
        <p className="text-gray-500 mt-6 text-center text-sm">
          Hesabınız yok mu?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Kayıt Ol
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;
