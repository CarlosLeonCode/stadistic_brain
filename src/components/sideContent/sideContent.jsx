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
                    <span>Intentos</span>: <span>{gameAttemps == 0 ? gameAttemps : gameAttemps - 1}</span>
                </div>

                <div className="detail-group">
                    <span>Puntos</span>: <span>{gamePoints}</span>
                </div>
            </section>

            <footer className="wrapper-footer">
                <p>Carlos Esteban León Pinilla</p>
                <p>CarlosLeonCode</p>
            </footer>
        </div>
    )
}