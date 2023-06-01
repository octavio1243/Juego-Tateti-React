import React from 'react';
import styles from './style.module.css';

class Tablero extends React.Component {

    constructor() {
        console.log("Constructor ejecutado");
        super();
        this.state = {
            tablero: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
            turno: 'x',
            puntajeX: 0,
            puntajeY: 0
        }
    }

    render() {
        return (
            <div className={styles.juego}>
                <h1>Juego del TaTeTi</h1>
                <div className={styles.puntajes}>
                    <div className={styles.jugador}>
                        <div className={styles.nombre}>Jugador X</div>
                        <div className={styles.puntos} id="puntajeX">{this.state.puntajeX}</div>
                    </div>
                    <div className={styles.jugador}>
                        <div className={styles.nombre}>Jugador O</div>
                        <div className={styles.puntos} id="puntajeO">{this.state.puntajeY}</div>
                    </div>
                </div>
                {this.estadoPartida()}

                <div className={styles.tablero} >
                    <div className={styles.casilla} onClick={() => this.setearCelda(0, 0, this.state.turno)}>{this.obtenerCelda(0, 0)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(0, 1, this.state.turno)}>{this.obtenerCelda(0, 1)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(0, 2, this.state.turno)}>{this.obtenerCelda(0, 2)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(1, 0, this.state.turno)}>{this.obtenerCelda(1, 0)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(1, 1, this.state.turno)}>{this.obtenerCelda(1, 1)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(1, 2, this.state.turno)}>{this.obtenerCelda(1, 2)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(2, 0, this.state.turno)}>{this.obtenerCelda(2, 0)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(2, 1, this.state.turno)}>{this.obtenerCelda(2, 1)}</div>
                    <div className={styles.casilla} onClick={() => this.setearCelda(2, 2, this.state.turno)}>{this.obtenerCelda(2, 2)}</div>
                </div>
                <button className={styles.reiniciar} onClick={() => this.reiniciarTablero()}>Reiniciar</button>

            </div>);
    }

    estadoPartida() {
        if (this.chequearGanador(0)) {
            return (
                <div className={styles.turno}>
                    <span>El ganador es </span>
                    <div className={`${styles.circulo} ${this.state.turno === 'x'? styles.azul:styles.rojo}`}>
                        <span>{this.state.turno}</span>
                    </div>
                </div>);
        }
        return (
        <div className={styles.turno}>
            <span>Turno de </span>
            <div className={`${styles.circulo} ${this.state.turno === 'x'? styles.azul:styles.rojo}`}>
                <span>{this.state.turno}</span>
            </div>
        </div>);
    }

    reiniciarTablero() {
        this.setState( {
            tablero: [[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']],
            turno: 'x'
        });
    }

    obtenerCelda(x, y) {
        return this.state.tablero[x][y];
    }

    setearCelda(x, y, ficha) {
        let tableroAux = [...this.state.tablero];
        if (!this.chequearGanador(0) && this.obtenerCeldasFicha(' ')[x][y]) { //Si la celda está vacia se puede continuar
            console.log("Esta vacio (" + x + "," + y + ") | Seteando " + ficha);
            tableroAux[x][y] = ficha;
            this.setState({ tablero: tableroAux });
            if (this.chequearGanador(1)) {
                console.log("Hay un ganador");
            }
            else {
                this.cambiarTurno();
            }

        }

    }

    obtenerCeldasFicha(ficha) {
        let tableroAux = [...this.state.tablero];
        return tableroAux.map((fila, indiceFila) => {
            return fila.map((celda, indiceColumna) => {
                if (celda === ficha) {
                    return 1;
                }
                return 0;
            });
        });
    }

    cambiarTurno() {
        console.log("Cambiando de turno");
        if (this.state.turno === 'x') {
            this.setState({ turno: 'o' });
        }
        else {
            this.setState({ turno: 'x' });
        }

    }

    chequearGanador(cuenta) {
        let resultado = [this.obtenerCeldasFicha('x'), this.obtenerCeldasFicha('o')].map(
            (tableroFicha, indiceTablero) => {
                for (let i = 0; i < 3; i++) {
                    if (tableroFicha[i][0] && tableroFicha[i][1] && tableroFicha[i][2]) { // Chequear filas
                        return 1;
                    }
                    if (tableroFicha[0][i] && tableroFicha[1][i] && tableroFicha[2][i]) { //Chequear columnas
                        return 1;
                    }
                }
                if (tableroFicha[0][0] && tableroFicha[1][1] && tableroFicha[2][2]) { //Chequear diagonal descendiente
                    return 1;
                }
                if (tableroFicha[2][0] && tableroFicha[1][1] && tableroFicha[0][2]) { //Chequear diagonal ascendente
                    return 1;
                }
                return 0;
            }
        );
        if (resultado[0] === 1) {
            if (cuenta) {
                this.setState(prevState => ({
                    puntajeX: prevState.puntajeX + 1
                }));
            }
            return 'x';
        }
        if (resultado[1] === 1) {
            if (cuenta) {
                this.setState(prevState => ({
                    puntajeY: prevState.puntajeY + 1
                }));
            }
            return 'o';
        }
        return 0;
    }

}

export default Tablero;