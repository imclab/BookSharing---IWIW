from django.contrib import admin
from django.db import models



# ======= IWIW USER ========
class IWIWUser(models.Model):
	iwiw_id = models.IntegerField(default=0)
	
	def __unicode__(self):
		return self.iwiw_id.__str__()

admin.site.register(IWIWUser)
# ==========================





# ======== BOOK STATUS ========
class BookStatus(models.Model):
	status = models.CharField(max_length = 512)

	def __unicode__(self):
		return self.status

admin.site.register(BookStatus)
# =============================





# ======== BOOK STATUS ========
class Book(models.Model):
	owner = models.ForeignKey(IWIWUser)
	author = models.CharField(max_length=512)
	title = models.CharField(max_length=512)
	isbn = models.CharField(max_length=128)
	comment = models.CharField(max_length=1024)
	status = models.ForeignKey(BookStatus)
	index = models.CharField(max_length=1024)
	# kep

	def __unicode__(self):
		return self.author + " - " + self.title

admin.site.register(Book)
# =============================
