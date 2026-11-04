"""Derive editable silhouette data from the supplied brand PNGs, preserving originals."""
from PIL import Image, ImageDraw
from collections import defaultdict
from pathlib import Path
import json, math

ROOT = Path(__file__).resolve().parents[2]

def simplify(points, epsilon=0.65):
    if len(points) < 3:
        return points
    a, b = points[0], points[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]
    length = math.hypot(dx, dy)
    distances = [abs(dy*p[0]-dx*p[1]+b[0]*a[1]-b[1]*a[0])/length if length else math.dist(p,a) for p in points]
    index = max(range(len(points)), key=distances.__getitem__)
    if distances[index] <= epsilon:
        return [a,b]
    return simplify(points[:index+1], epsilon)[:-1]+simplify(points[index:], epsilon)

def contours(mask):
    w,h = mask.size
    px = mask.load()
    edges = defaultdict(list)
    for y in range(h):
        for x in range(w):
            if not px[x,y]: continue
            if y == 0 or not px[x,y-1]: edges[(x,y)].append((x+1,y))
            if x == w-1 or not px[x+1,y]: edges[(x+1,y)].append((x+1,y+1))
            if y == h-1 or not px[x,y+1]: edges[(x+1,y+1)].append((x,y+1))
            if x == 0 or not px[x-1,y]: edges[(x,y+1)].append((x,y))
    loops=[]
    while edges:
        start=next(iter(edges)); p=start; points=[]
        while True:
            points.append(p)
            targets=edges.get(p)
            if not targets: break
            q=targets.pop()
            if not targets: del edges[p]
            p=q
            if p == start: break
        if len(points)>8:
            area=sum(points[i][0]*points[(i+1)%len(points)][1]-points[(i+1)%len(points)][0]*points[i][1] for i in range(len(points)))/2
            if abs(area)>4:
                # Split the closed ring before simplifying to preserve curvature.
                mid=len(points)//2
                simple=simplify(points[:mid+1])[:-1]+simplify(points[mid:]+[points[0]])[:-1]
                loops.append({'area':area,'points':[[round((x-w/2)/w*3,4),round((h/2-y)/w*3,4)] for x,y in simple]})
    return loops

data={}
for name in ['fred','amora','edy','jr','zoe']:
    image=Image.open(ROOT/f'site/public/assets/{name}.webp').convert('RGBA')
    image.thumbnail((210,210))
    masks={key:Image.new('1',image.size) for key in ['body','dark','cream']}
    for y in range(image.height):
        for x in range(image.width):
            r,g,b,a=image.getpixel((x,y))
            if a<160:continue
            key='dark' if max(r,g,b)<110 else 'cream' if r>215 and g>195 and b>145 and max(r,g,b)-min(r,g,b)<105 else 'body'
            masks[key].putpixel((x,y),1)
    # The body is a continuous silhouette; cover facial cutouts underneath raised features.
    body=Image.new('1',image.size)
    for key in masks:
        for loop in contours(masks[key]):
            if loop['area']>0 and key=='body':
                pts=[(x/3*image.width+image.width/2,image.height/2-y/3*image.width) for x,y in loop['points']]
                ImageDraw.Draw(body).polygon(pts,fill=1)
    data[name]={'aspect':image.height/image.width,'body':contours(body),'dark':contours(masks['dark']),'cream':contours(masks['cream'])}
target=ROOT/'site/src/characters.json';target.parent.mkdir(parents=True,exist_ok=True)
target.write_text(json.dumps(data,separators=(',',':')),encoding='utf-8')
print(f'Prepared {len(data)} character silhouettes: {target}')
