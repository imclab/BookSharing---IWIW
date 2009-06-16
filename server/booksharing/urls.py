from django.conf.urls.defaults import *
from django.conf import settings
from os.path import join as pathjoin

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Example:
    # (r'^booksharing/', include('booksharing.foo.urls')),

	(r'^getBooksByIwiwId$', 'booksharing.iwiw.views.getBooksByIwiwId'),
	(r'^searchInBooks$', 'booksharing.iwiw.views.searchInBooks'),
	(r'^addNewBook$', 'booksharing.iwiw.views.addNewBook'),
	(r'^editBook$', 'booksharing.iwiw.views.editBook'),
	(r'^deleteBook$', 'booksharing.iwiw.views.deleteBook'),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/(.*)', admin.site.root),
    (r'^assets/(?P<path>.*)$', 'django.views.static.serve', {'document_root': pathjoin(settings.MEDIA_ROOT, 'assets')}),

)
