$(document).ready(function(){
  
	var API_KEY = "I965MQNXTF4P9L5Q";
	var STOCKS = ['IBM','MSFT','GOOGL','FB','TWTR'];

	//update stock
	function updateStock(symbol){
		
		var openCol = $('#' + symbol + '_Open');
		var high = $('#' + symbol + '_High');
		var low = $('#' + symbol + '_Low');
		var price = $('#' + symbol + '_Price');
		var volumn = $('#' + symbol + '_Volume');
		var change = $('#' + symbol + '_Change');
		var changePerct = $('#' + symbol + '_ChangePercent');
				
		/*
		example json
		{
			"Global Quote": {
				"01. symbol": "IBM",
				"02. open": "115.5000",
				"03. high": "118.5700",
				"04. low": "115.2900",
				"05. price": "118.3500",
				"06. volume": "4285100",
				"07. latest trading day": "2020-07-10",
				"08. previous close": "115.7100",
				"09. change": "2.6400",
				"10. change percent": "2.2816%"
			}
		}
		*/
		$.getJSON( "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +symbol+ "&apikey="+API_KEY, function( data ) {
			var dataArr = data['Global Quote'];
			
			if (dataArr != null){
			
				openCol.html(dataArr['02. open']);
				high.html(dataArr['03. high']);
				low.html(dataArr['04. low']);
				price.html(dataArr['05. price']);
				volumn.html(dataArr['06. volume']);
				change.html(dataArr['09. change']);
				changePerct.html(dataArr['10. change percent']);
			
			}
			
		});
	}
	
	//update board
	function updateBoard(){
	
		for (s in STOCKS) {
			updateStock(STOCKS[s]);
		}		
	}
	

	//update every 2 minutes
	setInterval(function(){ 
		updateBoard();
	}, 120000);
	
	updateBoard();//call the first time
	
});
