/**	 
* @author:anisha
* @filename:experiment.js
* @created 09-03-2017 10:00:50 AM
*/

//Fn to load the letters to the boxes.
function loadLetters() {
	var j = 0;
	//First row of letters
	for ( var i = 0; i < total / 2; i++ ) {
		SetColor( s1.substring( i, i + 1 ) );
		//DNA boxes		
		drawRect( 36 + ( i * 43 ), 250, 30, 30, color_code, "", restriction_digestion_stage );
		setEnzymeText( box_array[ i ].x + 5, box_array[ i ].y + 20, s1.substring( i, i + 1 ), restriction_digestion_stage );
		string += s1.substring( i, i + 1 );		
	}
	//Second row of letters
	for ( var i = total / 2; i < total; i++ ) {
		SetColor( s2.substring( j, j + 1 ) );
		drawRect( 36 + ( ( i - 15 ) * 43 ), 410, 30, 30, color_code, "", restriction_digestion_stage );
		setEnzymeText( box_array[ i ].x + 5, box_array[ i ].y + 20, s2.substring( j, j + 1 ), restriction_digestion_stage );
		j++;
	}
	/**move the mouse over the letters to detect the sequence*/
	restriction_digestion_stage.on( "stagemousemove", function( evt ) {
		if ( !lineFlag ) {
		//check touch on the sequence
			checkHit( evt, box_array );
		}
	} );
	restriction_digestion_stage.update();
}
//Fn to get the first sequence and load in the top level of the DNA strands
makeFirstSequence = function() {
/**generate random letters and insert the sequence in between the pattern*/
		startpos = Math.round( Math.random() * ( ( total / 2 ) - txtSequenceText1.length - 1 ) );
		s1 = "";
		for ( var i = 0; i < 15; i++ ) {
			if ( i < startpos ) {
				s1 = s1.concat( CharArr[ Math.round( Math.random() * ( CharArr.length - 1 ) ) ] );
			} else if ( i == startpos ) {
				s1 = s1 + txtSequenceText1;
				i = i + txtSequenceText1.length - 1;
			} else {
				s1 = s1.concat( CharArr[ Math.round( Math.random() * ( CharArr.length - 1 ) ) ] );
			}
		}
		restriction_digestion_stage.update();
	}
	//To make the second sequence
	//Fn to check the pairs G pairs with C ...A pairs with T and vice versa
makeSecondSequence = function() {
		s2 = "";
		for ( var i = 0; i <= s1.length; i++ ) {
			switch ( s1.substring( i, i + 1 ) ) {
				case CharArr[ 0 ]: //A
					s2 = s2.concat( CharArr[ 3 ] );
					break;
				case CharArr[ 1 ]: //C
					s2 = s2.concat( CharArr[ 2 ] );
					break;
				case CharArr[ 2 ]: //G
					s2 = s2.concat( CharArr[ 1 ] );
					break;
				case CharArr[ 3 ]: //T
					s2 = s2.concat( CharArr[ 0 ] );
					break;
			}
		}
		restriction_digestion_stage.update();
	}
	
//Function to set the color to the boxes based on letter
SetColor = function( Char ) {
		switch ( Char ) {
			case CharArr[ 0 ]:
				color_code = "#117dcc"; //a
				color_inverse = "#00b050"; //"0x0B3BFF";
				txt_inverse = "T";
				break;
			case CharArr[ 1 ]:
				color_code = "#ff0000"; //c
				color_inverse = "#ae5e5e";
				txt_inverse = "G";
				break;
			case CharArr[ 2 ]:
				color_code = "#ae5e5e"; //g	
				color_inverse = "#ff0000"; //"0x990000";
				txt_inverse = "C";
				break;
			case CharArr[ 3 ]:
				color_code = "#00b050"; //t	
				color_inverse = "#117dcc"; //"0xFF6600";
				txt_inverse = "A";
				break;
		}
	}

	//Fn to show recognition sequence of enzymes
