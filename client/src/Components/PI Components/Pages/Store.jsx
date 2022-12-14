import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../../redux/todo.slice';
import Filters from '../../PI Components/Filters/Filters';
import Paginate2 from '../../PI Components/Paginate/PaginateToStore';
import '../../PI Components/Paginate/Paginate.css';

function Store() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.todos.product);

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <div className="flex ">
      <div>
        <Filters />
      </div>
      <div className="w-full text-center flex mt-20">
        <Paginate2 products={products} />
      </div>

      {/* <div>
        {products.length > 0 && searchProductMsg === "" ? (
          products?.map((el) => <ProductCard {...el} />)
        ) : searchProductMsg.error ? (
          <p>{searchProductMsg.error.slice(6, 47)}</p>
        ) : (
          <div>No se ha encontrado productos</div>
        )}
      </div> */}
    </div>
  );
}

export default Store;
