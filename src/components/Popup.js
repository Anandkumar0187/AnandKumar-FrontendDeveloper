import React from 'react';
import './Popup.css'

function Popup({item}) {
  return (
    <div className='transparent'>
        <div className='pop'>
              <h3>Serial No. :- {item.capsule_serial}</h3>
              <h3>Capsule id :- {item.capsule_id}</h3>
              <h3>Status :- {item.status}</h3>
              <h3>Capsule Type :- {item.type}</h3>
              <h3>Mission name :- {item.missions[0].name}</h3>
              <h3>Description :- {item.details}</h3>
        </div>
    </div>
  )
}

export default Popup
