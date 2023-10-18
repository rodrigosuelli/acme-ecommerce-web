import AuthHeader from '../../components/AuthHeader/AuthHeader';
import './authPagesGlobal.css';

export default function AuthPagesLayout({ children }) {
  return (
    <div className="authPageContainer">
      <AuthHeader />
      {children}
    </div>
  );
}
