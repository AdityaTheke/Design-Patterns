class FSA{
  constructor(){


    let currentState = undefined;
    let arrayOfStates= [];

    this.nextState= function(s){
      if(arrayOfStates.length===0){
        return this;
      }
      let newState= currentState.nextState(s);
     //let newStateArray= arrayOfStates.filter((temp)=> lib220.getProperty(temp, newState).found);//assertion failed
     let newStateArray= arrayOfStates.filter((temp)=> temp.getName()===newState);
      if(newStateArray.length>=1){
        currentState= newStateArray[0];
      }
      return this;
    }

    this.createState = function(name, transitions){
      let newState= new State();
      newState.setName(name);

      function pairs(newPair) {
        let newKey = Object.keys(newPair);
        let newValue= lib220.getProperty(newPair, newKey[0]).value;
        newState.addTransition(newKey[0], newValue);//checked
      }

      transitions.forEach(pairs);
      if((arrayOfStates.reduce((curr,x) => x.getName() === name || curr, false))===false)
      {
        arrayOfStates.push(newState);
      }
     else{

       function createArray(x) {
          if(x.getName !== name) {
            return x;
          }
          else {
            return newState;
          }
         }
       arrayOfStates = arrayOfStates.map(createArray);
     }
     if(arrayOfStates.length === 1) {

       currentState = arrayOfStates[0];
     }

     if(currentState.getName() === name) {
       currentState = newState;
     }
     return this;

   }

    this.getStateDescription= function(){
      if(arrayOfStates.length>=1){
        return currentState.getName();
      }
      else{
        return "";
      }
    }

    this.createMemento= function(){
      let newMemento= new Memento().storeState(currentState);
      return newMemento;
    }

    this.restoreMemento= function(memento){
      currentState= memento.getState();
      return this;
    }

    class State{
      constructor(){
        let name= "";
        let transitions= [];
        this.setName= function(newName){
          name=newName;
          return this;
        }
        this.nextState= function(state){
          let newState= transitions.filter((x)=> lib220.getProperty(x, state).found);
          if(newState.length>=1){
            //return newState[randomNum(0, newState.length)];//throws error 
            return lib220.getProperty(newState[randomNum(0, newState.length)], state).value;
          }
          else{
            return "";
        }
      }

      this.addTransition= function(string1, string2){
        //let newTransition = {string1: string2};//throws error
        let newTransition = {};
        lib220.setProperty(newTransition, string1, string2);
        transitions.push(newTransition);
        return this;
      }

      this.getName= function(){
        return name;
      }
      
    }
  }

  class Memento{
    constructor(){
      let state= undefined;
      this.storeState= function(currState){
        state=currState;
        return this;
      }

      this.getState= function(){
        return state;
      }
    }
  }
}
}
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}











