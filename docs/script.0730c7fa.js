parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"pCUd":[function(require,module,exports) {
d3.csv("https://raw.githubusercontent.com/CSGilligan/baseball-parity-project/main/mlb_disparity_by_day.csv").then(function(t){var e=120,a=40,r=40,n=40,i=800-n-a,o=600-e-r,s=d3.timeParse("%m/%d"),l=(d3.timeParse("Y"),d3.scaleLinear().domain([1995,2021]).range([o,0])),d=d3.scaleTime().domain(d3.extent(t,function(t){return new Date(t.date)})).range([0,i]),c=d3.scaleLinear().domain([0,4.15,8.3,12.45,16.6]).range(["#142F43","#4F9691","#E5E294","#D46A4F","#A63332"]),y=d3.select("#chart").append("svg").attr("width",i+n+a).attr("height",o+e+r).append("g").attr("transform","translate("+n+","+e+")");t.forEach(function(t){t.datetime=s(t.date)}),t=(t=t.filter(function(t){return"-"!=t.deviation})).filter(function(t){return"--"!=t.deviation});var p=d3.select("#chart").append("div").style("opacity",0).attr("class","tooltip").style("background-color","white").style("border","solid").style("border-width","2px").style("border-radius","5px").style("padding","5px"),f=t.map(function(t){return t.datetime});d.domain(d3.extent(f));var m=d3.axisLeft().scale(l).ticks(35).tickFormat(d3.format("d"));y.append("g").call(m).attr("class","y_axis").style("font-family","oxygen").attr("transform","translate(0, 8)");var h=d3.axisTop().scale(d).ticks(10);y.append("g").call(h).attr("class","x_axis").style("font-family","oxygen").attr("transform","translate(0, -4)"),y.selectAll("rect").data(t).enter().append("rect").attr("rx",2).attr("ry",2).attr("width",i/250).attr("height",16).attr("fill",function(t){return c(t.deviation)}).attr("y",function(t){return console.log(l(t.year)),l(t.year)}).attr("x",function(t){return d(t.datetime)}).on("mouseover",function(t,e){p.html(e.date+"/"+e.year+": "+Math.round(10*e.deviation)/10).style("opacity",1),d3.select(this).style("stroke","black").style("opacity",1)}).on("mouseleave",function(t){p.style("opacity",0),d3.select(this).style("stroke","none")}),y.append("text").attr("x",i/2).attr("y",40-e).attr("text-anchor","middle").style("font-size","24px").text("Major League Baseball's Parity Problem").attr("font-family","oxygen"),y.append("text").attr("x",0-n/2).attr("y",0-e/3).attr("text-anchor","left").style("font-size","11px").text("After the most recent complete season in 2019, MLB win totals had a standard deviation of 16.6, 14% higher than ever before in the post-strike era.").attr("font-family","oxygen")});
},{}]},{},["pCUd"], null)
//# sourceMappingURL=/script.0730c7fa.js.map