if(typeof(FKART)=="undefined"){FKART={}}FKART.analytics={};FKART.analytics.omnitureTracker=klass({elements:[],events:[],setParam:function(b,a){if(s&&s.hasOwnProperty(b)&&a){s[b]=a}},extractParams:function(c){var a=$(c).data("omnifield"),d=$(c).data("omnievents");if(a){a=a.split(";");if(a.length>0){for(var b=a.length-1;b>=0;b--){this.setParam(a[b],$(c).data(a[b].toLowerCase()))}}}if(d){d=d.split(";");if(d.length>0){for(var b=d.length-1;b>=0;b--){if(d){this.events.push(d[b])}}}this.updateOmnitureEvents()}},updateOmnitureEvents:function(){if(s&&s.hasOwnProperty("events")&&this.events.length>0){var a=(s.events)?s.events.split(","):[];if(a){Array.prototype.push.apply(a,this.events);s.events=a.join(",")}else{s.events=this.events.join(",")}}},setOmnitureParams:function(){if(this.elements.length>0){var a=this.elements.length;for(var b=0;b<a;b++){this.extractParams(this.elements[b])}}},track:function(){if(s.eVar22){s.products+="eVar22="+s.eVar22}if(s.eVar19){s.products+="|eVar19="+s.eVar19}return(s&&s.t())},initialize:function(){this.elements=$(".omniture-field").not(".omni-tracked");this.setOmnitureParams()}});