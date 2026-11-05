const key='ludos-park-last-character';

// Only the homepage calls this: internal pages do not consume a turn.
export function nextParkCharacter(storage){
  try{
    const selected=storage.getItem(key)==='fred'?'amora':'fred';
    storage.setItem(key,selected);
    return selected;
  }catch{return 'fred';}
}
