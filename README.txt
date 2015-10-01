This is the Game of Life!

The user gets to pick what size of life space they want (rows[max=10] X col[max=20]), the number of interations, and which cells they want to start as ALIVE. 

Once the user starts the process, the game will iterate the number of times selected by the user. At each phase it will determine if the cell is now ALIVE or DEAD. The determination is made with the following rules: 

	-- If an ALIVE cell has fewer than two live neighbours dies.   
		//if(cell === ALIVE && ALIVE_Neighbors < 2)
		//	{ cell = DEAD }

	-- An ALIVE cell with two or three live neighbours lives on to the next generation.  
		//if(cell === ALIVE && (ALIVE_Neighbors === 2 || ALIVE_Neighbors ===3))
		//	{ cell = ALIVE }

	-- An ALIVE cell with more than three live neighbours dies.
		//if(cell === ALIVE && Alive_Neighbors > 3)
		//	{ cell = DEAD }

	-- A DEAD cell with exactly three live neighbours is awaken (becomes ALIVE).
		//if(cell === DEAD && Alive_Neighbors === 3)
		//	{ cell = ALIVE }

This will be accomplished in the following way: 

	*The Process

		Once on the app, the user will have the opportunity to pick their iteration value, the number of rows, and the number of columns and create their life space. 

		When the life space is created, they are able to bring the dead(cells) to life. After they have brought to life the cells, they can hit the start button and see who will survive through the interation period selected.

	*Determination Method
		
		When the use presses the start button, the app will collect the table cells that were create using the someObject.classes element that was created during the life space build. This is going to tell the application what spaces it needs to look at. 

		Next it creates an $interval function that runs every 500ms for the number of iterations that the user selected in the beginning (someObject.iterations). 

		For each iterations, a blank needToUpdate array will be created to keep track of which cells will need to either become ALIVE or DEAD.

		For each space that was created in the life space (the someObject.classes array), the application will pull off the row and col values and determine which cells surround this element and create a neighborsArray. 

		Now that it know who the neighbors are, it will go through and figure out which ones are ALIVE. Running through the determination rules that were defined earlier, it will determine if this cell needs to be changed to ALIVE or DEAD. If it needs to change states, it will push this cell into the needToUpdate array.

		Once it has analyzed every cell and determined if it is a survivor or not, it will check the needToUpdate array. If there are no elements in the needToUpdate, it will determine that the mission is complete and there will be no more changes. However, if there are elements in the needToUpdate array, it will make these changes and continue to the next iteration. 

	*Not for the Weak

		If during the run cycle you determine that you cannot handle it, there is an emergency stop button. (Note: if this were a real apocalyptic event there would be no escape!)



