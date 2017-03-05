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
