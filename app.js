  // Game state
        let board = ['','','','','','','','',''];
        let player = 'X';
        let active = true;
        let playerNames = {X: 'Player 1', O: 'Player 2'};

        // Winning combinations
        const wins = [
            [0,1,2], [3,4,5], [6,7,8], // rows
            [0,3,6], [1,4,7], [2,5,8], // columns
            [0,4,8], [2,4,6]           // diagonals
        ];

        function startGame() {
            const p1 = document.getElementById('player1').value.trim();
            const p2 = document.getElementById('player2').value.trim();
            
            // Use default names if empty
            playerNames.X = p1 || 'Player 1';
            playerNames.O = p2 || 'Player 2';
            
            // Switch screens
            document.getElementById('nameScreen').classList.add('hidden');
            document.getElementById('gameScreen').classList.add('active');
            
            // Update turn display
            document.getElementById('turn').textContent = `${playerNames[player]}'s Turn`;
        }

        function play(i) {
            if (board[i] || !active) return;
            
            // Make move
            board[i] = player;
            const cells = document.querySelectorAll('.cell');
            cells[i].textContent = player;
            cells[i].classList.add(player.toLowerCase());
            
            // Check win
            if (checkWin()) {
                document.getElementById('turn').textContent = `${playerNames[player]} Wins! 🎉`;
                highlightWinner();
                active = false;
                return;
            }
            
            // Check tie
            if (board.every(cell => cell)) {
                document.getElementById('turn').textContent = "It's a Draw!";
                active = false;
                return;
            }
            
            // Switch player
            player = player === 'X' ? 'O' : 'X';
            document.getElementById('turn').textContent = `${playerNames[player]}'s Turn`;
        }

        function checkWin() {
            return wins.some(([a,b,c]) => 
                board[a] && board[a] === board[b] && board[a] === board[c]
            );
        }

        function highlightWinner() {
            const cells = document.querySelectorAll('.cell');
            wins.forEach(([a,b,c]) => {
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    cells[a].classList.add('winner');
                    cells[b].classList.add('winner');
                    cells[c].classList.add('winner');
                }
            });
        }

        function reset() {
            board = ['','','','','','','','',''];
            player = 'X';
            active = true;
            document.getElementById('turn').textContent = `${playerNames[player]}'s Turn`;
            document.querySelectorAll('.cell').forEach(cell => {
                cell.textContent = '';
                cell.className = 'cell';
            });
        }