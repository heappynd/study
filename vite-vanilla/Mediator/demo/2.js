function Player(name) {
  this.name = name
  this.enemy = null // 敌人
}
Player.prototype.win = function () {
  console.log(this.name + ' won ')
}
Player.prototype.lose = function () {
  console.log(this.name + ' lost')
}
Player.prototype.die = function () {
  this.lose()
  this.enemy.win()
}

player1.partners = [player1, player2, player3, player4]
player1.enemies = [player5, player6, player7, player8]

player5.partners = [player5, player6, player7, player8]
player5.enemies = [player1, player2, player3, player4]
