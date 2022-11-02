
const main = async()=>{
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const token = params.token;

  console.log('token', token)


  if(token){
    const url = `https://af1d-2001-b011-7001-3bf9-e1e3-900f-4b9d-b24f.jp.ngrok.io/api/qrcode/get?token=${token}`
    
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
    const resources = (project?.resources ||[]).filter(doc=>doc.type === 'ar')
    const resource = resources[0] || {}
    const media = resource?.media
    const compiledMarker = (project?.resources ||[]).find(doc=>doc.type === 'marker')


    if(media && media.src){
      $("#img").attr("src", media?.src);
    }

    if(compiledMarker){
      const marker = compiledMarker.compiledMarker
      console.log('marker',marker.src)

      $("#scene").attr("mindar-image", `imageTargetSrc: https://mscguide.s3.ap-northeast-1.amazonaws.com/compiledMarker/999adc1441514d3fe40accd939c8ed50-Cyvymfw5.mind; maxTrack: 1; filterMinCF:0.0001; filterBeta: 0.001;uiScanning:no`);
      const test = $("#scene").attr("mindar-image");
      console.log('test', test)
    }

  }
}

main()
