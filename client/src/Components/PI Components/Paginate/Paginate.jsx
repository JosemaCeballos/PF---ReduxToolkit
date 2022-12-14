import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import ProductCard from '../../PanelAdmin/Products/ProductCard';
import { Link } from 'react-router-dom';
// import "./Paginate.css";

function Paginate({ products }) {
  const { searchProductMsg } = useSelector((state) => state.todos);
  const [productOffset, setProductOffset] = useState(0);
  const productsPerPage = 25;

  const endOffset = productOffset + productsPerPage;
  const currentItems = products.slice(productOffset, endOffset);
  const pageCount = Math.ceil(products.length / productsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * productsPerPage) % products.length;
    setProductOffset(newOffset);
  };

  useEffect(() => {
    setProductOffset(0);
  }, [products]);

  return (
    <div className="">
      <Link
        to="/panel+admin"
        className=" absolute font-medium left-64 text-main -ml-4 top-44 z-10 border-solid  px-2.5"
      >
        Back to Panel Admin
      </Link>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName={'pagination'}
        pageLinkClassName={'page-num2'}
        previousLinkClassName={'page-num'}
        nextLinkClassName={'page-num'}
        activeLinkClassName={'active'}
      />
      <div className="flex flex-wrap justify-evenly">
        {currentItems.length > 0 && searchProductMsg === '' ? (
          currentItems?.map((el) => <ProductCard key={el.id} {...el} />)
        ) : searchProductMsg.error && currentItems.length === 0 ? (
          <div className="mx-auto text-3xl font-display font-medium ml-80  min-w-full">
            <p>{searchProductMsg.error}</p>
          </div>
        ) : (
          <div className="mx-auto text-3xl font-display font-medium ml-80">
            <h3>No product was found!</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Paginate;
