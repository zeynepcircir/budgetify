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
      alert("E-posta veya parola hatalı!");
      return;
    }

    localStorage.setItem("isLoggedIn", "true"); 
    alert("Giriş başarılı!");
    router.push("/dashboard"); 
  };

  return (
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl">💸</span>
          </div>
          <h1 className="text-2xl font-bold">Giriş Yap</h1>
        </div>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700 text-gray-300 placeholder-gray-500"
          />
          <input
            type="password"
            placeholder="Parola"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700 text-gray-300 placeholder-gray-500"
          />
          <button
            onClick={handleLogin}
            className="w-full px-4 py-2 bg-green-500 rounded text-black hover:bg-green-600"
          >
            Giriş Yap
          </button>
        </div>
        <p className="text-gray-500 mt-4">
          Bir hesabınız yok mu?{" "}
          <a href="/register" className="text-green-500 hover:underline">
            Kayıt ol
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;
