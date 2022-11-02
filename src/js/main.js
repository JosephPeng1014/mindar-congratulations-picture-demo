
// 用來fetch project資料
const main = async()=>{
  // 先清用local storage
  localStorage.clear();

  //從url拿到token 
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const token = params.token;

  if(token){
    // togather 平台的api位置
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


      // 把資料存到localstorage

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
      // 都完成後跳轉到ar頁面
      window.location.replace("/play.html")
    })
    .catch((error) => {
      console.log('error',error)
    })
  }



}

main()
