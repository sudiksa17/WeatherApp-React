import React from 'react'
import "./form.style.css"

const Form = props => {
    return(
        <div className="container">
            <div>{props.noInput ? noInput() : null}</div>
            <div>{props.wrongInput ? wrongInput() : null}</div>
            <form onSubmit={props.loadweather}> 
              <div className="row">
                <div className="col-md-3 offset-md-2">
                    <input 
                    type="text" 
                    className="form-control"
                    name="city"
                    autoComplete="off"
                    placeholder="City"
                    />
                </div>
                <div className="col-md-3">
                  <input
                   type="text"
                    className="form-control"
                 name="country"
                  autoComplete="off"
                  placeholder="Country"
                  />
                </div>
                <div className="col-md-3 mt-md-0 py-2 text-md-left">
                    <button className="btn btn-warning">Get Weather</button>
                </div>
            </div></form>
        </div>
    )
}

function noInput(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Enter City and Country
        </div>
    )
}

function wrongInput(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please Provide Correct City and Country
        </div>
    )
}

export default Form