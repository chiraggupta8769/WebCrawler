!function(){
	var _win=window,
	_dc=_win.document,
	_track_url = "http://track.ra.icast.cn/icast3/?cid=47133&r=[rnd]&pos_id=1743&ad_id=249993&",
	_ad_id = 249993,
	_pos_id = 1743,
	_download = "http://rm.sina.com.cn/bj-icast/mv/cr/2015/08/249993/47133/",
	_imp_track=_track_url+"mp=1&imp=1,1",
	_clk_track=_track_url+"mc=1&clk=1,1",
	_fply_track=_track_url+"mfp=1",
	_ext_track=_track_url+"[EXTTYPE]=[EXTVALUE]",
	_replay_track=_track_url+"mrp=1",
	_close_track=_track_url+"mbrk=1",
	_um_imp="",
	_um_clk="",
	_clk_url="http://clk.gentags.net/clk/iv-13150/st-23/cr-2/oi-341856/or-4186/adv-403/pcon-0/http://dc2.jd.com/auto.php?service=transfer&type=dmp&from=dmp&kid=738&klid=57529&to=http://sale.jd.com/act/8LFsC1aY3DVPeWl.html",
	_is_done=0,
	_util = {
		loadJS:function(_url,_fn){
			var _s = _dc.createElement("script");_s.src = _url;
			_s.onload=_s.onreadystatechange=function(){if(!_s.readyState||_s.readyState.match(/loaded|complete/i)){_fn();_s.onload=_s.onreadystatechange=null}}
			_dc.getElementsByTagName("head")[0].appendChild(_s)
		}
	};
	if(_um_imp!="")_imp_track+="\n"+_um_imp;
	if(_um_clk!="")_clk_track+="\n"+_um_clk;
	(new Image).src="http://d1.sina.com.cn/d1images/lmt/cls_77x31.gif";
	function run(){
		iCast5["2.4"].load({"aid":_ad_id,"path":_download,"impTrack":_imp_track,"clkTrack":_clk_track,"extTrack":_ext_track,"clkUrl":_clk_url, 
		"params":{
			"ad_apc":2,
			"ad_life":1440,
			"ad_volume":20
		},
		"poses":{
			"origPos":[
			{"tag":"main",
			"zi":12000,
			//"y_gap":0,
			//"id":"$ad:ad_playerid$",
			"location":{"rt":"","rf":"_viewport","rp":2,"sp":2,"dx":0,"dy":45},
			"materials":{"main":{"type":"swf","f":"1.swf","w":1000,"h":300}}
			}
		], 
		"extdPos":[
			{"tag":"crn",
			"vi":-2000,
			"y_gap":0,
			"clkUrl":"",
			"location":{"rt":"","rf":"_viewport","rp":9,"sp":9,"dx":0,"dy":0},
			"materials":{"main":{"type":"swf","f":"2.swf","w":25,"h":220}}
			},
			{"tag":"cls",
			"materialScale":"stretch",
			"vi":0,
			"location":{"rt":"af","rf":"&main","rp":9,"sp":3,"dx":0,"dy":0},
			"materials":{"main":{"type":"pic","f":"http://d1.sina.com.cn/d1images/lmt/cls_77x31.gif","w":77,"h":31}}
			}
		
		],
		"extDomObjs":{}
		},
		
		"displayLogic":{	
			"init":[
				["apc","LocalStorage","*ad_life"],
				["dt1","DownTimer","=0.02"],
				["dt2","DownTimer","=0.02"],
				["ct3","Counter"],
				["ti1","Timer"],
				["imp","Func",function(){
					sinaadToolkit.array.each(sinaadsFloatViewTAG,function(item){sinaadToolkit.sio.log(item)})
				}],
				["clk","Func",function(){
					sinaadToolkit.array.each(sinaadsStreamMonitor,function(item){sinaadToolkit.sio.log(item)})
				}],
				["done","Func",function(){
					if(!_is_done){
						_is_done=1;
						sinaadsROC.done(sinaadsROC.stream)
					}
				}],
				["f3","Func",function(){
					return iCast5["2.4"].browser.mac?1:0;
				}]
			],
			"checkApc":[],
			"interactive":[
				[
					["_ad","onInit"],
					[	
						["@apc","count","<","*ad_apc"]		
					], 
					[
						["@dt1","start"]
					],
					[
						["_ad","execFun","done"],
						["@dt2","start"]
					],
					[
						["_ad","trackImp"],
						["_ad","execFun","imp"]
					]
				],
				[
					["@dt1","onEnd"],
					[
						["&main","isLoaded","isTrue"],
						["&crn","isLoaded","isTrue"],
						["&cls","isLoaded","isTrue"],
						["_ad","isEnabled","isTrue"]
					],
					[
						["&main","play"],
						["&cls","show"],
						["@ti1","start"],
						["@apc","count"]
					],
					[
						["@dt1","start"]
					]
				],
				[
					["@dt2","onEnd"],
					[
						["&main","isLoaded","isTrue"],
						["&crn","isLoaded","isTrue"],
						["&cls","isLoaded","isTrue"],
						["_ad","isEnabled","isTrue"]
					],
					[
						["&crn","play"]
					],
					[
						["@dt2","start"]
					]
				],

				[
					["&main","onEnd"],
					[],
					[	
						["&crn","play"],
						["&cls","hide"],
						["&main","close"],
						["_ad","track", _fply_track],
						["_ad","trackExt","mpt","@ti1.time"],
						["@ti1","reset"],
						["_ad","execFun","done"]
					]
				],
				[
					["&cls","onClick"],
					[],
					[
						["&crn","play"],
						["&cls","hide"],
						["&main","close"],
						["_ad","track", _close_track],
						["_ad","trackExt","mpt","@ti1.time"],
						["@ti1","reset"],
						["_ad","execFun","done"]
					]
				],

				[
					["&main","onClick"],
					[],
					[
						["_ad","trackClk"],
						["_ad","track",""],
						["_ad","execFun","clk"]
					]
				],
				[
					["&crn","onClick"],
					[],
					[
						["_ad","trackClk"],
						["_ad","track",""],
						["_ad","execFun","clk"]
					]
				],
				[
					["&crn","onReplay"],
					[],
					[
						["@ct3","count"],
						["&main","replay"],
						["&cls","show"],
						["&crn","close"],
						["@ti1","start"],
						["_ad","track",_replay_track]
					]
				],
				[
					["&crn","onClose"],
					[],
					[
						["&crn","close"],
						["_ad","unload"]
					]
				],
				[
					["@ct3","onCount"],
					[
						["=1","==","~f3"]
					],
					[
						["&main","reload"]
					]
				],
				[
					["&main","onReady"],
					[
						["&main","isLoaded","isTrue"]
					],
					[
						["&main","play"]
					]
				]
			]
		}	
		})
	}
	_util.loadJS(_download+'icast5.js', run)
}()