import delimited D:EvangerDocumentsesearchNRE5110FinalProject2015agg.csv
encode symbol, gen(n_sym)
xtset n_sym half
sum at, detail
drop if at < r(p5) | at > r(p95)
log using panel_fe.log
gen bookvalue = totalassets - intangibleassets
gen log_at = log(totalassets)
gen totalrevenue2at_0 = totalrevenue / totalassets
gen costofrevenue2at_1 = costofrevenue / totalassets
gen grossprofit2at_2 = grossprofit / totalassets
gen operatingexpenses2at_3 = operatingexpenses / totalassets
gen researchdevelopment2at_4 = researchdevelopment / totalassets
gen sellinggeneralandadm2at_5 = sellinggeneralandadministrative / totalassets
gen totaloperatingexpens2at_6 = totaloperatingexpenses / totalassets
gen operatingincomeorlos2at_7 = operatingincomeorloss / totalassets
gen operatingincomeorlos2at_8 = operatingincomeorloss / totalassets
gen totalotherincomeexpe2at_9 = totalotherincomeexpensesnet / totalassets
gen earningsbeforeintere2at_10 = earningsbeforeinterestandtaxes / totalassets
gen interestexpense2at_11 = interestexpense / totalassets
gen incomebeforetax2at_12 = incomebeforetax / totalassets
gen netincomefromcontinu2at_13 = netincomefromcontinuingops / totalassets
gen netincome2at_14 = netincome / totalassets
gen cashandcashequivalen2at_15 = cashandcashequivalents / totalassets
gen shortterminvestments2at_16 = shortterminvestments / totalassets
gen netreceivables2at_17 = netreceivables / totalassets
gen inventory2at_18 = inventory / totalassets
gen othercurrentassets2at_19 = othercurrentassets / totalassets
gen totalcurrentassets2at_20 = totalcurrentassets / totalassets
gen longterminvestments2at_21 = longterminvestments / totalassets
gen propertyplantandequi2at_22 = propertyplantandequipment / totalassets
gen goodwill2at_23 = goodwill / totalassets
gen intangibleassets2at_24 = intangibleassets / totalassets
gen accumulatedamortizat2at_25 = accumulatedamortization / totalassets
gen otherassets2at_26 = otherassets / totalassets
gen totalassets2at_27 = totalassets / totalassets
gen accountspayable2at_28 = accountspayable / totalassets
gen shortcurrentlongterm2at_29 = shortcurrentlongtermdebt / totalassets
gen totalcurrentliabilit2at_30 = totalcurrentliabilities / totalassets
gen longtermdebt2at_31 = longtermdebt / totalassets
gen deferredlongtermliab2at_32 = deferredlongtermliabilitycharges / totalassets
gen totalliabilities2at_33 = totalliabilities / totalassets
gen commonstock2at_34 = commonstock / totalassets
gen retainedearnings2at_35 = retainedearnings / totalassets
gen totalstockholderequi2at_36 = totalstockholderequity / totalassets
gen nettangibleassets2at_37 = nettangibleassets / totalassets
gen netincome2at_38 = netincome / totalassets
gen depreciation2at_39 = depreciation / totalassets
gen changesinaccountsrec2at_40 = changesinaccountsreceivables / totalassets
gen changesinliabilities2at_41 = changesinliabilities / totalassets
gen changesininventories2at_42 = changesininventories / totalassets
gen changesinotheroperat2at_43 = changesinotheroperatingactivitie / totalassets
gen totalcashflowfromope2at_44 = totalcashflowfromoperatingactivi / totalassets
gen capitalexpenditures2at_45 = capitalexpenditures / totalassets
gen investments2at_46 = investments / totalassets
gen othercashflowsfromin2at_47 = othercashflowsfrominvestingactiv / totalassets
gen totalcashflowsfromin2at_48 = totalcashflowsfrominvestingactiv / totalassets
gen dividendspaid2at_49 = dividendspaid / totalassets
gen salepurchaseofstock2at_50 = salepurchaseofstock / totalassets
gen netborrowings2at_51 = netborrowings / totalassets
gen totalcashflowsfromfi2at_52 = totalcashflowsfromfinancingactiv / totalassets
gen effectofexchangerate2at_53 = effectofexchangeratechanges / totalassets
gen changeincashandcashe2at_54 = changeincashandcashequivalents / totalassets
xtreg totalrevenue log_at treat, fe
xtreg totalrevenue2at_0 treat, fe
xtreg totalrevenue2at_0 log_at treat, fe
xtreg costofrevenue log_at treat, fe
xtreg costofrevenue2at_1 treat, fe
xtreg costofrevenue2at_1 log_at treat, fe
xtreg grossprofit log_at treat, fe
xtreg grossprofit2at_2 treat, fe
xtreg grossprofit2at_2 log_at treat, fe
xtreg operatingexpenses log_at treat, fe
xtreg operatingexpenses2at_3 treat, fe
xtreg operatingexpenses2at_3 log_at treat, fe
xtreg researchdevelopment log_at treat, fe
xtreg researchdevelopment2at_4 treat, fe
xtreg researchdevelopment2at_4 log_at treat, fe
xtreg sellinggeneralandadministrative log_at treat, fe
xtreg sellinggeneralandadm2at_5 treat, fe
xtreg sellinggeneralandadm2at_5 log_at treat, fe
xtreg totaloperatingexpenses log_at treat, fe
xtreg totaloperatingexpens2at_6 treat, fe
xtreg totaloperatingexpens2at_6 log_at treat, fe
xtreg operatingincomeorloss log_at treat, fe
xtreg operatingincomeorlos2at_7 treat, fe
xtreg operatingincomeorlos2at_7 log_at treat, fe
xtreg operatingincomeorloss log_at treat, fe
xtreg operatingincomeorlos2at_8 treat, fe
xtreg operatingincomeorlos2at_8 log_at treat, fe
xtreg totalotherincomeexpensesnet log_at treat, fe
xtreg totalotherincomeexpe2at_9 treat, fe
xtreg totalotherincomeexpe2at_9 log_at treat, fe
xtreg earningsbeforeinterestandtaxes log_at treat, fe
xtreg earningsbeforeintere2at_10 treat, fe
xtreg earningsbeforeintere2at_10 log_at treat, fe
xtreg interestexpense log_at treat, fe
xtreg interestexpense2at_11 treat, fe
xtreg interestexpense2at_11 log_at treat, fe
xtreg incomebeforetax log_at treat, fe
xtreg incomebeforetax2at_12 treat, fe
xtreg incomebeforetax2at_12 log_at treat, fe
xtreg netincomefromcontinuingops log_at treat, fe
xtreg netincomefromcontinu2at_13 treat, fe
xtreg netincomefromcontinu2at_13 log_at treat, fe
xtreg netincome log_at treat, fe
xtreg netincome2at_14 treat, fe
xtreg netincome2at_14 log_at treat, fe
xtreg cashandcashequivalents log_at treat, fe
xtreg cashandcashequivalen2at_15 treat, fe
xtreg cashandcashequivalen2at_15 log_at treat, fe
xtreg shortterminvestments log_at treat, fe
xtreg shortterminvestments2at_16 treat, fe
xtreg shortterminvestments2at_16 log_at treat, fe
xtreg netreceivables log_at treat, fe
xtreg netreceivables2at_17 treat, fe
xtreg netreceivables2at_17 log_at treat, fe
xtreg inventory log_at treat, fe
xtreg inventory2at_18 treat, fe
xtreg inventory2at_18 log_at treat, fe
xtreg othercurrentassets log_at treat, fe
xtreg othercurrentassets2at_19 treat, fe
xtreg othercurrentassets2at_19 log_at treat, fe
xtreg totalcurrentassets log_at treat, fe
xtreg totalcurrentassets2at_20 treat, fe
xtreg totalcurrentassets2at_20 log_at treat, fe
xtreg longterminvestments log_at treat, fe
xtreg longterminvestments2at_21 treat, fe
xtreg longterminvestments2at_21 log_at treat, fe
xtreg propertyplantandequipment log_at treat, fe
xtreg propertyplantandequi2at_22 treat, fe
xtreg propertyplantandequi2at_22 log_at treat, fe
xtreg goodwill log_at treat, fe
xtreg goodwill2at_23 treat, fe
xtreg goodwill2at_23 log_at treat, fe
xtreg intangibleassets log_at treat, fe
xtreg intangibleassets2at_24 treat, fe
xtreg intangibleassets2at_24 log_at treat, fe
xtreg accumulatedamortization log_at treat, fe
xtreg accumulatedamortizat2at_25 treat, fe
xtreg accumulatedamortizat2at_25 log_at treat, fe
xtreg otherassets log_at treat, fe
xtreg otherassets2at_26 treat, fe
xtreg otherassets2at_26 log_at treat, fe
xtreg totalassets log_at treat, fe
xtreg totalassets2at_27 treat, fe
xtreg totalassets2at_27 log_at treat, fe
xtreg accountspayable log_at treat, fe
xtreg accountspayable2at_28 treat, fe
xtreg accountspayable2at_28 log_at treat, fe
xtreg shortcurrentlongtermdebt log_at treat, fe
xtreg shortcurrentlongterm2at_29 treat, fe
xtreg shortcurrentlongterm2at_29 log_at treat, fe
xtreg totalcurrentliabilities log_at treat, fe
xtreg totalcurrentliabilit2at_30 treat, fe
xtreg totalcurrentliabilit2at_30 log_at treat, fe
xtreg longtermdebt log_at treat, fe
xtreg longtermdebt2at_31 treat, fe
xtreg longtermdebt2at_31 log_at treat, fe
xtreg deferredlongtermliabilitycharges log_at treat, fe
xtreg deferredlongtermliab2at_32 treat, fe
xtreg deferredlongtermliab2at_32 log_at treat, fe
xtreg totalliabilities log_at treat, fe
xtreg totalliabilities2at_33 treat, fe
xtreg totalliabilities2at_33 log_at treat, fe
xtreg commonstock log_at treat, fe
xtreg commonstock2at_34 treat, fe
xtreg commonstock2at_34 log_at treat, fe
xtreg retainedearnings log_at treat, fe
xtreg retainedearnings2at_35 treat, fe
xtreg retainedearnings2at_35 log_at treat, fe
xtreg totalstockholderequity log_at treat, fe
xtreg totalstockholderequi2at_36 treat, fe
xtreg totalstockholderequi2at_36 log_at treat, fe
xtreg nettangibleassets log_at treat, fe
xtreg nettangibleassets2at_37 treat, fe
xtreg nettangibleassets2at_37 log_at treat, fe
xtreg netincome log_at treat, fe
xtreg netincome2at_38 treat, fe
xtreg netincome2at_38 log_at treat, fe
xtreg depreciation log_at treat, fe
xtreg depreciation2at_39 treat, fe
xtreg depreciation2at_39 log_at treat, fe
xtreg changesinaccountsreceivables log_at treat, fe
xtreg changesinaccountsrec2at_40 treat, fe
xtreg changesinaccountsrec2at_40 log_at treat, fe
xtreg changesinliabilities log_at treat, fe
xtreg changesinliabilities2at_41 treat, fe
xtreg changesinliabilities2at_41 log_at treat, fe
xtreg changesininventories log_at treat, fe
xtreg changesininventories2at_42 treat, fe
xtreg changesininventories2at_42 log_at treat, fe
xtreg changesinotheroperatingactivitie log_at treat, fe
xtreg changesinotheroperat2at_43 treat, fe
xtreg changesinotheroperat2at_43 log_at treat, fe
xtreg totalcashflowfromoperatingactivi log_at treat, fe
xtreg totalcashflowfromope2at_44 treat, fe
xtreg totalcashflowfromope2at_44 log_at treat, fe
xtreg capitalexpenditures log_at treat, fe
xtreg capitalexpenditures2at_45 treat, fe
xtreg capitalexpenditures2at_45 log_at treat, fe
xtreg investments log_at treat, fe
xtreg investments2at_46 treat, fe
xtreg investments2at_46 log_at treat, fe
xtreg othercashflowsfrominvestingactiv log_at treat, fe
xtreg othercashflowsfromin2at_47 treat, fe
xtreg othercashflowsfromin2at_47 log_at treat, fe
xtreg totalcashflowsfrominvestingactiv log_at treat, fe
xtreg totalcashflowsfromin2at_48 treat, fe
xtreg totalcashflowsfromin2at_48 log_at treat, fe
xtreg dividendspaid log_at treat, fe
xtreg dividendspaid2at_49 treat, fe
xtreg dividendspaid2at_49 log_at treat, fe
xtreg salepurchaseofstock log_at treat, fe
xtreg salepurchaseofstock2at_50 treat, fe
xtreg salepurchaseofstock2at_50 log_at treat, fe
xtreg netborrowings log_at treat, fe
xtreg netborrowings2at_51 treat, fe
xtreg netborrowings2at_51 log_at treat, fe
xtreg totalcashflowsfromfinancingactiv log_at treat, fe
xtreg totalcashflowsfromfi2at_52 treat, fe
xtreg totalcashflowsfromfi2at_52 log_at treat, fe
xtreg effectofexchangeratechanges log_at treat, fe
xtreg effectofexchangerate2at_53 treat, fe
xtreg effectofexchangerate2at_53 log_at treat, fe
xtreg changeincashandcashequivalents log_at treat, fe
xtreg changeincashandcashe2at_54 treat, fe
xtreg changeincashandcashe2at_54 log_at treat, fe