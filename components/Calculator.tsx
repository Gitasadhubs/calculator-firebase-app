
import React, { useState } from 'react';
import Button from './Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const formatNumber = (num: number) => {
    // Limit to a reasonable precision to avoid floating point issues and long decimals
    if (String(num).length > 15) {
      return num.toPrecision(10);
    }
    return String(num);
  };

  const handleNumberInput = (num: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(num);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? num : displayValue + num);
    }
  };

  const handleDecimalInput = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };
  
  const performCalculation = () => {
      const secondOperand = parseFloat(displayValue);
      if (operator && firstOperand !== null) {
          let result = 0;
          switch (operator) {
              case '+':
                  result = firstOperand + secondOperand;
                  break;
              case '-':
                  result = firstOperand - secondOperand;
                  break;
              case '×':
                  result = firstOperand * secondOperand;
                  break;
              case '÷':
                  if (secondOperand === 0) {
                      return 'Error';
                  }
                  result = firstOperand / secondOperand;
                  break;
          }
          return formatNumber(result);
      }
      return displayValue;
  }

  const handleOperatorInput = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);
    
    if (operator && waitingForSecondOperand) {
        setOperator(nextOperator);
        return;
    }
    
    if (firstOperand === null) {
        setFirstOperand(inputValue);
    } else if (operator) {
        const result = performCalculation();
        setDisplayValue(result);
        setFirstOperand(parseFloat(result));
    }
    
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const handleClear = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  const handleEquals = () => {
      if (!operator || firstOperand === null) return;
      
      const result = performCalculation();
      setDisplayValue(result);
      setFirstOperand(null); // Allow new calculations
      setOperator(null);
      setWaitingForSecondOperand(false);
  }

  const handleMiscFunction = (func: string) => {
      const currentValue = parseFloat(displayValue);
      switch(func) {
          case '%':
              setDisplayValue(formatNumber(currentValue / 100));
              break;
          case '+/-':
              setDisplayValue(formatNumber(currentValue * -1));
              break;
      }
  }

  const handleButtonClick = (label: string) => {
    if (!isNaN(Number(label))) {
      handleNumberInput(label);
    } else if (label === '.') {
      handleDecimalInput();
    } else if (['+', '-', '×', '÷'].includes(label)) {
      handleOperatorInput(label);
    } else if (label === '=') {
        handleEquals();
    } else if (label === 'AC') {
      handleClear();
    } else if (['%', '+/-'].includes(label)){
        handleMiscFunction(label);
    }
  };
  
  const getDisplayFontSize = () => {
      if (displayValue.length > 18) return 'text-2xl';
      if (displayValue.length > 12) return 'text-3xl';
      if (displayValue.length > 8) return 'text-4xl';
      return 'text-6xl';
  }

  const buttonClasses = {
    misc: 'bg-slate-500 hover:bg-slate-400 text-black',
    operator: 'bg-orange-500 hover:bg-orange-400 text-white',
    number: 'bg-slate-700 hover:bg-slate-600 text-white',
  };

  const buttons = [
    { label: 'AC', class: buttonClasses.misc, span: 1 },
    { label: '+/-', class: buttonClasses.misc, span: 1 },
    { label: '%', class: buttonClasses.misc, span: 1 },
    { label: '÷', class: buttonClasses.operator, span: 1 },
    { label: '7', class: buttonClasses.number, span: 1 },
    { label: '8', class: buttonClasses.number, span: 1 },
    { label: '9', class: buttonClasses.number, span: 1 },
    { label: '×', class: buttonClasses.operator, span: 1 },
    { label: '4', class: buttonClasses.number, span: 1 },
    { label: '5', class: buttonClasses.number, span: 1 },
    { label: '6', class: buttonClasses.number, span: 1 },
    { label: '-', class: buttonClasses.operator, span: 1 },
    { label: '1', class: buttonClasses.number, span: 1 },
    { label: '2', class: buttonClasses.number, span: 1 },
    { label: '3', class: buttonClasses.number, span: 1 },
    { label: '+', class: buttonClasses.operator, span: 1 },
    { label: '0', class: buttonClasses.number, span: 2 },
    { label: '.', class: buttonClasses.number, span: 1 },
    { label: '=', class: buttonClasses.operator, span: 1 },
  ];

  return (
    <div className="bg-black w-full max-w-sm rounded-3xl p-6 shadow-2xl shadow-slate-800/50 space-y-6">
      <div className="bg-black text-white text-right rounded-lg h-28 flex items-end justify-end p-4 overflow-hidden">
        <p className={`font-light break-all ${getDisplayFontSize()}`}>{displayValue}</p>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {buttons.map((btn) => (
          <div key={btn.label} className={btn.span === 2 ? 'col-span-2' : 'col-span-1'}>
            <Button
              label={btn.label}
              onClick={handleButtonClick}
              className={`w-full h-20 ${btn.class}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
