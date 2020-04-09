export default {
  download (data, name, isStream) {
    try{
      const type = isStream ? 'applicatoin/octet-stream' : 'application/1vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      const blob = new Blob([data], {type});
      if(navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, name);
      }else {
        const objectUrl = URL.createObjectURL(blob);
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.setAttribute('href', objectUrl);
        a.setAttribute('download', name);
        a.click();
        a.remove();
        URL.revokeObjectURL(objectUrl);
      }
    } catch {
      console.log('下载失败！');
    }
  },
  downloadImg(res, fileName) {
    if (!res) return;
    // let url='data:image/jpg;base64,'+ btoa(
    //   new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
    
    // let blob = new Blob([res.data])
    // let url = window.URL.createObjectURL(blob);

    // let url = res.data.Data;
    
    console.log(url);
    var link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = fileName;
    link.target = '_b'
    link.click()
    link.remove()
  }
}
// https://blog.csdn.net/ko_in_5/article/details/85335702