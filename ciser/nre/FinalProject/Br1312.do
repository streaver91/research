use "U:\Downloads\nre\ticEffect.dta", clear
corr
corr total_revenue cost_of_revenue gross_profit operating_expenses research_development selling_general_and_administrati total_operating_expenses treatment
reg total_revenue treatment
winsor total_revenue, gen(w_total_revenue) p(0.05)
doedit
