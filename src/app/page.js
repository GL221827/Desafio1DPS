"use client";
import { useState } from 'react';
import { Headers } from "@/components/Headers";
import { ProductList } from "@/components/ProductList";
import { Login } from "@/components/Login";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [countProducts, setCountProducts] = useState(0);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <>
      <Headers
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
      <ProductList
        allProducts={allProducts}
        setAllProducts={setAllProducts}
        total={total}
        setTotal={setTotal}
        countProducts={countProducts}
        setCountProducts={setCountProducts}
      />
    </>
  );
}
