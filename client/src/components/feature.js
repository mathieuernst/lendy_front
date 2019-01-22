import React, {Component} from 'react';
import requireAuth from './requireAuth';
import {connect} from 'react-redux';
import GoogleSuggest from './GoogleSuggest'


class Feature extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        if (this.props.myself.myself === "")
            this.props.getMyself(() => {});
    }

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
                    <div className="row text-center justify-content-center mt-5">
                        <div className="col-12 col-sm-4 col-xl-3 m-md-auto">
                            <img  className="fdb-icon" src="/assets/icons/layers.svg" />
                            <h3><strong>Feature 1</strong></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia</p>
                        </div>

                        <div className="col-12 col-sm-4 col-xl-3 m-auto pt-4 pt-sm-0">
                            <img className="fdb-icon" src="/assets/icons/gift.svg" />
                            <h3><strong>Feature 2</strong></h3>
                            <p>Separated they live in Bookmarksgrove right at the coast of the Semantics, a large ocean.</p>
                        </div>

                        <div className="col-12 col-sm-4 col-xl-3 m-auto pt-4 pt-sm-0">
                            <img className="fdb-icon" src="/assets/icons/cloud.svg" />
                            <h3><strong>Feature 3</strong></h3>
                            <p>A small river namezd Duden flows by their place and supplies it with the necessary regelialia</p>
                        </div>

                        <div className="row mt-5 justify-content-center">
                            <div className="col-8">
                                <img alt="image" className="img-fluid" src="/assets/draws/product-tour.svg"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        drivers: state.drivers,
        myself: state.myself
    }
}


export default connect(mapStateToProps)(requireAuth(Feature));
