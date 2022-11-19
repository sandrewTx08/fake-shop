import { Fragment, useEffect, useState } from "react";
import { Fetch, Product } from "./services/fetch";
import { SlBag, SlBasket, SlHandbag, SlUser } from "react-icons/sl";
import { Route, Routes, Link, useParams } from "react-router-dom";
import "./App.css";

function Navbar() {
  return (
    <nav id="navbar">
      <ul>
        <li>
          <a href="">
            <SlUser />
            Account
          </a>
        </li>

        <li>
          <a href="">
            <SlBag />
            Products
          </a>
        </li>

        <li>
          <a href="">
            <SlBasket />
            Cart
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header id="header">
      <div className="brand">
        <a href="">
          FakeShop
          <SlHandbag />
        </a>
      </div>

      <Navbar />
    </header>
  );
}

function ProductCard(props: { product: Product.RootObject }) {
  return (
    <div className="card">
      <div className="card-img">
        <Link to={"/product/" + props.product.id}>
          <img src={props.product.image} alt="" />
        </Link>
      </div>

      <div className="card-body">
        <div className="card-title">
          <Link to={"/product/" + props.product.id}>{props.product.title}</Link>
        </div>

        <hr />

        <div>Price: {props.product.price}$</div>

        <div>
          Rating: {props.product.rating.count}/{props.product.rating.rate}
        </div>
      </div>

      <div className="card-footer">
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

function ProductMenu() {
  const { id } = useParams<{ id: string }>(),
    [product, productSet] = useState<Product.RootObject>();

  useEffect(() => {
    Fetch.products_id(Number(id)).then((res) => {
      productSet(res.data);
    });
  }, []);

  return <div>{JSON.stringify(product)}</div>;
}

function App() {
  const [products, productsSet] = useState<Product.RootObject[]>();

  useEffect(() => {
    Fetch.products().then((res) => {
      productsSet(res.data);
    });
  }, []);

  return (
    <Fragment>
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <div className="card-products">
              {products?.map((product) => (
                <ProductCard product={product} />
              ))}
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductMenu />} />
      </Routes>
    </Fragment>
  );
}

export default App;
