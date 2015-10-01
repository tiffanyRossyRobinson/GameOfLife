This is the Game of Life!

The user gets to pick what size of life space they want (rows[max=10] X col[max=20]), the number of interations, and which cells they want to start as ALIVE. 

Once the user starts the process, the game will iterate the number of times selected by the user and at each phase determine if the cell is now ALIVE or DEAD. The determination is made by the following rules: 

-- If an ALIVE cell has fewer than two live neighbours dies.   
	//if(cell === ALIVE && ALIVE_Neighbors < 2)
		{ cell = DEAD }

-- An ALIVE cell with two or three live neighbours lives on to the next generation.  
	//if(cell === ALIVE && (ALIVE_Neighbors === 2 || ALIVE_Neighbors ===3))
		{ cell = ALIVE }

-- An ALIVE cell with more than three live neighbours dies.
	//if(cell === ALIVE && Alive_Neighbors > 3)
		{ cell = DEAD }

-- A DEAD cell with exactly three live neighbours is awaken (becomes ALIVE).
	//if(cell === DEAD && Alive_Neighbors === 3)
		{ cell = ALIVE }

This will be accomplished in the following way: 

*The Process

	Once on the app, the user will have the opportunity to pick their iteration value, the number of rows, and the number of columns. Once they have done this they can CREATE their life space. 

	Once their life space is created. They can now bring the dead(cells) to life. Once they decide which cells they want to bring back from the dead, they can hit the start button and see who will survive through the interation period selected. 

