
export const request = async function (url, data = {}) {
  try{
    const resp = await fetch(url)
    return await resp.json()
  }catch(e){
    console.log(e)
  }
}
