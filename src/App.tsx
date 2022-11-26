import { Fragment, useEffect, useState } from "react";
import { Cart, Fetch, Product } from "./services/fetch";
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
          <Link to="/">
            <SlBag />
            Products
          </Link>
        </li>

        <li>
          <Link to="/cart">
            <SlBasket />
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

function Header() {
  return (
    <header id="header">
      <div className="brand">
        <Link to="/">
          FakeShop
          <SlHandbag />
        </Link>
      </div>

      <Navbar />
    </header>
  );
}

function ProductItemMenuSmall({ product }: { product: Product.RootObject }) {
  return (
    <div className="product-item-sm">
      <div className="product-item-sm-img">
        <Link to={"product/" + product.id}>
          <img src={product.image} alt="" />
        </Link>
      </div>

      <div className="product-item-sm-body">
        <div className="product-item-sm-title">
          <Link to={"product/" + product.id}>{product.title}</Link>
        </div>

        <hr />

        <div>Price: {product.price}$</div>

        <div>
          Rating: {product.rating.count}/{product.rating.rate}
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

  function quantityInputOnChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    quantitySet(Number(value));
  }

  useEffect(() => {
    Fetch.products_id(Number(id)).then(({ data }) => {
      productSet(data);
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

function CartItem({ cart }: { cart: Cart.RootObject }) {
  const [cartProduts, cartProdutsSet] = useState<Product.RootObject[]>();

  useEffect(() => {
    Promise.all(
      cart.products.map(({ productId }) =>
        Fetch.products_id(productId).then(({ data }) => data)
      )
    ).then(cartProdutsSet);
  }, []);

  return (
    <Fragment>
      {cartProduts ? (
        cartProduts.map((cartProdut) => (
          <div className="cart-item">
            <img src={cartProdut.image} alt="" />
          </div>
        ))
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}

function App() {
  const [products, productsSet] = useState<Product.RootObject[]>(),
    [cart, cartSet] = useState<Cart.RootObject>();

  useEffect(() => {
    Fetch.products().then(({ data }) => {
      productsSet(data);
    });

    Fetch.cart_userId(1).then(({ data }) => {
      cartSet(data);
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

        <Route
          path="/cart"
          element={
            <div className="cart">
              {cart ? <CartItem cart={cart} /> : <h1>No item added to cart</h1>}
            </div>
          }
        />
      </Routes>
    </Fragment>
  );
}

export default App;
