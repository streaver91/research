libname nre 'U:\nre';

proc sql;
	create table nre.hw2raw as
	select f1.*, f2.ppent as lppent,
		(f1.dlc + f1.dltt) / f1.at as leverage,
		(f1.ib + f1.dp) / f2.ppent as cashflow,
		(f2.ib + f2.dp) / f2.ppent as lcashflow,
		f1.ppent / f1.at as tangibility,
		log(f1.at) as size,
		(f1.at + f1.prcc_f * f1.csho - f1.ceq - f1.txdb) / f1.at as q,
		(f2.at + f2.prcc_f * f2.csho - f2.ceq - f2.txdb) / f2.at as lq,
		(f1.capxv - f1.sppe) / f2.ppent as investment,
		(3.3 * f1.pi + f1.sale + 1.4 * f1.re + 1.2 * (f1.act - f1.lct)) / f1.at as zscore
	from nre.funda as f1, nre.funda as f2
	where f2.gvkey = f1.gvkey and f1.fyear = f2.fyear + 1
		and f1.fyear >= 1990 and f1.fyear <= 2012
		and f1.sic > 1999 and f1.sic < 4000
		and f1.gvkey is not null and f1.fyear is not null
		and f1.dlc is not null and f1.dltt is not null
		and f1.at is not null and f1.at > 0
		and f1.ib is not null and f1.dp is not null
		and f1.ppent is not null and f2.ppent is not null
		and f1.ppent > 0 and f2.ppent > 0
		and f1.prcc_f is not null and f1.csho is not null
		and f1.ceq is not null and f1.txdb is not null
		and f1.capxv is not null and f1.sppe is not null
		and f1.pi is not null and f1.sale is not null
		and f1.re is not null and f1.act is not null
		and f1.lct is not null
		and f2.ib is not null and f2.dp is not null
		and f2.at is not null and f2.prcc_f is not null
		and f2.csho is not null and f2.ceq is not null
		and f2.txdb is not null;
quit;

proc export data=nre.hw2raw outfile="U:\nre\hw2raw.dta" replace; run;
proc export data=nre.hw2raw outfile="U:\nre\hw2raw.dta" replace; run;


