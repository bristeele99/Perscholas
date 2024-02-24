
import './App.css';
import {useState} from 'react';

const products = [
  {
    name: "allen wrench",
    price: 2.99,
    description: "handy tool",
  },
  {
    name: "cornucopia",
    price: 5.99,
    description: "festive holiday decoration",
  },
  {
    name: "banana",
    price: 0.99,
    description: "fruit of potassium",
  },
  {
    name: "jacok-o-lantern",
    price: 3.99,
    description: "spooky seasonal fun",
  },
  {
    name: "doggie treat box",
    price: 5.99,
    description: "fido loves 'em",
  },
  {
    name: "LED lightbulb",
    price: 6.55,
    description: "It's super efficient!",
  },
  {
    name: "turtleneck",
    price: 19.99,
    description: "available in black!",
  }
]

function App() {

  const [cart, setCart] = useState([])

 return ( 
  <div>
    <h1> Hi There! </h1>
    <ul>
        {products.map(item => {
          return(
        <li>{item.name}<button onClick={() => {
          setCart([...cart, item])

          //const tempArr = cart
          // tempArr.push(item)
          // setCart(tempArr)

        }}>Add to Cart</button></li>
        )}
      )}
    </ul>
    <h2>CART:</h2>
    <ul>
    {cart.map(item => {
      return (
        <li>{item.name} - ${item.price}</li>
      )}
    )}
    </ul>
  </div>
  );
}

export default App;
