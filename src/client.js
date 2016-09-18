import React from 'react'
import ReactDOM from 'react-dom'




class GameBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gameLength: '', //Super Short, Short, Fun, Liking it, I have no life -- Seriously
            gameChallange: '', //easy, less easy, Meh, Whoa, What?, That's cheap!
            gameState: 'loading', //player move, monsters move, loading, combat player, combat monster, inventory management
            currentRoom: '', //####
            roomCounter: 1,
            monsters: [], //['monster#####', 'monsterName', 'type', 'level','x', 'y']
            dungeonArray: [], //array for dungeon[[roomNumber, roomNumber, Null],[null, roomNumber, Null]]
            dungeonRoomArrayItems: [], //[{roomNumber: 1, monsters: [1,2,3], items: [1]}]
            items: [], //[item######, "Potion", "x","y"]
            player: [], //HP, RoomNumber in, position in room, steps
            playerInventory: [] //[["itemname", qty]]
        }
/*
        this.randomBoard = this.randomBoard.bind(this);

        this.clearGame = this.clearGame.bind(this)
        this.toggleCell = this.toggleCell.bind(this)
        */
        this.runGame = this.runGame.bind(this)
    }
    randomBoard() {

    }

    runGame() {
      console.log("click start game")
      this.setState({
        gameState: "startGame"
      })
    }


    componentWillMount() {


    }

    render() {
      if (this.state.gameState = 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      }
/*
      if (this.state.gameState = 'gameStart') {
      let newRoomGeneration = generateRoom();
      generateItem(newRoomGeneration);
      generateMonsters(newRoomGeneration);
      }
      */
        return (<div className="board">
        {toBeRendered}
        </div>
        )
    }
}


ReactDOM.render( <
    GameBoard / > ,
    document.getElementById('game')
);
