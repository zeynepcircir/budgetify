import ProtectedRoute from "@/components/ProtectedRoute";

const Profile = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Profil Sayfası</h1>
        <p>Kullanıcı bilgilerini buradan görüntüleyebilirsiniz.</p>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
