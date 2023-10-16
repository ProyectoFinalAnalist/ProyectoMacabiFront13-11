import axios from 'axios'
import { setCookie } from './Cookies';

// JUAMPI: hice este método para simular un inicio de sesion, cuando se haga el inicio real se borra
let auth = false
let id = 1
// 1 = A dmin
// 2 = C oordinador
// 3 = P rofesor
const url = `http://localhost:2020/usuario/${id}`;

export function login() {  
    auth = !auth

    if(auth){
        axios.get(url).then(response => {
            if (response.data.success) {
              setCookie(response.data.result);
              console.log(response.data.result)
              location.reload();
            } else {
              alert("No se encontró un usuario");
            }
          })
          .catch(error => {
            console.error(error);
          });
    }
}

export function isAuthenticated(){
    return auth
}