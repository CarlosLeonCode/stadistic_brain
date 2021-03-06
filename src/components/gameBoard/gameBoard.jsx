import React, { useState, useEffect } from 'react'
// components
import { Card, Image, Row, Col, Divider, Tooltip, Button } from 'antd';
// icons 
import { QuestionCircleOutlined } from '@ant-design/icons'
// Data 
import Data from '../../assets/data.json'
// scss 
import './gameBoard.scss'

// Get data from json 
const runners = Data.runners

export default function GameBoard(props){

    const { gameStarted, evaluate, showModal } = props

    // states 
    const [ roundAnswer, setRoundAnswer ] = useState([])
    const [ attempsHistory, setAttempsHistory ] = useState([])
    
    // Add characters to the answer, when image is clicked
    const addRunnerToAnswer = (e) => {
        const nodeTypeSelected = e.target.tagName

        // Only when image was selected 
        if(nodeTypeSelected === 'IMG'){
            // get character's name selected
            const runnerName = e.target.parentNode.id.split('_')[1]
            // Validate elements on answer
            if(roundAnswer.length < 2){
                // Keep runner zoom in 
                e.target.parentNode.classList.add('selected')


                // Add character to the answer 
                setRoundAnswer([
                    ...roundAnswer,
                    `${runnerName}`
                ])
            }
        }
    }
    
    // Clear states and add history for a new round 
    const starNewRound = (data) => {
        setRoundAnswer([])
        addAttemp(data.first_pos, data.second_pos)
        // --
        const imgs = document.querySelectorAll('.wrapper-chars-select .ant-image')
        // --
        imgs.forEach(node => {
            node.classList.remove('selected')
        })

    }

    // Add attemp history 
    const addAttemp = (first_char, second_char) => {
        if(first_char || second_char){
            setAttempsHistory([
                ...attempsHistory,
                'Tibio'
            ])
        }else{
            setAttempsHistory([
                ...attempsHistory,
                'Frio'
            ]) 
        }
    }
    
    useEffect(() => {
        try{
            if(gameStarted){
                // If already have two answers, then validate them 
                if(roundAnswer.length === 2){
                    const response = evaluate(roundAnswer)
                    // Validating
                    if(!response.game_won){
                        // new Round
                        starNewRound(response)
                    }
                }
            }
        }catch(err){
            console.error('Error validationg answer!',err)
        }
    },[roundAnswer, attempsHistory])

    return(
        <>
            {/* Top Card. characters  */}
            <div>
                <Card
                    style={{ marginTop: 10, textAlign: 'center' }}
                    type="inner"
                    title="PERSONAJES"
                >
                {
                    runners.map(character => (
                        <Image
                            width={80}
                            style={{ borderRadius: '8px', padding: '0.5rem' }}
                            src={character.img_path}
                            key={ character.name }
                        />
                    ))
                }
                </Card>
            </div>
            <Divider orientation="left" />
            <Row >
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 15 }} lg={{ span: 15 }}>
                    <Card style={{ height: '15rem'}}>
                        <Row>
                            <Col span={24}>
                                {/* Icono de pregunta */}
                                <Tooltip placement="top" title={Data.exercises.combination.statement}>
                                    <Button>
                                        <QuestionCircleOutlined />
                                    </Button>
                                </Tooltip>
                            </Col>
                            <Col span={24} >
                                <Row>
                                    <Col sm={{ span: 24 }} md={{ span: 15 }}>
                                        <div className="wrapper-unknows">
                                            <Image
                                                width={80}
                                                style={{ borderRadius: '8px', padding: '0.5rem' }}
                                                src={'https://image.flaticon.com/icons/png/512/189/189665.png'}
                                                preview={false}
                                                className="unkow_image unknow"
                                            />
                                            <Image
                                                width={80}
                                                style={{ borderRadius: '8px', padding: '0.5rem' }}
                                                src={'https://image.flaticon.com/icons/png/512/189/189665.png'}
                                                preview={false}
                                                className="unkow_image unknow"
                                            />
                                        </div>

                                    </Col>
                                    <Col sm={{ span: 24 }} md={{ span: 9 }} >
                                        <div className="answerDetailsWrapper">
                                            {
                                                attempsHistory.map((info, index) => (
                                                    <p key={index}> Intento: {index + 1} | {info} </p>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 9 }} lg={{ span: 9 }} className="container-selects-group">
                    <Card style={{ height: '15rem'}}>
                        <div className="wrapper-chars-select">
                            {
                                runners.map(character => (
                                    <Image
                                        width={80}
                                        style={{ borderRadius: '8px', padding: '0.5rem' }}
                                        src={character.img_path}
                                        key={ character.name }
                                        preview={false}
                                        className="select-character-img"
                                        id={`select_${character.name}`}
                                        onClick={(e) => addRunnerToAnswer(e)}
                                    />
                                ))
                            }
                        </div>
                    </Card>
                </Col>

                <Divider orientation="left" />
            </Row>

        </>
    )
}