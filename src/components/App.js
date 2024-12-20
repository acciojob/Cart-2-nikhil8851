import React, { useState } from 'react';

const App = () => {
  const [shoping, setShoping] = useState([]); // To store items in the cart
  const [amount, setAmount] = useState(0); // To store the total amount

  const products = [
    { id: 1, item: "iPhone 12", price: 20000 },
    { id: 2, item: "iPhone 13", price: 22000 },
    { id: 3, item: "iPhone 14", price: 22000 },
  ];

  // Add product to the cart
  const addToCart = (product) => {
    setShoping((prevCart) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCart.find(item => item.id === product.id);

      if (existingProduct) {
        // If it exists, increase the quantity by 1
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If not, add it to the cart with quantity 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });

    // Update total amount
    setAmount(prevAmount => prevAmount + product.price);
  };

  // Remove product from the cart
  const removeFromCart = (productId) => {
    setShoping((prevCart) => {
      const updatedCart = prevCart.map(item => {
        if (item.id === productId && item.quantity > 1) {
          // If quantity is more than 1, reduce it by 1
          return { ...item, quantity: item.quantity - 1 };
        } else {
          // If quantity is 1, remove it from the cart
          return item;
        }
      }).filter(item => item.quantity > 0); // Filter out items with 0 quantity

      return updatedCart;
    });

    // Update total amount
    const product = products.find(item => item.id === productId);
    if (product) {
      setAmount(prevAmount => prevAmount - product.price);
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav>
        <h3>Cart Total Item</h3>
        <h4>Cart item count: {shoping.length}</h4>
        <h4>Total amount: ${amount}</h4>
      </nav>

      {/* Product List */}
      {products.map((product) => {
        const productInCart = shoping.find(item => item.id === product.id);
        const quantity = productInCart ? productInCart.quantity : 0;

        return (
          <div key={product.id}>
            <div className="image">
              <img src={`item-${product.id}.png`} alt={product.item} />
            </div>

            <div className="description">
              <span>{product.item}</span>
              <span>Price: ${product.price}</span>
            </div>

            <div className="quantity">
              <button className="plus-btn" type="button" onClick={() => addToCart(product)}>
                Add
              </button>
              <input type="text" name="name" value={quantity} readOnly />
              <button className="minus-btn" type="button" onClick={() => removeFromCart(product.id)}>
                Remove
              </button>
            </div>

            <div className="total-price">${product.price * quantity}</div>
          </div>
        );
      })}

      {/* Cart Summary */}
      <div className="cart-summary">
        {shoping.length > 0 && (
          <>
            <h4>Your Cart:</h4>
            {shoping.map(item => (
              <div key={item.id}>
                <p>{item.item} (x{item.quantity})</p>
                <p>Total: ${item.quantity * item.price}</p>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default App;
