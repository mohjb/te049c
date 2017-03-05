MorseCode={
m:{A:'.-' ,B:'-...' ,C:'-.-.' ,D:'-..' ,E:'.' ,F:'..-.' ,G:'--.' ,H:'....' ,I:'..' ,J:'.---' ,K:'-.-' ,L:'.-..' ,M:'--' ,N:'-.' ,O:'---' ,P:'.--.' ,Q:'--.-' ,R:'.-.' ,S:'...' ,T:'-' ,U:'..-' ,V:'...-' ,W:'.--' ,X:'-..-' ,Y:'-.--' ,Z:'--..' ,1:'.----' ,2:'..---' ,3:'...--' ,4:'....-' ,5:'.....' ,6:'-....' ,7:'--...' ,8:'---..' ,9:'----.' ,0:'-----',' ':' '}
,r:{}
,init:function(){var r=this.r,m=this.m;for(var k in m)r[m[k]]=k}
,e:function(p){var b=[],m=this.m;for(var i=0;i<p.length;i++)
	{var c=p[i],x=m[c];b.push(x?x:'?');b.push(' ');}
	return b.join('');}
,d:function(p){var r=this.r,b=[]
	,a=p&&p.split?p.split(' '):''
	if(!r||!r.A)this.init();
	for(var c,x,i=0;i<a.length;i++)
	{c=a[i];x=c==''?' ':r[c];
		b.push(x);}
	return b.join('');}
}//MorseCode
