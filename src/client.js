import React from 'react'
import ReactDOM from 'react-dom'
var playerMovement = require('./PlayerMovement')


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameWidth: 800,
            gameHeight: 600,
            gameState: 'loading', //player move, monsters move, loading, combat player, combat monster, inventory management
            currentRoom: '', //RoomID####, ExitTop (bool), ExitBottom, ExitLeft, ExitRight
            roomCounter: 1,
            monsters: [], //[Room, 'x', 'y', HP]
            dungeonArray: [], //array for dungeon[[roomNumber, roomNumber, Null],[null, roomNumber, Null]]
            rooms: [], // [Room#, RoomArray]
            items: [], //[item######, "Potion", "x","y"]
            player: [100,0,[6,5],1,0,10], //HP, RoomNumber in, position in room X,Y, Level, XP, attack
            playerInventory: [], //[["itemname", qty]]
            roomArrayRender: [],
            fog: false
        }
        this.runGame = this.runGame.bind(this)
        this.generateRoom = this.generateRoom.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.generateMonster = this.generateMonster.bind(this)
        this.generateItem = this.generateItem.bind(this)
    }

    handleKeyPress(e) {
      var PlayerPositionX = this.state.player[2][0];
      var PlayerPositionY = this.state.player[2][1];
      var player = this.state.player;
      var roomToMoveIn =   this.state.roomArrayRender;
      var keyCode = e.keyCode;
      var move = playerMovement.playerMove(PlayerPositionX, PlayerPositionY, player, roomToMoveIn, keyCode)
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
    ];
    return room;
  }
  generateMonster(roomNumber){
    var monsterX = Math.floor(Math.random() * (10 - 3)) + 3;
    var monsterY = Math.floor(Math.random() * (8 - 3)) + 3;
    var monsterHP = Math.floor(Math.random() * (50 - 20)) + 20;
    return([roomNumber, monsterX, monsterY, monsterHP])
  }
  generateItem(roomNumber){
    var LootX = Math.floor(Math.random() * (10 - 3)) + 3;
    var LootY = Math.floor(Math.random() * (8 - 3)) + 3;
    var Loot = Math.floor(Math.random() * (5 - 1)) + 1;

      switch(Loot){
        case 1:
        Loot =  "HP";
        break;
        case 2:
        Loot =  "Att";
        break;
        case 3:
        Loot =  "Trap";
        break;
        case 4:
        Loot = "Nothing";
      }
      if (Loot === "Nothing"){
        return [-1,-1,"",roomNumber];
      } else {
    return([LootX, LootY, Loot, roomNumber])
  }
  }
    runGame() {

      let gr = this.generateRoom(0);
      let mr = this.generateMonster(0)
      let ite = this.generateItem(0)
      let tempMonsterArray = this.state.monsters
      tempMonsterArray.push(mr)
      let tempRoomArray = this.state.rooms;
      tempRoomArray.push([0, gr])
      let tempItemArray = this.state.items;
      tempItemArray.push(ite)
      this.setState({
        gameState: "startGame",
        roomArrayRender: gr,
        monsters: tempMonsterArray,
        rooms: tempRoomArray,
        items: tempItemArray
      })
    }


    componentWillMount() {

    }


    render() {
      var wdth = this.state.gameWidth;
      var hth = this.state.gameHeight;
      var PlayerPositionX = this.state.player[2][0];
      var PlayerPositionY = this.state.player[2][1];
      var monsters = this.state.monsters;
      var items = this.state.items;
      var currentRoom = this.state.player[1];
      var monsterX = 0;
      var monsterY = 0;
      var itemX = 0;
      var itemY = 0;
      var fog = this.state.fog;

      if (this.state.gameState === 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      }

      if (this.state.gameState === 'startGame') {
      //Figure out monster
      for(var i=0; i<items.length; i++){
        if(items[i][3] === currentRoom){
          itemX = items[i][0];
          itemY = items[i][1];
        }
      }
      for(var i=0; i<monsters.length; i++){
      if(monsters[i][0] === currentRoom && monsters[i][3] > 0){
        monsterX = monsters[i][1];
        monsterY = monsters[i][2];
      }
    }
      var toBeRendered = (<div className="GameScreen">{this.state.roomArrayRender.map(function(row, i){
        var tile = row.map(function(tile, j){
        if (j === PlayerPositionX && i === PlayerPositionY) {
        return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tileP"  }></div>)
      }


  //fog needs work
  if ((i >= PlayerPositionY+3||i <= PlayerPositionY-3||j >= PlayerPositionX+3 ||j <= PlayerPositionX-3)&&fog === true){
return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tile1"}></div>)
} else {
  if (j === monsterX && i === monsterY) {
  return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tileM"  }></div>)
}
if (j === itemX && i === itemY) {
return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tileI"  }></div>)
}
  return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tile" + tile}></div>)
}

      })
      return tile;
      })
    }
      </div>)
      }

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
