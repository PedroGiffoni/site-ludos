"""Extract original cubic curves from the supplied Illustrator PDF artboards."""
from pathlib import Path
import json, sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'.tools'))
import pymupdf

ROOT=Path(__file__).resolve().parents[2]
document=pymupdf.open(ROOT/'elementos/ELEMENTOS_LUDOS.ai')
result={}
for name,index in {'fred':3,'amora':4,'zoe':5,'jr':7,'edy':8}.items():
    page=document[index]
    drawings=[d for d in page.get_drawings() if d['fill'] is not None]
    bounds=pymupdf.Rect()
    for d in drawings:bounds|=d['rect']
    width=bounds.width
    def point(p):return [round((p.x-(bounds.x0+bounds.x1)/2)/width*3,6),round(((bounds.y0+bounds.y1)/2-p.y)/width*3,6)]
    paths=[]
    for d in drawings:
        commands=[];last=None
        for item in d['items']:
            if item[0] in ['l','c']:
                start=item[1]
                if last is None or abs(last.x-start.x)+abs(last.y-start.y)>.01:
                    if last is not None:commands.append(['Z'])
                    commands.append(['M',*point(start)])
                if item[0]=='l':commands.append(['L',*point(item[2])]);last=item[2]
                else:commands.append(['C',*point(item[2]),*point(item[3]),*point(item[4])]);last=item[4]
            elif item[0]=='re':
                r=item[1]
                commands.extend([['M',*point(r.tl)],['L',*point(r.tr)],['L',*point(r.br)],['L',*point(r.bl)],['Z']]);last=None
        if last is not None:commands.append(['Z'])
        if commands:
            color=[round(c,4) for c in d['fill']]
            layer='dark' if max(color)<.4 else 'cream' if min(color)>.7 else 'body'
            rect=d['rect'];center=point(rect.tl+ (rect.br-rect.tl)*.5)
            paths.append({'commands':commands,'layer':layer,'center':center,'color':color,'top':round((bounds.y1-rect.y0)/width*3,5),'height':round(rect.height/width*3,5)})
    result[name]={'aspect':round(bounds.height/width,6),'paths':paths}
target=ROOT/'site/src/vector-characters.json'
target.write_text(json.dumps(result,separators=(',',':')),encoding='utf-8')
print('Extracted',sum(len(v['paths']) for v in result.values()),'vector shapes for',len(result),'characters.')
