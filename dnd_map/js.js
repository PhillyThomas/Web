//==============================================
//
//
//
//
//==============================================
var col = 1;
var row = 1;
var relX;
var relY;
const zoomFactor = 0.1;
var relBoxCoords;
var curZoom = 1;
const mapGridVisible = true;
var AOI_coords = [];
var AOI_current;


//==============================================
//Build the AOI_coords array so it can be used
//to populate the gridMap grid
//==============================================
for(i=0; i<AOI.length; i++){
	var homeCoords = AOI[i].start.split("-");
	for(p=0; p<AOI[i].height; p++){
		for(o=0; o<AOI[i].width; o++){
			AOI_coords.push(`${parseInt(homeCoords[0]) + o}-${parseInt(homeCoords[1]) + p}^${i}`);
		}
	}
}

//==============================================
// For each grid zone (5,625 [75*75]) determine
// whether it is a town, dungeon, or unknown
//==============================================
for(i=0; i<5625; i++){

	// Initialise string split to gather cell information
	var nameSplit;

	// Search "AOI" array for the coordinates starting at 1-1
	var AOI_Index = AOI.findIndex(x => x.start == `${col}-${row}`);
	if (AOI_Index >= 0){
		// if the coordinates are found, store the index in AOI_current
		AOI_current = AOI[AOI_Index].name;
	}

	// Add the cell as a div inside #mapGrid
	// If "mapGridActive" is true, add class to draw top and left borders
	$('#mapGrid').append(`<div id="${col}-${row}" class="${mapGridVisible ? 'mapGridPlot mapGridActive' : 'mapGridPlot'}"></div>`);

	// search AOI_coords for "col-row", store index in result
	var result = AOI_coords.filter(function(item){
		return typeof item == 'string' && item.indexOf(`${col}-${row}`) > -1;            
	});

	// if above search was successful, split the name string and store in nameSplit
	if(result.length > 0){
		nameSplit = result[0].split("^");

		// double check that "col-row" is an exact match for the search result
		// This removes false positives, e.g;
		// "1-1" returning true for "21-14" etc
		if(nameSplit[0] == `${col}-${row}`){

			// Add class "POI" for hover effects, and to power the "on-click" functions below
			$(`#${col}-${row}`).addClass('POI');

			// Add a class to determine the type of POI that cell should be
			// 1) town
			// 2) dungeon
			// 3) unknown
			switch(AOI[nameSplit[1]].type){
				case "town":
					$(`#${col}-${row}`).addClass('POI_town');
					break;
				case "dungeon":
					$(`#${col}-${row}`).addClass('POI_dungeon');
					break;
				case "unknown":
					$(`#${col}-${row}`).addClass('POI_unknown');
					break;
			}
			
			// Set the ID of the div to be the col-row^name
			$(`#${col}-${row}`).attr('id',`${col}-${row}^${nameSplit[1]}`);
		}
	} else {
		// Failsafe - clear nameSplit array to prevent false positives
		nameSplit = [];
	}

	// Once the loop has reached a multiple of 75 (marking the end of the row)
	// restart "col" to 1
	// increase row by 1
	if(col % 75 == 0){
		col = 1;
		row++;
	} else {
		// increase col by 1
		col++;
	}
}

//==============================================
// Function that fires when any cell in mapGrid is clicked by the user
//==============================================
$('.mapGridPlot').click(function(){

	// split the name of the cell into an array stored in AOI_ID
	// AOI_ID[0] = coordinates
	// AOI_ID[1] = name
	var AOI_ID = $(this).attr('id').split("^");
	AOI_ID = AOI_ID[1];

	// Check that AOI_ID was successful and is not null or undefined
	// This indicates if the cell has a name and is a place of interest
	if(AOI_ID){

		// Populates the right menu with details of that place of interest
		$('#area_name').text(`${AOI[AOI_ID].name}`);
		$('#shop_box_photo').hide();
		$('#shop_box_items').empty();
		$('#shop_box_desc').empty();

		//Area Description
		if(AOI[AOI_ID].desc != undefined){
			$('#area_desc').text(`${AOI[AOI_ID].desc}`);
		} else {
			$('#area_desc').text(``);
		}

		//Area shops
		if(AOI[AOI_ID].shops.length > 0){
			$('#area_shop_menu').empty();
			$('#area_shop_menu').show();
			$('#shop_box').show();
			//$('#area_shop_menu').append(`<div class="shopstitle">Shops</div>`);
			for(i=0; i<AOI[AOI_ID].shops.length; i++){
				if(shopsUnlocked[AOI[AOI_ID].shops[0]].unlocked){
					$('#area_shop_menu').append(`<div id="shop-button-${AOI[AOI_ID].shops[i]}" class="shopButton">${shops[AOI[AOI_ID].shops[i]].name}</div>`)
				}
			}
		} else {
			$('#area_shop_menu').hide();
			$('#shop_box').hide();
		}
	}
})

