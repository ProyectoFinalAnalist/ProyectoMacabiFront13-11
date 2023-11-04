export class Utils{
    confirm(accion, modificacion, tipo) {
        var confirmado = true;
        var confirmar = window.confirm(`¿Estás seguro de ${accion} este ${tipo}?`);
        if (confirmar) {
          alert(`${tipo} ${modificacion} correctamente`);
        } else {
          alert(`Acción cancelada`);
          confirmado = false;
        }
        return confirmado;
      }
    
    obtenerFechaFormateada(fecha) {
        const partesFecha = fecha.split("-");
        return `${partesFecha[2]}/${partesFecha[1]}/${partesFecha[0]}`;
    }

    obtenerEdadXFecha(fecha) {
        const fechaNac = new Date(fecha);
        const fechaActual = new Date(); 
        let diferencia = fechaActual - fechaNac;
        return `${Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365.25))} años`
    }
}

export class UtilsUsuario{

    validar(user,userArr) {
        const showErrores= {}
        const creandoUsuario= !user.idUsuario

        showErrores.nombre =  /\d/.test(user.nombre) || user.nombre.trim() === '';
        showErrores.nombreSize = !/^[A-Za-z\s]{2,24}$/.test(user.nombre)
        showErrores.apellido = /\d/.test(user.apellido) || user.apellido.trim() === ''
        showErrores.apellidoSize = !/^[A-Za-z\s]{2,24}$/.test(user.apellido)
        showErrores.direccion = !/^[A-Za-z\s]{5,50}$/.test(user.direccion)
        showErrores.rol = String(user.idRol).trim() === ''
        showErrores.email = !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.email)
        if(creandoUsuario) showErrores.clave = !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.clave)
        showErrores.telefono = !/^\d{8,15}$/.test(Number(user.telefono))
        showErrores.dni = !/^\d{6,10}$/.test(Number(user.dni))
        if(!showErrores.email) showErrores.emailExistente = this.verificarExistenciaEmail(user,userArr,creandoUsuario)
        if(!showErrores.dni) showErrores.dniExistente = this.verificarExistenciaDni(user,userArr,creandoUsuario)

        return showErrores
    };

    verificarExistenciaEmail(user, userArr,creandoUsuario){
        let res; 
        if(!creandoUsuario){
            res= userArr.some(item => item.email == user.email && item.idUsuario != user.idUsuario)
        }else{
            res= userArr.some(item => item.email == user.email)
        }
        return res
    }

    verificarExistenciaDni(user, userArr,creandoUsuario){
        let res; 
        if(!creandoUsuario){
            res= userArr.some(item => item.dni == user.dni && item.idUsuario != user.idUsuario  )
        }else{
            res= userArr.some(item => item.dni == user.dni)
        }
        return res
    }

    errores(showErrores) {
        let errores;
        for (const key in showErrores) {
            if(showErrores[key]) errores = true
        }

        return errores
    }
    }