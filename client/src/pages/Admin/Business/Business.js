import React, {useState} from 'react';
import {Steps,Card} from 'antd';

import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import './Business.scss';

const Business = () => {
  const {Step} = Steps;
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent((value) => value + 1);
  }

  const prev = () => {
    setCurrent((value) => value - 1);
  }
  const steps = [
    {
      title: 'RUC',
      content: <Step1 next={next}/>,
    },
    {
      title: 'Registrar',
      content: <Step2 next={next} prev={prev}/>,
    },
    {
      title: 'Resultado',
      content: <Step3 next={next} prev={prev}/>
    }
  ];


  return (  
    <>
      <Card>
        <h1 className="title-card">Registrar Empresa</h1>
      </Card>
      <Card>
        <div className="register-form">
          <Steps current={current} className="register-form__steps">
            {steps.map(item => (
              <Step key={item.title} title={item.title} className="steps-head"/>
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </Card>

      
      {/* <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div> */}
    </>
  );
}
 
export default Business;