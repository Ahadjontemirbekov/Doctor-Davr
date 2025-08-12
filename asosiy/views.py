import random

from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from .forms import *
from django.shortcuts import render
from django.utils import timezone
from .models import Bemorlar


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
    botniozgartirish = BotniOzgartirish.objects.all()
    kanlaniozgartirish = KanlaniOzgartirish.objects.all()
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
        'token': botniozgartirish,
        'kanal': kanlaniozgartirish,
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




def dashboard(request):
    yangi_bemorlar_soni = Bemorlar.objects.filter(
        yaratilgan_vaqt__gte=timezone.now() - timezone.timedelta(days=30)
    ).count()

    bugun = timezone.now().date()
    bugungi_qabullar = Bemorlar.objects.filter(
        yaratilgan_vaqt__date=bugun
    ).count()

    oy_boshi = timezone.now().replace(day=1)
    oylik_daromad = Bemorlar.objects.filter(
        yaratilgan_vaqt__gte=oy_boshi
    ).aggregate(total_summa=models.Sum('summa'))['total_summa'] or 0

    jami_bemorlar = Bemorlar.objects.count()
    xizmat_foizi = round((bugungi_qabullar / jami_bemorlar) * 100, 2) if jami_bemorlar > 0 else 0

    avatars = [
                  f"https://randomuser.me/api/portraits/men/{i}.jpg" for i in range(1, 51)
              ] + [
                  f"https://randomuser.me/api/portraits/women/{i}.jpg" for i in range(1, 51)
              ]

    bemorlar = Bemorlar.objects.order_by('-yaratilgan_vaqt')[:5]
    yangi_qabullar = []
    for b in bemorlar:
        b.rasm_url = random.choice(avatars)
        yangi_qabullar.append(b)

    context = {
        'yangi_bemorlar_soni': yangi_bemorlar_soni,
        'bugungi_qabullar': bugungi_qabullar,
        'oylik_daromad': oylik_daromad,
        'xizmat_foizi': xizmat_foizi,
        'yangi_qabullar': yangi_qabullar,
    }
    return render(request, 'admin_panel/index.html', context)



def royxatdan_otish_b(request):
    if request.method == 'POST':
        form = BemorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('royxatdan_otish_b')
    else:
        form = BemorForm()

    bemorlar = Bemorlar.objects.all().order_by('-yaratilgan_vaqt')

    return render(request, 'admin_panel/bemorlaruchun.html', {
        'form': form,
        'bemorlar': bemorlar
    })



































































