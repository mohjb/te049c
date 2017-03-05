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