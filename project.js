var dur = 1000


var drawScatter = function(teams,target,
              xScale,yScale,xProp,yProp)
{

    setBanner(xProp.toUpperCase() +" vs "+ yProp.toUpperCase());
    
	//join
	var circles = d3.select(target)
		.select(".graph")
		.selectAll("circle")
		.data(teams, function(team,index)
			 {
			return team.picture
		})
		.classed("circle",true)
	//enter
	circles.enter()
		.append("circle")
	
	//exit
	circles.exit()
		.remove()
	
	//update
d3.select(target)
	.select(".graph")
    .selectAll("circle")
    .transition()
	.duration(dur)
    .attr("cx",function(team)
    {
        return xScale(team[xProp]);    
    })
    .attr("cy",function(team)
    {
        return yScale(team[yProp]);    
    })
    .attr("r",4)
		
}


var clearScatter = function(target)
{
    d3.select(target)
        .select(".graph")
        .selectAll("circle")
        .remove();
}


var createAxes = function(screen,margins,graph,
                           target,xScale,yScale)
{
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
    
    var axes = d3.select(target)
        .append("g")
    axes.append("g")
		.classed("xaxis",true)
        .attr("transform","translate("+margins.left+","
             +(margins.top+graph.height)+")")
        .call(xAxis)
    axes.append("g")
		.classed("yaxis",true)
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
}


var initGraph = function(target,teams)
{
    //the size of the screen
    var screen = {width:500, height:400};
    
    //how much space will be on each side of the graph
    var margins = {top:15,bottom:40,left:70,right:15};
    
    //generated how much space the graph will take up
    var graph = 
    {
        width:screen.width-margins.left-margins.right,
        height:screen.height-margins.top-margins.bottom,
    }
    

    //set the screen size
    d3.select(target)
        .attr("width",screen.width)
        .attr("height",screen.height)
    
    //create a group for the graph
    var g = d3.select(target)
        .append("g")
        .classed("graph",true)
        .attr("transform","translate("+margins.left+","+
             margins.top+")");
        
    //create scales for all of the dimensions
    
    
    var xScale = d3.scaleLinear()
        .domain([0,170])
        .range([0,graph.width])
           
    var yScale = d3.scaleLinear()
        .domain([0,160])
        .range([graph.height,0])
  
    
    
    createAxes(screen,margins,graph,target,xScale,yScale);
    
    initButtons(teams,target,xScale,yScale);
    
    setBanner("Click buttons to graphs");
    
    

}

var initButtons = function(teams,target,xScale,yScale)
{
    
    d3.select("#qwe")
    .on("click",function()
    {
        clearScatter(target);
        drawScatter(teams,target,
              xScale,yScale,"Goals Scored Home","Goals Scored Away");
    })
    
    d3.select("#rty")
    .on("click",function()
    {
        clearScatter(target);
        drawScatter(teams,target,
              xScale,yScale,"Minutes Per Goal Scored","First Team to Score Count");
    })
    
    d3.select("#uio")
    .on("click",function()
    {
        clearScatter(target);
        drawScatter(teams,target,
              xScale,yScale,"Goals Scored","Goals Conceded");
    })
    
    d3.select("#pas")
    .on("click",function()
    {
        clearScatter(target);
        drawScatter(teams,target,
              xScale,yScale,"Min Per Goal Home","Min per Goal Away");
    })
	
	d3.select("#dfg")
    .on("click",function()
    {
        clearScatter(target);
        drawScatter(teams,target,
              xScale,yScale,"Avg Possession Home","Avg Possession Away");
    })
    
    
    
}

var setBanner = function(msg)
{
    d3.select("#banner")
        .text(msg);
    
}



var teamPromise = d3.csv("data.csv");

teamPromise.then(function(teams)
{
    console.log("team data", teams);
   initGraph("#scatter",teams);
   
},
function(err)
{
   console.log("Error Loading data:",err);
});



