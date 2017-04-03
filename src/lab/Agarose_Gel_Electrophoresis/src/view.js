(function() {
    angular
        .module('users')
        .directive("experiment", directiveFunction)
})();

var agarose_gel_stage, exp_canvas; 
var marker, startFlag, powerFlag, turnFlag, startsimulator_var, poweron_var, selectedenzyme;
var TIME_WEIGHT1, TIME_WEIGHT2, MAX_HEIGHT, MAX_LENGTH;
var distance, marker_speed, well_speed, marker_weight, well_weight, marker_time, well_time, marker_id, well_id;
var scene1_container, scene2_container, split;

/** Arrays declarations */
var diff_array1 = diff_array2 = diff_array3 = diff_array4 = diff_array5 = []; 
var array1 = array2 = well_array = speed_array = selected_dna_array = [];
var blue_rect_dup_array1 = blue_rect_dup_array2 = blue_rect_dup_array3 = blue_rect_dup_array4 = blue_rect_dup_array5 = blue_rect_dup_array6 = [];
var selected_well = [];

var blue_rect_big1 = new createjs.Shape();
var blue_rect_big2 = new createjs.Shape();
var blue_rect_big3 = new createjs.Shape();
var blue_rect_big4 = new createjs.Shape();
var blue_rect_big5 = new createjs.Shape();
var blue_rect_big6 = new createjs.Shape();
var yellow_rect_big1 = new createjs.Shape();
var yellow_rect_big2 = new createjs.Shape();
var yellow_rect_big3 = new createjs.Shape();
var yellow_rect_big4 = new createjs.Shape();
var yellow_rect_big5 = new createjs.Shape();
var yellow_rect_big6 = new createjs.Shape();
var wells_symbols_mask_rect = new createjs.Shape();

