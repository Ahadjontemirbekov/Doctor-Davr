
from django.db import models


class Malumot(models.Model):
    sarlovha = models.CharField(max_length=30)
    text = models.CharField(max_length=70)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sarlovha

class Kirgandagitext(models.Model):
    sarlovha = models.CharField(max_length=30)
    text = models.CharField(max_length=70)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sarlovha

class Ishxonanomi(models.Model):
    sarlovha = models.CharField(max_length=30)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sarlovha


class VaqtManzilTelefon(models.Model):
    telefon_raqam=models.CharField(max_length=17)

    haftani_qaysi_kuni_boshlash=models.CharField(max_length=9)
    haftani_qaysi_kuni_yakunlash=models.CharField(max_length=9)

    ish_boshlash_vaqti=models.CharField(max_length=5)
    ishni_yakunlash_vaqti=models.CharField(max_length=5)

    manzil=models.CharField(max_length=255)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.telefon_raqam

class BizHaqimizda(models.Model):
    birinchi_qator= models.CharField(max_length=70)

    pastda_sarlovha=models.CharField(max_length=30)
    text=models.CharField(max_length=200)

    birinchi_katta_rasm= models.ImageField(upload_to='images')
    ikkinchi_kichkina_rasm= models.ImageField(upload_to='images')

    nech_yillik_tajriba=models.CharField(max_length=3)

    def __str__(self):
        return self.pastda_sarlovha

class Ptchkalar(models.Model):
    ptch=models.CharField(max_length=50)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.ptch

class Kv(models.Model):
    kv_ichidagi_text=models.CharField(max_length=22)
    kv_ichidagi_son=models.CharField(max_length=10)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.kv_ichidagi_text



class Tashhislar(models.Model):
    tashhislar_nomi=models.CharField(max_length=30)
    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.tashhislar_nomi

class Xizmatlarimiz(models.Model):
    birinchi_qator = models.CharField(max_length=70)

    qaysi_turdagi=models.ForeignKey(Tashhislar,on_delete=models.CASCADE)

    sarlovha = models.CharField(max_length=30)
    text = models.CharField(max_length=70)


    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.sarlovha

class VideoTuri(models.Model):
    video_turi=models.CharField(max_length=25)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.video_turi


class Video(models.Model):
    birinchi_qator = models.CharField(max_length=70)

    video_ustodagi_soz = models.CharField(max_length=70)

    videoni_ustidagi_rasm= models.ImageField(upload_to='images')
    video= models.FileField(upload_to='videos')

    video_turi=models.ForeignKey(VideoTuri,on_delete=models.CASCADE)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.birinchi_qator


class Doctor(models.Model):

    doctor_rasmi= models.ImageField(upload_to='images')

    doctorni_instagrami_url=models.CharField(max_length=50)
    doctorni_facebook_url=models.CharField(max_length=50)
    doctorni_twitter_url=models.CharField(max_length=50)
    doctorni_linkedin_url=models.CharField(max_length=50)

    docotr_famila_ismi=models.CharField(max_length=30)

    docotr_mutaxasisligi=models.CharField(max_length=30)

    doctor_haqida_malumot=models.CharField(max_length=100)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.docotr_famila_ismi


class Qabul(models.Model):

    sarlovha_rasmi= models.ImageField(upload_to='images')

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)


class Galareya(models.Model):

    rasm= models.ImageField(upload_to='images')

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

class EngKOpSavol(models.Model):
    savol=models.CharField(max_length=50)

    javob = models.TextField()

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.savol


class OnlineQabul(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    doctor = models.CharField(max_length=100)
    date = models.DateField()
    info = models.TextField(blank=True, null=True)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.doctor} ({self.date})"

class BotniOzgartirish(models.Model):
    bot_token=models.CharField(max_length=300)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.bot_token

class KanlaniOzgartirish(models.Model):
    kanal_url=models.CharField(max_length=300)

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.kanal_url


class Bemorlar(models.Model):
    toliq_ism=models.CharField(max_length=400)
    yil=models.IntegerField()
    hudud=models.CharField(max_length=100)
    summa=models.IntegerField()

    yaratilgan_vaqt = models.DateTimeField(auto_now_add=True)
    har_safar_ozgartirilgandagi_vaqt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.toliq_ism



