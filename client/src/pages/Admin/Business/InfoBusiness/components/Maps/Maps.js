import React from 'react';
import {Card} from 'antd';
import './Maps.scss';
const Maps = () => {
  return (  
    <Card hoverable>
      <div className="card-body">
        <iframe title="Maps" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15607.438856446874!2d-77.08815623494871!3d-12.053171806684615!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc6def8804064a4e9!2sUniversidad%20Nacional%20Mayor%20de%20San%20Marcos!5e0!3m2!1ses-419!2spe!4v1594780993698!5m2!1ses-419!2spe" width="100%" height="450" style={{border: 0}}>
        </iframe>
      </div>
    </Card>
  );
}
 
export default Maps;
