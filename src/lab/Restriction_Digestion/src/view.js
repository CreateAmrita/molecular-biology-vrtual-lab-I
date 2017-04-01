/**	 
 * @author:anisha
 * @filename:view.js
 * @created 09-03-2017 10:00:50 AM
 */
( function() {
	angular.module( 'users' ).directive( "experiment", directiveFunction )
} )();
var restriction_digestion_stage, exp_canvas, split_container1, split_container2; /** Stage, canvas for the experiment */

var selected_enzyme, dna_cut_count, txtSequenceText1, txtSequenceText2, txtSequenceText3;

var child_count_container1, color_inverse, txt_inverse, cut_flag, startpos, lineFlag;

var top_left_val, top_right_val, color_code, string, s1, s2, total, SequenceArr;

var dataplotArray = EnzymeArr = CharArr = stage_all_children = [];

var box_array = GreenLineArr = StickyendArr = [];

var txt_array1 = [];

var line2 = new createjs.Shape();

function directiveFunction() {
	return {
		restrict: "A",
		link: function( scope, element, attrs ) {
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if ( element[ 0 ].width > element[ 0 ].height ) {
				element[ 0 ].width = element[ 0 ].height;
				element[ 0 ].height = element[ 0 ].height;
			} else {
				element[ 0 ].width = element[ 0 ].width;
				element[ 0 ].height = element[ 0 ].width;
			}
			if ( element[ 0 ].offsetWidth > element[ 0 ].offsetHeight ) {
				element[ 0 ].offsetWidth = element[ 0 ].offsetHeight;
			} else {
				element[ 0 ].offsetWidth = element[ 0 ].offsetWidth;
				element[ 0 ].offsetHeight = element[ 0 ].offsetWidth;
			}
			exp_canvas = document.getElementById( "demoCanvas" );
			exp_canvas.width = element[ 0 ].width;
			exp_canvas.height = element[ 0 ].height;
			restriction_digestion_stage = new createjs.Stage( "demoCanvas" );
			split_container1 = new createjs.Container();
			split_container2 = new createjs.Container();
			queue = new createjs.LoadQueue( true );
			/** Preloading the images */
			queue.loadManifest( [ {
				id: "background",
				src: "././images/background.svg",
				type: createjs.LoadQueue.IMAGE
            }, {
				id: "line",
				src: "././images/line.svg",
				type: createjs.LoadQueue.IMAGE
            }, {
				id: "scissors",
				src: "././images/scissors.svg",
				type: createjs.LoadQueue.IMAGE
            }, {
				id: "line_half",
				src: "././images/line_half.svg",
				type: createjs.LoadQueue.IMAGE
            } ] );
			queue.on( "complete", handleComplete, this );
			loadingProgress( queue, restriction_digestion_stage, exp_canvas.width );
			restriction_digestion_stage.enableDOMEvents( true );
			restriction_digestion_stage.enableMouseOver();
			createjs.Touch.enable( restriction_digestion_stage );
			function handleComplete( scope ) {
				/** Loading images, text and containers */
				loadImages( queue.getResult( "background" ), "background", 0, 0, "", restriction_digestion_stage );
				for ( var i = 0; i < 15; i++ ) { //strants				
					loadImages( queue.getResult( "line" ), "line", ( i + 1 ) * 43, 208, "", restriction_digestion_stage );
				}
				loadImages( queue.getResult( "scissors" ), "scissors", 0, 0, "move", restriction_digestion_stage );
				getChild( "scissors" ).x = 610;
				getChild( "scissors" ).y = 560;
				initialisationOfVariables( scope ); /** Initializing the variables */
				translationLabels(); /** Translation of strings using gettext */
				/**create initial pattern top and bottom sequence*/
				makeFirstSequence();
				makeSecondSequence();
				/**draw the static rect on the top and bottom of the lines*/
				drawStaticRect();	
				//drag the scissor to cut				
				dragScissors( getChild( "scissors" ), scope );
				restriction_digestion_stage.update();
			}
			/** Add all the strings used for the language translation here. '_' is the short cut for calling 
			the gettext function defined in the gettext-definition.js */
			function translationLabels() {
				/** This help array shows the hints for this experiment */
				help_array = [ _( "help1" ), _( "help2" ), _( "help3" ), _( "help4" ), _( "Next" ), _( "Close" ) ];
				scope.heading = _( "Restriction Digestion" );
				scope.variables = _( "Variables" );
				scope.copyright = _( "copyright" );
				scope.reset_txt = _( "Reset" );
				scope.recognition_sequence = _("Recognitionsequence");
				scope.restriction_enzyme = _("Restrictionenzyme");
				scope.enzyme = [ {
					name: 'Eco RI',
					index: 0
                }, {
					name: 'BamHI',
					index: 1
                }, {
					name: 'BglII',
					index: 2
                }, {
					name: 'PvuII',
					index: 3
                }, {
					name: 'HindIII',
					index: 4
                }, {
					name: 'Sau3A',
					index: 5
                }, {
					name: 'AluI',
					index: 6
                }, {
					name: 'TaqI',
					index: 7
                }, {
					name: 'HaeIII',
					index: 8
                }, {
					name: 'NotI',
					index: 9
                } ];
				/**initial display of pattern in menu*/
				scope.first_sequence = txtSequenceText1 = s1 = SequenceArr[ 0 ][ 0 ];
				scope.second_sequence = txtSequenceText2 = s2 = SequenceArr[ 0 ][ 1 ];
				scope.blunt_sticky_label = txtSequenceText3 = StickyendArr[ 0 ];				
				scope.$apply();				
				restriction_digestion_stage.update();
			}
		}
	}
	restriction_digestion_stage.update();
}
drawRect = function( x, y, wid, hei, color_code, rect_name, container ) {
	var shape = new createjs.Shape();
	shape.graphics.beginFill( color_code ).drawRect( 0, 0, wid, hei );
	shape.x = x;
	shape.y = y;
	shape.name = rect_name;
	container.addChild( shape );
	stage_all_children.push( shape )
	box_array.push( shape );
	restriction_digestion_stage.update();
};
/** All the images loading and added to the natural_convection_stage */
function loadImages( image, name, xPos, yPos, cursor, container ) {
	var _bitmap = new createjs.Bitmap( image ).set( {} );
	_bitmap.x = xPos;
	_bitmap.y = yPos;
	_bitmap.name = name;
	_bitmap.cursor = cursor;
	if ( name != "scissors" && name != "background" ) {
		stage_all_children.push( _bitmap );
	}
	container.addChild( _bitmap ); /** Adding bitmap to the container */
	restriction_digestion_stage.update();
}
/** All variables initialising in this function used for load and reset*/
function initialisationOfVariables( scope ) {
	CharArr = [ "A", "C", "G", "T" ];
	EnzymeArr = [ "Eco RI", "BamHI", "BglII", "PvuII", "HindIII", "Sau3A", "AluI", "TaqI", "HaeIII", "NotI" ];
	SequenceArr = [
	[ "GAATTC", "CTTAAG" ],
	[ "GGATCC", "CCTAGG" ],
	[ "AGATCT", "TCTAGA" ],
	[ "CAGCTG", "GTCGAC" ],
	[ "AAGCTT", "TTCGAA" ],
	[ "GATC", "CTAG" ],
	[ "AGCT", "TCGA" ],
	[ "TCGA", "AGCT" ],
	[ "GGCC", "CCGG" ],
	[ "GCGGCCGC", "CGCCGGCG" ]
	];
	StickyendArr = [ _("Sticky end"),  _("Sticky end"),  _("Sticky end"), _("Blunt end"),  _("Sticky end"),  _("Sticky end"), _("Blunt end"),  _("Sticky end"), _("Blunt end"),  _("Sticky end") ];
	/**initial menu display*/
	scope.first_sequence = txtSequenceText1 = SequenceArr[ 0 ][ 0 ];
	scope.second_sequence = txtSequenceText2 = SequenceArr[ 0 ][ 1 ];
	scope.blunt_sticky_label = txtSequenceText3 = StickyendArr[ 0 ];
	split_container1.x = split_container2.x = 0;
	split_container1.y = split_container2.y = -90;
	total = 30;
	s1 = s2 = string = "";
	dna_cut_count = 4;
	child_count_container1 = startpos = 0
	cut_flag = lineFlag = false;
	selected_enzyme = "Eco RI"
	makeFirstSequence();
	makeSecondSequence();
	loadLetters();
	restriction_digestion_stage.update();
}
/**function call fro drawing dynamic rect*/
drawStaticRect = function(){
	drawRect( 0, 190, 700, 35, "#f2a80f", "top_rect", restriction_digestion_stage ); //rect1 orange
	drawRect( 0, 460, 700, 35, "#f2a80f", "btm_rect", restriction_digestion_stage ); //rect2 orange	
	setText( "5'", 20, 215 );
	setText( "3'", 665, 215 );
	setText( "3'", 20, 485 );
	setText( "5'", 665, 485 );
}

