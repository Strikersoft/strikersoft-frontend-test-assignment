import {OrderedMap, Map} from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>{
        if (item.id){
            return acc.set(item.id, new DataRecord(item));
        }else{
           return acc.set(item.uid, new DataRecord(item));
        }
    }
       
    , new OrderedMap({}))
}

export function mapToArr(obj) {
    //console.log(obj);
    
   return obj.valueSeq().toArray();
    //return obj;
}
export function arrToObj(arr) {
    
  return arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});
}
