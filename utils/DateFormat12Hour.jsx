const DateFormat12Hour = {
  timeConversion12(time24) {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h = H % 12 || 12;
    //h = (h < 10)?("0"+h):h;
    let ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  },
  urlDetection(text) {
    var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
    //var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url, b, c) {
      let url2 = c == "www." ? "http://" + url : url;
      let total =
        "<a target=" + "_blank " + "href=" + url2 + ">" + url + "</a>";
      // let total = "<Link href={ window.open (" + url2 + ","+ "_ blank"+")}>" + url + "</Link>"
      console.log(total);
      return total;
    });
  },
};
export default DateFormat12Hour;