$('#area_shop_menu').on('click', '.shopButton', function(){
	var shopID = $(this).attr('id').replace("shop-button-","");
	console.log(`Opening store #${shopID}: '${shops[shopID].name}'`);
	$('#shop_box_photo').show();
	$('#shop_box_photo_img').attr('src',`images/${shops[shopID].name}.png`);
	$('#shop_box_desc').html(shops[shopID].desc);
	$('#shop_box_items').empty();
	for(i=0; i<shops[shopID].stock.length; i++){
		$('#shop_box_items').append(`<div class="items_item">${shops[shopID].stock[i].name}<br>${shops[shopID].stock[i].cost} gold<br>${shops[shopID].stock[i].desc}</div>`)
	}
});

$( document ).mousedown(function(){
	$('#mapGrid').css('cursor','grabbing');
});

$( document ).mouseup(function(){
	$('#mapGrid').css('cursor','grab');
});

$('.zoomButtons').on('click',function(){
	if ( $(this).hasClass('plus') == true){
		//zoom in
		zoom("in",);
	} else {
		//zoom out
		zoom("out");
	}
});

$('.mapGridPlot').mouseover(function(e){
	$('#coordinates').text(`${$(this).attr('id')}`);
	var debugSplit = $(this).attr('id').split("^");
	if(!debugSplit[1]){
		$('#poi_name').text(`Wilderness`);
	} else {
		$('#poi_name').text(`${AOI[debugSplit[1]].name}`);
	}
	if(debugSplit[1]){
		$('#poi_type').text(AOI[debugSplit[1]].type);
	}
	if(debugSplit[1] && AOI[debugSplit[1]].shops.length > 0){
		$('#debug_shops').text(``);
		$('#debug_shops').append(`<br>`);
		for(i=0; i<AOI[debugSplit[1]].shops.length; i++){
			$('#debug_shops').append(`${shops[AOI[debugSplit[1]].shops[i]].name}<br>`);
		}
	} else {
		$('#debug_shops').text(`none`);
	}
	
});

function stopScrolling (e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
}

function zoom(arg){
	var curDimensions = $('#mapGrid').height();
	switch(arg){
		case "in":
			newDimensions = curDimensions * (1 + zoomFactor);
			$('#mapGrid').css({
				'-webkit-transform' : 'scale(' + (curZoom+zoomFactor) + ')',
				'-moz-transform'    : 'scale(' + (curZoom+zoomFactor) + ')',
				'-ms-transform'     : 'scale(' + (curZoom+zoomFactor) + ')',
				'-o-transform'      : 'scale(' + (curZoom+zoomFactor) + ')',
				'transform'         : 'scale(' + (curZoom+zoomFactor) + ')'
			  });
			  curZoom += zoomFactor;
			break;
		case "out":
			newDimensions = curDimensions * (1 - zoomFactor);
			$('#mapGrid').css({
				'-moz-transform'    : 'scale(' + (curZoom-zoomFactor) + ')',
				'-ms-transform'     : 'scale(' + (curZoom-zoomFactor) + ')',
				'-o-transform'      : 'scale(' + (curZoom-zoomFactor) + ')',
				'-webkit-transform' : 'scale(' + (curZoom-zoomFactor) + ')',
				'transform'         : 'scale(' + (curZoom-zoomFactor) + ')'
			  });
			  curZoom -= zoomFactor;
	}
	if(curZoom == 1){
		$('#mapGrid').height('2048');
		$('#mapGrid').width('2048');
	} else {
		$('#mapGrid').height(newDimensions);
		$('#mapGrid').width(newDimensions);
	}
	$('#zoom_level').text(Math.round((curZoom + Number.EPSILON) * 100 ) / 100);
}