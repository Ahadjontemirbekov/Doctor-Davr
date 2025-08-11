
from django.urls import path
from .views import home,kirish,royxatdan_otish

urlpatterns=[
    path('', home, name='home'),
    path('kirish/', kirish, name='kirish'),
    path('royxatdan_otish/', royxatdan_otish, name='royxatdan_otish'),
]