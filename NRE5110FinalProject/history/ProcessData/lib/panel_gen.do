xtset ticnum season
log using panel_fe.log
gen book_value = total_assets - intangible_assets
gen total_revenue2at_0 = total_revenue / total_assets
gen cost_of_revenue2at_1 = cost_of_revenue / total_assets
gen gross_profit2at_2 = gross_profit / total_assets
gen operating_expenses2at_3 = operating_expenses / total_assets
gen research_development2at_4 = research_development / total_assets
gen selling_general_and_2at_5 = selling_general_and_administrati / total_assets
gen total_operating_expe2at_6 = total_operating_expenses / total_assets
gen operating_income_or_2at_7 = operating_income_or_loss / total_assets
gen operating_income_or_2at_8 = operating_income_or_loss / total_assets
gen total_other_income_e2at_9 = total_other_income_expenses_net / total_assets
gen earnings_before_inte2at_10 = earnings_before_interest_and_tax / total_assets
gen interest_expense2at_11 = interest_expense / total_assets
gen income_before_tax2at_12 = income_before_tax / total_assets
gen net_income_from_cont2at_13 = net_income_from_continuing_ops / total_assets
gen net_income2at_14 = net_income / total_assets
gen cash_and_cash_equiva2at_15 = cash_and_cash_equivalents / total_assets
gen short_term_investmen2at_16 = short_term_investments / total_assets
gen net_receivables2at_17 = net_receivables / total_assets
gen inventory2at_18 = inventory / total_assets
gen other_current_assets2at_19 = other_current_assets / total_assets
gen total_current_assets2at_20 = total_current_assets / total_assets
gen long_term_investment2at_21 = long_term_investments / total_assets
gen property_plant_and_e2at_22 = property_plant_and_equipment / total_assets
gen goodwill2at_23 = goodwill / total_assets
gen intangible_assets2at_24 = intangible_assets / total_assets
gen accumulated_amortiza2at_25 = accumulated_amortization / total_assets
gen other_assets2at_26 = other_assets / total_assets
gen total_assets2at_27 = total_assets / total_assets
gen accounts_payable2at_28 = accounts_payable / total_assets
gen short_current_long_t2at_29 = short_current_long_term_debt / total_assets
gen total_current_liabil2at_30 = total_current_liabilities / total_assets
gen long_term_debt2at_31 = long_term_debt / total_assets
gen deferred_long_term_l2at_32 = deferred_long_term_liability_cha / total_assets
gen total_liabilities2at_33 = total_liabilities / total_assets
gen common_stock2at_34 = common_stock / total_assets
gen retained_earnings2at_35 = retained_earnings / total_assets
gen total_stockholder_eq2at_36 = total_stockholder_equity / total_assets
gen net_tangible_assets2at_37 = net_tangible_assets / total_assets
gen net_income2at_38 = net_income / total_assets
gen depreciation2at_39 = depreciation / total_assets
gen changes_in_accounts_2at_40 = changes_in_accounts_receivables / total_assets
gen changes_in_liabiliti2at_41 = changes_in_liabilities / total_assets
gen changes_in_inventori2at_42 = changes_in_inventories / total_assets
gen changes_in_other_ope2at_43 = changes_in_other_operating_activ / total_assets
gen total_cash_flow_from2at_44 = total_cash_flow_from_operating_a / total_assets
gen capital_expenditures2at_45 = capital_expenditures / total_assets
gen investments2at_46 = investments / total_assets
gen other_cash_flows_fro2at_47 = other_cash_flows_from_investing / total_assets
gen total_cash_flows_fro2at_48 = total_cash_flows_from_investing / total_assets
gen dividends_paid2at_49 = dividends_paid / total_assets
gen sale_purchase_of_sto2at_50 = sale_purchase_of_stock / total_assets
gen net_borrowings2at_51 = net_borrowings / total_assets
gen total_cash_flows_fro2at_52 = total_cash_flows_from_financing / total_assets
gen effect_of_exchange_r2at_53 = effect_of_exchange_rate_changes / total_assets
gen change_in_cash_and_c2at_54 = change_in_cash_and_cash_equivale / total_assets
xtreg total_revenue log_at treat, fe
xtreg total_revenue2at_0 treat, fe
xtreg total_revenue2at_0 log_at treat, fe
xtreg cost_of_revenue log_at treat, fe
xtreg cost_of_revenue2at_1 treat, fe
xtreg cost_of_revenue2at_1 log_at treat, fe
xtreg gross_profit log_at treat, fe
xtreg gross_profit2at_2 treat, fe
xtreg gross_profit2at_2 log_at treat, fe
xtreg operating_expenses log_at treat, fe
xtreg operating_expenses2at_3 treat, fe
xtreg operating_expenses2at_3 log_at treat, fe
xtreg research_development log_at treat, fe
xtreg research_development2at_4 treat, fe
xtreg research_development2at_4 log_at treat, fe
xtreg selling_general_and_administrati log_at treat, fe
xtreg selling_general_and_2at_5 treat, fe
xtreg selling_general_and_2at_5 log_at treat, fe
xtreg total_operating_expenses log_at treat, fe
xtreg total_operating_expe2at_6 treat, fe
xtreg total_operating_expe2at_6 log_at treat, fe
xtreg operating_income_or_loss log_at treat, fe
xtreg operating_income_or_2at_7 treat, fe
xtreg operating_income_or_2at_7 log_at treat, fe
xtreg operating_income_or_loss log_at treat, fe
xtreg operating_income_or_2at_8 treat, fe
xtreg operating_income_or_2at_8 log_at treat, fe
xtreg total_other_income_expenses_net log_at treat, fe
xtreg total_other_income_e2at_9 treat, fe
xtreg total_other_income_e2at_9 log_at treat, fe
xtreg earnings_before_interest_and_tax log_at treat, fe
xtreg earnings_before_inte2at_10 treat, fe
xtreg earnings_before_inte2at_10 log_at treat, fe
xtreg interest_expense log_at treat, fe
xtreg interest_expense2at_11 treat, fe
xtreg interest_expense2at_11 log_at treat, fe
xtreg income_before_tax log_at treat, fe
xtreg income_before_tax2at_12 treat, fe
xtreg income_before_tax2at_12 log_at treat, fe
xtreg net_income_from_continuing_ops log_at treat, fe
xtreg net_income_from_cont2at_13 treat, fe
xtreg net_income_from_cont2at_13 log_at treat, fe
xtreg net_income log_at treat, fe
xtreg net_income2at_14 treat, fe
xtreg net_income2at_14 log_at treat, fe
xtreg cash_and_cash_equivalents log_at treat, fe
xtreg cash_and_cash_equiva2at_15 treat, fe
xtreg cash_and_cash_equiva2at_15 log_at treat, fe
xtreg short_term_investments log_at treat, fe
xtreg short_term_investmen2at_16 treat, fe
xtreg short_term_investmen2at_16 log_at treat, fe
xtreg net_receivables log_at treat, fe
xtreg net_receivables2at_17 treat, fe
xtreg net_receivables2at_17 log_at treat, fe
xtreg inventory log_at treat, fe
xtreg inventory2at_18 treat, fe
xtreg inventory2at_18 log_at treat, fe
xtreg other_current_assets log_at treat, fe
xtreg other_current_assets2at_19 treat, fe
xtreg other_current_assets2at_19 log_at treat, fe
xtreg total_current_assets log_at treat, fe
xtreg total_current_assets2at_20 treat, fe
xtreg total_current_assets2at_20 log_at treat, fe
xtreg long_term_investments log_at treat, fe
xtreg long_term_investment2at_21 treat, fe
xtreg long_term_investment2at_21 log_at treat, fe
xtreg property_plant_and_equipment log_at treat, fe
xtreg property_plant_and_e2at_22 treat, fe
xtreg property_plant_and_e2at_22 log_at treat, fe
xtreg goodwill log_at treat, fe
xtreg goodwill2at_23 treat, fe
xtreg goodwill2at_23 log_at treat, fe
xtreg intangible_assets log_at treat, fe
xtreg intangible_assets2at_24 treat, fe
xtreg intangible_assets2at_24 log_at treat, fe
xtreg accumulated_amortization log_at treat, fe
xtreg accumulated_amortiza2at_25 treat, fe
xtreg accumulated_amortiza2at_25 log_at treat, fe
xtreg other_assets log_at treat, fe
xtreg other_assets2at_26 treat, fe
xtreg other_assets2at_26 log_at treat, fe
xtreg total_assets log_at treat, fe
xtreg total_assets2at_27 treat, fe
xtreg total_assets2at_27 log_at treat, fe
xtreg accounts_payable log_at treat, fe
xtreg accounts_payable2at_28 treat, fe
xtreg accounts_payable2at_28 log_at treat, fe
xtreg short_current_long_term_debt log_at treat, fe
xtreg short_current_long_t2at_29 treat, fe
xtreg short_current_long_t2at_29 log_at treat, fe
xtreg total_current_liabilities log_at treat, fe
xtreg total_current_liabil2at_30 treat, fe
xtreg total_current_liabil2at_30 log_at treat, fe
xtreg long_term_debt log_at treat, fe
xtreg long_term_debt2at_31 treat, fe
xtreg long_term_debt2at_31 log_at treat, fe
xtreg deferred_long_term_liability_cha log_at treat, fe
xtreg deferred_long_term_l2at_32 treat, fe
xtreg deferred_long_term_l2at_32 log_at treat, fe
xtreg total_liabilities log_at treat, fe
xtreg total_liabilities2at_33 treat, fe
xtreg total_liabilities2at_33 log_at treat, fe
xtreg common_stock log_at treat, fe
xtreg common_stock2at_34 treat, fe
xtreg common_stock2at_34 log_at treat, fe
xtreg retained_earnings log_at treat, fe
xtreg retained_earnings2at_35 treat, fe
xtreg retained_earnings2at_35 log_at treat, fe
xtreg total_stockholder_equity log_at treat, fe
xtreg total_stockholder_eq2at_36 treat, fe
xtreg total_stockholder_eq2at_36 log_at treat, fe
xtreg net_tangible_assets log_at treat, fe
xtreg net_tangible_assets2at_37 treat, fe
xtreg net_tangible_assets2at_37 log_at treat, fe
xtreg net_income log_at treat, fe
xtreg net_income2at_38 treat, fe
xtreg net_income2at_38 log_at treat, fe
xtreg depreciation log_at treat, fe
xtreg depreciation2at_39 treat, fe
xtreg depreciation2at_39 log_at treat, fe
xtreg changes_in_accounts_receivables log_at treat, fe
xtreg changes_in_accounts_2at_40 treat, fe
xtreg changes_in_accounts_2at_40 log_at treat, fe
xtreg changes_in_liabilities log_at treat, fe
xtreg changes_in_liabiliti2at_41 treat, fe
xtreg changes_in_liabiliti2at_41 log_at treat, fe
xtreg changes_in_inventories log_at treat, fe
xtreg changes_in_inventori2at_42 treat, fe
xtreg changes_in_inventori2at_42 log_at treat, fe
xtreg changes_in_other_operating_activ log_at treat, fe
xtreg changes_in_other_ope2at_43 treat, fe
xtreg changes_in_other_ope2at_43 log_at treat, fe
xtreg total_cash_flow_from_operating_a log_at treat, fe
xtreg total_cash_flow_from2at_44 treat, fe
xtreg total_cash_flow_from2at_44 log_at treat, fe
xtreg capital_expenditures log_at treat, fe
xtreg capital_expenditures2at_45 treat, fe
xtreg capital_expenditures2at_45 log_at treat, fe
xtreg investments log_at treat, fe
xtreg investments2at_46 treat, fe
xtreg investments2at_46 log_at treat, fe
xtreg other_cash_flows_from_investing log_at treat, fe
xtreg other_cash_flows_fro2at_47 treat, fe
xtreg other_cash_flows_fro2at_47 log_at treat, fe
xtreg total_cash_flows_from_investing log_at treat, fe
xtreg total_cash_flows_fro2at_48 treat, fe
xtreg total_cash_flows_fro2at_48 log_at treat, fe
xtreg dividends_paid log_at treat, fe
xtreg dividends_paid2at_49 treat, fe
xtreg dividends_paid2at_49 log_at treat, fe
xtreg sale_purchase_of_stock log_at treat, fe
xtreg sale_purchase_of_sto2at_50 treat, fe
xtreg sale_purchase_of_sto2at_50 log_at treat, fe
xtreg net_borrowings log_at treat, fe
xtreg net_borrowings2at_51 treat, fe
xtreg net_borrowings2at_51 log_at treat, fe
xtreg total_cash_flows_from_financing log_at treat, fe
xtreg total_cash_flows_fro2at_52 treat, fe
xtreg total_cash_flows_fro2at_52 log_at treat, fe
xtreg effect_of_exchange_rate_changes log_at treat, fe
xtreg effect_of_exchange_r2at_53 treat, fe
xtreg effect_of_exchange_r2at_53 log_at treat, fe
xtreg change_in_cash_and_cash_equivale log_at treat, fe
xtreg change_in_cash_and_c2at_54 treat, fe
xtreg change_in_cash_and_c2at_54 log_at treat, fe