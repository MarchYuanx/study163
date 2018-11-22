const viewContent = (data) => {
  if(data && (typeof data === "string")){
    return data.replace(/<\/?span>/g, "").replace(/<\/?p>/g, "").replace(/&nbsp;/g, " ").split("<br>");
  }else{
    return 
  }
}

module.exports = {
  viewContent: viewContent
}