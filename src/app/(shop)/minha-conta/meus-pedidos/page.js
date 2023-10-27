'use client';

import withPrivateRoute from '../../../hoc/withPrivateRoute';

function MeusPedidos() {
  return (
    <div className={`shopPage`}>
      <h1>Meus pedidos</h1>
    </div>
  );
}

export default withPrivateRoute(MeusPedidos);
