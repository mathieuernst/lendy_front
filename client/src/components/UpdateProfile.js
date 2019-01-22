import React, {Component} from 'react';
import requireAuth from './requireAuth';
import {connect} from 'react-redux';


class UpdateProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedModel: '',
            selectedMake: '',
            selectedTrim: ''
        };
        this.makeSelected = this.makeSelected.bind(this);
        this.modelsSelected = this.modelsSelected.bind(this);

    }

    componentDidMount() {
        if (this.props.myself.myself === "")
            this.props.getMyself(() => {});
        else
            this.props.getDrivers(() => {});
        this.props.getMakes(() => {
            //console.log(this.props.carApi);
        });
    }

    makeSelected(event){
        if (event.target.value === -1)
            return;
        else
        {
            this.setState({
                selectedMake: event.target.value
            });
            this.props.getModels(event.target.value, () => {});
        }
    }

    modelsSelected(event){
        if (event.target.value === -1)
            return;
        else
        {
            this.setState({
                selectedModel: event.target.value
            });
            this.props.getTrims( this.state.selectedMake, event.target.value, () => {
                console.log(this.props);
            });
        }
    }

    trimSelected(event){
        if (event.target.value === -1)
            return;
        else
        {
            this.setState({
                selectedTrim: event.target.value
            });
            this.props.getTrims( this.state.selectedMake, event.target.value, () => {
                console.log(this.props);
            });
        }
    }

    renderMakes = () => {
      if (this.props.carApi.makes === "")
          return (<select></select>);
      else
      {
          let options = this.props.carApi.makes.map((make) =>
              <option key={make.make_id} value={make.make_id}>{make.make_display}</option>
          );

          return (
            <select onChange={this.makeSelected}>
                <option value={-1}>Choisissez une marque</option>
                {options}
            </select>
          );
      }
    };

    renderModels = () => {
        if (this.props.carApi.models === "")
            return (<select><option value={-1}>Choisissez une marque d'abord</option></select>);
        else
        {
            let options = this.props.carApi.models.map((models) =>
                <option key={models.model_name} value={models.model_name}>{models.model_name}</option>
            );

            return (
                <select onChange={this.modelsSelected}>
                    <option value={-1}>Choisissez un modèle</option>
                    {options}
                </select>
            );
        }
    };

    renderTrims = () => {
        if (this.props.carApi.trims === "")
            return (<select><option value={-1}>Choisissez un modèle d'abord</option></select>);
        else
        {
            let options = this.props.carApi.trims.map((trims) =>
                <option key={trims.model_id}>{trims.model_trim} {trims.model_year}</option>
            );

            return (
                <select >
                    <option value={-1}>Choisissez votre véhicule</option>
                    {options}
                </select>
            );
        }
    };


    render(){

        return (
            <section className="fdb-block">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                            <h1>Mettez à jour votre profil ici</h1>
                        </div>
                    </div>
                    <div className="row-50"></div>
                    <div className="row">
                        {this.renderMakes()}
                        {this.renderModels()}
                        {this.renderTrims()}
                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        myself: state.myself,
        carApi: state.carApi
    }
}


export default connect(mapStateToProps)(requireAuth(UpdateProfile));
