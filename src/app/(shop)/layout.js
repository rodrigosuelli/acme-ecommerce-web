import HeaderMenu from '../../components/HeaderMenu/HeaderMenu';

export default function ShopLayout({ children }) {
  return (
    <>
      <HeaderMenu />
      {children}
    </>
  );
}
