import { useSignup } from '../hooks/useSignup';
import { SignupForm } from '../components/SignupForm';

/**
 * Signup Page
 * User registration page - Container component
 */
const Signup = () => {
  const signupData = useSignup();

  return <SignupForm {...signupData} />;
};

export default Signup;
