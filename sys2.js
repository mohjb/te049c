sys=
{did:function did(i){return document.getElementById(i);}
	,dce:function dce(n,p,o){//3rd param is either text, or, obj with props:t,id,styl,attribs,clss,clk,mo
		var n=document.createElement(n);
		if(o)
		{var t=typeof(o)=='string'?o:(o&&o.t)
			if(t!=undefined)
				sys.dct(t,n);
			if(o.id!=undefined)
				n.id=o.id;
			if(o.clss!=undefined)
				n.className=o.clss;
			if(o.styl!=undefined){
				if(typeof(o.styl)=='string')
					n.style.cssText=o.styl;
				else
					for(var i in o.styl)
						n.style[i]=o.styl[i];}
			if(o .attribs)
				for(var i in o.attribs)
					n.setAttribute(i,n[i]=o.attribs[i])
					if(o.clk)
						n.onclick=o.clk;
		}//if(mo)n.mouseover=mo;
		if(p)p.appendChild(n);return n;
	}//dce
	,dct:function dct(t,p){
		var n=document.createTextNode(t);
		if(p)p.appendChild(n);return n;
	}//dct
	,dci:function dci(nm,p,o){//o obj:typ,val,chkd,id,lbl,attribs,styl,clss,chng,clk
		var r=sys.dce('input',0,o),lbl;//0,o&&o.id,o&&o.styl,attribs,cl,clk);
		r.name=nm;if(o)
		{r.type=(o&&o.typ)||'text';
			if(o.val!=undefined)r.value=o&&o.val;
			if(o.chkd)r.checked='checked'
				if(o.chng)
					r.onchange=o.chng;
			if(o.lbl)lbl=sys.dce('label',0,
								 {	t:o.lbl
								 ,id:o.id?o.id+'.lbl':null
								 ,attribs:{"for":o.id}
								 });
		}
		if(p){p.appendChild(r);
			if(lbl)p.appendChild(lbl);}
		return r;}
	
	//,bld:function bld(p,parnt){}
	,bldSlct:function bldSlct(p,parnt){}

	,/** params: array ;or same as bld.params
	  .columnsHidden integer count of the first columns that should not generate html
	  , .c  2 dimensional array of elements ,this method will nest each elem in a TD
	  , and the elem is same as bld.params,recursive
	  , .headings 1dim array , this method nests each elem in a TH, and the elem is
	  , .footer
	  same as bld.params
	  , pr:parent domÃ‚Â­element , basedÃ‚Â­on/uses dce*/
	  bldTbl:function sys_BuildHtmlTable(params,pr){
		  var t=sys
		  ,tbl=pr&&pr.nodeName=='TABLE'?pr:
		  t.dce('table',pr,null,params?params.id:0)
		  ,tb=tbl?tbl.tBodies[0]||tbl.createTBody():0
		  ,arr=params instanceof Array;
		  tbl.json=params;
		  if(params.headings)
		  {var ht=tbl.tHead||tbl.createTHead()
			  //console.log('sys.bldTbl:params.headings:ht=',ht)
			  var a=params.headings,th
			  //console.log('sys.bldTbl:params.headings:a=',a)
			  var tr=ht;if(tr)
			  {tr=tr.children;
				  if(tr){if(tr[0])
					  tr=tr[0];
				  }}
			  if(!tr || !tr.insertCell )
				  tr=ht.insertRow(0);
			  //var tr=ht.children?th.children[0]||ht.insertRow():0;
			  //console.log('sys.bldTbl:params.headings:tr=',tr)
			  for(var i in a)
				  if(!(params.columnsHidden>=i))
					  th=t.dce('th',tr,{t:a[i]});
		  }
		  if(params.c || arr)
		  {var r,a=arr?params:params.c,tr,td;
			  for(var i in a)
			  {tr=tb.insertRow();
				  if(params.rows)
				  {	var v=params.rows[i]
					  if(v)th=t.dce('th',tr,{t:v});
				  }
				  for(var j in a[i])
					  if(!(params.columnsHidden>=i))
					  {	td=tr.insertCell();
						  t.dct(a[i][j],td);//t.bld(a[i][j],td);
					  }}	 }
		  if(params.footer)
		  {var ht=tbl.tFoot||tbl.createTFoot()
			  ,a=params.footer,td
			  ,tr=ht.children?ht.children[0]||ht.insertRow():0;
			  for(var i in a)
				  if(!(params.columnsHidden>=i))
					  t.dct(a[i],tr.insertCell());
		  }
		  return tbl;}
	
	,cc:function sys_CreateCollapsable(title,prnt,contnt,styl,id){
		var t=sys
		,fs=t.dce('fieldset',prnt,{styl:styl,id:'fs.'+id})
		,l=t.dce('legend',fs,title),nod=contnt;
		if(! nod instanceof Node)nod=t.dce('span',fs,{t:contnt,id:id});
		else {fs.appendChild(nod);nod.style.display='none'}//t.dcb(l,'+',0,
		l.onclick=function(evt){try{var d=nod.style.display;
			//console.log('onclickCollapsable:d=',d,' ,nod=',nod,' ,',nod.innerHTML);
			nod.style.display=(d=='none'?'block':'none');}
			catch(ex){console.error('onclickCollapsable:ex:',ex);}return nod;}}

	,nxt:function nxt(e,a,b){
		if(!e)return e;
		var x=e;
		while(x){
			if(x.nodeName==a || ( b && x.nodeName==b))
				return x;
			x=x.nextSibling;
		}
		while(e)
		{	x=nxt(e.firstChild);
			if(x)
				return x;
			e=e.nextSibling;
		}
	}//function nxt

	//should build elements-li of param-o
	,bldIndiTree:function bldIndiTree(p,o,sectrName){
		var t=bldIndiTree;
		if(!t.f)t.f=function indiLevelsClk(evt){
			var s=sys.nxt(this,'UL','OL');
			if(s){s=s.style;
				s.display=(s.display=='none')?'block':'none';}
		}//function indiLevelsClk
		function formatTooltip(o){
			var b=[];for(var i in o)
			if(i!='path' && i!='rowIx' && i!='pathLevel')
			{var x=o[i]
				b.push(i+'\n\t'+x+'\n');
			}return b.join('\n')
		}
		function formatSeries(o,d){
		if(o&&o.meta&&o.meta.Series){
			var v=o.meta.Series.trim()
			,s=o.meta['Series code'];
			if(v.indexOf(s)==0)
				v=v.substring(s.length)
			return v;
			}
			return d;
		}
		function cb(o,sectrName,p,lbl){
			var code=o&&o.meta?o.meta['Series code']:'code'+o
			//,lvl='indi',n=x[sectrName]
			,m=sectrName+'.indi.'+code// changed 2016-06-29-08-50 i to e
			,lbl=o&&o.meta?o.meta.Series:'indicator:'+o
			,inp=sys.dci(m,p
					,{typ:'checkbox',id:m,lbl:lbl
					,clss:'filter',val:code
					,chng:sys.bldLists.chngFltr})
			inp.setAttribute('entty',inp.entty={e:'code',n:code})
			return inp;
		}
		function isExpandable(o){
			var r= o&&o.meta&&(d3.keys(o).length>1);
			return r;}

		for(var i in o)if(i!='meta')
		{var x=o[i]
			,exp=isExpandable(x)
			, li=sys.dce('li',p,//TODO: generate checkbox and label
				{clss:'searchable'
				,attribs:{meta:x.meta,title:formatTooltip(x.meta)}
				,styl:exp
				?'list-style-image:expandable.png'
				:'list-style-type:circle'})
			,btn=sys.dce('span',li,{t:i+': '+formatSeries(o,'Indicator'+i)
				,clk:t.f	})
			,inp=cb(x,sectrName,li)
			,ul;
			if(exp)
			{btn.innerHTML='<span style="font-size:20px">+</span> '+btm.innerHTML
				ul=sys.dce('ul',li,{styl:'display:none'})
			 t(ul,x,sectrName);
			}
		}//for i in o
	}//bldIndiTree


	/*
	TODO: select all / clear selection , parameters collapsable
	add tooltip for indi in div.output
	*/


	,bldFltrPanel:function bldFilterPanel(d,title,id,noSearch){
		//add search filter
		if(!sys.bldFltrPanel.onInp)
			sys.bldFltrPanel.onInp=
			function onInput(evt)
				{//console.log('filter.oninput:',evt,this)
					var str=this.value,l=str.toLowerCase(),y,v,i,b
					,results=this.parentElement.results
					,x=this.parentElement,a=x.getElementsByClassName('searchable')
					results.innerHTML=''
					function findTxt(x,t,L){
						if(x.nodeType==Node.Text_Node && 
						x.data.toLowerCase().indexOf(t)!=-1)
							return x
						if(x.firstChild
						&& x.firstChild.nodeName!='OL'
						&& x.firstChild.nodeName!='UL'
						){var r=findTxt(x.firstChild,t,L+1);
							if(r)
								return r;}
						if(L>0&&x.nextSibling
						&& x.nextSibling.nodeName!='OL'
						&& x.nextSibling.nodeName!='UL'
						){var r=findTxt(x.nextSibling,t,L+1);
							if(r)
								return r;}
					}
					function clon(n){
						if(n.nodeName=='OL'||n.nodeName=='UL')return
						var c=n.cloneNode(),x
						n=n.firstChild
						while(n){
							if(n.nodeName!='OL'&&n.nodeName!='UL')
							{x=clon(n)
								c.appendChild(x)}
							n=n.nextSibling}
						return c;
					   /* function clonX(n){
							function f(p){
								if(p.nodeName=='OL'||p.nodeName=='UL')
								{if(p.parentNode)
										p.parentNode.removeChild(p)}
								else{if(p.firstChild)f(p.firstChild)
									if(p.nextSibling)
										f(p.nextSibling)
							}}
							var c=n.cloneNode(true)
							c=f(c)
							return c;
						}*/
					}
								
					if(str && str.length>1)
					for(var j in a){
						x=findTxt(a[j],l,0)
						if(x){x=clon(a[i])
							y=findTxt(x,l,0)
							v=y.data
							i=v.toLowerCase().indexOf(l)
							y.data=v.substring(0,i)
								+"<i style=\"text-decoration: underline;"
								+"font-weight: 800; background-color: yellow; \">"
								+str+"</i>"+v.substring(i+str.length)
							b=x.getElementsByTagName('INPUT')
							for(var bx in b)
							{b[bx].onchange=function(e)
								{	var a=document.getElementsByTagName(this.name)
									for(var k in a){var v=a[k];
										if(v!=this)
										{v.checked=this.checked;
											if(v.onchange)
												v.onchange(e)
										}//if v
									}//for k
								}//function
							}//for bx
							results.appendChild(x);
						}//if x
					}//for j
				}//function

		if(!noSearch)
			sys.dci(id+'-searchFilter',d
				,{typ:'search',lbl:'filter'})//,clss:'searchable'
			.oninput=sys.bldFltrPanel.onInp

		d.results=sys.dce('ul',d)
		sys.cc(title,d,d.ol=sys.dce('ol',d))
		sys.dci(id+'.select-all',d.ol
			,{typ:'button',t:'Select all',clk:function(e){
				console.log('sys.bldFltrPanel.selectAll.clk',arguments);
			}
		})
		return d.ol;
	}//function bldFilterPanel
	
	,bldLists:function(sectrName,sectrLookup){//sectrLookup is <sector>.lookup
		var div=sys.bldFltrPanel(sys.did('div.lookups')
			,'User Input Parameters',sectrName+'-inputs')
		,frmt=sys.did('div.lookups.format');
		frmt.parentNode.removeChild(frmt);
		sectrName=sectrName.toLowerCase();
		sys.bldLists.chngFltr=function chngFltr(evt){
			var t=evt.target||event.srcElement
			,auto=sys.did('autoQuery')
			if(auto&&auto.checked)
				sys.clkQuery()
		}//function chngFltr
		var panelsTitles={cntry:'Countries'//,dbLvls:['indi','cntry','yr','vars']//'sectr',
			,indiLvls:'Indicators'//,indi:'All Indicators',code:'All Indicators'
			,yr:'Years',vars:'Variables',format:'Format',chrtTyp:'Chart Type'}
		{var sectr=xls[sectrName]//||xls[sectrName.toLowerCase()]
		 if(sectr){var it=db.sectors[sectrName].indiTree;
		 if(it){
			var d=sys.dce('div',div,{clss:'stylDiv',id:'div-'+sectrName+'-indiLevels'})
			d.ol=sys.bldFltrPanel(d,panelsTitles.indiLvls,sectrName+'-indiLvls')
			 sys.bldIndiTree(d.ol,it,sectrName)
		}}}
		for(var lvl in sectrLookup)if(lvl!='indi'&&lvl!='code'&& lvl!='varsOverride')
		{	var x=sectrLookup[lvl],d=sys.dce(
				 'div',div,{clss:'stylDiv',id:'div-'+lvl})
				d.ol=sys.bldFltrPanel(d,panelsTitles[lvl],sectrName+'-'+lvl)
				//d.ol=;//d. ol=sys.dce('ol',d)
				for(var e in x)
				{	var n=x[e],m=sectrName+'.'+lvl+'.'+n// changed 2016-06-29-08-50 i to lvl
					,inp=sys.dci(m,sys.dce('li',d.ol,{clss:'stylLI searchable'})
						,{typ:'checkbox',id:m,lbl:n,clss:'filter',chng:sys.bldLists.chngFltr})
					inp.setAttribute('entty',inp.entty={e:lvl,n:n})
				}//for e
		}//i in lookup
		{var chartTypes=['Line Chart','Line Chart 2','Bar Chart','Horizontal Bar Chart','Spider Chart','Radar Chart','No Chart']
			,d=sys.dce('div',div,{clss:'stylDiv',id:'div-'+sectrName+'-chartTypes'})
			d.ol=sys.bldFltrPanel(d,panelsTitles.chrtTyp,sectrName+'-chrtTyp')
			for(var i in chartTypes)
				var m=chartTypes[i]
				,inp=sys.dci('ChrtTyp',sys.dce('li',d.ol,{clss:'stylLI'})
					,{typ:'radio',id:m,lbl:m,styl:'display:inline',val:i})
		}
		var //a={indi:1,'cntry':2,'yr':3,'vars':4},c,
		inp,m,d=sys.dce('div',div,{clss:'stylDiv',id:'div-tblOrder'})
		d.ol=sys.bldFltrPanel(d,panelsTitles.format,sectrName+'-format','noSearch')
				d.firstChild.style.display='none';d.firstChild.nextSibling.style.display='none';
		d.ol.appendChild(frmt)
		sys.bldLists.bldFltrHstry=function()
		{try{var ss=sessionStorage.TE049C_filters,span=sys.did('filterHistory')
			ss=JSON.parse(ss);span.innerHTML='';
			sys.bldLists.setFilter=
			function setFiler(filter){
				var d=document.getElementsByClassName('filter')
				for(var i in d)if(d[i] instanceof Node)try
				{var x=d[i],y=x.entty||x.getAttribute('entty')
					,e=y&&y.e,n=y&&y.n,v=x.value;//x.name
					x.checked=filter.f[e][n&&(n.code!=undefined)?n.code:n]?v:false;
				}catch(ex){console.error('setFilter.f',ex);}
				d=document.getElementsByClassName('tblOrder')
				for(var i in d)try
				{var x=d[i]
					x.checked=filter.order?"checked":false;
				}catch(ex){console.error('setFilter.o',ex);}
			}//function setFilter
			sys.bldLists.clkHstry=
			function(evt)
			{	var f=this.ss||this.getAttribute('ss')//f||
				sys.bldLists.setFilter(f.f?f:{f:f,order:''},this)
			}
			for(var i in ss){
				var btn=sys.dce('button',span,{t:i})
				btn.setAttribute('ss',btn.ss=ss[i])
				btn.onclick=sys.bldLists.clkHstry
			}
		}catch(ex){console.error('bldLists:sessionStorage.TE049C_filters',ex);}
		}//function bldFltrHstry
		sys.bldLists.bldFltrHstry()
	}//bldLists

	,clkQuery:function clkQuery(evt,sectr){
		var d=document.getElementsByClassName('filter')
		,filter={code:{},cntry:{},yr:{},vars:{}},lvl2={}
		for(var i in d)if(d[i].checked && typeof(d[i])!='function')
		{var x=d[i],y=x.entty||x.getAttribute('entty')
			,e=y&&y.e,n=y&&y.n,v=x.value;//x.name
			if(e&&n&& filter[e])
				filter[e][n&&n.code?n.code:n]=v;
		}if(!sectr)sectr=db.sectors[sys.sectrName]
			if(!lvl2)lvl2={};
		console.log('clkQuery:filters=',filter);
		for(var code in filter.code)
		{var dbIndi=sectr[code],lvl3=lvl2[code]
			if(!lvl3)lvl3=lvl2[code]={}
			for(var country in filter.cntry)
			{var dbCntry=dbIndi[country],lvl4=lvl3[country];
				if(!lvl4)lvl4=lvl3[country]={}
				for(var Year in filter.yr)
				{var dbYr=dbCntry[Year],lvl5=lvl4[Year]
					if(!lvl5)lvl5=lvl4[Year]={}
					for(var vars in filter.vars)
					{var dbVar=dbYr[vars]
						lvl5[vars]=dbVar
					}
				}
			}
		}//for code
		
		var levels=0,order
		/*d=document.getElementsByClassName('tblOrder')
		for(var i in d)
			if(d[i].checked && typeof(d[i])!='function')
			{order=d[i].id;levels=d[i].entty||d[i].getAttribute('entty')}*/
		levels=getFormat();order=levels.join(',')
		try{var ss=sessionStorage.TE049C_filters
			
			function filtersEqual(a,b){
				if(a==b)
					return true;
				var ak=d3.keys(a),bk=d3.keys(b),n
				//if(ak==bk)return true;
				if((n=ak.length)!=bk.length)
					return false;
				for(var i =0;i<n;i++)
				{	var k=ak[i]
					if(k!=bk[i] || !filtersEqual(a[k],b[k]))
						return false;
				}
				return true;
			}
			function ixOf(a,e){
				for(var i in a)
					if(filtersEqual(a[i],e))
						return i;
				return -1;
			}
			var fltr={f:filter,order:order}
			if(ss)
			{ss=JSON.parse(ss);
				var ix=ixOf(ss,filter)
				if(ix==-1)
					ss.push(fltr)
					for(var i in ss)
						console.log(i,ss[i])
						if(ix==-1)
						{	sessionStorage.TE049C_filters=JSON.stringify(ss)
							sys.bldLists.bldFltrHstry()
						}
			}
			else
			{sessionStorage.TE049C_filters=JSON.stringify([fltr])
				sys.bldLists.bldFltrHstry()
			}
		}catch(ex){console.error('clkQuery:sessionStorage.TE049C_filters',ex);}
		
		d=sys.mapDatasetLevels(lvl2,levels)
		console.log('clkQuery:lvl2=',lvl2,d);
		sys.bldOutput(sys.sectrName,d,levels)//sys.bldChart(sys.sectrName,d,levels)
	}//function clkQuery
	
	,mapDatasetLevels:function/**
		newFormatLevels:array of names of levels, in the new order of levels
		the names of levels in dataset are the same as db.dbLvls*/
	mapDatasetLevels(dataset,newFormatLevels){
		var d=db.dbLvls
		,p=newFormatLevels
		, i={},a=[],b=[]
		,reformattedDataset={}
		for(var k in d)i[d[k]]='';
		for(i[d[0]] in dataset)
		{	a[0]=dataset[i[d[0]]]
			for(i[d[1]] in a[0])
			{	a[1]=a[0][i[d[1]]]
				for(i[d[2]] in a[1])
				{	a[2]=a[1][i[d[2]]]
					for(i[d[3]] in a[2])
					{if( (a[3]=a[2][i[d[3]]])!=undefined )
					{
						b[0]=reformattedDataset[i[p[0]]]
						if(!b[0])
							b[0]=reformattedDataset[i[p[0]]]={}
						b[1]=b[0][i[p[1]]]
						if(!b[1])
							b[1]=b[0][i[p[1]]]={}
						b[2]=b[1][i[p[2]]]
						if(!b[2])
							b[2]=b[1][i[p[2]]]={}
						b[2][i[p[3]]]=a[3];
					}
					}//for lvl3
				}//for lvl2
			}//for lvl1
		}//for lvl0
		return reformattedDataset;
	}//mapDatasetLevels
	
	/*takes a tree with a depth of two, at the second level there are atomic (non-structural) values*/
	,tree2tbl:function(tree){
		var tbl={rows:[],headings:[],c:[]}
		,lvl=[]	,i=[]	,j=[];
		
		for( i[0] in tree){
			lvl[0]=tree[i[0]]
			j[0]=tbl.rows.indexOf(i[0])
			if(j[0]==-1)
			{	j[0]=tbl.rows.length;
				tbl.rows[j[0]]=i[0]
				tbl.c[j[0]]=[]
			}
			for( i[1] in lvl[0])
			{	lvl[1]=lvl[0][i[1]]
				j[1]=tbl.headings.indexOf(i[1])
				if(j[1]==-1)
				{	j[1]=tbl.headings.length;
					tbl.headings[j[1]]=i[1]
				}
				tbl.c[j[0]][j[1]]=lvl[1]
			}
		}tbl.headings.unshift('')
		return tbl;
	}//tree2tbl
	
	,bldOutput:function(sectrName,dataset,levels){
		var div=sys.did('div.output'),k={},k0,k1,tre,j,dbi=db.lookup.indi
		,indi={t:'',L:levels.indexOf('indi')};
		div.innerHTML='';sys.output=[]
		for( k[levels[0]] in dataset)try{
			var sct=dataset[k0=k[levels[0]]];indi.t=indi.L==0?dbi[k0].Series:''
			for( k[levels[1]] in sct)try{
				k1=k[levels[1]];if(indi.L==1)
					indi.t=dbi[k1].Series
				sys.dce('h2',div,{t:indi.L==0?indi.t:k0});
				sys.dce('h3',div,{t:indi.L==1?indi.t:k1})
				j=sys.tree2tbl(tre=sct[k1])// j.rows , j.headings ,j.c is the 2d data,
				if(indi.L>1){var a=j[indi.L==2?'rows':'headings'];
					for(var i in a)
					{var ai=a[i],dbiai=dbi[ai];
						a[i]=dbiai.Series
				}}
				sys.output.push(j);//j.indiL=indi.L
				j.sectrName	=sectrName
				j.tbl	=sys.bldTbl(j,div)
				j.span	=sys.dce
				('span',div
				 ,{id  : 'outputSpan.'+k0+'.'+k1
				 ,clss: 'outputSpan'
				 ,attribs:{json:j}
				 }
				 )//j.span.setAttribute('json',j.span.json=j)
				//j.data4d3	=sys.tree2data(//		j.data4d3 is for the JavaScript-library d3
				j.tree		=tre	//,
				j.levels	=levels	//,
				j.keys		=k		//)
				
				sys.dce('hr',div)
			}catch(ex){
				console.error('bldOutput:k1=',k1,' ,k0=',k0,ex)}//for section
		}catch(ex){
			console.error('bldOutput:k0=',k0,ex)}//for section
		sys.bldCharts();
	}//bldOutput

,hsl:{h:233,s: 0.25 ,l:.9,dl:-.3}//L.808,s: 0.2727272727272727, l: 0.6333333333333333

,bldCharts:function bldCharts(){
	var ct=0,a=document.getElementsByName('ChrtTyp')
	,c=[sys.bldCharts_line1,sys.bldCharts_ln2
	,sys.bldCharts_bar1,sys.bldCharts_hBar
	,sys.bldCharts_rdr1,sys.bldCharts_rdr2]
	for(var i=0;i<a.length;i++)
		if(a[i].checked)
			return c[i]()
}//function bldCharts

,bldCharts_line1:function bldCharts_line1(){
	var lineFunction = d3.svg.line()
		.x(function(d,i) { return i*40; })
		.y(function(d) { return isNaN(d)?0:d; })
		.interpolate("linear")
	,hsl=sys.hsl
	for(var p=0;p<sys.output.length;p++)
	{	j=sys.output[p]

		j.svg=d3.select(j.span).append("svg")
			.attr("width", 400)
			.attr("height", 200)
			.attr("style","border:1px solid black");
	
		for(var i=0,n=j.c.length;i<n;i++)
		{var c=j.c[i];
			c.clr=d3.hsl(hsl.h+(360*i)/n,hsl.s,hsl.l)
			c.cl2=d3.hsl(hsl.h+(360*i)/n,hsl.s,hsl.l+hsl.dl)
			c.c=c.clr.toString()
			c.w=j.tbl.rows[i+1]
			if(c.w .cells[0].innerHTML=="Kuwait")
				c.Kuwait=4;
			c.lineGraph = j.svg.append("path")
				.attr("d", lineFunction(c))
				.attr("stroke", c.cl2)
				.attr("stroke-width", c.Kuwait||2)
				.attr("fill", "none")
				.attr("ix", p+'.'+i)
				.on('mouseover',function(d,i){
					var ix=this.getAttribute('ix'),a=ix.split('.'),j=sys.output[a[0]],c=j.c[a[1]];
					c.line=d3.select(this).transition().attr("stroke-width",c&&c.Kuwait?"6":"4");
					d3.select(c.w).transition().attr('style','background-color:'+c.cl2);
					console.log('mouseover',arguments,',window.$0=',window.$0=this,ix,a,j,c);
					})//
				.on('mouseout',function(d,i){
					var ix=this.getAttribute('ix'),a=ix.split('.'),j=sys.output[a[0]],c=j.c[a[1]];
					c.line=d3.select(this).attr("stroke-width",c&&c.Kuwait?"4":"2");
					c.w.style.backgroundColor=c.c;
				})//
				;
			
			c.w.style.backgroundColor=c.c
			//for(var p=0;p<j.c[i].length;p++)j.p[i].push()
			c.dots=
				j.svg.append("circle").data(c)//.enter().append('circle')
				.attr("cx", function(d,i) { return i*40; })
				.attr("cy", function(d) { return isNaN(d)?0:d; })
				.attr("r", 6)
				.attr("fill", c.c)
				.attr("ix", p+'.'+i)


			c.w.setAttribute('ix',p+'.'+i)
			c.w.onmouseover=function(){
				var ix=this.getAttribute('ix'),a=ix.split('.'),j=sys.output[a[0]],c=j.c[a[1]];
				if(c.lineGraph)try{d3.select(c.lineGraph).attr("stroke-width",c&&c.Kuwait?"6":"4");
				}catch(ex){}
					c.w.bgc=c.w.style.backgroundColor;
					c.w.style.backgroundColor=c.cl2;
				console.log('w.mouseover',arguments,',window.$0=',window.$0=this,ix,a,j,c);
			}
			c.w.onmouseout=function(){
				var ix=this.getAttribute('ix'),a=ix.split('.'),j=sys.output[a[0]],c=j.c[a[1]];
				if(c.lineGraph)try{d3.select(c.lineGraph).attr("stroke-width",c&&c.Kuwait?"4":"2");
				}catch(ex){}
				c.w.style.backgroundColor=c.c;
				//console.log('w.mouseover',arguments,',window.$0=',window.$0=this,ix,a,j,c);
			}
		}
	}
}//function bldCharts
	
,bldCharts_ln2:function bldCharts_ln2(){
	for(var dataIx=0;dataIx<sys.output.length;dataIx++)
	{//function() {console.log('nv.addGraph:func:',arguments)
		var j=sys.output[dataIx],l=j.levels,n=l&&l.length
		j.chart = nv.models.lineChart()
			.options({
				duration: 300,
				useInteractiveGuideline: true
			})
		;
		
		// chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
		j.chart.xAxis
			.axisLabel(l[n-1])//"Time (s)"
			//.tickFormat(d3.format(',.1f'))
			.staggerLabels(true)
		;

		j.chart.yAxis
			.axisLabel(l[1])//l[n-1]//'Voltage (v)'
			.tickFormat(function(d) {
				if (d == null) {
					return 'N/A';
				}
				return d3.format(',.2f')(d);
			})
		;

		//j.data = prepareData();		function prepareData(){	,j=sys.output[dataIx]
		var dn=j&&j.c&&j.c.length,i
		j.chartData=[]
		for( i=0;i<dn;i++)
		{	var c=j.c[i],w=480
			,o={key:j.rows[i],values:[]
				,color:d3.hsl(sys.hsl.h+(360*i)/dn
					,sys.hsl.s,sys.hsl.l+sys.hsl.dl).toString()};
			j.chartData.push(o);
			for(var k=0,kn=c.length;k<kn;k++)
				o.values.push({x:j.headings[k+1],y:c[k]});
		}//for i
		//return r;}//function prepareData()
		/*
		data format:
			array of objects
				{
					area:<bool>							//optional
					,values:[ { x:<int> , y:<num> } ]
					,key: <str>
					,color:<#rrggbb>
					,strokeWidth:<num>					//optional
					,classed:<str:'dashed'>				//optional
					,fillOpacity:<num: 0.0 ... 1.0>		//optional
				}
		*/
		d3.select(j.span).append('svg')
		.attr('style','width:75%;height:50%')
			.datum(j.chartData)
			.call(j.chart);

		nv.utils.windowResize(j.chart.update);

		//return chart;}
		nv.addGraph(j.chart);
	}//for dataIx
}//function bldCharts_ln2

,bldCharts_bar1:function bldCharts_bar1(){}//function bldCharts_bar1

,bldCharts_hBar:function bldCharts_hBar(){}//function bldCharts_bar2

,bldCharts_rdr1:function bldCharts_rdr1(){
 for(var so=sys.output,lv1={},chrtIx=0;chrtIx<so.length;chrtIx++)
 {var chrt=so[chrtIx],lv1Nm=chrt.levels[1],lv1v=chrt.keys[lv1Nm];
	if(! lv1[lv1v]){lv1[lv1v]=chrt;
	chrt.a=[];chrt. LegendOptions=[]
	for(var c=0;c<chrt.rows.length;c++)
	 for(var k=1;k<chrt.headings.length;k++)
	 {	var ai=chrt.a.length,a=chrt.a[ai]=[]
		,m=chrt.rows[c],n=chrt.headings[k] 
		chrt. LegendOptions.push(m+' - '+n)

		for(var i =0;i <so.length;i++)
		if(lv1v==so[i].keys[lv1Nm])
			a.push({axis:so[i].keys[so[i].levels[0]]//TODO: show indi name and tooltip
			, value:so[i].tree[m][n]})
	}
	var w = 500,
		h = 500;

	var colorscale = d3.scale.category10();


	//Options for the Radar chart, other than default
	chrt. mycfg = {
	  w: w,
	  h: h,
	  //maxValue: 0.6,
	  levels: 6,
	  ExtraWidthX: 300
	}

	//Call function to draw the Radar chart
	//Will expect that data is in %'s
	RadarChart.draw(chrt.span//"#chart"
		, chrt.a, chrt.mycfg);

	////////////////////////////////////////////
	/////////// Initiate legend ////////////////
	////////////////////////////////////////////

	chrt. svg = d3.select('#body')
		.selectAll('svg')
		.append('svg')
		.attr("width", w+300)
		.attr("height", h)

	//Create the title for the legend
	chrt. text = chrt.svg.append("text")
		.attr("class", "title")
		.attr('transform', 'translate(90,0)') 
		.attr("x", w - 70)
		.attr("y", 10)
		.attr("font-size", "12px")
		.attr("fill", "#404040")
		.text('.')//"What % of owners use a specific service in a week");
			
	//Initiate Legend	
	chrt. legend = chrt.svg.append("g")
		.attr("class", "legend")
		.attr("height", 100)
		.attr("width", 200)
		.attr('transform', 'translate(90,20)') 
		;
	//Create colour squares
	chrt.legend.selectAll('rect')
	  .data(chrt.LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	chrt.legend.selectAll('text')
	  .data(chrt.LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	
	}}//for chrtIx
}//function bldCharts_rdr1

,bldCharts_rdr2:function bldCharts_rdr2(){}//function bldCharts_rdr2

}//sys version 2 , 2016.07.13 11:19

db={sectors:{},dbLvls:['indi','cntry','yr','vars']}//'sectr',

window.xls=xls={sectrName:db.sectrName=sys.sectrName='edb'}