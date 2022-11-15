import { useEffect, useState } from "react";
import { Fetch, Product } from "./services/fetch";
import { SlBag, SlBasket, SlHandbag, SlUser } from "react-icons/sl";
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

function CardGrid(props: { product: Product.RootObject }) {
  return (
    <div className="card">
      <div className="card-img">
        <img src={props.product.image} alt="" />
      </div>

      <div className="card-body">
        <div className="card-title">{props.product.title}</div>

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

function App() {
  const [products, productsSet] = useState<Product.RootObject[]>();

  useEffect(() => {
    Fetch.products().then((res) => {
      productsSet(res.data);
    });
  }, []);

  return (
    <div className="App">
      <Header />

      <div className="card-products">
        {products?.map((product) => (
          <CardGrid product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
