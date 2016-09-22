import React from 'react'
import ReactDOM from 'react-dom'
var playerMovement = require('./PlayerMovement')





class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameWidth: 800,
            gameHeight: 600,
            gameLength: '', //Super Short, Short, Fun, Liking it, I have no life -- Seriously
            gameChallange: '', //easy, less easy, Meh, Whoa, What?, That's cheap!
            gameState: 'loading', //player move, monsters move, loading, combat player, combat monster, inventory management
            currentRoom: '', //RoomID####, ExitTop (bool), ExitBottom, ExitLeft, ExitRight
            roomCounter: 1,
            monsters: [], //['monster#####', 'monsterName', 'type', 'level','x', 'y', RoomID]
            dungeonArray: [], //array for dungeon[[roomNumber, roomNumber, Null],[null, roomNumber, Null]]
            items: [], //[item######, "Potion", "x","y"]
            player: [100,0,[6,5]], //HP, RoomNumber in, position in room X,Y, steps, position on map
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
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleKeyPress(e) {
      var PlayerPositionX = this.state.player[2][0];
      var PlayerPositionY = this.state.player[2][1];
      var player = this.state.player;
      var roomToMoveIn =   this.state.roomArrayRender;
      var keyCode = e.keyCode;
      var move = playerMovement.playerMove(PlayerPositionX, PlayerPositionY, player, roomToMoveIn, keyCode)        //up 38
      this.setState({
          player: move
      })
    }

    componentDidMount() {
      document.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
      document.removeEventListener('keydown', this.handleKeyPress);
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

    return room;
  }

    runGame() {

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
      var hth = this.state.gameHeight;
      var PlayerPositionX = this.state.player[2][0]
      var PlayerPositionY = this.state.player[2][1]
      //var roomToRender = this.state.roomArrayRender
      //var monstersToRender = this.state.
      //This needs to be in module
      if (this.state.gameState === 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      }
      //This needs to be in module
      if (this.state.gameState === 'startGame') {

      var toBeRendered = (<div className="GameScreen">{this.state.roomArrayRender.map(function(row, i){
        var tile = row.map(function(tile, j){
        if (j !== PlayerPositionX || i !== PlayerPositionY) {
        return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tile" + tile}></div>)
      } else {
return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tileP"  }></div>)
      }
      })
      return tile;
      })
    }
      </div>)
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
