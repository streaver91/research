%let wrds=wrds.wharton.upenn.edu 4016;
options comamid=TCP remote=wrds;
signon username=_prompt_;

libname nre 'U:\NRE5110';
rsubmit;
libname ccl '/sastemp7/';

rsubmit;
proc sql;
	create table ccl.raw 
	as select distinct a.gvkey, a.fyear, a.dlc, a.dltt, a.at, a.ib, a.dp, a.ppent, a.prcc_f, a.csho, a.ceq, a.txdb, b.sic
	from comp.funda (where=(consol='C' and popsrc='D' and indfmt='INDL' and datafmt='STD' 
							and gvkey~='' and fyear~=. and at~=. and capxv~=. and sppe~=. 
							and ib~=. and dp~=. and prcc_f~=. and csho~=.)) as a
	inner join comp.names (where=(sic>'1999' and sic<'4000')) as b
	on a.gvkey=b.gvkey;
quit;
proc download data=ccl.raw out=nre.raw; run;
endrsubmit;
proc export data=nre.raw outfile="U:\NRE5110\raw0908.dta" replace; run;
