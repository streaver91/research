data work.t2;
	set work.treatment;
	rename var1=ticker;
	rename var2=treatment;
	if var1='SEM' then delete;
	if var3='BR10';
run;

proc sql;
	create table work.ticEffect as
	select * from Br1312, t2 where t2.ticker = Br1312.comp;
quit;

proc export data=work.ticEffect outfile="\\rschfs1x\usercl\fall\jl2922_NRE5110\Downloads\nre\ticEffect.dta" replace; run;

/* proc export data=work.t2 outfile="\\rschfs1x\usercl\fall\jl2922_NRE5110\Downloads\nre\t2.dta" replace; run;
 proc export data=work.Br1312 outfile="\\rschfs1x\usercl\fall\jl2922_NRE5110\Downloads\nre\Br1312.dta" replace; run;