ShowRecognitionSequence = function( scope, enzy ) {
	restriction_digestion_stage.removeChild( split_container1, split_container2 );
	for ( var i = 0; i < scope.enzyme.length; i++ ) {
		if ( enzy == scope.enzyme[ i ].name ) {
		/**display the recognition sequence and mode of the enzyme in the menu.*/
			scope.first_sequence = txtSequenceText1 = s1 = SequenceArr[ i ][ 0 ];
			scope.second_sequence = txtSequenceText2 = s2 = SequenceArr[ i ][ 1 ];
			scope.blunt_sticky_label = txtSequenceText3 = StickyendArr[ i ];			
			findHalfDna( i );
		}
	}
	makeFirstSequence();//first squence
	makeSecondSequence();//second sequence
	loadLetters();// load the letters on the boxes
}
//take the number of half lines from the sequence.
findHalfDna = function( enzy_number ) {
/**depend on the enzyme number the number of half dna vary. */
	switch ( enzy_number ) {
		case 0:	case 1:	case 4:	case 2:	case 5:	case 9:
			dna_cut_count = 4;
			break;
		case 3:	case 6:	case 8:
			dna_cut_count = 0;
			break;
		case 7:
			dna_cut_count = 2;
			break;
	}
}
/**change the color of the recognition sequence on mouse move. For correct sequence the color changes to white.*/
changeColor = function( i ) {
		for ( var j = i; j < i + ( txtSequenceText1.length ); j++ ) {
			txt_array1[ j ].color = "#ffffff";
			txt_array1[ j + 15 ].color = "#ffffff";
		}
		/**a green line will appear in the correct sequence, shows where have to be cut.*/
		DrawGreenLine( i );
		restriction_digestion_stage.update();
	}
	
/**To draw lines in various positions, for blunt end the line will be straight , step shaped line for sticky end*/
DrawGreenLine = function( j ) {
		if ( txtSequenceText3 == _("Sticky end" )) {
		/**for the enzyme 1,2,3,5 and 8, it follows a recognition sequence with same length and order*/
			if ( ( selected_enzyme == EnzymeArr[ 0 ] ) || ( selected_enzyme == EnzymeArr[ 1 ] ) || ( selected_enzyme == EnzymeArr[ 2 ] ) || ( selected_enzyme == EnzymeArr[ 4 ] ) || ( selected_enzyme == EnzymeArr[ 7 ] ) ) {
			/**check how many letters before the sequence. Draw the pattern based on this*/
				top_left_val = j + 1;
				DrawLine( box_array[ j ].x + 38, 150, box_array[ j ].x + 38, 345 ); //Horizontal Line
				DrawLine( box_array[ j ].x + 38, 345, box_array[ j + ( txtSequenceText2.length - 1 ) ].x - 5, 345 );//Vertical Line 1
				DrawLine( box_array[ j + ( txtSequenceText2.length - 1 ) ].x - 5, 345, box_array[ j + ( txtSequenceText2.length - 1 ) ].x - 5, 540 ); //Horizontal Line 2
			} else if ( selected_enzyme == EnzymeArr[ 5 ] ) {
			/**If the enzyme is 6., there will be 2 half strants. */
				top_left_val = j;
				DrawLine( box_array[ j ].x - 5, 150, box_array[ j ].x - 5, 345 ); //Horizontal Line
				DrawLine( box_array[ j ].x - 5, 345, box_array[ j + ( txtSequenceText2.length ) ].x - 5, 345 ); //Vertical Line 1
				DrawLine( box_array[ j + ( txtSequenceText2.length ) ].x - 5, 345, box_array[ j + ( txtSequenceText2.length ) ].x - 5, 540 );
			} else if ( selected_enzyme == EnzymeArr[ 9 ] ) {
				top_left_val = j + 2;				
				DrawLine( box_array[ j + 2 ].x - 5, 150, box_array[ j + 2 ].x - 5, 345 ); //Horizontal Line
				DrawLine( box_array[ j + 2 ].x - 5, 345, box_array[ j + ( txtSequenceText2.length - 2 ) ].x - 5, 345 ); //Vertical Line 1
				DrawLine( box_array[ j + ( txtSequenceText2.length - 2 ) ].x - 5, 345, box_array[ j + ( txtSequenceText2.length - 2 ) ].x - 5, 540 );
			}
		} else {
			/**for the blunt end the pattern is in staright line*/		
			top_left_val = j + ( txtSequenceText1.length / 2 )
			DrawLine( box_array[ j + ( txtSequenceText2.length / 2 ) ].x - 5, 150, box_array[ j + ( txtSequenceText2.length / 2 ) ].x - 5, 540 ); //Horizontal Line		
		}
		lineFlag = true;
		top_right_val = ( total / 2 ) - ( top_left_val + dna_cut_count );
		restriction_digestion_stage.update();
	}
	//To draw Line
