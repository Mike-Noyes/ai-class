import{describe,expect,it}from'vitest';import{newGame,play,score}from'./game'
describe('basic game',()=>{
 it('places a card, removes it, and changes turns',()=>{const g=play(newGame(),'ember',0);expect(g.board[0]?.id).toBe('ember');expect(g.hands.sun).toHaveLength(4);expect(g.turn).toBe('moon')})
 it('rejects occupied cells and wrong-hand cards',()=>{const g=play(newGame(),'ember',0);expect(play(g,'moth',0)).toBe(g);const fresh=newGame();expect(play(fresh,'moth',0)).toBe(fresh)})
 it('captures with a higher touching value',()=>{let g=play(newGame(),'ember',0);g=play(g,'moth',3);expect(g.board[0]?.owner).toBe('moon')})
 it('does not compare across row edges',()=>{let g=play(newGame(),'ember',2);g=play(g,'moth',3);expect(g.board[2]?.owner).toBe('sun')})
 it('keeps ten total points',()=>{const s=score(play(newGame(),'ember',4));expect(s.sun+s.moon).toBe(10)})
})
