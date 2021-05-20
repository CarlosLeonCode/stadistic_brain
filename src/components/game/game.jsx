import React, { useState } from 'react'

// Components 
import SideContent from '../../components/sideContent'
import GameBoard from '../../components/gameBoard'
import { Layout, Modal, Button } from 'antd';
import swal from 'sweetalert';

// Logic game class 
import GameKernel from '../../assets/gameLogic'

// Data 
import Data from '../../assets/data.json'

// styles 
import './game.scss';

// Variables 
const runners = ['Mario', 'Bird', 'Crash', 'Goomba']
const combinations  = Data.exercises.combination.cases

// Layout components 
const { Sider, Content } = Layout;


export default function Game(){

    // node 
    const caratule = document.getElementById('caratule');

    // States
    const [ showModal, setShowModal ] = useState(false)

    // Intentos 
    const [ attemps, setAttemps ] = useState(0)
    const [ points, setPoints ] = useState(0)
    const [ game, setGame ] = useState(false)

    const startGame = () => {
        // Close modal 
        setShowModal(false)
        // Start game 
        setGame(new GameKernel(runners, combinations));
        // --
        caratule.classList.add('collapse')
    }
    
    function evaluateRound(response) {
        try{
            console.log('----> evaluateRound')
            const res = game.validateRound(response)
            if(res){
                // update points and attemps 
                updateGameScores()
                // -- 
                if(res.game_won){
                    swal("Super!", "Encontraste la combinación!", "success");
                    setGame(false)
                    caratule.classList.remove('collapse')
                }
                // response 
                return res
            }else{
                console.error('Validation does not exist!')
            }
        }catch(err){
            console.error(`Error evaluating user answer.`, err)
        }
    }

    function updateGameScores() {
        setAttemps(game.attemps)
        setPoints(game.points)
    }

    return(
        <>
            <Layout>
                <Sider 
                width={300}
                breakpoint="md"
                collapsedWidth={200}
                className="side-app"
                >
                    <SideContent gamePoints={points} gameAttemps={attemps} />
                </Sider>
                <Layout>
                <Content className="wrapper_content_game">
                    <div className="wrapper-game" id="caratule"></div>
                    {
                        (game)
                        ? <GameBoard startGame={startGame} gameStarted={true} evaluate={evaluateRound} showModal={setShowModal} />
                        : <GameBoard startGame={startGame} gameStarted={false} showModal={setShowModal} />
                    }
                </Content>
                <Button onClick={() => setShowModal(true)} className="startGameBtn">
                        Empezar juego
                    </Button>
                </Layout>

                <Modal title="Indicaciones" visible={showModal} onOk={() => startGame()} onCancel={() => setShowModal(false)}>
                    <p>{ Data.exercises.combination.long_statement }</p>
                </Modal>
            </Layout>
        </>
    )
}