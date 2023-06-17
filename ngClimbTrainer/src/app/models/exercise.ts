export class Exercise {
 id: number;
 name: string;
 description: string;
 reps: number;
 sets: number;
 type: string;
 imageUrl: string;

 constructor(
  id:number=0,
  name: string='',
  description: string='',
  reps: number=0,
  sets: number=0,
  type: string='',
  imageUrl: string=''
 ){
  this.id=id;
  this.name=name;
  this.description=description;
  this.reps=reps;
  this.sets=sets;
  this.type=type;
  this.imageUrl=imageUrl;
 }

}
