import json, random
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def units(g, p, c):
    m = p - c; n = -(-g//m); r = n*m
    return f"To raise ${money(g)} at ${money(m)} an item (${money(p)} less ${money(c)}), sell {pl(n,' item',' items')}, raising ${money(r)} with ${money(r-g)} over."
def split(n, s):
    return f"The {pl(n,' item',' items')} shared among {pl(s,' seller',' sellers')} is {n//s} each, with {n%s} left over."
def box(n, p):
    k = -(-n//p)
    return f"The {pl(n,' item',' items')} in boxes of {p} take {pl(k,' box',' boxes')}, leaving {pl(k*p-n,' space',' spaces')} spare."
def profit(n, p, c, f):
    t = n*p - n*c - f
    tail = f"a loss of ${money(-t)}" if t < 0 else f"${money(t)}"
    return f"The {pl(n,' item',' items')} at ${money(p)} with ${money(c)} cost each and ${money(f)} fixed costs leave {tail}."
random.seed(771)
R=random.randint
cases = [
 dict(fn="units", args=["500","4.00","1.50"], expect=units(50000,400,150)),
 dict(fn="split", args=["200","8"], expect=split(200,8)),
 dict(fn="box", args=["200","24"], expect=box(200,24)),
 dict(fn="profit", args=["180","4.00","1.50","60.00"], expect=profit(180,400,150,6000)),
 dict(fn="units", args=["0.01","0.02","0.01"], expect=units(1,2,1)),
 dict(fn="units", args=["100","4","1.5"], expect=units(10000,400,150)),
 dict(fn="split", args=["1","1"], expect=split(1,1)),
 dict(fn="split", args=["7","3"], expect=split(7,3)),
 dict(fn="box", args=["1","1"], expect=box(1,1)),
 dict(fn="profit", args=["10","4","1.5","100"], expect=profit(10,400,150,10000)),
 dict(fn="profit", args=["40","2.5","2.5","0"], expect=profit(40,250,250,0)),
]
def d(n): return money(n)
for _ in range(20):
    c=R(1,500000); p=R(c+1,1000000); g=R(1,100000000)
    cases.append(dict(fn="units", args=[d(g),d(p),d(c)], expect=units(g,p,c)))
for _ in range(20):
    n,s=R(1,100000),R(1,1000); cases.append(dict(fn="split", args=[str(n),str(s)], expect=split(n,s)))
for _ in range(20):
    n,p=R(1,100000),R(1,1000); cases.append(dict(fn="box", args=[str(n),str(p)], expect=box(n,p)))
for _ in range(25):
    n,p,c,f=R(1,100000),R(1,1000000),R(1,1000000),R(0,100000000); cases.append(dict(fn="profit", args=[str(n),d(p),d(c),d(f)], expect=profit(n,p,c,f)))
errs=[["units",["0","4","1.5"]],["units",["1000000.01","4","1.5"]],["units",["500","0","1.5"]],["units",["500","4","0"]],["units",["500","1.5","1.5"]],["units",["500","1","1.5"]],["units",["500","4.005","1.5"]],["units",["500","10000.01","1.5"]],
 ["split",["0","8"]],["split",["100001","8"]],["split",["200","0"]],["split",["200","1001"]],
 ["box",["0","24"]],["box",["200","0"]],["box",["200","1001"]],
 ["profit",["0","4","1.5","60"]],["profit",["180","0","1.5","60"]],["profit",["180","4","0","60"]],["profit",["180","4","1.5","-1"]],["profit",["180","4","1.5","1000000.01"]],["profit",["180","4","1.5","60.005"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
