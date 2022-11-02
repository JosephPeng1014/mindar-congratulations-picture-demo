
const main = async()=>{
  localStorage.clear();

  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const token = params.token;

  console.log('token', token)


  if(token){
    const url = `https://f553-2001-b011-7001-3890-a05d-4c01-6cd-7dc.jp.ngrok.io/api/qrcode/get?token=${token}`
    
    const result = await fetch(url,{
      mode: 'cors',
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
    .then(async response => {
      const result = await response.json()

      const qrcode = result?.qrcode
      const project = qrcode?.project
      const logo =  result?.qrcode?.project?.logo
      const resources = (project?.resources ||[]).filter(doc=>doc.type === 'ar')
      const resource = resources[0] || {}
      const media = resource?.media
      const compiledMarker = (project?.resources ||[]).find(doc=>doc.type === 'marker')


      if(logo&& logo.src){
        localStorage.setItem('logo', logo.src);
      }

      if(project){
        localStorage.setItem('title', project.title);
        localStorage.setItem('body', project.body);
      }
     
      if(media && media.src){
        localStorage.setItem('media',media?.src);
      }

      if(compiledMarker){
        const marker = compiledMarker.compiledMarker
        localStorage.setItem('marker', marker.src);
      }

      return result
    })
    .then(()=>{
      window.location.replace("/play.html")
    })
    .catch((error) => {
      console.log('error',error)
    })
  }



}

main()
