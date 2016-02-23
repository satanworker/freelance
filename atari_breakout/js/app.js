(function(){
  var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    var x = canvas.width/1.5;
    var y = canvas.height-30;
    var dx = 3;
    var dy = -3;
    var ballRadius = 10;
    var paddleHeight = 10;
    var paddleWidth = 75;
    var paddleX = (canvas.width-paddleWidth)/2;
    var rightPressed = false;
    var leftPressed = false;
    var brickRowCount = 3;
    var brickColumnCount = 5;
    var brickWidth = 75;
    var brickHeight = 20;
    var brickPadding = 10;
    var brickOffsetTop = 30;
    var brickOffsetLeft = 30;
    var bricks = [];
    var score = 0;
    var lives = 2;
    for(c=0;c<brickColumnCount;c++) {
        bricks[c] = [];
        for(r=0;r<brickRowCount;r++) {
            bricks[c][r] = {x:0,y:0,status:1};
        }
    }
    function drawLives () {
        ctx.font = "18px Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Lives:" + lives, canvas.width/2-65, 20);
    }
    function drawBricks () {
        for(c=0;c<brickColumnCount;c++) {
            for(r=0;r<brickRowCount;r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (c*(brickWidth + brickPadding)) + brickOffsetLeft;
                    var brickY = (r*(brickHeight + brickPadding)) + brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX,brickY,brickWidth,brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    }
    function collisionDetection () {
        for(c=0;c<brickColumnCount;c++) {
            for(r=0;r<brickRowCount;r++) {
                var b = bricks[c][r];
                if(b.status == 1) {
                    if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight+ballRadius) {
                        dy = -dy;
                        b.status = 0;
                        score++;
                        if(score == brickColumnCount*brickRowCount) {
                            alert('YOU WIN. CONGRATULATIONS!');
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    function drawScore() {
        ctx.font="16px, Arial";
        ctx.fillStyle = "#0095DD";
        ctx.fillText("Score:" + score, 8,20);
    }

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);
    document.addEventListener('mousemove', mouseMoveHandler, false);
    function mouseMoveHandler (e) {
        var relativeX = e.clientX -canvas.offsetLeft;
        if (relativeX > paddleWidth/2 && relativeX < canvas.width - paddleWidth/2) {
            paddleX = relativeX - paddleWidth/2;
        }
    }
    function keyDownHandler(e) {
        console.log(e.keyCode);
        if(e.keyCode == 37) {
            leftPressed = true;
        }
        else if (e.keyCode == 39) {
            rightPressed = true;
        }
    }
    function keyUpHandler (e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if  (e.keyCode == 37) {
            leftPressed = false;
        }
    }
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2, false);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
    function draw () {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        drawBall();
        drawPaddle();
        drawBricks();
        collisionDetection();
        drawScore();
        drawLives();
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if (y + dy > canvas.height-ballRadius*1.8 && x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else if (y + dy > canvas.height-ballRadius){
            lives--;
            if(lives == 0) {
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx += dx;
                dy += dy;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
        else if (x + dx > canvas.width-ballRadius|| x + dx < ballRadius) {
            dx = -dx;
        }
        if (rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 3.2;
        }
        else if (leftPressed && paddleX > 0) {
            paddleX -= 3.2;
        }
        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }
    draw();
}());