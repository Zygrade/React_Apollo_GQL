import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom'
import className from 'classname'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Moment from 'react-moment'

const LAUNCH_QUERY = gql`
    query LaunchQuery( $flight_number : Int!){
        launch(flight_number:$flight_number){
            mission_name
            flight_number
            launch_success
            launch_date_local
            launch_year
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

export class Launch extends Component {
    render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Query query={LAUNCH_QUERY} variables={{flight_number}}>
        {
            ({loading,data,error}) => {
                if(loading) return <h4>Loading...</h4>
                
                if(error) console.log(error);

                // console.log(data); 

                const {
                    mission_name,
                    flight_number,
                    launch_success,
                    launch_date_local,
                    launch_year,
                    rocket : {
                        rocket_id,
                        rocket_name,
                        rocket_type
                    }
                } = data.launch;

                return (
                    <div>
                        <h1 className="my-3 display-4">
                            <span className="text-dark">Mission : </span> {mission_name}
                        </h1>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="text-dark">Flight Number : </span> {flight_number}
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Launch Year : </span> {launch_year}
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Launch Success : </span> <span className = {className({ 'text-success' : launch_success, 'text-danger' : !launch_success })}>{launch_success ? 'True' : 'False'}</span>
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Launch Date : </span> <Moment format='DD-MM-YYYY'>{launch_date_local}</Moment>
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Launch Timings in Hours : </span> <Moment format='HH:mm:ss'>{launch_date_local}</Moment>
                            </li>
                        </ul>

                        <h2 className="my-3">Rocket Details</h2>
                        <ul className="list-group">
                            <li className="list-group-item">
                                <span className="text-dark">Rocket Name : </span> {rocket_name}
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Rocket Id : </span> {rocket_id}
                            </li>

                            <li className="list-group-item">
                                <span className="text-dark">Rocket Type : </span> {rocket_type}
                            </li>
                        </ul>

                        <hr/>
                        <Link to='/' className="btn btn-secondary">Back</Link> 
                    </div>
                );
            }
        }
        </Query>
      </Fragment>
    )
  }
}

export default Launch
