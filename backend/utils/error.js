
const  MyUtil = {
    showAlertAndRedirect(response, msg, url) {
      var script = "<script type='text/javascript'>";
      script += "alert('" + msg + "');";
      script += "location='" + url + "';";
      script += "</script>";
      response.send(script);
    },
}
module.exports= MyUtil