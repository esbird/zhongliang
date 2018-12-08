const Storage =  {}

Storage.get = (name) =>{
  // console.log(localStorage.getItem(name))
    return localStorage.getItem(name)
}

Storage.set = async (name, val) =>{
  await localStorage.setItem(name, val)
}

Storage.add = async (name, addVal)=> {
    let oldVal = await Storage.get(name)
    let newVal = await oldVal.concat(addVal)
    await Storage.set(name, newVal)
}

export default Storage