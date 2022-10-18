
const main = async()=>{
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const token = params.token;

  if(token){
    const url = `https://d685-2001-b011-7001-3d90-811f-5a8d-5d1e-5be2.jp.ngrok.io/api/qrcode/get?token=${token}`
    
    const result = await fetch(url,{
      mode: 'cors',
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(response => {
      return response.json()
    })
    .catch((error) => {
      console.log('error',error)
    })

    const qrcode = result?.qrcode
    const project = qrcode?.project
    const resources = project?.resources ||[]
    const resource = resources[0] || {}
    const media = resource?.media

    if(media && media.src){
      $("#img").attr("src", media?.src);
    }

  }
}

main()
