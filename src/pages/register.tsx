import { useState } from "react";
import { useRouter } from "next/router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Parolalar eşleşmiyor!");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    const isUserExists = existingUsers.some((user: any) => user.email === email);

    if (isUserExists) {
      alert("Bu e-posta adresi zaten kayıtlı!");
      return;
    }

    const newUser = { email, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
    router.push("/login");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="w-full max-w-sm mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-3xl">💸</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-wide">Kayıt Ol</h1>
          <p className="text-gray-400 mt-2 text-sm">Hesabınızı oluşturun ve başlayın</p>
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
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
              Şifreyi Onayla
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Şifrenizi tekrar girin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 bg-gray-900 rounded-lg border border-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 bg-green-500 rounded-lg text-black font-semibold hover:bg-green-600 focus:ring-2 focus:ring-green-300 focus:outline-none transition"
          >
            Kayıt Ol
          </button>
        </div>
        <p className="text-gray-500 mt-6 text-center text-sm">
          Zaten bir hesabınız var mı?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Giriş Yap
          </a>
        </p>
      </div>
    </main>
  );
};

export default Register;
