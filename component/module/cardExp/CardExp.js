import React from "react";

import { PiBagSimpleFill } from "react-icons/pi";
const CardExp = (props) => {
  const {src, position, company, month, year, desc, children} = props
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-3 d-flex justify-content-center align-items-center">
            {src ? (
              <img src={src} className="img-fluid rounded-start" alt="..." />
            ) : (
              <PiBagSimpleFill style={{width : 100, height : 100}}/>
            )}
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <h4 className="card-title">{position}</h4>
              <h6>{company}</h6>
              <p className="card-subtitle text-body-secondary">
                {month} {year}
              </p>
              <p className="card-text mt-3">
                {desc}
              </p>
            </div>
            
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CardExp;
