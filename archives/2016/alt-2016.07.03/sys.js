sys=
{
did:function did(i){return document.getElementById(i);}
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

	,bldLists:function(sectrName,sectrLookup){//sectrLookup is <sector>.lookup
		var div=sys.did(sectrName+'.lookups');
		sys.bldLists.chngFltr=function chngFltr(evt){
			var t=evt.target||event.srcElement
			,auto=sys.did('autoQuery')
			if(auto&&auto.checked)
				sys.clkQuery()
				}//function chngFltr
		for(var lvl in sectrLookup)
		{	var x=sectrLookup[lvl],d=sys.dce(
											 'div',div,{clss:'stylDiv',id:'div-'+lvl})
			if(lvl=='code')
			{	//add search filter
				var inp=sys.dci(sectrName+'-'+lvl+'-searchFilter',d,{typ:'search',lbl:'filter'})
				inp.oninput=
				function onInput(evt)
				{//console.log('filter.oninput:',evt,this)
					var str=this.value,l=str.toLowerCase(),y,v,i
					,results=this.parentElement.results
					,x=this.parentElement.ol.firstElementChild
					results.innerHTML=''
					if(str && str.length>1)while(x){
						v=x.firstChild.nextElementSibling.firstChild.data
						i=v.toLowerCase().indexOf(l)
						if(i!=-1)
						{y=x.cloneNode(true);
							y.firstChild.nextElementSibling.innerHTML=v.substring(0,i)
							+"<i style=\"text-decoration: underline;font-weight: 800; background-color: yellow; \">"
							+str+"</i>"+v.substring(i+str.length)
							//y.firstChild.chng=y.firstChild.onchange
							y.firstChild.onchange=function(){
								//if(this.chng)this.cjng()
								var a=document.getElementsByName(this.name)
								for(var j in a){var v=a[j];
									if(v!=this)
										v.checked=this.checked;
								}
							}
							results.appendChild(y);
						}x=x.nextElementSibling
					}
				}//function
				d.results=sys.dce('ul',d)
				sys.cc('All Indicators',d,d.ol=sys.dce('ol',d))
				for(var e in x)
				{	var n=x[e],m=sectrName+'.'+i+'.'+n.code
					,inp=sys.dci(m,sys.dce('li',d.ol,{clss:'stylLI'})
								 ,{typ:'checkbox',id:m,lbl:n.name,clss:'filter',chng:sys.bldLists.chngFltr})
					inp.setAttribute('entty',inp.entty={e:lvl,n:n.code})
				}//for e
			}else
			{	var ol=sys.dce('ol',d)
				for(var e in x)
				{	var n=x[e],m=sectrName+'.'+i+'.'+n
					,inp=sys.dci(m,sys.dce('li',ol,{clss:'stylLI'})
								 ,{typ:'checkbox',id:m,lbl:n,clss:'filter',chng:sys.bldLists.chngFltr})
					inp.setAttribute('entty',inp.entty={e:lvl,n:n})
				}//for e
			}
		}//i in lookup
		var a={indi:1,'cntry':2,'yr':3,'vars':4}
		,c,inp,m
		,d=sys.dce('div',div,{clss:'stylDiv',id:'div-tblOrder'})
		for(var i in a)
			for(var j in a)
				if(j!=i)
					for(var k in a)
						if(k!=i && k!=j)
							for(var l in a)
								if(l!=i && l!=j && l!=k)
								{c=[i,j,k,l];m=c.join(',');
									inp=sys.dci('lvls',sys.dce('li',d,{clss:'stylLI'})
												,{typ:'radio',id:m,lbl:m,clss:'tblOrder'
												,styl:'display:inline',chng:sys.bldLists.chngFltr})
									inp.setAttribute('entty',inp.entty=c)
								}
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
		}if(!sectr)sectr=db.sectors.gci
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
		d=document.getElementsByClassName('tblOrder')
		for(var i in d)
			if(d[i].checked && typeof(d[i])!='function')
			{order=d[i].id;levels=d[i].entty||d[i].getAttribute('entty')}
		
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
		sys.bldOutput('GCI',d,levels)//sys.bldChart('GCI',d,levels)
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
		var div=sys.did(sectrName+'.output'),k={},k0,k1,tre,j;
		div.innerHTML='';sys.output=[]
		for( k[levels[0]] in dataset)try{
			var sct=dataset[k0=k[levels[0]]]
			for( k[levels[1]] in sct)try{
				sys.dce('h2',div,{t:k0})
				sys.dce('h3',div,{t:k1=k[levels[1]]})
				j=sys.tree2tbl(tre=sct[k1])// j.rows , j.headings ,j.c is the 2d data,
				sys.output.push(j)
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
	var dataIx=0;

	for(dataIx=0;dataIx<sys.output.length;dataIx++)
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
            .datum(j.chartData)
            .call(j.chart);

        nv.utils.windowResize(j.chart.update);

        //return chart;}
		nv.addGraph(j.chart);
	}//for dataIx
}//function bldCharts

,bldCharts0:function bldCharts0(){
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
		//for(var h=0;h<360;h+=24){var x=d3.hsl(h,1,0.8074);s='<span style="background-color:'+x+'">'+x+'<hr/></span><br/>';document.body.innerHTML+=s;console.log(h,x,s);}
	}
}//function bldCharts

	
}//sys