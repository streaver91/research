use "E:\NRE5110FinalProject\ProcessData\lib\_Br_panel_all.dta" 
xtset ticnum season
xtreg cf2at log_at treat,fe
gen avgvol2at = avgvol/ total_assets
describe avgvol2at
su
xtreg avgvol2at log_at treat,fe
gen investments2at = investments / total_assets
xtreg investments2at log_at treat,fe
su
su dividends_paid
su investments
gen capital_expenditures2at = capital_expenditures/total_assets
xtreg capital_expenditures2at log_at treat,fe
su
gen total_revenue2at = total_revenue/total_assets
gen cost_of_revenue2at = cost_of_revenue/total_assets
gen operating_expenses2at = operating_expenses/total_assets
gen operating_income_or_loss2at= operating_income_or_loss/total_assets
xtreg total_revenue2at log_at treat,fe
xtreg cost_of_revenue2at log_at treat,fe
xtreg operating_expenses2at log_at treat,fe
operating_income_or_loss2at log_at treat,fe
xtreg operating_income_or_loss2at log_at treat,fe
more off
set more off
xtreg total_revenue2at log_at treat,fe
su

// TODO: automated do file generation
