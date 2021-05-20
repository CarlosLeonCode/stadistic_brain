export default class gameLogic{
    
    constructor(runners, combinations){
        this.attemps = 1;
        this.points = 0;
        this.minAnswerRange = 1;
        this.maxAnswerRange = 6;
        this.runners = runners;
        this.combinations = combinations;
        // game manage points
        this.increasePointsBy = 15

        let answerIndex = Math.floor(Math.random() * this.maxAnswerRange) + this.minAnswerRange;
        // Save answer to win game
        this.answer = this.combinations[answerIndex];

    }

    validateRound(response){
        // flags 
        let first_position = false
        let second_position = false 
        let game_won = false
        
        // Validate first position 
        if(this.answer[0] === response[0]){
            first_position = true
        }

        if(this.answer[1] === response[1]){
            second_position = true
        }

        // Set game won value 
        if(first_position && second_position){
            game_won = true
        }

        // Change points according evaluation 
        if(game_won){
            this.points = 100 + this.points
        }else{
            if(first_position || second_position){
                this.points = this.points + this.increasePointsBy
            }
            // --
            this.increaseAttemps()
        }
// ! -------- Temporal
        console.log(`answer ${response}`)
        console.log(`real ${this.answer}`)

        // Build response 
        response = {
            first_pos: first_position,
            second_pos: second_position,
            game_won: game_won
        }
        // --
        return response
    }
    
    increaseAttemps(){
        this.attemps += 1;
    }
}