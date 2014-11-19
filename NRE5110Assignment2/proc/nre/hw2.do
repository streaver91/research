clear all
set more off

cd U:\nre\
use U:\nre\hw2raw

*log using hw2.log

xtset gvkey fyear

xtreg investment q cashflow, fe vce(robust)
display e(r2_a)

sum q, detail
drop if q < r(p5) | q > r(p95)
sum investment, detail
drop if investment < r(p5) | investment > r(p95)
sum cashflow, detail
drop if cashflow < r(p5) | cashflow > r(p95)

xtreg investment q cashflow, fe vce(robust)
xtreg investment lq lcashflow, fe vce(robust)




clear all
set more off

cd U:\nre\
use U:\nre\hw2raw

*log using hw2.log

xtset gvkey fyear

sum q, detail
drop if q < r(p10) | q > r(p90)
sum investment, detail
drop if investment < r(p10) | investment > r(p90)
sum cashflow, detail
drop if cashflow < r(p10) | cashflow > r(p90)

xtreg investment q cashflow, fe

clear all
use U:\nre\hw2raw

xtset gvkey fyear

winsor q, gen(w_q) p(0.05)
winsor cashflow, gen(w_cashflow) p(0.05)
winsor investment, gen(w_investment) p(0.05)

xtreg investment q cashflow, fe
xtreg investment q lcashflow, fe
xtreg w_investment w_q w_cashflow, fe

generate random = runiform()

drop sp
gen sp = 0
replace sp = 1 if random < 0.01992


