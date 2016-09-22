module.exports = {
  playerMove: function (PlayerPositionX, PlayerPositionY, player, roomToMoveIn, keyCode) {
    switch(keyCode) {
    case 38://up
    if (roomToMoveIn[PlayerPositionY - 1][PlayerPositionX] !== 3 && roomToMoveIn[PlayerPositionY - 1][PlayerPositionX] !== 1) {
      player.splice(2, 1, [PlayerPositionX, PlayerPositionY - 1])
      return player;
    }
    return player;
    case 40://down
    if (roomToMoveIn[PlayerPositionY + 1][PlayerPositionX] !== 3 && roomToMoveIn[PlayerPositionY + 1][PlayerPositionX] !== 1) {
      player.splice(2, 1, [PlayerPositionX, PlayerPositionY + 1]);
      return player;
    }
    return player;
    case 37://left
    if (roomToMoveIn[PlayerPositionY ][PlayerPositionX -1] !== 3 && roomToMoveIn[PlayerPositionY][PlayerPositionX-1] !== 1 && PlayerPositionX > 0) {
      player.splice(2, 1, [PlayerPositionX - 1, PlayerPositionY]);
      return player;
    }
    return player;
    case 39://right
    if (roomToMoveIn[PlayerPositionY ][PlayerPositionX +1] !== 3 && roomToMoveIn[PlayerPositionY][PlayerPositionX+1] !== 1 && roomToMoveIn[PlayerPositionY].length > PlayerPositionX+1 ) {
      player.splice(2, 1, [PlayerPositionX + 1, PlayerPositionY]);
      return player;
    }
    return player;
    default:
    console.log("return default")
      return player;
    }
  }
}
