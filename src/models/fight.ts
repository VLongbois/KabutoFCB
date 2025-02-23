import { Fighter } from "./fighter"
import { Score } from "./score"


export class Fight{
    fighter1: Fighter
    scoreFighter1: Score
    fighter2: Fighter
    scoreFighter2:Score
    timer: number
    constructor(fighter1: Fighter,fighter2:Fighter,timer?:number,scoreFighter1?:Score,scoreFighter2?:Score){
        this.fighter1 = fighter1
        this.fighter2 = fighter2
        this.timer = timer || 60
        this.scoreFighter1 = scoreFighter1 || new Score()
        this.scoreFighter2 = scoreFighter2 || new Score()
    }
}
