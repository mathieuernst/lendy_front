import {AUTH_USER, AUTH_ERROR} from "./types";
import axios from 'axios';
const TOKEN = '?access_token=9C9dCYXB222oI2gCmuWq87kMJ5IF3xx9Lw9O9rv2suIuMOI6imVJ30393zL30L4V';
const BASE_URL = 'http://localhost:3000/api/';


//export const signup = ({email, password}) => {
  //return (dispatch) => {

  //}
//};
//Meme syntaxe en plus simplifié pour la déclaration avec redux-thunk:
// double fat arrow en cascade == fonction qui return une autre fonction


export const signup = (formProps, type, callback) => async dispatch => {

    formProps = {
        ...formProps,
        'role' : type
    };

    const req = `${BASE_URL}/utilisateurs${TOKEN}`;
      try {
          const response = await axios.post(
              req,
              formProps); // formProps = values du form, en l'occurence mail et password
            console.log(response);
          dispatch({
              type: AUTH_USER,
              payload: response.data.id
          });
          localStorage.setItem('token', response.data.id);
          callback();
      } catch (e){
          dispatch({
              type: AUTH_ERROR,
              payload: 'Email in use'
          })
      }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signin',
            formProps); // formProps = values du form, en l'occurence mail et password

        dispatch({
            type: AUTH_USER,
            payload: response.data.token
        });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e){
        dispatch({
            type: AUTH_ERROR,
            payload: 'Invalid login credentials'
        })
    }
};

export const signout = () => {
    localStorage.removeItem('token');
    return {
        type:AUTH_USER,
        payload:''
    }
};
