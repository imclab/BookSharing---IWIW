jQuery.fn.addInputLabel = function(labels)
{
	return this.each( function ()
	{
		if (labels !== null && labels[0] !== null)
		{
			$(this).val(labels[0]);
		}
		
		// If it gets focus, we remove every text defined in 'labels'
		// If it had error class, we remove it as well
	    $(this).focus( function()
	    {
	    	
    		var e = $(this);
	    	var value = e.val();
    		var b = e.is(".error") || labels.some( function(element, index, array)
    		{
    			return value == element;
	    	});
    		
    		if (b)
	    	{
    			e.val("");
    			e.removeClass("error");
	    	}
	    	
    	});
    	
    	$(this).blur( function ()
    	{
    		var e = $(this);
		    var value = e.val();
		    value = $.trim(value);
		    if (value == "" && labels !== null && labels[0] !== null)
		    {
		    	$(this).val(labels[0]);
		    }
		});
	});
};


// https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference:Objects:Array:some
if (!Array.prototype.some)
{
  Array.prototype.some = function(fun /*, thisp*/)
  {
    var len = this.length;
    if (typeof fun != "function")
      throw new TypeError();

    var thisp = arguments[1];
    for (var i = 0; i < len; i++)
    {
      if (i in this &&
          fun.call(thisp, this[i], i, this))
        return true;
    }

    return false;
  };
}


