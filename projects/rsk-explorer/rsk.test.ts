import{describe,it,expect}from'vitest';import{traceRsk,parseWord}from'./rsk'
describe('RSK',()=>{it('traces a permutation',()=>{const x=traceRsk([3,1,4,2]).at(-1)!;expect(x.p).toEqual([[1,2],[3,4]]);expect(x.q).toEqual([[1,3],[2,4]])});it('allows repeats',()=>expect(traceRsk([2,2,1]).at(-1)!.p).toEqual([[1,2],[2]]));it('parses input',()=>expect(parseWord('3, 1 4')).toEqual([3,1,4]))})
