import React from 'react';
import '../Styles/Main5.css';
import { withRouter, Link } from 'react-router-dom';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Clases } from '../Utiles/Mocks/Clases';
import { User_clase } from '../Utiles/Mocks/User_clase';
import { Usuarios } from '../Utiles/Mocks/Usuarios';
import axios from 'axios';
let bool = true, bool2 = true, SubirUsu = new Array(), i = 0;
class Main5 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataClase: [],
            DataClasef: [],
            array: [],
            actual: [],
            posicion: 0,
            despaginar: 0,
            tamaño: 0,
            DataClaseI: [],
            DataClaseIF: [],
            arrayI: [],
            actualI: [],
            posicionI: 0,
            despaginarI: 0,
            tamañoI: 0,
            Modal1: false,
            Modal2: false,
            Modal3: false,
            ModalClase: 0,
            Modalconusu: 0
        }
    }
    async componentDidMount() {
        await this.getClasesC();
        await this.getClasesI();
        /*CLASES CREADAS*/
        if (this.state.DataClase.length == 0) {
            document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("clasesP2").style.justifyContent = "center";
        }

        if (this.state.DataClaseI.length == 0) {
            document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>"
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("contidU2").style.justifyContent = "center";
        }
    }
    /*METODOS SIMPLES*/
    /*Permite ocultar y/o mostrar las clases creadas*/
    Accion1 = () => {
        if (!bool) {
            document.getElementById("clasesP2").style.display = "flex";
            document.getElementById("ClasesC").value = "Clases creadas ▼";
            if (this.state.DataClase.length == 0) {
                document.getElementById("clasesP2").style.display = "flex";
                document.getElementById("clasesP2").style.justifyContent = "center";
                document.getElementById("clasesP2").innerHTML = "<p>No hay clases creadas.</p>";
            }
            bool = true
        } else {
            document.getElementById("ClasesC").value = "Clases creadas ►"
            document.getElementById("clasesP2").style.display = "none";
            bool = false
        }
    }
    /*Permite ocultar y/o mostrar las clases inscritas*/
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("contidU2").style.display = "flex";
            document.getElementById("ClasesP").value = "Clases inscritas ▼";
            if (this.state.DataClaseI.length == 0) {
                document.getElementById("contidU2").style.display = "flex";
                document.getElementById("contidU2").style.justifyContent = "center";
                document.getElementById("contidU2").innerHTML = "<p>No participas en ningúna clase.</p>";
            }
            bool2 = true
        } else {
            document.getElementById("ClasesP").value = "Clases inscritas ►"
            document.getElementById("contidU2").style.display = "none";
            bool2 = false
        }
    }
    /*Este metodo hace el switch del modal en celular*/
    Switch = () => {
        let titl1 = document.getElementById("DisPrimero");
        if (titl1.style.display == "none" || titl1.style.display == "") {
            document.getElementById("DisSegundo").style.display = "none";
            titl1.style.display = "block";
            document.getElementById("PopUp1Apar").style.display = "block";
            document.getElementById("PopUp2Apar").style.display = "none";
        } else {
            document.getElementById("DisSegundo").style.display = "block";
            titl1.style.display = "none";
            document.getElementById("PopUp1Apar").style.display = "none";
            document.getElementById("PopUp2Apar").style.display = "grid";
        }
    }
    /*MODAL1*/
    /*Metodo que determina si el modal 1 se pinta o no*/
    Modal1 = () => {
        this.setState({
            Modal1: !this.state.Modal1
        })
    }
    /*Metodo que retorna el modal 1*/
    Modal1Return = () => {
        if (this.state.Modal1) {
            return (
                <div className="Modal1ClasesR">
                    <div className="DisCom BotonesMoverCel">
                        <button className="BotonFlechita" onClick={() => this.Switch()}>◄</button>
                        <p id="DisSegundo">Crear clase</p>
                        <p id="DisPrimero">Unirse a una clase</p>
                        <button className="BotonFlechita" onClick={() => this.Switch()}>►</button>
                    </div>
                    <div className="PopUp2_ AparCom2" id="PopUp1Apar">
                        <div className="titleModal1Class DisCel">
                            <h2 className="titleModal1ClasH2">Unirse a una clase</h2>
                        </div>
                        <div className="ContainerPopUp2">
                            <div className="infoContainerModalClass">
                                <div className="infoContainerModalClass2">
                                    <p>Si quieres unirte a una clase debes ingresar la id de la clase y esperar que el creador acepte la petición de unirte o pedirle al creador que te una y debes aceptar la invitación a unirse.</p>
                                </div>
                            </div>
                            <div className="Group GroupC3">
                                <div>
                                    <div>
                                        <p className="Group">Id clase</p>
                                        <input type="text" className="inputCrearClase Group" id="UsuarioClase2" autoComplete="off" />
                                    </div>
                                </div>
                                <input type="button" className="inputCrearClase2" onClick={this.SubirUsuario2} />
                            </div>
                            <button className="BotonMadreClase bmargintop" onClick={this.Modal1}>Cancelar</button>
                        </div>
                    </div>
                    <div className="PopUp1_ AparCom" id="PopUp2Apar">
                        <div className="titleModal1Class titleModal1Class2 DisCel">
                            <h2 className="titleModal1ClasH2">Crear clase</h2>
                        </div>
                        <div id="PopUpPart1">
                            <div className="GroupC">
                                <p className="Group">Nombre</p>
                                <input type="text" id="NombreClase" className="Group inputCrearClase" autoComplete="off" />
                            </div>
                            <div className="GroupC">
                                <p className="Group">Usuario</p>
                                <div className="Group GroupC2">
                                    <input type="text" className="inputCrearClase" id="UsuarioClase" autoComplete="off" />
                                    <input type="button" className="inputCrearClase2_" onClick={this.SubirUsuario1} />
                                </div>
                            </div>
                        </div>
                        <div id="PopUpPart2">
                            <div id="UsuariosIN">
                            </div>
                        </div>
                        <div id="XimageCrearClase">
                            <button onClick={this.Modal1} className="BotonMadreClase">Cancelar</button>
                            <button onClick={this.CrearClase2} className="BotonMadreClase">Aceptar</button>
                        </div>
                    </div>
                </div>
            );
        }

    }
    /*MODAL2*/
    /*Metodo que determina si el modal 2 se pinta o no*/
    Modal2 = (prop) => {
        this.setState({
            Modal2: !this.state.Modal2,
            ModalClase: prop
        })
    }
    /*Metodo que retorna el modal 2*/
    Modal2Return = () => {
        if (this.state.Modal2) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres eliminar la clase?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.deleteClase() }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal2(0)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*MODAL3*/
    /*Metodo que determina si el modal 3 se pinta o no*/
    Modal3 = (prop, prop2) => {
        this.setState({
            Modal3: !this.state.Modal3,
            ModalClase: prop,
            Modalconusu: prop2
        })
    }
    /*Metodo que retorna el modal 3*/
    Modal3Return = () => {
        if (this.state.Modal3) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres salirte de la clase?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.Salirclase() }}>Si</button>
                                    <button className="button SubImg2" onClick={() => this.Modal3(0, 0)}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    CrearClase2 = () => {
        let Nombre = document.getElementById("NombreClase");
        let fecha = new Date();
        if (Nombre.value == "") {
            Nombre.style.color = "red";
            Nombre.value = "Valor no ingresado";
            setTimeout(function () {
                Nombre.value = "";
                Nombre.style.color = "black";
            }, 1000);
        } else {
            let leng = Clases.length;
            Clases.push({
                id: leng,
                idusuario: UsuarioI[0].id,
                fechaC: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1)),
                titulo: Nombre.value
            });
            for (let i = 0; i < SubirUsu.length; i++) {
                User_clase.push({
                    id: User_clase.length,
                    idusuario: SubirUsu[i],
                    idclase: leng,
                    fechaU: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1))
                });
            }
            this.setState({
                Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario),
            });
            document.getElementById("UsuariosIN").innerHTML = "";
            document.getElementById("NombreClase").value = "";
            document.getElementById("PopUp1").style.display = "none";
            if (document.getElementById("clasesP2").innerHTML == "<p>No hay clases creadas.</p>") {
                document.getElementById("clasesP2").innerHTML = "";
            }
        }
        return this;
    }
    SubirUsuario1 = () => {
        if (document.getElementById("UsuarioClase").value == "") {
            document.getElementById("UsuarioClase").style.color = "red"
            document.getElementById("UsuarioClase").value = "No ingresado"
            setTimeout(function () {
                document.getElementById("UsuarioClase").value = "";
                document.getElementById("UsuarioClase").style.color = "black";
            }, 1000);
        } else {
            let j = document.getElementById("UsuarioClase").value;
            let inner = document.getElementById("UsuariosIN").innerHTML;
            for (let k = 0; k < Usuarios.length; k++) {
                if (Usuarios[k].UserName == j) {
                    if (Usuarios[k].id == UsuarioI[0].id) {
                        document.getElementById("UsuarioClase").style.color = "red"
                        document.getElementById("UsuarioClase").value = "Eres tú"
                        setTimeout(function () {
                            document.getElementById("UsuarioClase").value = "";
                            document.getElementById("UsuarioClase").style.color = "black";
                        }, 1000);
                    } else {
                        inner = inner + '<div class="Etiqueta"><p>Usuario:' + j + '</p></div>';
                        document.getElementById("UsuariosIN").innerHTML = inner;
                        SubirUsu[i] = j;
                        document.getElementById("UsuarioClase").value = "";
                        console.log("Esto es SubirUsu" + SubirUsu[i]);
                        i++;
                    }
                } else {
                    document.getElementById("UsuarioClase").style.color = "red"
                    document.getElementById("UsuarioClase").value = "No existe"
                    setTimeout(function () {
                        document.getElementById("UsuarioClase").value = "";
                        document.getElementById("UsuarioClase").style.color = "black";
                    }, 1000);
                }
            }


        }
    }
    SubirUsuario2 = () => {
        let i = document.getElementById("UsuarioClase2");
        if (i.value != "") {
            let bool1 = false;
            for (let k = 0; k < Clases.length; k++) {
                if (Clases[k].id == i.value) {
                    bool1 = true;
                }
            }
            if (bool1 == true) {
                let fecha = new Date();
                User_clase.push({
                    id: User_clase.length,
                    idusuario: UsuarioI[0].id,
                    idclase: i.value,
                    fechaU: new Date(fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + (fecha.getDate() + 1))
                });
                this.setState({
                    Clase: Clases.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                    Usuario_C: User_clase.filter(Esito => UsuarioI[0].id == Esito.idusuario),
                });
                i.value = "";
                document.getElementById("PopUp2").style.display = "none";
            } else {
                i.style.color = "red";
                i.type = "text";
                i.value = "Clase no encontrada.";
                setTimeout(function () {
                    i.value = "";
                    i.style.color = "black";
                    i.type = "number";
                }, 1000);
            }
        } else {
            i.style.color = "red";
            i.type = "text";
            i.value = "Dato no ingresado.";
            setTimeout(function () {
                i.value = "";
                i.style.color = "black";
                i.type = "number";
            }, 1000);
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este get trae las clases creadas*/
    getClasesC = async () => {
        await axios.get(`http://localhost:3883/Cla/Get-Clases-Creadas/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ DataClase: res.data });
                this.filtrando();
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este get trae las clases inscritas*/
    getClasesI = async () => {
        await axios.get(`http://localhost:3883/UsuCla/get-usario_claseJOINclases-todo/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({
                    DataClaseI: res.data
                });
                this.filtrandoI();
            }).catch(err => {
                console.error(err);
            })
    }
    /*PUTS*/
    /*Este put permite actualizar la cantidad de usaurios de una clase*/
    putUsariosClase = async () =>{
        console.log("hola");
        axios.put(`http://localhost:3883/Cla/Put-Clases-cantidad_usuarios/Clases/${this.state.ModalClase}`)
            .then(res =>{

            }).catch(err =>{

            });
    }
    /*DELETES*/
    /*Elimina clases creadas*/
    deleteClase = async () => {
        axios.delete(`http://localhost:3883/Cla/Delete-Clases-todo/Clases/${this.state.ModalClase}`)
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })


        this.getClasesC();
        this.setState({
            Modal2: false
        });
    }
    /*Permite salirse de una clase en la que se participa*/
    Salirclase = async () => {
        axios.delete(`http://localhost:3883/UsuCla/Delete-Clases-todo/Clases/${this.state.ModalClase}&${UsuarioI[0].id_usuario}`)
            .then(res => {
            })
            .catch(err => {
                console.log(err);
            })
        this.putUsariosClase();
        this.getClasesI();
        this.setState({
            Modal3: false
        });
    }
    /*METODOS DE PAGINACIÓN Y FILTRADO de las clases creadas*/
    /*Este metodo realiza la paginación y el filtrado de las clases creadas*/
    filtrando = () => {
        let filtrado;
        let tamaño;
        let filtro = document.getElementById("filt").value;
        let tam = 3;
        if (filtro == "") {
            let x = Math.ceil(this.state.DataClase.length / tam);
            filtrado = this.state.DataClase.reverse();
            tamaño = x;

        } else {
            let arrays1 = this.state.DataClase.filter(Esito => ("" + Esito.cont_usuarios).toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || (new Date(Esito.fecha_c).toLocaleDateString()).includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
            let x = Math.ceil(arrays1.length / tam);
            filtrado = arrays1.reverse();
            tamaño = x;
        }

        let cont = 0;
        let arrays = [];
        for (let i = 0; i < tamaño; i++) {
            let array2 = [];
            for (let j = 0; j < tam && cont < filtrado.length; j++) {
                array2.push(filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        if (arrays[0]) {
            this.setState({
                DataClasef: filtrado,
                tamaño: tamaño,
                array: arrays,
                actual: arrays[this.state.posicion]
            });
        } else {
            this.setState({
                DataClasef: filtrado,
                tamaño: tamaño,
                array: arrays,
                actual: []
            });
        }
    }
    /*Determina renderizado de la flecha a la izquierda de las clases creadas*/
    flech = () => {
        if (this.state.despaginar == 0) {
            this.state.despaginar = 1;
        }
        if (this.state.despaginar == this.state.tamaño - 1) {
            this.state.despaginar = this.state.tamaño - 2;
        }
        if (this.state.despaginar != 1 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="◄" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar - 1
                    });
                }} />
            );
        }
    }
    /*Determina renderizado de la flecha a la derecha de las clases creados*/
    flech2 = () => {

        if (this.state.despaginar != this.state.tamaño - 2 && this.state.tamaño > 3) {
            return (
                <input className="botonescamb" type="button" value="►" onClick={() => {
                    this.setState({
                        despaginar: this.state.despaginar + 1
                    });
                }} />
            );
        }
    }
    /*Metodo que determina el final de la paginación de las clases creadas*/
    final = () => {
        if (this.state.posicion >= this.state.tamaño - 1) {
            return (<div><p>No hay mas clases para mostrar</p></div>);
        }
    }
    /*METODOS DE PAGINACIÓN Y FILTRADO de las clases inscritas*/
    /*Este metodo realiza la paginación y el filtrado de las clases inscritas*/
    filtrandoI = () => {
        let filtrado;
        let tamaño;
        let filtro = document.getElementById("filt").value;
        let tam = 3;
        if (filtro == "") {
            let x = Math.ceil(this.state.DataClaseI.length / tam);
            filtrado = this.state.DataClaseI.reverse();
            tamaño = x;
        } else {
            let arrays1 = this.state.DataClaseI.filter(Esito => ("" + Esito.cont_usuarios).toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.titulo.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || (new Date(Esito.fecha_c).toLocaleDateString()).includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()) || Esito.usuario.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize().includes(filtro.toLowerCase().normalize('NFD').replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, "$1$2").normalize()));
            let x = Math.ceil(arrays1.length / tam);
            filtrado = arrays1.reverse();
            tamaño = x;
        }

        let cont = 0;
        let arrays = [];
        for (let i = 0; i < tamaño; i++) {
            let array2 = [];
            for (let j = 0; j < tam && cont < filtrado.length; j++) {
                array2.push(filtrado[cont]);
                cont++;
            }
            arrays.push(array2);
        }
        if (arrays[0]) {
            this.setState({
                DataClaseIf: filtrado,
                tamañoI: tamaño,
                arrayI: arrays,
                actualI: arrays[this.state.posicionI]
            });
        } else {
            this.setState({
                DataClaseIf: filtrado,
                tamañoI: tamaño,
                arrayI: arrays,
                actualI: []
            });
        }
    }
    /*Determina renderizado de la flecha a la izquierda de las clases incritas*/
    flechI = () => {
        if (this.state.despaginarI == 0) {
            this.state.despaginarI = 1;
        }
        if (this.state.despaginarI == this.state.tamañoI - 1) {
            this.state.despaginarI = this.state.tamañoI - 2;
        }
        if (this.state.despaginarI != 1 && this.state.tamañoI > 3) {
            return (
                <input className="botonescamb" type="button" value="◄" onClick={() => {
                    this.setState({
                        despaginarI: this.state.despaginarI - 1
                    });
                }} />
            );
        }
    }
    /*Determina renderizado de la flecha a la derecha de las clases incritas*/
    flech2I = () => {

        if (this.state.despaginarI != this.state.tamañoI - 2 && this.state.tamañoI > 3) {
            return (
                <input className="botonescamb" type="button" value="►" onClick={() => {
                    this.setState({
                        despaginarI: this.state.despaginarI + 1
                    });
                }} />
            );
        }
    }
    /*Metodo que determina el final de la paginación de las clases inscritas*/
    finalI = () => {
        if (this.state.posicionI >= this.state.tamañoI - 1) {
            return (<div><p>No hay mas clases para mostrar</p></div>);
        }
    }

    render() {
        return (
            <>
                {this.Modal1Return()}
                {this.Modal2Return()}
                {this.Modal3Return()}
                <div className="contM5">
                    <div className="buscadorClases">
                        <div className="filtroClasesSearch">
                            <div className="filtroClasesSearch2">
                                <input type="text" id="filt" autoComplete="off" className="FiltrosC2 buscadorClases2" onChange={() => { this.filtrando(); this.filtrandoI() }} placeholder="buscar"></input>
                            </div>
                        </div>
                        <div className="BotonMore">
                            <img className="BotonMoreImage" src="/Images/Mas.png" onClick={() => this.Modal1()} />
                        </div>
                    </div>
                    <div className="franja">
                        <div id="infop">
                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases creadas ▼" id="ClasesC" onClick={this.Accion1} />
                            </div>
                            <div id="clasesP">

                                <div id="clasesP2">
                                    {this.state.actual?.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <div className="botoclassCreados">
                                                        <img className="botoneliminar" src="./images/Basura.png" onClick={() => this.Modal2(Esito.id_clase)} />
                                                        <Link to={{ pathname: "/Clase", state: { InfoClass: Esito } }}><input type="button" value="Ir" /></Link>
                                                    </div>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion: <br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte ">Usuarios: {Esito.cont_usuarios}</h4>
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                    </div>

                                                </div>
                                            </div>
                                        </>);
                                    })}
                                    {this.final()}
                                    <div id="Paginacion2">
                                        {this.flech()}
                                        {this.state.array?.map((Esito, index) => {
                                            try {
                                                const f = index;
                                                if (f != this.state.posicion && (this.state.despaginar == f || this.state.despaginar == f - 1 || this.state.despaginar == f + 1)) {
                                                    return (<><input key={index} className="botonescamb" type="button" value={f + 1} onClick={() => {
                                                        this.setState({
                                                            posicion: f,
                                                            despaginar: f,
                                                            actual: this.state.array[f]
                                                        });
                                                    }} /></>);

                                                } else if (this.state.despaginar == f || this.state.despaginar == f - 1 || this.state.despaginar == f + 1) {
                                                    return (<><input key={index} className="botonescamb2" type="button" value={f + 1} /></>);
                                                }
                                            } catch (err) { }
                                        })}
                                        {this.flech2()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="conclases">

                            <div className="ButtonMisCursosC">
                                <input type="button" value="Clases inscritas ▼" id="ClasesP" onClick={this.Accion2} />
                            </div>
                            <div id="contidU">
                                <div id="contidU2">
                                    {this.state.actualI.map((Esito, Index) => {
                                        return (<>
                                            <div className="cardsclas" key={Index}>
                                                <div className="titulo">
                                                    <h3 className="TitleCardClase">{Esito.titulo}</h3>
                                                    <div className="botoclassCreados">
                                                        <img className="botoneliminar" src="./images/Salir.png" onClick={() => this.Modal3(Esito.id_clase, Esito.cont_usuarios)} />
                                                        <Link to={{ pathname: "/Clase", state: { InfoClass: Esito } }}><input type="button" value="Ir" /></Link>
                                                    </div>
                                                </div>
                                                <div className="botoncard">
                                                    <h4 className="FechaCClase">Fecha de creacion:<br />
                                                        {new Date(Esito.fecha_c).toLocaleDateString()}
                                                    </h4>
                                                    <div className="InfoClassCard">
                                                        <h4 className="InfoClassCardConte ">Usuarios: {Esito.cont_usuarios}</h4>
                                                        <h4 className="InfoClassCardConte">Id: {Esito.id_clase}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </>);
                                    })}
                                    {this.finalI()}
                                    <div id="PaginacionI">
                                        {this.flechI()}
                                        {this.state.arrayI?.map((Esito, index) => {
                                            try {
                                                const f = index;
                                                if (f != this.state.posicionI && (this.state.despaginarI == f || this.state.despaginarI == f - 1 || this.state.despaginarI == f + 1)) {
                                                    return (<><input key={index} className="botonescamb" type="button" value={f + 1} onClick={() => {
                                                        this.setState({
                                                            posicionI: f,
                                                            despaginarI: f,
                                                            actualI: this.state.arrayI[f]
                                                        });
                                                    }} /></>);

                                                } else if (this.state.despaginarI == f || this.state.despaginarI == f - 1 || this.state.despaginarI == f + 1) {
                                                    return (<><input key={index} className="botonescamb2" type="button" value={f + 1} /></>);
                                                }
                                            } catch (err) { }
                                        })}
                                        {this.flech2I()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(Main5);
