KISSY.add("oversea-homepage-first-nav",function(c,b,d,a){function e(g,f){var i=c.one(window),h=c.one("html");j();i.on("resize",function(){j()});function j(){if(i.width()>=1490){h.removeClass("w1190");h.removeClass("w990");h.addClass("w1490")}else{h.removeClass("w1490");if(i.width()>=1190){h.removeClass("w990");h.addClass("w1190")}else{h.removeClass("w1190");h.addClass("w990")}}}}return e},{requires:["node","dom","event"]});KISSY.add("oversea-homepage-first-focus",function(d,c,f,e,b,a){function g(r,o){var j=d.one(o),i=j.one(".J_SlideBox")[0];var v=new c(i,{activeIndex:0,autoplay:true,interval:5,circular:true,duration:0.5,steps:1,viewSize:[700],contentCls:"slide-list",navCls:"slide-trigger",effect:"scrollx",easing:"easeOutStrong",lazyDataType:"img-src"});var n=j.one(".J_GroupSlideBox")[0],s=new c(n,{activeIndex:0,autoplay:true,interval:5,circular:true,duration:0.5,steps:1,viewSize:[200],contentCls:"group-slide-list",navCls:"group-slide-triggers",effect:"scrollx",easing:"easeOutStrong",lazyDataType:"img-src"});var u=TB.Global.isLogin,q=TB.Global.util.getNick(),t=TB.Global.util.encodeGBK(q).toLowerCase(),p=parseInt(d.unparam(b.get("uc1")).tag)||-1,w="//wwc.alicdn.com/avatar/getAvatar.do?userNick="+t+"&width=60&height=60&type=sns",m="//i.taobao.com/json/my_taobao_remind_data.htm?t="+d.now();if(!u){return}var l=d.get(".login");d.get(".info-face-img").src=w;var h=d.one(".info-face a",o)?d.one(".info-face a",o).attr("href"):"//i.taobao.com/my_taobao.htm";d.get(".info-user-name").innerHTML='<a href="'+h+'">'+q+"</a>";if(p>=0){var k="info-user-icon"+p;f.addClass(d.get(".info-user-icon"),k)}d.jsonp(m,function(z){if(typeof(z)!="object"){z=["",[0,0],0,0,0,0,0,0,""]}var x=z[3],y=z[1][0];d.get(".list-receive").innerHTML=x;d.get(".list-pay").innerHTML=y});f.addClass(l,"logined")}d.dpl=d.dpl||{};return d.dpl["oversea-homepage-first-focus"]=g},{attach:false,requires:["switchable","dom","datalazyload","cookie","io"]});(function(a){a.config({packages:[{name:"fp",charset:"utf-8",path:"//g.alicdn.com/tb/tb-fp/1.7.6/",tag:20140212}]})})(KISSY);KISSY.add("fp/cat",function(g,i,d,j){var h=g.all,k=window,c=h(k),m=TB.Global,a=null,b=[],f=508,e=20;var l=function(){this.el=h("#J_Cat");this.$menu=h("#J_CatMenu");this.$cont=h("#J_CatCont");this.$cats=h(".J_Cat",this.$menu);this.$mods=h(".J_Mod",this.$cont);this.$contBd=h("#J_CatContBd");this.$catShadow=h("#J_CatShadow");this.$catContShadow=h("#J_CatContShadow");this.$catContClose=h("#J_CatContClose");this.rNow=null;this.events={};this.events[i.tap+" .J_Cat"]="catClickHandler";this.events[i.tap+" #J_CatCont"]="contClickHandler";this.events[i.tap+" #J_CatContClose"]="contCloseHandler";this.init()};g.extend(l,i);l.prototype.init=function(){var n=this;if(typeof(FP_AB_TYPE)!=="undefined"){n.el.addClass("cat-"+FP_AB_TYPE)}if(m.isMobile){n.$catContClose.show();l.superclass.constructor.call(n);c.on(i.tap,function(){n.rNow=null;n.leaveHandler()})}else{if(g.one("#J_CatBd")){new j({wrap:"#J_CatBd",menu:"#J_CatMenu",rows:".J_Cat",handler:{enterHandler:g.bind(n.enterHandler,n),leaveHandler:g.bind(n.leaveHandler,n)}})}}};l.prototype.renderMod=function(o){var n=this,p=g.indexOf(o[0],n.$cats),q=n.$mods.item(p);n.toggleMod(q);n.setModTop()};l.prototype.setHidden=function(p){var n=this,o=p.outerHeight(true);(o>f)&&p.css("height",f)};l.prototype.toggleMod=function(o){var n=this;o.show().siblings().hide();n.$cont.show()};l.prototype.setModTop=function(){var w=this,q=c.height(),u=c.scrollTop(),p=w.$contBd.outerWidth(true),v=w.$cont.outerHeight(true);var r=u+q,n=w.catT+w.catH,o=w.catT+v,t=o+e-r,x=o-t-n;t<0?t=0:"";x>0?x=0:"";if(w.catT-t-x<u){t=0;x=0}var s=w.catT-w.menuT-t-x;w.$catContShadow.css({width:p+2,height:v});if(!w.$cont.width()){w.$cont.stop(true).animate({width:p},0.2,"easeOut",function(){w.$cont.css({overflow:"visible"})})}else{}};l.prototype.enterHandler=function(n){var q=this,p=h(n),o=p.prev();q.menuT=q.$menu.offset().top;q.$cats.removeClass("selected");p.addClass("selected");q.$cats.removeClass("selected-prev");o&&o.addClass("selected-prev");q.catH=p.outerHeight(true);q.catT=p.offset().top;q.$catShadow.css({top:q.catT-q.menuT+2,height:q.catH}).show();q.renderMod(p);a&&a.cancel();a=g.later(function(){q.dot(p.attr("data-id"))},500)};l.prototype.leaveHandler=function(){var n=this;n.$cats.removeClass("selected");n.$cats.removeClass("selected-prev");n.$catShadow.hide();n.$cont.hide().css({width:0,overflow:"hidden"});a&&a.cancel();n.dot()};l.prototype.catClickHandler=function(p){var n=this,o=p.currentTarget;p.stopPropagation();if(o===n.rNow){n.rNow=null;n.leaveHandler()}else{n.rNow=o;n.enterHandler(o)}};l.prototype.contClickHandler=function(n){n.stopPropagation()};l.prototype.contCloseHandler=function(o){var n=this;n.rNow=null;n.leaveHandler()};l.prototype.dot=function(n){if(n){b.push(n)}else{b.length&&(k.goldlog_queue||(k.goldlog_queue=[])).push({action:"goldlog.record",arguments:["/tbindex.4.1","",b.join(","),"47700902"]});b=[]}};return l},{requires:["fp/module","ajax","fp/menu-aim"]});KISSY.use("fp/cat",function(a,b){new b()});(function(a){a.config({packages:[{name:"kg",path:"//g.alicdn.com/kg/",charset:"utf-8",ignorePackageNameInUri:true,debug:true}]})})(KISSY);KISSY.use("kg/countdown/2.0.0/",function(a,b){a.all(".cd").each(function(c){b({el:c,clock:["d",100,2,"h",100,2,"m",60,2,"s",60,2,"u",10,1]})})});KISSY.add("oversea-space",function(a){function b(d,c){}return b},{requires:[]});KISSY.config("packages",{discover:{base:"//g.alicdn.com/sea/discover/0.0.10/",ignorePackageNameInUri:true,combine:true,debug:true}});KISSY.config("packages",{kg:{base:"//g.alicdn.com/kg/",ignorePackageNameInUri:true,combine:true,debug:true}});KISSY.add("oversea-homepage-floor-cat",function(f,e,i,h,a){var k={"zh-cn":{MAIN_MANAGER:"\u4e3b\u8425"},"zh-tw":{MAIN_MANAGER:"\u4e3b\u71df"}};function g(){var l=a.get("hng");var m=l?l.split("|")[1]:"";if(m){return m}return null}function d(){var l=g()||"zh-cn";if(f.isObject(k[l])){return l}return"zh-cn"}var j=d();var c=k[j];function b(m,l){f.mix(this,{config:{box:m,module:l}});this.scrollLogOffset=300;this.pageRightNo=1;this.pageRightAll=10;this.hassend={};this.domtop={};this.init()}f.augment(b,{init:function(){var l=this;var n=[".cat-nz",".cat-3c",".cat-xu1",".cat-xu2"];var m=function(o){f.each(o,function(r,q){var p=new h({container:r,diff:0,autoDestroy:false});p.addCallback(r,function(){l.renderLTAndMid(f.one(".J_cbay_left_list",this),f.one(".J_cbay_middle",this),this);l.renderLB(f.one(".J_cbay_left_img",this));var t=f.one(".J_cbay_middle",this);l.hassend[r]=false;l.domtop[r]=f.one(t).offset().top+l.scrollLogOffset;l.scrollMmstatSend(r,l.sendDataByURL()+"floor=2");if(!l.hassend[r]){var s=function(){l.scrollMmstatSend(r,l.sendDataByURL()+"floor="+(q+1),function(){f.one(window).detach("scroll",s)})};f.one(window).on("scroll",s)}})})};m(n);l.renderRight();l.bindEvent()},sendDataByURL:function(n){var m=window.location.href;var l="//gm.mmstat.com/tbos.";if(m.indexOf("tw.taobao.com")>-1){return l+(n=="click"?"1.61?":"1.60?")}else{if(m.indexOf("hk.taobao.com")>-1){return l+(n=="click"?"7.2?":"7.1?")}else{if(m.indexOf("sea.taobao.com")>-1){return l+(n=="click"?"8.2?":"8.1?")}else{return l+(n=="click"?"9.2?":"9.1?")}}}},scrollMmstatSend:function(p,o,l){var n=this;var r=f.DOM,q=r.viewportHeight(),m=r.scrollTop();if(!n.hassend[p]&&q+m>n.domtop[p]){n.send(o);n.hassend[p]=true;if(typeof l=="function"){l()}}},bindEvent:function(){var l=this;f.all(".J_cbay_left_list",l.config.module).delegate("click","a",function(q){var p=f.one(q.currentTarget);var n=p.attr("data-floor");var m=p.attr("data-index")*1+1;var o=p.html();l.send(l.sendDataByURL("click")+"keyword="+encodeURIComponent(o)+"&floor="+n+"&position="+m)})},send:function(l){f.later(function(){var m=l+f.now();window[m]=new Image();window[m].src=l;window[m].onload=function(){window[m]=undefined}},0)},renderLB:function(p){var l=this;var n=p.attr("data-widgetId");var m=p.attr("data-perPageSize")||3;var o={widgetId:n,perPageSize:m,resultType:"items"};l.getData("//tlwapi.taobao.com/api.htm",o,function(s){var t=s.data;var u=[];if(t&&t.length>=3){while(u.length<3){var q=parseInt(Math.random()*(t.length));if(t[q]){u.push(t.splice(q,1)[0])}}}var r='{{#each data}}<a href="//{{shopUrl}}" target="_blank"><img src="{{#if picUrl}}{{picUrl}}{{else}}//img.alicdn.com/tps/i4/TB1kraQFVXXXXcsXFXX5rDaIVXX-80-80.png{{/if}}" alt="" width="45" height="45"><span class="title">{{title}}</span><span class="price">'+c.MAIN_MANAGER+"\uff1a{{mainCategories}}</span></a>{{/each}}";p.html(new i(r).render({data:u}))})},renderLTAndMid:function(p,o,s){var u=this;var q=f.one(".J_widgetId",s).val();var n=f.one(".J_listUrl",s).val();if(!n.match(/\?widgetId=/)){n=n+"?widgetId="}var l=f.one(".J_lang").val();var r=f.one(".J_maodian").val();var v="";if(r){v="#J_Left"}var m={widgetId:q,displayType:"STRUCTURE"};if(l){m._thwlang="zh_CN:TB-GBK"}else{var t=a.get("hng");if(t&&t.split("|").length==3&&t.split("|")[1]=="zh-tw"){m._thwlang="zh_CN:TB-GBK"}}u.getData("//dosapi.taobao.com/tao/data/doQuery.jsonp",m,function(K){if(K.hasError){return}var y=[];var w=[];var C=K.content.nodeList;for(var D=0;D<C.length;D++){var J=C[D];if(J.children){for(var B=0;B<J.children.length;B++){var E=J.children[B];if(E.children){for(var A=0;A<E.children.length;A++){var I=E.children[A];if(I.extraProps){if(I.extraProps.is21KeywordsNew){var F=I.extraProps.Keywords21Sort-1;y[F]=I}if(I.extraProps.is6PicsNew){var F=I.extraProps.Pics6Sort-1;if(F===2){w[3]=I}else{if(F===3){w[4]=I}else{if(F===4){w[2]=I}else{w[F]=I}}}}}}}}}}var x='{{#each data}}<li><a data-floor="1" data-index="{{xindex}}" {{#if (extraProps&&extraProps.isHotNew===true)}}class="hot"{{/if}} href="'+n+q+"&nodeId={{this.id}}"+v+'" target="_blank">{{this.name}}</a></li>{{/each}}';p.html('<ul class="clearfix">'+new i(x).render({data:y})+"</ul>");var H='{{#each data}}<a href="'+n+q+"&nodeId={{this.id}}"+v+'" target="_blank"><span class="title">{{this.name}}</span><img src="{{this.picUrl}}_300x300.jpg" alt="" width="180" height="180"></a>{{/each}}';var G='{{#each data}}<a href="'+n+q+"&nodeId={{this.id}}"+v+'" target="_blank"><span class="title">{{this.name}}</span><img src="{{this.picUrl}}_300x300.jpg" alt="" width="120" height="120"></a>{{/each}}';var z=w.slice(0,3);f.one(".J_cbay_middle_top",o).html(new i(H).render({data:z}));z=w.slice(3);f.one(".J_cbay_middle_bottom",o).html(new i(G).render({data:z}))})},renderRight:function(){KISSY.use("discover/p/discover/index",function(l,m){new m({goodsCfg:{len:11,listLength:8},shopsCfg:{len:4}})})},getData:function(n,o,l){var m=this;new e({url:n,data:o,type:"get",dataType:"jsonp",success:function(p){l&&l.call(m,p)},error:function(p){}})}});return b},{requires:["io","xtemplate","kg/datalazyload/2.0.0/","cookie"]});KISSY.add("oversea-homepage-mier",function(a){function b(d,c){a.mix(this,{config:{box:d,module:c}})}return b},{requires:[]});KISSY.add("oversea-sidebar-feedback",function(e,d,c,b,a){function f(h,g){this.init()}e.extend(f,c,{init:function(g){var i=this;var k=e.all,h=function(){var p=k(window).width(),o,m,q;if(p>=1490){o=1490}else{if(p>=1190){o=1190}else{o=990}}m=(p-o)/2;q=m>=70?(o+m+20):false;var n=k("#J_SideLift");if(q){n.css({left:q,right:"auto"})}else{n.css({left:"auto",right:"15px"})}n.show()},l=function(){h();var p=k("#J_SideLift"),q=document.getElementById("J_ToTop"),o=null,n=k(window).scrollTop(),m=k(window).height();(n>m)?q.style.display="block":q.style.display="none";if(e.UA.ie=="6"){p.hide();clearTimeout(o);o=setTimeout(function(){p.show();clearTimeout(o)},1000);if(n>0){p.css({top:n+m-232,bottom:"auto"})}}};function j(){var o=document.getElementById("J_ToTop"),n=k(window).scrollTop(),m=k(window).height();n>m?o.style.display="block":o.style.display="none"}k("#J_ToTop").on("click",function(){k(window).scrollTop(0)});h();j();k(window).on("resize",h);k(window).on("scroll",l)}});return f},{requires:["anim","base","node","cookie"]});KISSY.add("oversea-homepage-bottom",function(a){function b(d,c){}a.dpl=a.dpl||{};return a.dpl["oversea-homepage-bottom"]=b},{requires:[]});KISSY.add("tb-global-overlay",function(a){function b(d,c){}return b},{requires:[]});