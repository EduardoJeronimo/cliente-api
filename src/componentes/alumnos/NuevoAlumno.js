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
        carrera:'',
        nombre:'',
        apellido:'',
        edad:'',
        email:'',
        estado:'',   
    })

    const actualizarState = e =>{
     
        guardarAlumno({
            ...alumno,
            [e.target.name] : e.target.value
        })
    }


    return(
      <Fragment>
        <h2>Nuevo Alumno</h2>

        <form  method="POST">
            <legend>Llena todos los campos</legend>

            <div class="campo">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre Alumno" 
                name="nombre"
                
                />
            </div>

            <div class="campo">
                <label>Apellido:</label>
                <input type="text" placeholder="Apellido Alumno" name="apellido"/>
            </div>
        
            <div class="campo">
                <label>Carrera:</label>
                <select name="carrera">
                    <option value="">Selecciona una opcion</option>
                    {carreras.map (carrera =>
                        <option value={carrera.id}>{carrera.nombre_materia}</option>)}
                </select>
            </div>

            <div class="campo">
                <label>Email:</label>
                <input type="email" placeholder="Email Alumno" name="email"/>
            </div>

            <div class="campo">
                <label>Edad:</label>
                <input type="text" placeholder="Edad Alumno" name="edad"/>
            </div>

            <div class="campo">
                <label>Estado</label>
                <select name="estado">
                <option value="">Seleccione una opcion</option>
                <option value="1">Alumno Inscrito</option>
                <option value="2">Alumno Baja Temporal</option>
                <option value="3">Alumno Baja Definitiva</option>
                </select>
            </div>

            <div class="enviar">
                    <input type="submit" class="btn btn-azul" value="Agregar Alumno"/>
            </div>

        </form>
      </Fragment>
    )
}

export default NuevoAlumno;