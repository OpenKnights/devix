
interface StorageInstance {
  get:(key:string)=>any

  set:(key:string,value:any,options:any)=> boolean

  remove:(key:string)=> boolean
  
  has:(key:string)=> boolean

  clear: () => void
}


const storageAdapter = ()=>{

}


class DevixStorage {

  get(key:string){

  }

  set(key:string,value:any,options:any = {property:'key'}): boolean{

    return true
  }

  remove(key:string): boolean{
    
    return true
  }
  
  has(key:string){

  }

  clear(): boolean{

    return true
  }
}
