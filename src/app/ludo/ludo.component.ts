import { Component, OnInit, ViewChild } from '@angular/core';
import { delay } from 'q';
import {MatDialog} from '@angular/material/dialog';
import {MatMenuTrigger} from '@angular/material/menu';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-ludo',
  templateUrl: './ludo.component.html',
  styleUrls: ['./ludo.component.css']
})
export class LudoComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public tiles: Tile[]=[];
  public tile:Tile;
  public showData:string='';
  public greenSquares: number[]=[];
  public redSquares: number[]=[];
  public blueSquares: number[]=[];
  public yellowSquares: number[]=[];
  public graySquares: number[]=[37,123,103,189];
  public whiteSquares: number[]=[17,18,19,20,32,35,47,50,62,63,64,65,
                                  26,27,28,29,41,44,56,59,71,72,73,74,
                                  152,153,154,155,167,170,182,185,197,198,199,200,
                                  161,162,163,164,176,179,191,194,206,207,208,209];
  public squareColor:string='gray';
  public showRed: boolean=false;
  public greenPieces: number[]=[33,34,48,49];
  public redPieces: number[]=[168,169,183,184];
  public bluePieces: number[]=[177,178,192,193];
  public yellowPieces: number[]=[42,43,57,58];
  public red1:number;public blue1:number;public yellow1:number;public green1:number;
  public red2:number;public blue2:number;public yellow2:number;public green2:number;
  public red3:number;public blue3:number;public yellow3:number;public green3:number;
  public red4:number;public blue4:number;public yellow4:number;public green4:number;
  public rolledValue:number=-1;
  public rollingLog:number[]=[];
  public lastRolledValue:number;
  public validGreenValues:number[]=[92,93,94,95,96,82,67,52,37,22,7,8,9,24,39,54,69,84,100,101,102,103,104,105,120,135,134,133,132,131,130,144,159,174,189,204,219,218,217,202,187,172,157,142,126,125,124,123,122,121,106,107,108,109,110,111,112];
  public validRedValues:number[]=[202,187,172,157,142,126,125,124,123,122,121,106,91,92,93,94,95,96,82,67,52,37,22,7,8,9,24,39,54,69,84,100,101,102,103,104,105,120,135,134,133,132,131,130,144,159,174,189,204,219,218,203,188,173,158,143,128];
  public validBlueValues:number[]=[134,133,132,131,130,144,159,174,189,204,219,218,217,202,187,172,157,142,126,125,124,123,122,121,106,91,92,93,94,95,96,82,67,52,37,22,7,8,9,24,39,54,69,84,100,101,102,103,104,105,120,119,118,117,116,115,114];
  public validYellowValues:number[]=[24,39,54,69,84,100,101,102,103,104,105,120,135,134,133,132,131,130,144,159,174,189,204,219,218,217,202,187,172,157,142,126,125,124,123,122,121,106,91,92,93,94,95,96,82,67,52,37,22,7,8,23,38,53,68,83,98];
  public rolledRed1:number=0;
  public redFlag1:boolean=false;
  public turnValue:number=1;
  public playerTurn:string='Red Player Turn'
  public greenRolledValue:number=-1;
  public greenRollingLog:number[]=[];
  public greenLastRolledValue:number;

  public redRolledValue:number=-1;
  public redRollingLog:number[]=[];
  public redLastRolledValue:number;

  public yellowRolledValue:number=-1;
  public yellowRollingLog:number[]=[];
  public yellowLastRolledValue:number;

  public blueRolledValue:number=-1;
  public blueRollingLog:number[]=[];
  public blueLastRolledValue:number;

  public currentTurn:number=1;
  public showGreenArrow:boolean=true;
  public allowGreenPieceMove=false;
  public allowRedPieceMove=false;
  public allowYellowPieceMove=false;
  public allowBluePieceMove=false;
  public rolls:number[]=[];
  public rollsLength:number=0;
  public clicked6:boolean=false;
  public clicked61:boolean=false;
  public clicked1:boolean=false;
  public clicked2:boolean=false;
  public clicked3:boolean=false;
  public clicked4:boolean=false;
  public clicked5:boolean=false;

  public showRedArrow:boolean=true;
  public showYellowArrow:boolean=true;
  public showBlueArrow:boolean=true;

  public greenCurrVal:number=0;
  public redCurrVal:number=0;
  public yellowCurrVal:number=0;
  public blueCurrVal:number=0;
  public valOfm:number=0;
  public star:number[]=[202,189,134,92,123,37,24,103];
  constructor() { }

  ngOnInit(): void {
    this.getColorSquares(1,'green');
    this.getColorSquares(136,'red');
    this.getColorSquares(10,'yellow');
    this.getColorSquares(145,'blue');
    this.fillTiles();
    this.initializeGame();
  }

  fillTiles():void{   
    for(let i= 1;i<=225;i++){
      this.tile=<Tile>{
        text:i.toString(),
        cols:1,
        rows:1,
        color:this.setColor(i)
      }
      this.tiles.push(this.tile);
    }
  }
  show(data:string):void{
    this.showData=data;
  }
  getColorSquares(n:number,colorName:string):void{
    let nn=n;
    if(colorName=='green'){
      for(let i=1;i<=6;i++){
        for(let j=0;j<=5;j++){
          this.greenSquares.push(nn+j)
        }
        nn=nn+15;
      }
      this.greenSquares.push(92,107,108,109,110,111);
    }
    if(colorName=='red'){
      for(let i=1;i<=6;i++){
        for(let j=0;j<=5;j++){
          this.redSquares.push(nn+j)
        }
        nn=nn+15;
      }
      this.redSquares.push(202,203,188,173,158,143);
    }
    if(colorName=='blue'){
      for(let i=1;i<=6;i++){
        for(let j=0;j<=5;j++){
          this.blueSquares.push(nn+j)
        }
        nn=nn+15;
      }
      this.blueSquares.push(115,116,117,118,119,134);
    }
    if(colorName=='yellow'){
      for(let i=1;i<=6;i++){
        for(let j=0;j<=5;j++){
          this.yellowSquares.push(nn+j)
        }
        nn=nn+15;
      }
      this.yellowSquares.push(24,23,38,53,68,83);
    }
  }
  setColor(n:number):string{
    if(this.greenSquares.includes(n)){
      if(this.whiteSquares.includes(n)){
        return 'lightgreen';
      }
      return 'green';
    }
    if(this.redSquares.includes(n)){
      if(this.whiteSquares.includes(n)){
        return 'lightpink';
      }
      return 'red';
    }
    if(this.yellowSquares.includes(n)){
      if(this.whiteSquares.includes(n)){
        return 'lightyellow';
      }
      return 'yellow';
    }
    if(this.blueSquares.includes(n)){
      if(this.whiteSquares.includes(n)){
        return 'lightblue';
      }
      return 'blue';
    }
    if(this.graySquares.includes(n)){
      return 'lightgray';
    }
    return 'white';
  }
  initializeGame():void{
    this.red1=168;this.red2=169;this.red3=183;this.red4=184;
    this.blue1=177;this.blue2=178;this.blue3=192;this.blue4=193;
    this.green1=33;this.green2=34;this.green3=48;this.green4=49;
    this.yellow1=42;this.yellow2=43;this.yellow3=57;this.yellow4=58;
  }
  rollDice(col:string):void{
    if(col=='green'){
      this.greenRollDice();
      this.rolls.push(this.greenRolledValue);
      if(this.greenRolledValue!=6){
        if(this.green1==33 && this.green2==34 && this.green3==48 && this.green4==49 && this.rolls.length==1){
          this.rolls=[];
          this.nextTurn();
          return;
        }
        this.rollsLength=this.rolls.length;    
        this.showGreenArrow=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('green');
        }
      }
    }

    if(col=='red'){
      this.redRollDice();
      this.rolls.push(this.redRolledValue);
      if(this.redRolledValue!=6){
        if(this.red1==168 && this.red2==169 && this.red3==183 && this.red4==184 && this.rolls.length==1){
          this.rolls=[];
          this.nextTurn();
          return;
        }
        this.rollsLength=this.rolls.length;    
        this.showRedArrow=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('red');
        }
      }
    }
    if(col=='yellow'){
      this.yellowRollDice();
      this.rolls.push(this.yellowRolledValue);
      if(this.yellowRolledValue!=6){
        if(this.yellow1==42 && this.yellow2==43 && this.yellow3==57 && this.yellow4==58 && this.rolls.length==1){
          this.rolls=[];
          this.nextTurn();
          return;
        }
        this.rollsLength=this.rolls.length;    
        this.showYellowArrow=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('yellow');
        }
      }
    }
    if(col=='blue'){
      this.blueRollDice();
      this.rolls.push(this.blueRolledValue);
      if(this.blueRolledValue!=6){
        if(this.blue1==177 && this.blue2==178 && this.blue3==192 && this.blue4==193 && this.rolls.length==1){
          this.rolls=[];
          this.nextTurn();
          return;
        }
        this.rollsLength=this.rolls.length;    
        this.showBlueArrow=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('blue');
        }
      }
    }
  }
  setMove(n:number,m:number,col:string){
    this.valOfm=m;
    if(col=='green'){
      this.greenCurrVal=n;
      if(m==6){ this.clicked6=true;}
      if(m==61){ this.clicked61=true;}
      if(m==1){ this.clicked1=true;}
      if(m==2){ this.clicked2=true;}
      if(m==3){ this.clicked3=true;}
      if(m==4){ this.clicked4=true;}
      if(m==5){ this.clicked5=true;}
      this.allowGreenPieceMove=true;
    }
    if(col=='red'){
      this.redCurrVal=n;
      if(m==6){ this.clicked6=true;}
      if(m==61){ this.clicked61=true;}
      if(m==1){ this.clicked1=true;}
      if(m==2){ this.clicked2=true;}
      if(m==3){ this.clicked3=true;}
      if(m==4){ this.clicked4=true;}
      if(m==5){ this.clicked5=true;}
      this.allowRedPieceMove=true;
    }
    if(col=='yellow'){
      this.yellowCurrVal=n;
      if(m==6){ this.clicked6=true;}
      if(m==61){ this.clicked61=true;}
      if(m==1){ this.clicked1=true;}
      if(m==2){ this.clicked2=true;}
      if(m==3){ this.clicked3=true;}
      if(m==4){ this.clicked4=true;}
      if(m==5){ this.clicked5=true;}
      this.allowYellowPieceMove=true;
    }
    if(col=='blue'){
      this.blueCurrVal=n;
      if(m==6){ this.clicked6=true;}
      if(m==61){ this.clicked61=true;}
      if(m==1){ this.clicked1=true;}
      if(m==2){ this.clicked2=true;}
      if(m==3){ this.clicked3=true;}
      if(m==4){ this.clicked4=true;}
      if(m==5){ this.clicked5=true;}
      this.allowBluePieceMove=true;
    }
  }
  movePiece(n:string,color:string,i:number):void{
    if(color=='red' && this.currentTurn==1 && this.allowRedPieceMove==true){
      let x=parseInt(n);
      if(this.validRedValues.indexOf(x)>=0 || this.redCurrVal==6){
        let y= this.validRedValues.indexOf(x);
        if(i==1){
          if(this.validRedValues.indexOf(x)>=0){
            this.red1=this.validRedValues[y+this.redCurrVal];
          }
          else{
            this.red1=this.validRedValues[0];
          }
        }
        else if(i==2){
          if(this.validRedValues.indexOf(x)>=0){
            this.red2=this.validRedValues[y+this.redCurrVal];
          }
          else{
            this.red2=this.validRedValues[0];
          }
        }
        else if(i==3){
          if(this.validRedValues.indexOf(x)>=0){
            this.red3=this.validRedValues[y+this.redCurrVal];
          }
          else{
            this.red3=this.validRedValues[0];
          }
        }
        else if(i==4){
          if(this.validRedValues.indexOf(x)>=0){
            this.red4=this.validRedValues[y+this.redCurrVal];
          }
          else{
            this.red4=this.validRedValues[0];
          }
        }
      }
      let y:boolean=this.capturePiece();
      if(y==true){
        this.adjustRolls2(this.redCurrVal,'red');   
        this.showRedArrow=true;
        return;
      }
      this.adjustRolls(this.redCurrVal,'red');   
    }
    if(color=='green' && this.currentTurn==2 && this.allowGreenPieceMove==true){
      let x=parseInt(n);
      if(this.validGreenValues.indexOf(x)>=0 || this.greenCurrVal==6){
        let y= this.validGreenValues.indexOf(x);
        if(i==1){
          if(this.validGreenValues.indexOf(x)>=0){
            this.green1=this.validGreenValues[y+this.greenCurrVal];
          }
          else{
            this.green1=this.validGreenValues[0];
          }
          this.greenPieces[0]=this.green1;
        }
        else if(i==2){
          if(this.validGreenValues.indexOf(x)>=0){
            this.green2=this.validGreenValues[y+this.greenCurrVal];
          }
          else{
            this.green2=this.validGreenValues[0];
          }
          this.greenPieces[1]=this.green2;
        }
        else if(i==3){
          if(this.validGreenValues.indexOf(x)>=0){
            this.green3=this.validGreenValues[y+this.greenCurrVal];
          }
          else{
            this.green3=this.validGreenValues[0];
          }
          this.greenPieces[2]=this.green3;
        }
        else if(i==4){
          if(this.validGreenValues.indexOf(x)>=0){
            this.green4=this.validGreenValues[y+this.greenCurrVal];
          }
          else{
            this.green4=this.validGreenValues[0];
          }
          this.greenPieces[3]=this.green4;
        }
      }
      let y:boolean=this.capturePiece();
      if(y==true){
        this.adjustRolls2(this.greenCurrVal,'green');   
        this.showGreenArrow=true;
        return;
      }
      this.adjustRolls(this.greenCurrVal,'green');    
    }
    if(color=='yellow' && this.currentTurn==3 && this.allowYellowPieceMove==true){
      let x=parseInt(n);
      if(this.validYellowValues.indexOf(x)>=0 || this.yellowCurrVal==6){
        let y= this.validYellowValues.indexOf(x);
        if(i==1){
          if(this.validYellowValues.indexOf(x)>=0){
            this.yellow1=this.validYellowValues[y+this.yellowCurrVal];
          }
          else{
            this.yellow1=this.validYellowValues[0];
          }
        }
        else if(i==2){
          if(this.validYellowValues.indexOf(x)>=0){
            this.yellow2=this.validYellowValues[y+this.yellowCurrVal];
          }
          else{
            this.yellow2=this.validYellowValues[0];
          }
        }
        else if(i==3){
          if(this.validYellowValues.indexOf(x)>=0){
            this.yellow3=this.validYellowValues[y+this.yellowCurrVal];
          }
          else{
            this.yellow3=this.validYellowValues[0];
          }
        }
        else if(i==4){
          if(this.validYellowValues.indexOf(x)>=0){
            this.yellow4=this.validYellowValues[y+this.yellowCurrVal];
          }
          else{
            this.yellow4=this.validYellowValues[0];
          }
        }
      }     
      let y:boolean=this.capturePiece();
      if(y==true){
        this.adjustRolls2(this.yellowCurrVal,'yellow');   
        this.showYellowArrow=true;
        return;
      }
      this.adjustRolls(this.yellowCurrVal,'yellow'); 
    }
    if(color=='blue' && this.currentTurn==4 && this.allowBluePieceMove==true){
      let x=parseInt(n);
      if(this.validBlueValues.indexOf(x)>=0 || this.blueCurrVal==6){
        let y= this.validBlueValues.indexOf(x);
        if(i==1){
          if(this.validBlueValues.indexOf(x)>=0){
            this.blue1=this.validBlueValues[y+this.blueCurrVal];
          }
          else{
            this.blue1=this.validBlueValues[0];
          }
        }
        else if(i==2){
          if(this.validBlueValues.indexOf(x)>=0){
            this.blue2=this.validBlueValues[y+this.blueCurrVal];
          }
          else{
            this.blue2=this.validBlueValues[0];
          }
        }
        else if(i==3){
          if(this.validBlueValues.indexOf(x)>=0){
            this.blue3=this.validBlueValues[y+this.blueCurrVal];
          }
          else{
            this.blue3=this.validBlueValues[0];
          }
        }
        else if(i==4){
          if(this.validBlueValues.indexOf(x)>=0){
            this.blue4=this.validBlueValues[y+this.blueCurrVal];
          }
          else{
            this.blue4=this.validBlueValues[0];
          }
        }
      }     
      let y:boolean=this.capturePiece();
      if(y==true){
        this.adjustRolls2(this.blueCurrVal,'blue');   
        this.showBlueArrow=true;
        return;
      }
      this.adjustRolls(this.blueCurrVal,'blue');
    }   
  }
  adjustRolls(n:number,s:string):void{
    let rolls1:number[]=[];
    let c=0;
    for(let i =0;i<this.rolls.length;i++){
      if(this.rolls[i]!=n){
        rolls1.push(this.rolls[i]);
      }
      else{
        c=i;
        break;
      }
    }
    for(let i =c+1;i<this.rolls.length;i++){
      rolls1.push(this.rolls[i]);
    }
    this.rolls=rolls1;
    this.rollsLength=this.rolls.length;   
    rolls1=[];
    if(this.rolls.length==0){
      this.rolls=[];  
      this.nextTurn();    
    }
    if(s=='red')
    {
      this.allowRedPieceMove=false; 
      if(this.rolls.length==1){
        this.moveSynchronizer('red');
      }
    }
      if(s=='green')
      {
        this.allowGreenPieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('green');
        }
      }
      if(s=='yellow')
      {
        this.allowYellowPieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('yellow');
        }
      }
      if(s=='blue')
      {
        this.allowBluePieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('blue');
        }
      }

    if(this.valOfm ==6){ this.clicked6=false;}
      if(this.valOfm==61){ this.clicked61=false;}
      if(this.valOfm==1){ this.clicked1=false;}
      if(this.valOfm==2){ this.clicked2=false;}
      if(this.valOfm==3){ this.clicked3=false;}
      if(this.valOfm==4){ this.clicked4=false;}
      if(this.valOfm==5){ this.clicked5=false;}
  }
  adjustRolls2(n:number,s:string):void{
    let rolls1:number[]=[];
    let c=0;
    for(let i =0;i<this.rolls.length;i++){
      if(this.rolls[i]!=n){
        rolls1.push(this.rolls[i]);
      }
      else{
        c=i;
        break;
      }
    }
    for(let i =c+1;i<this.rolls.length;i++){
      rolls1.push(this.rolls[i]);
    }
    this.rolls=rolls1;
    this.rollsLength=this.rolls.length;   
    rolls1=[];
    if(s=='red')
    {
      this.allowRedPieceMove=false; 
      if(this.rolls.length==1){
        this.moveSynchronizer('red');
      }
    }
      if(s=='green')
      {
        this.allowGreenPieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('green');
        }
      }
      if(s=='yellow')
      {
        this.allowYellowPieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('yellow');
        }
      }
      if(s=='blue')
      {
        this.allowBluePieceMove=false;
        if(this.rolls.length==1){
          this.moveSynchronizer('blue');
        }
      }

      if(this.valOfm ==6){ this.clicked6=false;}
      if(this.valOfm==61){ this.clicked61=false;}
      if(this.valOfm==1){ this.clicked1=false;}
      if(this.valOfm==2){ this.clicked2=false;}
      if(this.valOfm==3){ this.clicked3=false;}
      if(this.valOfm==4){ this.clicked4=false;}
      if(this.valOfm==5){ this.clicked5=false;}
  }

  nextTurn():void{
    this.showRedArrow=true;
    this.showGreenArrow=true;
    this.showYellowArrow=true;
    this.showBlueArrow=true;
    this.currentTurn=this.currentTurn+1;
    if(this.currentTurn>4){
      this.currentTurn=1;
    }
  }
  greenRollDice():void{
    if(this.currentTurn==2){
      let value=Math.floor(Math.random()*(6)+1);
      this.greenRolledValue=value;
      this.greenRollingLog.push(this.greenRolledValue);
      this.greenLastRolledValue=this.greenRollingLog[this.greenRollingLog.length-2];
    }
  }
  redRollDice():void{
    if(this.currentTurn==1){
      let value=Math.floor(Math.random()*(6)+1);
      this.redRolledValue=value;
      this.redRollingLog.push(this.redRolledValue);
      this.redLastRolledValue=this.redRollingLog[this.redRollingLog.length-2];
    }
  }
  yellowRollDice():void{
    if(this.currentTurn==3){
      let value=Math.floor(Math.random()*(6)+1);
      this.yellowRolledValue=value;
      this.yellowRollingLog.push(this.yellowRolledValue);
      this.yellowLastRolledValue=this.yellowRollingLog[this.yellowRollingLog.length-2];
    }
  }
  blueRollDice():void{
    if(this.currentTurn==4){
      let value=Math.floor(Math.random()*(6)+1);
      this.blueRolledValue=value;
      this.blueRollingLog.push(this.blueRolledValue);
      this.blueLastRolledValue=this.blueRollingLog[this.blueRollingLog.length-2];
    }
  }

  moveSynchronizer(s:string):void{
    if(this.rolls.length==1){
      if(s=='green'){
        this.greenCurrVal=this.rolls[0];
        this.setMove(this.greenCurrVal,this.greenCurrVal,'green');
      }
      if(s=='red'){
        this.redCurrVal=this.rolls[0];
        this.setMove(this.redCurrVal,this.redCurrVal,'red');
      }
      if(s=='yellow'){
        this.yellowCurrVal=this.rolls[0];
        this.setMove(this.yellowCurrVal,this.yellowCurrVal,'yellow');
      }
      if(s=='blue'){
        this.blueCurrVal=this.rolls[0];
        this.setMove(this.blueCurrVal,this.blueCurrVal,'blue');
      }
    }
  }

  capturePiece():boolean{
    if(this.currentTurn==1){
      if(this.red1!=202 && this.red1!=189 && this.red1!=134 && this.red1!=92 && 
        this.red1!=123 && this.red1!=37 && this.red1!=24 &&this.red1!=103){
        if(this.red1==this.green1){this.green1=33;return true;}
        if(this.red1==this.green2){this.green2=34;return true;}
        if(this.red1==this.green3){this.green3=48;return true;}
        if(this.red1==this.green4){this.green4=49;return true;}
        if(this.red1==this.yellow1){this.yellow1=42;return true;}
        if(this.red1==this.yellow2){this.yellow2=43;return true;}
        if(this.red1==this.yellow3){this.yellow3=57;return true;}
        if(this.red1==this.yellow4){this.yellow4=58;return true;}
        if(this.red1==this.blue1){this.blue1=177;return true;}
        if(this.red1==this.blue2){this.blue2=178;return true;}
        if(this.red1==this.blue3){this.blue3=192;return true;}
        if(this.red1==this.blue4){this.blue4=193;return true;}
      }
      
      if(this.red2!=202 && this.red2!=189 && this.red2!=134 && this.red2!=92 && 
        this.red2!=123 && this.red2!=37 && this.red2!=24 && this.red2!=103){
        if(this.red2==this.green1){this.green1=33;return true;}
        if(this.red2==this.green2){this.green2=34;return true;}
        if(this.red2==this.green3){this.green3=48;return true;}
        if(this.red2==this.green4){this.green4=49;return true;}
        if(this.red2==this.yellow1){this.yellow1=42;return true;}
        if(this.red2==this.yellow2){this.yellow2=43;return true;}
        if(this.red2==this.yellow3){this.yellow3=57;return true;}
        if(this.red2==this.yellow4){this.yellow4=58;return true;}
        if(this.red2==this.blue1){this.blue1=177;return true;}
        if(this.red2==this.blue2){this.blue2=178;return true;}
        if(this.red2==this.blue3){this.blue3=192;return true;}
        if(this.red2==this.blue4){this.blue4=193;return true;}
      }
      
      if(this.red3!=202 && this.red3!=189 && this.red3!=134 && this.red3!=92 && 
        this.red3!=123 && this.red3!=37 && this.red3!=24 &&this.red3!=103){
        if(this.red3==this.green1){this.green1=33;return true;}
        if(this.red3==this.green2){this.green2=34;return true;}
        if(this.red3==this.green3){this.green3=48;return true;}
        if(this.red3==this.green4){this.green4=49;return true;}
        if(this.red3==this.yellow1){this.yellow1=42;return true;}
        if(this.red3==this.yellow2){this.yellow2=43;return true;}
        if(this.red3==this.yellow3){this.yellow3=57;return true;}
        if(this.red3==this.yellow4){this.yellow4=58;return true;}
        if(this.red3==this.blue1){this.blue1=177;return true;}
        if(this.red3==this.blue2){this.blue2=178;return true;}
        if(this.red3==this.blue3){this.blue3=192;return true;}
        if(this.red3==this.blue4){this.blue4=193;return true;}
      }
      if(this.red4!=202 && this.red4!=189 && this.red4!=134 && this.red4!=92 && 
        this.red4!=123 && this.red4!=37 && this.red4!=24 &&this.red4!=103){
        if(this.red4==this.green1){this.green1=33;return true;}
        if(this.red4==this.green2){this.green2=34;return true;}
        if(this.red4==this.green3){this.green3=48;return true;}
        if(this.red4==this.green4){this.green4=49;return true;}
        if(this.red4==this.yellow1){this.yellow1=42;return true;}
        if(this.red4==this.yellow2){this.yellow2=43;return true;}
        if(this.red4==this.yellow3){this.yellow3=57;return true;}
        if(this.red4==this.yellow4){this.yellow4=58;return true;}
        if(this.red4==this.blue1){this.blue1=177;return true;}
        if(this.red4==this.blue2){this.blue2=178;return true;}
        if(this.red4==this.blue3){this.blue3=192;return true;}
        if(this.red4==this.blue4){this.blue4=193;return true;}
      } 
    }
    if(this.currentTurn==2){
      if(this.green1!=202 && this.green1!=189 && this.green1!=134 && this.green1!=92 && 
        this.green1!=123 && this.green1!=37 && this.green1!=24 && this.green1!=103){
        if(this.green1==this.red1){this.red1=168;return true;}
        if(this.green1==this.red2){this.red2=169;return true;}
        if(this.green1==this.red3){this.red3=183;return true;}
        if(this.green1==this.red4){this.red4=184;return true;}
        if(this.green1==this.yellow1){this.yellow1=42;return true;}
        if(this.green1==this.yellow2){this.yellow2=43;return true;}
        if(this.green1==this.yellow3){this.yellow3=57;return true;}
        if(this.green1==this.yellow4){this.yellow4=58;return true;}
        if(this.green1==this.blue1){this.blue1=177;return true;}
        if(this.green1==this.blue2){this.blue2=178;return true;}
        if(this.green1==this.blue3){this.blue3=192;return true;}
        if(this.green1==this.blue4){this.blue4=193;return true;}
      }
      
      if(this.green2!=202 && this.green2!=189 && this.green2!=134 && this.green2!=92 && 
        this.green2!=123 && this.green2!=37 && this.green2!=24 && this.green2!=103){
        if(this.green2==this.red1){this.red1=168;return true;}
        if(this.green2==this.red2){this.red2=169;return true;}
        if(this.green2==this.red3){this.red3=183;return true;}
        if(this.green2==this.red4){this.red4=184;return true;}
        if(this.green2==this.yellow1){this.yellow1=42;return true;}
        if(this.green2==this.yellow2){this.yellow2=43;return true;}
        if(this.green2==this.yellow3){this.yellow3=57;return true;}
        if(this.green2==this.yellow4){this.yellow4=58;return true;}
        if(this.green2==this.blue1){this.blue1=177;return true;}
        if(this.green2==this.blue2){this.blue2=178;return true;}
        if(this.green2==this.blue3){this.blue3=192;return true;}
        if(this.green2==this.blue4){this.blue4=193;return true;}
      }
      if(this.green3!=202 && this.green3!=189 && this.green3!=134 && this.green3!=92 && 
        this.green3!=123 && this.green3!=37 && this.green3!=24 && this.green3!=103){
        if(this.green3==this.red1){this.red1=168;return true;}
        if(this.green3==this.red2){this.red2=169;return true;}
        if(this.green3==this.red3){this.red3=183;return true;}
        if(this.green3==this.red4){this.red4=184;return true;}
        if(this.green3==this.yellow1){this.yellow1=42;return true;}
        if(this.green3==this.yellow2){this.yellow2=43;return true;}
        if(this.green3==this.yellow3){this.yellow3=57;return true;}
        if(this.green3==this.yellow4){this.yellow4=58;return true;}
        if(this.green3==this.blue1){this.blue1=177;return true;}
        if(this.green3==this.blue2){this.blue2=178;return true;}
        if(this.green3==this.blue3){this.blue3=192;return true;}
        if(this.green3==this.blue4){this.blue4=193;return true;}
      }
      if(this.green4!=202 && this.green4!=189 && this.green4!=134 && this.green4!=92 && 
        this.green4!=123 && this.green4!=37 && this.green4!=24 && this.green4!=103){
        if(this.green4==this.red1){this.red1=168;return true;}
        if(this.green4==this.red2){this.red2=169;return true;}
        if(this.green4==this.red3){this.red3=183;return true;}
        if(this.green4==this.red4){this.red4=184;return true;}
        if(this.green4==this.yellow1){this.yellow1=42;return true;}
        if(this.green4==this.yellow2){this.yellow2=43;return true;}
        if(this.green4==this.yellow3){this.yellow3=57;return true;}
        if(this.green4==this.yellow4){this.yellow4=58;return true;}
        if(this.green4==this.blue1){this.blue1=177;return true;}
        if(this.green4==this.blue2){this.blue2=178;return true;}
        if(this.green4==this.blue3){this.blue3=192;return true;}
        if(this.green4==this.blue4){this.blue4=193;return true;}
      }
    }
    if(this.currentTurn==3){
      if(this.yellow1!=202 && this.yellow1!=189 && this.yellow1!=134 && this.yellow1!=92 && 
        this.yellow1!=123 && this.yellow1!=37 && this.yellow1!=24 && this.yellow1!=103){
        if(this.yellow1==this.blue1){this.blue1=177;return true;}
        if(this.yellow1==this.blue2){this.blue2=178;return true;}
        if(this.yellow1==this.blue3){this.blue3=192;return true;}
        if(this.yellow1==this.blue4){this.blue4=193;return true;}
        if(this.yellow1==this.red1){this.red1=168;return true;}
        if(this.yellow1==this.red2){this.red2=169;return true;}
        if(this.yellow1==this.red3){this.red3=183;return true;}
        if(this.yellow1==this.red4){this.red4=184;return true;}
        if(this.yellow1==this.green1){this.green1=33;return true;}
        if(this.yellow1==this.green2){this.green2=34;return true;}
        if(this.yellow1==this.green3){this.green3=48;return true;}
        if(this.yellow1==this.green4){this.green4=49;return true;}
      }
      if(this.yellow2!=202 && this.yellow2!=189 && this.yellow2!=134 && this.yellow2!=92 && 
        this.yellow2!=123 && this.yellow2!=37 && this.yellow2!=24 && this.yellow2!=103){
        if(this.yellow2==this.blue1){this.blue1=177;return true;}
        if(this.yellow2==this.blue2){this.blue2=178;return true;}
        if(this.yellow2==this.blue3){this.blue3=192;return true;}
        if(this.yellow2==this.blue4){this.blue4=193;return true;}
        if(this.yellow2==this.red1){this.red1=168;return true;}
        if(this.yellow2==this.red2){this.red2=169;return true;}
        if(this.yellow2==this.red3){this.red3=183;return true;}
        if(this.yellow2==this.red4){this.red4=184;return true;}
        if(this.yellow2==this.green1){this.green1=33;return true;}
        if(this.yellow2==this.green2){this.green2=34;return true;}
        if(this.yellow2==this.green3){this.green3=48;return true;}
        if(this.yellow2==this.green4){this.green4=49;return true;}
      }
      if(this.yellow3!=202 && this.yellow3!=189 && this.yellow3!=134 && this.yellow3!=92 && 
        this.yellow3!=123 && this.yellow3!=37 && this.yellow3!=24 && this.yellow3!=103){
        if(this.yellow3==this.blue1){this.blue1=177;return true;}
        if(this.yellow3==this.blue2){this.blue2=178;return true;}
        if(this.yellow3==this.blue3){this.blue3=192;return true;}
        if(this.yellow3==this.blue4){this.blue4=193;return true;}
        if(this.yellow3==this.red1){this.red1=168;return true;}
        if(this.yellow3==this.red2){this.red2=169;return true;}
        if(this.yellow3==this.red3){this.red3=183;return true;}
        if(this.yellow3==this.red4){this.red4=184;return true;}
        if(this.yellow3==this.green1){this.green1=33;return true;}
        if(this.yellow3==this.green2){this.green2=34;return true;}
        if(this.yellow3==this.green3){this.green3=48;return true;}
        if(this.yellow3==this.green4){this.green4=49;return true;}
      }
      if(this.yellow4!=202 && this.yellow4!=189 && this.yellow4!=134 && this.yellow4!=92 && 
        this.yellow4!=123 && this.yellow4!=37 && this.yellow4!=24 && this.yellow4!=103){
        if(this.yellow4==this.blue1){this.blue1=177;return true;}
        if(this.yellow4==this.blue2){this.blue2=178;return true;}
        if(this.yellow4==this.blue3){this.blue3=192;return true;}
        if(this.yellow4==this.blue4){this.blue4=193;return true;}
        if(this.yellow4==this.red1){this.red1=168;return true;}
        if(this.yellow4==this.red2){this.red2=169;return true;}
        if(this.yellow4==this.red3){this.red3=183;return true;}
        if(this.yellow4==this.red4){this.red4=184;return true;}
        if(this.yellow4==this.green1){this.green1=33;return true;}
        if(this.yellow4==this.green2){this.green2=34;return true;}
        if(this.yellow4==this.green3){this.green3=48;return true;}
        if(this.yellow4==this.green4){this.green4=49;return true;}
      }
    }
    if(this.currentTurn==4){
      if(this.blue1!=202 && this.blue1!=189 && this.blue1!=134 && this.blue1!=92 && 
        this.blue1!=123 && this.blue1!=37 && this.blue1!=24 && this.blue1!=103){
        if(this.blue1==this.red1){this.red1=168;return true;}
        if(this.blue1==this.red2){this.red2=169;return true;}
        if(this.blue1==this.red3){this.red3=183;return true;}
        if(this.blue1==this.red4){this.red4=184;return true;}
        if(this.blue1==this.green1){this.green1=33;return true;}
        if(this.blue1==this.green2){this.green2=34;return true;}
        if(this.blue1==this.green3){this.green3=48;return true;}
        if(this.blue1==this.green4){this.green4=49;return true;}
        if(this.blue1==this.yellow1){this.yellow1=42;return true;}
        if(this.blue1==this.yellow2){this.yellow2=43;return true;}
        if(this.blue1==this.yellow3){this.yellow3=57;return true;}
        if(this.blue1==this.yellow4){this.yellow4=58;return true;}
      }
      if(this.blue2!=202 && this.blue2!=189 && this.blue2!=134 && this.blue2!=92 && 
        this.blue2!=123 && this.blue2!=37 && this.blue2!=24 && this.blue2!=103){
        if(this.blue2==this.red1){this.red1=168;return true;}
        if(this.blue2==this.red2){this.red2=169;return true;}
        if(this.blue2==this.red3){this.red3=183;return true;}
        if(this.blue2==this.red4){this.red4=184;return true;}
        if(this.blue2==this.green1){this.green1=33;return true;}
        if(this.blue2==this.green2){this.green2=34;return true;}
        if(this.blue2==this.green3){this.green3=48;return true;}
        if(this.blue2==this.green4){this.green4=49;return true;}
        if(this.blue2==this.yellow1){this.yellow1=42;return true;}
        if(this.blue2==this.yellow2){this.yellow2=43;return true;}
        if(this.blue2==this.yellow3){this.yellow3=57;return true;}
        if(this.blue2==this.yellow4){this.yellow4=58;return true;}
      }
      if(this.blue3!=202 && this.blue3!=189 && this.blue3!=134 && this.blue3!=92 && 
        this.blue3!=123 && this.blue3!=37 && this.blue3!=24 && this.blue3!=103){
        if(this.blue3==this.red1){this.red1=168;return true;}
        if(this.blue3==this.red2){this.red2=169;return true;}
        if(this.blue3==this.red3){this.red3=183;return true;}
        if(this.blue3==this.red4){this.red4=184;return true;}
        if(this.blue3==this.green1){this.green1=33;return true;}
        if(this.blue3==this.green2){this.green2=34;return true;}
        if(this.blue3==this.green3){this.green3=48;return true;}
        if(this.blue3==this.green4){this.green4=49;return true;}
        if(this.blue3==this.yellow1){this.yellow1=42;return true;}
        if(this.blue3==this.yellow2){this.yellow2=43;return true;}
        if(this.blue3==this.yellow3){this.yellow3=57;return true;}
        if(this.blue3==this.yellow4){this.yellow4=58;return true;}
      }
      if(this.blue4!=202 && this.blue4!=189 && this.blue4!=134 && this.blue4!=92 && 
        this.blue4!=123 && this.blue4!=37 && this.blue4!=24 && this.blue4!=103){
        if(this.blue4==this.red1){this.red1=168;return true;}
        if(this.blue4==this.red2){this.red2=169;return true;}
        if(this.blue4==this.red3){this.red3=183;return true;}
        if(this.blue4==this.red4){this.red4=184;return true;}
        if(this.blue4==this.green1){this.green1=33;return true;}
        if(this.blue4==this.green2){this.green2=34;return true;}
        if(this.blue4==this.green3){this.green3=48;return true;}
        if(this.blue4==this.green4){this.green4=49;return true;}
        if(this.blue4==this.yellow1){this.yellow1=42;return true;}
        if(this.blue4==this.yellow2){this.yellow2=43;return true;}
        if(this.blue4==this.yellow3){this.yellow3=57;return true;}
        if(this.blue4==this.yellow4){this.yellow4=58;return true;}
      }    
    }
    return false;
  }

}

// [33,34,48,49];
//   public redPieces: number[]=[168,169,183,184];
//   public bluePieces: number[]=[177,178,192,193];
//   public yellowPieces: number[]=[42,43,57,58];