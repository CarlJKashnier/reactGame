import React from 'react'
import ReactDOM from 'react-dom'
import playerMovement from './PlayerMovement'
import movingRooms from './MovingRooms'


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameWidth: 800,
            gameHeight: 600,
            gameState: 'loading', //player move, monsters move, loading, combat player, combat monster, inventory management
            currentRoom: '', //RoomID####, ExitTop to room #, ExitBottom, ExitLeft, ExitRight
            roomCounter: 1,
            monsters: [], //[Room, 'x', 'y', HP]
            boss: [],
            dungeonArray: [], //array for dungeon[[roomNumber, roomNumber, Null],[null, roomNumber, Null]]
            rooms: [], // [Room#, RoomArray]
            items: [], //[item######, "Potion", "x","y"]
            player: [100,1,[6,5],1,0,10], //HP, RoomNumber in, position in room X,Y, Level, XP, attack
            playerInventory: [], //[["itemname", qty]]
            roomArrayRender: [],//
            fog: true
        }
        this.runGame = this.runGame.bind(this)
        this.generateRoom = this.generateRoom.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.generateMonster = this.generateMonster.bind(this)
        this.generateItem = this.generateItem.bind(this)
        movingRooms.checkForRoomChange = movingRooms.checkForRoomChange.bind(this)
    }

    handleKeyPress(e) {
      var PlayerPositionX = this.state.player[2][0];
      var PlayerPositionY = this.state.player[2][1];
      var PlayerPositionXori = this.state.player[2][0];
      var PlayerPositionYori = this.state.player[2][1];
      var monsters = this.state.monsters;
      var items = this.state.items;
      var boss = this.state.boss;
      var currentRoom = this.state.player[1];
      var monsterX = 0;
      var monsterY = 0;
      var monster = []
      var monsterIndex
      var bossX = -1;
      var bossY = -1;
      var itemX = 0;
      var itemY = 0;
      var itemInIndex = 0
      var player = this.state.player;
      var roomToMoveIn =   this.state.roomArrayRender;
      var keyCode = e.keyCode;
      var roomCounter = this.state.roomCounter;
      //Figure out where all items and triggers are in the room
      for(var i=0; i<items.length; i++){
        if(items[i][3] === currentRoom){
          itemX = items[i][0];
          itemY = items[i][1];
          itemInIndex = i;
        }
      }
      for(var i=0; i<monsters.length; i++){
      if(monsters[i][0] === currentRoom && monsters[i][3] > 0){
        monsterX = monsters[i][1];
        monsterY = monsters[i][2];
        var monster = monsters[i]
        var monsterIndex = i
      }
    }
    for(var i=0; i<boss.length; i++){
    if(boss[i][0] === currentRoom && boss[i][3] > 0){
      bossX = boss[i][1];
      bossY = boss[i][2];
      var boss = boss[i]
      var bossIndex = i
    }
  }
  //end figureout where stuff is
      var move = playerMovement.playerMove(PlayerPositionX, PlayerPositionY, player, roomToMoveIn, keyCode)
      PlayerPositionX = move[2][0];
      PlayerPositionY = move[2][1];
      if (PlayerPositionX === itemX && PlayerPositionY === itemY){
        console.log(items[i])
        var whatItemState = items[i][2]
        items.splice(i,1)
        console.log(items)
        switch (whatItemState){
          case "Att":
          var currentAttack = move[5];
          move.splice(5,1, currentAttack + 10);
          break;
          case "Trap":
          var currentHP = move[0];
          move.splice(0,1, currentHP - 10);
          break;
          case "HP":
          var currentHP = move[0];
          move.splice(0,1, currentHP + 15);
          break;
        }

      }
      if (PlayerPositionX === monsterX && PlayerPositionY === monsterY && monster[3] > 0){
        //No move into monster Sq
        var monsterHP = monster[3]
        var playerDamage = (Math.floor(Math.random() * move[5] * (1 + (.1 * move[3]))))
        monster.splice(3,1,monsterHP-playerDamage)
        move[2].splice(0,1,PlayerPositionXori)
        move[2].splice(1,1,PlayerPositionYori)
        var monsterDamage = (Math.floor(Math.random() * (5-3) + 3))
        var playerHP = move[0]
        if(monster[3] > 0){
        move.splice(0,1,playerHP - monsterDamage)
        monsters.splice(monsterIndex,1,monster)
      } else {
        var playerXP = move[4]
        move.splice(4,1,playerXP + 10)
        if((playerXP + 10) <= 40){
          move.splice(3,1,1)
        }
        if((playerXP + 10) > 40 && (playerXP + 10) <= 100){
          move.splice(3,1,2)
        }
        if((playerXP + 10) > 100 && (playerXP + 10) <= 200){
          move.splice(3,1,3)
        }
        if((playerXP + 10) > 200 && (playerXP + 10) <= 350){
          move.splice(3,1,4)
        }
        if((playerXP + 10) > 500){
          move.splice(3,1,5)
        }

      }
        this.setState({
          monsters: monsters
        })
      }
//boss fights
      if (PlayerPositionX === bossX && PlayerPositionY === bossY && boss[3] > 0){
        //No move into monster Sq
        var monsterHP = boss[3]
        var playerDamage = (Math.floor(Math.random() * move[5] * (1 + (.1 * move[3]))))
        monster.splice(3,1,monsterHP-playerDamage)
        move[2].splice(0,1,PlayerPositionXori)
        move[2].splice(1,1,PlayerPositionYori)
        var monsterDamage = (Math.floor(Math.random() * (10-7) + 3))
        var playerHP = move[0]
        if(monster[3] > 0){
        move.splice(0,1,playerHP - monsterDamage)
        monsters.splice(monsterIndex,1,monster)
      } else {
        alert("You've won! Welcome to free play, you can refresh to start over.")
        var playerXP = move[4]
        move.splice(4,1,playerXP + 1000)
        if((playerXP + 10) <= 40){
          move.splice(3,1,1)
        }
        if((playerXP + 10) > 40 && (playerXP + 10) <= 100){
          move.splice(3,1,2)
        }
        if((playerXP + 10) > 100 && (playerXP + 10) <= 200){
          move.splice(3,1,3)
        }
        if((playerXP + 10) > 200 && (playerXP + 10) <= 350){
          move.splice(3,1,4)
        }
        if((playerXP + 10) > 500){
          move.splice(3,1,5)
        }

      }
        this.setState({
          monsters: monsters
        })
      }


      movingRooms.checkForRoomChange(PlayerPositionX,PlayerPositionY, roomCounter, player)
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
    var isBoss = Math.floor(Math.random() * (30))
    var boss = []
    if (isBoss < 1 && this.state.boss.length < 1)
    {boss.push(this.generateBoss(roomNumber))

      this.setState({
        boss: boss
      })
    }
    var monsterX = Math.floor(Math.random() * (10 - 3)) + 3;
    var monsterY = Math.floor(Math.random() * (8 - 3)) + 3;
    var monsterHP = Math.floor(Math.random() * (50 - 20)) + 20;
    return([roomNumber, monsterX, monsterY, monsterHP])
  }
  generateBoss(roomNumber){
    var monsterX = Math.floor(Math.random() * (10 - 3)) + 3;
    var monsterY = Math.floor(Math.random() * (8 - 3)) + 3;
    var monsterHP = (Math.floor(Math.random() * (50 - 20)) + 20)*10;
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

      let gr = this.generateRoom(1);
      let mr = this.generateMonster(1)
      let ite = this.generateItem(1)
      let tempMonsterArray = this.state.monsters
      tempMonsterArray.push(mr)
      let tempRoomArray = this.state.rooms;
      tempRoomArray.push([1, gr,null,null,null,null])
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
      var boss = this.state.boss;
      var currentRoom = this.state.player[1];
      var monsterX = -1;
      var monsterY = -1;
      var bossX = -1;
      var bossY = -1;
      var itemX = -1;
      var itemY = -1;
      var fog = this.state.fog;


      if (this.state.gameState === 'loading') {
      var toBeRendered = (<div className="GameStartScreen vertCenterText"><br/><br/>Are you Ready To Begin?<br/><br/><button onClick={this.runGame.bind(this)}>Start</button></div>);
      var statsForRender = ""
      }

      if (this.state.gameState === 'startGame') {
      //Figure out monster
      if (this.state.player[0]<=0){
        alert("You've Died");
        location.reload();
      }
      var weaponName = ""
      switch(true){
        case this.state.player[5] <= 10:
        weaponName = "Fists"
        break;
        case this.state.player[5] > 10 && this.state.player[5] <20:
        weaponName = "Brass Monkey"
        break;
        case this.state.player[5] > 19 && this.state.player[5] <30:
        weaponName = "Garden Rake"
        break;
        case this.state.player[5] > 29 && this.state.player[5] <40:
        weaponName = "Garden Snake"
        break;
        case this.state.player[5] > 39 && this.state.player[5] <50:
        weaponName = "Chain Saw"
        break;
        case this.state.player[5] > 49 && this.state.player[5] <60:
        weaponName = "Holy Chainsaw of Antioch"
        break;
        case this.state.player[5] >= 60:
        weaponName = "Holy Chainsaw of Antioch 3 blades"
        break;
      }

      var statsForRender = (<div><center><h2>HP: {this.state.player[0]} Level: {this.state.player[3]} XP: {this.state.player[4]} Weapon: {weaponName} {this.state.player[5]}</h2></center></div>)
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
    for(var i=0; i<boss.length; i++){
    if(boss[i][0] === currentRoom && boss[i][3] > 0){
      bossX = boss[i][1];
      bossY = boss[i][2];
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
if (j === bossX && i === bossY) {
return (<div style={{width: wdth / 13 + "px", height: hth / 11 + "px"}} className={"tileB"  }></div>)
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

        return (<div><div className="board">
        {toBeRendered}
        </div>{statsForRender}</div>
        )
    }
}


ReactDOM.render( <
    GameBoard / > ,
    document.getElementById('game')
);
