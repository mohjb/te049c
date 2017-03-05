function init(){
	var txt=document.getElementById('src').innerHTML,sr=3,sc=4,yid=6
	,a=txt.split('\n'),sql=[],sq2=[],h=a[0].split('\t');
	for(var i=sr;i<a.length;i++)
	{var row=a[i].split('\t'),x=row[0];
		for(var j=sc;j<row.length;j+=2)
		{var c=h[j],rank=row[j]
			,val=row[j+1]
			,br=(rank!='')&&(!isNaN(rank))
			,bv=(val !='')&&(!isNaN(val ));
		 if(c&&x&&(br || bv))
			sql.push(
			//'update "variables" set "rank"='+rank+' "value"='+val+' where "yearID"='+yid+' and "indexId"='+x+' and "countryId"='+c
			'update "variables" set "rank"='+(br?rank:'null')+' , "value"='+(bv?val:'null')
			+' where "yearId"='+yid+' AND "indexId"='+x+' and "countryId"='+c+';'
			)
	//update "variables" set "rank"=11 , "value"=11 where "yearId"=20 AND "indexId"=1 and "countryId"=100;
		 else if(c&&x)
			sq2.push('delete from "variables" where "yearId"='+yid
				+' AND "indexId"='+x+' and "countryId"='+c
				+'; -- set "rank"='+rank+' , "value"='+val)
		}
	}
	document.getElementById('output').innerHTML=sql.join('\n')+'\n---\n'+sq2.join('\n')
}

function init2(){
	var txt=document.getElementById('src').innerHTML
	,startRow=3,startColumn=4,yearId=6,no=47315
	,a=txt.split('\n'),sql=[],sq2=[],heading=a[0].split('\t');
	for(var i=startRow;i<a.length;i++)
	{var row=a[i].split('\t'),index=row[0];
		for(var j=startColumn;j<row.length;j+=2)
		{var country=h[j],rank=row[j]
			,val=row[j+1]
			,br=(rank!='')&&(!isNaN(rank))
			,bv=(val !='')&&(!isNaN(val ));
		 if(country&&index&&(br || bv))
			sql.push('insert into "x" values('
			+(no++)+','
			+(br?rank:'null')+','
			+(bv?val:'null')+',now(),now(),'+country+','+index+','+yearId+');'
			)
	//update "variables" set "rank"=11 , "value"=11 where "yearId"=20 AND "indexId"=1 and "countryId"=100;
		 else// if(c&&x)
			sq2.push('-- "indexId"='+index+' and "countryId"='+country
				+'; -- set "rank"='+rank+' , "value"='+val)
		}
	}
	document.getElementById('output').innerHTML=sql.join('\n')+'\n---\n'+sq2.join('\n')
	
/*
--update "variables" set "rank"=42 , "value"=5.0 where "yearId"=6 AND "indexId"=6 and "countryId"=11;
select * from "variables" where "yearId"=6 AND "indexId"=51;--indexId=38 or 50 or 51
*/
	
	
/*
select count(*),min(id),max(id) from x where "yearId"=6 and "indexId"<159 group by "id"/47314;

select "t1"."id","t2"."id",
"t1"."rank","t2"."rank",
"t1"."value","t2"."value",
"t1"."countryId","t1"."indexId"
from
"x" as "t1","x" as "t2"
where 
"t1"."id"<47315
and "t2"."id">47314
and "t1"."yearId"=6
and "t2"."yearId"=6
and "t1"."countryId"="t2"."countryId"
and "t1"."indexId"="t2"."indexId"
and "t1"."indexId"<159
;

create table x2 as select "t1"."id" as "i1","t2"."id" as "i2",
"t1"."rank" as "r1","t2"."rank" as "r2",
"t1"."value" as "v1","t2"."value" as "v2",
"t1"."countryId","t1"."indexId"
from
"x" as "t1","x" as "t2"
where 
"t1"."id"<47315
and "t2"."id">47314
and "t1"."yearId"=6
and "t2"."yearId"=6
and "t1"."countryId"="t2"."countryId"
and "t1"."indexId"="t2"."indexId"
-- and "t1"."indexId"<159
;

select "id" ,
"rank",
"value",
"countryId",
"indexId"
from
"x"
where 
"id"<47315
and "indexId"<159 
and "yearId"=6
and "id" not in (select "i1" from "x2" )
;
--returns no intersection


select "id" ,
"rank",
"value",
"countryId",
"indexId"
from
"x"
where 
"id">47314
and "indexId"<159 
and "yearId"=6
and "id" not in (select "i2" from "x2" )
;


create table y as table x;


delete from y where "id">47314;

update "y" set
"rank"="x2"."r2",
"value"="x2"."v2"
from "x2"
where "x2"."i1"="y"."id"

select "x2"."i1" ,"x2"."i2" ,"y"."id" ,
"x2"."r1" ,"x2"."r2","y"."rank" ,
"x2"."v1" ,"x2"."v2" ,"y"."value" ,
"x2"."countryId","x2"."indexId",
"y"."countryId","y"."indexId"
from
"x2" ,"y"
where 
"x2"."i1"="y"."id"--<47315

create table x3 as(
select "id" ,
"rank",
"value",
"countryId",
"indexId"
from
"x"
where 
"id">47314
and "indexId"<159 
and "yearId"=6
and "id" not in (select "i2" from "x2" )
);

--	select max("id") from "variables"	--returns 47314

[["id","rank","value","createdAt","updatedAt","countryId","indexId","yearId"],[
47810,	37,		2.3		,now()		,now()		,11			,38		,6],[
47811,	18,		3.5		,now()		,now()		,2			,38		,6],[
47812,	7,		5.6		,now()		,now()		,3			,38		,6],[
47813,	25,		5.7		,now()		,now()		,4			,38		,6],[
47814,	34,		5.1		,now()		,now()		,5			,38		,6],[
47815,	15,		4.98	,now()		,now()		,6			,38		,6],[
47816,	21,		3		,now()		,now()		,7			,38		,6],[
47817,	1,		5.7		,now()		,now()		,8			,38		,6],[
47818,	69,		2.7		,now()		,now()		,9			,38		,6],[
47819,	12,		null	,now()		,now()		,10			,38		,6],[
47820,	65,		null	,now()		,now()		,1			,38		,6],[
47821,	27,		null	,now()		,now()		,12			,38		,6],[
47822,	26,		null	,now()		,now()		,13			,38		,6],[
47823,	28,		4		,now()		,now()		,14			,38		,6],[
47824,	6,		null	,now()		,now()		,15			,38		,6]]


SELECT 
  y.id, 
  y.rank, 
  y.value, 
  y."countryId", 
  y."indexId", 
  y."yearId"
FROM 
  public.y 
where "y"."yearId"=6 and "y"."indexId"=38 and(
"y"."countryId"=11	 or
"y"."countryId"=2	 or
"y"."countryId"=3	 or
"y"."countryId"=4	 or
"y"."countryId"=5	 or
"y"."countryId"=6	 or
"y"."countryId"=7	 or
"y"."countryId"=8	 or
"y"."countryId"=9	 or
"y"."countryId"=10	 or
"y"."countryId"=1	 or
"y"."countryId"=12	 or
"y"."countryId"=13	 or
"y"."countryId"=14	 or
"y"."countryId"=15	)



insert into "y" values(
47315,	37,		2.3		,now()		,now()		,11			,38		,6),(
47316,	18,		3.5		,now()		,now()		,2			,38		,6),(
47317,	7,		5.6		,now()		,now()		,3			,38		,6),(
47318,	25,		5.7		,now()		,now()		,4			,38		,6),(
47319,	34,		5.1		,now()		,now()		,5			,38		,6),(
47320,	15,		4.98	,now()		,now()		,6			,38		,6),(
47321,	21,		3		,now()		,now()		,7			,38		,6),(
47322,	1,		5.7		,now()		,now()		,8			,38		,6),(
47323,	69,		2.7		,now()		,now()		,9			,38		,6),(
47324,	12,		null	,now()		,now()		,10			,38		,6),(
47325,	65,		null	,now()		,now()		,1			,38		,6),(
47326,	27,		null	,now()		,now()		,12			,38		,6),(
47327,	26,		null	,now()		,now()		,13			,38		,6),(
47328,	28,		4		,now()		,now()		,14			,38		,6),(
47329,	6,		null	,now()		,now()		,15			,38		,6)
;



*/


}


