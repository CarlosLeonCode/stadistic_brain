import React, { useState } from 'react'

// Components 
import SideContent from '../../components/sideContent'
import GameBoard from '../../components/gameBoard'
import { Layout } from 'antd';

// Logic game class 
import GameKernel from '../../assets/gameLogic'

// Data 
import Data from '../../assets/data.json'

// Variables 
const runners = ['Mario', 'Bird', 'Crash', 'Goomba']
const combinations  = Data.exercises.combination.cases

// Layout components 
const { Sider, Content } = Layout;

export default function Game(){

    // States
    const [ unknow_answer, setUnknow_answer ] = useState([
        { "name": "1", "img_path": "" },
        { "name": "2", "img_path": "" }
    ]);
    // Intentos 
    const [ attemps, setAttemps ] = useState(0)
    const [ points, setPoints ] = useState(0)
    const [ game, setGame ] = useState(false)

    const startGame = () => {
        setGame(new GameKernel(runners, combinations))
    }
    
    function evaluateRound(response) {
        try{
            console.log('----> evaluateRound')
            const res = game.validateRound(response)
            if(res){
                // update points and attemps 
                updateGameScores()

                if(res.game_won){
                    console.log('objeto destroyed')
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

    const updateGameScores = () => {
        setAttemps(game.attemps)
        setPoints(game.points)
    }

    console.log(game)

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
                <Content>
                    {
                        (game)
                        ? <GameBoard unknow={unknow_answer} startGame={startGame} gameStarted={true} evaluate={evaluateRound} />
                        : <GameBoard unknow={unknow_answer} startGame={startGame} gameStarted={false} />
                    }
                </Content>
                </Layout>
            </Layout>
        </>
    )
}