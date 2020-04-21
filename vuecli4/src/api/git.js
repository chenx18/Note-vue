import http from './http';

class api {
  constructor() {}
  // 获取json目录
  getMenJson = params => {
    return http.get(`/api1/chenx18/vueNode/blob/master/NotesDocument/tree.json`, params);
  }

  // 获取详细内容
  getContent = url => {
    return http.get(`/api1/chenx18/vueNode/blob/master/NotesDocument/${url}`, {});
  };  

  // 获取内容
  GetContent = url => {
    return http.get('/api2/repos/chenx18/vueNode/git/blobs/d7a4d92921398273b292fa20aeee330d5478fe1d',{})
  }
  // [api](https://segmentfault.com/a/1190000015144126)
  // 个人所有repo: https://api.github.com/users/用户名/repos     会得到一个repo的JSON格式列表
  // repo详细信息: https://api.github.com/repos/用户名/仓库名     repo的路径就开始和个人信息不同了。
  // 获取某个repo的内容列表: https://api.github.com/repos/chenx18/vueNode/contents       注意这只会返回根目录的内容
  // 获取repo中子目录的内容列表: https://api.github.com/repos/chenx18/vueNode/contents/目录名 
    // 一定要注意这里一定要完全遵循原文件名的大小写，否则无法获得信息。如果是更深层的内容，则在链接列按照顺序逐级写上目录名称
}

export default new api;