use "E:\NRE5110FinalProject\ProcessData\lib\ticEffect.dta" 
reg dttr0a reltics log_at
pft0a log_at reltics
reg dpft0a log_at reltics
reg ttr0a log_at reltics
reg dcf0a log_at reltics
reg drt0a log_at reltics
reg rt0a log_at reltics
reg pft0a log_at reltics
su
winsor dcf0a, gen(w_dcf0a) p(0.05)
ssc install winsor
winsor dcf0a, gen(w_dcf0a) p(0.05)
w_dcf0a log_at reltics
reg w_dcf0a log_at reltics
su
winsor dcf0a, gen(w_dcf0a) p(0.01)
drop w_dcf0a
winsor dcf0a, gen(w1_dcf0a) p(0.01)
winsor dcf0a, gen(w2_dcf0a) p(0.02)
winsor dcf0a, gen(w3_dcf0a) p(0.03)
winsor dcf0a, gen(w4_dcf0a) p(0.04)
winsor dcf0a, gen(w5_dcf0a) p(0.05)
su
winsor pft0a, gen(w_pft0a) p(0.05)
reg w_pft0a log_at reltics
save "E:\NRE5110FinalProject\ProcessData\lib\ticEffect2.dta"
