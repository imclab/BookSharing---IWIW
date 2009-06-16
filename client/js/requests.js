var BOOKS = [ 
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "john.doe",
				id: 0
			},
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "john.doe",
				id: 1
			},
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "john.doe",
				id: 2
			},
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "john.doe",
				id: 3
			}
];

var SEARCH_RESULT = [
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "katy.deo",
				id: 1
			},
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "katy.deo",
				id: 2
			},
			{ thumb: 'http://ecx.images-amazon.com/images/I/51K3p0CsaxL._SL500_PIsitb-sticker-arrow-big,TopRight,35,-73_OU01_SS75_.jpg', 
				author: "Kate Morton", 
				title: "The Forgotten Garden", 
				isbn: "1416550542", 
				status: "Bent", 
				owner: "katy.deo",
				id: 3
			}
]


var REQUESTS = (function () 
{


	function getBooksByID(id, successHandler, errorHandler)
	{
		if (successHandler != null)
		{
			successHandler(BOOKS);
		}
	}
	
	
	function getOwnerData(successHandler, errorHandler)
	{
		if (successHandler !== null)
		{
			successHandler({
				id: "john.doe",
				displayName: "John Doe"
			});
		}
	}


	function getViewerData(successHandler, errorHandler)
	{
		if (successHandler !== null)
		{
			successHandler({
				id: "john.doe",
				displayName: "John Doe"
			});
		}
	}
	
	function addNewBook(book, successHandler, errorHandler)
	{
		BOOKS = [book].concat(BOOKS);
		
		
		/*$.ajax({  
		  type: "POST",  
		  url: "http://192.168.1.120:8000/
		  dataType: "html", 
		  data: data,
		  success: successHandler,
		  error: errorHandler
		*/
		
		if (successHandler !== undefined)
		{
			successHandler();
		}
	}
	
	function searchBook(query, successHandler, errorHandler)
	{
		if (successHandler !== undefined)
		{
			successHandler(SEARCH_RESULT);
		}	
	}


	return {
		getBooksByID: getBooksByID,
		getOwnerData: getOwnerData,
		getViewerData: getViewerData,
		addNewBook: addNewBook,
		searchBook: searchBook
	}
}());
