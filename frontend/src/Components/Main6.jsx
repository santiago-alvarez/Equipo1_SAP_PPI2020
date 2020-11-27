import React from 'react';
import '../Styles/Main6.css';
import axios from 'axios';
import { UsuarioI } from '../Utiles/Mocks/UsuarioI';
import { Link, Redirect } from 'react-router-dom';

let bool = true, bool2 = true;
let newDate;
class Main6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataProgresos: [],
            DataCursosC: [],
            boolRedirec: false,
            idCursoCreado: 0,
            Modal1: {
                return: false,
                title: "",
                id: 0
            }
        }
    }

    async componentDidMount() {
        await this.getCursosI();
        await this.getCursosC();

        /*Cursos Iniciados*/
        if (this.state.DataProgresos.length > 5) {
            document.getElementById("Main6I").style.overflowY = "scroll";
        }
        if (this.state.DataProgresos.length == 0) {
            document.getElementById("CardsInner").style.display = "flex";
            document.getElementById("CardsInner").style.justifyContent = "center";
            document.getElementById("CardsInner").style.alignItems = "center";
            document.getElementById("CardsInner").innerHTML = "<p>No has iniciado ningún curso.</p>";
        }
        /*Cursos Creados*/
        if (this.state.DataCursosC.length >= 2) {
            document.getElementById("Main6C").style.overflowY = "scroll";
        }
        if (this.state.DataCursosC.length == 0) {
            document.getElementById("CardsInner2").style.display = "flex";
            document.getElementById("CardsInner2").style.justifyContent = "center";
            document.getElementById("CardsInner2").style.alignItems = "center";
            document.getElementById("CardsInner2").innerHTML = "<p>No has creado ningún curso.</p>";
        }
    }
    /*METODOS SIMPLES*/
    /*Este metodo muestra o no los cursos iniciados*/
    Accion1 = () => {
        if (!bool) {
            document.getElementById("CardsInner").style.display = "block";
            document.getElementById("CursosI").innerHTML = "Cursos iniciado ▼";
            if (this.state.DataProgresos.length == 0) {
                document.getElementById("CardsInner").style.display = "flex";
                document.getElementById("CardsInner").style.justifyContent = "center";
                document.getElementById("CardsInner").style.alignItems = "center";
                document.getElementById("CardsInner").innerHTML = "<p>No has iniciado ningún curso.</p>";
            }
            bool = true
        } else {
            document.getElementById("CursosI").innerHTML = "Cursos iniciado ►"
            document.getElementById("CardsInner").style.display = "none";
            bool = false
        }
    }
    /*Este metodo muestra o no los cursos creados*/
    Accion2 = () => {
        if (!bool2) {
            document.getElementById("CardsInner2").style.display = "block";
            document.getElementById("CursosC").innerHTML = "Mis cursos ▼";
            if (this.state.DataCursosC.length == 0) {
                document.getElementById("CardsInner2").style.display = "flex";
                document.getElementById("CardsInner2").style.justifyContent = "center";
                document.getElementById("CardsInner2").style.alignItems = "center";
                document.getElementById("CardsInner2").innerHTML = "<p>No creado ningún curso.</p>";
            }
            bool2 = true
        } else {
            document.getElementById("CardsInner2").style.display = "none";
            document.getElementById("CursosC").innerHTML = "Mis cursos ►";
            bool2 = false
        }
    }
    /*MODAL1*/
    /*Esta función activa o desactiva el modal1*/
    Modal1 = (prop, prop2) => {
        this.setState({ Modal1: {
            return: !this.state.Modal1.return,
            title: prop,
            id:prop2  }})
    }
    /*Esta función returna o no el Modal1*/
    Modal1Return = () => {
        if (this.state.Modal1.return) {
            return (
                <>
                    <div id="PopUpPerfíl">
                        <div id="ContenedorPopUp2">
                            <div className="TitleModal1Perfíl3">
                                <h2>¿Estas seguro de que quieres eliminar el curso {this.state.Modal1.title}?</h2>
                            </div>
                            <div className="MainModal2Perfíl">
                                <div className="BotonesCont">
                                    <button className="button SubImg2" onClick={() => { this.deleteCursoC(this.state.Modal1.id); this.setState({Modal1:{return: !this.state.Modal1.return, title: "", id: 0}}); }}>Si</button>
                                    <button className="button SubImg2" onClick={()=> this.Modal1("")}>No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        }
    }
    /*AXIOS*/
    /*GETS*/
    /*Este metodo trae todos los cursos iniciados*/
    getCursosI = async () => {
        await axios.get(`http://localhost:3883/UsuCur/traer-cursosIniciados/misCursos/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ DataProgresos: res.data });
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este metodo trae todos los cursos creados*/
    getCursosC = async () => {
        await axios.get(`http://localhost:3883/Cur/get_cursos_Mis_cursos/Creados/${UsuarioI[0].id_usuario}`)
            .then(res => {
                this.setState({ DataCursosC: res.data })
            }).catch(err => {
                console.error(err);
            })
    }
    /*Este metodo trae el id de un curso a la hora de crearlo*/
    getCrearCurso = async () => {
         axios.get(`http://localhost:3883/Cur/get_cursos_id/misCursos_Clase_CreateCurso/${UsuarioI[0].id_usuario}&${newDate}`)
            .then(res => {
                this.setState({
                    idCursoCreado: res.data[0].id,
                    boolRedirec: !this.state.boolRedirec
                })
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
    }
    /*POST*/
    /*Este metodo crea un curso nuevo*/
    postNewCurso = async () => {
        let Fecha = new Date();
        let FechaY = Fecha.getFullYear();
        let FechaM = (Fecha.getMonth().toString()).padStart(2, 0);
        let FechaD = (Fecha.getDate().toString()).padStart(2, 0);
        let FechaH = FechaY + "-" + FechaM + "-" + FechaD + " ";
        let Horas = "" + (Fecha.getHours().toString()).padStart(2,0);
        let minutos = "" + (Fecha.getMinutes().toString()).padStart(2,0);
        let seconds = "" + (Fecha.getSeconds().toString()).padStart(2,0);
        newDate = FechaH + Horas + ":" + minutos + ":" + seconds;
        let form = {
            id_creador: UsuarioI[0].id_usuario,
            id_clase: null,
            fecha_c: newDate,
            logo: "/Images/Cursos/Default.png"
        }
        axios.post(`http://localhost:3883/Cur/post_cursos_informacion/misCursos/`, form)
            .catch(err => {
                if (err) {
                    console.error(err);
                }
            });
    }
    /*DELETES*/
    /*Este delete elimina un curso creado*/
    deleteCursoC = async (id) => {
         axios.delete(`http://localhost:3883/Cur/delete-curso-informacion/paginas/${id}&${UsuarioI[0].id_usuario}`)
            .then(res => {
            }).catch(err => {
                if (err) {
                    console.error(err);
                }
            })
            this.getCursosC();
    }
    render() {
        return (
            <>
                {this.Modal1Return()}
                <div id="Main6Container">
                    <div id="Main6I">
                        <div className="ButtonMisCursosC">
                            <button className="button buttonMisCursos CIMB" id="CursosI" onClick={this.Accion1}>Cursos iniciado ▼</button>
                        </div>
                        <div id="CardsInner">
                            {this.state.DataProgresos.map((Esito, index) => {
                                return (
                                    <>
                                        <div key={index} className="CardCIMisC">
                                            <div className="marignC2">
                                                <h3 className="marignO">{Esito.titulo}</h3>
                                                <p className="marignO">{Esito.categoria}</p>
                                            </div>
                                            <Link className="ReanudarC" to={{
                                                pathname: "/Curso",
                                                state: {
                                                    id: Esito.id_curso,
                                                    pagina: '/misCursos'
                                                }
                                            }}>
                                                <div className="Reanudar"></div>
                                            </Link>
                                        </div>
                                    </>
                                );
                            })}

                        </div>
                    </div>
                    <div id="Main6C">
                        <div className="ButtonMisCursosC">
                            <div className="ButtonMisCursosC">
                                <button className="button buttonMisCursos" onClick={() => { this.postNewCurso(); this.getCrearCurso() }}>Crear curso</button>
                            </div>
                            <button className="button buttonMisCursos" id="CursosC" onClick={this.Accion2}>Mis cursos ▼</button>
                        </div>
                        <div id="CardsInner2">
                            {this.state.DataCursosC.map((Esito, index) => {
                                return (
                                    <div id="MaxContC" key={index}>
                                        <div className="InfoContMinI2">
                                            <h3 className="TitleC TitlesI">{Esito.titulo}</h3>
                                        </div>
                                        <div className="CursoIC">
                                            <img className="ImgCI" src={Esito.logo} />
                                            <div className="CursoIC2">
                                                <div className="InfoContMini">
                                                    <h5 className="TitlesI">Tematica: <br /> {Esito.tematica}</h5>
                                                    <h5 className="TitlesI">Materia: <br /> {Esito.materia}</h5>
                                                </div>
                                                <div id="BottonCI">
                                                    <img className="Edit2" onClick={() => {this.Modal1(Esito.titulo, Esito.id) }} src="/Images/Basura.png" />
                                                    <Link to={{
                                                        pathname: "/crearCurso",
                                                        state: {
                                                            idCursoC: Esito.id,
                                                            location: "/misCursos"
                                                        }
                                                    }}>
                                                        <button className="button buttonI">Editar curso</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    {this.state.boolRedirec && <Redirect to={{ pathname: "/CrearCurso", state: { location: "/misCursos", idCursoC: this.state.idCursoCreado } }} />}
                </div>
            </>
        );
    }
}

export default Main6;