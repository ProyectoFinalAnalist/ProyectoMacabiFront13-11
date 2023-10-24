import axios from 'axios'
import { setCookie,getCookie,getCookieJSON} from './Cookies';

// JUAMPI: hice este método para simular un inicio de sesion, cuando se haga el inicio real se borra
let auth = false
let idUsuario = 1
// 1 = A dmin
// 2 = C oordinador
// 3 = P rofesor
// 4 = P rofesor

const url = `http://localhost:2020/usuarios/${idUsuario}`;

login()

export function login() {  
    auth = !auth

    if(auth){
        axios.get(url).then(response => {
            if (response.data.success) {
              setCookie(response.data.result);
              //console.log(response.data.result)
              //location.reload();
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



export function userIsAuthenticated() {    
    return !!getCookie();
}

export function isAdmin() {
    let usuario:any = getCookieJSON()
    if(usuario){
        usuario = usuario[0].administrador
    }
    return usuario || false
}

export function sameUser(id){
    const usuario:any =getCookieJSON()
    let resultado = false;
    if(usuario){
        resultado = usuario[0].id == id
    }
    //console.log(id, resultado, usuario)
    return resultado
}

export function compareString(str1: string, str2: string){
    return str1.toLowerCase() === str2.toLowerCase();
}