/*
import org.postgresql.ds.PGPoolingDataSource;
//No-Pooling	org.postgresql.ds.PGSimpleDataSource

PGPoolingDataSource source = new PGPoolingDataSource();
source.setDataSourceName("A Data Source");
source.setServerName("localhost");
source.setDatabaseName("test");
source.setUser("testuser");
source.setPassword("testpassword");
//source.initialConnections(<int>);
source.setMaxConnections(10);


Connection conn = null;
try {
    conn = source.getConnection();
    // use connection
} catch (SQLException e) {
    // log error
} finally {
    if (conn != null) {
        try { conn.close(); } catch (SQLException e) {}
    }
}

SELECT 
"variables"."id",
"variables"."indexId",
"variables"."countryId",
"variables"."rank",
"variables"."value",
FROM 
  public.indices ,
  public.variables
where 
"variables"."indexId"="indices"."id"
and "indices"."sectorId"=1
and "variables"."yearId"=6
order by 
"variables"."indexId"
,"variables"."countryId";


update "y" set
"y"."rank"="x2"."r2",
"y"."value"="x2"."v2"
from "x2"
where "x2"."i1"="y"."id"




select "x2"."id" ,"x2"."i2" ,"y"."id" ,
"x2"."r1" ,"x2"."r2","y"."rank" ,
"x2"."v1" ,"x2"."v2" ,"y"."value" ,
"x2"."countryId","x2"."indexId",
"y"."countryId","y"."indexId"
from
"x2" ,"y"
where 
"x2"."i1"="y"."id"


Hello,
my old domain name (theblue.one) expired and I did an add-on for the new domain name (i-1.io)

now JSP (Java server pages) DOES NOT WORK

whenever I type a url of a jsp, the jsp content is shown on the browser as thou a plain text file, so its safe to assume that the RESIN server Does Not Recognise JSP files

I need JSP to execute 

Are there configuration preparations for RESIN with the change of the domain name?

Please advice.

note:
The very first domain name I used was js4d.net in 2009
 and my login is xnsgb0

Mohamad J.B. 
443.529.9994
mohjb@yahoo.com

*/