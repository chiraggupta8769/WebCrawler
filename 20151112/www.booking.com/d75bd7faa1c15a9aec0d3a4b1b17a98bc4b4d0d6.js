if(booking.env.enable_scripts_tracking){booking.env.scripts_tracking.landing={loaded:true,run:false}
}B.define("component/checkin-checkout-selector",function(d,a,e){var c=d("component"),f=d("event-emitter");
var b=1000*60*60*24;
e.exports=c.extend({init:function(){f.extend(this);
this._findCheckinCheckoutSelectors();
this.interval=this.getInterval();
this._attachEvents();
this._updateCalendarsRanges()
},_onCalendarOpen:function(g){var h=g.id;
if(h===this.checkinSelector.getCalendar().id()){this.checkoutSelector.getCalendarElement().trigger("hide")
}else{this.checkinSelector.getCalendarElement().trigger("hide")
}},_onCheckinDateChange:function(i){var j=this.interval,h=this._getTodayDate(),g;
if(this.checkinSelector.getFullDate().raw.getTime()<h.getTime()){this.checkinSelector.setDate(h.getFullYear(),h.getMonth(),h.getDate());
this.interval=this.getInterval()
}if(!this.isCheckinCheckoutValid()){g=this._getDateAfterInterval(this.checkinSelector.getFullDate().raw,j);
this.checkoutSelector.setDate(g.getFullYear(),g.getMonth(),g.getDate())
}this.interval=this.getInterval();
this._updateCalendarsRanges();
this.trigger("dates-changed",{checkin:this.checkinSelector.getFullDate(),checkout:this.checkoutSelector.getFullDate()})
},_onCheckoutDateChange:function(j){var k=this.interval,i=this._getTodayDate(),h,g;
if(this.checkoutSelector.getFullDate().raw.getTime()<=i.getTime()){g=this._getDateAfterInterval(i,1);
this.checkoutSelector.setDate(g.getFullYear(),g.getMonth(),g.getDate());
this.interval=this.getInterval()
}if(!this.isCheckinCheckoutValid()){h=this._getDateBeforeInterval(this.checkoutSelector.getFullDate().raw,k);
if(h.getTime()<i.getTime()){h=i
}this.checkinSelector.setDate(h.getFullYear(),h.getMonth(),h.getDate())
}this.interval=this.getInterval();
this._updateCalendarsRanges();
this.trigger("dates-changed",{checkin:this.checkinSelector.getFullDate(),checkout:this.checkoutSelector.getFullDate()})
},_attachEvents:function(){this.checkinSelector.on("calendar-open",this._onCalendarOpen.bind(this));
this.checkoutSelector.on("calendar-open",this._onCalendarOpen.bind(this));
this.checkinSelector.on("date-change",this._onCheckinDateChange.bind(this));
this.checkoutSelector.on("date-change",this._onCheckoutDateChange.bind(this))
},_findCheckinCheckoutSelectors:function(){this.checkinSelector=this.$el.find("[data-checkin-selector='']").component("date-selector");
this.checkoutSelector=this.$el.find("[data-checkout-selector='']").component("date-selector")
},_getDateAfterInterval:function(h,g){return new Date(h.getTime()+(g*b))
},_getDateBeforeInterval:function(h,g){return new Date(h.getTime()-(g*b))
},_getTodayDate:function(){var g=new Date();
return new Date(g.getFullYear(),g.getMonth(),g.getDate())
},_updateCalendarsRanges:function(){var i=this.checkinSelector.getCalendarElement(),g=this.checkoutSelector.getCalendarElement(),h=this.checkinSelector.getFullDate(),j=this.checkoutSelector.getFullDate();
if(i){i.trigger("rangeSelected",{startValue:h,endValue:j})
}if(g){g.trigger("rangeSelected",{startValue:h,endValue:j})
}},isCheckinCheckoutValid:function(){return this.getInterval()>0
},getInterval:function(){var g=this.checkinSelector.getFullDate().raw.getTime(),h=this.checkoutSelector.getFullDate().raw.getTime();
return parseInt((h-g)/b,10)
},getCheckinSelector:function(){return this.checkinSelector
},getCheckoutSelector:function(){return this.checkoutSelector
},getDateRange:function(){return{checkin:this.checkinSelector.getFullDate().raw,checkout:this.checkoutSelector.getFullDate().raw}
},setDateRange:function(g,h){this.checkinSelector.setDate(g.getFullYear(),g.getMonth(),g.getDate());
this.checkinSelector.broadcastDateChange();
this.checkoutSelector.setDate(h.getFullYear(),h.getMonth(),h.getDate());
this.checkoutSelector.broadcastDateChange()
}})
});
B.define("component/date-selector",function(d,e,b){var j=d("component");
EventEmitter=d("event-emitter");
var h=B.env.b_simple_weekdays_for_js.slice(0);
var g=h.slice(0);
g.unshift(g.pop());
var f=B.env.b_short_months;
var i=B.env.sunday_first;
var c=[31,28,31,30,31,30,31,31,30,31,30,31];
var a=B.env.b_lang;
b.exports=j.extend({init:function(){EventEmitter.extend(this);
var k=this.$el.find("[data-dateselector-calendar='']");
this.daySelect=this.$el.find("[data-dateselector-day='']");
this.monthYearSelect=this.$el.find("[data-dateselector-monthyear='']");
this.calendar=k.length?this._initCalendar(k):null;
this._attachEvents();
this.monthYearSelect.trigger("change")
},_onMonthYearSelectChange:function(m){var k=this.getDay(),n=this.getMonth(),l=this.getYear();
k=this._updateDaySelect(l,n);
if(this.calendar){this._setCalendarDate(l,n,k)
}this.trigger("date-change",this._buildDateObject(l,n,k))
},_onDaySelectChange:function(m){var k=this.getDay(),n=this.getMonth(),l=this.getYear();
if(this.calendar){this._setCalendarDate(l,n,k)
}this.trigger("date-change",this._buildDateObject(l,n,k))
},_onCalendarDateSelected:function(n,k,l){var m=k.getYear(),p=k.getMonth(),o=k.getDate();
this._setSelectsDate(m,p,o);
this.trigger("calendar-date-selected");
this.trigger("date-change",this._buildDateObject(m,p,o))
},_onCalendarOpened:function(l,k){var m=this.calendar.data("calendar2");
if(m&&k.id===m.id()){this.trigger("calendar-open",k)
}},_attachEvents:function(){this.monthYearSelect.bind("change",$.proxy(this._onMonthYearSelectChange,this));
this.daySelect.bind("change",$.proxy(this._onDaySelectChange,this))
},_initCalendar:function(m){if(!$.fn.calendar2){return null
}var l=B.env.b_is_tablet===1?400:261;
B.eventEmitter.bind("CALENDAR:opened",$.proxy(this._onCalendarOpened,this));
var k=booking.calendar2.defaults.startDate;
var n=new Date(k.getFullYear()+1,k.getMonth()+1,0);
return $(m).calendar2({dayNames:i?g:h,sundayFirst:i,monthNames:f,endDate:n,defaultDate:this.getFullDate(),onDateSelected:$.proxy(this._onCalendarDateSelected,this),direction:B.env.rtl?"rtl":"ltr",closeButton:true,monthWidth:l,arrow:!!this._showArrow})
},_setCalendarDate:function(l,m,k){this.calendar.trigger("dateSelected",{value:this._buildDateObject(l,m,k)})
},_setSelectsDate:function(l,m,k){this.monthYearSelect.val(l+"-"+(m+1));
this._updateDaySelect(l,m);
this.daySelect.val(k)
},_buildDateObject:function(l,m,k){return{date:k,day:k,month:m,year:l,string:l+"-"+(m+1)+"-"+k,raw:new Date(l,m,k)}
},_updateDaySelect:function(m,n){var k=this.getDay(),l,o;
this.daySelect.html(this._buildDayOptionsForMonthYear(m,n));
l=this.daySelect.find("[value='"+k+"']");
o=l.length?k:c[n];
this.daySelect.val(o);
return o
},_buildDayOptionsForMonthYear:function(o,r){var l=new Date(o,r,1),q=l.getDay(),n=c[r],k=[],p;
for(var m=1;
m<=n;
m++){if(a==="ja"||a==="zh"||a==="ko"||a==="hu"){p=m+" "+g[q]
}else{p=g[q]+" "+m
}k.push("<option value='"+m+"'>"+p+"</option>");
q=q===6?0:q+1
}return k.join("")
},getYear:function(){return parseInt(this.monthYearSelect.val().split("-")[0],10)
},getMonth:function(){return parseInt(this.monthYearSelect.val().split("-")[1],10)-1
},getDay:function(){return parseInt(this.daySelect.val(),10)
},getFullDate:function(){var k=this.getDay(),m=this.getMonth(),l=this.getYear();
return this._buildDateObject(l,m,k)
},getCalendarElement:function(){return this.calendar
},getCalendar:function(){if(!this.calendar){return null
}return this.calendar.data("calendar2")
},setDate:function(l,m,k){this._setSelectsDate(l,m,k);
if(this.calendar){this._setCalendarDate(l,m,k)
}},broadcastDateChange:function(){var k=this.getDay(),m=this.getMonth(),l=this.getYear();
this.trigger("date-change",this._buildDateObject(l,m,k))
}})
});
B.define("component/show-static-notification",function(d,b,e){var c=d("component");
var a=d("utils");
e.exports=c.extend({init:function(){this.options=a.nodeData(this.$el);
a.assertExists(this.options,"message");
a.assertExists(this.options,"show");
if(this.options.show&&!(this.options.show.match(/^(success|error)$/))){throw new Error("Undedined notification type")
}var f=B.require("static-notification");
f[this.options.show](this.options.message)
}})
});
booking.components.define("legacy-emitter",function(b,a){this.eventHandlers={};
this.bind=function(c,d){this.eventHandlers[c]=this.eventHandlers[c]||[];
this.eventHandlers[c].push(d);
return this
};
this.once=function(c,d){var e=this;
var f=function(g){e.unbind(c,f);
d.apply(e,arguments)
};
this.bind(c,f);
return this
};
this.unbind=function(d,e){this.eventHandlers[d]=this.eventHandlers[d]||[];
if(e){var c=a.inArray(e,this.eventHandlers[d]);
c!=-1&&this.eventHandlers[d].splice(c,1)
}else{this.eventHandlers[d]=[]
}return this
};
this.trigger=function(d,f){if(!this.eventHandlers[d]||this.eventHandlers[d].length==0){return this
}var c=false,e=this;
a.each(this.eventHandlers[d],function(g,h){if(c){return false
}h&&h.call&&h.call(e,{type:d,data:f,stopPropagation:function(){c=true
}})
});
return this
};
this.on=this.bind;
this.off=this.unbind
});
B.define("static-notification",function(c,b,d){var a,e;
b.show=function(){if(!a){a=this._getElement()
}var f=this._getHTML.apply(this,arguments);
a.html(f).loadComponents();
this._showElement();
clearTimeout(e);
e=setTimeout(this._hideElement.bind(this),5000)
};
b.success=function(f){this.show("success",f)
};
b.error=function(f){this.show("error",f)
};
b._hideElement=function(){a.fadeOut()
};
b._showElement=function(){a.fadeIn()
};
b._getElement=function(){return $('<div style="display:none">').appendTo("body")
};
b._getHTML=function(h,f){var g={level:h,message:f};
return B.jstmpl("static_notification").render(g)
}
});
booking.components.define("spin-button",function(c,f){var l,i,j,e,k,h=this,b,a=c.components.require("legacy-emitter");
this.init=function(m){i=m;
j=i.find("input.component_spin_button_value");
b=i.attr("id");
e=i.data("lower-limit")||0;
k=i.data("upper-limit")||Infinity;
i.find(".component_spin_button_minus").click(function(){g(-1)
});
i.find(".component_spin_button_plus").click(function(){g(1)
});
j.click(function(n){f(this).select()
}).blur(function(){if(!f(this).val()){d(e)
}else{g(0)
}}).keypress(function(o){var n=o.which,p=String.fromCharCode(n);
if(n==13){g(0);
return
}if(!(n>=35&&n<=40)&&"0123456789".indexOf(p)==-1){o.preventDefault();
return false
}})
};
function g(n){l=parseInt(i.find(".component_spin_button_value").val());
var m=l+n;
if(!isNaN(m)){if(m<=k&&m>=e){d(m)
}else{if(m>k){d(k)
}else{if(m<e){d(e)
}}}}}function d(m){j.val(m);
l=m;
a.trigger("spin-button-change",{id:b,value:l})
}});
B.define("component/checkin-checkout-calendar-input",function(c,a,d){var e=c("component/checkin-checkout-selector");
var b=1000*60*60*24;
d.exports=e.extend({init:function(){e.prototype.init.apply(this,arguments);
if(this._hasValidDates()){this._updateDates()
}},_findCheckinCheckoutSelectors:function(){this.checkinSelector=this.$el.find("[data-checkin-selector='']").component("date-selector-input");
this.checkoutSelector=this.$el.find("[data-checkout-selector='']").component("date-selector-input")
},_hasValidDates:function(){return B.search.dates("checkin").type=="valid"&&B.search.dates("checkout").type=="valid"
},_getDates:function(f){var g={};
if(f=="checkin"||!f){g.checkin=B.search.dates("checkin")
}if(f=="checkout"||!f){g.checkout=B.search.dates("checkout")
}return g
},_getDateAfterInterval:function(g,f){f=1;
return new Date(g.getTime()+(f*b))
},_attachEvents:function(){var f=this;
e.prototype._attachEvents.apply(this,arguments);
B.eventEmitter.bind("SEARCH:date_changed",function(){f._updateDates()
});
this.on("dates-changed",function(g){B.search.dates("checkin",g.checkin);
B.search.dates("checkout",g.checkout)
});
this.globalEmitter.bind("dates-calendar-close",function(){f.checkoutSelector.getCalendarElement().trigger("hide");
f.checkinSelector.getCalendarElement().trigger("hide")
});
this.checkinSelector.on("calendar-date-selected",function(g){setTimeout(function(){f.checkoutSelector.getCalendarElement().click()
},0)
})
},_updateDates:function(){var f=this._getDates();
this.checkinSelector.setDate(f.checkin.year,f.checkin.month,f.checkin.date);
this.checkoutSelector.setDate(f.checkout.year,f.checkout.month,f.checkout.date)
}})
});
B.define("component/date-selector-input",function(d,b,e){var a=d("component/date-selector"),f=d("event-emitter");
var c=1000*60*60*24;
e.exports=a.extend({init:function(){f.extend(this);
this._showArrow=true;
var g=this.$el.is("[data-dateselector-calendar='']")?this.$el:this.$el.find("[data-dateselector-calendar='']");
this.input=this.$el.find("[data-dateselector-input='']");
this.calendar=g.length?this._initCalendar(g):null;
this._attachEvents()
},_attachEvents:function(){},_setSelectsDate:function(h,i,g){if(h&&!isNaN(h)){this.$el.data("year",h);
this.$el.data("month",i);
this.$el.data("day",g);
this.input.html(B.formatter.date(this._buildDateObject(h,i,g).string))
}},getYear:function(){return parseInt(this.$el.data("year"),10)
},getMonth:function(){return parseInt(this.$el.data("month"),10)
},getDay:function(){return parseInt(this.$el.data("day"),10)
}})
});
B.define("component/company/lp-return-bar/lp-return-bar",function(c,a,d){var b=c("component");
d.exports=b.extend({init:function(){this.setupHandlers()
},setupHandlers:function(){this.$el.find('[data-return-bar-dismiss], [data-return-bar-dismiss=""]').bind("click",this.dismiss.bind(this))
},dismiss:function(e){if(B.env.b_browser!=="msie"||B.env.b_browser_version>9){this.$el.remove();
e.preventDefault();
history.replaceState({},document.title,$(e.target).attr("href"))
}B.track.custom_goal("bbtool_lp_return_bar",2)
}})
});
B.define("leaving-users-lightbox",function(){var b=function(){};
var a={customMaskClassName:"b_leaving_users_light_box_mask",messageDelay:600,lightboxRootClass:"b_leaving_users_light_box"};
b.prototype.init=function(c){if((typeof c!=="object")||!(c.hasOwnProperty("lightboxContentBlock"))){throw new Error("leaving-users-lightbox: `params` is not an object or it's missing required property: `lightboxContentBlock`!")
}this.params=$.extend(a,c);
this.page_=$(document.documentElement);
this.lightboxContentBlock_=$(c.lightboxContentBlock);
if(this.lightboxContentBlock_.length===0){return
}this.lastMouseYCoords_=[];
this.messageTimeoutId_=0;
this.lightbox_=booking[sNSStartup].lightbox;
this.windowFocused_=true;
this.attachEvents_()
};
b.prototype.isInitiated=function(c){return typeof this.lastMouseYCoords_!=="undefined"
};
b.prototype.attachEvents_=function(){var c=this;
this.page_.bind({"mousemove.LeavingUsersLightbox":function(d){c.onPageMouseMove_(d)
},"mouseleave.LeavingUsersLightbox":$.proxy(this.onPageMouseLeave_,this)});
$(window).focus(function(){c.windowFocused_=true
}).blur(function(){c.windowFocused_=false
})
};
b.prototype.detachEvents_=function(){this.page_.unbind(".LeavingUsersLightbox")
};
b.prototype.onPageMouseMove_=function(c){clearTimeout(this.messageTimeoutId_);
this.writeMouseCoords_(c)
};
b.prototype.onPageMouseLeave_=function(){if(!this.wasMouseMoveUpwards_()){return
}var c=this;
clearTimeout(this.messageTimeoutId_);
this.messageTimeoutId_=setTimeout(function(){c.detachEvents_();
c.showLeavingMessage_()
},c.params.messageDelay)
};
b.prototype.showLeavingMessage_=function(){var d=this;
this.lightbox_.hide();
this.lightbox_.show(this.lightboxContentBlock_,{customWrapperClassName:this.params.lightboxRootClass,customMaskClassName:this.params.customMaskClassName,bAnimation:false},function c(){B.events.emit("leaving-users-lightbox:show",{lightboxSelector:d.params.lightboxContentBlock})
})
};
b.prototype.writeMouseCoords_=function(c){this.lastMouseYCoords_.push(c.pageY);
if(this.lastMouseYCoords_.length>2){this.lastMouseYCoords_.shift()
}};
b.prototype.wasMouseMoveUpwards_=function(){return(this.lastMouseYCoords_.length>=2&&this.lastMouseYCoords_[0]>this.lastMouseYCoords_[1])
};
return new b()
});
B.define("utils/throttled",function(c,b,d){d.exports=function a(g,f){var e;
var i=0;
function h(){var l=this;
var k=Array.prototype.slice.call(arguments);
var j=+new Date();
if(i){clearTimeout(i)
}if(j-e<f){i=setTimeout(function(){h.apply(l,k)
},f);
return
}e=j;
setTimeout(function(){g.apply(l,k)
})
}return h
}
});
(function(d){var b=B.debug("activity_stream");
var c={image:'<div class="image"><img src="{image_src}" /></div>'};
function a(g,f){this.$=d(g);
f=f||[];
if(typeof f=="string"){f=[f]
}this._last=0;
this._counter=0;
this.sources={};
var e=this;
d.each(f,function(){if(typeof a.defaultSources[this]!="undefined"){e.sources[this]=a.defaultSources[this]
}});
this.queues={};
this.itemsPoplarHotelNames={};
this.$.delegate(".activity_box","click",function(i){if(d(i.target).is("a")){return
}var h=d(this).find("a").first();
if(h.length){h.click()
}});
this.$.delegate("a","click",function(i){var h=d(this);
clearTimeout(e.timer);
booking.google.trackEvent(booking.google.clickTracker,"Activity feed",h.closest("li").attr("class"));
window.location=this.href
});
this.next(3)
}a.prototype.fetchSource=function(g,h){var f=this.sources[g].url;
var e=this;
d.ajax({url:f,dataType:"json",data:{last:this._last},success:function(i){if(i.length){d.each(i,function(l,j){e.itemsPoplarHotelNames[l]=j.hotel_name
});
e.queues[g]=i;
if(typeof(h)=="function"){h.call(e)
}}else{if(!e._last||e._last==0){d("#activity_stream_box").hide();
e.itemsPoplarHotelNames[1]=false
}}},error:function(){if(!e._last||e._last==0){d("#activity_stream_box").hide();
e.itemsPoplarHotelNames[1]=false
}}})
};
a.prototype.getSourceKeys=function(){var e=[];
for(var f in this.sources){e.push(f)
}return e
};
a.prototype.next=function(g){var e=this.getSourceKeys();
var f="recent_bookings_per_city";
if(this.queues[f]&&this.queues[f].length){this.nextFromSource(f,g);
if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(d.proxy(this.next,this),(Math.random()+1)*4000)
}else{this.fetchSource(f,function(){this.$.removeClass("loading");
this.nextFromSource(f,g);
if(this.timer){clearTimeout(this.timer)
}this.timer=setTimeout(d.proxy(this.next,this),(Math.random()+1)*4000)
})
}};
a.prototype.nextFromSource=function(f,g){g=g||1;
var e=this.queues[f].shift();
if(e.timestamp){this._last=Math.max(e.timestamp*1,this._last)
}else{this._last=Math.max(e.id*1,this._last)
}e=this.sources[f].transform(e);
this.addItem(e);
this._counter++;
if(g>1){this.next(g-1)
}};
a.prototype.addItem=function(g){if(d.isArray(g)){B.track.custom_goal("YdVFAPDHT",3);
for(var f=0;
f<g.length;
f++){this.addItem(g[f])
}return
}if(typeof g=="string"){B.track.custom_goal("YdVFAPDHT",4);
this.animate(B.jstmpl("activity_stream_text_item",{text:g}));
return
}else{if(typeof g=="object"){for(var e in g){if(g[e]===undefined){b.warn("Corrupted item");
return
}}if(g.type==="deal"){this.animateItem(d(B.jstmpl("activity_stream_item_deal").render(g)))
}else{this.animateItem(d(B.jstmpl("activity_stream_item").render(g)))
}if(B.track.getVariant("BOefAJMMeGXSYSXGMUWe")){this.highlightItemOnMap(g)
}}}this.trimList()
};
a.prototype.highlightItemOnMap=function(f){if(!f.hotel_id){return
}var e=d(".lp_static_map").find('.static_map_marker[data-marker-id="'+f.hotel_id+'"]');
if(e.length){B.track.custom_goal("BOefAJMMeGXSYSXGMUWe",1)
}};
a.prototype.imageFor=function(e){return booking.tmpl(c.image,e)
};
a.prototype.animateItem=function(e){if(booking.feature.transition){this.animateWithTransitions(e)
}else{this.animateWithJQuery(e)
}};
a.prototype.animateWithTransitions=function(e){e.addClass("new");
this.$.prepend(e);
setTimeout(function(){e.removeClass("new")
},30)
};
a.prototype.animateWithJQuery=function(e){e.css({opacity:0,position:"absolute"});
this.$.prepend(e);
var f=e.height();
e.css({opacity:0,height:0,position:""});
e.animate({height:f},{duration:300,queue:false}).animate({opacity:1},500)
};
a.prototype.trimList=function(){var e=this.$.children();
if(e.length>10){e.slice(10).remove()
}};
a.defaultSources={recent_bookings_per_city:{url:d("#activity_stream_box").attr("data-href-city"),transform:function(e){var f={type:e.type||"reservation",user_location:e.booker_country,image_src:e.image,location:e.hotel_name,location_url:e.hotel_uri,booker_country:e.booker_country,booker_location:e.booker_location||e.booker_country,endorsement:e.endorsement||"",ago:e.ago||0,hotel_city:e.hotel_city||"",hotel_id:e.hotel_id||""};
if(e.type==="deal"){f.sr_url=e.sr_uri;
f.value_deal_description=B.strings.get("value_deal_tooltip");
d("#activity_stream_box").find("h2").text(B.jstmpl("activity_stream_deal_header").render())
}return f
}}};
booking.ensureNamespaceExists("modules");
booking.modules.ActivityStream=a
})(jQuery);
$(document).ready(function(){if(B.track.getVariant("BOefAJMMeGXSYSXGMUWe")){B.events.on("LP_STATIC_MAP:markers-rendered",function(){var b=document.getElementById("activity_items");
if(b){window.as=new booking.modules.ActivityStream(b,"recent_bookings_per_city")
}})
}else{var a=document.getElementById("activity_items");
if(a){window.as=new booking.modules.ActivityStream(a,"recent_bookings_per_city")
}}});
$(function(){booking.track.onView("#tracking-target-for-TAeVYFeJXSYSXGMUHRXQUIBdSYYaO").exp("TAeVYFeJXSYSXGMUHRXQUIBdSYYaO");
booking.track.onView("#tracking-target-for-TAeVYFeJEKdfeOONC").exp("TAeVYFeJEKdfeOONC")
});
booking.ensureNamespaceExists(sNSStartup);
booking[sNSStartup].back_to_search_anchor={priority:9,init:function(){var c=$("#back_to_search.show_anchor");
var f=$("#searchboxInc");
if(!f.length){return false
}var e=f.height()+f.offset().top;
var d=null;
var b=false;
var a=function(){if(!b){b=true;
c.slideDown("slow");
c.css("visibility","visible")
}};
$(".back_to_search").click(function(){$("body,html").animate({scrollTop:0},500);
return false
});
$(window).bind("scroll.back_to_search_anchor",function(){if(e<$(window).scrollTop()){if(!b&&d==null){d=setTimeout(a,200)
}}else{if(b){c.slideUp();
b=false;
clearTimeout(d);
d=null
}}})
},initElse:function(){}};
booking[sNSStartup].cp_consolidated_in_and_around=(function(){var d=function(){var e=$(".tab_promotions_wrapper").find("h4.in_and_around_tabs");
var f=$(".tab_promotions_wrapper").find(".tab_content");
a(e,f);
c();
b(e[0],f[0])
};
var c=function(){$(".tab_promotions_wrapper").delegate("h4.in_and_around_tabs","click",function(){var e="."+$(this).data("tabcontent");
b(this,e)
})
};
var b=function(f,h){var g=$(f);
var e=$(h);
g.siblings().removeClass("selected");
e.siblings().hide();
g.addClass("selected");
e.show()
};
var a=function(g,h){$.each(g,function(j,k){$(k).data("tabcontent","tab_content_"+j);
$(h[j]).addClass("tab_content_"+j)
});
var e=$('<div class="tab_container"></div>');
var f=$('<div class="tab_content_container"></div>');
e.append(g);
f.append(h);
$(".tab_promotions_wrapper").find("h3").after(e,f)
};
return{init:d}
}());
booking[sNSStartup].destinationThemes={priority:8,init:function(){$(".city_list_info").click(function(b){var a=$(this).attr("class");
if($(b.target).hasClass("city_price")){booking.google.trackEvent(booking.google.clickTracker,"DestThemes","City Closed Price - "+a);
return
}if($(this).next(".hotels_in_city").hasClass("closed")){$(".hotels_in_city.opened").each(function(){booking.google.trackEvent(booking.google.clickTracker,"DestThemes","City Open HList - "+a);
$(this).removeClass("opened");
$(this).slideUp();
$(this).addClass("closed");
$(this).parent().find(".city_from_price").show()
});
$(this).next(".hotels_in_city").removeClass("closed");
$(this).next(".hotels_in_city").slideDown();
$(this).next(".hotels_in_city").addClass("opened");
$(this).find(".city_from_price").hide()
}else{if($(this).next(".hotels_in_city").hasClass("opened")){booking.google.trackEvent(booking.google.clickTracker,"DestThemes","City Close HList - "+a);
$(this).next(".hotels_in_city").removeClass("opened");
$(this).next(".hotels_in_city").slideUp();
$(this).next(".hotels_in_city").addClass("closed");
$(this).parent().find(".city_from_price").show()
}}});
$(".city_list_info").hover(function(){$(this).find(".cityimage_marker").addClass("hovered");
$(this).find("h3.cityname").addClass("hovered");
$(this).find(".city_from_price a").addClass("hovered")
},function(){$(this).find(".cityimage_marker").removeClass("hovered");
$(this).find("h3.cityname").removeClass("hovered");
$(this).find(".city_from_price a").removeClass("hovered")
});
$(".hotel_block").click(function(){var b=$(this).attr("class");
booking.google.trackEvent(booking.google.clickTracker,"DestThemes","Hotel: "+b);
var a=$(this).find(".hotelname").attr("href");
location.href=a
});
$(".showall_in_city").click(function(){var a=$(this).attr("class");
booking.google.trackEvent(booking.google.clickTracker,"DestThemes","City Show All - "+a)
})
}};
booking[sNSStartup]["discover_b_index"]={init:function(){$(".dcbi_thumb").textLabel();
$(".discover-b-index").swapTab("paging",{$tabButton:".dcbi_tab_btn",$tabButtonActive:".dcbi_tab_btn.active",tabButtonActiveClass:"active",$tabSectionContainer:".dcbi_countries",tabSectionContainerActiveClass:"active"});
$(".dcbi_more").bind("click",function(){B.track.stage("IZVbcJTGDDJdDBKC",1);
B.track.custom_goal("IZVbcJTGDDJdDBKC",1)
})
}};
booking[sNSStartup].dsf_banners={init:function(){var a=$("#dsf_textarea");
var j=$("#dsf_textarea ul");
var d=$("li.dsf_add");
var k=$("#dsf_autocomplete");
var g=[];
var f=$("li.dsf_destination");
var e=(f.length>0)?booking.env.b_query_params_delimiter+""+f.data("name")+"="+f.data("id"):"";
var b=false;
var n="";
var i="dsf_theme tag";
if((booking.env.b_action=="continent"||booking.env.b_action=="country"||booking.env.b_action=="region")){n=' <img class="dsf_sprites" src="//q-ec.bstatic.com/static/img/transparent/85e02501df1560d359a473f544224481a83c9aa7.png" />';
i="dsf_theme tag delete";
b=true
}if(j.find("li.dsf_theme").length>0){g.push(j.find("li.dsf_theme").data("id"))
}m($("li.delete"));
a.click(function(){k.find("li").each(function(){var q=$(this).data("url");
if($.inArray(q,g)!=-1){$(this).hide()
}});
var p=a.outerWidth();
var o=a.height()+10;
k.css({top:o,width:p}).show()
});
$(document).click(function(o){var p=true;
$(o.target).parents().each(function(){if($(this).attr("id")=="dsf_suggestions"){p=false
}});
if(p&&k.is(":visible")){k.hide();
d.show()
}});
var l=new DSF_url_builder();
$("#dsf_linkto").click(function(){$.each(g,function(o,p){l.addTheme(p)
});
this.href=l.getUrl();
return true
});
$("#dsf_autocomplete li").click(function(){var o=$(this).data("name");
var q=$(this).data("url");
var p='<li data-id="'+q+'" class="dsf_theme tag delete">'+o+n+"</li>";
g.push(q);
if($("li.dsf_theme:last").length>0){$(p).insertAfter($("li.dsf_theme:last"))
}else{if($("li.dsf_add").length>0){$(p).insertBefore($("li.dsf_add"))
}else{j.html(p)
}}k.hide();
d.show();
m($("li.delete"));
return false
});
function h(){var o=c()+booking.env.b_query_params_delimiter+"tags="+g.join(",")+e;
$("#dsf_linkto").attr("href",o)
}function c(){var o=(booking.env.b_protocol||"http")+"://"+booking.env.b_hostname;
o+="/destinationfinder"+booking.env.b_query_params_with_lang;
return o
}function m(o){o.click(function(){var p=$(this).data("id");
g=jQuery.grep(g,function(q){return q!=p
});
h();
$(this).remove();
d.show()
})
}}};
function DSF_url_builder(){for(var a in this.buckets){if(this.buckets.hasOwnProperty(a)){this.buckets[a]=[]
}}this.processed=false
}DSF_url_builder.prototype.order=["themes","continents","countries","regions","cities"];
DSF_url_builder.prototype.buckets=[];
DSF_url_builder.prototype.buckets.continents=[];
DSF_url_builder.prototype.buckets.countries=[];
DSF_url_builder.prototype.buckets.regions=[];
DSF_url_builder.prototype.buckets.cities=[];
DSF_url_builder.prototype.buckets.themes=[];
DSF_url_builder.prototype.basic_url=booking.env.dsf_basic_url;
DSF_url_builder.prototype.processed=false;
DSF_url_builder.prototype.processBasicUrl=function(){var d={};
if(!this.basic_url){return d
}var e=this.basic_url.split(".");
var h=e[0];
h=h.replace(/^\//,"");
var a=h.split("/");
d.action_name=a.shift();
if(!this.processed){var g;
for(var b=0;
b<a.length;
b++){var c=a[b];
if(g){this.addToBucket(g,c)
}if($.inArray(c,this.order)){g=c
}}}this.processed=true;
d.extension="."+e.slice(1,e.length).join(".");
return d
};
DSF_url_builder.prototype.setBasicUrl=function(a){this.basic_url=a
};
DSF_url_builder.prototype.addCity=function(a){this.addToBucket("cities",a)
};
DSF_url_builder.prototype.addCountry=function(a){this.addToBucket("countries",a)
};
DSF_url_builder.prototype.addRegion=function(a){this.addToBucket("regions",a)
};
DSF_url_builder.prototype.addTheme=function(a){this.addToBucket("themes",a)
};
DSF_url_builder.prototype.addContinent=function(a){this.addToBucket("continents",a)
};
DSF_url_builder.prototype.addToBucket=function(b,a){if($.inArray(a.toLowerCase(),this.buckets[b])>-1){return
}this.buckets[b].push(a.toLowerCase())
};
DSF_url_builder.prototype.getUrl=function(d){var b="";
if(!d){b+="http://"+booking.env.b_hostname
}var e=this.processBasicUrl();
b+="/"+e.action_name;
var a=this.order.length;
for(var c=0;
c<a;
c++){var f=this.order[c];
if(!this.buckets[f]||this.buckets[f].length===0){continue
}b+="/"+f+"/";
b+=this.buckets[f].sort().join("/")
}b+=e.extension;
return b
};
booking[sNSStartup].emk_searchform_subscribe=(function(){var b=window.booking;
function a(){var d=$("#searchform-subscribe-box-form");
if(!d.length){return
}var h=$("#searchform-subscribe-box");
var e=6000;
var f;
var k;
var i;
var g=["bicon-upchevron","bicon-downchevron"];
var n=function(){window.clearTimeout(f);
window.clearTimeout(k);
window.clearTimeout(i)
};
var c=function(){h.find(".searchform-subscribe-box-loader").hide()
};
var m=function(){n();
h.find(".searchform-subscribe-box-warns-error").hide();
h.find(".searchform-subscribe-box-warns-success").hide();
h.find(".searchform-subscribe-box-warns-denied").show();
k=window.setTimeout(function(){h.find(".searchform-subscribe-box-warns-denied").fadeOut()
},e);
c()
};
var j=function(){n();
d.find(".searchform-subscribe-box-textfield")[0].value="";
h.find(".searchform-subscribe-box-warns-error").hide();
h.find(".searchform-subscribe-box-warns-success").show();
f=window.setTimeout(function(){h.find(".searchform-subscribe-box-warns-success").fadeOut()
},e);
c()
};
var l=function(){h.find(".searchform-subscribe-box-loader").show();
var q=$("input[name=url]",h).val();
var x=$("input[name=hostname]",h).val();
var r=$("input[name=aid]",h).val();
var w=$("input[name=companyname]",h).val();
var t=$("input[name=subscribe_source]",h).val();
var s=$("input[name=dest_id]",h).val();
var p=$("input[name=dest_type]",h).val();
var u=$(".searchform-subscribe-box-textfield",h).val();
u=encodeURIComponent(u);
var v="to="+u+"&url="+q+"&hostname="+x+"&aid="+r+"&companyname="+w+"&subscribe_source="+t;
if(s!==""){v=v+"&dest_id="+s
}if(p!==""){v=v+"&dest_type="+p
}$.ajax({type:"POST",url:"/newslettersubscribe.json",data:v,dataType:"json",success:function(y){if(y.success===0){if(y.error==="denied"){m()
}else{if(y.error==="bad_params"){m()
}}return
}else{if(y.success===1){j()
}}},error:function(){m()
}})
};
var o=function(q){var p=b.env.b_email_validation_regex||/^.+@(.+\.)+.*$/;
if(!(p.test(q))){return false
}return true
};
h.find(".js-open-subscribe-field").click(function(){var r=h.find(".js-icon-toggle");
var p=r.hasClass(g[0])?1:0;
var q=(p===0?1:0);
h.find(".searchform-subscribe-box-field-section").slideToggle();
r.removeClass(g[q]).addClass(g[p])
});
d.submit(function(p){p.preventDefault();
var q=d.find(".searchform-subscribe-box-textfield").val();
if($.trim(q)===""){return false
}if(!o(q)){n();
h.find(".searchform-subscribe-box-warns-error").hide();
h.find(".searchform-subscribe-box-warns-success").hide();
h.find(".searchform-subscribe-box-warns-invalid").show();
i=window.setTimeout(function(){h.find(".searchform-subscribe-box-warns-invalid").fadeOut()
},e);
return false
}l()
})
}return{priority:9,init:a}
})();
if(window.booking&&window.booking.env.b_action=="index"){booking[sNSStartup]["loc_add_choose_date"]=(function(m,n,d,l,j){var k;
var c;
var p=function(s){var r=s?j(s):j("#home_featured_destinations");
r.delegate(".checkAvailabilitySwitch","click",function(t){t.stopPropagation();
if(j(this).hasClass("moreBtnFolded")){if(j(".moreBtnUnfolded")){j(".moreBtnUnfolded").parent().parent().removeClass("currentHotel");
j(".moreBtnUnfolded").removeClass("moreBtnUnfolded").addClass("moreBtnFolded")
}j(this).parent().parent().next().removeClass("moreBoxFolded").addClass("moreBoxUnfolded");
j(this).removeClass("moreBtnFolded").addClass("moreBtnUnfolded");
j(this).parent().parent().next().find("td").append(j("#add_date_box"));
j(this).parent().parent().addClass("currentHotel")
}else{if(j(this).hasClass("moreBtnUnfolded")){j(this).parent().parent().next().removeClass("moreBoxUnfolded moreBtnUnfolded").addClass("moreBoxFolded");
j(this).removeClass("moreBtnUnfolded").addClass("moreBtnFolded");
j("#add_date_box_hidden").append(j("#add_date_box"));
j(this).parent().parent().removeClass("currentHotel")
}}});
b();
i();
j("#checkAvailabilityBtn").click(function(){var u=j(this).parent().parent().parent().parent().prev().attr("data-url");
var t=u.search(/checkin/i);
var v=u;
if(t!=-1){v=u.slice(0,t-1)
}var w=d.search.dates("checkin").toString();
var x=d.search.dates("checkout").toString();
if(d.search.dates("checkout").type!="invalid"){j(this).attr("href",v+";checkin="+w+";checkout="+x)
}else{j(this).attr("href",v)
}})
};
function b(){k=j(".checkinWidget");
c=j(".checkoutWidget")
}function a(r,s){if(d.env.b_year_months[r+"-"+(s+1)]){return d.env.b_year_months[r+"-"+(s+1)].name
}}function i(){var w=l.sunday_first,r=l.b_simple_weekdays,t=l.b_short_months;
var z=d.calendar2.controller.getCalendars();
d.eventEmitter.bind("SEARCH:date_changed",function(G,A){var F=d.search.dates("checkin"),E=d.search.dates("checkout"),D=d.search.dates(A.type);
if(F){e("checkin",F.date,F.month+1,F.year)
}if(E){e("checkout",E.date,E.month+1,E.year)
}if(D.type==="month"){v("monthSelected",A.type,D)
}else{if(D.type==="valid"){v("dateSelected",A.type,D)
}}for(var C=0;
C<z.length;
C++){if(F&&E&&F.type==="valid"&&E.type==="valid"){z[C].trigger("rangeSelected",{type:A.type,startValue:F,endValue:E})
}}});
function y(D,A){var E=d.calendar2.controller.getCalendars();
for(var C=0;
C<E.length;
C++){if(A.id!==E[C].id()){E[C].trigger("hide")
}}}function v(D,C,E){for(var A=0;
A<z.length;
A++){if(z[A].type()===C){z[A].trigger(D,{type:C,value:E})
}}}function u(D,C){if(!D){return
}var A=new Date(D.year,D.month,D.date+C);
return{year:A.getFullYear(),month:A.getMonth(),date:A.getDate()}
}var s={type:"checkin",defaultDate:d.search.dates("checkin"),startDate:g(),endDate:f(),dayNames:r,monthNames:t,sundayFirst:w,title:l.transl_checkin_title,monthTitle:a,direction:l.rtl?"rtl":"ltr",onDateSelected:function(E,A){var G={year:A.getYear(),month:A.getMonth(),date:A.getDate()};
var D=d.search.dates("checkin"),C=d.search.dates("checkout");
var F=C;
if(E.options.type=="checkin"){d.search.dates("checkin",G);
D=d.search.dates("checkin");
if(!C||C.type=="invalid"||(D.toString()>=C.toString())){d.search.dates("checkout",u(D,1));
C=d.search.dates("checkout")
}d.calendar2.controller.getCalendars()[1].setOptions({startDate:A});
d.calendar2.controller.getCalendars()[1].refreshDisabledDays()
}else{d.search.dates("checkout",G);
C=d.search.dates("checkout")
}e(E.options.type,A.getDate(),A.getMonth()+1,A.getYear());
if(!D||C.type=="invalid"){G=new Date(A.getYear(),A.getMonth(),A.getDate()-1);
d.search.dates("checkin",G);
D=d.search.dates("checkin")
}if((C&&!D)||((C.type=="valid")&&(D.type=="invalid"))||(D.toString()>=C.toString())){d.search.dates("checkin",u(C,-1));
D=d.search.dates("checkin")
}if(D&&C&&D.type=="valid"&&C.type=="valid"){E.selectRange(d.calendar2.dayId(D.year,D.month,D.date),d.calendar2.dayId(C.year,C.month,C.date))
}if(!F||F.type=="invalid"){e("checkout",C.date,C.month+1,C.year);
h()
}},onShow:function(C,A){if(C.options.type=="checkout"){return
}var D=d.search.dates("checkin");
if(D&&D.type=="valid"){C.selectDay(d.calendar2.dayId())
}}};
d.eventEmitter.bind("CALENDAR:opened",y);
var x=j.extend({},s);
x.type="checkout";
x.title=l.transl_checkout_title;
x.defaultDate=d.search.dates("checkout");
x.startDate=q();
x.endDate=o();
k.calendar2(s);
c.calendar2(x)
}function h(){c.trigger("show")
}function g(){var r=new Date();
return r
}function f(){var r=d.calendar2.today();
r.setFullYear(r.getFullYear()+1);
r.setDate(0);
r.setDate(r.getDate()-1);
return r
}function q(){var r=d.calendar2.today();
r.setDate(r.getDate()+1);
return r
}function o(){var r=d.calendar2.today();
r.setFullYear(r.getFullYear()+1);
r.setDate(0);
return r
}function e(s,r,v,u){var t;
var w;
if(r){w=u+"-"+v+"-"+r;
w=booking.formatter.date(w,"date_with_year")
}if(s=="checkin"){t=k.find("p")
}else{t=c.find("p")
}if(r){t.removeClass("placeholder").text(w)
}else{t.addClass("placeholder").text(t.data("default"))
}return true
}return{init:p,priority:9}
}(window,document,booking,booking.env,$))
}if(B.env.b_countrycode==="cn"&&B.env.b_action==="city"&&$("#ed-wrapper").length>0){booking[sNSStartup].loc_everyday_deals={init:function(){var b=$("#ed-pagination");
var h=$("#ed-prevpage");
var c=$("#ed-nextpage");
var e=$("#ed-cpagenum");
var i=$("#ed-tpagenum");
var d=$(".ed-list-wrapper.ed-cgrp");
var a=$(".ed-list-wrapper");
var g=a.length;
if(g>1){a.each(function(j){if($(this).hasClass("ed-cgrp")){e.text(j+1)
}});
a.eq(g-1).addClass("ed-lgrp");
b.show();
i.text(g);
function f(){$this=$(this);
if($this.attr("id")==="ed-prevpage"&&!d.hasClass("ed-fgrp")){d.removeClass("ed-cgrp").hide().prev().addClass("ed-cgrp").show();
e.text(parseInt(e.text())-1)
}else{if($this.attr("id")==="ed-nextpage"&&!d.hasClass("ed-lgrp")){d.removeClass("ed-cgrp").hide().next().addClass("ed-cgrp").show();
e.text(parseInt(e.text())+1)
}}d=$(".ed-list-wrapper.ed-cgrp");
h.removeClass("ed-disclick");
c.removeClass("ed-disclick");
if(d.hasClass("ed-fgrp")){h.addClass("ed-disclick")
}else{if(d.hasClass("ed-lgrp")){c.addClass("ed-disclick")
}}}h.click(f);
c.click(f)
}}}
}booking[sNSExperiments].local_staff_recommendations=(function(){var g=0;
var h;
var e;
var i=500;
var b=5000;
var c;
var k=$("#sliderWrapper .next");
var f=$("#sliderWrapper .prev");
var d=function(){c.eq(g).fadeOut(i);
if(g==h-1){g=0
}else{g++
}c.eq(g).fadeIn(i)
};
var a=function(){c.eq(g).fadeOut(i);
if(g==0){g=h-1
}else{g--
}c.eq(g).fadeIn(i)
};
k.click(function(){d()
});
f.click(function(){a()
});
var j=function(){c=$("#districtsSlider li");
h=c.length;
c.eq(g).fadeIn(i);
e=setInterval(d,b);
$("#sliderWrapper").hover(function(){clearInterval(e)
},function(){e=setInterval(d,b)
})
};
return{init:j}
}());
(function(a,d){var b="fEWWSJXOTEcYC";
var c=function(){var f=395,l=false,i=a(".lp_city_sticky_cta_wrapper"),e=a(".lp_bold_date_picker_searchbox"),j="lp_city_sticky_cta_wrapper_visible",h="body_lp_city_sticky_cta_wrapper_visible",k=d.components.require("legacy-emitter");
if(!e.length){e=a("#searchboxInc")
}if(!e.length){return
}g();
a(window).scroll(function(){var m=a(document).scrollTop();
if(!l&&m>=f){i.addClass(j);
a("body").addClass(h);
l=true;
k.trigger("lp_city_sticky_cta.show")
}else{if(l&&m<f){i.removeClass(j);
a("body").removeClass(h);
l=false;
k.trigger("lp_city_sticky_cta.hide")
}}}).resize(g);
function g(){f=e.offset().top+e.outerHeight()
}};
booking[sNSStartup][b]={init:c}
})(jQuery,booking);
booking[sNSStartup].lp_sh_hide_specific_search=(function(c,a){function b(){var d=this.name;
a(".lp-sh-hide-search").click(function(j){j.preventDefault();
j.stopPropagation();
var h=a(this).closest("li"),g=h.hasClass("lp-dest-search-history"),i=h.data("sh_id");
function f(){if(h.siblings(":visible").length){return
}h.closest(".lp-sh-block").fadeOut()
}if(g){h.css({overflow:"hidden",border:"none"});
h.animate({opacity:0,height:"0px",padding:0,margin:0},100,f)
}else{h.fadeOut(300,f)
}a.ajax({url:"/hide_search_hist",data:{id:i}})
})
}return{init:b}
}(booking,jQuery));
(function(){var a=function(){var d=$(".lp_usps_available_onclick");
var b=$(".lp_usps_available_onclick_trigger",d);
var c=$(".lp_usps_available_onclick_content",d);
b.click(function(){B.lightbox.show(c.show(),{customWrapperClassName:"lp_usps_available_onclick_wrapper",hideCallBack:function(){c.hide()
},positionAfterCallBack:function(){var e=$(".modal-wrapper");
var f=(e.height()>=c.height())?"removeClass":"addClass";
e[f]("lp_usps_available_onclick_scroll")
}})
});
c.find(".usps_rate_guarantee_link").click(function(f){f.preventDefault();
f.stopImmediatePropagation()
})
};
booking[sNSStartup]["fEDTBOPefWcVcZVHGO"]={init:a};
booking[sNSStartup]["fEDTBOPefWcVcZAeHHMO"]={init:a}
})();
$(function(){if(!B.atlas){return
}B.atlas.define("icons-zindex",["jQuery"],function(f){var e,d="//r-ec.bstatic.com/static/img/map_sprites_omnibus_mk3/635ad7902710fb05e761a015c754ac4c664951fe.png",b={url:d,w:18,h:27,x:33,y:33,z:500};
function c(h){return f.extend({},b,h)
}e={genius_current:c({w:22,h:36,x:176,y:60,z:1010}),hotel_current:c({w:22,h:36,x:198,y:60,z:1000}),landmark_current:c({w:22,h:36,x:66,y:60,z:350}),airport_current:c({w:22,h:36,x:132,y:60,z:340}),ski_lift_current:c({w:22,h:36,x:110,y:60,z:330}),transport_current:c({w:22,h:36,x:88,y:60,z:320}),city_current:c({w:22,h:36,x:154,y:60,z:310}),genius:c({x:136,z:800}),hotel_matching:c({x:0,z:700}),hotel:c({}),"default":c({}),hotel_not_matching:c({x:17,z:400}),landmark:c({x:51,z:300}),airport:c({x:102,z:250}),ski_lift:c({x:85,z:200}),transport:c({x:68,z:150}),city:c({x:118,z:100})};
function g(h){return(h&&e.hasOwnProperty(h))?e[h]:e["default"]
}function a(j){var h={},i=g(j);
switch(true){case (j==="genius"):case (j==="city"):case (j==="landmark"):case (j==="airport"):case (j==="transport"):case (j==="ski_lift"):case (j==="genius_current"):case (j==="city_current"):case (j==="airport_current"):case (j==="landmark_current"):case (j==="transport_current"):case (j==="ski_lift_current"):h=f.extend(h,i,{z:2000});
break;
case (j&&j.indexOf("_current")>-1):f.extend(h,i,{x:198,y:60,z:2000});
break;
default:f.extend(h,i,{x:153,y:33,z:2000})
}return h
}return{ICONS:e,getIcon:g,getHover:a}
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("zoom-control",["jQuery"],function(b){function a(e){var c=this;
function d(){var f=b("#map_atlas_custom_zoom > .map_atlas_custom_zoom_increment"),g=b("#map_atlas_custom_zoom > .map_atlas_custom_zoom_decrement");
f.bind("click",function(j){j.preventDefault();
var h=b(this),i=false;
if(!h.hasClass("disabled")){g.removeClass("disabled");
i=e.incrementZoom();
if(i){h.addClass("disabled")
}}});
g.bind("click",function(j){j.preventDefault();
var h=b(this),i=false;
if(!h.hasClass("disabled")){f.removeClass("disabled");
i=e.decrementZoom();
if(i){h.addClass("disabled")
}}})
}d();
return c
}return a
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("hover-visited",function(){function d(){this.on("marker-hover",function(e){a(e.markerId)
});
this.on("marker-out",function(e){b(e.markerId)
});
this.on("marker-visited",function(e){c(e.markerId)
})
}function a(g){var e=this.Interface.getMarker(g),f=(e)?e.iconType||e.b_type:"";
this.Interface.setMarkerType(g,this.getHover(f))
}function c(g){var e=this.Interface.getMarker(g),f=(e)?e.iconType||e.b_type:"";
this.Interface.setMarkerType(g,this.getVisited(f))
}function b(g){var e=this.Interface.getMarker(g),f=(e)?e.iconType||e.b_type:"";
this.Interface.setMarkerType(g,this.getIcon(f))
}return{addIconEvents:d,setIconHover:a,setIconOut:b,setIconVisited:c}
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("atlas-common-icons",["jQuery","icons-default","util-env"],function(f,c,h){if(h.get("action")=="hotel"&&!h.get("tdot")&&!h.get("isMsie")){B.track.stage("ebcBUECAFSDPOHO",3)
}var l=f.extend({},c.ICONS),b={hotel:j({x:153,y:33,z:2000}),hotel_soldout:j({x:153,y:33,z:2000}),geosearch_place:j({w:28,h:25,x:131,y:96,z:2000})},m={hotel:j({x:215,y:33,z:2000})},k="//q-ec.bstatic.com/static/img/map_sprites_omnibus_mk10/8b553fa5484a0ceb6aaea7eb9db1aa3e109dec1e.png",d,g={url:k,w:18,h:27,x:33,y:33,z:400};
function j(n){return f.extend({},g,n)
}f.extend(l,{hotel_soldout_current:j({w:22,h:36,x:22,y:60,z:1010}),hotel_soldout:j({x:17,z:300}),hotel_current:j({w:22,h:36,x:198,y:60,z:1000}),hotel:j({}),geosearch_place:j({w:28,h:25,x:103,y:96,z:500})});
if(!h.get("tdot")&&h.get("hasValidDates")&&h.get("action")=="hotel"){d="//q-ec.bstatic.com/static/img/map_sprites_omnibus_mk15/c22e8051729f66180a287ff5f7e4f209785cfdaa.png";
f.extend(l,{hotel_soldout:j({url:d,w:16,h:28,x:198,y:33}),hotel:j({url:d,w:16,h:28,x:215,y:33}),hotel_comp_set:j({url:d,w:16,h:28,x:215,y:33})});
f.extend(b,{hotel_soldout:j({url:d,w:16,h:28,x:232,y:33,z:501}),hotel:j({url:d,w:16,h:28,x:249,y:33,z:501}),hotel_comp_set:j({url:d,w:16,h:28,x:249,y:33,z:501})})
}if(B.atlas.getVariant("eGBUZUabBTRSOIfREFcdHPSYZeKe")===1){f.extend(l,{hotel_comp_set:j({x:34,y:33,z:60})});
f.extend(b,{hotel_comp_set:j({x:153,y:33,z:2000})})
}if(B.atlas.getVariant("eGBUZUabBTRSOIfREFcdHPSYZeKe")===2){d="//r-ec.bstatic.com/static/img/map_hp_competitive_set_markers_step5/a4ecda09c83a2b78232f9eb1af8a185aa630fe95.png";
f.extend(l,{hotel_comp_set:j({url:d,w:16,h:28,x:0,y:0})});
f.extend(b,{hotel_comp_set:j({url:d,w:16,h:28,x:16,y:0})})
}if((!B.atlas.assert.tdot&&(B.atlas.assert.sr||B.atlas.assert.hp))||B.atlas.getVariant("eGfEWJcEbOMFcPREFHT")||B.atlas.getVariant("eGBUMbfWEYcZbMKJZKe")){f.extend(l,{city:j({w:22,h:21,x:0,y:97,z:500}),city_current:j({w:28,h:25,x:44,y:97})});
f.extend(b,{city:j({w:22,h:21,x:22,y:97,z:2000}),city_current:j({w:28,h:25,x:44,y:97,z:4000})})
}if(B.atlas.getVariant("eGOLEZAAPMECAFC")){f.extend(l,{hotel_soldout:j({x:34,y:33,z:60})});
f.extend(b,{hotel_soldout:j({x:154,y:33,z:2000})})
}if(B.atlas.getVariant("eGOLYNJJYDMKJZKe")){d="//r-ec.bstatic.com/static/img/map_sprites_sr_new_soldout_markers/26c24f983105ee31a0abb6811580ebc22bbc4e40.png";
f.extend(l,{hotel_soldout:j({url:d,w:16,h:28,x:1,y:0}),hotel:j({url:d,w:16,h:28,x:17,y:0})});
f.extend(b,{hotel_soldout:j({url:d,w:16,h:28,x:34,y:0,z:501}),hotel:j({url:d,w:16,h:28,x:51,y:0,z:501})})
}if(B.atlas.getVariant("eGOQJJYDMKJZfIBHPLYIO")){d="//q-ec.bstatic.com/static/img/map_sprites_sr_soldout_markers_fade_x/93509a58510c1ca40a289eb55f2608d5edd35a0d.png";
f.extend(l,{hotel_soldout:j({url:d,w:16,h:28,x:0,y:0})});
f.extend(b,{hotel_soldout:j({url:d,w:16,h:28,x:48,y:0,z:501})})
}if(B.atlas.getVariant("eGOQJJYDXKbMKJZKe")===1){d="//r-ec.bstatic.com/static/img/map_sprites_sr_soldout_red_markers/c139ee4c3f6e318afbf8ac5d578c8f790dddcbf4.png";
f.extend(l,{hotel_soldout:j({url:d,w:17,h:28,x:0,y:0})});
f.extend(b,{hotel_soldout:j({url:d,w:17,h:28,x:17,y:0,z:501})})
}if(B.atlas.getVariant("eGBUPfBfRXQDXPdRe")===1){d="//r-ec.bstatic.com/static/img/map_sprites_sr_soldout_red_markers/c139ee4c3f6e318afbf8ac5d578c8f790dddcbf4.png";
f.extend(l,{hotel:j({x:34,y:33,z:60}),hotel_soldout:j({url:d,w:17,h:28,x:0,y:0})});
f.extend(b,{hotel:j({x:153,y:33,z:2000}),hotel_soldout:j({url:d,w:17,h:28,x:17,y:0,z:501})})
}if(B.atlas.getVariant("eGfEFGbJEXAEHMbEO")===1){d="//r-ec.bstatic.com/static/img/map_sprites_sr_soldout_red_markers/c139ee4c3f6e318afbf8ac5d578c8f790dddcbf4.png";
f.extend(l,{hotel:j({x:34,y:33,z:60}),hotel_soldout:j({url:d,w:17,h:28,x:0,y:0})});
f.extend(b,{hotel:j({x:153,y:33,z:2000}),hotel_soldout:j({url:d,w:17,h:28,x:17,y:0,z:501})})
}if(B.atlas.getVariant("HMDCceGECAFSdfIO")===1){l.hotel_sr=l.hotel;
l.hotel_sr_soldout=l.hotel_soldout;
b.hotel_sr=b.hotel;
b.hotel_sr_soldout=b.hotel_soldout
}else{if(B.atlas.getVariant("HMDCceGECAFSdfIO")===2){d="//r-ec.bstatic.com/static/img/map/hotel_sr/f0ac72eb6ac10833ef3310bd86375b7ce787ee25.png";
f.extend(l,{hotel_sr:j({url:d,x:0,y:0,w:19,h:34}),hotel_sr_soldout:j({url:d,x:38,y:0,w:19,h:34})});
f.extend(b,{hotel_sr:j({url:d,x:19,y:0,w:19,h:34}),hotel_sr_soldout:j({url:d,x:57,y:0,w:19,h:34})})
}}function i(n){return(n&&l.hasOwnProperty(n))?l[n]:l["default"]
}function a(n){return(n&&b.hasOwnProperty(n))?f.extend({},i(n),b[n]):i(n)
}function e(n){return(n&&m.hasOwnProperty(n))?f.extend({},i(n),m[n]):i(n)
}return{ICONS:l,HOVER_ICONS:b,getIcon:i,getHover:a,getVisited:e}
})
});
$(function(){var a=["util-env","util-array"];
if(!B.atlas){return
}if(B.atlas.getVariant("ebcBUcSPWYNHICTae")||B.atlas.getVariant("ebcOQQTDCPZRVMUWe")){a.push("best-areas-poly")
}B.atlas.define("atlas-common-markers",a,function(q,u,g){var k,s=q.get("destinationId"),t=false,e=100,l=null,i=false,m=q.get("isMiniIWLandingPages"),d=q.get("isMiniIW");
function c(A,M,z){var N,J,K=35,H=56,C=5,L=27,I=this.ubber.$domNode,G={w:I.width(),h:I.height()},D={w:A.outerWidth(),h:A.outerHeight()};
H=(H>G.w-z.x-C)?C:H;
if((D.w+C+H>G.w)){D.w=G.w-C-H;
A.find(".iw-container").css({"max-width":D.w})
}N=z.x-C-D.w/2;
if((B.atlas.getVariant("ebcOQPBRYUSPdHcPdDCRe")||B.atlas.getVariant("ebcBUYSaBTbYFYdEFPWHT"))&&(!/^(city|airport)/.test(this.config.type)||(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")&&this.config.type!="landmark"))){var F={left:12,top:0};
N=z.x-C+F.left;
N=(N+D.w+C>G.w)?G.w-D.w-C-H-F.left:N;
N=(N-H<3)?3:N;
J=(z.y+D.h>G.h-K)?z.y-D.h-L-F.top:z.y+F.top
}else{N=(N+D.w+C>G.w)?G.w-D.w-C-H:N;
N=(N-H<3)?3:N;
J=(z.y+D.h>G.h-K)?z.y-D.h-L:z.y
}if(B.atlas.getVariant("ebcYSaBfBFDae")){var E=K,O=this.config.iwType||"";
L=O&&this.ubber.ICONS[O]?this.ubber.ICONS[O].h:L;
J=(z.y-D.h<E)?z.y:z.y-D.h-L
}return{x:N,y:J}
}function j(x){x.setIW({disablePan:true,className:"iw-overlay-lp",engine:"html",getPosition:c,isFixed:true})
}function f(A,x){if(x&&x.data&&x.data.b_id&&x.data.b_type){var y={};
if(B.atlas.getVariant("ebcYSaBfBFDae")){var z=x.data.b_type;
if(x.data.b_id===s){z+="-current"
}y.className="iw-overlay-lp iw-overlay-"+z;
y.iwType=z.replace(/-/g,"_");
A.setIW(y)
}else{y.className="iw-overlay-lp iw-overlay-"+x.data.b_type+((x.data.b_id===s)?"-current":"")
}A.setIW(y)
}}function r(){var x=this;
x.getMarkers(function(z){var C=q.get("action"),D,y,A;
z=z||{};
if(B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO")){z=x.applyBehaviorsToMarkers(z)
}y=[].concat(z.b_hotels||[],z.b_cities||[],z.b_airports||[]);
if(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")){y=z.b_current_landmark?y.concat([z.b_current_landmark]):y
}A=y.length;
if(C==="searchresults"||C==="hotel"||B.atlas.getVariant("ebcMMECAFWTYcUNC")||q.get("isLP")&&C!=="city"){B.atlas.require(["map-markers-disperse"],function(E){E.initialize(y,x,s)
});
if(B.atlas.getVariant("ebcBUcSPWYNHICTae")||B.atlas.getVariant("ebcOQQTDCPZRVMUWe")){g.addPolygon.call(x,z.b_best_areas)
}}else{x.updateMarkers(y);
if(s){while(A--){D=y[A];
if(D&&s===D.b_id){if(!B.atlas.assert.tdot&&B.atlas.assert.hp&&!B.atlas.getVariant("ebcBUHSCQWXXTTWEYcZbMKSGHRIcUZC")){x.setMarkerOptions(D.b_id,{cursor:"default"})
}x.setMarkerType(D.b_id,D.b_marker_type+"_current");
break
}}}}});
x.closeIW()
}function b(x){var y=this;
if(k){clearTimeout(k)
}k=setTimeout(function(){y.setIconHover(x.id);
y.trigger("marker-hover-triggered",x);
if(x.type==="geosearch_place"&&x.data){y.setIW({className:"iw-overlay-lp iw-overlay-geosearch-place"});
y.openIW(x.id,x.data.data)
}else{if(/^(city|airport)/.test(x.type)||(B.atlas.getVariant("fEJMSeCXeLfHHHYbNKe")&&x.type=="landmark")||(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")&&x.type=="landmark")){if(d||m){if(l!==x.id){if(l){y.setIconOut(l);
y.closeIW()
}f(y,x);
x.data.b_is_current=(x.id||x.data.b_id)===s;
y.openIW(x.id,{},B.jstmpl("atlas_iw_mini_landmark").render(p(x.data)))
}}else{y.openIWLoading(x.id);
f(y,x);
y.openIW(x.id,x.data)
}}else{if(d||m){if(l!==x.id){if(l){y.setIconOut(l);
y.closeIW()
}f(y,x);
y.openIWLoading(x.id,B.jstmpl("atlas_iw_mini_loading").render({}));
y.getIW(x.id,function(z){if(s==x.id){y.set("currentHotel",z)
}else{z.b_destination_reference=y.get("currentHotel")
}z.b_marker_type=(x.data)?x.data.b_marker_type:"";
z.b_map_nights=q.get("checkinCheckoutInterval");
z.map_price_per_x_nights_txt=q.get("transPricePerXNights");
y.openIW(x.id,{},B.jstmpl("atlas_iw_mini").render(z))
})
}}else{y.openIWLoading(x.id);
y.getIW(x.id,function(z){z.b_marker_type=(x.data)?x.data.b_marker_type:"";
z.b_map_nights=q.get("checkinCheckoutInterval");
z.map_price_per_x_nights_txt=q.get("transPricePerXNights");
f(y,x);
y.openIW(x.id,z)
})
}}}},e)
}function v(x){var y=this;
if(k){clearTimeout(k)
}if(!(d||m)){y.setIconOut(x.id)
}if(d||m){if(l!==x.id){y.setIconOut(x.id);
y.setIW({className:"iw-overlay-lp"});
y.closeIW()
}}else{y.setIW({className:"iw-overlay-lp"});
y.closeIW()
}}function o(y){var C=this,x=C.getMarker(y.id),A=(x&&x.b_url)?x.b_url:"";
if(B.atlas.getVariant("fEJMSeCXeLfHHHYbNKe")&&x.data&&x.data.b_type=="landmark"&&x.data.b_url){return window.location=x.data.b_url
}if(B.atlas.getVariant("ebcBUECAFJZVcNTBWe")||B.atlas.getVariant("ebcOLHMbdAFfQcUNC")){var D=C.get("isMarkerOpen"),z=C.get("isMarkerOpenId");
if(D&&z==x.b_id){C.closeIW();
C.set("isMarkerOpen",false);
return
}else{C.set("isMarkerOpen",true);
C.set("isMarkerOpenId",x.b_id)
}}if(x&&x.data&&((/^hotel.*/.test(x.data.b_type)&&(B.atlas.getVariant("eGBUYSaBNHTXT")||B.atlas.getVariant("eGOQPBRNZRUXe")))||(/^city.*/.test(x.data.b_type)&&B.atlas.getVariant("ebcYSaBaUSBCHC")))){if(d||m){C.trigger("mini-iw-close-on-marker-click")
}return
}if(x.b_type==="geosearch_place"){return false
}if(x&&x.data&&x.data.b_id===s&&x.data.b_type==="city"&&B.atlas.getVariant("eGYSaBHRXOSLTfdJdHPSYSbC")){return false
}if(d||m){C.on("iw-close",function(){if(l){C.setIconOut(l);
l=null
}});
if(l){C.setIconOut(l)
}l=x.b_id;
C.openIWLoading(x.b_id);
C.setIconHover(x.b_id);
if(/^(city|airport)/.test(x.b_type)||(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")&&x.b_type=="landmark")){f(C,x);
x.data.b_is_current=(x.id||x.data.b_id)===s;
C.openIW(x.b_id,{},B.jstmpl("atlas_iw_landmark").render(p(x.data)));
C.trigger("iw-opened-click",{marker:x,data:x.data})
}else{C.getIW(x.b_id,function(E){E.b_map_nights=q.get("checkinCheckoutInterval");
E.map_price_per_x_nights_txt=q.get("transPricePerXNights");
E.b_url=x.data.b_url;
E.b_marker_type=x.data.b_marker_type;
f(C,x);
C.openIW(x.b_id,E);
C.trigger("iw-opened-click",{marker:x,data:E})
})
}}else{if(A&&!(x.data.b_id===s&&(!B.atlas.assert.tdot&&B.atlas.assert.hp))){location.assign(A)
}}}function w(x){var y=this;
if(d||m){if(B.atlas.getVariant("ebcBUYWbMDceASAcCWOMKSGbEC")===1||B.atlas.getVariant("ebcOQPIFdOQUbBbLOIBECBLFHO")===1){if(k){clearTimeout(k)
}if(l!==x.b_id){y.setIconOut(x.b_id);
y.setIW({className:"iw-overlay-lp"});
y.closeIW()
}}}}function h(E,z){var C=this,x=C.getMarker(z),y,A=3000;
if(B.atlas.getVariant("eGTNVIdEaUDPNcQLCHT")){var D=z,F=B.atlas.require("atlas-common-overlay");
z=F.getCurrentHotelId();
if(z){z=z
}else{z=D
}}if(!z){return
}if(!x&&!t){t=true;
return C.once("markers-show",h,z)
}if(B.atlas.getVariant("eGTNVIdEaUDPNcQLCHT")){t=false
}if(!q.get("tdot")&&q.get("action")=="searchresults"){if(!x){return
}}else{if(!x||(x&&x.b_type&&(/^(city|airport)/.test(x.b_type)||(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")&&x.b_type=="landmark")))){return
}}if(q.get("action")=="hotel"){y=function(){h.call(C,E,z,true);
C.isBoundChangeAutoopen=false
};
C.isBoundChangeAutoopen&&C.once("bounds-change",y);
C.isBoundChangeAutoopen=false
}t=false;
if(!(B.atlas.getVariant("eGBUYSaBNHTXT")||B.atlas.getVariant("eGOQPBRNZRUXe"))){C.openIWLoading(z)
}if(typeof C.setIconHover==="function"){window.setTimeout(function(){C.setIconHover(z)
},0)
}if(!q.get("tdot")&&q.get("action")=="searchresults"&&(/^(city|airport)/.test(x.b_type)||(B.atlas.getVariant("VOGOLNWPSeCXYfZNKe")&&x.b_type=="landmark"))){f(C,x);
x.data.b_is_current=(x.id||x.data.b_id)===s;
if(/^city.*/.test(x.data.b_type)&&B.atlas.getVariant("ebcYSaBaUSBCHC")){window.setTimeout(function(){C.trigger("autoopen-fixed-iw");
C.trigger("iw-control-show",{markerId:z,data:x.data})
},0)
}else{C.openIW(x.b_id,{},B.jstmpl("atlas_iw_landmark").render(p(x.data)))
}C.trigger("iw-opened-click",{marker:x,data:x.data});
return
}C.getIW(z,function(G){G.b_marker_type=(x.data)?x.data.b_marker_type:"";
G.b_map_nights=q.get("checkinCheckoutInterval");
G.map_price_per_x_nights_txt=q.get("transPricePerXNights");
if(s==z){C.set("currentHotel",G)
}f(C,x);
if((B.atlas.getVariant("eGBUYSaBNHTXT")||B.atlas.getVariant("eGOQPBRNZRUXe"))&&/hotel.*/.test(x.data.b_type)){window.setTimeout(function(){C.trigger("autoopen-fixed-iw");
C.trigger("iw-control-show",{markerId:z,data:x.data})
},0)
}else{C.openIW(z,G)
}if(q.get("action")==="hotel"){A=4000
}k=setTimeout(function(){C.closeIW()
},A)
})
}function n(y){try{i=(window.localStorage&&window.sessionStorage?true:false);
if(i){window.localStorage.setItem("btest","1")
}}catch(x){i=false
}if(i){y.on("load",function(){y.trigger("load-dom-storage-supported")
})
}j(y);
y.on("bounds-change",r,y);
y.on("marker-hover",b);
y.on("marker-out",v);
y.on("marker-click",o);
y.on("close",y.closeIW);
y.on("open",h,s);
y.on("fixed-iw-open",w);
y.on("marker-hover-triggered",function(z){if(s==z.id&&/^hotel/.test(z.type)){y.trigger("current-property-marker-hover")
}});
y.on("marker-click",function(z){if(s==z.id&&/^hotel/.test(z.type)){B.track.custom_goal("ebcBUHSCQWXXTTWEYcZbMKSGHRIcUZC",1)
}});
B.atlas.SUBSCRIPTIONS["marker-iw-inconsistent-group"].forEach(function(z){if(z.cond){y.on("marker-hover",function(C){var E=/^hotel/.test(C.type),A=/soldout/.test(C.type);
if(!E){return
}B.track.stage(z.name,1);
if(!A){y.once("iw-get-success",D)
}function D(H){var G,F;
var I;
if(H&&H.b_hotels&&H.b_hotels[C.id]){I=H.b_hotels[C.id];
F=(I.can_accommodate_group==false);
if(F){y.trigger("marker-iw-inconsistent-group")
}}}})
}});
B.atlas.SUBSCRIPTIONS["marker-iw-inconsistent-non-group"].forEach(function(z){if(z.cond){y.on("marker-hover",function(C){var E=/^hotel/.test(C.type),A=/soldout/.test(C.type);
if(!E){return
}B.track.stage(z.name,1);
if(!A){y.once("iw-get-success",D)
}function D(H){var G,F;
var I;
if(H&&H.b_hotels&&H.b_hotels[C.id]){I=H.b_hotels[C.id];
G=I.soldout;
if(G){y.trigger("marker-iw-inconsistent-non-group")
}}}})
}});
if(d||m){$("body").delegate("#marker_close","click",function(){y.closeIW()
})
}}function p(y){if(B.atlas.getVariant("ebcBUaUDGDGae")){var x=$.extend({},y);
x.b_marker_type=x.b_marker_type.replace(/\_current/g,"");
return x
}else{return y
}}return{init:n,setupIW:j,autoopenIW:h,getIWPosition:c,markerHover:b,markerOut:v,markerClick:o,boundsChange:r}
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("atlas-common-overlay",["jQuery","pubsub","util-env"],function(i,f,t,k){var r=".show_map",w="#close_map_lightbox, #close_map, #b_map_back_link",c="#b_map_tiles",v="#b_map_container",x="map_opened",h=new f(),z=B.env,q=(z.b_browser==="msie"&&z.b_browser_version<8),l=z.b_map_center_latitude||z.b_latitude,C=z.b_map_center_longitude||z.b_longitude,a=z.b_map_google_static_thumbnail_zoom_level||14,u=i(v),b=window.location,g=false;
function m(H){var E={},D=i("#"+H),G=D.data("bbox")||z.b_map_bbox,F=D.data("coords");
if(G){F=G.split(",");
E.boundingBox={sw:[F[1],F[0]],ne:[F[3],F[2]]}
}else{if(typeof F==="string"){F=F.split(",");
E={center:[F[1],F[0]],zoom:parseInt(D.data("zoom")||D.attr("rel")||a,10),boundingBox:null}
}else{if(t.get("defaultBoundingBox")){F=t.get("defaultBoundingBox").split(",");
E.boundingBox={sw:[F[0],F[1]],ne:[F[2],F[3]]}
}else{if(z.b_map_google_bounding_box){F=B.env.b_map_google_bounding_box.split(",");
E.boundingBox={sw:[F[1],F[0]],ne:[F[3],F[2]]}
}else{E={center:[l,C],zoom:parseInt(a,10),boundingBox:null}
}}}}return E
}function A(){var D={height:u.height()};
i(c).css(D)
}function n(){var I,H=new RegExp("(?:"+x+"-)(.+)","i"),F=H.exec(b.hash),E={center:[l,C],zoom:a},D=i(window).scrollTop(),G=50;
g=false;
if(F&&F.length===2){E=m(F[1]);
if(B.atlas.getVariant("eGTNVIdEaUDPNcQLCHT")){g=F[1].replace("show_id","")
}}else{if(z.b_map_bbox){I=z.b_map_bbox.split(",");
E.boundingBox={sw:[I[1],I[0]],ne:[I[3],I[2]]}
}}if(q){setTimeout(A,0)
}if(!B.atlas.assert.tdot&&B.env.b_action=="hotel"){u.addClass("b_map_container_fixed").css({top:B.atlas.getVariant("ebcBUeHdZBJJGOaT")?30:G,bottom:30})
}else{u.css({top:G+D,bottom:30-D})
}u.show();
h.trigger("open",E);
if(B.atlas.getVariant("ebcBUYWbMDcFGcVYaBEFHO")||B.atlas.getVariant("ebcOQPIFdOQEQLfHRYPdRT")){i("body").on("click",d)
}}function p(){u.hide();
if(B.atlas.getVariant("ebcBUYWbMDcFGcVYaBEFHO")||B.atlas.getVariant("ebcOQPIFdOQEQLfHRYPdRT")){i("body").off("click",d)
}h.trigger("close")
}function d(D){if(i(D.target).closest(u).length==0){if(t.get("action")=="hotel"){B.track.custom_goal("ebcBUYWbMDcFGcVYaBEFHO",1)
}else{if(t.get("action")=="searchresults"){B.track.custom_goal("ebcOQPIFdOQEQLfHRYPdRT",1)
}else{if(t.get("isLP")){B.track.custom_goal("ebcfESVGPLUQJFWOICDAFKe",1)
}}}o(false)
}}function o(D){b.hash=D||"map_closed";
if(typeof window.onhashchange===k){return(D)?n():p()
}}function y(D){var E=i(this).attr("id");
D.preventDefault();
D.stopPropagation();
if(B.atlas.assert.sr){B.track.goal("atlas_sr_open_click")
}else{if(B.atlas.assert.hp){B.track.goal("atlas_hp_open_click")
}else{if(B.atlas.assert.lp){B.track.goal("atlas_lp_open_click")
}}}o((E)?x+"-"+E:x);
t.centralPolygonCoords=i(this).data("centralPolygon")||""
}function j(){if(t.get("action")=="hotel"){B.track.custom_goal("ebcBUYWbMDcFGcVYaBEFHO",2)
}else{if(t.get("action")=="searchresults"){B.track.custom_goal("ebcOQPIFdOQEQLfHRYPdRT",2)
}else{if(t.get("isLP")){B.track.custom_goal("ebcfESVGPLUQJFWOICDAFKe",2)
}}}o(false)
}function s(){i(r).bind("click",y);
i(w).bind("click",j);
i(document).keyup(function(D){if(D.which===27){o()
}});
if(/[;?&]+map=1/gi.test(b.search)){if(B.atlas.assert.hp){B.track.goal("atlas_hp_open_auto")
}else{if(B.atlas.assert.sr){B.track.goal("atlas_sr_open_auto")
}else{if(B.atlas.assert.lp){B.track.goal("atlas_lp_open_auto")
}}}o(x)
}if(b.hash.indexOf(x)>-1){n()
}i(window).bind("hashchange",function(){return(b.hash.indexOf(x)>-1)?n():p()
});
if(q){i(window).bind("resize",A)
}}function e(){return g
}return{addEvents:s,changeHash:o,open:n,close:j,pubSub:h,getCurrentHotelId:e}
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("map-markers-disperse",["markers-disperser","util-array"],function(e,c){function d(f,i,h){var g=f.length,j;
if(!h||!i){return
}while(g--){j=f[g];
if(j&&h===j.b_id){if(!B.atlas.assert.tdot&&B.atlas.assert.hp&&!B.atlas.getVariant("ebcBUHSCQWXXTTWEYcZbMKSGHRIcUZC")){i.setMarkerOptions(j.b_id,{cursor:"default"})
}i.setMarkerType(j.b_id,(j.b_marker_type||j.b_type)+"_current");
break
}}}function b(g,k,j){var i=g.concat(k.getActiveMarkers()||[]),f=[],h;
if(j){h=c.findIndex(i,function(l){return l.b_id===j
});
if(h>0){f=i.splice(h,1)
}}return f.concat(i)
}function a(f,k,j,l){var h=b(f,k,j),g=[],i=l||{top:-10,left:-9,bottom:-12,right:-9},m;
m=new e({map:k,offset:i});
g=m.filter(h);
k.setMarkers(g);
d(g,k,j);
k.trigger("markers-dispersed",g)
}return{initialize:a}
})
});
$(function(){if(!B.atlas){return
}var a=["markers-shape","util-getset","util-object","util-array"];
if(B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO")){a.push("markers-disperser-filters")
}B.atlas.define("markers-disperser",a,function(f,d,h,c,b){var g={offset:{top:0,left:0,bottom:0,right:0}};
function i(j){var k={};
h.extend(k,g,j);
h.extend(this,d.call(this,k))
}function e(m,l){var j,k;
if(typeof B.env!=="undefined"&&typeof B.env.b_hotel_id!=="undefined"){if(m.b_id===B.env.b_hotel_id&&l.b_id!==B.env.b_hotel_id){return 1
}else{if(l.b_id===B.env.b_hotel_id&&m.b_id!==B.env.b_hotel_id){return -1
}else{if(m.b_id===B.env.b_hotel_id&&l.b_id===B.env.b_hotel_id){return 0
}}}}if(m.b_persistent&&!l.b_persistent){j=1
}else{if(!m.b_persistent&&l.b_persistent){j=-1
}else{j=0
}}if(m.b_marker_type!=="hotel_soldout"&&l.b_marker_type==="hotel_soldout"){k=1
}else{if(m.b_marker_type==="hotel_soldout"&&l.b_marker_type!=="hotel_soldout"){k=-1
}else{k=0
}}if(j>0||j<0){return j
}else{return k
}}i.prototype.filter=function(n,m){var j=this.get("map"),q=j.getViewFromMap(),o=this.get("offset"),r=[],l=[];
var k=false;
if(B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO")){var p=new b()
}c.each(n,function(w){var u=new f(w,q,j),x=true;
var v=false,s=false,t;
if(!r.length||w.b_persistent){r.push(w);
l.push(u)
}else{if(!m||r.length<=m){if(B.atlas.getVariant("ebcBUECAFWTYcUNSVGPQJJYJO")||B.atlas.getVariant("ebcOLHMbdIePQNZBaQDbAAPVT")||B.atlas.getVariant("ebcMMfEDXPdLbeMSSdPIFdELSVWe")||B.atlas.getVariant("ebcMbfWWJbVHMbdIePQNZBaQDbAAPVT")||B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO")){c.each(l,function(z,y){if(u.intersects(z,o)){if(e(w,r[y])>0&&!(B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO"))){t=y;
v=true;
k=true
}else{if((B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO"))&&p.check(w,r[y])===0){s=0
}else{if((B.atlas.getVariant("ebcBUNHTIYSaBNAHBBMC")||B.atlas.getVariant("ebcOQZRUAPBRNcbRYYEO"))&&p.check(w,r[y])>0){t=y;
v=true;
k=true
}else{s=true
}}}}});
if(v){r.splice(t,1,w);
l.splice(t,1,u)
}else{if(!s){r.push(w);
l.push(u)
}}}else{c.each(l,function(z,y){if(u.intersects(z,o)){x=false;
if(e(w,r[y])>0){k=true
}}});
if(x){r.push(w);
l.push(u)
}}}}});
if(k){j.trigger("process-soldout-hotel")
}return r
};
return i
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("markers-shape",["geometry.point","geo.latLng","util-object"],function(b,a,d){function c(f,e,i){var h=new a(f.b_latitude,f.b_longitude),j=e.latLngToPixel(h),g={ox:0,oy:0};
d.extend(g,i.getIcon(f.b_type));
this.tl=new b(j.x-(g.w/2)+g.ox,j.y-g.h+g.oy);
this.br=new b(this.tl.x+g.w,this.tl.y+g.h)
}c.prototype.intersects=function(f,j){var h=f.tl,i=f.br,e=this.tl,g=this.br;
return !(h.x>(g.x+j.right)||h.y>(g.y+j.bottom)||i.x<(e.x-j.left)||i.y<(e.y-j.top))
};
return c
})
});
$(function(){if(!B.atlas){return
}B.atlas.require(["static-atlas","util-env"],function(d,c){if(!c.get("tdot")&&c.get("action")!="city"&&!B.track.getVariant("ebcfESZdeFeIDHC")){return
}var b=new d({domNode:".static_map",modules:["atlas-static-map-icons"]});
function a(e){var f=[];
f=f.concat(e.b_hotels||[]);
b.render(f);
if(B.track.getVariant("BOefAJMMeGXSYSXGMUWe")){B.events.trigger("LP_STATIC_MAP:markers-rendered")
}}b.getMarkers(a)
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("atlas-static-map-icons",["jQuery","icons-default","atlas-common-icons","icons-zindex","util-env"],function(f,d,a,n,h){var l=f.extend({},d.ICONS,n.ICONS,a.ICONS),c={hotel:j({x:153,y:33,z:2000}),hotel_soldout:j({x:153,y:33,z:2000})},m={hotel:j({x:215,y:33,z:2000})},k="//r-ec.bstatic.com/static/img/map_measle_blue/782805d9703053a8d0a670846b8ac1628a14bc23.png",g={url:k,w:8,h:8,x:0,y:0,z:400};
function j(o){return f.extend({},g,o)
}f.extend(l,{hotel_soldout_current:j({z:1010}),hotel_soldout:j({}),hotel_current:j({z:1000}),hotel:j({}),geosearch_place:j({z:500})});
function i(o){return(o&&l.hasOwnProperty(o))?l[o]:l["default"]
}function b(o){return(o&&c.hasOwnProperty(o))?f.extend({},i(o),c[o]):i(o)
}function e(o){return(o&&m.hasOwnProperty(o))?f.extend({},i(o),m[o]):i(o)
}return{ICONS:l,HOVER_ICONS:c,getIcon:i,getHover:b,getVisited:e}
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("add-airport-to-high-zoom",["jQuery","markers-ajax","util-env","geo.projection","geo.latLng"],function(e,f,g,b,d){var i=e.extend({},f,{defaultGetMarkers:f.getMarkers,getMarkers:a});
function h(k){var j=k.Interface?k.Interface.getBoundingBox():k.get("bounds"),l="";
if(j&&j.SW){l=[j.SW[1],j.SW[0],j.NE[1],j.NE[0]].join(",")
}else{if(j&&j.toMOMString){l=j.toMOMString()
}}return l
}function a(n){var m=h(this),k=m.split(","),l=b.getDistance(new d(k[0],k[1]),new d(k[2],k[3]))/1000,j=n;
if(l>1000&&l<1500){this.trigger("markers-get-filter-distance");
j=c(n)
}this.defaultGetMarkers(j)
}function c(j){return function(){var k=Array.prototype.slice.call(arguments);
this.trigger("markers-show-filter-distance");
if(B.atlas.getVariant("ebcNAHBfQUaSHbZFcDaSYeGXT")==2){j.apply(null,k)
}}
}return i
})
});
$(function(){if(!B.atlas){return
}B.atlas.define("atlas-style",function(){return{setStyle:function(a){if(typeof this.Interface.setStyle==="function"){this.Interface.setStyle(a)
}}}
});
B.atlas.define("styler",function(){function a(b){this.map=b&&b.map;
this.theme=b&&b.theme
}a.prototype={init:function(){this.setRoadmapStyle();
this.bind(this.map)
},bind:function(){var b=this,c=this.map;
c.on("map-type-change",function(){var d=c.getMapType();
if(/satellite|hybrid/.test(d)){b.setSatelliteStyle()
}else{if(/terrain|roadmap/.test(d)){b.setRoadmapStyle()
}}})
},setRoadmapStyle:function(){if(this.theme&&this.theme.roadmap){this.map.setStyle(this.theme.roadmap)
}},setSatelliteStyle:function(){if(this.theme&&this.theme.satellite){this.map.setStyle(this.theme.satellite)
}}};
return a
});
B.atlas.define("styler-theme",["styles-cartography"],function(a){var b;
if(B.atlas.getVariant("ebcAZTDCMfKTUSGGO")==1){b={roadmap:[{featureType:"transit.station.airport",stylers:[{visibility:"off"}]}]}
}if(b&&b.roadmap){b.roadmap=b.roadmap.concat(a.STYLES)
}if(b&&b.satellite){b.satellite=b.satellite.concat(a.STYLES)
}return b
})
});
(function(b){if(b.run_lp_map_load){b.runExp("eGfEWMeEO").onLoad(a)
}else{$(a)
}function a(){if(!b||!b.atlas){return
}var c=$("#b_map_container");
if(!c.length){return
}b.atlas.require(["jQuery","atlas","atlas-common-markers","atlas-common-overlay","util-env"],function(j,n,h,p,q){var u,l,o,f=100,m=c.attr("data-latlng"),d=c.attr("data-zoom")||11,e=c.attr("data-bbox"),r=q.get("destinationId"),g=b.atlas.assert,i={domNode:c.find("#b_map_tiles"),scrollwheel:(!g.tdot)?true:false,panControl:false,mapTypePosition:b.atlas.getVariant("eGfEJbTcUDcCHJET")?"LEFT_BOTTOM":"TOP_RIGHT",zoomStyle:"SMALL",zoomPosition:"RIGHT_BOTTOM"},s=["markers","bounds","markers","markers-ajax","iw","iw-ajax","atlas-style"];
if(e){o=e.split(",");
i.boundingBox={sw:[o[1],o[0]],ne:[o[3],o[2]]}
}else{j.extend(i,{center:(m)?m.split(","):[0,0],zoom:parseInt(d,10)})
}s.push("styles-cartography");
if(b.atlas.getVariant("eGECAFRFEDEZRdcHe")){s.push("icons-zindex")
}else{s.push("atlas-common-icons")
}if(q.get("isCustomZoom")){s.push("zoom");
i.zoomControl=false
}if(b.atlas.getVariant("ebcNAHBfQUaSHbZFcDaSYeGXT")){s.push("add-airport-to-high-zoom")
}if(b.atlas.getVariant("fEJMSeCXeLfHHHYbNKe")){s.push("lp-show-landmarks")
}s.push("hover");
s.push("atlas-common-icons");
function t(v){u.resize();
if(v.boundingBox){u.setBoundingBox([v.boundingBox.sw,v.boundingBox.ne])
}else{u.setCenter(v.center);
u.setZoom(v.zoom)
}u.trigger("open")
}if(q.get("isLpStaticMap")){p.pubSub.on("open",function(v){if(!q.get("tdot")&&q.get("action")!="city"&&b.track.getVariant("ebcfESZdeFeIDHC")){b.track.custom_goal("ebcfESZdeFeIDHC",1)
}if(!u){k(j.extend(i,v))
}else{u.done(function(){t(j.extend(i,v))
})
}});
p.addEvents()
}if(!q.get("isLpStaticMap")){k()
}function k(){u=new n({modules:s,options:i});
u.done(function(){u.on("iw-open",function(){j("#b_map_container").find(".iw-overlay").loadComponents();
j("#b_map_container").find(".iw-control").loadComponents()
});
j("#b_map_container").delegate(".iw-overlay-city a, .iw-overlay-airport a","click",function(){u.trigger("nonproperty-iw-link-click")
});
function v(y,E,w){var I,G=35,D=56,z=5,H=27,F=u.$domNode,C={w:F.width(),h:F.height()},A={w:y.outerWidth(),h:y.outerHeight()};
D=(D>C.w-w.x-z)?z:D;
if((A.w+z+D>C.w)){A.w=C.w-z-D;
y.find(".iw-container").css({"max-width":A.w})
}I=w.x-z-A.w/2;
I=(I+A.w+z>C.w)?C.w-A.w-z-D:I;
return{x:(I-D<3)?3:I,y:(w.y+A.h>C.h-G)?w.y-A.h-H:w.y}
}if(q.get("isCustomZoom")){b.atlas.require(["zoom-control"],function(w){new w(u)
})
}if(q.get("isMiniIWLandingPages")){h.init(u)
}else{u.setLimit(50);
j("#fixed_map_container_wrapper").hide();
u.on("bounds-change",function(){u.getMarkers(function(y){var A,x=[].concat(y.b_hotels||[],y.b_cities||[],y.b_airports||[]),z=x.length,w=false;
u.updateMarkers(x);
if(r){while(z--){A=x[z];
if(((A.b_type==="city")||(A.b_marker_type==="city"))&&!w){w=true
}if(A&&r===A.b_id){u.setMarkerType(A.b_id,A.b_marker_type+"_current");
break
}}}if(w){u.trigger("ufi-marker-show")
}});
u.closeIW()
});
u.setIW({disablePan:true,className:"iw-overlay-lp",engine:"html",getPosition:v,isFixed:true});
u.on("marker-hover",function(w){if(l){clearTimeout(l)
}l=setTimeout(function(){u.openIWLoading(w.id);
u.setIconHover(w.id);
if(/city|airport/.test(w.type)){if(w.data&&w.data.b_id===r){u.setIW({className:"iw-overlay-lp iw-"+w.type+"_current"})
}u.openIW(w.id,w.data)
}else{u.getIW(w.id,function(x){x.b_map_nights=q.get("checkinCheckoutInterval");
x.map_price_per_x_nights_txt=q.get("transPricePerXNights");
u.openIW(w.id,x)
})
}},f)
});
u.on("marker-out",function(w){if(l){clearTimeout(l)
}u.setIconOut(w.id);
u.closeIW();
u.setIW({className:"iw-overlay-lp"})
});
u.on("marker-click",function(x){var w=u.getMarker(x.id),y=(w&&w.b_url)?w.b_url:"";
if(y){window.location.assign(y)
}})
}b.atlas.require(["styler","styler-theme"],function(w,y){if(typeof y!=="undefined"){var x=new w({map:u,theme:y});
x.init()
}})
});
if(b.atlas.getVariant("ebcEKVFbNBNKe")){u.on("map-type-change",function(){var v=u.getMapType();
if(v==="satellite"){b.track.custom_goal("ebcEKVFbNBNKe",1)
}else{if(v==="hybrid"){b.track.custom_goal("ebcEKVFbNBNKe",2)
}else{if(v==="terrain"){b.track.custom_goal("ebcEKVFbNBNKe",3)
}else{if(v==="roadmap"){b.track.custom_goal("ebcEKVFbNBNKe",4)
}}}}})
}}j("#b_map_container").delegate("[data-atlas-track-event]","click",function(w){var v=j(this).attr("data-atlas-track-event");
if(u){u.trigger(v)
}});
j("#b_map_container").delegate("[data-atlas-track-hover]","mouseover",function(w){var v=j(this).attr("data-atlas-track-hover");
if(u){u.trigger(v)
}})
})
}}(window.booking));
(function(d,c,a){var b={paging:function(e){var g={$tabButton:".rlp-main-section-tab__btn",$tabButtonActive:".rlp-main-section-tab__btn--active",tabButtonActiveClass:"rlp-main-section-tab__btn--active",$tabSectionContainer:".rlp-main-section-hotels--tab",tabSectionContainerActiveClass:"rlp-main-section-hotels--tab-active",callback:null};
var f=d.extend({},g,e);
return this.each(function(){var h=d(this);
d(f.$tabButton,this).bind("click",function(){var k=d(this);
var i=d(f.$tabButtonActive,h).index();
var j=k.index();
if(i!==j){d(f.$tabButtonActive,h).removeClass(f.tabButtonActiveClass);
k.addClass(f.tabButtonActiveClass);
d(f.$tabSectionContainer,h).eq(i).removeClass(f.tabSectionContainerActiveClass);
d(f.$tabSectionContainer,h).eq(j).addClass(f.tabSectionContainerActiveClass)
}if(typeof f.callback==="function"){f.callback.call(k)
}})
})
},flipover:function(e){var g={callback:null};
var f=d.extend({},g,e);
return this.each(function(){})
}};
d.fn.swapTab=function(f,e){if(b[f]){return b[f].apply(this,Array.prototype.slice.call(arguments,1))
}else{d.error("Tab Category "+f+" does not exist")
}}
})(jQuery,window,document);
(function(c,b,a){c.fn.textLabel=function(d){var f={$itemContainer:".dcbi_countries_item",$labelContainer:".dcbi_thumb"};
var e=c.extend({},f,d);
return this.each(function(){c(this).bind({mouseover:function(){c(this).addClass("active").find("*").addClass("active")
},mouseleave:function(){c(this).removeClass("active").find("*").removeClass("active")
}})
})
}
})(jQuery,window,document);
booking[sNSStartup].postcard_min_rates_ga={priority:9,init:function(){$(".mrr li a").click(function(){var a=$(this).attr("data-amount");
if(typeof(booking.google.clickTracker)!="undefined"){booking.google.trackEvent(booking.google.clickTracker,"postcard min_rates - "+a)
}})
}};
booking[sNSStartup].promotion_shortlist_interacts={init:function(){$("#home_featured_destinations").delegate("tr.dotter","click",function(c){var d=$(this).data("url");
if(c.target.nodeName!=="A"&&!$(this).hasClass("moreBoxFolded")&&!$(this).hasClass("moreBoxUnfolded")){var b="fEDJPTRYAaOMdbJOcIYNQDOJNET";
var a=B.track.getVariant(b);
if(a!==false){B.track.custom_goal(b,1)
}window.location.href=d
}}).delegate("tr.dotter","mouseenter",function(a){if(!$(this).hasClass("moreBoxFolded")&&!$(this).hasClass("moreBoxUnfolded")){$(this).addClass("promo_even_on")
}}).delegate("tr.dotter","mouseleave",function(a){if(!$(this).hasClass("moreBoxFolded")&&!$(this).hasClass("moreBoxUnfolded")){$(this).removeClass("promo_even_on")
}})
}};
booking[sNSStartup].region_attractions_in_lp=(function(){var g=0;
var h;
var f;
var i=500;
var b=8000;
var c;
var e=function(){c.eq(g).fadeOut(i);
if(g===h-1){g=0
}else{g++
}c.eq(g).fadeIn(i)
};
var a=function(){c.eq(g).fadeOut(i);
if(g===0){g=h-1
}else{g--
}c.eq(g).fadeIn(i)
};
var d=function(){c=$(".lp-region-highlights .lp-slider .item-container");
h=c.length;
c.eq(g).fadeIn(i);
f=setInterval(e,b);
$(".lp-region-highlights").hover(function(){clearInterval(f)
},function(){f=setInterval(e,b)
});
$(".lp-region-highlights .next").bind("click",e);
$(".lp-region-highlights .prev").bind("click",a)
};
var j=function(){if(!$(".lp-region-highlights").length){return
}$.ajax({url:"/region_attractions",data:{dest_type:B.env.b_action,dest_id:B.env.b_dest_id,lang:B.env.b_lang_for_url,stype:booking.env.b_site_type_id,aid:B.env.b_aid},success:function(o){if(o&&o.b_items&&o.b_items.length){var m="";
var l,n;
var k=o.b_items.length;
for(l=0;
l<k;
l+=1){n=o.b_items[l];
if(n.b_region_attraction_photo_max540){m+='<li class="item-container">';
m+='<a href="'+booking.env.b_url_start+n.b_sr_url+'">';
m+='<div class="item-photo" style="background-image: url('+B.tools.jsStaticUrl(n.b_region_attraction_photo_max540)+');">';
m+='<div class="item-description-container">';
m+='<h5 class="item-title">'+n.b_region_attraction_name+"</h5>";
m+='<p class="item-description">'+n.b_region_attraction_description+"</p>";
m+="</div></div></a></li>"
}}$(".lp-region-highlights .lp-slider").append(m);
$(".lp-region-highlights, .lp-region-highlights-title").show();
d()
}}})
};
return{init:j}
}());
if($(".reviews-landing-b-country").length>0){booking[sNSExperiments]["EKKdJEAFWUSeONJKDKaT"]={init:function(){$(".rlbc-banner").click(function(){B.track.stage("EKKdJEAFWUSeONJKDKaT",2)
})
}}
}(function(){$(".in-and-around").swapTab("paging",{$tabButton:".ia_tab_btn",$tabButtonActive:".ia_tab_btn.active",tabButtonActiveClass:"active",$tabSectionContainer:".ia_section",tabSectionContainerActiveClass:"active"});
$(".ph_review, .cr_review_content-container").textLabel()
})();
booking[sNSStartup].show_city_description=(function(){var a=function(){$("#b-city_description").click(function(){$(this).addClass("is_open")
})
};
return{init:a}
}());
/*! echo.js v1.6.0 | (c) 2014 @toddmotto | https://github.com/toddmotto/echo */
(function(a,b){if(typeof define==="function"&&define.amd){define(function(){return b(a)
})
}else{if(typeof exports==="object"){module.exports=b
}else{a.echo=b(a)
}}})(this,function(h){var b={};
var j=function(){};
var d,f,e,i,c;
var g=function(l,k){var m=l.getBoundingClientRect();
return(m.right>=k.l&&m.bottom>=k.t&&m.left<=k.r&&m.top<=k.b)
};
var a=function(){if(!i&&!!f){return
}clearTimeout(f);
f=setTimeout(function(){b.render();
f=null
},e)
};
b.init=function(o){o=o||{};
var m=o.offset||0;
var l=o.offsetVertical||m;
var n=o.offsetHorizontal||m;
var k=function(p,q){return parseInt(p||q,10)
};
d={t:k(o.offsetTop,l),b:k(o.offsetBottom,l),l:k(o.offsetLeft,n),r:k(o.offsetRight,n)};
e=k(o.throttle,250);
i=o.debounce!==false;
c=!!o.unload;
j=o.callback||j;
b.render();
if(document.addEventListener){h.addEventListener("scroll",a,false);
h.addEventListener("load",a,false)
}else{h.attachEvent("onscroll",a);
h.attachEvent("onload",a)
}};
b.render=function(){var l=$("img[data-echo]");
var o=l.length;
var p,n;
var k={l:0-d.l,t:0-d.t,b:(h.innerHeight||document.documentElement.clientHeight)+d.b,r:(h.innerWidth||document.documentElement.clientWidth)+d.r};
for(var m=0;
m<o;
m++){n=l[m];
if(g(n,k)){if(c){n.setAttribute("data-echo-placeholder",n.src)
}n.src=n.getAttribute("data-echo");
if(!c){n.removeAttribute("data-echo")
}j(n,"load")
}else{if(c&&!!(p=n.getAttribute("data-echo-placeholder"))){n.src=p;
n.removeAttribute("data-echo-placeholder");
j(n,"unload")
}}}if(!o){b.detach()
}};
b.detach=function(){if(document.removeEventListener){h.removeEventListener("scroll",a)
}else{h.detachEvent("onscroll",a)
}clearTimeout(f)
};
return b
});
booking[sNSExperiments]["fEWBebfEOVGHONAHRe"]={init:function(){$(".add_bookmark").click(function(a){a.preventDefault();
if(window.external){window.external.AddFavorite(location.href,document.title);
B.track.custom_goal("fEWBebfEOVGHONAHRe",1)
}})
}};
booking[sNSExperiments]["fEJdDBKJZZTbNQFKFbbcYOHT"]={init:function(){echo.init({offset:0,throttle:250,unload:false,callback:function(a,b){}})
}};
booking[sNSStartup].lp_sh_js_cleanup={init:function(){$("#search_history_items_list").delegate(".lp-dest-search-history","click",function(a){a.preventDefault();
var b=$(this).data("url");
if(a.ctrlKey||a.metaKey){window.open(b)
}else{window.location.href=b
}})
}};
booking[sNSStartup].lp_sh_new_tab={init:function(){$("#search_history_items_list").delegate(".b_new_tab_link","click",function(a){a.preventDefault();
var b=$(this).data("url");
window.open(b)
})
}};
booking[sNSStartup].popularCities={priority:9,loadpos:0,savecheck:0,init:function(){$("#region_popular_cities_rd li").click(function(){window.location=$(this).find("a:first").attr("href")
})
}};
booking[sNSExperiments].ajax_acc_types=(function(){var f,g,i,e,a={};
function c(k){g.text(k)
}function d(k){e.after(k);
i.remove();
i=f.find("table.promos")
}function b(k){e.find("li.selected").toggleClass("selected dynamic");
k.parent().toggleClass("selected dynamic")
}function h(l,m){if(a[l]){return
}a[l]={};
var n=/<h2 class="specials"[^>]*>[\s\S]+?<\/h2>/.exec(m),k=/(<table class="promos"[^>]*>[\s\S]+?<\/table>)/.exec(m);
if(n){a[l]["title"]=n[1]
}if(k){a[l]["body"]=k[1]
}else{alert("fail body")
}return a[l]
}function j(){f=$(".specialsblock");
g=f.find("h2.specials");
i=f.find("table.promos");
e=f.find("ul.postcard-nav");
f.delegate(".postcard-nav a","click",function(k){k.preventDefault();
var n=$(this),l=this.href,m=a[l];
if(n.parent().hasClass("selected")){return
}if(m){c(m.title);
b(n);
d(m.body);
return
}i.fadeTo(800,0.4);
$.ajax({async:true,cache:true,url:l,dataType:"text",success:function(q,o,r){var p=h(l,q);
c(p.title);
b(n);
d(p.body)
},error:function(){i.fadeTo(800,1)
}})
})
}return{init:j}
}());
B[sNSExperiments]["VOGTcZJFeDBRcFPLfZWZAEfEeNSBZLO"]=(function(c,a){function b(){a("input.b-booker-type__input").bind("change",function d(e){var f=a(this).val();
if(f){a("#frm").find(".b-booker-type__input").attr("checked",false).filter("[value="+f+"]").attr("checked",true)
}})
}return{init:b,initElse:a.noop,priority:9}
})(window.booking,window.jQuery);
booking[sNSExperiments]["MMZXZAQUUcBfMONC"]=(function(){var a=function(){if($("#in_and_around").length===0){booking.squeak("MMZXZAQUfUfWcZZYTRXO")
}if($("table.promos").length===0){booking.squeak("MMZXZAQUKHNdNUOHXC")
}};
return{init:a}
}());
booking.ensureNamespaceExists(sNSExperiments);
booking[sNSStartup].city_tips={priority:9,init:function(){var c=$("#city_tips"),a=$(".show_more",c),b=c.data("limit")-1;
count=$("blockquote",c).length;
$("blockquote:gt("+b+")",c).hide();
if(b>=count){a.hide()
}a.click(function(){$("blockquote:hidden",c).slideDown("fast");
a.hide()
})
}};
$("#no_dates_friendly_popup").click(function(){$("#searchbox_btn").submit();
$("#smartDealsTrigger").attr("checked",true)
});
(function(){var b=window.jQuery;
var e=window.booking;
var a="HMeCCECeEFbLJdUDZNQbHGAXFKMdYYHT";
function d(){e.require("leaving-users-lightbox").init({lightboxContentBlock:"#notification_lightbox",lightboxRootClass:"notification-lightbox-container"});
b("#notification_lightbox").find("[placeholder]").placeholder();
e.events.on("leaving-users-lightbox:show",c)
}function c(f){b(".js-uc-notification-close:visible").trigger("click");
b(".js-uc-cug-signup-menu-prompt").hide();
b(".user_center_popover, #inspire_filter_block").hide();
e.env.b_exclude_lang_firstname=1
}e.ensureNamespaceExists(sNSExperiments);
e[sNSExperiments][a]={priority:9,init:d}
})();
(function(){var b=window.jQuery;
var e=window.booking;
var a="HMeVLBQFAEaXCfAMO";
function d(){if(!e.user||(!e.user.showCurrencyPopOver&&!e.user.showLanguagePopOver)){return
}e.user.showSignUpLightbox=0;
b.cookie("uc_cug_signup_menu_prompt",1);
e.events.on("user_center_bar:init",this.triggerPopOver)
}function c(){if(e.user.showCurrencyPopOver){window.setTimeout(function(){b("#user_form").find("li.uc_currency").find(".popover_trigger").click()
},400)
}if(e.user.showLanguagePopOver){window.setTimeout(function(){b("#user_form").find("li.js-uc-language").find(".popover_trigger").click()
},400)
}}e.ensureNamespaceExists(sNSExperiments);
e[sNSExperiments][a]={priority:9,init:d,triggerPopOver:c}
})();
booking[sNSExperiments]["BUNVXNRbDdJTLYNcJC"]=function(e,f){var c=(window.location.hash.substr(1)==="b_hp_new_tab"),d=(document.referrer.indexOf("booking.com")>-1);
var a=function(){if(typeof window.history.replaceState==="function"){history.replaceState(null,null,window.location.href.split("#")[0])
}else{window.location.hash=""
}};
function b(){if(c){a();
if(d){f.track.exp("BUNVXNRbDdJTLYNcJC")
}}}return{init:b,initElse:b}
}(jQuery,booking);
booking.run("fFdHMdeUfACQVfRSXIHVeRe").onReady(function(){booking.track.onView("#tracking-for-fFdHMdeUfACQVfRSXIHVeRe").exp("fFdHMdeUfACQVfRSXIHVeRe")
});
booking[sNSExperiments]["YdVZMVQJJOMaMEAaWYecbOFaT"]=(function(){$(".japan_cm_banner_video_link").click(function(){B.track.custom_goal("YdVZMVQJJOMaMEAaWYecbOFaT",1);
booking[sNSStartup].lightbox.show("https://www.youtube.com/embed/so36g3PJ3yM",{customWrapperClassName:"japan-video",bCloseButton:true,iframe:true,iframeWidth:853,iframeHeight:480})
})
}());
B.run("YdVJPMFHSUTIbZKFdC").onReady(function(){booking.track.onView("#track_YdVJPMFHSUTIbZKFdC").exp("YdVJPMFHSUTIbZKFdC")
});
B.run("YdVSfPTXJJHMVGRCfSZYcFITC").onReady(function(){if(B.env.b_action=="index"){B.eventEmitter.bind(B.Search.Events.GROUP_CHANGED,function(b,a){if(a.children>0&&$(window).width()>850){B.track.stage("YdVSfPTXJJHMVGRCfSZYcFITC",1)
}})
}});
booking[sNSExperiments]["fEWKUEJSWCaEDSVafBLSRe"]=(function(d,f){var b=function(g){f.track.custom_goal("fEWKUEJSWCaEDSVafBLSRe",g)
};
var c=function(){d(".promos").find("a").bind("click",function(){b(2)
});
d(".lp_promotions_cards_list").delegate(".lp_promotion_cards_list_holder","click",function(g){if(g.delegateTarget){g.delegateTarget.className.indexOf("budget")>-1?b(4):b(3)
}b(2)
})
};
var a=function(){if(d("#lp_animated_accomodation_tabs_track").length){d(".consolidated-tabs").find("a").bind("click",function(){b(1)
});
c()
}};
var e=function(){var h=d(".lp_animated_accomodation_selector"),j=d(".lp_animated_accomodations_wrapper"),g=j.siblings(".lp_animated_accomodation_tabs_hotel_promotion_lists").find(".promotion_longlist"),i=j.siblings(".lp_animated_accomodation_tabs_hotel_promotion_lists").find(".lp_animated_accomodation_overlay");
c();
d(".lp_animated_accomodations_selectors").delegate("li.item","click",function(){var l=d(this),k=d(this).data("list");
if(l.hasClass("active")){return false
}l.addClass("active").siblings().removeClass("active");
i.fadeIn(function(){g.filter(".active").removeClass("active");
g.filter("."+k).addClass("active");
i.fadeOut();
d(window).resize()
});
b(1)
});
d(".lp_animated_accomodations_switch_list").delegate("li.item","mouseenter",function(){var k=d(this).data("left")+"%";
h.css({left:k});
if(d(this).hasClass("active")){h.removeClass("hover")
}else{h.addClass("hover");
d(this).siblings(".active").addClass("active-not-hover")
}}).delegate("li.item","mouseleave",function(){var k=d(this).parent().find(".active").data("left")+"%";
h.css({left:k}).removeClass("hover");
d(this).siblings(".active-not-hover").removeClass("active-not-hover")
}).delegate("li.item","mousedown",function(){if(!d(this).hasClass("active")){h.addClass("pressed")
}}).delegate("li.item","mouseup",function(){h.removeClass("pressed hover")
})
};
return{init:e,initElse:a}
})(jQuery,booking);
(function(f,l){var a,r=l.env,c,v,q,k=false,d={};
var p=function(w){a=w;
if(a){o(a)
}t();
d=h();
l.eventEmitter.bind("SEARCH:date_changed",s)
};
function t(){var x=false,w=f("#searchboxInc");
q=f(".lp_bold_date_picker_wrapper");
v=q.find(".lp_bold_date_picker_checkin");
c=q.find(".lp_bold_date_picker_checkout");
if(q.find(".lp_bold_date_picker_group_container").length){u(q,w)
}q.find(".lp_bold_date_picker_btn").click(function(){var z=m();
if(z.checkin&&z.checkin.type=="valid"&&z.checkout&&z.checkout.type=="valid"){if(z.checkout.dateObject_.getTime()-z.checkin.dateObject_.getTime()>1000*60*60*24*30){x=true;
f(".lp_bold_date_picker_error").fadeIn(300);
return
}}x&&f(".lp_bold_date_picker_error").hide();
f("#frm .b-button_primary").click()
});
q.find(".b-booker-type").click(function(A){var z=f(this).find("input")[0].className;
w.find("."+z).click()
});
var y=m();
if(y.checkin){j("checkin",y.checkin.date,y.checkin.month+1,y.checkin.year)
}if(y.checkout){j("checkout",y.checkout.date,y.checkout.month+1,y.checkout.year)
}}function s(C,w){var A=l.search.dates("checkin"),z=l.search.dates("checkout"),y=l.search.dates(w.type);
if(A){j("checkin",A.date,A.month+1,A.year)
}if(z){j("checkout",z.date,z.month+1,z.year)
}if(y.type==="month"){e("monthSelected",w.type,y)
}else{if(y.type==="valid"){e("dateSelected",w.type,y)
}}for(var x=0;
x<d.length;
x++){if(A&&z&&A.type==="valid"&&z.type==="valid"){d[x].trigger("rangeSelected",{type:w.type,startValue:A,endValue:z})
}}}function e(y,x,z){for(var w=0;
w<d.length;
w++){if(d[w].type()===x){d[w].trigger(y,{type:x,value:z})
}}}function h(){var w=l.calendar2.controller.getCalendars();
w.checkout=[];
w.checkin=[];
w.open=null;
for(var x=0;
x<w.length;
x++){if(w[x].$input.hasClass("lp_bold_date_picker_select")){if(w[x].options.type=="checkout"){w.checkout=w[x]
}else{w.checkin=w[x]
}}}return w
}function m(){return{checkin:l.search.dates("checkin"),checkout:l.search.dates("checkout")}
}function j(x,w,A,z){var y;
var C;
if(w){C=z+"-"+A+"-"+w;
C=booking.formatter.date(C,"date_with_year")
}if(x=="checkin"){y=v
}else{y=c
}if(w){y.removeClass("placeholder").find("span").text(C)
}else{y.addClass("placeholder").find("span").text(y.data("default"))
}return true
}function u(z,w){var y=z.find(".lp_bold_date_picker_lightbox"),x=y.parent();
z.find(".lp_bold_date_picker_group_container").click(function(E){var D=f(this).find(".main_guests_selector"),C=f(this).find(".lp_bold_date_picker_select");
if(!D.is(":visible")){E.stopPropagation();
D.show();
C.addClass("focus");
f.each(h(),function(){this.trigger("hide")
});
f(document).one("click",function(){D.hide();
C.removeClass("focus")
})
}}).find(".lp_bold_date_picker_group_lists li").click(function(){var C=f(this).data();
if(C.b_number_rooms==0){g(y,l.search.group().value);
x.show()
}else{l.search.group({adults:C.b_number_adults,children:C.b_number_children,childrenAges:[],rooms:C.b_number_rooms});
f(this).closest(".lp_bold_date_picker_group_container").find(".lp_bold_date_picker_select_text").html(f(this).text())
}});
x.click(function(C){if(f(C.target).hasClass("lp_bold_date_picker_dimmer")){x.hide()
}});
y.find(".lp_bold_date_picker_lightbox_secondary_cta, .lp_bold_date_picker_lightbox_close_button").click(function(){x.click()
}).end().find(".lp_bold_date_picker_lightbox_cta").click(function(){var C=b(y);
l.search.group(C);
n(C);
x.click()
});
l.components.require("legacy-emitter").bind("spin-button-change",function(C){if(C.data.id=="lp_bold_date_picker_children_selector"){i(C,true)
}});
var A=l.search.group().value;
n(A);
if(A.children){z.find(".lp_bold_date_picker_lightbox_ages").each(function(C){if(typeof A.childrenAges[C]!=="undefined"){f(this).find("input").val(A.childrenAges[C])
}})
}}function n(x){var w=l.jstmpl("lp_bold_date_picker_group_message").render(x);
q.find(".lp_bold_date_picker_group_container").find(".lp_bold_date_picker_select_text").html(w)
}function g(w,x){w.find(".room_guests_selector input").val(x.rooms);
w.find(".adults_guests_selector input").val(x.adults);
w.find(".children_guests_selector input").val(x.children);
i({data:{value:x.children}})
}function i(z,y){var w={show:y?"slideDown":"show",hide:y?"slideUp":"hide"};
if(!z.data.value){q.find(".lp_bold_date_picker_lightbox_ages")[w.hide]().find(".age_guests_selector")[w.hide]()
}else{var x=q.find(".lp_bold_date_picker_lightbox_ages");
if(z.data.value==1){x.find(".singular").show().siblings(".plural").hide()
}else{x.find(".plural").show().siblings(".singular").hide()
}x.slideDown().find(".age_guests_selector:lt("+z.data.value+")").filter(":not(:visible)").val("0").end()[w.show]().end().find(".age_guests_selector:gt("+(z.data.value-1)+")")[w.hide]()
}}function b(w){return{rooms:w.find(".room_guests_selector input").val(),adults:w.find(".adults_guests_selector input").val(),children:w.find(".children_guests_selector input").val(),childrenAges:w.find(".age_guests_selector:visible input").map(function(){return parseInt(f(this).val())
}).toArray()}
}var o=function(x){var w=null;
if(booking.env.lp_bold_date_picker_track_exp!=x){return
}l.eventEmitter.bind("CALENDAR:opened",function(A,y){try{var z=y.instance.options.calendar2Type||y.instance.options.type||"checkin";
w=z;
l.track.goal(z+"_cal_opened");
f(document).click()
}catch(A){}});
l.eventEmitter.bind(l.Search.Events.DATE_CHANGED,function(){if(w){l.track.goal(w+"_date_selected")
}else{l.track.goal("checkin_date_selected");
l.track.goal("checkout_date_selected")
}})
};
booking[sNSStartup]["fESCFGHJPeZBNSGNGSEfWe"]={init:function(){k=true;
p()
}}
})(jQuery,booking);
(function(f,a){var e="fEJRUYPNCMVSHT",d="/deals/continent_value_deals?continent=EU&lang={LANG}&checkin={CHECKIN}&checkout={CHECKOUT}&currency={CURRENCY}&label=&limit={LIMIT}&offset=&ufi={UFI_ID}&sort_index=3",b=4;
var j=function(){if(a.env.lp_cp_deals_no_dates_running){var l=c();
if(!l){return g([])
}var k=h(f.extend({},l,{lang:a.env.b_lang_for_url,currency:a.env.b_selected_currency,limit:b,ufi_id:a.env.b_ufi}));
f.getJSON(k,g)
}};
function g(n){var k=f(".lp_promotions_cards_list_skeleton");
var o=k.closest(".lp_horizontal_promotions_wrapper");
o.removeClass("lp_cp_deals_no_dates_skeleton_loading_is_on");
if(n&&n.length&&n[0].b_ufis&&n[0].b_ufis.length&&n[0].b_ufis[0].b_count_deals){var m=i(n[0].b_ufis[0]);
var l=b-f(m).filter(".lp_promotion_cards_list_child").length;
if(l<b){k.html(m);
o.addClass("lp_cp_deals_no_dates_alternative_title_wrapper")
}if(l){k.next("ul").find("li.lp_promotion_cards_list_child:lt("+l+")").removeClass("clear_line").addClass("lp_promotions_from_deals_service regular_promotion").appendTo(k)
}f(window).resize()
}else{k.remove();
f(".lp_promotions_cards_list").removeClass("lp_cp_deals_hidden");
f(window).resize()
}}function i(k){var m="",r,q,p,o={b_promotions_from_deals_service:1,b_is_quality_deal_no_dates:0,b_dates_interval:"1",b_has_valid_dates_not_in_past:1,b_aid_is_100600:a.env.b_aid=="100600",b_is_landing_page:1,b_query_params_with_lang:a.env.b_query_params_with_lang,b_action:a.env.b_action,b_selected_currency:a.env.b_selected_currency,book_now_button_lp:a.env.book_now_button_lp,b_city_name:k.city_name};
for(var l=0;
l<k.b_highlighted_hotels.length;
l++){r=k.b_highlighted_hotels[l],q=r.b_secret_and_smart_deals_for_hotel[0],p={};
try{p={b_deals_sr_url:k.b_sr_url+"highlighted_hotels="+r.b_hotel_id,b_deal_link_sr:k.b_sr_url+"highlighted_hotels="+r.b_hotel_id,b_sr_url:k.b_sr_url+"&highlighted_hotels="+r.b_hotel_id,b_discount_formatted:q.b_discount,b_rack_rate_formatted:q.b_rack_rate_formatted,b_price_formatted:q.b_price_formatted,b_display_price:q.b_price,b_price_selected_currency:q.b_price,b_price:q.b_price,b_from_price_url:q.b_price,b_price_without_symbol:q.b_price,b_common_class_is_estimated:r.b_class_is_estimated,b_class_is_estimated:r.b_class_is_estimated,b_rating:r.b_stars,b_total_rooms_available:r.b_bookable_room_count,b_deals_hp_url:r.b_deal_url,b_url:r.b_deal_url,b_image_url_270x200:r.b_deal_photo,b_hotel_name:r.b_hotel_name,b_title:r.b_hotel_name,b_common_cc1:r.b_hotel_cc1,b_countrycode:r.b_hotel_cc1,b_preferred:r.b_preferred_hotels,b_enable_preferred_property_copy:r.b_preferred_hotels,b_is_quality_deal:q.b_secret_deal,b_hotel_has_genius_rate:q.b_genius_deal,b_review_score_detailed:r.b_review_score,review_score_word:r.b_review_score_word}
}catch(n){}if(p){m+=a.jstmpl("lp_promotion_card_client").render(f.extend(p,o))
}}return m
}function h(m){var k=d;
for(var l in m){k=k.replace("{"+l.toUpperCase()+"}",m[l])
}return k
}function c(o){o=o||a.env.b_this_year4+"-"+("0"+(a.env.b_this_month)).slice(-2)+"-"+("0"+a.env.b_this_day).slice(-2);
var l=new Date(o),n=new Date(o),m,k=l.getDay(),p=6-k;
if(p<1){p+=7
}n.setDate(l.getDate()+p);
m=new Date(n);
m.setDate(n.getDate()+1);
if(isNaN(n.getDate())||isNaN(m.getDate())){return null
}else{return{checkin:n.getFullYear()+"-"+("0"+(n.getMonth()+1)).slice(-2)+"-"+("0"+n.getDate()).slice(-2),checkout:m.getFullYear()+"-"+("0"+(m.getMonth()+1)).slice(-2)+"-"+("0"+m.getDate()).slice(-2)}
}}a[sNSExperiments][e]={init:j}
})(jQuery,booking);
(function(){var a=$("#lp-upcoming-date-suggestions-block .close_button");
if(!a.length){return
}function b(){a.click(function(c){c.preventDefault();
$("#lp-upcoming-date-suggestions-block").fadeOut("fast");
track()
})
}$(function(){b()
})
})();
(function(c,d){var b=false;
var a=function(n){var l=c("#top-destinations-block"),f=l.find("#lp_endorsements_popular_destinations_tooltip"),h=".endorsement",k="",e;
if(!l.length||!f.length||b){return
}c("body").append(f);
l.delegate(h,"mouseover",j).delegate(h,"mouseleave",i).delegate(h,"mousemove",g);
b=true;
function j(s){var p=c(this).closest(".b-popular_item");
hasEndorsements=p.find(".lp_endorsements_popular_destinations").length;
if(!hasEndorsements){return
}var q=c(s.target).is("a")&&c(s.target).closest(".b_popular_acc_types").length,t=f.is(":visible"),o=p.find("a:first").attr("href");
if((!t||o!=k||e)&&!q){k=o;
f.find(".lp_endorsements_popular_destinations_tooltip_content").html(m(p)).end().stop(true,true);
f.css({display:"block",visibility:"hidden",width:"auto"}).find(".dsf_social_proof").hide();
var r=f.find("ul").outerWidth();
f.css({display:"none",visibility:"visible"});
f.width(r+35).fadeIn(function(){f.trigger("focus")
}).find(".dsf_social_proof").show()
}else{if(t&&q&&!e){i()
}}}function i(o){e=true;
f.stop(true,true).fadeOut(function(){e=false
})
}function g(s){if(!f.is(":visible")){return
}var o=c(window).height()+c(window).scrollTop(),t=f.outerHeight(),p,q,r;
if(d.env.rtl){q=f.outerWidth();
r=s.pageX-35-q
}else{r=s.pageX+35
}if(s.pageY+40+t>o){p=(o-t-20)+"px"
}else{p=s.pageY+20
}f.css({left:r,top:p})
}function m(o){return o.find(".lp_endorsement_tooltip_list").clone()
}};
booking[sNSStartup]["fESaRQNcLTQFCSDWQecDKORe"]={init:a}
})(jQuery,booking);
(function(a,d){var b="fESGQZfeGHeTLO";
function c(){a(".lp_full_width_map_dimmer").click(function(f){f.stopPropagation();
a(this).parent().find(".static_map_banner_link_text").click()
})
}d[sNSExperiments][b]={init:c}
})(jQuery,booking);
(function(c,h){var e="fEDCKZaOdPDcVYDEZRae",d="/ufi_weekend_deals?lang={LANG}&currency={CURRENCY}&aid={AID}&ufis={UFIS}",g=4;
var f=function(){if(h.env.lp_getaway_deals_on_index_running){var j={lang:h.env.b_lang_for_url,currency:h.env.b_selected_currency,aid:h.env.b_aid,ufis:typeof h.env.lp_getaway_deals_on_index_ufis==="string"?h.env.lp_getaway_deals_on_index_ufis.replace("[","").replace("]",""):""};
if(!j.ufis){h.track.custom_goal(e,3)
}var i=a(j);
c.getJSON(i,b)
}};
function b(k){var j=c(".lp_getaway_deals_on_index_list"),m="",l,n=k?k.deals||[]:[];
if(k&&k.fallback&&k.fallback.try_promoted_ufis){h.track.custom_goal(e,4)
}if(n.length){m+=h.jstmpl("lp_getaway_deals_on_index_client_side").render({lp_getaway_deals_on_index_data:n,b_lang_is_rtl:h.env.rtl});
j.html(m).parent().addClass("lp_deals_available")
}else{j.closest(".lp_getaway_deals_on_index_wrapper").remove();
h.track.custom_goal(e,2)
}}function a(l){var j=d;
for(var k in l){j=j.replace("{"+k.toUpperCase()+"}",l[k])
}return j
}h[sNSExperiments][e]={init:f}
})(jQuery,booking);
(function(f,d){var e="fEFcRbPIKORAQZbECEFSeKe",k=4,g=0,b=0,m=1,i,o=false,j,l="lp_horizontal_promotions_active";
function h(s,q,p){var t,v={},r=d.env.rtl?"margin-right":"margin-left",u=o?"css":"animate";
m=q?m+s:parseInt(s,10);
if(m<1){m=b
}else{if(m>b){m=1
}}t=(m-1)*(-100);
if(g<m*k){t+=(100/k)*(m*k-g)
}v[r]=t+"%";
i[u](v);
if(!p){p=j.find(".lp_horizontal_promotions_count_"+m)
}p.addClass(l).siblings().removeClass(l)
}function a(){var q=document.body||document.documentElement,u=q.style,w="transition";
if(typeof u[w]=="string"){return true
}var r=["Moz","webkit","Webkit","Khtml","O","ms"];
w=w.charAt(0).toUpperCase()+w.substr(1);
for(var t=0;
t<r.length;
t++){if(typeof u[r[t]+w]=="string"){return true
}}return false
}function n(){var p=f(".lp_horizontal_promotions_wrapper");
j=p.find(".lp_horizontal_promotions_pagination");
i=p.find(".lp_promotions_cards_list");
g=p.find(".lp_promotion_cards_list_child:visible").length;
b=Math.ceil(g/k);
o=a();
f(".lp_horizontal_promotions_wrapper").delegate(".lp_horizontal_promotions_button","click",function(q){var r=f(this).hasClass("next")?1:-1;
h(r,true);
if(!f(this).hasClass("lp_horizontal_promotions_count")){d.track.custom_goal(e,4)
}}).delegate(".lp_horizontal_promotions_count","click",function(q){d.track.custom_goal(e,3)
}).delegate(".lp_horizontal_promotions_count.number","click",function(s){var q=f(this).attr("class"),r=q.match(/lp_horizontal_promotions_count_(\d)/);
if(!f(this).hasClass("active")&&r){h(r[1],false,f(this))
}});
if(d.track.getVariant(e)==2){f(window).resize(function(){var q,r;
if(!document.addEventListener){r=f(window).width()>1230?"removeClass":"addClass";
p[r]("narrow_screen")
}r=f(window).width()>967?"removeClass":"addClass";
p[r]("three_in_a_row");
q=r=="addClass"?3:4;
if(q!=k){k=q;
b=g/k;
h(0,true)
}}).resize()
}c()
}function c(){if(booking.env.lp_horizontal_promotions_track){f(".lp_promotion_cards_list_child").click(function(q){var p=1;
if(q&&q.target&&f(q.target).closest("h4").length){p=2
}d.track.custom_goal(e,p)
})
}}d[sNSExperiments][e]={init:n,initElse:c}
})(jQuery,booking);
booking[sNSExperiments]["fEFNBOHSFVJWcSBXe"]={init:function(){var a="fEFNBOHSFVJWcSBXe";
if(B.track.getVariant(a)===false){return
}B.track.onView("#in_and_around").exp(a)
},initElse:function(){this.init()
}};
(function(b,e){var c="fEFHMPdTUFQZHT";
function a(g){g=b(g);
var i=2;
var k=[];
var f=0.74074*g.find(".lp_promotion_cards_list_child_imagewrapper:first").width();
g.find(".lp_promotion_cards_list_child_imagewrapper").height(f);
g.find(".lp_promotion_cards_list_child .lp_promotion_cards_list_holder").height("auto");
if(!g.closest(".lp_horizontal_promotions_wrapper").length){g.find(".lp_promotion_cards_list_child").each(function(m,o){if(m%i===0){k=[o]
}else{k.push(o)
}if((m+1)%i===0){var l=b(k);
var n=Math.max.apply(Math,l.map(function(p,q){return b(q).height()
}).toArray());
l.find("> .lp_promotion_cards_list_holder").each(function(q,p){var r=parseInt(b(p).css("paddingBottom"),10);
b(p).height(n-r)
})
}})
}else{var j=g.find(".lp_promotion_cards_list_holder").css("height","auto");
var h=Math.max.apply(Math,j.map(function(l,m){return b(m).height()
}).toArray());
j.height(h-5)
}}function d(){var f=this.name;
b(".lp_promotions_cards_list").delegate(".lp_promotion_cards_list_child_tooltipbtn","mouseenter mouseleave",function(l){l.preventDefault();
l.stopPropagation();
var k=b(this);
var h=k.data("rel");
var j=b(h).html();
if(l.type==="mouseenter"){var m=k.dropdown({content:j,arrowSize:16,extraClass:"fly-dropdown--card-tooltip fly-dropdown--type-"+h.substr(1,3),position:"top center"}).dropdown("instance");
var i=k.closest(".lp_promotion_cards_list_holder");
m._createArrow=function(){var n=this.root();
return b('<i class="fly-dropdown__arrow"><i>').appendTo(n)
};
m._position=function(){var p=this._rect(this.root());
var v=this._rect(i);
var o=this._rect(k);
var n=this.options.arrowSize;
var u=b(window);
var t=u.scrollLeft()+v.left+v.width*0.5-p.width*0.5;
var s=u.scrollTop()+o.top-p.height-n;
var q=this._createArrow();
q.css({left:o.left+o.width/2-t});
return{top:s,left:t}
};
m.show()
}else{k.dropdown("destroy")
}}).delegate(".lp_promotion_cards_list_holder","click",function(j){var h,i;
if(j&&j.target){if(!b(j.target).closest("h4").length||!b(j.target).is("a")){i="sr-url";
h=b(this).closest("li").data(i)
}if(h){j.preventDefault();
j.stopImmediatePropagation();
window.open(h,"_blank");
return false
}}return true
}).each(function(h,j){a(j)
});
var g=true;
b(window).resize(function(){if(g){g=false;
setTimeout(function(){g=true
},500);
a(b(".lp_promotions_cards_list:visible"))
}})
}e[sNSStartup][c]={init:d}
})(jQuery,booking);
(function(){var a="YdVDEZRENFPBOHNfUEKdSIYO";
booking[sNSExperiments][a]=(function(h,g){var e=g("#usp_app"),d=0,f=400,c=false;
function b(){var k=e.offset(),j=g(window).scrollTop(),i;
if(c||!k){return
}i=k.top-j;
if(i>d&&i<=f){e.find(".lp-index-usp-iconfont__icon").addClass("louder_gta");
h.track.custom_goal(a,1);
g(window).unbind("scroll",b);
c=true
}}return{init:function(){b();
g(window).bind("scroll",b)
}}
})(booking,jQuery)
})();
(function(c,g){var b,a;
var f={};
f.sendEmail=function(h){g.lightbox.show("#lp-sh-email-confirmation",{bAnimation:400});
var i=c("#lp-sh-email-form");
var k=true;
i.bind("submit",function(l){l.preventDefault();
setTimeout(function(){if(k){j()
}})
});
if(!h.hasEmail){i.find("input[name=email]",function(l){});
i.bind("submit",function(l){})
}function j(){c.ajax({url:i[0].action,type:"post",data:i.serialize(),success:function(){}})
}};
function e(h){if(h.action in f){f[h.action].call(this,h)
}}function d(){b=this.name;
a=g.track.getVariant(b);
c(".lp-sh-manage").delegate(".lp-sh-action","click",function(h){e.call(this,c(this).data());
h.preventDefault()
}).find(".lp-sh-action").click()
}c.each(["fEFFfDbVJRbYWVC"],function(h,j){g[sNSExperiments][j]={init:d}
})
})(jQuery,booking);
booking[sNSExperiments]["fEJNOVVPUMIfMPSXWe"]=(function(){var f=$("#viewport-scroller"),e=$("#viewport-wrapper"),b=$("#viewport-sticky-bottom"),c,a=$(window);
function d(){var l=a.height(),k;
c=b.outerHeight();
k=l-e.offset().top-c;
e.css("min-height",k)
}function g(){var k=e.offset(),m,l;
c=b.outerHeight();
f.click(function(n){m=$("#bodyconstraint").offset();
l=m.top-30;
$("html, body").animate({scrollTop:l},1000);
B.track.custom_goal("fEJNOVVPUMIfMPSXWe",1);
n.preventDefault()
})
}function h(){var k=$(".lp-search-history-bar");
B.tools.dom.watchIfBlockVisibleInViewport(k,i,false,false);
k.delegate(".lp-search-history-list-item","click",function(l){var m=0;
if($(this).hasClass("item-position-1-of-3")){m=3
}else{if($(this).hasClass("item-position-2-of-3")){m=4
}else{if($(this).hasClass("item-position-3-of-3")){m=5
}}}B.track.custom_goal("fEJNOVVPUMIfMPSXWe",m)
})
}function i(){B.track.custom_goal("fEJNOVVPUMIfMPSXWe",2)
}function j(){h()
}return{init:j}
}());
booking[sNSExperiments]["fEJMWLIZSVafBNfOEDRHe"]={init:function(){$(".sb_accomodation_type select[name=nflt]").change(function(){booking.google.trackEvent(booking.google.clickTracker,"Accommodation dropdown",$(this).val())
})
}};
(function(c){var b="IZEZeYJKPVYeRfMNQcZROCHO";
function a(){if(c.env.b_action==="index"){c.track.onView("#b_"+b).exp(b)
}}c[sNSExperiments][b]={priority:9,init:a,initElse:a}
})(booking);
booking[sNSExperiments].preferred_filters={priority:9,init:function(){$(".facility_item").click(function(e){e.preventDefault();
var d=$(this),a,i=$("#frm .b-form__footer .b-form-group__content"),g=d.data("type"),b=d.data("id"),h=g+"="+b,j="<a href='#' class='removeThisFacility use_sprites icon_remove'>&nbsp;</a>",f="<input type='hidden' id='filteredFacility' name='nflt' value='"+h+"'>",c="<div class='facility_preference'><h4>"+booking.env.tag_filter_by+"</h4><span class='facility_item facility_selected'>"+d.html()+j+"</span>"+f+"</div>";
if(!d.hasClass("facility_selected")){a=true
}$(".facility_selected").toggleClass("facility_selected");
$(".facility_preference").remove();
if(a){d.toggleClass("facility_selected");
i.append(c)
}if($("body").scrollTop()>=250){$("body").scrollTop(0)
}$("#searchboxInc form").animate({opacity:0.4},200).animate({opacity:1},200)
});
$(".facility_item .removeThisFacility").live("click",function(){$(".facility_preference").remove();
$(".filters_list a").removeClass("facility_selected");
return false
})
}};
booking[sNSExperiments]["fOFVfEQIJceNVYEEJHO"]={init:function(){booking.track.onView("#tracking-target-fOFVfEQIJceNVYEEJHO").exp("fOFVfEQIJceNVYEEJHO")
},initElse:function(){this.init()
}};
booking[sNSStartup].sb_destination_validation=(function(e,g){var a=e("#frm"),b=e("#destination"),d=e("#b_searchbox_errors"),c=a.find(".has-destination-validation-error-exp_promise");
function f(){if(b.length==0){return
}a.bind("submit.sb_destination_validation",function(){if(g.env.b_action!=="region"&&(e.trim(b.val())==""||b.val()==b.attr("title"))){d.show();
g.eventEmitter.trigger(g.Search.Events.DESTINATION_INVALID,"destination_is_not_empty");
if(c&&c[0]&&c[0].className){c[0].className=c[0].className.replace(/_promise/,"")
}return false
}})
}return{init:f,initElse:f,priority:10}
}($,booking));
if(B.env.b_action==="city"&&$(".city_reviews-wrp").length>0){booking[sNSStartup]["seo_city_reviews"]={init:function(){var a=null;
$(".city_reviews-content_wrp").mouseenter(function(){var b=$(this);
b.removeClass("baccol-greyfa").addClass("baccol-grey32a08");
if(B.env.b_lang.search(/zh|ja|ko/i)!==-1){b.find(".city_reviews-content").removeClass("hei-40 col-grey73").addClass("minhei-40 col-greyfd")
}else{b.find(".city_reviews-content").removeClass("hei-36 col-grey73").addClass("minhei-36 col-greyfd")
}a=setTimeout(function(){B.track.custom_goal("IZVEdLTRe",1)
},1000)
});
$(".city_reviews-content_wrp").mouseleave(function(){clearTimeout(a);
var b=$(this);
b.removeClass("baccol-grey32a08").addClass("baccol-greyfa");
if(B.env.b_lang.search(/zh|ja|ko/i)!==-1){b.find(".city_reviews-content").removeClass("minhei-40 col-greyfd").addClass("hei-40 col-grey73")
}else{b.find(".city_reviews-content").removeClass("minhei-36 col-greyfd").addClass("hei-36 col-grey73")
}});
$(".city_reviews-wrp").delegate("a","click",function(){B.track.custom_goal("IZVEdLTRe",2)
})
}}
}booking[sNSExperiments]["IZVBGJFHMPaIaT"]={init:function(){B.track.custom_goal("IZVBGJFHMPaIaT",1)
},initElse:function(){this.init()
}};
booking[sNSExperiments]["IZVYYDWcaNYKSccae"]={init:function(){if($(".in_and_around-wrp").length>0){$(".in_and_around-wrp").delegate(".in_and_around-tab-btn","click",function(){var b=$(this);
$(".in_and_around-tab-btn-active").removeClass("in_and_around-tab-btn-active baccol-lblue4 col-white cur-def").addClass("in_and_around-tab-btn col-grey73 hov-col-lblue4 cur-poi");
b.removeClass("in_and_around-tab-btn col-grey73 hov-col-lblue4 cur-poi").addClass("in_and_around-tab-btn-active baccol-lblue4 col-white cur-def");
var a=b.parent().next().find(".in_and_around-tab-content_wrp").eq(b.index());
a.removeClass("dis-non").siblings().addClass("dis-non");
B.track.custom_goal("IZVYYDWcaNYKSccae",1)
});
$(".in_and_around-wrp").delegate(".in_and_around-tab-btn-active","click",function(){B.track.custom_goal("IZVYYDWcaNYKSccae",2)
});
$(".in_and_around-wrp").delegate("a","click",function(){B.track.custom_goal("IZVYYDWcaNYKSccae",3)
})
}},initElse:function(){if($("#in_and_around").length>0){$("#in_and_around").delegate(".in_and_around_tabs","click",function(){var a=$(this);
if(a.hasClass("selected")){B.track.custom_goal("IZVYYDWcaNYKSccae",2)
}else{B.track.custom_goal("IZVYYDWcaNYKSccae",1)
}});
$("#in_and_around").delegate("a","click",function(){B.track.custom_goal("IZVYYDWcaNYKSccae",3)
})
}}};
booking[sNSExperiments]["IZVcBUQAdRdJRVRe"]={init:function(){B.track.custom_goal("IZVcBUQAdRdJRVRe",1)
},initElse:function(){this.init()
}};
booking[sNSExperiments]["IZAYWAFKFGXJC"]={init:function(){B.track.custom_goal("IZAYWAFKFGXJC",1)
},initElse:function(){this.init()
}};
(function(c,h){var e="fEDCKZaOdPDcVYDEZRae",d="/ufi_weekend_deals?lang={LANG}&currency={CURRENCY}&aid={AID}&ufis={UFIS}",g=4;
var f=function(){if(h.env.lp_getaway_deals_on_index_running){var j={lang:h.env.b_lang_for_url,currency:h.env.b_selected_currency,aid:h.env.b_aid,ufis:typeof h.env.lp_getaway_deals_on_index_ufis==="string"?h.env.lp_getaway_deals_on_index_ufis.replace("[","").replace("]",""):""};
if(!j.ufis){h.track.custom_goal(e,3)
}var i=a(j);
c.getJSON(i,b)
}};
function b(k){var j=c(".lp_getaway_deals_on_index_list"),m="",l,n=k?k.deals||[]:[];
if(k&&k.fallback&&k.fallback.try_promoted_ufis){h.track.custom_goal(e,4)
}if(n.length){m+=h.jstmpl("lp_getaway_deals_on_index_client_side").render({lp_getaway_deals_on_index_data:n,b_lang_is_rtl:h.env.rtl});
j.html(m).parent().addClass("lp_deals_available")
}else{j.closest(".lp_getaway_deals_on_index_wrapper").remove();
h.track.custom_goal(e,2)
}}function a(l){var j=d;
for(var k in l){j=j.replace("{"+k.toUpperCase()+"}",l[k])
}return j
}h[sNSExperiments][e]={init:f}
})(jQuery,booking);
(function(b,e){var c="fEJRUYBPbIbOedZFNbYCVIORe";
function d(g){if(e.env.lp_cp_bold_date_picker_num_nights){var f=e.search.dates();
if(f.checkin&&f.checkin.type!="invalid"&&f.checkout&&f.checkout.type!="invalid"){a(g)
}else{e.eventEmitter.one("SEARCH:date_changed",b.proxy(a,this,g))
}}}function a(f){if(!f){b(".lp_bold_date_picker_feedback_travel_intent_container .b-form-number-of-nights").addClass("visible")
}e.track.stage(c,1)
}e[sNSExperiments][c]={init:d,initElse:function(){d(true)
}}
})(jQuery,booking);
(function(a,d){var b="fEWDVLBQeFGCQATUIZKe";
function c(){if(d.env.lp_no_header_for_cpc_landers_should_run){a(".uc-option--account").click(function(){d.track.custom_goal(b,2)
})
}}d[sNSExperiments][b]={init:c,initElse:c}
})(window.jQuery,window.booking);
(function(aG){var ay,aq,ap,aD,aj,aA,ai,ax,am,al,au=0,aE={},aw=[],av=0,aF={},az=[],ag=null,ao=new Image,ae=/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i,k=/[^\.]\.(swf)\s*$/i,ad,ac=1,an=0,ar="",at,aB,aC=false,ak=aG.extend(aG("<div/>")[0],{prop:0}),ab=aG.browser.msie&&aG.browser.version<7&&!window.XMLHttpRequest,aa=function(){aq.hide();
ao.onerror=ao.onload=null;
ag&&ag.abort();
ay.empty()
},R=function(){if(false===aE.onError(aw,au,aE)){aq.hide();
aC=false
}else{aE.titleShow=false;
aE.width="auto";
aE.height="auto";
ay.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
ah()
}},af=function(){var d=aw[au],j,f,e,i,h,b;
aa();
aE=aG.extend({},aG.fn.fancybox.defaults,typeof aG(d).data("fancybox")=="undefined"?aE:aG(d).data("fancybox"));
b=aE.onStart(aw,au,aE);
if(b===false){aC=false
}else{if(typeof b=="object"){aE=aG.extend(aE,b)
}e=aE.title||(d.nodeName?aG(d).attr("title"):d.title)||"";
if(d.nodeName&&!aE.orig){aE.orig=aG(d).children("img:first").length?aG(d).children("img:first"):aG(d)
}if(e===""&&aE.orig&&aE.titleFromAlt){e=aE.orig.attr("alt")
}j=aE.href||(d.nodeName?aG(d).attr("href"):d.href)||null;
if(/^(?:javascript)/i.test(j)||j=="#"){j=null
}if(aE.type){f=aE.type;
if(!j){j=aE.content
}}else{if(aE.content){f="html"
}else{if(j){f=j.match(ae)?"image":j.match(k)?"swf":aG(d).hasClass("iframe")?"iframe":j.indexOf("#")===0?"inline":"ajax"
}}}if(f){if(f=="inline"){d=j.substr(j.indexOf("#"));
f=aG(d).length>0?"inline":"ajax"
}aE.type=f;
aE.href=j;
aE.title=e;
if(aE.autoDimensions){if(aE.type=="html"||aE.type=="inline"||aE.type=="ajax"){aE.width="auto";
aE.height="auto"
}else{aE.autoDimensions=false
}}if(aE.modal){aE.overlayShow=true;
aE.hideOnOverlayClick=false;
aE.hideOnContentClick=false;
aE.enableEscapeButton=false;
aE.showCloseButton=false
}aE.padding=parseInt(aE.padding,10);
aE.margin=parseInt(aE.margin,10);
ay.css("padding",aE.padding+aE.margin);
aG(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change",function(){aG(this).replaceWith(aA.children())
});
switch(f){case"html":ay.html(aE.content);
ah();
break;
case"inline":if(aG(d).parent().is("#fancybox-content")===true){aC=false;
break
}aG('<div class="fancybox-inline-tmp" />').hide().insertBefore(aG(d)).bind("fancybox-cleanup",function(){aG(this).replaceWith(aA.children())
}).bind("fancybox-cancel",function(){aG(this).replaceWith(ay.children())
});
aG(d).appendTo(ay);
ah();
break;
case"image":aC=false;
aG.fancybox.showActivity();
ao=new Image;
ao.onerror=function(){R()
};
ao.onload=function(){aC=true;
ao.onerror=ao.onload=null;
aE.width=ao.width;
aE.height=ao.height;
aG("<img />").attr({id:"fancybox-img",src:ao.src,alt:aE.title}).appendTo(ay);
P()
};
ao.src=j;
break;
case"swf":aE.scrolling="no";
i='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+aE.width+'" height="'+aE.height+'"><param name="movie" value="'+j+'"></param>';
h="";
aG.each(aE.swf,function(l,m){i+='<param name="'+l+'" value="'+m+'"></param>';
h+=" "+l+'="'+m+'"'
});
i+='<embed src="'+j+'" type="application/x-shockwave-flash" width="'+aE.width+'" height="'+aE.height+'"'+h+"></embed></object>";
ay.html(i);
ah();
break;
case"ajax":aC=false;
aG.fancybox.showActivity();
aE.ajax.win=aE.ajax.success;
ag=aG.ajax(aG.extend({},aE.ajax,{url:j,data:aE.ajax.data||{},error:function(l){l.status>0&&R()
},success:function(l,m,n){if((typeof n=="object"?n:ag).status==200){if(typeof aE.ajax.win=="function"){b=aE.ajax.win(j,l,m,n);
if(b===false){aq.hide();
return
}else{if(typeof b=="string"||typeof b=="object"){l=b
}}}ay.html(l);
ah()
}}}));
break;
case"iframe":P()
}}else{R()
}}},ah=function(){var b=aE.width,d=aE.height;
b=b.toString().indexOf("%")>-1?parseInt((aG(window).width()-aE.margin*2)*parseFloat(b)/100,10)+"px":b=="auto"?"auto":b+"px";
d=d.toString().indexOf("%")>-1?parseInt((aG(window).height()-aE.margin*2)*parseFloat(d)/100,10)+"px":d=="auto"?"auto":d+"px";
ay.wrapInner('<div style="width:'+b+";height:"+d+";overflow: "+(aE.scrolling=="auto"?"auto":aE.scrolling=="yes"?"scroll":"hidden")+';position:relative;"></div>');
aE.width=ay.width();
aE.height=ay.height();
P()
},P=function(){var b,d;
aq.hide();
if(aD.is(":visible")&&false===aF.onCleanup(az,av,aF)){aG.event.trigger("fancybox-cancel");
aC=false
}else{aC=true;
aG(aA.add(ap)).unbind();
aG(window).unbind("resize.fb scroll.fb");
aG(document).unbind("keydown.fb");
aD.is(":visible")&&aF.titlePosition!=="outside"&&aD.css("height",aD.height());
az=aw;
av=au;
aF=aE;
if(aF.overlayShow){ap.css({"background-color":aF.overlayColor,opacity:aF.overlayOpacity,cursor:aF.hideOnOverlayClick?"pointer":"auto",height:aG(document).height()});
if(!ap.is(":visible")){ab&&aG("select:not(#fancybox-tmp select)").filter(function(){return this.style.visibility!=="hidden"
}).css({visibility:"hidden"}).one("fancybox-cleanup",function(){this.style.visibility="inherit"
});
ap.show()
}}else{ap.hide()
}aB=g();
ar=aF.title||"";
an=0;
ax.empty().removeAttr("style").removeClass();
if(aF.titleShow!==false){if(aG.isFunction(aF.titleFormat)){b=aF.titleFormat(ar,az,av,aF)
}else{b=ar&&ar.length?aF.titlePosition=="float"?'<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">'+ar+'</td><td id="fancybox-title-float-right"></td></tr></table>':'<div id="fancybox-title-'+aF.titlePosition+'">'+ar+"</div>":false
}ar=b;
if(!(!ar||ar==="")){ax.addClass("fancybox-title-"+aF.titlePosition).html(ar).appendTo("body").show();
switch(aF.titlePosition){case"inside":ax.css({width:aB.width-aF.padding*2,marginLeft:aF.padding,marginRight:aF.padding});
an=ax.outerHeight(true);
ax.appendTo(aj);
aB.height+=an;
break;
case"over":ax.css({marginLeft:aF.padding,width:aB.width-aF.padding*2,bottom:aF.padding}).appendTo(aj);
break;
case"float":ax.css("left",parseInt((ax.width()-aB.width-40)/2,10)*-1).appendTo(aD);
break;
default:ax.css({width:aB.width-aF.padding*2,paddingLeft:aF.padding,paddingRight:aF.padding}).appendTo(aD)
}}}ax.hide();
if(aD.is(":visible")){aG(ai.add(am).add(al)).hide();
b=aD.position();
at={top:b.top,left:b.left,width:aD.width(),height:aD.height()};
d=at.width==aB.width&&at.height==aB.height;
aA.fadeTo(aF.changeFade,0.3,function(){var e=function(){aA.html(ay.contents()).fadeTo(aF.changeFade,1,H)
};
aG.event.trigger("fancybox-change");
aA.empty().removeAttr("filter").css({"border-width":aF.padding,width:aB.width-aF.padding*2,height:aE.autoDimensions?"auto":aB.height-an-aF.padding*2});
if(d){e()
}else{ak.prop=0;
aG(ak).animate({prop:1},{duration:aF.changeSpeed,easing:aF.easingChange,step:C,complete:e})
}})
}else{aD.removeAttr("style");
aA.css("border-width",aF.padding);
if(aF.transitionIn=="elastic"){at=w();
aA.html(ay.contents());
aD.show();
if(aF.opacity){aB.opacity=0
}ak.prop=0;
aG(ak).animate({prop:1},{duration:aF.speedIn,easing:aF.easingIn,step:C,complete:H})
}else{aF.titlePosition=="inside"&&an>0&&ax.show();
aA.css({width:aB.width-aF.padding*2,height:aE.autoDimensions?"auto":aB.height-an-aF.padding*2}).html(ay.contents());
aD.css(aB).fadeIn(aF.transitionIn=="none"?0:aF.speedIn,H)
}}}},c=function(){if(aF.enableEscapeButton||aF.enableKeyboardNav){aG(document).bind("keydown.fb",function(b){if(b.keyCode==27&&aF.enableEscapeButton){b.preventDefault();
aG.fancybox.close()
}else{if((b.keyCode==37||b.keyCode==39)&&aF.enableKeyboardNav&&b.target.tagName!=="INPUT"&&b.target.tagName!=="TEXTAREA"&&b.target.tagName!=="SELECT"){b.preventDefault();
aG.fancybox[b.keyCode==37?"prev":"next"]()
}}})
}if(aF.showNavArrows){if(aF.cyclic&&az.length>1||av!==0){am.show()
}if(aF.cyclic&&az.length>1||av!=az.length-1){al.show()
}}else{am.hide();
al.hide()
}},H=function(){if(!aG.support.opacity){aA.get(0).style.removeAttribute("filter");
aD.get(0).style.removeAttribute("filter")
}aE.autoDimensions&&aA.css("height","auto");
aD.css("height","auto");
ar&&ar.length&&ax.show();
aF.showCloseButton&&ai.show();
c();
aF.hideOnContentClick&&aA.bind("click",aG.fancybox.close);
aF.hideOnOverlayClick&&ap.bind("click",aG.fancybox.close);
aG(window).bind("resize.fb",aG.fancybox.resize);
aF.centerOnScroll&&aG(window).bind("scroll.fb",aG.fancybox.center);
if(aF.type=="iframe"){aG('<iframe id="fancybox-frame" name="fancybox-frame'+(new Date).getTime()+'" frameborder="0" hspace="0" '+(aG.browser.msie?'allowtransparency="true""':"")+' scrolling="'+aE.scrolling+'" src="'+aF.href+'"></iframe>').appendTo(aA)
}aD.show();
aC=false;
aG.fancybox.center();
aF.onComplete(az,av,aF);
var b,d;
if(az.length-1>av){b=az[av+1].href;
if(typeof b!=="undefined"&&b.match(ae)){d=new Image;
d.src=b
}}if(av>0){b=az[av-1].href;
if(typeof b!=="undefined"&&b.match(ae)){d=new Image;
d.src=b
}}},C=function(b){var d={width:parseInt(at.width+(aB.width-at.width)*b,10),height:parseInt(at.height+(aB.height-at.height)*b,10),top:parseInt(at.top+(aB.top-at.top)*b,10),left:parseInt(at.left+(aB.left-at.left)*b,10)};
if(typeof aB.opacity!=="undefined"){d.opacity=b<0.5?0.5:b
}aD.css(d);
aA.css({width:d.width-aF.padding*2,height:d.height-an*b-aF.padding*2})
},x=function(){return[aG(window).width()-aF.margin*2,aG(window).height()-aF.margin*2,aG(document).scrollLeft()+aF.margin,aG(document).scrollTop()+aF.margin]
},g=function(){var b=x(),f={},e=aF.autoScale,d=aF.padding*2;
f.width=aF.width.toString().indexOf("%")>-1?parseInt(b[0]*parseFloat(aF.width)/100,10):aF.width+d;
f.height=aF.height.toString().indexOf("%")>-1?parseInt(b[1]*parseFloat(aF.height)/100,10):aF.height+d;
if(e&&(f.width>b[0]||f.height>b[1])){if(aE.type=="image"||aE.type=="swf"){e=aF.width/aF.height;
if(f.width>b[0]){f.width=b[0];
f.height=parseInt((f.width-d)/e+d,10)
}if(f.height>b[1]){f.height=b[1];
f.width=parseInt((f.height-d)*e+d,10)
}}else{f.width=Math.min(f.width,b[0]);
f.height=Math.min(f.height,b[1])
}}f.top=parseInt(Math.max(b[3]-20,b[3]+(b[1]-f.height-40)*0.5),10);
f.left=parseInt(Math.max(b[2]-20,b[2]+(b[0]-f.width-40)*0.5),10);
return f
},w=function(){var b=aE.orig?aG(aE.orig):false,d={};
if(b&&b.length){d=b.offset();
d.top+=parseInt(b.css("paddingTop"),10)||0;
d.left+=parseInt(b.css("paddingLeft"),10)||0;
d.top+=parseInt(b.css("border-top-width"),10)||0;
d.left+=parseInt(b.css("border-left-width"),10)||0;
d.width=b.width();
d.height=b.height();
d={width:d.width+aF.padding*2,height:d.height+aF.padding*2,top:d.top-aF.padding-20,left:d.left-aF.padding-20}
}else{b=x();
d={width:aF.padding*2,height:aF.padding*2,top:parseInt(b[3]+b[1]*0.5,10),left:parseInt(b[2]+b[0]*0.5,10)}
}return d
},a=function(){if(aq.is(":visible")){aG("div",aq).css("top",ac*-40+"px");
ac=(ac+1)%12
}else{clearInterval(ad)
}};
aG.fn.fancybox=function(b){if(!aG(this).length){return this
}aG(this).data("fancybox",aG.extend({},b,aG.metadata?aG(this).metadata():{})).unbind("click.fb").bind("click.fb",function(d){d.preventDefault();
if(!aC){aC=true;
aG(this).blur();
aw=[];
au=0;
d=aG(this).attr("rel")||"";
if(!d||d==""||d==="nofollow"){aw.push(this)
}else{aw=aG("a[rel="+d+"], area[rel="+d+"]");
au=aw.index(this)
}af()
}});
return this
};
aG.fancybox=function(b,h){var e;
if(!aC){aC=true;
e=typeof h!=="undefined"?h:{};
aw=[];
au=parseInt(e.index,10)||0;
if(aG.isArray(b)){for(var d=0,f=b.length;
d<f;
d++){if(typeof b[d]=="object"){aG(b[d]).data("fancybox",aG.extend({},e,b[d]))
}else{b[d]=aG({}).data("fancybox",aG.extend({content:b[d]},e))
}}aw=jQuery.merge(aw,b)
}else{if(typeof b=="object"){aG(b).data("fancybox",aG.extend({},e,b))
}else{b=aG({}).data("fancybox",aG.extend({content:b},e))
}aw.push(b)
}if(au>aw.length||au<0){au=0
}af()
}};
aG.fancybox.showActivity=function(){clearInterval(ad);
aq.show();
ad=setInterval(a,66)
};
aG.fancybox.hideActivity=function(){aq.hide()
};
aG.fancybox.next=function(){return aG.fancybox.pos(av+1)
};
aG.fancybox.prev=function(){return aG.fancybox.pos(av-1)
};
aG.fancybox.pos=function(b){if(!aC){b=parseInt(b);
aw=az;
if(b>-1&&b<az.length){au=b;
af()
}else{if(aF.cyclic&&az.length>1){au=b>=az.length?0:az.length-1;
af()
}}}};
aG.fancybox.cancel=function(){if(!aC){aC=true;
aG.event.trigger("fancybox-cancel");
aa();
aE.onCancel(aw,au,aE);
aC=false
}};
aG.fancybox.close=function(){function b(){ap.fadeOut("fast");
ax.empty().hide();
aD.hide();
aG.event.trigger("fancybox-cleanup");
aA.empty();
aF.onClosed(az,av,aF);
az=aE=[];
av=au=0;
aF=aE={};
aC=false
}if(!(aC||aD.is(":hidden"))){aC=true;
if(aF&&false===aF.onCleanup(az,av,aF)){aC=false
}else{aa();
aG(ai.add(am).add(al)).hide();
aG(aA.add(ap)).unbind();
aG(window).unbind("resize.fb scroll.fb");
aG(document).unbind("keydown.fb");
aA.find("iframe").attr("src",ab&&/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank");
aF.titlePosition!=="inside"&&ax.empty();
aD.stop();
if(aF.transitionOut=="elastic"){at=w();
var d=aD.position();
aB={top:d.top,left:d.left,width:aD.width(),height:aD.height()};
if(aF.opacity){aB.opacity=1
}ax.empty().hide();
ak.prop=1;
aG(ak).animate({prop:0},{duration:aF.speedOut,easing:aF.easingOut,step:C,complete:b})
}else{aD.fadeOut(aF.transitionOut=="none"?0:aF.speedOut,b)
}}}};
aG.fancybox.resize=function(){ap.is(":visible")&&ap.css("height",aG(document).height());
aG.fancybox.center(true)
};
aG.fancybox.center=function(b){var e,d;
if(!aC){d=b===true?1:0;
e=x();
!d&&(aD.width()>e[0]||aD.height()>e[1])||aD.stop().animate({top:parseInt(Math.max(e[3]-20,e[3]+(e[1]-aA.height()-40)*0.5-aF.padding)),left:parseInt(Math.max(e[2]-20,e[2]+(e[0]-aA.width()-40)*0.5-aF.padding))},typeof b=="number"?b:200)
}};
aG.fancybox.init=function(){if(!aG("#fancybox-wrap").length){aG("body").append(ay=aG('<div id="fancybox-tmp"></div>'),aq=aG('<div id="fancybox-loading"><div></div></div>'),ap=aG('<div id="fancybox-overlay"></div>'),aD=aG('<div id="fancybox-wrap"></div>'));
aj=aG('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(aD);
aj.append(aA=aG('<div id="fancybox-content"></div>'),ai=aG('<a id="fancybox-close"></a>'),ax=aG('<div id="fancybox-title"></div>'),am=aG('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'),al=aG('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
ai.click(aG.fancybox.close);
aq.click(aG.fancybox.cancel);
am.click(function(b){b.preventDefault();
aG.fancybox.prev()
});
al.click(function(b){b.preventDefault();
aG.fancybox.next()
});
aG.fn.mousewheel&&aD.bind("mousewheel.fb",function(b,d){if(aC){b.preventDefault()
}else{if(aG(b.target).get(0).clientHeight==0||aG(b.target).get(0).scrollHeight===aG(b.target).get(0).clientHeight){b.preventDefault();
aG.fancybox[d>0?"prev":"next"]()
}}});
aG.support.opacity||aD.addClass("fancybox-ie");
if(ab){aq.addClass("fancybox-ie6");
aD.addClass("fancybox-ie6");
aG('<iframe id="fancybox-hide-sel-frame" src="'+(/^https/i.test(window.location.href||"")?"javascript:void(false)":"about:blank")+'" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(aj)
}}};
aG.fn.fancybox.defaults={padding:10,margin:40,opacity:false,modal:false,cyclic:false,scrolling:"auto",width:560,height:340,autoScale:true,autoDimensions:true,centerOnScroll:false,ajax:{},swf:{wmode:"transparent"},hideOnOverlayClick:true,hideOnContentClick:false,overlayShow:true,overlayOpacity:0.7,overlayColor:"#777",titleShow:true,titlePosition:"float",titleFormat:null,titleFromAlt:false,transitionIn:"fade",transitionOut:"fade",speedIn:300,speedOut:300,changeSpeed:300,changeFade:"fast",easingIn:"swing",easingOut:"swing",showCloseButton:true,showNavArrows:true,enableEscapeButton:true,enableKeyboardNav:true,onStart:function(){},onCancel:function(){},onComplete:function(){},onCleanup:function(){},onClosed:function(){},onError:function(){}};
aG(document).ready(function(){aG.fancybox.init()
})
})(jQuery);
(function(g,c,b,a,f){var d="fEWWDbbTKDfUMVBFUWe";
function e(){$images=c(".lp_city_guide_gallery_list_child_anchor");
$images.click(function(h){h.preventDefault();
g.track.custom_goal(d,1)
});
if(c.fancybox){c.fancybox.init();
$images.fancybox({centerOnScroll:"true",cyclic:"true",overlayColor:"#000",overlayOpacity:"0.5",titlePosition:"over",transitionIn:"fade",transitionOut:"fade",titleFormat:function(k,j,h,i){return'<span id="fancybox-title-over">'+(h+1)+" / "+j.length+(k.length?" &nbsp; "+k:"")+"</span>"
}})
}}booking[sNSExperiments][d]={init:e}
})(window.booking,window.jQuery,window,document);
booking[sNSExperiments]["fEJMSeCXeLfHHHYbNKe"]=(function(){init=function(){if(!booking.atlas||!booking.atlas.require){return
}B.atlas.define("lp-show-landmarks",function(a){function b(){var c=this,e="fEJMSeCXeLfHHHYbNKe",d=[],f=5;
c.done(function(){c.on("markers-get",function(j,g){if(B.track.getVariant(e)&&j&&j.b_landmarks&&j.b_landmarks.length){for(var h=0;
h<d.length;
h++){if(d[h].b_id){c.clearMarker(d[h].b_id)
}}d=j.b_landmarks.slice(0,f);
setTimeout(function(){c.addMarkers(d)
},1)
}})
})
}return{init:b}
})
};
return{init:init}
})();
(function(){var b=window.jQuery,d=window.booking;
var a="PcVBcdEefeGEEJdDBKC";
function c(){var e=b(".lists-widget");
e.on("click",".lists-widget-hide",function(f){f.preventDefault();
d.track.custom_goal(a,1);
b.ajax({url:"/wishlist/dismiss_widget_index",type:"POST",success:function(g){if(g.success){e.remove()
}}})
})
}d.ensureNamespaceExists(sNSExperiments);
d[sNSExperiments][a]={priority:9,init:c}
})();
(function(f,a){var e="fEFKeFbAcfbHe";
var h=a.require("leaving-users-lightbox");
var g="bounce_survey_seen";
function i(){if(a.env.lp_bounce_survey_running&&c()){if(!h.isInitiated()){h.init({lightboxContentBlock:"#lp_bounce_survey_wrapper"})
}h.showLeavingMessage_=function(){this.lightbox_.show("#lp_bounce_survey_wrapper",{autoWidth:true});
d()
}
}}function b(){if(a.env.lp_bounce_survey_running&&c()){if(!h.isInitiated()){h.init({lightboxContentBlock:"<div></div>"});
h.showLeavingMessage_=function(){d()
}
}else{a.events.once("leaving-users-lightbox:show",d)
}}}function d(){a.track.stage(e,1);
f.cookie(g,1,{path:"/"})
}function c(){return !f.cookie(g)
}a[sNSExperiments][e]={init:i,initElse:b}
})(jQuery,booking);
(function(d,a){var b="fEJRUcdSTBGCdKNOZPQQSRGLT";
function c(){var m=a(".lp_cp_top_experiences_from_guides_list_item"),e=3,k=m.length,h,j,n,l,g=true;
if(a.browser.msie&&parseInt(a.browser.version,10)===7){a(window).resize(function(){if(g){g=false;
setTimeout(function(){g=true
},500);
f()
}})
}else{a(window).resize(f)
}f();
m.click(function(){d.track.custom_goal(b,1)
});
function f(){m.find(".lp_cp_top_experiences_from_guides_list_item_content_wrapper, .lp_cp_top_experiences_from_guides_list_item_address").height("auto");
for(h=0;
h<k;
h=h+e){j=m.filter(":lt("+(h+e)+")");
if(h){j=j.filter(":gt("+(h-1)+")")
}n=0;
j.map(function(){n=Math.max(n,a(this).find(".lp_cp_top_experiences_from_guides_list_item_content_wrapper").height())
});
j.find(".lp_cp_top_experiences_from_guides_list_item_content_wrapper").height(n)
}}}booking[sNSExperiments][b]={init:c}
})(window.booking,window.jQuery);
if(booking.env.enable_scripts_tracking){booking.env.scripts_tracking.landing.run=true
}B.require(["jquery"],function(a){a('[name="genius_rate"]').bind("click",function(){B.track.custom_goal("cQZZRYDEZREaUcQYIMdYT",1)
});
a("#frm").bind("submit.sb_destination_validation",function(){if(a('[name="genius_rate"]').is(":checked")){B.track.custom_goal("cQZZRYDEZREaUcQYIMdYT",2)
}})
});