<%@ page import="java.io.File,java.util.Map,java.util.List,org.kisr.adoqs.eu59s.TL"
%><%!
Object xlsx(File f){long fileSz=f.length();
	if(fileSz<(25*1024))
	{Map m=null;
		
	return m;
	}
	else
	{
	return "fileSz("+fileSz+") > 25k";
	}
}//xlsx(File)
%><%TL tl=null;try{tl=TL.Enter(request,out);
File rt=new File("D:/apache-tomcat-8.0.15/webapps/ROOT/TE049C/");
String x=tl.req("x");
if(x!=null){
response.setContentType("text/json");
tl.log("xl.jsp:xhr:",x);
if("getFile".equals(x)){
	String path=tl.req("path");
	File f=new File(rt,path);
	boolean isDir=f.isDirectory();

	Map m=TL.Util.mapCreate(
		"name",f.getName()
		,"isDir",isDir,"f",f);
	if(isDir){
		List dir=TL.Util.lst();
		File[]a=f.listFiles();//"sub",f.list(),
		for(File i:a)
			dir.add(TL.Util.mapCreate(
			"isDir",i.isDirectory()
			,"name",i.getName()
			,"f",i
			));
		m.put("dir",dir);
		}
		else {
		if(path.endsWith(".xlsx"))
			m.put("xlsx",xlsx(f));
		}
	tl.response.put("return",m);
}
tl.getOut().o(tl.response);
tl.log("xl.jsp:xhr-response:",tl.jo()//.clrSW()
	.o(tl.response).toString());
	//tl.getOut().flush();
	out.flush();
return;
}
%>
<script>
window.app=app={xhr:function xhr(dta,h){
	var x=new XMLHttpRequest()
	x.open('POST','',false)//http://localhost:8080/TE049C/xl.jsp')
	x .setRequestHeader("Content-Type", "text/json")//;charset=UTF-8");
	//if(h)x
	console.log('xhr:',dta)
	x.send(dta);
	console.log('xhr=',x)
	return x;
}//function xhr
,did:function did(i){return document.getElementById(i);}
,dce:function dce(n,p,o){//3rd param is either text, or, obj with props:t,id,styl,attribs,clss,clk,mo
		var n=document.createElement(n);
		if(o)
		{var t=typeof(o)=='string'?o:(o&&o.t)
			if(t!=undefined)
				app.dct(t,n);
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
		var r=app.dce('input',0,o),lbl;//0,o&&o.id,o&&o.styl,attribs,cl,clk);
		r.name=nm;if(o)
		{r.type=(o&&o.typ)||'text';
			if(o.val!=undefined)r.value=o&&o.val;
			if(o.chkd)r.checked='checked'
				if(o.chng)
					r.onchange=o.chng;
			if(o.lbl)lbl=app.dce('label',0,
								 {	t:o.lbl
								 ,id:o.id?o.id+'.lbl':null
								 ,attribs:{"for":o.id}
								 });
		}
		if(p){p.appendChild(r);
			if(lbl)p.appendChild(lbl);}
		return r;}
,expnd:function expnd(t){
//refresh
//rename
//view-txt
//view-img
//view-poi
//delete
//new-subfolder
//new-txt
//new--xl
//cp
//mv
console.log('expnd:t=',t,t.pth,t.getAttribute);
	if(!t.getAttribute && this.getAttribute)t= this
	var li=t.nodeName=='LI'?t:t.parentNode
	,x=li.getElementsByTagName('ul')
	,img=['icon/folder2-.png','icon/folder1-.png']
	if(x && x.length>0){
		x=x[0].style;
		li=x.display
		t.firstChild.src=img[li?1:0]//li.style.listStyleImage=img[t?0:1]
		x.display=li=='none'?'':'none';
		return;}
	var p=t.pth||t.getAttribute("pth")
	,s=t.dir||t.getAttribute("dir")
	if(s=='null')return

	var x=app.xhr(JSON.stringify({x:'getFile',path:p||''}))
	,rsp=x.responseText
	,r= t.r= rsp?JSON.parse(rsp):{}
	s=r&&r.return&&r.return.dir
	t.setAttribute("dir",t.dir=s==null?(s="null"):s)
	if(s=='null')return
	var ul=app.dce('ul',li)
	//li.style.listStyleImage=img[0]
//,ext={'.xlsx':'xlsx.png','.js':'js.png','.pdf':'pdf.png','.html':'html.png','.rar':'rar.png','.zip':'zip.png','.gz':'gz.png','.png':'png.png','.jsp':'jsp.png'}

	if(s){if(p)p=p+'/';else p='';for(var i=0;i<s.length;i++)
		{t=app.dce('span',app.dce('li',ul,{styl:'list-style-type: none'}),
			{t:s[i].name,clk:app.expnd
				,attribs:{pth:p+s[i].name
					,isDir:s[i].isDir
					,info:s[i]}})
			if(s[i].isDir)
				t.innerHTML='<img src="'+img[0]+'"/>'+t.innerHTML
			else {	x=s[i].name .lastIndexOf('.')
				if(x!=-1)t.innerHTML='<img src="icon/'+s[i].name.substring(x)+'.png"/>'+t.innerHTML;
				else t.innerHTML='<img src="icon/icon.png"/>'+t.innerHTML;
			}//if(s[i].name.endsWith(".xlsx"))t.innerHTML='<img src="xlsx.png"/>'+t.innerHTML
			
		}
	}
}//function expnd
}//app
serverTime=<%=System.currentTimeMillis()%>

</script>
<ul>
	<li><span onclick="app.expnd(this)" id="Root">Root</span></li>
</ul>
<%
}finally{TL.Exit();}
%>