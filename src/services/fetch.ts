import axios from "axios";

export namespace Product {
  export interface Rating {
    rate: number;
    count: number;
  }

  export interface RootObject {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
  }
}

export namespace Cart {
  export interface Product {
    productId: number;
    quantity: number;
  }

  export interface RootObject {
    id: number;
    userId: number;
    date: Date;
    products: Product[];
    __v: number;
  }
}

export namespace Fetch {
  axios.defaults.baseURL = "https://fakestoreapi.com";

  export function products() {
    return axios.get<Product.RootObject[]>("products");
  }

  export function products_id(id: Product.RootObject["id"]) {
    return axios.get<Product.RootObject>("products/" + id);
  }

  export function cart_userId(id: Cart.RootObject["userId"]) {
    return axios.get<Cart.RootObject>("carts/" + id);
  }
}
