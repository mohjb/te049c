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