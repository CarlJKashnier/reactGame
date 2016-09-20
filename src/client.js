import React from 'react'
import ReactDOM from 'react-dom'




class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameWidth: 800,
            gameHeight: 600,
            gameLength: '', //Super Short, Short, Fun, Liking it, I have no life -- Seriously
            gameChallange: '', //easy, less easy, Meh, Whoa, What?, That's cheap!
            gameState: 'loading', //player move, monsters move, loading, combat player, combat monster, inventory management
            currentRoom: '', //####
            roomCounter: 1,
            monsters: [], //['monster#####', 'monsterName', 'type', 'level','x', 'y']
            dungeonArray: [], //array for dungeon[[roomNumber, roomNumber, Null],[null, roomNumber, Null]]
            dungeonRoomArrayItems: [], //[{roomNumber: 1, monsters: [1,2,3], items: [1]}]
            items: [], //[item######, "Potion", "x","y"]
            player: [], //HP, RoomNumber in, position in room, steps, position on map
            playerInventory: [], //[["itemname", qty]]
            roomArrayRender: []
        }
/*
        this.randomBoard = this.randomBoard.bind(this);

        this.clearGame = this.clearGame.bind(this)
        this.toggleCell = this.toggleCell.bind(this)
        */
        this.runGame = this.runGame.bind(this)
        this.generateRoom = this.generateRoom.bind(this)
    }
    generateRoom(){
      //0, nothing, walkable
      //1, room wall not walkable
      //2, door, walkable
      //3, Obsticle, not walkable
      //x 13
      //y 11
      var room = [
        [1,1,1,1,1,1,2,1,1,1,1,1,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [2,0,0,0,0,0,0,0,0,0,0,0,2],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,0,0,0,0,0,0,0,0,0,0,0,1],
        [1,1,1,1,1,1,2,1,1,1,1,1,1]
    ]
    //add walkable array for array
    console.log("in generateRoom")
    return room;
  }

    runGame() {
      console.log("click start game")
      let gr = this.generateRoom();
      this.setState({
        gameState: "startGame",
        roomArrayRender: gr
      })
    }


    componentWillMount() {

    }


    render() {
      var wdth = this.state.gameWidth;
      var hth = this.state.gameHeight
      if (this.state.gameState === 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      }
      if (this.state.gameState === 'startGame') {
        console.log('in startgame')
      var toBeRendered = (<div className="GameScreen">{this.state.roomArrayRender.map(function(row, i){
        var tile = row.map(function(tile, j){
        return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tile" + tile}></div>)
      })
      return tile;
      })
    }
      </div>)
      console.log(toBeRendered)
      }

/*
      if (this.state.gameState = 'gameStart') {
      let newRoomGeneration = generateRoom();
      generateItem(newRoomGeneration);
      generateMonsters(newRoomGeneration);
      }
      */
      console.log(toBeRendered)
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
