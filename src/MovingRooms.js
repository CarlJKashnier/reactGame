module.exports = {
    checkForRoomChange(PlayerPositionX, PlayerPositionY, roomCounter, player) {
        //exit room left
        var currentRoomPlayer = player[1];
        if (PlayerPositionX === 0 && PlayerPositionY === 5) {

            let tempRoomArray = this.state.rooms;
            var roomData = '';
            var roomDatab = tempRoomArray.map(function(item, i) {
                if (player[1] === item[0]) {
                    roomData = [item, i]
                }
            })
            if (roomData[0][2] !== null && roomData[0][2]) {
                console.log("room exists")
                player.splice(1, 1, roomData[0][2])
                player.splice(2, 1, [11, 5])
                tempRoomArray.splice(2, 1, player[1])
                this.setState({player: player, rooms: tempRoomArray})

            } else {
                let gr = this.generateRoom(roomCounter++);
                let mr = this.generateMonster(roomCounter)
                let ite = this.generateItem(roomCounter)
                let tempMonsterArray = this.state.monsters
                tempMonsterArray.push(mr)
                let tempRoomArray = this.state.rooms;
                // add last room to array
                tempRoomArray.push([
                    roomCounter,
                    gr,
                    null,
                    null,
                    player[1],
                    null
                ]) //left, up, right, down
                //update currentroom with exit
                var currentRoomB = 0
                var currentRoomA = tempRoomArray.map(function(item, i) {
                    if (item[0] == player[1]) {
                        currentRoomB = i
                    }
                })
                tempRoomArray[currentRoomB].splice(2, 1, roomCounter)

                player.splice(1, 1, roomCounter)
                player.splice(2, 1, [11, 5])
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

        //exit from right
        if (PlayerPositionX === 12 && PlayerPositionY === 5) {
            let tempRoomArray = this.state.rooms;
            var roomData = '';
            var roomDatab = tempRoomArray.map(function(item, i) {
                if (player[1] === item[0]) {
                    roomData = [item, i]
                    console.log(roomData)
                }
            })
            if (roomData[0][4] !== null && roomData[0][4]) {
                console.log(roomData[0][4])
                player.splice(1, 1, roomData[0][4])
                player.splice(2, 1, [2, 5])
                this.setState({player: player})

            } else {
                let gr = this.generateRoom(roomCounter++);
                let mr = this.generateMonster(roomCounter)
                let ite = this.generateItem(roomCounter)
                let tempMonsterArray = this.state.monsters
                tempMonsterArray.push(mr)
                let tempRoomArray = this.state.rooms;
                tempRoomArray.push([
                    roomCounter,
                    gr,
                    player[1],
                    null,
                    null,
                    null
                ]) //left, up, right, down
                //update currentroom with exit
                var currentRoomB = 0
                var currentRoomA = tempRoomArray.map(function(item, i) {
                    if (item[0] == player[1]) {
                        currentRoomB = i
                    }
                })
                tempRoomArray[currentRoomB].splice(4, 1, roomCounter)

                player.splice(1, 1, roomCounter)
                player.splice(2, 1, [1, 5])
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
        //exit from Top
        if (PlayerPositionX === 6 && PlayerPositionY === 0) {
            let tempRoomArray = this.state.rooms;
            var roomData = '';
            var roomDatab = tempRoomArray.map(function(item, i) {
                if (player[1] === item[0]) {
                    roomData = [item, i]
                }
            })
            if (roomData[0][3] !== null && roomData[0][3]) {
                player.splice(1, 1, roomData[0][3])
                player.splice(2, 1, [6, 9])
                this.setState({player: player})

            } else {
                let gr = this.generateRoom(roomCounter++);
                let mr = this.generateMonster(roomCounter)
                let ite = this.generateItem(roomCounter)
                let tempMonsterArray = this.state.monsters
                tempMonsterArray.push(mr)
                let tempRoomArray = this.state.rooms;
                tempRoomArray.push([
                    roomCounter,
                    gr,
                    null,
                    null,
                    null,
                    player[1]
                ]) //left, up, right, down
                //update currentroom with exit
                var currentRoomB = 0
                var currentRoomA = tempRoomArray.map(function(item, i) {
                    if (item[0] == player[1]) {
                        currentRoomB = i
                    }
                })
                tempRoomArray[currentRoomB].splice(3, 1, roomCounter)

                player.splice(1, 1, roomCounter)
                player.splice(2, 1, [6, 9])
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
        //exit from Bottom
        if (PlayerPositionX === 6 && PlayerPositionY === 10) {
            let tempRoomArray = this.state.rooms;
            var roomData = '';
            var roomDatab = tempRoomArray.map(function(item, i) {
                if (player[1] === item[0]) {
                    roomData = [item, i]
                }
            })
            if (roomData[0][5] !== null && roomData[0][5]) {
                player.splice(1, 1, roomData[0][5])
                player.splice(2, 1, [6, 1])
                this.setState({player: player})

            } else {
                let gr = this.generateRoom(roomCounter++);
                let mr = this.generateMonster(roomCounter)
                let ite = this.generateItem(roomCounter)
                let tempMonsterArray = this.state.monsters
                tempMonsterArray.push(mr)
                let tempRoomArray = this.state.rooms;
                tempRoomArray.push([
                    roomCounter,
                    gr,
                    null,
                    player[1],
                    null,
                    null
                ]) //left, up, right, down
                //update currentroom with exit
                var currentRoomB = 0
                var currentRoomA = tempRoomArray.map(function(item, i) {
                    if (item[0] == player[1]) {
                        currentRoomB = i
                    }
                })
                tempRoomArray[currentRoomB].splice(5, 1, roomCounter)
                console.log(tempRoomArray)

                player.splice(1, 1, roomCounter)
                player.splice(2, 1, [6, 1])
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
    }
    //ending exports
}
