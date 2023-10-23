import { CgSpinner } from 'react-icons/cg';

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="loadingProdutoPage">
      <CgSpinner className="spinner" size={36} />
    </div>
  );
}
