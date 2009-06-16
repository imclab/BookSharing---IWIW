var P2PBOOKSHARING = function() {
	
	var bookTable,
		userId,
		displayName;
		
		
		

	/**
	 * Sending Activity message
	 * az uzenofalra
	 * @param {Object} msg
	 */		
	function postActivity(msg) {
			
			//történés rögzítése
			var params = {};
			params[opensocial.Activity.Field.TITLE] = msg;
			var activity = opensocial.newActivity(params);
			
			opensocial.requestCreateActivity(activity,opensocial.CreateActivityPriority.HIGH);
			
			return 0;
	}
	
	
	function sendNotif(msg) {
	
		var messageOptions = {};
		messageOptions[opensocial.Message.Field.TYPE] = opensocial.Message.Type.NOTIFICATION;
		var messageText = msg;
		
		var message = opensocial.newMessage(messageText, messageOptions);
		
		opensocial.requestSendMessage("VIEWER", message, function() {
			
			console.log("Sikerult elkuldeni");
		});
		
	}
	
	function sendMessage(msg) {
	
		try {
			postActivity(msg);
			sendNotif(msg);
		} catch (e) {
			
		}
	}
	
	/**
	 * 
	 */
	function lendABook() {
		
		console.log("lend a book");
		sendMessage("Kolcsonad");
	}
		
		
	
	function createBookList(books, cnt)
	{
		$(".book", cnt).remove();
		
		$(books).each( function (index, element)
		{
			
		    var bookDesc = element,
		    	book = $("<div/>").addClass("book window"),
		    	cover = $("<img/>").addClass("thumb").attr({ src: bookDesc.thumb }).appendTo(book),
		    	desc = $("<div/>").addClass("desc").appendTo(book),
		    	cmds = $("<div/>").addClass("commands").appendTo(book),
		    	author = $("<span/>").html(bookDesc.author).addClass("author").appendTo(desc),
		    	title = $("<span/>").html(bookDesc.title).addClass("title").appendTo(desc),
		    	buttons = [],
		    	lendButton,
		    	delButton,
		    	borrowButton;
		    	
		    if (bookDesc.owner === userId)
		    {
		    	lendButton = $("<a/>").attr("href","#").html("Kolcsonad").addClass("lend button").click( function ()
		   		{
		    		lendABook();
			    	return false;
			    });
		    	buttons.push(lendButton);
		    }
		    else
		    {
		    	borrowButton = $("<a/>").attr("href","#").html("Elker").addClass("borrow button").click( function ()
		   		{
		    		alert("Kolcsonker");
			    	return false;
			    });
		    	buttons.push(borrowButton)		    ;
		    }

			$(buttons).each( function (index, element)
			{
				$(element).appendTo(cmds);
			});
			
		    delButton = $("<a/>").attr("href","#").html("Torol").addClass("del button").appendTo(cmds);
		    
		    /*lendButton.click( function ()
		    {
		    	alert("Kolcsonad");
		    	return false;
		    });*/
		    
		    book.appendTo(cnt);
		    
		    $(".author", book).editable('');
		    $(".title", book).editable('');
		    			
		    if (index % 3 == 0)
		    {
		    	book.addClass("clear");
		    }
		    
		    
		    $(book).mouseenter( function (event)
		    {
		        $(".active", cnt).removeClass("active");
		        
		        $(event.currentTarget).addClass("active");
		    });
		    
		    $(book).mouseleave( function (event)
		    {
		        $(event.currentTarget).removeClass("active");
		    });
		    
		});	
	}
	
	function refreshBookTable()
	{
		REQUESTS.getBooksByID(userId, function(books)
		{
			var cnt = $(".myBooks .bookCnt");
			
			createBookList(books, cnt);
		});

		//gadgets.window.adjustHeight();
	}	
	
	
	function init()
	{
		$("#bookAuthor").addInputLabel([ "szerzo"] );
		$("#bookTitle").addInputLabel([ "cim"] );
		$("#bookISBN").addInputLabel([ "ISBN"] );
		
		$(".searchField").addInputLabel(["Konyv keresese szerzo, cim alapjan..."]);

		// Search
		$(".searchBook input[type=submit]").click( function (event)
		{
			REQUESTS.searchBook(userId, function(books)
			{
				var cnt = $(".searchBooks .bookCnt");
				createBookList(books, cnt);
			});
			return false;
		});
		
		
		
		// Add new book
		$(".addNewBook input[type=submit]").click( function (event)
		{
			var cnt = $(".addNewBook"),
				author = $("#bookAuthor", cnt).val(),
				title = $("#bookTitle", cnt).val(),
				book = [ "", author, title ];
		
			
			REQUESTS.addNewBook(book, function ()
			{
				refreshBookTable();
			});	
			
			return false;
		});
		
		
		REQUESTS.getOwnerData( function (userData)
		{
			userId = userData.id;
			displayName = userData.displayName;
			refreshBookTable();
		});
	}
	

	return {
		init: init
	}
	
	
}();



$( function ()
{
	P2PBOOKSHARING.init();
});