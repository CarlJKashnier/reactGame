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
      var PlayerPostitionY = this.state.player[2][1];
                //up 38
            if (e.keyCode === 38) {
                if (this.state.roomArrayRender[PlayerPostitionY - 1][PlayerPositionX] !== 3 && this.state.roomArrayRender[PlayerPostitionY - 1][PlayerPositionX] !== 1) {
                    let tempArrForMove = this.state.player;
                    tempArrForMove.splice(2, 1, [PlayerPositionX, PlayerPostitionY - 1])
                    this.setState({
                        player: tempArrForMove
                    })

                }
            }
      //down 40
      if (e.keyCode === 40) {
          if (this.state.roomArrayRender[PlayerPostitionY + 1][PlayerPositionX] !== 3 && this.state.roomArrayRender[PlayerPostitionY + 1][PlayerPositionX] !== 1) {
              let tempArrForMove = this.state.player;
              tempArrForMove.splice(2, 1, [PlayerPositionX, PlayerPostitionY + 1])
              this.setState({
                  player: tempArrForMove
              })

          }
      }
      //left 37
      if (e.keyCode === 37) {
          if (this.state.roomArrayRender[PlayerPostitionY ][PlayerPositionX -1] !== 3 && this.state.roomArrayRender[PlayerPostitionY][PlayerPositionX-1] !== 1 && PlayerPositionX-1 > -1) {
              let tempArrForMove = this.state.player;
              tempArrForMove.splice(2, 1, [PlayerPositionX - 1, PlayerPostitionY])
              this.setState({
                  player: tempArrForMove
              })

          }
      }
      //right 39
      if (e.keyCode === 39) {
          if (this.state.roomArrayRender[PlayerPostitionY ][PlayerPositionX +1] !== 3 && this.state.roomArrayRender[PlayerPostitionY][PlayerPositionX+1] !== 1 && this.state.roomArrayRender[PlayerPostitionY].length > PlayerPositionX+1 ) {
              let tempArrForMove = this.state.player;
              tempArrForMove.splice(2, 1, [PlayerPositionX + 1, PlayerPostitionY])
              this.setState({
                  player: tempArrForMove
              })

          }
      }
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
      var PlayerPostitionY = this.state.player[2][1]
      //This needs to be in module
      if (this.state.gameState === 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      }
      //This needs to be in module
      if (this.state.gameState === 'startGame') {

      var toBeRendered = (<div className="GameScreen">{this.state.roomArrayRender.map(function(row, i){
        var tile = row.map(function(tile, j){
        if (j !== PlayerPositionX || i !== PlayerPostitionY) {
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
