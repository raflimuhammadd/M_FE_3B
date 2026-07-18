import {AuthLayout, LoginForm} from '../components';
function LoginPage() {
    return (
        <AuthLayout
            title="Masuk"
            subtitle="Selamat datang kembali!"
            bgImage="./src/assets/images/theatre3.jpg"
        >
            <LoginForm />
        </AuthLayout>
    )
}

export default LoginPage;