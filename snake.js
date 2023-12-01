const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const rows = 20;
        const columns = 20;
        const cellWidth = canvas.width / rows;
        const cellHeight = canvas.height / columns;
        const snake = [{ x: 2, y: 2 }];
        let apple = { x: 5, y: 5 };
        let direction = 'right'; 


        setInterval(loop, 100);


        document.addEventListener('keydown', keyDown); //ChatGPT    


        function drawGame() {

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);


            snake.forEach(part => drawSnake(part.x, part.y));


            drawApple(apple.x, apple.y);
        }


        function drawSnake(x, y) {
            ctx.fillStyle = 'green';
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }


        function drawApple(x, y) {
            ctx.fillStyle = 'red';
            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
        }


        function getNewApplePosition(max) {
            let newx, newy;
            do {
                newx = Math.floor(Math.random() * max); //Quelle 1
                newy = Math.floor(Math.random() * max); //Quelle 1
            } while (snake.some(part => part.x === newx && part.y === newy));

            apple = { x: newx, y: newy };
        }


        function keyDown(e) {
            switch (e.keyCode) {
                case 37: //Links
                    if (direction !== 'right') {
                        direction = 'left';
                    }
                    break;
                case 38: //Rechts
                    if (direction !== 'down') {
                        direction = 'up';
                    }
                    break;
                case 39: //Oben
                    if (direction !== 'left') {
                        direction = 'right';
                    }
                    break;
                case 40: //Unten
                    if (direction !== 'up') {
                        direction = 'down';
                    }
                    break;
            }
        }


        function loop() {

            let newHead = { x: snake[0].x, y: snake[0].y };
            switch (direction) {
                case 'left':
                    newHead.x--;
                    break;
                case 'up':
                    newHead.y--;
                    break;
                case 'right':
                    newHead.x++;
                    break;
                case 'down':
                    newHead.y++;
                    break;
            }


            if (newHead.x === apple.x && newHead.y === apple.y) {
                getNewApplePosition(rows);
            } else {

                snake.pop(); //ChatGPT
            }

            snake.unshift(newHead); //ChatGPT

            drawGame();
        }

        //Quelle 1: https://wiki.selfhtml.org/wiki/JavaScript/Tutorials/Zufallszahlen