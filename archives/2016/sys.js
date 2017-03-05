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
	  , pr:parent domÃ‚Â­element , basedÃ‚Â­on/uses dce
	  */bldTbl:function sys_BuildHtmlTable(params,pr){
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
	
	,keys:function keys(o){var a=[];for(var i in o)a.push(i);return a;}
	
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
				var ak=sys.keys(a),bk=sys.keys(b),n
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
			}var fltr={f:filter,order:order}
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
		sys.bldOutputTbl('GCI',d,levels)//sys.bldChart('GCI',d,levels)
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
	
	,bldOutputTbl:function(sectrName,dataset,levels){
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
				j.data4d3	=sys.tree2data(//		j.data4d3 is for the JavaScript-library d3
				j.tree		=tre	,
				j.levels	=levels	,
				j.keys		=k		)
				sys.dce('hr',div)
			}catch(ex){
				console.error('bldOutputTbl:k1=',k1,' ,k0=',k0,ex)}//for section
		}catch(ex){
			console.error('bldOutputTbl:k0=',k0,ex)}//for section
	}//bldOutputTbl
	
	,mapTreeLevels:function/**
							newFormatLevels:array of names of levels, in the new order of levels
							the names of levels in dataset are the same as db.dbLvls
							this implementation is better than mapDatasetLevels
							because this implementation is dynamic in terms
							of length of levels	*/
	mapTreeLevels(tree,newFormatLevels){
		var d=db.dbLvls//oldPath
		,p=newFormatLevels//newPath
		, k={}//keys
		,dsmbl=[tree]//array of levels of disassebmly
		,asmbl=[{}]//array of levels of assembly
		for(var i in d)
			k[d[i]]=0;
		function assemble(i)
		{	asmbl[i]=asmbl[i-1][k[p[i]]]
			if(!asmbl[i])
				asmbl[i]=asmbl[i-1][k[p[i]]]={}
			if(i<p.length)
				assemble(i+1);
			else
				asmbl[i][k[p[i]]]=dsmbl[i]
				}//function assemble
		function disassemble(i){
			if(i==p.length)
				return assemble(1)
				for(k[d[i]] in dsmbl[i])
				{	dsmbl[i+1]=dsmbl[i][k[d[i]]]
					disassemble(i+1)
				}
		}//function disassemble
		(0)
		return asmbl[0]
	}//function mapTreeLevels
	
	,selectedFilter:function selectedFilter(){
		var d=document.getElementsByClassName('filter')
		,filter={code:{},cntry:{},yr:{},vars:{}}
		for(var i in d)if(d[i].checked && typeof(d[i])!='function')
		{var x=d[i],y=x.entty||x.getAttribute('entty')
			,e=y&&y.e,n=y&&y.n,v=x.value;//x.name
			if(e&&n&& filter[e])
				filter[e][n&&n.code?n.code:n]=v;
		}
		return filter
	}//function selectedFilter
	
	,selectedLevels:function selectedLevels(p){
		var d=document.getElementsByClassName('tblOrder')
		for(var i in d)
			if(d[i].checked && typeof(d[i])!='function')
			{var b=d[i],levels=
				b.entty||b.getAttribute('entty')
				if(p){p.b=b;p.levels=levels;}
				return levels;}
	}//function selectedLevels
	
	,filterTree:function filterTree(tree,filter,lvl){
		var a=[{}],t=[],i=[];
		if(!lvl)lvl=['code','cntry','yr','vars']
			if(!filter)filter=selectedFilter()
				if(!tree)tree=db.sectors.gci;
		for( i[0] in filter[lvl[0]])
		{t[0]=tree[i[0]];a[1]=a[0][i[0]]
			if(!a[1])a[1]=a[0][i[0]]={}
			for( i[1] in filter[lvl[1]])
			{t[1]=t[0][i[1]];a[2]=a[1][i[1]];
				if(!a[2])a[2]=a[1][i[1]]={}
				for( i[2] in filter[lvl[2]])
				{t[2]=t[1][i[2]];a[3]=a[2][i[2]]
					if(!a[3])a[3]=a[2][i[2]]={}
					for( i[3] in filter[lvl[3]])
					{t[3]=t[2][i[3]]
						a[3][i[3]]=t[3]
					}
				}
			}
		}//for code
		return a[0];
	}//function filterTree

	,tree2data:function/*returns an array of objects,
		each object has property-names used from the string items of array parameter levels
		each property-value are the keys in the nested-objects in tree

sys.tree2data(
{"Bahrain":{"2013":32,"2014":29,"2015":26}
,"Kuwait":{"2013":49,"2014":55,"2015":56}
,"Oman":{"2013":13,"2014":24,"2015":31}}
,["indi","vars","cntry","yr"]
,{"indi":"A.01","vars":"Rank"}
)

j=sys.output[0] // should use for(var i =0;i<sys.output.length;i++)
d=j.data4d3
s=JSON.stringify(d)//yields data

data=[{"indi":"1.01","vars":"Rank","cntry":"Bahrain","yr":"2013","value":23},{"indi":"1.01","vars":"Rank","cntry":"Bahrain","yr":"2014","value":29},{"indi":"1.01","vars":"Rank","cntry":"Bahrain","yr":"2015","value":29},{"indi":"1.01","vars":"Rank","cntry":"Kuwait","yr":"2013","value":39},{"indi":"1.01","vars":"Rank","cntry":"Kuwait","yr":"2014","value":51},{"indi":"1.01","vars":"Rank","cntry":"Kuwait","yr":"2015","value":59},{"indi":"1.01","vars":"Rank","cntry":"Oman","yr":"2013","value":21},{"indi":"1.01","vars":"Rank","cntry":"Oman","yr":"2014","value":30},{"indi":"1.01","vars":"Rank","cntry":"Oman","yr":"2015","value":33}]

svg=d3.select(j.span).append('svg')

		*/sys_tree2data(tree,levels,keys){
			if(!tree)
				tree=db.sectors.gci;
			if(!levels)
				levels=db.dbLvls;
			var a=[],v,p
			,l=levels,n=l.length,n2=n-2
			,t={ i	:0	//t is a stackFrame
				,k	:0
				,o	:tree
				,keys:sys.keys(tree)
			}
			,stack=[keys,keys,t]//.fill(t,0,n2)
			while(stack.length>n2)try{
				while( stack.length < n && t.i<t.keys.length){
					p=t;
					p.k=p.keys[p.i];
					t={  o	 :p.o[p.k]
						,i	 :0
					}
					t.keys=sys.keys(t.o)
					t.k=t.keys[t.i]
					stack.push(t);
				}
				if( stack.length >= n ){
					v={};
					for(var i =0;i<stack.length;i++)
					{	p=stack[i]
						v[l[i]]=p.k||p[l[i]]
					}
					v.value=t.o[t.k]
					t.i++;
					t.k=t.keys[t.i]
					a.push(v)
				}
				if( t.i>=t.keys.length ){
					stack.pop();
					t=stack[stack.length-1];
					if(t){t.i++;
						t.k=t.keys[t.i];}
				}
			}//while stack
			catch(ex){
				console.error('sys.tree2data:stack=',stack
					,',t=',t,',a=',a,',arguments=',arguments,ex);}
			return a;
		}//function sys_tree2data
	
	,t2d:function(tree,levels,keys){
		var l=levels,n=l.length
		,k=keys
		,dsmbl=[tree,tree,tree]//array of levels of disassebmly
		,a=[]//the array that this method returns, an array of data, each datum will be a point on a plot/chart
		function disassemble(i){
			for(k[l[i]] in dsmbl[i])
			{	dsmbl[i+1]=dsmbl[i][k[l[i]]]
				if(i+1==n)
				{	var o={data:dsmbl[i+1]}
					for(var j in l)
						o[l[j]]=k[l[j]]
					a.push(o)
				}//if i+1 == l.len
				else disassemble(i+1)
			}//for k
		}//function disassemble
		(2)
		return a
	}//function t2d

	,filterDbSheets:function(dbSctr,filter,rows,cols,k,l){
		var a=[]
		
		return a;
	}//function filterDbSheets
	
}//sys