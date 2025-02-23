export class Score{
    point:number
    advantage: number
    penality: number
    constructor(point?:number,advantage?:number,penality?:number){
        this.point = point || 0
        this.advantage = advantage || 0
        this.penality = penality || 0
    }
}