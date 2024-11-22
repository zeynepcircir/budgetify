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
    <main className="flex items-center justify-center h-screen bg-black text-white">
      <div className="w-full max-w-sm mx-auto text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-2xl">💸</span>
          </div>
          <h1 className="text-2xl font-bold">Kayıt Ol</h1>
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
          <input
            type="password"
            placeholder="Parolayı Onayla"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700 text-gray-300 placeholder-gray-500"
          />
          <button
            onClick={handleRegister}
            className="w-full px-4 py-2 bg-green-500 rounded text-black hover:bg-green-600"
          >
            Kayıt Ol
          </button>
        </div>
        <p className="text-gray-500 mt-4">
          Zaten bir hesabınız var mı?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Giriş yap
          </a>
        </p>
      </div>
    </main>
  );
};

export default Register;
