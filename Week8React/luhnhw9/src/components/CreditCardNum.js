
import {useState} from 'react'

export default function CreditCardNum () {
const [creditCardNumber, setCreditCardNumber] = useState('');
const [validState, setValidState] = useState('');

const handleNumChange = (event) => {
setCreditCardNumber(event.target.value);
setValidState(''); 
};

const handleSubmit = event => {
event.preventDefault()


  // Process the credit card number here
    const processedCreditCardNumber = doubleEachDigit(creditCardNumber);
    const secondProcess = sumDoubledDigits(processedCreditCardNumber);
    
    if (secondProcess % 10 === 0) {
        setValidState('Valid');
    } else( 
        setValidState('invalid'));
  };

  const doubleEachDigit = (numberString) => {
    // Convert the string to an array of characters
    const digitsArray = numberString.split('');

    // Double each digit
    const doubledDigits = digitsArray.map((digit) => {
      const number = parseInt(digit, 10);
      return isNaN(number) ? digit : number * 2;
    });

    return doubledDigits.join('');
  };

   const sumDoubledDigits = (numberString) => {
    // Convert the string to an array of characters
    const digitsArray = numberString.split('');

    // Sum all digits
    const sum = digitsArray.reduce((acc, digit) => {
      const number = parseInt(digit, 10);
      return isNaN(number) ? acc : acc + number;
    }, 0);

    return sum;
  };


return(
<form id='valCC'onSubmit={handleSubmit}>Validate Credit Card:
<input id="num" type="text" value={creditCardNumber} onChange={handleNumChange}/>
<input type="submit" value="Submit" className="button"/>
{validState && <div>{validState}</div>}
</form> 
)

}