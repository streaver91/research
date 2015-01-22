log close
log using D:\Evanger\Documents\research\NRE5110FinalProject\v2015\regQuant_turnover.log
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 1
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 2
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 3
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 4
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 5
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 1
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 2
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 3
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 4
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 5
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 1
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 2
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 3
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 4
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 5
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 1
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 2
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 3
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 4
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 5
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 1
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 2
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 3
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 4
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
import delimited D:\Evanger\Documents\research\NRE5110FinalProject\v2015\allVariableRegression.csv, clear
encode symbol, gen(nn_sym)
xtset nn_sym half
xtile qtile = turnover, nq(5)
drop if qtile != 5
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
log close