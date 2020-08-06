namespace SpriteKind {
    export const pane = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.pane, SpriteKind.Player, function (sprite, otherSprite) {
    if (sprite.y > otherSprite.bottom) {
        otherSprite.bottom = sprite.top
        otherSprite.vy = otherSprite.vy * -1
        if (controller.left.isPressed() && !(controller.right.isPressed())) {
            otherSprite.ax += -50
            if (otherSprite.vx < -250) {
                otherSprite.vy = -250
            }
        } else if (controller.right.isPressed() && !(controller.left.isPressed())) {
            otherSprite.ax += 50
            if (otherSprite.vx > 250) {
                otherSprite.vy = 250
            }
        }
    }
})
sprites.onDestroyed(SpriteKind.Player, function (sprite) {
    ball = sprites.create(img`
        . . 7 7 7 7 7 7 7 . . 
        . 7 7 7 7 7 7 7 7 7 . 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        7 7 7 7 7 7 7 7 7 7 7 
        . 7 7 7 7 7 7 7 7 7 . 
        . . 7 7 7 7 7 7 7 . . 
        `, SpriteKind.Player)
    ball.x = startPane.x
    ball.bottom = 98
    ball.setFlag(SpriteFlag.AutoDestroy, true)
    ball.setVelocity(randint(-100, 100), -100)
    info.changeLifeBy(-1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (otherSprite.bottom - sprite.top <= 2) {
        ball.setVelocity(ball.vx, ball.vy * -1)
    } else if (sprite.bottom - otherSprite.top <= 2) {
        ball.setVelocity(ball.vx, ball.vy * -1)
    } else if (otherSprite.right - sprite.left <= 2) {
        ball.setVelocity(ball.vx * -1, ball.vy)
    } else if (sprite.right - otherSprite.left <= 2) {
        ball.setVelocity(ball.vx * -1, ball.vy)
    }
    enemyCount += -1
    otherSprite.destroy()
})
let enemyPane: Sprite = null
let ball: Sprite = null
let startPane: Sprite = null
info.setLife(3)
startPane = sprites.create(img`
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `, SpriteKind.pane)
startPane.setPosition(80, 100)
controller.moveSprite(startPane, 150, 0)
ball = sprites.create(img`
    . . 7 7 7 7 7 7 7 . . 
    . 7 7 7 7 7 7 7 7 7 . 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    7 7 7 7 7 7 7 7 7 7 7 
    . 7 7 7 7 7 7 7 7 7 . 
    . . 7 7 7 7 7 7 7 . . 
    `, SpriteKind.Player)
ball.bottom = 98
ball.setFlag(SpriteFlag.AutoDestroy, true)
let enemyPanePosx = 30
let enemyPanePosy = 20
for (let index = 0; index < 3; index++) {
    for (let index = 0; index < 6; index++) {
        enemyPane = sprites.create(img`
            2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 2 2 2 2 
            `, SpriteKind.Enemy)
        enemyPane.setPosition(enemyPanePosx, enemyPanePosy)
        enemyPanePosx += 20
    }
    enemyPanePosx = 30
    enemyPanePosy += 10
}
let enemyCount = 18
game.splash("按下Ａ開始遊戲！")
ball.setVelocity(randint(-100, 100), -100)
game.onUpdate(function () {
    if (ball.top < 0) {
        ball.top = 0
        ball.setVelocity(ball.vx, ball.vy * -1)
    } else if (ball.right > 160) {
        ball.right = 160
        ball.setVelocity(ball.vx * -1, ball.vy)
    } else if (ball.left < 0) {
        ball.left = 0
        ball.setVelocity(ball.vx * -1, ball.vy)
    }
    if (enemyCount <= 0) {
        game.over(true)
    }
})
