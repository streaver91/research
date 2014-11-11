*libname tic 'U:/nre';
libname tic 'E:/NRE5110FinalProject/ProcessData/lib';

proc sql;
	create table tic._tickeffect as
	select ts.tics, ts.relTics, ts.avgPrice, ts.absTics, vol2.avgvol - vol1.avgvol as davgvol,
		s2.total_revenue,
		s2.total_revenue / s2.total_assets as ttr0a,
		s2.total_assets as at,
		log(s2.total_assets) as log_at,
		(s2.total_revenue - s1.total_revenue) / s2.total_assets as dttr0a,
		s2.gross_profit,
		s2.gross_profit / s2.total_assets as pft0a,
		(s2.gross_profit - s1.gross_profit) / s2.total_assets as dpft0a,
		s2.total_current_assets - s1.total_current_assets as dcat,
		s2.total_current_liabilities - s1.total_current_liabilities as dclb,
		s2.common_stock - s1.common_stock as dcstk,
		s2.retained_earnings,
		s2.retained_earnings / s2.total_assets as rt0a,
		(s2.retained_earnings - s1.retained_earnings) as drt0a,
		s2.total_cash_flows_from_financing - s1.total_cash_flows_from_financing as dcf,
		(s2.total_cash_flows_from_financing - s1.total_cash_flows_from_financing) / s2.total_assets as dcf0a
	from tic.ticksize as ts, tic.Br_2014Mar as s1, tic.Br_2014Jun as s2, tic.vol_2014_1 as vol1, tic.vol_2014_2 as vol2
	where ts.tics = s1.comp and ts.tics = s2.comp and ts.tics = vol1.tics and ts.tics = vol2.tics and (s1.total_revenue <> s2.total_revenue or s1.gross_profit <> s2.gross_profit)
	order by ts.relTics;
quit;

proc export data=tic._tickeffect outfile="E:/NRE5110FinalProject/ProcessData/lib/ticEffect.dta" replace; run;

/*
proc sql;
	create table tic.treatment50 as
	select var1 as tic, var2 as treatment
	from tic.treatment as t
	where t.var3 = 'BR50';
quit;

proc sql;
	create table tic.ticeffect50 as
	select t50.tic, treatment,
		vol2.totvol,
		vol2.totvol - vol1.totvol as dtotvol,
		vol2.avgvol,
		vol2.avgvol - vol1.avgvol as davgvol,
		s2.total_revenue,	
		s2.total_revenue - s1.total_revenue as dttr,
		s2.gross_profit,
		s2.gross_profit - s1.gross_profit as dpft,
		s2.total_current_assets - s1.total_current_assets as dcat,
		s2.total_current_liabilities - s1.total_current_liabilities as dclb,
		s2.common_stock - s1.common_stock as dcstk,
		s2.retained_earnings,
		s2.retained_earnings - s1.retained_earnings as drt,
		s2.treasury_stock - s1.treasury_stcok as dtstk,
		s2.total_cash_flows_from_financing - s1.total_cash_flows_from_financing as dcf
	from tic.Br_2014Mar as s1, tic.Br_2014Jun as s2, tic.treatment50 as t50, tic.vol_2014_1 as vol1, tic.vol_2014_2 as vol2
	where s1.comp = t50.tic and s2.comp = t50.tic and vol1.tics = t50.tic and vol2.tics = t50.tic and s1.total_revenue <> s2.total_revenue
	order by treatment;
quit;
