import { CgSpinner } from 'react-icons/cg';

export default function LoadingSpinner() {
  return (
    <div className="loadingProdutoPage">
      <CgSpinner className="spinner" size={36} />
    </div>
  );
}
