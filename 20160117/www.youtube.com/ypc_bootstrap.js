(function(g){var window=this;var sJa=function(a,b,c){g.Jm(a,b,c,null)||g.lb(g.ra(b,a))},tJa=function(){var a=H3;
return new g.vm(function(b,c){var d=a.length,e=[];if(d)for(var f=function(a,c){d--;e[a]=c;0==d&&b(e)},k=function(a){c(a)},n=0,r;n<a.length;n++)r=a[n],sJa(r,g.ra(f,n),k);
else b(e)})},I3=function(a){var b=g.t("YPC_LOADER_CSS",void 0),c=g.t("YPC_LOADER_JS",void 0);
uJa&&(c="www/ypc_core");H3.length||(H3.push(new g.vm(function(a){g.Af(b,a)})),H3.push(new g.vm(function(a){g.Bc(c,a)})));
tJa().then(function(){a&&a()})},K3=function(a,b,c,d,e){if(g.tr())I3(function(){g.m("yt.www.ypc.checkout.showYpcOverlay")(a,b,c,d,e)});
else{var f={ypc_it:a,ypc_ii:b,ypc_ft:c};d&&(f.ypc_irp=d);e&&(f.ypc_cc=e);f=J3(f);g.ve(f)}},vJa=function(a,b){if(g.tr())I3(function(){g.m("yt.www.ypc.checkout.showYpcOverlayForInnertubeRequestParams")(a,b)});
else{var c=J3({ypc_ft:a,ypc_irp:b});g.ve(c)}},wJa=function(a,b,c,d,e){if(g.tr())I3(function(){g.m("yt.www.ypc.checkout.offerpurchaser.purchaseOffer")(a,b,c,"D",d,e)});
else{var f={ypc_it:b,ypc_ii:c,ypc_ft:"D"};e&&(f.ypc_irp=e);f=J3(f);g.ve(f)}},xJa=function(a,b){if(g.tr())I3(function(){g.m("yt.www.ypc.subscription.openUnsubscribeOverlay")(a,b)});
else throw Error("Unsubscribe triggered when user not signed in.");},J3=function(a){a=g.Hk(window.location.href,a);
var b=g.t("YPC_SIGNIN_URL",void 0),c=g.Ik(b)["continue"],c=g.Hk(c,{next:a});return g.Hk(b,{"continue":c})},yJa=function(a){if(a=a.currentTarget){var b=g.w(a,"ypc-offer-id"),c=g.w(a,"ypc-item-type"),d=g.w(a,"ypc-item-id"),e=g.w(a,"ypc-offer-jwt"),f=g.w(a,"ypc-irp");
try{var k=g.w(a,"innertube-clicktracking");k&&!g.t("SERVICE_CLICKTRACKING_ENABLED")&&g.uo(g.t("EVENT_ID",void 0),new g.le(k))}catch(n){L3("offer-button-click-logging-failed")}wJa(b,c,d,e,f)}},AJa=function(a){(a=a.currentTarget)&&zJa(a)},BJa=function(a){I3(a.sc)},CJa=function(a){L3("container-button-click-attempt");
(a=g.y("ypc-checkout-button",a.A))&&zJa(a)},DJa=function(a){var b=a.A;
a=b.itemId;var c=b.itemType,b=b.flowType;L3("paid-subscribe-button-click",{itemType:c,itemId:a});K3(c,a,b)},zJa=function(a){var b=g.w(a,"ypc-item-type"),c=g.w(a,"ypc-item-id"),d=g.w(a,"ypc-flow-type");
a=g.w(a,"ypc-irp")||void 0;g.tr()?L3("purchase-button-click",{itemId:c,itemType:b}):L3("signin-button-click");K3(b,c,d,a)},EJa=function(a){var b=a.currentTarget;
a=g.w(b,"ypc-item-type");b=g.w(b,"ypc-item-id");a&&b&&(L3("unsubscribe-button-click",{itemId:b,itemType:a}),xJa(a,b))},FJa=function(a){var b=a.A;
a=b.itemType;b=b.itemId;L3("paid-unsubscribe-button-click",{itemType:a,itemId:b});xJa(a,b)},L3=function(a,b){var c={};
g.Xa(c,{label:a,pageName:g.t("PAGE_NAME")});b&&g.Xa(c,b);c=g.pd(c);g.hj("ypc-checkout",c,void 0)},N3=function(a,b,c){this.D=this.C=this.A=null;
this.B=a;this.G=M3?b:null;this.P=c||window;this.F=this.P.location;this.J=this.F.href.split("#")[0];this.L=(0,g.p)(this.O,this)},O3=function(a){a=a.F.href;
var b=a.indexOf("#");return 0>b?"":a.substring(b+1)},GJa=function(a,b){var c=a.J+"#"+b,d=a.F.href;
d!=c&&d+"#"!=c&&g.wc(a.F,c)},P3=function(a,b){var c=a.G.contentWindow.document,d="#"+g.wa(b);
if((c.body?c.body.innerHTML:"")!=d){var e=g.uc(g.tc("title",{},window.document.title||""),g.tc("body"));c.open("text/html");c.write(g.oc(e));g.Bh(c.body,d);c.close()}},Q3=function(a,b){this.B=this.G=this.A=null;
this.D=a;this.F=b||window;this.C=this.F.location;this.L=(0,g.p)(this.P,this)},IJa=function(){var a=HJa("state");
a.setEnabled.call(a,!0,!0)},JJa=function(a){var b=HJa();
b.replace.call(b,a,window.history&&window.history.state,!0)},HJa=function(a){a=a||"hash";
var b=g.m("yt.history.instance_");b||("state"==a?(b=new Q3(KJa),Q3.prototype.setEnabled=Q3.prototype.Db,Q3.prototype.add=Q3.prototype.X,Q3.prototype.replace=Q3.prototype.replace):(b=new N3(KJa,g.x("legacy-history-iframe")),N3.prototype.setEnabled=N3.prototype.Db,N3.prototype.add=N3.prototype.X,N3.prototype.replace=N3.prototype.X),LJa=b,g.l("yt.history.instance_",LJa,void 0));return b},KJa=function(a,b){g.v("navigate",a,b)},OJa=function(){var a=g.Ik(window.location.href);
if(MJa){g.Qa(NJa,function(b){g.Ta(a,b)});
var b=g.qd(window.location.href.split("?",2)[0],a);IJa();JJa(b)}},H3=[],uJa=!1;var R3=[],S3=[];var LJa,PJa=g.Hc&&8<=window.document.documentMode||g.Fc&&g.Mc("1.9.2")||g.Ic&&g.Mc("532.1"),M3=g.Hc&&!PJa;N3.prototype.Db=function(a,b){this.C&&(g.be(this.C),delete this.C);this.D&&(g.Bb(this.D),delete this.D);if(a){this.A=O3(this);if(M3){var c=this.G.contentWindow.document.body;c&&c.innerHTML||P3(this,this.A)}b||this.B(this.A);PJa?this.C=g.E(this.P,"hashchange",this.L):this.D=g.zb(this.L,200)}};
N3.prototype.O=function(){if(M3){var a;a=(a=this.G.contentWindow.document.body)?g.Sh(g.Xk(a).substring(1)):"";a!=this.A?(this.A=a,GJa(this,a),this.B(a)):(a=O3(this),a!=this.A&&(this.A=a,P3(this,a),this.B(a)))}else a=O3(this),a!=this.A&&(this.A=a,this.B(a))};
N3.prototype.X=function(a,b,c){this.A=""+a;M3&&P3(this,a);GJa(this,a);c||this.B(this.A)};var MJa=!!window.history.pushState&&(!g.Ic||g.Ic&&g.Mc("534.11"));Q3.prototype.Db=function(a,b){this.B&&(g.be(this.B),delete this.B);this.G&&(g.Bb(this.G),delete this.G);a&&MJa&&(this.A=this.C.href,b||this.D(this.A),this.B=g.E(this.F,"popstate",this.L))};
Q3.prototype.P=function(a){var b=this.C.href;if((a=a.state)||b!=this.A)this.A=b,this.D(b,a)};
Q3.prototype.X=function(a,b,c){if(a||b)a=a||this.C.href,this.F.history.pushState(b,"",a),this.A=a,c||this.D(a,b)};
Q3.prototype.replace=function(a,b,c){if(a||b)a=a||this.C.href,this.F.history.replaceState(b,"",a),this.A=a,c||this.D(a,b)};var NJa={FP:"ypc_cc",RP:"ypc_ft",mQ:"ypc_irp",uQ:"ypc_ii",vQ:"ypc_it"};g.Xb(g.kl({name:"www/ypc_bootstrap",deps:["www/common"],page:"feed index results watch channel playlist subscription_manager unlimited".split(" "),init:function(){uJa=!0;g.y("ypc-delayedloader-target")&&I3();var a=g.Ik(window.location.href),b=a.ypc_it,c=a.ypc_ii,d=a.ypc_ft||"D",e=a.ypc_irp,f=a.ypc_cc;"channel"==g.t("PAGE_NAME")&&"fan_fund"in a&&(d="T",b="U",c=g.t("CHANNEL_ID",void 0));"channel"==g.t("PAGE_NAME")&&"ypc_cc"in a&&(b="U",c=g.t("CHANNEL_ID",void 0));if(e||c&&b)OJa(),c&&b?K3(b,c,d,e,f):
vJa(d,e);R3.push(g.I(window.document.body,"click",AJa,"ypc-checkout-button"),g.I(window.document.body,"click",yJa,"ypc-offer-button"),g.I(window.document.documentElement,"click",EJa,"ypc-unsubscribe-link"),g.I(window.document.documentElement,"click",EJa,"ypc-unsubscribe-button"));S3.push(g.Lk(g.Eu,BJa),g.Lk(g.rla,CJa),g.Lk(g.Fu,DJa),g.Lk(g.Iu,FJa))},
dispose:function(){H3.length=0;g.be(R3);R3.length=0;g.Kk(S3);S3.length=0}}));
g.l("yt.www.ypc.bootstrap.api.loadOffers",K3,void 0);g.l("yt.www.ypc.bootstrap.api.loadOffersForInnertubeRequestParams",vJa,void 0);})(_yt_www);
