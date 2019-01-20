import React from 'react'
import className from 'classname'
import Moment from 'react-moment'
import {Link} from 'react-router-dom'

export default function LaunchItem(props) {
    // console.log(props.launch);
    return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-9">
            <h4>Mission Name : <span className={className({
              'text-success' : props.launch.launch_success,
              'text-danger' : ! props.launch.launch_success
            })}>{props.launch.mission_name}</span></h4>
            <p className="lead">Date : <Moment format='DD-MM-YYYY'>{props.launch.launch_date_local}</Moment></p>
        </div>
        <div className="col-md-3">
            <Link to={`launch/${props.launch.flight_number}`} className="btn btn-secondary">Details</Link>
        </div>
      </div>
    </div>
  )
}
