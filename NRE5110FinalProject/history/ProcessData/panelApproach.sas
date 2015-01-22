libname tic 'E:\NRE5110FinalProject\ProcessData\lib';

proc sql;
	create table tic._Br_s1 as
	select 1 as season, *
	from tic.Br_2013sep;
quit;

proc sql;
	create table tic._Br_s2 as
	select 2 as season, *
	from tic.Br_2013dec;
quit;

proc sql;
	create table tic._Br_s3 as
	select 3 as season, *
	from tic.Br_2014mar;
quit;

proc sql;
	create table tic._Br_s4 as
	select 4 as season, *
	from tic.Br_2014jun;
quit;

proc sql;
	create table tic._Br_s_all as
	select * from tic._br_s1
	union all
	select * from tic._br_s2
	union all
	select * from tic._br_s3
	union all
	select * from tic._br_s4;
quit;

* drop slow update firms;
proc sql;
	create table tic._Br_s_all_goodcomp as
	select r2.comp as goodcomp
	from tic._br_s_all as r1, tic._br_s_all as r2
	where r1.season = 3 and r2.season = 4 and r1.comp = r2.comp and r1.total_revenue <> r2.total_revenue and r1.gross_profit <> r2.gross_profit;
quit;

proc sql;
	create table tic._Br_panel_all as
	select *, log(rep.total_assets) as log_at, rep.total_cash_flows_from_financing / rep.total_assets as cf2at
	from tic._Br_s_all as rep, tic.panel_tic_all as trt, tic._Br_s_all_goodcomp as gc
	where trt.season = rep.season and trt.tic = rep.comp and rep.total_revenue <> 0 and total_assets > 0 and gc.goodcomp = trt.tic;
quit;

proc sql;
	create table tic._br_panel_rdd30 as
	select *, log(rep.total_assets) as log_at, rep.total_cash_flows_from_financing / rep.total_assets as cf2at
	from tic._Br_s_all as rep, tic.panel_tic_rdd30 as trt, tic._Br_s_all_goodcomp as gc
	where trt.season = rep.season and trt.tic = rep.comp and rep.total_revenue <> 0 and total_assets > 0 and gc.goodcomp = trt.tic;
quit;

proc sql;
	create table tic._br_panel_rdd30_placebo as
	select *, log(rep.total_assets) as log_at, rep.total_cash_flows_from_financing / rep.total_assets as cf2at
	from tic._Br_s_all as rep, tic.panel_tic_rdd30_placebo as trt, tic._Br_s_all_goodcomp as gc
	where trt.season = rep.season and trt.tic = rep.comp and rep.total_revenue <> 0 and total_assets > 0 and gc.goodcomp = trt.tic;
quit;

proc export data=tic._Br_panel_all outfile="E:\NRE5110FinalProject\ProcessData\lib\_Br_panel_all.dta" replace; run;
proc export data=tic._Br_panel_rdd30 outfile="E:\NRE5110FinalProject\ProcessData\lib\_Br_panel_rdd30.dta" replace; run;
proc export data=tic._br_panel_rdd30_placebo outfile="E:\NRE5110FinalProject\ProcessData\lib\_br_panel_rdd30_placebo.dta" replace; run;
