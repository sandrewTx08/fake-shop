import { Fragment, useEffect, useState } from "react";
import { Fetch, Product } from "./services/fetch";
import { SlBag, SlBasket, SlHandbag, SlUser } from "react-icons/sl";
import { IoMdAdd, IoMdRemove, IoIosCart } from "react-icons/io";
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

function ProductItemMenuSmall(props: { product: Product.RootObject }) {
  return (
    <div className="product-item-sm">
      <div className="product-item-sm-img">
        <Link to={"/product/" + props.product.id}>
          <img src={props.product.image} alt="" />
        </Link>
      </div>

      <div className="product-item-sm-body">
        <div className="product-item-sm-title">
          <Link to={"/product/" + props.product.id}>{props.product.title}</Link>
        </div>

        <hr />

        <div>Price: {props.product.price}$</div>

        <div>
          Rating: {props.product.rating.count}/{props.product.rating.rate}
        </div>
      </div>

      <div className="product-item-sm-footer">
        <button>Add to Cart</button>
      </div>
    </div>
  );
}

function ProductItemMenuLarge() {
  const { id } = useParams<{ id: string }>(),
    [product, productSet] = useState<Product.RootObject>(),
    [quantity, quantitySet] = useState<number>(1);

  function quantitySub() {
    quantitySet(quantity - 1);
  }

  function quantityAdd() {
    quantitySet(quantity + 1);
  }

  function quantityInputOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    quantitySet(Number(event.target.value));
  }

  useEffect(() => {
    Fetch.products_id(Number(id)).then((res) => {
      productSet(res.data);
    });
  }, []);

  return (
    <div className="product-item-menu-lg">
      <img src={product?.image} alt="" />

      <div className="product-item-menu-lg-box">
        <div className="product-item-menu-lg-title">{product?.title}</div>

        <div className="product-item-menu-lg-description">
          {product?.description}
        </div>

        <div className="product-item-menu-lg-bottom">
          <button className="product-item-menu-lg-cart">
            <IoIosCart /> Add to Cart
          </button>

          <div className="product-item-menu-lg-qt">
            <button
              className="product-item-menu-lg-qt-add"
              onClick={quantityAdd}
            >
              <IoMdAdd />
            </button>

            <input
              type="number"
              className="product-item-menu-lg-qt-input"
              value={quantity}
              onChange={quantityInputOnChange}
            />

            <button
              className="product-item-menu-lg-qt-remove"
              onClick={quantitySub}
            >
              <IoMdRemove />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
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
            <div className="products">
              {products?.map((product) => (
                <ProductItemMenuSmall product={product} />
              ))}
            </div>
          }
        />

        <Route path="/product/:id" element={<ProductItemMenuLarge />} />
      </Routes>
    </Fragment>
  );
}

export default App;
