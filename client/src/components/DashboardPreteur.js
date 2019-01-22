import React, {Component} from 'react';
import requireAuth from './requireAuth';
import {connect} from 'react-redux';
import GoogleSuggest from './GoogleSuggest'


class DashboardPreteur extends Component{
    constructor(props){
        super(props);
        this.state = {
            lat: '',
            lng: '',
            errorSearch: ''
        };
        this.getLatLng = this.getLatLng.bind(this);
        this.getSearch = this.getSearch.bind(this);
        this.renderErrorSearch = this.renderErrorSearch.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        this.props.getMakes(() => {
            console.log(this.props.carApi);
        });
        if (this.props.myself.myself === "")
            this.props.getMyself(() => {
                this.props.getDrivers(() => {
                    console.log(this.props.drivers);
                });
            });
        else
            this.props.getDrivers(() => {
                console.log(this.props.drivers);
            });
    }

    getLatLng(lat, lng) {
        this.setState({
            lat: lat,
            lng: lng
        });
    }

    renderErrorSearch() {
        this.setState({
            errorSearch: 'Veuillez selectionner une valeur dans la liste avant de valider votre recherche'
        });
    }

    getSearch(){
        if (this.state.lat === '' || this.state.lng == '')
            this.renderErrorSearch();
        else {
            this.setState({errorSearch: ''});
        }
    }

    renderDrivers = (myDrivers) => {
        if (myDrivers.drivers !== "")
        {
            return myDrivers.drivers.map((driver) => {
                if (driver._id !== this.props.myself.myself._id) {
                    return (
                        <div className="col-sm-3 text-left" key={driver._id}>
                            <div className="fdb-box p-0">
                                <img alt="image" className="img-fluid rounded-0" src="/assets/people/6.jpg" />

                                <div className="content p-3">
                                    <h3><strong>{driver.firstName} {driver.lastName}</strong></h3>
                                    <p>Founder</p>
                                </div>
                            </div>
                        </div>
                    );
                }
                else
                    return '';
            })
        }
        else
            return (<div></div>);
    };

    renderName = () => {
        if(this.props.myself.myself !== "")
        {
            let name = this.props.myself.myself.firstName;
            return name.charAt(0).toUpperCase() + name.slice(1);
        }
        else
            return '';
    };

    render(){

        return (
            <section className="fdb-block">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                            <h1>Bienvenue sur Lendy {this.renderName()}</h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-5">
                        <div className="col-12 col-sm-8 col-xl-8 ">
                            <GoogleSuggest callback={this.getLatLng}/>
                            <div className="text-danger">
                                {this.state.errorSearch}
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 col-xl-4 ">
                            <button className="btn btn-secondary" type="button" onClick={this.getSearch}>Affichez les chauffeurs autour de cette adresse</button>
                        </div>
                    </div>
                    <div className="row-50"></div>
                    <div className="row">
                        {this.renderDrivers(this.props.drivers)}
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        drivers: state.drivers,
        myself: state.myself,
        carApi: state.carApi
    }
}


export default connect(mapStateToProps)(requireAuth(DashboardPreteur));