DrawLine = function( x1, y1, x2, y2 ) {
	// Add the line shape to the canvas
	restriction_digestion_stage.addChild( line2 );
	// Tell EaselJs that we want a thin like (1px) with a black color
	line2.graphics.setStrokeStyle( 4 ).beginStroke( "#339900" );
	// Point EaselJS to the place where we want to start drawing
	line2.graphics.moveTo( x1, y1 );
	// Tell EaselJS to draw a line to a different point
	line2.graphics.lineTo( x2, y2 );
	// Stop drawing this line
	line2.graphics.endStroke();
	stage_all_children.push( line2 );
	//push all the lines in an array
	GreenLineArr.push( line2 );
	restriction_digestion_stage.update();
}
cutEnzyme = function( scope ) {		
	//cut the enzyme into two parts based on the pattern. Add each part to each container.
	child_count_container1 = top_left_val + dna_cut_count;
	for ( var i = 0; i < box_array.length; i++ ) {
	//remove existing boxes
		restriction_digestion_stage.removeChild( box_array[ i ] )
	}
	//remove all the copmponents from the stage so that, the cut enzyme should be visible
	for ( var i = 0; i < stage_all_children.length; i++ ) {
		restriction_digestion_stage.removeChild( stage_all_children[ i ] )
	}
	//separate the DNA stant into two depend on the enzyme selecetd
	restriction_digestion_stage.addChild( split_container2 );
	for ( var i = 0; i < top_left_val; i++ ) {
	//load the left part of the enzyme in the first container
		loadImages( queue.getResult( "line" ), "line", ( i + 1 ) * 43, 300, "", split_container1 );
		SetColor( txt_array1[ i ].text );
		//top orange border
		drawRect( 36 + ( ( i ) * 43 ), 350, 30, 30, color_code, "", split_container1 );
		//bottom orange border
		drawRect( 36 + ( ( i ) * 43 ), 500, 30, 30, color_inverse, "", split_container1 );
		//load top left sequence
		setEnzymeText( 40 + ( ( i ) * 43 ), 370, txt_array1[ i ].text, split_container1 );
		//bottom left sequence
		setEnzymeText( 40 + ( ( i ) * 43 ), 520, txt_inverse, split_container1 );
	}
	//half enzyme
	if ( dna_cut_count >= 1 ) {
	// works only mode is sticky end
		for ( var i = 1; i <= dna_cut_count; i++ ) {
		//load half dna on the left and right containers.
			loadImages( queue.getResult( "line_half" ), "line_half1", ( i + top_left_val ) * 43, 435, "", split_container1 );
			SetColor( txt_array1[ i + top_left_val - 1 ].text )
			drawRect( 36 + ( ( i + top_left_val - 1 ) * 43 ), 500, 30, 30, color_inverse, "", split_container1 );
			setEnzymeText( 40 + ( ( i + top_left_val - 1 ) * 43 ), 520, txt_inverse, split_container1 );
			loadImages( queue.getResult( "line_half" ), "line_half", ( i + top_left_val ) * 43, 300, "", split_container2 );
			drawRect( 36 + ( ( i + top_left_val - 1 ) * 43 ), 350, 30, 30, color_code, "", split_container2 );
			setEnzymeText( 40 + ( ( i + top_left_val - 1 ) * 43 ), 370, txt_array1[ i + top_left_val - 1 ].text, split_container2 );
		}
	}
	for ( var i = 1; i <= top_right_val; i++ ) {
	//load the second half on the right side container.
		SetColor( txt_array1[ i + ( dna_cut_count + top_left_val - 1 ) ].text );
		loadImages( queue.getResult( "line" ), "line", ( ( i + ( dna_cut_count + top_left_val ) ) * 43 ), 300, "", split_container2 );
		drawRect( 36 + ( ( i + ( dna_cut_count + top_left_val ) - 1 ) * 43 ), 350, 30, 30, color_code, "", split_container2 );
		drawRect( 36 + ( ( i + ( dna_cut_count + top_left_val ) - 1 ) * 43 ), 500, 30, 30, color_inverse, "", split_container2 );
		setEnzymeText( 40 + ( ( i + ( dna_cut_count + top_left_val ) - 1 ) * 43 ), 520, txt_inverse, split_container2 );
		setEnzymeText( 40 + ( ( i + ( dna_cut_count + top_left_val ) - 1 ) * 43 ), 370, txt_array1[ i + ( dna_cut_count + top_left_val ) - 1 ].text, split_container2 );
	}
	/**move the containers , so that it will separte each other*/
	split_container2.y = -200;
	split_container1.y = -30;
	split_container2.x = 0;
	split_container1.x = -10;
	restriction_digestion_stage.addChild( split_container1 );
	//top left rect
	drawRect( 0, 550, child_count_container1 * 48, 35, "#f2a80f", "bottom_left", split_container1 ); 
	//top left rect
	drawRect( 0, 300, ( child_count_container1 - dna_cut_count ) * 48, 35, "#f2a80f", "top_left", split_container1 ); 	//top right rect	
	drawRect( child_count_container1 * 46, 550, 700, 35, "#f2a80f", "bottom_right", split_container2 ); 
	//bottom right rect
	drawRect( ( child_count_container1 - dna_cut_count ) * 45, 300, 700, 35, "#f2a80f", "top_right", split_container2 ); 
	restriction_digestion_stage.update();
}
/**set the enzyme text on the rect */
setEnzymeText = function( xPos, yPos, txt, container ) {
	var text1 = new createjs.Text( "", "bold 20px Arial", "#000000" );
	text1.x = xPos;
	text1.y = yPos;
	text1.textBaseline = "alphabetic";
	text1.text = txt;
	container.addChild( text1 );
	if ( !cut_flag ) {
		txt_array1.push( text1 );
		stage_all_children.push( text1 );
	}
	restriction_digestion_stage.update();
}
/**check whether the stageX touches the sequence**/
checkHit = function( evt, box_array ) {	
	var pt = box_array[ string.indexOf( txtSequenceText1 ) ].globalToLocal( evt.stageX, evt.stageY );
	if(box_array[ string.indexOf( txtSequenceText1 ) ].hitTest( pt.x, pt.y ) ){
		//change the color of the text to white if stageX touches the first part of the sequence
		changeColor( string.indexOf( txtSequenceText1 ) );
		//get the point where green line starts
		top_left_val = ( string.indexOf( txtSequenceText1 ) ) + 1;
		//get point where green line ends
		top_right_val = ( total / 2 ) - ( top_left_val + dna_cut_count );
	}
	restriction_digestion_stage.update();
}
// sheck whether the sissors hit on the green line, then cuts it into two parts
checkSissorsHit = function( evt,scissors, scope ) {
	for ( var i = 0; i < GreenLineArr.length; i++ ) {	
		//check the sissor hit on the separating line		
		if ( GreenLineArr[ i ].hitTest( evt.target.x+40, evt.target.y ) ) {
		cut_flag = true;
		//display two sequence		
		cutEnzyme( scope );
		}
	}
	restriction_digestion_stage.update();
}