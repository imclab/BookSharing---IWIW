from django.http import HttpResponse
from django import forms
from booksharing.iwiw.models import *
from django.shortcuts import render_to_response

# ====== GET BOOKS BY ID =======

class getBooksByIwiwIdForm(forms.Form):
	owner = forms.IntegerField() #IWIW userid

def getBooksByIwiwId(request):
	if request.method != 'POST':
		return HttpResponse('{"error":"INVALID METHOD"}')
	form = getBooksByIwiwIdForm(request.POST)
	if form.is_valid():
		return HttpResponse("""[
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
}
]""")
#		render_to_response("books.html",{})
	else:
		return HttpResponse('{"error": "INVALID DATA"}')

# ===============================



def searchInBooks(request):
	return HttpResponse("SearchInBooks")


# ====== ADD NEW BOOK =======


class addNewBookForm(forms.Form):
	owner = forms.IntegerField() #IWIW userid
	author = forms.CharField(max_length=512)
	title = forms.CharField(max_length=512)
	isbn = forms.CharField(max_length=128)
	comment = forms.CharField(max_length=1024)
	status = forms.IntegerField() # 1 = kolcsonadhato

def addNewBook(request):
#	return HttpResponse(request.__str__())
	if request.method != 'POST':
		return HttpResponse('{"error":"INVALID METHOD"}')
	form = addNewBookForm(request.POST)
	if form.is_valid():	
		owner_id = form.cleaned_data['owner']
		owner = IWIWUser.objects.get_or_create(iwiw_id=owner_id)[0]
		owner.save()
		author = form.cleaned_data['author']
		title = form.cleaned_data['title']
		isbn = form.cleaned_data['isbn']
		comment = form.cleaned_data['comment']
		status_id = form.cleaned_data['status']
		status = BookStatus.objects.filter(id=status_id)
		if len(status) == 0:
			return HttpResponse('{"error":"bad_status"}')
		book = Book(owner = owner, author = author, title = title, isbn = isbn, comment = comment, status = status[0])
		book.save()
		return HttpResponse('{"state": "OK"}')
	else:
		return HttpResponse('{"error": "INVALID DATA"}')


# ============================

def editBook(request):
	return HttpResponse("EditBook")

def deleteBook(request):
	return HttpResponse("DeleteBook")