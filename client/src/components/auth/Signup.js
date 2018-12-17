import React, { Component } from 'react';
import {reduxForm, Field} from 'redux-form';
import {compose} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            type: null
        }
    }
    componentDidMount() {
        const myType = this.props.match.params.type;
        var newType = '';
        myType === 'lenders' ? newType = 'prêteur' : newType = 'chauffeur';
        this.setState({type: newType});
    }

    onSubmit = (formProps) => {
        console.log(formProps);
        this.props.signup(formProps, this.state.type, () => {
            this.props.history.push('/feature');
        });
    };

    renderField ({ input, label, type, placeholder, autoComplete, meta: { touched, error } }) {

        return (
                <div>
                    <input {...input} placeholder={placeholder} type={type} autoComplete='off' className="form-control"/>
                    {touched && error && <span className='text-danger'>{error}</span>}
                </div>
        );
    }

    render(){
        const {handleSubmit} = this.props;
        return (
            <div>
                <section className="fdb-block py-0">
                    <div className="container py-5 my-5" style={{backgroundImage: 'url(/assets/shapes/1.svg)'}}>
                        <div className=" row">
                            <div className="col-12 col-md-8 col-lg-8 col-xl-8 text-left">
                                <div className="fdb-box" style={{padding : "3%!important"}}>
                                    <div className="row">
                                        <div className="col">
                                            <h1>Créez votre compte {this.state.type}</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit(this.onSubmit)}>
                                        <div className="form-group col mt-4" style={{paddingLeft : "0"}}>
                                                <Field
                                                    name='firstName'
                                                    type='text'
                                                    placeholder="Prenom"
                                                    autoComplete='off'
                                                    component={this.renderField}
                                                />
                                        </div>
                                        <div className="col mt-4" style={{paddingLeft : "0"}}>
                                            <fieldset>
                                                <Field
                                                    name='lastName'
                                                    type='text'
                                                    autoComplete='off'
                                                    className="form-control"
                                                    placeholder="Nom"
                                                    component={this.renderField}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col mt-4" style={{paddingLeft : "0"}}>
                                            <fieldset>
                                                <Field
                                                    name='email'
                                                    type='text'
                                                    autoComplete='off'
                                                    className="form-control"
                                                    placeholder="Adresse mail"
                                                    component={this.renderField}
                                                />
                                            </fieldset>
                                        </div>
                                        <div className="col mt-4" style={{paddingLeft : "0"}}>
                                            <fieldset>
                                                <Field
                                                    name='password'
                                                    type='password'
                                                    className="form-control"
                                                    placeholder="Mot de passe"
                                                    component={this.renderField}
                                                />
                                            </fieldset>
                                        </div>
                                        <div>
                                            {this.props.errorMessage}
                                        </div>
                                        <div className="row mt-4">
                                            <div className="col">
                                                <button className="btn btn-secondary" type="submit">Créer un compte</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}


function validate(values){
    const errors = {};


    if (!values.firstName)
    {
        errors.firstName = 'Ajoutez un prénom';
    }
    if (values.firstName && values.firstName.length < 3)
    {
        errors.firstName = 'Ajoutez un prénom de plus de 3 caractères';
    }

    if (!values.lastName)
    {
        errors.lastName = 'Ajoutez un nom';
    }
    if ( values.lastName &&  values.lastName.length < 3)
    {
        errors.lastName = 'Ajoutez un nom de plus de 3 caractères';
    }

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!values.email)
    {
        errors.email = 'Ajoutez une adresse mail ';
    }
    if (values.email && !values.email.match(mailformat))
    {
      errors.email = 'Votre adresse mail n\'est pas valide';
    }

    if (!values.password)
    {
        errors.password = 'Ajoutez un mot de passe';
    }
    if ( values.password &&  values.password.length < 6)
    {
        errors.password = 'Ajoutez un mot de passe d\'au moins 6 caractères';
    }


    return errors;
}

function mapStateToProps(state) {
    return {errorMessage: state.auth.errorMessage}
}

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({
        validate,
        form: 'signup'
    })
)(Signup);