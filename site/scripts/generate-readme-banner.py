"""Generate the README's local motion banner using original brand assets (Pillow)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import math
ROOT=Path(__file__).resolve().parents[2]
ASSETS=ROOT/'site/public/assets'
OUT=ROOT/'docs/assets'
OUT.mkdir(parents=True,exist_ok=True)
W,H=1080,320
font=ImageFont.truetype(str(ASSETS/'comfortaa-bold.ttf'),43)
small=ImageFont.truetype(str(ASSETS/'lato-regular.ttf'),18)
label=ImageFont.truetype(str(ASSETS/'lato-bold.ttf'),13)
def sprite(name,width):
    img=Image.open(ASSETS/f'{name}.webp').convert('RGBA')
    img.thumbnail((width,205),Image.Resampling.LANCZOS)
    return img
fred,amora=sprite('fred',145),sprite('amora',125)
frames=[]
for i in range(80):
    phase=i/80*math.tau
    canvas=Image.new('RGB',(W,H),'#FFF6DE')
    draw=ImageDraw.Draw(canvas)
    draw.rounded_rectangle((1,1,W-2,H-2),radius=26,outline='#D8DEC5',width=2)
    draw.ellipse((690,-90,1130,360),fill='#DCE4C7')
    draw.text((50,46),'CLÍNICA LUDOS  /  UNIVERSO DIGITAL',font=label,fill='#537359')
    draw.text((47,94),'Cuidar. Brincar.',font=font,fill='#264E3B')
    draw.text((47,152),'Descobrir.',font=font,fill='#264E3B')
    draw.text((50,235),'Marca, movimento e tecnologia em uma mesma experiência.',font=small,fill='#537359')
    for x,y,r,color in [(734,64,12,'#FBB277'),(1014,232,15,'#F3B4B4'),(989,66,8,'#8DD1DC')]:
        dy=math.sin(phase+x)*7
        draw.ellipse((x-r,y-r+dy,x+r,y+r+dy),fill=color)
    for x,name,img,offset in [(735,'FRED',fred,0),(899,'AMORA',amora,math.pi)]:
        bob=math.sin(phase+offset)*13
        draw.ellipse((x-7,250,x+img.width+7,269),fill='#C5CFAD')
        rotated=img.rotate(math.sin(phase+offset)*6,resample=Image.Resampling.BICUBIC,expand=True)
        canvas.paste(rotated,(int(x+(img.width-rotated.width)/2),int(244-img.height+bob)),rotated)
        draw.text((x+25,282),name,font=label,fill='#537359')
    if i==0:canvas.save(OUT/'ludos-readme.png',optimize=True)
    frames.append(canvas.quantize(colors=128,method=Image.Quantize.MEDIANCUT))
frames[0].save(OUT/'ludos-readme.gif',save_all=True,append_images=frames[1:],duration=60,loop=0,optimize=True,disposal=2)
print('README banner:',(OUT/'ludos-readme.gif').stat().st_size,'bytes')
