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

export namespace Fetch {
  axios.defaults.baseURL = "https://fakestoreapi.com";

  export function products() {
    return axios.get<Product.RootObject[]>("products");
  }
}
