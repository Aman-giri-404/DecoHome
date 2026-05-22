import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const [, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/product`);

    const data = await res.json();

    setProducts(data);
  };

  return (
    <div className="">
    <Navbar />
    </div>
  );
}
