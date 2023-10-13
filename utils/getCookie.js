const getCookie = (rawCookies, nombre) => {

    let resultado = ""

    let nom = nombre+`=`

    let cookies = rawCookies.split(';')

    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if(c.indexOf(nom) == 0){
            resultado = c.substring(nom.length,c.length)
        } 
    }

    return resultado;

}

export default getCookie;