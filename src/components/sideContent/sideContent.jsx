import React from 'react'

// scss 
import './sideContent.scss'

export default function SideContent(props){

    const { gamePoints, gameAttemps } = props

    return(
        <div className="wrapper-sideContent">
            {/* header */}
            <header>
                <h4 className="title">Detalles del juego</h4>
            </header>
            <section className="wrapper-details">
                {/* Attempts */}
                <div className="detail-group">
                    <span>Intentos</span>: <span>{gameAttemps}</span>
                </div>

                <div className="detail-group">
                    <span>Puntos</span>: <span>{gamePoints}</span>
                </div>

                <div style={{ marginTop: '5rem', padding: '0.5rem' }}>
                    <ul>
                        <li>
                            Frio es que ninguno de los elementos seleccionados se encuentra en el orden o no están en la respuesta.
                        </li>
                        <li>
                            Tibio significa que unicamente 2 de ellas se encuentra en la respuesta y en la misma posición.
                        </li>
                    </ul>
                </div>
            </section>

            <footer className="wrapper-footer">
                <p>Carlos Esteban León Pinilla</p>
                <p>CarlosLeonCode</p>
            </footer>
        </div>
    )
}