import speech_recognition as sr
import pyttsx3
from playsound import playsound

def speak():

    r = sr.Recognizer()

    def SpeakText(command):
        engine = pyttsx3.init()
        engine.say(command)
        engine.runAndWait()

    with sr.Microphone() as source2:
        r.adjust_for_ambient_noise(source2, duration=0.2)
        audio2 = r.listen(source2)
        MyText = r.recognize_google(audio2)
        MyText = MyText.lower()
        playsound('./sounds/lil-jon-okay.mp3')
        return MyText
