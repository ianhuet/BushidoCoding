function checkSupported() {

    canvas = document.getElementById('canvas');

    if (canvas.getContext) {

        // Canvas is supported
        canvas.width;
        canvas.height;
        ctx = canvas.getContext('2d');


        // function drawSnake() {
        //     snakeBody.push([currentPosition['x'], currentPosition['y']]);
        //     ctx.fillStyle = "rgb(200,0,0)";
        //     ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
        //     if (snakeBody.length > snakeLength) {
        //         var itemToRemove = snakeBody.shift();
        //         ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
        //     }
        //     if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] == suggestedPoint[1]) {
        //         makeFoodItem();
        //         snakeLength += 1;
        //     }
        // }


        function drawSnake() {
            if (snakeBody.some(hasEatenItself)) {
                gameOver();
                return false;
            }
            snakeBody.push([currentPosition['x'], currentPosition['y']]);
            ctx.fillStyle = "rgb(200,0,0)";
            ctx.fillRect(currentPosition['x'], currentPosition['y'], gridSize, gridSize);
            if (snakeBody.length > snakeLength) {
                var itemToRemove = snakeBody.shift();
                ctx.clearRect(itemToRemove[0], itemToRemove[1], gridSize, gridSize);
            }
            if (currentPosition['x'] == suggestedPoint[0] && currentPosition['y'] == suggestedPoint[1]) {
                makeFoodItem();
                snakeLength += 1;
                updateScore();
            }
        }

        function leftPosition(){
            return currentPosition['x'] - gridSize;
        }

        function rightPosition(){
            return currentPosition['x'] + gridSize;
        }

        function upPosition(){
            return currentPosition['y'] - gridSize;
        }

        function downPosition(){
            return currentPosition['y'] + gridSize;
        }

        function moveUp(){
            if (upPosition() >= 0) {
                executeMove('up', 'y', upPosition());
            } else {
                whichWayToGo('x');
            }
        }

        function moveDown(){
            if (downPosition() < canvas.height) {
                executeMove('down', 'y', downPosition());
            } else {
                whichWayToGo('x');
            }
        }

        function moveLeft(){
            if (leftPosition() >= 0) {
                executeMove('left', 'x', leftPosition());
            } else {
                whichWayToGo('y');
            }
        }

        function moveRight(){
            if (rightPosition() < canvas.width) {
                executeMove('right', 'x', rightPosition());
            } else {
                whichWayToGo('y');
            }
        }

        function moveSnake(){
            switch(direction){
                case 'up':
                    currentPosition['y'] = currentPosition['y'] - gridSize;
                    drawSnake();
                    break;

                case 'down':
                    currentPosition['y'] = currentPosition['y'] + gridSize;
                    drawSnake();
                    break;

                case 'left':
                    currentPosition['x'] = currentPosition['x'] - gridSize;
                    drawSnake();
                    break;

                case 'right':
                    currentPosition['x'] = currentPosition['x'] + gridSize;
                    drawSnake();
                    break;
            }
        }

        function whichWayToGo(axisType){
            if (axisType=='x') {
                a = (currentPosition['x'] > canvas.width / 2) ? moveLeft() : moveRight();
            } else {
                a = (currentPosition['y'] > canvas.height / 2) ? moveUp() : moveDown();
            }
        }

        function executeMove(dirValue, axisType, axisValue) {
            direction = dirValue;
            currentPosition[axisType] = axisValue;
            drawSnake();
        }

        function makeFoodItem(){
            suggestedPoint = [Math.floor(Math.random()*(canvas.width/gridSize))*gridSize, Math.floor(Math.random()*(canvas.height/gridSize))*gridSize];
            if (snakeBody.some(hasPoint)) {
              makeFoodItem();
            } else {
              ctx.fillStyle = "rgb(10,100,0)";
              ctx.fillRect(suggestedPoint[0], suggestedPoint[1], gridSize, gridSize);
            };
        }
          
        function hasPoint(element, index, array) {
            return (element[0] == suggestedPoint[0] && element[1] == suggestedPoint[1]);
        }

        function start(){
            ctx.clearRect(0,0, canvas.width, canvas.height);
            this.currentPosition = {'x':50, 'y':50};
            snakeBody = [];
            snakeLength = 3;
            updateScore();
            makeFoodItem();
            drawSnake();
            direction = 'right';
            play();
        }

        function pause(){
            clearInterval(interval);
            allowPressKeys = false;
        }

        function play(){
            interval = setInterval(moveSnake,100);
            allowPressKeys = true;
        }

        function gameOver(){
            var score = (snakeLength - 3)*10;
            pause();
            alert("Game Over. Your score was "+ score);
            ctx.clearRect(0,0, canvas.width, canvas.height);
            document.getElementById('play_menu').style.display='none';
            document.getElementById('restart_menu').style.display='block';
        }

        function restart(){
            pause();
            start();
        }

        function updateScore(){
            var score = (snakeLength - 3)*10
            document.getElementById('score').innerText = score;
        }

        // This sets the fill color to red
        ctx.fillStyle = "rgb(200,0,0)";

        // Global variables
        var allowPressKeys = true;
        var gridSize = 10;
        var snakeBody = [];
        var direction = 'right';
        var currentPosition = [];
        currentPosition['x'] = 50;
        currentPosition['y'] = 50;


        // To capture the keystrokes
        document.onkeydown = function (event) {
            var keyCode;

            if (!allowPressKeys){
                return null;
            }

            if (event == null) {
                keyCode = window.event.keyCode;
            }
            else {
                keyCode = event.keyCode;
            }

            switch (keyCode) {
                // left
                case 37:
                    moveLeft();
                    break;

                // up
                case 38:
                    moveUp();
                    break;

                // right
                case 39:
                    moveRight();
                    break;

                // down
                case 40:
                    moveDown();
                    break;

                default:
                    break;
            }
            drawSnake();
        }

        // execute an animation that moves the Snake in that direction
        setInterval(moveSnake,100);

    } else {
        // Canvas is not supported
        alert("We're sorry, but your browser does not support the canvas tag. Please use any web browser other than Internet Explorer.");
    }
}

