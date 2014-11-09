libname tic 'U:/nre';

proc sql;
	create table ticeffect as
	select comp,
		s2.total_revenue - s1.total_revenue as dttr,
		s2.gross_profit - s1.gross_profit as dpft,
		s2.total_current_assets
	from tic.Br_2014Mar as s1, tic.Br_2014Jun as s2
	where s1.comp = s2.comp;
quit;
