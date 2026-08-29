export type Tableau=number[][]
export type Bump={row:number,column:number,arriving:number,displaced?:number}
export type Step={index:number,inserted:number|null,p:Tableau,q:Tableau,bumps:Bump[],description:string}
const copy=(t:Tableau)=>t.map(r=>[...r])
export function traceRsk(word:number[]):Step[]{
 const p:Tableau=[],q:Tableau=[],steps:Step[]=[{index:0,inserted:null,p:[],q:[],bumps:[],description:'The tableaux begin empty. Select next to insert the first letter.'}]
 word.forEach((letter,i)=>{let arriving=letter,rowIndex=0;const bumps:Bump[]=[]
  while(true){if(!p[rowIndex])p[rowIndex]=[];const row=p[rowIndex],column=row.findIndex(x=>x>arriving)
   if(column<0){row.push(arriving);bumps.push({row:rowIndex,column:row.length-1,arriving});if(!q[rowIndex])q[rowIndex]=[];q[rowIndex].push(i+1);break}
   const displaced=row[column];row[column]=arriving;bumps.push({row:rowIndex,column,arriving,displaced});arriving=displaced;rowIndex++}
  const n=bumps.length-1,landing=bumps.at(-1)!
  steps.push({index:i+1,inserted:letter,p:copy(p),q:copy(q),bumps,description:n?letter+' travels through '+bumps.length+' rows, making '+n+(n===1?' bump':' bumps')+', then settles in row '+(landing.row+1)+'.':letter+' is larger than every entry in row 1, so it settles at the end.'})
 });return steps
}
export function parseWord(s:string){if(!s.trim())return[];const a=s.trim().split(/[\s,]+/).map(Number);return a.every(Number.isInteger)?a:null}
