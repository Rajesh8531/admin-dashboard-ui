

const setItem = (name:string,data:object)=>{
    localStorage.setItem(name,JSON.stringify(data))
}

export default setItem