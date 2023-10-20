import HeaderMenu from '../components/HeaderMenu/HeaderMenu';
import './shopPagesGlobal.css';

export default function ShopLayout({ children }) {
  return (
    <div className="shopPageContainer">
      <HeaderMenu />
      {children}
    </div>
  );
}
