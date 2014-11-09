%let wrds = wrds.wharton.upenn.edu 4016; 
options comamid=TCP remote=WRDS;
signon username=_prompt_ ;

libname nre '\\rschfs1x\usercl\fall\jl2922_NRE5110\Downloads\nre';
rsubmit;
