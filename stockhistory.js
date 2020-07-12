$(document).ready(function(){
  
	var API_KEY = "5MQPWHZFSJCL4HZ1";	
	var symbol = 'IBM';
	
	//show the history
	function showHistory(){		
		
		symbol = $('#symbol').val();
		//alert(symbol);
		if (symbol != ''){
			symbol = symbol.toUpperCase();//to upper case		
			drawBasic(); //draw	
		}else{
			alert("Please enter the stock e.g. IBM");
		}
	}
	
	google.charts.load('current', {packages: ['corechart', 'line']});
	
	//draw chart
	function drawBasic() {
		
		$.getJSON( "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=" +symbol+ "&apikey="+API_KEY, 
			function( jsondata ) {
			
			var dataArr = jsondata['Monthly Time Series'];
			
			//alert(symbol);
			
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'X');
			data.addColumn('number', 'Price');

			var row = [];
			
			$.each( dataArr, function( key, val ) {
				console.log(key + ":" + val['4. close']);
				
				row.unshift([key, Number(parseFloat(Math.round(val['4. close'] * 100) / 100).toFixed(2))]);
			});	
			
			//add row to data
			data.addRows(row);
			
			//console.log(row);

			var options = {
				isStacked: true,
				height:800,
				hAxis: {
				  title: 'Monthly',
				  slantedText:true,
				  slantedTextAngle:90,
				},
				vAxis: {
				  title: 'Price'
				}
				
			};
			
			

			var chart = new google.visualization.LineChart(document.getElementById('history'));

			chart.draw(data, options);		  
		});
    }
	
	
	//drawBasic();
	
	//add click action handler to show button
	$( "#show_btn" ).click(function() {
		  showHistory();
	});

	
});
