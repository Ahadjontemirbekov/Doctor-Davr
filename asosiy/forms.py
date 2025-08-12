from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import *


class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']


class AppointmentForm(forms.ModelForm):
    class Meta:
        model = OnlineQabul
        fields = ['name', 'email', 'phone', 'doctor', 'date', 'info']

        widgets = {
            'date': forms.DateInput(attrs={'type': 'date'}),
        }

class BemorForm(forms.ModelForm):
    class Meta:
        model = Bemorlar
        fields = ['toliq_ism', 'yil', 'hudud', 'summa']
























