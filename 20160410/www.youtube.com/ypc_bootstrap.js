(function(g){var window=this;var uKa=function(a,b,c){g.vm(a,b,c,null)||g.lb(g.ra(b,a))},vKa=function(){var a=L3;
return new g.hm(function(b,c){var d=a.length,e=[];if(d)for(var h=function(a,c){d--;e[a]=c;0==d&&b(e)},k=function(a){c(a)},n=0,r;n<a.length;n++)r=a[n],uKa(r,g.ra(h,n),k);
else b(e)})},M3=function(a){var b=g.t("YPC_LOADER_CSS",void 0),c=g.t("YPC_LOADER_JS",void 0);
wKa&&(c="www/ypc_core");L3.length||(L3.push(new g.hm(function(a){g.jf(b,a)})),L3.push(new g.hm(function(a){g.Cc(c,a)})));
vKa().then(function(){a&&a()})},O3=function(a,b,c,d,e){if(g.yr())M3(function(){g.m("yt.www.ypc.checkout.showYpcOverlay")(a,b,c,d,e)});
else{var h={ypc_it:a,ypc_ii:b,ypc_ft:c};d&&(h.ypc_irp=d);e&&(h.ypc_cc=e);h=N3(h);g.ze(h)}},xKa=function(a,b){if(g.yr())M3(function(){g.m("yt.www.ypc.checkout.showYpcOverlayForInnertubeRequestParams")(a,b)});
else{var c=N3({ypc_ft:a,ypc_irp:b});g.ze(c)}},yKa=function(a,b,c,d,e,h){if(g.yr())M3(function(){g.m("yt.www.ypc.checkout.offerpurchaser.purchaseOffer")(a,b,c,"D",d,e,h)});
else{var k={ypc_it:b,ypc_ii:c,ypc_ft:"D"};h&&(k.ypc_irp=h);k=N3(k);g.ze(k)}},zKa=function(a,b){if(g.yr())M3(function(){g.m("yt.www.ypc.subscription.openUnsubscribeOverlay")(a,b)});
else throw Error("Unsubscribe triggered when user not signed in.");},N3=function(a){a=g.rk(window.location.href,a);
var b=g.t("YPC_SIGNIN_URL",void 0),c=g.sk(b)["continue"],c=g.rk(c,{next:a});return g.rk(b,{"continue":c})},AKa=function(a){var b=a.currentTarget;
if(b){a=g.x(b,"ypc-offer-id");var c=g.x(b,"ypc-item-type"),d=g.x(b,"ypc-item-id"),e=g.x(b,"ypc-offer-jwt"),h=g.x(b,"ypc-offer-encrypted-purchase-params"),b=g.x(b,"ypc-irp");yKa(a,c,d,e,h,b)}},CKa=function(a){(a=a.currentTarget)&&BKa(a)},DKa=function(a){M3(a.Zb)},EKa=function(a){var b;
P3("container-button-click-attempt");b=g.z("ypc-checkout-button",a.A);a=g.z("ytr-purchase-button",a.A);if(b||a&&a.href)a&&a.href?g.Ae(a.href):b&&BKa(b)},FKa=function(a){var b=a.A;
a=b.itemId;var c=b.itemType,b=b.flowType;P3("paid-subscribe-button-click",{itemType:c,itemId:a});O3(c,a,b)},BKa=function(a){var b=g.x(a,"ypc-item-type"),c=g.x(a,"ypc-item-id"),d=g.x(a,"ypc-flow-type");
a=g.x(a,"ypc-irp")||void 0;g.yr()?P3("purchase-button-click",{itemId:c,itemType:b}):P3("signin-button-click");O3(b,c,d,a)},GKa=function(a){var b=a.currentTarget;
a=g.x(b,"ypc-item-type");b=g.x(b,"ypc-item-id");a&&b&&(P3("unsubscribe-button-click",{itemId:b,itemType:a}),zKa(a,b))},HKa=function(a){var b=a.A;
a=b.itemType;b=b.itemId;P3("paid-unsubscribe-button-click",{itemType:a,itemId:b});zKa(a,b)},P3=function(a,b){var c={};
g.Xa(c,{label:a,pageName:g.t("PAGE_NAME")});b&&g.Xa(c,b);c=g.rd(c);g.Vi("ypc-checkout",c,void 0)},R3=function(a,b,c){this.D=this.B=this.A=null;
this.C=a;this.G=Q3?b:null;this.R=c||window;this.F=this.R.location;this.H=this.F.href.split("#")[0];this.M=(0,g.p)(this.O,this)},S3=function(a){a=a.F.href;
var b=a.indexOf("#");return 0>b?"":a.substring(b+1)},IKa=function(a,b){var c=a.H+"#"+b,d=a.F.href;
d!=c&&d+"#"!=c&&g.xc(a.F,c)},T3=function(a,b){var c=a.G.contentWindow.document,d="#"+g.ua(b);
if((c.body?c.body.innerHTML:"")!=d){var e=g.vc(g.uc("title",{},window.document.title||""),g.uc("body"));c.open("text/html");c.write(g.pc(e));g.oh(c.body,d);c.close()}},U3=function(a,b){this.C=this.G=this.A=null;
this.D=a;this.F=b||window;this.B=this.F.location;this.M=(0,g.p)(this.R,this)},KKa=function(){var a=JKa("state");
a.setEnabled.call(a,!0,!0)},LKa=function(a){var b=JKa();
b.replace.call(b,a,window.history&&window.history.state,!0)},JKa=function(a){a=a||"hash";
var b=g.m("yt.history.instance_");b||("state"==a?(b=new U3(MKa),U3.prototype.setEnabled=U3.prototype.Db,U3.prototype.add=U3.prototype.Y,U3.prototype.replace=U3.prototype.replace):(b=new R3(MKa,g.y("legacy-history-iframe")),R3.prototype.setEnabled=R3.prototype.Db,R3.prototype.add=R3.prototype.Y,R3.prototype.replace=R3.prototype.Y),NKa=b,g.l("yt.history.instance_",NKa,void 0));return b},MKa=function(a,b){g.v("navigate",a,b)},QKa=function(){var a=g.sk(window.location.href);
if(OKa){g.Pa(PKa,function(b){g.Sa(a,b)});
var b=g.sd(window.location.href.split("?",2)[0],a);KKa();LKa(b)}},L3=[],wKa=!1;var V3=[],W3=[];var NKa,RKa=g.Xc&&8<=window.document.documentMode||g.Ce&&g.Kc("1.9.2")||g.Zc&&g.Kc("532.1"),Q3=g.Xc&&!RKa;R3.prototype.Db=function(a,b){this.B&&(g.Oi(this.B),delete this.B);this.D&&(g.Bb(this.D),delete this.D);if(a){this.A=S3(this);if(Q3){var c=this.G.contentWindow.document.body;c&&c.innerHTML||T3(this,this.A)}b||this.C(this.A);RKa?this.B=g.E(this.R,"hashchange",this.M):this.D=g.zb(this.M,200)}};
R3.prototype.O=function(){if(Q3){var a;a=(a=this.G.contentWindow.document.body)?g.Bh(g.Hk(a).substring(1)):"";a!=this.A?(this.A=a,IKa(this,a),this.C(a)):(a=S3(this),a!=this.A&&(this.A=a,T3(this,a),this.C(a)))}else a=S3(this),a!=this.A&&(this.A=a,this.C(a))};
R3.prototype.Y=function(a,b,c){this.A=""+a;Q3&&T3(this,a);IKa(this,a);c||this.C(this.A)};var OKa=!!window.history.pushState&&(!g.Zc||g.Zc&&g.Kc("534.11"));U3.prototype.Db=function(a,b){this.C&&(g.Oi(this.C),delete this.C);this.G&&(g.Bb(this.G),delete this.G);a&&OKa&&(this.A=this.B.href,b||this.D(this.A),this.C=g.E(this.F,"popstate",this.M))};
U3.prototype.R=function(a){var b=this.B.href;if((a=a.state)||b!=this.A)this.A=b,this.D(b,a)};
U3.prototype.Y=function(a,b,c){if(a||b)a=a||this.B.href,this.F.history.pushState(b,"",a),this.A=a,c||this.D(a,b)};
U3.prototype.replace=function(a,b,c){if(a||b)a=a||this.B.href,this.F.history.replaceState(b,"",a),this.A=a,c||this.D(a,b)};var PKa={fS:"ypc_cc",sS:"ypc_ft",PS:"ypc_irp",XS:"ypc_ii",YS:"ypc_it"};g.Xb(g.Uk({name:"www/ypc_bootstrap",deps:["www/common"],page:"feed index results watch channel playlist subscription_manager unlimited".split(" "),init:function(){wKa=!0;g.z("ypc-delayedloader-target")&&M3();var a=g.sk(window.location.href),b=a.ypc_it,c=a.ypc_ii,d=a.ypc_ft||"D",e=a.ypc_irp,h=a.ypc_cc;"channel"==g.t("PAGE_NAME")&&"fan_fund"in a&&(d="T",b="U",c=g.t("CHANNEL_ID",void 0));"channel"==g.t("PAGE_NAME")&&"ypc_cc"in a&&(b="U",c=g.t("CHANNEL_ID",void 0));if(e||c&&b)QKa(),c&&b?O3(b,c,d,e,h):
xKa(d,e);V3.push(g.Wj(window.document.body,"click",CKa,"ypc-checkout-button"),g.Wj(window.document.body,"click",AKa,"ypc-offer-button"),g.Wj(window.document.documentElement,"click",GKa,"ypc-unsubscribe-link"),g.Wj(window.document.documentElement,"click",GKa,"ypc-unsubscribe-button"));W3.push(g.vk(g.nv,DKa),g.vk(g.Oka,EKa),g.vk(g.ov,FKa),g.vk(g.rv,HKa))},
dispose:function(){L3.length=0;g.Oi(V3);V3.length=0;g.uk(W3);W3.length=0}}));
g.l("yt.www.ypc.bootstrap.api.loadOffers",O3,void 0);g.l("yt.www.ypc.bootstrap.api.loadOffersForInnertubeRequestParams",xKa,void 0);})(_yt_www);
