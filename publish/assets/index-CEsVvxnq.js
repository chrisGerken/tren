var dh=Object.defineProperty;var fh=(i,t,e)=>t in i?dh(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var bt=(i,t,e)=>fh(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const ph=`title More loops and switches
description Slightly more complex example with more loops and switches

max trains 6
lockahead distance 10 count 4

gen cabs 1-2 cars 2-10 every 10 speed 7-16

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
# bin`,mh=`title Cross Connect Example
description Demonstrates cross connect for track intersections with collision prevention

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
`,gh=`title Sample with flex connect
description How to fill a non-standard gap between two tracks

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
`,_h=`title Larger System
description Several small layouts connected by one large loop

max trains 8
lockahead distance 10 count 4

def crvr15  right  radius 15  arc 22.5
def crvr20  right  radius 20  arc 22.5
def crvr26  right  radius 26  arc 22.5
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
`,vh=`# Semaphore Test Layout
# Tests the new semaphore (manual signal) feature
#
# Click the green dot to lock the semaphore (turns red, trains stop)
# Click the red dot to unlock (turns green, trains can pass)

title Semaphore Test

# Main line with semaphore
gen cabs 1 cars 3 speed 8 every 6
str x 3
signal: sem         # This is the semaphore - click the dot to toggle
str x 3
bin

# Alternative route (no semaphore - trains always pass)
new degrees 180 offset 50
gen cabs 1 cars 3 speed 8 every 8
str x 8
bin
`,xh=`title Sample with Splice Statement
description An example of how to use the splice statement to create parallel tracks with switches

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

`,Sh=`title         Two loops
description   Several loops, a generator and a bin

random

start: ph

crvl x 4

ph1: crvl
crvl * 11

new
gen cabs 1-2 cars 2-8 speed 8-12 every 20-40
crvl
str
> in.$ph1

new from out.$ph1
str
crv * 4
str * 2
crv * 4
str * 2
crv * 4
str * 2
crv * 3
exit: crv
str

$exit.out
crvr
crvl
str
bin
`;function Mh(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function jo(i,t=!1){const e=Mh(),n=`_${e}`;return Object.defineProperty(window,n,{value:s=>(t&&Reflect.deleteProperty(window,n),i==null?void 0:i(s)),writable:!1,configurable:!0}),e}async function Eh(i,t={}){return new Promise((e,n)=>{const s=jo(a=>{e(a),Reflect.deleteProperty(window,`_${r}`)},!0),r=jo(a=>{n(a),Reflect.deleteProperty(window,`_${s}`)},!0);window.__TAURI_IPC__({cmd:i,callback:s,error:r,...t})})}async function sr(i){return Eh("tauri",i)}async function yh(i={}){return typeof i=="object"&&Object.freeze(i),sr({__tauriModule:"Dialog",message:{cmd:"openDialog",options:i}})}async function bh(i={}){return typeof i=="object"&&Object.freeze(i),sr({__tauriModule:"Dialog",message:{cmd:"saveDialog",options:i}})}var Zo;(function(i){i[i.Audio=1]="Audio",i[i.Cache=2]="Cache",i[i.Config=3]="Config",i[i.Data=4]="Data",i[i.LocalData=5]="LocalData",i[i.Desktop=6]="Desktop",i[i.Document=7]="Document",i[i.Download=8]="Download",i[i.Executable=9]="Executable",i[i.Font=10]="Font",i[i.Home=11]="Home",i[i.Picture=12]="Picture",i[i.Public=13]="Public",i[i.Runtime=14]="Runtime",i[i.Template=15]="Template",i[i.Video=16]="Video",i[i.Resource=17]="Resource",i[i.App=18]="App",i[i.Log=19]="Log",i[i.Temp=20]="Temp",i[i.AppConfig=21]="AppConfig",i[i.AppData=22]="AppData",i[i.AppLocalData=23]="AppLocalData",i[i.AppCache=24]="AppCache",i[i.AppLog=25]="AppLog"})(Zo||(Zo={}));async function Th(i,t={}){return sr({__tauriModule:"Fs",message:{cmd:"readTextFile",path:i,options:t}})}async function wh(i,t,e){typeof i=="object"&&Object.freeze(i);const n={path:"",contents:""};let s=e;return typeof i=="string"?n.path=i:(n.path=i.path,n.contents=i.contents),typeof t=="string"?n.contents=t!=null?t:"":s=t,sr({__tauriModule:"Fs",message:{cmd:"writeFile",path:n.path,contents:Array.from(new TextEncoder().encode(n.contents)),options:s}})}const Ah=[{file:"layout03.txt",title:"Large main loop",description:"Large main loop with side layouts"},{file:"two-loops.txt",title:"Two Loops",description:"Several loops with a generator and a bin. Random switch selection enabled."},{file:"complex-layout.txt",title:"More Loops and Switches",description:"Slightly more complex example with more loops and switches."},{file:"flex-connect.txt",title:"Flex Connect Example",description:"How to fill a non-standard gap between two tracks using flex connect."},{file:"splice.txt",title:"Splice Example",description:"How to use the splice statement to create parallel tracks with switches."},{file:"cross-connect.txt",title:"Cross Connect Example",description:"Demonstrates cross connect for track intersections with collision prevention."},{file:"semaphore.txt",title:"Semaphore Test",description:"Manual signal control - click the green/red dot to stop or allow trains."}],Ch={layouts:Ah};/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const To="160",dn={ROTATE:0,DOLLY:1,PAN:2},En={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rh=0,Jo=1,Ph=2,tl=1,Lh=2,un=3,In=0,Ne=1,ze=2,Cn=0,Ei=1,Qo=2,ta=3,ea=4,Ih=5,Gn=100,Dh=101,Nh=102,na=103,ia=104,Uh=200,Oh=201,Fh=202,zh=203,ho=204,uo=205,Bh=206,kh=207,Gh=208,Hh=209,Vh=210,Wh=211,$h=212,Xh=213,qh=214,Yh=0,Kh=1,jh=2,Xs=3,Zh=4,Jh=5,Qh=6,tu=7,el=0,eu=1,nu=2,Rn=0,iu=1,su=2,ru=3,ou=4,au=5,cu=6,nl=300,Ti=301,wi=302,fo=303,po=304,rr=306,mo=1e3,Ke=1001,go=1002,Pe=1003,sa=1004,xr=1005,He=1006,lu=1007,Ji=1008,Pn=1009,hu=1010,uu=1011,wo=1012,il=1013,bn=1014,Tn=1015,Qi=1016,sl=1017,rl=1018,Vn=1020,du=1021,je=1023,fu=1024,pu=1025,Wn=1026,Ai=1027,mu=1028,ol=1029,gu=1030,al=1031,cl=1033,Sr=33776,Mr=33777,Er=33778,yr=33779,ra=35840,oa=35841,aa=35842,ca=35843,ll=36196,la=37492,ha=37496,ua=37808,da=37809,fa=37810,pa=37811,ma=37812,ga=37813,_a=37814,va=37815,xa=37816,Sa=37817,Ma=37818,Ea=37819,ya=37820,ba=37821,br=36492,Ta=36494,wa=36495,_u=36283,Aa=36284,Ca=36285,Ra=36286,hl=3e3,$n=3001,vu=3200,xu=3201,ul=0,Su=1,We="",ye="srgb",mn="srgb-linear",Ao="display-p3",or="display-p3-linear",qs="linear",se="srgb",Ys="rec709",Ks="p3",ti=7680,Pa=519,Mu=512,Eu=513,yu=514,dl=515,bu=516,Tu=517,wu=518,Au=519,La=35044,Ia="300 es",_o=1035,fn=2e3,js=2001;class Zn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const we=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xi=Math.PI/180,vo=180/Math.PI;function Pi(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(we[i&255]+we[i>>8&255]+we[i>>16&255]+we[i>>24&255]+"-"+we[t&255]+we[t>>8&255]+"-"+we[t>>16&15|64]+we[t>>24&255]+"-"+we[e&63|128]+we[e>>8&255]+"-"+we[e>>16&255]+we[e>>24&255]+we[n&255]+we[n>>8&255]+we[n>>16&255]+we[n>>24&255]).toLowerCase()}function be(i,t,e){return Math.max(t,Math.min(e,i))}function Cu(i,t){return(i%t+t)%t}function Tr(i,t,e){return(1-e)*i+e*t}function Da(i){return(i&i-1)===0&&i!==0}function xo(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Oi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Le(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const Ru={DEG2RAD:Xi};class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yt{constructor(t,e,n,s,r,a,o,c,l){Yt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],p=s[3],m=s[6],x=s[1],v=s[4],M=s[7],R=s[2],A=s[5],w=s[8];return r[0]=a*_+o*x+c*R,r[3]=a*p+o*v+c*A,r[6]=a*m+o*M+c*w,r[1]=l*_+h*x+u*R,r[4]=l*p+h*v+u*A,r[7]=l*m+h*M+u*w,r[2]=d*_+f*x+g*R,r[5]=d*p+f*v+g*A,r[8]=d*m+f*M+g*w,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=e*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(o*n-s*a)*_,t[3]=d*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(wr.makeScale(t,e)),this}rotate(t){return this.premultiply(wr.makeRotation(-t)),this}translate(t,e){return this.premultiply(wr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const wr=new Yt;function fl(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Zs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pu(){const i=Zs("canvas");return i.style.display="block",i}const Na={};function qi(i){i in Na||(Na[i]=!0,console.warn(i))}const Ua=new Yt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Oa=new Yt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),cs={[mn]:{transfer:qs,primaries:Ys,toReference:i=>i,fromReference:i=>i},[ye]:{transfer:se,primaries:Ys,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[or]:{transfer:qs,primaries:Ks,toReference:i=>i.applyMatrix3(Oa),fromReference:i=>i.applyMatrix3(Ua)},[Ao]:{transfer:se,primaries:Ks,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Oa),fromReference:i=>i.applyMatrix3(Ua).convertLinearToSRGB()}},Lu=new Set([mn,or]),ee={enabled:!0,_workingColorSpace:mn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Lu.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=cs[t].toReference,s=cs[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return cs[i].primaries},getTransfer:function(i){return i===We?qs:cs[i].transfer}};function yi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ar(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ei;class pl{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{ei===void 0&&(ei=Zs("canvas")),ei.width=t.width,ei.height=t.height;const n=ei.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=ei}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Zs("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=yi(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(yi(e[n]/255)*255):e[n]=yi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Iu=0;class ml{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Iu++}),this.uuid=Pi(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Cr(s[a].image)):r.push(Cr(s[a]))}else r=Cr(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Cr(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?pl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Du=0;class Be extends Zn{constructor(t=Be.DEFAULT_IMAGE,e=Be.DEFAULT_MAPPING,n=Ke,s=Ke,r=He,a=Ji,o=je,c=Pn,l=Be.DEFAULT_ANISOTROPY,h=We){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Pi(),this.name="",this.source=new ml(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Yt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===$n?ye:We),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nl)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case mo:t.x=t.x-Math.floor(t.x);break;case Ke:t.x=t.x<0?0:1;break;case go:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case mo:t.y=t.y-Math.floor(t.y);break;case Ke:t.y=t.y<0?0:1;break;case go:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===ye?$n:hl}set encoding(t){qi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===$n?ye:We}}Be.DEFAULT_IMAGE=null;Be.DEFAULT_MAPPING=nl;Be.DEFAULT_ANISOTROPY=1;class Me{constructor(t=0,e=0,n=0,s=1){Me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],p=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const v=(l+1)/2,M=(f+1)/2,R=(m+1)/2,A=(h+d)/4,w=(u+_)/4,O=(g+p)/4;return v>M&&v>R?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=A/n,r=w/n):M>R?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=A/s,r=O/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=w/r,s=O/r),this.set(n,s,r,e),this}let x=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(u-_)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Nu extends Zn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Me(0,0,t,e),this.scissorTest=!1,this.viewport=new Me(0,0,t,e);const s={width:t,height:e,depth:1};n.encoding!==void 0&&(qi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===$n?ye:We),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:He,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Be(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ml(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Nu{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gl extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Ke,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Uu extends Be{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Pe,this.minFilter=Pe,this.wrapR=Ke,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let p=1-o;const m=c*d+l*f+h*g+u*_,x=m>=0?1:-1,v=1-m*m;if(v>Number.EPSILON){const R=Math.sqrt(v),A=Math.atan2(R,m*x);p=Math.sin(p*A)/R,o=Math.sin(o*A)/R}const M=o*x;if(c=c*p+d*M,l=l*p+f*M,h=h*p+g*M,u=u*p+_*M,p===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return t[e]=o*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-o*f,t[e+2]=l*g+h*f+o*d-c*u,t[e+3]=h*g-o*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(be(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*n+e*this._x,this._y=f*s+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),n*Math.sin(r),n*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(t=0,e=0,n=0){I.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Fa.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Fa.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),h=2*(o*e-r*s),u=2*(r*n-a*e);return this.x=e+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Rr.copy(this).projectOnVector(t),this.sub(Rr)}reflect(t){return this.sub(Rr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(be(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Rr=new I,Fa=new Yn;class Li{constructor(t=new I(1/0,1/0,1/0),e=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint($e.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint($e.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=$e.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,$e):$e.fromBufferAttribute(r,a),$e.applyMatrix4(t.matrixWorld),this.expandByPoint($e);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ls.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ls.copy(n.boundingBox)),ls.applyMatrix4(t.matrixWorld),this.union(ls)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,$e),$e.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fi),hs.subVectors(this.max,Fi),ni.subVectors(t.a,Fi),ii.subVectors(t.b,Fi),si.subVectors(t.c,Fi),_n.subVectors(ii,ni),vn.subVectors(si,ii),Un.subVectors(ni,si);let e=[0,-_n.z,_n.y,0,-vn.z,vn.y,0,-Un.z,Un.y,_n.z,0,-_n.x,vn.z,0,-vn.x,Un.z,0,-Un.x,-_n.y,_n.x,0,-vn.y,vn.x,0,-Un.y,Un.x,0];return!Pr(e,ni,ii,si,hs)||(e=[1,0,0,0,1,0,0,0,1],!Pr(e,ni,ii,si,hs))?!1:(us.crossVectors(_n,vn),e=[us.x,us.y,us.z],Pr(e,ni,ii,si,hs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,$e).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize($e).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(rn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const rn=[new I,new I,new I,new I,new I,new I,new I,new I],$e=new I,ls=new Li,ni=new I,ii=new I,si=new I,_n=new I,vn=new I,Un=new I,Fi=new I,hs=new I,us=new I,On=new I;function Pr(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){On.fromArray(i,r);const o=s.x*Math.abs(On.x)+s.y*Math.abs(On.y)+s.z*Math.abs(On.z),c=t.dot(On),l=e.dot(On),h=n.dot(On);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ou=new Li,zi=new I,Lr=new I;class ar{constructor(t=new I,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Ou.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;zi.subVectors(t,this.center);const e=zi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(zi,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Lr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(zi.copy(t.center).add(Lr)),this.expandByPoint(zi.copy(t.center).sub(Lr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new I,Ir=new I,ds=new I,xn=new I,Dr=new I,fs=new I,Nr=new I;class cr{constructor(t=new I,e=new I(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,on)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=on.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(on.copy(this.origin).addScaledVector(this.direction,e),on.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ir.copy(t).add(e).multiplyScalar(.5),ds.copy(e).sub(t).normalize(),xn.copy(this.origin).sub(Ir);const r=t.distanceTo(e)*.5,a=-this.direction.dot(ds),o=xn.dot(this.direction),c=-xn.dot(ds),l=xn.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ir).addScaledVector(ds,d),f}intersectSphere(t,e){on.subVectors(t.center,this.origin);const n=on.dot(this.direction),s=on.dot(on)-n*n,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,on)!==null}intersectTriangle(t,e,n,s,r){Dr.subVectors(e,t),fs.subVectors(n,t),Nr.crossVectors(Dr,fs);let a=this.direction.dot(Nr),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;xn.subVectors(this.origin,t);const c=o*this.direction.dot(fs.crossVectors(xn,fs));if(c<0)return null;const l=o*this.direction.dot(Dr.cross(xn));if(l<0||c+l>a)return null;const h=-o*xn.dot(Nr);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ce{constructor(t,e,n,s,r,a,o,c,l,h,u,d,f,g,_,p){ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,h,u,d,f,g,_,p)}set(t,e,n,s,r,a,o,c,l,h,u,d,f,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=s,m[1]=r,m[5]=a,m[9]=o,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ce().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/ri.setFromMatrixColumn(t,0).length(),r=1/ri.setFromMatrixColumn(t,1).length(),a=1/ri.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-o*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=a*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*o,e[4]=g*o-f,e[8]=a*l,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-g,e[6]=_+d*o,e[10]=a*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*o,e[4]=-a*u,e[8]=g+f*o,e[1]=f+g*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Fu,t,zu)}lookAt(t,e,n){const s=this.elements;return Oe.subVectors(t,e),Oe.lengthSq()===0&&(Oe.z=1),Oe.normalize(),Sn.crossVectors(n,Oe),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Oe.x+=1e-4:Oe.z+=1e-4,Oe.normalize(),Sn.crossVectors(n,Oe)),Sn.normalize(),ps.crossVectors(Oe,Sn),s[0]=Sn.x,s[4]=ps.x,s[8]=Oe.x,s[1]=Sn.y,s[5]=ps.y,s[9]=Oe.y,s[2]=Sn.z,s[6]=ps.z,s[10]=Oe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],x=n[3],v=n[7],M=n[11],R=n[15],A=s[0],w=s[4],O=s[8],E=s[12],T=s[1],z=s[5],W=s[9],rt=s[13],L=s[2],F=s[6],B=s[10],Y=s[14],j=s[3],Z=s[7],J=s[11],at=s[15];return r[0]=a*A+o*T+c*L+l*j,r[4]=a*w+o*z+c*F+l*Z,r[8]=a*O+o*W+c*B+l*J,r[12]=a*E+o*rt+c*Y+l*at,r[1]=h*A+u*T+d*L+f*j,r[5]=h*w+u*z+d*F+f*Z,r[9]=h*O+u*W+d*B+f*J,r[13]=h*E+u*rt+d*Y+f*at,r[2]=g*A+_*T+p*L+m*j,r[6]=g*w+_*z+p*F+m*Z,r[10]=g*O+_*W+p*B+m*J,r[14]=g*E+_*rt+p*Y+m*at,r[3]=x*A+v*T+M*L+R*j,r[7]=x*w+v*z+M*F+R*Z,r[11]=x*O+v*W+M*B+R*J,r[15]=x*E+v*rt+M*Y+R*at,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*c*u-s*l*u-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+e*c*f-e*l*d+r*a*d-s*a*f+s*l*h-r*c*h)+p*(+e*l*u-e*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+m*(-s*o*h-e*c*u+e*o*d+s*a*u-n*a*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],x=u*p*l-_*d*l+_*c*f-o*p*f-u*c*m+o*d*m,v=g*d*l-h*p*l-g*c*f+a*p*f+h*c*m-a*d*m,M=h*_*l-g*u*l+g*o*f-a*_*f-h*o*m+a*u*m,R=g*u*c-h*_*c-g*o*d+a*_*d+h*o*p-a*u*p,A=e*x+n*v+s*M+r*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/A;return t[0]=x*w,t[1]=(_*d*r-u*p*r-_*s*f+n*p*f+u*s*m-n*d*m)*w,t[2]=(o*p*r-_*c*r+_*s*l-n*p*l-o*s*m+n*c*m)*w,t[3]=(u*c*r-o*d*r-u*s*l+n*d*l+o*s*f-n*c*f)*w,t[4]=v*w,t[5]=(h*p*r-g*d*r+g*s*f-e*p*f-h*s*m+e*d*m)*w,t[6]=(g*c*r-a*p*r-g*s*l+e*p*l+a*s*m-e*c*m)*w,t[7]=(a*d*r-h*c*r+h*s*l-e*d*l-a*s*f+e*c*f)*w,t[8]=M*w,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*m-e*u*m)*w,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*m+e*o*m)*w,t[11]=(h*o*r-a*u*r-h*n*l+e*u*l+a*n*f-e*o*f)*w,t[12]=R*w,t[13]=(h*_*s-g*u*s+g*n*d-e*_*d-h*n*p+e*u*p)*w,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*p-e*o*p)*w,t[15]=(a*u*s-h*o*s+h*n*c-e*u*c-a*n*d+e*o*d)*w,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,p=a*u,m=o*u,x=c*l,v=c*h,M=c*u,R=n.x,A=n.y,w=n.z;return s[0]=(1-(_+m))*R,s[1]=(f+M)*R,s[2]=(g-v)*R,s[3]=0,s[4]=(f-M)*A,s[5]=(1-(d+m))*A,s[6]=(p+x)*A,s[7]=0,s[8]=(g+v)*w,s[9]=(p-x)*w,s[10]=(1-(d+_))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=ri.set(s[0],s[1],s[2]).length();const a=ri.set(s[4],s[5],s[6]).length(),o=ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Xe.copy(this);const l=1/r,h=1/a,u=1/o;return Xe.elements[0]*=l,Xe.elements[1]*=l,Xe.elements[2]*=l,Xe.elements[4]*=h,Xe.elements[5]*=h,Xe.elements[6]*=h,Xe.elements[8]*=u,Xe.elements[9]*=u,Xe.elements[10]*=u,e.setFromRotationMatrix(Xe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=fn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-s),u=(e+t)/(e-t),d=(n+s)/(n-s);let f,g;if(o===fn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===js)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=fn){const c=this.elements,l=1/(e-t),h=1/(n-s),u=1/(a-r),d=(e+t)*l,f=(n+s)*h;let g,_;if(o===fn)g=(a+r)*u,_=-2*u;else if(o===js)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const ri=new I,Xe=new ce,Fu=new I(0,0,0),zu=new I(1,1,1),Sn=new I,ps=new I,Oe=new I,za=new ce,Ba=new Yn;class lr{constructor(t=0,e=0,n=0,s=lr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(e){case"XYZ":this._y=Math.asin(be(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-be(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(be(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-be(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(be(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-be(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return za.makeRotationFromQuaternion(t),this.setFromRotationMatrix(za,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ba.setFromEuler(this),this.setFromQuaternion(Ba,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}lr.DEFAULT_ORDER="XYZ";class Co{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Bu=0;const ka=new I,oi=new Yn,an=new ce,ms=new I,Bi=new I,ku=new I,Gu=new Yn,Ga=new I(1,0,0),Ha=new I(0,1,0),Va=new I(0,0,1),Hu={type:"added"},Vu={type:"removed"};class Ee extends Zn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bu++}),this.uuid=Pi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ee.DEFAULT_UP.clone();const t=new I,e=new lr,n=new Yn,s=new I(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ce},normalMatrix:{value:new Yt}}),this.matrix=new ce,this.matrixWorld=new ce,this.matrixAutoUpdate=Ee.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Co,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.multiply(oi),this}rotateOnWorldAxis(t,e){return oi.setFromAxisAngle(t,e),this.quaternion.premultiply(oi),this}rotateX(t){return this.rotateOnAxis(Ga,t)}rotateY(t){return this.rotateOnAxis(Ha,t)}rotateZ(t){return this.rotateOnAxis(Va,t)}translateOnAxis(t,e){return ka.copy(t).applyQuaternion(this.quaternion),this.position.add(ka.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Ga,t)}translateY(t){return this.translateOnAxis(Ha,t)}translateZ(t){return this.translateOnAxis(Va,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ms.copy(t):ms.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Bi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Bi,ms,this.up):an.lookAt(ms,Bi,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),oi.setFromRotationMatrix(an),this.quaternion.premultiply(oi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Hu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Vu)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),an.multiply(t.parent.matrixWorld)),t.applyMatrix4(an),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,t,ku),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bi,Gu,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Ee.DEFAULT_UP=new I(0,1,0);Ee.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ee.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const qe=new I,cn=new I,Ur=new I,ln=new I,ai=new I,ci=new I,Wa=new I,Or=new I,Fr=new I,zr=new I;let gs=!1;class Ve{constructor(t=new I,e=new I,n=new I){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),qe.subVectors(t,e),s.cross(qe);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){qe.subVectors(s,e),cn.subVectors(n,e),Ur.subVectors(t,e);const a=qe.dot(qe),o=qe.dot(cn),c=qe.dot(Ur),l=cn.dot(cn),h=cn.dot(Ur),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getUV(t,e,n,s,r,a,o,c){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),this.getInterpolation(t,e,n,s,r,a,o,c)}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ln.x),c.addScaledVector(a,ln.y),c.addScaledVector(o,ln.z),c)}static isFrontFacing(t,e,n,s){return qe.subVectors(n,e),cn.subVectors(t,e),qe.cross(cn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return qe.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),qe.cross(cn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Ve.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Ve.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,s,r){return gs===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),gs=!0),Ve.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}getInterpolation(t,e,n,s,r){return Ve.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Ve.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Ve.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let a,o;ai.subVectors(s,n),ci.subVectors(r,n),Or.subVectors(t,n);const c=ai.dot(Or),l=ci.dot(Or);if(c<=0&&l<=0)return e.copy(n);Fr.subVectors(t,s);const h=ai.dot(Fr),u=ci.dot(Fr);if(h>=0&&u<=h)return e.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(ai,a);zr.subVectors(t,r);const f=ai.dot(zr),g=ci.dot(zr);if(g>=0&&f<=g)return e.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(ci,o);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return Wa.subVectors(r,s),o=(u-h)/(u-h+(f-g)),e.copy(s).addScaledVector(Wa,o);const m=1/(p+_+d);return a=_*m,o=d*m,e.copy(n).addScaledVector(ai,a).addScaledVector(ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mn={h:0,s:0,l:0},_s={h:0,s:0,l:0};function Br(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ye){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ee.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=ee.workingColorSpace){return this.r=t,this.g=e,this.b=n,ee.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=ee.workingColorSpace){if(t=Cu(t,1),e=be(e,0,1),n=be(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Br(a,r,t+1/3),this.g=Br(a,r,t),this.b=Br(a,r,t-1/3)}return ee.toWorkingColorSpace(this,s),this}setStyle(t,e=ye){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ye){const n=_l[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=yi(t.r),this.g=yi(t.g),this.b=yi(t.b),this}copyLinearToSRGB(t){return this.r=Ar(t.r),this.g=Ar(t.g),this.b=Ar(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ye){return ee.fromWorkingColorSpace(Ae.copy(this),t),Math.round(be(Ae.r*255,0,255))*65536+Math.round(be(Ae.g*255,0,255))*256+Math.round(be(Ae.b*255,0,255))}getHexString(t=ye){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ee.workingColorSpace){ee.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,s=Ae.g,r=Ae.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ee.workingColorSpace){return ee.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=ye){ee.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,s=Ae.b;return t!==ye?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Mn),this.setHSL(Mn.h+t,Mn.s+e,Mn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mn),t.getHSL(_s);const n=Tr(Mn.h,_s.h,e),s=Tr(Mn.s,_s.s,e),r=Tr(Mn.l,_s.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new Jt;Jt.NAMES=_l;let Wu=0;class Jn extends Zn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Wu++}),this.uuid=Pi(),this.name="",this.type="Material",this.blending=Ei,this.side=In,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ho,this.blendDst=uo,this.blendEquation=Gn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Jt(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pa,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ti,this.stencilZFail=ti,this.stencilZPass=ti,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ei&&(n.blending=this.blending),this.side!==In&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ho&&(n.blendSrc=this.blendSrc),this.blendDst!==uo&&(n.blendDst=this.blendDst),this.blendEquation!==Gn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Xs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pa&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ti&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ti&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ti&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class gn extends Jn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=el,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new I,vs=new ct;class tn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=La,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)vs.fromBufferAttribute(this,e),vs.applyMatrix3(t),this.setXY(e,vs.x,vs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Oi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Le(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Oi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Oi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Oi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Oi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Le(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Le(e,this.array),n=Le(n,this.array),s=Le(s,this.array),r=Le(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==La&&(t.usage=this.usage),t}}class vl extends tn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xl extends tn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends tn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let $u=0;const Ge=new ce,kr=new Ee,li=new I,Fe=new Li,ki=new Li,Se=new I;class Ce extends Zn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:$u++}),this.uuid=Pi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(fl(t)?xl:vl)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Yt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Ge.makeRotationFromQuaternion(t),this.applyMatrix4(Ge),this}rotateX(t){return Ge.makeRotationX(t),this.applyMatrix4(Ge),this}rotateY(t){return Ge.makeRotationY(t),this.applyMatrix4(Ge),this}rotateZ(t){return Ge.makeRotationZ(t),this.applyMatrix4(Ge),this}translate(t,e,n){return Ge.makeTranslation(t,e,n),this.applyMatrix4(Ge),this}scale(t,e,n){return Ge.makeScale(t,e,n),this.applyMatrix4(Ge),this}lookAt(t){return kr.lookAt(t),kr.updateMatrix(),this.applyMatrix4(kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Li);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Fe.setFromBufferAttribute(r),this.morphTargetsRelative?(Se.addVectors(this.boundingBox.min,Fe.min),this.boundingBox.expandByPoint(Se),Se.addVectors(this.boundingBox.max,Fe.max),this.boundingBox.expandByPoint(Se)):(this.boundingBox.expandByPoint(Fe.min),this.boundingBox.expandByPoint(Fe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ar);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(t){const n=this.boundingSphere.center;if(Fe.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ki.setFromBufferAttribute(o),this.morphTargetsRelative?(Se.addVectors(Fe.min,ki.min),Fe.expandByPoint(Se),Se.addVectors(Fe.max,ki.max),Fe.expandByPoint(Se)):(Fe.expandByPoint(ki.min),Fe.expandByPoint(ki.max))}Fe.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)Se.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(Se));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Se.fromBufferAttribute(o,l),c&&(li.fromBufferAttribute(t,l),Se.add(li)),s=Math.max(s,n.distanceToSquared(Se))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,s=e.position.array,r=e.normal.array,a=e.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new tn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let T=0;T<o;T++)l[T]=new I,h[T]=new I;const u=new I,d=new I,f=new I,g=new ct,_=new ct,p=new ct,m=new I,x=new I;function v(T,z,W){u.fromArray(s,T*3),d.fromArray(s,z*3),f.fromArray(s,W*3),g.fromArray(a,T*2),_.fromArray(a,z*2),p.fromArray(a,W*2),d.sub(u),f.sub(u),_.sub(g),p.sub(g);const rt=1/(_.x*p.y-p.x*_.y);isFinite(rt)&&(m.copy(d).multiplyScalar(p.y).addScaledVector(f,-_.y).multiplyScalar(rt),x.copy(f).multiplyScalar(_.x).addScaledVector(d,-p.x).multiplyScalar(rt),l[T].add(m),l[z].add(m),l[W].add(m),h[T].add(x),h[z].add(x),h[W].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let T=0,z=M.length;T<z;++T){const W=M[T],rt=W.start,L=W.count;for(let F=rt,B=rt+L;F<B;F+=3)v(n[F+0],n[F+1],n[F+2])}const R=new I,A=new I,w=new I,O=new I;function E(T){w.fromArray(r,T*3),O.copy(w);const z=l[T];R.copy(z),R.sub(w.multiplyScalar(w.dot(z))).normalize(),A.crossVectors(O,z);const rt=A.dot(h[T])<0?-1:1;c[T*4]=R.x,c[T*4+1]=R.y,c[T*4+2]=R.z,c[T*4+3]=rt}for(let T=0,z=M.length;T<z;++T){const W=M[T],rt=W.start,L=W.count;for(let F=rt,B=rt+L;F<B;F+=3)E(n[F+0]),E(n[F+1]),E(n[F+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new tn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new I,r=new I,a=new I,o=new I,c=new I,l=new I,h=new I,u=new I;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Se.fromBufferAttribute(t,e),Se.normalize(),t.setXYZ(e,Se.x,Se.y,Se.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let m=0;m<h;m++)d[g++]=l[f++]}return new tn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Ce,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const $a=new ce,Fn=new cr,xs=new ar,Xa=new I,hi=new I,ui=new I,di=new I,Gr=new I,Ss=new I,Ms=new ct,Es=new ct,ys=new ct,qa=new I,Ya=new I,Ka=new I,bs=new I,Ts=new I;class ie extends Ee{constructor(t=new Ce,e=new gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Ss.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Gr.fromBufferAttribute(u,t),a?Ss.addScaledVector(Gr,h):Ss.addScaledVector(Gr.sub(e),h))}e.add(Ss)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),Fn.copy(t.ray).recast(t.near),!(xs.containsPoint(Fn.origin)===!1&&(Fn.intersectSphere(xs,Xa)===null||Fn.origin.distanceToSquared(Xa)>(t.far-t.near)**2))&&($a.copy(r).invert(),Fn.copy(t.ray).applyMatrix4($a),!(n.boundingBox!==null&&Fn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Fn)))}_computeIntersections(t,e,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,R=v;M<R;M+=3){const A=o.getX(M),w=o.getX(M+1),O=o.getX(M+2);s=ws(this,m,t,n,l,h,u,A,w,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=o.getX(p),v=o.getX(p+1),M=o.getX(p+2);s=ws(this,a,t,n,l,h,u,x,v,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=a[p.materialIndex],x=Math.max(p.start,f.start),v=Math.min(c.count,Math.min(p.start+p.count,f.start+f.count));for(let M=x,R=v;M<R;M+=3){const A=M,w=M+1,O=M+2;s=ws(this,m,t,n,l,h,u,A,w,O),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const x=p,v=p+1,M=p+2;s=ws(this,a,t,n,l,h,u,x,v,M),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function Xu(i,t,e,n,s,r,a,o){let c;if(t.side===Ne?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===In,o),c===null)return null;Ts.copy(o),Ts.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(Ts);return l<e.near||l>e.far?null:{distance:l,point:Ts.clone(),object:i}}function ws(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,hi),i.getVertexPosition(c,ui),i.getVertexPosition(l,di);const h=Xu(i,t,e,n,hi,ui,di,bs);if(h){s&&(Ms.fromBufferAttribute(s,o),Es.fromBufferAttribute(s,c),ys.fromBufferAttribute(s,l),h.uv=Ve.getInterpolation(bs,hi,ui,di,Ms,Es,ys,new ct)),r&&(Ms.fromBufferAttribute(r,o),Es.fromBufferAttribute(r,c),ys.fromBufferAttribute(r,l),h.uv1=Ve.getInterpolation(bs,hi,ui,di,Ms,Es,ys,new ct),h.uv2=h.uv1),a&&(qa.fromBufferAttribute(a,o),Ya.fromBufferAttribute(a,c),Ka.fromBufferAttribute(a,l),h.normal=Ve.getInterpolation(bs,hi,ui,di,qa,Ya,Ka,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new I,materialIndex:0};Ve.getNormal(hi,ui,di,u.normal),h.face=u}return h}class Qn extends Ce{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(u,2));function g(_,p,m,x,v,M,R,A,w,O,E){const T=M/w,z=R/O,W=M/2,rt=R/2,L=A/2,F=w+1,B=O+1;let Y=0,j=0;const Z=new I;for(let J=0;J<B;J++){const at=J*z-rt;for(let ut=0;ut<F;ut++){const V=ut*T-W;Z[_]=V*x,Z[p]=at*v,Z[m]=L,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[p]=0,Z[m]=A>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(ut/w),u.push(1-J/O),Y+=1}}for(let J=0;J<O;J++)for(let at=0;at<w;at++){const ut=d+at+F*J,V=d+at+F*(J+1),et=d+(at+1)+F*(J+1),_t=d+(at+1)+F*J;c.push(ut,V,_t),c.push(V,et,_t),j+=6}o.addGroup(f,j,E),f+=j,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Qn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ci(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Re(i){const t={};for(let e=0;e<i.length;e++){const n=Ci(i[e]);for(const s in n)t[s]=n[s]}return t}function qu(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Sl(i){return i.getRenderTarget()===null?i.outputColorSpace:ee.workingColorSpace}const Yu={clone:Ci,merge:Re};var Ku=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ju=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Kn extends Jn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ku,this.fragmentShader=ju,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ci(t.uniforms),this.uniformsGroups=qu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Ml extends Ee{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ce,this.projectionMatrix=new ce,this.projectionMatrixInverse=new ce,this.coordinateSystem=fn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ye extends Ml{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=vo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return vo*2*Math.atan(Math.tan(Xi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const fi=-90,pi=1;class Zu extends Ee{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ye(fi,pi,t,e);s.layers=this.layers,this.add(s);const r=new Ye(fi,pi,t,e);r.layers=this.layers,this.add(r);const a=new Ye(fi,pi,t,e);a.layers=this.layers,this.add(a);const o=new Ye(fi,pi,t,e);o.layers=this.layers,this.add(o);const c=new Ye(fi,pi,t,e);c.layers=this.layers,this.add(c);const l=new Ye(fi,pi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===js)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class El extends Be{constructor(t,e,n,s,r,a,o,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Ti,super(t,e,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ju extends qn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];e.encoding!==void 0&&(qi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===$n?ye:We),this.texture=new El(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:He}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Qn(5,5,5),r=new Kn({name:"CubemapFromEquirect",uniforms:Ci(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Cn});r.uniforms.tEquirect.value=e;const a=new ie(s,r),o=e.minFilter;return e.minFilter===Ji&&(e.minFilter=He),new Zu(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}}const Hr=new I,Qu=new I,td=new Yt;class yn{constructor(t=new I(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Hr.subVectors(n,e).cross(Qu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Hr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||td.getNormalMatrix(t),s=this.coplanarPoint(Hr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zn=new ar,As=new I;class Ro{constructor(t=new yn,e=new yn,n=new yn,s=new yn,r=new yn,a=new yn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=fn){const n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],p=s[11],m=s[12],x=s[13],v=s[14],M=s[15];if(n[0].setComponents(c-r,d-l,p-f,M-m).normalize(),n[1].setComponents(c+r,d+l,p+f,M+m).normalize(),n[2].setComponents(c+a,d+h,p+g,M+x).normalize(),n[3].setComponents(c-a,d-h,p-g,M-x).normalize(),n[4].setComponents(c-o,d-u,p-_,M-v).normalize(),e===fn)n[5].setComponents(c+o,d+u,p+_,M+v).normalize();else if(e===js)n[5].setComponents(o,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),zn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zn)}intersectsSprite(t){return zn.center.set(0,0,0),zn.radius=.7071067811865476,zn.applyMatrix4(t.matrixWorld),this.intersectsSphere(zn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(As.x=s.normal.x>0?t.max.x:t.min.x,As.y=s.normal.y>0?t.max.y:t.min.y,As.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(As)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function yl(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function ed(i,t){const e=t.isWebGL2,n=new WeakMap;function s(l,h){const u=l.array,d=l.usage,f=u.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,u,d),l.onUploadCallback();let _;if(u instanceof Float32Array)_=i.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(u instanceof Int16Array)_=i.SHORT;else if(u instanceof Uint32Array)_=i.UNSIGNED_INT;else if(u instanceof Int32Array)_=i.INT;else if(u instanceof Int8Array)_=i.BYTE;else if(u instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:g,type:_,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,u){const d=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(u,l),f.count===-1&&g.length===0&&i.bufferSubData(u,0,d),g.length!==0){for(let _=0,p=g.length;_<p;_++){const m=g[_];e?i.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):i.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(e?i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):i.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:a,remove:o,update:c}}class hr extends Ce{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=t/o,d=e/c,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const x=m*d-a;for(let v=0;v<l;v++){const M=v*u-r;g.push(M,-x,0),_.push(0,0,1),p.push(v/o),p.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<o;x++){const v=x+l*m,M=x+l*(m+1),R=x+1+l*(m+1),A=x+1+l*m;f.push(v,M,A),f.push(M,R,A)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hr(t.width,t.height,t.widthSegments,t.heightSegments)}}var nd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,id=`#ifdef USE_ALPHAHASH
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
#endif`,sd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,rd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,od=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,ad=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cd=`#ifdef USE_AOMAP
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
#endif`,ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,hd=`#ifdef USE_BATCHING
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
#endif`,ud=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,dd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,fd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,pd=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,md=`#ifdef USE_IRIDESCENCE
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
#endif`,gd=`#ifdef USE_BUMPMAP
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
#endif`,_d=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,vd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Sd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Md=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Ed=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,bd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Td=`#define PI 3.141592653589793
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
} // validated`,wd=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ad=`vec3 transformedNormal = objectNormal;
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
#endif`,Cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Rd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Pd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ld=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Id="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dd=`
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
}`,Nd=`#ifdef USE_ENVMAP
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
#endif`,Ud=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Od=`#ifdef USE_ENVMAP
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
#endif`,Fd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Bd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Gd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Hd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Vd=`#ifdef USE_GRADIENTMAP
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
}`,Wd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,$d=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yd=`uniform bool receiveShadow;
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
#endif`,Kd=`#ifdef USE_ENVMAP
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
#endif`,jd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,tf=`PhysicalMaterial material;
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
#endif`,ef=`struct PhysicalMaterial {
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
}`,nf=`
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
#endif`,sf=`#if defined( RE_IndirectDiffuse )
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
#endif`,rf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,of=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,af=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,lf=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,hf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,uf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,df=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ff=`#if defined( USE_POINTS_UV )
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
#endif`,pf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,mf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_f=`#ifdef USE_MORPHNORMALS
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
#endif`,vf=`#ifdef USE_MORPHTARGETS
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
#endif`,xf=`#ifdef USE_MORPHTARGETS
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
#endif`,Sf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Mf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ef=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Tf=`#ifdef USE_NORMALMAP
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
#endif`,wf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Af=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,If=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Df=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Uf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Of=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ff=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Bf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Gf=`float getShadowMask() {
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
}`,Hf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Vf=`#ifdef USE_SKINNING
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
#endif`,Wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,$f=`#ifdef USE_SKINNING
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
#endif`,Xf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,qf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Yf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jf=`#ifdef USE_TRANSMISSION
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
#endif`,Zf=`#ifdef USE_TRANSMISSION
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
#endif`,Jf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Qf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,tp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,ep=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const np=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ip=`uniform sampler2D t2D;
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
}`,sp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rp=`#ifdef ENVMAP_TYPE_CUBE
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
}`,op=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ap=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cp=`#include <common>
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
}`,lp=`#if DEPTH_PACKING == 3200
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
}`,hp=`#define DISTANCE
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
}`,up=`#define DISTANCE
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
}`,dp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pp=`uniform float scale;
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
}`,mp=`uniform vec3 diffuse;
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
}`,gp=`#include <common>
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
}`,_p=`uniform vec3 diffuse;
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
}`,vp=`#define LAMBERT
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
}`,xp=`#define LAMBERT
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
}`,Sp=`#define MATCAP
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
}`,Mp=`#define MATCAP
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
}`,Ep=`#define NORMAL
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
}`,yp=`#define NORMAL
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
}`,bp=`#define PHONG
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
}`,Tp=`#define PHONG
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
}`,wp=`#define STANDARD
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
}`,Ap=`#define STANDARD
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
}`,Cp=`#define TOON
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
}`,Rp=`#define TOON
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
}`,Pp=`uniform float size;
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
}`,Lp=`uniform vec3 diffuse;
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
}`,Ip=`#include <common>
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
}`,Dp=`uniform vec3 color;
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
}`,Np=`uniform float rotation;
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
}`,Up=`uniform vec3 diffuse;
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
}`,Wt={alphahash_fragment:nd,alphahash_pars_fragment:id,alphamap_fragment:sd,alphamap_pars_fragment:rd,alphatest_fragment:od,alphatest_pars_fragment:ad,aomap_fragment:cd,aomap_pars_fragment:ld,batching_pars_vertex:hd,batching_vertex:ud,begin_vertex:dd,beginnormal_vertex:fd,bsdfs:pd,iridescence_fragment:md,bumpmap_pars_fragment:gd,clipping_planes_fragment:_d,clipping_planes_pars_fragment:vd,clipping_planes_pars_vertex:xd,clipping_planes_vertex:Sd,color_fragment:Md,color_pars_fragment:Ed,color_pars_vertex:yd,color_vertex:bd,common:Td,cube_uv_reflection_fragment:wd,defaultnormal_vertex:Ad,displacementmap_pars_vertex:Cd,displacementmap_vertex:Rd,emissivemap_fragment:Pd,emissivemap_pars_fragment:Ld,colorspace_fragment:Id,colorspace_pars_fragment:Dd,envmap_fragment:Nd,envmap_common_pars_fragment:Ud,envmap_pars_fragment:Od,envmap_pars_vertex:Fd,envmap_physical_pars_fragment:Kd,envmap_vertex:zd,fog_vertex:Bd,fog_pars_vertex:kd,fog_fragment:Gd,fog_pars_fragment:Hd,gradientmap_pars_fragment:Vd,lightmap_fragment:Wd,lightmap_pars_fragment:$d,lights_lambert_fragment:Xd,lights_lambert_pars_fragment:qd,lights_pars_begin:Yd,lights_toon_fragment:jd,lights_toon_pars_fragment:Zd,lights_phong_fragment:Jd,lights_phong_pars_fragment:Qd,lights_physical_fragment:tf,lights_physical_pars_fragment:ef,lights_fragment_begin:nf,lights_fragment_maps:sf,lights_fragment_end:rf,logdepthbuf_fragment:of,logdepthbuf_pars_fragment:af,logdepthbuf_pars_vertex:cf,logdepthbuf_vertex:lf,map_fragment:hf,map_pars_fragment:uf,map_particle_fragment:df,map_particle_pars_fragment:ff,metalnessmap_fragment:pf,metalnessmap_pars_fragment:mf,morphcolor_vertex:gf,morphnormal_vertex:_f,morphtarget_pars_vertex:vf,morphtarget_vertex:xf,normal_fragment_begin:Sf,normal_fragment_maps:Mf,normal_pars_fragment:Ef,normal_pars_vertex:yf,normal_vertex:bf,normalmap_pars_fragment:Tf,clearcoat_normal_fragment_begin:wf,clearcoat_normal_fragment_maps:Af,clearcoat_pars_fragment:Cf,iridescence_pars_fragment:Rf,opaque_fragment:Pf,packing:Lf,premultiplied_alpha_fragment:If,project_vertex:Df,dithering_fragment:Nf,dithering_pars_fragment:Uf,roughnessmap_fragment:Of,roughnessmap_pars_fragment:Ff,shadowmap_pars_fragment:zf,shadowmap_pars_vertex:Bf,shadowmap_vertex:kf,shadowmask_pars_fragment:Gf,skinbase_vertex:Hf,skinning_pars_vertex:Vf,skinning_vertex:Wf,skinnormal_vertex:$f,specularmap_fragment:Xf,specularmap_pars_fragment:qf,tonemapping_fragment:Yf,tonemapping_pars_fragment:Kf,transmission_fragment:jf,transmission_pars_fragment:Zf,uv_pars_fragment:Jf,uv_pars_vertex:Qf,uv_vertex:tp,worldpos_vertex:ep,background_vert:np,background_frag:ip,backgroundCube_vert:sp,backgroundCube_frag:rp,cube_vert:op,cube_frag:ap,depth_vert:cp,depth_frag:lp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:dp,equirect_frag:fp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:_p,meshlambert_vert:vp,meshlambert_frag:xp,meshmatcap_vert:Sp,meshmatcap_frag:Mp,meshnormal_vert:Ep,meshnormal_frag:yp,meshphong_vert:bp,meshphong_frag:Tp,meshphysical_vert:wp,meshphysical_frag:Ap,meshtoon_vert:Cp,meshtoon_frag:Rp,points_vert:Pp,points_frag:Lp,shadow_vert:Ip,shadow_frag:Dp,sprite_vert:Np,sprite_frag:Up},pt={common:{diffuse:{value:new Jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Yt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Yt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Yt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Yt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Yt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Yt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Yt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Yt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Yt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0},uvTransform:{value:new Yt}},sprite:{diffuse:{value:new Jt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Yt},alphaMap:{value:null},alphaMapTransform:{value:new Yt},alphaTest:{value:0}}},Je={basic:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Re([pt.common,pt.specularmap,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,pt.lights,{emissive:{value:new Jt(0)},specular:{value:new Jt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Re([pt.common,pt.envmap,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.roughnessmap,pt.metalnessmap,pt.fog,pt.lights,{emissive:{value:new Jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Re([pt.common,pt.aomap,pt.lightmap,pt.emissivemap,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.gradientmap,pt.fog,pt.lights,{emissive:{value:new Jt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Re([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,pt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Re([pt.points,pt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Re([pt.common,pt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Re([pt.common,pt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Re([pt.common,pt.bumpmap,pt.normalmap,pt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Re([pt.sprite,pt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Yt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Re([pt.common,pt.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Re([pt.lights,pt.fog,{color:{value:new Jt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};Je.physical={uniforms:Re([Je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Yt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Yt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Yt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Yt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Yt},sheen:{value:0},sheenColor:{value:new Jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Yt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Yt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Yt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Yt},attenuationDistance:{value:0},attenuationColor:{value:new Jt(0)},specularColor:{value:new Jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Yt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Yt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Yt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Cs={r:0,b:0,g:0};function Op(i,t,e,n,s,r,a){const o=new Jt(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(p,m){let x=!1,v=m.isScene===!0?m.background:null;v&&v.isTexture&&(v=(m.backgroundBlurriness>0?e:t).get(v)),v===null?_(o,c):v&&v.isColor&&(_(v,1),x=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||x)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===rr)?(h===void 0&&(h=new ie(new Qn(1,1,1),new Kn({name:"BackgroundCubeMaterial",uniforms:Ci(Je.backgroundCube.uniforms),vertexShader:Je.backgroundCube.vertexShader,fragmentShader:Je.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,A,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=v,h.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=ee.getTransfer(v.colorSpace)!==se,(u!==v||d!==v.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),h.layers.enableAll(),p.unshift(h,h.geometry,h.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new ie(new hr(2,2),new Kn({name:"BackgroundMaterial",uniforms:Ci(Je.background.uniforms),vertexShader:Je.background.vertexShader,fragmentShader:Je.background.fragmentShader,side:In,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=ee.getTransfer(v.colorSpace)!==se,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||d!==v.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=v,d=v.version,f=i.toneMapping),l.layers.enableAll(),p.unshift(l,l.geometry,l.material,0,0,null))}function _(p,m){p.getRGB(Cs,Sl(i)),n.buffers.color.setClear(Cs.r,Cs.g,Cs.b,m,a)}return{getClearColor:function(){return o},setClearColor:function(p,m=1){o.set(p),c=m,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(p){c=p,_(o,c)},render:g}}function Fp(i,t,e,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=p(null);let l=c,h=!1;function u(L,F,B,Y,j){let Z=!1;if(a){const J=_(Y,B,F);l!==J&&(l=J,f(l.object)),Z=m(L,Y,B,j),Z&&x(L,Y,B,j)}else{const J=F.wireframe===!0;(l.geometry!==Y.id||l.program!==B.id||l.wireframe!==J)&&(l.geometry=Y.id,l.program=B.id,l.wireframe=J,Z=!0)}j!==null&&e.update(j,i.ELEMENT_ARRAY_BUFFER),(Z||h)&&(h=!1,O(L,F,B,Y),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(j).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,F,B){const Y=B.wireframe===!0;let j=o[L.id];j===void 0&&(j={},o[L.id]=j);let Z=j[F.id];Z===void 0&&(Z={},j[F.id]=Z);let J=Z[Y];return J===void 0&&(J=p(d()),Z[Y]=J),J}function p(L){const F=[],B=[],Y=[];for(let j=0;j<s;j++)F[j]=0,B[j]=0,Y[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:B,attributeDivisors:Y,object:L,attributes:{},index:null}}function m(L,F,B,Y){const j=l.attributes,Z=F.attributes;let J=0;const at=B.getAttributes();for(const ut in at)if(at[ut].location>=0){const et=j[ut];let _t=Z[ut];if(_t===void 0&&(ut==="instanceMatrix"&&L.instanceMatrix&&(_t=L.instanceMatrix),ut==="instanceColor"&&L.instanceColor&&(_t=L.instanceColor)),et===void 0||et.attribute!==_t||_t&&et.data!==_t.data)return!0;J++}return l.attributesNum!==J||l.index!==Y}function x(L,F,B,Y){const j={},Z=F.attributes;let J=0;const at=B.getAttributes();for(const ut in at)if(at[ut].location>=0){let et=Z[ut];et===void 0&&(ut==="instanceMatrix"&&L.instanceMatrix&&(et=L.instanceMatrix),ut==="instanceColor"&&L.instanceColor&&(et=L.instanceColor));const _t={};_t.attribute=et,et&&et.data&&(_t.data=et.data),j[ut]=_t,J++}l.attributes=j,l.attributesNum=J,l.index=Y}function v(){const L=l.newAttributes;for(let F=0,B=L.length;F<B;F++)L[F]=0}function M(L){R(L,0)}function R(L,F){const B=l.newAttributes,Y=l.enabledAttributes,j=l.attributeDivisors;B[L]=1,Y[L]===0&&(i.enableVertexAttribArray(L),Y[L]=1),j[L]!==F&&((n.isWebGL2?i:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,F),j[L]=F)}function A(){const L=l.newAttributes,F=l.enabledAttributes;for(let B=0,Y=F.length;B<Y;B++)F[B]!==L[B]&&(i.disableVertexAttribArray(B),F[B]=0)}function w(L,F,B,Y,j,Z,J){J===!0?i.vertexAttribIPointer(L,F,B,j,Z):i.vertexAttribPointer(L,F,B,Y,j,Z)}function O(L,F,B,Y){if(n.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;v();const j=Y.attributes,Z=B.getAttributes(),J=F.defaultAttributeValues;for(const at in Z){const ut=Z[at];if(ut.location>=0){let V=j[at];if(V===void 0&&(at==="instanceMatrix"&&L.instanceMatrix&&(V=L.instanceMatrix),at==="instanceColor"&&L.instanceColor&&(V=L.instanceColor)),V!==void 0){const et=V.normalized,_t=V.itemSize,At=e.get(V);if(At===void 0)continue;const Et=At.buffer,Nt=At.type,zt=At.bytesPerElement,wt=n.isWebGL2===!0&&(Nt===i.INT||Nt===i.UNSIGNED_INT||V.gpuType===il);if(V.isInterleavedBufferAttribute){const Ft=V.data,P=Ft.stride,ft=V.offset;if(Ft.isInstancedInterleavedBuffer){for(let q=0;q<ut.locationSize;q++)R(ut.location+q,Ft.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Ft.meshPerAttribute*Ft.count)}else for(let q=0;q<ut.locationSize;q++)M(ut.location+q);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let q=0;q<ut.locationSize;q++)w(ut.location+q,_t/ut.locationSize,Nt,et,P*zt,(ft+_t/ut.locationSize*q)*zt,wt)}else{if(V.isInstancedBufferAttribute){for(let Ft=0;Ft<ut.locationSize;Ft++)R(ut.location+Ft,V.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Ft=0;Ft<ut.locationSize;Ft++)M(ut.location+Ft);i.bindBuffer(i.ARRAY_BUFFER,Et);for(let Ft=0;Ft<ut.locationSize;Ft++)w(ut.location+Ft,_t/ut.locationSize,Nt,et,_t*zt,_t/ut.locationSize*Ft*zt,wt)}}else if(J!==void 0){const et=J[at];if(et!==void 0)switch(et.length){case 2:i.vertexAttrib2fv(ut.location,et);break;case 3:i.vertexAttrib3fv(ut.location,et);break;case 4:i.vertexAttrib4fv(ut.location,et);break;default:i.vertexAttrib1fv(ut.location,et)}}}}A()}function E(){W();for(const L in o){const F=o[L];for(const B in F){const Y=F[B];for(const j in Y)g(Y[j].object),delete Y[j];delete F[B]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const F=o[L.id];for(const B in F){const Y=F[B];for(const j in Y)g(Y[j].object),delete Y[j];delete F[B]}delete o[L.id]}function z(L){for(const F in o){const B=o[F];if(B[L.id]===void 0)continue;const Y=B[L.id];for(const j in Y)g(Y[j].object),delete Y[j];delete B[L.id]}}function W(){rt(),h=!0,l!==c&&(l=c,f(l.object))}function rt(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:W,resetDefaultState:rt,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:z,initAttributes:v,enableAttribute:M,disableUnusedAttributes:A}}function zp(i,t,e,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,u){i.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,d){if(d===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,u,d),e.update(u,r,d)}function l(h,u,d){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<d;g++)this.render(h[g],u[g]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_];e.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Bp(i,t,e){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const w=t.get("EXT_texture_filter_anisotropic");n=i.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(w){if(w==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),p=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),m=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,M=a||t.has("OES_texture_float"),R=v&&M,A=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:p,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:v,floatFragmentTextures:M,floatVertexTextures:R,maxSamples:A}}function kp(i){const t=this;let e=null,n=0,s=!1,r=!1;const a=new yn,o=new Yt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const x=r?0:n,v=x*4;let M=m.clippingState||null;c.value=M,M=h(g,d,v,f);for(let R=0;R!==v;++R)M[R]=e[R];m.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const m=f+_*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<m)&&(p=new Float32Array(m));for(let v=0,M=f;v!==_;++v,M+=4)a.copy(u[v]).applyMatrix4(x,o),a.normal.toArray(p,M),p[M+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function Gp(i){let t=new WeakMap;function e(a,o){return o===fo?a.mapping=Ti:o===po&&(a.mapping=wi),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===fo||o===po)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Ju(c.height/2);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Po extends Ml{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const xi=4,ja=[.125,.215,.35,.446,.526,.582],Hn=20,Vr=new Po,Za=new Jt;let Wr=null,$r=0,Xr=0;const Bn=(1+Math.sqrt(5))/2,mi=1/Bn,Ja=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,Bn,mi),new I(0,Bn,-mi),new I(mi,0,Bn),new I(-mi,0,Bn),new I(Bn,mi,0),new I(-Bn,mi,0)];class Qa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){Wr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=nc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ec(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Wr,$r,Xr),t.scissorTest=!1,Rs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Ti||t.mapping===wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Wr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),Xr=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:He,minFilter:He,generateMipmaps:!1,type:Qi,format:je,colorSpace:mn,depthBuffer:!1},s=tc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=tc(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hp(r)),this._blurMaterial=Vp(r,t,e)}return s}_compileMaterial(t){const e=new ie(this._lodPlanes[0],t);this._renderer.compile(e,Vr)}_sceneToCubeUV(t,e,n,s){const o=new Ye(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Za),h.toneMapping=Rn,h.autoClear=!1;const f=new gn({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new ie(new Qn,f);let _=!1;const p=t.background;p?p.isColor&&(f.color.copy(p),t.background=null,_=!0):(f.color.copy(Za),_=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(o.up.set(0,c[m],0),o.lookAt(l[m],0,0)):x===1?(o.up.set(0,0,c[m]),o.lookAt(0,l[m],0)):(o.up.set(0,c[m],0),o.lookAt(0,0,l[m]));const v=this._cubeSize;Rs(s,x*v,m>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Ti||t.mapping===wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=nc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ec());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new ie(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Rs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Vr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Ja[(s-1)%Ja.length];this._blur(t,s-1,s,r,a)}e.autoClear=n}_blur(t,e,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ie(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Hn-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):Hn;p>Hn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Hn}`);const m=[];let x=0;for(let w=0;w<Hn;++w){const O=w/_,E=Math.exp(-O*O/2);m.push(E),w===0?x+=E:w<p&&(x+=2*E)}for(let w=0;w<m.length;w++)m[w]=m[w]/x;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=g,d.mipInt.value=v-n;const M=this._sizeLods[s],R=3*M*(s>v-xi?s-v+xi:0),A=4*(this._cubeSize-M);Rs(e,R,A,3*M,2*M),c.setRenderTarget(e),c.render(u,Vr)}}function Hp(i){const t=[],e=[],n=[];let s=i;const r=i-xi+1+ja.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>i-xi?c=ja[a-i+xi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,x=new Float32Array(_*g*f),v=new Float32Array(p*g*f),M=new Float32Array(m*g*f);for(let A=0;A<f;A++){const w=A%3*2/3-1,O=A>2?0:-1,E=[w,O,0,w+2/3,O,0,w+2/3,O+1,0,w,O,0,w+2/3,O+1,0,w,O+1,0];x.set(E,_*g*A),v.set(d,p*g*A);const T=[A,A,A,A,A,A];M.set(T,m*g*A)}const R=new Ce;R.setAttribute("position",new tn(x,_)),R.setAttribute("uv",new tn(v,p)),R.setAttribute("faceIndex",new tn(M,m)),t.push(R),s>xi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function tc(i,t,e){const n=new qn(i,t,e);return n.texture.mapping=rr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Rs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Vp(i,t,e){const n=new Float32Array(Hn),s=new I(0,1,0);return new Kn({name:"SphericalGaussianBlur",defines:{n:Hn,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Lo(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function ec(){return new Kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Lo(),fragmentShader:`

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
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function nc(){return new Kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Lo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Cn,depthTest:!1,depthWrite:!1})}function Lo(){return`

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
	`}function Wp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===fo||c===po,h=c===Ti||c===wi;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let u=t.get(o);return e===null&&(e=new Qa(i)),u=l?e.fromEquirectangular(o,u):e.fromCubemap(o,u),t.set(o,u),u.texture}else{if(t.has(o))return t.get(o).texture;{const u=o.image;if(l&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Qa(i));const d=l?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function $p(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const s=e(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Xp(i,t,e,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let p=0,m=_.length;p<m;p++)t.remove(_[p])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let p=0,m=_.length;p<m;p++)t.update(_[p],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const x=f.array;_=f.version;for(let v=0,M=x.length;v<M;v+=3){const R=x[v+0],A=x[v+1],w=x[v+2];d.push(R,A,A,w,w,R)}}else if(g!==void 0){const x=g.array;_=g.version;for(let v=0,M=x.length/3-1;v<M;v+=3){const R=v+0,A=v+1,w=v+2;d.push(R,A,A,w,w,R)}}else return;const p=new(fl(d)?xl:vl)(d,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function qp(i,t,e,n){const s=n.isWebGL2;let r;function a(f){r=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function h(f,g){i.drawElements(r,g,o,f*c),e.update(g,r,1)}function u(f,g,_){if(_===0)return;let p,m;if(s)p=i,m="drawElementsInstanced";else if(p=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",p===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[m](r,g,o,f*c,_),e.update(g,r,_)}function d(f,g,_){if(_===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<_;m++)this.render(f[m]/c,g[m]);else{p.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let m=0;for(let x=0;x<_;x++)m+=g[x];e.update(m,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function Yp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Kp(i,t){return i[0]-t[0]}function jp(i,t){return Math.abs(t[1])-Math.abs(i[1])}function Zp(i,t,e){const n={},s=new Float32Array(8),r=new WeakMap,a=new Me,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let p=r.get(h);if(p===void 0||p.count!==_){let F=function(){rt.dispose(),r.delete(h),h.removeEventListener("dispose",F)};var f=F;p!==void 0&&p.texture.dispose();const v=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,A=h.morphAttributes.position||[],w=h.morphAttributes.normal||[],O=h.morphAttributes.color||[];let E=0;v===!0&&(E=1),M===!0&&(E=2),R===!0&&(E=3);let T=h.attributes.position.count*E,z=1;T>t.maxTextureSize&&(z=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const W=new Float32Array(T*z*4*_),rt=new gl(W,T,z,_);rt.type=Tn,rt.needsUpdate=!0;const L=E*4;for(let B=0;B<_;B++){const Y=A[B],j=w[B],Z=O[B],J=T*z*4*B;for(let at=0;at<Y.count;at++){const ut=at*L;v===!0&&(a.fromBufferAttribute(Y,at),W[J+ut+0]=a.x,W[J+ut+1]=a.y,W[J+ut+2]=a.z,W[J+ut+3]=0),M===!0&&(a.fromBufferAttribute(j,at),W[J+ut+4]=a.x,W[J+ut+5]=a.y,W[J+ut+6]=a.z,W[J+ut+7]=0),R===!0&&(a.fromBufferAttribute(Z,at),W[J+ut+8]=a.x,W[J+ut+9]=a.y,W[J+ut+10]=a.z,W[J+ut+11]=Z.itemSize===4?a.w:1)}}p={count:_,texture:rt,size:new ct(T,z)},r.set(h,p),h.addEventListener("dispose",F)}let m=0;for(let v=0;v<d.length;v++)m+=d[v];const x=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(i,"morphTargetBaseInfluence",x),u.getUniforms().setValue(i,"morphTargetInfluences",d),u.getUniforms().setValue(i,"morphTargetsTexture",p.texture,e),u.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}else{const g=d===void 0?0:d.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[h.id]=_}for(let M=0;M<g;M++){const R=_[M];R[0]=M,R[1]=d[M]}_.sort(jp);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(Kp);const p=h.morphAttributes.position,m=h.morphAttributes.normal;let x=0;for(let M=0;M<8;M++){const R=o[M],A=R[0],w=R[1];A!==Number.MAX_SAFE_INTEGER&&w?(p&&h.getAttribute("morphTarget"+M)!==p[A]&&h.setAttribute("morphTarget"+M,p[A]),m&&h.getAttribute("morphNormal"+M)!==m[A]&&h.setAttribute("morphNormal"+M,m[A]),s[M]=w,x+=w):(p&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),m&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),s[M]=0)}const v=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(i,"morphTargetBaseInfluence",v),u.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Jp(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}class bl extends Be{constructor(t,e,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:Wn,h!==Wn&&h!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Wn&&(n=bn),n===void 0&&h===Ai&&(n=Vn),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Pe,this.minFilter=c!==void 0?c:Pe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Tl=new Be,wl=new bl(1,1);wl.compareFunction=dl;const Al=new gl,Cl=new Uu,Rl=new El,ic=[],sc=[],rc=new Float32Array(16),oc=new Float32Array(9),ac=new Float32Array(4);function Ii(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ic[s];if(r===void 0&&(r=new Float32Array(s),ic[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function _e(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ve(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function ur(i,t){let e=sc[t];e===void 0&&(e=new Int32Array(t),sc[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Qp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function tm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2fv(this.addr,t),ve(e,t)}}function em(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(_e(e,t))return;i.uniform3fv(this.addr,t),ve(e,t)}}function nm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4fv(this.addr,t),ve(e,t)}}function im(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;ac.set(n),i.uniformMatrix2fv(this.addr,!1,ac),ve(e,n)}}function sm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;oc.set(n),i.uniformMatrix3fv(this.addr,!1,oc),ve(e,n)}}function rm(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(_e(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ve(e,t)}else{if(_e(e,n))return;rc.set(n),i.uniformMatrix4fv(this.addr,!1,rc),ve(e,n)}}function om(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function am(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2iv(this.addr,t),ve(e,t)}}function cm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3iv(this.addr,t),ve(e,t)}}function lm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4iv(this.addr,t),ve(e,t)}}function hm(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function um(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(_e(e,t))return;i.uniform2uiv(this.addr,t),ve(e,t)}}function dm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(_e(e,t))return;i.uniform3uiv(this.addr,t),ve(e,t)}}function fm(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(_e(e,t))return;i.uniform4uiv(this.addr,t),ve(e,t)}}function pm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?wl:Tl;e.setTexture2D(t||r,s)}function mm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Cl,s)}function gm(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Rl,s)}function _m(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Al,s)}function vm(i){switch(i){case 5126:return Qp;case 35664:return tm;case 35665:return em;case 35666:return nm;case 35674:return im;case 35675:return sm;case 35676:return rm;case 5124:case 35670:return om;case 35667:case 35671:return am;case 35668:case 35672:return cm;case 35669:case 35673:return lm;case 5125:return hm;case 36294:return um;case 36295:return dm;case 36296:return fm;case 35678:case 36198:case 36298:case 36306:case 35682:return pm;case 35679:case 36299:case 36307:return mm;case 35680:case 36300:case 36308:case 36293:return gm;case 36289:case 36303:case 36311:case 36292:return _m}}function xm(i,t){i.uniform1fv(this.addr,t)}function Sm(i,t){const e=Ii(t,this.size,2);i.uniform2fv(this.addr,e)}function Mm(i,t){const e=Ii(t,this.size,3);i.uniform3fv(this.addr,e)}function Em(i,t){const e=Ii(t,this.size,4);i.uniform4fv(this.addr,e)}function ym(i,t){const e=Ii(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function bm(i,t){const e=Ii(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Tm(i,t){const e=Ii(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function wm(i,t){i.uniform1iv(this.addr,t)}function Am(i,t){i.uniform2iv(this.addr,t)}function Cm(i,t){i.uniform3iv(this.addr,t)}function Rm(i,t){i.uniform4iv(this.addr,t)}function Pm(i,t){i.uniform1uiv(this.addr,t)}function Lm(i,t){i.uniform2uiv(this.addr,t)}function Im(i,t){i.uniform3uiv(this.addr,t)}function Dm(i,t){i.uniform4uiv(this.addr,t)}function Nm(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Tl,r[a])}function Um(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Cl,r[a])}function Om(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Rl,r[a])}function Fm(i,t,e){const n=this.cache,s=t.length,r=ur(e,s);_e(n,r)||(i.uniform1iv(this.addr,r),ve(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Al,r[a])}function zm(i){switch(i){case 5126:return xm;case 35664:return Sm;case 35665:return Mm;case 35666:return Em;case 35674:return ym;case 35675:return bm;case 35676:return Tm;case 5124:case 35670:return wm;case 35667:case 35671:return Am;case 35668:case 35672:return Cm;case 35669:case 35673:return Rm;case 5125:return Pm;case 36294:return Lm;case 36295:return Im;case 36296:return Dm;case 35678:case 36198:case 36298:case 36306:case 35682:return Nm;case 35679:case 36299:case 36307:return Um;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return Fm}}class Bm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vm(e.type)}}class km{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zm(e.type)}}class Gm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,e[o.id],n)}}}const qr=/(\w+)(\])?(\[|\.)?/g;function cc(i,t){i.seq.push(t),i.map[t.id]=t}function Hm(i,t,e){const n=i.name,s=n.length;for(qr.lastIndex=0;;){const r=qr.exec(n),a=qr.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){cc(e,l===void 0?new Bm(o,i,t):new km(o,i,t));break}else{let u=e.map[o];u===void 0&&(u=new Gm(o),cc(e,u)),e=u}}}class Gs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Hm(r,a,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in e&&n.push(a)}return n}}function lc(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Vm=37297;let Wm=0;function $m(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function Xm(i){const t=ee.getPrimaries(ee.workingColorSpace),e=ee.getPrimaries(i);let n;switch(t===e?n="":t===Ks&&e===Ys?n="LinearDisplayP3ToLinearSRGB":t===Ys&&e===Ks&&(n="LinearSRGBToLinearDisplayP3"),i){case mn:case or:return[n,"LinearTransferOETF"];case ye:case Ao:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function hc(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+$m(i.getShaderSource(t),a)}else return s}function qm(i,t){const e=Xm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Ym(i,t){let e;switch(t){case iu:e="Linear";break;case su:e="Reinhard";break;case ru:e="OptimizedCineon";break;case ou:e="ACESFilmic";break;case cu:e="AgX";break;case au:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Km(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Si).join(`
`)}function jm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Si).join(`
`)}function Zm(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Jm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function Si(i){return i!==""}function uc(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function dc(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qm=/^[ \t]*#include +<([\w\d./]+)>/gm;function So(i){return i.replace(Qm,eg)}const tg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function eg(i,t){let e=Wt[t];if(e===void 0){const n=tg.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return So(e)}const ng=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fc(i){return i.replace(ng,ig)}function ig(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function pc(i){let t="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sg(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===tl?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Lh?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===un&&(t="SHADOWMAP_TYPE_VSM"),t}function rg(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Ti:case wi:t="ENVMAP_TYPE_CUBE";break;case rr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function og(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case wi:t="ENVMAP_MODE_REFRACTION";break}return t}function ag(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case el:t="ENVMAP_BLENDING_MULTIPLY";break;case eu:t="ENVMAP_BLENDING_MIX";break;case nu:t="ENVMAP_BLENDING_ADD";break}return t}function cg(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lg(i,t,e,n){const s=i.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=sg(e),l=rg(e),h=og(e),u=ag(e),d=cg(e),f=e.isWebGL2?"":Km(e),g=jm(e),_=Zm(r),p=s.createProgram();let m,x,v=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Si).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_].filter(Si).join(`
`),x.length>0&&(x+=`
`)):(m=[pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Si).join(`
`),x=[f,pc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,_,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Rn?"#define TONE_MAPPING":"",e.toneMapping!==Rn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Rn?Ym("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,qm("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Si).join(`
`)),a=So(a),a=uc(a,e),a=dc(a,e),o=So(o),o=uc(o,e),o=dc(o,e),a=fc(a),o=fc(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Ia?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Ia?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const M=v+m+a,R=v+x+o,A=lc(s,s.VERTEX_SHADER,M),w=lc(s,s.FRAGMENT_SHADER,R);s.attachShader(p,A),s.attachShader(p,w),e.index0AttributeName!==void 0?s.bindAttribLocation(p,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(p,0,"position"),s.linkProgram(p);function O(W){if(i.debug.checkShaderErrors){const rt=s.getProgramInfoLog(p).trim(),L=s.getShaderInfoLog(A).trim(),F=s.getShaderInfoLog(w).trim();let B=!0,Y=!0;if(s.getProgramParameter(p,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,p,A,w);else{const j=hc(s,A,"vertex"),Z=hc(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(p,s.VALIDATE_STATUS)+`

Program Info Log: `+rt+`
`+j+`
`+Z)}else rt!==""?console.warn("THREE.WebGLProgram: Program Info Log:",rt):(L===""||F==="")&&(Y=!1);Y&&(W.diagnostics={runnable:B,programLog:rt,vertexShader:{log:L,prefix:m},fragmentShader:{log:F,prefix:x}})}s.deleteShader(A),s.deleteShader(w),E=new Gs(s,p),T=Jm(s,p)}let E;this.getUniforms=function(){return E===void 0&&O(this),E};let T;this.getAttributes=function(){return T===void 0&&O(this),T};let z=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(p,Vm)),z},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(p),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Wm++,this.cacheKey=t,this.usedTimes=1,this.program=p,this.vertexShader=A,this.fragmentShader=w,this}let hg=0;class ug{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dg(t),e.set(t,n)),n}}class dg{constructor(t){this.id=hg++,this.code=t,this.usedTimes=0}}function fg(i,t,e,n,s,r,a){const o=new Co,c=new ug,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function p(E,T,z,W,rt){const L=W.fog,F=rt.geometry,B=E.isMeshStandardMaterial?W.environment:null,Y=(E.isMeshStandardMaterial?e:t).get(E.envMap||B),j=Y&&Y.mapping===rr?Y.image.height:null,Z=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const J=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,at=J!==void 0?J.length:0;let ut=0;F.morphAttributes.position!==void 0&&(ut=1),F.morphAttributes.normal!==void 0&&(ut=2),F.morphAttributes.color!==void 0&&(ut=3);let V,et,_t,At;if(Z){const de=Je[Z];V=de.vertexShader,et=de.fragmentShader}else V=E.vertexShader,et=E.fragmentShader,c.update(E),_t=c.getVertexShaderID(E),At=c.getFragmentShaderID(E);const Et=i.getRenderTarget(),Nt=rt.isInstancedMesh===!0,zt=rt.isBatchedMesh===!0,wt=!!E.map,Ft=!!E.matcap,P=!!Y,ft=!!E.aoMap,q=!!E.lightMap,lt=!!E.bumpMap,X=!!E.normalMap,Ct=!!E.displacementMap,vt=!!E.emissiveMap,y=!!E.metalnessMap,S=!!E.roughnessMap,N=E.anisotropy>0,st=E.clearcoat>0,nt=E.iridescence>0,tt=E.sheen>0,Tt=E.transmission>0,mt=N&&!!E.anisotropyMap,St=st&&!!E.clearcoatMap,It=st&&!!E.clearcoatNormalMap,Gt=st&&!!E.clearcoatRoughnessMap,it=nt&&!!E.iridescenceMap,Zt=nt&&!!E.iridescenceThicknessMap,$t=tt&&!!E.sheenColorMap,Bt=tt&&!!E.sheenRoughnessMap,Lt=!!E.specularMap,xt=!!E.specularColorMap,C=!!E.specularIntensityMap,ht=Tt&&!!E.transmissionMap,Rt=Tt&&!!E.thicknessMap,yt=!!E.gradientMap,ot=!!E.alphaMap,D=E.alphaTest>0,dt=!!E.alphaHash,gt=!!E.extensions,Ut=!!F.attributes.uv1,Dt=!!F.attributes.uv2,Kt=!!F.attributes.uv3;let jt=Rn;return E.toneMapped&&(Et===null||Et.isXRRenderTarget===!0)&&(jt=i.toneMapping),{isWebGL2:h,shaderID:Z,shaderType:E.type,shaderName:E.name,vertexShader:V,fragmentShader:et,defines:E.defines,customVertexShaderID:_t,customFragmentShaderID:At,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:zt,instancing:Nt,instancingColor:Nt&&rt.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:Et===null?i.outputColorSpace:Et.isXRRenderTarget===!0?Et.texture.colorSpace:mn,map:wt,matcap:Ft,envMap:P,envMapMode:P&&Y.mapping,envMapCubeUVHeight:j,aoMap:ft,lightMap:q,bumpMap:lt,normalMap:X,displacementMap:d&&Ct,emissiveMap:vt,normalMapObjectSpace:X&&E.normalMapType===Su,normalMapTangentSpace:X&&E.normalMapType===ul,metalnessMap:y,roughnessMap:S,anisotropy:N,anisotropyMap:mt,clearcoat:st,clearcoatMap:St,clearcoatNormalMap:It,clearcoatRoughnessMap:Gt,iridescence:nt,iridescenceMap:it,iridescenceThicknessMap:Zt,sheen:tt,sheenColorMap:$t,sheenRoughnessMap:Bt,specularMap:Lt,specularColorMap:xt,specularIntensityMap:C,transmission:Tt,transmissionMap:ht,thicknessMap:Rt,gradientMap:yt,opaque:E.transparent===!1&&E.blending===Ei,alphaMap:ot,alphaTest:D,alphaHash:dt,combine:E.combine,mapUv:wt&&_(E.map.channel),aoMapUv:ft&&_(E.aoMap.channel),lightMapUv:q&&_(E.lightMap.channel),bumpMapUv:lt&&_(E.bumpMap.channel),normalMapUv:X&&_(E.normalMap.channel),displacementMapUv:Ct&&_(E.displacementMap.channel),emissiveMapUv:vt&&_(E.emissiveMap.channel),metalnessMapUv:y&&_(E.metalnessMap.channel),roughnessMapUv:S&&_(E.roughnessMap.channel),anisotropyMapUv:mt&&_(E.anisotropyMap.channel),clearcoatMapUv:St&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:It&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Gt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:it&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Zt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:$t&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&_(E.sheenRoughnessMap.channel),specularMapUv:Lt&&_(E.specularMap.channel),specularColorMapUv:xt&&_(E.specularColorMap.channel),specularIntensityMapUv:C&&_(E.specularIntensityMap.channel),transmissionMapUv:ht&&_(E.transmissionMap.channel),thicknessMapUv:Rt&&_(E.thicknessMap.channel),alphaMapUv:ot&&_(E.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(X||N),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,vertexUv1s:Ut,vertexUv2s:Dt,vertexUv3s:Kt,pointsUvs:rt.isPoints===!0&&!!F.attributes.uv&&(wt||ot),fog:!!L,useFog:E.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:rt.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:at,morphTextureStride:ut,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,useLegacyLights:i._useLegacyLights,decodeVideoTexture:wt&&E.map.isVideoTexture===!0&&ee.getTransfer(E.map.colorSpace)===se,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===ze,flipSided:E.side===Ne,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:gt&&E.extensions.derivatives===!0,extensionFragDepth:gt&&E.extensions.fragDepth===!0,extensionDrawBuffers:gt&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:gt&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:gt&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function m(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const z in E.defines)T.push(z),T.push(E.defines[z]);return E.isRawShaderMaterial===!1&&(x(T,E),v(T,E),T.push(i.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function x(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function v(E,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),E.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function M(E){const T=g[E.type];let z;if(T){const W=Je[T];z=Yu.clone(W.uniforms)}else z=E.uniforms;return z}function R(E,T){let z;for(let W=0,rt=l.length;W<rt;W++){const L=l[W];if(L.cacheKey===T){z=L,++z.usedTimes;break}}return z===void 0&&(z=new lg(i,T,E,r),l.push(z)),z}function A(E){if(--E.usedTimes===0){const T=l.indexOf(E);l[T]=l[l.length-1],l.pop(),E.destroy()}}function w(E){c.remove(E)}function O(){c.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:M,acquireProgram:R,releaseProgram:A,releaseShaderCache:w,programs:l,dispose:O}}function pg(){let i=new WeakMap;function t(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function e(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:t,remove:e,update:n,dispose:s}}function mg(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function mc(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function gc(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,p){let m=i[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function o(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?s.push(m):e.push(m)}function c(u,d,f,g,_,p){const m=a(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?s.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||mg),n.length>1&&n.sort(d||mc),s.length>1&&s.sort(d||mc)}function h(){for(let u=t,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function gg(){let i=new WeakMap;function t(n,s){const r=i.get(n);let a;return r===void 0?(a=new gc,i.set(n,[a])):s>=r.length?(a=new gc,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function _g(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new I,color:new Jt};break;case"SpotLight":e={position:new I,direction:new I,color:new Jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new I,color:new Jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new I,skyColor:new Jt,groundColor:new Jt};break;case"RectAreaLight":e={color:new Jt,position:new I,halfWidth:new I,halfHeight:new I};break}return i[t.id]=e,e}}}function vg(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let xg=0;function Sg(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Mg(i,t){const e=new _g,n=vg(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new I);const r=new I,a=new ce,o=new ce;function c(h,u){let d=0,f=0,g=0;for(let W=0;W<9;W++)s.probe[W].set(0,0,0);let _=0,p=0,m=0,x=0,v=0,M=0,R=0,A=0,w=0,O=0,E=0;h.sort(Sg);const T=u===!0?Math.PI:1;for(let W=0,rt=h.length;W<rt;W++){const L=h[W],F=L.color,B=L.intensity,Y=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=F.r*B*T,f+=F.g*B*T,g+=F.b*B*T;else if(L.isLightProbe){for(let Z=0;Z<9;Z++)s.probe[Z].addScaledVector(L.sh.coefficients[Z],B);E++}else if(L.isDirectionalLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const J=L.shadow,at=n.get(L);at.shadowBias=J.bias,at.shadowNormalBias=J.normalBias,at.shadowRadius=J.radius,at.shadowMapSize=J.mapSize,s.directionalShadow[_]=at,s.directionalShadowMap[_]=j,s.directionalShadowMatrix[_]=L.shadow.matrix,M++}s.directional[_]=Z,_++}else if(L.isSpotLight){const Z=e.get(L);Z.position.setFromMatrixPosition(L.matrixWorld),Z.color.copy(F).multiplyScalar(B*T),Z.distance=Y,Z.coneCos=Math.cos(L.angle),Z.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),Z.decay=L.decay,s.spot[m]=Z;const J=L.shadow;if(L.map&&(s.spotLightMap[w]=L.map,w++,J.updateMatrices(L),L.castShadow&&O++),s.spotLightMatrix[m]=J.matrix,L.castShadow){const at=n.get(L);at.shadowBias=J.bias,at.shadowNormalBias=J.normalBias,at.shadowRadius=J.radius,at.shadowMapSize=J.mapSize,s.spotShadow[m]=at,s.spotShadowMap[m]=j,A++}m++}else if(L.isRectAreaLight){const Z=e.get(L);Z.color.copy(F).multiplyScalar(B),Z.halfWidth.set(L.width*.5,0,0),Z.halfHeight.set(0,L.height*.5,0),s.rectArea[x]=Z,x++}else if(L.isPointLight){const Z=e.get(L);if(Z.color.copy(L.color).multiplyScalar(L.intensity*T),Z.distance=L.distance,Z.decay=L.decay,L.castShadow){const J=L.shadow,at=n.get(L);at.shadowBias=J.bias,at.shadowNormalBias=J.normalBias,at.shadowRadius=J.radius,at.shadowMapSize=J.mapSize,at.shadowCameraNear=J.camera.near,at.shadowCameraFar=J.camera.far,s.pointShadow[p]=at,s.pointShadowMap[p]=j,s.pointShadowMatrix[p]=L.shadow.matrix,R++}s.point[p]=Z,p++}else if(L.isHemisphereLight){const Z=e.get(L);Z.skyColor.copy(L.color).multiplyScalar(B*T),Z.groundColor.copy(L.groundColor).multiplyScalar(B*T),s.hemi[v]=Z,v++}}x>0&&(t.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=pt.LTC_FLOAT_1,s.rectAreaLTC2=pt.LTC_FLOAT_2):(s.rectAreaLTC1=pt.LTC_HALF_1,s.rectAreaLTC2=pt.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=pt.LTC_FLOAT_1,s.rectAreaLTC2=pt.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=pt.LTC_HALF_1,s.rectAreaLTC2=pt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=f,s.ambient[2]=g;const z=s.hash;(z.directionalLength!==_||z.pointLength!==p||z.spotLength!==m||z.rectAreaLength!==x||z.hemiLength!==v||z.numDirectionalShadows!==M||z.numPointShadows!==R||z.numSpotShadows!==A||z.numSpotMaps!==w||z.numLightProbes!==E)&&(s.directional.length=_,s.spot.length=m,s.rectArea.length=x,s.point.length=p,s.hemi.length=v,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=A,s.spotShadowMap.length=A,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=A+w-O,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=O,s.numLightProbes=E,z.directionalLength=_,z.pointLength=p,z.spotLength=m,z.rectAreaLength=x,z.hemiLength=v,z.numDirectionalShadows=M,z.numPointShadows=R,z.numSpotShadows=A,z.numSpotMaps=w,z.numLightProbes=E,s.version=xg++)}function l(h,u){let d=0,f=0,g=0,_=0,p=0;const m=u.matrixWorldInverse;for(let x=0,v=h.length;x<v;x++){const M=h[x];if(M.isDirectionalLight){const R=s.directional[d];R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),d++}else if(M.isSpotLight){const R=s.spot[g];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(m),R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(m),g++}else if(M.isRectAreaLight){const R=s.rectArea[_];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(m),o.identity(),a.copy(M.matrixWorld),a.premultiply(m),o.extractRotation(a),R.halfWidth.set(M.width*.5,0,0),R.halfHeight.set(0,M.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const R=s.point[f];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const R=s.hemi[p];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(m),p++}}}return{setup:c,setupView:l,state:s}}function _c(i,t){const e=new Mg(i,t),n=[],s=[];function r(){n.length=0,s.length=0}function a(u){n.push(u)}function o(u){s.push(u)}function c(u){e.setup(n,u)}function l(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function Eg(i,t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let c;return o===void 0?(c=new _c(i,t),e.set(r,[c])):a>=o.length?(c=new _c(i,t),o.push(c)):c=o[a],c}function s(){e=new WeakMap}return{get:n,dispose:s}}class yg extends Jn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bg extends Jn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Tg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,wg=`uniform sampler2D shadow_pass;
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
}`;function Ag(i,t,e){let n=new Ro;const s=new ct,r=new ct,a=new Me,o=new yg({depthPacking:xu}),c=new bg,l={},h=e.maxTextureSize,u={[In]:Ne,[Ne]:In,[ze]:ze},d=new Kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:Tg,fragmentShader:wg}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ce;g.setAttribute("position",new tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ie(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=tl;let m=this.type;this.render=function(A,w,O){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const E=i.getRenderTarget(),T=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(Cn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const rt=m!==un&&this.type===un,L=m===un&&this.type!==un;for(let F=0,B=A.length;F<B;F++){const Y=A[F],j=Y.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const Z=j.getFrameExtents();if(s.multiply(Z),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,j.mapSize.y=r.y)),j.map===null||rt===!0||L===!0){const at=this.type!==un?{minFilter:Pe,magFilter:Pe}:{};j.map!==null&&j.map.dispose(),j.map=new qn(s.x,s.y,at),j.map.texture.name=Y.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const J=j.getViewportCount();for(let at=0;at<J;at++){const ut=j.getViewport(at);a.set(r.x*ut.x,r.y*ut.y,r.x*ut.z,r.y*ut.w),W.viewport(a),j.updateMatrices(Y,at),n=j.getFrustum(),M(w,O,j.camera,Y,this.type)}j.isPointLightShadow!==!0&&this.type===un&&x(j,O),j.needsUpdate=!1}m=this.type,p.needsUpdate=!1,i.setRenderTarget(E,T,z)};function x(A,w){const O=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new qn(s.x,s.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(w,null,O,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(w,null,O,f,_,null)}function v(A,w,O,E){let T=null;const z=O.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(z!==void 0)T=z;else if(T=O.isPointLight===!0?c:o,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const W=T.uuid,rt=w.uuid;let L=l[W];L===void 0&&(L={},l[W]=L);let F=L[rt];F===void 0&&(F=T.clone(),L[rt]=F,w.addEventListener("dispose",R)),T=F}if(T.visible=w.visible,T.wireframe=w.wireframe,E===un?T.side=w.shadowSide!==null?w.shadowSide:w.side:T.side=w.shadowSide!==null?w.shadowSide:u[w.side],T.alphaMap=w.alphaMap,T.alphaTest=w.alphaTest,T.map=w.map,T.clipShadows=w.clipShadows,T.clippingPlanes=w.clippingPlanes,T.clipIntersection=w.clipIntersection,T.displacementMap=w.displacementMap,T.displacementScale=w.displacementScale,T.displacementBias=w.displacementBias,T.wireframeLinewidth=w.wireframeLinewidth,T.linewidth=w.linewidth,O.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=i.properties.get(T);W.light=O}return T}function M(A,w,O,E,T){if(A.visible===!1)return;if(A.layers.test(w.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&T===un)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,A.matrixWorld);const rt=t.update(A),L=A.material;if(Array.isArray(L)){const F=rt.groups;for(let B=0,Y=F.length;B<Y;B++){const j=F[B],Z=L[j.materialIndex];if(Z&&Z.visible){const J=v(A,Z,E,T);A.onBeforeShadow(i,A,w,O,rt,J,j),i.renderBufferDirect(O,null,rt,J,A,j),A.onAfterShadow(i,A,w,O,rt,J,j)}}}else if(L.visible){const F=v(A,L,E,T);A.onBeforeShadow(i,A,w,O,rt,F,null),i.renderBufferDirect(O,null,rt,F,A,null),A.onAfterShadow(i,A,w,O,rt,F,null)}}const W=A.children;for(let rt=0,L=W.length;rt<L;rt++)M(W[rt],w,O,E,T)}function R(A){A.target.removeEventListener("dispose",R);for(const O in l){const E=l[O],T=A.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function Cg(i,t,e){const n=e.isWebGL2;function s(){let D=!1;const dt=new Me;let gt=null;const Ut=new Me(0,0,0,0);return{setMask:function(Dt){gt!==Dt&&!D&&(i.colorMask(Dt,Dt,Dt,Dt),gt=Dt)},setLocked:function(Dt){D=Dt},setClear:function(Dt,Kt,jt,le,de){de===!0&&(Dt*=le,Kt*=le,jt*=le),dt.set(Dt,Kt,jt,le),Ut.equals(dt)===!1&&(i.clearColor(Dt,Kt,jt,le),Ut.copy(dt))},reset:function(){D=!1,gt=null,Ut.set(-1,0,0,0)}}}function r(){let D=!1,dt=null,gt=null,Ut=null;return{setTest:function(Dt){Dt?zt(i.DEPTH_TEST):wt(i.DEPTH_TEST)},setMask:function(Dt){dt!==Dt&&!D&&(i.depthMask(Dt),dt=Dt)},setFunc:function(Dt){if(gt!==Dt){switch(Dt){case Yh:i.depthFunc(i.NEVER);break;case Kh:i.depthFunc(i.ALWAYS);break;case jh:i.depthFunc(i.LESS);break;case Xs:i.depthFunc(i.LEQUAL);break;case Zh:i.depthFunc(i.EQUAL);break;case Jh:i.depthFunc(i.GEQUAL);break;case Qh:i.depthFunc(i.GREATER);break;case tu:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}gt=Dt}},setLocked:function(Dt){D=Dt},setClear:function(Dt){Ut!==Dt&&(i.clearDepth(Dt),Ut=Dt)},reset:function(){D=!1,dt=null,gt=null,Ut=null}}}function a(){let D=!1,dt=null,gt=null,Ut=null,Dt=null,Kt=null,jt=null,le=null,de=null;return{setTest:function(Qt){D||(Qt?zt(i.STENCIL_TEST):wt(i.STENCIL_TEST))},setMask:function(Qt){dt!==Qt&&!D&&(i.stencilMask(Qt),dt=Qt)},setFunc:function(Qt,pe,Ze){(gt!==Qt||Ut!==pe||Dt!==Ze)&&(i.stencilFunc(Qt,pe,Ze),gt=Qt,Ut=pe,Dt=Ze)},setOp:function(Qt,pe,Ze){(Kt!==Qt||jt!==pe||le!==Ze)&&(i.stencilOp(Qt,pe,Ze),Kt=Qt,jt=pe,le=Ze)},setLocked:function(Qt){D=Qt},setClear:function(Qt){de!==Qt&&(i.clearStencil(Qt),de=Qt)},reset:function(){D=!1,dt=null,gt=null,Ut=null,Dt=null,Kt=null,jt=null,le=null,de=null}}}const o=new s,c=new r,l=new a,h=new WeakMap,u=new WeakMap;let d={},f={},g=new WeakMap,_=[],p=null,m=!1,x=null,v=null,M=null,R=null,A=null,w=null,O=null,E=new Jt(0,0,0),T=0,z=!1,W=null,rt=null,L=null,F=null,B=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,Z=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(J)[1]),j=Z>=1):J.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),j=Z>=2);let at=null,ut={};const V=i.getParameter(i.SCISSOR_BOX),et=i.getParameter(i.VIEWPORT),_t=new Me().fromArray(V),At=new Me().fromArray(et);function Et(D,dt,gt,Ut){const Dt=new Uint8Array(4),Kt=i.createTexture();i.bindTexture(D,Kt),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let jt=0;jt<gt;jt++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(dt,0,i.RGBA,1,1,Ut,0,i.RGBA,i.UNSIGNED_BYTE,Dt):i.texImage2D(dt+jt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Dt);return Kt}const Nt={};Nt[i.TEXTURE_2D]=Et(i.TEXTURE_2D,i.TEXTURE_2D,1),Nt[i.TEXTURE_CUBE_MAP]=Et(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(Nt[i.TEXTURE_2D_ARRAY]=Et(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Nt[i.TEXTURE_3D]=Et(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),zt(i.DEPTH_TEST),c.setFunc(Xs),vt(!1),y(Jo),zt(i.CULL_FACE),X(Cn);function zt(D){d[D]!==!0&&(i.enable(D),d[D]=!0)}function wt(D){d[D]!==!1&&(i.disable(D),d[D]=!1)}function Ft(D,dt){return f[D]!==dt?(i.bindFramebuffer(D,dt),f[D]=dt,n&&(D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=dt),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=dt)),!0):!1}function P(D,dt){let gt=_,Ut=!1;if(D)if(gt=g.get(dt),gt===void 0&&(gt=[],g.set(dt,gt)),D.isWebGLMultipleRenderTargets){const Dt=D.texture;if(gt.length!==Dt.length||gt[0]!==i.COLOR_ATTACHMENT0){for(let Kt=0,jt=Dt.length;Kt<jt;Kt++)gt[Kt]=i.COLOR_ATTACHMENT0+Kt;gt.length=Dt.length,Ut=!0}}else gt[0]!==i.COLOR_ATTACHMENT0&&(gt[0]=i.COLOR_ATTACHMENT0,Ut=!0);else gt[0]!==i.BACK&&(gt[0]=i.BACK,Ut=!0);Ut&&(e.isWebGL2?i.drawBuffers(gt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(gt))}function ft(D){return p!==D?(i.useProgram(D),p=D,!0):!1}const q={[Gn]:i.FUNC_ADD,[Dh]:i.FUNC_SUBTRACT,[Nh]:i.FUNC_REVERSE_SUBTRACT};if(n)q[na]=i.MIN,q[ia]=i.MAX;else{const D=t.get("EXT_blend_minmax");D!==null&&(q[na]=D.MIN_EXT,q[ia]=D.MAX_EXT)}const lt={[Uh]:i.ZERO,[Oh]:i.ONE,[Fh]:i.SRC_COLOR,[ho]:i.SRC_ALPHA,[Vh]:i.SRC_ALPHA_SATURATE,[Gh]:i.DST_COLOR,[Bh]:i.DST_ALPHA,[zh]:i.ONE_MINUS_SRC_COLOR,[uo]:i.ONE_MINUS_SRC_ALPHA,[Hh]:i.ONE_MINUS_DST_COLOR,[kh]:i.ONE_MINUS_DST_ALPHA,[Wh]:i.CONSTANT_COLOR,[$h]:i.ONE_MINUS_CONSTANT_COLOR,[Xh]:i.CONSTANT_ALPHA,[qh]:i.ONE_MINUS_CONSTANT_ALPHA};function X(D,dt,gt,Ut,Dt,Kt,jt,le,de,Qt){if(D===Cn){m===!0&&(wt(i.BLEND),m=!1);return}if(m===!1&&(zt(i.BLEND),m=!0),D!==Ih){if(D!==x||Qt!==z){if((v!==Gn||A!==Gn)&&(i.blendEquation(i.FUNC_ADD),v=Gn,A=Gn),Qt)switch(D){case Ei:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qo:i.blendFunc(i.ONE,i.ONE);break;case ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ea:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ei:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Qo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ta:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ea:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,R=null,w=null,O=null,E.set(0,0,0),T=0,x=D,z=Qt}return}Dt=Dt||dt,Kt=Kt||gt,jt=jt||Ut,(dt!==v||Dt!==A)&&(i.blendEquationSeparate(q[dt],q[Dt]),v=dt,A=Dt),(gt!==M||Ut!==R||Kt!==w||jt!==O)&&(i.blendFuncSeparate(lt[gt],lt[Ut],lt[Kt],lt[jt]),M=gt,R=Ut,w=Kt,O=jt),(le.equals(E)===!1||de!==T)&&(i.blendColor(le.r,le.g,le.b,de),E.copy(le),T=de),x=D,z=!1}function Ct(D,dt){D.side===ze?wt(i.CULL_FACE):zt(i.CULL_FACE);let gt=D.side===Ne;dt&&(gt=!gt),vt(gt),D.blending===Ei&&D.transparent===!1?X(Cn):X(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ut=D.stencilWrite;l.setTest(Ut),Ut&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?zt(i.SAMPLE_ALPHA_TO_COVERAGE):wt(i.SAMPLE_ALPHA_TO_COVERAGE)}function vt(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function y(D){D!==Rh?(zt(i.CULL_FACE),D!==rt&&(D===Jo?i.cullFace(i.BACK):D===Ph?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):wt(i.CULL_FACE),rt=D}function S(D){D!==L&&(j&&i.lineWidth(D),L=D)}function N(D,dt,gt){D?(zt(i.POLYGON_OFFSET_FILL),(F!==dt||B!==gt)&&(i.polygonOffset(dt,gt),F=dt,B=gt)):wt(i.POLYGON_OFFSET_FILL)}function st(D){D?zt(i.SCISSOR_TEST):wt(i.SCISSOR_TEST)}function nt(D){D===void 0&&(D=i.TEXTURE0+Y-1),at!==D&&(i.activeTexture(D),at=D)}function tt(D,dt,gt){gt===void 0&&(at===null?gt=i.TEXTURE0+Y-1:gt=at);let Ut=ut[gt];Ut===void 0&&(Ut={type:void 0,texture:void 0},ut[gt]=Ut),(Ut.type!==D||Ut.texture!==dt)&&(at!==gt&&(i.activeTexture(gt),at=gt),i.bindTexture(D,dt||Nt[D]),Ut.type=D,Ut.texture=dt)}function Tt(){const D=ut[at];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function mt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function It(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Gt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function it(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Zt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Bt(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Lt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function C(D){_t.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),_t.copy(D))}function ht(D){At.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),At.copy(D))}function Rt(D,dt){let gt=u.get(dt);gt===void 0&&(gt=new WeakMap,u.set(dt,gt));let Ut=gt.get(D);Ut===void 0&&(Ut=i.getUniformBlockIndex(dt,D.name),gt.set(D,Ut))}function yt(D,dt){const Ut=u.get(dt).get(D);h.get(dt)!==Ut&&(i.uniformBlockBinding(dt,Ut,D.__bindingPointIndex),h.set(dt,Ut))}function ot(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},at=null,ut={},f={},g=new WeakMap,_=[],p=null,m=!1,x=null,v=null,M=null,R=null,A=null,w=null,O=null,E=new Jt(0,0,0),T=0,z=!1,W=null,rt=null,L=null,F=null,B=null,_t.set(0,0,i.canvas.width,i.canvas.height),At.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:zt,disable:wt,bindFramebuffer:Ft,drawBuffers:P,useProgram:ft,setBlending:X,setMaterial:Ct,setFlipSided:vt,setCullFace:y,setLineWidth:S,setPolygonOffset:N,setScissorTest:st,activeTexture:nt,bindTexture:tt,unbindTexture:Tt,compressedTexImage2D:mt,compressedTexImage3D:St,texImage2D:Lt,texImage3D:xt,updateUBOMapping:Rt,uniformBlockBinding:yt,texStorage2D:$t,texStorage3D:Bt,texSubImage2D:It,texSubImage3D:Gt,compressedTexSubImage2D:it,compressedTexSubImage3D:Zt,scissor:C,viewport:ht,reset:ot}}function Rg(i,t,e,n,s,r,a){const o=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,S){return f?new OffscreenCanvas(y,S):Zs("canvas")}function _(y,S,N,st){let nt=1;if((y.width>st||y.height>st)&&(nt=st/Math.max(y.width,y.height)),nt<1||S===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap){const tt=S?xo:Math.floor,Tt=tt(nt*y.width),mt=tt(nt*y.height);u===void 0&&(u=g(Tt,mt));const St=N?g(Tt,mt):u;return St.width=Tt,St.height=mt,St.getContext("2d").drawImage(y,0,0,Tt,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+Tt+"x"+mt+")."),St}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),y;return y}function p(y){return Da(y.width)&&Da(y.height)}function m(y){return o?!1:y.wrapS!==Ke||y.wrapT!==Ke||y.minFilter!==Pe&&y.minFilter!==He}function x(y,S){return y.generateMipmaps&&S&&y.minFilter!==Pe&&y.minFilter!==He}function v(y){i.generateMipmap(y)}function M(y,S,N,st,nt=!1){if(o===!1)return S;if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let tt=S;if(S===i.RED&&(N===i.FLOAT&&(tt=i.R32F),N===i.HALF_FLOAT&&(tt=i.R16F),N===i.UNSIGNED_BYTE&&(tt=i.R8)),S===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(tt=i.R8UI),N===i.UNSIGNED_SHORT&&(tt=i.R16UI),N===i.UNSIGNED_INT&&(tt=i.R32UI),N===i.BYTE&&(tt=i.R8I),N===i.SHORT&&(tt=i.R16I),N===i.INT&&(tt=i.R32I)),S===i.RG&&(N===i.FLOAT&&(tt=i.RG32F),N===i.HALF_FLOAT&&(tt=i.RG16F),N===i.UNSIGNED_BYTE&&(tt=i.RG8)),S===i.RGBA){const Tt=nt?qs:ee.getTransfer(st);N===i.FLOAT&&(tt=i.RGBA32F),N===i.HALF_FLOAT&&(tt=i.RGBA16F),N===i.UNSIGNED_BYTE&&(tt=Tt===se?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(tt=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(tt=i.RGB5_A1)}return(tt===i.R16F||tt===i.R32F||tt===i.RG16F||tt===i.RG32F||tt===i.RGBA16F||tt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function R(y,S,N){return x(y,N)===!0||y.isFramebufferTexture&&y.minFilter!==Pe&&y.minFilter!==He?Math.log2(Math.max(S.width,S.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?S.mipmaps.length:1}function A(y){return y===Pe||y===sa||y===xr?i.NEAREST:i.LINEAR}function w(y){const S=y.target;S.removeEventListener("dispose",w),E(S),S.isVideoTexture&&h.delete(S)}function O(y){const S=y.target;S.removeEventListener("dispose",O),z(S)}function E(y){const S=n.get(y);if(S.__webglInit===void 0)return;const N=y.source,st=d.get(N);if(st){const nt=st[S.__cacheKey];nt.usedTimes--,nt.usedTimes===0&&T(y),Object.keys(st).length===0&&d.delete(N)}n.remove(y)}function T(y){const S=n.get(y);i.deleteTexture(S.__webglTexture);const N=y.source,st=d.get(N);delete st[S.__cacheKey],a.memory.textures--}function z(y){const S=y.texture,N=n.get(y),st=n.get(S);if(st.__webglTexture!==void 0&&(i.deleteTexture(st.__webglTexture),a.memory.textures--),y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let nt=0;nt<6;nt++){if(Array.isArray(N.__webglFramebuffer[nt]))for(let tt=0;tt<N.__webglFramebuffer[nt].length;tt++)i.deleteFramebuffer(N.__webglFramebuffer[nt][tt]);else i.deleteFramebuffer(N.__webglFramebuffer[nt]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[nt])}else{if(Array.isArray(N.__webglFramebuffer))for(let nt=0;nt<N.__webglFramebuffer.length;nt++)i.deleteFramebuffer(N.__webglFramebuffer[nt]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let nt=0;nt<N.__webglColorRenderbuffer.length;nt++)N.__webglColorRenderbuffer[nt]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[nt]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(y.isWebGLMultipleRenderTargets)for(let nt=0,tt=S.length;nt<tt;nt++){const Tt=n.get(S[nt]);Tt.__webglTexture&&(i.deleteTexture(Tt.__webglTexture),a.memory.textures--),n.remove(S[nt])}n.remove(S),n.remove(y)}let W=0;function rt(){W=0}function L(){const y=W;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),W+=1,y}function F(y){const S=[];return S.push(y.wrapS),S.push(y.wrapT),S.push(y.wrapR||0),S.push(y.magFilter),S.push(y.minFilter),S.push(y.anisotropy),S.push(y.internalFormat),S.push(y.format),S.push(y.type),S.push(y.generateMipmaps),S.push(y.premultiplyAlpha),S.push(y.flipY),S.push(y.unpackAlignment),S.push(y.colorSpace),S.join()}function B(y,S){const N=n.get(y);if(y.isVideoTexture&&Ct(y),y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){const st=y.image;if(st===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_t(N,y,S);return}}e.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+S)}function Y(y,S){const N=n.get(y);if(y.version>0&&N.__version!==y.version){_t(N,y,S);return}e.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+S)}function j(y,S){const N=n.get(y);if(y.version>0&&N.__version!==y.version){_t(N,y,S);return}e.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+S)}function Z(y,S){const N=n.get(y);if(y.version>0&&N.__version!==y.version){At(N,y,S);return}e.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+S)}const J={[mo]:i.REPEAT,[Ke]:i.CLAMP_TO_EDGE,[go]:i.MIRRORED_REPEAT},at={[Pe]:i.NEAREST,[sa]:i.NEAREST_MIPMAP_NEAREST,[xr]:i.NEAREST_MIPMAP_LINEAR,[He]:i.LINEAR,[lu]:i.LINEAR_MIPMAP_NEAREST,[Ji]:i.LINEAR_MIPMAP_LINEAR},ut={[Mu]:i.NEVER,[Au]:i.ALWAYS,[Eu]:i.LESS,[dl]:i.LEQUAL,[yu]:i.EQUAL,[wu]:i.GEQUAL,[bu]:i.GREATER,[Tu]:i.NOTEQUAL};function V(y,S,N){if(N?(i.texParameteri(y,i.TEXTURE_WRAP_S,J[S.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,J[S.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,J[S.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,at[S.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,at[S.minFilter])):(i.texParameteri(y,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(y,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(S.wrapS!==Ke||S.wrapT!==Ke)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(y,i.TEXTURE_MAG_FILTER,A(S.magFilter)),i.texParameteri(y,i.TEXTURE_MIN_FILTER,A(S.minFilter)),S.minFilter!==Pe&&S.minFilter!==He&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),S.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,ut[S.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const st=t.get("EXT_texture_filter_anisotropic");if(S.magFilter===Pe||S.minFilter!==xr&&S.minFilter!==Ji||S.type===Tn&&t.has("OES_texture_float_linear")===!1||o===!1&&S.type===Qi&&t.has("OES_texture_half_float_linear")===!1)return;(S.anisotropy>1||n.get(S).__currentAnisotropy)&&(i.texParameterf(y,st.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,s.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy)}}function et(y,S){let N=!1;y.__webglInit===void 0&&(y.__webglInit=!0,S.addEventListener("dispose",w));const st=S.source;let nt=d.get(st);nt===void 0&&(nt={},d.set(st,nt));const tt=F(S);if(tt!==y.__cacheKey){nt[tt]===void 0&&(nt[tt]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),nt[tt].usedTimes++;const Tt=nt[y.__cacheKey];Tt!==void 0&&(nt[y.__cacheKey].usedTimes--,Tt.usedTimes===0&&T(S)),y.__cacheKey=tt,y.__webglTexture=nt[tt].texture}return N}function _t(y,S,N){let st=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(st=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(st=i.TEXTURE_3D);const nt=et(y,S),tt=S.source;e.bindTexture(st,y.__webglTexture,i.TEXTURE0+N);const Tt=n.get(tt);if(tt.version!==Tt.__version||nt===!0){e.activeTexture(i.TEXTURE0+N);const mt=ee.getPrimaries(ee.workingColorSpace),St=S.colorSpace===We?null:ee.getPrimaries(S.colorSpace),It=S.colorSpace===We||mt===St?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);const Gt=m(S)&&p(S.image)===!1;let it=_(S.image,Gt,!1,s.maxTextureSize);it=vt(S,it);const Zt=p(it)||o,$t=r.convert(S.format,S.colorSpace);let Bt=r.convert(S.type),Lt=M(S.internalFormat,$t,Bt,S.colorSpace,S.isVideoTexture);V(st,S,Zt);let xt;const C=S.mipmaps,ht=o&&S.isVideoTexture!==!0&&Lt!==ll,Rt=Tt.__version===void 0||nt===!0,yt=R(S,it,Zt);if(S.isDepthTexture)Lt=i.DEPTH_COMPONENT,o?S.type===Tn?Lt=i.DEPTH_COMPONENT32F:S.type===bn?Lt=i.DEPTH_COMPONENT24:S.type===Vn?Lt=i.DEPTH24_STENCIL8:Lt=i.DEPTH_COMPONENT16:S.type===Tn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),S.format===Wn&&Lt===i.DEPTH_COMPONENT&&S.type!==wo&&S.type!==bn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),S.type=bn,Bt=r.convert(S.type)),S.format===Ai&&Lt===i.DEPTH_COMPONENT&&(Lt=i.DEPTH_STENCIL,S.type!==Vn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),S.type=Vn,Bt=r.convert(S.type))),Rt&&(ht?e.texStorage2D(i.TEXTURE_2D,1,Lt,it.width,it.height):e.texImage2D(i.TEXTURE_2D,0,Lt,it.width,it.height,0,$t,Bt,null));else if(S.isDataTexture)if(C.length>0&&Zt){ht&&Rt&&e.texStorage2D(i.TEXTURE_2D,yt,Lt,C[0].width,C[0].height);for(let ot=0,D=C.length;ot<D;ot++)xt=C[ot],ht?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,xt.width,xt.height,$t,Bt,xt.data):e.texImage2D(i.TEXTURE_2D,ot,Lt,xt.width,xt.height,0,$t,Bt,xt.data);S.generateMipmaps=!1}else ht?(Rt&&e.texStorage2D(i.TEXTURE_2D,yt,Lt,it.width,it.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,it.width,it.height,$t,Bt,it.data)):e.texImage2D(i.TEXTURE_2D,0,Lt,it.width,it.height,0,$t,Bt,it.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){ht&&Rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Lt,C[0].width,C[0].height,it.depth);for(let ot=0,D=C.length;ot<D;ot++)xt=C[ot],S.format!==je?$t!==null?ht?e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,it.depth,$t,xt.data,0,0):e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,Lt,xt.width,xt.height,it.depth,0,xt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ht?e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,xt.width,xt.height,it.depth,$t,Bt,xt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,Lt,xt.width,xt.height,it.depth,0,$t,Bt,xt.data)}else{ht&&Rt&&e.texStorage2D(i.TEXTURE_2D,yt,Lt,C[0].width,C[0].height);for(let ot=0,D=C.length;ot<D;ot++)xt=C[ot],S.format!==je?$t!==null?ht?e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,xt.width,xt.height,$t,xt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,Lt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ht?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,xt.width,xt.height,$t,Bt,xt.data):e.texImage2D(i.TEXTURE_2D,ot,Lt,xt.width,xt.height,0,$t,Bt,xt.data)}else if(S.isDataArrayTexture)ht?(Rt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,yt,Lt,it.width,it.height,it.depth),e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,it.width,it.height,it.depth,$t,Bt,it.data)):e.texImage3D(i.TEXTURE_2D_ARRAY,0,Lt,it.width,it.height,it.depth,0,$t,Bt,it.data);else if(S.isData3DTexture)ht?(Rt&&e.texStorage3D(i.TEXTURE_3D,yt,Lt,it.width,it.height,it.depth),e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,it.width,it.height,it.depth,$t,Bt,it.data)):e.texImage3D(i.TEXTURE_3D,0,Lt,it.width,it.height,it.depth,0,$t,Bt,it.data);else if(S.isFramebufferTexture){if(Rt)if(ht)e.texStorage2D(i.TEXTURE_2D,yt,Lt,it.width,it.height);else{let ot=it.width,D=it.height;for(let dt=0;dt<yt;dt++)e.texImage2D(i.TEXTURE_2D,dt,Lt,ot,D,0,$t,Bt,null),ot>>=1,D>>=1}}else if(C.length>0&&Zt){ht&&Rt&&e.texStorage2D(i.TEXTURE_2D,yt,Lt,C[0].width,C[0].height);for(let ot=0,D=C.length;ot<D;ot++)xt=C[ot],ht?e.texSubImage2D(i.TEXTURE_2D,ot,0,0,$t,Bt,xt):e.texImage2D(i.TEXTURE_2D,ot,Lt,$t,Bt,xt);S.generateMipmaps=!1}else ht?(Rt&&e.texStorage2D(i.TEXTURE_2D,yt,Lt,it.width,it.height),e.texSubImage2D(i.TEXTURE_2D,0,0,0,$t,Bt,it)):e.texImage2D(i.TEXTURE_2D,0,Lt,$t,Bt,it);x(S,Zt)&&v(st),Tt.__version=tt.version,S.onUpdate&&S.onUpdate(S)}y.__version=S.version}function At(y,S,N){if(S.image.length!==6)return;const st=et(y,S),nt=S.source;e.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+N);const tt=n.get(nt);if(nt.version!==tt.__version||st===!0){e.activeTexture(i.TEXTURE0+N);const Tt=ee.getPrimaries(ee.workingColorSpace),mt=S.colorSpace===We?null:ee.getPrimaries(S.colorSpace),St=S.colorSpace===We||Tt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const It=S.isCompressedTexture||S.image[0].isCompressedTexture,Gt=S.image[0]&&S.image[0].isDataTexture,it=[];for(let ot=0;ot<6;ot++)!It&&!Gt?it[ot]=_(S.image[ot],!1,!0,s.maxCubemapSize):it[ot]=Gt?S.image[ot].image:S.image[ot],it[ot]=vt(S,it[ot]);const Zt=it[0],$t=p(Zt)||o,Bt=r.convert(S.format,S.colorSpace),Lt=r.convert(S.type),xt=M(S.internalFormat,Bt,Lt,S.colorSpace),C=o&&S.isVideoTexture!==!0,ht=tt.__version===void 0||st===!0;let Rt=R(S,Zt,$t);V(i.TEXTURE_CUBE_MAP,S,$t);let yt;if(It){C&&ht&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,xt,Zt.width,Zt.height);for(let ot=0;ot<6;ot++){yt=it[ot].mipmaps;for(let D=0;D<yt.length;D++){const dt=yt[D];S.format!==je?Bt!==null?C?e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D,0,0,dt.width,dt.height,Bt,dt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D,xt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D,0,0,dt.width,dt.height,Bt,Lt,dt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D,xt,dt.width,dt.height,0,Bt,Lt,dt.data)}}}else{yt=S.mipmaps,C&&ht&&(yt.length>0&&Rt++,e.texStorage2D(i.TEXTURE_CUBE_MAP,Rt,xt,it[0].width,it[0].height));for(let ot=0;ot<6;ot++)if(Gt){C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,it[ot].width,it[ot].height,Bt,Lt,it[ot].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,xt,it[ot].width,it[ot].height,0,Bt,Lt,it[ot].data);for(let D=0;D<yt.length;D++){const gt=yt[D].image[ot].image;C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D+1,0,0,gt.width,gt.height,Bt,Lt,gt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D+1,xt,gt.width,gt.height,0,Bt,Lt,gt.data)}}else{C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,0,0,Bt,Lt,it[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,xt,Bt,Lt,it[ot]);for(let D=0;D<yt.length;D++){const dt=yt[D];C?e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D+1,0,0,Bt,Lt,dt.image[ot]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ot,D+1,xt,Bt,Lt,dt.image[ot])}}}x(S,$t)&&v(i.TEXTURE_CUBE_MAP),tt.__version=nt.version,S.onUpdate&&S.onUpdate(S)}y.__version=S.version}function Et(y,S,N,st,nt,tt){const Tt=r.convert(N.format,N.colorSpace),mt=r.convert(N.type),St=M(N.internalFormat,Tt,mt,N.colorSpace);if(!n.get(S).__hasExternalTextures){const Gt=Math.max(1,S.width>>tt),it=Math.max(1,S.height>>tt);nt===i.TEXTURE_3D||nt===i.TEXTURE_2D_ARRAY?e.texImage3D(nt,tt,St,Gt,it,S.depth,0,Tt,mt,null):e.texImage2D(nt,tt,St,Gt,it,0,Tt,mt,null)}e.bindFramebuffer(i.FRAMEBUFFER,y),X(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,st,nt,n.get(N).__webglTexture,0,lt(S)):(nt===i.TEXTURE_2D||nt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&nt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,st,nt,n.get(N).__webglTexture,tt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Nt(y,S,N){if(i.bindRenderbuffer(i.RENDERBUFFER,y),S.depthBuffer&&!S.stencilBuffer){let st=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||X(S)){const nt=S.depthTexture;nt&&nt.isDepthTexture&&(nt.type===Tn?st=i.DEPTH_COMPONENT32F:nt.type===bn&&(st=i.DEPTH_COMPONENT24));const tt=lt(S);X(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,tt,st,S.width,S.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,tt,st,S.width,S.height)}else i.renderbufferStorage(i.RENDERBUFFER,st,S.width,S.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,y)}else if(S.depthBuffer&&S.stencilBuffer){const st=lt(S);N&&X(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,st,i.DEPTH24_STENCIL8,S.width,S.height):X(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st,i.DEPTH24_STENCIL8,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,y)}else{const st=S.isWebGLMultipleRenderTargets===!0?S.texture:[S.texture];for(let nt=0;nt<st.length;nt++){const tt=st[nt],Tt=r.convert(tt.format,tt.colorSpace),mt=r.convert(tt.type),St=M(tt.internalFormat,Tt,mt,tt.colorSpace),It=lt(S);N&&X(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,St,S.width,S.height):X(S)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,St,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,St,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function zt(y,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,y),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(S.depthTexture).__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),B(S.depthTexture,0);const st=n.get(S.depthTexture).__webglTexture,nt=lt(S);if(S.depthTexture.format===Wn)X(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(S.depthTexture.format===Ai)X(S)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,nt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function wt(y){const S=n.get(y),N=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!S.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");zt(S.__webglFramebuffer,y)}else if(N){S.__webglDepthbuffer=[];for(let st=0;st<6;st++)e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[st]),S.__webglDepthbuffer[st]=i.createRenderbuffer(),Nt(S.__webglDepthbuffer[st],y,!1)}else e.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer=i.createRenderbuffer(),Nt(S.__webglDepthbuffer,y,!1);e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ft(y,S,N){const st=n.get(y);S!==void 0&&Et(st.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&wt(y)}function P(y){const S=y.texture,N=n.get(y),st=n.get(S);y.addEventListener("dispose",O),y.isWebGLMultipleRenderTargets!==!0&&(st.__webglTexture===void 0&&(st.__webglTexture=i.createTexture()),st.__version=S.version,a.memory.textures++);const nt=y.isWebGLCubeRenderTarget===!0,tt=y.isWebGLMultipleRenderTargets===!0,Tt=p(y)||o;if(nt){N.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer[mt]=[];for(let St=0;St<S.mipmaps.length;St++)N.__webglFramebuffer[mt][St]=i.createFramebuffer()}else N.__webglFramebuffer[mt]=i.createFramebuffer()}else{if(o&&S.mipmaps&&S.mipmaps.length>0){N.__webglFramebuffer=[];for(let mt=0;mt<S.mipmaps.length;mt++)N.__webglFramebuffer[mt]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(tt)if(s.drawBuffers){const mt=y.texture;for(let St=0,It=mt.length;St<It;St++){const Gt=n.get(mt[St]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&y.samples>0&&X(y)===!1){const mt=tt?S:[S];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let St=0;St<mt.length;St++){const It=mt[St];N.__webglColorRenderbuffer[St]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[St]);const Gt=r.convert(It.format,It.colorSpace),it=r.convert(It.type),Zt=M(It.internalFormat,Gt,it,It.colorSpace,y.isXRRenderTarget===!0),$t=lt(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,Zt,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+St,i.RENDERBUFFER,N.__webglColorRenderbuffer[St])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),Nt(N.__webglDepthRenderbuffer,y,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(nt){e.bindTexture(i.TEXTURE_CUBE_MAP,st.__webglTexture),V(i.TEXTURE_CUBE_MAP,S,Tt);for(let mt=0;mt<6;mt++)if(o&&S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)Et(N.__webglFramebuffer[mt][St],y,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else Et(N.__webglFramebuffer[mt],y,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);x(S,Tt)&&v(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(tt){const mt=y.texture;for(let St=0,It=mt.length;St<It;St++){const Gt=mt[St],it=n.get(Gt);e.bindTexture(i.TEXTURE_2D,it.__webglTexture),V(i.TEXTURE_2D,Gt,Tt),Et(N.__webglFramebuffer,y,Gt,i.COLOR_ATTACHMENT0+St,i.TEXTURE_2D,0),x(Gt,Tt)&&v(i.TEXTURE_2D)}e.unbindTexture()}else{let mt=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(o?mt=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(mt,st.__webglTexture),V(mt,S,Tt),o&&S.mipmaps&&S.mipmaps.length>0)for(let St=0;St<S.mipmaps.length;St++)Et(N.__webglFramebuffer[St],y,S,i.COLOR_ATTACHMENT0,mt,St);else Et(N.__webglFramebuffer,y,S,i.COLOR_ATTACHMENT0,mt,0);x(S,Tt)&&v(mt),e.unbindTexture()}y.depthBuffer&&wt(y)}function ft(y){const S=p(y)||o,N=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let st=0,nt=N.length;st<nt;st++){const tt=N[st];if(x(tt,S)){const Tt=y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,mt=n.get(tt).__webglTexture;e.bindTexture(Tt,mt),v(Tt),e.unbindTexture()}}}function q(y){if(o&&y.samples>0&&X(y)===!1){const S=y.isWebGLMultipleRenderTargets?y.texture:[y.texture],N=y.width,st=y.height;let nt=i.COLOR_BUFFER_BIT;const tt=[],Tt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,mt=n.get(y),St=y.isWebGLMultipleRenderTargets===!0;if(St)for(let It=0;It<S.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let It=0;It<S.length;It++){tt.push(i.COLOR_ATTACHMENT0+It),y.depthBuffer&&tt.push(Tt);const Gt=mt.__ignoreDepthValues!==void 0?mt.__ignoreDepthValues:!1;if(Gt===!1&&(y.depthBuffer&&(nt|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&(nt|=i.STENCIL_BUFFER_BIT)),St&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,mt.__webglColorRenderbuffer[It]),Gt===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Tt]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Tt])),St){const it=n.get(S[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,it,0)}i.blitFramebuffer(0,0,N,st,0,0,N,st,nt,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,tt)}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),St)for(let It=0;It<S.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,mt.__webglColorRenderbuffer[It]);const Gt=n.get(S[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,mt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,Gt,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}}function lt(y){return Math.min(s.maxSamples,y.samples)}function X(y){const S=n.get(y);return o&&y.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ct(y){const S=a.render.frame;h.get(y)!==S&&(h.set(y,S),y.update())}function vt(y,S){const N=y.colorSpace,st=y.format,nt=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===_o||N!==mn&&N!==We&&(ee.getTransfer(N)===se?o===!1?t.has("EXT_sRGB")===!0&&st===je?(y.format=_o,y.minFilter=He,y.generateMipmaps=!1):S=pl.sRGBToLinear(S):(st!==je||nt!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),S}this.allocateTextureUnit=L,this.resetTextureUnits=rt,this.setTexture2D=B,this.setTexture2DArray=Y,this.setTexture3D=j,this.setTextureCube=Z,this.rebindTextures=Ft,this.setupRenderTarget=P,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=q,this.setupDepthRenderbuffer=wt,this.setupFrameBufferTexture=Et,this.useMultisampledRTT=X}function Pg(i,t,e){const n=e.isWebGL2;function s(r,a=We){let o;const c=ee.getTransfer(a);if(r===Pn)return i.UNSIGNED_BYTE;if(r===sl)return i.UNSIGNED_SHORT_4_4_4_4;if(r===rl)return i.UNSIGNED_SHORT_5_5_5_1;if(r===hu)return i.BYTE;if(r===uu)return i.SHORT;if(r===wo)return i.UNSIGNED_SHORT;if(r===il)return i.INT;if(r===bn)return i.UNSIGNED_INT;if(r===Tn)return i.FLOAT;if(r===Qi)return n?i.HALF_FLOAT:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===du)return i.ALPHA;if(r===je)return i.RGBA;if(r===fu)return i.LUMINANCE;if(r===pu)return i.LUMINANCE_ALPHA;if(r===Wn)return i.DEPTH_COMPONENT;if(r===Ai)return i.DEPTH_STENCIL;if(r===_o)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===mu)return i.RED;if(r===ol)return i.RED_INTEGER;if(r===gu)return i.RG;if(r===al)return i.RG_INTEGER;if(r===cl)return i.RGBA_INTEGER;if(r===Sr||r===Mr||r===Er||r===yr)if(c===se)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Sr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Er)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===yr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Sr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Mr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Er)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===yr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===ra||r===oa||r===aa||r===ca)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===ra)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===oa)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===aa)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===ca)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===ll)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===la||r===ha)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===la)return c===se?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===ha)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ua||r===da||r===fa||r===pa||r===ma||r===ga||r===_a||r===va||r===xa||r===Sa||r===Ma||r===Ea||r===ya||r===ba)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ua)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===da)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===fa)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===pa)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===ma)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ga)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===_a)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===va)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===xa)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Sa)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Ma)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Ea)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ya)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ba)return c===se?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===br||r===Ta||r===wa)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===br)return c===se?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Ta)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===wa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===_u||r===Aa||r===Ca||r===Ra)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===br)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Aa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ca)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Ra)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Vn?n?i.UNSIGNED_INT_24_8:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Lg extends Ye{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class De extends Ee{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ig={type:"move"};class Yr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new De,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new De,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new De,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(l,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Ig)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new De;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Dg extends Zn{constructor(t,e){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=e.getContextAttributes();let p=null,m=null;const x=[],v=[],M=new ct;let R=null;const A=new Ye;A.layers.enable(1),A.viewport=new Me;const w=new Ye;w.layers.enable(2),w.viewport=new Me;const O=[A,w],E=new Lg;E.layers.enable(1),E.layers.enable(2);let T=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let et=x[V];return et===void 0&&(et=new Yr,x[V]=et),et.getTargetRaySpace()},this.getControllerGrip=function(V){let et=x[V];return et===void 0&&(et=new Yr,x[V]=et),et.getGripSpace()},this.getHand=function(V){let et=x[V];return et===void 0&&(et=new Yr,x[V]=et),et.getHandSpace()};function W(V){const et=v.indexOf(V.inputSource);if(et===-1)return;const _t=x[et];_t!==void 0&&(_t.update(V.inputSource,V.frame,l||a),_t.dispatchEvent({type:V.type,data:V.inputSource}))}function rt(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",rt),s.removeEventListener("inputsourceschange",L);for(let V=0;V<x.length;V++){const et=v[V];et!==null&&(v[V]=null,x[V].disconnect(et))}T=null,z=null,t.setRenderTarget(p),f=null,d=null,u=null,s=null,m=null,ut.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(p=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",rt),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(M),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const et={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,e,et),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new qn(f.framebufferWidth,f.framebufferHeight,{format:je,type:Pn,colorSpace:t.outputColorSpace,stencilBuffer:_.stencil})}else{let et=null,_t=null,At=null;_.depth&&(At=_.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=_.stencil?Ai:Wn,_t=_.stencil?Vn:bn);const Et={colorFormat:e.RGBA8,depthFormat:At,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(Et),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),m=new qn(d.textureWidth,d.textureHeight,{format:je,type:Pn,depthTexture:new bl(d.textureWidth,d.textureHeight,_t,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:_.stencil,colorSpace:t.outputColorSpace,samples:_.antialias?4:0});const Nt=t.properties.get(m);Nt.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ut.setContext(s),ut.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(V){for(let et=0;et<V.removed.length;et++){const _t=V.removed[et],At=v.indexOf(_t);At>=0&&(v[At]=null,x[At].disconnect(_t))}for(let et=0;et<V.added.length;et++){const _t=V.added[et];let At=v.indexOf(_t);if(At===-1){for(let Nt=0;Nt<x.length;Nt++)if(Nt>=v.length){v.push(_t),At=Nt;break}else if(v[Nt]===null){v[Nt]=_t,At=Nt;break}if(At===-1)break}const Et=x[At];Et&&Et.connect(_t)}}const F=new I,B=new I;function Y(V,et,_t){F.setFromMatrixPosition(et.matrixWorld),B.setFromMatrixPosition(_t.matrixWorld);const At=F.distanceTo(B),Et=et.projectionMatrix.elements,Nt=_t.projectionMatrix.elements,zt=Et[14]/(Et[10]-1),wt=Et[14]/(Et[10]+1),Ft=(Et[9]+1)/Et[5],P=(Et[9]-1)/Et[5],ft=(Et[8]-1)/Et[0],q=(Nt[8]+1)/Nt[0],lt=zt*ft,X=zt*q,Ct=At/(-ft+q),vt=Ct*-ft;et.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(vt),V.translateZ(Ct),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const y=zt+Ct,S=wt+Ct,N=lt-vt,st=X+(At-vt),nt=Ft*wt/S*y,tt=P*wt/S*y;V.projectionMatrix.makePerspective(N,st,nt,tt,y,S),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function j(V,et){et===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(et.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;E.near=w.near=A.near=V.near,E.far=w.far=A.far=V.far,(T!==E.near||z!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,z=E.far);const et=V.parent,_t=E.cameras;j(E,et);for(let At=0;At<_t.length;At++)j(_t[At],et);_t.length===2?Y(E,A,w):E.projectionMatrix.copy(A.projectionMatrix),Z(V,E,et)};function Z(V,et,_t){_t===null?V.matrix.copy(et.matrixWorld):(V.matrix.copy(_t.matrixWorld),V.matrix.invert(),V.matrix.multiply(et.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(et.projectionMatrix),V.projectionMatrixInverse.copy(et.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=vo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(V){c=V,d!==null&&(d.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let J=null;function at(V,et){if(h=et.getViewerPose(l||a),g=et,h!==null){const _t=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let At=!1;_t.length!==E.cameras.length&&(E.cameras.length=0,At=!0);for(let Et=0;Et<_t.length;Et++){const Nt=_t[Et];let zt=null;if(f!==null)zt=f.getViewport(Nt);else{const Ft=u.getViewSubImage(d,Nt);zt=Ft.viewport,Et===0&&(t.setRenderTargetTextures(m,Ft.colorTexture,d.ignoreDepthValues?void 0:Ft.depthStencilTexture),t.setRenderTarget(m))}let wt=O[Et];wt===void 0&&(wt=new Ye,wt.layers.enable(Et),wt.viewport=new Me,O[Et]=wt),wt.matrix.fromArray(Nt.transform.matrix),wt.matrix.decompose(wt.position,wt.quaternion,wt.scale),wt.projectionMatrix.fromArray(Nt.projectionMatrix),wt.projectionMatrixInverse.copy(wt.projectionMatrix).invert(),wt.viewport.set(zt.x,zt.y,zt.width,zt.height),Et===0&&(E.matrix.copy(wt.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),At===!0&&E.cameras.push(wt)}}for(let _t=0;_t<x.length;_t++){const At=v[_t],Et=x[_t];At!==null&&Et!==void 0&&Et.update(At,et,l||a)}J&&J(V,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const ut=new yl;ut.setAnimationLoop(at),this.setAnimationLoop=function(V){J=V},this.dispose=function(){}}}function Ng(i,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,Sl(i)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function s(p,m,x,v,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,M)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(a(p,m),m.isLineDashedMaterial&&o(p,m)):m.isPointsMaterial?c(p,m,x,v):m.isSpriteMaterial?l(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ne&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ne&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const x=t.get(m).envMap;if(x&&(p.envMap.value=x,p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap){p.lightMap.value=m.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;p.lightMapIntensity.value=m.lightMapIntensity*v,e(m.lightMap,p.lightMapTransform)}m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function a(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function o(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function c(p,m,x,v){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*x,p.scale.value=v*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function l(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),t.get(m).envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,x){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ne&&p.clearcoatNormalScale.value.negate())),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const x=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ug(i,t,e,n){let s={},r={},a=[];const o=e.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,v){const M=v.program;n.uniformBlockBinding(x,M)}function l(x,v){let M=s[x.id];M===void 0&&(g(x),M=h(x),s[x.id]=M,x.addEventListener("dispose",p));const R=v.program;n.updateUBOMapping(x,R);const A=t.render.frame;r[x.id]!==A&&(d(x),r[x.id]=A)}function h(x){const v=u();x.__bindingPointIndex=v;const M=i.createBuffer(),R=x.__size,A=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,A),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,M),M}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const v=s[x.id],M=x.uniforms,R=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let A=0,w=M.length;A<w;A++){const O=Array.isArray(M[A])?M[A]:[M[A]];for(let E=0,T=O.length;E<T;E++){const z=O[E];if(f(z,A,E,R)===!0){const W=z.__offset,rt=Array.isArray(z.value)?z.value:[z.value];let L=0;for(let F=0;F<rt.length;F++){const B=rt[F],Y=_(B);typeof B=="number"||typeof B=="boolean"?(z.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,W+L,z.__data)):B.isMatrix3?(z.__data[0]=B.elements[0],z.__data[1]=B.elements[1],z.__data[2]=B.elements[2],z.__data[3]=0,z.__data[4]=B.elements[3],z.__data[5]=B.elements[4],z.__data[6]=B.elements[5],z.__data[7]=0,z.__data[8]=B.elements[6],z.__data[9]=B.elements[7],z.__data[10]=B.elements[8],z.__data[11]=0):(B.toArray(z.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(x,v,M,R){const A=x.value,w=v+"_"+M;if(R[w]===void 0)return typeof A=="number"||typeof A=="boolean"?R[w]=A:R[w]=A.clone(),!0;{const O=R[w];if(typeof A=="number"||typeof A=="boolean"){if(O!==A)return R[w]=A,!0}else if(O.equals(A)===!1)return O.copy(A),!0}return!1}function g(x){const v=x.uniforms;let M=0;const R=16;for(let w=0,O=v.length;w<O;w++){const E=Array.isArray(v[w])?v[w]:[v[w]];for(let T=0,z=E.length;T<z;T++){const W=E[T],rt=Array.isArray(W.value)?W.value:[W.value];for(let L=0,F=rt.length;L<F;L++){const B=rt[L],Y=_(B),j=M%R;j!==0&&R-j<Y.boundary&&(M+=R-j),W.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=M,M+=Y.storage}}}const A=M%R;return A>0&&(M+=R-A),x.__size=M,x.__cache={},this}function _(x){const v={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(v.boundary=4,v.storage=4):x.isVector2?(v.boundary=8,v.storage=8):x.isVector3||x.isColor?(v.boundary=16,v.storage=12):x.isVector4?(v.boundary=16,v.storage=16):x.isMatrix3?(v.boundary=48,v.storage=48):x.isMatrix4?(v.boundary=64,v.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),v}function p(x){const v=x.target;v.removeEventListener("dispose",p);const M=a.indexOf(v.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function m(){for(const x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:c,update:l,dispose:m}}class Pl{constructor(t={}){const{canvas:e=Pu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ye,this._useLegacyLights=!1,this.toneMapping=Rn,this.toneMappingExposure=1;const v=this;let M=!1,R=0,A=0,w=null,O=-1,E=null;const T=new Me,z=new Me;let W=null;const rt=new Jt(0);let L=0,F=e.width,B=e.height,Y=1,j=null,Z=null;const J=new Me(0,0,F,B),at=new Me(0,0,F,B);let ut=!1;const V=new Ro;let et=!1,_t=!1,At=null;const Et=new ce,Nt=new ct,zt=new I,wt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Ft(){return w===null?Y:1}let P=n;function ft(b,U){for(let G=0;G<b.length;G++){const H=b[G],k=e.getContext(H,U);if(k!==null)return k}return null}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${To}`),e.addEventListener("webglcontextlost",ot,!1),e.addEventListener("webglcontextrestored",D,!1),e.addEventListener("webglcontextcreationerror",dt,!1),P===null){const U=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&U.shift(),P=ft(U,b),P===null)throw ft(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let q,lt,X,Ct,vt,y,S,N,st,nt,tt,Tt,mt,St,It,Gt,it,Zt,$t,Bt,Lt,xt,C,ht;function Rt(){q=new $p(P),lt=new Bp(P,q,t),q.init(lt),xt=new Pg(P,q,lt),X=new Cg(P,q,lt),Ct=new Yp(P),vt=new pg,y=new Rg(P,q,X,vt,lt,xt,Ct),S=new Gp(v),N=new Wp(v),st=new ed(P,lt),C=new Fp(P,q,st,lt),nt=new Xp(P,st,Ct,C),tt=new Jp(P,nt,st,Ct),$t=new Zp(P,lt,y),Gt=new kp(vt),Tt=new fg(v,S,N,q,lt,C,Gt),mt=new Ng(v,vt),St=new gg,It=new Eg(q,lt),Zt=new Op(v,S,N,X,tt,d,c),it=new Ag(v,tt,lt),ht=new Ug(P,Ct,lt,X),Bt=new zp(P,q,Ct,lt),Lt=new qp(P,q,Ct,lt),Ct.programs=Tt.programs,v.capabilities=lt,v.extensions=q,v.properties=vt,v.renderLists=St,v.shadowMap=it,v.state=X,v.info=Ct}Rt();const yt=new Dg(v,P);this.xr=yt,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=q.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=q.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(F,B,!1))},this.getSize=function(b){return b.set(F,B)},this.setSize=function(b,U,G=!0){if(yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=b,B=U,e.width=Math.floor(b*Y),e.height=Math.floor(U*Y),G===!0&&(e.style.width=b+"px",e.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(F*Y,B*Y).floor()},this.setDrawingBufferSize=function(b,U,G){F=b,B=U,Y=G,e.width=Math.floor(b*G),e.height=Math.floor(U*G),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(J)},this.setViewport=function(b,U,G,H){b.isVector4?J.set(b.x,b.y,b.z,b.w):J.set(b,U,G,H),X.viewport(T.copy(J).multiplyScalar(Y).floor())},this.getScissor=function(b){return b.copy(at)},this.setScissor=function(b,U,G,H){b.isVector4?at.set(b.x,b.y,b.z,b.w):at.set(b,U,G,H),X.scissor(z.copy(at).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ut},this.setScissorTest=function(b){X.setScissorTest(ut=b)},this.setOpaqueSort=function(b){j=b},this.setTransparentSort=function(b){Z=b},this.getClearColor=function(b){return b.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor.apply(Zt,arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha.apply(Zt,arguments)},this.clear=function(b=!0,U=!0,G=!0){let H=0;if(b){let k=!1;if(w!==null){const Mt=w.texture.format;k=Mt===cl||Mt===al||Mt===ol}if(k){const Mt=w.texture.type,Pt=Mt===Pn||Mt===bn||Mt===wo||Mt===Vn||Mt===sl||Mt===rl,Ot=Zt.getClearColor(),kt=Zt.getClearAlpha(),Xt=Ot.r,Ht=Ot.g,Vt=Ot.b;Pt?(f[0]=Xt,f[1]=Ht,f[2]=Vt,f[3]=kt,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=Xt,g[1]=Ht,g[2]=Vt,g[3]=kt,P.clearBufferiv(P.COLOR,0,g))}else H|=P.COLOR_BUFFER_BIT}U&&(H|=P.DEPTH_BUFFER_BIT),G&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ot,!1),e.removeEventListener("webglcontextrestored",D,!1),e.removeEventListener("webglcontextcreationerror",dt,!1),St.dispose(),It.dispose(),vt.dispose(),S.dispose(),N.dispose(),tt.dispose(),C.dispose(),ht.dispose(),Tt.dispose(),yt.dispose(),yt.removeEventListener("sessionstart",de),yt.removeEventListener("sessionend",Qt),At&&(At.dispose(),At=null),pe.stop()};function ot(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=Ct.autoReset,U=it.enabled,G=it.autoUpdate,H=it.needsUpdate,k=it.type;Rt(),Ct.autoReset=b,it.enabled=U,it.autoUpdate=G,it.needsUpdate=H,it.type=k}function dt(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function gt(b){const U=b.target;U.removeEventListener("dispose",gt),Ut(U)}function Ut(b){Dt(b),vt.remove(b)}function Dt(b){const U=vt.get(b).programs;U!==void 0&&(U.forEach(function(G){Tt.releaseProgram(G)}),b.isShaderMaterial&&Tt.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,G,H,k,Mt){U===null&&(U=wt);const Pt=k.isMesh&&k.matrixWorld.determinant()<0,Ot=ch(b,U,G,H,k);X.setMaterial(H,Pt);let kt=G.index,Xt=1;if(H.wireframe===!0){if(kt=nt.getWireframeAttribute(G),kt===void 0)return;Xt=2}const Ht=G.drawRange,Vt=G.attributes.position;let fe=Ht.start*Xt,Ue=(Ht.start+Ht.count)*Xt;Mt!==null&&(fe=Math.max(fe,Mt.start*Xt),Ue=Math.min(Ue,(Mt.start+Mt.count)*Xt)),kt!==null?(fe=Math.max(fe,0),Ue=Math.min(Ue,kt.count)):Vt!=null&&(fe=Math.max(fe,0),Ue=Math.min(Ue,Vt.count));const xe=Ue-fe;if(xe<0||xe===1/0)return;C.setup(k,H,Ot,G,kt);let sn,oe=Bt;if(kt!==null&&(sn=st.get(kt),oe=Lt,oe.setIndex(sn)),k.isMesh)H.wireframe===!0?(X.setLineWidth(H.wireframeLinewidth*Ft()),oe.setMode(P.LINES)):oe.setMode(P.TRIANGLES);else if(k.isLine){let qt=H.linewidth;qt===void 0&&(qt=1),X.setLineWidth(qt*Ft()),k.isLineSegments?oe.setMode(P.LINES):k.isLineLoop?oe.setMode(P.LINE_LOOP):oe.setMode(P.LINE_STRIP)}else k.isPoints?oe.setMode(P.POINTS):k.isSprite&&oe.setMode(P.TRIANGLES);if(k.isBatchedMesh)oe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)oe.renderInstances(fe,xe,k.count);else if(G.isInstancedBufferGeometry){const qt=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,mr=Math.min(G.instanceCount,qt);oe.renderInstances(fe,xe,mr)}else oe.render(fe,xe)};function Kt(b,U,G){b.transparent===!0&&b.side===ze&&b.forceSinglePass===!1?(b.side=Ne,b.needsUpdate=!0,as(b,U,G),b.side=In,b.needsUpdate=!0,as(b,U,G),b.side=ze):as(b,U,G)}this.compile=function(b,U,G=null){G===null&&(G=b),p=It.get(G),p.init(),x.push(p),G.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),b!==G&&b.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights(v._useLegacyLights);const H=new Set;return b.traverse(function(k){const Mt=k.material;if(Mt)if(Array.isArray(Mt))for(let Pt=0;Pt<Mt.length;Pt++){const Ot=Mt[Pt];Kt(Ot,G,k),H.add(Ot)}else Kt(Mt,G,k),H.add(Mt)}),x.pop(),p=null,H},this.compileAsync=function(b,U,G=null){const H=this.compile(b,U,G);return new Promise(k=>{function Mt(){if(H.forEach(function(Pt){vt.get(Pt).currentProgram.isReady()&&H.delete(Pt)}),H.size===0){k(b);return}setTimeout(Mt,10)}q.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let jt=null;function le(b){jt&&jt(b)}function de(){pe.stop()}function Qt(){pe.start()}const pe=new yl;pe.setAnimationLoop(le),typeof self<"u"&&pe.setContext(self),this.setAnimationLoop=function(b){jt=b,yt.setAnimationLoop(b),b===null?pe.stop():pe.start()},yt.addEventListener("sessionstart",de),yt.addEventListener("sessionend",Qt),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),yt.enabled===!0&&yt.isPresenting===!0&&(yt.cameraAutoUpdate===!0&&yt.updateCamera(U),U=yt.getCamera()),b.isScene===!0&&b.onBeforeRender(v,b,U,w),p=It.get(b,x.length),p.init(),x.push(p),Et.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(Et),_t=this.localClippingEnabled,et=Gt.init(this.clippingPlanes,_t),_=St.get(b,m.length),_.init(),m.push(_),Ze(b,U,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(j,Z),this.info.render.frame++,et===!0&&Gt.beginShadows();const G=p.state.shadowsArray;if(it.render(G,b,U),et===!0&&Gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),Zt.render(_,b),p.setupLights(v._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let k=0,Mt=H.length;k<Mt;k++){const Pt=H[k];Wo(_,b,Pt,Pt.viewport)}}else Wo(_,b,U);w!==null&&(y.updateMultisampleRenderTarget(w),y.updateRenderTargetMipmap(w)),b.isScene===!0&&b.onAfterRender(v,b,U),C.resetDefaultState(),O=-1,E=null,x.pop(),x.length>0?p=x[x.length-1]:p=null,m.pop(),m.length>0?_=m[m.length-1]:_=null};function Ze(b,U,G,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)p.pushLight(b),b.castShadow&&p.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||V.intersectsSprite(b)){H&&zt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Et);const Pt=tt.update(b),Ot=b.material;Ot.visible&&_.push(b,Pt,Ot,G,zt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||V.intersectsObject(b))){const Pt=tt.update(b),Ot=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),zt.copy(b.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),zt.copy(Pt.boundingSphere.center)),zt.applyMatrix4(b.matrixWorld).applyMatrix4(Et)),Array.isArray(Ot)){const kt=Pt.groups;for(let Xt=0,Ht=kt.length;Xt<Ht;Xt++){const Vt=kt[Xt],fe=Ot[Vt.materialIndex];fe&&fe.visible&&_.push(b,Pt,fe,G,zt.z,Vt)}}else Ot.visible&&_.push(b,Pt,Ot,G,zt.z,null)}}const Mt=b.children;for(let Pt=0,Ot=Mt.length;Pt<Ot;Pt++)Ze(Mt[Pt],U,G,H)}function Wo(b,U,G,H){const k=b.opaque,Mt=b.transmissive,Pt=b.transparent;p.setupLightsView(G),et===!0&&Gt.setGlobalState(v.clippingPlanes,G),Mt.length>0&&ah(k,Mt,U,G),H&&X.viewport(T.copy(H)),k.length>0&&os(k,U,G),Mt.length>0&&os(Mt,U,G),Pt.length>0&&os(Pt,U,G),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function ah(b,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const Mt=lt.isWebGL2;At===null&&(At=new qn(1,1,{generateMipmaps:!0,type:q.has("EXT_color_buffer_half_float")?Qi:Pn,minFilter:Ji,samples:Mt?4:0})),v.getDrawingBufferSize(Nt),Mt?At.setSize(Nt.x,Nt.y):At.setSize(xo(Nt.x),xo(Nt.y));const Pt=v.getRenderTarget();v.setRenderTarget(At),v.getClearColor(rt),L=v.getClearAlpha(),L<1&&v.setClearColor(16777215,.5),v.clear();const Ot=v.toneMapping;v.toneMapping=Rn,os(b,G,H),y.updateMultisampleRenderTarget(At),y.updateRenderTargetMipmap(At);let kt=!1;for(let Xt=0,Ht=U.length;Xt<Ht;Xt++){const Vt=U[Xt],fe=Vt.object,Ue=Vt.geometry,xe=Vt.material,sn=Vt.group;if(xe.side===ze&&fe.layers.test(H.layers)){const oe=xe.side;xe.side=Ne,xe.needsUpdate=!0,$o(fe,G,H,Ue,xe,sn),xe.side=oe,xe.needsUpdate=!0,kt=!0}}kt===!0&&(y.updateMultisampleRenderTarget(At),y.updateRenderTargetMipmap(At)),v.setRenderTarget(Pt),v.setClearColor(rt,L),v.toneMapping=Ot}function os(b,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let k=0,Mt=b.length;k<Mt;k++){const Pt=b[k],Ot=Pt.object,kt=Pt.geometry,Xt=H===null?Pt.material:H,Ht=Pt.group;Ot.layers.test(G.layers)&&$o(Ot,U,G,kt,Xt,Ht)}}function $o(b,U,G,H,k,Mt){b.onBeforeRender(v,U,G,H,k,Mt),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(v,U,G,H,b,Mt),k.transparent===!0&&k.side===ze&&k.forceSinglePass===!1?(k.side=Ne,k.needsUpdate=!0,v.renderBufferDirect(G,U,H,k,b,Mt),k.side=In,k.needsUpdate=!0,v.renderBufferDirect(G,U,H,k,b,Mt),k.side=ze):v.renderBufferDirect(G,U,H,k,b,Mt),b.onAfterRender(v,U,G,H,k,Mt)}function as(b,U,G){U.isScene!==!0&&(U=wt);const H=vt.get(b),k=p.state.lights,Mt=p.state.shadowsArray,Pt=k.state.version,Ot=Tt.getParameters(b,k.state,Mt,U,G),kt=Tt.getProgramCacheKey(Ot);let Xt=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?N:S).get(b.envMap||H.environment),Xt===void 0&&(b.addEventListener("dispose",gt),Xt=new Map,H.programs=Xt);let Ht=Xt.get(kt);if(Ht!==void 0){if(H.currentProgram===Ht&&H.lightsStateVersion===Pt)return qo(b,Ot),Ht}else Ot.uniforms=Tt.getUniforms(b),b.onBuild(G,Ot,v),b.onBeforeCompile(Ot,v),Ht=Tt.acquireProgram(Ot,kt),Xt.set(kt,Ht),H.uniforms=Ot.uniforms;const Vt=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Vt.clippingPlanes=Gt.uniform),qo(b,Ot),H.needsLights=hh(b),H.lightsStateVersion=Pt,H.needsLights&&(Vt.ambientLightColor.value=k.state.ambient,Vt.lightProbe.value=k.state.probe,Vt.directionalLights.value=k.state.directional,Vt.directionalLightShadows.value=k.state.directionalShadow,Vt.spotLights.value=k.state.spot,Vt.spotLightShadows.value=k.state.spotShadow,Vt.rectAreaLights.value=k.state.rectArea,Vt.ltc_1.value=k.state.rectAreaLTC1,Vt.ltc_2.value=k.state.rectAreaLTC2,Vt.pointLights.value=k.state.point,Vt.pointLightShadows.value=k.state.pointShadow,Vt.hemisphereLights.value=k.state.hemi,Vt.directionalShadowMap.value=k.state.directionalShadowMap,Vt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Vt.spotShadowMap.value=k.state.spotShadowMap,Vt.spotLightMatrix.value=k.state.spotLightMatrix,Vt.spotLightMap.value=k.state.spotLightMap,Vt.pointShadowMap.value=k.state.pointShadowMap,Vt.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Ht,H.uniformsList=null,Ht}function Xo(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=Gs.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function qo(b,U){const G=vt.get(b);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function ch(b,U,G,H,k){U.isScene!==!0&&(U=wt),y.resetTextureUnits();const Mt=U.fog,Pt=H.isMeshStandardMaterial?U.environment:null,Ot=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:mn,kt=(H.isMeshStandardMaterial?N:S).get(H.envMap||Pt),Xt=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ht=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Vt=!!G.morphAttributes.position,fe=!!G.morphAttributes.normal,Ue=!!G.morphAttributes.color;let xe=Rn;H.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(xe=v.toneMapping);const sn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,oe=sn!==void 0?sn.length:0,qt=vt.get(H),mr=p.state.lights;if(et===!0&&(_t===!0||b!==E)){const ke=b===E&&H.id===O;Gt.setState(H,b,ke)}let he=!1;H.version===qt.__version?(qt.needsLights&&qt.lightsStateVersion!==mr.state.version||qt.outputColorSpace!==Ot||k.isBatchedMesh&&qt.batching===!1||!k.isBatchedMesh&&qt.batching===!0||k.isInstancedMesh&&qt.instancing===!1||!k.isInstancedMesh&&qt.instancing===!0||k.isSkinnedMesh&&qt.skinning===!1||!k.isSkinnedMesh&&qt.skinning===!0||k.isInstancedMesh&&qt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&qt.instancingColor===!1&&k.instanceColor!==null||qt.envMap!==kt||H.fog===!0&&qt.fog!==Mt||qt.numClippingPlanes!==void 0&&(qt.numClippingPlanes!==Gt.numPlanes||qt.numIntersection!==Gt.numIntersection)||qt.vertexAlphas!==Xt||qt.vertexTangents!==Ht||qt.morphTargets!==Vt||qt.morphNormals!==fe||qt.morphColors!==Ue||qt.toneMapping!==xe||lt.isWebGL2===!0&&qt.morphTargetsCount!==oe)&&(he=!0):(he=!0,qt.__version=H.version);let Dn=qt.currentProgram;he===!0&&(Dn=as(H,U,k));let Yo=!1,Ui=!1,gr=!1;const Te=Dn.getUniforms(),Nn=qt.uniforms;if(X.useProgram(Dn.program)&&(Yo=!0,Ui=!0,gr=!0),H.id!==O&&(O=H.id,Ui=!0),Yo||E!==b){Te.setValue(P,"projectionMatrix",b.projectionMatrix),Te.setValue(P,"viewMatrix",b.matrixWorldInverse);const ke=Te.map.cameraPosition;ke!==void 0&&ke.setValue(P,zt.setFromMatrixPosition(b.matrixWorld)),lt.logarithmicDepthBuffer&&Te.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&Te.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Ui=!0,gr=!0)}if(k.isSkinnedMesh){Te.setOptional(P,k,"bindMatrix"),Te.setOptional(P,k,"bindMatrixInverse");const ke=k.skeleton;ke&&(lt.floatVertexTextures?(ke.boneTexture===null&&ke.computeBoneTexture(),Te.setValue(P,"boneTexture",ke.boneTexture,y)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(Te.setOptional(P,k,"batchingTexture"),Te.setValue(P,"batchingTexture",k._matricesTexture,y));const _r=G.morphAttributes;if((_r.position!==void 0||_r.normal!==void 0||_r.color!==void 0&&lt.isWebGL2===!0)&&$t.update(k,G,Dn),(Ui||qt.receiveShadow!==k.receiveShadow)&&(qt.receiveShadow=k.receiveShadow,Te.setValue(P,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Nn.envMap.value=kt,Nn.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),Ui&&(Te.setValue(P,"toneMappingExposure",v.toneMappingExposure),qt.needsLights&&lh(Nn,gr),Mt&&H.fog===!0&&mt.refreshFogUniforms(Nn,Mt),mt.refreshMaterialUniforms(Nn,H,Y,B,At),Gs.upload(P,Xo(qt),Nn,y)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Gs.upload(P,Xo(qt),Nn,y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&Te.setValue(P,"center",k.center),Te.setValue(P,"modelViewMatrix",k.modelViewMatrix),Te.setValue(P,"normalMatrix",k.normalMatrix),Te.setValue(P,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const ke=H.uniformsGroups;for(let vr=0,uh=ke.length;vr<uh;vr++)if(lt.isWebGL2){const Ko=ke[vr];ht.update(Ko,Dn),ht.bind(Ko,Dn)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return Dn}function lh(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function hh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(b,U,G){vt.get(b.texture).__webglTexture=U,vt.get(b.depthTexture).__webglTexture=G;const H=vt.get(b);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,U){const G=vt.get(b);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,G=0){w=b,R=U,A=G;let H=!0,k=null,Mt=!1,Pt=!1;if(b){const kt=vt.get(b);kt.__useDefaultFramebuffer!==void 0?(X.bindFramebuffer(P.FRAMEBUFFER,null),H=!1):kt.__webglFramebuffer===void 0?y.setupRenderTarget(b):kt.__hasExternalTextures&&y.rebindTextures(b,vt.get(b.texture).__webglTexture,vt.get(b.depthTexture).__webglTexture);const Xt=b.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(Pt=!0);const Ht=vt.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ht[U])?k=Ht[U][G]:k=Ht[U],Mt=!0):lt.isWebGL2&&b.samples>0&&y.useMultisampledRTT(b)===!1?k=vt.get(b).__webglMultisampledFramebuffer:Array.isArray(Ht)?k=Ht[G]:k=Ht,T.copy(b.viewport),z.copy(b.scissor),W=b.scissorTest}else T.copy(J).multiplyScalar(Y).floor(),z.copy(at).multiplyScalar(Y).floor(),W=ut;if(X.bindFramebuffer(P.FRAMEBUFFER,k)&&lt.drawBuffers&&H&&X.drawBuffers(b,k),X.viewport(T),X.scissor(z),X.setScissorTest(W),Mt){const kt=vt.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,kt.__webglTexture,G)}else if(Pt){const kt=vt.get(b.texture),Xt=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,kt.__webglTexture,G||0,Xt)}O=-1},this.readRenderTargetPixels=function(b,U,G,H,k,Mt,Pt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=vt.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ot=Ot[Pt]),Ot){X.bindFramebuffer(P.FRAMEBUFFER,Ot);try{const kt=b.texture,Xt=kt.format,Ht=kt.type;if(Xt!==je&&xt.convert(Xt)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Vt=Ht===Qi&&(q.has("EXT_color_buffer_half_float")||lt.isWebGL2&&q.has("EXT_color_buffer_float"));if(Ht!==Pn&&xt.convert(Ht)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ht===Tn&&(lt.isWebGL2||q.has("OES_texture_float")||q.has("WEBGL_color_buffer_float")))&&!Vt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&G>=0&&G<=b.height-k&&P.readPixels(U,G,H,k,xt.convert(Xt),xt.convert(Ht),Mt)}finally{const kt=w!==null?vt.get(w).__webglFramebuffer:null;X.bindFramebuffer(P.FRAMEBUFFER,kt)}}},this.copyFramebufferToTexture=function(b,U,G=0){const H=Math.pow(2,-G),k=Math.floor(U.image.width*H),Mt=Math.floor(U.image.height*H);y.setTexture2D(U,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,b.x,b.y,k,Mt),X.unbindTexture()},this.copyTextureToTexture=function(b,U,G,H=0){const k=U.image.width,Mt=U.image.height,Pt=xt.convert(G.format),Ot=xt.convert(G.type);y.setTexture2D(G,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,G.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,H,b.x,b.y,k,Mt,Pt,Ot,U.image.data):U.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,H,b.x,b.y,U.mipmaps[0].width,U.mipmaps[0].height,Pt,U.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,H,b.x,b.y,Pt,Ot,U.image),H===0&&G.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(b,U,G,H,k=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Mt=b.max.x-b.min.x+1,Pt=b.max.y-b.min.y+1,Ot=b.max.z-b.min.z+1,kt=xt.convert(H.format),Xt=xt.convert(H.type);let Ht;if(H.isData3DTexture)y.setTexture3D(H,0),Ht=P.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)y.setTexture2DArray(H,0),Ht=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment);const Vt=P.getParameter(P.UNPACK_ROW_LENGTH),fe=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ue=P.getParameter(P.UNPACK_SKIP_PIXELS),xe=P.getParameter(P.UNPACK_SKIP_ROWS),sn=P.getParameter(P.UNPACK_SKIP_IMAGES),oe=G.isCompressedTexture?G.mipmaps[k]:G.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,oe.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,oe.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,b.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,b.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,b.min.z),G.isDataTexture||G.isData3DTexture?P.texSubImage3D(Ht,k,U.x,U.y,U.z,Mt,Pt,Ot,kt,Xt,oe.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Ht,k,U.x,U.y,U.z,Mt,Pt,Ot,kt,oe.data)):P.texSubImage3D(Ht,k,U.x,U.y,U.z,Mt,Pt,Ot,kt,Xt,oe),P.pixelStorei(P.UNPACK_ROW_LENGTH,Vt),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,fe),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ue),P.pixelStorei(P.UNPACK_SKIP_ROWS,xe),P.pixelStorei(P.UNPACK_SKIP_IMAGES,sn),k===0&&H.generateMipmaps&&P.generateMipmap(Ht),X.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?y.setTextureCube(b,0):b.isData3DTexture?y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?y.setTexture2DArray(b,0):y.setTexture2D(b,0),X.unbindTexture()},this.resetState=function(){R=0,A=0,w=null,X.reset(),C.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ao?"display-p3":"srgb",e.unpackColorSpace=ee.workingColorSpace===or?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===ye?$n:hl}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===$n?ye:mn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Og extends Pl{}Og.prototype.isWebGL1Renderer=!0;class Fg extends Ee{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Ll extends Jn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const vc=new I,xc=new I,Sc=new ce,Kr=new cr,Ps=new ar;class zg extends Ee{constructor(t=new Ce,e=new Ll){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)vc.fromBufferAttribute(e,s-1),xc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=vc.distanceTo(xc);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ps.copy(n.boundingSphere),Ps.applyMatrix4(s),Ps.radius+=r,t.ray.intersectsSphere(Ps)===!1)return;Sc.copy(s).invert(),Kr.copy(t.ray).applyMatrix4(Sc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new I,h=new I,u=new I,d=new I,f=this.isLineSegments?2:1,g=n.index,p=n.attributes.position;if(g!==null){const m=Math.max(0,a.start),x=Math.min(g.count,a.start+a.count);for(let v=m,M=x-1;v<M;v+=f){const R=g.getX(v),A=g.getX(v+1);if(l.fromBufferAttribute(p,R),h.fromBufferAttribute(p,A),Kr.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const O=t.ray.origin.distanceTo(d);O<t.near||O>t.far||e.push({distance:O,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}else{const m=Math.max(0,a.start),x=Math.min(p.count,a.start+a.count);for(let v=m,M=x-1;v<M;v+=f){if(l.fromBufferAttribute(p,v),h.fromBufferAttribute(p,v+1),Kr.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);const A=t.ray.origin.distanceTo(d);A<t.near||A>t.far||e.push({distance:A,point:u.clone().applyMatrix4(this.matrixWorld),index:v,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const Mc=new I,Ec=new I;class Bg extends zg{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Mc.fromBufferAttribute(e,s),Ec.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Mc.distanceTo(Ec);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],d=n[s+1]-h,f=(a-h)/d;return(s+f)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new ct:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new I,s=[],r=[],a=[],o=new I,c=new ce;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(be(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(e===!0){let f=Math.acos(be(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Io extends nn{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e){const n=e||new ct,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class kg extends Io{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Do(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,u){let d=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+u)+(c-o)/u;d*=h,f*=h,s(a,o,d,f)},calc:function(r){const a=r*r,o=a*r;return i+t*r+e*a+n*o}}}const Ls=new I,jr=new Do,Zr=new Do,Jr=new Do;class Xn extends nn{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new I){const n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Ls.subVectors(s[0],s[1]).add(s[0]),l=Ls);const u=s[o%r],d=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ls.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ls),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),jr.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,p),Zr.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,p),Jr.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(jr.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Zr.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Jr.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(jr.calc(c),Zr.calc(c),Jr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new I().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function yc(i,t,e,n,s){const r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function Gg(i,t){const e=1-i;return e*e*t}function Hg(i,t){return 2*(1-i)*i*t}function Vg(i,t){return i*i*t}function Yi(i,t,e,n){return Gg(i,t)+Hg(i,e)+Vg(i,n)}function Wg(i,t){const e=1-i;return e*e*e*t}function $g(i,t){const e=1-i;return 3*e*e*i*t}function Xg(i,t){return 3*(1-i)*i*i*t}function qg(i,t){return i*i*i*t}function Ki(i,t,e,n,s){return Wg(i,t)+$g(i,e)+Xg(i,n)+qg(i,s)}class Il extends nn{constructor(t=new ct,e=new ct,n=new ct,s=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ki(t,s.x,r.x,a.x,o.x),Ki(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yg extends nn{constructor(t=new I,e=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(Ki(t,s.x,r.x,a.x,o.x),Ki(t,s.y,r.y,a.y,o.y),Ki(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Dl extends nn{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kg extends nn{constructor(t=new I,e=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new I){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new I){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Nl extends nn{constructor(t=new ct,e=new ct,n=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ct){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Yi(t,s.x,r.x,a.x),Yi(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ul extends nn{constructor(t=new I,e=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new I){const n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(Yi(t,s.x,r.x,a.x),Yi(t,s.y,r.y,a.y),Yi(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Ol extends nn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],u=s[a>s.length-3?s.length-1:a+2];return n.set(yc(o,c.x,l.x,h.x,u.x),yc(o,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new ct().fromArray(s))}return this}}var Js=Object.freeze({__proto__:null,ArcCurve:kg,CatmullRomCurve3:Xn,CubicBezierCurve:Il,CubicBezierCurve3:Yg,EllipseCurve:Io,LineCurve:Dl,LineCurve3:Kg,QuadraticBezierCurve:Nl,QuadraticBezierCurve3:Ul,SplineCurve:Ol});class jg extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Js[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new Js[s.type]().fromJSON(s))}return this}}class bc extends jg{constructor(t){super(),this.type="Path",this.currentPoint=new ct,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Dl(this.currentPoint.clone(),new ct(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const r=new Nl(this.currentPoint.clone(),new ct(t,e),new ct(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){const o=new Il(this.currentPoint.clone(),new ct(t,e),new ct(n,s),new ct(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Ol(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){const l=new Io(t,e,n,s,r,a,o,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class dr extends Ce{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new I,h=new ct;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*s;l.x=t*Math.cos(f),l.y=t*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(o,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new dr(t.radius,t.segments,t.thetaStart,t.thetaLength)}}const Is=new I,Ds=new I,Qr=new I,Ns=new Ve;class Fl extends Ce{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Xi*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:p,c:m}=Ns;if(_.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),m.fromBufferAttribute(o,l[2]),Ns.getNormal(Qr),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,u[2]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let x=0;x<3;x++){const v=(x+1)%3,M=u[x],R=u[v],A=Ns[h[x]],w=Ns[h[v]],O=`${M}_${R}`,E=`${R}_${M}`;E in d&&d[E]?(Qr.dot(d[E].normal)<=r&&(f.push(A.x,A.y,A.z),f.push(w.x,w.y,w.z)),d[E]=null):O in d||(d[O]={index0:l[x],index1:l[v],normal:Qr.clone()})}}for(const g in d)if(d[g]){const{index0:_,index1:p}=d[g];Is.fromBufferAttribute(o,_),Ds.fromBufferAttribute(o,p),f.push(Is.x,Is.y,Is.z),f.push(Ds.x,Ds.y,Ds.z)}this.setAttribute("position",new ne(f,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Di extends bc{constructor(t){super(t),this.uuid=Pi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new bc().fromJSON(s))}return this}}const Zg={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let r=zl(i,0,s,e,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l,h,u,d,f;if(n&&(r=n_(i,t,r,e)),i.length>80*e){o=l=i[0],c=h=i[1];for(let g=e;g<s;g+=e)u=i[g],d=i[g+1],u<o&&(o=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-o,h-c),f=f!==0?32767/f:0}return ts(r,a,e,o,c,f,0),a}};function zl(i,t,e,n,s){let r,a;if(s===f_(i,t,e,n)>0)for(r=t;r<e;r+=n)a=Tc(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=Tc(r,i[r],i[r+1],a);return a&&fr(a,a.next)&&(ns(a),a=a.next),a}function jn(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(fr(e,e.next)||ae(e.prev,e,e.next)===0)){if(ns(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ts(i,t,e,n,s,r,a){if(!i)return;!a&&r&&a_(i,n,s,r);let o=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Qg(i,n,s,r):Jg(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),ns(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=t_(jn(i),t,e),ts(i,t,e,n,s,r,2)):a===2&&e_(i,t,e,n,s,r):ts(jn(i),t,e,n,s,r,1);break}}}function Jg(i){const t=i.prev,e=i,n=i.next;if(ae(t,e,n)>=0)return!1;const s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,h=s<r?s<a?s:a:r<a?r:a,u=o<c?o<l?o:l:c<l?c:l,d=s>r?s>a?s:a:r>a?r:a,f=o>c?o>l?o:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Mi(s,o,r,c,a,l,g.x,g.y)&&ae(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Qg(i,t,e,n){const s=i.prev,r=i,a=i.next;if(ae(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,h=s.y,u=r.y,d=a.y,f=o<c?o<l?o:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=o>c?o>l?o:l:c>l?c:l,p=h>u?h>d?h:d:u>d?u:d,m=Mo(f,g,t,e,n),x=Mo(_,p,t,e,n);let v=i.prevZ,M=i.nextZ;for(;v&&v.z>=m&&M&&M.z<=x;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&Mi(o,h,c,u,l,d,v.x,v.y)&&ae(v.prev,v,v.next)>=0||(v=v.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&Mi(o,h,c,u,l,d,M.x,M.y)&&ae(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;v&&v.z>=m;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==s&&v!==a&&Mi(o,h,c,u,l,d,v.x,v.y)&&ae(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;M&&M.z<=x;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=p&&M!==s&&M!==a&&Mi(o,h,c,u,l,d,M.x,M.y)&&ae(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function t_(i,t,e){let n=i;do{const s=n.prev,r=n.next.next;!fr(s,r)&&Bl(s,n,n.next,r)&&es(s,r)&&es(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ns(n),ns(n.next),n=i=r),n=n.next}while(n!==i);return jn(n)}function e_(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&h_(a,o)){let c=kl(a,o);a=jn(a,a.next),c=jn(c,c.next),ts(a,t,e,n,s,r,0),ts(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function n_(i,t,e,n){const s=[];let r,a,o,c,l;for(r=0,a=t.length;r<a;r++)o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=zl(i,o,c,n,!1),l===l.next&&(l.steiner=!0),s.push(l_(l));for(s.sort(i_),r=0;r<s.length;r++)e=s_(s[r],e);return e}function i_(i,t){return i.x-t.x}function s_(i,t){const e=r_(i,t);if(!e)return t;const n=kl(e,i);return jn(n,n.next),jn(e,e.next)}function r_(i,t){let e=t,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){const d=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;const o=s,c=s.x,l=s.y;let h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Mi(a<l?r:n,a,c,l,a<l?n:r,a,e.x,e.y)&&(u=Math.abs(a-e.y)/(r-e.x),es(e,i)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&o_(s,e)))&&(s=e,h=u)),e=e.next;while(e!==o);return s}function o_(i,t){return ae(i.prev,i,t.prev)<0&&ae(t.next,i,i.next)<0}function a_(i,t,e,n){let s=i;do s.z===0&&(s.z=Mo(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,c_(s)}function c_(i){let t,e,n,s,r,a,o,c,l=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<l&&(o++,n=n.nextZ,!!n);t++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(a>1);return i}function Mo(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function l_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Mi(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function h_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!u_(i,t)&&(es(i,t)&&es(t,i)&&d_(i,t)&&(ae(i.prev,i,t.prev)||ae(i,t.prev,t))||fr(i,t)&&ae(i.prev,i,i.next)>0&&ae(t.prev,t,t.next)>0)}function ae(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function fr(i,t){return i.x===t.x&&i.y===t.y}function Bl(i,t,e,n){const s=Os(ae(i,t,e)),r=Os(ae(i,t,n)),a=Os(ae(e,n,i)),o=Os(ae(e,n,t));return!!(s!==r&&a!==o||s===0&&Us(i,e,t)||r===0&&Us(i,n,t)||a===0&&Us(e,i,n)||o===0&&Us(e,t,n))}function Us(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function Os(i){return i>0?1:i<0?-1:0}function u_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Bl(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function es(i,t){return ae(i.prev,i,i.next)<0?ae(i,t,i.next)>=0&&ae(i,i.prev,t)>=0:ae(i,t,i.prev)<0||ae(i,i.next,t)<0}function d_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function kl(i,t){const e=new Eo(i.i,i.x,i.y),n=new Eo(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Tc(i,t,e,n){const s=new Eo(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function ns(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function Eo(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function f_(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Ln{static area(t){const e=t.length;let n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return Ln.area(t)<0}static triangulateShape(t,e){const n=[],s=[],r=[];wc(t),Ac(n,t);let a=t.length;e.forEach(wc);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,Ac(n,e[c]);const o=Zg.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function wc(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ac(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class is extends Ce{constructor(t=new Di([new ct(.5,.5),new ct(-.5,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){const l=t[o];a(l)}this.setAttribute("position",new ne(s,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function a(o){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:p_;let v,M=!1,R,A,w,O;m&&(v=m.getSpacedPoints(h),M=!0,d=!1,R=m.computeFrenetFrames(h,!1),A=new I,w=new I,O=new I),d||(p=0,f=0,g=0,_=0);const E=o.extractPoints(l);let T=E.shape;const z=E.holes;if(!Ln.isClockWise(T)){T=T.reverse();for(let P=0,ft=z.length;P<ft;P++){const q=z[P];Ln.isClockWise(q)&&(z[P]=q.reverse())}}const rt=Ln.triangulateShape(T,z),L=T;for(let P=0,ft=z.length;P<ft;P++){const q=z[P];T=T.concat(q)}function F(P,ft,q){return ft||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(ft,q)}const B=T.length,Y=rt.length;function j(P,ft,q){let lt,X,Ct;const vt=P.x-ft.x,y=P.y-ft.y,S=q.x-P.x,N=q.y-P.y,st=vt*vt+y*y,nt=vt*N-y*S;if(Math.abs(nt)>Number.EPSILON){const tt=Math.sqrt(st),Tt=Math.sqrt(S*S+N*N),mt=ft.x-y/tt,St=ft.y+vt/tt,It=q.x-N/Tt,Gt=q.y+S/Tt,it=((It-mt)*N-(Gt-St)*S)/(vt*N-y*S);lt=mt+vt*it-P.x,X=St+y*it-P.y;const Zt=lt*lt+X*X;if(Zt<=2)return new ct(lt,X);Ct=Math.sqrt(Zt/2)}else{let tt=!1;vt>Number.EPSILON?S>Number.EPSILON&&(tt=!0):vt<-Number.EPSILON?S<-Number.EPSILON&&(tt=!0):Math.sign(y)===Math.sign(N)&&(tt=!0),tt?(lt=-y,X=vt,Ct=Math.sqrt(st)):(lt=vt,X=y,Ct=Math.sqrt(st/2))}return new ct(lt/Ct,X/Ct)}const Z=[];for(let P=0,ft=L.length,q=ft-1,lt=P+1;P<ft;P++,q++,lt++)q===ft&&(q=0),lt===ft&&(lt=0),Z[P]=j(L[P],L[q],L[lt]);const J=[];let at,ut=Z.concat();for(let P=0,ft=z.length;P<ft;P++){const q=z[P];at=[];for(let lt=0,X=q.length,Ct=X-1,vt=lt+1;lt<X;lt++,Ct++,vt++)Ct===X&&(Ct=0),vt===X&&(vt=0),at[lt]=j(q[lt],q[Ct],q[vt]);J.push(at),ut=ut.concat(at)}for(let P=0;P<p;P++){const ft=P/p,q=f*Math.cos(ft*Math.PI/2),lt=g*Math.sin(ft*Math.PI/2)+_;for(let X=0,Ct=L.length;X<Ct;X++){const vt=F(L[X],Z[X],lt);Et(vt.x,vt.y,-q)}for(let X=0,Ct=z.length;X<Ct;X++){const vt=z[X];at=J[X];for(let y=0,S=vt.length;y<S;y++){const N=F(vt[y],at[y],lt);Et(N.x,N.y,-q)}}}const V=g+_;for(let P=0;P<B;P++){const ft=d?F(T[P],ut[P],V):T[P];M?(w.copy(R.normals[0]).multiplyScalar(ft.x),A.copy(R.binormals[0]).multiplyScalar(ft.y),O.copy(v[0]).add(w).add(A),Et(O.x,O.y,O.z)):Et(ft.x,ft.y,0)}for(let P=1;P<=h;P++)for(let ft=0;ft<B;ft++){const q=d?F(T[ft],ut[ft],V):T[ft];M?(w.copy(R.normals[P]).multiplyScalar(q.x),A.copy(R.binormals[P]).multiplyScalar(q.y),O.copy(v[P]).add(w).add(A),Et(O.x,O.y,O.z)):Et(q.x,q.y,u/h*P)}for(let P=p-1;P>=0;P--){const ft=P/p,q=f*Math.cos(ft*Math.PI/2),lt=g*Math.sin(ft*Math.PI/2)+_;for(let X=0,Ct=L.length;X<Ct;X++){const vt=F(L[X],Z[X],lt);Et(vt.x,vt.y,u+q)}for(let X=0,Ct=z.length;X<Ct;X++){const vt=z[X];at=J[X];for(let y=0,S=vt.length;y<S;y++){const N=F(vt[y],at[y],lt);M?Et(N.x,N.y+v[h-1].y,v[h-1].x+q):Et(N.x,N.y,u+q)}}}et(),_t();function et(){const P=s.length/3;if(d){let ft=0,q=B*ft;for(let lt=0;lt<Y;lt++){const X=rt[lt];Nt(X[2]+q,X[1]+q,X[0]+q)}ft=h+p*2,q=B*ft;for(let lt=0;lt<Y;lt++){const X=rt[lt];Nt(X[0]+q,X[1]+q,X[2]+q)}}else{for(let ft=0;ft<Y;ft++){const q=rt[ft];Nt(q[2],q[1],q[0])}for(let ft=0;ft<Y;ft++){const q=rt[ft];Nt(q[0]+B*h,q[1]+B*h,q[2]+B*h)}}n.addGroup(P,s.length/3-P,0)}function _t(){const P=s.length/3;let ft=0;At(L,ft),ft+=L.length;for(let q=0,lt=z.length;q<lt;q++){const X=z[q];At(X,ft),ft+=X.length}n.addGroup(P,s.length/3-P,1)}function At(P,ft){let q=P.length;for(;--q>=0;){const lt=q;let X=q-1;X<0&&(X=P.length-1);for(let Ct=0,vt=h+p*2;Ct<vt;Ct++){const y=B*Ct,S=B*(Ct+1),N=ft+lt+y,st=ft+X+y,nt=ft+X+S,tt=ft+lt+S;zt(N,st,nt,tt)}}}function Et(P,ft,q){c.push(P),c.push(ft),c.push(q)}function Nt(P,ft,q){wt(P),wt(ft),wt(q);const lt=s.length/3,X=x.generateTopUV(n,s,lt-3,lt-2,lt-1);Ft(X[0]),Ft(X[1]),Ft(X[2])}function zt(P,ft,q,lt){wt(P),wt(ft),wt(lt),wt(ft),wt(q),wt(lt);const X=s.length/3,Ct=x.generateSideWallUV(n,s,X-6,X-3,X-2,X-1);Ft(Ct[0]),Ft(Ct[1]),Ft(Ct[3]),Ft(Ct[1]),Ft(Ct[2]),Ft(Ct[3])}function wt(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function Ft(P){r.push(P.x),r.push(P.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return m_(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,a=t.shapes.length;r<a;r++){const o=e[t.shapes[r]];n.push(o)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Js[s.type]().fromJSON(s)),new is(n,t.options)}}const p_={generateTopUV:function(i,t,e,n,s){const r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],h=t[s*3+1];return[new ct(r,a),new ct(o,c),new ct(l,h)]},generateSideWallUV:function(i,t,e,n,s,r){const a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[s*3],f=t[s*3+1],g=t[s*3+2],_=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new ct(a,1-c),new ct(l,1-u),new ct(d,1-g),new ct(_,1-m)]:[new ct(o,1-c),new ct(h,1-u),new ct(f,1-g),new ct(p,1-m)]}};function m_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class No extends Ce{constructor(t=.5,e=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let u=t;const d=(e-t)/s,f=new I,g=new ct;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const m=r+p/n*a;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const p=_*(n+1);for(let m=0;m<n;m++){const x=m+p,v=x,M=x+n+1,R=x+n+2,A=x+1;o.push(v,M,A),o.push(M,R,A)}}this.setIndex(o),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new No(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Uo extends Ce{constructor(t=new Di([new ct(0,.5),new ct(-.5,-.5),new ct(.5,-.5)]),e=12){super(),this.type="ShapeGeometry",this.parameters={shapes:t,curveSegments:e};const n=[],s=[],r=[],a=[];let o=0,c=0;if(Array.isArray(t)===!1)l(t);else for(let h=0;h<t.length;h++)l(t[h]),this.addGroup(o,c,h),o+=c,c=0;this.setIndex(n),this.setAttribute("position",new ne(s,3)),this.setAttribute("normal",new ne(r,3)),this.setAttribute("uv",new ne(a,2));function l(h){const u=s.length/3,d=h.extractPoints(e);let f=d.shape;const g=d.holes;Ln.isClockWise(f)===!1&&(f=f.reverse());for(let p=0,m=g.length;p<m;p++){const x=g[p];Ln.isClockWise(x)===!0&&(g[p]=x.reverse())}const _=Ln.triangulateShape(f,g);for(let p=0,m=g.length;p<m;p++){const x=g[p];f=f.concat(x)}for(let p=0,m=f.length;p<m;p++){const x=f[p];s.push(x.x,x.y,0),r.push(0,0,1),a.push(x.x,x.y)}for(let p=0,m=_.length;p<m;p++){const x=_[p],v=x[0]+u,M=x[1]+u,R=x[2]+u;n.push(v,M,R),c+=3}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes;return g_(e,t)}static fromJSON(t,e){const n=[];for(let s=0,r=t.shapes.length;s<r;s++){const a=e[t.shapes[s]];n.push(a)}return new Uo(n,t.curveSegments)}}function g_(i,t){if(t.shapes=[],Array.isArray(i))for(let e=0,n=i.length;e<n;e++){const s=i[e];t.shapes.push(s.uuid)}else t.shapes.push(i.uuid);return t}class ss extends Ce{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],u=new I,d=new I,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const x=[],v=m/n;let M=0;m===0&&a===0?M=.5/e:m===n&&c===Math.PI&&(M=-.5/e);for(let R=0;R<=e;R++){const A=R/e;u.x=-t*Math.cos(s+A*r)*Math.sin(a+v*o),u.y=t*Math.cos(a+v*o),u.z=t*Math.sin(s+A*r)*Math.sin(a+v*o),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(A+M,1-v),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const v=h[m][x+1],M=h[m][x],R=h[m+1][x],A=h[m+1][x+1];(m!==0||a>0)&&f.push(v,M,A),(m!==n-1||c<Math.PI)&&f.push(M,R,A)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ss(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Qs extends Ce{constructor(t=new Ul(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),e=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:s,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,c=new I,l=new ct;let h=new I;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function _(){for(let v=0;v<e;v++)p(v);p(r===!1?e:0),x(),m()}function p(v){h=t.getPointAt(v/e,h);const M=a.normals[v],R=a.binormals[v];for(let A=0;A<=s;A++){const w=A/s*Math.PI*2,O=Math.sin(w),E=-Math.cos(w);c.x=E*M.x+O*R.x,c.y=E*M.y+O*R.y,c.z=E*M.z+O*R.z,c.normalize(),d.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,u.push(o.x,o.y,o.z)}}function m(){for(let v=1;v<=e;v++)for(let M=1;M<=s;M++){const R=(s+1)*(v-1)+(M-1),A=(s+1)*v+(M-1),w=(s+1)*v+M,O=(s+1)*(v-1)+M;g.push(R,A,O),g.push(A,w,O)}}function x(){for(let v=0;v<=e;v++)for(let M=0;M<=s;M++)l.x=v/e,l.y=M/s,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new Qs(new Js[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class wn extends Jn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ul,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Gl extends Ee{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}const to=new ce,Cc=new I,Rc=new I;class __{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.map=null,this.mapPass=null,this.matrix=new ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ro,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Cc.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cc),Rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rc),e.updateMatrixWorld(),to.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class v_ extends __{constructor(){super(new Po(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class x_ extends Gl{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ee.DEFAULT_UP),this.updateMatrix(),this.target=new Ee,this.shadow=new v_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class S_ extends Gl{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class M_{constructor(t,e,n=0,s=1/0){this.ray=new cr(t,e),this.near=n,this.far=s,this.camera=null,this.layers=new Co,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,n=[]){return yo(t,this,n,e),n.sort(Pc),n}intersectObjects(t,e=!0,n=[]){for(let s=0,r=t.length;s<r;s++)yo(t[s],this,n,e);return n.sort(Pc),n}}function Pc(i,t){return i.distance-t.distance}function yo(i,t,e,n){if(i.layers.test(t.layers)&&i.raycast(t,e),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)yo(s[r],t,e,!0)}}class Lc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(be(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:To}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=To);class E_ extends Ee{constructor(t=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new ct(.5,.5),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof Element&&e.element.parentNode!==null&&e.element.parentNode.removeChild(e.element)})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this.center=t.center,this}}const gi=new I,Ic=new ce,Dc=new ce,Nc=new I,Uc=new I;class y_{constructor(t={}){const e=this;let n,s,r,a;const o={objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(f,g){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),Ic.copy(g.matrixWorldInverse),Dc.multiplyMatrices(g.projectionMatrix,Ic),l(f,f,g),d(f)},this.setSize=function(f,g){n=f,s=g,r=n/2,a=s/2,c.style.width=f+"px",c.style.height=g+"px"};function l(f,g,_){if(f.isCSS2DObject){gi.setFromMatrixPosition(f.matrixWorld),gi.applyMatrix4(Dc);const p=f.visible===!0&&gi.z>=-1&&gi.z<=1&&f.layers.test(_.layers)===!0;if(f.element.style.display=p===!0?"":"none",p===!0){f.onBeforeRender(e,g,_);const x=f.element;x.style.transform="translate("+-100*f.center.x+"%,"+-100*f.center.y+"%)translate("+(gi.x*r+r)+"px,"+(-gi.y*a+a)+"px)",x.parentNode!==c&&c.appendChild(x),f.onAfterRender(e,g,_)}const m={distanceToCameraSquared:h(_,f)};o.objects.set(f,m)}for(let p=0,m=f.children.length;p<m;p++)l(f.children[p],g,_)}function h(f,g){return Nc.setFromMatrixPosition(f.matrixWorld),Uc.setFromMatrixPosition(g.matrixWorld),Nc.distanceToSquared(Uc)}function u(f){const g=[];return f.traverse(function(_){_.isCSS2DObject&&g.push(_)}),g}function d(f){const g=u(f).sort(function(p,m){if(p.renderOrder!==m.renderOrder)return m.renderOrder-p.renderOrder;const x=o.objects.get(p).distanceToCameraSquared,v=o.objects.get(m).distanceToCameraSquared;return x-v}),_=g.length;for(let p=0,m=g.length;p<m;p++)g[p].element.style.zIndex=_-p}}}const Oc={type:"change"},eo={type:"start"},Fc={type:"end"},Fs=new cr,zc=new yn,b_=Math.cos(70*Ru.DEG2RAD);class T_ extends Zn{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:dn.ROTATE,MIDDLE:dn.DOLLY,RIGHT:dn.PAN},this.touches={ONE:En.ROTATE,TWO:En.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",It),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",It),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Oc),n.update(),r=s.NONE},this.update=function(){const C=new I,ht=new Yn().setFromUnitVectors(t.up,new I(0,1,0)),Rt=ht.clone().invert(),yt=new I,ot=new Yn,D=new I,dt=2*Math.PI;return function(Ut=null){const Dt=n.object.position;C.copy(Dt).sub(n.target),C.applyQuaternion(ht),o.setFromVector3(C),n.autoRotate&&r===s.NONE&&W(T(Ut)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Kt=n.minAzimuthAngle,jt=n.maxAzimuthAngle;isFinite(Kt)&&isFinite(jt)&&(Kt<-Math.PI?Kt+=dt:Kt>Math.PI&&(Kt-=dt),jt<-Math.PI?jt+=dt:jt>Math.PI&&(jt-=dt),Kt<=jt?o.theta=Math.max(Kt,Math.min(jt,o.theta)):o.theta=o.theta>(Kt+jt)/2?Math.max(Kt,o.theta):Math.min(jt,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&A||n.object.isOrthographicCamera?o.radius=J(o.radius):o.radius=J(o.radius*l),C.setFromSpherical(o),C.applyQuaternion(Rt),Dt.copy(n.target).add(C),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let le=!1;if(n.zoomToCursor&&A){let de=null;if(n.object.isPerspectiveCamera){const Qt=C.length();de=J(Qt*l);const pe=Qt-de;n.object.position.addScaledVector(M,pe),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qt=new I(R.x,R.y,0);Qt.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),le=!0;const pe=new I(R.x,R.y,0);pe.unproject(n.object),n.object.position.sub(pe).add(Qt),n.object.updateMatrixWorld(),de=C.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;de!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(de).add(n.object.position):(Fs.origin.copy(n.object.position),Fs.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Fs.direction))<b_?t.lookAt(n.target):(zc.setFromNormalAndCoplanarPoint(n.object.up,n.target),Fs.intersectPlane(zc,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),le=!0);return l=1,A=!1,le||yt.distanceToSquared(n.object.position)>a||8*(1-ot.dot(n.object.quaternion))>a||D.distanceToSquared(n.target)>0?(n.dispatchEvent(Oc),yt.copy(n.object.position),ot.copy(n.object.quaternion),D.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Zt),n.domElement.removeEventListener("pointerdown",y),n.domElement.removeEventListener("pointercancel",N),n.domElement.removeEventListener("wheel",tt),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",N),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",It),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Lc,c=new Lc;let l=1;const h=new I,u=new ct,d=new ct,f=new ct,g=new ct,_=new ct,p=new ct,m=new ct,x=new ct,v=new ct,M=new I,R=new ct;let A=!1;const w=[],O={};let E=!1;function T(C){return C!==null?2*Math.PI/60*n.autoRotateSpeed*C:2*Math.PI/60/60*n.autoRotateSpeed}function z(C){const ht=Math.abs(C*.01);return Math.pow(.95,n.zoomSpeed*ht)}function W(C){c.theta-=C}function rt(C){c.phi-=C}const L=function(){const C=new I;return function(Rt,yt){C.setFromMatrixColumn(yt,0),C.multiplyScalar(-Rt),h.add(C)}}(),F=function(){const C=new I;return function(Rt,yt){n.screenSpacePanning===!0?C.setFromMatrixColumn(yt,1):(C.setFromMatrixColumn(yt,0),C.crossVectors(n.object.up,C)),C.multiplyScalar(Rt),h.add(C)}}(),B=function(){const C=new I;return function(Rt,yt){const ot=n.domElement;if(n.object.isPerspectiveCamera){const D=n.object.position;C.copy(D).sub(n.target);let dt=C.length();dt*=Math.tan(n.object.fov/2*Math.PI/180),L(2*Rt*dt/ot.clientHeight,n.object.matrix),F(2*yt*dt/ot.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(L(Rt*(n.object.right-n.object.left)/n.object.zoom/ot.clientWidth,n.object.matrix),F(yt*(n.object.top-n.object.bottom)/n.object.zoom/ot.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function Y(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Z(C,ht){if(!n.zoomToCursor)return;A=!0;const Rt=n.domElement.getBoundingClientRect(),yt=C-Rt.left,ot=ht-Rt.top,D=Rt.width,dt=Rt.height;R.x=yt/D*2-1,R.y=-(ot/dt)*2+1,M.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function J(C){return Math.max(n.minDistance,Math.min(n.maxDistance,C))}function at(C){u.set(C.clientX,C.clientY)}function ut(C){Z(C.clientX,C.clientX),m.set(C.clientX,C.clientY)}function V(C){g.set(C.clientX,C.clientY)}function et(C){d.set(C.clientX,C.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ht=n.domElement;W(2*Math.PI*f.x/ht.clientHeight),rt(2*Math.PI*f.y/ht.clientHeight),u.copy(d),n.update()}function _t(C){x.set(C.clientX,C.clientY),v.subVectors(x,m),v.y>0?Y(z(v.y)):v.y<0&&j(z(v.y)),m.copy(x),n.update()}function At(C){_.set(C.clientX,C.clientY),p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_),n.update()}function Et(C){Z(C.clientX,C.clientY),C.deltaY<0?j(z(C.deltaY)):C.deltaY>0&&Y(z(C.deltaY)),n.update()}function Nt(C){let ht=!1;switch(C.code){case n.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?rt(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),ht=!0;break;case n.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?rt(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),ht=!0;break;case n.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?W(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),ht=!0;break;case n.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?W(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),ht=!0;break}ht&&(C.preventDefault(),n.update())}function zt(C){if(w.length===1)u.set(C.pageX,C.pageY);else{const ht=xt(C),Rt=.5*(C.pageX+ht.x),yt=.5*(C.pageY+ht.y);u.set(Rt,yt)}}function wt(C){if(w.length===1)g.set(C.pageX,C.pageY);else{const ht=xt(C),Rt=.5*(C.pageX+ht.x),yt=.5*(C.pageY+ht.y);g.set(Rt,yt)}}function Ft(C){const ht=xt(C),Rt=C.pageX-ht.x,yt=C.pageY-ht.y,ot=Math.sqrt(Rt*Rt+yt*yt);m.set(0,ot)}function P(C){n.enableZoom&&Ft(C),n.enablePan&&wt(C)}function ft(C){n.enableZoom&&Ft(C),n.enableRotate&&zt(C)}function q(C){if(w.length==1)d.set(C.pageX,C.pageY);else{const Rt=xt(C),yt=.5*(C.pageX+Rt.x),ot=.5*(C.pageY+Rt.y);d.set(yt,ot)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const ht=n.domElement;W(2*Math.PI*f.x/ht.clientHeight),rt(2*Math.PI*f.y/ht.clientHeight),u.copy(d)}function lt(C){if(w.length===1)_.set(C.pageX,C.pageY);else{const ht=xt(C),Rt=.5*(C.pageX+ht.x),yt=.5*(C.pageY+ht.y);_.set(Rt,yt)}p.subVectors(_,g).multiplyScalar(n.panSpeed),B(p.x,p.y),g.copy(_)}function X(C){const ht=xt(C),Rt=C.pageX-ht.x,yt=C.pageY-ht.y,ot=Math.sqrt(Rt*Rt+yt*yt);x.set(0,ot),v.set(0,Math.pow(x.y/m.y,n.zoomSpeed)),Y(v.y),m.copy(x);const D=(C.pageX+ht.x)*.5,dt=(C.pageY+ht.y)*.5;Z(D,dt)}function Ct(C){n.enableZoom&&X(C),n.enablePan&&lt(C)}function vt(C){n.enableZoom&&X(C),n.enableRotate&&q(C)}function y(C){n.enabled!==!1&&(w.length===0&&(n.domElement.setPointerCapture(C.pointerId),n.domElement.addEventListener("pointermove",S),n.domElement.addEventListener("pointerup",N)),$t(C),C.pointerType==="touch"?Gt(C):st(C))}function S(C){n.enabled!==!1&&(C.pointerType==="touch"?it(C):nt(C))}function N(C){Bt(C),w.length===0&&(n.domElement.releasePointerCapture(C.pointerId),n.domElement.removeEventListener("pointermove",S),n.domElement.removeEventListener("pointerup",N)),n.dispatchEvent(Fc),r=s.NONE}function st(C){let ht;switch(C.button){case 0:ht=n.mouseButtons.LEFT;break;case 1:ht=n.mouseButtons.MIDDLE;break;case 2:ht=n.mouseButtons.RIGHT;break;default:ht=-1}switch(ht){case dn.DOLLY:if(n.enableZoom===!1)return;ut(C),r=s.DOLLY;break;case dn.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enablePan===!1)return;V(C),r=s.PAN}else{if(n.enableRotate===!1)return;at(C),r=s.ROTATE}break;case dn.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enableRotate===!1)return;at(C),r=s.ROTATE}else{if(n.enablePan===!1)return;V(C),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(eo)}function nt(C){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;et(C);break;case s.DOLLY:if(n.enableZoom===!1)return;_t(C);break;case s.PAN:if(n.enablePan===!1)return;At(C);break}}function tt(C){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(C.preventDefault(),n.dispatchEvent(eo),Et(Tt(C)),n.dispatchEvent(Fc))}function Tt(C){const ht=C.deltaMode,Rt={clientX:C.clientX,clientY:C.clientY,deltaY:C.deltaY};switch(ht){case 1:Rt.deltaY*=16;break;case 2:Rt.deltaY*=100;break}return C.ctrlKey&&!E&&(Rt.deltaY*=10),Rt}function mt(C){C.key==="Control"&&(E=!0,document.addEventListener("keyup",St,{passive:!0,capture:!0}))}function St(C){C.key==="Control"&&(E=!1,document.removeEventListener("keyup",St,{passive:!0,capture:!0}))}function It(C){n.enabled===!1||n.enablePan===!1||Nt(C)}function Gt(C){switch(Lt(C),w.length){case 1:switch(n.touches.ONE){case En.ROTATE:if(n.enableRotate===!1)return;zt(C),r=s.TOUCH_ROTATE;break;case En.PAN:if(n.enablePan===!1)return;wt(C),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case En.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(C),r=s.TOUCH_DOLLY_PAN;break;case En.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ft(C),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(eo)}function it(C){switch(Lt(C),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;q(C),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;lt(C),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Ct(C),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;vt(C),n.update();break;default:r=s.NONE}}function Zt(C){n.enabled!==!1&&C.preventDefault()}function $t(C){w.push(C.pointerId)}function Bt(C){delete O[C.pointerId];for(let ht=0;ht<w.length;ht++)if(w[ht]==C.pointerId){w.splice(ht,1);return}}function Lt(C){let ht=O[C.pointerId];ht===void 0&&(ht=new ct,O[C.pointerId]=ht),ht.set(C.pageX,C.pageY)}function xt(C){const ht=C.pointerId===w[0]?w[1]:w[0];return O[ht]}n.domElement.addEventListener("contextmenu",Zt),n.domElement.addEventListener("pointerdown",y),n.domElement.addEventListener("pointercancel",N),n.domElement.addEventListener("wheel",tt,{passive:!1}),document.addEventListener("keydown",mt,{passive:!0,capture:!0}),this.update()}}class w_ extends T_{constructor(t,e){super(t,e),this.screenSpacePanning=!1,this.mouseButtons={LEFT:dn.PAN,MIDDLE:dn.DOLLY,RIGHT:dn.ROTATE},this.touches={ONE:En.PAN,TWO:En.DOLLY_ROTATE}}}class A_{constructor(t){bt(this,"scene");bt(this,"camera");bt(this,"renderer");bt(this,"labelRenderer");bt(this,"controls");bt(this,"container");bt(this,"trackGroup");bt(this,"trainGroup");bt(this,"labelGroup");bt(this,"raycaster");bt(this,"mouse");bt(this,"onSwitchClick");bt(this,"onSemaphoreClick");bt(this,"onDecouplerClick");bt(this,"onTrainDblClick");this.container=t,this.scene=new Fg,this.scene.background=new Jt(16119285);const e=t.clientWidth/t.clientHeight,n=100;this.camera=new Po(-n*e/2,n*e/2,n/2,-n/2,.1,1e3),this.camera.position.set(0,100,0),this.camera.lookAt(0,0,0),this.renderer=new Pl({antialias:!0}),this.renderer.setSize(t.clientWidth,t.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),t.appendChild(this.renderer.domElement),this.labelRenderer=new y_,this.labelRenderer.setSize(t.clientWidth,t.clientHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.display="none",t.appendChild(this.labelRenderer.domElement);const s=new S_(16777215,.8);this.scene.add(s);const r=new x_(16777215,.6);r.position.set(50,100,50),this.scene.add(r),this.trackGroup=new De,this.scene.add(this.trackGroup),this.trainGroup=new De,this.scene.add(this.trainGroup),this.labelGroup=new De,this.labelGroup.visible=!1,this.scene.add(this.labelGroup);const a=new hr(1e3,1e3),o=new wn({color:4881465,roughness:.9,metalness:0}),c=new ie(a,o);c.rotation.x=-Math.PI/2,c.position.y=-.01,this.scene.add(c),this.raycaster=new M_,this.mouse=new ct,this.controls=new w_(this.camera,this.renderer.domElement),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.screenSpacePanning=!0,this.controls.minZoom=.1,this.controls.maxZoom=10,this.renderer.domElement.addEventListener("click",l=>this.onClick(l)),this.renderer.domElement.addEventListener("dblclick",l=>this.onDblClick(l)),window.addEventListener("resize",()=>this.onResize())}setSwitchClickCallback(t){this.onSwitchClick=t}setSemaphoreClickCallback(t){this.onSemaphoreClick=t}setDecouplerClickCallback(t){this.onDecouplerClick=t}setTrainDblClickCallback(t){this.onTrainDblClick=t}onClick(t){const e=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.trackGroup.children,!0);for(const s of n){const r=s.object.userData;if(r&&r.isSwitchIndicator){this.onSwitchClick&&this.onSwitchClick(r.routeKey,r.connectionIndex);break}if(r&&r.isSemaphore){this.onSemaphoreClick&&this.onSemaphoreClick(r.pieceId);break}if(r&&r.isDecoupler){this.onDecouplerClick&&this.onDecouplerClick(r.pieceId);break}}}onDblClick(t){if(!this.onTrainDblClick)return;const e=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(t.clientX-e.left)/e.width*2-1,this.mouse.y=-((t.clientY-e.top)/e.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.trainGroup.children,!0);if(n.length>0){let s=n[0].object;for(;s;){if(s.name&&s.name.startsWith("train_")){this.onTrainDblClick(s.name);return}s=s.parent}}}onResize(){const t=this.container.clientWidth/this.container.clientHeight,e=100;this.camera.left=-e*t/2,this.camera.right=e*t/2,this.camera.top=e/2,this.camera.bottom=-e/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.labelRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.render()}render(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}clearLayout(){const t=e=>{e instanceof ie&&(e.geometry.dispose(),e.material instanceof Jn?e.material.dispose():Array.isArray(e.material)&&e.material.forEach(n=>n.dispose()));for(const n of e.children)t(n)};for(;this.trackGroup.children.length>0;){const e=this.trackGroup.children[0];this.trackGroup.remove(e),t(e)}for(;this.labelGroup.children.length>0;)this.labelGroup.remove(this.labelGroup.children[0])}addTrackGroup(t){this.trackGroup.add(t)}updateTrains(t){for(;this.trainGroup.children.length>0;)this.trainGroup.remove(this.trainGroup.children[0]);const e=[...t.children];for(const n of e)t.remove(n),this.trainGroup.add(n)}addLabel(t,e,n){const s=document.createElement("div");s.className="track-label",s.textContent=t,s.style.cssText=`
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
      color: #333;
      border: 1px solid #999;
      white-space: nowrap;
    `;const r=new E_(s);r.position.set(e,1,n),this.labelGroup.add(r)}setLabelsVisible(t){this.labelGroup.visible=t,this.labelRenderer.domElement.style.display=t?"block":"none"}getLabelsVisible(){return this.labelGroup.visible}fitToLayout(){if(this.trackGroup.children.length===0)return;const t=new Li().setFromObject(this.trackGroup),e=t.getCenter(new I),n=t.getSize(new I),s=this.container.clientWidth/this.container.clientHeight,r=n.x/n.z;let a,o;r>s?(a=n.x/.9,o=a/s):(o=n.z/.9,a=o*s),this.camera.left=-a/2,this.camera.right=a/2,this.camera.top=o/2,this.camera.bottom=-o/2,this.camera.zoom=1,this.camera.position.set(e.x,100,e.z),this.camera.lookAt(e.x,0,e.z),this.camera.updateProjectionMatrix(),this.controls.target.set(e.x,0,e.z),this.controls.update()}}function Bc(i,t,e){return{x:i,y:t,z:e}}function $(i,t){return{x:i,y:0,z:t}}function kn(i,t,e){const n=[],s=t*Math.PI/180;for(let r=0;r<e;r++){const o=r/(e-1)*s;n.push($(i*Math.sin(o),i*(1-Math.cos(o))))}return n}function _i(i,t,e){return kn(i,t,e).map(s=>$(s.x,-s.z))}function no(i){const t=i*Math.PI/180;return $(Math.cos(t),Math.sin(t))}function io(i){const t=i*Math.PI/180;return $(Math.cos(t),-Math.sin(t))}const C_=[{code:"ph",aliases:["placeholder"],sections:[],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[]}]},{code:"str9",aliases:["str"],sections:[{splinePoints:[$(0,0),$(9,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(9,0),direction:$(1,0),sectionIndices:[0]}]},{code:"str6",aliases:[],sections:[{splinePoints:[$(0,0),$(6,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(6,0),direction:$(1,0),sectionIndices:[0]}]},{code:"str3",aliases:[],sections:[{splinePoints:[$(0,0),$(3,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(3,0),direction:$(1,0),sectionIndices:[0]}]},{code:"str15",aliases:[],sections:[{splinePoints:[$(0,0),$(1.5,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(1.5,0),direction:$(1,0),sectionIndices:[0]}]},{code:"crvl18",aliases:[],sections:[{splinePoints:kn(18,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:kn(18,22.5,7)[6],direction:no(22.5),sectionIndices:[0]}]},{code:"crvl22",aliases:["crvl","crv"],sections:[{splinePoints:kn(22,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:kn(22,22.5,7)[6],direction:no(22.5),sectionIndices:[0]}]},{code:"crvl24",aliases:[],sections:[{splinePoints:kn(24,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:kn(24,22.5,7)[6],direction:no(22.5),sectionIndices:[0]}]},{code:"crvr18",aliases:[],sections:[{splinePoints:_i(18,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:_i(18,22.5,7)[6],direction:io(22.5),sectionIndices:[0]}]},{code:"crvr22",aliases:["crvr"],sections:[{splinePoints:_i(22,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:_i(22,22.5,7)[6],direction:io(22.5),sectionIndices:[0]}]},{code:"crvr24",aliases:[],sections:[{splinePoints:_i(24,22.5,7)}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:_i(24,22.5,7)[6],direction:io(22.5),sectionIndices:[0]}]},{code:"bump",aliases:["bumper"],sections:[{splinePoints:[$(0,0),$(3,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]}]},{code:"gen",aliases:["generator"],sections:[{splinePoints:[$(-50,0),$(0,0)]}],connectionPoints:[{name:"in",position:$(-50,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[0]}]},{code:"bin",aliases:[],sections:[],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[]}]},{code:"tun",aliases:["tunnel"],sections:[],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[]}]},{code:"sem",aliases:["semaphore"],sections:[],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[]}]},{code:"dec",aliases:["decoupler"],sections:[],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[]},{name:"out",position:$(0,0),direction:$(1,0),sectionIndices:[]}]},{code:"x90",aliases:[],sections:[{splinePoints:[$(-3,0),$(3,0)]},{splinePoints:[$(0,-3),$(0,3)]}],connectionPoints:[{name:"in1",position:$(-3,0),direction:$(-1,0),sectionIndices:[0]},{name:"out1",position:$(3,0),direction:$(1,0),sectionIndices:[0]},{name:"in2",position:$(0,-3),direction:$(0,-1),sectionIndices:[1]},{name:"out2",position:$(0,3),direction:$(0,1),sectionIndices:[1]}]},{code:"x45",aliases:[],sections:[{splinePoints:[$(-3,0),$(3,0)]},{splinePoints:[$(-2.12,-2.12),$(2.12,2.12)]}],connectionPoints:[{name:"in1",position:$(-3,0),direction:$(-1,0),sectionIndices:[0]},{name:"out1",position:$(3,0),direction:$(1,0),sectionIndices:[0]},{name:"in2",position:$(-2.12,-2.12),direction:$(-.707,-.707),sectionIndices:[1]},{name:"out2",position:$(2.12,2.12),direction:$(.707,.707),sectionIndices:[1]}]}],Hl=new Map,Vl=new Map;for(const i of C_){Hl.set(i.code,i);for(const t of i.aliases)Vl.set(t,i)}const Wl=new Map;function hn(i){Wl.set(i.code.toLowerCase(),i)}function re(i){const t=i.toLowerCase(),e=Wl.get(t);if(e)return e;const n=Hl.get(t)||Vl.get(t);if(!n)throw new Error(`Unknown track archetype: ${i}`);return n}var Qe=(i=>(i[i.DEBUG=0]="DEBUG",i[i.INFO=1]="INFO",i[i.WARNING=2]="WARNING",i[i.ERROR=3]="ERROR",i))(Qe||{});let Vi=2;function $l(i){Vi=i}const K={debug(i,...t){Vi<=0&&console.log(`[DEBUG] ${i}`,...t)},info(i,...t){Vi<=1&&console.log(`[INFO] ${i}`,...t)},warn(i,...t){Vi<=2&&console.warn(`[WARN] ${i}`,...t)},error(i,...t){Vi<=3&&console.error(`[ERROR] ${i}`,...t)}},R_=6045747,P_=6045747,L_=14211272,I_=13154464,Xl=16777215,D_=16711680,N_=2271778,U_=13378082,O_=4473924,F_=4868682,z_=65280,B_=16711680,ql=65280,Yl=16711680,k_=3355443,Kl=16746496,jl=16711680,G_=1.045,so=.08,H_=1.45,ro=.15,V_=.25,W_=1,$_=2,X_=2.4,zs=.1,bi=new Map,Oo=new Map,Fo=new Map,zo=new Map;function q_(i){bi.has(i)||bi.set(i,0);const t=bi.get(i);return K.debug(`getSelectedRouteByKey: key="${i}" → ${t}`),t}function Zl(i,t){const e=bi.get(i);K.debug(`setSelectedRouteByKey: key="${i}" ${e} → ${t}`),bi.set(i,t)}function Y_(){return bi}function K_(i,t){for(const[e,n]of Oo)if(n.visible=t,t){const s=n.material,r=i.has(e);s.color.setHex(r?D_:Xl)}}function j_(i,t){const e=Fo.get(i);e&&e.dot.material.color.setHex(t?Yl:ql)}function kc(i,t){const e=zo.get(i);if(e)for(const n of e)n.material.color.setHex(t?jl:Kl)}function Ni(i,t){var s;i.clearLayout(),Oo.clear(),Fo.clear(),zo.clear();const e=new Map;for(const r of t.pieces)e.set(r.id,r);const n=(s=t.randomSwitches)!=null?s:!1;for(const r of t.pieces){const a=re(r.archetypeCode),o=Z_(r,a,e,n);if(i.addTrackGroup(o),r.label){const c=sv(r,a),l=2,h=Math.cos(r.rotation+Math.PI/2)*l,u=-Math.sin(r.rotation+Math.PI/2)*l;i.addLabel(r.label,c.x+h,c.z+u)}}i.fitToLayout(),i.render()}function Z_(i,t,e,n=!1){var h,u,d,f;const s=new De,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=g=>new I(i.position.x+(g.x*r-g.z*a),g.y,-(i.position.z+(g.x*a+g.z*r))),l=t.code==="gen"||t.code==="bin"||i.inTunnel;if(!l){for(const g of t.sections)if(g.splinePoints.length>=2){const _=g.splinePoints.map(m=>o(m)),p=J_(_);s.add(p)}}if(!l){for(const g of t.connectionPoints){const _=o({x:g.position.x,y:0,z:g.position.z}),p=`${i.id}.${g.name}`,m=i.connections.get(g.name)||[],x=Hc(_,p);if(s.add(x),K.debug(`  ${i.id}.${g.name}: ${m.length} connections`),m.length>1&&!n){const v=dv(i,g.name,_,m,e);for(const M of v)s.add(M)}}if(i.internalConnectionPoints)for(const g of i.internalConnectionPoints){const _=new I(g.worldPosition.x,0,-g.worldPosition.z),p=Hc(_,g.id);s.add(p),K.debug(`  Internal connection point ${g.id} at (${g.worldPosition.x.toFixed(1)}, ${g.worldPosition.z.toFixed(1)})`)}}if(t.code==="gen"){const g=o({x:0,y:0,z:0}),_=Q_(g);s.add(_)}else if(t.code==="bin"){const g=o({x:0,y:0,z:0}),_=tv(g);s.add(_)}else if(t.code==="bump"||t.code==="bumper"){const g=rv(i,t,o);s.add(g)}else if(t.code==="tun"||t.code==="tunnel"){const g=iv(i);for(const _ of g)s.add(_)}else if(t.code==="sem"||t.code==="semaphore"){const g=o({x:0,y:0,z:0}),_=(u=(h=i.semaphoreConfig)==null?void 0:h.locked)!=null?u:!1,p=ev(g,i.id,_);s.add(p)}else if(t.code==="dec"||t.code==="decoupler"){const g=o({x:0,y:0,z:0}),_=(f=(d=i.decouplerConfig)==null?void 0:d.activated)!=null?f:!1,p=nv(g,i.id,i.rotation,_);s.add(p)}return s}function J_(i){const t=new De,e=new Xn(i),n=e.getLength(),s=Math.max(16,i.length*8),r=new wn({color:R_,roughness:.5,metalness:.2}),a=new wn({color:P_,roughness:.9,metalness:0}),o=new wn({color:L_,roughness:1,metalness:0}),c=new wn({color:I_,roughness:.9,metalness:0}),l=Gc(e,s,X_,zs),h=new ie(l,c);h.position.y=.01,t.add(h);const u=Gc(e,s,$_,.08),d=new ie(u,o);d.position.y=zs+.02,t.add(d);const f=new Qn(V_,ro,H_),g=Math.floor(n/W_);for(let T=0;T<=g;T++){const z=T/Math.max(g,1),W=e.getPointAt(z),rt=e.getTangentAt(z),L=new ie(f,a);L.position.set(W.x,zs+.08+ro/2,W.z);const F=Math.atan2(-rt.z,rt.x);L.rotation.y=F,t.add(L)}const _=G_/2,p=[],m=[],x=s;for(let T=0;T<=x;T++){const z=T/x,W=e.getPointAt(z),rt=e.getTangentAt(z),L=-rt.z,F=rt.x;p.push(new I(W.x+L*_,W.y,W.z+F*_)),m.push(new I(W.x-L*_,W.y,W.z-F*_))}const v=new Xn(p),M=new Xn(m),R=new Qs(v,s,so,6,!1),A=new Qs(M,s,so,6,!1),w=new ie(R,r),O=new ie(A,r),E=zs+.08+ro+so;return w.position.y=E,O.position.y=E,t.add(w),t.add(O),t}function Gc(i,t,e,n){const s=e/2,r=[],a=[];for(let c=0;c<=t;c++){const l=c/t,h=i.getPointAt(l),u=i.getTangentAt(l),d=-u.z,f=u.x;r.push(h.x+d*s,0,h.z+f*s),r.push(h.x-d*s,0,h.z-f*s),r.push(h.x-d*s,n,h.z-f*s),r.push(h.x+d*s,n,h.z+f*s)}for(let c=0;c<t;c++){const l=c*4;a.push(l+3,l+2,l+6),a.push(l+3,l+6,l+7),a.push(l+0,l+3,l+7),a.push(l+0,l+7,l+4),a.push(l+2,l+1,l+5),a.push(l+2,l+5,l+6),a.push(l+0,l+4,l+5),a.push(l+0,l+5,l+1)}const o=new Ce;return o.setAttribute("position",new ne(r,3)),o.setIndex(a),o.computeVertexNormals(),o}function Hc(i,t){const e=new ss(.25,16,16),n=new gn({color:Xl}),s=new ie(e,n);return s.position.set(i.x,.5,i.z),s.visible=!1,Oo.set(t,s),s}function Q_(i){const t=new dr(1.5,32),e=new gn({color:N_,side:ze}),n=new ie(t,e);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.6,i.z),n}function tv(i){const t=new dr(1.5,32),e=new gn({color:U_,side:ze}),n=new ie(t,e);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.5,i.z),n}function ev(i,t,e){const n=new De,s=new No(1.3,1.5,32),r=new gn({color:k_,side:ze}),a=new ie(s,r);a.rotation.x=-Math.PI/2,a.position.set(i.x,.55,i.z),n.add(a);const o=new ss(.6,16,16),c=e?Yl:ql,l=new gn({color:c}),h=new ie(o,l);return h.position.set(i.x,.7,i.z),h.userData={isSemaphore:!0,pieceId:t},n.add(h),Fo.set(t,{dot:h,ring:a}),n}function nv(i,t,e,n){const s=new De,r=n?jl:Kl,a=.8,o=1.5,c=-Math.sin(-e),l=-Math.cos(-e),h=new Di;h.moveTo(0,a),h.lineTo(-a*.7,-a*.5),h.lineTo(a*.7,-a*.5),h.lineTo(0,a);const u=new Uo(h),d=new gn({color:r,side:ze}),f=new ie(u,d.clone());f.rotation.x=-Math.PI/2,f.rotation.z=-e,f.position.set(i.x+c*o,.6,i.z+l*o),f.userData={isDecoupler:!0,pieceId:t},s.add(f);const g=new ie(u,d.clone());return g.rotation.x=-Math.PI/2,g.rotation.z=Math.PI-e,g.position.set(i.x-c*o,.6,i.z-l*o),g.userData={isDecoupler:!0,pieceId:t},s.add(g),zo.set(t,[f,g]),s}function iv(i){const t=[],a=new wn({color:F_,roughness:.7,metalness:.2}),c=(()=>{const u=new Di,d=4.2/2,f=.3;u.moveTo(-d,0),u.lineTo(-d,.8),u.lineTo(-d+f,.8),u.lineTo(-d+f,f),u.lineTo(d-f,f),u.lineTo(d-f,.8),u.lineTo(d,.8),u.lineTo(d,0),u.lineTo(-d,0);const g={depth:1.5,bevelEnabled:!1};return new is(u,g)})(),l=new ie(c,a);l.rotation.order="YXZ",l.rotation.y=Math.PI/2,l.rotation.x=-Math.PI/2,l.rotation.z=Math.PI+i.rotation,l.position.set(i.position.x,0,-i.position.z),t.push(l);const h=new ie(c,a);return h.rotation.order="YXZ",h.rotation.y=Math.PI/2,h.rotation.x=-Math.PI/2,h.rotation.z=i.rotation,h.position.set(i.position.x,0,-i.position.z),t.push(h),t}function sv(i,t){const e=Math.cos(i.rotation),n=Math.sin(i.rotation),s=o=>({x:i.position.x+(o.x*e-o.z*n),z:-(i.position.z+(o.x*n+o.z*e))}),r=t.connectionPoints.find(o=>o.name==="in"),a=t.connectionPoints.find(o=>o.name==="out");if(r&&a){const o=s(r.position),c=s(a.position);return{x:(o.x+c.x)/2,z:(o.z+c.z)/2}}if(t.sections.length>0&&t.sections[0].splinePoints.length>0){const o=t.sections[0].splinePoints,c=Math.floor(o.length/2);return s(o[c])}return{x:i.position.x,z:-i.position.z}}function rv(i,t,e){const n=t.sections[0];let s,r=i.rotation;if(!n||n.splinePoints.length<2)s=e({x:0,y:0,z:0});else{const l=n.splinePoints[n.splinePoints.length-1];s=e(l);const h=n.splinePoints[n.splinePoints.length-2],u=n.splinePoints[n.splinePoints.length-1],d={x:u.x-h.x,z:u.z-h.z},f=Math.cos(i.rotation),g=Math.sin(i.rotation),_={x:d.x*f-d.z*g,z:-(d.x*g+d.z*f)};r=Math.atan2(_.z,_.x)}const a=new Qn(.5,1,2),o=new wn({color:O_}),c=new ie(a,o);return c.position.set(s.x,.5,s.z),c.rotation.y=r,c}const ov=30,av=.4,cv=1,lv=.75;function hv(i){return i==="in"||i==="in1"||i==="in2"}function uv(i){return i==="out"||i==="out1"||i==="out2"}function dv(i,t,e,n,s){const r=[],a=n.filter(c=>hv(c.pointName)),o=n.filter(c=>uv(c.pointName));if(a.length>1){const c=Vc(i,t,"fwd",a,s,n);r.push(...c)}if(o.length>1){const c=Vc(i,t,"bwd",o,s,n);r.push(...c)}return r}function Vc(i,t,e,n,s,r){const a=[],o=r.map(g=>`${g.pieceId}.${g.pointName}`);o.push(`${i.id}.${t}`),o.sort();const l=`junction.${o[0]}.${e}`,h=q_(l);K.debug(`renderSwitchIndicators: ${l}, ${n.length} connections, selectedIndex=${h}`),n.forEach((g,_)=>K.debug(`  route[${_}]: ${g.pieceId}.${g.pointName} ${g.isAutoConnect?"(auto)":""}`));const u=[];for(const g of n){const _=fv(g,s);u.push(_)}const d=u.map(g=>{if(!g)return null;const _=gv(g);return pv(g,_)});if(d.filter(g=>g!==null).length<=1)return a;for(let g=0;g<n.length;g++){const _=d[g];if(K.debug(`  Indicator ${g}: pos=${_?`(${_.x.toFixed(2)}, ${_.z.toFixed(2)})`:"null"}, curveInfo=${u[g]?"valid":"null"}`),!_)continue;const p=g===h,m=p?z_:B_,x=new ss(.6,16,16),v=new gn({color:m}),M=new ie(x,v);M.position.set(_.x,.7,_.z),M.userData={isSwitchIndicator:!0,routeKey:l,connectionIndex:g},K.debug(`  Created indicator ${g} at (${_.x.toFixed(2)}, 0.7, ${_.z.toFixed(2)}), selected=${p}, color=${p?"green":"red"}`),a.push(M)}return a}function Wc(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function fv(i,t){const e=t.get(i.pieceId);if(!e)return null;const n=re(e.archetypeCode);if(!n||n.sections.length===0)return null;const s=n.sections[0];if(s.splinePoints.length<2)return null;const r=Math.cos(e.rotation),a=Math.sin(e.rotation),o=p=>new I(e.position.x+(p.x*r-p.z*a),p.y,-(e.position.z+(p.x*a+p.z*r))),c=s.splinePoints.map(p=>o(p)),l=new Xn(c),h=l.getLength();if(h===0)return null;const u=i.pointName==="in"||i.pointName==="in1",d=Wc(i.pointName),f=e.connections.get(d)||[],g=f.length>1;let _=!1;if(f.length===1){const p=f[0],m=t.get(p.pieceId);if(m){const x=Wc(p.pointName),v=m.connections.get(x)||[];if(v.length>1)_=!0;else if(v.length===1){const M=v[0],R=t.get(M.pieceId);R&&(_=(R.connections.get(M.pointName)||[]).length>1)}}}return{curve:l,curveLength:h,isFromIn:u,farEndHasSwitch:g,farEndNextTrackHasSwitch:_}}function pv(i,t){const e=i.isFromIn?Math.min(t/i.curveLength,1):Math.max(1-t/i.curveLength,0),n=i.curve.getPointAt(e);return{x:n.x,z:n.z}}function mv(i){return i.farEndHasSwitch?av:i.farEndNextTrackHasSwitch?lv:cv}function gv(i){const t=mv(i);return Math.min(i.curveLength*t,ov)}const Hs=4,Vs=3,oo=.5;function An(i,t){const e=re(i.archetypeCode);if(!e||t>=e.sections.length)return 0;const n=e.sections[t];if(n.splinePoints.length<2)return 0;const s=Jl(n.splinePoints,i);return new Xn(s).getLength()}function Jl(i,t){const e=Math.cos(t.rotation),n=Math.sin(t.rotation);return i.map(s=>new I(t.position.x+(s.x*e-s.z*n),s.y,t.position.z+(s.x*n+s.z*e)))}function _v(i,t,e){const n=re(i.archetypeCode);if(!n||t>=n.sections.length)return null;const s=n.sections[t];if(s.splinePoints.length<2)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const r=Jl(s.splinePoints,i),a=new Xn(r),o=a.getLength();if(o===0)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const c=Math.max(0,Math.min(1,e/o)),l=a.getPointAt(c),h=a.getTangentAt(c),u=Math.atan2(h.z,h.x);return{position:{x:l.x,y:0,z:l.z},rotation:u}}function bo(i,t){const e=t.pieces.find(r=>r.id===i.currentPieceId);if(!e)return;const n=Wi(i.entryPoint),s=_v(e,n,i.distanceAlongSection);s&&(i.worldPosition=s.position,i.rotation=s.rotation)}function Ri(i){return i==="in"||i==="in1"||i==="in2"}function Bo(i){return i==="out"||i==="out1"||i==="out2"}function Wi(i){return i&&(i==="in2"||i==="out2")?1:0}function Ws(i,t,e,n,s,r,a,o){var M;const c=e.pieces.find(R=>R.id===i);if(!c)return null;const l=c.connections.get(t);if(!l||l.length===0)return null;const h=l.filter(R=>R.pieceId!==r);if(h.length===0)return null;if(h.length===1)return{pieceId:h[0].pieceId,entryPoint:h[0].pointName};const u=h.filter(R=>Ri(R.pointName)),d=h.filter(R=>Bo(R.pointName));let f,g;if(a==="backward"?d.length>0?(f=d,g="bwd"):(f=u,g="fwd"):u.length>0?(f=u,g="fwd"):(f=d,g="bwd"),f.length===0&&(f=h,g="fwd"),f.length===1)return{pieceId:f[0].pieceId,entryPoint:f[0].pointName};const _=l.map(R=>`${R.pieceId}.${R.pointName}`);_.push(`${i}.${t}`),_.sort();const m=`junction.${_[0]}.${g}`;let x;s!=null&&s.has(m)?(x=s.get(m),o&&o.add(m)):(e.randomSwitches?x=Math.floor(Math.random()*f.length):x=(M=n.get(m))!=null?M:0,s&&s.set(m,x));const v=f[Math.min(x,f.length-1)];return{pieceId:v.pieceId,entryPoint:v.pointName}}function ko(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function vv(i,t,e,n,s,r){i.distanceAlongSection+=t;let a=e.pieces.find(h=>h.id===i.currentPieceId);if(!a)return;let o=Wi(i.entryPoint),c=An(a,o),l=0;for(;c===0&&l<10;){l++;let h,u;i.entryPoint?(h=ko(i.entryPoint),u=Ri(i.entryPoint)?"forward":"backward"):(h=i.distanceAlongSection>=0?"out":"in",u="forward");const d=Ws(i.currentPieceId,h,e,n,s,i.previousPieceId,u,r);if(!d){i.distanceAlongSection=0,bo(i,e);return}if(i.previousPieceId=i.currentPieceId,i.currentPieceId=d.pieceId,i.entryPoint=d.entryPoint,a=e.pieces.find(f=>f.id===i.currentPieceId),!a)return;o=Wi(i.entryPoint),c=An(a,o)}for(;i.distanceAlongSection>=c&&c>0;){const h=i.distanceAlongSection-c,d=Ws(i.currentPieceId,"out",e,n,s,i.previousPieceId,"forward",r);if(!d){i.distanceAlongSection=c;return}i.previousPieceId=i.currentPieceId,i.currentPieceId=d.pieceId,i.entryPoint=d.entryPoint;const f=e.pieces.find(g=>g.id===d.pieceId);if(f){const g=Wi(d.entryPoint),_=An(f,g);Bo(d.entryPoint)?i.distanceAlongSection=_-h:i.distanceAlongSection=h,c=_}else{i.distanceAlongSection=h;break}}for(;i.distanceAlongSection<0&&c>0;){const u=Ws(i.currentPieceId,"in",e,n,s,i.previousPieceId,"backward",r);if(!u){i.distanceAlongSection=0;break}const d=e.pieces.find(f=>f.id===u.pieceId);if(d){const f=Wi(u.entryPoint),g=An(d,f);if(g===0){i.distanceAlongSection=0;break}const _=-i.distanceAlongSection;i.previousPieceId=i.currentPieceId,i.currentPieceId=u.pieceId,i.entryPoint=u.entryPoint,Ri(u.entryPoint)?i.distanceAlongSection=_:i.distanceAlongSection=g-_,c=g}else break}bo(i,e)}const Ql=2,tr=1.5,xv=16776960,th=[16711680,255,65280,16711935,16776960],Sv=[3158064,5263440,7368816,9474192,11579568];let $i=null;function Mv(i="gray"){if(i==="black")return 0;const t=i==="colorful"?th:Sv,e=t.map((r,a)=>$i!==null&&a===$i?2:1),n=e.reduce((r,a)=>r+a,0);let s=Math.random()*n;for(let r=0;r<e.length;r++)if(s-=e[r],s<=0)return $i=r,t[r];return $i=0,t[0]}function Ev(){$i=null}function yv(){const i=Hs/2,t=Ql/2,e=.25,n=.15,s=i*.35,r=t*.35,a=.15,o=new Di;return o.moveTo(-i+e,-t),o.quadraticCurveTo(-i,-t,-i,-t+e),o.lineTo(-i,t-e),o.quadraticCurveTo(-i,t,-i+e,t),o.lineTo(s,t),o.lineTo(i-a,r+n),o.quadraticCurveTo(i-a+n*.5,r,i,r),o.lineTo(i,-r),o.quadraticCurveTo(i-a+n*.5,-r,i-a,-r-n),o.lineTo(s,-t),o.lineTo(-i+e,-t),o}function bv(){const i=Vs/2,t=Ql/2,e=.2,n=new Di;return n.moveTo(-i+e,-t),n.quadraticCurveTo(-i,-t,-i,-t+e),n.lineTo(-i,t-e),n.quadraticCurveTo(-i,t,-i+e,t),n.lineTo(i-e,t),n.quadraticCurveTo(i,t,i,t-e),n.lineTo(i,-t+e),n.quadraticCurveTo(i,-t,i-e,-t),n.lineTo(-i+e,-t),n}let Gi=null,Hi=null,ao=null,co=null;const $c=new Map;let lo=null;function eh(){if(!Gi){const i=yv();Gi=new is(i,{depth:tr,bevelEnabled:!1}),Gi.rotateX(-Math.PI/2),Gi.translate(0,tr/2,0)}return Gi}function nh(){if(!Hi){const i=bv();Hi=new is(i,{depth:tr,bevelEnabled:!1}),Hi.rotateX(-Math.PI/2),Hi.translate(0,tr/2,0)}return Hi}function Tv(){return ao||(ao=new Fl(eh(),15)),ao}function wv(){return co||(co=new Fl(nh(),15)),co}function Av(i){let t=$c.get(i);return t||(t=new wn({color:i,roughness:.5,metalness:.1}),$c.set(i,t)),t}function Cv(){return lo||(lo=new Ll({color:0,linewidth:1})),lo}function Rv(i){const t=new De;for(const e of i){const n=Pv(e);t.add(n)}return t}function Pv(i){const t=new De;t.name=i.id;for(const e of i.cars){const n=Lv(e);t.add(n)}return t}function Lv(i){var d;const t=i.type==="cab",e=t?eh():nh(),n=t?Tv():wv(),s=t?xv:(d=i.color)!=null?d:th[0],r=Av(s),a=new ie(e,r),o=new Bg(n,Cv()),c=new De;c.name=i.id,c.add(a),c.add(o);const l=i.worldPosition.x,h=-i.worldPosition.z,u=i.rotation;return Number.isNaN(l)||Number.isNaN(h)||Number.isNaN(u)?(K.error(`NaN detected in car ${i.id}: pos=(${l}, ${h}), rot=${u}`),c.visible=!1):(c.position.set(l,0,h),c.rotation.y=u),c.visible=i.visible,c}var Q=(i=>(i.IDENTIFIER="IDENTIFIER",i.LABEL_DEF="LABEL_DEF",i.LABEL_REF="LABEL_REF",i.DOT="DOT",i.REPETITION="REPETITION",i.NUMBER="NUMBER",i.RANGE="RANGE",i.STRING="STRING",i.NEW="NEW",i.LOOP_CLOSE="LOOP_CLOSE",i.TITLE="TITLE",i.DESCRIPTION="DESCRIPTION",i.LOCKAHEAD="LOCKAHEAD",i.DISTANCE="DISTANCE",i.COUNT="COUNT",i.DEGREES="DEGREES",i.OFFSET="OFFSET",i.BASE="BASE",i.SPLICE="SPLICE",i.USING="USING",i.CABS="CABS",i.CARS="CARS",i.SPEED="SPEED",i.EVERY="EVERY",i.COLORFUL="COLORFUL",i.GRAY="GRAY",i.BLACK="BLACK",i.RANDOM="RANDOM",i.MAX="MAX",i.TRAINS="TRAINS",i.FLEX="FLEX",i.CONNECT="CONNECT",i.CROSS="CROSS",i.DEFINE="DEFINE",i.LEFT="LEFT",i.RIGHT="RIGHT",i.STRAIGHT="STRAIGHT",i.RADIUS="RADIUS",i.ARC="ARC",i.LENGTH="LENGTH",i.LOG="LOG",i.EOF="EOF",i))(Q||{});function Iv(i){const t=[],e=i.split(`
`);for(let n=0;n<e.length;n++){let s=e[n];const r=s.indexOf("#");r!==-1&&(s=s.substring(0,r));const a=s.split(";");for(const o of a){const c=Dv(o.trim(),n+1);t.push(...c)}}return t.push({type:"EOF",value:"",line:e.length,column:0}),t}function Dv(i,t){const e=[];let n=0;for(;n<i.length;){for(;n<i.length&&/\s/.test(i[n]);)n++;if(n>=i.length)break;const s=n,r=i[n];if(r==="$"){n++;const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;e.push({type:"LABEL_REF",value:i.substring(a,n),line:t,column:s+1});continue}if(r===">"){e.push({type:"LOOP_CLOSE",value:">",line:t,column:s+1}),n++;continue}if(r==="."){e.push({type:"DOT",value:".",line:t,column:s+1}),n++;continue}if(r==="*"){e.push({type:"REPETITION",value:"*",line:t,column:s+1}),n++;continue}if(/[0-9]/.test(r)||r==="-"&&n+1<i.length&&/[0-9]/.test(i[n+1])){const a=n;for(r==="-"&&n++;n<i.length&&/[0-9.]/.test(i[n]);)n++;if(r!=="-"&&n<i.length&&i[n]==="-"){const o=n;if(n++,n<i.length&&/[0-9]/.test(i[n])){for(;n<i.length&&/[0-9.]/.test(i[n]);)n++;e.push({type:"RANGE",value:i.substring(a,n),line:t,column:s+1});continue}else n=o}e.push({type:"NUMBER",value:i.substring(a,n),line:t,column:s+1});continue}if(/[a-zA-Z_]/.test(r)){const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;const o=i.substring(a,n),c=o.toLowerCase();let l=n;for(;l<i.length&&/\s/.test(i[l]);)l++;if(l<i.length&&i[l]===":"){e.push({type:"LABEL_DEF",value:o,line:t,column:s+1}),n=l+1;continue}if(c==="new"){e.push({type:"NEW",value:o,line:t,column:s+1});continue}if(c==="title"){e.push({type:"TITLE",value:o,line:t,column:s+1});const h=i.substring(n).trim();return h.length>0&&e.push({type:"STRING",value:h,line:t,column:n+1}),e}if(c==="description"){e.push({type:"DESCRIPTION",value:o,line:t,column:s+1});const h=i.substring(n).trim();return h.length>0&&e.push({type:"STRING",value:h,line:t,column:n+1}),e}if(c==="lockahead"){e.push({type:"LOCKAHEAD",value:o,line:t,column:s+1});continue}if(c==="distance"){e.push({type:"DISTANCE",value:o,line:t,column:s+1});continue}if(c==="count"){e.push({type:"COUNT",value:o,line:t,column:s+1});continue}if(c==="degrees"){e.push({type:"DEGREES",value:o,line:t,column:s+1});continue}if(c==="offset"){e.push({type:"OFFSET",value:o,line:t,column:s+1});continue}if(c==="base"){e.push({type:"BASE",value:o,line:t,column:s+1});continue}if(c==="splice"){e.push({type:"SPLICE",value:o,line:t,column:s+1});continue}if(c==="using"){e.push({type:"USING",value:o,line:t,column:s+1});continue}if(c==="cabs"){e.push({type:"CABS",value:o,line:t,column:s+1});continue}if(c==="cars"){e.push({type:"CARS",value:o,line:t,column:s+1});continue}if(c==="speed"){e.push({type:"SPEED",value:o,line:t,column:s+1});continue}if(c==="every"){e.push({type:"EVERY",value:o,line:t,column:s+1});continue}if(c==="colorful"){e.push({type:"COLORFUL",value:o,line:t,column:s+1});continue}if(c==="gray"){e.push({type:"GRAY",value:o,line:t,column:s+1});continue}if(c==="black"){e.push({type:"BLACK",value:o,line:t,column:s+1});continue}if(c==="random"){e.push({type:"RANDOM",value:o,line:t,column:s+1});continue}if(c==="max"){e.push({type:"MAX",value:o,line:t,column:s+1});continue}if(c==="trains"){e.push({type:"TRAINS",value:o,line:t,column:s+1});continue}if(c==="flex"){e.push({type:"FLEX",value:o,line:t,column:s+1});continue}if(c==="connect"){e.push({type:"CONNECT",value:o,line:t,column:s+1});continue}if(c==="cross"){e.push({type:"CROSS",value:o,line:t,column:s+1});continue}if(c==="log"||c==="logging"){e.push({type:"LOG",value:o,line:t,column:s+1});continue}if(c==="define"||c==="def"){e.push({type:"DEFINE",value:o,line:t,column:s+1});continue}if(c==="left"||c==="l"){e.push({type:"LEFT",value:o,line:t,column:s+1});continue}if(c==="right"||c==="r"){e.push({type:"RIGHT",value:o,line:t,column:s+1});continue}if(c==="straight"||c==="s"){e.push({type:"STRAIGHT",value:o,line:t,column:s+1});continue}if(c==="radius"){e.push({type:"RADIUS",value:o,line:t,column:s+1});continue}if(c==="arc"){e.push({type:"ARC",value:o,line:t,column:s+1});continue}if(c==="length"){e.push({type:"LENGTH",value:o,line:t,column:s+1});continue}if(c==="x"){e.push({type:"REPETITION",value:"x",line:t,column:s+1});continue}e.push({type:"IDENTIFIER",value:o,line:t,column:s+1});continue}n++}return e}function Nv(i){const t=Iv(i);return new Uv(t).parse()}class Uv{constructor(t){bt(this,"tokens");bt(this,"pos",0);this.tokens=t}parse(){const t=[];for(;!this.isAtEnd();){const e=this.parseStatement();e&&t.push(e)}return t}parseStatement(){var e;switch(this.peek().type){case Q.NEW:return this.parseNewStatement();case Q.TITLE:return this.parseTitleStatement();case Q.DESCRIPTION:return this.parseDescriptionStatement();case Q.LOCKAHEAD:return this.parseLockAheadStatement();case Q.RANDOM:return this.parseRandomStatement();case Q.MAX:return this.parseMaxTrainsStatement();case Q.FLEX:return this.parseFlexConnectStatement();case Q.CROSS:return this.parseCrossConnectStatement();case Q.DEFINE:return this.parseDefineStatement();case Q.LOG:return this.parseLogStatement();case Q.SPLICE:return this.parseSpliceStatement();case Q.LABEL_DEF:return this.parseLabeledPiece();case Q.LABEL_REF:return this.parseReference();case Q.LOOP_CLOSE:return this.parseLoopClose();case Q.IDENTIFIER:if(((e=this.peekNext())==null?void 0:e.type)===Q.DOT){const n=this.tokens[this.pos+2];if((n==null?void 0:n.type)===Q.LABEL_REF)return this.parsePointLabelReference()}return this.parsePieceOrExplicitConnection();case Q.EOF:return null;default:return this.advance(),null}}parseNewStatement(){const t=this.advance();let e=0,n=0,s,r;for(;this.isNewModifier();)if(this.check(Q.DEGREES))this.advance(),this.check(Q.NUMBER)&&(e=parseFloat(this.advance().value));else if(this.check(Q.OFFSET))this.advance(),this.check(Q.NUMBER)&&(n=parseFloat(this.advance().value));else if(this.check(Q.BASE)){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(Q.NUMBER))e=parseFloat(this.advance().value);else if(this.check(Q.IDENTIFIER)&&this.peek().value.toLowerCase()==="from"){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(Q.LABEL_REF)){const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else break;return{type:"new",degrees:e,offset:n,baseLabel:s,basePoint:r,line:t.line}}isNewModifier(){var n;const t=this.peek().type,e=this.peek().value;return t===Q.DEGREES||t===Q.OFFSET||t===Q.BASE||t===Q.NUMBER||t===Q.LABEL_REF||t===Q.IDENTIFIER&&e.toLowerCase()==="from"||t===Q.IDENTIFIER&&((n=this.peekNext())==null?void 0:n.type)===Q.DOT}parseConnectionPointRef(){var t;if(this.check(Q.LABEL_REF)){const e=this.advance().value;let n;return this.check(Q.DOT)&&(this.advance(),this.check(Q.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{label:e,point:n}}else if(this.check(Q.IDENTIFIER)&&((t=this.peekNext())==null?void 0:t.type)===Q.DOT){const e=this.advance().value.toLowerCase();if(this.advance(),this.check(Q.LABEL_REF))return{label:this.advance().value,point:e}}return null}parseTitleStatement(){const t=this.advance();let e="";return this.check(Q.STRING)&&(e=this.advance().value),{type:"title",text:e,line:t.line}}parseDescriptionStatement(){const t=this.advance();let e="";return this.check(Q.STRING)&&(e=this.advance().value),{type:"description",text:e,line:t.line}}parseLockAheadStatement(){const t=this.advance();let e,n;for(;this.check(Q.DISTANCE)||this.check(Q.COUNT)||this.check(Q.NUMBER);)this.check(Q.DISTANCE)?(this.advance(),this.check(Q.NUMBER)&&(e=parseFloat(this.advance().value))):this.check(Q.COUNT)?(this.advance(),this.check(Q.NUMBER)&&(n=parseInt(this.advance().value,10))):this.check(Q.NUMBER)&&(e=parseFloat(this.advance().value));return{type:"lockAhead",distance:e,count:n,line:t.line}}parseRandomStatement(){return{type:"random",line:this.advance().line}}parseMaxTrainsStatement(){const t=this.advance();this.check(Q.TRAINS)&&this.advance();let e=1;return this.check(Q.NUMBER)&&(e=parseInt(this.advance().value,10)),{type:"maxTrains",value:e,line:t.line}}parseFlexConnectStatement(){const t=this.advance();this.check(Q.CONNECT)&&this.advance();const e=this.parseConnectionPointRef();if(!e)throw new Error(`Expected connection point reference after 'flex connect' at line ${t.line}`);const n=this.parseConnectionPointRef();if(!n)throw new Error(`Expected second connection point reference in 'flex connect' at line ${t.line}`);return{type:"flexConnect",point1Label:e.label,point1Name:e.point,point2Label:n.label,point2Name:n.point,line:t.line}}parseCrossConnectStatement(){const t=this.advance();if(this.check(Q.CONNECT)&&this.advance(),!this.check(Q.LABEL_REF))throw new Error(`Expected $label after 'cross connect' at line ${t.line}`);const e=this.advance().value;if(!this.check(Q.LABEL_REF))throw new Error(`Expected second $label in 'cross connect' at line ${t.line}`);const n=this.advance().value;return{type:"crossConnect",label1:e,label2:n,line:t.line}}parseLogStatement(){const t=this.advance();if(!this.check(Q.IDENTIFIER))throw new Error(`Expected log level (debug, info, warn, error) after 'log' at line ${t.line}`);const e=this.advance();let n=e.value.toLowerCase();if(n==="warning"&&(n="warn"),n!=="debug"&&n!=="info"&&n!=="warn"&&n!=="error")throw new Error(`Invalid log level '${e.value}' at line ${t.line}. Expected: debug, info, warn, or error`);return{type:"log",level:n,line:t.line}}parseDefineStatement(){const t=this.advance();if(!this.check(Q.IDENTIFIER))throw new Error(`Expected archetype name after 'define' at line ${t.line}`);const e=this.advance().value.toLowerCase();let n;if(this.check(Q.LEFT))this.advance(),n="left";else if(this.check(Q.RIGHT))this.advance(),n="right";else if(this.check(Q.STRAIGHT))this.advance(),n="straight";else throw new Error(`Expected direction (left, right, straight, l, r, or s) after archetype name at line ${t.line}`);let s,r,a;if(n==="left"||n==="right"){for(;this.check(Q.RADIUS)||this.check(Q.ARC);)if(this.check(Q.RADIUS)){if(this.advance(),!this.check(Q.NUMBER))throw new Error(`Expected number after 'radius' at line ${t.line}`);s=parseFloat(this.advance().value)}else if(this.check(Q.ARC)){if(this.advance(),!this.check(Q.NUMBER))throw new Error(`Expected number after 'arc' at line ${t.line}`);r=parseFloat(this.advance().value)}if(s===void 0)throw new Error(`Curve definition requires 'radius' at line ${t.line}`);if(r===void 0)throw new Error(`Curve definition requires 'arc' at line ${t.line}`);if(this.check(Q.LENGTH))throw new Error(`'length' is not allowed for curve definitions at line ${t.line}`)}else{if(!this.check(Q.LENGTH))throw new Error(`Straight definition requires 'length' at line ${t.line}`);if(this.advance(),!this.check(Q.NUMBER))throw new Error(`Expected number after 'length' at line ${t.line}`);if(a=parseFloat(this.advance().value),this.check(Q.RADIUS)||this.check(Q.ARC))throw new Error(`'radius' and 'arc' are not allowed for straight definitions at line ${t.line}`)}return{type:"define",name:e,direction:n,radius:s,arc:r,length:a,line:t.line}}parseSpliceStatement(){const t=this.advance();this.check(Q.USING)&&this.advance();const e=this.parseConnectionPointRef();return{type:"splice",label:e==null?void 0:e.label,point:e==null?void 0:e.point,line:t.line}}parseLabeledPiece(){const t=this.advance(),e=t.value,n=this.parsePieceOrExplicitConnection();if(n.type!=="piece")throw new Error(`Expected piece after label '${e}:' at line ${t.line}`);return n.label=e,n}parseReference(){const t=this.advance(),e=t.value;let n;return this.check(Q.DOT)&&(this.advance(),this.check(Q.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{type:"reference",label:e,point:n,line:t.line}}parsePointLabelReference(){const t=this.advance(),e=t.value.toLowerCase();if(this.advance(),!this.check(Q.LABEL_REF))throw new Error(`Expected $label after '${e}.' at line ${t.line}`);return{type:"reference",label:this.advance().value,point:e,line:t.line}}parseLoopClose(){const t=this.advance();let e,n;if(this.check(Q.IDENTIFIER)){if(e=this.advance().value.toLowerCase(),!this.check(Q.DOT))throw new Error(`Expected "." after connection point in loop close at line ${t.line}`);if(this.advance(),!this.check(Q.LABEL_REF))throw new Error(`Expected $label after "." in loop close at line ${t.line}`);n=this.advance().value}else if(this.check(Q.LABEL_REF)){if(n=this.advance().value,!this.check(Q.DOT))throw new Error(`Expected "." after $${n} in loop close at line ${t.line}`);if(this.advance(),!this.check(Q.IDENTIFIER))throw new Error(`Expected connection point after "$${n}." in loop close at line ${t.line}`);e=this.advance().value.toLowerCase()}else throw new Error(`Expected connection point reference after ">" at line ${t.line}`);return{type:"loopClose",point:e,label:n,line:t.line}}parsePieceOrExplicitConnection(){let t,e;const n=this.advance();if(this.check(Q.DOT)){if(t=n.value.toLowerCase(),this.advance(),!this.check(Q.IDENTIFIER))throw new Error(`Expected piece code after '${t}.' at line ${n.line}`);e=this.advance().value.toLowerCase()}else e=n.value.toLowerCase();let s,r,a,o,c;if(e==="gen"||e==="generator")for(;this.isGenModifier();)if(this.check(Q.CABS))this.advance(),s=this.parseNumberOrRange(!0);else if(this.check(Q.CARS))this.advance(),r=this.parseNumberOrRange(!0);else if(this.check(Q.SPEED))this.advance(),a=this.parseNumberOrRange(!1);else if(this.check(Q.EVERY))this.advance(),o=this.parseNumberOrRange(!0);else if(this.check(Q.COLORFUL))this.advance(),c="colorful";else if(this.check(Q.GRAY))this.advance(),c="gray";else if(this.check(Q.BLACK))this.advance(),c="black";else break;let l=1;return this.check(Q.REPETITION)&&(this.advance(),this.check(Q.NUMBER)&&(l=parseInt(this.advance().value,10))),{type:"piece",attachPoint:t,archetypeCode:e,count:l,line:n.line,genCabs:s,genCars:r,genSpeed:a,genEvery:o,genColorMode:c}}isGenModifier(){const t=this.peek().type;return t===Q.CABS||t===Q.CARS||t===Q.SPEED||t===Q.EVERY||t===Q.COLORFUL||t===Q.GRAY||t===Q.BLACK}parseNumberOrRange(t){if(this.check(Q.NUMBER)){const e=this.advance().value;return t?parseInt(e,10):parseFloat(e)}else if(this.check(Q.RANGE)){const n=this.advance().value.split("-");if(n.length===2){const s=t?parseInt(n[0],10):parseFloat(n[0]),r=t?parseInt(n[1],10):parseFloat(n[1]);return{min:s,max:r}}}}peek(){return this.tokens[this.pos]||{type:Q.EOF,value:"",line:0,column:0}}peekNext(){return this.tokens[this.pos+1]}advance(){return this.isAtEnd()||this.pos++,this.tokens[this.pos-1]}check(t){return this.peek().type===t}isAtEnd(){return this.peek().type===Q.EOF}}function Go(i){const t=Nv(i);return new Ov().build(t)}class Ov{constructor(){bt(this,"state");this.state=this.createInitialState()}createInitialState(){const t={pieces:[],startPosition:$(0,0),startRotation:0};return{pieces:[],labeledPieces:new Map,segments:[],currentSegment:t,currentPosition:$(0,0),currentRotation:0,currentPiece:null,currentPointName:"out",nextPieceId:1,title:void 0,descriptions:[],pendingSplices:[],pendingFlexConnects:[],pendingCrossConnects:[]}}build(t){for(const e of t)this.processStatement(e);return this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment),this.processPendingSplices(),this.processPendingCrossConnects(),this.processPendingFlexConnects(),this.detectAutoConnections(),this.markTunnelSections(),{title:this.state.title||"Simulador de Tren",description:this.state.descriptions.length>0?this.state.descriptions.join(" "):void 0,lockAheadDistance:this.state.lockAheadDistance,lockAheadCount:this.state.lockAheadCount,randomSwitches:this.state.randomSwitches,maxTrains:this.state.maxTrains,logLevel:this.state.logLevel,pieces:this.state.pieces}}processStatement(t){switch(t.type){case"new":this.processNew(t);break;case"piece":this.processPiece(t);break;case"reference":this.processReference(t);break;case"loopClose":this.processLoopClose(t);break;case"title":this.processTitle(t);break;case"description":this.processDescription(t);break;case"lockAhead":this.processLockAhead(t);break;case"random":this.processRandom(t);break;case"maxTrains":this.processMaxTrains(t);break;case"splice":this.processSplice(t);break;case"flexConnect":this.processFlexConnect(t);break;case"crossConnect":this.processCrossConnect(t);break;case"define":this.processDefine(t);break;case"log":this.processLog(t);break}}processLog(t){this.state.logLevel=t.level;const e={debug:Qe.DEBUG,info:Qe.INFO,warn:Qe.WARNING,error:Qe.ERROR};$l(e[t.level])}processTitle(t){if(this.state.title!==void 0)throw new Error(`Duplicate title statement at line ${t.line}. Only one title allowed.`);this.state.title=t.text}processDescription(t){this.state.descriptions.push(t.text)}processLockAhead(t){t.distance!==void 0&&(this.state.lockAheadDistance=t.distance),t.count!==void 0&&(this.state.lockAheadCount=t.count)}processRandom(t){this.state.randomSwitches=!0}processMaxTrains(t){this.state.maxTrains=t.value}processDefine(t){let e;if(t.direction==="straight"){const n=t.length;e={code:t.name,aliases:[],sections:[{splinePoints:[$(0,0),$(n,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(n,0),direction:$(1,0),sectionIndices:[0]}]}}else{const n=t.radius,s=t.arc,r=s*Math.PI/180,a=Math.max(3,Math.ceil(s/15)+1),o=[];for(let h=0;h<a;h++){const d=h/(a-1)*r;t.direction==="left"?o.push($(n*Math.sin(d),n*(1-Math.cos(d)))):o.push($(n*Math.sin(d),-n*(1-Math.cos(d))))}const c=o[o.length-1];let l;t.direction==="left"?l=$(Math.cos(r),Math.sin(r)):l=$(Math.cos(r),-Math.sin(r)),e={code:t.name,aliases:[],sections:[{splinePoints:o}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:c,direction:l,sectionIndices:[0]}]}}hn(e),K.debug(`Defined custom archetype '${t.name}': ${t.direction}, `+(t.direction==="straight"?`length=${t.length}`:`radius=${t.radius}, arc=${t.arc}°`))}processSplice(t){var e;this.state.pendingSplices.push({label:t.label,point:t.point,currentPieceId:(e=this.state.currentPiece)==null?void 0:e.id,currentPointName:this.state.currentPointName,line:t.line})}processFlexConnect(t){this.state.pendingFlexConnects.push({point1Label:t.point1Label,point1Name:t.point1Name||"out",point2Label:t.point2Label,point2Name:t.point2Name||"in",line:t.line})}processCrossConnect(t){this.state.pendingCrossConnects.push({label1:t.label1,label2:t.label2,line:t.line})}processNew(t){this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment);const e=t.degrees*Math.PI/180;if(t.baseLabel){const n=this.state.labeledPieces.get(t.baseLabel);if(!n)throw new Error(`Unknown label '${t.baseLabel}' in 'new' at line ${t.line}`);const s=re(n.archetypeCode),r=t.basePoint||"out",a=this.getConnectionPoint(s,r);if(!a)throw new Error(`Connection point '${r}' not found on '${t.baseLabel}' at line ${t.line}`);const o=this.rotatePoint(a.position,n.rotation),c={x:n.position.x+o.x,z:n.position.z+o.z},l=this.rotatePoint(a.direction,n.rotation),h=Math.atan2(l.z,l.x),u=h+e,d={x:c.x+Math.cos(u)*t.offset,y:0,z:c.z+Math.sin(u)*t.offset};this.state.currentSegment={pieces:[],startPosition:d,startRotation:u},this.state.currentPosition=d,this.state.currentRotation=u,this.state.currentPiece=n,this.state.currentPointName=r,K.debug(`Line ${t.line}: New segment from $${t.baseLabel}.${r}:`),K.debug(`Line ${t.line}:   baseAngle: ${(h*180/Math.PI).toFixed(1)}°`),K.debug(`Line ${t.line}:   degrees offset: ${t.degrees}°`),K.debug(`Line ${t.line}:   currentRotation: ${(u*180/Math.PI).toFixed(1)}°`),K.debug(`Line ${t.line}:   position: (${d.x.toFixed(2)}, ${d.z.toFixed(2)})`)}else{const n=e,s={x:Math.cos(n)*t.offset,y:0,z:Math.sin(n)*t.offset};this.state.currentSegment={pieces:[],startPosition:s,startRotation:n},this.state.currentPosition=s,this.state.currentRotation=n,this.state.currentPiece=null,this.state.currentPointName="out",K.debug(`Line ${t.line}: New segment at origin:`),K.debug(`Line ${t.line}:   degrees: ${t.degrees}°`),K.debug(`Line ${t.line}:   currentRotation: ${(n*180/Math.PI).toFixed(1)}°`),K.debug(`Line ${t.line}:   position: (${s.x.toFixed(2)}, ${s.z.toFixed(2)})`)}}processPiece(t){var n,s,r;const e=re(t.archetypeCode);for(let a=0;a<t.count;a++){const o=this.placePiece(e,t.attachPoint,t.line,t.label);a===0&&t.label&&(o.label=t.label,this.state.labeledPieces.set(t.label,o)),e.code==="gen"&&a===0&&(o.genConfig={cabCount:(n=t.genCabs)!=null?n:1,carCount:(s=t.genCars)!=null?s:5,speed:t.genSpeed,frequency:t.genEvery,colorMode:(r=t.genColorMode)!=null?r:"gray",lastSpawnTime:-1/0,enabled:!0}),e.code==="sem"&&a===0&&(o.semaphoreConfig={locked:!1}),e.code==="dec"&&a===0&&(o.decouplerConfig={activated:!1}),this.state.pieces.push(o),this.state.currentSegment.pieces.push(o),this.state.currentPiece=o}}placePiece(t,e,n,s){let r=e||"in",a=this.getConnectionPoint(t,r);if(!a)if(t.connectionPoints.length>0)a=t.connectionPoints[0],r=a.name;else throw new Error(`No connection points found on archetype '${t.code}'`);const o=this.getOppositePoint(t,r),c=o?this.getConnectionPoint(t,o):null,l=a.direction,h=Math.atan2(l.z,l.x),d=this.state.currentRotation+Math.PI-h,f=this.rotatePoint(a.position,d),g={x:this.state.currentPosition.x-f.x,y:0,z:this.state.currentPosition.z-f.z},_={id:`piece_${this.state.nextPieceId++}`,archetypeCode:t.code,position:g,rotation:d,connections:new Map};{const p=s?` "${s}"`:"",m=n!==void 0?`Line ${n}`:"Line ?";K.debug(`${m}: Placed ${t.code}${p} (${_.id}):`),K.debug(`${m}:   incomingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`),K.debug(`${m}:   pieceRotation: ${(d*180/Math.PI).toFixed(1)}°`),K.debug(`${m}:   position: (${g.x.toFixed(2)}, ${g.z.toFixed(2)})`)}if(c){const p=this.rotatePoint(c.position,d);this.state.currentPosition={x:g.x+p.x,y:0,z:g.z+p.z};const m=this.rotatePoint(c.direction,d);this.state.currentRotation=Math.atan2(m.z,m.x),this.state.currentPointName=o;{const x=n!==void 0?`Line ${n}`:"Line ?";K.debug(`${x}:   outgoingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}}return _}processReference(t){const e=this.state.labeledPieces.get(t.label);if(!e)throw new Error(`Unknown label reference: $${t.label} at line ${t.line}`);const n=re(e.archetypeCode),s=t.point||"out",r=this.getConnectionPoint(n,s);if(!r)throw new Error(`Connection point '${s}' not found on labeled piece '${t.label}' at line ${t.line}`);const a=this.rotatePoint(r.position,e.rotation);this.state.currentPosition={x:e.position.x+a.x,y:0,z:e.position.z+a.z};const o=this.rotatePoint(r.direction,e.rotation);this.state.currentRotation=Math.atan2(o.z,o.x),this.state.currentPiece=e,this.state.currentPointName=s,K.debug(`Line ${t.line}: Reference $${t.label}.${s}:`),K.debug(`Line ${t.line}:   labeledPiece (${e.archetypeCode}) rotation: ${(e.rotation*180/Math.PI).toFixed(1)}°`),K.debug(`Line ${t.line}:   point.direction (local): (${r.direction.x.toFixed(3)}, ${r.direction.z.toFixed(3)})`),K.debug(`Line ${t.line}:   rotatedDir (world): (${o.x.toFixed(3)}, ${o.z.toFixed(3)})`),K.debug(`Line ${t.line}:   new currentRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}processLoopClose(t){const e=this.state.labeledPieces.get(t.label);if(!e)throw new Error(`Unknown label reference in loop close: $${t.label} at line ${t.line}`);const n=re(e.archetypeCode),s=this.getConnectionPoint(n,t.point);if(!s)throw new Error(`Connection point '${t.point}' not found on '${t.label}' at line ${t.line}`);const r=this.rotatePoint(s.position,e.rotation),a={x:e.position.x+r.x,z:e.position.z+r.z},o=this.rotatePoint(s.direction,e.rotation),c=Math.atan2(o.z,o.x),l=this.state.currentPosition,h=this.state.currentRotation,u=c+Math.PI,d=u-h,f=this.state.currentSegment.startPosition;for(const M of this.state.currentSegment.pieces){const R=M.position.x-f.x,A=M.position.z-f.z,w=this.rotatePoint({x:R,y:0,z:A},d);M.position.x=f.x+w.x,M.position.z=f.z+w.z,M.rotation+=d}const g=l.x-f.x,_=l.z-f.z,p=this.rotatePoint({x:g,y:0,z:_},d),m={x:f.x+p.x,z:f.z+p.z},x=a.x-m.x,v=a.z-m.z;for(const M of this.state.currentSegment.pieces)M.position.x+=x,M.position.z+=v;if(this.state.currentSegment.startPosition.x+=x,this.state.currentSegment.startPosition.z+=v,this.state.currentPosition={x:a.x,y:0,z:a.z},this.state.currentRotation=u,K.debug(`Line ${t.line}: Loop close to $${t.label}.${t.point}:`),K.debug(`Line ${t.line}:   rotationDelta: ${(d*180/Math.PI).toFixed(1)}°`),K.debug(`Line ${t.line}:   new currentPosition: (${a.x.toFixed(2)}, ${a.z.toFixed(2)})`),K.debug(`Line ${t.line}:   new currentRotation: ${(u*180/Math.PI).toFixed(1)}°`),this.state.currentPiece){const M=this.state.currentPiece.connections.get(this.state.currentPointName)||[];M.push({pieceId:e.id,pointName:t.point}),this.state.currentPiece.connections.set(this.state.currentPointName,M);const R=e.connections.get(t.point)||[];R.push({pieceId:this.state.currentPiece.id,pointName:this.state.currentPointName}),e.connections.set(t.point,R)}}getConnectionPoint(t,e){return t.connectionPoints.find(n=>n.name===e)}getOppositePoint(t,e){if(e==="in")return t.connectionPoints.find(n=>n.name==="out")?"out":void 0;if(e==="out")return t.connectionPoints.find(n=>n.name==="in")?"in":void 0;if(e==="in1")return"out1";if(e==="out1")return"in1";if(e==="in2")return"out2";if(e==="out2")return"in2"}rotatePoint(t,e){const n=Math.cos(e),s=Math.sin(e);return{x:t.x*n-t.z*s,y:t.y,z:t.x*s+t.z*n}}processPendingSplices(){for(const t of this.state.pendingSplices)this.performSplice(t)}processPendingFlexConnects(){K.debug(`Processing ${this.state.pendingFlexConnects.length} flex connects`);for(const t of this.state.pendingFlexConnects)this.performFlexConnect(t)}processPendingCrossConnects(){this.state.pendingCrossConnects.length>0&&K.debug(`Processing ${this.state.pendingCrossConnects.length} cross connects`);for(const t of this.state.pendingCrossConnects)this.performCrossConnect(t)}performCrossConnect(t){if(t.label1===t.label2)throw new Error(`Cross connect requires two different tracks at line ${t.line}`);const e=this.state.labeledPieces.get(t.label1),n=this.state.labeledPieces.get(t.label2);if(!e)throw new Error(`Unknown label '${t.label1}' in cross connect at line ${t.line}`);if(!n)throw new Error(`Unknown label '${t.label2}' in cross connect at line ${t.line}`);const s=this.findSplineIntersection(e,n);if(!s){K.warn(`No intersection found between $${t.label1} and $${t.label2} at line ${t.line}`);return}const r=this.calculateSectionLength(e),a=this.calculateSectionLength(n),o=s.t1*r,c=s.t2*a;K.debug(`Cross connect at line ${t.line}:`),K.debug(`  Intersection at (${s.worldPos.x.toFixed(2)}, ${s.worldPos.z.toFixed(2)})`),K.debug(`  piece1: t=${s.t1.toFixed(3)}, length=${r.toFixed(1)}, distance=${o.toFixed(1)}`),K.debug(`  piece2: t=${s.t2.toFixed(3)}, length=${a.toFixed(1)}, distance=${c.toFixed(1)}`);const l=`cross_${e.id}_${n.id}`;e.internalConnectionPoints||(e.internalConnectionPoints=[]),e.internalConnectionPoints.push({id:l,t:s.t1,distance:o,worldPosition:{...s.worldPos}}),n.internalConnectionPoints||(n.internalConnectionPoints=[]),n.internalConnectionPoints.push({id:l,t:s.t2,distance:c,worldPosition:{...s.worldPos}}),K.debug(`  Created shared internal connection point: ${l}`)}calculateSectionLength(t){const e=re(t.archetypeCode);if(!e||e.sections.length===0)return 0;const n=e.sections[0];if(n.splinePoints.length<2)return 0;let s=0,r=null;for(const a of n.splinePoints){const o=this.rotatePoint(a,t.rotation),c={x:t.position.x+o.x,y:0,z:t.position.z+o.z};if(r){const l=c.x-r.x,h=c.z-r.z;s+=Math.sqrt(l*l+h*h)}r=c}return s}findSplineIntersection(t,e){const n=re(t.archetypeCode),s=re(e.archetypeCode),r=n.sections.length>0&&n.sections[0].splinePoints.length>=2,a=s.sections.length>0&&s.sections[0].splinePoints.length>=2;if(r&&a)return this.findSplineSplineIntersection(t,e,n,s);if(!r&&a){const c={x:t.position.x,y:0,z:t.position.z},l=this.findPointOnSpline(c,e,s);return l?{t1:.5,t2:l.t,worldPos:c}:null}if(r&&!a){const c={x:e.position.x,y:0,z:e.position.z},l=this.findPointOnSpline(c,t,n);return l?{t1:l.t,t2:.5,worldPos:c}:null}return Math.sqrt(Math.pow(t.position.x-e.position.x,2)+Math.pow(t.position.z-e.position.z,2))<.5?{t1:.5,t2:.5,worldPos:{x:t.position.x,y:0,z:t.position.z}}:null}findSplineSplineIntersection(t,e,n,s){const r=n.sections[0],a=s.sections[0],o=r.splinePoints.map(u=>{const d=this.rotatePoint(u,t.rotation);return{x:t.position.x+d.x,y:0,z:t.position.z+d.z}}),c=a.splinePoints.map(u=>{const d=this.rotatePoint(u,e.rotation);return{x:e.position.x+d.x,y:0,z:e.position.z+d.z}}),l=o.length-1,h=c.length-1;for(let u=0;u<l;u++){const d=o[u],f=o[u+1];for(let g=0;g<h;g++){const _=c[g],p=c[g+1],m=this.lineSegmentIntersection(d,f,_,p);if(m){const x=(u+m.s)/l,v=(g+m.t)/h;return{t1:x,t2:v,worldPos:m.point}}}}return null}findPointOnSpline(t,e,n){const a=n.sections[0].splinePoints.map(h=>{const u=this.rotatePoint(h,e.rotation);return{x:e.position.x+u.x,y:0,z:e.position.z+u.z}}),o=a.length-1;let c=-1,l=1/0;for(let h=0;h<o;h++){const u=a[h],d=a[h+1],f=d.x-u.x,g=d.z-u.z,_=f*f+g*g;let p=0;_>1e-4&&(p=Math.max(0,Math.min(1,((t.x-u.x)*f+(t.z-u.z)*g)/_)));const m=u.x+p*f,x=u.z+p*g,v=Math.sqrt(Math.pow(t.x-m,2)+Math.pow(t.z-x,2));v<l&&(l=v,c=(h+p)/o)}return l<=.5?{t:c,distance:l}:null}lineSegmentIntersection(t,e,n,s){const r=e.x-t.x,a=e.z-t.z,o=s.x-n.x,c=s.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=n.x-t.x,u=n.z-t.z,d=(h*c-u*o)/l,f=(h*a-u*r)/l;return d<0||d>1||f<0||f>1?null:{s:d,t:f,point:{x:t.x+d*r,y:0,z:t.z+d*a}}}performFlexConnect(t){const e=this.state.labeledPieces.get(t.point1Label),n=this.state.labeledPieces.get(t.point2Label);if(!e)throw new Error(`Unknown label '${t.point1Label}' in flex connect at line ${t.line}`);if(!n)throw new Error(`Unknown label '${t.point2Label}' in flex connect at line ${t.line}`);const s=re(e.archetypeCode),r=re(n.archetypeCode),a=this.getConnectionPoint(s,t.point1Name),o=this.getConnectionPoint(r,t.point2Name);if(!a)throw new Error(`Connection point '${t.point1Name}' not found on '${t.point1Label}' at line ${t.line}`);if(!o)throw new Error(`Connection point '${t.point2Name}' not found on '${t.point2Label}' at line ${t.line}`);const c=this.rotatePoint(a.position,e.rotation),l={x:e.position.x+c.x,y:0,z:e.position.z+c.z},h=this.rotatePoint(a.direction,e.rotation),u={x:h.x,y:0,z:h.z},d=this.rotatePoint(o.position,n.rotation),f={x:n.position.x+d.x,y:0,z:n.position.z+d.z},g=this.rotatePoint(o.direction,n.rotation),_={x:-g.x,y:0,z:-g.z};K.debug(`Flex connect at line ${t.line}:`),K.debug(`  P1: (${l.x.toFixed(2)}, ${l.z.toFixed(2)}), D1: (${u.x.toFixed(3)}, ${u.z.toFixed(3)}) angle=${(Math.atan2(u.z,u.x)*180/Math.PI).toFixed(1)}°`),K.debug(`  P2: (${f.x.toFixed(2)}, ${f.z.toFixed(2)}), D2: (${_.x.toFixed(3)}, ${_.z.toFixed(3)}) angle=${(Math.atan2(_.z,_.x)*180/Math.PI).toFixed(1)}°`),K.debug(`  Distance: ${Math.sqrt((f.x-l.x)**2+(f.z-l.z)**2).toFixed(2)}`);const p=this.solveFlexConnect(l,u,f,_,t.line);if(!p){K.warn(`Could not find flex connect solution at line ${t.line}`);return}K.debug(`  Solution: ${p.type}, straight=${p.straightLength.toFixed(2)}", radius=${p.radius.toFixed(2)}", direction=${p.curveDirection}`),this.createFlexPieces(p,e,t.point1Name,n,t.point2Name,t.point1Label,t.point2Label,t.line)}perpRight(t){return{x:t.z,y:0,z:-t.x}}solveFlexConnect(t,e,n,s,r){const a={x:n.x-t.x,y:0,z:n.z-t.z},o=Math.sqrt(a.x*a.x+a.z*a.z),c=5,l=.5,h=.02,u=.02;K.debug(`  Solving with delta=(${a.x.toFixed(2)}, ${a.z.toFixed(2)}), length=${o.toFixed(2)}`);const d=e.x*s.x+e.z*s.z,f=Math.abs(d-1)<h;let g=!1,_=!1;if(o>.1){const A=Math.abs(a.x*e.z-a.z*e.x)/o,w=(a.x*e.x+a.z*e.z)/o;g=A<u,_=w>.98}if(K.debug(`  Direction dot=${d.toFixed(4)}, aligned=${f}, collinear=${g}, deltaAlongD1=${_}`),f&&g&&_&&o>.1)return K.debug(`  [straight-only] length=${o.toFixed(2)}"`),{type:"straight-only",straightLength:o,radius:1/0,curveDirection:"none",P1:t,D1:e,P2:n,D2:s};const p=Math.atan2(e.z,e.x);let x=Math.atan2(s.z,s.x)-p;for(;x>Math.PI;)x-=2*Math.PI;for(;x<-Math.PI;)x+=2*Math.PI;const v=270,M=v*Math.PI/180;K.debug(`  Arc angle between D1 and D2: ${(x*180/Math.PI).toFixed(1)}°`);const R=[];{const A=this.perpRight(e),w=this.perpRight(s),O=this.solveStraightCurve(e,A,w,a);O&&O.L>=0&&Math.abs(O.R)>=c&&(Math.abs(x)<=M?(K.debug(`  [str+curve] L=${O.L.toFixed(2)}, R=${O.R.toFixed(2)}`),O.L<l?R.push({type:"curve-only",straightLength:0,radius:Math.abs(O.R),curveDirection:O.R>0?"right":"left",P1:t,D1:e,P2:n,D2:s}):R.push({type:"straight-curve",straightLength:O.L,radius:Math.abs(O.R),curveDirection:O.R>0?"right":"left",P1:t,D1:e,P2:n,D2:s})):K.debug(`  [str+curve] rejected: arc angle ${(x*180/Math.PI).toFixed(1)}° exceeds ${v}°`))}{const A=this.perpRight(e),w=this.perpRight(s),O=this.solveCurveStraight(s,A,w,a);O&&O.L>=0&&Math.abs(O.R)>=c&&(Math.abs(x)<=M?(K.debug(`  [curve+str] L=${O.L.toFixed(2)}, R=${O.R.toFixed(2)}`),O.L<l?R.some(T=>T.type==="curve-only")||R.push({type:"curve-only",straightLength:0,radius:Math.abs(O.R),curveDirection:O.R>0?"right":"left",P1:t,D1:e,P2:n,D2:s}):R.push({type:"curve-straight",straightLength:O.L,radius:Math.abs(O.R),curveDirection:O.R>0?"right":"left",P1:t,D1:e,P2:n,D2:s})):K.debug(`  [curve+str] rejected: arc angle ${(x*180/Math.PI).toFixed(1)}° exceeds ${v}°`))}return R.length===0?(K.debug(`No valid flex connect solution found at line ${r}`),K.debug(`  P1: (${t.x.toFixed(2)}, ${t.z.toFixed(2)}), D1: (${e.x.toFixed(3)}, ${e.z.toFixed(3)})`),K.debug(`  P2: (${n.x.toFixed(2)}, ${n.z.toFixed(2)}), D2: (${s.x.toFixed(3)}, ${s.z.toFixed(3)})`),null):(R.sort((A,w)=>A.type==="straight-only"?-1:w.type==="straight-only"?1:A.type==="curve-only"&&w.type!=="curve-only"?-1:w.type==="curve-only"&&A.type!=="curve-only"?1:w.radius-A.radius),R[0])}solveStraightCurve(t,e,n,s){const r=e.x-n.x,a=e.z-n.z,o=t.x*a-t.z*r;if(Math.abs(o)<1e-4)return null;const c=(s.x*a-s.z*r)/o,l=(t.x*s.z-t.z*s.x)/o;return{L:c,R:l}}solveCurveStraight(t,e,n,s){const r=t.x,a=t.z,o=e.x-n.x,c=e.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=(s.x*c-s.z*o)/l,u=(r*s.z-a*s.x)/l;return{L:h,R:u}}createFlexPieces(t,e,n,s,r,a,o,c){const l=`flex_${this.state.nextPieceId}`,h=`${a}_${o}_str`,u=`${a}_${o}_crv`;if(t.type==="straight-only"){const d=this.createFlexStraightArchetype(l+"_str",t.straightLength);hn(d);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...t.P1},rotation:Math.atan2(t.D1.z,t.D1.x),connections:new Map,label:h};this.state.labeledPieces.set(h,f),this.addConnection(e,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),K.debug(`Flex connect at line ${c}: straight-only(${t.straightLength.toFixed(2)}") labeled "${h}"`)}else if(t.type==="curve-only"){const d=this.createFlexCurveArchetype(l+"_crv",t.radius,t.curveDirection,t.D1,t.D2);hn(d);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...t.P1},rotation:Math.atan2(t.D1.z,t.D1.x),connections:new Map,label:u};this.state.labeledPieces.set(u,f),this.addConnection(e,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),K.debug(`Flex connect at line ${c}: curve-only(R=${t.radius.toFixed(2)}", ${t.curveDirection}) labeled "${u}"`)}else if(t.type==="straight-curve"){const d=this.createFlexStraightArchetype(l+"_str",t.straightLength),f=this.createFlexCurveArchetype(l+"_crv",t.radius,t.curveDirection,t.D1,t.D2);hn(d),hn(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...t.P1},rotation:Math.atan2(t.D1.z,t.D1.x),connections:new Map,label:h},_={x:t.P1.x+t.D1.x*t.straightLength,y:0,z:t.P1.z+t.D1.z*t.straightLength},p={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(t.D1.z,t.D1.x),connections:new Map,label:u};this.state.labeledPieces.set(h,g),this.state.labeledPieces.set(u,p),this.addConnection(e,n,g,"in"),this.addConnection(g,"out",p,"in"),this.addConnection(p,"out",s,r),this.state.pieces.push(g,p),K.debug(`Flex connect at line ${c}: straight(${t.straightLength.toFixed(2)}") labeled "${h}" + ${t.curveDirection} curve(R=${t.radius.toFixed(2)}") labeled "${u}"`)}else{const d=this.createFlexCurveArchetype(l+"_crv",t.radius,t.curveDirection,t.D1,t.D2),f=this.createFlexStraightArchetype(l+"_str",t.straightLength);hn(d),hn(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:d.code,position:{...t.P1},rotation:Math.atan2(t.D1.z,t.D1.x),connections:new Map,label:u},_={x:t.P2.x-t.D2.x*t.straightLength,y:0,z:t.P2.z-t.D2.z*t.straightLength},p={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(t.D2.z,t.D2.x),connections:new Map,label:h};this.state.labeledPieces.set(u,g),this.state.labeledPieces.set(h,p),this.addConnection(e,n,g,"in"),this.addConnection(g,"out",p,"in"),this.addConnection(p,"out",s,r),this.state.pieces.push(g,p),K.debug(`Flex connect at line ${c}: ${t.curveDirection} curve(R=${t.radius.toFixed(2)}") labeled "${u}" + straight(${t.straightLength.toFixed(2)}") labeled "${h}"`)}}createFlexStraightArchetype(t,e){return{code:t,aliases:[],sections:[{splinePoints:[$(0,0),$(e,0)]}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:$(e,0),direction:$(1,0),sectionIndices:[0]}]}}createFlexCurveArchetype(t,e,n,s,r){const a=Math.atan2(s.z,s.x);let c=Math.atan2(r.z,r.x)-a;for(;c>Math.PI;)c-=2*Math.PI;for(;c<-Math.PI;)c+=2*Math.PI;const l=c>=0?"left":"right";n!==l&&Math.abs(c)<Math.PI/2||n!==l&&(n==="left"?c+=2*Math.PI:c-=2*Math.PI);const h=Math.abs(c*180/Math.PI),u=Math.max(3,Math.ceil(h/5)+1),d=[],f=Math.abs(c);for(let p=0;p<u;p++){const x=p/(u-1)*f;n==="left"?d.push($(e*Math.sin(x),e*(1-Math.cos(x)))):d.push($(e*Math.sin(x),-e*(1-Math.cos(x))))}const g=d[d.length-1];let _;return n==="left"?_=$(Math.cos(f),Math.sin(f)):_=$(Math.cos(f),-Math.sin(f)),{code:t,aliases:[],sections:[{splinePoints:d}],connectionPoints:[{name:"in",position:$(0,0),direction:$(-1,0),sectionIndices:[0]},{name:"out",position:g,direction:_,sectionIndices:[0]}]}}addConnection(t,e,n,s){const r=t.connections.get(e)||[];r.push({pieceId:n.id,pointName:s}),t.connections.set(e,r);const a=n.connections.get(s)||[];a.push({pieceId:t.id,pointName:e}),n.connections.set(s,a)}performSplice(t){let e,n;if(t.label){if(e=this.state.labeledPieces.get(t.label),!e)throw new Error(`Unknown label '${t.label}' in splice at line ${t.line}`);n=t.point||"out"}else{if(!t.currentPieceId)throw new Error(`No current piece for splice at line ${t.line}`);if(e=this.state.pieces.find(f=>f.id===t.currentPieceId),!e)throw new Error(`Current piece not found for splice at line ${t.line}`);n=t.currentPointName||"out"}const s=re(e.archetypeCode),r=this.getConnectionPoint(s,n);if(!r)throw new Error(`Connection point '${n}' not found on piece at line ${t.line}`);const a=this.rotatePoint(r.position,e.rotation),o={x:e.position.x+a.x,y:0,z:e.position.z+a.z},c=this.rotatePoint(r.direction,e.rotation),l=2;let h=null,u=0,d=.5;for(const f of this.state.pieces){if(f.id===e.id)continue;const g=re(f.archetypeCode);for(let _=0;_<g.sections.length;_++){const p=g.sections[_];if(p.splinePoints.length<2)continue;const m=p.splinePoints.map(v=>{const M=this.rotatePoint(v,f.rotation);return{x:f.position.x+M.x,y:0,z:f.position.z+M.z}}),x=this.findClosestPointOnSpline(m,o);if(x.distance<=l){h=f,u=_,d=x.t;break}}if(h)break}if(!h){const f=t.label?`$${t.label}.${n}`:`current piece .${n}`;K.warn(`No track found at splice point ${f} (world pos: ${o.x.toFixed(2)}, ${o.z.toFixed(2)}) at line ${t.line}`),e.label=(e.label?e.label+" ":"")+"can't splice";return}this.splitPieceAt(h,u,d,o,c,t.line)}findClosestPointOnSpline(t,e){let n=0,s=1/0;const r=t.length-1;for(let a=0;a<r;a++){const o=t[a],c=t[a+1],l=c.x-o.x,h=c.z-o.z,u=l*l+h*h;if(u===0)continue;let d=((e.x-o.x)*l+(e.z-o.z)*h)/u;d=Math.max(0,Math.min(1,d));const f=o.x+d*l,g=o.z+d*h,_=Math.sqrt((e.x-f)**2+(e.z-g)**2);_<s&&(s=_,n=(a+d)/r)}return{t:n,distance:s}}splitPieceAt(t,e,n,s,r,a){const o=re(t.archetypeCode),l=o.sections[e].splinePoints,h=l.length-1,u=Math.floor(n*h),d=n*h-u,f=l[Math.min(u,l.length-1)],g=l[Math.min(u+1,l.length-1)],_={x:f.x+d*(g.x-f.x),y:0,z:f.z+d*(g.z-f.z)},p={x:g.x-f.x,y:0,z:g.z-f.z},m=Math.sqrt(p.x**2+p.z**2);m>0&&(p.x/=m,p.z/=m);const x=[];for(let L=0;L<=u;L++)x.push({...l[L]});x.push(_);const v=[_];for(let L=u+1;L<l.length;L++)v.push({...l[L]});const M=o.connectionPoints.find(L=>L.name==="in"),R=o.connectionPoints.find(L=>L.name==="out");if(!M||!R)throw new Error(`Cannot splice piece without 'in' and 'out' connection points at line ${a}`);const A=`splice_${this.state.nextPieceId}`,w={code:`${A}_a`,aliases:[],sections:[{splinePoints:x}],connectionPoints:[{...M,sectionIndices:[0]},{name:"out",position:_,direction:p,sectionIndices:[0]}]},O={code:`${A}_b`,aliases:[],sections:[{splinePoints:v}],connectionPoints:[{name:"in",position:_,direction:{x:-p.x,y:0,z:-p.z},sectionIndices:[0]},{...R,sectionIndices:[0]}]};hn(w),hn(O);const E={id:`piece_${this.state.nextPieceId++}`,archetypeCode:w.code,position:{...t.position},rotation:t.rotation,connections:new Map},T={id:`piece_${this.state.nextPieceId++}`,archetypeCode:O.code,position:{...t.position},rotation:t.rotation,connections:new Map},z=t.connections.get("in");if(z){E.connections.set("in",[...z]);for(const L of z){const F=this.state.pieces.find(B=>B.id===L.pieceId);if(F){const B=F.connections.get(L.pointName);if(B)for(const Y of B)Y.pieceId===t.id&&(Y.pieceId=E.id)}}}const W=t.connections.get("out");if(W){T.connections.set("out",[...W]);for(const L of W){const F=this.state.pieces.find(B=>B.id===L.pieceId);if(F){const B=F.connections.get(L.pointName);if(B)for(const Y of B)Y.pieceId===t.id&&(Y.pieceId=T.id)}}}E.connections.set("out",[{pieceId:T.id,pointName:"in"}]),T.connections.set("in",[{pieceId:E.id,pointName:"out"}]),t.label&&(E.label=t.label,this.state.labeledPieces.set(t.label,E));const rt=this.state.pieces.indexOf(t);rt>=0&&this.state.pieces.splice(rt,1,E,T)}detectAutoConnections(){const n=[];for(const o of this.state.pieces){const c=re(o.archetypeCode);for(const l of c.connectionPoints){const h=this.rotatePoint(l.position,o.rotation),u=this.rotatePoint(l.direction,o.rotation);n.push({piece:o,pointName:l.name,worldPos:{x:o.position.x+h.x,y:0,z:o.position.z+h.z},worldDir:u})}}const s=[],r=new Map;for(const o of n){let c=null;for(const l of s){for(const h of l){const u=o.worldPos.x-h.worldPos.x,d=o.worldPos.z-h.worldPos.z;if(Math.sqrt(u*u+d*d)<=.5){c=l;break}}if(c)break}if(c)c.push(o),r.set(o,c);else{const l=[o];s.push(l),r.set(o,l)}}let a=!0;for(;a;){a=!1;for(let o=0;o<s.length&&!a;o++)for(let c=o+1;c<s.length&&!a;c++)t:for(const l of s[o])for(const h of s[c]){const u=l.worldPos.x-h.worldPos.x,d=l.worldPos.z-h.worldPos.z;if(Math.sqrt(u*u+d*d)<=.5){for(const g of s[c])s[o].push(g),r.set(g,s[o]);s.splice(c,1),a=!0;break t}}}for(const o of s)if(!(o.length<2))for(let c=0;c<o.length;c++)for(let l=c+1;l<o.length;l++){const h=o[c],u=o[l];if(h.piece.id===u.piece.id||(h.piece.connections.get(h.pointName)||[]).some(m=>m.pieceId===u.piece.id&&m.pointName===u.pointName)||h.worldDir.x*u.worldDir.x+h.worldDir.z*u.worldDir.z>-1+.1)continue;const _=h.piece.connections.get(h.pointName)||[];_.push({pieceId:u.piece.id,pointName:u.pointName,isAutoConnect:!0}),h.piece.connections.set(h.pointName,_);const p=u.piece.connections.get(u.pointName)||[];p.push({pieceId:h.piece.id,pointName:h.pointName,isAutoConnect:!0}),u.piece.connections.set(u.pointName,p)}}markTunnelSections(){const t=this.state.pieces.filter(n=>n.archetypeCode==="tun"||n.archetypeCode==="tunnel"),e=new Set;for(const n of t){if(e.has(n.id))continue;const s=[],r=this.findTunnelPath(n.id,"out",s,new Set);if(r&&r!==n.id){e.add(r);for(const a of s){const o=this.state.pieces.find(c=>c.id===a);o&&(o.inTunnel=!0)}}}}findTunnelPath(t,e,n,s){const r=this.state.pieces.find(o=>o.id===t);if(!r)return null;const a=r.connections.get(e);if(!a||a.length===0)return null;for(const o of a){const c=`${o.pieceId}.${o.pointName}`;if(s.has(c))continue;s.add(c);const l=this.state.pieces.find(d=>d.id===o.pieceId);if(!l)continue;if(l.archetypeCode==="tun"||l.archetypeCode==="tunnel")return l.id;n.push(o.pieceId);const h=o.pointName==="in"?"out":o.pointName==="out"?"in":o.pointName==="in1"?"out1":o.pointName==="out1"?"in1":o.pointName==="in2"?"out2":"in2",u=this.findTunnelPath(o.pieceId,h,n,s);if(u)return u;n.pop()}return null}}function $s(i){return i.travelDirection==="forward"?i.cars[0]:i.cars[i.cars.length-1]}function Fv(i){return i.travelDirection==="forward"?i.cars.length-1:0}function vi(i,t){return`${i}.${t}`}function Xc(i){const t=i.lastIndexOf(".");return{pieceId:i.substring(0,t),pointName:i.substring(t+1)}}class zv{constructor(t=10,e=2){bt(this,"locks",new Map);bt(this,"trainStates",new Map);bt(this,"minLockDistance");bt(this,"minLockCount");this.minLockDistance=t,this.minLockCount=e}getTrainState(t){let e=this.trainStates.get(t);return e||(e={heldLocks:new Set},this.trainStates.set(t,e)),e}isLocked(t){return this.locks.has(t)}isLockedByOther(t,e){const n=this.locks.get(t);return n!==void 0&&n.trainId!==e}isBlockedBySemaphore(t,e){var r;const n=Xc(t),s=e.pieces.find(a=>a.id===n.pieceId);return!!((r=s==null?void 0:s.semaphoreConfig)!=null&&r.locked)}getTrainLocks(t){return this.getTrainState(t).heldLocks}tryAcquireLocks(t,e,n,s){const r=[],a=this.getTrainState(t);for(const o of e){if(s&&this.isBlockedBySemaphore(o,s))return K.debug(`Train ${t} blocked at ${o} by locked semaphore`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:"semaphore"};const c=this.locks.get(o);if(c&&c.trainId!==t)return K.debug(`Train ${t} blocked at ${o} by ${c.trainId}`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:c.trainId};c||(this.locks.set(o,{trainId:t,acquiredAt:n}),a.heldLocks.add(o),r.push(o),K.debug(`Train ${t} acquired lock on ${o}`))}return{success:!0,acquired:r,requested:[]}}releaseLock(t,e){const n=this.locks.get(e);if(n&&n.trainId===t){this.locks.delete(e);const s=this.trainStates.get(t);return s&&s.heldLocks.delete(e),K.debug(`Train ${t} released lock on ${e}`),!0}return!1}releaseAllLocks(t){const e=this.trainStates.get(t);if(e){for(const n of e.heldLocks)this.locks.delete(n);e.heldLocks.clear(),K.debug(`Train ${t} released all locks`)}}acquireLeadingLocks(t,e,n,s){const r=$s(t),a=e.pieces.find(x=>x.id===r.currentPieceId);if(!a)return K.debug(`acquireLeadingLocks: No piece found for ${r.currentPieceId}`),{success:!1,acquired:[],requested:[]};const o=[];let c=0;const l=t.travelDirection;let h=r.currentPieceId,u=a,d=l==="forward"?"out":"in";const f=re(a.archetypeCode);f&&(f.code==="x90"||f.code==="x45")&&(r.entryPoint==="in1"||r.entryPoint==="out1"?d=l==="forward"?"out1":"in1":(r.entryPoint==="in2"||r.entryPoint==="out2")&&(d=l==="forward"?"out2":"in2"));const g=An(u,0);let _;if(l==="forward"?_=Math.max(0,g-r.distanceAlongSection):_=Math.max(0,r.distanceAlongSection),K.debug(`acquireLeadingLocks: train=${t.id}, leadCar on ${h}, entryPoint=${r.entryPoint}, travelDir=${l}, exitPoint=${d}, sectionLen=${g.toFixed(1)}, distAlong=${r.distanceAlongSection.toFixed(1)}, distOnCurrent=${_.toFixed(1)}`),u.internalConnectionPoints)for(const x of u.internalConnectionPoints)(l==="forward"?x.distance>r.distanceAlongSection:x.distance<r.distanceAlongSection)&&(o.push(x.id),K.debug(`  Adding internal point ${x.id} at distance ${x.distance.toFixed(1)}`));o.push(vi(h,d));let p=0;for(K.debug(`  Scan ahead: minDist=${this.minLockDistance}, minCount=${this.minLockCount}`);(c<this.minLockDistance||o.length<this.minLockCount)&&p<30;){p++,c+=_;const x=Ws(h,d,e,n,t.routesTaken,void 0,l);if(K.debug(`  Loop ${p}: from ${h}.${d}, nextSection=${x?`${x.pieceId}.${x.entryPoint}`:"null"}, distCovered=${c.toFixed(1)}, points=${o.length}`),!x){K.debug(`  Dead end at ${h}.${d}`);break}o.push(vi(x.pieceId,x.entryPoint));const v=e.pieces.find(A=>A.id===x.pieceId);if(!v)break;h=x.pieceId,u=v;const M=re(v.archetypeCode);let R=!0;if(M&&(M.code==="x90"||M.code==="x45")?x.entryPoint==="in1"?(d="out1",R=!0):x.entryPoint==="out1"?(d="in1",R=!1):x.entryPoint==="in2"?(d="out2",R=!0):(d="in2",R=!1):(d=ko(x.entryPoint),R=Ri(x.entryPoint)),v.internalConnectionPoints){const A=[...v.internalConnectionPoints].sort((w,O)=>R?w.distance-O.distance:O.distance-w.distance);for(const w of A)o.push(w.id),K.debug(`  Adding internal point ${w.id} on piece ${h}`)}o.push(vi(h,d)),_=An(v,0)}K.debug(`  Final pointsToLock (${o.length}): ${o.join(", ")}`);const m=this.tryAcquireLocks(t.id,o,s,e);return m.requested=o,K.debug(`  Lock result: success=${m.success}, acquired=${m.acquired.length}, blocked=${m.blocked||"none"}`),m}calculateStraddledPoints(t,e){const n=new Set;for(const s of t.cars){const r=e.pieces.find(u=>u.id===s.currentPieceId);if(!r)continue;const a=re(r.archetypeCode);if(!a)continue;const o=An(r,0),c=s.length/2,l=s.distanceAlongSection+c,h=s.distanceAlongSection-c;for(const u of a.connectionPoints){const d=Ri(u.name)?0:o;h<=d&&l>=d&&n.add(vi(r.id,u.name))}if(r.internalConnectionPoints)for(const u of r.internalConnectionPoints)h<=u.distance&&l>=u.distance&&n.add(u.id)}return Array.from(n)}releaseTrailingLocks(t,e,n,s){const r=this.getTrainState(t.id),a=new Set;for(const h of t.cars)a.add(h.currentPieceId);const o=new Set;for(const h of a){const u=e.pieces.find(f=>f.id===h);if(!u)continue;const d=re(u.archetypeCode);if(d){for(const f of d.connectionPoints)o.add(vi(h,f.name));if(u.internalConnectionPoints)for(const f of u.internalConnectionPoints)o.add(f.id)}}const c=this.acquireLeadingLocks(t,e,n,s);for(const h of c.requested)o.add(h);const l=[];for(const h of r.heldLocks)o.has(h)||l.push(h);for(const h of l)this.releaseLock(t.id,h)}isJunctionLocked(t){const e=t.match(/^junction\.(.+)\.(fwd|bwd)$/);if(!e)return!1;const n=e[1],s=Xc(n),r=vi(s.pieceId,s.pointName);return this.isLocked(r)}getAllLockedPoints(){return new Map(this.locks)}clear(){this.locks.clear(),this.trainStates.clear()}}const Bv=12,kv=6,Gv=12,Hv=24,qc=3;function ih(i){return i!==void 0&&typeof i=="object"&&"min"in i&&"max"in i}function Bs(i,t){return i===void 0?t:ih(i)?Math.floor(Math.random()*(i.max-i.min+1))+i.min:i}function Vv(i,t){return i===void 0?t:ih(i)?Math.random()*(i.max-i.min)+i.min:i}class Wv{constructor(t,e,n){bt(this,"trains",[]);bt(this,"layout");bt(this,"running",!1);bt(this,"lastTime",0);bt(this,"animationId",null);bt(this,"simulationTime",0);bt(this,"onUpdate");bt(this,"selectedRoutes");bt(this,"nextTrainId",1);bt(this,"nextCarId",1);bt(this,"resolvedFrequencies",new Map);bt(this,"lockManager");bt(this,"animationLoop",t=>{if(!this.running)return;const e=(t-this.lastTime)/1e3;this.lastTime=t;const n=Math.min(e,.1);this.simulationTime+=n,this.checkSpawning(),this.updateTrains(n),this.checkRemovals(),this.onUpdate(),this.animationId=requestAnimationFrame(this.animationLoop)});var s,r;this.layout=t,this.selectedRoutes=e,this.onUpdate=n,this.lockManager=new zv((s=t.lockAheadDistance)!=null?s:10,(r=t.lockAheadCount)!=null?r:2)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationLoop(this.lastTime),K.info("Simulation started"))}stop(){this.running=!1,this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),K.info("Simulation stopped")}getLockedPoints(){var e;const t=new Set(this.lockManager.getAllLockedPoints().keys());for(const n of this.layout.pieces)(e=n.semaphoreConfig)!=null&&e.locked&&(t.add(`${n.id}.in`),t.add(`${n.id}.out`));return K.debug("Locked points:",Array.from(t)),t}reset(){this.trains=[],this.simulationTime=0,this.resolvedFrequencies.clear(),this.lockManager.clear();for(const t of this.layout.pieces)t.genConfig&&(t.genConfig.lastSpawnTime=-1/0,t.genConfig.enabled=!0);this.onUpdate(),K.info("Simulation reset")}getTrains(){return this.trains}toggleGenerator(t){const e=this.layout.pieces.find(n=>n.id===t);e!=null&&e.genConfig&&(e.genConfig.enabled=!e.genConfig.enabled,K.info(`Generator ${t} toggled: ${e.genConfig.enabled}`))}checkSpawning(){for(const t of this.layout.pieces){if(!t.genConfig||!t.genConfig.enabled)continue;const e=t.genConfig,n=this.simulationTime-e.lastSpawnTime;if(e.frequency===void 0)e.lastSpawnTime===-1/0&&(this.spawnTrain(t),e.lastSpawnTime=this.simulationTime,e.enabled=!1);else{let s=this.resolvedFrequencies.get(t.id);s===void 0&&(s=Bs(e.frequency,10),this.resolvedFrequencies.set(t.id,s)),n>=s&&(this.spawnTrain(t),e.lastSpawnTime=this.simulationTime,this.resolvedFrequencies.set(t.id,Bs(e.frequency,10)))}}}canSpawnTrain(){var e;const t=(e=this.layout.maxTrains)!=null?e:5;return this.trains.length<t}spawnTrain(t){var u;if(!t.genConfig)return!1;if(!this.canSpawnTrain())return K.debug(`Cannot spawn train - at max trains limit (${this.layout.maxTrains})`),!1;const e=t.genConfig,n=Bs(e.cabCount,1),s=Bs(e.carCount,5),r=Vv(e.speed,Bv),a={id:`train_${this.nextTrainId++}`,cars:[],desiredSpeed:r,currentSpeed:0,generatorId:t.id,routesTaken:new Map,travelDirection:"forward",coupling:!1,couplingSpeed:qc},o=An(t,0);if(o===0)return K.debug(`Generator ${t.id} has no internal section`),!1;let c=o;Ev();for(let d=0;d<n;d++){c-=Hs/2;const f={id:`car_${this.nextCarId++}`,type:"cab",length:Hs,currentPieceId:t.id,distanceAlongSection:c,visible:!1,worldPosition:Bc(0,0,0),rotation:0,facingForward:!0};a.cars.push(f),c-=Hs/2+oo}const l=(u=e.colorMode)!=null?u:"gray";for(let d=0;d<s;d++){c-=Vs/2;const f={id:`car_${this.nextCarId++}`,type:"car",length:Vs,currentPieceId:t.id,distanceAlongSection:c,visible:!1,worldPosition:Bc(0,0,0),rotation:0,color:Mv(l),facingForward:!0};a.cars.push(f),c-=Vs/2+oo}for(const d of a.cars)bo(d,this.layout);const h=this.lockManager.acquireLeadingLocks(a,this.layout,this.selectedRoutes,this.simulationTime);return h.success?(this.trains.push(a),K.info(`Spawned train ${a.id} with ${a.cars.length} cars`),!0):(K.debug(`Cannot spawn train - blocked at ${h.blocked} by ${h.blockingTrainId}`),!1)}updateTrains(t){const e=new Set;for(const n of this.trains){if(e.has(n.id))continue;const s=this.lockManager.acquireLeadingLocks(n,this.layout,this.selectedRoutes,this.simulationTime);n.coupling?n.currentSpeed=n.couplingSpeed:s.success?n.currentSpeed>n.desiredSpeed?n.currentSpeed=Math.max(n.desiredSpeed,n.currentSpeed-Gv*t):n.currentSpeed<n.desiredSpeed&&(n.currentSpeed=Math.min(n.desiredSpeed,n.currentSpeed+kv*t)):n.currentSpeed=Math.max(0,n.currentSpeed-Hv*t);const r=n.currentSpeed*t,a=n.travelDirection==="forward"?r:-r,o=new Set,c=Fv(n);for(let l=0;l<n.cars.length;l++){const h=l===c;vv(n.cars[l],a,this.layout,this.selectedRoutes,n.routesTaken,h?o:void 0)}for(const l of o)n.routesTaken.delete(l),K.debug(`Cleared route memory: ${l} for train ${n.id}`);if(n.coupling){const l=this.checkCouplingContact(n);l&&e.add(l)}this.lockManager.releaseTrailingLocks(n,this.layout,this.selectedRoutes,this.simulationTime);for(const l of n.cars)this.updateCarVisibility(l)}e.size>0&&(this.trains=this.trains.filter(n=>!e.has(n.id)))}updateCarVisibility(t){const e=this.layout.pieces.find(s=>s.id===t.currentPieceId);if(!e)return;const n=re(e.archetypeCode);n&&(n.code==="gen"||n.code==="bin"||e.inTunnel?t.visible=!1:t.visible=!0)}checkRemovals(){this.trains=this.trains.filter(t=>t.cars.every(n=>{const s=this.layout.pieces.find(a=>a.id===n.currentPieceId);if(!s)return!1;const r=re(s.archetypeCode);return(r==null?void 0:r.code)==="bin"})?(this.lockManager.releaseAllLocks(t.id),K.info(`Removing train ${t.id} - all cars in bin`),!1):!0)}startCoupling(t){const e=this.trains.find(n=>n.id===t);return e?e.currentSpeed!==0?(K.info(`Cannot start coupling for train ${t} - still moving`),!1):(e.coupling=!0,K.info(`Train ${t} entering coupling mode`),!0):!1}checkCouplingContact(t){const e=$s(t);for(const n of this.trains)if(n.id!==t.id&&n.currentSpeed===0)for(const s of n.cars){const r=e.worldPosition.x-s.worldPosition.x,a=e.worldPosition.z-s.worldPosition.z,o=Math.sqrt(r*r+a*a),c=(e.length+s.length)/2+oo;if(o<=c)return this.coupleTrains(t,n),n.id}return null}coupleTrains(t,e){K.info(`Coupling train ${t.id} with train ${e.id}`);const n=$s(t),s=n.currentPieceId,r=e.cars[0],a=e.cars[e.cars.length-1],o=r.currentPieceId===s?Math.abs(n.distanceAlongSection-r.distanceAlongSection):1/0,c=a.currentPieceId===s?Math.abs(n.distanceAlongSection-a.distanceAlongSection):1/0;t.travelDirection==="forward"?c<=o?t.cars=[...e.cars,...t.cars]:t.cars=[...e.cars.slice().reverse(),...t.cars]:o<=c?t.cars=[...t.cars,...e.cars]:t.cars=[...t.cars,...e.cars.slice().reverse()],t.currentSpeed=0,t.coupling=!1;for(const h of t.cars)h.previousPieceId=void 0;t.routesTaken.clear();const l=this.lockManager.getTrainLocks(e.id);for(const h of l)this.lockManager.releaseLock(e.id,h);this.lockManager.acquireLeadingLocks(t,this.layout,this.selectedRoutes,this.simulationTime),K.info(`Combined train ${t.id} now has ${t.cars.length} cars`)}reverseTrain(t){const e=this.trains.find(n=>n.id===t);if(!e)return!1;if(e.currentSpeed!==0)return K.info(`Cannot reverse train ${t} - still moving`),!1;e.travelDirection=e.travelDirection==="forward"?"backward":"forward";for(const n of e.cars)n.previousPieceId=void 0;return e.routesTaken.clear(),this.lockManager.releaseAllLocks(e.id),this.lockManager.acquireLeadingLocks(e,this.layout,this.selectedRoutes,this.simulationTime),K.info(`Train ${t} reversed to ${e.travelDirection}`),!0}activateDecoupler(t){const e=this.layout.pieces.find(n=>n.id===t);if(!e||!e.decouplerConfig)return null;for(const n of this.trains)if(n.currentSpeed===0)for(let s=0;s<n.cars.length-1;s++){const r=n.cars[s],a=n.cars[s+1];if(this.isCouplerNearDecoupler(r,a,e))return this.splitTrain(n,s+1)}return K.info(`Decoupler ${t}: no stopped train found straddling this position`),null}isCouplerNearDecoupler(t,e,n){const r=n.position.x,a=n.position.z,o=(t.worldPosition.x+e.worldPosition.x)/2,c=(t.worldPosition.z+e.worldPosition.z)/2;return Math.sqrt((o-r)*(o-r)+(c-a)*(c-a))<=2}splitTrain(t,e){const n=t.cars.slice(0,e),s=t.cars.slice(e);K.info(`Splitting train ${t.id} at index ${e}: ${n.length} front cars, ${s.length} rear cars`);const r={id:`train_${this.nextTrainId++}`,cars:s,desiredSpeed:0,currentSpeed:0,generatorId:t.generatorId,routesTaken:new Map,travelDirection:t.travelDirection,coupling:!1,couplingSpeed:qc};return t.cars=n,t.currentSpeed=0,t.desiredSpeed=0,this.lockManager.releaseAllLocks(t.id),this.lockManager.acquireLeadingLocks(t,this.layout,this.selectedRoutes,this.simulationTime),this.lockManager.acquireLeadingLocks(r,this.layout,this.selectedRoutes,this.simulationTime),this.trains.push(r),K.info(`Created new train ${r.id} from split`),r.id}isJunctionLocked(t){return this.lockManager.isJunctionLocked(t)}findNextSwitch(t){const e=this.trains.find(u=>u.id===t);if(!e)return null;const n=$s(e),s=this.layout.pieces.find(u=>u.id===n.currentPieceId);if(!s)return null;const r=e.travelDirection;let a=n.currentPieceId,o=s,c=r==="forward"?"out":"in";const l=re(s.archetypeCode);l&&(l.code==="x90"||l.code==="x45")&&(n.entryPoint==="in1"||n.entryPoint==="out1"?c=r==="forward"?"out1":"in1":(n.entryPoint==="in2"||n.entryPoint==="out2")&&(c=r==="forward"?"out2":"in2"));let h;for(let u=0;u<50;u++){const d=o.connections.get(c);if(!d||d.length===0)return null;const f=d.filter(R=>R.pieceId!==h);if(f.length===0)return null;const g=f.filter(R=>Ri(R.pointName)),_=f.filter(R=>Bo(R.pointName));let p,m;if(r==="backward"?_.length>0?(p=_,m="bwd"):(p=g,m="fwd"):g.length>0?(p=g,m="fwd"):(p=_,m="bwd"),p.length===0&&(p=f,m="fwd"),p.length>1){const R=d.map(T=>`${T.pieceId}.${T.pointName}`);R.push(`${a}.${c}`),R.sort();const w=`junction.${R[0]}.${m}`,O=this.computeSpatialLabels(o,c,p);let E;return e.routesTaken.has(w)&&(E=e.routesTaken.get(w)),{routeKey:w,options:O,currentOverride:E}}const x=p[0],v=this.layout.pieces.find(R=>R.id===x.pieceId);if(!v)return null;h=a,a=x.pieceId,o=v;const M=re(v.archetypeCode);M&&(M.code==="x90"||M.code==="x45")?x.pointName==="in1"?c="out1":x.pointName==="out1"?c="in1":x.pointName==="in2"?c="out2":c="in2":c=ko(x.pointName)}return null}computeSpatialLabels(t,e,n){const s=[];for(let o=0;o<n.length;o++){const c=n[o],l=this.layout.pieces.find(p=>p.id===c.pieceId);if(!l){s.push({index:o,group:1,radiusKey:0});continue}const u=l.archetypeCode.toLowerCase().match(/^crv([lr])(\d+)?$/);if(!u){s.push({index:o,group:1,radiusKey:0});continue}const d=u[1],f=u[2]?parseInt(u[2],10):22,g=c.pointName.startsWith("in");let _;g?_=d==="l":_=d==="r",_?s.push({index:o,group:0,radiusKey:f}):s.push({index:o,group:2,radiusKey:-f})}s.sort((o,c)=>o.group-c.group||o.radiusKey-c.radiusKey);const r=s.length,a=[];for(let o=0;o<r;o++){let c;r===2?c=o===0?"Left":"Right":r===3?c=o===0?"Left":o===1?"Center":"Right":o===0?c="Left":o===r-1?c="Right":c=String(o+1),a.push({index:s[o].index,label:c})}return a}setTrainSwitchOverride(t,e,n){const s=this.trains.find(r=>r.id===t);s&&s.routesTaken.set(e,n)}clearTrainSwitchOverride(t,e){const n=this.trains.find(s=>s.id===t);n&&n.routesTaken.delete(e)}}class $v{constructor(){bt(this,"container");bt(this,"widgets",[]);bt(this,"handleWidgetRemove",t=>{const e=this.widgets.indexOf(t);e!==-1&&this.widgets.splice(e,1)});const t=document.getElementById("inspector-container");if(!t)throw new Error("Inspector container not found");this.container=t}addWidget(t){if(this.hasWidgetForTarget(t.targetId))return;const e=this.widgets.filter(n=>!n.locked);for(const n of e)this.removeWidget(n);t.onRemove=()=>this.handleWidgetRemove(t),this.widgets.push(t),this.container.appendChild(t.element)}hasWidgetForTarget(t){return this.widgets.some(e=>e.targetId===t)}update(){const t=[...this.widgets];for(const e of t)e.update()}clear(){const t=[...this.widgets];for(const e of t)e.remove();this.widgets=[]}removeWidget(t){t.remove()}}class Xv{constructor(){bt(this,"element");bt(this,"locked",!0);bt(this,"contentEl");bt(this,"lockBtn");bt(this,"onRemove");this.element=document.createElement("div"),this.element.className="inspector-widget",this.contentEl=document.createElement("div"),this.contentEl.className="inspector-content",this.element.appendChild(this.contentEl);const t=document.createElement("div");t.className="inspector-buttons",this.element.appendChild(t),this.lockBtn=document.createElement("button"),this.lockBtn.className="inspector-btn inspector-lock-btn",this.lockBtn.textContent="🔒",this.lockBtn.title="Unlock widget",this.lockBtn.addEventListener("click",()=>this.toggleLock()),t.appendChild(this.lockBtn);const e=document.createElement("button");e.className="inspector-btn inspector-close-btn",e.textContent="✕",e.title="Close",e.addEventListener("click",()=>this.remove()),t.appendChild(e),this.buildContent()}toggleLock(){this.locked=!this.locked,this.lockBtn.textContent=this.locked?"🔒":"🔓",this.lockBtn.title=this.locked?"Unlock widget":"Lock widget"}remove(){this.dispose(),this.element.remove(),this.onRemove&&this.onRemove()}}class qv extends Xv{constructor(e,n){super();bt(this,"trainId");bt(this,"simulation");bt(this,"idLabel");bt(this,"cabsLabel");bt(this,"carsLabel");bt(this,"speedLabel");bt(this,"slider");bt(this,"sliderValue");bt(this,"dirLabel");bt(this,"changeDirBtn");bt(this,"stopBtn");bt(this,"coupleBtn");bt(this,"savedSpeed",0);bt(this,"isStopped",!1);bt(this,"sliderActive",!1);bt(this,"switchContainer");bt(this,"switchButtons",[]);bt(this,"currentSwitchRouteKey",null);bt(this,"currentSwitchOptions",[]);bt(this,"selectedSwitchIndex");bt(this,"onSwitchRouteChanged");this.trainId=e,this.simulation=n,this.contentEl.innerHTML="",this.buildContent(),this.update()}get targetId(){return this.trainId}get typeLabel(){return"Train"}getTrain(){return this.simulation.getTrains().find(e=>e.id===this.trainId)}buildContent(){if(!this.trainId)return;const e=this.getTrain();if(!e)return;const n=(o,c)=>{const l=document.createElement("span");l.className="inspector-field";const h=document.createElement("span");h.className="inspector-field-label",h.textContent=o,l.appendChild(h),l.appendChild(c),this.contentEl.appendChild(l)},s=document.createElement("span");s.className="inspector-type-label",s.textContent="Train",this.contentEl.appendChild(s),this.idLabel=document.createElement("span"),this.idLabel.className="inspector-field-value",n("ID:",this.idLabel),this.cabsLabel=document.createElement("span"),this.cabsLabel.className="inspector-field-value",n("Cabs:",this.cabsLabel),this.carsLabel=document.createElement("span"),this.carsLabel.className="inspector-field-value",n("Cars:",this.carsLabel),this.speedLabel=document.createElement("span"),this.speedLabel.className="inspector-field-value inspector-speed-value",n("Current Speed:",this.speedLabel);const r=document.createElement("span");r.className="inspector-field";const a=document.createElement("span");a.className="inspector-field-label",a.textContent="Target Speed:",r.appendChild(a),this.slider=document.createElement("input"),this.slider.type="range",this.slider.className="inspector-slider",this.slider.min="0",this.slider.max="48",this.slider.step="1",this.slider.value=String(Math.round(e.desiredSpeed)),r.appendChild(this.slider),this.sliderValue=document.createElement("span"),this.sliderValue.className="inspector-field-value inspector-slider-value",r.appendChild(this.sliderValue),this.contentEl.appendChild(r),this.slider.addEventListener("input",()=>{const o=parseInt(this.slider.value,10),c=this.getTrain();c&&(c.desiredSpeed=o,this.sliderValue.textContent=String(o),this.isStopped&&o>0&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"))}),this.slider.addEventListener("mousedown",()=>{this.sliderActive=!0}),this.slider.addEventListener("mouseup",()=>{this.sliderActive=!1}),this.slider.addEventListener("touchstart",()=>{this.sliderActive=!0}),this.slider.addEventListener("touchend",()=>{this.sliderActive=!1}),this.dirLabel=document.createElement("span"),this.dirLabel.className="inspector-field-value",n("Direction:",this.dirLabel),this.changeDirBtn=document.createElement("button"),this.changeDirBtn.className="inspector-btn inspector-dir-btn",this.changeDirBtn.textContent="Change Direction",this.changeDirBtn.addEventListener("click",()=>{const o=this.getTrain();o&&o.currentSpeed===0&&(this.simulation.reverseTrain(this.trainId),o.desiredSpeed=0)}),this.contentEl.appendChild(this.changeDirBtn),this.stopBtn=document.createElement("button"),this.stopBtn.className="inspector-btn inspector-stop-btn",this.stopBtn.textContent="Stop",this.stopBtn.addEventListener("click",()=>{const o=this.getTrain();o&&(this.isStopped?(o.desiredSpeed=this.savedSpeed,this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"):(this.savedSpeed=o.desiredSpeed,o.desiredSpeed=0,o.coupling&&(o.coupling=!1,o.currentSpeed=0),this.isStopped=!0,this.stopBtn.textContent="Resume",this.stopBtn.className="inspector-btn inspector-resume-btn"))}),this.contentEl.appendChild(this.stopBtn),this.coupleBtn=document.createElement("button"),this.coupleBtn.className="inspector-btn inspector-couple-btn",this.coupleBtn.textContent="Couple",this.coupleBtn.addEventListener("click",()=>{const o=this.getTrain();o&&o.currentSpeed===0&&!o.coupling&&(o.desiredSpeed=2,o.couplingSpeed=2,this.simulation.startCoupling(this.trainId),this.isStopped&&(this.isStopped=!1,this.stopBtn.textContent="Stop",this.stopBtn.className="inspector-btn inspector-stop-btn"))}),this.contentEl.appendChild(this.coupleBtn),this.switchContainer=document.createElement("span"),this.switchContainer.className="inspector-switch-group",this.contentEl.appendChild(this.switchContainer)}update(){const e=this.getTrain();if(!e){this.remove();return}const n=e.cars.filter(o=>o.type==="cab").length,s=e.cars.filter(o=>o.type==="car").length;this.idLabel.textContent=e.id.replace("train_","#"),this.cabsLabel.textContent=String(n),this.carsLabel.textContent=String(s),this.speedLabel.textContent=e.currentSpeed.toFixed(1),this.sliderActive||(this.slider.value=String(Math.round(e.desiredSpeed)),this.sliderValue.textContent=String(Math.round(e.desiredSpeed))),this.dirLabel.textContent=e.travelDirection==="forward"?"Forward":"Backward",this.changeDirBtn.disabled=e.currentSpeed!==0;const r=e.coupling?"Coupling...":"Couple",a=e.coupling||e.currentSpeed!==0;this.coupleBtn.textContent!==r&&(this.coupleBtn.textContent=r),this.coupleBtn.disabled!==a&&(this.coupleBtn.disabled=a),this.updateSwitchSelector(e)}updateSwitchSelector(e){var a;const n=this.simulation.findNextSwitch(this.trainId);if(!n){if(this.currentSwitchRouteKey!=="__none__"){this.currentSwitchRouteKey="__none__",this.currentSwitchOptions=[],this.selectedSwitchIndex=void 0,this.switchButtons=[],this.switchContainer.innerHTML="";const o=document.createElement("span");o.className="inspector-switch-label",o.textContent="Next Switch: None",this.switchContainer.appendChild(o)}return}if(n.routeKey!==this.currentSwitchRouteKey||n.options.length!==this.currentSwitchOptions.length){this.currentSwitchRouteKey=n.routeKey,this.currentSwitchOptions=n.options,this.switchButtons=[],this.switchContainer.innerHTML="";const o=document.createElement("span");o.className="inspector-switch-label",o.textContent="Next Switch:",this.switchContainer.appendChild(o);for(const c of n.options){const l=document.createElement("button");l.className="inspector-switch-btn",l.textContent=c.label,l.addEventListener("click",()=>{this.onSwitchButtonClick(c.index)}),this.switchContainer.appendChild(l),this.switchButtons.push(l)}}const r=n.currentOverride;if(r!==this.selectedSwitchIndex){this.selectedSwitchIndex=r;for(let o=0;o<this.switchButtons.length;o++){const h=((a=this.currentSwitchOptions[o])==null?void 0:a.index)===r?"inspector-switch-btn selected":"inspector-switch-btn";this.switchButtons[o].className!==h&&(this.switchButtons[o].className=h)}}}onSwitchButtonClick(e){var n,s;if(!(!this.currentSwitchRouteKey||this.currentSwitchRouteKey==="__none__")){this.selectedSwitchIndex===e?(this.simulation.clearTrainSwitchOverride(this.trainId,this.currentSwitchRouteKey),this.selectedSwitchIndex=void 0):(this.simulation.setTrainSwitchOverride(this.trainId,this.currentSwitchRouteKey,e),this.selectedSwitchIndex=e,(n=this.onSwitchRouteChanged)==null||n.call(this,this.currentSwitchRouteKey,e));for(let r=0;r<this.switchButtons.length;r++){const o=((s=this.currentSwitchOptions[r])==null?void 0:s.index)===this.selectedSwitchIndex;this.switchButtons[r].className=o?"inspector-switch-btn selected":"inspector-switch-btn"}}}dispose(){}}const Yv=Object.assign({"./layouts/complex-layout.txt":ph,"./layouts/cross-connect.txt":mh,"./layouts/flex-connect.txt":gh,"./layouts/layout03.txt":_h,"./layouts/semaphore.txt":vh,"./layouts/splice.txt":xh,"./layouts/two-loops.txt":Sh}),sh={};for(const[i,t]of Object.entries(Yv)){const e=i.split("/").pop();sh[e]=t}const rh=document.getElementById("canvas-container");if(!rh)throw new Error("Canvas container not found");const ue=new A_(rh),er=new $v,Yc=document.getElementById("status");let ge=null,Ie=null;ue.setSwitchClickCallback((i,t)=>{if(K.debug(`Switch click callback: ${i} -> ${t}`),Ie!=null&&Ie.isJunctionLocked(i)){te("Switch locked - train in junction");return}Zl(i,t),ge?(K.debug(`Calling renderLayout with ${ge.pieces.length} pieces`),Ni(ue,ge),te(`Switch toggled: ${i} → route ${t+1}`)):K.debug("currentLayout is null!")});ue.setSemaphoreClickCallback(i=>{if(K.debug(`Semaphore click callback: ${i}`),!ge)return;const t=ge.pieces.find(n=>n.id===i);if(!t||!t.semaphoreConfig){K.debug(`Semaphore piece ${i} not found or has no config`);return}t.semaphoreConfig.locked=!t.semaphoreConfig.locked,j_(i,t.semaphoreConfig.locked);const e=t.semaphoreConfig.locked?"LOCKED (red)":"UNLOCKED (green)";te(`Semaphore ${i}: ${e}`),ue.render()});ue.setDecouplerClickCallback(i=>{if(K.debug(`Decoupler click callback: ${i}`),!ge||!Ie)return;const t=ge.pieces.find(n=>n.id===i);if(!t||!t.decouplerConfig){K.debug(`Decoupler piece ${i} not found or has no config`);return}Ie.activateDecoupler(i)?(t.decouplerConfig.activated=!0,kc(i,!0),te(`Decoupler ${i}: ACTIVATED - train split`),setTimeout(()=>{t.decouplerConfig.activated=!1,kc(i,!1),ue.render()},1e3)):te(`Decoupler ${i}: no train to split`),ue.render()});ue.setTrainDblClickCallback(i=>{if(!Ie||er.hasWidgetForTarget(i))return;const t=new qv(i,Ie);t.onSwitchRouteChanged=(e,n)=>{Zl(e,n),ge&&Ni(ue,ge)},er.addWidget(t)});function te(i){Yc&&(Yc.textContent=i)}function Ho(i){const t={debug:Qe.DEBUG,info:Qe.INFO,warn:Qe.WARNING,error:Qe.ERROR};$l(i.logLevel?t[i.logLevel]:Qe.WARNING)}function Vo(i){Ie&&Ie.stop(),er.clear(),Ie=new Wv(i,Y_(),()=>{if(Ie){const t=Rv(Ie.getTrains());ue.updateTrains(t),K_(Ie.getLockedPoints(),ue.getLabelsVisible()),er.update(),ue.render()}}),Ie.start(),K.debug("Simulation started")}async function Kv(){try{te("Opening file dialog...");const i=await yh({filters:[{name:"Layout Files",extensions:["layout","txt"]}],multiple:!1});if(!i||typeof i!="string"){te("Import cancelled");return}te(`Loading: ${i}`);const t=await Th(i);te("Parsing layout...");const e=Go(t);ge=e,Ho(e),pr(),te(`Rendering ${e.pieces.length} pieces...`),Ni(ue,e),Vo(e),K.info(`Layout loaded: ${e.pieces.length} pieces`),te(`Layout loaded: ${e.pieces.length} pieces - simulation running`)}catch(i){const t=i instanceof Error?i.message:String(i);te(`Error: ${t}`),K.error("Import error:",i)}}const Kc=document.getElementById("import-btn");Kc&&Kc.addEventListener("click",()=>{Kv()});const ji=document.getElementById("random-btn");function pr(){var i;ji&&(((i=ge==null?void 0:ge.randomSwitches)!=null?i:!1)?ji.classList.add("active"):ji.classList.remove("active"))}function jv(){if(!ge){te("No layout loaded");return}ge.randomSwitches=!ge.randomSwitches,pr(),Ni(ue,ge);const i=ge.randomSwitches?"ON":"OFF";te(`Random switches: ${i}`)}ji&&ji.addEventListener("click",jv);const Zi=document.getElementById("labels-btn");function Zv(){Zi&&(ue.getLabelsVisible()?Zi.classList.add("active"):Zi.classList.remove("active"))}function Jv(){const i=ue.getLabelsVisible();ue.setLabelsVisible(!i),Zv(),ue.render();const t=ue.getLabelsVisible()?"ON":"OFF";te(`Labels: ${t}`)}Zi&&Zi.addEventListener("click",Jv);ue.render();te('Ready - click "Import Layout" to load a layout file');document.addEventListener("paste",async i=>{var e;const t=(e=i.clipboardData)==null?void 0:e.getData("text");if(t&&t.trim())try{te("Parsing pasted layout...");const n=Go(t);ge=n,Ho(n),pr(),Ni(ue,n),Vo(n),K.info(`Layout loaded from clipboard: ${n.pieces.length} pieces`),te(`Layout loaded from clipboard: ${n.pieces.length} pieces - simulation running`)}catch(n){const s=n instanceof Error?n.message:String(n);te(`Parse error: ${s}`)}});const jc=document.getElementById("layouts-btn"),en=document.getElementById("layouts-dialog"),ks=document.getElementById("layouts-list"),nr=document.getElementById("dialog-run-btn"),ir=document.getElementById("dialog-save-btn"),Zc=document.getElementById("dialog-cancel-btn");let pn=null,Jc=null;function Qv(){return Ch}function oh(i){const t=sh[i];if(!t)throw new Error(`Layout not found: ${i}`);return t}function tx(i){if(ks){ks.innerHTML="",pn=null,Qc();for(const t of i.layouts){const e=document.createElement("div");e.className="layout-item",e.dataset.file=t.file;const n=document.createElement("div");n.className="layout-item-title",n.textContent=t.title;const s=document.createElement("div");s.className="layout-item-description",s.textContent=t.description,e.appendChild(n),e.appendChild(s),e.addEventListener("click",()=>{ks.querySelectorAll(".layout-item").forEach(r=>r.classList.remove("selected")),e.classList.add("selected"),pn=t.file,Qc()}),ks.appendChild(e)}}}function Qc(){const i=pn!==null;nr&&(nr.disabled=!i),ir&&(ir.disabled=!i)}function ex(){if(en)try{Jc=Qv(),tx(Jc),en.style.display="flex",te("")}catch(i){const t=i instanceof Error?i.message:String(i);te(`Error: ${t}`)}}function rs(){en&&(en.style.display="none"),pn=null}function nx(){if(!pn)return;const i=pn;try{te(`Loading ${i}...`),rs();const t=oh(i);te("Parsing layout...");const e=Go(t);ge=e,Ho(e),pr(),te(`Rendering ${e.pieces.length} pieces...`),Ni(ue,e),Vo(e),K.info(`Layout loaded: ${e.pieces.length} pieces`),te(`Layout loaded: ${e.pieces.length} pieces - simulation running`)}catch(t){const e=t instanceof Error?t.message:String(t);te(`Error: ${e}`),K.error("Run layout error:",t)}}async function ix(){if(pn)try{const i=oh(pn),t=await bh({filters:[{name:"Layout Files",extensions:["txt","layout"]}],defaultPath:pn});if(!t){te("Save cancelled");return}await wh(t,i),rs(),te(`Layout saved to: ${t}`)}catch(i){const t=i instanceof Error?i.message:String(i);te(`Error: ${t}`),K.error("Save layout error:",i)}}jc&&jc.addEventListener("click",ex);nr&&nr.addEventListener("click",nx);ir&&ir.addEventListener("click",ix);Zc&&Zc.addEventListener("click",rs);en&&en.addEventListener("click",i=>{i.target===en&&rs()});document.addEventListener("keydown",i=>{i.key==="Escape"&&(en==null?void 0:en.style.display)==="flex"&&rs()});
