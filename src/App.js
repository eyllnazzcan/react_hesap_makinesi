import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {

    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const [test, setTest] = useState(0);
    const [number1, setNumber1] = useState(0);
    const [number2, setNumber2] = useState(0);
    const [operation, setOperation] = useState(null);
    
    

    const ops = ['/', '*', '+', '-'];

    const createDigits = () => { //creates digits 1 to 10 
        const digits = [];

        for(let i = 1; i<10; i++){
            digits.push(
                <button 
                    onClick={() => updateCalc(i.toString())}
                    key = {i}>{i}
                </button>
            )
        }

        return digits;

    }

    const updateCalc = value => {

        if (
            (ops.includes(value) && calc === '') || 
            (ops.includes(value) && ops.includes(calc.slice(-1)))  
            //if the last value is an operator, it doesn't allow to update
        ) {
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)) {
            // eslint-disable-next-line
            setResult(eval(calc + value).toString()); 
        }

    
    }

    const calculate = () => {
        // eslint-disable-next-line
        setCalc(eval(calc).toString());
    }

    const calculate2 = (no1, no2) => {

        if (operation === "+"){
            setResult(parseInt(no1) + parseInt(no2));
        }
        else if(operation === "-"){
            setResult(parseInt(no1) - parseInt(no2));
        }
        else if(operation === "*"){
            setResult(parseInt(no1) * parseInt(no2));
        }
        else{
            setResult(parseInt(no1) / parseInt(no2));
        }
    }

    const del = () => { //deletes the last value
        if (calc === '') { 
            return;
        }

        const value = calc.slice(0, -1);

        setCalc(value);
    }


  return(
    <div className="App">

        <h1> Calculator </h1>

        <div className="calculator">

                <div className="digits">
                    {createDigits()}
                    <button onClick={() => updateCalc('0')}>0</button>
                    <button onClick={calculate}>=</button>

                    &nbsp;
                    &nbsp;
                    &nbsp;
                    &nbsp;
                
                    {/* {calc ? <span>{calc}</span> : ''}  */}
                    {result} 
                    
                </div>
                

                <div className="operators">
                    
                    <button onClick={del}>Delete </button> 
                    <DropdownButton id="dropdown-basic-button" title="Operators" >
                        <Dropdown.Item href="#/action-1" onClick={() => {updateCalc('+'); setOperation("+")}} >
                            Sum (+)</Dropdown.Item>
                        <Dropdown.Item href="#/action-2" onClick={() => {updateCalc('-'); setOperation("-")}}>
                            Subtract (-)</Dropdown.Item>
                        <Dropdown.Item href="#/action-3" onClick={() => {updateCalc('*'); setOperation("*")}}>
                            Multiply (x)</Dropdown.Item>
                        <Dropdown.Item href="#/action-4" onClick={() => {updateCalc('/'); setOperation("/")}}>
                            Divide (÷)</Dropdown.Item>
                    </DropdownButton>
                    <button onClick={() => {console.log(test); setTest(test+1)}}> test</button>
                    {test}

                    

                    &nbsp;
                </div>      

                <div> 

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Number 1</Form.Label>
                        <Form.Control onChange={(event) => {console.log(event.target.value); setNumber1(event.target.value)}} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Number 2</Form.Label>
                        <Form.Control onChange={(event) => {console.log(event.target.value); setNumber2(event.target.value)}} />
                    </Form.Group>
                </Form>

                <Button variant="primary" onClick={() => (calculate2(number1, number2))}>
                    Calculate
                </Button> 
                </div> 
        </div>
    </div>
  );
}

export default App; 
