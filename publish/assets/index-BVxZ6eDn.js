var Fh=Object.defineProperty;var zh=(i,e,t)=>e in i?Fh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var pe=(i,e,t)=>zh(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const Bh=`title Example: Array
description Using ARRAY statement for parallel tracks; cameo by the FLEX CONNECT statement

# Create 3 parallel track starting points, 12" apart, perpendicular to track                                                                │
gen ; str x 3                                                                                                                               │
array count 3 angle 90 distance 4 prefix siding_                                                                                           │
                                                                                                                               
# Continue main line from first placeholder                                                                                                 │
main: str
str x 10                                                                                                                                    │
bump                                                                                                                                        │
                                                                                                                                             │
# Build from each siding placeholder                                                                                                        │
$siding_2.out                                                                                                                               │
str ; str ; str ; side: str ; str ; str ; str ; bump                                                                                                                              │
                                                                                                                                             │
$siding_3.out                                                                                                                               │
str ; str ; str ; str ; str ; str ; str ; bump                                                                                                                              │
                                                                                                                                             │
flex connect $main  $side
                                                                                                                                             `,kh=`title Example: Cross Connect
description Using cross connect for track intersections with collision prevention

max trains 6
gen cabs 1-2  cars 2-4  every 10

str
crvl
crvr

str
in1: str
str
one: str
str * 2

crvr * 12

str * 2
two: str
str * 2

crvl * 9
in2: crvl

flex connect $in2.out $in1.in

cross connect $one $two
`,Gh=`title Example: Flex Connect
description Using FLEX CONNECT to fill a non-standard gap between two tracks

after: str
str
crvl * 4

str * 2

crvl * 4

str * 2

crvl * 5

str * 2
before: str

# Use flex connect to bridge the gap with custom curve+straight pieces
flex connect $before.out $after.in
`,Hh=`title Example: Prefab
description Using PREFAB to reuse blocks of track in a layout

PREFAB siding {                                                                                                                              
    [label]: ph                                                                                                                               
    str x 3                                                                                                                                    
    bin                                                                                                                                       
  }                                                                                                                                            
                                                                                                                                               

# Begin track layout

  gen ; str x 3                                                                                                                                
  USE siding label "junction1"                                                                                                                 
                                                                                                                                               
  $junction1.out                                                                                                                               
  crvl x 3                                                                                                                                     
  bin         `,Vh=`# Semaphore Test Layout
# Tests the new semaphore (manual signal) feature
#
# Click the green dot to lock the semaphore (turns red, trains stop)
# Click the red dot to unlock (turns green, trains can pass)

title Example: Semaphore
description Using a SEMAPHORE to let the use stop trains at a given point in the layout

# Layout section with semaphore

gen colorful cabs 1 cars 3-5 speed 15 every 10 
str * 25
semaphore         # This is the semaphore - click the dot to toggle
str x 5
bin

`,Wh=`title Example: Splice
description Using SPLICE to cleanly merge two tracks

random

gen cabs 2 cars 5 every 5
str

ph1: str

str * 8 

bin; 

$ph1.out
crvl
crvr
str * 2
crvr
crvl

splice

`,$h=`title Layout: Larger System
description Several small layouts connected by one large loop

max trains 8
lockahead distance 10 count 4

def crvr15  right  radius 15  arc 22.5
def crvr20  right  radius 20  arc 22.5
def crvr26  right  radius 26  arc 22.5

trees clearance 4 density 1
pond size 20 clearance 2 score 0


#
# Main loop
#
start: str * 19
out1: str

crvl * 4

in1: str
str
east3: str
out2: str

crvl * 4

in2: str
str * 15
out3: str
str * 3

crvl * 3
in3:  crvl
str * 4


out4: crvl
crvl * 3


#
# Center yard
#

new
$start.out
crvl
str
s1: str
crvr
str * 7
sem
h1: str
crvl
str * 5
crvr
str * 2

new 
$s1.out
s2: str
crvr
str * 7
sem
str
crvl


new 
$s2.out
s3: str
crvr
str * 7
sem
str
crvl

new 
$s3.out
s4: str
crvr
str * 7
sem
str
crvl

#
# Generator
#

new
gen cabs 1-2 black cars 2-20 every 20-40 speed 12-16
str
str
> $in3.in

#
# right set
#

new
$h1.out
str
h2: str
crvl
str * 5
crvr
str3
tunnel
str
str
str3
tunnel
str * 4
crvr18 * 10
str * 4
on1: str


flex connect $on1.out $east3.in

#
#  Small layout 1
#

new
$out1.out
str * 2
x1_1: str
crvr18 * 7
tunnel
crvr18
str 
tunnel
crvl18 * 13
clover2: crvl18

new
clover1: str 
str
x1_2: str
str * 2
> $in1.in

cross connect $x1_1  $x1_2
flex connect $clover2.out $clover1.in


#
# Small layout 2
#

new
$out2.out
crvr * 4

crvl * 7
b2a: crvl
crvl * 4

new
crvr * 4
> $in2.in

new 
$b2a.out
b2b: str
crvl * 4
crvr * 4

new 
$b2b.out
b2c: str
crvl * 4
crvr * 4

new 
$b2c.out
b2d: str
crvl * 4
crvr * 4

new 
$b2d.out
b2e: str
crvl * 4
crvr * 4

#
# Small layout 3
#

new
$out3.out 
crvr26 * 8
crvr24 * 8
crvr22 * 8
crvr20 * 8
crvr18 * 8
crvr15 * 8
str3
tunnel
str * 3
tunnel
str * 2
crvl * 5
ramp3: crvl
flex connect $ramp3.out $out4.in
`,Xh=`title Layout: Four Tracks Spiraling
description A thicker loop and other stuff

max trains 10
random

def crvl15  left  radius 15  arc 22.5
def crvr15  right radius 15  arc 22.5
def crvl19  left  radius 19  arc 22.5
def crvr19  right radius 19  arc 22.5
def crvl23  left  radius 23  arc 22.5
def crvr23  right radius 23  arc 22.5
def crvl27  left  radius 27  arc 22.5
def crvr27  right radius 27  arc 22.5

def str24   straight length 24
def str42   straight length 42


trees clearance 4 density 1 factor 1.1
pond size 20 clearance 2

# Create 4 parallel track starting points, 4" apart

array count 5 angle 90 distance 4 prefix main_

# Track 1
new from $main_1.out
str; p1_1: str; str * 2; p1_2: str; str * 4; p1_3: str; str * 2 ; p1_4: str ; str * 7
crvl27 * 4
str * 4
str42
crvr15 * 12
str ; tunnel ; str24 ; tunnel ; str
str * 20
crvl27 * 4
str * 4
crvl27 * 4
# > $main_1.in

# Track 2
new from $main_2.out
str; p2_1: str; str * 2; p2_2: str; str * 4; p2_3: str; str * 2 ; p2_4: str ; str * 7
crvl23 * 4
str * 4
str42
crvr19 * 12
str ; tunnel ; str24 ; tunnel ; str
str * 20
crvl23 * 4
str * 4
crvl23 * 4
# > $main_1.in

# Track 3
new from $main_3.out
str; p3_1: str; str * 2; p3_2: str; str * 4; p3_3: str; str * 2 ; p3_4: str ; str * 7
crvl19 * 4
str * 4
str42
crvr23 * 12
str ; tunnel ; str24 ; tunnel ; str
str * 20
crvl19 * 4
str * 4
crvl19 * 4
# > $main_3.in

# Track 4
new from $main_4.out
str; p4_1: str; str * 2; p4_2: str; str * 4; p4_3: str; str * 2 ; p4_4: str ; str * 7
crvl15 * 4
str * 4
str42
crvr27 * 12
str ; tunnel ; str24 ; tunnel ; str
str * 20
crvl15 * 4
str * 4
crvl15 * 4
# > $main_4.in

# Track 5

new from $main_5.out
str; p5_1: str; str * 2; p5_2: str; str * 4; p5_3: str; str * 2 ; p5_4: str ; str * 5
bin

# Switches

flex connect $p1_1.out  $p2_2.in
flex connect $p2_1.out  $p3_2.in
flex connect $p3_1.out  $p4_2.in
flex connect $p4_1.out  $p5_2.in

# flex connect $p4_3.out  $p3_4.in
# flex connect $p3_3.out  $p2_4.in
# flex connect $p2_3.out  $p1_4.in


# Generator

new
generator  black cabs 1-3  cars 6-20  speed 14  every 20
str * 6
semaphore
crvl27
crvr27
> $p1_3.in;
`,qh=`title Layout: More loops and switches
description Slightly more complex example with more loops, switches, tunnels and a simple yard

max trains 4
lockahead distance 10 count 4

grid size 4 
trees clearance 4 density 3
random

gen colorful cabs 1-2 cars 2-10 every 10 speed 7-16

str ; crvr * 2 ; crvl * 2

sw1: str

str * 7

crvr * 4

s2: str
f2: str
str * 2

crvr * 3
exit3: crvr
str
str * 7;

crvr * 4

str * 4

crvr * 4

out.$sw1

c1: crvr 
crvl
str * 3 
crvr
str
str
str3
crvr 
f1: crvr
flex connect $f1.out $f2.in

flex connect $s2.out $f2.in

new
$c1.out 
c2: str
crvl      
str * 3
crvr

$c2.out
c3: str
crvl
str * 3
crvr

$c2.out
crvr * 2
str * 4
crvl * 3
str3
tunnel
str * 3
tunnel
str 
bin


$exit3.out
crvr
crvl
str
return: str
str
loop: str
crvl
crvr
splice




new
$loop.out
str
str3
crvr * 8
str3
str * 3
tunnel
str * 2
tunnel
str
crvr * 8
str

# $m1.out
# crvl * 3
# b2: crvl
# splice
# crvl * 4
# crvl * 8


# $c3.out
# str
# crvl
# str * 2 
# bin`,Yh=`title         Layout: Two simple loops
description   A generator, several nested loops, some switches and a bin

random

grid size 5
trees clearance 3 density 1 factor 0.9

start: ph

crvl x 3

ph1: crvl
crvl * 4
str * 3
tunnel
str * 2
tunnel
str * 5
crvl * 8
str * 5
tunnel
str * 2
tunnel
str * 3
crvl * 4


new
gen cabs 1-2 cars 2-8 speed 8-12 every 20-40
crvl
str
> in.$ph1

new from out.$ph1
str
crvl * 4
str * 2
crvl * 4
str * 2
crvl * 4
str * 2
crvl * 2
exit: crvl
crvl
str

$exit.out
crvr
crvl
str
bin
`;function Zh(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function ha(i,e=!1){const t=Zh(),n=`_${t}`;return Object.defineProperty(window,n,{value:s=>(e&&Reflect.deleteProperty(window,n),i==null?void 0:i(s)),writable:!1,configurable:!0}),t}async function jh(i,e={}){return new Promise((t,n)=>{const s=ha(a=>{t(a),Reflect.deleteProperty(window,`_${r}`)},!0),r=ha(a=>{n(a),Reflect.deleteProperty(window,`_${s}`)},!0);window.__TAURI_IPC__({cmd:i,callback:s,error:r,...e})})}async function ls(i){return jh("tauri",i)}async function Kh(i={}){return typeof i=="object"&&Object.freeze(i),ls({__tauriModule:"Dialog",message:{cmd:"openDialog",options:i}})}async function Ml(i={}){return typeof i=="object"&&Object.freeze(i),ls({__tauriModule:"Dialog",message:{cmd:"saveDialog",options:i}})}var ua;(function(i){i[i.Audio=1]="Audio",i[i.Cache=2]="Cache",i[i.Config=3]="Config",i[i.Data=4]="Data",i[i.LocalData=5]="LocalData",i[i.Desktop=6]="Desktop",i[i.Document=7]="Document",i[i.Download=8]="Download",i[i.Executable=9]="Executable",i[i.Font=10]="Font",i[i.Home=11]="Home",i[i.Picture=12]="Picture",i[i.Public=13]="Public",i[i.Runtime=14]="Runtime",i[i.Template=15]="Template",i[i.Video=16]="Video",i[i.Resource=17]="Resource",i[i.App=18]="App",i[i.Log=19]="Log",i[i.Temp=20]="Temp",i[i.AppConfig=21]="AppConfig",i[i.AppData=22]="AppData",i[i.AppLocalData=23]="AppLocalData",i[i.AppCache=24]="AppCache",i[i.AppLog=25]="AppLog"})(ua||(ua={}));async function Jh(i,e={}){return ls({__tauriModule:"Fs",message:{cmd:"readTextFile",path:i,options:e}})}async function Qh(i,e,t){typeof i=="object"&&Object.freeze(i);const n={path:"",contents:""};let s=t;return typeof i=="string"?n.path=i:(n.path=i.path,n.contents=i.contents),typeof e=="string"?n.contents=e!=null?e:"":s=e,ls({__tauriModule:"Fs",message:{cmd:"writeFile",path:n.path,contents:Array.from(new TextEncoder().encode(n.contents)),options:s}})}async function eu(i,e,t){typeof i=="object"&&Object.freeze(i);const n={path:"",contents:[]};let s=t;return typeof i=="string"?n.path=i:(n.path=i.path,n.contents=i.contents),e&&"dir"in e?s=e:typeof i=="string"&&(n.contents=e!=null?e:[]),ls({__tauriModule:"Fs",message:{cmd:"writeFile",path:n.path,contents:Array.from(n.contents instanceof ArrayBuffer?new Uint8Array(n.contents):n.contents),options:s}})}/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zo="160",fn={ROTATE:0,DOLLY:1,PAN:2},yn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},tu=0,da=1,nu=2,El=1,iu=2,dn=3,Nn=0,Ot=1,Pt=2,Rn=0,Ai=1,fa=2,pa=3,ma=4,su=5,$n=100,ru=101,ou=102,ga=103,_a=104,au=200,cu=201,lu=202,hu=203,yo=204,bo=205,uu=206,du=207,fu=208,pu=209,mu=210,gu=211,_u=212,vu=213,xu=214,Su=0,Mu=1,Eu=2,sr=3,yu=4,bu=5,Tu=6,wu=7,yl=0,Au=1,Cu=2,Pn=0,Ru=1,Pu=2,Lu=3,Iu=4,Du=5,Nu=6,bl=300,Pi=301,Li=302,To=303,wo=304,gr=306,Ao=1e3,Kt=1001,Co=1002,Dt=1003,va=1004,wr=1005,Ut=1006,Uu=1007,ss=1008,Ln=1009,Ou=1010,Fu=1011,Bo=1012,Tl=1013,Tn=1014,wn=1015,rs=1016,wl=1017,Al=1018,Zn=1020,zu=1021,Jt=1023,Bu=1024,ku=1025,jn=1026,Ii=1027,Gu=1028,Cl=1029,Hu=1030,Rl=1031,Pl=1033,Ar=33776,Cr=33777,Rr=33778,Pr=33779,xa=35840,Sa=35841,Ma=35842,Ea=35843,Ll=36196,ya=37492,ba=37496,Ta=37808,wa=37809,Aa=37810,Ca=37811,Ra=37812,Pa=37813,La=37814,Ia=37815,Da=37816,Na=37817,Ua=37818,Oa=37819,Fa=37820,za=37821,Lr=36492,Ba=36494,ka=36495,Vu=36283,Ga=36284,Ha=36285,Va=36286,Il=3e3,Kn=3001,Wu=3200,$u=3201,Dl=0,Xu=1,Wt="",bt="srgb",gn="srgb-linear",ko="display-p3",_r="display-p3-linear",rr="linear",at="srgb",or="rec709",ar="p3",si=7680,Wa=519,qu=512,Yu=513,Zu=514,Nl=515,ju=516,Ku=517,Ju=518,Qu=519,$a=35044,Xa="300 es",Ro=1035,pn=2e3,cr=2001;class ni{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],es=Math.PI/180,Po=180/Math.PI;function Ui(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function Tt(i,e,t){return Math.max(e,Math.min(t,i))}function ed(i,e){return(i%e+e)%e}function Ir(i,e,t){return(1-t)*i+t*e}function qa(i){return(i&i-1)===0&&i!==0}function Lo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Hi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Nt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const td={DEG2RAD:es};class le{constructor(e=0,t=0){le.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ye{constructor(e,t,n,s,r,a,o,c,l){Ye.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],x=s[1],v=s[4],S=s[7],C=s[2],w=s[5],A=s[8];return r[0]=a*_+o*x+c*C,r[3]=a*p+o*v+c*w,r[6]=a*m+o*S+c*A,r[1]=l*_+h*x+u*C,r[4]=l*p+h*v+u*w,r[7]=l*m+h*S+u*A,r[2]=d*_+f*x+g*C,r[5]=d*p+f*v+g*w,r[8]=d*m+f*S+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Dr.makeScale(e,t)),this}rotate(e){return this.premultiply(Dr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Dr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Dr=new Ye;function Ul(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function lr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function nd(){const i=lr("canvas");return i.style.display="block",i}const Ya={};function ts(i){i in Ya||(Ya[i]=!0,console.warn(i))}const Za=new Ye().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ja=new Ye().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),_s={[gn]:{transfer:rr,primaries:or,toReference:i=>i,fromReference:i=>i},[bt]:{transfer:at,primaries:or,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[_r]:{transfer:rr,primaries:ar,toReference:i=>i.applyMatrix3(ja),fromReference:i=>i.applyMatrix3(Za)},[ko]:{transfer:at,primaries:ar,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ja),fromReference:i=>i.applyMatrix3(Za).convertLinearToSRGB()}},id=new Set([gn,_r]),it={enabled:!0,_workingColorSpace:gn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!id.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=_s[e].toReference,s=_s[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return _s[i].primaries},getTransfer:function(i){return i===Wt?rr:_s[i].transfer}};function Ci(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ri;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ri===void 0&&(ri=lr("canvas")),ri.width=e.width,ri.height=e.height;const n=ri.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ri}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=lr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ci(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ci(t[n]/255)*255):t[n]=Ci(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let sd=0;class Fl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sd++}),this.uuid=Ui(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ur(s[a].image)):r.push(Ur(s[a]))}else r=Ur(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ur(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let rd=0;class Ft extends ni{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=Kt,s=Kt,r=Ut,a=ss,o=Jt,c=Ln,l=Ft.DEFAULT_ANISOTROPY,h=Wt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:rd++}),this.uuid=Ui(),this.name="",this.source=new Fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new le(0,0),this.repeat=new le(1,1),this.center=new le(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Kn?bt:Wt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==bl)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ao:e.x=e.x-Math.floor(e.x);break;case Kt:e.x=e.x<0?0:1;break;case Co:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ao:e.y=e.y-Math.floor(e.y);break;case Kt:e.y=e.y<0?0:1;break;case Co:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===bt?Kn:Il}set encoding(e){ts("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Kn?bt:Wt}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=bl;Ft.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,t=0,n=0,s=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,S=(f+1)/2,C=(m+1)/2,w=(h+d)/4,A=(u+_)/4,N=(g+p)/4;return v>S&&v>C?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=w/n,r=A/n):S>C?S<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),n=w/s,r=N/s):C<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),n=A/r,s=N/r),this.set(n,s,r,t),this}let x=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+m-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class od extends ni{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(ts("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Kn?bt:Wt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ft(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Jn extends od{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class zl extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ad extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Kt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class _n{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let p=1-o;const m=c*d+l*f+h*g+u*_,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const C=Math.sqrt(v),w=Math.atan2(C,m*x);p=Math.sin(p*w)/C,o=Math.sin(o*w)/C}const S=o*x;if(c=c*p+d*S,l=l*p+f*S,h=h*p+g*S,u=u*p+_*S,p===1-o){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class L{constructor(e=0,t=0,n=0){L.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ka.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ka.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Or.copy(this).projectOnVector(e),this.sub(Or)}reflect(e){return this.sub(Or.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Or=new L,Ka=new _n;class On{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Xt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xt):Xt.fromBufferAttribute(r,a),Xt.applyMatrix4(e.matrixWorld),this.expandByPoint(Xt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vs.copy(n.boundingBox)),vs.applyMatrix4(e.matrixWorld),this.union(vs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Xt),Xt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vi),xs.subVectors(this.max,Vi),oi.subVectors(e.a,Vi),ai.subVectors(e.b,Vi),ci.subVectors(e.c,Vi),vn.subVectors(ai,oi),xn.subVectors(ci,ai),Bn.subVectors(oi,ci);let t=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Bn.z,Bn.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Bn.z,0,-Bn.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Bn.y,Bn.x,0];return!Fr(t,oi,ai,ci,xs)||(t=[1,0,0,0,1,0,0,0,1],!Fr(t,oi,ai,ci,xs))?!1:(Ss.crossVectors(vn,xn),t=[Ss.x,Ss.y,Ss.z],Fr(t,oi,ai,ci,xs))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(an[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),an[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),an[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),an[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),an[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),an[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),an[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),an[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(an),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const an=[new L,new L,new L,new L,new L,new L,new L,new L],Xt=new L,vs=new On,oi=new L,ai=new L,ci=new L,vn=new L,xn=new L,Bn=new L,Vi=new L,xs=new L,Ss=new L,kn=new L;function Fr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){kn.fromArray(i,r);const o=s.x*Math.abs(kn.x)+s.y*Math.abs(kn.y)+s.z*Math.abs(kn.z),c=e.dot(kn),l=t.dot(kn),h=n.dot(kn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const cd=new On,Wi=new L,zr=new L;class Oi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cd.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wi.subVectors(e,this.center);const t=Wi.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Wi,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wi.copy(e.center).add(zr)),this.expandByPoint(Wi.copy(e.center).sub(zr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const cn=new L,Br=new L,Ms=new L,Sn=new L,kr=new L,Es=new L,Gr=new L;class vr{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(cn.copy(this.origin).addScaledVector(this.direction,t),cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Br.copy(e).add(t).multiplyScalar(.5),Ms.copy(t).sub(e).normalize(),Sn.copy(this.origin).sub(Br);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ms),o=Sn.dot(this.direction),c=-Sn.dot(Ms),l=Sn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Br).addScaledVector(Ms,d),f}intersectSphere(e,t){cn.subVectors(e.center,this.origin);const n=cn.dot(this.direction),s=cn.dot(cn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,cn)!==null}intersectTriangle(e,t,n,s,r){kr.subVectors(t,e),Es.subVectors(n,e),Gr.crossVectors(kr,Es);let a=this.direction.dot(Gr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Sn.subVectors(this.origin,e);const c=o*this.direction.dot(Es.crossVectors(Sn,Es));if(c<0)return null;const l=o*this.direction.dot(kr.cross(Sn));if(l<0||c+l>a)return null;const h=-o*Sn.dot(Gr);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class st{constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p){st.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,p){const m=this.elements;return m[0]=e,m[4]=t,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new st().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/li.setFromMatrixColumn(e,0).length(),r=1/li.setFromMatrixColumn(e,1).length(),a=1/li.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ld,e,hd)}lookAt(e,t,n){const s=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),Mn.crossVectors(n,Bt),Mn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),Mn.crossVectors(n,Bt)),Mn.normalize(),ys.crossVectors(Bt,Mn),s[0]=Mn.x,s[4]=ys.x,s[8]=Bt.x,s[1]=Mn.y,s[5]=ys.y,s[9]=Bt.y,s[2]=Mn.z,s[6]=ys.z,s[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],x=n[3],v=n[7],S=n[11],C=n[15],w=s[0],A=s[4],N=s[8],E=s[12],b=s[1],F=s[5],$=s[9],ee=s[13],P=s[2],U=s[6],O=s[10],X=s[14],q=s[3],K=s[7],Z=s[11],te=s[15];return r[0]=a*w+o*b+c*P+l*q,r[4]=a*A+o*F+c*U+l*K,r[8]=a*N+o*$+c*O+l*Z,r[12]=a*E+o*ee+c*X+l*te,r[1]=h*w+u*b+d*P+f*q,r[5]=h*A+u*F+d*U+f*K,r[9]=h*N+u*$+d*O+f*Z,r[13]=h*E+u*ee+d*X+f*te,r[2]=g*w+_*b+p*P+m*q,r[6]=g*A+_*F+p*U+m*K,r[10]=g*N+_*$+p*O+m*Z,r[14]=g*E+_*ee+p*X+m*te,r[3]=x*w+v*b+S*P+C*q,r[7]=x*A+v*F+S*U+C*K,r[11]=x*N+v*$+S*O+C*Z,r[15]=x*E+v*ee+S*X+C*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],p=e[11],m=e[15];return g*(+r*c*u-s*l*u-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*h-r*c*h)+p*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+m*(-s*o*h-t*c*u+t*o*d+s*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],p=e[14],m=e[15],x=u*p*l-_*d*l+_*c*f-o*p*f-u*c*m+o*d*m,v=g*d*l-h*p*l-g*c*f+a*p*f+h*c*m-a*d*m,S=h*_*l-g*u*l+g*o*f-a*_*f-h*o*m+a*u*m,C=g*u*c-h*_*c-g*o*d+a*_*d+h*o*p-a*u*p,w=t*x+n*v+s*S+r*C;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=x*A,e[1]=(_*d*r-u*p*r-_*s*f+n*p*f+u*s*m-n*d*m)*A,e[2]=(o*p*r-_*c*r+_*s*l-n*p*l-o*s*m+n*c*m)*A,e[3]=(u*c*r-o*d*r-u*s*l+n*d*l+o*s*f-n*c*f)*A,e[4]=v*A,e[5]=(h*p*r-g*d*r+g*s*f-t*p*f-h*s*m+t*d*m)*A,e[6]=(g*c*r-a*p*r-g*s*l+t*p*l+a*s*m-t*c*m)*A,e[7]=(a*d*r-h*c*r+h*s*l-t*d*l-a*s*f+t*c*f)*A,e[8]=S*A,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*m-t*u*m)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*m+t*o*m)*A,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*A,e[12]=C*A,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*p+t*u*p)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*p-t*o*p)*A,e[15]=(a*u*s-h*o*s+h*n*c-t*u*c-a*n*d+t*o*d)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,p=a*u,m=o*u,x=c*l,v=c*h,S=c*u,C=n.x,w=n.y,A=n.z;return s[0]=(1-(_+m))*C,s[1]=(f+S)*C,s[2]=(g-v)*C,s[3]=0,s[4]=(f-S)*w,s[5]=(1-(d+m))*w,s[6]=(p+x)*w,s[7]=0,s[8]=(g+v)*A,s[9]=(p-x)*A,s[10]=(1-(d+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=li.set(s[0],s[1],s[2]).length();const a=li.set(s[4],s[5],s[6]).length(),o=li.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],qt.copy(this);const l=1/r,h=1/a,u=1/o;return qt.elements[0]*=l,qt.elements[1]*=l,qt.elements[2]*=l,qt.elements[4]*=h,qt.elements[5]*=h,qt.elements[6]*=h,qt.elements[8]*=u,qt.elements[9]*=u,qt.elements[10]*=u,t.setFromRotationMatrix(qt),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=pn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===pn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===cr)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=pn){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(a-r),d=(t+e)*l,f=(n+s)*h;let g,_;if(o===pn)g=(a+r)*u,_=-2*u;else if(o===cr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const li=new L,qt=new st,ld=new L(0,0,0),hd=new L(1,1,1),Mn=new L,ys=new L,Bt=new L,Ja=new st,Qa=new _n;class Fi{constructor(e=0,t=0,n=0,s=Fi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Tt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Tt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ja.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ja,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qa.setFromEuler(this),this.setFromQuaternion(Qa,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fi.DEFAULT_ORDER="XYZ";class Go{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let ud=0;const ec=new L,hi=new _n,ln=new st,bs=new L,$i=new L,dd=new L,fd=new _n,tc=new L(1,0,0),nc=new L(0,1,0),ic=new L(0,0,1),pd={type:"added"},md={type:"removed"};class vt extends ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=Ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new L,t=new Fi,n=new _n,s=new L(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new st},normalMatrix:{value:new Ye}}),this.matrix=new st,this.matrixWorld=new st,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Go,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.multiply(hi),this}rotateOnWorldAxis(e,t){return hi.setFromAxisAngle(e,t),this.quaternion.premultiply(hi),this}rotateX(e){return this.rotateOnAxis(tc,e)}rotateY(e){return this.rotateOnAxis(nc,e)}rotateZ(e){return this.rotateOnAxis(ic,e)}translateOnAxis(e,t){return ec.copy(e).applyQuaternion(this.quaternion),this.position.add(ec.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(tc,e)}translateY(e){return this.translateOnAxis(nc,e)}translateZ(e){return this.translateOnAxis(ic,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?bs.copy(e):bs.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),$i.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt($i,bs,this.up):ln.lookAt(bs,$i,this.up),this.quaternion.setFromRotationMatrix(ln),s&&(ln.extractRotation(s.matrixWorld),hi.setFromRotationMatrix(ln),this.quaternion.premultiply(hi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(pd)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(md)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,e,dd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose($i,fd,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new L(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Yt=new L,hn=new L,Hr=new L,un=new L,ui=new L,di=new L,sc=new L,Vr=new L,Wr=new L,$r=new L;let Ts=!1;class Vt{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Yt.subVectors(e,t),s.cross(Yt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Yt.subVectors(s,t),hn.subVectors(n,t),Hr.subVectors(e,t);const a=Yt.dot(Yt),o=Yt.dot(hn),c=Yt.dot(Hr),l=hn.dot(hn),h=hn.dot(Hr),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,un)===null?!1:un.x>=0&&un.y>=0&&un.x+un.y<=1}static getUV(e,t,n,s,r,a,o,c){return Ts===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ts=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,un.x),c.addScaledVector(a,un.y),c.addScaledVector(o,un.z),c)}static isFrontFacing(e,t,n,s){return Yt.subVectors(n,t),hn.subVectors(e,t),Yt.cross(hn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Yt.subVectors(this.c,this.b),hn.subVectors(this.a,this.b),Yt.cross(hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Vt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Vt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Ts===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Ts=!0),Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Vt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Vt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Vt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ui.subVectors(s,n),di.subVectors(r,n),Vr.subVectors(e,n);const c=ui.dot(Vr),l=di.dot(Vr);if(c<=0&&l<=0)return t.copy(n);Wr.subVectors(e,s);const h=ui.dot(Wr),u=di.dot(Wr);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(ui,a);$r.subVectors(e,r);const f=ui.dot($r),g=di.dot($r);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(di,o);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return sc.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(sc,o);const m=1/(p+_+d);return a=_*m,o=d*m,t.copy(n).addScaledVector(ui,a).addScaledVector(di,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Bl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},En={h:0,s:0,l:0},ws={h:0,s:0,l:0};function Xr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=it.workingColorSpace){if(e=ed(e,1),t=Tt(t,0,1),n=Tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Xr(a,r,e+1/3),this.g=Xr(a,r,e),this.b=Xr(a,r,e-1/3)}return it.toWorkingColorSpace(this,s),this}setStyle(e,t=bt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=bt){const n=Bl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ci(e.r),this.g=Ci(e.g),this.b=Ci(e.b),this}copyLinearToSRGB(e){return this.r=Nr(e.r),this.g=Nr(e.g),this.b=Nr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=bt){return it.fromWorkingColorSpace(Ct.copy(this),e),Math.round(Tt(Ct.r*255,0,255))*65536+Math.round(Tt(Ct.g*255,0,255))*256+Math.round(Tt(Ct.b*255,0,255))}getHexString(e=bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(Ct.copy(this),t);const n=Ct.r,s=Ct.g,r=Ct.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=bt){it.fromWorkingColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,s=Ct.b;return e!==bt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(En),this.setHSL(En.h+e,En.s+t,En.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(En),e.getHSL(ws);const n=Ir(En.h,ws.h,t),s=Ir(En.s,ws.s,t),r=Ir(En.l,ws.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new Ke;Ke.NAMES=Bl;let gd=0;class Un extends ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:gd++}),this.uuid=Ui(),this.name="",this.type="Material",this.blending=Ai,this.side=Nn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=bo,this.blendEquation=$n,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=si,this.stencilZFail=si,this.stencilZPass=si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ai&&(n.blending=this.blending),this.side!==Nn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==$n&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==sr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class $t extends Un{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new L,As=new le;class Qt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=$a,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)As.fromBufferAttribute(this,t),As.applyMatrix3(e),this.setXY(t,As.x,As.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Hi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Nt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Hi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Hi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Hi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Hi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),n=Nt(n,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==$a&&(e.usage=this.usage),e}}class kl extends Qt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Gl extends Qt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class rt extends Qt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let _d=0;const Ht=new st,qr=new vt,fi=new L,kt=new On,Xi=new On,Et=new L;class Lt extends ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:_d++}),this.uuid=Ui(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ul(e)?Gl:kl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Ye().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ht.makeRotationFromQuaternion(e),this.applyMatrix4(Ht),this}rotateX(e){return Ht.makeRotationX(e),this.applyMatrix4(Ht),this}rotateY(e){return Ht.makeRotationY(e),this.applyMatrix4(Ht),this}rotateZ(e){return Ht.makeRotationZ(e),this.applyMatrix4(Ht),this}translate(e,t,n){return Ht.makeTranslation(e,t,n),this.applyMatrix4(Ht),this}scale(e,t,n){return Ht.makeScale(e,t,n),this.applyMatrix4(Ht),this}lookAt(e){return qr.lookAt(e),qr.updateMatrix(),this.applyMatrix4(qr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(fi).negate(),this.translate(fi.x,fi.y,fi.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new rt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new On);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];kt.setFromBufferAttribute(r),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,kt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,kt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(kt.min),this.boundingBox.expandByPoint(kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(kt.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Xi.setFromBufferAttribute(o),this.morphTargetsRelative?(Et.addVectors(kt.min,Xi.min),kt.expandByPoint(Et),Et.addVectors(kt.max,Xi.max),kt.expandByPoint(Et)):(kt.expandByPoint(Xi.min),kt.expandByPoint(Xi.max))}kt.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Et.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Et));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Et.fromBufferAttribute(o,l),c&&(fi.fromBufferAttribute(e,l),Et.add(fi)),s=Math.max(s,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Qt(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let b=0;b<o;b++)l[b]=new L,h[b]=new L;const u=new L,d=new L,f=new L,g=new le,_=new le,p=new le,m=new L,x=new L;function v(b,F,$){u.fromArray(s,b*3),d.fromArray(s,F*3),f.fromArray(s,$*3),g.fromArray(a,b*2),_.fromArray(a,F*2),p.fromArray(a,$*2),d.sub(u),f.sub(u),_.sub(g),p.sub(g);const ee=1/(_.x*p.y-p.x*_.y);isFinite(ee)&&(m.copy(d).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(ee),x.copy(f).multiplyScalar(_.x).addScaledVector(d,-p.x).multiplyScalar(ee),l[b].add(m),l[F].add(m),l[$].add(m),h[b].add(x),h[F].add(x),h[$].add(x))}let S=this.groups;S.length===0&&(S=[{start:0,count:n.length}]);for(let b=0,F=S.length;b<F;++b){const $=S[b],ee=$.start,P=$.count;for(let U=ee,O=ee+P;U<O;U+=3)v(n[U+0],n[U+1],n[U+2])}const C=new L,w=new L,A=new L,N=new L;function E(b){A.fromArray(r,b*3),N.copy(A);const F=l[b];C.copy(F),C.sub(A.multiplyScalar(A.dot(F))).normalize(),w.crossVectors(N,F);const ee=w.dot(h[b])<0?-1:1;c[b*4]=C.x,c[b*4+1]=C.y,c[b*4+2]=C.z,c[b*4+3]=ee}for(let b=0,F=S.length;b<F;++b){const $=S[b],ee=$.start,P=$.count;for(let U=ee,O=ee+P;U<O;U+=3)E(n[U+0]),E(n[U+1]),E(n[U+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Qt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new L,r=new L,a=new L,o=new L,c=new L,l=new L,h=new L,u=new L;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let m=0;m<h;m++)d[g++]=l[f++]}return new Qt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const rc=new st,Gn=new vr,Cs=new Oi,oc=new L,pi=new L,mi=new L,gi=new L,Yr=new L,Rs=new L,Ps=new le,Ls=new le,Is=new le,ac=new L,cc=new L,lc=new L,Ds=new L,Ns=new L;class tt extends vt{constructor(e=new Lt,t=new $t){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Rs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Yr.fromBufferAttribute(u,e),a?Rs.addScaledVector(Yr,h):Rs.addScaledVector(Yr.sub(t),h))}t.add(Rs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere),Cs.applyMatrix4(r),Gn.copy(e.ray).recast(e.near),!(Cs.containsPoint(Gn.origin)===!1&&(Gn.intersectSphere(Cs,oc)===null||Gn.origin.distanceToSquared(oc)>(e.far-e.near)**2))&&(rc.copy(r).invert(),Gn.copy(e.ray).applyMatrix4(rc),!(n.boundingBox!==null&&Gn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Gn)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,C=v;S<C;S+=3){const w=o.getX(S),A=o.getX(S+1),N=o.getX(S+2);s=Us(this,m,e,n,l,h,u,w,A,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=o.getX(p),v=o.getX(p+1),S=o.getX(p+2);s=Us(this,a,e,n,l,h,u,x,v,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let S=x,C=v;S<C;S+=3){const w=S,A=S+1,N=S+2;s=Us(this,m,e,n,l,h,u,w,A,N),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=p,v=p+1,S=p+2;s=Us(this,a,e,n,l,h,u,x,v,S),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function vd(i,e,t,n,s,r,a,o){let c;if(e.side===Ot?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Nn,o),c===null)return null;Ns.copy(o),Ns.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Ns);return l<t.near||l>t.far?null:{distance:l,point:Ns.clone(),object:i}}function Us(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,pi),i.getVertexPosition(c,mi),i.getVertexPosition(l,gi);const h=vd(i,e,t,n,pi,mi,gi,Ds);if(h){s&&(Ps.fromBufferAttribute(s,o),Ls.fromBufferAttribute(s,c),Is.fromBufferAttribute(s,l),h.uv=Vt.getInterpolation(Ds,pi,mi,gi,Ps,Ls,Is,new le)),r&&(Ps.fromBufferAttribute(r,o),Ls.fromBufferAttribute(r,c),Is.fromBufferAttribute(r,l),h.uv1=Vt.getInterpolation(Ds,pi,mi,gi,Ps,Ls,Is,new le),h.uv2=h.uv1),a&&(ac.fromBufferAttribute(a,o),cc.fromBufferAttribute(a,c),lc.fromBufferAttribute(a,l),h.normal=Vt.getInterpolation(Ds,pi,mi,gi,ac,cc,lc,new L),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new L,materialIndex:0};Vt.getNormal(pi,mi,gi,u.normal),h.face=u}return h}class ii extends Lt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new rt(l,3)),this.setAttribute("normal",new rt(h,3)),this.setAttribute("uv",new rt(u,2));function g(_,p,m,x,v,S,C,w,A,N,E){const b=S/A,F=C/N,$=S/2,ee=C/2,P=w/2,U=A+1,O=N+1;let X=0,q=0;const K=new L;for(let Z=0;Z<O;Z++){const te=Z*F-ee;for(let ae=0;ae<U;ae++){const V=ae*b-$;K[_]=V*x,K[p]=te*v,K[m]=P,l.push(K.x,K.y,K.z),K[_]=0,K[p]=0,K[m]=w>0?1:-1,h.push(K.x,K.y,K.z),u.push(ae/A),u.push(1-Z/N),X+=1}}for(let Z=0;Z<N;Z++)for(let te=0;te<A;te++){const ae=d+te+U*Z,V=d+te+U*(Z+1),ne=d+(te+1)+U*(Z+1),_e=d+(te+1)+U*Z;c.push(ae,V,_e),c.push(V,ne,_e),q+=6}o.addGroup(f,q,E),f+=q,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ii(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Di(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=Di(i[t]);for(const s in n)e[s]=n[s]}return e}function xd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Hl(i){return i.getRenderTarget()===null?i.outputColorSpace:it.workingColorSpace}const Sd={clone:Di,merge:It};var Md=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ed=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Qn extends Un{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Md,this.fragmentShader=Ed,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Di(e.uniforms),this.uniformsGroups=xd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Vl extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new st,this.projectionMatrix=new st,this.projectionMatrixInverse=new st,this.coordinateSystem=pn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class jt extends Vl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Po*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(es*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Po*2*Math.atan(Math.tan(es*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(es*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const _i=-90,vi=1;class yd extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new jt(_i,vi,e,t);s.layers=this.layers,this.add(s);const r=new jt(_i,vi,e,t);r.layers=this.layers,this.add(r);const a=new jt(_i,vi,e,t);a.layers=this.layers,this.add(a);const o=new jt(_i,vi,e,t);o.layers=this.layers,this.add(o);const c=new jt(_i,vi,e,t);c.layers=this.layers,this.add(c);const l=new jt(_i,vi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===pn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Wl extends Ft{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Pi,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bd extends Jn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(ts("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Kn?bt:Wt),this.texture=new Wl(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Ut}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ii(5,5,5),r=new Qn({name:"CubemapFromEquirect",uniforms:Di(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ot,blending:Rn});r.uniforms.tEquirect.value=t;const a=new tt(s,r),o=t.minFilter;return t.minFilter===ss&&(t.minFilter=Ut),new yd(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Zr=new L,Td=new L,wd=new Ye;class bn{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Zr.subVectors(n,t).cross(Td.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Zr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||wd.getNormalMatrix(e),s=this.coplanarPoint(Zr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new Oi,Os=new L;class Ho{constructor(e=new bn,t=new bn,n=new bn,s=new bn,r=new bn,a=new bn){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=pn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],x=s[13],v=s[14],S=s[15];if(n[0].setComponents(c-r,d-l,p-f,S-m).normalize(),n[1].setComponents(c+r,d+l,p+f,S+m).normalize(),n[2].setComponents(c+a,d+h,p+g,S+x).normalize(),n[3].setComponents(c-a,d-h,p-g,S-x).normalize(),n[4].setComponents(c-o,d-u,p-_,S-v).normalize(),t===pn)n[5].setComponents(c+o,d+u,p+_,S+v).normalize();else if(t===cr)n[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Os.x=s.normal.x>0?e.max.x:e.min.x,Os.y=s.normal.y>0?e.max.y:e.min.y,Os.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Os)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function $l(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Ad(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,h){const u=l.array,d=l.usage,f=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),f.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];t?i.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):i.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}class hs extends Lt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const x=m*d-a;for(let v=0;v<l;v++){const S=v*u-r;g.push(S,-x,0),_.push(0,0,1),p.push(v/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<o;x++){const v=x+l*m,S=x+l*(m+1),C=x+1+l*(m+1),w=x+1+l*m;f.push(v,S,w),f.push(S,C,w)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new hs(e.width,e.height,e.widthSegments,e.heightSegments)}}var Cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Rd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ld=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Id=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Dd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ud=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Od=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Fd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,kd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Zd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,jd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Kd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ef=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,rf="gl_FragColor = linearToOutputTexel( gl_FragColor );",of=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,af=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,cf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,lf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,uf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ff=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,pf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,mf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,_f=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,vf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Sf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Mf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ef=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Tf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Af=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Cf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Rf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Lf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,If=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Df=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Uf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Of=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Gf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,Wf=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Xf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Kf=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ep=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,tp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,np=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ip=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,sp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,op=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ap=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,up=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fp=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,pp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mp=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_p=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,vp=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ep=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,yp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,bp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ap=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Rp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lp=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ip=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Np=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Up=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,Op=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Fp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kp=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Gp=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vp=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wp=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$p=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xp=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qp=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yp=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Zp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Jp=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,em=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nm=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,im=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rm=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,om=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:Cd,alphahash_pars_fragment:Rd,alphamap_fragment:Pd,alphamap_pars_fragment:Ld,alphatest_fragment:Id,alphatest_pars_fragment:Dd,aomap_fragment:Nd,aomap_pars_fragment:Ud,batching_pars_vertex:Od,batching_vertex:Fd,begin_vertex:zd,beginnormal_vertex:Bd,bsdfs:kd,iridescence_fragment:Gd,bumpmap_pars_fragment:Hd,clipping_planes_fragment:Vd,clipping_planes_pars_fragment:Wd,clipping_planes_pars_vertex:$d,clipping_planes_vertex:Xd,color_fragment:qd,color_pars_fragment:Yd,color_pars_vertex:Zd,color_vertex:jd,common:Kd,cube_uv_reflection_fragment:Jd,defaultnormal_vertex:Qd,displacementmap_pars_vertex:ef,displacementmap_vertex:tf,emissivemap_fragment:nf,emissivemap_pars_fragment:sf,colorspace_fragment:rf,colorspace_pars_fragment:of,envmap_fragment:af,envmap_common_pars_fragment:cf,envmap_pars_fragment:lf,envmap_pars_vertex:hf,envmap_physical_pars_fragment:Ef,envmap_vertex:uf,fog_vertex:df,fog_pars_vertex:ff,fog_fragment:pf,fog_pars_fragment:mf,gradientmap_pars_fragment:gf,lightmap_fragment:_f,lightmap_pars_fragment:vf,lights_lambert_fragment:xf,lights_lambert_pars_fragment:Sf,lights_pars_begin:Mf,lights_toon_fragment:yf,lights_toon_pars_fragment:bf,lights_phong_fragment:Tf,lights_phong_pars_fragment:wf,lights_physical_fragment:Af,lights_physical_pars_fragment:Cf,lights_fragment_begin:Rf,lights_fragment_maps:Pf,lights_fragment_end:Lf,logdepthbuf_fragment:If,logdepthbuf_pars_fragment:Df,logdepthbuf_pars_vertex:Nf,logdepthbuf_vertex:Uf,map_fragment:Of,map_pars_fragment:Ff,map_particle_fragment:zf,map_particle_pars_fragment:Bf,metalnessmap_fragment:kf,metalnessmap_pars_fragment:Gf,morphcolor_vertex:Hf,morphnormal_vertex:Vf,morphtarget_pars_vertex:Wf,morphtarget_vertex:$f,normal_fragment_begin:Xf,normal_fragment_maps:qf,normal_pars_fragment:Yf,normal_pars_vertex:Zf,normal_vertex:jf,normalmap_pars_fragment:Kf,clearcoat_normal_fragment_begin:Jf,clearcoat_normal_fragment_maps:Qf,clearcoat_pars_fragment:ep,iridescence_pars_fragment:tp,opaque_fragment:np,packing:ip,premultiplied_alpha_fragment:sp,project_vertex:rp,dithering_fragment:op,dithering_pars_fragment:ap,roughnessmap_fragment:cp,roughnessmap_pars_fragment:lp,shadowmap_pars_fragment:hp,shadowmap_pars_vertex:up,shadowmap_vertex:dp,shadowmask_pars_fragment:fp,skinbase_vertex:pp,skinning_pars_vertex:mp,skinning_vertex:gp,skinnormal_vertex:_p,specularmap_fragment:vp,specularmap_pars_fragment:xp,tonemapping_fragment:Sp,tonemapping_pars_fragment:Mp,transmission_fragment:Ep,transmission_pars_fragment:yp,uv_pars_fragment:bp,uv_pars_vertex:Tp,uv_vertex:wp,worldpos_vertex:Ap,background_vert:Cp,background_frag:Rp,backgroundCube_vert:Pp,backgroundCube_frag:Lp,cube_vert:Ip,cube_frag:Dp,depth_vert:Np,depth_frag:Up,distanceRGBA_vert:Op,distanceRGBA_frag:Fp,equirect_vert:zp,equirect_frag:Bp,linedashed_vert:kp,linedashed_frag:Gp,meshbasic_vert:Hp,meshbasic_frag:Vp,meshlambert_vert:Wp,meshlambert_frag:$p,meshmatcap_vert:Xp,meshmatcap_frag:qp,meshnormal_vert:Yp,meshnormal_frag:Zp,meshphong_vert:jp,meshphong_frag:Kp,meshphysical_vert:Jp,meshphysical_frag:Qp,meshtoon_vert:em,meshtoon_frag:tm,points_vert:nm,points_frag:im,shadow_vert:sm,shadow_frag:rm,sprite_vert:om,sprite_frag:am},me={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new le(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new le(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},tn={basic:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:It([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:It([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new Ke(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:It([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:It([me.points,me.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:It([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:It([me.common,me.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:It([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:It([me.sprite,me.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:It([me.common,me.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:It([me.lights,me.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};tn.physical={uniforms:It([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new le(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new le},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new le},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const Fs={r:0,b:0,g:0};function cm(i,e,t,n,s,r,a){const o=new Ke(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(p,m){let x=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v===null?_(o,c):v&&v.isColor&&(_(v,1),x=!0);const S=i.xr.getEnvironmentBlendMode();S==="additive"?n.buffers.color.setClear(0,0,0,1,a):S==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===gr)?(h===void 0&&(h=new tt(new ii(1,1,1),new Qn({name:"BackgroundCubeMaterial",uniforms:Di(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:Ot,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=it.getTransfer(v.colorSpace)!==at,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new tt(new hs(2,2),new Qn({name:"BackgroundMaterial",uniforms:Di(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Nn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=it.getTransfer(v.colorSpace)!==at,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,m){p.getRGB(Fs,Hl(i)),n.buffers.color.setClear(Fs.r,Fs.g,Fs.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),c=m,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:g}}function lm(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null);let l=c,h=!1;function u(P,U,O,X,q){let K=!1;if(a){const Z=_(X,O,U);l!==Z&&(l=Z,f(l.object)),K=m(P,X,O,q),K&&x(P,X,O,q)}else{const Z=U.wireframe===!0;(l.geometry!==X.id||l.program!==O.id||l.wireframe!==Z)&&(l.geometry=X.id,l.program=O.id,l.wireframe=Z,K=!0)}q!==null&&t.update(q,i.ELEMENT_ARRAY_BUFFER),(K||h)&&(h=!1,N(P,U,O,X),q!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(q).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function g(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function _(P,U,O){const X=O.wireframe===!0;let q=o[P.id];q===void 0&&(q={},o[P.id]=q);let K=q[U.id];K===void 0&&(K={},q[U.id]=K);let Z=K[X];return Z===void 0&&(Z=p(d()),K[X]=Z),Z}function p(P){const U=[],O=[],X=[];for(let q=0;q<s;q++)U[q]=0,O[q]=0,X[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:O,attributeDivisors:X,object:P,attributes:{},index:null}}function m(P,U,O,X){const q=l.attributes,K=U.attributes;let Z=0;const te=O.getAttributes();for(const ae in te)if(te[ae].location>=0){const ne=q[ae];let _e=K[ae];if(_e===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(_e=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(_e=P.instanceColor)),ne===void 0||ne.attribute!==_e||_e&&ne.data!==_e.data)return!0;Z++}return l.attributesNum!==Z||l.index!==X}function x(P,U,O,X){const q={},K=U.attributes;let Z=0;const te=O.getAttributes();for(const ae in te)if(te[ae].location>=0){let ne=K[ae];ne===void 0&&(ae==="instanceMatrix"&&P.instanceMatrix&&(ne=P.instanceMatrix),ae==="instanceColor"&&P.instanceColor&&(ne=P.instanceColor));const _e={};_e.attribute=ne,ne&&ne.data&&(_e.data=ne.data),q[ae]=_e,Z++}l.attributes=q,l.attributesNum=Z,l.index=X}function v(){const P=l.newAttributes;for(let U=0,O=P.length;U<O;U++)P[U]=0}function S(P){C(P,0)}function C(P,U){const O=l.newAttributes,X=l.enabledAttributes,q=l.attributeDivisors;O[P]=1,X[P]===0&&(i.enableVertexAttribArray(P),X[P]=1),q[P]!==U&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,U),q[P]=U)}function w(){const P=l.newAttributes,U=l.enabledAttributes;for(let O=0,X=U.length;O<X;O++)U[O]!==P[O]&&(i.disableVertexAttribArray(O),U[O]=0)}function A(P,U,O,X,q,K,Z){Z===!0?i.vertexAttribIPointer(P,U,O,q,K):i.vertexAttribPointer(P,U,O,X,q,K)}function N(P,U,O,X){if(n.isWebGL2===!1&&(P.isInstancedMesh||X.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const q=X.attributes,K=O.getAttributes(),Z=U.defaultAttributeValues;for(const te in K){const ae=K[te];if(ae.location>=0){let V=q[te];if(V===void 0&&(te==="instanceMatrix"&&P.instanceMatrix&&(V=P.instanceMatrix),te==="instanceColor"&&P.instanceColor&&(V=P.instanceColor)),V!==void 0){const ne=V.normalized,_e=V.itemSize,Te=t.get(V);if(Te===void 0)continue;const Se=Te.buffer,Ne=Te.type,ze=Te.bytesPerElement,Ae=n.isWebGL2===!0&&(Ne===i.INT||Ne===i.UNSIGNED_INT||V.gpuType===Tl);if(V.isInterleavedBufferAttribute){const Fe=V.data,I=Fe.stride,fe=V.offset;if(Fe.isInstancedInterleavedBuffer){for(let Q=0;Q<ae.locationSize;Q++)C(ae.location+Q,Fe.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=Fe.meshPerAttribute*Fe.count)}else for(let Q=0;Q<ae.locationSize;Q++)S(ae.location+Q);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let Q=0;Q<ae.locationSize;Q++)A(ae.location+Q,_e/ae.locationSize,Ne,ne,I*ze,(fe+_e/ae.locationSize*Q)*ze,Ae)}else{if(V.isInstancedBufferAttribute){for(let Fe=0;Fe<ae.locationSize;Fe++)C(ae.location+Fe,V.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Fe=0;Fe<ae.locationSize;Fe++)S(ae.location+Fe);i.bindBuffer(i.ARRAY_BUFFER,Se);for(let Fe=0;Fe<ae.locationSize;Fe++)A(ae.location+Fe,_e/ae.locationSize,Ne,ne,_e*ze,_e/ae.locationSize*Fe*ze,Ae)}}else if(Z!==void 0){const ne=Z[te];if(ne!==void 0)switch(ne.length){case 2:i.vertexAttrib2fv(ae.location,ne);break;case 3:i.vertexAttrib3fv(ae.location,ne);break;case 4:i.vertexAttrib4fv(ae.location,ne);break;default:i.vertexAttrib1fv(ae.location,ne)}}}}w()}function E(){$();for(const P in o){const U=o[P];for(const O in U){const X=U[O];for(const q in X)g(X[q].object),delete X[q];delete U[O]}delete o[P]}}function b(P){if(o[P.id]===void 0)return;const U=o[P.id];for(const O in U){const X=U[O];for(const q in X)g(X[q].object),delete X[q];delete U[O]}delete o[P.id]}function F(P){for(const U in o){const O=o[U];if(O[P.id]===void 0)continue;const X=O[P.id];for(const q in X)g(X[q].object),delete X[q];delete O[P.id]}}function $(){ee(),h=!0,l!==c&&(l=c,f(l.object))}function ee(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:$,resetDefaultState:ee,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfProgram:F,initAttributes:v,enableAttribute:S,disableUnusedAttributes:w}}function hm(i,e,t,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),t.update(u,r,1)}function c(h,u,d){if(d===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),t.update(u,r,d)}function l(h,u,d){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function um(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,S=a||e.has("OES_texture_float"),C=v&&S,w=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:S,floatVertexTextures:C,maxSamples:w}}function dm(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new bn,o=new Ye,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const x=r?0:n,v=x*4;let S=m.clippingState||null;c.value=S,S=h(g,d,v,f);for(let C=0;C!==v;++C)S[C]=t[C];m.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,S=f;v!==_;++v,S+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(p,S),p[S+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function fm(i){let e=new WeakMap;function t(a,o){return o===To?a.mapping=Pi:o===wo&&(a.mapping=Li),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===To||o===wo)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new bd(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Vo extends Vl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bi=4,hc=[.125,.215,.35,.446,.526,.582],Xn=20,jr=new Vo,uc=new Ke;let Kr=null,Jr=0,Qr=0;const Vn=(1+Math.sqrt(5))/2,xi=1/Vn,dc=[new L(1,1,1),new L(-1,1,1),new L(1,1,-1),new L(-1,1,-1),new L(0,Vn,xi),new L(0,Vn,-xi),new L(xi,0,Vn),new L(-xi,0,Vn),new L(Vn,xi,0),new L(-Vn,xi,0)];class Io{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Kr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Kr,Jr,Qr),e.scissorTest=!1,zs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===Li?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kr=this._renderer.getRenderTarget(),Jr=this._renderer.getActiveCubeFace(),Qr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ut,minFilter:Ut,generateMipmaps:!1,type:rs,format:Jt,colorSpace:gn,depthBuffer:!1},s=fc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fc(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=pm(r)),this._blurMaterial=mm(r,e,t)}return s}_compileMaterial(e){const t=new tt(this._lodPlanes[0],e);this._renderer.compile(t,jr)}_sceneToCubeUV(e,t,n,s){const o=new jt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(uc),h.toneMapping=Pn,h.autoClear=!1;const f=new $t({name:"PMREM.Background",side:Ot,depthWrite:!1,depthTest:!1}),g=new tt(new ii,f);let _=!1;const p=e.background;p?p.isColor&&(f.color.copy(p),e.background=null,_=!0):(f.color.copy(uc),_=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,c[m],0),o.lookAt(l[m],0,0)):x===1?(o.up.set(0,0,c[m]),o.lookAt(0,l[m],0)):(o.up.set(0,c[m],0),o.lookAt(0,0,l[m]));const v=this._cubeSize;zs(s,x*v,m>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Pi||e.mapping===Li;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new tt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;zs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,jr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=dc[(s-1)%dc.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new tt(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Xn-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Xn;p>Xn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Xn}`);const m=[];let x=0;for(let A=0;A<Xn;++A){const N=A/_,E=Math.exp(-N*N/2);m.push(E),A===0?x+=E:A<p&&(x+=2*E)}for(let A=0;A<m.length;A++)m[A]=m[A]/x;d.envMap.value=e.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const S=this._sizeLods[s],C=3*S*(s>v-bi?s-v+bi:0),w=4*(this._cubeSize-S);zs(t,C,w,3*S,2*S),c.setRenderTarget(t),c.render(u,jr)}}function pm(i){const e=[],t=[],n=[];let s=i;const r=i-bi+1+hc.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-bi?c=hc[a-i+bi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*f),v=new Float32Array(p*g*f),S=new Float32Array(m*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,N=w>2?0:-1,E=[A,N,0,A+2/3,N,0,A+2/3,N+1,0,A,N,0,A+2/3,N+1,0,A,N+1,0];x.set(E,_*g*w),v.set(d,p*g*w);const b=[w,w,w,w,w,w];S.set(b,m*g*w)}const C=new Lt;C.setAttribute("position",new Qt(x,_)),C.setAttribute("uv",new Qt(v,p)),C.setAttribute("faceIndex",new Qt(S,m)),e.push(C),s>bi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function fc(i,e,t){const n=new Jn(i,e,t);return n.texture.mapping=gr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function zs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function mm(i,e,t){const n=new Float32Array(Xn),s=new L(0,1,0);return new Qn({name:"SphericalGaussianBlur",defines:{n:Xn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function pc(){return new Qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function mc(){return new Qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Rn,depthTest:!1,depthWrite:!1})}function Wo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function gm(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===To||c===wo,h=c===Pi||c===Li;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=e.get(o);return t===null&&(t=new Io(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),e.set(o,u),u.texture}else{if(e.has(o))return e.get(o).texture;{const u=o.image;if(l&&u&&u.height>0||h&&u&&s(u)){t===null&&(t=new Io(i));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function _m(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function vm(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)e.remove(_[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)e.update(_[p],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let v=0,S=x.length;v<S;v+=3){const C=x[v+0],w=x[v+1],A=x[v+2];d.push(C,w,w,A,A,C)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,S=x.length/3-1;v<S;v+=3){const C=v+0,w=v+1,A=v+2;d.push(C,w,w,A,A,C)}}else return;const p=new(Ul(d)?Gl:kl)(d,1);p.version=_;const m=r.get(u);m&&e.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function xm(i,e,t,n){const s=n.isWebGL2;let r;function a(f){r=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function h(f,g){i.drawElements(r,g,o,f*c),t.update(g,r,1)}function u(f,g,_){if(_===0)return;let p,m;if(s)p=i,m="drawElementsInstanced";else if(p=e.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,f*c,_),t.update(g,r,_)}function d(f,g,_){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/c,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let m=0;for(let x=0;x<_;x++)m+=g[x];t.update(m,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Sm(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Mm(i,e){return i[0]-e[0]}function Em(i,e){return Math.abs(e[1])-Math.abs(i[1])}function ym(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new yt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let U=function(){ee.dispose(),r.delete(h),h.removeEventListener("dispose",U)};var f=U;p!==void 0&&p.texture.dispose();const v=h.morphAttributes.position!==void 0,S=h.morphAttributes.normal!==void 0,C=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let E=0;v===!0&&(E=1),S===!0&&(E=2),C===!0&&(E=3);let b=h.attributes.position.count*E,F=1;b>e.maxTextureSize&&(F=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const $=new Float32Array(b*F*4*_),ee=new zl($,b,F,_);ee.type=wn,ee.needsUpdate=!0;const P=E*4;for(let O=0;O<_;O++){const X=w[O],q=A[O],K=N[O],Z=b*F*4*O;for(let te=0;te<X.count;te++){const ae=te*P;v===!0&&(a.fromBufferAttribute(X,te),$[Z+ae+0]=a.x,$[Z+ae+1]=a.y,$[Z+ae+2]=a.z,$[Z+ae+3]=0),S===!0&&(a.fromBufferAttribute(q,te),$[Z+ae+4]=a.x,$[Z+ae+5]=a.y,$[Z+ae+6]=a.z,$[Z+ae+7]=0),C===!0&&(a.fromBufferAttribute(K,te),$[Z+ae+8]=a.x,$[Z+ae+9]=a.y,$[Z+ae+10]=a.z,$[Z+ae+11]=K.itemSize===4?a.w:1)}}p={count:_,texture:ee,size:new le(b,F)},r.set(h,p),h.addEventListener("dispose",U)}let m=0;for(let v=0;v<d.length;v++)m+=d[v];const x=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let S=0;S<g;S++)_[S]=[S,0];n[h.id]=_}for(let S=0;S<g;S++){const C=_[S];C[0]=S,C[1]=d[S]}_.sort(Em);for(let S=0;S<8;S++)S<g&&_[S][1]?(o[S][0]=_[S][0],o[S][1]=_[S][1]):(o[S][0]=Number.MAX_SAFE_INTEGER,o[S][1]=0);o.sort(Mm);const p=h.morphAttributes.position,m=h.morphAttributes.normal;let x=0;for(let S=0;S<8;S++){const C=o[S],w=C[0],A=C[1];w!==Number.MAX_SAFE_INTEGER&&A?(p&&h.getAttribute("morphTarget"+S)!==p[w]&&h.setAttribute("morphTarget"+S,p[w]),m&&h.getAttribute("morphNormal"+S)!==m[w]&&h.setAttribute("morphNormal"+S,m[w]),s[S]=A,x+=A):(p&&h.hasAttribute("morphTarget"+S)===!0&&h.deleteAttribute("morphTarget"+S),m&&h.hasAttribute("morphNormal"+S)===!0&&h.deleteAttribute("morphNormal"+S),s[S]=0)}const v=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(i,"morphTargetBaseInfluence",v),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function bm(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Xl extends Ft{constructor(e,t,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:jn,h!==jn&&h!==Ii)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===jn&&(n=Tn),n===void 0&&h===Ii&&(n=Zn),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Dt,this.minFilter=c!==void 0?c:Dt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ql=new Ft,Yl=new Xl(1,1);Yl.compareFunction=Nl;const Zl=new zl,jl=new ad,Kl=new Wl,gc=[],_c=[],vc=new Float32Array(16),xc=new Float32Array(9),Sc=new Float32Array(4);function zi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=gc[s];if(r===void 0&&(r=new Float32Array(s),gc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function xt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function xr(i,e){let t=_c[e];t===void 0&&(t=new Int32Array(e),_c[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Tm(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function wm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function Am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(xt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function Cm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Rm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(xt(t,n))return;Sc.set(n),i.uniformMatrix2fv(this.addr,!1,Sc),St(t,n)}}function Pm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(xt(t,n))return;xc.set(n),i.uniformMatrix3fv(this.addr,!1,xc),St(t,n)}}function Lm(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(xt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(xt(t,n))return;vc.set(n),i.uniformMatrix4fv(this.addr,!1,vc),St(t,n)}}function Im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Dm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function Um(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Om(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Fm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(xt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function zm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(xt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function Bm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(xt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function km(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?Yl:ql;t.setTexture2D(e||r,s)}function Gm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||jl,s)}function Hm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Kl,s)}function Vm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Zl,s)}function Wm(i){switch(i){case 5126:return Tm;case 35664:return wm;case 35665:return Am;case 35666:return Cm;case 35674:return Rm;case 35675:return Pm;case 35676:return Lm;case 5124:case 35670:return Im;case 35667:case 35671:return Dm;case 35668:case 35672:return Nm;case 35669:case 35673:return Um;case 5125:return Om;case 36294:return Fm;case 36295:return zm;case 36296:return Bm;case 35678:case 36198:case 36298:case 36306:case 35682:return km;case 35679:case 36299:case 36307:return Gm;case 35680:case 36300:case 36308:case 36293:return Hm;case 36289:case 36303:case 36311:case 36292:return Vm}}function $m(i,e){i.uniform1fv(this.addr,e)}function Xm(i,e){const t=zi(e,this.size,2);i.uniform2fv(this.addr,t)}function qm(i,e){const t=zi(e,this.size,3);i.uniform3fv(this.addr,t)}function Ym(i,e){const t=zi(e,this.size,4);i.uniform4fv(this.addr,t)}function Zm(i,e){const t=zi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function jm(i,e){const t=zi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Km(i,e){const t=zi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Jm(i,e){i.uniform1iv(this.addr,e)}function Qm(i,e){i.uniform2iv(this.addr,e)}function eg(i,e){i.uniform3iv(this.addr,e)}function tg(i,e){i.uniform4iv(this.addr,e)}function ng(i,e){i.uniform1uiv(this.addr,e)}function ig(i,e){i.uniform2uiv(this.addr,e)}function sg(i,e){i.uniform3uiv(this.addr,e)}function rg(i,e){i.uniform4uiv(this.addr,e)}function og(i,e,t){const n=this.cache,s=e.length,r=xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||ql,r[a])}function ag(i,e,t){const n=this.cache,s=e.length,r=xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||jl,r[a])}function cg(i,e,t){const n=this.cache,s=e.length,r=xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Kl,r[a])}function lg(i,e,t){const n=this.cache,s=e.length,r=xr(t,s);xt(n,r)||(i.uniform1iv(this.addr,r),St(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Zl,r[a])}function hg(i){switch(i){case 5126:return $m;case 35664:return Xm;case 35665:return qm;case 35666:return Ym;case 35674:return Zm;case 35675:return jm;case 35676:return Km;case 5124:case 35670:return Jm;case 35667:case 35671:return Qm;case 35668:case 35672:return eg;case 35669:case 35673:return tg;case 5125:return ng;case 36294:return ig;case 36295:return sg;case 36296:return rg;case 35678:case 36198:case 36298:case 36306:case 35682:return og;case 35679:case 36299:case 36307:return ag;case 35680:case 36300:case 36308:case 36293:return cg;case 36289:case 36303:case 36311:case 36292:return lg}}class ug{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wm(t.type)}}class dg{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=hg(t.type)}}class fg{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const eo=/(\w+)(\])?(\[|\.)?/g;function Mc(i,e){i.seq.push(e),i.map[e.id]=e}function pg(i,e,t){const n=i.name,s=n.length;for(eo.lastIndex=0;;){const r=eo.exec(n),a=eo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Mc(t,l===void 0?new ug(o,i,e):new dg(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new fg(o),Mc(t,u)),t=u}}}class Qs{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);pg(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ec(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const mg=37297;let gg=0;function _g(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function vg(i){const e=it.getPrimaries(it.workingColorSpace),t=it.getPrimaries(i);let n;switch(e===t?n="":e===ar&&t===or?n="LinearDisplayP3ToLinearSRGB":e===or&&t===ar&&(n="LinearSRGBToLinearDisplayP3"),i){case gn:case _r:return[n,"LinearTransferOETF"];case bt:case ko:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function yc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+_g(i.getShaderSource(e),a)}else return s}function xg(i,e){const t=vg(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Sg(i,e){let t;switch(e){case Ru:t="Linear";break;case Pu:t="Reinhard";break;case Lu:t="OptimizedCineon";break;case Iu:t="ACESFilmic";break;case Nu:t="AgX";break;case Du:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Mg(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ti).join(`
`)}function Eg(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ti).join(`
`)}function yg(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function bg(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ti(i){return i!==""}function bc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Tc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Tg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Do(i){return i.replace(Tg,Ag)}const wg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Ag(i,e){let t=We[e];if(t===void 0){const n=wg.get(e);if(n!==void 0)t=We[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Do(t)}const Cg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function wc(i){return i.replace(Cg,Rg)}function Rg(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ac(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Pg(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===El?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===iu?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===dn&&(e="SHADOWMAP_TYPE_VSM"),e}function Lg(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Pi:case Li:e="ENVMAP_TYPE_CUBE";break;case gr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function Ig(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Li:e="ENVMAP_MODE_REFRACTION";break}return e}function Dg(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case yl:e="ENVMAP_BLENDING_MULTIPLY";break;case Au:e="ENVMAP_BLENDING_MIX";break;case Cu:e="ENVMAP_BLENDING_ADD";break}return e}function Ng(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Ug(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Pg(t),l=Lg(t),h=Ig(t),u=Dg(t),d=Ng(t),f=t.isWebGL2?"":Mg(t),g=Eg(t),_=yg(r),p=s.createProgram();let m,x,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ti).join(`
`),x.length>0&&(x+=`
`)):(m=[Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ti).join(`
`),x=[f,Ac(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?We.tonemapping_pars_fragment:"",t.toneMapping!==Pn?Sg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,xg("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ti).join(`
`)),a=Do(a),a=bc(a,t),a=Tc(a,t),o=Do(o),o=bc(o,t),o=Tc(o,t),a=wc(a),o=wc(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Xa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const S=v+m+a,C=v+x+o,w=Ec(s,s.VERTEX_SHADER,S),A=Ec(s,s.FRAGMENT_SHADER,C);s.attachShader(p,w),s.attachShader(p,A),t.index0AttributeName!==void 0?s.bindAttribLocation(p,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function N($){if(i.debug.checkShaderErrors){const ee=s.getProgramInfoLog(p).trim(),P=s.getShaderInfoLog(w).trim(),U=s.getShaderInfoLog(A).trim();let O=!0,X=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(O=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,w,A);else{const q=yc(s,w,"vertex"),K=yc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+ee+`
`+q+`
`+K)}else ee!==""?console.warn("THREE.WebGLProgram: Program Info Log:",ee):(P===""||U==="")&&(X=!1);X&&($.diagnostics={runnable:O,programLog:ee,vertexShader:{log:P,prefix:m},fragmentShader:{log:U,prefix:x}})}s.deleteShader(w),s.deleteShader(A),E=new Qs(s,p),b=bg(s,p)}let E;this.getUniforms=function(){return E===void 0&&N(this),E};let b;this.getAttributes=function(){return b===void 0&&N(this),b};let F=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return F===!1&&(F=s.getProgramParameter(p,mg)),F},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=gg++,this.cacheKey=e,this.usedTimes=1,this.program=p,this.vertexShader=w,this.fragmentShader=A,this}let Og=0;class Fg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new zg(e),t.set(e,n)),n}}class zg{constructor(e){this.id=Og++,this.code=e,this.usedTimes=0}}function Bg(i,e,t,n,s,r,a){const o=new Go,c=new Fg,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function p(E,b,F,$,ee){const P=$.fog,U=ee.geometry,O=E.isMeshStandardMaterial?$.environment:null,X=(E.isMeshStandardMaterial?t:e).get(E.envMap||O),q=X&&X.mapping===gr?X.image.height:null,K=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Z=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,te=Z!==void 0?Z.length:0;let ae=0;U.morphAttributes.position!==void 0&&(ae=1),U.morphAttributes.normal!==void 0&&(ae=2),U.morphAttributes.color!==void 0&&(ae=3);let V,ne,_e,Te;if(K){const ft=tn[K];V=ft.vertexShader,ne=ft.fragmentShader}else V=E.vertexShader,ne=E.fragmentShader,c.update(E),_e=c.getVertexShaderID(E),Te=c.getFragmentShaderID(E);const Se=i.getRenderTarget(),Ne=ee.isInstancedMesh===!0,ze=ee.isBatchedMesh===!0,Ae=!!E.map,Fe=!!E.matcap,I=!!X,fe=!!E.aoMap,Q=!!E.lightMap,he=!!E.bumpMap,J=!!E.normalMap,Ce=!!E.displacementMap,xe=!!E.emissiveMap,y=!!E.metalnessMap,M=!!E.roughnessMap,z=E.anisotropy>0,oe=E.clearcoat>0,se=E.iridescence>0,ie=E.sheen>0,we=E.transmission>0,ge=z&&!!E.anisotropyMap,Ee=oe&&!!E.clearcoatMap,Ie=oe&&!!E.clearcoatNormalMap,Ge=oe&&!!E.clearcoatRoughnessMap,re=se&&!!E.iridescenceMap,Je=se&&!!E.iridescenceThicknessMap,$e=ie&&!!E.sheenColorMap,Be=ie&&!!E.sheenRoughnessMap,Le=!!E.specularMap,Me=!!E.specularColorMap,R=!!E.specularIntensityMap,ue=we&&!!E.transmissionMap,Re=we&&!!E.thicknessMap,be=!!E.gradientMap,ce=!!E.alphaMap,D=E.alphaTest>0,de=!!E.alphaHash,ve=!!E.extensions,Ue=!!U.attributes.uv1,De=!!U.attributes.uv2,Ze=!!U.attributes.uv3;let je=Pn;return E.toneMapped&&(Se===null||Se.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:K,shaderType:E.type,shaderName:E.name,vertexShader:V,fragmentShader:ne,defines:E.defines,customVertexShaderID:_e,customFragmentShaderID:Te,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ze,instancing:Ne,instancingColor:Ne&&ee.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Se===null?i.outputColorSpace:Se.isXRRenderTarget===!0?Se.texture.colorSpace:gn,map:Ae,matcap:Fe,envMap:I,envMapMode:I&&X.mapping,envMapCubeUVHeight:q,aoMap:fe,lightMap:Q,bumpMap:he,normalMap:J,displacementMap:d&&Ce,emissiveMap:xe,normalMapObjectSpace:J&&E.normalMapType===Xu,normalMapTangentSpace:J&&E.normalMapType===Dl,metalnessMap:y,roughnessMap:M,anisotropy:z,anisotropyMap:ge,clearcoat:oe,clearcoatMap:Ee,clearcoatNormalMap:Ie,clearcoatRoughnessMap:Ge,iridescence:se,iridescenceMap:re,iridescenceThicknessMap:Je,sheen:ie,sheenColorMap:$e,sheenRoughnessMap:Be,specularMap:Le,specularColorMap:Me,specularIntensityMap:R,transmission:we,transmissionMap:ue,thicknessMap:Re,gradientMap:be,opaque:E.transparent===!1&&E.blending===Ai,alphaMap:ce,alphaTest:D,alphaHash:de,combine:E.combine,mapUv:Ae&&_(E.map.channel),aoMapUv:fe&&_(E.aoMap.channel),lightMapUv:Q&&_(E.lightMap.channel),bumpMapUv:he&&_(E.bumpMap.channel),normalMapUv:J&&_(E.normalMap.channel),displacementMapUv:Ce&&_(E.displacementMap.channel),emissiveMapUv:xe&&_(E.emissiveMap.channel),metalnessMapUv:y&&_(E.metalnessMap.channel),roughnessMapUv:M&&_(E.roughnessMap.channel),anisotropyMapUv:ge&&_(E.anisotropyMap.channel),clearcoatMapUv:Ee&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:re&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Je&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Be&&_(E.sheenRoughnessMap.channel),specularMapUv:Le&&_(E.specularMap.channel),specularColorMapUv:Me&&_(E.specularColorMap.channel),specularIntensityMapUv:R&&_(E.specularIntensityMap.channel),transmissionMapUv:ue&&_(E.transmissionMap.channel),thicknessMapUv:Re&&_(E.thicknessMap.channel),alphaMapUv:ce&&_(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(J||z),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,vertexUv1s:Ue,vertexUv2s:De,vertexUv3s:Ze,pointsUvs:ee.isPoints===!0&&!!U.attributes.uv&&(Ae||ce),fog:!!P,useFog:E.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:ee.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:ae,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&F.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Ae&&E.map.isVideoTexture===!0&&it.getTransfer(E.map.colorSpace)===at,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Pt,flipSided:E.side===Ot,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ve&&E.extensions.derivatives===!0,extensionFragDepth:ve&&E.extensions.fragDepth===!0,extensionDrawBuffers:ve&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ve&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ve&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function m(E){const b=[];if(E.shaderID?b.push(E.shaderID):(b.push(E.customVertexShaderID),b.push(E.customFragmentShaderID)),E.defines!==void 0)for(const F in E.defines)b.push(F),b.push(E.defines[F]);return E.isRawShaderMaterial===!1&&(x(b,E),v(b,E),b.push(i.outputColorSpace)),b.push(E.customProgramCacheKey),b.join()}function x(E,b){E.push(b.precision),E.push(b.outputColorSpace),E.push(b.envMapMode),E.push(b.envMapCubeUVHeight),E.push(b.mapUv),E.push(b.alphaMapUv),E.push(b.lightMapUv),E.push(b.aoMapUv),E.push(b.bumpMapUv),E.push(b.normalMapUv),E.push(b.displacementMapUv),E.push(b.emissiveMapUv),E.push(b.metalnessMapUv),E.push(b.roughnessMapUv),E.push(b.anisotropyMapUv),E.push(b.clearcoatMapUv),E.push(b.clearcoatNormalMapUv),E.push(b.clearcoatRoughnessMapUv),E.push(b.iridescenceMapUv),E.push(b.iridescenceThicknessMapUv),E.push(b.sheenColorMapUv),E.push(b.sheenRoughnessMapUv),E.push(b.specularMapUv),E.push(b.specularColorMapUv),E.push(b.specularIntensityMapUv),E.push(b.transmissionMapUv),E.push(b.thicknessMapUv),E.push(b.combine),E.push(b.fogExp2),E.push(b.sizeAttenuation),E.push(b.morphTargetsCount),E.push(b.morphAttributeCount),E.push(b.numDirLights),E.push(b.numPointLights),E.push(b.numSpotLights),E.push(b.numSpotLightMaps),E.push(b.numHemiLights),E.push(b.numRectAreaLights),E.push(b.numDirLightShadows),E.push(b.numPointLightShadows),E.push(b.numSpotLightShadows),E.push(b.numSpotLightShadowsWithMaps),E.push(b.numLightProbes),E.push(b.shadowMapType),E.push(b.toneMapping),E.push(b.numClippingPlanes),E.push(b.numClipIntersection),E.push(b.depthPacking)}function v(E,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),E.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function S(E){const b=g[E.type];let F;if(b){const $=tn[b];F=Sd.clone($.uniforms)}else F=E.uniforms;return F}function C(E,b){let F;for(let $=0,ee=l.length;$<ee;$++){const P=l[$];if(P.cacheKey===b){F=P,++F.usedTimes;break}}return F===void 0&&(F=new Ug(i,b,E,r),l.push(F)),F}function w(E){if(--E.usedTimes===0){const b=l.indexOf(E);l[b]=l[l.length-1],l.pop(),E.destroy()}}function A(E){c.remove(E)}function N(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:S,acquireProgram:C,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:N}}function kg(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function Gg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Cc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Rc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,p){let m=i[e];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[e]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),e++,m}function o(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):t.push(m)}function c(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):t.unshift(m)}function l(u,d){t.length>1&&t.sort(u||Gg),n.length>1&&n.sort(d||Cc),s.length>1&&s.sort(d||Cc)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Hg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Rc,i.set(n,[a])):s>=r.length?(a=new Rc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Vg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new L,color:new Ke};break;case"SpotLight":t={position:new L,direction:new L,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new L,halfWidth:new L,halfHeight:new L};break}return i[e.id]=t,t}}}function Wg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new le,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let $g=0;function Xg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function qg(i,e){const t=new Vg,n=Wg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new L);const r=new L,a=new st,o=new st;function c(h,u){let d=0,f=0,g=0;for(let $=0;$<9;$++)s.probe[$].set(0,0,0);let _=0,p=0,m=0,x=0,v=0,S=0,C=0,w=0,A=0,N=0,E=0;h.sort(Xg);const b=u===!0?Math.PI:1;for(let $=0,ee=h.length;$<ee;$++){const P=h[$],U=P.color,O=P.intensity,X=P.distance,q=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=U.r*O*b,f+=U.g*O*b,g+=U.b*O*b;else if(P.isLightProbe){for(let K=0;K<9;K++)s.probe[K].addScaledVector(P.sh.coefficients[K],O);E++}else if(P.isDirectionalLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity*b),P.castShadow){const Z=P.shadow,te=n.get(P);te.shadowBias=Z.bias,te.shadowNormalBias=Z.normalBias,te.shadowRadius=Z.radius,te.shadowMapSize=Z.mapSize,s.directionalShadow[_]=te,s.directionalShadowMap[_]=q,s.directionalShadowMatrix[_]=P.shadow.matrix,S++}s.directional[_]=K,_++}else if(P.isSpotLight){const K=t.get(P);K.position.setFromMatrixPosition(P.matrixWorld),K.color.copy(U).multiplyScalar(O*b),K.distance=X,K.coneCos=Math.cos(P.angle),K.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),K.decay=P.decay,s.spot[m]=K;const Z=P.shadow;if(P.map&&(s.spotLightMap[A]=P.map,A++,Z.updateMatrices(P),P.castShadow&&N++),s.spotLightMatrix[m]=Z.matrix,P.castShadow){const te=n.get(P);te.shadowBias=Z.bias,te.shadowNormalBias=Z.normalBias,te.shadowRadius=Z.radius,te.shadowMapSize=Z.mapSize,s.spotShadow[m]=te,s.spotShadowMap[m]=q,w++}m++}else if(P.isRectAreaLight){const K=t.get(P);K.color.copy(U).multiplyScalar(O),K.halfWidth.set(P.width*.5,0,0),K.halfHeight.set(0,P.height*.5,0),s.rectArea[x]=K,x++}else if(P.isPointLight){const K=t.get(P);if(K.color.copy(P.color).multiplyScalar(P.intensity*b),K.distance=P.distance,K.decay=P.decay,P.castShadow){const Z=P.shadow,te=n.get(P);te.shadowBias=Z.bias,te.shadowNormalBias=Z.normalBias,te.shadowRadius=Z.radius,te.shadowMapSize=Z.mapSize,te.shadowCameraNear=Z.camera.near,te.shadowCameraFar=Z.camera.far,s.pointShadow[p]=te,s.pointShadowMap[p]=q,s.pointShadowMatrix[p]=P.shadow.matrix,C++}s.point[p]=K,p++}else if(P.isHemisphereLight){const K=t.get(P);K.skyColor.copy(P.color).multiplyScalar(O*b),K.groundColor.copy(P.groundColor).multiplyScalar(O*b),s.hemi[v]=K,v++}}x>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=me.LTC_FLOAT_1,s.rectAreaLTC2=me.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=me.LTC_HALF_1,s.rectAreaLTC2=me.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;const F=s.hash;(F.directionalLength!==_||F.pointLength!==p||F.spotLength!==m||F.rectAreaLength!==x||F.hemiLength!==v||F.numDirectionalShadows!==S||F.numPointShadows!==C||F.numSpotShadows!==w||F.numSpotMaps!==A||F.numLightProbes!==E)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=x,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=S,s.directionalShadowMap.length=S,s.pointShadow.length=C,s.pointShadowMap.length=C,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=S,s.pointShadowMatrix.length=C,s.spotLightMatrix.length=w+A-N,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=N,s.numLightProbes=E,F.directionalLength=_,F.pointLength=p,F.spotLength=m,F.rectAreaLength=x,F.hemiLength=v,F.numDirectionalShadows=S,F.numPointShadows=C,F.numSpotShadows=w,F.numSpotMaps=A,F.numLightProbes=E,s.version=$g++)}function l(h,u){let d=0,f=0,g=0,_=0,p=0;const m=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const S=h[x];if(S.isDirectionalLight){const C=s.directional[d];C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),d++}else if(S.isSpotLight){const C=s.spot[g];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(m),C.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),C.direction.sub(r),C.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const C=s.rectArea[_];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(m),o.identity(),a.copy(S.matrixWorld),a.premultiply(m),o.extractRotation(a),C.halfWidth.set(S.width*.5,0,0),C.halfHeight.set(0,S.height*.5,0),C.halfWidth.applyMatrix4(o),C.halfHeight.applyMatrix4(o),_++}else if(S.isPointLight){const C=s.point[f];C.position.setFromMatrixPosition(S.matrixWorld),C.position.applyMatrix4(m),f++}else if(S.isHemisphereLight){const C=s.hemi[p];C.direction.setFromMatrixPosition(S.matrixWorld),C.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:s}}function Pc(i,e){const t=new qg(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function c(u){t.setup(n,u)}function l(u){t.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Yg(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new Pc(i,e),t.set(r,[c])):a>=o.length?(c=new Pc(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class Zg extends Un{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Wu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class jg extends Un{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Kg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Jg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Qg(i,e,t){let n=new Ho;const s=new le,r=new le,a=new yt,o=new Zg({depthPacking:$u}),c=new jg,l={},h=t.maxTextureSize,u={[Nn]:Ot,[Ot]:Nn,[Pt]:Pt},d=new Qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new le},radius:{value:4}},vertexShader:Kg,fragmentShader:Jg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Lt;g.setAttribute("position",new Qt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new tt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=El;let m=this.type;this.render=function(w,A,N){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),b=i.getActiveCubeFace(),F=i.getActiveMipmapLevel(),$=i.state;$.setBlending(Rn),$.buffers.color.setClear(1,1,1,1),$.buffers.depth.setTest(!0),$.setScissorTest(!1);const ee=m!==dn&&this.type===dn,P=m===dn&&this.type!==dn;for(let U=0,O=w.length;U<O;U++){const X=w[U],q=X.shadow;if(q===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(q.autoUpdate===!1&&q.needsUpdate===!1)continue;s.copy(q.mapSize);const K=q.getFrameExtents();if(s.multiply(K),r.copy(q.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,q.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,q.mapSize.y=r.y)),q.map===null||ee===!0||P===!0){const te=this.type!==dn?{minFilter:Dt,magFilter:Dt}:{};q.map!==null&&q.map.dispose(),q.map=new Jn(s.x,s.y,te),q.map.texture.name=X.name+".shadowMap",q.camera.updateProjectionMatrix()}i.setRenderTarget(q.map),i.clear();const Z=q.getViewportCount();for(let te=0;te<Z;te++){const ae=q.getViewport(te);a.set(r.x*ae.x,r.y*ae.y,r.x*ae.z,r.y*ae.w),$.viewport(a),q.updateMatrices(X,te),n=q.getFrustum(),S(A,N,q.camera,X,this.type)}q.isPointLightShadow!==!0&&this.type===dn&&x(q,N),q.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,b,F)};function x(w,A){const N=e.update(_);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Jn(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,N,d,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,N,f,_,null)}function v(w,A,N,E){let b=null;const F=N.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(F!==void 0)b=F;else if(b=N.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const $=b.uuid,ee=A.uuid;let P=l[$];P===void 0&&(P={},l[$]=P);let U=P[ee];U===void 0&&(U=b.clone(),P[ee]=U,A.addEventListener("dispose",C)),b=U}if(b.visible=A.visible,b.wireframe=A.wireframe,E===dn?b.side=A.shadowSide!==null?A.shadowSide:A.side:b.side=A.shadowSide!==null?A.shadowSide:u[A.side],b.alphaMap=A.alphaMap,b.alphaTest=A.alphaTest,b.map=A.map,b.clipShadows=A.clipShadows,b.clippingPlanes=A.clippingPlanes,b.clipIntersection=A.clipIntersection,b.displacementMap=A.displacementMap,b.displacementScale=A.displacementScale,b.displacementBias=A.displacementBias,b.wireframeLinewidth=A.wireframeLinewidth,b.linewidth=A.linewidth,N.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const $=i.properties.get(b);$.light=N}return b}function S(w,A,N,E,b){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&b===dn)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(N.matrixWorldInverse,w.matrixWorld);const ee=e.update(w),P=w.material;if(Array.isArray(P)){const U=ee.groups;for(let O=0,X=U.length;O<X;O++){const q=U[O],K=P[q.materialIndex];if(K&&K.visible){const Z=v(w,K,E,b);w.onBeforeShadow(i,w,A,N,ee,Z,q),i.renderBufferDirect(N,null,ee,Z,w,q),w.onAfterShadow(i,w,A,N,ee,Z,q)}}}else if(P.visible){const U=v(w,P,E,b);w.onBeforeShadow(i,w,A,N,ee,U,null),i.renderBufferDirect(N,null,ee,U,w,null),w.onAfterShadow(i,w,A,N,ee,U,null)}}const $=w.children;for(let ee=0,P=$.length;ee<P;ee++)S($[ee],A,N,E,b)}function C(w){w.target.removeEventListener("dispose",C);for(const N in l){const E=l[N],b=w.target.uuid;b in E&&(E[b].dispose(),delete E[b])}}}function e_(i,e,t){const n=t.isWebGL2;function s(){let D=!1;const de=new yt;let ve=null;const Ue=new yt(0,0,0,0);return{setMask:function(De){ve!==De&&!D&&(i.colorMask(De,De,De,De),ve=De)},setLocked:function(De){D=De},setClear:function(De,Ze,je,ht,ft){ft===!0&&(De*=ht,Ze*=ht,je*=ht),de.set(De,Ze,je,ht),Ue.equals(de)===!1&&(i.clearColor(De,Ze,je,ht),Ue.copy(de))},reset:function(){D=!1,ve=null,Ue.set(-1,0,0,0)}}}function r(){let D=!1,de=null,ve=null,Ue=null;return{setTest:function(De){De?ze(i.DEPTH_TEST):Ae(i.DEPTH_TEST)},setMask:function(De){de!==De&&!D&&(i.depthMask(De),de=De)},setFunc:function(De){if(ve!==De){switch(De){case Su:i.depthFunc(i.NEVER);break;case Mu:i.depthFunc(i.ALWAYS);break;case Eu:i.depthFunc(i.LESS);break;case sr:i.depthFunc(i.LEQUAL);break;case yu:i.depthFunc(i.EQUAL);break;case bu:i.depthFunc(i.GEQUAL);break;case Tu:i.depthFunc(i.GREATER);break;case wu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=De}},setLocked:function(De){D=De},setClear:function(De){Ue!==De&&(i.clearDepth(De),Ue=De)},reset:function(){D=!1,de=null,ve=null,Ue=null}}}function a(){let D=!1,de=null,ve=null,Ue=null,De=null,Ze=null,je=null,ht=null,ft=null;return{setTest:function(Qe){D||(Qe?ze(i.STENCIL_TEST):Ae(i.STENCIL_TEST))},setMask:function(Qe){de!==Qe&&!D&&(i.stencilMask(Qe),de=Qe)},setFunc:function(Qe,mt,en){(ve!==Qe||Ue!==mt||De!==en)&&(i.stencilFunc(Qe,mt,en),ve=Qe,Ue=mt,De=en)},setOp:function(Qe,mt,en){(Ze!==Qe||je!==mt||ht!==en)&&(i.stencilOp(Qe,mt,en),Ze=Qe,je=mt,ht=en)},setLocked:function(Qe){D=Qe},setClear:function(Qe){ft!==Qe&&(i.clearStencil(Qe),ft=Qe)},reset:function(){D=!1,de=null,ve=null,Ue=null,De=null,Ze=null,je=null,ht=null,ft=null}}}const o=new s,c=new r,l=new a,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],p=null,m=!1,x=null,v=null,S=null,C=null,w=null,A=null,N=null,E=new Ke(0,0,0),b=0,F=!1,$=null,ee=null,P=null,U=null,O=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,K=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Z)[1]),q=K>=1):Z.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),q=K>=2);let te=null,ae={};const V=i.getParameter(i.SCISSOR_BOX),ne=i.getParameter(i.VIEWPORT),_e=new yt().fromArray(V),Te=new yt().fromArray(ne);function Se(D,de,ve,Ue){const De=new Uint8Array(4),Ze=i.createTexture();i.bindTexture(D,Ze),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<ve;je++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(de,0,i.RGBA,1,1,Ue,0,i.RGBA,i.UNSIGNED_BYTE,De):i.texImage2D(de+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,De);return Ze}const Ne={};Ne[i.TEXTURE_2D]=Se(i.TEXTURE_2D,i.TEXTURE_2D,1),Ne[i.TEXTURE_CUBE_MAP]=Se(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Ne[i.TEXTURE_2D_ARRAY]=Se(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Ne[i.TEXTURE_3D]=Se(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ze(i.DEPTH_TEST),c.setFunc(sr),xe(!1),y(da),ze(i.CULL_FACE),J(Rn);function ze(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function Ae(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Fe(D,de){return f[D]!==de?(i.bindFramebuffer(D,de),f[D]=de,n&&(D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=de),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=de)),!0):!1}function I(D,de){let ve=_,Ue=!1;if(D)if(ve=g.get(de),ve===void 0&&(ve=[],g.set(de,ve)),D.isWebGLMultipleRenderTargets){const De=D.texture;if(ve.length!==De.length||ve[0]!==i.COLOR_ATTACHMENT0){for(let Ze=0,je=De.length;Ze<je;Ze++)ve[Ze]=i.COLOR_ATTACHMENT0+Ze;ve.length=De.length,Ue=!0}}else ve[0]!==i.COLOR_ATTACHMENT0&&(ve[0]=i.COLOR_ATTACHMENT0,Ue=!0);else ve[0]!==i.BACK&&(ve[0]=i.BACK,Ue=!0);Ue&&(t.isWebGL2?i.drawBuffers(ve):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ve))}function fe(D){return p!==D?(i.useProgram(D),p=D,!0):!1}const Q={[$n]:i.FUNC_ADD,[ru]:i.FUNC_SUBTRACT,[ou]:i.FUNC_REVERSE_SUBTRACT};if(n)Q[ga]=i.MIN,Q[_a]=i.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(Q[ga]=D.MIN_EXT,Q[_a]=D.MAX_EXT)}const he={[au]:i.ZERO,[cu]:i.ONE,[lu]:i.SRC_COLOR,[yo]:i.SRC_ALPHA,[mu]:i.SRC_ALPHA_SATURATE,[fu]:i.DST_COLOR,[uu]:i.DST_ALPHA,[hu]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[pu]:i.ONE_MINUS_DST_COLOR,[du]:i.ONE_MINUS_DST_ALPHA,[gu]:i.CONSTANT_COLOR,[_u]:i.ONE_MINUS_CONSTANT_COLOR,[vu]:i.CONSTANT_ALPHA,[xu]:i.ONE_MINUS_CONSTANT_ALPHA};function J(D,de,ve,Ue,De,Ze,je,ht,ft,Qe){if(D===Rn){m===!0&&(Ae(i.BLEND),m=!1);return}if(m===!1&&(ze(i.BLEND),m=!0),D!==su){if(D!==x||Qe!==F){if((v!==$n||w!==$n)&&(i.blendEquation(i.FUNC_ADD),v=$n,w=$n),Qe)switch(D){case Ai:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fa:i.blendFunc(i.ONE,i.ONE);break;case pa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ma:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case fa:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case pa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ma:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}S=null,C=null,A=null,N=null,E.set(0,0,0),b=0,x=D,F=Qe}return}De=De||de,Ze=Ze||ve,je=je||Ue,(de!==v||De!==w)&&(i.blendEquationSeparate(Q[de],Q[De]),v=de,w=De),(ve!==S||Ue!==C||Ze!==A||je!==N)&&(i.blendFuncSeparate(he[ve],he[Ue],he[Ze],he[je]),S=ve,C=Ue,A=Ze,N=je),(ht.equals(E)===!1||ft!==b)&&(i.blendColor(ht.r,ht.g,ht.b,ft),E.copy(ht),b=ft),x=D,F=!1}function Ce(D,de){D.side===Pt?Ae(i.CULL_FACE):ze(i.CULL_FACE);let ve=D.side===Ot;de&&(ve=!ve),xe(ve),D.blending===Ai&&D.transparent===!1?J(Rn):J(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ue=D.stencilWrite;l.setTest(Ue),Ue&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),z(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?ze(i.SAMPLE_ALPHA_TO_COVERAGE):Ae(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(D){$!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),$=D)}function y(D){D!==tu?(ze(i.CULL_FACE),D!==ee&&(D===da?i.cullFace(i.BACK):D===nu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ae(i.CULL_FACE),ee=D}function M(D){D!==P&&(q&&i.lineWidth(D),P=D)}function z(D,de,ve){D?(ze(i.POLYGON_OFFSET_FILL),(U!==de||O!==ve)&&(i.polygonOffset(de,ve),U=de,O=ve)):Ae(i.POLYGON_OFFSET_FILL)}function oe(D){D?ze(i.SCISSOR_TEST):Ae(i.SCISSOR_TEST)}function se(D){D===void 0&&(D=i.TEXTURE0+X-1),te!==D&&(i.activeTexture(D),te=D)}function ie(D,de,ve){ve===void 0&&(te===null?ve=i.TEXTURE0+X-1:ve=te);let Ue=ae[ve];Ue===void 0&&(Ue={type:void 0,texture:void 0},ae[ve]=Ue),(Ue.type!==D||Ue.texture!==de)&&(te!==ve&&(i.activeTexture(ve),te=ve),i.bindTexture(D,de||Ne[D]),Ue.type=D,Ue.texture=de)}function we(){const D=ae[te];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function ge(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ie(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ge(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Je(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $e(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Be(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Me(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function R(D){_e.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),_e.copy(D))}function ue(D){Te.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Te.copy(D))}function Re(D,de){let ve=u.get(de);ve===void 0&&(ve=new WeakMap,u.set(de,ve));let Ue=ve.get(D);Ue===void 0&&(Ue=i.getUniformBlockIndex(de,D.name),ve.set(D,Ue))}function be(D,de){const Ue=u.get(de).get(D);h.get(de)!==Ue&&(i.uniformBlockBinding(de,Ue,D.__bindingPointIndex),h.set(de,Ue))}function ce(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},te=null,ae={},f={},g=new WeakMap,_=[],p=null,m=!1,x=null,v=null,S=null,C=null,w=null,A=null,N=null,E=new Ke(0,0,0),b=0,F=!1,$=null,ee=null,P=null,U=null,O=null,_e.set(0,0,i.canvas.width,i.canvas.height),Te.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:ze,disable:Ae,bindFramebuffer:Fe,drawBuffers:I,useProgram:fe,setBlending:J,setMaterial:Ce,setFlipSided:xe,setCullFace:y,setLineWidth:M,setPolygonOffset:z,setScissorTest:oe,activeTexture:se,bindTexture:ie,unbindTexture:we,compressedTexImage2D:ge,compressedTexImage3D:Ee,texImage2D:Le,texImage3D:Me,updateUBOMapping:Re,uniformBlockBinding:be,texStorage2D:$e,texStorage3D:Be,texSubImage2D:Ie,texSubImage3D:Ge,compressedTexSubImage2D:re,compressedTexSubImage3D:Je,scissor:R,viewport:ue,reset:ce}}function t_(i,e,t,n,s,r,a){const o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,M){return f?new OffscreenCanvas(y,M):lr("canvas")}function _(y,M,z,oe){let se=1;if((y.width>oe||y.height>oe)&&(se=oe/Math.max(y.width,y.height)),se<1||M===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap){const ie=M?Lo:Math.floor,we=ie(se*y.width),ge=ie(se*y.height);u===void 0&&(u=g(we,ge));const Ee=z?g(we,ge):u;return Ee.width=we,Ee.height=ge,Ee.getContext("2d").drawImage(y,0,0,we,ge),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+we+"x"+ge+")."),Ee}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),y;return y}function p(y){return qa(y.width)&&qa(y.height)}function m(y){return o?!1:y.wrapS!==Kt||y.wrapT!==Kt||y.minFilter!==Dt&&y.minFilter!==Ut}function x(y,M){return y.generateMipmaps&&M&&y.minFilter!==Dt&&y.minFilter!==Ut}function v(y){i.generateMipmap(y)}function S(y,M,z,oe,se=!1){if(o===!1)return M;if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let ie=M;if(M===i.RED&&(z===i.FLOAT&&(ie=i.R32F),z===i.HALF_FLOAT&&(ie=i.R16F),z===i.UNSIGNED_BYTE&&(ie=i.R8)),M===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(ie=i.R8UI),z===i.UNSIGNED_SHORT&&(ie=i.R16UI),z===i.UNSIGNED_INT&&(ie=i.R32UI),z===i.BYTE&&(ie=i.R8I),z===i.SHORT&&(ie=i.R16I),z===i.INT&&(ie=i.R32I)),M===i.RG&&(z===i.FLOAT&&(ie=i.RG32F),z===i.HALF_FLOAT&&(ie=i.RG16F),z===i.UNSIGNED_BYTE&&(ie=i.RG8)),M===i.RGBA){const we=se?rr:it.getTransfer(oe);z===i.FLOAT&&(ie=i.RGBA32F),z===i.HALF_FLOAT&&(ie=i.RGBA16F),z===i.UNSIGNED_BYTE&&(ie=we===at?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(ie=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(ie=i.RGB5_A1)}return(ie===i.R16F||ie===i.R32F||ie===i.RG16F||ie===i.RG32F||ie===i.RGBA16F||ie===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ie}function C(y,M,z){return x(y,z)===!0||y.isFramebufferTexture&&y.minFilter!==Dt&&y.minFilter!==Ut?Math.log2(Math.max(M.width,M.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?M.mipmaps.length:1}function w(y){return y===Dt||y===va||y===wr?i.NEAREST:i.LINEAR}function A(y){const M=y.target;M.removeEventListener("dispose",A),E(M),M.isVideoTexture&&h.delete(M)}function N(y){const M=y.target;M.removeEventListener("dispose",N),F(M)}function E(y){const M=n.get(y);if(M.__webglInit===void 0)return;const z=y.source,oe=d.get(z);if(oe){const se=oe[M.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(y),Object.keys(oe).length===0&&d.delete(z)}n.remove(y)}function b(y){const M=n.get(y);i.deleteTexture(M.__webglTexture);const z=y.source,oe=d.get(z);delete oe[M.__cacheKey],a.memory.textures--}function F(y){const M=y.texture,z=n.get(y),oe=n.get(M);if(oe.__webglTexture!==void 0&&(i.deleteTexture(oe.__webglTexture),a.memory.textures--),y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let se=0;se<6;se++){if(Array.isArray(z.__webglFramebuffer[se]))for(let ie=0;ie<z.__webglFramebuffer[se].length;ie++)i.deleteFramebuffer(z.__webglFramebuffer[se][ie]);else i.deleteFramebuffer(z.__webglFramebuffer[se]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[se])}else{if(Array.isArray(z.__webglFramebuffer))for(let se=0;se<z.__webglFramebuffer.length;se++)i.deleteFramebuffer(z.__webglFramebuffer[se]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let se=0;se<z.__webglColorRenderbuffer.length;se++)z.__webglColorRenderbuffer[se]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[se]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(y.isWebGLMultipleRenderTargets)for(let se=0,ie=M.length;se<ie;se++){const we=n.get(M[se]);we.__webglTexture&&(i.deleteTexture(we.__webglTexture),a.memory.textures--),n.remove(M[se])}n.remove(M),n.remove(y)}let $=0;function ee(){$=0}function P(){const y=$;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),$+=1,y}function U(y){const M=[];return M.push(y.wrapS),M.push(y.wrapT),M.push(y.wrapR||0),M.push(y.magFilter),M.push(y.minFilter),M.push(y.anisotropy),M.push(y.internalFormat),M.push(y.format),M.push(y.type),M.push(y.generateMipmaps),M.push(y.premultiplyAlpha),M.push(y.flipY),M.push(y.unpackAlignment),M.push(y.colorSpace),M.join()}function O(y,M){const z=n.get(y);if(y.isVideoTexture&&Ce(y),y.isRenderTargetTexture===!1&&y.version>0&&z.__version!==y.version){const oe=y.image;if(oe===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(oe.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_e(z,y,M);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+M)}function X(y,M){const z=n.get(y);if(y.version>0&&z.__version!==y.version){_e(z,y,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+M)}function q(y,M){const z=n.get(y);if(y.version>0&&z.__version!==y.version){_e(z,y,M);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+M)}function K(y,M){const z=n.get(y);if(y.version>0&&z.__version!==y.version){Te(z,y,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+M)}const Z={[Ao]:i.REPEAT,[Kt]:i.CLAMP_TO_EDGE,[Co]:i.MIRRORED_REPEAT},te={[Dt]:i.NEAREST,[va]:i.NEAREST_MIPMAP_NEAREST,[wr]:i.NEAREST_MIPMAP_LINEAR,[Ut]:i.LINEAR,[Uu]:i.LINEAR_MIPMAP_NEAREST,[ss]:i.LINEAR_MIPMAP_LINEAR},ae={[qu]:i.NEVER,[Qu]:i.ALWAYS,[Yu]:i.LESS,[Nl]:i.LEQUAL,[Zu]:i.EQUAL,[Ju]:i.GEQUAL,[ju]:i.GREATER,[Ku]:i.NOTEQUAL};function V(y,M,z){if(z?(i.texParameteri(y,i.TEXTURE_WRAP_S,Z[M.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,Z[M.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,Z[M.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,te[M.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,te[M.minFilter])):(i.texParameteri(y,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(y,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==Kt||M.wrapT!==Kt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(y,i.TEXTURE_MAG_FILTER,w(M.magFilter)),i.texParameteri(y,i.TEXTURE_MIN_FILTER,w(M.minFilter)),M.minFilter!==Dt&&M.minFilter!==Ut&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,ae[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const oe=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Dt||M.minFilter!==wr&&M.minFilter!==ss||M.type===wn&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===rs&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(y,oe.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function ne(y,M){let z=!1;y.__webglInit===void 0&&(y.__webglInit=!0,M.addEventListener("dispose",A));const oe=M.source;let se=d.get(oe);se===void 0&&(se={},d.set(oe,se));const ie=U(M);if(ie!==y.__cacheKey){se[ie]===void 0&&(se[ie]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),se[ie].usedTimes++;const we=se[y.__cacheKey];we!==void 0&&(se[y.__cacheKey].usedTimes--,we.usedTimes===0&&b(M)),y.__cacheKey=ie,y.__webglTexture=se[ie].texture}return z}function _e(y,M,z){let oe=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(oe=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(oe=i.TEXTURE_3D);const se=ne(y,M),ie=M.source;t.bindTexture(oe,y.__webglTexture,i.TEXTURE0+z);const we=n.get(ie);if(ie.version!==we.__version||se===!0){t.activeTexture(i.TEXTURE0+z);const ge=it.getPrimaries(it.workingColorSpace),Ee=M.colorSpace===Wt?null:it.getPrimaries(M.colorSpace),Ie=M.colorSpace===Wt||ge===Ee?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);const Ge=m(M)&&p(M.image)===!1;let re=_(M.image,Ge,!1,s.maxTextureSize);re=xe(M,re);const Je=p(re)||o,$e=r.convert(M.format,M.colorSpace);let Be=r.convert(M.type),Le=S(M.internalFormat,$e,Be,M.colorSpace,M.isVideoTexture);V(oe,M,Je);let Me;const R=M.mipmaps,ue=o&&M.isVideoTexture!==!0&&Le!==Ll,Re=we.__version===void 0||se===!0,be=C(M,re,Je);if(M.isDepthTexture)Le=i.DEPTH_COMPONENT,o?M.type===wn?Le=i.DEPTH_COMPONENT32F:M.type===Tn?Le=i.DEPTH_COMPONENT24:M.type===Zn?Le=i.DEPTH24_STENCIL8:Le=i.DEPTH_COMPONENT16:M.type===wn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===jn&&Le===i.DEPTH_COMPONENT&&M.type!==Bo&&M.type!==Tn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=Tn,Be=r.convert(M.type)),M.format===Ii&&Le===i.DEPTH_COMPONENT&&(Le=i.DEPTH_STENCIL,M.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Zn,Be=r.convert(M.type))),Re&&(ue?t.texStorage2D(i.TEXTURE_2D,1,Le,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Le,re.width,re.height,0,$e,Be,null));else if(M.isDataTexture)if(R.length>0&&Je){ue&&Re&&t.texStorage2D(i.TEXTURE_2D,be,Le,R[0].width,R[0].height);for(let ce=0,D=R.length;ce<D;ce++)Me=R[ce],ue?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Me.width,Me.height,$e,Be,Me.data):t.texImage2D(i.TEXTURE_2D,ce,Le,Me.width,Me.height,0,$e,Be,Me.data);M.generateMipmaps=!1}else ue?(Re&&t.texStorage2D(i.TEXTURE_2D,be,Le,re.width,re.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,$e,Be,re.data)):t.texImage2D(i.TEXTURE_2D,0,Le,re.width,re.height,0,$e,Be,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ue&&Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Le,R[0].width,R[0].height,re.depth);for(let ce=0,D=R.length;ce<D;ce++)Me=R[ce],M.format!==Jt?$e!==null?ue?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Me.width,Me.height,re.depth,$e,Me.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ce,Le,Me.width,Me.height,re.depth,0,Me.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ue?t.texSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Me.width,Me.height,re.depth,$e,Be,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ce,Le,Me.width,Me.height,re.depth,0,$e,Be,Me.data)}else{ue&&Re&&t.texStorage2D(i.TEXTURE_2D,be,Le,R[0].width,R[0].height);for(let ce=0,D=R.length;ce<D;ce++)Me=R[ce],M.format!==Jt?$e!==null?ue?t.compressedTexSubImage2D(i.TEXTURE_2D,ce,0,0,Me.width,Me.height,$e,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,ce,Le,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ue?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Me.width,Me.height,$e,Be,Me.data):t.texImage2D(i.TEXTURE_2D,ce,Le,Me.width,Me.height,0,$e,Be,Me.data)}else if(M.isDataArrayTexture)ue?(Re&&t.texStorage3D(i.TEXTURE_2D_ARRAY,be,Le,re.width,re.height,re.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,$e,Be,re.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Le,re.width,re.height,re.depth,0,$e,Be,re.data);else if(M.isData3DTexture)ue?(Re&&t.texStorage3D(i.TEXTURE_3D,be,Le,re.width,re.height,re.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,$e,Be,re.data)):t.texImage3D(i.TEXTURE_3D,0,Le,re.width,re.height,re.depth,0,$e,Be,re.data);else if(M.isFramebufferTexture){if(Re)if(ue)t.texStorage2D(i.TEXTURE_2D,be,Le,re.width,re.height);else{let ce=re.width,D=re.height;for(let de=0;de<be;de++)t.texImage2D(i.TEXTURE_2D,de,Le,ce,D,0,$e,Be,null),ce>>=1,D>>=1}}else if(R.length>0&&Je){ue&&Re&&t.texStorage2D(i.TEXTURE_2D,be,Le,R[0].width,R[0].height);for(let ce=0,D=R.length;ce<D;ce++)Me=R[ce],ue?t.texSubImage2D(i.TEXTURE_2D,ce,0,0,$e,Be,Me):t.texImage2D(i.TEXTURE_2D,ce,Le,$e,Be,Me);M.generateMipmaps=!1}else ue?(Re&&t.texStorage2D(i.TEXTURE_2D,be,Le,re.width,re.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,$e,Be,re)):t.texImage2D(i.TEXTURE_2D,0,Le,$e,Be,re);x(M,Je)&&v(oe),we.__version=ie.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function Te(y,M,z){if(M.image.length!==6)return;const oe=ne(y,M),se=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+z);const ie=n.get(se);if(se.version!==ie.__version||oe===!0){t.activeTexture(i.TEXTURE0+z);const we=it.getPrimaries(it.workingColorSpace),ge=M.colorSpace===Wt?null:it.getPrimaries(M.colorSpace),Ee=M.colorSpace===Wt||we===ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);const Ie=M.isCompressedTexture||M.image[0].isCompressedTexture,Ge=M.image[0]&&M.image[0].isDataTexture,re=[];for(let ce=0;ce<6;ce++)!Ie&&!Ge?re[ce]=_(M.image[ce],!1,!0,s.maxCubemapSize):re[ce]=Ge?M.image[ce].image:M.image[ce],re[ce]=xe(M,re[ce]);const Je=re[0],$e=p(Je)||o,Be=r.convert(M.format,M.colorSpace),Le=r.convert(M.type),Me=S(M.internalFormat,Be,Le,M.colorSpace),R=o&&M.isVideoTexture!==!0,ue=ie.__version===void 0||oe===!0;let Re=C(M,Je,$e);V(i.TEXTURE_CUBE_MAP,M,$e);let be;if(Ie){R&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,Me,Je.width,Je.height);for(let ce=0;ce<6;ce++){be=re[ce].mipmaps;for(let D=0;D<be.length;D++){const de=be[D];M.format!==Jt?Be!==null?R?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,de.width,de.height,Be,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,Me,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,0,0,de.width,de.height,Be,Le,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D,Me,de.width,de.height,0,Be,Le,de.data)}}}else{be=M.mipmaps,R&&ue&&(be.length>0&&Re++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Re,Me,re[0].width,re[0].height));for(let ce=0;ce<6;ce++)if(Ge){R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,re[ce].width,re[ce].height,Be,Le,re[ce].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Me,re[ce].width,re[ce].height,0,Be,Le,re[ce].data);for(let D=0;D<be.length;D++){const ve=be[D].image[ce].image;R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,ve.width,ve.height,Be,Le,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,Me,ve.width,ve.height,0,Be,Le,ve.data)}}else{R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,0,0,Be,Le,re[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0,Me,Be,Le,re[ce]);for(let D=0;D<be.length;D++){const de=be[D];R?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,0,0,Be,Le,de.image[ce]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ce,D+1,Me,Be,Le,de.image[ce])}}}x(M,$e)&&v(i.TEXTURE_CUBE_MAP),ie.__version=se.version,M.onUpdate&&M.onUpdate(M)}y.__version=M.version}function Se(y,M,z,oe,se,ie){const we=r.convert(z.format,z.colorSpace),ge=r.convert(z.type),Ee=S(z.internalFormat,we,ge,z.colorSpace);if(!n.get(M).__hasExternalTextures){const Ge=Math.max(1,M.width>>ie),re=Math.max(1,M.height>>ie);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,ie,Ee,Ge,re,M.depth,0,we,ge,null):t.texImage2D(se,ie,Ee,Ge,re,0,we,ge,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),J(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,oe,se,n.get(z).__webglTexture,0,he(M)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,oe,se,n.get(z).__webglTexture,ie),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ne(y,M,z){if(i.bindRenderbuffer(i.RENDERBUFFER,y),M.depthBuffer&&!M.stencilBuffer){let oe=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(z||J(M)){const se=M.depthTexture;se&&se.isDepthTexture&&(se.type===wn?oe=i.DEPTH_COMPONENT32F:se.type===Tn&&(oe=i.DEPTH_COMPONENT24));const ie=he(M);J(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,oe,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,oe,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,oe,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,y)}else if(M.depthBuffer&&M.stencilBuffer){const oe=he(M);z&&J(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,i.DEPTH24_STENCIL8,M.width,M.height):J(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,oe,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,y)}else{const oe=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let se=0;se<oe.length;se++){const ie=oe[se],we=r.convert(ie.format,ie.colorSpace),ge=r.convert(ie.type),Ee=S(ie.internalFormat,we,ge,ie.colorSpace),Ie=he(M);z&&J(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,Ee,M.width,M.height):J(M)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,Ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Ee,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(y,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),O(M.depthTexture,0);const oe=n.get(M.depthTexture).__webglTexture,se=he(M);if(M.depthTexture.format===jn)J(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,oe,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,oe,0);else if(M.depthTexture.format===Ii)J(M)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,oe,0,se):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function Ae(y){const M=n.get(y),z=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");ze(M.__webglFramebuffer,y)}else if(z){M.__webglDepthbuffer=[];for(let oe=0;oe<6;oe++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[oe]),M.__webglDepthbuffer[oe]=i.createRenderbuffer(),Ne(M.__webglDepthbuffer[oe],y,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),Ne(M.__webglDepthbuffer,y,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Fe(y,M,z){const oe=n.get(y);M!==void 0&&Se(oe.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Ae(y)}function I(y){const M=y.texture,z=n.get(y),oe=n.get(M);y.addEventListener("dispose",N),y.isWebGLMultipleRenderTargets!==!0&&(oe.__webglTexture===void 0&&(oe.__webglTexture=i.createTexture()),oe.__version=M.version,a.memory.textures++);const se=y.isWebGLCubeRenderTarget===!0,ie=y.isWebGLMultipleRenderTargets===!0,we=p(y)||o;if(se){z.__webglFramebuffer=[];for(let ge=0;ge<6;ge++)if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[ge]=[];for(let Ee=0;Ee<M.mipmaps.length;Ee++)z.__webglFramebuffer[ge][Ee]=i.createFramebuffer()}else z.__webglFramebuffer[ge]=i.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let ge=0;ge<M.mipmaps.length;ge++)z.__webglFramebuffer[ge]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ie)if(s.drawBuffers){const ge=y.texture;for(let Ee=0,Ie=ge.length;Ee<Ie;Ee++){const Ge=n.get(ge[Ee]);Ge.__webglTexture===void 0&&(Ge.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&y.samples>0&&J(y)===!1){const ge=ie?M:[M];z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Ee=0;Ee<ge.length;Ee++){const Ie=ge[Ee];z.__webglColorRenderbuffer[Ee]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Ee]);const Ge=r.convert(Ie.format,Ie.colorSpace),re=r.convert(Ie.type),Je=S(Ie.internalFormat,Ge,re,Ie.colorSpace,y.isXRRenderTarget===!0),$e=he(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,$e,Je,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ee,i.RENDERBUFFER,z.__webglColorRenderbuffer[Ee])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),Ne(z.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(se){t.bindTexture(i.TEXTURE_CUBE_MAP,oe.__webglTexture),V(i.TEXTURE_CUBE_MAP,M,we);for(let ge=0;ge<6;ge++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Se(z.__webglFramebuffer[ge][Ee],y,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ee);else Se(z.__webglFramebuffer[ge],y,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0);x(M,we)&&v(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ie){const ge=y.texture;for(let Ee=0,Ie=ge.length;Ee<Ie;Ee++){const Ge=ge[Ee],re=n.get(Ge);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),V(i.TEXTURE_2D,Ge,we),Se(z.__webglFramebuffer,y,Ge,i.COLOR_ATTACHMENT0+Ee,i.TEXTURE_2D,0),x(Ge,we)&&v(i.TEXTURE_2D)}t.unbindTexture()}else{let ge=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(o?ge=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(ge,oe.__webglTexture),V(ge,M,we),o&&M.mipmaps&&M.mipmaps.length>0)for(let Ee=0;Ee<M.mipmaps.length;Ee++)Se(z.__webglFramebuffer[Ee],y,M,i.COLOR_ATTACHMENT0,ge,Ee);else Se(z.__webglFramebuffer,y,M,i.COLOR_ATTACHMENT0,ge,0);x(M,we)&&v(ge),t.unbindTexture()}y.depthBuffer&&Ae(y)}function fe(y){const M=p(y)||o,z=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let oe=0,se=z.length;oe<se;oe++){const ie=z[oe];if(x(ie,M)){const we=y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,ge=n.get(ie).__webglTexture;t.bindTexture(we,ge),v(we),t.unbindTexture()}}}function Q(y){if(o&&y.samples>0&&J(y)===!1){const M=y.isWebGLMultipleRenderTargets?y.texture:[y.texture],z=y.width,oe=y.height;let se=i.COLOR_BUFFER_BIT;const ie=[],we=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ge=n.get(y),Ee=y.isWebGLMultipleRenderTargets===!0;if(Ee)for(let Ie=0;Ie<M.length;Ie++)t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Ie=0;Ie<M.length;Ie++){ie.push(i.COLOR_ATTACHMENT0+Ie),y.depthBuffer&&ie.push(we);const Ge=ge.__ignoreDepthValues!==void 0?ge.__ignoreDepthValues:!1;if(Ge===!1&&(y.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),Ee&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ge.__webglColorRenderbuffer[Ie]),Ge===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[we]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[we])),Ee){const re=n.get(M[Ie]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,z,oe,0,0,z,oe,se,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ie)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Ee)for(let Ie=0;Ie<M.length;Ie++){t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.RENDERBUFFER,ge.__webglColorRenderbuffer[Ie]);const Ge=n.get(M[Ie]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ge.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ie,i.TEXTURE_2D,Ge,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}}function he(y){return Math.min(s.maxSamples,y.samples)}function J(y){const M=n.get(y);return o&&y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ce(y){const M=a.render.frame;h.get(y)!==M&&(h.set(y,M),y.update())}function xe(y,M){const z=y.colorSpace,oe=y.format,se=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===Ro||z!==gn&&z!==Wt&&(it.getTransfer(z)===at?o===!1?e.has("EXT_sRGB")===!0&&oe===Jt?(y.format=Ro,y.minFilter=Ut,y.generateMipmaps=!1):M=Ol.sRGBToLinear(M):(oe!==Jt||se!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}this.allocateTextureUnit=P,this.resetTextureUnits=ee,this.setTexture2D=O,this.setTexture2DArray=X,this.setTexture3D=q,this.setTextureCube=K,this.rebindTextures=Fe,this.setupRenderTarget=I,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=Ae,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=J}function n_(i,e,t){const n=t.isWebGL2;function s(r,a=Wt){let o;const c=it.getTransfer(a);if(r===Ln)return i.UNSIGNED_BYTE;if(r===wl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Al)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Ou)return i.BYTE;if(r===Fu)return i.SHORT;if(r===Bo)return i.UNSIGNED_SHORT;if(r===Tl)return i.INT;if(r===Tn)return i.UNSIGNED_INT;if(r===wn)return i.FLOAT;if(r===rs)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===zu)return i.ALPHA;if(r===Jt)return i.RGBA;if(r===Bu)return i.LUMINANCE;if(r===ku)return i.LUMINANCE_ALPHA;if(r===jn)return i.DEPTH_COMPONENT;if(r===Ii)return i.DEPTH_STENCIL;if(r===Ro)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===Gu)return i.RED;if(r===Cl)return i.RED_INTEGER;if(r===Hu)return i.RG;if(r===Rl)return i.RG_INTEGER;if(r===Pl)return i.RGBA_INTEGER;if(r===Ar||r===Cr||r===Rr||r===Pr)if(c===at)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Ar)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Cr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Rr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Pr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Ar)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Cr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Rr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Pr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===xa||r===Sa||r===Ma||r===Ea)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===xa)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Sa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ma)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ea)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Ll)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ya||r===ba)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===ya)return c===at?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ba)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ta||r===wa||r===Aa||r===Ca||r===Ra||r===Pa||r===La||r===Ia||r===Da||r===Na||r===Ua||r===Oa||r===Fa||r===za)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Ta)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===wa)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Aa)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ca)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Ra)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Pa)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===La)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Ia)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Da)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Na)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ua)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Oa)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Fa)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===za)return c===at?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Lr||r===Ba||r===ka)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Lr)return c===at?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ba)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===ka)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Vu||r===Ga||r===Ha||r===Va)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Lr)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ga)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ha)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Va)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Zn?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class i_ extends jt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class _t extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const s_={type:"move"};class to{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _t,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _t,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _t,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(s_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new _t;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class r_ extends ni{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=t.getContextAttributes();let p=null,m=null;const x=[],v=[],S=new le;let C=null;const w=new jt;w.layers.enable(1),w.viewport=new yt;const A=new jt;A.layers.enable(2),A.viewport=new yt;const N=[w,A],E=new i_;E.layers.enable(1),E.layers.enable(2);let b=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let ne=x[V];return ne===void 0&&(ne=new to,x[V]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(V){let ne=x[V];return ne===void 0&&(ne=new to,x[V]=ne),ne.getGripSpace()},this.getHand=function(V){let ne=x[V];return ne===void 0&&(ne=new to,x[V]=ne),ne.getHandSpace()};function $(V){const ne=v.indexOf(V.inputSource);if(ne===-1)return;const _e=x[ne];_e!==void 0&&(_e.update(V.inputSource,V.frame,l||a),_e.dispatchEvent({type:V.type,data:V.inputSource}))}function ee(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",ee),s.removeEventListener("inputsourceschange",P);for(let V=0;V<x.length;V++){const ne=v[V];ne!==null&&(v[V]=null,x[V].disconnect(ne))}b=null,F=null,e.setRenderTarget(p),f=null,d=null,u=null,s=null,m=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",ee),s.addEventListener("inputsourceschange",P),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const ne={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ne),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new Jn(f.framebufferWidth,f.framebufferHeight,{format:Jt,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let ne=null,_e=null,Te=null;_.depth&&(Te=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=_.stencil?Ii:jn,_e=_.stencil?Zn:Tn);const Se={colorFormat:t.RGBA8,depthFormat:Te,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(Se),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),m=new Jn(d.textureWidth,d.textureHeight,{format:Jt,type:Ln,depthTexture:new Xl(d.textureWidth,d.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const Ne=e.properties.get(m);Ne.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ae.setContext(s),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(V){for(let ne=0;ne<V.removed.length;ne++){const _e=V.removed[ne],Te=v.indexOf(_e);Te>=0&&(v[Te]=null,x[Te].disconnect(_e))}for(let ne=0;ne<V.added.length;ne++){const _e=V.added[ne];let Te=v.indexOf(_e);if(Te===-1){for(let Ne=0;Ne<x.length;Ne++)if(Ne>=v.length){v.push(_e),Te=Ne;break}else if(v[Ne]===null){v[Ne]=_e,Te=Ne;break}if(Te===-1)break}const Se=x[Te];Se&&Se.connect(_e)}}const U=new L,O=new L;function X(V,ne,_e){U.setFromMatrixPosition(ne.matrixWorld),O.setFromMatrixPosition(_e.matrixWorld);const Te=U.distanceTo(O),Se=ne.projectionMatrix.elements,Ne=_e.projectionMatrix.elements,ze=Se[14]/(Se[10]-1),Ae=Se[14]/(Se[10]+1),Fe=(Se[9]+1)/Se[5],I=(Se[9]-1)/Se[5],fe=(Se[8]-1)/Se[0],Q=(Ne[8]+1)/Ne[0],he=ze*fe,J=ze*Q,Ce=Te/(-fe+Q),xe=Ce*-fe;ne.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(xe),V.translateZ(Ce),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const y=ze+Ce,M=Ae+Ce,z=he-xe,oe=J+(Te-xe),se=Fe*Ae/M*y,ie=I*Ae/M*y;V.projectionMatrix.makePerspective(z,oe,se,ie,y,M),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function q(V,ne){ne===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(ne.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;E.near=A.near=w.near=V.near,E.far=A.far=w.far=V.far,(b!==E.near||F!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),b=E.near,F=E.far);const ne=V.parent,_e=E.cameras;q(E,ne);for(let Te=0;Te<_e.length;Te++)q(_e[Te],ne);_e.length===2?X(E,w,A):E.projectionMatrix.copy(w.projectionMatrix),K(V,E,ne)};function K(V,ne,_e){_e===null?V.matrix.copy(ne.matrixWorld):(V.matrix.copy(_e.matrixWorld),V.matrix.invert(),V.matrix.multiply(ne.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(ne.projectionMatrix),V.projectionMatrixInverse.copy(ne.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=Po*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let Z=null;function te(V,ne){if(h=ne.getViewerPose(l||a),g=ne,h!==null){const _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(m,f.framebuffer),e.setRenderTarget(m));let Te=!1;_e.length!==E.cameras.length&&(E.cameras.length=0,Te=!0);for(let Se=0;Se<_e.length;Se++){const Ne=_e[Se];let ze=null;if(f!==null)ze=f.getViewport(Ne);else{const Fe=u.getViewSubImage(d,Ne);ze=Fe.viewport,Se===0&&(e.setRenderTargetTextures(m,Fe.colorTexture,d.ignoreDepthValues?void 0:Fe.depthStencilTexture),e.setRenderTarget(m))}let Ae=N[Se];Ae===void 0&&(Ae=new jt,Ae.layers.enable(Se),Ae.viewport=new yt,N[Se]=Ae),Ae.matrix.fromArray(Ne.transform.matrix),Ae.matrix.decompose(Ae.position,Ae.quaternion,Ae.scale),Ae.projectionMatrix.fromArray(Ne.projectionMatrix),Ae.projectionMatrixInverse.copy(Ae.projectionMatrix).invert(),Ae.viewport.set(ze.x,ze.y,ze.width,ze.height),Se===0&&(E.matrix.copy(Ae.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Te===!0&&E.cameras.push(Ae)}}for(let _e=0;_e<x.length;_e++){const Te=v[_e],Se=x[_e];Te!==null&&Se!==void 0&&Se.update(Te,ne,l||a)}Z&&Z(V,ne),ne.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ne}),g=null}const ae=new $l;ae.setAnimationLoop(te),this.setAnimationLoop=function(V){Z=V},this.dispose=function(){}}}function o_(i,e){function t(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Hl(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,v,S){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,S)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,t(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ot&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,t(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ot&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,t(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,t(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,t(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=e.get(m).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,t(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,t(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,t(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,t(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,t(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,t(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,t(m.roughnessMap,p.roughnessMapTransform)),e.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,t(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,t(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,t(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,t(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,t(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ot&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,t(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,t(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,t(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,t(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,t(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,t(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,t(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=e.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function a_(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,v){const S=v.program;n.uniformBlockBinding(x,S)}function l(x,v){let S=s[x.id];S===void 0&&(g(x),S=h(x),s[x.id]=S,x.addEventListener("dispose",p));const C=v.program;n.updateUBOMapping(x,C);const w=e.render.frame;r[x.id]!==w&&(d(x),r[x.id]=w)}function h(x){const v=u();x.__bindingPointIndex=v;const S=i.createBuffer(),C=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,C,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,S),S}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=s[x.id],S=x.uniforms,C=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let w=0,A=S.length;w<A;w++){const N=Array.isArray(S[w])?S[w]:[S[w]];for(let E=0,b=N.length;E<b;E++){const F=N[E];if(f(F,w,E,C)===!0){const $=F.__offset,ee=Array.isArray(F.value)?F.value:[F.value];let P=0;for(let U=0;U<ee.length;U++){const O=ee[U],X=_(O);typeof O=="number"||typeof O=="boolean"?(F.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,$+P,F.__data)):O.isMatrix3?(F.__data[0]=O.elements[0],F.__data[1]=O.elements[1],F.__data[2]=O.elements[2],F.__data[3]=0,F.__data[4]=O.elements[3],F.__data[5]=O.elements[4],F.__data[6]=O.elements[5],F.__data[7]=0,F.__data[8]=O.elements[6],F.__data[9]=O.elements[7],F.__data[10]=O.elements[8],F.__data[11]=0):(O.toArray(F.__data,P),P+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,$,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,v,S,C){const w=x.value,A=v+"_"+S;if(C[A]===void 0)return typeof w=="number"||typeof w=="boolean"?C[A]=w:C[A]=w.clone(),!0;{const N=C[A];if(typeof w=="number"||typeof w=="boolean"){if(N!==w)return C[A]=w,!0}else if(N.equals(w)===!1)return N.copy(w),!0}return!1}function g(x){const v=x.uniforms;let S=0;const C=16;for(let A=0,N=v.length;A<N;A++){const E=Array.isArray(v[A])?v[A]:[v[A]];for(let b=0,F=E.length;b<F;b++){const $=E[b],ee=Array.isArray($.value)?$.value:[$.value];for(let P=0,U=ee.length;P<U;P++){const O=ee[P],X=_(O),q=S%C;q!==0&&C-q<X.boundary&&(S+=C-q),$.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),$.__offset=S,S+=X.storage}}}const w=S%C;return w>0&&(S+=C-w),x.__size=S,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const S=a.indexOf(v.__bindingPointIndex);a.splice(S,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}class Jl{constructor(e={}){const{canvas:t=nd(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=bt,this._useLegacyLights=!1,this.toneMapping=Pn,this.toneMappingExposure=1;const v=this;let S=!1,C=0,w=0,A=null,N=-1,E=null;const b=new yt,F=new yt;let $=null;const ee=new Ke(0);let P=0,U=t.width,O=t.height,X=1,q=null,K=null;const Z=new yt(0,0,U,O),te=new yt(0,0,U,O);let ae=!1;const V=new Ho;let ne=!1,_e=!1,Te=null;const Se=new st,Ne=new le,ze=new L,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Fe(){return A===null?X:1}let I=n;function fe(T,B){for(let H=0;H<T.length;H++){const W=T[H],G=t.getContext(W,B);if(G!==null)return G}return null}try{const T={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zo}`),t.addEventListener("webglcontextlost",ce,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",de,!1),I===null){const B=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&B.shift(),I=fe(B,T),I===null)throw fe(B)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&I instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),I.getShaderPrecisionFormat===void 0&&(I.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Q,he,J,Ce,xe,y,M,z,oe,se,ie,we,ge,Ee,Ie,Ge,re,Je,$e,Be,Le,Me,R,ue;function Re(){Q=new _m(I),he=new um(I,Q,e),Q.init(he),Me=new n_(I,Q,he),J=new e_(I,Q,he),Ce=new Sm(I),xe=new kg,y=new t_(I,Q,J,xe,he,Me,Ce),M=new fm(v),z=new gm(v),oe=new Ad(I,he),R=new lm(I,Q,oe,he),se=new vm(I,oe,Ce,R),ie=new bm(I,se,oe,Ce),$e=new ym(I,he,y),Ge=new dm(xe),we=new Bg(v,M,z,Q,he,R,Ge),ge=new o_(v,xe),Ee=new Hg,Ie=new Yg(Q,he),Je=new cm(v,M,z,J,ie,d,c),re=new Qg(v,ie,he),ue=new a_(I,Ce,he,J),Be=new hm(I,Q,Ce,he),Le=new xm(I,Q,Ce,he),Ce.programs=we.programs,v.capabilities=he,v.extensions=Q,v.properties=xe,v.renderLists=Ee,v.shadowMap=re,v.state=J,v.info=Ce}Re();const be=new r_(v,I);this.xr=be,this.getContext=function(){return I},this.getContextAttributes=function(){return I.getContextAttributes()},this.forceContextLoss=function(){const T=Q.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Q.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(T){T!==void 0&&(X=T,this.setSize(U,O,!1))},this.getSize=function(T){return T.set(U,O)},this.setSize=function(T,B,H=!0){if(be.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=T,O=B,t.width=Math.floor(T*X),t.height=Math.floor(B*X),H===!0&&(t.style.width=T+"px",t.style.height=B+"px"),this.setViewport(0,0,T,B)},this.getDrawingBufferSize=function(T){return T.set(U*X,O*X).floor()},this.setDrawingBufferSize=function(T,B,H){U=T,O=B,X=H,t.width=Math.floor(T*H),t.height=Math.floor(B*H),this.setViewport(0,0,T,B)},this.getCurrentViewport=function(T){return T.copy(b)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,B,H,W){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,B,H,W),J.viewport(b.copy(Z).multiplyScalar(X).floor())},this.getScissor=function(T){return T.copy(te)},this.setScissor=function(T,B,H,W){T.isVector4?te.set(T.x,T.y,T.z,T.w):te.set(T,B,H,W),J.scissor(F.copy(te).multiplyScalar(X).floor())},this.getScissorTest=function(){return ae},this.setScissorTest=function(T){J.setScissorTest(ae=T)},this.setOpaqueSort=function(T){q=T},this.setTransparentSort=function(T){K=T},this.getClearColor=function(T){return T.copy(Je.getClearColor())},this.setClearColor=function(){Je.setClearColor.apply(Je,arguments)},this.getClearAlpha=function(){return Je.getClearAlpha()},this.setClearAlpha=function(){Je.setClearAlpha.apply(Je,arguments)},this.clear=function(T=!0,B=!0,H=!0){let W=0;if(T){let G=!1;if(A!==null){const ye=A.texture.format;G=ye===Pl||ye===Rl||ye===Cl}if(G){const ye=A.texture.type,Pe=ye===Ln||ye===Tn||ye===Bo||ye===Zn||ye===wl||ye===Al,Oe=Je.getClearColor(),ke=Je.getClearAlpha(),Xe=Oe.r,He=Oe.g,Ve=Oe.b;Pe?(f[0]=Xe,f[1]=He,f[2]=Ve,f[3]=ke,I.clearBufferuiv(I.COLOR,0,f)):(g[0]=Xe,g[1]=He,g[2]=Ve,g[3]=ke,I.clearBufferiv(I.COLOR,0,g))}else W|=I.COLOR_BUFFER_BIT}B&&(W|=I.DEPTH_BUFFER_BIT),H&&(W|=I.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),I.clear(W)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ce,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Ee.dispose(),Ie.dispose(),xe.dispose(),M.dispose(),z.dispose(),ie.dispose(),R.dispose(),ue.dispose(),we.dispose(),be.dispose(),be.removeEventListener("sessionstart",ft),be.removeEventListener("sessionend",Qe),Te&&(Te.dispose(),Te=null),mt.stop()};function ce(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const T=Ce.autoReset,B=re.enabled,H=re.autoUpdate,W=re.needsUpdate,G=re.type;Re(),Ce.autoReset=T,re.enabled=B,re.autoUpdate=H,re.needsUpdate=W,re.type=G}function de(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function ve(T){const B=T.target;B.removeEventListener("dispose",ve),Ue(B)}function Ue(T){De(T),xe.remove(T)}function De(T){const B=xe.get(T).programs;B!==void 0&&(B.forEach(function(H){we.releaseProgram(H)}),T.isShaderMaterial&&we.releaseShaderCache(T))}this.renderBufferDirect=function(T,B,H,W,G,ye){B===null&&(B=Ae);const Pe=G.isMesh&&G.matrixWorld.determinant()<0,Oe=Dh(T,B,H,W,G);J.setMaterial(W,Pe);let ke=H.index,Xe=1;if(W.wireframe===!0){if(ke=se.getWireframeAttribute(H),ke===void 0)return;Xe=2}const He=H.drawRange,Ve=H.attributes.position;let pt=He.start*Xe,zt=(He.start+He.count)*Xe;ye!==null&&(pt=Math.max(pt,ye.start*Xe),zt=Math.min(zt,(ye.start+ye.count)*Xe)),ke!==null?(pt=Math.max(pt,0),zt=Math.min(zt,ke.count)):Ve!=null&&(pt=Math.max(pt,0),zt=Math.min(zt,Ve.count));const Mt=zt-pt;if(Mt<0||Mt===1/0)return;R.setup(G,W,Oe,H,ke);let on,ct=Be;if(ke!==null&&(on=oe.get(ke),ct=Le,ct.setIndex(on)),G.isMesh)W.wireframe===!0?(J.setLineWidth(W.wireframeLinewidth*Fe()),ct.setMode(I.LINES)):ct.setMode(I.TRIANGLES);else if(G.isLine){let qe=W.linewidth;qe===void 0&&(qe=1),J.setLineWidth(qe*Fe()),G.isLineSegments?ct.setMode(I.LINES):G.isLineLoop?ct.setMode(I.LINE_LOOP):ct.setMode(I.LINE_STRIP)}else G.isPoints?ct.setMode(I.POINTS):G.isSprite&&ct.setMode(I.TRIANGLES);if(G.isBatchedMesh)ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)ct.renderInstances(pt,Mt,G.count);else if(H.isInstancedBufferGeometry){const qe=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Er=Math.min(H.instanceCount,qe);ct.renderInstances(pt,Mt,Er)}else ct.render(pt,Mt)};function Ze(T,B,H){T.transparent===!0&&T.side===Pt&&T.forceSinglePass===!1?(T.side=Ot,T.needsUpdate=!0,gs(T,B,H),T.side=Nn,T.needsUpdate=!0,gs(T,B,H),T.side=Pt):gs(T,B,H)}this.compile=function(T,B,H=null){H===null&&(H=T),p=Ie.get(H),p.init(),x.push(p),H.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),T!==H&&T.traverseVisible(function(G){G.isLight&&G.layers.test(B.layers)&&(p.pushLight(G),G.castShadow&&p.pushShadow(G))}),p.setupLights(v._useLegacyLights);const W=new Set;return T.traverse(function(G){const ye=G.material;if(ye)if(Array.isArray(ye))for(let Pe=0;Pe<ye.length;Pe++){const Oe=ye[Pe];Ze(Oe,H,G),W.add(Oe)}else Ze(ye,H,G),W.add(ye)}),x.pop(),p=null,W},this.compileAsync=function(T,B,H=null){const W=this.compile(T,B,H);return new Promise(G=>{function ye(){if(W.forEach(function(Pe){xe.get(Pe).currentProgram.isReady()&&W.delete(Pe)}),W.size===0){G(T);return}setTimeout(ye,10)}Q.get("KHR_parallel_shader_compile")!==null?ye():setTimeout(ye,10)})};let je=null;function ht(T){je&&je(T)}function ft(){mt.stop()}function Qe(){mt.start()}const mt=new $l;mt.setAnimationLoop(ht),typeof self<"u"&&mt.setContext(self),this.setAnimationLoop=function(T){je=T,be.setAnimationLoop(T),T===null?mt.stop():mt.start()},be.addEventListener("sessionstart",ft),be.addEventListener("sessionend",Qe),this.render=function(T,B){if(B!==void 0&&B.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),be.enabled===!0&&be.isPresenting===!0&&(be.cameraAutoUpdate===!0&&be.updateCamera(B),B=be.getCamera()),T.isScene===!0&&T.onBeforeRender(v,T,B,A),p=Ie.get(T,x.length),p.init(),x.push(p),Se.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),V.setFromProjectionMatrix(Se),_e=this.localClippingEnabled,ne=Ge.init(this.clippingPlanes,_e),_=Ee.get(T,m.length),_.init(),m.push(_),en(T,B,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(q,K),this.info.render.frame++,ne===!0&&Ge.beginShadows();const H=p.state.shadowsArray;if(re.render(H,T,B),ne===!0&&Ge.endShadows(),this.info.autoReset===!0&&this.info.reset(),Je.render(_,T),p.setupLights(v._useLegacyLights),B.isArrayCamera){const W=B.cameras;for(let G=0,ye=W.length;G<ye;G++){const Pe=W[G];sa(_,T,Pe,Pe.viewport)}}else sa(_,T,B);A!==null&&(y.updateMultisampleRenderTarget(A),y.updateRenderTargetMipmap(A)),T.isScene===!0&&T.onAfterRender(v,T,B),R.resetDefaultState(),N=-1,E=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function en(T,B,H,W){if(T.visible===!1)return;if(T.layers.test(B.layers)){if(T.isGroup)H=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(B);else if(T.isLight)p.pushLight(T),T.castShadow&&p.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||V.intersectsSprite(T)){W&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Se);const Pe=ie.update(T),Oe=T.material;Oe.visible&&_.push(T,Pe,Oe,H,ze.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||V.intersectsObject(T))){const Pe=ie.update(T),Oe=T.material;if(W&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),ze.copy(Pe.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(Se)),Array.isArray(Oe)){const ke=Pe.groups;for(let Xe=0,He=ke.length;Xe<He;Xe++){const Ve=ke[Xe],pt=Oe[Ve.materialIndex];pt&&pt.visible&&_.push(T,Pe,pt,H,ze.z,Ve)}}else Oe.visible&&_.push(T,Pe,Oe,H,ze.z,null)}}const ye=T.children;for(let Pe=0,Oe=ye.length;Pe<Oe;Pe++)en(ye[Pe],B,H,W)}function sa(T,B,H,W){const G=T.opaque,ye=T.transmissive,Pe=T.transparent;p.setupLightsView(H),ne===!0&&Ge.setGlobalState(v.clippingPlanes,H),ye.length>0&&Ih(G,ye,B,H),W&&J.viewport(b.copy(W)),G.length>0&&ms(G,B,H),ye.length>0&&ms(ye,B,H),Pe.length>0&&ms(Pe,B,H),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Ih(T,B,H,W){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const ye=he.isWebGL2;Te===null&&(Te=new Jn(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")?rs:Ln,minFilter:ss,samples:ye?4:0})),v.getDrawingBufferSize(Ne),ye?Te.setSize(Ne.x,Ne.y):Te.setSize(Lo(Ne.x),Lo(Ne.y));const Pe=v.getRenderTarget();v.setRenderTarget(Te),v.getClearColor(ee),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const Oe=v.toneMapping;v.toneMapping=Pn,ms(T,H,W),y.updateMultisampleRenderTarget(Te),y.updateRenderTargetMipmap(Te);let ke=!1;for(let Xe=0,He=B.length;Xe<He;Xe++){const Ve=B[Xe],pt=Ve.object,zt=Ve.geometry,Mt=Ve.material,on=Ve.group;if(Mt.side===Pt&&pt.layers.test(W.layers)){const ct=Mt.side;Mt.side=Ot,Mt.needsUpdate=!0,ra(pt,H,W,zt,Mt,on),Mt.side=ct,Mt.needsUpdate=!0,ke=!0}}ke===!0&&(y.updateMultisampleRenderTarget(Te),y.updateRenderTargetMipmap(Te)),v.setRenderTarget(Pe),v.setClearColor(ee,P),v.toneMapping=Oe}function ms(T,B,H){const W=B.isScene===!0?B.overrideMaterial:null;for(let G=0,ye=T.length;G<ye;G++){const Pe=T[G],Oe=Pe.object,ke=Pe.geometry,Xe=W===null?Pe.material:W,He=Pe.group;Oe.layers.test(H.layers)&&ra(Oe,B,H,ke,Xe,He)}}function ra(T,B,H,W,G,ye){T.onBeforeRender(v,B,H,W,G,ye),T.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(v,B,H,W,T,ye),G.transparent===!0&&G.side===Pt&&G.forceSinglePass===!1?(G.side=Ot,G.needsUpdate=!0,v.renderBufferDirect(H,B,W,G,T,ye),G.side=Nn,G.needsUpdate=!0,v.renderBufferDirect(H,B,W,G,T,ye),G.side=Pt):v.renderBufferDirect(H,B,W,G,T,ye),T.onAfterRender(v,B,H,W,G,ye)}function gs(T,B,H){B.isScene!==!0&&(B=Ae);const W=xe.get(T),G=p.state.lights,ye=p.state.shadowsArray,Pe=G.state.version,Oe=we.getParameters(T,G.state,ye,B,H),ke=we.getProgramCacheKey(Oe);let Xe=W.programs;W.environment=T.isMeshStandardMaterial?B.environment:null,W.fog=B.fog,W.envMap=(T.isMeshStandardMaterial?z:M).get(T.envMap||W.environment),Xe===void 0&&(T.addEventListener("dispose",ve),Xe=new Map,W.programs=Xe);let He=Xe.get(ke);if(He!==void 0){if(W.currentProgram===He&&W.lightsStateVersion===Pe)return aa(T,Oe),He}else Oe.uniforms=we.getUniforms(T),T.onBuild(H,Oe,v),T.onBeforeCompile(Oe,v),He=we.acquireProgram(Oe,ke),Xe.set(ke,He),W.uniforms=Oe.uniforms;const Ve=W.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Ve.clippingPlanes=Ge.uniform),aa(T,Oe),W.needsLights=Uh(T),W.lightsStateVersion=Pe,W.needsLights&&(Ve.ambientLightColor.value=G.state.ambient,Ve.lightProbe.value=G.state.probe,Ve.directionalLights.value=G.state.directional,Ve.directionalLightShadows.value=G.state.directionalShadow,Ve.spotLights.value=G.state.spot,Ve.spotLightShadows.value=G.state.spotShadow,Ve.rectAreaLights.value=G.state.rectArea,Ve.ltc_1.value=G.state.rectAreaLTC1,Ve.ltc_2.value=G.state.rectAreaLTC2,Ve.pointLights.value=G.state.point,Ve.pointLightShadows.value=G.state.pointShadow,Ve.hemisphereLights.value=G.state.hemi,Ve.directionalShadowMap.value=G.state.directionalShadowMap,Ve.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ve.spotShadowMap.value=G.state.spotShadowMap,Ve.spotLightMatrix.value=G.state.spotLightMatrix,Ve.spotLightMap.value=G.state.spotLightMap,Ve.pointShadowMap.value=G.state.pointShadowMap,Ve.pointShadowMatrix.value=G.state.pointShadowMatrix),W.currentProgram=He,W.uniformsList=null,He}function oa(T){if(T.uniformsList===null){const B=T.currentProgram.getUniforms();T.uniformsList=Qs.seqWithValue(B.seq,T.uniforms)}return T.uniformsList}function aa(T,B){const H=xe.get(T);H.outputColorSpace=B.outputColorSpace,H.batching=B.batching,H.instancing=B.instancing,H.instancingColor=B.instancingColor,H.skinning=B.skinning,H.morphTargets=B.morphTargets,H.morphNormals=B.morphNormals,H.morphColors=B.morphColors,H.morphTargetsCount=B.morphTargetsCount,H.numClippingPlanes=B.numClippingPlanes,H.numIntersection=B.numClipIntersection,H.vertexAlphas=B.vertexAlphas,H.vertexTangents=B.vertexTangents,H.toneMapping=B.toneMapping}function Dh(T,B,H,W,G){B.isScene!==!0&&(B=Ae),y.resetTextureUnits();const ye=B.fog,Pe=W.isMeshStandardMaterial?B.environment:null,Oe=A===null?v.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:gn,ke=(W.isMeshStandardMaterial?z:M).get(W.envMap||Pe),Xe=W.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,He=!!H.attributes.tangent&&(!!W.normalMap||W.anisotropy>0),Ve=!!H.morphAttributes.position,pt=!!H.morphAttributes.normal,zt=!!H.morphAttributes.color;let Mt=Pn;W.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Mt=v.toneMapping);const on=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=on!==void 0?on.length:0,qe=xe.get(W),Er=p.state.lights;if(ne===!0&&(_e===!0||T!==E)){const Gt=T===E&&W.id===N;Ge.setState(W,T,Gt)}let ut=!1;W.version===qe.__version?(qe.needsLights&&qe.lightsStateVersion!==Er.state.version||qe.outputColorSpace!==Oe||G.isBatchedMesh&&qe.batching===!1||!G.isBatchedMesh&&qe.batching===!0||G.isInstancedMesh&&qe.instancing===!1||!G.isInstancedMesh&&qe.instancing===!0||G.isSkinnedMesh&&qe.skinning===!1||!G.isSkinnedMesh&&qe.skinning===!0||G.isInstancedMesh&&qe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&qe.instancingColor===!1&&G.instanceColor!==null||qe.envMap!==ke||W.fog===!0&&qe.fog!==ye||qe.numClippingPlanes!==void 0&&(qe.numClippingPlanes!==Ge.numPlanes||qe.numIntersection!==Ge.numIntersection)||qe.vertexAlphas!==Xe||qe.vertexTangents!==He||qe.morphTargets!==Ve||qe.morphNormals!==pt||qe.morphColors!==zt||qe.toneMapping!==Mt||he.isWebGL2===!0&&qe.morphTargetsCount!==ct)&&(ut=!0):(ut=!0,qe.__version=W.version);let Fn=qe.currentProgram;ut===!0&&(Fn=gs(W,B,G));let ca=!1,Gi=!1,yr=!1;const wt=Fn.getUniforms(),zn=qe.uniforms;if(J.useProgram(Fn.program)&&(ca=!0,Gi=!0,yr=!0),W.id!==N&&(N=W.id,Gi=!0),ca||E!==T){wt.setValue(I,"projectionMatrix",T.projectionMatrix),wt.setValue(I,"viewMatrix",T.matrixWorldInverse);const Gt=wt.map.cameraPosition;Gt!==void 0&&Gt.setValue(I,ze.setFromMatrixPosition(T.matrixWorld)),he.logarithmicDepthBuffer&&wt.setValue(I,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(W.isMeshPhongMaterial||W.isMeshToonMaterial||W.isMeshLambertMaterial||W.isMeshBasicMaterial||W.isMeshStandardMaterial||W.isShaderMaterial)&&wt.setValue(I,"isOrthographic",T.isOrthographicCamera===!0),E!==T&&(E=T,Gi=!0,yr=!0)}if(G.isSkinnedMesh){wt.setOptional(I,G,"bindMatrix"),wt.setOptional(I,G,"bindMatrixInverse");const Gt=G.skeleton;Gt&&(he.floatVertexTextures?(Gt.boneTexture===null&&Gt.computeBoneTexture(),wt.setValue(I,"boneTexture",Gt.boneTexture,y)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(wt.setOptional(I,G,"batchingTexture"),wt.setValue(I,"batchingTexture",G._matricesTexture,y));const br=H.morphAttributes;if((br.position!==void 0||br.normal!==void 0||br.color!==void 0&&he.isWebGL2===!0)&&$e.update(G,H,Fn),(Gi||qe.receiveShadow!==G.receiveShadow)&&(qe.receiveShadow=G.receiveShadow,wt.setValue(I,"receiveShadow",G.receiveShadow)),W.isMeshGouraudMaterial&&W.envMap!==null&&(zn.envMap.value=ke,zn.flipEnvMap.value=ke.isCubeTexture&&ke.isRenderTargetTexture===!1?-1:1),Gi&&(wt.setValue(I,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&Nh(zn,yr),ye&&W.fog===!0&&ge.refreshFogUniforms(zn,ye),ge.refreshMaterialUniforms(zn,W,X,O,Te),Qs.upload(I,oa(qe),zn,y)),W.isShaderMaterial&&W.uniformsNeedUpdate===!0&&(Qs.upload(I,oa(qe),zn,y),W.uniformsNeedUpdate=!1),W.isSpriteMaterial&&wt.setValue(I,"center",G.center),wt.setValue(I,"modelViewMatrix",G.modelViewMatrix),wt.setValue(I,"normalMatrix",G.normalMatrix),wt.setValue(I,"modelMatrix",G.matrixWorld),W.isShaderMaterial||W.isRawShaderMaterial){const Gt=W.uniformsGroups;for(let Tr=0,Oh=Gt.length;Tr<Oh;Tr++)if(he.isWebGL2){const la=Gt[Tr];ue.update(la,Fn),ue.bind(la,Fn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Fn}function Nh(T,B){T.ambientLightColor.needsUpdate=B,T.lightProbe.needsUpdate=B,T.directionalLights.needsUpdate=B,T.directionalLightShadows.needsUpdate=B,T.pointLights.needsUpdate=B,T.pointLightShadows.needsUpdate=B,T.spotLights.needsUpdate=B,T.spotLightShadows.needsUpdate=B,T.rectAreaLights.needsUpdate=B,T.hemisphereLights.needsUpdate=B}function Uh(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(T,B,H){xe.get(T.texture).__webglTexture=B,xe.get(T.depthTexture).__webglTexture=H;const W=xe.get(T);W.__hasExternalTextures=!0,W.__hasExternalTextures&&(W.__autoAllocateDepthBuffer=H===void 0,W.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),W.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(T,B){const H=xe.get(T);H.__webglFramebuffer=B,H.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(T,B=0,H=0){A=T,C=B,w=H;let W=!0,G=null,ye=!1,Pe=!1;if(T){const ke=xe.get(T);ke.__useDefaultFramebuffer!==void 0?(J.bindFramebuffer(I.FRAMEBUFFER,null),W=!1):ke.__webglFramebuffer===void 0?y.setupRenderTarget(T):ke.__hasExternalTextures&&y.rebindTextures(T,xe.get(T.texture).__webglTexture,xe.get(T.depthTexture).__webglTexture);const Xe=T.texture;(Xe.isData3DTexture||Xe.isDataArrayTexture||Xe.isCompressedArrayTexture)&&(Pe=!0);const He=xe.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[B])?G=He[B][H]:G=He[B],ye=!0):he.isWebGL2&&T.samples>0&&y.useMultisampledRTT(T)===!1?G=xe.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?G=He[H]:G=He,b.copy(T.viewport),F.copy(T.scissor),$=T.scissorTest}else b.copy(Z).multiplyScalar(X).floor(),F.copy(te).multiplyScalar(X).floor(),$=ae;if(J.bindFramebuffer(I.FRAMEBUFFER,G)&&he.drawBuffers&&W&&J.drawBuffers(T,G),J.viewport(b),J.scissor(F),J.setScissorTest($),ye){const ke=xe.get(T.texture);I.framebufferTexture2D(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,I.TEXTURE_CUBE_MAP_POSITIVE_X+B,ke.__webglTexture,H)}else if(Pe){const ke=xe.get(T.texture),Xe=B||0;I.framebufferTextureLayer(I.FRAMEBUFFER,I.COLOR_ATTACHMENT0,ke.__webglTexture,H||0,Xe)}N=-1},this.readRenderTargetPixels=function(T,B,H,W,G,ye,Pe){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Oe=xe.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Pe!==void 0&&(Oe=Oe[Pe]),Oe){J.bindFramebuffer(I.FRAMEBUFFER,Oe);try{const ke=T.texture,Xe=ke.format,He=ke.type;if(Xe!==Jt&&Me.convert(Xe)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Ve=He===rs&&(Q.has("EXT_color_buffer_half_float")||he.isWebGL2&&Q.has("EXT_color_buffer_float"));if(He!==Ln&&Me.convert(He)!==I.getParameter(I.IMPLEMENTATION_COLOR_READ_TYPE)&&!(He===wn&&(he.isWebGL2||Q.has("OES_texture_float")||Q.has("WEBGL_color_buffer_float")))&&!Ve){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=T.width-W&&H>=0&&H<=T.height-G&&I.readPixels(B,H,W,G,Me.convert(Xe),Me.convert(He),ye)}finally{const ke=A!==null?xe.get(A).__webglFramebuffer:null;J.bindFramebuffer(I.FRAMEBUFFER,ke)}}},this.copyFramebufferToTexture=function(T,B,H=0){const W=Math.pow(2,-H),G=Math.floor(B.image.width*W),ye=Math.floor(B.image.height*W);y.setTexture2D(B,0),I.copyTexSubImage2D(I.TEXTURE_2D,H,0,0,T.x,T.y,G,ye),J.unbindTexture()},this.copyTextureToTexture=function(T,B,H,W=0){const G=B.image.width,ye=B.image.height,Pe=Me.convert(H.format),Oe=Me.convert(H.type);y.setTexture2D(H,0),I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,H.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,H.unpackAlignment),B.isDataTexture?I.texSubImage2D(I.TEXTURE_2D,W,T.x,T.y,G,ye,Pe,Oe,B.image.data):B.isCompressedTexture?I.compressedTexSubImage2D(I.TEXTURE_2D,W,T.x,T.y,B.mipmaps[0].width,B.mipmaps[0].height,Pe,B.mipmaps[0].data):I.texSubImage2D(I.TEXTURE_2D,W,T.x,T.y,Pe,Oe,B.image),W===0&&H.generateMipmaps&&I.generateMipmap(I.TEXTURE_2D),J.unbindTexture()},this.copyTextureToTexture3D=function(T,B,H,W,G=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ye=T.max.x-T.min.x+1,Pe=T.max.y-T.min.y+1,Oe=T.max.z-T.min.z+1,ke=Me.convert(W.format),Xe=Me.convert(W.type);let He;if(W.isData3DTexture)y.setTexture3D(W,0),He=I.TEXTURE_3D;else if(W.isDataArrayTexture||W.isCompressedArrayTexture)y.setTexture2DArray(W,0),He=I.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}I.pixelStorei(I.UNPACK_FLIP_Y_WEBGL,W.flipY),I.pixelStorei(I.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),I.pixelStorei(I.UNPACK_ALIGNMENT,W.unpackAlignment);const Ve=I.getParameter(I.UNPACK_ROW_LENGTH),pt=I.getParameter(I.UNPACK_IMAGE_HEIGHT),zt=I.getParameter(I.UNPACK_SKIP_PIXELS),Mt=I.getParameter(I.UNPACK_SKIP_ROWS),on=I.getParameter(I.UNPACK_SKIP_IMAGES),ct=H.isCompressedTexture?H.mipmaps[G]:H.image;I.pixelStorei(I.UNPACK_ROW_LENGTH,ct.width),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,ct.height),I.pixelStorei(I.UNPACK_SKIP_PIXELS,T.min.x),I.pixelStorei(I.UNPACK_SKIP_ROWS,T.min.y),I.pixelStorei(I.UNPACK_SKIP_IMAGES,T.min.z),H.isDataTexture||H.isData3DTexture?I.texSubImage3D(He,G,B.x,B.y,B.z,ye,Pe,Oe,ke,Xe,ct.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),I.compressedTexSubImage3D(He,G,B.x,B.y,B.z,ye,Pe,Oe,ke,ct.data)):I.texSubImage3D(He,G,B.x,B.y,B.z,ye,Pe,Oe,ke,Xe,ct),I.pixelStorei(I.UNPACK_ROW_LENGTH,Ve),I.pixelStorei(I.UNPACK_IMAGE_HEIGHT,pt),I.pixelStorei(I.UNPACK_SKIP_PIXELS,zt),I.pixelStorei(I.UNPACK_SKIP_ROWS,Mt),I.pixelStorei(I.UNPACK_SKIP_IMAGES,on),G===0&&W.generateMipmaps&&I.generateMipmap(He),J.unbindTexture()},this.initTexture=function(T){T.isCubeTexture?y.setTextureCube(T,0):T.isData3DTexture?y.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?y.setTexture2DArray(T,0):y.setTexture2D(T,0),J.unbindTexture()},this.resetState=function(){C=0,w=0,A=null,J.reset(),R.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===ko?"display-p3":"srgb",t.unpackColorSpace=it.workingColorSpace===_r?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===bt?Kn:Il}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Kn?bt:gn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class c_ extends Jl{}c_.prototype.isWebGL1Renderer=!0;class Lc extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class Ic extends Qt{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Si=new st,Dc=new st,Bs=[],Nc=new On,l_=new st,qi=new tt,Yi=new Oi;class Ql extends tt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ic(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,l_)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new On),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Si),Nc.copy(e.boundingBox).applyMatrix4(Si),this.boundingBox.union(Nc)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Si),Yi.copy(e.boundingSphere).applyMatrix4(Si),this.boundingSphere.union(Yi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}raycast(e,t){const n=this.matrixWorld,s=this.count;if(qi.geometry=this.geometry,qi.material=this.material,qi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yi.copy(this.boundingSphere),Yi.applyMatrix4(n),e.ray.intersectsSphere(Yi)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Si),Dc.multiplyMatrices(n,Si),qi.matrixWorld=Dc,qi.raycast(e,Bs);for(let a=0,o=Bs.length;a<o;a++){const c=Bs[a];c.instanceId=r,c.object=this,t.push(c)}Bs.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new Ic(new Float32Array(this.instanceMatrix.count*3),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class eh extends Un{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ke(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Uc=new L,Oc=new L,Fc=new st,no=new vr,ks=new Oi;class h_ extends vt{constructor(e=new Lt,t=new eh){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Uc.fromBufferAttribute(t,s-1),Oc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Uc.distanceTo(Oc);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ks.copy(n.boundingSphere),ks.applyMatrix4(s),ks.radius+=r,e.ray.intersectsSphere(ks)===!1)return;Fc.copy(s).invert(),no.copy(e.ray).applyMatrix4(Fc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new L,h=new L,u=new L,d=new L,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const m=Math.max(0,a.start),x=Math.min(g.count,a.start+a.count);for(let v=m,S=x-1;v<S;v+=f){const C=g.getX(v),w=g.getX(v+1);if(l.fromBufferAttribute(p,C),h.fromBufferAttribute(p,w),no.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const N=e.ray.origin.distanceTo(d);N<e.near||N>e.far||t.push({distance:N,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=m,S=x-1;v<S;v+=f){if(l.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),no.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(d);w<e.near||w>e.far||t.push({distance:w,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const zc=new L,Bc=new L;class u_ extends h_{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)zc.fromBufferAttribute(t,s),Bc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zc.distanceTo(Bc);e.setAttribute("lineDistance",new rt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class d_ extends Ft{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class rn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new le:new L);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new L,s=[],r=[],a=[],o=new L,c=new st;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new L)}r[0]=new L,a[0]=new L;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Tt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Tt(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class $o extends rn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t){const n=t||new le,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class f_ extends $o{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Xo(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const Gs=new L,io=new Xo,so=new Xo,ro=new Xo;class In extends rn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new L){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Gs.subVectors(s[0],s[1]).add(s[0]),l=Gs);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Gs.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Gs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),io.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,p),so.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,p),ro.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(io.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),so.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ro.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(io.calc(c),so.calc(c),ro.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new L().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function kc(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function p_(i,e){const t=1-i;return t*t*e}function m_(i,e){return 2*(1-i)*i*e}function g_(i,e){return i*i*e}function ns(i,e,t,n){return p_(i,e)+m_(i,t)+g_(i,n)}function __(i,e){const t=1-i;return t*t*t*e}function v_(i,e){const t=1-i;return 3*t*t*i*e}function x_(i,e){return 3*(1-i)*i*i*e}function S_(i,e){return i*i*i*e}function is(i,e,t,n,s){return __(i,e)+v_(i,t)+x_(i,n)+S_(i,s)}class th extends rn{constructor(e=new le,t=new le,n=new le,s=new le){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new le){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(e,s.x,r.x,a.x,o.x),is(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class M_ extends rn{constructor(e=new L,t=new L,n=new L,s=new L){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(is(e,s.x,r.x,a.x,o.x),is(e,s.y,r.y,a.y,o.y),is(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class nh extends rn{constructor(e=new le,t=new le){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new le){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new le){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class E_ extends rn{constructor(e=new L,t=new L){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new L){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new L){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ih extends rn{constructor(e=new le,t=new le,n=new le){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new le){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ns(e,s.x,r.x,a.x),ns(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class sh extends rn{constructor(e=new L,t=new L,n=new L){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new L){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(ns(e,s.x,r.x,a.x),ns(e,s.y,r.y,a.y),ns(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class rh extends rn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new le){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(kc(o,c.x,l.x,h.x,u.x),kc(o,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new le().fromArray(s))}return this}}var hr=Object.freeze({__proto__:null,ArcCurve:f_,CatmullRomCurve3:In,CubicBezierCurve:th,CubicBezierCurve3:M_,EllipseCurve:$o,LineCurve:nh,LineCurve3:E_,QuadraticBezierCurve:ih,QuadraticBezierCurve3:sh,SplineCurve:rh});class y_ extends rn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new hr[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new hr[s.type]().fromJSON(s))}return this}}class Gc extends y_{constructor(e){super(),this.type="Path",this.currentPoint=new le,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new nh(this.currentPoint.clone(),new le(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new ih(this.currentPoint.clone(),new le(e,t),new le(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new th(this.currentPoint.clone(),new le(e,t),new le(n,s),new le(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new rh(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new $o(e,t,n,s,r,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class us extends Lt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new L,h=new le;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new rt(a,3)),this.setAttribute("normal",new rt(o,3)),this.setAttribute("uv",new rt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new us(e.radius,e.segments,e.thetaStart,e.thetaLength)}}const Hs=new L,Vs=new L,oo=new L,Ws=new Vt;class oh extends Lt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(es*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:p,c:m}=Ws;if(_.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),m.fromBufferAttribute(o,l[2]),Ws.getNormal(oo),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const v=(x+1)%3,S=u[x],C=u[v],w=Ws[h[x]],A=Ws[h[v]],N=`${S}_${C}`,E=`${C}_${S}`;E in d&&d[E]?(oo.dot(d[E].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),d[E]=null):N in d||(d[N]={index0:l[x],index1:l[v],normal:oo.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:p}=d[g];Hs.fromBufferAttribute(o,_),Vs.fromBufferAttribute(o,p),f.push(Hs.x,Hs.y,Hs.z),f.push(Vs.x,Vs.y,Vs.z)}this.setAttribute("position",new rt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Bi extends Gc{constructor(e){super(e),this.uuid=Ui(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new Gc().fromJSON(s))}return this}}const b_={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=ah(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l,h,u,d,f;if(n&&(r=R_(i,e,r,t)),i.length>80*t){o=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)u=i[g],d=i[g+1],u<o&&(o=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-o,h-c),f=f!==0?32767/f:0}return os(r,a,t,o,c,f,0),a}};function ah(i,e,t,n,s){let r,a;if(s===k_(i,e,t,n)>0)for(r=e;r<t;r+=n)a=Hc(r,i[r],i[r+1],a);else for(r=t-n;r>=e;r-=n)a=Hc(r,i[r],i[r+1],a);return a&&Sr(a,a.next)&&(cs(a),a=a.next),a}function ei(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(Sr(t,t.next)||lt(t.prev,t,t.next)===0)){if(cs(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function os(i,e,t,n,s,r,a){if(!i)return;!a&&r&&N_(i,n,s,r);let o=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?w_(i,n,s,r):T_(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),cs(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=A_(ei(i),e,t),os(i,e,t,n,s,r,2)):a===2&&C_(i,e,t,n,s,r):os(ei(i),e,t,n,s,r,1);break}}}function T_(i){const e=i.prev,t=i,n=i.next;if(lt(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<c?o<l?o:l:c<l?c:l,d=s>r?s>a?s:a:r>a?r:a,f=o>c?o>l?o:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&wi(s,o,r,c,a,l,g.x,g.y)&&lt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function w_(i,e,t,n){const s=i.prev,r=i,a=i.next;if(lt(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,d=a.y,f=o<c?o<l?o:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=o>c?o>l?o:l:c>l?c:l,p=h>u?h>d?h:d:u>d?u:d,m=No(f,g,e,t,n),x=No(_,p,e,t,n);let v=i.prevZ,S=i.nextZ;for(;v&&v.z>=m&&S&&S.z<=x;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&wi(o,h,c,u,l,d,v.x,v.y)&&lt(v.prev,v,v.next)>=0||(v=v.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&wi(o,h,c,u,l,d,S.x,S.y)&&lt(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&wi(o,h,c,u,l,d,v.x,v.y)&&lt(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;S&&S.z<=x;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=p&&S!==s&&S!==a&&wi(o,h,c,u,l,d,S.x,S.y)&&lt(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function A_(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!Sr(s,r)&&ch(s,n,n.next,r)&&as(s,r)&&as(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),cs(n),cs(n.next),n=i=r),n=n.next}while(n!==i);return ei(n)}function C_(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&F_(a,o)){let c=lh(a,o);a=ei(a,a.next),c=ei(c,c.next),os(a,e,t,n,s,r,0),os(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function R_(i,e,t,n){const s=[];let r,a,o,c,l;for(r=0,a=e.length;r<a;r++)o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=ah(i,o,c,n,!1),l===l.next&&(l.steiner=!0),s.push(O_(l));for(s.sort(P_),r=0;r<s.length;r++)t=L_(s[r],t);return t}function P_(i,e){return i.x-e.x}function L_(i,e){const t=I_(i,e);if(!t)return e;const n=lh(t,i);return ei(n,n.next),ei(t,t.next)}function I_(i,e){let t=e,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const d=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(d<=r&&d>n&&(n=d,s=t.x<t.next.x?t:t.next,d===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,c=s.x,l=s.y;let h=1/0,u;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&wi(a<l?r:n,a,c,l,a<l?n:r,a,t.x,t.y)&&(u=Math.abs(a-t.y)/(r-t.x),as(t,i)&&(u<h||u===h&&(t.x>s.x||t.x===s.x&&D_(s,t)))&&(s=t,h=u)),t=t.next;while(t!==o);return s}function D_(i,e){return lt(i.prev,i,e.prev)<0&&lt(e.next,i,i.next)<0}function N_(i,e,t,n){let s=i;do s.z===0&&(s.z=No(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,U_(s)}function U_(i){let e,t,n,s,r,a,o,c,l=1;do{for(t=i,i=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<l&&(o++,n=n.nextZ,!!n);e++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,o--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(a>1);return i}function No(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function O_(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function wi(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function F_(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!z_(i,e)&&(as(i,e)&&as(e,i)&&B_(i,e)&&(lt(i.prev,i,e.prev)||lt(i,e.prev,e))||Sr(i,e)&&lt(i.prev,i,i.next)>0&&lt(e.prev,e,e.next)>0)}function lt(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function Sr(i,e){return i.x===e.x&&i.y===e.y}function ch(i,e,t,n){const s=Xs(lt(i,e,t)),r=Xs(lt(i,e,n)),a=Xs(lt(t,n,i)),o=Xs(lt(t,n,e));return!!(s!==r&&a!==o||s===0&&$s(i,t,e)||r===0&&$s(i,n,e)||a===0&&$s(t,i,n)||o===0&&$s(t,e,n))}function $s(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Xs(i){return i>0?1:i<0?-1:0}function z_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&ch(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function as(i,e){return lt(i.prev,i,i.next)<0?lt(i,e,i.next)>=0&&lt(i,i.prev,e)>=0:lt(i,e,i.prev)<0||lt(i,i.next,e)<0}function B_(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function lh(i,e){const t=new Uo(i.i,i.x,i.y),n=new Uo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Hc(i,e,t,n){const s=new Uo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function cs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Uo(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function k_(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Dn{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Dn.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Vc(e),Wc(n,e);let a=e.length;t.forEach(Vc);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Wc(n,t[c]);const o=b_.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Vc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Wc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ds extends Lt{constructor(e=new Bi([new le(.5,.5),new le(-.5,.5),new le(-.5,-.5),new le(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){const l=e[o];a(l)}this.setAttribute("position",new rt(s,3)),this.setAttribute("uv",new rt(r,2)),this.computeVertexNormals();function a(o){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1;let d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,p=t.bevelSegments!==void 0?t.bevelSegments:3;const m=t.extrudePath,x=t.UVGenerator!==void 0?t.UVGenerator:G_;let v,S=!1,C,w,A,N;m&&(v=m.getSpacedPoints(h),S=!0,d=!1,C=m.computeFrenetFrames(h,!1),w=new L,A=new L,N=new L),d||(p=0,f=0,g=0,_=0);const E=o.extractPoints(l);let b=E.shape;const F=E.holes;if(!Dn.isClockWise(b)){b=b.reverse();for(let I=0,fe=F.length;I<fe;I++){const Q=F[I];Dn.isClockWise(Q)&&(F[I]=Q.reverse())}}const ee=Dn.triangulateShape(b,F),P=b;for(let I=0,fe=F.length;I<fe;I++){const Q=F[I];b=b.concat(Q)}function U(I,fe,Q){return fe||console.error("THREE.ExtrudeGeometry: vec does not exist"),I.clone().addScaledVector(fe,Q)}const O=b.length,X=ee.length;function q(I,fe,Q){let he,J,Ce;const xe=I.x-fe.x,y=I.y-fe.y,M=Q.x-I.x,z=Q.y-I.y,oe=xe*xe+y*y,se=xe*z-y*M;if(Math.abs(se)>Number.EPSILON){const ie=Math.sqrt(oe),we=Math.sqrt(M*M+z*z),ge=fe.x-y/ie,Ee=fe.y+xe/ie,Ie=Q.x-z/we,Ge=Q.y+M/we,re=((Ie-ge)*z-(Ge-Ee)*M)/(xe*z-y*M);he=ge+xe*re-I.x,J=Ee+y*re-I.y;const Je=he*he+J*J;if(Je<=2)return new le(he,J);Ce=Math.sqrt(Je/2)}else{let ie=!1;xe>Number.EPSILON?M>Number.EPSILON&&(ie=!0):xe<-Number.EPSILON?M<-Number.EPSILON&&(ie=!0):Math.sign(y)===Math.sign(z)&&(ie=!0),ie?(he=-y,J=xe,Ce=Math.sqrt(oe)):(he=xe,J=y,Ce=Math.sqrt(oe/2))}return new le(he/Ce,J/Ce)}const K=[];for(let I=0,fe=P.length,Q=fe-1,he=I+1;I<fe;I++,Q++,he++)Q===fe&&(Q=0),he===fe&&(he=0),K[I]=q(P[I],P[Q],P[he]);const Z=[];let te,ae=K.concat();for(let I=0,fe=F.length;I<fe;I++){const Q=F[I];te=[];for(let he=0,J=Q.length,Ce=J-1,xe=he+1;he<J;he++,Ce++,xe++)Ce===J&&(Ce=0),xe===J&&(xe=0),te[he]=q(Q[he],Q[Ce],Q[xe]);Z.push(te),ae=ae.concat(te)}for(let I=0;I<p;I++){const fe=I/p,Q=f*Math.cos(fe*Math.PI/2),he=g*Math.sin(fe*Math.PI/2)+_;for(let J=0,Ce=P.length;J<Ce;J++){const xe=U(P[J],K[J],he);Se(xe.x,xe.y,-Q)}for(let J=0,Ce=F.length;J<Ce;J++){const xe=F[J];te=Z[J];for(let y=0,M=xe.length;y<M;y++){const z=U(xe[y],te[y],he);Se(z.x,z.y,-Q)}}}const V=g+_;for(let I=0;I<O;I++){const fe=d?U(b[I],ae[I],V):b[I];S?(A.copy(C.normals[0]).multiplyScalar(fe.x),w.copy(C.binormals[0]).multiplyScalar(fe.y),N.copy(v[0]).add(A).add(w),Se(N.x,N.y,N.z)):Se(fe.x,fe.y,0)}for(let I=1;I<=h;I++)for(let fe=0;fe<O;fe++){const Q=d?U(b[fe],ae[fe],V):b[fe];S?(A.copy(C.normals[I]).multiplyScalar(Q.x),w.copy(C.binormals[I]).multiplyScalar(Q.y),N.copy(v[I]).add(A).add(w),Se(N.x,N.y,N.z)):Se(Q.x,Q.y,u/h*I)}for(let I=p-1;I>=0;I--){const fe=I/p,Q=f*Math.cos(fe*Math.PI/2),he=g*Math.sin(fe*Math.PI/2)+_;for(let J=0,Ce=P.length;J<Ce;J++){const xe=U(P[J],K[J],he);Se(xe.x,xe.y,u+Q)}for(let J=0,Ce=F.length;J<Ce;J++){const xe=F[J];te=Z[J];for(let y=0,M=xe.length;y<M;y++){const z=U(xe[y],te[y],he);S?Se(z.x,z.y+v[h-1].y,v[h-1].x+Q):Se(z.x,z.y,u+Q)}}}ne(),_e();function ne(){const I=s.length/3;if(d){let fe=0,Q=O*fe;for(let he=0;he<X;he++){const J=ee[he];Ne(J[2]+Q,J[1]+Q,J[0]+Q)}fe=h+p*2,Q=O*fe;for(let he=0;he<X;he++){const J=ee[he];Ne(J[0]+Q,J[1]+Q,J[2]+Q)}}else{for(let fe=0;fe<X;fe++){const Q=ee[fe];Ne(Q[2],Q[1],Q[0])}for(let fe=0;fe<X;fe++){const Q=ee[fe];Ne(Q[0]+O*h,Q[1]+O*h,Q[2]+O*h)}}n.addGroup(I,s.length/3-I,0)}function _e(){const I=s.length/3;let fe=0;Te(P,fe),fe+=P.length;for(let Q=0,he=F.length;Q<he;Q++){const J=F[Q];Te(J,fe),fe+=J.length}n.addGroup(I,s.length/3-I,1)}function Te(I,fe){let Q=I.length;for(;--Q>=0;){const he=Q;let J=Q-1;J<0&&(J=I.length-1);for(let Ce=0,xe=h+p*2;Ce<xe;Ce++){const y=O*Ce,M=O*(Ce+1),z=fe+he+y,oe=fe+J+y,se=fe+J+M,ie=fe+he+M;ze(z,oe,se,ie)}}}function Se(I,fe,Q){c.push(I),c.push(fe),c.push(Q)}function Ne(I,fe,Q){Ae(I),Ae(fe),Ae(Q);const he=s.length/3,J=x.generateTopUV(n,s,he-3,he-2,he-1);Fe(J[0]),Fe(J[1]),Fe(J[2])}function ze(I,fe,Q,he){Ae(I),Ae(fe),Ae(he),Ae(fe),Ae(Q),Ae(he);const J=s.length/3,Ce=x.generateSideWallUV(n,s,J-6,J-3,J-2,J-1);Fe(Ce[0]),Fe(Ce[1]),Fe(Ce[3]),Fe(Ce[1]),Fe(Ce[2]),Fe(Ce[3])}function Ae(I){s.push(c[I*3+0]),s.push(c[I*3+1]),s.push(c[I*3+2])}function Fe(I){r.push(I.x),r.push(I.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return H_(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new hr[s.type]().fromJSON(s)),new ds(n,e.options)}}const G_={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new le(r,a),new le(o,c),new le(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],p=e[r*3+1],m=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new le(a,1-c),new le(l,1-u),new le(d,1-g),new le(_,1-m)]:[new le(o,1-c),new le(h,1-u),new le(f,1-g),new le(p,1-m)]}};function H_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class qo extends Lt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let u=e;const d=(t-e)/s,f=new L,g=new le;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const m=r+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const p=_*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,S=x+n+1,C=x+n+2,w=x+1;o.push(v,S,w),o.push(S,C,w)}}this.setIndex(o),this.setAttribute("position",new rt(c,3)),this.setAttribute("normal",new rt(l,3)),this.setAttribute("uv",new rt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Yo extends Lt{constructor(e=new Bi([new le(0,.5),new le(-.5,-.5),new le(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new rt(s,3)),this.setAttribute("normal",new rt(r,3)),this.setAttribute("uv",new rt(a,2));function l(h){const u=s.length/3,d=h.extractPoints(t);let f=d.shape;const g=d.holes;Dn.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];Dn.isClockWise(x)===!0&&(g[p]=x.reverse())}const _=Dn.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];f=f.concat(x)}for(let p=0,m=f.length;p<m;p++){const x=f[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=_.length;p<m;p++){const x=_[p],v=x[0]+u,S=x[1]+u,C=x[2]+u;n.push(v,S,C),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes;return V_(t,e)}static fromJSON(e,t){const n=[];for(let s=0,r=e.shapes.length;s<r;s++){const a=t[e.shapes[s]];n.push(a)}return new Yo(n,e.curveSegments)}}function V_(i,e){if(e.shapes=[],Array.isArray(i))for(let t=0,n=i.length;t<n;t++){const s=i[t];e.shapes.push(s.uuid)}else e.shapes.push(i.uuid);return e}class fs extends Lt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new L,d=new L,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let S=0;m===0&&a===0?S=.5/t:m===n&&c===Math.PI&&(S=-.5/t);for(let C=0;C<=t;C++){const w=C/t;u.x=-e*Math.cos(s+w*r)*Math.sin(a+v*o),u.y=e*Math.cos(a+v*o),u.z=e*Math.sin(s+w*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(w+S,1-v),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=h[m][x+1],S=h[m][x],C=h[m+1][x],w=h[m+1][x+1];(m!==0||a>0)&&f.push(v,S,w),(m!==n-1||c<Math.PI)&&f.push(S,C,w)}this.setIndex(f),this.setAttribute("position",new rt(g,3)),this.setAttribute("normal",new rt(_,3)),this.setAttribute("uv",new rt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ur extends Lt{constructor(e=new sh(new L(-1,-1,0),new L(-1,1,0),new L(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new L,c=new L,l=new le;let h=new L;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new rt(u,3)),this.setAttribute("normal",new rt(d,3)),this.setAttribute("uv",new rt(f,2));function _(){for(let v=0;v<t;v++)p(v);p(r===!1?t:0),x(),m()}function p(v){h=e.getPointAt(v/t,h);const S=a.normals[v],C=a.binormals[v];for(let w=0;w<=s;w++){const A=w/s*Math.PI*2,N=Math.sin(A),E=-Math.cos(A);c.x=E*S.x+N*C.x,c.y=E*S.y+N*C.y,c.z=E*S.z+N*C.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function m(){for(let v=1;v<=t;v++)for(let S=1;S<=s;S++){const C=(s+1)*(v-1)+(S-1),w=(s+1)*v+(S-1),A=(s+1)*v+S,N=(s+1)*(v-1)+S;g.push(C,w,N),g.push(w,A,N)}}function x(){for(let v=0;v<=t;v++)for(let S=0;S<=s;S++)l.x=v/t,l.y=S/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ur(new hr[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class An extends Un{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Dl,this.normalScale=new le(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zo extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}class W_ extends Zo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ao=new st,$c=new L,Xc=new L;class $_{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new le(512,512),this.map=null,this.mapPass=null,this.matrix=new st,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ho,this._frameExtents=new le(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;$c.setFromMatrixPosition(e.matrixWorld),t.position.copy($c),Xc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Xc),t.updateMatrixWorld(),ao.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ao),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ao)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class X_ extends $_{constructor(){super(new Vo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class q_ extends Zo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new X_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Y_ extends Zo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Z_{constructor(e,t,n=0,s=1/0){this.ray=new vr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Go,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Oo(e,this,n,t),n.sort(qc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Oo(e[s],this,n,t);return n.sort(qc),n}}function qc(i,e){return i.distance-e.distance}function Oo(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)Oo(s[r],e,t,!0)}}class Yc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Tt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zo);class j_ extends vt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new le(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const Mi=new L,Zc=new st,jc=new st,Kc=new L,Jc=new L;class K_{constructor(e={}){const t=this;let n,s,r,a;const o={objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(f,g){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),Zc.copy(g.matrixWorldInverse),jc.multiplyMatrices(g.projectionMatrix,Zc),l(f,f,g),d(f)},this.setSize=function(f,g){n=f,s=g,r=n/2,a=s/2,c.style.width=f+"px",c.style.height=g+"px"};function l(f,g,_){if(f.isCSS2DObject){Mi.setFromMatrixPosition(f.matrixWorld),Mi.applyMatrix4(jc);const p=f.visible===!0&&Mi.z>=-1&&Mi.z<=1&&f.layers.test(_.layers)===!0;if(f.element.style.display=p===!0?"":"none",p===!0){f.onBeforeRender(t,g,_);const x=f.element;x.style.transform="translate("+-100*f.center.x+"%,"+-100*f.center.y+"%)translate("+(Mi.x*r+r)+"px,"+(-Mi.y*a+a)+"px)",x.parentNode!==c&&c.appendChild(x),f.onAfterRender(t,g,_)}const m={distanceToCameraSquared:h(_,f)};o.objects.set(f,m)}for(let p=0,m=f.children.length;p<m;p++)l(f.children[p],g,_)}function h(f,g){return Kc.setFromMatrixPosition(f.matrixWorld),Jc.setFromMatrixPosition(g.matrixWorld),Kc.distanceToSquared(Jc)}function u(f){const g=[];return f.traverse(function(_){_.isCSS2DObject&&g.push(_)}),g}function d(f){const g=u(f).sort(function(p,m){if(p.renderOrder!==m.renderOrder)return m.renderOrder-p.renderOrder;const x=o.objects.get(p).distanceToCameraSquared,v=o.objects.get(m).distanceToCameraSquared;return x-v}),_=g.length;for(let p=0,m=g.length;p<m;p++)g[p].element.style.zIndex=_-p}}}const Qc={type:"change"},co={type:"start"},el={type:"end"},qs=new vr,tl=new bn,J_=Math.cos(70*td.DEG2RAD);class Q_ extends ni{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new L,this.cursor=new L,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fn.ROTATE,MIDDLE:fn.DOLLY,RIGHT:fn.PAN},this.touches={ONE:yn.ROTATE,TWO:yn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(R){R.addEventListener("keydown",Ie),this._domElementKeyEvents=R},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ie),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Qc),n.update(),r=s.NONE},this.update=function(){const R=new L,ue=new _n().setFromUnitVectors(e.up,new L(0,1,0)),Re=ue.clone().invert(),be=new L,ce=new _n,D=new L,de=2*Math.PI;return function(Ue=null){const De=n.object.position;R.copy(De).sub(n.target),R.applyQuaternion(ue),o.setFromVector3(R),n.autoRotate&&r===s.NONE&&$(b(Ue)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Ze=n.minAzimuthAngle,je=n.maxAzimuthAngle;isFinite(Ze)&&isFinite(je)&&(Ze<-Math.PI?Ze+=de:Ze>Math.PI&&(Ze-=de),je<-Math.PI?je+=de:je>Math.PI&&(je-=de),Ze<=je?o.theta=Math.max(Ze,Math.min(je,o.theta)):o.theta=o.theta>(Ze+je)/2?Math.max(Ze,o.theta):Math.min(je,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&w||n.object.isOrthographicCamera?o.radius=Z(o.radius):o.radius=Z(o.radius*l),R.setFromSpherical(o),R.applyQuaternion(Re),De.copy(n.target).add(R),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let ht=!1;if(n.zoomToCursor&&w){let ft=null;if(n.object.isPerspectiveCamera){const Qe=R.length();ft=Z(Qe*l);const mt=Qe-ft;n.object.position.addScaledVector(S,mt),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qe=new L(C.x,C.y,0);Qe.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ht=!0;const mt=new L(C.x,C.y,0);mt.unproject(n.object),n.object.position.sub(mt).add(Qe),n.object.updateMatrixWorld(),ft=R.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ft!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ft).add(n.object.position):(qs.origin.copy(n.object.position),qs.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(qs.direction))<J_?e.lookAt(n.target):(tl.setFromNormalAndCoplanarPoint(n.object.up,n.target),qs.intersectPlane(tl,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),ht=!0);return l=1,w=!1,ht||be.distanceToSquared(n.object.position)>a||8*(1-ce.dot(n.object.quaternion))>a||D.distanceToSquared(n.target)>0?(n.dispatchEvent(Qc),be.copy(n.object.position),ce.copy(n.object.quaternion),D.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Je),n.domElement.removeEventListener("pointerdown",y),n.domElement.removeEventListener("pointercancel",z),n.domElement.removeEventListener("wheel",ie),n.domElement.removeEventListener("pointermove",M),n.domElement.removeEventListener("pointerup",z),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ie),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Yc,c=new Yc;let l=1;const h=new L,u=new le,d=new le,f=new le,g=new le,_=new le,p=new le,m=new le,x=new le,v=new le,S=new L,C=new le;let w=!1;const A=[],N={};let E=!1;function b(R){return R!==null?2*Math.PI/60*n.autoRotateSpeed*R:2*Math.PI/60/60*n.autoRotateSpeed}function F(R){const ue=Math.abs(R*.01);return Math.pow(.95,n.zoomSpeed*ue)}function $(R){c.theta-=R}function ee(R){c.phi-=R}const P=function(){const R=new L;return function(Re,be){R.setFromMatrixColumn(be,0),R.multiplyScalar(-Re),h.add(R)}}(),U=function(){const R=new L;return function(Re,be){n.screenSpacePanning===!0?R.setFromMatrixColumn(be,1):(R.setFromMatrixColumn(be,0),R.crossVectors(n.object.up,R)),R.multiplyScalar(Re),h.add(R)}}(),O=function(){const R=new L;return function(Re,be){const ce=n.domElement;if(n.object.isPerspectiveCamera){const D=n.object.position;R.copy(D).sub(n.target);let de=R.length();de*=Math.tan(n.object.fov/2*Math.PI/180),P(2*Re*de/ce.clientHeight,n.object.matrix),U(2*be*de/ce.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(P(Re*(n.object.right-n.object.left)/n.object.zoom/ce.clientWidth,n.object.matrix),U(be*(n.object.top-n.object.bottom)/n.object.zoom/ce.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function X(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function q(R){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=R:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(R,ue){if(!n.zoomToCursor)return;w=!0;const Re=n.domElement.getBoundingClientRect(),be=R-Re.left,ce=ue-Re.top,D=Re.width,de=Re.height;C.x=be/D*2-1,C.y=-(ce/de)*2+1,S.set(C.x,C.y,1).unproject(n.object).sub(n.object.position).normalize()}function Z(R){return Math.max(n.minDistance,Math.min(n.maxDistance,R))}function te(R){u.set(R.clientX,R.clientY)}function ae(R){K(R.clientX,R.clientX),m.set(R.clientX,R.clientY)}function V(R){g.set(R.clientX,R.clientY)}function ne(R){d.set(R.clientX,R.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ue=n.domElement;$(2*Math.PI*f.x/ue.clientHeight),ee(2*Math.PI*f.y/ue.clientHeight),u.copy(d),n.update()}function _e(R){x.set(R.clientX,R.clientY),v.subVectors(x,m),v.y>0?X(F(v.y)):v.y<0&&q(F(v.y)),m.copy(x),n.update()}function Te(R){_.set(R.clientX,R.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),O(p.x,p.y),g.copy(_),n.update()}function Se(R){K(R.clientX,R.clientY),R.deltaY<0?q(F(R.deltaY)):R.deltaY>0&&X(F(R.deltaY)),n.update()}function Ne(R){let ue=!1;switch(R.code){case n.keys.UP:R.ctrlKey||R.metaKey||R.shiftKey?ee(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(0,n.keyPanSpeed),ue=!0;break;case n.keys.BOTTOM:R.ctrlKey||R.metaKey||R.shiftKey?ee(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(0,-n.keyPanSpeed),ue=!0;break;case n.keys.LEFT:R.ctrlKey||R.metaKey||R.shiftKey?$(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(n.keyPanSpeed,0),ue=!0;break;case n.keys.RIGHT:R.ctrlKey||R.metaKey||R.shiftKey?$(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):O(-n.keyPanSpeed,0),ue=!0;break}ue&&(R.preventDefault(),n.update())}function ze(R){if(A.length===1)u.set(R.pageX,R.pageY);else{const ue=Me(R),Re=.5*(R.pageX+ue.x),be=.5*(R.pageY+ue.y);u.set(Re,be)}}function Ae(R){if(A.length===1)g.set(R.pageX,R.pageY);else{const ue=Me(R),Re=.5*(R.pageX+ue.x),be=.5*(R.pageY+ue.y);g.set(Re,be)}}function Fe(R){const ue=Me(R),Re=R.pageX-ue.x,be=R.pageY-ue.y,ce=Math.sqrt(Re*Re+be*be);m.set(0,ce)}function I(R){n.enableZoom&&Fe(R),n.enablePan&&Ae(R)}function fe(R){n.enableZoom&&Fe(R),n.enableRotate&&ze(R)}function Q(R){if(A.length==1)d.set(R.pageX,R.pageY);else{const Re=Me(R),be=.5*(R.pageX+Re.x),ce=.5*(R.pageY+Re.y);d.set(be,ce)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ue=n.domElement;$(2*Math.PI*f.x/ue.clientHeight),ee(2*Math.PI*f.y/ue.clientHeight),u.copy(d)}function he(R){if(A.length===1)_.set(R.pageX,R.pageY);else{const ue=Me(R),Re=.5*(R.pageX+ue.x),be=.5*(R.pageY+ue.y);_.set(Re,be)}p.subVectors(_,g).multiplyScalar(n.panSpeed),O(p.x,p.y),g.copy(_)}function J(R){const ue=Me(R),Re=R.pageX-ue.x,be=R.pageY-ue.y,ce=Math.sqrt(Re*Re+be*be);x.set(0,ce),v.set(0,Math.pow(x.y/m.y,n.zoomSpeed)),X(v.y),m.copy(x);const D=(R.pageX+ue.x)*.5,de=(R.pageY+ue.y)*.5;K(D,de)}function Ce(R){n.enableZoom&&J(R),n.enablePan&&he(R)}function xe(R){n.enableZoom&&J(R),n.enableRotate&&Q(R)}function y(R){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(R.pointerId),n.domElement.addEventListener("pointermove",M),n.domElement.addEventListener("pointerup",z)),$e(R),R.pointerType==="touch"?Ge(R):oe(R))}function M(R){n.enabled!==!1&&(R.pointerType==="touch"?re(R):se(R))}function z(R){Be(R),A.length===0&&(n.domElement.releasePointerCapture(R.pointerId),n.domElement.removeEventListener("pointermove",M),n.domElement.removeEventListener("pointerup",z)),n.dispatchEvent(el),r=s.NONE}function oe(R){let ue;switch(R.button){case 0:ue=n.mouseButtons.LEFT;break;case 1:ue=n.mouseButtons.MIDDLE;break;case 2:ue=n.mouseButtons.RIGHT;break;default:ue=-1}switch(ue){case fn.DOLLY:if(n.enableZoom===!1)return;ae(R),r=s.DOLLY;break;case fn.ROTATE:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enablePan===!1)return;V(R),r=s.PAN}else{if(n.enableRotate===!1)return;te(R),r=s.ROTATE}break;case fn.PAN:if(R.ctrlKey||R.metaKey||R.shiftKey){if(n.enableRotate===!1)return;te(R),r=s.ROTATE}else{if(n.enablePan===!1)return;V(R),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(co)}function se(R){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;ne(R);break;case s.DOLLY:if(n.enableZoom===!1)return;_e(R);break;case s.PAN:if(n.enablePan===!1)return;Te(R);break}}function ie(R){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(R.preventDefault(),n.dispatchEvent(co),Se(we(R)),n.dispatchEvent(el))}function we(R){const ue=R.deltaMode,Re={clientX:R.clientX,clientY:R.clientY,deltaY:R.deltaY};switch(ue){case 1:Re.deltaY*=16;break;case 2:Re.deltaY*=100;break}return R.ctrlKey&&!E&&(Re.deltaY*=10),Re}function ge(R){R.key==="Control"&&(E=!0,document.addEventListener("keyup",Ee,{passive:!0,capture:!0}))}function Ee(R){R.key==="Control"&&(E=!1,document.removeEventListener("keyup",Ee,{passive:!0,capture:!0}))}function Ie(R){n.enabled===!1||n.enablePan===!1||Ne(R)}function Ge(R){switch(Le(R),A.length){case 1:switch(n.touches.ONE){case yn.ROTATE:if(n.enableRotate===!1)return;ze(R),r=s.TOUCH_ROTATE;break;case yn.PAN:if(n.enablePan===!1)return;Ae(R),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case yn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;I(R),r=s.TOUCH_DOLLY_PAN;break;case yn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;fe(R),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(co)}function re(R){switch(Le(R),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;Q(R),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;he(R),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ce(R),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xe(R),n.update();break;default:r=s.NONE}}function Je(R){n.enabled!==!1&&R.preventDefault()}function $e(R){A.push(R.pointerId)}function Be(R){delete N[R.pointerId];for(let ue=0;ue<A.length;ue++)if(A[ue]==R.pointerId){A.splice(ue,1);return}}function Le(R){let ue=N[R.pointerId];ue===void 0&&(ue=new le,N[R.pointerId]=ue),ue.set(R.pageX,R.pageY)}function Me(R){const ue=R.pointerId===A[0]?A[1]:A[0];return N[ue]}n.domElement.addEventListener("contextmenu",Je),n.domElement.addEventListener("pointerdown",y),n.domElement.addEventListener("pointercancel",z),n.domElement.addEventListener("wheel",ie,{passive:!1}),document.addEventListener("keydown",ge,{passive:!0,capture:!0}),this.update()}}class ev extends Q_{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons={LEFT:fn.PAN,MIDDLE:fn.DOLLY,RIGHT:fn.ROTATE},this.touches={ONE:yn.PAN,TWO:yn.DOLLY_ROTATE}}}class tv{constructor(e){pe(this,"scene");pe(this,"camera");pe(this,"renderer");pe(this,"labelRenderer");pe(this,"controls");pe(this,"container");pe(this,"trackGroup");pe(this,"trainGroup");pe(this,"labelGroup");pe(this,"sceneryGroup");pe(this,"gridOverlayGroup");pe(this,"raycaster");pe(this,"mouse");pe(this,"onSwitchClick");pe(this,"onSemaphoreClick");pe(this,"onDecouplerClick");pe(this,"onTrainDblClick");pe(this,"onGeneratorDblClick");pe(this,"layoutBounds",null);this.container=e,this.scene=new Lc,this.scene.background=new Ke(16119285);const t=e.clientWidth/e.clientHeight,n=100;this.camera=new Vo(-n*t/2,n*t/2,n/2,-n/2,.1,1e3),this.camera.position.set(0,100,0),this.camera.lookAt(0,0,0),this.renderer=new Jl({antialias:!0,preserveDrawingBuffer:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),e.appendChild(this.renderer.domElement),this.labelRenderer=new K_,this.labelRenderer.setSize(e.clientWidth,e.clientHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.display="none",e.appendChild(this.labelRenderer.domElement);const s=new Y_(16777215,.8);this.scene.add(s);const r=new q_(16777215,.6);r.position.set(50,100,50),this.scene.add(r);const a=new Io(this.renderer),o=new Lc;o.background=new Ke(14739696),o.add(new W_(16777215,11184810,3)),this.scene.environment=a.fromScene(o).texture,a.dispose(),o.clear(),this.trackGroup=new _t,this.scene.add(this.trackGroup),this.trainGroup=new _t,this.scene.add(this.trainGroup),this.labelGroup=new _t,this.labelGroup.visible=!1,this.scene.add(this.labelGroup),this.sceneryGroup=new _t,this.scene.add(this.sceneryGroup),this.gridOverlayGroup=new _t,this.gridOverlayGroup.visible=!1,this.scene.add(this.gridOverlayGroup);const c=new hs(1e3,1e3),l=new An({color:4881465,roughness:.9,metalness:0}),h=new tt(c,l);h.rotation.x=-Math.PI/2,h.position.y=-.01,this.scene.add(h),this.raycaster=new Z_,this.mouse=new le,this.controls=new ev(this.camera,this.renderer.domElement),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.screenSpacePanning=!0,this.controls.minZoom=.1,this.controls.maxZoom=10,this.renderer.domElement.addEventListener("click",u=>this.onClick(u)),this.renderer.domElement.addEventListener("dblclick",u=>this.onDblClick(u)),window.addEventListener("resize",()=>this.onResize())}setSwitchClickCallback(e){this.onSwitchClick=e}setSemaphoreClickCallback(e){this.onSemaphoreClick=e}setDecouplerClickCallback(e){this.onDecouplerClick=e}setTrainDblClickCallback(e){this.onTrainDblClick=e}setGeneratorDblClickCallback(e){this.onGeneratorDblClick=e}onClick(e){const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.trackGroup.children,!0);for(const s of n){const r=s.object.userData;if(r&&r.isSwitchIndicator){this.onSwitchClick&&this.onSwitchClick(r.routeKey,r.connectionIndex);break}if(r&&r.isSemaphore){this.onSemaphoreClick&&this.onSemaphoreClick(r.pieceId);break}if(r&&r.isDecoupler){this.onDecouplerClick&&this.onDecouplerClick(r.pieceId);break}}}onDblClick(e){var n;if(!this.onTrainDblClick&&!this.onGeneratorDblClick)return;const t=this.renderer.domElement.getBoundingClientRect();if(this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera),this.onTrainDblClick){const s=this.raycaster.intersectObjects(this.trainGroup.children,!0);if(s.length>0){let r=s[0].object;for(;r;){if(r.name&&r.name.startsWith("train_")){this.onTrainDblClick(r.name);return}r=r.parent}}}if(this.onGeneratorDblClick){const s=this.raycaster.intersectObjects(this.trackGroup.children,!0);for(const r of s)if((n=r.object.userData)!=null&&n.isGenerator){this.onGeneratorDblClick(r.object.userData.pieceId);return}}}onResize(){const e=this.container.clientWidth,t=this.container.clientHeight,n=e/t;if(this.renderer.setSize(e,t),this.labelRenderer.setSize(e,t),this.layoutBounds){const s=this.layoutBounds.getSize(new L),r=s.x/s.z;let a,o;r>n?(a=s.x/.9,o=a/n):(o=s.z/.9,a=o*n),this.camera.left=-a/2,this.camera.right=a/2,this.camera.top=o/2,this.camera.bottom=-o/2}else this.camera.left=-100*n/2,this.camera.right=100*n/2,this.camera.top=100/2,this.camera.bottom=-100/2;this.camera.updateProjectionMatrix(),this.render()}render(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}clearLayout(){this.clearTrack(),this.clearScenery()}clearTrack(){const e=t=>{t instanceof tt&&(t.geometry.dispose(),t.material instanceof Un?t.material.dispose():Array.isArray(t.material)&&t.material.forEach(n=>n.dispose()));for(const n of t.children)e(n)};for(;this.trackGroup.children.length>0;){const t=this.trackGroup.children[0];this.trackGroup.remove(t),e(t)}for(;this.labelGroup.children.length>0;)this.labelGroup.remove(this.labelGroup.children[0])}clearScenery(){const e=t=>{t instanceof tt&&(t.geometry.dispose(),t.material instanceof Un?(t.material.map&&t.material.map.dispose(),t.material.dispose()):Array.isArray(t.material)&&t.material.forEach(n=>n.dispose()));for(const n of t.children)e(n)};for(;this.sceneryGroup.children.length>0;){const t=this.sceneryGroup.children[0];this.sceneryGroup.remove(t),e(t)}for(;this.gridOverlayGroup.children.length>0;){const t=this.gridOverlayGroup.children[0];this.gridOverlayGroup.remove(t),e(t)}}addSceneryGroup(e){this.sceneryGroup.add(e)}addGridOverlay(e){this.gridOverlayGroup.add(e)}addTrackGroup(e){this.trackGroup.add(e)}updateTrains(e){for(;this.trainGroup.children.length>0;)this.trainGroup.remove(this.trainGroup.children[0]);const t=[...e.children];for(const n of t)e.remove(n),this.trainGroup.add(n)}addLabel(e,t,n){const s=document.createElement("div");s.className="track-label",s.textContent=e,s.style.cssText=`
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
      color: #333;
      border: 1px solid #999;
      white-space: nowrap;
    `;const r=new j_(s);r.position.set(t,1,n),this.labelGroup.add(r)}setLabelsVisible(e){this.labelGroup.visible=e,this.gridOverlayGroup.visible=e,this.labelRenderer.domElement.style.display=e?"block":"none"}getLabelsVisible(){return this.labelGroup.visible}fitToLayout(){if(this.trackGroup.children.length===0)return;const e=new On().setFromObject(this.trackGroup);this.layoutBounds=e;const t=e.getCenter(new L),n=e.getSize(new L),s=this.container.clientWidth/this.container.clientHeight,r=n.x/n.z;let a,o;r>s?(a=n.x/.9,o=a/s):(o=n.z/.9,a=o*s),this.camera.left=-a/2,this.camera.right=a/2,this.camera.top=o/2,this.camera.bottom=-o/2,this.camera.zoom=1,this.camera.position.set(t.x,100,t.z),this.camera.lookAt(t.x,0,t.z),this.camera.updateProjectionMatrix(),this.controls.target.set(t.x,0,t.z),this.controls.update()}}function nl(i,e,t){return{x:i,y:e,z:t}}function j(i,e){return{x:i,y:0,z:e}}function Wn(i,e,t){const n=[],s=e*Math.PI/180;for(let r=0;r<t;r++){const o=r/(t-1)*s;n.push(j(i*Math.sin(o),i*(1-Math.cos(o))))}return n}function Ei(i,e,t){return Wn(i,e,t).map(s=>j(s.x,-s.z))}function lo(i){const e=i*Math.PI/180;return j(Math.cos(e),Math.sin(e))}function ho(i){const e=i*Math.PI/180;return j(Math.cos(e),-Math.sin(e))}const nv=[{code:"ph",aliases:["placeholder"],sections:[],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[]}]},{code:"str9",aliases:["str"],sections:[{splinePoints:[j(0,0),j(9,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(9,0),direction:j(1,0),sectionIndices:[0]}]},{code:"str6",aliases:[],sections:[{splinePoints:[j(0,0),j(6,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(6,0),direction:j(1,0),sectionIndices:[0]}]},{code:"str3",aliases:[],sections:[{splinePoints:[j(0,0),j(3,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(3,0),direction:j(1,0),sectionIndices:[0]}]},{code:"str15",aliases:[],sections:[{splinePoints:[j(0,0),j(1.5,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(1.5,0),direction:j(1,0),sectionIndices:[0]}]},{code:"crvl18",aliases:[],sections:[{splinePoints:Wn(18,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Wn(18,22.5,7)[6],direction:lo(22.5),sectionIndices:[0]}]},{code:"crvl22",aliases:["crvl","crv"],sections:[{splinePoints:Wn(22,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Wn(22,22.5,7)[6],direction:lo(22.5),sectionIndices:[0]}]},{code:"crvl24",aliases:[],sections:[{splinePoints:Wn(24,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Wn(24,22.5,7)[6],direction:lo(22.5),sectionIndices:[0]}]},{code:"crvr18",aliases:[],sections:[{splinePoints:Ei(18,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Ei(18,22.5,7)[6],direction:ho(22.5),sectionIndices:[0]}]},{code:"crvr22",aliases:["crvr"],sections:[{splinePoints:Ei(22,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Ei(22,22.5,7)[6],direction:ho(22.5),sectionIndices:[0]}]},{code:"crvr24",aliases:[],sections:[{splinePoints:Ei(24,22.5,7)}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:Ei(24,22.5,7)[6],direction:ho(22.5),sectionIndices:[0]}]},{code:"bump",aliases:["bumper"],sections:[{splinePoints:[j(0,0),j(3,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]}]},{code:"gen",aliases:["generator"],sections:[{splinePoints:[j(-50,0),j(0,0)]}],connectionPoints:[{name:"in",position:j(-50,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[0]}]},{code:"bin",aliases:[],sections:[],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[]}]},{code:"tun",aliases:["tunnel"],sections:[],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[]}]},{code:"sem",aliases:["semaphore"],sections:[],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[]}]},{code:"dec",aliases:["decoupler"],sections:[],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[]},{name:"out",position:j(0,0),direction:j(1,0),sectionIndices:[]}]},{code:"x90",aliases:[],sections:[{splinePoints:[j(-3,0),j(3,0)]},{splinePoints:[j(0,-3),j(0,3)]}],connectionPoints:[{name:"in1",position:j(-3,0),direction:j(-1,0),sectionIndices:[0]},{name:"out1",position:j(3,0),direction:j(1,0),sectionIndices:[0]},{name:"in2",position:j(0,-3),direction:j(0,-1),sectionIndices:[1]},{name:"out2",position:j(0,3),direction:j(0,1),sectionIndices:[1]}]},{code:"x45",aliases:[],sections:[{splinePoints:[j(-3,0),j(3,0)]},{splinePoints:[j(-2.12,-2.12),j(2.12,2.12)]}],connectionPoints:[{name:"in1",position:j(-3,0),direction:j(-1,0),sectionIndices:[0]},{name:"out1",position:j(3,0),direction:j(1,0),sectionIndices:[0]},{name:"in2",position:j(-2.12,-2.12),direction:j(-.707,-.707),sectionIndices:[1]},{name:"out2",position:j(2.12,2.12),direction:j(.707,.707),sectionIndices:[1]}]}],hh=new Map,uh=new Map;for(const i of nv){hh.set(i.code,i);for(const e of i.aliases)uh.set(e,i)}const dh=new Map;function Zt(i){dh.set(i.code.toLowerCase(),i)}function nt(i){const e=i.toLowerCase(),t=dh.get(e);if(t)return t;const n=hh.get(e)||uh.get(e);if(!n)throw new Error(`Unknown track archetype: ${i}`);return n}const iv=[2972190,3368482,3828522],sv=3832767;let uo=null,fo=null;function rv(){return uo||(uo=iv.map(i=>new $t({color:i,side:Pt}))),uo}function ov(){return fo||(fo=new $t({color:sv,side:Pt})),fo}let po=null;function fh(){return po||(po=new us(1,12)),po}const av=8,il=.3,Ys=.1,sl=2,cv=3,lv=20,hv=3;function uv(i,e){var _,p,m,x,v,S,C;const t=!!e.treesEnabled,n=!!e.pondEnabled;if(!t&&!n)return;const s=(_=e.gridSize)!=null?_:av,r=rl(e.pieces);if(!r)return;const a=r.maxX-r.minX,o=r.maxZ-r.minZ,c=a*il,l=o*il;r.minX-=c,r.maxX+=c,r.minZ-=l,r.maxZ+=l;const h=Math.max(1,Math.ceil((r.maxX-r.minX)/s)),u=Math.max(1,Math.ceil((r.maxZ-r.minZ)/s)),d=[];for(let w=0;w<u;w++)d[w]=new Array(h).fill(-1);if(dv(d,r,e.pieces,h,u,s),ph(d,h,u),n){const w=(p=e.pondSize)!=null?p:lv,A=(m=e.pondClearance)!=null?m:hv,N=rl(e.pieces),E=N.maxX-N.minX,b=N.maxZ-N.minZ,F={minX:N.minX-E*Ys,maxX:N.maxX+E*Ys,minZ:N.minZ-b*Ys,maxZ:N.maxZ+b*Ys},{group:$,pondCells:ee,minOriginalScore:P}=pv(d,r,F,h,u,w,A,s);i.addSceneryGroup($);const U=(x=e.pondScore)!=null?x:Math.max(0,P-1);gv(d,h,u,ee,U)}const f=(v=e.treesClearance)!=null?v:sl,g=mv(d,r,h,u,f,s);if(i.addGridOverlay(g),t){const w=(S=e.treesClearance)!=null?S:sl,A=(C=e.treesDensity)!=null?C:cv,N=e.treesFactor,E=fv(d,r,h,u,w,A,N,s);i.addSceneryGroup(E)}}function rl(i){if(i.length===0)return null;let e=1/0,t=-1/0,n=1/0,s=-1/0;for(const r of i){const a=nt(r.archetypeCode);if(!a)continue;const o=Math.cos(r.rotation),c=Math.sin(r.rotation),l=h=>({x:r.position.x+(h.x*o-h.z*c),z:-(r.position.z+(h.x*c+h.z*o))});for(const h of a.connectionPoints){const u=l(h.position);e=Math.min(e,u.x),t=Math.max(t,u.x),n=Math.min(n,u.z),s=Math.max(s,u.z)}for(const h of a.sections)for(const u of h.splinePoints){const d=l(u);e=Math.min(e,d.x),t=Math.max(t,d.x),n=Math.min(n,d.z),s=Math.max(s,d.z)}}return isFinite(e)?{minX:e,maxX:t,minZ:n,maxZ:s}:null}function ol(i,e,t,n,s,r){const a=Math.floor((i-t.minX)/r),o=Math.floor((e-t.minZ)/r);return a<0||a>=n||o<0||o>=s?null:{col:a,row:o}}function dv(i,e,t,n,s,r){for(const a of t){if(a.inTunnel)continue;const o=nt(a.archetypeCode);if(!o)continue;const c=o.code;if(c==="gen"||c==="bin")continue;const l=Math.cos(a.rotation),h=Math.sin(a.rotation),u=d=>new L(a.position.x+(d.x*l-d.z*h),d.y,-(a.position.z+(d.x*h+d.z*l)));for(const d of o.sections){if(d.splinePoints.length<2)continue;const f=d.splinePoints.map(m=>u(m)),g=new In(f),_=g.getLength(),p=Math.max(2,Math.ceil(_));for(let m=0;m<=p;m++){const x=m/p,v=g.getPointAt(x),S=ol(v.x,v.z,e,n,s,r);S&&(i[S.row][S.col]=0)}}for(const d of o.connectionPoints){const f=u(d.position),g=ol(f.x,f.z,e,n,s,r);g&&(i[g.row][g.col]=0)}}}function ph(i,e,t){const n=new Map;for(let c=0;c<t;c++)for(let l=0;l<e;l++){const h=i[c][l];h>=0&&(n.has(h)||n.set(h,[]),n.get(h).push([c,l]))}const s=[],r=[...n.keys()].sort((c,l)=>c-l);for(const c of r)s.push(...n.get(c));const a=[[-1,0],[1,0],[0,-1],[0,1]];let o=0;for(;o<s.length;){const[c,l]=s[o++],h=i[c][l];for(const[u,d]of a){const f=c+u,g=l+d;f>=0&&f<t&&g>=0&&g<e&&i[f][g]===-1&&(i[f][g]=h+1,s.push([f,g]))}}}function fv(i,e,t,n,s,r,a,o){const c=new _t,l=rv(),h=fh();let u=12345;const d=()=>(u=(u*16807+0)%2147483647,(u-1)/2147483646),f=[];for(let m=0;m<n;m++)for(let x=0;x<t;x++){const v=i[m][x];if(v<s)continue;let S;a!==void 0?S=Math.floor(a*v):S=Math.min(r,v-s+1);for(let C=0;C<S;C++){const w=e.minX+(x+d())*o,A=e.minZ+(m+d())*o,N=3+Math.floor(d()*3);for(let E=0;E<N;E++){const b=Math.floor(d()*l.length),F=1+d()*2,$=(d()-.5)*2,ee=(d()-.5)*2;f.push({x:w+$,z:A+ee,radius:F,materialIndex:b})}}}if(f.length===0)return c;const g=l.map(()=>[]);for(const m of f)g[m.materialIndex].push(m);const _=new _n().setFromEuler(new Fi(-Math.PI/2,0,0)),p=new st;for(let m=0;m<l.length;m++){const x=g[m];if(x.length===0)continue;const v=new Ql(h,l[m],x.length);v.frustumCulled=!1;for(let S=0;S<x.length;S++){const{x:C,z:w,radius:A}=x[S];p.compose(new L(C,.005,w),_,new L(A,A,A)),v.setMatrixAt(S,p)}v.instanceMatrix.needsUpdate=!0,c.add(v)}return c}function pv(i,e,t,n,s,r,a,o){const c=new _t,l=new Set,h=()=>Math.random(),u=[];for(let U=0;U<s;U++)for(let O=0;O<n;O++)if(i[U][O]>=a){const X=e.minX+(O+.5)*o,q=e.minZ+(U+.5)*o;X>=t.minX&&X<=t.maxX&&q>=t.minZ&&q<=t.maxZ&&u.push([U,O])}if(u.length===0)return{group:c,pondCells:l,minOriginalScore:0};const d=Math.floor(h()*u.length),[f,g]=u[d],_=new Set,p=[],m=new Set,x=[[-1,0],[1,0],[0,-1],[0,1]];let v=f,S=f,C=g,w=g,A=1/0;const N=(U,O)=>{const X=`${U},${O}`;_.add(X),l.add(X),A=Math.min(A,i[U][O]),v=Math.min(v,U),S=Math.max(S,U),C=Math.min(C,O),w=Math.max(w,O);for(const[q,K]of x){const Z=U+q,te=O+K,ae=`${Z},${te}`;Z>=0&&Z<s&&te>=0&&te<n&&i[Z][te]>=a&&!_.has(ae)&&!m.has(ae)&&(p.push([Z,te]),m.add(ae))}};for(N(f,g);_.size<r&&p.length>0;){const U=Math.floor(h()*p.length),[O,X]=p[U];if(p[U]=p[p.length-1],p.pop(),m.delete(`${O},${X}`),_.has(`${O},${X}`))continue;const q=Math.min(v,O),K=Math.max(S,O),Z=Math.min(C,X),te=Math.max(w,X),ae=K-q+1,ne=(te-Z+1)/ae;ne<.5||ne>2||N(O,X)}if(_.size===0)return{group:c,pondCells:l,minOriginalScore:0};const E=ov(),b=fh(),F=[];for(const U of _){const[O,X]=U.split(",").map(Number),q=e.minX+(X+.5)*o,K=e.minZ+(O+.5)*o;F.push({x:q,z:K,radius:o*1.1});for(const[Z,te]of[[0,1],[1,0]]){const ae=`${O+Z},${X+te}`;_.has(ae)&&F.push({x:q+te*o*.5,z:K+Z*o*.5,radius:o*.9})}for(const[Z,te]of x){const ae=`${O+Z},${X+te}`;if(!_.has(ae))for(let V=0;V<3;V++){const ne=(V-1)*o*.3,_e=(h()-.5)*o*.15,Te=te===0?ne+_e:0,Se=Z===0?ne+_e:0;F.push({x:q+te*o*.3+Te,z:K+Z*o*.3+Se,radius:o*(.5+h()*.25)})}}}if(F.length===0)return{group:c,pondCells:l,minOriginalScore:A};const $=new _n().setFromEuler(new Fi(-Math.PI/2,0,0)),ee=new st,P=new Ql(b,E,F.length);P.frustumCulled=!1;for(let U=0;U<F.length;U++){const{x:O,z:X,radius:q}=F[U];ee.compose(new L(O,.003,X),$,new L(q,q,q)),P.setMatrixAt(U,ee)}return P.instanceMatrix.needsUpdate=!0,c.add(P),{group:c,pondCells:l,minOriginalScore:A}}function mv(i,e,t,n,s,r){const a=new _t,o=32,c=4096,l=t*o,h=n*o,u=Math.min(1,c/Math.max(l,h)),d=Math.ceil(l*u),f=Math.ceil(h*u),g=d/t,_=document.createElement("canvas");_.width=d,_.height=f;const p=_.getContext("2d");p.clearRect(0,0,d,f);let m=0;for(let N=0;N<n;N++)for(let E=0;E<t;E++)i[N][E]>m&&(m=i[N][E]);for(let N=0;N<n;N++)for(let E=0;E<t;E++){const b=i[N][E];if(b<0)continue;const F=E*g,$=N*g;if(b===0)p.fillStyle="rgba(120, 120, 120, 0.5)";else if(b<s)p.fillStyle="rgba(200, 180, 50, 0.4)";else{const ee=Math.min((b-s)/Math.max(m-s,1),1),P=Math.floor(60-ee*40),U=Math.floor(120+ee*100),O=Math.floor(60-ee*30);p.fillStyle=`rgba(${P}, ${U}, ${O}, 0.4)`}if(p.fillRect(F,$,g,g),p.strokeStyle="rgba(0, 0, 0, 0.3)",p.lineWidth=Math.max(.5,g*.03),p.strokeRect(F+.5,$+.5,g-1,g-1),g>=12){const ee=Math.max(8,Math.floor(g*.55));p.fillStyle="rgba(0, 0, 0, 0.7)",p.font=`bold ${ee}px monospace`,p.textAlign="center",p.textBaseline="middle",p.fillText(String(b),F+g/2,$+g/2)}}const x=new d_(_);x.generateMipmaps=!1,x.minFilter=Ut,x.magFilter=Ut;const v=t*r,S=n*r,C=new hs(v,S),w=new $t({map:x,transparent:!0,depthWrite:!1,side:Pt}),A=new tt(C,w);return A.rotation.x=-Math.PI/2,A.position.set(e.minX+v/2,.008,e.minZ+S/2),a.add(A),a}function gv(i,e,t,n,s){if(n.size!==0){for(const r of n){const[a,o]=r.split(",").map(Number);i[a][o]=s}for(let r=0;r<t;r++)for(let a=0;a<e;a++){const o=`${r},${a}`;i[r][a]===0||n.has(o)||(i[r][a]=-1)}ph(i,e,t)}}var nn=(i=>(i[i.DEBUG=0]="DEBUG",i[i.INFO=1]="INFO",i[i.WARNING=2]="WARNING",i[i.ERROR=3]="ERROR",i))(nn||{});let Ki=2;function mh(i){Ki=i}const Y={debug(i,...e){Ki<=0&&console.log(`[DEBUG] ${i}`,...e)},info(i,...e){Ki<=1&&console.log(`[INFO] ${i}`,...e)},warn(i,...e){Ki<=2&&console.warn(`[WARN] ${i}`,...e)},error(i,...e){Ki<=3&&console.error(`[ERROR] ${i}`,...e)}},_v=12632264,vv=3022872,xv=5921362,Sv=5912624,gh=16777215,Mv=16711680,Ev=2271778,yv=13378082,bv=4473924,Tv=4868682,wv=65280,Av=16711680,_h=65280,vh=16711680,Cv=3355443,xh=16746496,Sh=16711680,Rv=1.045,mo=.08,Pv=1.45,go=.15,Lv=.25,Iv=1,Dv=2,Nv=2.64,Zs=.1,Ri=new Map,jo=new Map,Ko=new Map,Jo=new Map;function Uv(i){Ri.has(i)||Ri.set(i,0);const e=Ri.get(i);return Y.debug(`getSelectedRouteByKey: key="${i}" → ${e}`),e}function Mh(i,e){const t=Ri.get(i);Y.debug(`setSelectedRouteByKey: key="${i}" ${t} → ${e}`),Ri.set(i,e)}function Ov(){return Ri}function Fv(i,e){for(const[t,n]of jo)if(n.visible=e,e){const s=n.material,r=i.has(t);s.color.setHex(r?Mv:gh)}}function zv(i,e){const t=Ko.get(i);t&&t.dot.material.color.setHex(e?vh:_h)}function al(i,e){const t=Jo.get(i);if(t)for(const n of t)n.material.color.setHex(e?Sh:xh)}function ki(i,e,t=!1){var r;t?i.clearTrack():i.clearLayout(),jo.clear(),Ko.clear(),Jo.clear();const n=new Map;for(const a of e.pieces)n.set(a.id,a);const s=(r=e.randomSwitches)!=null?r:!1;for(const a of e.pieces){const o=nt(a.archetypeCode),c=Bv(a,o,n,s);if(i.addTrackGroup(c),a.label){const l=Xv(a,o),h=2,u=Math.cos(a.rotation+Math.PI/2)*h,d=-Math.sin(a.rotation+Math.PI/2)*h;i.addLabel(a.label,l.x+u,l.z+d)}}t||uv(i,e),i.fitToLayout(),i.render()}function Bv(i,e,t,n=!1){var h,u,d,f;const s=new _t,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=g=>new L(i.position.x+(g.x*r-g.z*a),g.y,-(i.position.z+(g.x*a+g.z*r))),l=e.code==="gen"||e.code==="bin"||i.inTunnel;if(!l){for(const g of e.sections)if(g.splinePoints.length>=2){const _=g.splinePoints.map(m=>o(m)),p=kv(_);s.add(p)}}if(!l){for(const g of e.connectionPoints){const _=o({x:g.position.x,y:0,z:g.position.z}),p=`${i.id}.${g.name}`,m=i.connections.get(g.name)||[],x=ll(_,p);if(s.add(x),Y.debug(`  ${i.id}.${g.name}: ${m.length} connections`),m.length>1&&!n){const v=Qv(i,g.name,_,m,t);for(const S of v)s.add(S)}}if(i.internalConnectionPoints)for(const g of i.internalConnectionPoints){const _=new L(g.worldPosition.x,0,-g.worldPosition.z),p=ll(_,g.id);s.add(p),Y.debug(`  Internal connection point ${g.id} at (${g.worldPosition.x.toFixed(1)}, ${g.worldPosition.z.toFixed(1)})`)}}if(e.code==="gen"){const g=o({x:0,y:0,z:0}),_=Gv(g);_.userData={isGenerator:!0,pieceId:i.id},s.add(_)}else if(e.code==="bin"){const g=o({x:0,y:0,z:0}),_=Hv(g);s.add(_)}else if(e.code==="bump"||e.code==="bumper"){const g=qv(i,e,o);s.add(g)}else if(e.code==="tun"||e.code==="tunnel"){const g=$v(i);for(const _ of g)s.add(_)}else if(e.code==="sem"||e.code==="semaphore"){const g=o({x:0,y:0,z:0}),_=(u=(h=i.semaphoreConfig)==null?void 0:h.locked)!=null?u:!1,p=Vv(g,i.id,_);s.add(p)}else if(e.code==="dec"||e.code==="decoupler"){const g=o({x:0,y:0,z:0}),_=(f=(d=i.decouplerConfig)==null?void 0:d.activated)!=null?f:!1,p=Wv(g,i.id,i.rotation,_);s.add(p)}return s}function kv(i){const e=new _t,t=new In(i),n=t.getLength(),s=Math.max(16,i.length*8),r=new An({color:_v,roughness:.2,metalness:.85,envMapIntensity:1}),a=new An({color:vv,roughness:.9,metalness:0}),o=new An({color:xv,roughness:1,metalness:0}),c=new An({color:Sv,roughness:.9,metalness:0}),l=cl(t,s,Nv,Zs),h=new tt(l,c);h.position.y=.01,e.add(h);const u=cl(t,s,Dv,.08),d=new tt(u,o);d.position.y=Zs+.02,e.add(d);const f=new ii(Lv,go,Pv),g=Math.floor(n/Iv);for(let b=0;b<=g;b++){const F=b/Math.max(g,1),$=t.getPointAt(F),ee=t.getTangentAt(F),P=new tt(f,a);P.position.set($.x,Zs+.08+go/2,$.z);const U=Math.atan2(-ee.z,ee.x);P.rotation.y=U,e.add(P)}const _=Rv/2,p=[],m=[],x=s;for(let b=0;b<=x;b++){const F=b/x,$=t.getPointAt(F),ee=t.getTangentAt(F),P=-ee.z,U=ee.x;p.push(new L($.x+P*_,$.y,$.z+U*_)),m.push(new L($.x-P*_,$.y,$.z-U*_))}const v=new In(p),S=new In(m),C=new ur(v,s,mo,6,!1),w=new ur(S,s,mo,6,!1),A=new tt(C,r),N=new tt(w,r),E=Zs+.08+go+mo;return A.position.y=E,N.position.y=E,e.add(A),e.add(N),e}function cl(i,e,t,n){const s=t/2,r=[],a=[];for(let c=0;c<=e;c++){const l=c/e,h=i.getPointAt(l),u=i.getTangentAt(l),d=-u.z,f=u.x;r.push(h.x+d*s,0,h.z+f*s),r.push(h.x-d*s,0,h.z-f*s),r.push(h.x-d*s,n,h.z-f*s),r.push(h.x+d*s,n,h.z+f*s)}for(let c=0;c<e;c++){const l=c*4;a.push(l+3,l+2,l+6),a.push(l+3,l+6,l+7),a.push(l+0,l+3,l+7),a.push(l+0,l+7,l+4),a.push(l+2,l+1,l+5),a.push(l+2,l+5,l+6),a.push(l+0,l+4,l+5),a.push(l+0,l+5,l+1)}const o=new Lt;return o.setAttribute("position",new rt(r,3)),o.setIndex(a),o.computeVertexNormals(),o}function ll(i,e){const t=new fs(.25,16,16),n=new $t({color:gh}),s=new tt(t,n);return s.position.set(i.x,.5,i.z),s.visible=!1,jo.set(e,s),s}function Gv(i){const e=new us(1.5,32),t=new $t({color:Ev,side:Pt}),n=new tt(e,t);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.6,i.z),n}function Hv(i){const e=new us(1.5,32),t=new $t({color:yv,side:Pt}),n=new tt(e,t);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.5,i.z),n}function Vv(i,e,t){const n=new _t,s=new qo(1.3,1.5,32),r=new $t({color:Cv,side:Pt}),a=new tt(s,r);a.rotation.x=-Math.PI/2,a.position.set(i.x,.55,i.z),n.add(a);const o=new fs(.6,16,16),c=t?vh:_h,l=new $t({color:c}),h=new tt(o,l);return h.position.set(i.x,.7,i.z),h.userData={isSemaphore:!0,pieceId:e},n.add(h),Ko.set(e,{dot:h,ring:a}),n}function Wv(i,e,t,n){const s=new _t,r=n?Sh:xh,a=1.13,o=1.5,c=-Math.sin(-t),l=-Math.cos(-t),h=new Bi;h.moveTo(0,a),h.lineTo(-a*.7,-a*.5),h.lineTo(a*.7,-a*.5),h.lineTo(0,a);const u=new Yo(h),d=new $t({color:r,side:Pt}),f=new tt(u,d.clone());f.rotation.x=-Math.PI/2,f.rotation.z=-t,f.position.set(i.x+c*o,.6,i.z+l*o),f.userData={isDecoupler:!0,pieceId:e},s.add(f);const g=new tt(u,d.clone());return g.rotation.x=-Math.PI/2,g.rotation.z=Math.PI-t,g.position.set(i.x-c*o,.6,i.z-l*o),g.userData={isDecoupler:!0,pieceId:e},s.add(g),Jo.set(e,[f,g]),s}function $v(i){const e=[],a=new An({color:Tv,roughness:.7,metalness:.2}),c=(()=>{const u=new Bi,d=4.2/2,f=.3;u.moveTo(-d,0),u.lineTo(-d,.8),u.lineTo(-d+f,.8),u.lineTo(-d+f,f),u.lineTo(d-f,f),u.lineTo(d-f,.8),u.lineTo(d,.8),u.lineTo(d,0),u.lineTo(-d,0);const g={depth:1.5,bevelEnabled:!1};return new ds(u,g)})(),l=new tt(c,a);l.rotation.order="YXZ",l.rotation.y=Math.PI/2,l.rotation.x=-Math.PI/2,l.rotation.z=Math.PI+i.rotation,l.position.set(i.position.x,0,-i.position.z),e.push(l);const h=new tt(c,a);return h.rotation.order="YXZ",h.rotation.y=Math.PI/2,h.rotation.x=-Math.PI/2,h.rotation.z=i.rotation,h.position.set(i.position.x,0,-i.position.z),e.push(h),e}function Xv(i,e){const t=Math.cos(i.rotation),n=Math.sin(i.rotation),s=o=>({x:i.position.x+(o.x*t-o.z*n),z:-(i.position.z+(o.x*n+o.z*t))}),r=e.connectionPoints.find(o=>o.name==="in"),a=e.connectionPoints.find(o=>o.name==="out");if(r&&a){const o=s(r.position),c=s(a.position);return{x:(o.x+c.x)/2,z:(o.z+c.z)/2}}if(e.sections.length>0&&e.sections[0].splinePoints.length>0){const o=e.sections[0].splinePoints,c=Math.floor(o.length/2);return s(o[c])}return{x:i.position.x,z:-i.position.z}}function qv(i,e,t){const n=e.sections[0];let s,r=i.rotation;if(!n||n.splinePoints.length<2)s=t({x:0,y:0,z:0});else{const l=n.splinePoints[n.splinePoints.length-1];s=t(l);const h=n.splinePoints[n.splinePoints.length-2],u=n.splinePoints[n.splinePoints.length-1],d={x:u.x-h.x,z:u.z-h.z},f=Math.cos(i.rotation),g=Math.sin(i.rotation),_={x:d.x*f-d.z*g,z:-(d.x*g+d.z*f)};r=Math.atan2(_.z,_.x)}const a=new ii(.5,1,2),o=new An({color:bv}),c=new tt(a,o);return c.position.set(s.x,.5,s.z),c.rotation.y=r,c}const Yv=30,Zv=.4,jv=1,Kv=.75;function Jv(i){return i==="in"||i==="in1"||i==="in2"}function Qv(i,e,t,n,s){const r=[];if(n.length>1){const a=Jv(e)?"bwd":"fwd",o=ex(i,e,a,n,s,n);r.push(...o)}return r}function ex(i,e,t,n,s,r){const a=[],o=r.map(g=>`${g.pieceId}.${g.pointName}`);o.push(`${i.id}.${e}`),o.sort();const l=`junction.${o[0]}.${t}`,h=Uv(l);Y.debug(`renderSwitchIndicators: ${l}, ${n.length} connections, selectedIndex=${h}`),n.forEach((g,_)=>Y.debug(`  route[${_}]: ${g.pieceId}.${g.pointName} ${g.isAutoConnect?"(auto)":""}`));const u=[];for(const g of n){const _=tx(g,s);u.push(_)}const d=u.map(g=>{if(!g)return null;const _=sx(g);return nx(g,_)});if(d.filter(g=>g!==null).length<=1)return a;for(let g=0;g<n.length;g++){const _=d[g];if(Y.debug(`  Indicator ${g}: pos=${_?`(${_.x.toFixed(2)}, ${_.z.toFixed(2)})`:"null"}, curveInfo=${u[g]?"valid":"null"}`),!_)continue;const p=g===h,m=p?wv:Av,x=new fs(.6,16,16),v=new $t({color:m}),S=new tt(x,v);S.position.set(_.x,.7,_.z),S.userData={isSwitchIndicator:!0,routeKey:l,connectionIndex:g},Y.debug(`  Created indicator ${g} at (${_.x.toFixed(2)}, 0.7, ${_.z.toFixed(2)}), selected=${p}, color=${p?"green":"red"}`),a.push(S)}return a}function hl(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function tx(i,e){const t=e.get(i.pieceId);if(!t)return null;const n=nt(t.archetypeCode);if(!n||n.sections.length===0)return null;const s=n.sections[0];if(s.splinePoints.length<2)return null;const r=Math.cos(t.rotation),a=Math.sin(t.rotation),o=p=>new L(t.position.x+(p.x*r-p.z*a),p.y,-(t.position.z+(p.x*a+p.z*r))),c=s.splinePoints.map(p=>o(p)),l=new In(c),h=l.getLength();if(h===0)return null;const u=i.pointName==="in"||i.pointName==="in1",d=hl(i.pointName),f=t.connections.get(d)||[],g=f.length>1;let _=!1;if(f.length===1){const p=f[0],m=e.get(p.pieceId);if(m){const x=hl(p.pointName),v=m.connections.get(x)||[];if(v.length>1)_=!0;else if(v.length===1){const S=v[0],C=e.get(S.pieceId);C&&(_=(C.connections.get(S.pointName)||[]).length>1)}}}return{curve:l,curveLength:h,isFromIn:u,farEndHasSwitch:g,farEndNextTrackHasSwitch:_}}function nx(i,e){const t=i.isFromIn?Math.min(e/i.curveLength,1):Math.max(1-e/i.curveLength,0),n=i.curve.getPointAt(t);return{x:n.x,z:n.z}}function ix(i){return i.farEndHasSwitch?Zv:i.farEndNextTrackHasSwitch?Kv:jv}function sx(i){const e=ix(i);return Math.min(i.curveLength*e,Yv)}const er=4,tr=3,_o=.5;function Cn(i,e){const t=nt(i.archetypeCode);if(!t||e>=t.sections.length)return 0;const n=t.sections[e];if(n.splinePoints.length<2)return 0;const s=Eh(n.splinePoints,i);return new In(s).getLength()}function Eh(i,e){const t=Math.cos(e.rotation),n=Math.sin(e.rotation);return i.map(s=>new L(e.position.x+(s.x*t-s.z*n),s.y,e.position.z+(s.x*n+s.z*t)))}function rx(i,e,t){const n=nt(i.archetypeCode);if(!n||e>=n.sections.length)return null;const s=n.sections[e];if(s.splinePoints.length<2)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const r=Eh(s.splinePoints,i),a=new In(r),o=a.getLength();if(o===0)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const c=Math.max(0,Math.min(1,t/o)),l=a.getPointAt(c),h=a.getTangentAt(c),u=Math.atan2(h.z,h.x);return{position:{x:l.x,y:0,z:l.z},rotation:u}}function Fo(i,e){const t=e.pieces.find(r=>r.id===i.currentPieceId);if(!t)return;const n=Ji(i.entryPoint),s=rx(t,n,i.distanceAlongSection);s&&(i.worldPosition=s.position,i.rotation=s.rotation+(i.sectionDirection===-1?Math.PI:0))}function ti(i){return i==="in"||i==="in1"||i==="in2"}function dr(i){return i==="out"||i==="out1"||i==="out2"}function Ji(i){return i&&(i==="in2"||i==="out2")?1:0}function vo(i,e){return dr(i)&&dr(e)||ti(i)&&ti(e)}function nr(i,e,t,n,s,r,a,o){var x;const c=t.pieces.find(v=>v.id===i);if(!c)return null;const l=c.connections.get(e);if(!l||l.length===0)return null;const h=l.filter(v=>v.pieceId!==r);if(h.length===0)return null;if(h.length===1)return{pieceId:h[0].pieceId,entryPoint:h[0].pointName};const u=h,d=a==="backward"?"bwd":"fwd",f=l.map(v=>`${v.pieceId}.${v.pointName}`);f.push(`${i}.${e}`),f.sort();const _=`junction.${f[0]}.${d}`;let p;s!=null&&s.has(_)?(p=s.get(_),o&&o.add(_)):(t.randomSwitches?p=Math.floor(Math.random()*u.length):p=(x=n.get(_))!=null?x:0,s&&s.set(_,p));const m=u[Math.min(p,u.length-1)];return{pieceId:m.pieceId,entryPoint:m.pointName}}function Qo(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function ox(i,e,t,n,s,r){i.distanceAlongSection+=e*i.sectionDirection;let a=t.pieces.find(h=>h.id===i.currentPieceId);if(!a)return;let o=Ji(i.entryPoint),c=Cn(a,o),l=0;for(;c===0&&l<10;){l++;let h,u;i.entryPoint?(h=Qo(i.entryPoint),u=ti(i.entryPoint)?"forward":"backward"):(h=i.distanceAlongSection>=0?"out":"in",u="forward");const d=nr(i.currentPieceId,h,t,n,s,i.previousPieceId,u,r);if(!d){i.distanceAlongSection=0,Fo(i,t);return}if(vo(h,d.entryPoint)&&(i.sectionDirection=i.sectionDirection===1?-1:1),i.previousPieceId=i.currentPieceId,i.currentPieceId=d.pieceId,i.entryPoint=d.entryPoint,a=t.pieces.find(f=>f.id===i.currentPieceId),!a)return;o=Ji(i.entryPoint),c=Cn(a,o)}for(;i.distanceAlongSection>=c&&c>0;){const h=i.distanceAlongSection-c,u="out",d=nr(i.currentPieceId,u,t,n,s,i.previousPieceId,"forward",r);if(!d){i.distanceAlongSection=c;return}vo(u,d.entryPoint)&&(i.sectionDirection=i.sectionDirection===1?-1:1),i.previousPieceId=i.currentPieceId,i.currentPieceId=d.pieceId,i.entryPoint=d.entryPoint;const f=t.pieces.find(g=>g.id===d.pieceId);if(f){const g=Ji(d.entryPoint),_=Cn(f,g);dr(d.entryPoint)?i.distanceAlongSection=_-h:i.distanceAlongSection=h,c=_}else{i.distanceAlongSection=h;break}}for(;i.distanceAlongSection<0&&c>0;){const h="in",u=nr(i.currentPieceId,h,t,n,s,i.previousPieceId,"backward",r);if(!u){i.distanceAlongSection=0;break}const d=t.pieces.find(f=>f.id===u.pieceId);if(d){const f=Ji(u.entryPoint),g=Cn(d,f);if(g===0){i.distanceAlongSection=0;break}vo(h,u.entryPoint)&&(i.sectionDirection=i.sectionDirection===1?-1:1);const _=-i.distanceAlongSection;i.previousPieceId=i.currentPieceId,i.currentPieceId=u.pieceId,i.entryPoint=u.entryPoint,ti(u.entryPoint)?i.distanceAlongSection=_:i.distanceAlongSection=g-_,c=g}else break}Fo(i,t)}const yh=2,fr=1.5,ax=16776960,bh=[16711680,255,65280,16711935,16776960],cx=[3158064,5263440,7368816,9474192,11579568];let Qi=null;function lx(i="gray"){if(i==="black")return 0;const e=i==="colorful"?bh:cx,t=e.map((r,a)=>Qi!==null&&a===Qi?2:1),n=t.reduce((r,a)=>r+a,0);let s=Math.random()*n;for(let r=0;r<t.length;r++)if(s-=t[r],s<=0)return Qi=r,e[r];return Qi=0,e[0]}function hx(){Qi=null}function ux(){const i=er/2,e=yh/2,t=.25,n=.15,s=i*.35,r=e*.35,a=.15,o=new Bi;return o.moveTo(-i+t,-e),o.quadraticCurveTo(-i,-e,-i,-e+t),o.lineTo(-i,e-t),o.quadraticCurveTo(-i,e,-i+t,e),o.lineTo(s,e),o.lineTo(i-a,r+n),o.quadraticCurveTo(i-a+n*.5,r,i,r),o.lineTo(i,-r),o.quadraticCurveTo(i-a+n*.5,-r,i-a,-r-n),o.lineTo(s,-e),o.lineTo(-i+t,-e),o}function dx(){const i=tr/2,e=yh/2,t=.2,n=new Bi;return n.moveTo(-i+t,-e),n.quadraticCurveTo(-i,-e,-i,-e+t),n.lineTo(-i,e-t),n.quadraticCurveTo(-i,e,-i+t,e),n.lineTo(i-t,e),n.quadraticCurveTo(i,e,i,e-t),n.lineTo(i,-e+t),n.quadraticCurveTo(i,-e,i-t,-e),n.lineTo(-i+t,-e),n}let Zi=null,ji=null,xo=null,So=null;const ul=new Map;let Mo=null;function Th(){if(!Zi){const i=ux();Zi=new ds(i,{depth:fr,bevelEnabled:!1}),Zi.rotateX(-Math.PI/2),Zi.translate(0,fr/2,0)}return Zi}function wh(){if(!ji){const i=dx();ji=new ds(i,{depth:fr,bevelEnabled:!1}),ji.rotateX(-Math.PI/2),ji.translate(0,fr/2,0)}return ji}function fx(){return xo||(xo=new oh(Th(),15)),xo}function px(){return So||(So=new oh(wh(),15)),So}function mx(i){let e=ul.get(i);return e||(e=new An({color:i,roughness:.5,metalness:.1}),ul.set(i,e)),e}function gx(){return Mo||(Mo=new eh({color:0,linewidth:1})),Mo}function _x(i){const e=new _t;for(const t of i){const n=vx(t);e.add(n)}return e}function vx(i){const e=new _t;e.name=i.id;for(const t of i.cars){const n=xx(t);e.add(n)}return e}function xx(i){var d;const e=i.type==="cab",t=e?Th():wh(),n=e?fx():px(),s=e?ax:(d=i.color)!=null?d:bh[0],r=mx(s),a=new tt(t,r),o=new u_(n,gx()),c=new _t;c.name=i.id,c.add(a),c.add(o);const l=i.worldPosition.x,h=-i.worldPosition.z,u=i.rotation;return Number.isNaN(l)||Number.isNaN(h)||Number.isNaN(u)?(Y.error(`NaN detected in car ${i.id}: pos=(${l}, ${h}), rot=${u}`),c.visible=!1):(c.position.set(l,0,h),c.rotation.y=u),c.visible=i.visible,c}var k=(i=>(i.IDENTIFIER="IDENTIFIER",i.LABEL_DEF="LABEL_DEF",i.LABEL_REF="LABEL_REF",i.DOT="DOT",i.REPETITION="REPETITION",i.NUMBER="NUMBER",i.RANGE="RANGE",i.STRING="STRING",i.NEW="NEW",i.LOOP_CLOSE="LOOP_CLOSE",i.TITLE="TITLE",i.DESCRIPTION="DESCRIPTION",i.LOCKAHEAD="LOCKAHEAD",i.DISTANCE="DISTANCE",i.COUNT="COUNT",i.DEGREES="DEGREES",i.OFFSET="OFFSET",i.BASE="BASE",i.SPLICE="SPLICE",i.USING="USING",i.CABS="CABS",i.CARS="CARS",i.SPEED="SPEED",i.EVERY="EVERY",i.COLORFUL="COLORFUL",i.GRAY="GRAY",i.BLACK="BLACK",i.RANDOM="RANDOM",i.MAX="MAX",i.TRAINS="TRAINS",i.FLEX="FLEX",i.CONNECT="CONNECT",i.CROSS="CROSS",i.DEFINE="DEFINE",i.LEFT="LEFT",i.RIGHT="RIGHT",i.STRAIGHT="STRAIGHT",i.RADIUS="RADIUS",i.ARC="ARC",i.LENGTH="LENGTH",i.ARRAY="ARRAY",i.ANGLE="ANGLE",i.PREFIX="PREFIX",i.LOG="LOG",i.PREFAB="PREFAB",i.USE="USE",i.TREES="TREES",i.CLEARANCE="CLEARANCE",i.DENSITY="DENSITY",i.FACTOR="FACTOR",i.GRID="GRID",i.NONE="NONE",i.POND="POND",i.SIZE="SIZE",i.SCORE="SCORE",i.EOF="EOF",i))(k||{});function Sx(i){const e=[],t=i.split(`
`);for(let n=0;n<t.length;n++){let s=t[n];const r=s.indexOf("#");r!==-1&&(s=s.substring(0,r));const a=s.trim(),o=a.match(/^(prefab|prefabrication)\s+/i);if(o){const l=n+1,h=a.substring(o[0].length),u=h.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*/);if(!u)throw new Error(`Expected prefab name after '${o[1]}' at line ${l}`);const d=u[1],f=h.substring(u[0].length);if(!f.startsWith("{"))throw new Error(`Expected '{' after prefab name '${d}' at line ${l}`);let g=f.substring(1),_=!1;const p=g.indexOf("}");if(p!==-1&&(g=g.substring(0,p),_=!0),!_){const m=[g];for(;n+1<t.length;){n++;let x=t[n];const v=x.indexOf("#"),S=v!==-1?x.substring(0,v):x,C=S.indexOf("}");if(C!==-1){m.push(S.substring(0,C)),_=!0;break}else m.push(S)}g=m.join(`
`)}if(!_)throw new Error(`Unclosed prefab block '${d}' starting at line ${l}`);e.push({type:"PREFAB",value:o[1],line:l,column:1}),e.push({type:"IDENTIFIER",value:d,line:l,column:o[0].length+1}),e.push({type:"STRING",value:g.trim(),line:l,column:1});continue}const c=s.split(";");for(const l of c){const h=Mx(l.trim(),n+1);e.push(...h)}}return e.push({type:"EOF",value:"",line:t.length,column:0}),e}function Mx(i,e){const t=[];let n=0;for(;n<i.length;){for(;n<i.length&&/\s/.test(i[n]);)n++;if(n>=i.length)break;const s=n,r=i[n];if(r==='"'||r==="'"){const a=r;n++;const o=n;for(;n<i.length&&i[n]!==a;)n++;const c=i.substring(o,n);n<i.length&&n++,t.push({type:"STRING",value:c,line:e,column:s+1});continue}if(r==="$"){n++;const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;t.push({type:"LABEL_REF",value:i.substring(a,n),line:e,column:s+1});continue}if(r===">"){t.push({type:"LOOP_CLOSE",value:">",line:e,column:s+1}),n++;continue}if(r==="."){t.push({type:"DOT",value:".",line:e,column:s+1}),n++;continue}if(r==="*"){t.push({type:"REPETITION",value:"*",line:e,column:s+1}),n++;continue}if(/[0-9]/.test(r)||r==="-"&&n+1<i.length&&/[0-9]/.test(i[n+1])){const a=n;for(r==="-"&&n++;n<i.length&&/[0-9.]/.test(i[n]);)n++;if(r!=="-"&&n<i.length&&i[n]==="-"){const o=n;if(n++,n<i.length&&/[0-9]/.test(i[n])){for(;n<i.length&&/[0-9.]/.test(i[n]);)n++;t.push({type:"RANGE",value:i.substring(a,n),line:e,column:s+1});continue}else n=o}t.push({type:"NUMBER",value:i.substring(a,n),line:e,column:s+1});continue}if(/[a-zA-Z_]/.test(r)){const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;const o=i.substring(a,n),c=o.toLowerCase();let l=n;for(;l<i.length&&/\s/.test(i[l]);)l++;if(l<i.length&&i[l]===":"){t.push({type:"LABEL_DEF",value:o,line:e,column:s+1}),n=l+1;continue}if(c==="new"){t.push({type:"NEW",value:o,line:e,column:s+1});continue}if(c==="title"){t.push({type:"TITLE",value:o,line:e,column:s+1});const h=i.substring(n).trim();return h.length>0&&t.push({type:"STRING",value:h,line:e,column:n+1}),t}if(c==="description"){t.push({type:"DESCRIPTION",value:o,line:e,column:s+1});const h=i.substring(n).trim();return h.length>0&&t.push({type:"STRING",value:h,line:e,column:n+1}),t}if(c==="lockahead"){t.push({type:"LOCKAHEAD",value:o,line:e,column:s+1});continue}if(c==="distance"){t.push({type:"DISTANCE",value:o,line:e,column:s+1});continue}if(c==="count"){t.push({type:"COUNT",value:o,line:e,column:s+1});continue}if(c==="degrees"){t.push({type:"DEGREES",value:o,line:e,column:s+1});continue}if(c==="offset"){t.push({type:"OFFSET",value:o,line:e,column:s+1});continue}if(c==="base"){t.push({type:"BASE",value:o,line:e,column:s+1});continue}if(c==="splice"){t.push({type:"SPLICE",value:o,line:e,column:s+1});continue}if(c==="using"){t.push({type:"USING",value:o,line:e,column:s+1});continue}if(c==="cabs"){t.push({type:"CABS",value:o,line:e,column:s+1});continue}if(c==="cars"){t.push({type:"CARS",value:o,line:e,column:s+1});continue}if(c==="speed"){t.push({type:"SPEED",value:o,line:e,column:s+1});continue}if(c==="every"){t.push({type:"EVERY",value:o,line:e,column:s+1});continue}if(c==="colorful"){t.push({type:"COLORFUL",value:o,line:e,column:s+1});continue}if(c==="gray"){t.push({type:"GRAY",value:o,line:e,column:s+1});continue}if(c==="black"){t.push({type:"BLACK",value:o,line:e,column:s+1});continue}if(c==="random"){t.push({type:"RANDOM",value:o,line:e,column:s+1});continue}if(c==="max"){t.push({type:"MAX",value:o,line:e,column:s+1});continue}if(c==="trains"){t.push({type:"TRAINS",value:o,line:e,column:s+1});continue}if(c==="flex"){t.push({type:"FLEX",value:o,line:e,column:s+1});continue}if(c==="connect"){t.push({type:"CONNECT",value:o,line:e,column:s+1});continue}if(c==="cross"){t.push({type:"CROSS",value:o,line:e,column:s+1});continue}if(c==="log"||c==="logging"){t.push({type:"LOG",value:o,line:e,column:s+1});continue}if(c==="define"||c==="def"){t.push({type:"DEFINE",value:o,line:e,column:s+1});continue}if(c==="left"||c==="l"){t.push({type:"LEFT",value:o,line:e,column:s+1});continue}if(c==="right"||c==="r"){t.push({type:"RIGHT",value:o,line:e,column:s+1});continue}if(c==="straight"||c==="s"){t.push({type:"STRAIGHT",value:o,line:e,column:s+1});continue}if(c==="radius"){t.push({type:"RADIUS",value:o,line:e,column:s+1});continue}if(c==="arc"){t.push({type:"ARC",value:o,line:e,column:s+1});continue}if(c==="length"){t.push({type:"LENGTH",value:o,line:e,column:s+1});continue}if(c==="array"){t.push({type:"ARRAY",value:o,line:e,column:s+1});continue}if(c==="angle"){t.push({type:"ANGLE",value:o,line:e,column:s+1});continue}if(c==="prefix"){t.push({type:"PREFIX",value:o,line:e,column:s+1});continue}if(c==="use"){t.push({type:"USE",value:o,line:e,column:s+1});continue}if(c==="grid"){t.push({type:"GRID",value:o,line:e,column:s+1});continue}if(c==="trees"){t.push({type:"TREES",value:o,line:e,column:s+1});continue}if(c==="clearance"){t.push({type:"CLEARANCE",value:o,line:e,column:s+1});continue}if(c==="density"){t.push({type:"DENSITY",value:o,line:e,column:s+1});continue}if(c==="factor"){t.push({type:"FACTOR",value:o,line:e,column:s+1});continue}if(c==="none"){t.push({type:"NONE",value:o,line:e,column:s+1});continue}if(c==="pond"){t.push({type:"POND",value:o,line:e,column:s+1});continue}if(c==="size"){t.push({type:"SIZE",value:o,line:e,column:s+1});continue}if(c==="score"){t.push({type:"SCORE",value:o,line:e,column:s+1});continue}if(c==="x"){t.push({type:"REPETITION",value:"x",line:e,column:s+1});continue}t.push({type:"IDENTIFIER",value:o,line:e,column:s+1});continue}n++}return t}function Ah(i){const e=Sx(i);return new Ex(e).parse()}class Ex{constructor(e){pe(this,"tokens");pe(this,"pos",0);this.tokens=e}parse(){const e=[];for(;!this.isAtEnd();){const t=this.parseStatement();t&&e.push(t)}return e}parseStatement(){var t;switch(this.peek().type){case k.NEW:return this.parseNewStatement();case k.TITLE:return this.parseTitleStatement();case k.DESCRIPTION:return this.parseDescriptionStatement();case k.LOCKAHEAD:return this.parseLockAheadStatement();case k.RANDOM:return this.parseRandomStatement();case k.MAX:return this.parseMaxTrainsStatement();case k.FLEX:return this.parseFlexConnectStatement();case k.CROSS:return this.parseCrossConnectStatement();case k.DEFINE:return this.parseDefineStatement();case k.LOG:return this.parseLogStatement();case k.SPLICE:return this.parseSpliceStatement();case k.ARRAY:return this.parseArrayStatement();case k.PREFAB:return this.parsePrefabStatement();case k.USE:return this.parseUseStatement();case k.TREES:return this.parseTreesStatement();case k.POND:return this.parsePondStatement();case k.GRID:return this.parseGridStatement();case k.LABEL_DEF:return this.parseLabeledPiece();case k.LABEL_REF:return this.parseReference();case k.LOOP_CLOSE:return this.parseLoopClose();case k.IDENTIFIER:if(((t=this.peekNext())==null?void 0:t.type)===k.DOT){const n=this.tokens[this.pos+2];if((n==null?void 0:n.type)===k.LABEL_REF)return this.parsePointLabelReference()}return this.parsePieceOrExplicitConnection();case k.EOF:return null;default:return this.advance(),null}}parseNewStatement(){const e=this.advance();let t=0,n=0,s,r;for(;this.isNewModifier();)if(this.check(k.DEGREES))this.advance(),this.check(k.NUMBER)&&(t=parseFloat(this.advance().value));else if(this.check(k.OFFSET))this.advance(),this.check(k.NUMBER)&&(n=parseFloat(this.advance().value));else if(this.check(k.BASE)){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(k.NUMBER))t=parseFloat(this.advance().value);else if(this.check(k.IDENTIFIER)&&this.peek().value.toLowerCase()==="from"){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(k.LABEL_REF)){const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else break;return{type:"new",degrees:t,offset:n,baseLabel:s,basePoint:r,line:e.line}}isNewModifier(){var n;const e=this.peek().type,t=this.peek().value;return e===k.DEGREES||e===k.OFFSET||e===k.BASE||e===k.NUMBER||e===k.LABEL_REF||e===k.IDENTIFIER&&t.toLowerCase()==="from"||e===k.IDENTIFIER&&((n=this.peekNext())==null?void 0:n.type)===k.DOT}parseConnectionPointRef(){var e;if(this.check(k.LABEL_REF)){const t=this.advance().value;let n;return this.check(k.DOT)&&(this.advance(),this.check(k.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{label:t,point:n}}else if(this.check(k.IDENTIFIER)&&((e=this.peekNext())==null?void 0:e.type)===k.DOT){const t=this.advance().value.toLowerCase();if(this.advance(),this.check(k.LABEL_REF))return{label:this.advance().value,point:t}}return null}parseTitleStatement(){const e=this.advance();let t="";return this.check(k.STRING)&&(t=this.advance().value),{type:"title",text:t,line:e.line}}parseDescriptionStatement(){const e=this.advance();let t="";return this.check(k.STRING)&&(t=this.advance().value),{type:"description",text:t,line:e.line}}parseLockAheadStatement(){const e=this.advance();let t,n;for(;this.check(k.DISTANCE)||this.check(k.COUNT)||this.check(k.NUMBER);)this.check(k.DISTANCE)?(this.advance(),this.check(k.NUMBER)&&(t=parseFloat(this.advance().value))):this.check(k.COUNT)?(this.advance(),this.check(k.NUMBER)&&(n=parseInt(this.advance().value,10))):this.check(k.NUMBER)&&(t=parseFloat(this.advance().value));return{type:"lockAhead",distance:t,count:n,line:e.line}}parseRandomStatement(){return{type:"random",line:this.advance().line}}parseMaxTrainsStatement(){const e=this.advance();this.check(k.TRAINS)&&this.advance();let t=1;return this.check(k.NUMBER)&&(t=parseInt(this.advance().value,10)),{type:"maxTrains",value:t,line:e.line}}parseFlexConnectStatement(){const e=this.advance();this.check(k.CONNECT)&&this.advance();const t=this.parseConnectionPointRef();if(!t)throw new Error(`Expected connection point reference after 'flex connect' at line ${e.line}`);const n=this.parseConnectionPointRef();if(!n)throw new Error(`Expected second connection point reference in 'flex connect' at line ${e.line}`);return{type:"flexConnect",point1Label:t.label,point1Name:t.point,point2Label:n.label,point2Name:n.point,line:e.line}}parseCrossConnectStatement(){const e=this.advance();if(this.check(k.CONNECT)&&this.advance(),!this.check(k.LABEL_REF))throw new Error(`Expected $label after 'cross connect' at line ${e.line}`);const t=this.advance().value;if(!this.check(k.LABEL_REF))throw new Error(`Expected second $label in 'cross connect' at line ${e.line}`);const n=this.advance().value;return{type:"crossConnect",label1:t,label2:n,line:e.line}}parseLogStatement(){const e=this.advance();if(!this.check(k.IDENTIFIER))throw new Error(`Expected log level (debug, info, warn, error) after 'log' at line ${e.line}`);const t=this.advance();let n=t.value.toLowerCase();if(n==="warning"&&(n="warn"),n!=="debug"&&n!=="info"&&n!=="warn"&&n!=="error")throw new Error(`Invalid log level '${t.value}' at line ${e.line}. Expected: debug, info, warn, or error`);return{type:"log",level:n,line:e.line}}parseDefineStatement(){const e=this.advance();if(!this.check(k.IDENTIFIER))throw new Error(`Expected archetype name after 'define' at line ${e.line}`);const t=this.advance().value.toLowerCase();let n;if(this.check(k.LEFT))this.advance(),n="left";else if(this.check(k.RIGHT))this.advance(),n="right";else if(this.check(k.STRAIGHT))this.advance(),n="straight";else throw new Error(`Expected direction (left, right, straight, l, r, or s) after archetype name at line ${e.line}`);let s,r,a;if(n==="left"||n==="right"){for(;this.check(k.RADIUS)||this.check(k.ARC);)if(this.check(k.RADIUS)){if(this.advance(),!this.check(k.NUMBER))throw new Error(`Expected number after 'radius' at line ${e.line}`);s=parseFloat(this.advance().value)}else if(this.check(k.ARC)){if(this.advance(),!this.check(k.NUMBER))throw new Error(`Expected number after 'arc' at line ${e.line}`);r=parseFloat(this.advance().value)}if(s===void 0)throw new Error(`Curve definition requires 'radius' at line ${e.line}`);if(r===void 0)throw new Error(`Curve definition requires 'arc' at line ${e.line}`);if(this.check(k.LENGTH))throw new Error(`'length' is not allowed for curve definitions at line ${e.line}`)}else{if(!this.check(k.LENGTH))throw new Error(`Straight definition requires 'length' at line ${e.line}`);if(this.advance(),!this.check(k.NUMBER))throw new Error(`Expected number after 'length' at line ${e.line}`);if(a=parseFloat(this.advance().value),this.check(k.RADIUS)||this.check(k.ARC))throw new Error(`'radius' and 'arc' are not allowed for straight definitions at line ${e.line}`)}return{type:"define",name:t,direction:n,radius:s,arc:r,length:a,line:e.line}}parseSpliceStatement(){const e=this.advance();this.check(k.USING)&&this.advance();const t=this.parseConnectionPointRef();return{type:"splice",label:t==null?void 0:t.label,point:t==null?void 0:t.point,line:e.line}}parseArrayStatement(){const e=this.advance();let t,n,s,r;for(;this.check(k.COUNT)||this.check(k.ANGLE)||this.check(k.DISTANCE)||this.check(k.PREFIX);)this.check(k.COUNT)?(this.advance(),this.check(k.NUMBER)&&(t=parseInt(this.advance().value,10))):this.check(k.ANGLE)?(this.advance(),this.check(k.NUMBER)&&(n=parseFloat(this.advance().value))):this.check(k.DISTANCE)?(this.advance(),this.check(k.NUMBER)&&(s=parseFloat(this.advance().value))):this.check(k.PREFIX)&&(this.advance(),this.check(k.IDENTIFIER)&&(r=this.advance().value));if(t===void 0)throw new Error(`'array' requires 'count' parameter at line ${e.line}`);if(n===void 0)throw new Error(`'array' requires 'angle' parameter at line ${e.line}`);if(s===void 0)throw new Error(`'array' requires 'distance' parameter at line ${e.line}`);if(r===void 0)throw new Error(`'array' requires 'prefix' parameter at line ${e.line}`);return{type:"array",count:t,angle:n,distance:s,prefix:r,line:e.line}}parsePrefabStatement(){const e=this.advance();if(!this.check(k.IDENTIFIER))throw new Error(`Expected prefab name after '${e.value}' at line ${e.line}`);const t=this.advance().value;if(!this.check(k.STRING))throw new Error(`Expected prefab body after name '${t}' at line ${e.line}`);const n=this.advance().value;return{type:"prefab",name:t,body:n,line:e.line}}parseUseStatement(){const e=this.advance();if(!this.check(k.IDENTIFIER))throw new Error(`Expected prefab name after 'use' at line ${e.line}`);const t=this.advance().value,n={};for(;this.check(k.IDENTIFIER)||this.check(k.STRING);){const s=this.advance().value;if(!this.check(k.IDENTIFIER)&&!this.check(k.NUMBER)&&!this.check(k.STRING))throw new Error(`Expected value for parameter '${s}' in 'use ${t}' at line ${e.line}`);const r=this.advance().value;n[s]=r}return{type:"use",name:t,params:n,line:e.line}}parseTreesStatement(){const e=this.advance();let t,n,s,r;for(;this.check(k.NONE)||this.check(k.CLEARANCE)||this.check(k.DENSITY)||this.check(k.FACTOR);)this.check(k.NONE)?(this.advance(),t=!0):this.check(k.CLEARANCE)?(this.advance(),this.check(k.NUMBER)&&(n=parseInt(this.advance().value,10))):this.check(k.DENSITY)?(this.advance(),this.check(k.NUMBER)&&(s=parseInt(this.advance().value,10))):this.check(k.FACTOR)&&(this.advance(),this.check(k.NUMBER)&&(r=parseFloat(this.advance().value)));return{type:"trees",none:t,clearance:n,density:s,factor:r,line:e.line}}parsePondStatement(){const e=this.advance();let t,n,s;for(;this.check(k.SIZE)||this.check(k.CLEARANCE)||this.check(k.SCORE);)this.check(k.SIZE)?(this.advance(),this.check(k.NUMBER)&&(t=parseInt(this.advance().value,10))):this.check(k.CLEARANCE)?(this.advance(),this.check(k.NUMBER)&&(n=parseInt(this.advance().value,10))):this.check(k.SCORE)&&(this.advance(),this.check(k.NUMBER)&&(s=parseInt(this.advance().value,10)));return{type:"pond",size:t,clearance:n,score:s,line:e.line}}parseGridStatement(){const e=this.advance();let t;return this.check(k.SIZE)&&(this.advance(),this.check(k.NUMBER)&&(t=parseInt(this.advance().value,10))),{type:"grid",size:t,line:e.line}}parseLabeledPiece(){const e=this.advance(),t=e.value,n=this.parsePieceOrExplicitConnection();if(n.type!=="piece")throw new Error(`Expected piece after label '${t}:' at line ${e.line}`);return n.label=t,n}parseReference(){const e=this.advance(),t=e.value;let n;return this.check(k.DOT)&&(this.advance(),this.check(k.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{type:"reference",label:t,point:n,line:e.line}}parsePointLabelReference(){const e=this.advance(),t=e.value.toLowerCase();if(this.advance(),!this.check(k.LABEL_REF))throw new Error(`Expected $label after '${t}.' at line ${e.line}`);return{type:"reference",label:this.advance().value,point:t,line:e.line}}parseLoopClose(){const e=this.advance();let t,n;if(this.check(k.IDENTIFIER)){if(t=this.advance().value.toLowerCase(),!this.check(k.DOT))throw new Error(`Expected "." after connection point in loop close at line ${e.line}`);if(this.advance(),!this.check(k.LABEL_REF))throw new Error(`Expected $label after "." in loop close at line ${e.line}`);n=this.advance().value}else if(this.check(k.LABEL_REF)){if(n=this.advance().value,!this.check(k.DOT))throw new Error(`Expected "." after $${n} in loop close at line ${e.line}`);if(this.advance(),!this.check(k.IDENTIFIER))throw new Error(`Expected connection point after "$${n}." in loop close at line ${e.line}`);t=this.advance().value.toLowerCase()}else throw new Error(`Expected connection point reference after ">" at line ${e.line}`);return{type:"loopClose",point:t,label:n,line:e.line}}parsePieceOrExplicitConnection(){let e,t;const n=this.advance();if(this.check(k.DOT)){if(e=n.value.toLowerCase(),this.advance(),!this.check(k.IDENTIFIER))throw new Error(`Expected piece code after '${e}.' at line ${n.line}`);t=this.advance().value.toLowerCase()}else t=n.value.toLowerCase();let s,r,a,o,c;if(t==="gen"||t==="generator")for(;this.isGenModifier();)if(this.check(k.CABS))this.advance(),s=this.parseNumberOrRange(!0);else if(this.check(k.CARS))this.advance(),r=this.parseNumberOrRange(!0);else if(this.check(k.SPEED))this.advance(),a=this.parseNumberOrRange(!1);else if(this.check(k.EVERY))this.advance(),o=this.parseNumberOrRange(!0);else if(this.check(k.COLORFUL))this.advance(),c="colorful";else if(this.check(k.GRAY))this.advance(),c="gray";else if(this.check(k.BLACK))this.advance(),c="black";else break;let l=1;return this.check(k.REPETITION)&&(this.advance(),this.check(k.NUMBER)&&(l=parseInt(this.advance().value,10))),{type:"piece",attachPoint:e,archetypeCode:t,count:l,line:n.line,genCabs:s,genCars:r,genSpeed:a,genEvery:o,genColorMode:c}}isGenModifier(){const e=this.peek().type;return e===k.CABS||e===k.CARS||e===k.SPEED||e===k.EVERY||e===k.COLORFUL||e===k.GRAY||e===k.BLACK}parseNumberOrRange(e){if(this.check(k.NUMBER)){const t=this.advance().value;return e?parseInt(t,10):parseFloat(t)}else if(this.check(k.RANGE)){const n=this.advance().value.split("-");if(n.length===2){const s=e?parseInt(n[0],10):parseFloat(n[0]),r=e?parseInt(n[1],10):parseFloat(n[1]);return{min:s,max:r}}}}peek(){return this.tokens[this.pos]||{type:k.EOF,value:"",line:0,column:0}}peekNext(){return this.tokens[this.pos+1]}advance(){return this.isAtEnd()||this.pos++,this.tokens[this.pos-1]}check(e){return this.peek().type===e}isAtEnd(){return this.peek().type===k.EOF}}function ea(i){const e=Ah(i);return new yx().build(e)}class yx{constructor(){pe(this,"state");this.state=this.createInitialState()}createInitialState(){const e={pieces:[],startPosition:j(0,0),startRotation:0};return{pieces:[],labeledPieces:new Map,segments:[],currentSegment:e,currentPosition:j(0,0),currentRotation:0,currentPiece:null,currentPointName:"out",nextPieceId:1,title:void 0,descriptions:[],pendingSplices:[],pendingFlexConnects:[],pendingCrossConnects:[],prefabs:new Map}}build(e){for(const t of e)this.processStatement(t);return this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment),this.processPendingSplices(),this.processPendingCrossConnects(),this.processPendingFlexConnects(),this.detectAutoConnections(),this.markTunnelSections(),{title:this.state.title||"Simulador de Tren",description:this.state.descriptions.length>0?this.state.descriptions.join(" "):void 0,lockAheadDistance:this.state.lockAheadDistance,lockAheadCount:this.state.lockAheadCount,randomSwitches:this.state.randomSwitches,maxTrains:this.state.maxTrains,logLevel:this.state.logLevel,treesEnabled:this.state.treesEnabled,treesClearance:this.state.treesClearance,treesDensity:this.state.treesDensity,treesFactor:this.state.treesFactor,pondEnabled:this.state.pondEnabled,pondSize:this.state.pondSize,pondClearance:this.state.pondClearance,pondScore:this.state.pondScore,gridSize:this.state.gridSize,pieces:this.state.pieces}}processStatement(e){switch(e.type){case"new":this.processNew(e);break;case"piece":this.processPiece(e);break;case"reference":this.processReference(e);break;case"loopClose":this.processLoopClose(e);break;case"title":this.processTitle(e);break;case"description":this.processDescription(e);break;case"lockAhead":this.processLockAhead(e);break;case"random":this.processRandom(e);break;case"maxTrains":this.processMaxTrains(e);break;case"splice":this.processSplice(e);break;case"flexConnect":this.processFlexConnect(e);break;case"crossConnect":this.processCrossConnect(e);break;case"define":this.processDefine(e);break;case"log":this.processLog(e);break;case"array":this.processArray(e);break;case"prefab":this.processPrefab(e);break;case"use":this.processUse(e);break;case"trees":this.processTrees(e);break;case"pond":this.processPond(e);break;case"grid":this.processGrid(e);break}}processLog(e){this.state.logLevel=e.level;const t={debug:nn.DEBUG,info:nn.INFO,warn:nn.WARNING,error:nn.ERROR};mh(t[e.level])}processTrees(e){e.none?this.state.treesEnabled=!1:(this.state.treesEnabled=!0,e.clearance!==void 0&&(this.state.treesClearance=e.clearance),e.density!==void 0&&(this.state.treesDensity=e.density),e.factor!==void 0&&(this.state.treesFactor=e.factor))}processPond(e){this.state.pondEnabled=!0,e.size!==void 0&&(this.state.pondSize=e.size),e.clearance!==void 0&&(this.state.pondClearance=e.clearance),e.score!==void 0&&(this.state.pondScore=e.score)}processGrid(e){e.size!==void 0&&(this.state.gridSize=e.size)}processPrefab(e){if(this.state.prefabs.has(e.name))throw new Error(`Duplicate prefab name '${e.name}' at line ${e.line}`);this.state.prefabs.set(e.name,e.body)}processUse(e){const t=this.state.prefabs.get(e.name);if(t===void 0)throw new Error(`Unknown prefab '${e.name}' at line ${e.line}`);let n=t;for(const[r,a]of Object.entries(e.params))n=n.split(`[${r}]`).join(a);const s=Ah(n);for(const r of s)this.processStatement(r)}processArray(e){const t=nt("ph"),n=this.placePiece(t,void 0,e.line,e.prefix+"1");n.label=e.prefix+"1",this.state.labeledPieces.set(e.prefix+"1",n),this.state.pieces.push(n),this.state.currentSegment.pieces.push(n);const s={...n.position},r=n.rotation,a=r+e.angle*Math.PI/180;for(let o=2;o<=e.count;o++){const c={x:s.x+(o-1)*e.distance*Math.cos(a),y:0,z:s.z+(o-1)*e.distance*Math.sin(a)},l=e.prefix+o,h={id:`piece_${this.state.nextPieceId++}`,archetypeCode:"ph",position:c,rotation:r,connections:new Map,label:l};this.state.labeledPieces.set(l,h),this.state.pieces.push(h),this.state.currentSegment.pieces.push(h),Y.debug(`Line ${e.line}: Array placed ph "${l}" at (${c.x.toFixed(2)}, ${c.z.toFixed(2)})`)}this.state.currentPiece=n}processTitle(e){if(this.state.title!==void 0)throw new Error(`Duplicate title statement at line ${e.line}. Only one title allowed.`);this.state.title=e.text}processDescription(e){this.state.descriptions.push(e.text)}processLockAhead(e){e.distance!==void 0&&(this.state.lockAheadDistance=e.distance),e.count!==void 0&&(this.state.lockAheadCount=e.count)}processRandom(e){this.state.randomSwitches=!0}processMaxTrains(e){this.state.maxTrains=e.value}processDefine(e){let t;if(e.direction==="straight"){const n=e.length;t={code:e.name,aliases:[],sections:[{splinePoints:[j(0,0),j(n,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(n,0),direction:j(1,0),sectionIndices:[0]}]}}else{const n=e.radius,s=e.arc,r=s*Math.PI/180,a=Math.max(3,Math.ceil(s/15)+1),o=[];for(let h=0;h<a;h++){const d=h/(a-1)*r;e.direction==="left"?o.push(j(n*Math.sin(d),n*(1-Math.cos(d)))):o.push(j(n*Math.sin(d),-n*(1-Math.cos(d))))}const c=o[o.length-1];let l;e.direction==="left"?l=j(Math.cos(r),Math.sin(r)):l=j(Math.cos(r),-Math.sin(r)),t={code:e.name,aliases:[],sections:[{splinePoints:o}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:c,direction:l,sectionIndices:[0]}]}}Zt(t),Y.debug(`Defined custom archetype '${e.name}': ${e.direction}, `+(e.direction==="straight"?`length=${e.length}`:`radius=${e.radius}, arc=${e.arc}°`))}processSplice(e){var t;this.state.pendingSplices.push({label:e.label,point:e.point,currentPieceId:(t=this.state.currentPiece)==null?void 0:t.id,currentPointName:this.state.currentPointName,line:e.line})}processFlexConnect(e){this.state.pendingFlexConnects.push({point1Label:e.point1Label,point1Name:e.point1Name||"out",point2Label:e.point2Label,point2Name:e.point2Name||"in",line:e.line})}processCrossConnect(e){this.state.pendingCrossConnects.push({label1:e.label1,label2:e.label2,line:e.line})}processNew(e){this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment);const t=e.degrees*Math.PI/180;if(e.baseLabel){const n=this.state.labeledPieces.get(e.baseLabel);if(!n)throw new Error(`Unknown label '${e.baseLabel}' in 'new' at line ${e.line}`);const s=nt(n.archetypeCode),r=e.basePoint||"out",a=this.getConnectionPoint(s,r);if(!a)throw new Error(`Connection point '${r}' not found on '${e.baseLabel}' at line ${e.line}`);const o=this.rotatePoint(a.position,n.rotation),c={x:n.position.x+o.x,z:n.position.z+o.z},l=this.rotatePoint(a.direction,n.rotation),h=Math.atan2(l.z,l.x),u=h+t,d={x:c.x+Math.cos(u)*e.offset,y:0,z:c.z+Math.sin(u)*e.offset};this.state.currentSegment={pieces:[],startPosition:d,startRotation:u},this.state.currentPosition=d,this.state.currentRotation=u,this.state.currentPiece=n,this.state.currentPointName=r,Y.debug(`Line ${e.line}: New segment from $${e.baseLabel}.${r}:`),Y.debug(`Line ${e.line}:   baseAngle: ${(h*180/Math.PI).toFixed(1)}°`),Y.debug(`Line ${e.line}:   degrees offset: ${e.degrees}°`),Y.debug(`Line ${e.line}:   currentRotation: ${(u*180/Math.PI).toFixed(1)}°`),Y.debug(`Line ${e.line}:   position: (${d.x.toFixed(2)}, ${d.z.toFixed(2)})`)}else{const n=t,s={x:Math.cos(n)*e.offset,y:0,z:Math.sin(n)*e.offset};this.state.currentSegment={pieces:[],startPosition:s,startRotation:n},this.state.currentPosition=s,this.state.currentRotation=n,this.state.currentPiece=null,this.state.currentPointName="out",Y.debug(`Line ${e.line}: New segment at origin:`),Y.debug(`Line ${e.line}:   degrees: ${e.degrees}°`),Y.debug(`Line ${e.line}:   currentRotation: ${(n*180/Math.PI).toFixed(1)}°`),Y.debug(`Line ${e.line}:   position: (${s.x.toFixed(2)}, ${s.z.toFixed(2)})`)}}processPiece(e){var n,s,r;const t=nt(e.archetypeCode);for(let a=0;a<e.count;a++){const o=this.placePiece(t,e.attachPoint,e.line,e.label);a===0&&e.label&&(o.label=e.label,this.state.labeledPieces.set(e.label,o)),t.code==="gen"&&a===0&&(o.genConfig={cabCount:(n=e.genCabs)!=null?n:1,carCount:(s=e.genCars)!=null?s:5,speed:e.genSpeed,frequency:e.genEvery,colorMode:(r=e.genColorMode)!=null?r:"gray",lastSpawnTime:-1/0,enabled:!0}),t.code==="sem"&&a===0&&(o.semaphoreConfig={locked:!1}),t.code==="dec"&&a===0&&(o.decouplerConfig={activated:!1}),this.state.pieces.push(o),this.state.currentSegment.pieces.push(o),this.state.currentPiece=o}}placePiece(e,t,n,s){let r=t||"in",a=this.getConnectionPoint(e,r);if(!a)if(e.connectionPoints.length>0)a=e.connectionPoints[0],r=a.name;else throw new Error(`No connection points found on archetype '${e.code}'`);const o=this.getOppositePoint(e,r),c=o?this.getConnectionPoint(e,o):null,l=a.direction,h=Math.atan2(l.z,l.x),d=this.state.currentRotation+Math.PI-h,f=this.rotatePoint(a.position,d),g={x:this.state.currentPosition.x-f.x,y:0,z:this.state.currentPosition.z-f.z},_={id:`piece_${this.state.nextPieceId++}`,archetypeCode:e.code,position:g,rotation:d,connections:new Map};{const p=s?` "${s}"`:"",m=n!==void 0?`Line ${n}`:"Line ?";Y.debug(`${m}: Placed ${e.code}${p} (${_.id}):`),Y.debug(`${m}:   incomingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`),Y.debug(`${m}:   pieceRotation: ${(d*180/Math.PI).toFixed(1)}°`),Y.debug(`${m}:   position: (${g.x.toFixed(2)}, ${g.z.toFixed(2)})`)}if(c){const p=this.rotatePoint(c.position,d);this.state.currentPosition={x:g.x+p.x,y:0,z:g.z+p.z};const m=this.rotatePoint(c.direction,d);this.state.currentRotation=Math.atan2(m.z,m.x),this.state.currentPointName=o;{const x=n!==void 0?`Line ${n}`:"Line ?";Y.debug(`${x}:   outgoingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}}return _}processReference(e){const t=this.state.labeledPieces.get(e.label);if(!t)throw new Error(`Unknown label reference: $${e.label} at line ${e.line}`);const n=nt(t.archetypeCode),s=e.point||"out",r=this.getConnectionPoint(n,s);if(!r)throw new Error(`Connection point '${s}' not found on labeled piece '${e.label}' at line ${e.line}`);const a=this.rotatePoint(r.position,t.rotation);this.state.currentPosition={x:t.position.x+a.x,y:0,z:t.position.z+a.z};const o=this.rotatePoint(r.direction,t.rotation);this.state.currentRotation=Math.atan2(o.z,o.x),this.state.currentPiece=t,this.state.currentPointName=s,Y.debug(`Line ${e.line}: Reference $${e.label}.${s}:`),Y.debug(`Line ${e.line}:   labeledPiece (${t.archetypeCode}) rotation: ${(t.rotation*180/Math.PI).toFixed(1)}°`),Y.debug(`Line ${e.line}:   point.direction (local): (${r.direction.x.toFixed(3)}, ${r.direction.z.toFixed(3)})`),Y.debug(`Line ${e.line}:   rotatedDir (world): (${o.x.toFixed(3)}, ${o.z.toFixed(3)})`),Y.debug(`Line ${e.line}:   new currentRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}processLoopClose(e){const t=this.state.labeledPieces.get(e.label);if(!t)throw new Error(`Unknown label reference in loop close: $${e.label} at line ${e.line}`);const n=nt(t.archetypeCode),s=this.getConnectionPoint(n,e.point);if(!s)throw new Error(`Connection point '${e.point}' not found on '${e.label}' at line ${e.line}`);const r=this.rotatePoint(s.position,t.rotation),a={x:t.position.x+r.x,z:t.position.z+r.z},o=this.rotatePoint(s.direction,t.rotation),c=Math.atan2(o.z,o.x),l=this.state.currentPosition,h=this.state.currentRotation,u=c+Math.PI,d=u-h,f=this.state.currentSegment.startPosition;for(const S of this.state.currentSegment.pieces){const C=S.position.x-f.x,w=S.position.z-f.z,A=this.rotatePoint({x:C,y:0,z:w},d);S.position.x=f.x+A.x,S.position.z=f.z+A.z,S.rotation+=d}const g=l.x-f.x,_=l.z-f.z,p=this.rotatePoint({x:g,y:0,z:_},d),m={x:f.x+p.x,z:f.z+p.z},x=a.x-m.x,v=a.z-m.z;for(const S of this.state.currentSegment.pieces)S.position.x+=x,S.position.z+=v;if(this.state.currentSegment.startPosition.x+=x,this.state.currentSegment.startPosition.z+=v,this.state.currentPosition={x:a.x,y:0,z:a.z},this.state.currentRotation=u,Y.debug(`Line ${e.line}: Loop close to $${e.label}.${e.point}:`),Y.debug(`Line ${e.line}:   rotationDelta: ${(d*180/Math.PI).toFixed(1)}°`),Y.debug(`Line ${e.line}:   new currentPosition: (${a.x.toFixed(2)}, ${a.z.toFixed(2)})`),Y.debug(`Line ${e.line}:   new currentRotation: ${(u*180/Math.PI).toFixed(1)}°`),this.state.currentPiece){const S=this.state.currentPiece.connections.get(this.state.currentPointName)||[];S.push({pieceId:t.id,pointName:e.point}),this.state.currentPiece.connections.set(this.state.currentPointName,S);const C=t.connections.get(e.point)||[];C.push({pieceId:this.state.currentPiece.id,pointName:this.state.currentPointName}),t.connections.set(e.point,C)}}getConnectionPoint(e,t){return e.connectionPoints.find(n=>n.name===t)}getOppositePoint(e,t){if(t==="in")return e.connectionPoints.find(n=>n.name==="out")?"out":void 0;if(t==="out")return e.connectionPoints.find(n=>n.name==="in")?"in":void 0;if(t==="in1")return"out1";if(t==="out1")return"in1";if(t==="in2")return"out2";if(t==="out2")return"in2"}rotatePoint(e,t){const n=Math.cos(t),s=Math.sin(t);return{x:e.x*n-e.z*s,y:e.y,z:e.x*s+e.z*n}}processPendingSplices(){for(const e of this.state.pendingSplices)this.performSplice(e)}processPendingFlexConnects(){Y.debug(`Processing ${this.state.pendingFlexConnects.length} flex connects`);for(const e of this.state.pendingFlexConnects)this.performFlexConnect(e)}processPendingCrossConnects(){this.state.pendingCrossConnects.length>0&&Y.debug(`Processing ${this.state.pendingCrossConnects.length} cross connects`);for(const e of this.state.pendingCrossConnects)this.performCrossConnect(e)}performCrossConnect(e){if(e.label1===e.label2)throw new Error(`Cross connect requires two different tracks at line ${e.line}`);const t=this.state.labeledPieces.get(e.label1),n=this.state.labeledPieces.get(e.label2);if(!t)throw new Error(`Unknown label '${e.label1}' in cross connect at line ${e.line}`);if(!n)throw new Error(`Unknown label '${e.label2}' in cross connect at line ${e.line}`);const s=this.findSplineIntersection(t,n);if(!s){Y.warn(`No intersection found between $${e.label1} and $${e.label2} at line ${e.line}`);return}const r=this.calculateSectionLength(t),a=this.calculateSectionLength(n),o=s.t1*r,c=s.t2*a;Y.debug(`Cross connect at line ${e.line}:`),Y.debug(`  Intersection at (${s.worldPos.x.toFixed(2)}, ${s.worldPos.z.toFixed(2)})`),Y.debug(`  piece1: t=${s.t1.toFixed(3)}, length=${r.toFixed(1)}, distance=${o.toFixed(1)}`),Y.debug(`  piece2: t=${s.t2.toFixed(3)}, length=${a.toFixed(1)}, distance=${c.toFixed(1)}`);const l=`cross_${t.id}_${n.id}`;t.internalConnectionPoints||(t.internalConnectionPoints=[]),t.internalConnectionPoints.push({id:l,t:s.t1,distance:o,worldPosition:{...s.worldPos}}),n.internalConnectionPoints||(n.internalConnectionPoints=[]),n.internalConnectionPoints.push({id:l,t:s.t2,distance:c,worldPosition:{...s.worldPos}}),Y.debug(`  Created shared internal connection point: ${l}`)}calculateSectionLength(e){const t=nt(e.archetypeCode);if(!t||t.sections.length===0)return 0;const n=t.sections[0];if(n.splinePoints.length<2)return 0;let s=0,r=null;for(const a of n.splinePoints){const o=this.rotatePoint(a,e.rotation),c={x:e.position.x+o.x,y:0,z:e.position.z+o.z};if(r){const l=c.x-r.x,h=c.z-r.z;s+=Math.sqrt(l*l+h*h)}r=c}return s}findSplineIntersection(e,t){const n=nt(e.archetypeCode),s=nt(t.archetypeCode),r=n.sections.length>0&&n.sections[0].splinePoints.length>=2,a=s.sections.length>0&&s.sections[0].splinePoints.length>=2;if(r&&a)return this.findSplineSplineIntersection(e,t,n,s);if(!r&&a){const c={x:e.position.x,y:0,z:e.position.z},l=this.findPointOnSpline(c,t,s);return l?{t1:.5,t2:l.t,worldPos:c}:null}if(r&&!a){const c={x:t.position.x,y:0,z:t.position.z},l=this.findPointOnSpline(c,e,n);return l?{t1:l.t,t2:.5,worldPos:c}:null}return Math.sqrt(Math.pow(e.position.x-t.position.x,2)+Math.pow(e.position.z-t.position.z,2))<.5?{t1:.5,t2:.5,worldPos:{x:e.position.x,y:0,z:e.position.z}}:null}findSplineSplineIntersection(e,t,n,s){const r=n.sections[0],a=s.sections[0],o=r.splinePoints.map(u=>{const d=this.rotatePoint(u,e.rotation);return{x:e.position.x+d.x,y:0,z:e.position.z+d.z}}),c=a.splinePoints.map(u=>{const d=this.rotatePoint(u,t.rotation);return{x:t.position.x+d.x,y:0,z:t.position.z+d.z}}),l=o.length-1,h=c.length-1;for(let u=0;u<l;u++){const d=o[u],f=o[u+1];for(let g=0;g<h;g++){const _=c[g],p=c[g+1],m=this.lineSegmentIntersection(d,f,_,p);if(m){const x=(u+m.s)/l,v=(g+m.t)/h;return{t1:x,t2:v,worldPos:m.point}}}}return null}findPointOnSpline(e,t,n){const a=n.sections[0].splinePoints.map(h=>{const u=this.rotatePoint(h,t.rotation);return{x:t.position.x+u.x,y:0,z:t.position.z+u.z}}),o=a.length-1;let c=-1,l=1/0;for(let h=0;h<o;h++){const u=a[h],d=a[h+1],f=d.x-u.x,g=d.z-u.z,_=f*f+g*g;let p=0;_>1e-4&&(p=Math.max(0,Math.min(1,((e.x-u.x)*f+(e.z-u.z)*g)/_)));const m=u.x+p*f,x=u.z+p*g,v=Math.sqrt(Math.pow(e.x-m,2)+Math.pow(e.z-x,2));v<l&&(l=v,c=(h+p)/o)}return l<=.5?{t:c,distance:l}:null}lineSegmentIntersection(e,t,n,s){const r=t.x-e.x,a=t.z-e.z,o=s.x-n.x,c=s.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=n.x-e.x,u=n.z-e.z,d=(h*c-u*o)/l,f=(h*a-u*r)/l;return d<0||d>1||f<0||f>1?null:{s:d,t:f,point:{x:e.x+d*r,y:0,z:e.z+d*a}}}performFlexConnect(e){const t=this.state.labeledPieces.get(e.point1Label),n=this.state.labeledPieces.get(e.point2Label);if(!t)throw new Error(`Unknown label '${e.point1Label}' in flex connect at line ${e.line}`);if(!n)throw new Error(`Unknown label '${e.point2Label}' in flex connect at line ${e.line}`);const s=nt(t.archetypeCode),r=nt(n.archetypeCode),a=this.getConnectionPoint(s,e.point1Name),o=this.getConnectionPoint(r,e.point2Name);if(!a)throw new Error(`Connection point '${e.point1Name}' not found on '${e.point1Label}' at line ${e.line}`);if(!o)throw new Error(`Connection point '${e.point2Name}' not found on '${e.point2Label}' at line ${e.line}`);const c=this.rotatePoint(a.position,t.rotation),l={x:t.position.x+c.x,y:0,z:t.position.z+c.z},h=this.rotatePoint(a.direction,t.rotation),u={x:h.x,y:0,z:h.z},d=this.rotatePoint(o.position,n.rotation),f={x:n.position.x+d.x,y:0,z:n.position.z+d.z},g=this.rotatePoint(o.direction,n.rotation),_={x:-g.x,y:0,z:-g.z};Y.debug(`Flex connect at line ${e.line}:`),Y.debug(`  P1: (${l.x.toFixed(2)}, ${l.z.toFixed(2)}), D1: (${u.x.toFixed(3)}, ${u.z.toFixed(3)}) angle=${(Math.atan2(u.z,u.x)*180/Math.PI).toFixed(1)}°`),Y.debug(`  P2: (${f.x.toFixed(2)}, ${f.z.toFixed(2)}), D2: (${_.x.toFixed(3)}, ${_.z.toFixed(3)}) angle=${(Math.atan2(_.z,_.x)*180/Math.PI).toFixed(1)}°`),Y.debug(`  Distance: ${Math.sqrt((f.x-l.x)**2+(f.z-l.z)**2).toFixed(2)}`);const p=this.solveFlexConnect(l,u,f,_,e.line);if(!p){Y.warn(`Could not find flex connect solution at line ${e.line}`);return}p.type==="curve-curve"?Y.debug(`  Solution: ${p.type}, radius=${p.radius.toFixed(2)}", arcAngle=${(p.arcAngle*180/Math.PI).toFixed(1)}°, dir1=${p.curveDirection}, dir2=${p.curveDirection2}`):Y.debug(`  Solution: ${p.type}, straight=${p.straightLength.toFixed(2)}", radius=${p.radius.toFixed(2)}", direction=${p.curveDirection}`),this.createFlexPieces(p,t,e.point1Name,n,e.point2Name,e.point1Label,e.point2Label,e.line)}perpRight(e){return{x:e.z,y:0,z:-e.x}}solveFlexConnect(e,t,n,s,r){const a={x:n.x-e.x,y:0,z:n.z-e.z},o=Math.sqrt(a.x*a.x+a.z*a.z),c=5,l=.5,h=.02,u=.02;Y.debug(`  Solving with delta=(${a.x.toFixed(2)}, ${a.z.toFixed(2)}), length=${o.toFixed(2)}`);const d=t.x*s.x+t.z*s.z,f=Math.abs(d-1)<h;let g=!1,_=!1;if(o>.1){const w=Math.abs(a.x*t.z-a.z*t.x)/o,A=(a.x*t.x+a.z*t.z)/o;g=w<u,_=A>.98}if(Y.debug(`  Direction dot=${d.toFixed(4)}, aligned=${f}, collinear=${g}, deltaAlongD1=${_}`),f&&g&&_&&o>.1)return Y.debug(`  [straight-only] length=${o.toFixed(2)}"`),{type:"straight-only",straightLength:o,radius:1/0,curveDirection:"none",P1:e,D1:t,P2:n,D2:s};const p=Math.atan2(t.z,t.x);let x=Math.atan2(s.z,s.x)-p;for(;x>Math.PI;)x-=2*Math.PI;for(;x<-Math.PI;)x+=2*Math.PI;const v=270,S=v*Math.PI/180;Y.debug(`  Arc angle between D1 and D2: ${(x*180/Math.PI).toFixed(1)}°`);const C=[];{const w=this.perpRight(t),A=this.perpRight(s),N=this.solveStraightCurve(t,w,A,a);N&&N.L>=0&&Math.abs(N.R)>=c&&(Math.abs(x)<=S?(Y.debug(`  [str+curve] L=${N.L.toFixed(2)}, R=${N.R.toFixed(2)}`),N.L<l?C.push({type:"curve-only",straightLength:0,radius:Math.abs(N.R),curveDirection:N.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s}):C.push({type:"straight-curve",straightLength:N.L,radius:Math.abs(N.R),curveDirection:N.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s})):Y.debug(`  [str+curve] rejected: arc angle ${(x*180/Math.PI).toFixed(1)}° exceeds ${v}°`))}{const w=this.perpRight(t),A=this.perpRight(s),N=this.solveCurveStraight(s,w,A,a);N&&N.L>=0&&Math.abs(N.R)>=c&&(Math.abs(x)<=S?(Y.debug(`  [curve+str] L=${N.L.toFixed(2)}, R=${N.R.toFixed(2)}`),N.L<l?C.some(b=>b.type==="curve-only")||C.push({type:"curve-only",straightLength:0,radius:Math.abs(N.R),curveDirection:N.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s}):C.push({type:"curve-straight",straightLength:N.L,radius:Math.abs(N.R),curveDirection:N.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s})):Y.debug(`  [curve+str] rejected: arc angle ${(x*180/Math.PI).toFixed(1)}° exceeds ${v}°`))}if(f&&!g&&o>.1){const w=this.solveCurveCurve(t,a);w&&(Y.debug(`  [curve+curve] R=${w.radius.toFixed(2)}, θ=${(w.arcAngle*180/Math.PI).toFixed(1)}°, dir1=${w.dir1}, dir2=${w.dir2}`),C.push({type:"curve-curve",straightLength:0,radius:w.radius,curveDirection:w.dir1,curveDirection2:w.dir2,arcAngle:w.arcAngle,P1:e,D1:t,P2:n,D2:s}))}return C.length===0?(Y.debug(`No valid flex connect solution found at line ${r}`),Y.debug(`  P1: (${e.x.toFixed(2)}, ${e.z.toFixed(2)}), D1: (${t.x.toFixed(3)}, ${t.z.toFixed(3)})`),Y.debug(`  P2: (${n.x.toFixed(2)}, ${n.z.toFixed(2)}), D2: (${s.x.toFixed(3)}, ${s.z.toFixed(3)})`),null):(C.sort((w,A)=>w.type==="straight-only"?-1:A.type==="straight-only"?1:w.type==="curve-only"&&A.type!=="curve-only"?-1:A.type==="curve-only"&&w.type!=="curve-only"?1:A.radius-w.radius),C[0])}solveStraightCurve(e,t,n,s){const r=t.x-n.x,a=t.z-n.z,o=e.x*a-e.z*r;if(Math.abs(o)<1e-4)return null;const c=(s.x*a-s.z*r)/o,l=(e.x*s.z-e.z*s.x)/o;return{L:c,R:l}}solveCurveStraight(e,t,n,s){const r=e.x,a=e.z,o=t.x-n.x,c=t.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=(s.x*c-s.z*o)/l,u=(r*s.z-a*s.x)/l;return{L:h,R:u}}solveCurveCurve(e,t){const r=270*Math.PI/180,a=t.x*e.x+t.z*e.z,o=this.perpRight(e),c=t.x*o.x+t.z*o.z;if(Y.debug(`  [curve-curve] f=${a.toFixed(2)}, h=${c.toFixed(2)}`),a<=.1)return Y.debug(`  [curve-curve] rejected: f=${a.toFixed(2)} <= 0.1 (P2 not ahead of P1)`),null;if(Math.abs(c)<.1)return Y.debug(`  [curve-curve] rejected: |h|=${Math.abs(c).toFixed(2)} < 0.1 (no lateral offset)`),null;const l=2*Math.atan(Math.abs(c)/a),h=Math.sin(l);if(Math.abs(h)<1e-4)return Y.debug("  [curve-curve] rejected: sin(θ) ≈ 0"),null;const u=a/(2*h);if(Y.debug(`  [curve-curve] θ=${(l*180/Math.PI).toFixed(1)}°, R=${u.toFixed(2)}"`),u<5)return Y.debug(`  [curve-curve] rejected: R=${u.toFixed(2)} < 5`),null;if(l>r)return Y.debug(`  [curve-curve] rejected: θ=${(l*180/Math.PI).toFixed(1)}° > 270°`),null;const d=c>0?"right":"left";return{radius:u,arcAngle:l,dir1:d,dir2:d==="right"?"left":"right"}}createFlexPieces(e,t,n,s,r,a,o,c){const l=`flex_${this.state.nextPieceId}`,h=`${a}_${o}_str`,u=`${a}_${o}_crv`;if(e.type==="straight-only"){const d=this.createFlexStraightArchetype(l+"_str",e.straightLength);Zt(d);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:h};this.state.labeledPieces.set(h,f),this.addConnection(t,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),Y.debug(`Flex connect at line ${c}: straight-only(${e.straightLength.toFixed(2)}") labeled "${h}"`)}else if(e.type==="curve-only"){const d=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2);Zt(d);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:u};this.state.labeledPieces.set(u,f),this.addConnection(t,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),Y.debug(`Flex connect at line ${c}: curve-only(R=${e.radius.toFixed(2)}", ${e.curveDirection}) labeled "${u}"`)}else if(e.type==="straight-curve"){const d=this.createFlexStraightArchetype(l+"_str",e.straightLength),f=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2);Zt(d),Zt(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:h},_={x:e.P1.x+e.D1.x*e.straightLength,y:0,z:e.P1.z+e.D1.z*e.straightLength},p={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:u};this.state.labeledPieces.set(h,g),this.state.labeledPieces.set(u,p),this.addConnection(t,n,g,"in"),this.addConnection(g,"out",p,"in"),this.addConnection(p,"out",s,r),this.state.pieces.push(g,p),Y.debug(`Flex connect at line ${c}: straight(${e.straightLength.toFixed(2)}") labeled "${h}" + ${e.curveDirection} curve(R=${e.radius.toFixed(2)}") labeled "${u}"`)}else if(e.type==="curve-straight"){const d=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2),f=this.createFlexStraightArchetype(l+"_str",e.straightLength);Zt(d),Zt(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:u},_={x:e.P2.x-e.D2.x*e.straightLength,y:0,z:e.P2.z-e.D2.z*e.straightLength},p={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(e.D2.z,e.D2.x),connections:new Map,label:h};this.state.labeledPieces.set(u,g),this.state.labeledPieces.set(h,p),this.addConnection(t,n,g,"in"),this.addConnection(g,"out",p,"in"),this.addConnection(p,"out",s,r),this.state.pieces.push(g,p),Y.debug(`Flex connect at line ${c}: ${e.curveDirection} curve(R=${e.radius.toFixed(2)}") labeled "${u}" + straight(${e.straightLength.toFixed(2)}") labeled "${h}"`)}else{const d=`${a}_${o}_crv1`,f=`${a}_${o}_crv2`,g=e.arcAngle,_=e.curveDirection,p=e.curveDirection2,m=_==="left"?1:-1,x=Math.cos(m*g),v=Math.sin(m*g),S={x:e.D1.x*x-e.D1.z*v,y:0,z:e.D1.x*v+e.D1.z*x},C=_==="right"?1:-1,w=this.perpRight(e.D1),A={x:e.P1.x+e.D1.x*e.radius*Math.sin(g)+w.x*e.radius*(1-Math.cos(g))*C,y:0,z:e.P1.z+e.D1.z*e.radius*Math.sin(g)+w.z*e.radius*(1-Math.cos(g))*C},N=this.createFlexCurveArchetype(l+"_crv1",e.radius,_,e.D1,S),E=this.createFlexCurveArchetype(l+"_crv2",e.radius,p,S,e.D2);Zt(N),Zt(E);const b={id:`piece_${this.state.nextPieceId++}`,archetypeCode:N.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:d},F={id:`piece_${this.state.nextPieceId++}`,archetypeCode:E.code,position:{...A},rotation:Math.atan2(S.z,S.x),connections:new Map,label:f};this.state.labeledPieces.set(d,b),this.state.labeledPieces.set(f,F),this.addConnection(t,n,b,"in"),this.addConnection(b,"out",F,"in"),this.addConnection(F,"out",s,r),this.state.pieces.push(b,F),Y.debug(`Flex connect at line ${c}: S-curve ${_} curve(R=${e.radius.toFixed(2)}", θ=${(g*180/Math.PI).toFixed(1)}°) labeled "${d}" + ${p} curve labeled "${f}"`)}}createFlexStraightArchetype(e,t){return{code:e,aliases:[],sections:[{splinePoints:[j(0,0),j(t,0)]}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:j(t,0),direction:j(1,0),sectionIndices:[0]}]}}createFlexCurveArchetype(e,t,n,s,r){const a=Math.atan2(s.z,s.x);let c=Math.atan2(r.z,r.x)-a;for(;c>Math.PI;)c-=2*Math.PI;for(;c<-Math.PI;)c+=2*Math.PI;const l=c>=0?"left":"right";n!==l&&Math.abs(c)<Math.PI/2||n!==l&&(n==="left"?c+=2*Math.PI:c-=2*Math.PI);const h=Math.abs(c*180/Math.PI),u=Math.max(3,Math.ceil(h/5)+1),d=[],f=Math.abs(c);for(let p=0;p<u;p++){const x=p/(u-1)*f;n==="left"?d.push(j(t*Math.sin(x),t*(1-Math.cos(x)))):d.push(j(t*Math.sin(x),-t*(1-Math.cos(x))))}const g=d[d.length-1];let _;return n==="left"?_=j(Math.cos(f),Math.sin(f)):_=j(Math.cos(f),-Math.sin(f)),{code:e,aliases:[],sections:[{splinePoints:d}],connectionPoints:[{name:"in",position:j(0,0),direction:j(-1,0),sectionIndices:[0]},{name:"out",position:g,direction:_,sectionIndices:[0]}]}}addConnection(e,t,n,s){const r=e.connections.get(t)||[];r.push({pieceId:n.id,pointName:s}),e.connections.set(t,r);const a=n.connections.get(s)||[];a.push({pieceId:e.id,pointName:t}),n.connections.set(s,a)}performSplice(e){let t,n;if(e.label){if(t=this.state.labeledPieces.get(e.label),!t)throw new Error(`Unknown label '${e.label}' in splice at line ${e.line}`);n=e.point||"out"}else{if(!e.currentPieceId)throw new Error(`No current piece for splice at line ${e.line}`);if(t=this.state.pieces.find(f=>f.id===e.currentPieceId),!t)throw new Error(`Current piece not found for splice at line ${e.line}`);n=e.currentPointName||"out"}const s=nt(t.archetypeCode),r=this.getConnectionPoint(s,n);if(!r)throw new Error(`Connection point '${n}' not found on piece at line ${e.line}`);const a=this.rotatePoint(r.position,t.rotation),o={x:t.position.x+a.x,y:0,z:t.position.z+a.z},c=this.rotatePoint(r.direction,t.rotation),l=2;let h=null,u=0,d=.5;for(const f of this.state.pieces){if(f.id===t.id)continue;const g=nt(f.archetypeCode);for(let _=0;_<g.sections.length;_++){const p=g.sections[_];if(p.splinePoints.length<2)continue;const m=p.splinePoints.map(v=>{const S=this.rotatePoint(v,f.rotation);return{x:f.position.x+S.x,y:0,z:f.position.z+S.z}}),x=this.findClosestPointOnSpline(m,o);if(x.distance<=l){h=f,u=_,d=x.t;break}}if(h)break}if(!h){const f=e.label?`$${e.label}.${n}`:`current piece .${n}`;Y.warn(`No track found at splice point ${f} (world pos: ${o.x.toFixed(2)}, ${o.z.toFixed(2)}) at line ${e.line}`),t.label=(t.label?t.label+" ":"")+"can't splice";return}this.splitPieceAt(h,u,d,o,c,e.line)}findClosestPointOnSpline(e,t){let n=0,s=1/0;const r=e.length-1;for(let a=0;a<r;a++){const o=e[a],c=e[a+1],l=c.x-o.x,h=c.z-o.z,u=l*l+h*h;if(u===0)continue;let d=((t.x-o.x)*l+(t.z-o.z)*h)/u;d=Math.max(0,Math.min(1,d));const f=o.x+d*l,g=o.z+d*h,_=Math.sqrt((t.x-f)**2+(t.z-g)**2);_<s&&(s=_,n=(a+d)/r)}return{t:n,distance:s}}splitPieceAt(e,t,n,s,r,a){const o=nt(e.archetypeCode),l=o.sections[t].splinePoints,h=l.length-1,u=Math.floor(n*h),d=n*h-u,f=l[Math.min(u,l.length-1)],g=l[Math.min(u+1,l.length-1)],_={x:f.x+d*(g.x-f.x),y:0,z:f.z+d*(g.z-f.z)},p={x:g.x-f.x,y:0,z:g.z-f.z},m=Math.sqrt(p.x**2+p.z**2);m>0&&(p.x/=m,p.z/=m);const x=[];for(let P=0;P<=u;P++)x.push({...l[P]});x.push(_);const v=[_];for(let P=u+1;P<l.length;P++)v.push({...l[P]});const S=o.connectionPoints.find(P=>P.name==="in"),C=o.connectionPoints.find(P=>P.name==="out");if(!S||!C)throw new Error(`Cannot splice piece without 'in' and 'out' connection points at line ${a}`);const w=`splice_${this.state.nextPieceId}`,A={code:`${w}_a`,aliases:[],sections:[{splinePoints:x}],connectionPoints:[{...S,sectionIndices:[0]},{name:"out",position:_,direction:p,sectionIndices:[0]}]},N={code:`${w}_b`,aliases:[],sections:[{splinePoints:v}],connectionPoints:[{name:"in",position:_,direction:{x:-p.x,y:0,z:-p.z},sectionIndices:[0]},{...C,sectionIndices:[0]}]};Zt(A),Zt(N);const E={id:`piece_${this.state.nextPieceId++}`,archetypeCode:A.code,position:{...e.position},rotation:e.rotation,connections:new Map},b={id:`piece_${this.state.nextPieceId++}`,archetypeCode:N.code,position:{...e.position},rotation:e.rotation,connections:new Map},F=e.connections.get("in");if(F){E.connections.set("in",[...F]);for(const P of F){const U=this.state.pieces.find(O=>O.id===P.pieceId);if(U){const O=U.connections.get(P.pointName);if(O)for(const X of O)X.pieceId===e.id&&(X.pieceId=E.id)}}}const $=e.connections.get("out");if($){b.connections.set("out",[...$]);for(const P of $){const U=this.state.pieces.find(O=>O.id===P.pieceId);if(U){const O=U.connections.get(P.pointName);if(O)for(const X of O)X.pieceId===e.id&&(X.pieceId=b.id)}}}E.connections.set("out",[{pieceId:b.id,pointName:"in"}]),b.connections.set("in",[{pieceId:E.id,pointName:"out"}]),e.label&&(E.label=e.label,this.state.labeledPieces.set(e.label,E));const ee=this.state.pieces.indexOf(e);ee>=0&&this.state.pieces.splice(ee,1,E,b)}detectAutoConnections(){const n=[];for(const o of this.state.pieces){const c=nt(o.archetypeCode);for(const l of c.connectionPoints){const h=this.rotatePoint(l.position,o.rotation),u=this.rotatePoint(l.direction,o.rotation);n.push({piece:o,pointName:l.name,worldPos:{x:o.position.x+h.x,y:0,z:o.position.z+h.z},worldDir:u})}}const s=[],r=new Map;for(const o of n){let c=null;for(const l of s){for(const h of l){const u=o.worldPos.x-h.worldPos.x,d=o.worldPos.z-h.worldPos.z;if(Math.sqrt(u*u+d*d)<=.5){c=l;break}}if(c)break}if(c)c.push(o),r.set(o,c);else{const l=[o];s.push(l),r.set(o,l)}}let a=!0;for(;a;){a=!1;for(let o=0;o<s.length&&!a;o++)for(let c=o+1;c<s.length&&!a;c++)e:for(const l of s[o])for(const h of s[c]){const u=l.worldPos.x-h.worldPos.x,d=l.worldPos.z-h.worldPos.z;if(Math.sqrt(u*u+d*d)<=.5){for(const g of s[c])s[o].push(g),r.set(g,s[o]);s.splice(c,1),a=!0;break e}}}for(const o of s)if(!(o.length<2))for(let c=0;c<o.length;c++)for(let l=c+1;l<o.length;l++){const h=o[c],u=o[l];if(h.piece.id===u.piece.id||(h.piece.connections.get(h.pointName)||[]).some(m=>m.pieceId===u.piece.id&&m.pointName===u.pointName)||h.worldDir.x*u.worldDir.x+h.worldDir.z*u.worldDir.z>-1+.1)continue;const _=h.piece.connections.get(h.pointName)||[];_.push({pieceId:u.piece.id,pointName:u.pointName,isAutoConnect:!0}),h.piece.connections.set(h.pointName,_);const p=u.piece.connections.get(u.pointName)||[];p.push({pieceId:h.piece.id,pointName:h.pointName,isAutoConnect:!0}),u.piece.connections.set(u.pointName,p)}}markTunnelSections(){const e=this.state.pieces.filter(n=>n.archetypeCode==="tun"||n.archetypeCode==="tunnel"),t=new Set;for(const n of e){if(t.has(n.id))continue;const s=[],r=this.findTunnelPath(n.id,"out",s,new Set);if(r&&r!==n.id){t.add(r);for(const a of s){const o=this.state.pieces.find(c=>c.id===a);o&&(o.inTunnel=!0)}}}}findTunnelPath(e,t,n,s){const r=this.state.pieces.find(o=>o.id===e);if(!r)return null;const a=r.connections.get(t);if(!a||a.length===0)return null;for(const o of a){const c=`${o.pieceId}.${o.pointName}`;if(s.has(c))continue;s.add(c);const l=this.state.pieces.find(d=>d.id===o.pieceId);if(!l)continue;if(l.archetypeCode==="tun"||l.archetypeCode==="tunnel")return l.id;n.push(o.pieceId);const h=o.pointName==="in"?"out":o.pointName==="out"?"in":o.pointName==="in1"?"out1":o.pointName==="out1"?"in1":o.pointName==="in2"?"out2":"in2",u=this.findTunnelPath(o.pieceId,h,n,s);if(u)return u;n.pop()}return null}}function ir(i){return i.travelDirection==="forward"?i.cars[0]:i.cars[i.cars.length-1]}function bx(i){return i.travelDirection==="forward"?i.cars.length-1:0}function yi(i,e){return`${i}.${e}`}function dl(i){const e=i.lastIndexOf(".");return{pieceId:i.substring(0,e),pointName:i.substring(e+1)}}class Tx{constructor(e=10,t=2){pe(this,"locks",new Map);pe(this,"trainStates",new Map);pe(this,"minLockDistance");pe(this,"minLockCount");this.minLockDistance=e,this.minLockCount=t}getTrainState(e){let t=this.trainStates.get(e);return t||(t={heldLocks:new Set},this.trainStates.set(e,t)),t}isLocked(e){return this.locks.has(e)}isLockedByOther(e,t){const n=this.locks.get(e);return n!==void 0&&n.trainId!==t}isBlockedBySemaphore(e,t){var r;const n=dl(e),s=t.pieces.find(a=>a.id===n.pieceId);return!!((r=s==null?void 0:s.semaphoreConfig)!=null&&r.locked)}getTrainLocks(e){return this.getTrainState(e).heldLocks}tryAcquireLocks(e,t,n,s){const r=[],a=this.getTrainState(e);for(const o of t){if(s&&this.isBlockedBySemaphore(o,s))return Y.debug(`Train ${e} blocked at ${o} by locked semaphore`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:"semaphore"};const c=this.locks.get(o);if(c&&c.trainId!==e)return Y.debug(`Train ${e} blocked at ${o} by ${c.trainId}`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:c.trainId};c||(this.locks.set(o,{trainId:e,acquiredAt:n}),a.heldLocks.add(o),r.push(o),Y.debug(`Train ${e} acquired lock on ${o}`))}return{success:!0,acquired:r,requested:[]}}releaseLock(e,t){const n=this.locks.get(t);if(n&&n.trainId===e){this.locks.delete(t);const s=this.trainStates.get(e);return s&&s.heldLocks.delete(t),Y.debug(`Train ${e} released lock on ${t}`),!0}return!1}releaseAllLocks(e){const t=this.trainStates.get(e);if(t){for(const n of t.heldLocks)this.locks.delete(n);t.heldLocks.clear(),Y.debug(`Train ${e} released all locks`)}}acquireLeadingLocks(e,t,n,s){const r=ir(e),a=t.pieces.find(x=>x.id===r.currentPieceId);if(!a)return Y.debug(`acquireLeadingLocks: No piece found for ${r.currentPieceId}`),{success:!1,acquired:[],requested:[]};const o=[];let c=0;const l=e.travelDirection;let h=r.currentPieceId,u=a,d=l==="forward"?"out":"in";const f=nt(a.archetypeCode);f&&(f.code==="x90"||f.code==="x45")&&(r.entryPoint==="in1"||r.entryPoint==="out1"?d=l==="forward"?"out1":"in1":(r.entryPoint==="in2"||r.entryPoint==="out2")&&(d=l==="forward"?"out2":"in2"));const g=Cn(u,0);let _;if(l==="forward"?_=Math.max(0,g-r.distanceAlongSection):_=Math.max(0,r.distanceAlongSection),Y.debug(`acquireLeadingLocks: train=${e.id}, leadCar on ${h}, entryPoint=${r.entryPoint}, travelDir=${l}, exitPoint=${d}, sectionLen=${g.toFixed(1)}, distAlong=${r.distanceAlongSection.toFixed(1)}, distOnCurrent=${_.toFixed(1)}`),u.internalConnectionPoints)for(const x of u.internalConnectionPoints)(l==="forward"?x.distance>r.distanceAlongSection:x.distance<r.distanceAlongSection)&&(o.push(x.id),Y.debug(`  Adding internal point ${x.id} at distance ${x.distance.toFixed(1)}`));o.push(yi(h,d));let p=0;for(Y.debug(`  Scan ahead: minDist=${this.minLockDistance}, minCount=${this.minLockCount}`);(c<this.minLockDistance||o.length<this.minLockCount)&&p<30;){p++,c+=_;const x=nr(h,d,t,n,e.routesTaken,void 0,l);if(Y.debug(`  Loop ${p}: from ${h}.${d}, nextSection=${x?`${x.pieceId}.${x.entryPoint}`:"null"}, distCovered=${c.toFixed(1)}, points=${o.length}`),!x){Y.debug(`  Dead end at ${h}.${d}`);break}o.push(yi(x.pieceId,x.entryPoint));const v=t.pieces.find(w=>w.id===x.pieceId);if(!v)break;h=x.pieceId,u=v;const S=nt(v.archetypeCode);let C=!0;if(S&&(S.code==="x90"||S.code==="x45")?x.entryPoint==="in1"?(d="out1",C=!0):x.entryPoint==="out1"?(d="in1",C=!1):x.entryPoint==="in2"?(d="out2",C=!0):(d="in2",C=!1):(d=Qo(x.entryPoint),C=ti(x.entryPoint)),v.internalConnectionPoints){const w=[...v.internalConnectionPoints].sort((A,N)=>C?A.distance-N.distance:N.distance-A.distance);for(const A of w)o.push(A.id),Y.debug(`  Adding internal point ${A.id} on piece ${h}`)}o.push(yi(h,d)),_=Cn(v,0)}Y.debug(`  Final pointsToLock (${o.length}): ${o.join(", ")}`);const m=this.tryAcquireLocks(e.id,o,s,t);return m.requested=o,Y.debug(`  Lock result: success=${m.success}, acquired=${m.acquired.length}, blocked=${m.blocked||"none"}`),m}calculateStraddledPoints(e,t){const n=new Set;for(const s of e.cars){const r=t.pieces.find(u=>u.id===s.currentPieceId);if(!r)continue;const a=nt(r.archetypeCode);if(!a)continue;const o=Cn(r,0),c=s.length/2,l=s.distanceAlongSection+c,h=s.distanceAlongSection-c;for(const u of a.connectionPoints){const d=ti(u.name)?0:o;h<=d&&l>=d&&n.add(yi(r.id,u.name))}if(r.internalConnectionPoints)for(const u of r.internalConnectionPoints)h<=u.distance&&l>=u.distance&&n.add(u.id)}return Array.from(n)}releaseTrailingLocks(e,t,n,s){const r=this.getTrainState(e.id),a=new Set;for(const h of e.cars)a.add(h.currentPieceId);const o=new Set;for(const h of a){const u=t.pieces.find(f=>f.id===h);if(!u)continue;const d=nt(u.archetypeCode);if(d){for(const f of d.connectionPoints)o.add(yi(h,f.name));if(u.internalConnectionPoints)for(const f of u.internalConnectionPoints)o.add(f.id)}}const c=this.acquireLeadingLocks(e,t,n,s);for(const h of c.requested)o.add(h);const l=[];for(const h of r.heldLocks)o.has(h)||l.push(h);for(const h of l)this.releaseLock(e.id,h)}isJunctionLocked(e){const t=e.match(/^junction\.(.+)\.(fwd|bwd)$/);if(!t)return!1;const n=t[1],s=dl(n),r=yi(s.pieceId,s.pointName);return this.isLocked(r)}getAllLockedPoints(){return new Map(this.locks)}clear(){this.locks.clear(),this.trainStates.clear()}}const wx=12,Ax=6,Cx=12,Rx=24,fl=3;function Ch(i){return i!==void 0&&typeof i=="object"&&"min"in i&&"max"in i}function js(i,e){return i===void 0?e:Ch(i)?Math.floor(Math.random()*(i.max-i.min+1))+i.min:i}function Px(i,e){return i===void 0?e:Ch(i)?Math.random()*(i.max-i.min)+i.min:i}class Lx{constructor(e,t,n){pe(this,"trains",[]);pe(this,"layout");pe(this,"running",!1);pe(this,"lastTime",0);pe(this,"animationId",null);pe(this,"simulationTime",0);pe(this,"onUpdate");pe(this,"selectedRoutes");pe(this,"nextTrainId",1);pe(this,"nextCarId",1);pe(this,"resolvedFrequencies",new Map);pe(this,"lockManager");pe(this,"animationLoop",e=>{if(!this.running)return;const t=(e-this.lastTime)/1e3;this.lastTime=e;const n=Math.min(t,.1);this.simulationTime+=n,this.checkSpawning(),this.updateTrains(n),this.checkRemovals(),this.onUpdate(),this.animationId=requestAnimationFrame(this.animationLoop)});var s,r;this.layout=e,this.selectedRoutes=t,this.onUpdate=n,this.lockManager=new Tx((s=e.lockAheadDistance)!=null?s:10,(r=e.lockAheadCount)!=null?r:2)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationLoop(this.lastTime),Y.info("Simulation started"))}stop(){this.running=!1,this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),Y.info("Simulation stopped")}getLockedPoints(){var t;const e=new Set(this.lockManager.getAllLockedPoints().keys());for(const n of this.layout.pieces)(t=n.semaphoreConfig)!=null&&t.locked&&(e.add(`${n.id}.in`),e.add(`${n.id}.out`));return Y.debug("Locked points:",Array.from(e)),e}reset(){this.trains=[],this.simulationTime=0,this.resolvedFrequencies.clear(),this.lockManager.clear();for(const e of this.layout.pieces)e.genConfig&&(e.genConfig.lastSpawnTime=-1/0,e.genConfig.enabled=!0);this.onUpdate(),Y.info("Simulation reset")}getTrains(){return this.trains}toggleGenerator(e){const t=this.layout.pieces.find(n=>n.id===e);t!=null&&t.genConfig&&(t.genConfig.enabled=!t.genConfig.enabled,Y.info(`Generator ${e} toggled: ${t.genConfig.enabled}`))}clearResolvedFrequency(e){this.resolvedFrequencies.delete(e)}checkSpawning(){for(const e of this.layout.pieces){if(!e.genConfig||!e.genConfig.enabled)continue;const t=e.genConfig,n=this.simulationTime-t.lastSpawnTime;if(t.frequency===void 0)t.lastSpawnTime===-1/0&&(this.spawnTrain(e),t.lastSpawnTime=this.simulationTime,t.enabled=!1);else{let s;if(typeof t.frequency=="number")s=t.frequency;else{let r=this.resolvedFrequencies.get(e.id);r===void 0&&(r=js(t.frequency,10),this.resolvedFrequencies.set(e.id,r)),s=r}n>=s&&this.spawnTrain(e)&&(t.lastSpawnTime=this.simulationTime,this.resolvedFrequencies.set(e.id,js(t.frequency,10)))}}}canSpawnTrain(){var t;const e=(t=this.layout.maxTrains)!=null?t:5;return this.trains.length<e}spawnTrain(e){var d;if(!e.genConfig)return!1;if(!this.canSpawnTrain())return Y.debug(`Cannot spawn train - at max trains limit (${this.layout.maxTrains})`),!1;const t=e.id;for(const f of this.trains)if(f.cars.some(g=>g.currentPieceId===t))return Y.debug(`Cannot spawn train - generator ${t} still occupied`),!1;const n=e.genConfig,s=js(n.cabCount,1),r=js(n.carCount,5),a=Px(n.speed,wx),o={id:`train_${this.nextTrainId++}`,cars:[],desiredSpeed:a,currentSpeed:0,generatorId:e.id,routesTaken:new Map,travelDirection:"forward",coupling:!1,couplingSpeed:fl},c=Cn(e,0);if(c===0)return Y.debug(`Generator ${e.id} has no internal section`),!1;let l=c;hx();for(let f=0;f<s;f++){l-=er/2;const g={id:`car_${this.nextCarId++}`,type:"cab",length:er,currentPieceId:e.id,distanceAlongSection:l,visible:!1,worldPosition:nl(0,0,0),rotation:0,facingForward:!0,sectionDirection:1};o.cars.push(g),l-=er/2+_o}const h=(d=n.colorMode)!=null?d:"gray";for(let f=0;f<r;f++){l-=tr/2;const g={id:`car_${this.nextCarId++}`,type:"car",length:tr,currentPieceId:e.id,distanceAlongSection:l,visible:!1,worldPosition:nl(0,0,0),rotation:0,color:lx(h),facingForward:!0,sectionDirection:1};o.cars.push(g),l-=tr/2+_o}for(const f of o.cars)Fo(f,this.layout);const u=this.lockManager.acquireLeadingLocks(o,this.layout,this.selectedRoutes,this.simulationTime);return u.success||Y.debug(`Train ${o.id} spawned but blocked at ${u.blocked} by ${u.blockingTrainId} - will wait`),this.trains.push(o),Y.info(`Spawned train ${o.id} with ${o.cars.length} cars`),!0}updateTrains(e){const t=new Set;for(const n of this.trains){if(t.has(n.id))continue;const s=this.lockManager.acquireLeadingLocks(n,this.layout,this.selectedRoutes,this.simulationTime);n.coupling?n.currentSpeed=n.couplingSpeed:s.success?n.currentSpeed>n.desiredSpeed?n.currentSpeed=Math.max(n.desiredSpeed,n.currentSpeed-Cx*e):n.currentSpeed<n.desiredSpeed&&(n.currentSpeed=Math.min(n.desiredSpeed,n.currentSpeed+Ax*e)):n.currentSpeed=Math.max(0,n.currentSpeed-Rx*e);const r=n.currentSpeed*e,a=n.travelDirection==="forward"?r:-r,o=new Set,c=bx(n);for(let l=0;l<n.cars.length;l++){const h=l===c;ox(n.cars[l],a,this.layout,this.selectedRoutes,n.routesTaken,h?o:void 0)}for(const l of o)n.routesTaken.delete(l),Y.debug(`Cleared route memory: ${l} for train ${n.id}`);if(n.coupling){const l=this.checkCouplingContact(n);l&&t.add(l)}this.lockManager.releaseTrailingLocks(n,this.layout,this.selectedRoutes,this.simulationTime);for(const l of n.cars)this.updateCarVisibility(l)}t.size>0&&(this.trains=this.trains.filter(n=>!t.has(n.id)))}updateCarVisibility(e){const t=this.layout.pieces.find(s=>s.id===e.currentPieceId);if(!t)return;const n=nt(t.archetypeCode);n&&(n.code==="gen"||n.code==="bin"||t.inTunnel?e.visible=!1:e.visible=!0)}checkRemovals(){this.trains=this.trains.filter(e=>e.cars.every(n=>{const s=this.layout.pieces.find(a=>a.id===n.currentPieceId);if(!s)return!1;const r=nt(s.archetypeCode);return(r==null?void 0:r.code)==="bin"})?(this.lockManager.releaseAllLocks(e.id),Y.info(`Removing train ${e.id} - all cars in bin`),!1):!0)}startCoupling(e){const t=this.trains.find(n=>n.id===e);return t?t.currentSpeed!==0?(Y.info(`Cannot start coupling for train ${e} - still moving`),!1):(t.coupling=!0,Y.info(`Train ${e} entering coupling mode`),!0):!1}checkCouplingContact(e){const t=ir(e);for(const n of this.trains)if(n.id!==e.id&&n.currentSpeed===0)for(const s of n.cars){const r=t.worldPosition.x-s.worldPosition.x,a=t.worldPosition.z-s.worldPosition.z,o=Math.sqrt(r*r+a*a),c=(t.length+s.length)/2+_o;if(o<=c)return this.coupleTrains(e,n),n.id}return null}coupleTrains(e,t){Y.info(`Coupling train ${e.id} with train ${t.id}`);const n=ir(e),s=n.currentPieceId,r=t.cars[0],a=t.cars[t.cars.length-1],o=r.currentPieceId===s?Math.abs(n.distanceAlongSection-r.distanceAlongSection):1/0,c=a.currentPieceId===s?Math.abs(n.distanceAlongSection-a.distanceAlongSection):1/0;e.travelDirection==="forward"?c<=o?e.cars=[...t.cars,...e.cars]:e.cars=[...t.cars.slice().reverse(),...e.cars]:o<=c?e.cars=[...e.cars,...t.cars]:e.cars=[...e.cars,...t.cars.slice().reverse()],e.currentSpeed=0,e.coupling=!1;for(const h of e.cars)h.previousPieceId=void 0;e.routesTaken.clear();const l=this.lockManager.getTrainLocks(t.id);for(const h of l)this.lockManager.releaseLock(t.id,h);this.lockManager.acquireLeadingLocks(e,this.layout,this.selectedRoutes,this.simulationTime),Y.info(`Combined train ${e.id} now has ${e.cars.length} cars`)}reverseTrain(e){const t=this.trains.find(n=>n.id===e);if(!t)return!1;if(t.currentSpeed!==0)return Y.info(`Cannot reverse train ${e} - still moving`),!1;t.travelDirection=t.travelDirection==="forward"?"backward":"forward";for(const n of t.cars)n.previousPieceId=void 0;return t.routesTaken.clear(),this.lockManager.releaseAllLocks(t.id),this.lockManager.acquireLeadingLocks(t,this.layout,this.selectedRoutes,this.simulationTime),Y.info(`Train ${e} reversed to ${t.travelDirection}`),!0}activateDecoupler(e){const t=this.layout.pieces.find(n=>n.id===e);if(!t||!t.decouplerConfig)return null;for(const n of this.trains)if(n.currentSpeed===0)for(let s=0;s<n.cars.length-1;s++){const r=n.cars[s],a=n.cars[s+1];if(this.isCouplerNearDecoupler(r,a,t))return this.splitTrain(n,s+1)}return Y.info(`Decoupler ${e}: no stopped train found straddling this position`),null}isCouplerNearDecoupler(e,t,n){const r=n.position.x,a=n.position.z,o=(e.worldPosition.x+t.worldPosition.x)/2,c=(e.worldPosition.z+t.worldPosition.z)/2;return Math.sqrt((o-r)*(o-r)+(c-a)*(c-a))<=2}splitTrain(e,t){const n=e.cars.slice(0,t),s=e.cars.slice(t);Y.info(`Splitting train ${e.id} at index ${t}: ${n.length} front cars, ${s.length} rear cars`);const r={id:`train_${this.nextTrainId++}`,cars:s,desiredSpeed:0,currentSpeed:0,generatorId:e.generatorId,routesTaken:new Map,travelDirection:e.travelDirection,coupling:!1,couplingSpeed:fl};return e.cars=n,e.currentSpeed=0,e.desiredSpeed=0,this.lockManager.releaseAllLocks(e.id),this.lockManager.acquireLeadingLocks(e,this.layout,this.selectedRoutes,this.simulationTime),this.lockManager.acquireLeadingLocks(r,this.layout,this.selectedRoutes,this.simulationTime),this.trains.push(r),Y.info(`Created new train ${r.id} from split`),r.id}isJunctionLocked(e){return this.lockManager.isJunctionLocked(e)}findNextSwitch(e){const t=this.trains.find(u=>u.id===e);if(!t)return null;const n=ir(t),s=this.layout.pieces.find(u=>u.id===n.currentPieceId);if(!s)return null;const r=t.travelDirection;let a=n.currentPieceId,o=s,c=r==="forward"?"out":"in";const l=nt(s.archetypeCode);l&&(l.code==="x90"||l.code==="x45")&&(n.entryPoint==="in1"||n.entryPoint==="out1"?c=r==="forward"?"out1":"in1":(n.entryPoint==="in2"||n.entryPoint==="out2")&&(c=r==="forward"?"out2":"in2"));let h;for(let u=0;u<50;u++){const d=o.connections.get(c);if(!d||d.length===0)return null;const f=d.filter(C=>C.pieceId!==h);if(f.length===0)return null;const g=f.filter(C=>ti(C.pointName)),_=f.filter(C=>dr(C.pointName));let p,m;if(r==="backward"?_.length>0?(p=_,m="bwd"):(p=g,m="fwd"):g.length>0?(p=g,m="fwd"):(p=_,m="bwd"),p.length===0&&(p=f,m="fwd"),p.length>1){const C=d.map(b=>`${b.pieceId}.${b.pointName}`);C.push(`${a}.${c}`),C.sort();const A=`junction.${C[0]}.${m}`,N=this.computeSpatialLabels(o,c,p);let E;return t.routesTaken.has(A)&&(E=t.routesTaken.get(A)),{routeKey:A,options:N,currentOverride:E}}const x=p[0],v=this.layout.pieces.find(C=>C.id===x.pieceId);if(!v)return null;h=a,a=x.pieceId,o=v;const S=nt(v.archetypeCode);S&&(S.code==="x90"||S.code==="x45")?x.pointName==="in1"?c="out1":x.pointName==="out1"?c="in1":x.pointName==="in2"?c="out2":c="in2":c=Qo(x.pointName)}return null}computeSpatialLabels(e,t,n){const s=[];for(let o=0;o<n.length;o++){const c=n[o],l=this.layout.pieces.find(p=>p.id===c.pieceId);if(!l){s.push({index:o,group:1,radiusKey:0});continue}const u=l.archetypeCode.toLowerCase().match(/^crv([lr])(\d+)?$/);if(!u){s.push({index:o,group:1,radiusKey:0});continue}const d=u[1],f=u[2]?parseInt(u[2],10):22,g=c.pointName.startsWith("in");let _;g?_=d==="l":_=d==="r",_?s.push({index:o,group:0,radiusKey:f}):s.push({index:o,group:2,radiusKey:-f})}s.sort((o,c)=>o.group-c.group||o.radiusKey-c.radiusKey);const r=s.length,a=[];for(let o=0;o<r;o++){let c;r===2?c=o===0?"Left":"Right":r===3?c=o===0?"Left":o===1?"Center":"Right":o===0?c="Left":o===r-1?c="Right":c=String(o+1),a.push({index:s[o].index,label:c})}return a}setTrainSwitchOverride(e,t,n){const s=this.trains.find(r=>r.id===e);s&&s.routesTaken.set(t,n)}clearTrainSwitchOverride(e,t){const n=this.trains.find(s=>s.id===e);n&&n.routesTaken.delete(t)}}class Ix{constructor(){pe(this,"container");pe(this,"widgets",[]);pe(this,"handleWidgetRemove",e=>{const t=this.widgets.indexOf(e);t!==-1&&this.widgets.splice(t,1)});const e=document.getElementById("inspector-container");if(!e)throw new Error("Inspector container not found");this.container=e}addWidget(e){if(this.hasWidgetForTarget(e.targetId))return;const t=this.widgets.filter(n=>!n.locked);for(const n of t)this.removeWidget(n);e.onRemove=()=>this.handleWidgetRemove(e),this.widgets.push(e),this.container.appendChild(e.element)}hasWidgetForTarget(e){return this.widgets.some(t=>t.targetId===e)}update(){const e=[...this.widgets];for(const t of e)t.update()}clear(){const e=[...this.widgets];for(const t of e)t.remove();this.widgets=[]}removeWidget(e){e.remove()}}class Rh{constructor(){pe(this,"element");pe(this,"locked",!0);pe(this,"contentEl");pe(this,"lockBtn");pe(this,"onRemove");this.element=document.createElement("div"),this.element.className="inspector-widget",this.contentEl=document.createElement("div"),this.contentEl.className="inspector-content",this.element.appendChild(this.contentEl);const e=document.createElement("div");e.className="inspector-buttons",this.element.appendChild(e),this.lockBtn=document.createElement("button"),this.lockBtn.className="inspector-btn inspector-lock-btn",this.lockBtn.textContent="🔒",this.lockBtn.title="Unlock widget",this.lockBtn.addEventListener("click",()=>this.toggleLock()),e.appendChild(this.lockBtn);const t=document.createElement("button");t.className="inspector-btn inspector-close-btn",t.textContent="✕",t.title="Close",t.addEventListener("click",()=>this.remove()),e.appendChild(t),this.buildContent()}toggleLock(){this.locked=!this.locked,this.lockBtn.textContent=this.locked?"🔒":"🔓",this.lockBtn.title=this.locked?"Unlock widget":"Lock widget"}remove(){this.dispose(),this.element.remove(),this.onRemove&&this.onRemove()}}class Dx extends Rh{constructor(t,n){super();pe(this,"trainId");pe(this,"simulation");pe(this,"idLabel");pe(this,"cabsLabel");pe(this,"carsLabel");pe(this,"speedLabel");pe(this,"slider");pe(this,"sliderValue");pe(this,"dirLabel");pe(this,"changeDirBtn");pe(this,"stopBtn");pe(this,"coupleBtn");pe(this,"savedSpeed",0);pe(this,"isStopped",!1);pe(this,"sliderActive",!1);pe(this,"switchContainer");pe(this,"switchButtons",[]);pe(this,"currentSwitchRouteKey",null);pe(this,"currentSwitchOptions",[]);pe(this,"selectedSwitchIndex");pe(this,"onSwitchRouteChanged");this.trainId=t,this.simulation=n,this.contentEl.innerHTML="",this.buildContent(),this.update()}get targetId(){return this.trainId}get typeLabel(){return"Train"}getTrain(){return this.simulation.getTrains().find(t=>t.id===this.trainId)}buildContent(){if(!this.trainId)return;const t=this.getTrain();if(!t)return;const n=(l,h)=>{const u=document.createElement("span");u.className="inspector-field";const d=document.createElement("span");d.className="inspector-field-label",d.textContent=l,u.appendChild(d),u.appendChild(h),this.contentEl.appendChild(u)},s=document.createElement("span");s.className="inspector-type-label",s.textContent="Train",this.contentEl.appendChild(s),this.idLabel=document.createElement("span"),this.idLabel.className="inspector-field-value",n("",this.idLabel),this.cabsLabel=document.createElement("span"),this.cabsLabel.className="inspector-field-value",n("Cabs:",this.cabsLabel),this.carsLabel=document.createElement("span"),this.carsLabel.className="inspector-field-value",n("Cars:",this.carsLabel),this.speedLabel=document.createElement("span"),this.speedLabel.className="inspector-field-value inspector-speed-value",n("Current Speed:",this.speedLabel);const r=document.createElement("span");r.className="inspector-field";const a=document.createElement("span");a.className="inspector-field-label",a.textContent="Target Speed:",r.appendChild(a);const o=document.createElement("button");o.className="inspector-btn inspector-speed-adj-btn",o.textContent="−",o.title="Decrease speed",o.addEventListener("click",()=>{const l=this.getTrain();if(l){const h=Math.max(0,Math.round(l.desiredSpeed)-1);l.desiredSpeed=h,this.slider.value=String(h),this.sliderValue.textContent=String(h),this.isStopped&&h>0&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn")}}),r.appendChild(o),this.slider=document.createElement("input"),this.slider.type="range",this.slider.className="inspector-slider",this.slider.min="0",this.slider.max="48",this.slider.step="1",this.slider.value=String(Math.round(t.desiredSpeed)),r.appendChild(this.slider),this.sliderValue=document.createElement("span"),this.sliderValue.className="inspector-field-value inspector-slider-value",r.appendChild(this.sliderValue);const c=document.createElement("button");c.className="inspector-btn inspector-speed-adj-btn",c.textContent="+",c.title="Increase speed",c.addEventListener("click",()=>{const l=this.getTrain();if(l){const h=Math.min(48,Math.round(l.desiredSpeed)+1);l.desiredSpeed=h,this.slider.value=String(h),this.sliderValue.textContent=String(h),this.isStopped&&h>0&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn")}}),r.appendChild(c),this.contentEl.appendChild(r),this.slider.addEventListener("input",()=>{const l=parseInt(this.slider.value,10),h=this.getTrain();h&&(h.desiredSpeed=l,this.sliderValue.textContent=String(l),this.isStopped&&l>0&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"))}),this.slider.addEventListener("mousedown",()=>{this.sliderActive=!0}),this.slider.addEventListener("mouseup",()=>{this.sliderActive=!1}),this.slider.addEventListener("touchstart",()=>{this.sliderActive=!0}),this.slider.addEventListener("touchend",()=>{this.sliderActive=!1}),this.dirLabel=document.createElement("span"),this.dirLabel.className="inspector-field-value",n("Direction:",this.dirLabel),this.changeDirBtn=document.createElement("button"),this.changeDirBtn.className="inspector-btn inspector-dir-btn",this.changeDirBtn.textContent="⇄",this.changeDirBtn.title="Change Direction",this.changeDirBtn.addEventListener("click",()=>{const l=this.getTrain();l&&l.currentSpeed===0&&(this.simulation.reverseTrain(this.trainId),l.desiredSpeed=0)}),this.contentEl.appendChild(this.changeDirBtn),this.stopBtn=document.createElement("button"),this.stopBtn.className="inspector-btn inspector-stop-btn",this.stopBtn.textContent="Stop",this.stopBtn.addEventListener("click",()=>{const l=this.getTrain();l&&(this.isStopped?(l.desiredSpeed=this.savedSpeed,this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"):(this.savedSpeed=l.desiredSpeed,l.desiredSpeed=0,l.coupling&&(l.coupling=!1,l.currentSpeed=0),this.isStopped=!0,this.stopBtn.textContent="Resume",this.stopBtn.className="inspector-btn inspector-resume-btn"))}),this.contentEl.appendChild(this.stopBtn),this.coupleBtn=document.createElement("button"),this.coupleBtn.className="inspector-btn inspector-couple-btn",this.coupleBtn.textContent="Couple",this.coupleBtn.addEventListener("click",()=>{const l=this.getTrain();l&&l.currentSpeed===0&&!l.coupling&&(l.desiredSpeed=2,l.couplingSpeed=2,this.simulation.startCoupling(this.trainId),this.isStopped&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"))}),this.contentEl.appendChild(this.coupleBtn),this.switchContainer=document.createElement("span"),this.switchContainer.className="inspector-switch-group",this.contentEl.appendChild(this.switchContainer)}update(){const t=this.getTrain();if(!t){this.remove();return}const n=t.cars.filter(o=>o.type==="cab").length,s=t.cars.filter(o=>o.type==="car").length;this.idLabel.textContent=t.id.replace("train_","#"),this.cabsLabel.textContent=String(n),this.carsLabel.textContent=String(s),this.speedLabel.textContent=t.currentSpeed.toFixed(1),this.sliderActive||(this.slider.value=String(Math.round(t.desiredSpeed)),this.sliderValue.textContent=String(Math.round(t.desiredSpeed))),this.dirLabel.textContent=t.travelDirection==="forward"?"Forward":"Backward",this.changeDirBtn.disabled=t.currentSpeed!==0;const r=t.coupling?"Coupling...":"Couple",a=t.coupling||t.currentSpeed!==0;this.coupleBtn.textContent!==r&&(this.coupleBtn.textContent=r),this.coupleBtn.disabled!==a&&(this.coupleBtn.disabled=a),this.updateSwitchSelector(t)}updateSwitchSelector(t){var a;const n=this.simulation.findNextSwitch(this.trainId);if(!n){if(this.currentSwitchRouteKey!=="__none__"){this.currentSwitchRouteKey="__none__",this.currentSwitchOptions=[],this.selectedSwitchIndex=void 0,this.switchButtons=[],this.switchContainer.innerHTML="";const o=document.createElement("span");o.className="inspector-switch-label",o.textContent="Next Switch: None",this.switchContainer.appendChild(o)}return}if(n.routeKey!==this.currentSwitchRouteKey||n.options.length!==this.currentSwitchOptions.length){this.currentSwitchRouteKey=n.routeKey,this.currentSwitchOptions=n.options,this.switchButtons=[],this.switchContainer.innerHTML="";const o=document.createElement("span");o.className="inspector-switch-label",o.textContent="Next Switch:",this.switchContainer.appendChild(o);for(const c of n.options){const l=document.createElement("button");l.className="inspector-switch-btn",l.textContent=c.label,l.addEventListener("click",()=>{this.onSwitchButtonClick(c.index)}),this.switchContainer.appendChild(l),this.switchButtons.push(l)}}const r=n.currentOverride;if(r!==this.selectedSwitchIndex){this.selectedSwitchIndex=r;for(let o=0;o<this.switchButtons.length;o++){const h=((a=this.currentSwitchOptions[o])==null?void 0:a.index)===r?"inspector-switch-btn selected":"inspector-switch-btn";this.switchButtons[o].className!==h&&(this.switchButtons[o].className=h)}}}onSwitchButtonClick(t){var n,s;if(!(!this.currentSwitchRouteKey||this.currentSwitchRouteKey==="__none__")){this.selectedSwitchIndex===t?(this.simulation.clearTrainSwitchOverride(this.trainId,this.currentSwitchRouteKey),this.selectedSwitchIndex=void 0):(this.simulation.setTrainSwitchOverride(this.trainId,this.currentSwitchRouteKey,t),this.selectedSwitchIndex=t,(n=this.onSwitchRouteChanged)==null||n.call(this,this.currentSwitchRouteKey,t));for(let r=0;r<this.switchButtons.length;r++){const o=((s=this.currentSwitchOptions[r])==null?void 0:s.index)===this.selectedSwitchIndex;this.switchButtons[r].className=o?"inspector-switch-btn selected":"inspector-switch-btn"}}}dispose(){}}function Ks(i){return typeof i=="number"?i:Math.round((i.min+i.max)/2)}const Eo=["gray","colorful","black"];class Nx extends Rh{constructor(t,n){var r,a;super();pe(this,"piece");pe(this,"simulation");pe(this,"cabsBase");pe(this,"carsBase");pe(this,"speedBase");pe(this,"everyBase");pe(this,"cabsValue");pe(this,"carsValue");pe(this,"speedValue");pe(this,"everyValue");pe(this,"colorBtn");pe(this,"enableBtn");this.piece=t,this.simulation=n;const s=t.genConfig;this.cabsBase=Ks(s.cabCount),this.carsBase=Ks(s.carCount),this.speedBase=Ks((r=s.speed)!=null?r:12),this.everyBase=Ks((a=s.frequency)!=null?a:10),this.contentEl.innerHTML="",this.buildContent()}get targetId(){return this.piece.id}get typeLabel(){return"Generator"}buildContent(){if(!this.piece)return;const t=this.piece.genConfig,n=document.createElement("span");n.className="inspector-type-label inspector-type-generator",n.textContent="Generator",this.contentEl.appendChild(n);const s=document.createElement("span");s.className="inspector-field-value";const r=this.piece.position.x.toFixed(1),a=this.piece.position.z.toFixed(1);s.textContent=`(${r}, ${a})`,this.contentEl.appendChild(s),this.enableBtn=document.createElement("button"),this.enableBtn.className="inspector-btn",this.updateEnableButton(t.enabled),this.enableBtn.addEventListener("click",()=>{const o=this.piece.genConfig;o.enabled=!o.enabled,this.updateEnableButton(o.enabled)}),this.contentEl.appendChild(this.enableBtn),this.colorBtn=document.createElement("button"),this.colorBtn.className="inspector-btn inspector-color-btn",this.updateColorButton(t.colorMode),this.colorBtn.addEventListener("click",()=>{const o=this.piece.genConfig,c=Eo.indexOf(o.colorMode),l=Eo[(c+1)%Eo.length];o.colorMode=l,this.updateColorButton(l)}),this.contentEl.appendChild(this.colorBtn),this.cabsValue=document.createElement("span"),this.cabsValue.className="inspector-field-value inspector-slider-value",this.buildSliderField("Cabs:",1,10,this.cabsBase,this.cabsValue,o=>{this.cabsBase=o,this.applyConfig()}),this.carsValue=document.createElement("span"),this.carsValue.className="inspector-field-value inspector-slider-value",this.buildSliderField("Cars:",0,20,this.carsBase,this.carsValue,o=>{this.carsBase=o,this.applyConfig()}),this.speedValue=document.createElement("span"),this.speedValue.className="inspector-field-value inspector-slider-value",this.buildSliderField("Speed:",1,48,this.speedBase,this.speedValue,o=>{this.speedBase=o,this.applyConfig()}),this.everyValue=document.createElement("span"),this.everyValue.className="inspector-field-value inspector-slider-value",this.buildSliderField("Every:",1,300,this.everyBase,this.everyValue,o=>{this.everyBase=o,this.applyConfig(),this.simulation.clearResolvedFrequency(this.piece.id)})}buildSliderField(t,n,s,r,a,o){const c=document.createElement("span");c.className="inspector-field";const l=document.createElement("span");l.className="inspector-field-label",l.textContent=t,c.appendChild(l);const h=document.createElement("button");h.className="inspector-btn inspector-speed-adj-btn",h.textContent="−",h.addEventListener("click",()=>{const f=Math.max(n,parseInt(u.value,10)-1);u.value=String(f),a.textContent=String(f),o(f)}),c.appendChild(h);const u=document.createElement("input");u.type="range",u.className="inspector-slider",u.min=String(n),u.max=String(s),u.step="1",u.value=String(r),c.appendChild(u),a.textContent=String(r),c.appendChild(a);const d=document.createElement("button");d.className="inspector-btn inspector-speed-adj-btn",d.textContent="+",d.addEventListener("click",()=>{const f=Math.min(s,parseInt(u.value,10)+1);u.value=String(f),a.textContent=String(f),o(f)}),c.appendChild(d),u.addEventListener("input",()=>{const f=parseInt(u.value,10);a.textContent=String(f),o(f)}),this.contentEl.appendChild(c)}applyConfig(){const t=this.piece.genConfig;t.cabCount=this.cabsBase,t.carCount=this.carsBase,t.speed=this.speedBase,t.frequency=this.everyBase}updateColorButton(t){this.colorBtn.textContent=t.charAt(0).toUpperCase()+t.slice(1),this.colorBtn.className="inspector-btn inspector-color-btn inspector-color-"+t}updateEnableButton(t){t?(this.enableBtn.textContent="Enabled",this.enableBtn.className="inspector-btn inspector-enable-btn"):(this.enableBtn.textContent="Disabled",this.enableBtn.className="inspector-btn inspector-disable-btn")}update(){if(!this.piece.genConfig){this.remove();return}const t=this.piece.genConfig.enabled,n=t?"Enabled":"Disabled";this.enableBtn.textContent!==n&&this.updateEnableButton(t)}dispose(){}}const Ux=Object.assign({"./layouts/example-array.txt":Bh,"./layouts/example-cross-connect.txt":kh,"./layouts/example-flex-connect.txt":Gh,"./layouts/example-prefab-use.txt":Hh,"./layouts/example-semaphore.txt":Vh,"./layouts/example-splice.txt":Wh,"./layouts/layout-03.txt":$h,"./layouts/layout-four-tracks.txt":Xh,"./layouts/layout-more-loops.txt":qh,"./layouts/layout-two-loops.txt":Yh}),ta={};for(const[i,e]of Object.entries(Ux)){const t=i.split("/").pop();ta[t]=e}const Ph=document.getElementById("canvas-container");if(!Ph)throw new Error("Canvas container not found");const ot=new tv(Ph),Ni=new Ix,pl=document.getElementById("status");let dt=null,Rt=null;ot.setSwitchClickCallback((i,e)=>{if(Y.debug(`Switch click callback: ${i} -> ${e}`),Rt!=null&&Rt.isJunctionLocked(i)){et("Switch locked - train in junction");return}Mh(i,e),dt?(Y.debug(`Calling renderLayout with ${dt.pieces.length} pieces`),ki(ot,dt,!0),et(`Switch toggled: ${i} → route ${e+1}`)):Y.debug("currentLayout is null!")});ot.setSemaphoreClickCallback(i=>{if(Y.debug(`Semaphore click callback: ${i}`),!dt)return;const e=dt.pieces.find(n=>n.id===i);if(!e||!e.semaphoreConfig){Y.debug(`Semaphore piece ${i} not found or has no config`);return}e.semaphoreConfig.locked=!e.semaphoreConfig.locked,zv(i,e.semaphoreConfig.locked);const t=e.semaphoreConfig.locked?"LOCKED (red)":"UNLOCKED (green)";et(`Semaphore ${i}: ${t}`),ot.render()});ot.setDecouplerClickCallback(i=>{if(Y.debug(`Decoupler click callback: ${i}`),!dt||!Rt)return;const e=dt.pieces.find(n=>n.id===i);if(!e||!e.decouplerConfig){Y.debug(`Decoupler piece ${i} not found or has no config`);return}Rt.activateDecoupler(i)?(e.decouplerConfig.activated=!0,al(i,!0),et(`Decoupler ${i}: ACTIVATED - train split`),setTimeout(()=>{e.decouplerConfig.activated=!1,al(i,!1),ot.render()},1e3)):et(`Decoupler ${i}: no train to split`),ot.render()});ot.setTrainDblClickCallback(i=>{if(!Rt||Ni.hasWidgetForTarget(i))return;const e=new Dx(i,Rt);e.onSwitchRouteChanged=(t,n)=>{Mh(t,n),dt&&ki(ot,dt,!0)},Ni.addWidget(e)});ot.setGeneratorDblClickCallback(i=>{if(!dt||!Rt||Ni.hasWidgetForTarget(i))return;const e=dt.pieces.find(n=>n.id===i);if(!(e!=null&&e.genConfig))return;const t=new Nx(e,Rt);Ni.addWidget(t)});function et(i){pl&&(pl.textContent=i)}function na(i){const e={debug:nn.DEBUG,info:nn.INFO,warn:nn.WARNING,error:nn.ERROR};mh(i.logLevel?e[i.logLevel]:nn.WARNING)}function ia(i){Rt&&Rt.stop(),Ni.clear(),Rt=new Lx(i,Ov(),()=>{if(Rt){const e=_x(Rt.getTrains());ot.updateTrains(e),Fv(Rt.getLockedPoints(),ot.getLabelsVisible()),Ni.update(),ot.render()}}),Rt.start(),Y.debug("Simulation started")}async function Ox(){try{et("Opening file dialog...");const i=await Kh({filters:[{name:"Layout Files",extensions:["layout","txt"]}],multiple:!1});if(!i||typeof i!="string"){et("Import cancelled");return}et(`Loading: ${i}`);const e=await Jh(i);et("Parsing layout...");const t=ea(e);dt=t,na(t),Mr(),et(`Rendering ${t.pieces.length} pieces...`),ki(ot,t),ia(t),Y.info(`Layout loaded: ${t.pieces.length} pieces`),et(`Layout loaded: ${t.pieces.length} pieces - simulation running`)}catch(i){const e=i instanceof Error?i.message:String(i);et(`Error: ${e}`),Y.error("Import error:",i)}}const ml=document.getElementById("import-btn");ml&&ml.addEventListener("click",()=>{Ox()});const qn=document.getElementById("random-btn");function Mr(){var i;qn&&(((i=dt==null?void 0:dt.randomSwitches)!=null?i:!1)?(qn.classList.add("active"),qn.textContent="Manual"):(qn.classList.remove("active"),qn.textContent="Random"))}function Fx(){if(!dt){et("No layout loaded");return}dt.randomSwitches=!dt.randomSwitches,Mr(),ki(ot,dt,!0);const i=dt.randomSwitches?"ON":"OFF";et(`Random switches: ${i}`)}qn&&qn.addEventListener("click",Fx);const Yn=document.getElementById("labels-btn");function zx(){Yn&&(ot.getLabelsVisible()?(Yn.classList.add("active"),Yn.textContent="Clean"):(Yn.classList.remove("active"),Yn.textContent="Design"))}function Bx(){const i=ot.getLabelsVisible();ot.setLabelsVisible(!i),zx(),ot.render();const e=ot.getLabelsVisible()?"ON":"OFF";et(`Labels: ${e}`)}Yn&&Yn.addEventListener("click",Bx);const gl=document.getElementById("capture-btn");gl&&gl.addEventListener("click",async()=>{try{ot.renderer.render(ot.scene,ot.camera);const e=ot.renderer.domElement.toDataURL("image/png").split(",")[1],t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);const s=await Ml({filters:[{name:"PNG Image",extensions:["png"]}],defaultPath:"tren-capture.png"});if(!s){et("Capture cancelled");return}await eu(s,n),et(`Screenshot saved: ${s}`)}catch(i){const e=i instanceof Error?i.message:String(i);et(`Capture error: ${e}`)}});ot.render();et('Ready - click "Import Layout" to load a layout file');document.addEventListener("paste",async i=>{var t;const e=(t=i.clipboardData)==null?void 0:t.getData("text");if(e&&e.trim())try{et("Parsing pasted layout...");const n=ea(e);dt=n,na(n),Mr(),ki(ot,n),ia(n),Y.info(`Layout loaded from clipboard: ${n.pieces.length} pieces`),et(`Layout loaded from clipboard: ${n.pieces.length} pieces - simulation running`)}catch(n){const s=n instanceof Error?n.message:String(n);et(`Parse error: ${s}`)}});const _l=document.getElementById("layouts-btn"),sn=document.getElementById("layouts-dialog"),Js=document.getElementById("layouts-list"),pr=document.getElementById("dialog-run-btn"),mr=document.getElementById("dialog-save-btn"),vl=document.getElementById("dialog-cancel-btn");let mn=null,xl=null;function kx(i,e){let t="No Title",n=e;for(const s of i.split(`
`)){const r=s.replace(/#.*$/,"").trim();if(!r)continue;const a=r.toLowerCase();a.startsWith("title ")?t=r.substring(6).trim():a.startsWith("description ")&&(n=r.substring(12).trim())}return{title:t,description:n}}function Gx(){const i=[];for(const[e,t]of Object.entries(ta)){const n=kx(t,e);i.push({file:e,title:n.title,description:n.description})}return i.sort((e,t)=>e.title.localeCompare(t.title)),{layouts:i}}function Lh(i){const e=ta[i];if(!e)throw new Error(`Layout not found: ${i}`);return e}function Hx(i){if(Js){Js.innerHTML="",mn=null,Sl();for(const e of i.layouts){const t=document.createElement("div");t.className="layout-item",t.dataset.file=e.file;const n=document.createElement("div");n.className="layout-item-title",n.textContent=e.title;const s=document.createElement("div");s.className="layout-item-description",s.textContent=e.description,t.appendChild(n),t.appendChild(s),t.addEventListener("click",()=>{Js.querySelectorAll(".layout-item").forEach(r=>r.classList.remove("selected")),t.classList.add("selected"),mn=e.file,Sl()}),Js.appendChild(t)}}}function Sl(){const i=mn!==null;pr&&(pr.disabled=!i),mr&&(mr.disabled=!i)}function Vx(){if(sn)try{xl=Gx(),Hx(xl),sn.style.display="flex",et("")}catch(i){const e=i instanceof Error?i.message:String(i);et(`Error: ${e}`)}}function ps(){sn&&(sn.style.display="none"),mn=null}function Wx(){if(!mn)return;const i=mn;try{et(`Loading ${i}...`),ps();const e=Lh(i);et("Parsing layout...");const t=ea(e);dt=t,na(t),Mr(),et(`Rendering ${t.pieces.length} pieces...`),ki(ot,t),ia(t),Y.info(`Layout loaded: ${t.pieces.length} pieces`),et(`Layout loaded: ${t.pieces.length} pieces - simulation running`)}catch(e){const t=e instanceof Error?e.message:String(e);et(`Error: ${t}`),Y.error("Run layout error:",e)}}async function $x(){if(mn)try{const i=Lh(mn),e=await Ml({filters:[{name:"Layout Files",extensions:["txt","layout"]}],defaultPath:mn});if(!e){et("Save cancelled");return}await Qh(e,i),ps(),et(`Layout saved to: ${e}`)}catch(i){const e=i instanceof Error?i.message:String(i);et(`Error: ${e}`),Y.error("Save layout error:",i)}}_l&&_l.addEventListener("click",Vx);pr&&pr.addEventListener("click",Wx);mr&&mr.addEventListener("click",$x);vl&&vl.addEventListener("click",ps);sn&&sn.addEventListener("click",i=>{i.target===sn&&ps()});document.addEventListener("keydown",i=>{i.key==="Escape"&&(sn==null?void 0:sn.style.display)==="flex"&&ps()});
