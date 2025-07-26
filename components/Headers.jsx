"use client"
import { useState } from 'react';

export const Headers = ({
  allProducts,
  setAllProducts,
  total,
  countProducts,
  setCountProducts,
  setTotal,
}) => {
  const [active, setActive] = useState(false);

  const onDeleteProduct = product => {
    const results = allProducts.filter(item => item.id !== product.id);
    setTotal(total - product.price * product.quantity);
    setCountProducts(countProducts - product.quantity);
    setAllProducts(results);
  };

  const onCleanCart = () => {
    setAllProducts([]);
    setTotal(0);
    setCountProducts(0);
  };

  const generateReceipt = () => {
    const date = new Date().toLocaleString();
    let receiptWindow = window.open('', 'Comprobante de Pago', 'width=600,height=600');

    let content = `
      <html>
      <head>
        <title>Comprobante de Pago</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          h1 { text-align: center; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          .total { text-align: right; margin-top: 20px; font-size: 18px; }
        </style>
      </head>
      <body>
        <h1>Supermercado La Tiendona</h1>
        <p>Fecha: ${date}</p>
        <table>
          <tr>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
    `;

    allProducts.forEach(product => {
      const subtotal = product.price * product.quantity;
      content += `
        <tr>
          <td>${product.quantity}</td>
          <td>${product.title}</td>
          <td>$${product.price}</td>
          <td>$${subtotal.toFixed(2)}</td>
        </tr>
      `;
    });

    content += `
        </table>
        <p class="total"><strong>Total a pagar: $${total.toFixed(2)}</strong></p>
        <p>¡Gracias por su compra!</p>
      </body>
      </html>
    `;

    receiptWindow.document.write(content);
    receiptWindow.document.close();
    receiptWindow.focus();
    receiptWindow.print();
  };

  return (
    <header>
      <h1>Supermercado La Tiendona</h1>
      <div className='container-icon'>
        <div className='container-cart-icon' onClick={() => setActive(!active)}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
            alt="carrito"
            className="icon-cart"
          />
          <div className='count-products'>
            <span id='contador-productos'>{countProducts}</span>
          </div>
        </div>

        <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
          {allProducts.length ? (
            <>
              <div className='row-product'>
                {allProducts.map(product => (
                  <div className='cart-product' key={product.id}>
                    <div className='info-cart-product'>
                      <span className='cantidad-producto-carrito'>{product.quantity}</span>
                      <p className='imagen-producto-carrito'>
                        <img src={product.urlImage} alt={product.title} />
                      </p>
                      <p className='titulo-producto-carrito'>{product.title}</p>
                      <span className='precio-producto-carrito'>${product.price}</span>
                    </div>
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/25/25008.png"
                      alt="cerrar"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    />
                  </div>
                ))}
              </div>

              <div className='cart-total'>
                <h3>Total:</h3>
                <span className='total-pagar'>${total}</span>
              </div>

              <button className='btn-clear-all' onClick={onCleanCart}>
                Vaciar Carrito
              </button>

              {}
              <button
                className='btn-buy'
                onClick={() => {
                  generateReceipt();
                  onCleanCart();
                }}
              >
                Comprar
              </button>
            </>
          ) : (
            <p className='cart-empty'>El carrito está vacío</p>
          )}
        </div>
      </div>
    </header>
  );
};
