import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import {
  ChevronDownFilled,
  ChevronUpFilled,
  PersonFilled,
} from '@fluentui/react-icons';
import Link from 'next/link';
import styles from './HeaderMenu.module.css';
import { useUser } from '../../contexts/userContext';

function UserAccountContainer() {
  const { user, logOut } = useUser();

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(3);

  return (
    <div className={styles.containerUserAccount}>
      <button {...buttonProps} type="button">
        <div>
          {isOpen ? (
            <ChevronUpFilled fontSize={20} />
          ) : (
            <ChevronDownFilled fontSize={20} />
          )}
          <span>Olá, {user.nome.split(' ')[0]}</span>
        </div>
        <PersonFilled fontSize={32} />
      </button>
      <div
        className={`${styles.dropdownCategorias} ${isOpen && styles.visible}`}
        role="menu"
      >
        <Link
          {...itemProps[0]}
          onClick={() => {
            setIsOpen(false);
          }}
          href="/minha-conta/meus-pedidos"
        >
          Meus Pedidos
        </Link>
        <button
          type="button"
          {...itemProps[2]}
          onClick={() => {
            logOut();
            setIsOpen(false);
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
}

export default UserAccountContainer;