/** Createjs shapes declarations */
function directiveFunction() {
    return {
        restrict: "A",
        link: function(scope, element, attrs, dialogs) {
            /** Variable that decides if something should be drawn on mouse move */
            var experiment = true;
            if (element[0].width > element[0].height) {
                element[0].width = element[0].height;
                element[0].height = element[0].height;
            } else {
                element[0].width = element[0].width;
                element[0].height = element[0].width;
            }
            if (element[0].offsetWidth > element[0].offsetHeight) {
                element[0].offsetWidth = element[0].offsetHeight;
            } else {
                element[0].offsetWidth = element[0].offsetWidth;
                element[0].offsetHeight = element[0].offsetWidth;
            }
            exp_canvas = document.getElementById("demoCanvas");
            exp_canvas.width = element[0].width;
            exp_canvas.height = element[0].height;

            /** Initialisation of stage */
            agarose_gel_stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);       
			/** Preloading the images */
			queue.loadManifest([{
				id: "scene1",
				src: "././images/scene1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scene1_1",
				src: "././images/scene1_1.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "blue_rect",
				src: "././images/blue_rect.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scene2",
				src: "././images/scene2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "scene2_2",
				src: "././images/scene2_2.svg",
				type: createjs.LoadQueue.IMAGE
			}, {
				id: "green_shade",
				src: "././images/green_shade.svg",
				type: createjs.LoadQueue.IMAGE
			}]);
                   
            queue.on("complete", handleComplete, this);            
            loadingProgress(queue,agarose_gel_stage,exp_canvas.width);            
            agarose_gel_stage.enableDOMEvents(true);
            agarose_gel_stage.enableMouseOver();
            createjs.Touch.enable(agarose_gel_stage);
			
			scene1_container = new createjs.Container(); /** Creating the scene1 container */
			scene1_container.name = "scene1_container";
			agarose_gel_stage.addChild(scene1_container); /** Append it in the stage */			

			scene2_container = new createjs.Container(); /** Creating the scene2 container */
			scene2_container.name = "scene2_container";
			agarose_gel_stage.addChild(scene2_container); /** Append it in the stage */			
      			
            function handleComplete() { 
                /** Loading images, text and containers */
				loadImages(queue.getResult("scene1"), "scene1", 0, 0, "", scene1_container);
				loadImages(queue.getResult("scene1_1"), "scene1_1", 0, 0, "", scene1_container);
				loadImages(queue.getResult("scene2"), "scene2", 0, 0, "", scene2_container);
				loadImages(queue.getResult("green_shade"), "green_shade", 0, 0, "", scene2_container);
				loadImages(queue.getResult("scene2_2"), "scene2_2", 0, 0, "", scene2_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect1", 480, 386, "", scene1_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect2", 505, 386, "", scene1_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect3", 530, 386, "", scene1_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect4", 553, 386, "", scene1_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect5", 578, 386, "", scene1_container);
				loadImages(queue.getResult("blue_rect"), "blue_rect6", 600, 386, "", scene1_container);
				/** Creating blue rects for each well and marker */
				createRect("blue_rect_big1", 103, 62, scene2_container,"darkblue");
				createRect("blue_rect_big2", 128.5, 62, scene2_container,"darkblue");
				createRect("blue_rect_big3", 154, 62, scene2_container,"darkblue");
				createRect("blue_rect_big4", 179.5, 62, scene2_container,"darkblue");
				createRect("blue_rect_big5", 205, 62, scene2_container,"darkblue");
				createRect("blue_rect_big6", 230.5, 62, scene2_container,"darkblue");
				/** Creating yellow rects for each well and marker */
				createRect("yellow_rect_big1", 103, 62, scene2_container,"lightyellow");
				createRect("yellow_rect_big2", 128.5, 62, scene2_container,"lightyellow");
				createRect("yellow_rect_big3", 154, 62, scene2_container,"lightyellow");
				createRect("yellow_rect_big4", 179.5, 62, scene2_container,"lightyellow");
				createRect("yellow_rect_big5", 205, 62, scene2_container,"lightyellow");
				createRect("yellow_rect_big6", 230.5, 62, scene2_container,"lightyellow");
				/** Rect for masking the duplicates */
				wells_symbols_mask_rect.graphics.beginStroke("white").beginFill("white").drawRect(200, 120, 300, 360);
			    wells_symbols_mask_rect.alpha = 0.01; /** Initially set the alpha as 0.01 */
				scene2_container.addChild(wells_symbols_mask_rect); /** Adding rect to the container */
                initialisationOfVariables(scope); /** All variables initialising in this function */                
                initialisationOfImages(); /** Function call for images used in the apparatus visibility */                
                initialisationOfControls(scope); /** Function call for the initial value of the controls */                
                translationLabels(); /** Translation of strings using gettext */
			}

            /** Add all the strings used for the language translation here. '_' is the short cut for 
            calling the gettext function defined in the gettext-definition.js */
            function translationLabels() { 
                /** This help array shows the hints for this experiment */
                help_array = [_("help1"), _("help2"), _("help3"), _("help4"), _("help5"), _("help6"), _("help7"), _("help8"), _("help9"), _("help10"), _("Next"), _("Close")];
                scope.heading = _("Agarose Gel Electrophoresis (AGE)");
                scope.variables = _("Variables");
				scope.copyright = _("copyright");
				scope.concentration_of_agarose = _("Concentration(%) of Agarose:");
				scope.select_gel = _("Select Gel%");
				scope.select_dna = _("Select DNA:");
				scope.select_enzyme = _("Select Enzyme");
				scope.marker = _("Marker");
				scope.kilobyte = _("kb");
				scope.well1_txt = _("Well 1");
				scope.well2_txt = _("Well 2");
				scope.well3_txt = _("Well 3");
				scope.well4_txt = _("Well 4");
				scope.well5_txt = _("Well 5");
				scope.startsimulator_txt = startsimulator_var = _("Start Simulator");
				resetsimulator_var = _("Reset Simulator");			
				scope.poweron_txt = poweron_var = _("Turn Power ON");
				poweroff_var = _("Turn Power OFF");	
				scope.turnon_txt = turnon_var = _("Turn ON UV");
				turnoff_var = _("Turn OFF UV");				
				scope.cntrol_disable = true;
                scope.agarose_array = [{				
                    agarose: '0.6',
                    type: 1,
                    index: 0	
                }, {
                    agarose: '0.7',
                    type: 2,
                    index: 1
                }, {
                    agarose: '0.9',
                    type: 3,
                    index: 2
                }, {
                    agarose: '1.2',
                    type: 4,
                    index: 3
                }, {
                    agarose: '1.5',
					type: 5,
					index: 4
                }, {
                    agarose: '2',
					type: 6,
					index: 5
                }];
				
				scope.dna_array = [{				
                    dna: 'pBR322',
                    type: 1,
                    index: 0	
                }, {
                    dna: 'puC19',
                    type: 2,
                    index: 1
                }];

				well_array = [[
				{	
					well: 'EcoR1',
                    type: 1,
                    index: 0	     
                }, {
                    well: 'Acc 161',
                    type: 2,
                    index: 1	
                }, {
                    well: 'Afe 1',
                    type: 3,
                    index: 2
                }, {
                    well: 'Eco47III',
                    type: 4,
                    index: 3
                }, {
                    well: 'EcoRII',
                    type: 5,
                    index: 4
                }],
				[
				{
					well: 'BamH1',
                    type: 1,
                    index: 0	     
                }, {
                    well: 'EcoR1',
                    type: 2,
                    index: 1	
                }, {
                    well: 'AvaII',
                    type: 3,
                    index: 2
                }, {
                    well: 'BstNI',
                    type: 4,
                    index: 3
                }
				]];
				scope.well_array = well_array[0];
				scope.$apply();
				agarose_gel_stage.update(); /** Stage update */
            }
        }
    }
	agarose_gel_stage.update();
}
/** All the images loading and added to the natural_convection_stage */
function loadImages(image, name, xPos, yPos, cursor, container) {
    var _bitmap = new createjs.Bitmap(image).set({});
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.name = name;
    _bitmap.cursor = cursor;
    container.addChild(_bitmap); /** Adding bitmap to the container */
	agarose_gel_stage.update();
}
/** Function to return child element of stage */
function getChild(child_name) {
	return agarose_gel_stage.getChildByName(child_name); /** Returns the child element of stage */
}
/** All variables initialising in this function */
function initialisationOfVariables(scope) {
	marker = 0
	scene1_container.alpha = 1; /** Initially displayed the scene1 container */
	scene2_container.alpha = 0; /** Scene2 container is not displayed initially */	
	startFlag = powerFlag = turnFlag = agaroseFlag = false; /** Set the flag false */	
	TIME_WEIGHT1 = 0.03; /** Constant variables */
	TIME_WEIGHT2 = 8000;
	MAX_HEIGHT = 530;
	MAX_LENGTH = 480;	
	distance = (TIME_WEIGHT2-TIME_WEIGHT1)/9999; /** Equation is used to find the distance of each well */
	array1 = [["pBR322","Circular","4362"], ["EcoR1","Acc161","Afe1","Eco47III","EcoRII"], ["1","4","4","4","6"], ["4359","262~1358~1456~3588","234~496~777~1729","232~494~775~1727","130~1059~1442~2500~2621~2634"]];
	array2 = [["puC19","Circular","2686"], ["BamH1","EcoR1","AvaII","BstNI"], ["1","1","2","5"], ["396","417","1837~2059","354~545~954~833~967"]];
	agarose_gel_stage.update();
}
/** Initialisation of all controls */
function initialisationOfControls(scope) {
	scope.marker_num = scope.markerNum = 0;
	scope.startsimulator_txt = startsimulator_var;
	scope.poweron_txt = poweron_var;
	scope.agaroseModel = scope.dnaModel = scope.well1Model = scope.well2Model = scope.well3Model = scope.well4Model = scope.well5Model = 0;
	scope.control_disable = scope.dna_disable = scope.marker_disable = true;
	scope.startsimulator_disable = scope.poweron_disable = scope.turnon_disable = true;
	scope.agarose_disable = false;
}
/** Set the initial status of the images and text depends on its visibility and initial values */
function initialisationOfImages(scope) {	
	for ( var i=1; i<=6; i++ ) { /** Set initial visibility of 6 blue rectangle as false */
		scene1_container.getChildByName("blue_rect"+i).visible = false;		
		scene2_container.getChildByName("blue_rect_big"+i).y =62;	
	}
	scene2_container.getChildByName("green_shade").visible = false;	
	agarose_gel_stage.update();
}
/** Function for start/reset the experiment. Emulate the simulator by clicking start/reset the button. */
function startExperiment(scope) {	
	if ( startFlag ) { /** When we switch off the button */		
		startFlag = false;
		scope.startsimulator_txt = startsimulator_var;
		scope.poweron_disable = true;	
		resetExperiment(scope);		
	} else { /** When we switch on the button */
		scene1_container.alpha = 0; /** Hiding the scene1 container */
		scene2_container.alpha = 1; /** Displaying the scene2 container */
		blue_rect_big1.alpha = 1;
		startFlag = true;	
		scope.startsimulator_txt = resetsimulator_var;	
		scope.poweron_disable = false;
		scope.agarose_disable = scope.control_disable = scope.dna_disable = scope.marker_disable = true;	
	}				
	agarose_gel_stage.update();
}
/** Function for power on/off the experiment. Emulate the simulator by clicking power on/off the button. */
function poweronExperiment(scope) {
	if ( powerFlag ) { /** When we switch off the button */
		powerFlag = false;
		scope.poweron_txt = poweron_var;
		scope.turnon_disable = false;
		clearInterval(marker_id); /** Clear interval of the well marker */		
		for ( var i=1; i< 9999; i++ ) {
			window.clearInterval(i); /** Clear interval all five well's */
		}
	} else { /** When we switch on the button */		
		powerFlag = true;	
		movedownCalc(); /** Function for marker value calculations */
		scope.poweron_txt = poweroff_var;	
		scope.turnon_disable = true;	
		for ( var i=0; i<selected_well.length; i++ ) { /** Set the alpha value 0.5 in each well of scene2_container */
			if ( scene2_container.getChildByName("blue_rect_big"+selected_well[i]).y < 395 ) { /** Blue rects needs to visibile in between a static y range */
				scene2_container.getChildByName("blue_rect_big"+selected_well[i]).alpha = 0.5;
			}
		}
	}
	agarose_gel_stage.update();
}
/** Function for turn on/off the experiment. Emulate the simulator by clicking turn on/off the button. */
function turnonExperiment(scope) {
	if ( turnFlag ) { /** When we switch off the button */		
		turnFlag = false;
		scope.turnon_txt = turnon_var;
		scope.poweron_disable = false;	
		scene2_container.getChildByName("green_shade").visible = false;	
		for ( var i=0; i<selected_well.length; i++ ) {	
			scene2_container.getChildByName("blue_rect_big"+selected_well[i]).visible = true;
			scene2_container.getChildByName("yellow_rect_big"+selected_well[i]).visible = false;	
		}
		duplicationRectVisibility("blue_rect_big2", blue_rect_dup_array1, 0); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big3", blue_rect_dup_array2, 0); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big4", blue_rect_dup_array3, 0); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big5", blue_rect_dup_array4, 0); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big6", blue_rect_dup_array5, 0); /** Duplication rects visibility function */
	} else { /** When we switch on the button */		
		turnFlag = true;	
		scope.turnon_txt = turnoff_var;
		scope.poweron_disable = true;
		scene2_container.getChildByName("green_shade").visible = true;
		for ( var i=0; i<selected_well.length; i++ ) {
			scene2_container.getChildByName("blue_rect_big"+selected_well[i]).visible = false;
			scene2_container.getChildByName("yellow_rect_big"+selected_well[i]).visible = true;
			scene2_container.getChildByName("yellow_rect_big"+selected_well[i]).alpha = 1;
			scene2_container.getChildByName("yellow_rect_big"+selected_well[i]).y = scene2_container.getChildByName("blue_rect_big"+selected_well[i]).y;
		}

		duplicationRectVisibility("blue_rect_big2", blue_rect_dup_array1, 1); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big3", blue_rect_dup_array2, 1); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big4", blue_rect_dup_array3, 1); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big5", blue_rect_dup_array4, 1); /** Duplication rects visibility function */
		duplicationRectVisibility("blue_rect_big6", blue_rect_dup_array5, 1); /** Duplication rects visibility function */
	}
	agarose_gel_stage.update();
}
/** Duplication rects visibility function */
function duplicationRectVisibility(blue_rect, array, val) {
	for ( i=0; i<array.length; i++ ) {
		array[i].alpha = val;
	}	
}
/** Reset the experiment in the reset button event */
function resetExperiment(scope) {
	window.location.reload();
}