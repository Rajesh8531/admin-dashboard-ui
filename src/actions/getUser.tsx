interface userData {
    token:string;
    name : string;
    email : string;
    id : string;
}

const getUser = ()=>{
    const data:userData = JSON.parse(localStorage.getItem('profile')!)
    return data
}

export default getUser