import { useLogin } from '../hooks/useLogin';
import { LoginForm } from '../components/LoginForm';

/**
 * Login Page
 * User authentication page - Container component
 */
const Login = () => {
  const loginData = useLogin();

  return <LoginForm {...loginData} />;
};

export default Login;