dragScissors = function( scissors, scope ) {
	scissors.on( "mousedown", function( evt ) {
		this.parent.addChild( this );
		this.offset = {
			x: this.x - evt.stageX / restriction_digestion_stage.scaleX,
			y: this.y - evt.stageY / restriction_digestion_stage.scaleY
		};
	} );
	scissors.on( "pressmove", function( evt ) {
		this.x = ( evt.stageX / restriction_digestion_stage.scaleX ) + this.offset.x;
		this.y = ( evt.stageY / restriction_digestion_stage.scaleY ) + this.offset.y;
		scissors.x = this.x;
		scissors.y = this.y;
		if ( !cut_flag ) {
			/**check sissors hit on the greenline*/
			checkSissorsHit( evt,scissors, scope );
		}
		restriction_digestion_stage.update();
	} );
	scissors.on( "pressup", function( evt ) {
		getChild( "scissors" ).x = 610;
		getChild( "scissors" ).y = 560;
		dragScissors( getChild( "scissors" ), scope );
	} );
	scissors.on( "mouseup", function( evt ) {
		getChild( "scissors" ).x = 610;
		getChild( "scissors" ).y = 560;
		dragScissors( getChild( "scissors" ), scope );
	} );
	restriction_digestion_stage.update();
}

	/** Function to return child element of stage */
getChild = function( child_name ) {
	return restriction_digestion_stage.getChildByName( child_name ); /** Returns the child element of stage */
}

//text display on the colored boxes
setText = function( text, x, y ) {
	var _txt = new createjs.Text( "", "25px Arial", "#ffffff" );
	_txt.x = x;
	_txt.y = y;
	_txt.textBaseline = "alphabetic";
	_txt.text = text;
	restriction_digestion_stage.addChild( _txt );
	stage_all_children.push( _txt )
	restriction_digestion_stage.update();
}
resetExperiment = function() {
	windows.reload();
}