const getters = {
  isMobile: state => state.app.isMobile,
  lang: state => state.app.lang,
  theme: state => state.app.theme,
  color: state => state.app.color,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickname: state => state.user.name,
  welcome: state => state.user.welcome,
  roles: state => state.user.roles,
  userInfo: state => state.user.info,
  addRouters: state => state.permission.addRouters,
  multiTab: state => state.app.multiTab,
  modelList: state => state.model.modelList,
  closedProjects: state => state.project.closedProjects,
  invitedProjects: state => state.project.invitedProjects,
  joinedProjects: state => state.project.joinedProjects,
  allProjects: state => state.project.allProjects,
  myProjects: state => state.project.myProjects,
  dataList: state => state.data.dataList,
}

export default getters
