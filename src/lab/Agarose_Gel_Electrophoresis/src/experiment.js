/** Dropdown list of agarose function */
function agaroseExperiment(scope){
	(scope.agaroseModel > 0)?scope.dna_disable = false:scope.dna_disable = true;
	agarose_gel_stage.update();
}
/** Dropdown list of DNA function */
function dnaExperiment(scope) {
	if ( scope.dnaModel > 0 ) {		
		marker = scope.marker_num = scope.markerNum = 0; /** Setting the slider value to the label variable */
		scope.marker_disable = false; /** Enables the marker slider */
		scope.control_disable = true; /** Disables all well dropdown list */
		scope.startsimulator_disable = true; /** Disables the start simulator button */
		scope.well1Model = scope.well2Model = scope.well3Model = scope.well4Model = scope.well5Model = 0;
		scene1_container.getChildByName("blue_rect1").visible = false; /** Blue_rect1 invisible in scene1_container */
		/** Check whether the dropdown in well_array1 or well_array2 */
		(scope.dnaModel == 1)?scope.well_array = well_array[0]:scope.well_array = well_array[1];
		(scope.dnaModel == 1)?selected_dna_array = array1:selected_dna_array = array2;
	} else {
		scope.marker_disable = true;		
	}	
	agarose_gel_stage.update();
}
/** Function for marker slider */
function markerExperiment(scope) {	
	marker = scope.marker_num = scope.markerNum; /** Setting the slider value to the label variable */
	if ( scope.markerNum > 0 ) {		
		scope.control_disable = false; /** Enables the well dropdown list and start simulator */
		scope.startsimulator_disable = false;
		scope.dna_disable = true;
		scope.agarose_disable = true;
		selected_well.push(1); /** Push the object of well1 */
		scene1_container.getChildByName("blue_rect1").visible = true; /** Blue_rect1 visible in scene1_container */
		scene2_container.getChildByName("blue_rect_big1").alpha = 1; /** Blue_rect_big1 visible in scene2_container */
	} else {		
		scope.control_disable = true; /** Disables the well dropdown list and start simulator */
		scope.startsimulator_disable = true;
		scene1_container.getChildByName("blue_rect1").visible = false; /** Blue_rect1 invisible in scene1_container */
	}	
	agarose_gel_stage.update();
}
/** Drop down list of well1 function */
function changeWell1Fn(scope) {
	diff_array1 = [];
	scene1_container.getChildByName("blue_rect2").visible = true; /** Blue_rect2 visible in scene1_container */
	scene2_container.getChildByName("blue_rect_big2").alpha = 1; /** Blue_rect_big2 visible in scene2_container */
	selectedenzyme = scope.well1Model; /** Initialise the value of each dropdown in well1 to a new variable selectedenzyme */
	selected_well.push(2); /** Push the object of well2 */
	fillcalcArray(selectedenzyme, diff_array1, scope, 1);	
	agarose_gel_stage.update();
}
/** Drop down list of well2 function */
function changeWell2Fn(scope) {
	diff_array2 = [];
	scene1_container.getChildByName("blue_rect3").visible = true; /** Blue_rect3 visible in scene1_container */
	scene2_container.getChildByName("blue_rect_big3").alpha = 1; /** Blue_rect_big3 visible in scene2_container */
	selectedenzyme = scope.well2Model; /** Initialise the value of each dropdown in well2 to a new variable selectedenzyme */
	selected_well.push(3); /** Push the object of well3 */
	fillcalcArray(selectedenzyme, diff_array2, scope, 2);	
	agarose_gel_stage.update(); 
}
/** Drop down list of well3 function */
function changeWell3Fn(scope) {
	diff_array3 = [];
	scene1_container.getChildByName("blue_rect4").visible = true; /** Blue_rect4 visible in scene1_container */
	scene2_container.getChildByName("blue_rect_big4").alpha = 1; /** Blue_rect_big4 visible in scene2_container */
	selectedenzyme = scope.well3Model; /** Initialise the value of each dropdown in well3 to a new variable selectedenzyme */
	selected_well.push(4); /** Push the object of well4 */
	fillcalcArray(selectedenzyme, diff_array3, scope, 3);
	agarose_gel_stage.update();
}
/** Drop down list of well4 function */
function changeWell4Fn(scope) {
	diff_array4 = [];
	scene1_container.getChildByName("blue_rect5").visible = true; /** Blue_rect5 visible in scene1_container */
	scene2_container.getChildByName("blue_rect_big5").alpha = 1; /** Blue_rect_big5 visible in scene2_container */
	selectedenzyme = scope.well4Model; /** Initialise the value of each dropdown in well4 to a new variable selectedenzyme */
	selected_well.push(5); /** Push the object of well5 */
	fillcalcArray(selectedenzyme, diff_array4, scope, 4);	
	agarose_gel_stage.update();
}
/** Drop down list of well5 function */
function changeWell5Fn(scope) {
	diff_array5 = [];
	scene1_container.getChildByName("blue_rect6").visible = true; /** Blue_rect6 visible in scene1_container */
	scene2_container.getChildByName("blue_rect_big6").alpha = 1; /** Blue_rect_big6 visible in scene2_container */
	selectedenzyme = scope.well5Model; /** Initialise the value of each dropdown in well5 to a new variable selectedenzyme */		
	selected_well.push(6); /** Push the object of well6 */
	fillcalcArray(selectedenzyme, diff_array5, scope, 5);
	agarose_gel_stage.update();
}
/** Function for creating rectangles */
function createRect(rect, x_val, y_val, container, color) {
	var blue_rect = new createjs.Shape();
    blue_rect.graphics.beginFill(color).drawRect(x_val, y_val, 31, 12);
    blue_rect.alpha = 0.01; /** Initially set the alpha as 0.01 */
    blue_rect.x = x_val; /** Value for x-axis */
    blue_rect.y = y_val; /** Value for y-axis */
	blue_rect.name = rect;
	blue_rect.mask = wells_symbols_mask_rect;
	container.addChild(blue_rect); /** Adding rect to the container */
	agarose_gel_stage.update(); /** Stage update */
}
/** Function for creating duplicate rectangles */
function createRect_dup(rect, x_val, y_val, container, well_name) {
	var blue_rect_big = new createjs.Shape();
    blue_rect_big.graphics.beginStroke("yellow").beginFill("lightyellow").drawRect(x_val, y_val, 31, 12);
    blue_rect_big.alpha = 0.01; 
    blue_rect_big.x = x_val; /** Value for x-axis */
    blue_rect_big.y = y_val; /** Value for y-axis */
	blue_rect_big.name = rect;	
	blue_rect_big.mask = wells_symbols_mask_rect;
	/** Push all well object to corresponding blue_rect_dup_array */
	switch ( well_name ) {
		case 1:
			blue_rect_dup_array1.push(blue_rect_big);
			break;
		case 2:
			blue_rect_dup_array2.push(blue_rect_big);
			break;
		case 3:
			blue_rect_dup_array3.push(blue_rect_big);
			break;
		case 4:
			blue_rect_dup_array4.push(blue_rect_big);
			break;
		case 5:
			blue_rect_dup_array5.push(blue_rect_big);
			break;
	}
	container.addChild(blue_rect_big); /** Adding rect to the container */
	agarose_gel_stage.update(); /** Stage update */
}
/** Function to calculate the weight of marker */
function movedownCalc() {
    movedownweightCalc(diff_array1, 2);
	movedownweightCalc(diff_array2, 3);
	movedownweightCalc(diff_array3, 4);
	movedownweightCalc(diff_array4, 5);	
	movedownweightCalc(diff_array5, 6);	
	/** Calculated the marker_weight = marker*1000, where marker is the slider value of label variable, 1000 is constant value */
	marker_weight = marker*1000;
	/** Calculated the marker_time = TIME_WEIGHT1+(marker_weight-1)*distance, where TIME_WEIGHT1 is the constant value 0.03 */
	marker_time = (TIME_WEIGHT1+(marker_weight-1)*distance);
	/** Calculated the marker_speed = MAX_HEIGHT/marker_time, where MAX_HEIGHT is the constant value 350 */
	marker_speed = MAX_HEIGHT/marker_time;
	marker_id = setInterval(movedown_marker, 1000, marker_speed, ("blue_rect_big"));
}
/** Function to move down the marker obj */
function movedown_marker(marker_speed, blue_rect_big, marker_id) {	
	scene2_container.getChildByName("blue_rect_big1").y += marker_speed; /** Move down the marker based on marker_speed */
	agarose_gel_stage.update();	
}
/** Function to calculate the weight of each well */
function movedownweightCalc(diff_array, obj) {	
	for ( var i=0; i<diff_array.length; i++ ) {		
		well_weight = diff_array[i]; /** Corresponding weight of each dropdown is assigned to the  variable well_weight */ 		
		/** Calculated the well_time=(TIME_WEIGHT1+(well_weight[i]*distance)), where TIME_WEIGHT1 is the constant value 0.03,
		well_weight is the weight of corresponding well, and distance is calculated by (TIME_WEIGHT2-TIME_WEIGHT1)/9999 */
		well_time = (TIME_WEIGHT1+((well_weight-1)*distance));	
		well_speed = (MAX_HEIGHT/well_time); /** Distance to move for one setinterval i.e (total_distance/time) */
		speed_array.push(well_speed)
		well_id = setInterval(movedown, 1000, well_speed, obj,speed_array);
	}
}
/** Function to move down the well's based on the corresponding weight */
function movedown(well_speed, obj,array) {
	scene2_container.getChildByName("blue_rect_big"+obj).y += well_speed;
	if ( scene2_container.getChildByName("blue_rect_big"+obj).y >= 395 ) {
		scene2_container.getChildByName("blue_rect_big"+obj).alpha = 0;
	}
	duplicateMovement(blue_rect_dup_array1, array, obj);
	duplicateMovement(blue_rect_dup_array2, array, obj);
	duplicateMovement(blue_rect_dup_array3, array, obj);
	duplicateMovement(blue_rect_dup_array4, array, obj);
	duplicateMovement(blue_rect_dup_array5, array, obj);
	agarose_gel_stage.update();
}
/** Duplicate rects movement function */
function duplicateMovement(dup_array, array, obj) {
	var rand = Math.floor((Math.random() * 20) + 1);
	for ( i=0; i<dup_array.length; i++ ) {
		dup_array[i].y += array[i];
		if ( dup_array[i].y > scene2_container.getChildByName("blue_rect_big"+obj).y ) {
			dup_array[i].y = scene2_container.getChildByName("blue_rect_big"+obj).y-rand;
		}
	}
}
/** Function to fillcalcArray */
function fillcalcArray(selectedenzyme, diff_array, scope, well) {	
	split = selected_dna_array[3][selectedenzyme-1].split("~"); /** Corresponding weight of each dropdown is assigned to the  variable split */
	/** Corresponding weight of each well is assigned to different diff_array */ 
	for ( var i=0; i<split.length; i++ ) {
		/** Duplicate rects creating */
		diff_array.push(split[i]);
		createRect_dup("duplicate_rect"+i, scene2_container.getChildByName("blue_rect_big"+(well+1)).x, 65, scene2_container, well);
	}
}

