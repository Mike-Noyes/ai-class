export type Player='sun'|'moon'
export type Values={top:number;right:number;bottom:number;left:number}
export type Card={id:string;name:string;values:Values;owner:Player}
export type Game={board:(Card|null)[];hands:Record<Player,Card[]>;turn:Player;winner:Player|'draw'|null;lastMove:number|null}
const directions=[{step:-3,mine:'top',theirs:'bottom'},{step:1,mine:'right',theirs:'left'},{step:3,mine:'bottom',theirs:'top'},{step:-1,mine:'left',theirs:'right'}] as const
const cards:Omit<Card,'owner'>[]=[
{id:'ember',name:'Ember Fox',values:{top:6,right:3,bottom:2,left:5}},{id:'moss',name:'Moss Golem',values:{top:3,right:5,bottom:6,left:2}},{id:'kite',name:'Sky Kite',values:{top:5,right:6,bottom:2,left:3}},{id:'coral',name:'Coral Imp',values:{top:2,right:4,bottom:5,left:6}},{id:'lion',name:'Dawn Lion',values:{top:7,right:4,bottom:3,left:4}},
{id:'moth',name:'Dusk Moth',values:{top:4,right:2,bottom:6,left:5}},{id:'wyrm',name:'Cave Wyrm',values:{top:3,right:7,bottom:4,left:2}},{id:'sprig',name:'Star Sprig',values:{top:5,right:3,bottom:5,left:4}},{id:'tide',name:'Tide Caller',values:{top:2,right:5,bottom:4,left:7}},{id:'owl',name:'Night Owl',values:{top:6,right:4,bottom:5,left:3}}]
export function newGame():Game{return{board:Array(9).fill(null),hands:{sun:cards.slice(0,5).map(c=>({...c,owner:'sun'})),moon:cards.slice(5).map(c=>({...c,owner:'moon'}))},turn:'sun',winner:null,lastMove:null}}
export function play(game:Game,cardId:string,index:number):Game{
 if(game.winner||index<0||index>8||game.board[index])return game
 const hand=game.hands[game.turn],chosen=hand.find(c=>c.id===cardId);if(!chosen)return game
 const board=[...game.board];board[index]=chosen
 for(const d of directions){const neighbor=index+d.step;if(neighbor<0||neighbor>8)continue;if(Math.abs(d.step)===1&&Math.floor(neighbor/3)!==Math.floor(index/3))continue;const target=board[neighbor];if(target&&target.owner!==chosen.owner&&chosen.values[d.mine]>target.values[d.theirs])board[neighbor]={...target,owner:chosen.owner}}
 const hands={...game.hands,[game.turn]:hand.filter(c=>c.id!==cardId)};let winner:Game['winner']=null
 if(board.every(Boolean)){const sun=board.filter(c=>c?.owner==='sun').length+hands.sun.length,moon=board.filter(c=>c?.owner==='moon').length+hands.moon.length;winner=sun>moon?'sun':moon>sun?'moon':'draw'}
 return{board,hands,turn:game.turn==='sun'?'moon':'sun',winner,lastMove:index}
}
export function score(game:Game){const count=(p:Player)=>game.board.filter(c=>c?.owner===p).length;return{sun:count('sun')+game.hands.sun.length,moon:count('moon')+game.hands.moon.length}}
