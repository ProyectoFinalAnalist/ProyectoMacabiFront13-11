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

}

export class UtilsUsuario{

    validar(user,userArr) {
        const showErrores= {}
        const creandoUsuario= !user.idUsuario

        showErrores.nombre =  /\d/.test(user.nombre) || user.nombre.trim() === '';
        showErrores.apellido = /\d/.test(user.apellido) || user.apellido.trim() === ''
        showErrores.domicilio =  user.domicilio.trim() === ''
        showErrores.rol = String(user.idRol).trim() === ''
        showErrores.email = !/@/.test(user.email)
        if(creandoUsuario) showErrores.clave = !/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(user.clave)
        showErrores.telefono = !/^\d{10}$/.test(Number(user.telefono))
        showErrores.dni = !/^\d{7,8}$/.test(Number(user.dni))
        if(!showErrores.email) showErrores.emailExistente = this.verificarExistenciaEmail(user,userArr,creandoUsuario)
        if(!showErrores.dni) showErrores.dniExistente = this.verificarExistenciaDni(user,userArr,creandoUsuario)

        return showErrores
    };

    verificarExistenciaEmail(user, userArr,creandoUsuario){
        let res; 
        if(!creandoUsuario){
            res= userArr.some(item => item.email == user.email && item.idUsuario == user.idUsuario)
        }else{
            res= userArr.some(item => item.email == user.email)
        }
        return res
    }

    verificarExistenciaDni(user, userArr,creandoUsuario){
        let res; 
        if(!creandoUsuario){
            res= userArr.some(item => item.dni == user.dni && item.idUsuario == user.idUsuario  )
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