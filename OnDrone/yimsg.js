exports.gettoken = function(){
  data = {
      msg_id:257,
      token:0
  };
  return JSON.stringify(data);
};

exports.shot = function(TOKEN){
  data = {
    msg_id: 769,
    token: TOKEN
  }
}
