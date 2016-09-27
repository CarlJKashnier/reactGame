module.exports = {
  checkForRoomChange(PlayerPositionX, PlayerPositionY, roomCounter, player){
if (PlayerPositionX === 0 && PlayerPositionY === 5){
  let gr = this.generateRoom(roomCounter++);
  let mr = this.generateMonster(roomCounter)
  let ite = this.generateItem(roomCounter)
  let tempMonsterArray = this.state.monsters
  tempMonsterArray.push(mr)
  let tempRoomArray = this.state.rooms;
  tempRoomArray.push([roomCounter, gr,null,null,player[1],null])//left, up, right, down
  //update currentroom with exit
  var currentRoomB = 0
  var currentRoomA = tempRoomArray.map(function(item, i){
    if (item[0] === player[1]){
      currentRoomB = i
    }
  })
  tempRoomArray[currentRoomB].splice(2,1, player[1])

  player.splice(1, 1, roomCounter)
  player.splice(2,1,[11,5])
  let tempItemArray = this.state.items;
  tempItemArray.push(ite)
  this.setState({
    gameState: "startGame",
    roomArrayRender: gr,
    monsters: tempMonsterArray,
    rooms: tempRoomArray,
    items: tempItemArray,
    roomCounter: roomCounter
  })
}
}



//ending exports
}
