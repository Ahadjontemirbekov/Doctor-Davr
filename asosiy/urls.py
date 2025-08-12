
from django.urls import path
from .views import *

urlpatterns=[
    path('dashboard/', dashboard, name='dashboard'),
    path('royxatga_yozilish/', royxatdan_otish_b, name='royxatdan_otish_b'),
    path('', home, name='home'),
    path('kirish/', kirish, name='kirish'),
    path('royxatdan_otish/', royxatdan_otish, name='royxatdan_otish'),
]