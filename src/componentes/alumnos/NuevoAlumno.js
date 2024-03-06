import React, { Fragment, useEffect, useState } from "react";
import ClienteAxios from "../../config/axios";

function NuevoAlumno(){

    const[carreras, guardarCarreras] = useState([]);
    const ConsultarAPI = async () => {
        const CarreraConsulta = await ClienteAxios.get('/carreras');

        guardarCarreras(CarreraConsulta.data);
    }
    useEffect(() => {
        ConsultarAPI();
    },[]);

    /**codigo para validar formulario */

    const [alumno, guardarAlumno] = useState({
        action:'',
        fk_carrera:'',
        nombre:'',
        apellido:'',
        edad:'',
        email:'',
        estado:'',   
    })

    const actualizarState = e =>{
     console.log(e.target.value)
        guardarAlumno({
            ...alumno,
            [e.target.name] : e.target.value
        })
    }


    const validarAlumno = () =>{
        const {fk_carrera, nombre, apellido, edad, email, estado} = alumno;
        let valido = !fk_carrera.length || !nombre.length || !apellido.length || !edad.length || !email.length || !estado.length
        return valido;
    }

    const AgregarAlumno = e => {
        e.preventDefault();
        ClienteAxios.post('/alumnos', alumno)
        .then(res =>{
            console.log(res);
            alert("Alumno Agregado")
        })
    }

    return(
      <Fragment>
        <h2>Nuevo Alumno</h2>

        <form  onSubmit={AgregarAlumno}>
            <legend>Llena todos los campos</legend>

            <div class="campo">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre Alumno" 
                name="nombre"
                onChange={actualizarState}
                
                />
            </div>

            <div class="campo">
                <label>Apellido:</label>
                <input type="text" placeholder="Apellido Alumno" name="apellido"
                onChange={actualizarState}/>

            </div>
        
            <div class="campo">
                <label>Carrera:</label>
                <select name="fk_carrera" onChange={actualizarState}>
                    <option value="">Selecciona una opcion</option>
                    {carreras.map (carrera =>
                        <option value={carrera.id}>{carrera.nombre_materia}</option>)}
                </select>
            </div>

            <div class="campo">
                <label>Email:</label>
                <input type="email" placeholder="Email Alumno" name="email"
                onChange={actualizarState}/>
            </div>

            <div class="campo">
                <label>Edad:</label>
                <input type="text" placeholder="Edad Alumno" name="edad"
                onChange={actualizarState}/>
            </div>

            <div class="campo">
                <label>Estado</label>
                <select name="estado" onChange={actualizarState}>
                <option value="">Seleccione una opcion</option>
                <option value="1">Alumno Inscrito</option>
                <option value="2">Alumno Baja Temporal</option>
                <option value="3">Alumno Baja Definitiva</option>
                </select>
            </div>

            <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Alumno" disabled={validarAlumno()} />
            </div>

        </form>
      </Fragment>
    )
}

export default NuevoAlumno;