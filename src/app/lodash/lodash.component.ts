import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-lodash',
  templateUrl: './lodash.component.html',
  styleUrls: ['./lodash.component.css']
})
export class LodashComponent implements OnInit {
  camelCaseone:any;

  b:any;

  a:any;

  compact:any;

  find:any=[];

  users;

  array:any=[];

  other:any=[];

  countby:any=[];

  foreachright:any=[];

  difference;

  objects:any;

  objects1:any;

  drop:any;

  dropright:any;

  fill1:any;

  flatten:any = [];

  //add:any;

  divide:any;

  max:any;

  objectsmin:any;

  minby:any;

  subtract:any;

  sum:any;
  
  objectssumby:any;

  sumby:any;

  castArray:string;
  
  camelCase:any;

  ary:any;

  add:number;

  constructor() { }

  ngOnInit(): void {
   this.a =_.chunk(['a', 'b', 'c', 'd'], 2);
   console.log(this.a);
   this.b = _.clamp(10, -5, 5);

   //console.log(this.b);
   this.compact = _.compact([0, 1, false, 2, '', 3 ]);
   //console.log(this.compact);

    //find function only return first find value for condition
  this.users = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];
  this.find =_.find(this.users, function(o) { return o.age < 40; });
    //console.log(this.find);
    this.countby = _.countBy([6.1, 4.2, 6.3], Math.floor);

    //console.log(this.countby);
    this.foreachright = _.forEachRight([1, 2, 3, 4], function(value) {
      console.log(value);
    });

    this.compact = _.compact([0, 1, false, 2, '', 3]);

    this.array = [1];
    this.other = _.concat(this.array, 2, [3], [[4]]);
    console.log(this.other);


   this.difference = _.difference([2, 1], [2, 3]);

     this.objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
 
     this.objects1 = _.differenceWith(this.objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
     // => [{ 'x': 2, 'y': 1 }]
     console.log(this.objects1);

    this.drop = _.drop([1, 2, 3],2);

    this.dropright = _.dropRight([4, 5, 6],1);

     //console.log(_.isEmpty({})); 

    this.fill1 = [1, 2, 3];

     _.fill(this.fill1,'*');

    this.flatten = _.flatten([1, [2, [3, [4]], 5]]);
     console.log(this.flatten);

    this.add = _.add(19,4); 

    this.divide = _.divide(9,3);

    this.max = _.min([4, 2, 8, 6]);
    console.log(this.max);

    this.objectsmin = [{ 'n': 1 }, { 'n': 2 }];
 
    this.minby = _.minBy(this.objectsmin, function(o) { return o.n; });
    // => { 'n': 1 }
 
    // The `_.property` iteratee shorthand.
    //_.minBy(this.objectsmin, 'n');
    // => { 'n': 1 }

    console.log(this.objectsmin);

    console.log(_.chunk(['a', 'b', 'c', 'd'], 2)); //lodash function
    console.log(_.random(1, 100)); //lodash function

    this.subtract = _.subtract(600, 48);

    this.sum = _.sum([4, 2, 8, 6]);

     // this.objectssumby = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
 
    //this.sumby = _.sumBy(this.objectssumby, function(o) { return o.n; });

    //this.castArray = _.castArray({ 'a': 1 });

    this.camelCase = _.difference([2, 1], [2, 3]);

    this.ary = _.map(['6','8','9','10'],_.ary(parseInt, 1));
    console.log(this.ary);

    this.add = _.mean([4, 2, 8, 6, 10]);

    this.camelCaseone =_.words('fred, barney, & pebbles', /[^, ]+/g);
  }
  
  

}
