import { useState } from "react";
import {useNavigate, Link} from 'react-router-dom';
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import FormField from "./FormField";
import EyeIcon from "../atoms/EyeIcon";

const isValidUsername = (username) => /^[a-zA-Z0-9_]{3,20}$/.test(username);

const validateForm = (formData) => {
    const errors = {};
    
    if (!formData.username.trim()) errors.username = 'Username diperlukan';
    else if (formData.username.length < 3) errors.username = 'Username minimal 3 karakter';
    else if (!isValidUsername(formData.username)) errors.username = 'Username hanya boleh huruf, angka, dan underscore';
    
    if (!formData.password) errors.password = 'Kata sandi diperlukan';
    else if (formData.password.length < 6) errors.password = 'Kata sandi minimal 6 karakter';

    if (!formData.confirmPassword) errors.confirmPassword = 'Konfirmasi kata sandi diperlukan';
    else if (formData.confirmPassword !== formData.password) errors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';

    return errors;
};

function RegisterForm() {
    const [formData, setFormData] = useState({username: '', password: '', confirmPassword: ''});
    const [errors, setErrors] = useState ({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        if (errors[name]) setErrors((prev) => ({...prev, [name]: ''}));
    };

    const handleSubmit = (e) => {
       e.preventDefault();
       const formErrors = validateForm(formData);
       if (Object.keys(formErrors).length > 0) return setErrors(formErrors);
       setSuccessMessage('Registrasi berhasil! Mengalihkan..');
       setTimeout(() => navigate('/home'), 2000); 
    };

    return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && (
        <div className="bg-green-500/20 border border-green-500 text-green-500 px-4 py-3 rounded-lg text-center">
          {successMessage}
        </div>
      )}

      <FormField label="Username" htmlFor="reg-username" error={errors.username}>
        <Input
          id="reg-username"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          placeholder="Masukkan username"
          error={errors.username}
        />
      </FormField>

      <FormField label="Kata Sandi" htmlFor="reg-password" error={errors.password}>
        <Input
          id="reg-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          placeholder="Masukkan kata sandi"
          error={errors.password}
          icon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            >
              <EyeIcon isOpen={showPassword} />
            </button>
          }
        />
      </FormField>

      <FormField label="Konfirmasi Kata Sandi" htmlFor="reg-confirm" error={errors.confirmPassword}>
        <Input
          id="reg-confirm"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Masukkan ulang kata sandi"
          error={errors.confirmPassword}
          icon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
            >
              <EyeIcon isOpen={showConfirmPassword} />
            </button>
          }
        />
      </FormField>

      <div className="text-sm">
        <Link to="/login" className="text-white/60 hover:text-white">
          Sudah punya akun? <span className="text-purple-500">Masuk</span>
        </Link>
      </div>

      <div className="space-y-3">
        <Button type="submit" variant="primary" className="w-full">
          Daftar
        </Button>
        <p className="text-center text-white/60">atau</p>
        <Button type="button" variant="secondary" className="w-full">
          <img src="/assets/images/google-icon.png" alt="Google" className="h-5 w-5" />
          Masuk dengan Google
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;