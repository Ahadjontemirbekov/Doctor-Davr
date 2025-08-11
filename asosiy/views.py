import os

from django.contrib.auth import authenticate, login
from django.contrib.sites import requests
from django.shortcuts import render, redirect
from .models import *
from .forms import CustomUserCreationForm
def home(request):
    malumot=Malumot.objects.all()
    kirgandagitext=Kirgandagitext.objects.all()
    ishxnoanomi=Ishxonanomi.objects.all()
    vaqt_manzil_telefon=VaqtManzilTelefon.objects.all()
    biz_haqimizda=BizHaqimizda.objects.all()
    xizmatlarimiz=Xizmatlarimiz.objects.all()
    ptchkalar=Ptchkalar.objects.all()
    kv=Kv.objects.all()
    tashhislar=Tashhislar.objects.all()
    videolar = Video.objects.select_related('video_turi').order_by('-yaratilgan_vaqt')
    doctor = Doctor.objects.all()
    qabul = Qabul.objects.all()
    galareya = Galareya.objects.all()
    engkopsavol = EngKOpSavol.objects.all()
    context={
        'model':malumot,
        'kirgandagitext':kirgandagitext,
        'ishxnoanomi':ishxnoanomi,
        'vaqt_manzil_telefon':vaqt_manzil_telefon,
        'biz_haqimizda':biz_haqimizda,
        'xizmatlarimiz':xizmatlarimiz,
        'ptchkalar':ptchkalar,
        'kv':kv,
        'tashhislar':tashhislar,
        'videolar': videolar,
        'doctor': doctor,
        'qabul': qabul,
        'galareya': galareya,
        'engkopsavol': engkopsavol,
        'token': os.environ.get('TOKEN'),
        'kanal': os.environ.get('KANAL'),
    }
    return render(request,'user/index.html',context)



def kirish(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'kirish/index.html', {'error': 'Login yoki parol xato'})
    return render(request, 'kirish/index.html')

def royxatdan_otish(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('kirish')
    else:
        form = CustomUserCreationForm()
    return render(request, 'royxatdan_otish/index.html', {'form': form})
