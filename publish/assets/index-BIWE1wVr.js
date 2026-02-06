var nh=Object.defineProperty;var ih=(i,e,t)=>e in i?nh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Ze=(i,e,t)=>ih(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function sh(){return window.crypto.getRandomValues(new Uint32Array(1))[0]}function Wo(i,e=!1){const t=sh(),n=`_${t}`;return Object.defineProperty(window,n,{value:s=>(e&&Reflect.deleteProperty(window,n),i==null?void 0:i(s)),writable:!1,configurable:!0}),t}async function rh(i,e={}){return new Promise((t,n)=>{const s=Wo(a=>{t(a),Reflect.deleteProperty(window,`_${r}`)},!0),r=Wo(a=>{n(a),Reflect.deleteProperty(window,`_${s}`)},!0);window.__TAURI_IPC__({cmd:i,callback:s,error:r,...e})})}async function tr(i){return rh("tauri",i)}async function oh(i={}){return typeof i=="object"&&Object.freeze(i),tr({__tauriModule:"Dialog",message:{cmd:"openDialog",options:i}})}async function ah(i={}){return typeof i=="object"&&Object.freeze(i),tr({__tauriModule:"Dialog",message:{cmd:"saveDialog",options:i}})}var $o;(function(i){i[i.Audio=1]="Audio",i[i.Cache=2]="Cache",i[i.Config=3]="Config",i[i.Data=4]="Data",i[i.LocalData=5]="LocalData",i[i.Desktop=6]="Desktop",i[i.Document=7]="Document",i[i.Download=8]="Download",i[i.Executable=9]="Executable",i[i.Font=10]="Font",i[i.Home=11]="Home",i[i.Picture=12]="Picture",i[i.Public=13]="Public",i[i.Runtime=14]="Runtime",i[i.Template=15]="Template",i[i.Video=16]="Video",i[i.Resource=17]="Resource",i[i.App=18]="App",i[i.Log=19]="Log",i[i.Temp=20]="Temp",i[i.AppConfig=21]="AppConfig",i[i.AppData=22]="AppData",i[i.AppLocalData=23]="AppLocalData",i[i.AppCache=24]="AppCache",i[i.AppLog=25]="AppLog"})($o||($o={}));async function ch(i,e={}){return tr({__tauriModule:"Fs",message:{cmd:"readTextFile",path:i,options:e}})}async function lh(i,e,t){typeof i=="object"&&Object.freeze(i);const n={path:"",contents:""};let s=t;return typeof i=="string"?n.path=i:(n.path=i.path,n.contents=i.contents),typeof e=="string"?n.contents=e!=null?e:"":s=e,tr({__tauriModule:"Fs",message:{cmd:"writeFile",path:n.path,contents:Array.from(new TextEncoder().encode(n.contents)),options:s}})}const hh=[{file:"two-loops.txt",title:"Two Loops",description:"Several loops with a generator and a bin. Random switch selection enabled."},{file:"complex-layout.txt",title:"More Loops and Switches",description:"Slightly more complex example with more loops and switches."},{file:"flex-connect.txt",title:"Flex Connect Example",description:"How to fill a non-standard gap between two tracks using flex connect."},{file:"splice.txt",title:"Splice Example",description:"How to use the splice statement to create parallel tracks with switches."},{file:"cross-connect.txt",title:"Cross Connect Example",description:"Demonstrates cross connect for track intersections with collision prevention."},{file:"semaphore.txt",title:"Semaphore Test",description:"Manual signal control - click the green/red dot to stop or allow trains."}],uh={layouts:hh},dh=`title         Two loops
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
`,fh=`title More loops and switches
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
# bin`,ph=`title Sample with flex connect
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
`,mh=`title Sample with Splice Statement
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

`,gh=`title Cross Connect Example
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
`,_h=`# Semaphore Test Layout
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
`;/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Eo="160",dn={ROTATE:0,DOLLY:1,PAN:2},Mn={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},xh=0,Xo=1,vh=2,qc=1,Sh=2,un=3,Pn=0,It=1,Ht=2,wn=0,Mi=1,qo=2,Yo=3,jo=4,Mh=5,kn=100,Eh=101,yh=102,Ko=103,Zo=104,bh=200,Th=201,Ah=202,wh=203,ao=204,co=205,Ch=206,Rh=207,Ph=208,Lh=209,Ih=210,Dh=211,Nh=212,Uh=213,Oh=214,Fh=0,zh=1,Bh=2,Ws=3,kh=4,Gh=5,Hh=6,Vh=7,Yc=0,Wh=1,$h=2,Cn=0,Xh=1,qh=2,Yh=3,jh=4,Kh=5,Zh=6,jc=300,bi=301,Ti=302,lo=303,ho=304,nr=306,uo=1e3,Yt=1001,fo=1002,Rt=1003,Jo=1004,_r=1005,kt=1006,Jh=1007,ji=1008,Rn=1009,Qh=1010,eu=1011,yo=1012,Kc=1013,yn=1014,bn=1015,Ki=1016,Zc=1017,Jc=1018,Hn=1020,tu=1021,jt=1023,nu=1024,iu=1025,Vn=1026,Ai=1027,su=1028,Qc=1029,ru=1030,el=1031,tl=1033,xr=33776,vr=33777,Sr=33778,Mr=33779,Qo=35840,ea=35841,ta=35842,na=35843,nl=36196,ia=37492,sa=37496,ra=37808,oa=37809,aa=37810,ca=37811,la=37812,ha=37813,ua=37814,da=37815,fa=37816,pa=37817,ma=37818,ga=37819,_a=37820,xa=37821,Er=36492,va=36494,Sa=36495,ou=36283,Ma=36284,Ea=36285,ya=36286,il=3e3,Wn=3001,au=3200,cu=3201,sl=0,lu=1,Vt="",Mt="srgb",mn="srgb-linear",bo="display-p3",ir="display-p3-linear",$s="linear",nt="srgb",Xs="rec709",qs="p3",Qn=7680,ba=519,hu=512,uu=513,du=514,rl=515,fu=516,pu=517,mu=518,gu=519,Ta=35044,Aa="300 es",po=1035,fn=2e3,Ys=2001;class Kn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Hi=Math.PI/180,mo=180/Math.PI;function Ci(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Et(i,e,t){return Math.max(e,Math.min(t,i))}function _u(i,e){return(i%e+e)%e}function yr(i,e,t){return(1-t)*i+t*e}function wa(i){return(i&i-1)===0&&i!==0}function go(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Ii(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Lt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const xu={DEG2RAD:Hi};class he{constructor(e=0,t=0){he.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,n,s,r,a,o,c,l){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],S=s[1],x=s[4],M=s[7],R=s[2],w=s[5],A=s[8];return r[0]=a*_+o*S+c*R,r[3]=a*m+o*x+c*w,r[6]=a*p+o*M+c*A,r[1]=l*_+h*S+d*R,r[4]=l*m+h*x+d*w,r[7]=l*p+h*M+d*A,r[2]=u*_+f*S+g*R,r[5]=u*m+f*x+g*w,r[8]=u*p+f*M+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=t*d+n*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=d*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=u*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(br.makeScale(e,t)),this}rotate(e){return this.premultiply(br.makeRotation(-e)),this}translate(e,t){return this.premultiply(br.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const br=new qe;function ol(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function js(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function vu(){const i=js("canvas");return i.style.display="block",i}const Ca={};function Vi(i){i in Ca||(Ca[i]=!0,console.warn(i))}const Ra=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Pa=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),as={[mn]:{transfer:$s,primaries:Xs,toReference:i=>i,fromReference:i=>i},[Mt]:{transfer:nt,primaries:Xs,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[ir]:{transfer:$s,primaries:qs,toReference:i=>i.applyMatrix3(Pa),fromReference:i=>i.applyMatrix3(Ra)},[bo]:{transfer:nt,primaries:qs,toReference:i=>i.convertSRGBToLinear().applyMatrix3(Pa),fromReference:i=>i.applyMatrix3(Ra).convertLinearToSRGB()}},Su=new Set([mn,ir]),et={enabled:!0,_workingColorSpace:mn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Su.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=as[e].toReference,s=as[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return as[i].primaries},getTransfer:function(i){return i===Vt?$s:as[i].transfer}};function Ei(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Tr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let ei;class al{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ei===void 0&&(ei=js("canvas")),ei.width=e.width,ei.height=e.height;const n=ei.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=js("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ei(t[n]/255)*255):t[n]=Ei(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Mu=0;class cl{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Mu++}),this.uuid=Ci(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ar(s[a].image)):r.push(Ar(s[a]))}else r=Ar(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Ar(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?al.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Eu=0;class Ft extends Kn{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=Yt,s=Yt,r=kt,a=ji,o=jt,c=Rn,l=Ft.DEFAULT_ANISOTROPY,h=Vt){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Eu++}),this.uuid=Ci(),this.name="",this.source=new cl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Vi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Wn?Mt:Vt),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==jc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case uo:e.x=e.x-Math.floor(e.x);break;case Yt:e.x=e.x<0?0:1;break;case fo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case uo:e.y=e.y-Math.floor(e.y);break;case Yt:e.y=e.y<0?0:1;break;case fo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Vi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Mt?Wn:il}set encoding(e){Vi("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Wn?Mt:Vt}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=jc;Ft.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,n=0,s=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,M=(f+1)/2,R=(p+1)/2,w=(h+u)/4,A=(d+_)/4,F=(g+m)/4;return x>M&&x>R?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=w/n,r=A/n):M>R?M<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),n=w/s,r=F/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=F/r),this.set(n,s,r,t),this}let S=Math.sqrt((m-g)*(m-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-_)/S,this.z=(u-h)/S,this.w=Math.acos((l+f+p-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class yu extends Kn{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(Vi("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Wn?Mt:Vt),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kt,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ft(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new cl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Xn extends yu{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ll extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bu extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=Yt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const u=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(o===1){e[t+0]=u,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(d!==_||c!==u||l!==f||h!==g){let m=1-o;const p=c*u+l*f+h*g+d*_,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),w=Math.atan2(R,p*S);m=Math.sin(m*w)/R,o=Math.sin(o*w)/R}const M=o*S;if(c=c*m+u*M,l=l*m+f*M,h=h*m+g*M,d=d*m+_*M,m===1-o){const R=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=R,l*=R,h*=R,d*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-o*f,e[t+2]=l*g+h*f+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),d=o(r/2),u=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Et(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),d=Math.sin((1-t)*h)/l,u=Math.sin(t*h)/l;return this._w=a*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,t=0,n=0){I.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(La.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(La.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),d=2*(r*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return wr.copy(this).projectOnVector(e),this.sub(wr)}reflect(e){return this.sub(wr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Et(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const wr=new I,La=new qn;class Ri{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Wt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Wt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Wt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wt):Wt.fromBufferAttribute(r,a),Wt.applyMatrix4(e.matrixWorld),this.expandByPoint(Wt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),cs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),cs.copy(n.boundingBox)),cs.applyMatrix4(e.matrixWorld),this.union(cs)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,Wt),Wt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Di),ls.subVectors(this.max,Di),ti.subVectors(e.a,Di),ni.subVectors(e.b,Di),ii.subVectors(e.c,Di),gn.subVectors(ni,ti),_n.subVectors(ii,ni),Nn.subVectors(ti,ii);let t=[0,-gn.z,gn.y,0,-_n.z,_n.y,0,-Nn.z,Nn.y,gn.z,0,-gn.x,_n.z,0,-_n.x,Nn.z,0,-Nn.x,-gn.y,gn.x,0,-_n.y,_n.x,0,-Nn.y,Nn.x,0];return!Cr(t,ti,ni,ii,ls)||(t=[1,0,0,0,1,0,0,0,1],!Cr(t,ti,ni,ii,ls))?!1:(hs.crossVectors(gn,_n),t=[hs.x,hs.y,hs.z],Cr(t,ti,ni,ii,ls))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(rn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),rn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),rn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),rn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),rn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),rn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),rn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),rn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(rn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const rn=[new I,new I,new I,new I,new I,new I,new I,new I],Wt=new I,cs=new Ri,ti=new I,ni=new I,ii=new I,gn=new I,_n=new I,Nn=new I,Di=new I,ls=new I,hs=new I,Un=new I;function Cr(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Un.fromArray(i,r);const o=s.x*Math.abs(Un.x)+s.y*Math.abs(Un.y)+s.z*Math.abs(Un.z),c=e.dot(Un),l=t.dot(Un),h=n.dot(Un);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Tu=new Ri,Ni=new I,Rr=new I;class sr{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Tu.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ni.subVectors(e,this.center);const t=Ni.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ni,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ni.copy(e.center).add(Rr)),this.expandByPoint(Ni.copy(e.center).sub(Rr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new I,Pr=new I,us=new I,xn=new I,Lr=new I,ds=new I,Ir=new I;class rr{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Pr.copy(e).add(t).multiplyScalar(.5),us.copy(t).sub(e).normalize(),xn.copy(this.origin).sub(Pr);const r=e.distanceTo(t)*.5,a=-this.direction.dot(us),o=xn.dot(this.direction),c=-xn.dot(us),l=xn.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Pr).addScaledVector(us,u),f}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),s=on.dot(on)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,s,r){Lr.subVectors(t,e),ds.subVectors(n,e),Ir.crossVectors(Lr,ds);let a=this.direction.dot(Ir),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;xn.subVectors(this.origin,e);const c=o*this.direction.dot(ds.crossVectors(xn,ds));if(c<0)return null;const l=o*this.direction.dot(Lr.cross(xn));if(l<0||c+l>a)return null;const h=-o*xn.dot(Ir);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,n,s,r,a,o,c,l,h,d,u,f,g,_,m){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,d,u,f,g,_,m)}set(e,t,n,s,r,a,o,c,l,h,d,u,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/si.setFromMatrixColumn(e,0).length(),r=1/si.setFromMatrixColumn(e,1).length(),a=1/si.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,_=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-_*l,t[9]=-o*c,t[2]=_-u*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,_=l*d;t[0]=u-_*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,_=o*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+_,t[1]=c*d,t[5]=_*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-_*d}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+_,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=_*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Au,e,wu)}lookAt(e,t,n){const s=this.elements;return Nt.subVectors(e,t),Nt.lengthSq()===0&&(Nt.z=1),Nt.normalize(),vn.crossVectors(n,Nt),vn.lengthSq()===0&&(Math.abs(n.z)===1?Nt.x+=1e-4:Nt.z+=1e-4,Nt.normalize(),vn.crossVectors(n,Nt)),vn.normalize(),fs.crossVectors(Nt,vn),s[0]=vn.x,s[4]=fs.x,s[8]=Nt.x,s[1]=vn.y,s[5]=fs.y,s[9]=Nt.y,s[2]=vn.z,s[6]=fs.z,s[10]=Nt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],x=n[7],M=n[11],R=n[15],w=s[0],A=s[4],F=s[8],E=s[12],T=s[1],z=s[5],W=s[9],re=s[13],L=s[2],O=s[6],B=s[10],Y=s[14],j=s[3],K=s[7],Z=s[11],ae=s[15];return r[0]=a*w+o*T+c*L+l*j,r[4]=a*A+o*z+c*O+l*K,r[8]=a*F+o*W+c*B+l*Z,r[12]=a*E+o*re+c*Y+l*ae,r[1]=h*w+d*T+u*L+f*j,r[5]=h*A+d*z+u*O+f*K,r[9]=h*F+d*W+u*B+f*Z,r[13]=h*E+d*re+u*Y+f*ae,r[2]=g*w+_*T+m*L+p*j,r[6]=g*A+_*z+m*O+p*K,r[10]=g*F+_*W+m*B+p*Z,r[14]=g*E+_*re+m*Y+p*ae,r[3]=S*w+x*T+M*L+R*j,r[7]=S*A+x*z+M*O+R*K,r[11]=S*F+x*W+M*B+R*Z,r[15]=S*E+x*re+M*Y+R*ae,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*d-s*l*d-r*o*u+n*l*u+s*o*f-n*c*f)+_*(+t*c*f-t*l*u+r*a*u-s*a*f+s*l*h-r*c*h)+m*(+t*l*d-t*o*f-r*a*d+n*a*f+r*o*h-n*l*h)+p*(-s*o*h-t*c*d+t*o*u+s*a*d-n*a*u+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],S=d*m*l-_*u*l+_*c*f-o*m*f-d*c*p+o*u*p,x=g*u*l-h*m*l-g*c*f+a*m*f+h*c*p-a*u*p,M=h*_*l-g*d*l+g*o*f-a*_*f-h*o*p+a*d*p,R=g*d*c-h*_*c-g*o*u+a*_*u+h*o*m-a*d*m,w=t*S+n*x+s*M+r*R;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/w;return e[0]=S*A,e[1]=(_*u*r-d*m*r-_*s*f+n*m*f+d*s*p-n*u*p)*A,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*A,e[3]=(d*c*r-o*u*r-d*s*l+n*u*l+o*s*f-n*c*f)*A,e[4]=x*A,e[5]=(h*m*r-g*u*r+g*s*f-t*m*f-h*s*p+t*u*p)*A,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*A,e[7]=(a*u*r-h*c*r+h*s*l-t*u*l-a*s*f+t*c*f)*A,e[8]=M*A,e[9]=(g*d*r-h*_*r-g*n*f+t*_*f+h*n*p-t*d*p)*A,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*A,e[11]=(h*o*r-a*d*r-h*n*l+t*d*l+a*n*f-t*o*f)*A,e[12]=R*A,e[13]=(h*_*s-g*d*s+g*n*u-t*_*u-h*n*m+t*d*m)*A,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*A,e[15]=(a*d*s-h*o*s+h*n*c-t*d*c-a*n*u+t*o*u)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,_=a*h,m=a*d,p=o*d,S=c*l,x=c*h,M=c*d,R=n.x,w=n.y,A=n.z;return s[0]=(1-(_+p))*R,s[1]=(f+M)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(f-M)*w,s[5]=(1-(u+p))*w,s[6]=(m+S)*w,s[7]=0,s[8]=(g+x)*A,s[9]=(m-S)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=si.set(s[0],s[1],s[2]).length();const a=si.set(s[4],s[5],s[6]).length(),o=si.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],$t.copy(this);const l=1/r,h=1/a,d=1/o;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=d,$t.elements[9]*=d,$t.elements[10]*=d,t.setFromRotationMatrix($t),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=fn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),u=(n+s)/(n-s);let f,g;if(o===fn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ys)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=fn){const c=this.elements,l=1/(t-e),h=1/(n-s),d=1/(a-r),u=(t+e)*l,f=(n+s)*h;let g,_;if(o===fn)g=(a+r)*d,_=-2*d;else if(o===Ys)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const si=new I,$t=new ct,Au=new I(0,0,0),wu=new I(1,1,1),vn=new I,fs=new I,Nt=new I,Ia=new ct,Da=new qn;class or{constructor(e=0,t=0,n=0,s=or.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Et(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Et(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Et(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Et(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Et(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Et(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Ia.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ia,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Da.setFromEuler(this),this.setFromQuaternion(Da,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}or.DEFAULT_ORDER="XYZ";class To{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Cu=0;const Na=new I,ri=new qn,an=new ct,ps=new I,Ui=new I,Ru=new I,Pu=new qn,Ua=new I(1,0,0),Oa=new I(0,1,0),Fa=new I(0,0,1),Lu={type:"added"},Iu={type:"removed"};class St extends Kn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Cu++}),this.uuid=Ci(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=St.DEFAULT_UP.clone();const e=new I,t=new or,n=new qn,s=new I(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new qe}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=St.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new To,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(Ua,e)}rotateY(e){return this.rotateOnAxis(Oa,e)}rotateZ(e){return this.rotateOnAxis(Fa,e)}translateOnAxis(e,t){return Na.copy(e).applyQuaternion(this.quaternion),this.position.add(Na.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ua,e)}translateY(e){return this.translateOnAxis(Oa,e)}translateZ(e){return this.translateOnAxis(Fa,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(an.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ps.copy(e):ps.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?an.lookAt(Ui,ps,this.up):an.lookAt(ps,Ui,this.up),this.quaternion.setFromRotationMatrix(an),s&&(an.extractRotation(s.matrixWorld),ri.setFromRotationMatrix(an),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(Lu)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Iu)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),an.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),an.multiply(e.parent.matrixWorld)),e.applyMatrix4(an),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Ru),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Pu,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}St.DEFAULT_UP=new I(0,1,0);St.DEFAULT_MATRIX_AUTO_UPDATE=!0;St.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Xt=new I,cn=new I,Dr=new I,ln=new I,oi=new I,ai=new I,za=new I,Nr=new I,Ur=new I,Or=new I;let ms=!1;class Gt{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Xt.subVectors(e,t),s.cross(Xt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Xt.subVectors(s,t),cn.subVectors(n,t),Dr.subVectors(e,t);const a=Xt.dot(Xt),o=Xt.dot(cn),c=Xt.dot(Dr),l=cn.dot(cn),h=cn.dot(Dr),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ln)===null?!1:ln.x>=0&&ln.y>=0&&ln.x+ln.y<=1}static getUV(e,t,n,s,r,a,o,c){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ln.x),c.addScaledVector(a,ln.y),c.addScaledVector(o,ln.z),c)}static isFrontFacing(e,t,n,s){return Xt.subVectors(n,t),cn.subVectors(e,t),Xt.cross(cn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Xt.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),Xt.cross(cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Gt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Gt.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return ms===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ms=!0),Gt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return Gt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Gt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Gt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;oi.subVectors(s,n),ai.subVectors(r,n),Nr.subVectors(e,n);const c=oi.dot(Nr),l=ai.dot(Nr);if(c<=0&&l<=0)return t.copy(n);Ur.subVectors(e,s);const h=oi.dot(Ur),d=ai.dot(Ur);if(h>=0&&d<=h)return t.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(oi,a);Or.subVectors(e,r);const f=oi.dot(Or),g=ai.dot(Or);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ai,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return za.subVectors(r,s),o=(d-h)/(d-h+(f-g)),t.copy(s).addScaledVector(za,o);const p=1/(m+_+u);return a=_*p,o=u*p,t.copy(n).addScaledVector(oi,a).addScaledVector(ai,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const hl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Sn={h:0,s:0,l:0},gs={h:0,s:0,l:0};function Fr(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Mt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=_u(e,1),t=Et(t,0,1),n=Et(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Fr(a,r,e+1/3),this.g=Fr(a,r,e),this.b=Fr(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=Mt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Mt){const n=hl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ei(e.r),this.g=Ei(e.g),this.b=Ei(e.b),this}copyLinearToSRGB(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mt){return et.fromWorkingColorSpace(At.copy(this),e),Math.round(Et(At.r*255,0,255))*65536+Math.round(Et(At.g*255,0,255))*256+Math.round(Et(At.b*255,0,255))}getHexString(e=Mt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(At.copy(this),t);const n=At.r,s=At.g,r=At.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Mt){et.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,s=At.b;return e!==Mt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Sn),this.setHSL(Sn.h+e,Sn.s+t,Sn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Sn),e.getHSL(gs);const n=yr(Sn.h,gs.h,t),s=yr(Sn.s,gs.s,t),r=yr(Sn.l,gs.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new Je;Je.NAMES=hl;let Du=0;class Zn extends Kn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Du++}),this.uuid=Ci(),this.name="",this.type="Material",this.blending=Mi,this.side=Pn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ao,this.blendDst=co,this.blendEquation=kn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Je(0,0,0),this.blendAlpha=0,this.depthFunc=Ws,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ba,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Mi&&(n.blending=this.blending),this.side!==Pn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ao&&(n.blendSrc=this.blendSrc),this.blendDst!==co&&(n.blendDst=this.blendDst),this.blendEquation!==kn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ws&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ba&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Ln extends Zn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Yc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const pt=new I,_s=new he;class en{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ta,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_s.fromBufferAttribute(this,t),_s.applyMatrix3(e),this.setXY(t,_s.x,_s.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix3(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyMatrix4(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.applyNormalMatrix(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)pt.fromBufferAttribute(this,t),pt.transformDirection(e),this.setXYZ(t,pt.x,pt.y,pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ii(t,this.array)),t}setX(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ii(t,this.array)),t}setY(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ii(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ii(t,this.array)),t}setW(e,t){return this.normalized&&(t=Lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Lt(t,this.array),n=Lt(n,this.array),s=Lt(s,this.array),r=Lt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ta&&(e.usage=this.usage),e}}class ul extends en{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class dl extends en{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class st extends en{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Nu=0;const Bt=new ct,zr=new St,ci=new I,Ut=new Ri,Oi=new Ri,xt=new I;class Pt extends Kn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Nu++}),this.uuid=Ci(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(ol(e)?dl:ul)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,n){return Bt.makeTranslation(e,t,n),this.applyMatrix4(Bt),this}scale(e,t,n){return Bt.makeScale(e,t,n),this.applyMatrix4(Bt),this}lookAt(e){return zr.lookAt(e),zr.updateMatrix(),this.applyMatrix4(zr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new st(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ri);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ut.setFromBufferAttribute(r),this.morphTargetsRelative?(xt.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(xt),xt.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(xt)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new sr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Oi.setFromBufferAttribute(o),this.morphTargetsRelative?(xt.addVectors(Ut.min,Oi.min),Ut.expandByPoint(xt),xt.addVectors(Ut.max,Oi.max),Ut.expandByPoint(xt)):(Ut.expandByPoint(Oi.min),Ut.expandByPoint(Oi.max))}Ut.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)xt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(xt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)xt.fromBufferAttribute(o,l),c&&(ci.fromBufferAttribute(e,l),xt.add(ci)),s=Math.max(s,n.distanceToSquared(xt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new en(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let T=0;T<o;T++)l[T]=new I,h[T]=new I;const d=new I,u=new I,f=new I,g=new he,_=new he,m=new he,p=new I,S=new I;function x(T,z,W){d.fromArray(s,T*3),u.fromArray(s,z*3),f.fromArray(s,W*3),g.fromArray(a,T*2),_.fromArray(a,z*2),m.fromArray(a,W*2),u.sub(d),f.sub(d),_.sub(g),m.sub(g);const re=1/(_.x*m.y-m.x*_.y);isFinite(re)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-_.y).multiplyScalar(re),S.copy(f).multiplyScalar(_.x).addScaledVector(u,-m.x).multiplyScalar(re),l[T].add(p),l[z].add(p),l[W].add(p),h[T].add(S),h[z].add(S),h[W].add(S))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let T=0,z=M.length;T<z;++T){const W=M[T],re=W.start,L=W.count;for(let O=re,B=re+L;O<B;O+=3)x(n[O+0],n[O+1],n[O+2])}const R=new I,w=new I,A=new I,F=new I;function E(T){A.fromArray(r,T*3),F.copy(A);const z=l[T];R.copy(z),R.sub(A.multiplyScalar(A.dot(z))).normalize(),w.crossVectors(F,z);const re=w.dot(h[T])<0?-1:1;c[T*4]=R.x,c[T*4+1]=R.y,c[T*4+2]=R.z,c[T*4+3]=re}for(let T=0,z=M.length;T<z;++T){const W=M[T],re=W.start,L=W.count;for(let O=re,B=re+L;O<B;O+=3)E(n[O+0]),E(n[O+1]),E(n[O+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new en(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const s=new I,r=new I,a=new I,o=new I,c=new I,l=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),_=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)xt.fromBufferAttribute(e,t),xt.normalize(),e.setXYZ(t,xt.x,xt.y,xt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new en(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Pt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ba=new ct,On=new rr,xs=new sr,ka=new I,li=new I,hi=new I,ui=new I,Br=new I,vs=new I,Ss=new he,Ms=new he,Es=new he,Ga=new I,Ha=new I,Va=new I,ys=new I,bs=new I;class it extends St{constructor(e=new Pt,t=new Ln){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){vs.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Br.fromBufferAttribute(d,e),a?vs.addScaledVector(Br,h):vs.addScaledVector(Br.sub(t),h))}t.add(vs)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),xs.copy(n.boundingSphere),xs.applyMatrix4(r),On.copy(e.ray).recast(e.near),!(xs.containsPoint(On.origin)===!1&&(On.intersectSphere(xs,ka)===null||On.origin.distanceToSquared(ka)>(e.far-e.near)**2))&&(Ba.copy(r).invert(),On.copy(e.ray).applyMatrix4(Ba),!(n.boundingBox!==null&&On.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,On)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,R=x;M<R;M+=3){const w=o.getX(M),A=o.getX(M+1),F=o.getX(M+2);s=Ts(this,p,e,n,l,h,d,w,A,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=o.getX(m),x=o.getX(m+1),M=o.getX(m+2);s=Ts(this,a,e,n,l,h,d,S,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=u.length;g<_;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let M=S,R=x;M<R;M+=3){const w=M,A=M+1,F=M+2;s=Ts(this,p,e,n,l,h,d,w,A,F),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,x=m+1,M=m+2;s=Ts(this,a,e,n,l,h,d,S,x,M),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function Uu(i,e,t,n,s,r,a,o){let c;if(e.side===It?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Pn,o),c===null)return null;bs.copy(o),bs.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(bs);return l<t.near||l>t.far?null:{distance:l,point:bs.clone(),object:i}}function Ts(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,li),i.getVertexPosition(c,hi),i.getVertexPosition(l,ui);const h=Uu(i,e,t,n,li,hi,ui,ys);if(h){s&&(Ss.fromBufferAttribute(s,o),Ms.fromBufferAttribute(s,c),Es.fromBufferAttribute(s,l),h.uv=Gt.getInterpolation(ys,li,hi,ui,Ss,Ms,Es,new he)),r&&(Ss.fromBufferAttribute(r,o),Ms.fromBufferAttribute(r,c),Es.fromBufferAttribute(r,l),h.uv1=Gt.getInterpolation(ys,li,hi,ui,Ss,Ms,Es,new he),h.uv2=h.uv1),a&&(Ga.fromBufferAttribute(a,o),Ha.fromBufferAttribute(a,c),Va.fromBufferAttribute(a,l),h.normal=Gt.getInterpolation(ys,li,hi,ui,Ga,Ha,Va,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new I,materialIndex:0};Gt.getNormal(li,hi,ui,d.normal),h.face=d}return h}class Jn extends Pt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new st(l,3)),this.setAttribute("normal",new st(h,3)),this.setAttribute("uv",new st(d,2));function g(_,m,p,S,x,M,R,w,A,F,E){const T=M/A,z=R/F,W=M/2,re=R/2,L=w/2,O=A+1,B=F+1;let Y=0,j=0;const K=new I;for(let Z=0;Z<B;Z++){const ae=Z*z-re;for(let ue=0;ue<O;ue++){const V=ue*T-W;K[_]=V*S,K[m]=ae*x,K[p]=L,l.push(K.x,K.y,K.z),K[_]=0,K[m]=0,K[p]=w>0?1:-1,h.push(K.x,K.y,K.z),d.push(ue/A),d.push(1-Z/F),Y+=1}}for(let Z=0;Z<F;Z++)for(let ae=0;ae<A;ae++){const ue=u+ae+O*Z,V=u+ae+O*(Z+1),te=u+(ae+1)+O*(Z+1),_e=u+(ae+1)+O*Z;c.push(ue,V,_e),c.push(V,te,_e),j+=6}o.addGroup(f,j,E),f+=j,u+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function wi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Ct(i){const e={};for(let t=0;t<i.length;t++){const n=wi(i[t]);for(const s in n)e[s]=n[s]}return e}function Ou(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function fl(i){return i.getRenderTarget()===null?i.outputColorSpace:et.workingColorSpace}const Fu={clone:wi,merge:Ct};var zu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Yn extends Zn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zu,this.fragmentShader=Bu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=wi(e.uniforms),this.uniformsGroups=Ou(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class pl extends St{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=fn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class qt extends pl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=mo*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Hi*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return mo*2*Math.atan(Math.tan(Hi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Hi*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const di=-90,fi=1;class ku extends St{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qt(di,fi,e,t);s.layers=this.layers,this.add(s);const r=new qt(di,fi,e,t);r.layers=this.layers,this.add(r);const a=new qt(di,fi,e,t);a.layers=this.layers,this.add(a);const o=new qt(di,fi,e,t);o.layers=this.layers,this.add(o);const c=new qt(di,fi,e,t);c.layers=this.layers,this.add(c);const l=new qt(di,fi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===fn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Ys)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ml extends Ft{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:bi,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Gu extends Xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(Vi("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Wn?Mt:Vt),this.texture=new ml(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:kt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Jn(5,5,5),r=new Yn({name:"CubemapFromEquirect",uniforms:wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:wn});r.uniforms.tEquirect.value=t;const a=new it(s,r),o=t.minFilter;return t.minFilter===ji&&(t.minFilter=kt),new ku(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const kr=new I,Hu=new I,Vu=new qe;class En{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=kr.subVectors(n,t).cross(Hu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(kr),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Vu.getNormalMatrix(e),s=this.coplanarPoint(kr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fn=new sr,As=new I;class Ao{constructor(e=new En,t=new En,n=new En,s=new En,r=new En,a=new En){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=fn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],d=s[6],u=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],S=s[13],x=s[14],M=s[15];if(n[0].setComponents(c-r,u-l,m-f,M-p).normalize(),n[1].setComponents(c+r,u+l,m+f,M+p).normalize(),n[2].setComponents(c+a,u+h,m+g,M+S).normalize(),n[3].setComponents(c-a,u-h,m-g,M-S).normalize(),n[4].setComponents(c-o,u-d,m-_,M-x).normalize(),t===fn)n[5].setComponents(c+o,u+d,m+_,M+x).normalize();else if(t===Ys)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Fn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Fn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Fn)}intersectsSprite(e){return Fn.center.set(0,0,0),Fn.radius=.7071067811865476,Fn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Fn)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(As.x=s.normal.x>0?e.max.x:e.min.x,As.y=s.normal.y>0?e.max.y:e.min.y,As.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(As)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function gl(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Wu(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,h){const d=l.array,u=l.usage,f=d.byteLength,g=i.createBuffer();i.bindBuffer(h,g),i.bufferData(h,d,u),l.onUploadCallback();let _;if(d instanceof Float32Array)_=i.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)_=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else _=i.UNSIGNED_SHORT;else if(d instanceof Int16Array)_=i.SHORT;else if(d instanceof Uint32Array)_=i.UNSIGNED_INT;else if(d instanceof Int32Array)_=i.INT;else if(d instanceof Int8Array)_=i.BYTE;else if(d instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:_,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(i.bindBuffer(d,l),f.count===-1&&g.length===0&&i.bufferSubData(d,0,u),g.length!==0){for(let _=0,m=g.length;_<m;_++){const p=g[_];t?i.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):i.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(t?i.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):i.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(i.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const u=n.get(l);(!u||u.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=n.get(l);if(d===void 0)n.set(l,s(l,h));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,l,h),d.version=l.version}}return{get:a,remove:o,update:c}}class ar extends Pt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const S=p*u-a;for(let x=0;x<l;x++){const M=x*d-r;g.push(M,-S,0),_.push(0,0,1),m.push(x/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){const x=S+l*p,M=S+l*(p+1),R=S+1+l*(p+1),w=S+1+l*p;f.push(x,M,w),f.push(M,R,w)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ar(e.width,e.height,e.widthSegments,e.heightSegments)}}var $u=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Xu=`#ifdef USE_ALPHAHASH
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
#endif`,qu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Yu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ju=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,Ku=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Zu=`#ifdef USE_AOMAP
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
#endif`,Ju=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Qu=`#ifdef USE_BATCHING
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
#endif`,ed=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,td=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,id=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sd=`#ifdef USE_IRIDESCENCE
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
#endif`,rd=`#ifdef USE_BUMPMAP
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
#endif`,od=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,ad=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ld=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ud=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,fd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,pd=`#define PI 3.141592653589793
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
} // validated`,md=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gd=`vec3 transformedNormal = objectNormal;
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
#endif`,_d=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,vd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Md="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ed=`
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
}`,yd=`#ifdef USE_ENVMAP
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
#endif`,bd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Td=`#ifdef USE_ENVMAP
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
#endif`,Ad=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,wd=`#ifdef USE_ENVMAP
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
#endif`,Cd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Pd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ld=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Id=`#ifdef USE_GRADIENTMAP
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
}`,Dd=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Nd=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ud=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Od=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Fd=`uniform bool receiveShadow;
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
#endif`,zd=`#ifdef USE_ENVMAP
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
#endif`,Bd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Vd=`PhysicalMaterial material;
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
#endif`,Wd=`struct PhysicalMaterial {
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
}`,$d=`
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
#endif`,Xd=`#if defined( RE_IndirectDiffuse )
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
#endif`,qd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Yd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jd=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,Zd=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,Jd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ef=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,tf=`#if defined( USE_POINTS_UV )
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
#endif`,nf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rf=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,of=`#ifdef USE_MORPHNORMALS
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
#endif`,af=`#ifdef USE_MORPHTARGETS
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
#endif`,cf=`#ifdef USE_MORPHTARGETS
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
#endif`,lf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,hf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,df=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ff=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,pf=`#ifdef USE_NORMALMAP
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
#endif`,mf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_f=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,xf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Mf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ef=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,yf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,bf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Tf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,wf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Cf=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Rf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Pf=`float getShadowMask() {
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
}`,Lf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,If=`#ifdef USE_SKINNING
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
#endif`,Df=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Nf=`#ifdef USE_SKINNING
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
#endif`,Uf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Of=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ff=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,zf=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Bf=`#ifdef USE_TRANSMISSION
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
#endif`,kf=`#ifdef USE_TRANSMISSION
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
#endif`,Gf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $f=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Xf=`uniform sampler2D t2D;
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
}`,qf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Yf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,jf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Kf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zf=`#include <common>
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
}`,Jf=`#if DEPTH_PACKING == 3200
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
}`,Qf=`#define DISTANCE
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
}`,ep=`#define DISTANCE
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
}`,tp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,np=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ip=`uniform float scale;
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
}`,sp=`uniform vec3 diffuse;
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
}`,rp=`#include <common>
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
}`,op=`uniform vec3 diffuse;
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
}`,ap=`#define LAMBERT
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
}`,cp=`#define LAMBERT
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
}`,lp=`#define MATCAP
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
}`,hp=`#define MATCAP
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
}`,up=`#define NORMAL
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
}`,dp=`#define NORMAL
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
}`,fp=`#define PHONG
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
}`,pp=`#define PHONG
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
}`,mp=`#define STANDARD
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
}`,gp=`#define STANDARD
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
}`,_p=`#define TOON
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
}`,xp=`#define TOON
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
}`,vp=`uniform float size;
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
}`,Sp=`uniform vec3 diffuse;
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
}`,Mp=`#include <common>
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
}`,Ep=`uniform vec3 color;
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
}`,yp=`uniform float rotation;
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
}`,bp=`uniform vec3 diffuse;
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
}`,Ve={alphahash_fragment:$u,alphahash_pars_fragment:Xu,alphamap_fragment:qu,alphamap_pars_fragment:Yu,alphatest_fragment:ju,alphatest_pars_fragment:Ku,aomap_fragment:Zu,aomap_pars_fragment:Ju,batching_pars_vertex:Qu,batching_vertex:ed,begin_vertex:td,beginnormal_vertex:nd,bsdfs:id,iridescence_fragment:sd,bumpmap_pars_fragment:rd,clipping_planes_fragment:od,clipping_planes_pars_fragment:ad,clipping_planes_pars_vertex:cd,clipping_planes_vertex:ld,color_fragment:hd,color_pars_fragment:ud,color_pars_vertex:dd,color_vertex:fd,common:pd,cube_uv_reflection_fragment:md,defaultnormal_vertex:gd,displacementmap_pars_vertex:_d,displacementmap_vertex:xd,emissivemap_fragment:vd,emissivemap_pars_fragment:Sd,colorspace_fragment:Md,colorspace_pars_fragment:Ed,envmap_fragment:yd,envmap_common_pars_fragment:bd,envmap_pars_fragment:Td,envmap_pars_vertex:Ad,envmap_physical_pars_fragment:zd,envmap_vertex:wd,fog_vertex:Cd,fog_pars_vertex:Rd,fog_fragment:Pd,fog_pars_fragment:Ld,gradientmap_pars_fragment:Id,lightmap_fragment:Dd,lightmap_pars_fragment:Nd,lights_lambert_fragment:Ud,lights_lambert_pars_fragment:Od,lights_pars_begin:Fd,lights_toon_fragment:Bd,lights_toon_pars_fragment:kd,lights_phong_fragment:Gd,lights_phong_pars_fragment:Hd,lights_physical_fragment:Vd,lights_physical_pars_fragment:Wd,lights_fragment_begin:$d,lights_fragment_maps:Xd,lights_fragment_end:qd,logdepthbuf_fragment:Yd,logdepthbuf_pars_fragment:jd,logdepthbuf_pars_vertex:Kd,logdepthbuf_vertex:Zd,map_fragment:Jd,map_pars_fragment:Qd,map_particle_fragment:ef,map_particle_pars_fragment:tf,metalnessmap_fragment:nf,metalnessmap_pars_fragment:sf,morphcolor_vertex:rf,morphnormal_vertex:of,morphtarget_pars_vertex:af,morphtarget_vertex:cf,normal_fragment_begin:lf,normal_fragment_maps:hf,normal_pars_fragment:uf,normal_pars_vertex:df,normal_vertex:ff,normalmap_pars_fragment:pf,clearcoat_normal_fragment_begin:mf,clearcoat_normal_fragment_maps:gf,clearcoat_pars_fragment:_f,iridescence_pars_fragment:xf,opaque_fragment:vf,packing:Sf,premultiplied_alpha_fragment:Mf,project_vertex:Ef,dithering_fragment:yf,dithering_pars_fragment:bf,roughnessmap_fragment:Tf,roughnessmap_pars_fragment:Af,shadowmap_pars_fragment:wf,shadowmap_pars_vertex:Cf,shadowmap_vertex:Rf,shadowmask_pars_fragment:Pf,skinbase_vertex:Lf,skinning_pars_vertex:If,skinning_vertex:Df,skinnormal_vertex:Nf,specularmap_fragment:Uf,specularmap_pars_fragment:Of,tonemapping_fragment:Ff,tonemapping_pars_fragment:zf,transmission_fragment:Bf,transmission_pars_fragment:kf,uv_pars_fragment:Gf,uv_pars_vertex:Hf,uv_vertex:Vf,worldpos_vertex:Wf,background_vert:$f,background_frag:Xf,backgroundCube_vert:qf,backgroundCube_frag:Yf,cube_vert:jf,cube_frag:Kf,depth_vert:Zf,depth_frag:Jf,distanceRGBA_vert:Qf,distanceRGBA_frag:ep,equirect_vert:tp,equirect_frag:np,linedashed_vert:ip,linedashed_frag:sp,meshbasic_vert:rp,meshbasic_frag:op,meshlambert_vert:ap,meshlambert_frag:cp,meshmatcap_vert:lp,meshmatcap_frag:hp,meshnormal_vert:up,meshnormal_frag:dp,meshphong_vert:fp,meshphong_frag:pp,meshphysical_vert:mp,meshphysical_frag:gp,meshtoon_vert:_p,meshtoon_frag:xp,points_vert:vp,points_frag:Sp,shadow_vert:Mp,shadow_frag:Ep,sprite_vert:yp,sprite_frag:bp},pe={common:{diffuse:{value:new Je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new Je(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},Jt={basic:{uniforms:Ct([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Ct([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Ct([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Je(0)},specular:{value:new Je(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Ct([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Ct([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Je(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Ct([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Ct([pe.points,pe.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Ct([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Ct([pe.common,pe.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Ct([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Ct([pe.sprite,pe.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Ct([pe.common,pe.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Ct([pe.lights,pe.fog,{color:{value:new Je(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};Jt.physical={uniforms:Ct([Jt.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new Je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new Je(0)},specularColor:{value:new Je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const ws={r:0,b:0,g:0};function Tp(i,e,t,n,s,r,a){const o=new Je(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(m,p){let S=!1,x=p.isScene===!0?p.background:null;x&&x.isTexture&&(x=(p.backgroundBlurriness>0?t:e).get(x)),x===null?_(o,c):x&&x.isColor&&(_(x,1),S=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||S)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),x&&(x.isCubeTexture||x.mapping===nr)?(h===void 0&&(h=new it(new Jn(1,1,1),new Yn({name:"BackgroundCubeMaterial",uniforms:wi(Jt.backgroundCube.uniforms),vertexShader:Jt.backgroundCube.vertexShader,fragmentShader:Jt.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,w,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=et.getTransfer(x.colorSpace)!==nt,(d!==x||u!==x.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new it(new ar(2,2),new Yn({name:"BackgroundMaterial",uniforms:wi(Jt.background.uniforms),vertexShader:Jt.background.vertexShader,fragmentShader:Jt.background.fragmentShader,side:Pn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=et.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||u!==x.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,d=x,u=x.version,f=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,p){m.getRGB(ws,fl(i)),n.buffers.color.setClear(ws.r,ws.g,ws.b,p,a)}return{getClearColor:function(){return o},setClearColor:function(m,p=1){o.set(m),c=p,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:g}}function Ap(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null);let l=c,h=!1;function d(L,O,B,Y,j){let K=!1;if(a){const Z=_(Y,B,O);l!==Z&&(l=Z,f(l.object)),K=p(L,Y,B,j),K&&S(L,Y,B,j)}else{const Z=O.wireframe===!0;(l.geometry!==Y.id||l.program!==B.id||l.wireframe!==Z)&&(l.geometry=Y.id,l.program=B.id,l.wireframe=Z,K=!0)}j!==null&&t.update(j,i.ELEMENT_ARRAY_BUFFER),(K||h)&&(h=!1,F(L,O,B,Y),j!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(j).buffer))}function u(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function f(L){return n.isWebGL2?i.bindVertexArray(L):r.bindVertexArrayOES(L)}function g(L){return n.isWebGL2?i.deleteVertexArray(L):r.deleteVertexArrayOES(L)}function _(L,O,B){const Y=B.wireframe===!0;let j=o[L.id];j===void 0&&(j={},o[L.id]=j);let K=j[O.id];K===void 0&&(K={},j[O.id]=K);let Z=K[Y];return Z===void 0&&(Z=m(u()),K[Y]=Z),Z}function m(L){const O=[],B=[],Y=[];for(let j=0;j<s;j++)O[j]=0,B[j]=0,Y[j]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:B,attributeDivisors:Y,object:L,attributes:{},index:null}}function p(L,O,B,Y){const j=l.attributes,K=O.attributes;let Z=0;const ae=B.getAttributes();for(const ue in ae)if(ae[ue].location>=0){const te=j[ue];let _e=K[ue];if(_e===void 0&&(ue==="instanceMatrix"&&L.instanceMatrix&&(_e=L.instanceMatrix),ue==="instanceColor"&&L.instanceColor&&(_e=L.instanceColor)),te===void 0||te.attribute!==_e||_e&&te.data!==_e.data)return!0;Z++}return l.attributesNum!==Z||l.index!==Y}function S(L,O,B,Y){const j={},K=O.attributes;let Z=0;const ae=B.getAttributes();for(const ue in ae)if(ae[ue].location>=0){let te=K[ue];te===void 0&&(ue==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),ue==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const _e={};_e.attribute=te,te&&te.data&&(_e.data=te.data),j[ue]=_e,Z++}l.attributes=j,l.attributesNum=Z,l.index=Y}function x(){const L=l.newAttributes;for(let O=0,B=L.length;O<B;O++)L[O]=0}function M(L){R(L,0)}function R(L,O){const B=l.newAttributes,Y=l.enabledAttributes,j=l.attributeDivisors;B[L]=1,Y[L]===0&&(i.enableVertexAttribArray(L),Y[L]=1),j[L]!==O&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](L,O),j[L]=O)}function w(){const L=l.newAttributes,O=l.enabledAttributes;for(let B=0,Y=O.length;B<Y;B++)O[B]!==L[B]&&(i.disableVertexAttribArray(B),O[B]=0)}function A(L,O,B,Y,j,K,Z){Z===!0?i.vertexAttribIPointer(L,O,B,j,K):i.vertexAttribPointer(L,O,B,Y,j,K)}function F(L,O,B,Y){if(n.isWebGL2===!1&&(L.isInstancedMesh||Y.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;x();const j=Y.attributes,K=B.getAttributes(),Z=O.defaultAttributeValues;for(const ae in K){const ue=K[ae];if(ue.location>=0){let V=j[ae];if(V===void 0&&(ae==="instanceMatrix"&&L.instanceMatrix&&(V=L.instanceMatrix),ae==="instanceColor"&&L.instanceColor&&(V=L.instanceColor)),V!==void 0){const te=V.normalized,_e=V.itemSize,Ae=t.get(V);if(Ae===void 0)continue;const Ee=Ae.buffer,De=Ae.type,Fe=Ae.bytesPerElement,Te=n.isWebGL2===!0&&(De===i.INT||De===i.UNSIGNED_INT||V.gpuType===Kc);if(V.isInterleavedBufferAttribute){const Oe=V.data,P=Oe.stride,fe=V.offset;if(Oe.isInstancedInterleavedBuffer){for(let X=0;X<ue.locationSize;X++)R(ue.location+X,Oe.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Oe.meshPerAttribute*Oe.count)}else for(let X=0;X<ue.locationSize;X++)M(ue.location+X);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let X=0;X<ue.locationSize;X++)A(ue.location+X,_e/ue.locationSize,De,te,P*Fe,(fe+_e/ue.locationSize*X)*Fe,Te)}else{if(V.isInstancedBufferAttribute){for(let Oe=0;Oe<ue.locationSize;Oe++)R(ue.location+Oe,V.meshPerAttribute);L.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let Oe=0;Oe<ue.locationSize;Oe++)M(ue.location+Oe);i.bindBuffer(i.ARRAY_BUFFER,Ee);for(let Oe=0;Oe<ue.locationSize;Oe++)A(ue.location+Oe,_e/ue.locationSize,De,te,_e*Fe,_e/ue.locationSize*Oe*Fe,Te)}}else if(Z!==void 0){const te=Z[ae];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(ue.location,te);break;case 3:i.vertexAttrib3fv(ue.location,te);break;case 4:i.vertexAttrib4fv(ue.location,te);break;default:i.vertexAttrib1fv(ue.location,te)}}}}w()}function E(){W();for(const L in o){const O=o[L];for(const B in O){const Y=O[B];for(const j in Y)g(Y[j].object),delete Y[j];delete O[B]}delete o[L]}}function T(L){if(o[L.id]===void 0)return;const O=o[L.id];for(const B in O){const Y=O[B];for(const j in Y)g(Y[j].object),delete Y[j];delete O[B]}delete o[L.id]}function z(L){for(const O in o){const B=o[O];if(B[L.id]===void 0)continue;const Y=B[L.id];for(const j in Y)g(Y[j].object),delete Y[j];delete B[L.id]}}function W(){re(),h=!0,l!==c&&(l=c,f(l.object))}function re(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:W,resetDefaultState:re,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:z,initAttributes:x,enableAttribute:M,disableUnusedAttributes:w}}function wp(i,e,t,n){const s=n.isWebGL2;let r;function a(h){r=h}function o(h,d){i.drawArrays(r,h,d),t.update(d,r,1)}function c(h,d,u){if(u===0)return;let f,g;if(s)f=i,g="drawArraysInstanced";else if(f=e.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,d,u),t.update(d,r,u)}function l(h,d,u){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=d[_];t.update(g,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Cp(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),h=t.logarithmicDepthBuffer===!0,d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),u=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),_=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),p=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),x=u>0,M=a||e.has("OES_texture_float"),R=x&&M,w=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:S,vertexTextures:x,floatFragmentTextures:M,floatVertexTextures:R,maxSamples:w}}function Rp(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new En,o=new qe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||s;return s=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,_=d.clipIntersection,m=d.clipShadows,p=i.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const S=r?0:n,x=S*4;let M=p.clippingState||null;c.value=M,M=h(g,u,x,f);for(let R=0;R!==x;++R)M[R]=t[R];p.clippingState=M,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const _=d!==null?d.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,M=f;x!==_;++x,M+=4)a.copy(d[x]).applyMatrix4(S,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function Pp(i){let e=new WeakMap;function t(a,o){return o===lo?a.mapping=bi:o===ho&&(a.mapping=Ti),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===lo||o===ho)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new Gu(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class wo extends pl{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const xi=4,Wa=[.125,.215,.35,.446,.526,.582],Gn=20,Gr=new wo,$a=new Je;let Hr=null,Vr=0,Wr=0;const zn=(1+Math.sqrt(5))/2,pi=1/zn,Xa=[new I(1,1,1),new I(-1,1,1),new I(1,1,-1),new I(-1,1,-1),new I(0,zn,pi),new I(0,zn,-pi),new I(pi,0,zn),new I(-pi,0,zn),new I(zn,pi,0),new I(-zn,pi,0)];class qa{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Hr=this._renderer.getRenderTarget(),Vr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ka(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ja(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Hr,Vr,Wr),e.scissorTest=!1,Cs(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bi||e.mapping===Ti?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Hr=this._renderer.getRenderTarget(),Vr=this._renderer.getActiveCubeFace(),Wr=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:kt,minFilter:kt,generateMipmaps:!1,type:Ki,format:jt,colorSpace:mn,depthBuffer:!1},s=Ya(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ya(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Lp(r)),this._blurMaterial=Ip(r,e,t)}return s}_compileMaterial(e){const t=new it(this._lodPlanes[0],e);this._renderer.compile(t,Gr)}_sceneToCubeUV(e,t,n,s){const o=new qt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor($a),h.toneMapping=Cn,h.autoClear=!1;const f=new Ln({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),g=new it(new Jn,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy($a),_=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):S===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const x=this._cubeSize;Cs(s,S*x,p>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===bi||e.mapping===Ti;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ka()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ja());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new it(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Cs(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Gr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Xa[(s-1)%Xa.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new it(this._lodPlanes[s],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Gn-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Gn;m>Gn&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Gn}`);const p=[];let S=0;for(let A=0;A<Gn;++A){const F=A/_,E=Math.exp(-F*F/2);p.push(E),A===0?S+=E:A<m&&(S+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const M=this._sizeLods[s],R=3*M*(s>x-xi?s-x+xi:0),w=4*(this._cubeSize-M);Cs(t,R,w,3*M,2*M),c.setRenderTarget(t),c.render(d,Gr)}}function Lp(i){const e=[],t=[],n=[];let s=i;const r=i-xi+1+Wa.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-xi?c=Wa[a-i+xi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),x=new Float32Array(m*g*f),M=new Float32Array(p*g*f);for(let w=0;w<f;w++){const A=w%3*2/3-1,F=w>2?0:-1,E=[A,F,0,A+2/3,F,0,A+2/3,F+1,0,A,F,0,A+2/3,F+1,0,A,F+1,0];S.set(E,_*g*w),x.set(u,m*g*w);const T=[w,w,w,w,w,w];M.set(T,p*g*w)}const R=new Pt;R.setAttribute("position",new en(S,_)),R.setAttribute("uv",new en(x,m)),R.setAttribute("faceIndex",new en(M,p)),e.push(R),s>xi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ya(i,e,t){const n=new Xn(i,e,t);return n.texture.mapping=nr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Cs(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Ip(i,e,t){const n=new Float32Array(Gn),s=new I(0,1,0);return new Yn({name:"SphericalGaussianBlur",defines:{n:Gn,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Co(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function ja(){return new Yn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Co(),fragmentShader:`

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
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Ka(){return new Yn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Co(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:wn,depthTest:!1,depthWrite:!1})}function Co(){return`

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
	`}function Dp(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===lo||c===ho,h=c===bi||c===Ti;if(l||h)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let d=e.get(o);return t===null&&(t=new qa(i)),d=l?t.fromEquirectangular(o,d):t.fromCubemap(o,d),e.set(o,d),d.texture}else{if(e.has(o))return e.get(o).texture;{const d=o.image;if(l&&d&&d.height>0||h&&d&&s(d)){t===null&&(t=new qa(i));const u=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,u),o.addEventListener("dispose",r),u.texture}else return null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Np(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?(t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance")):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Up(i,e,t,n){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)e.update(u[g],i.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let x=0,M=S.length;x<M;x+=3){const R=S[x+0],w=S[x+1],A=S[x+2];u.push(R,w,w,A,A,R)}}else if(g!==void 0){const S=g.array;_=g.version;for(let x=0,M=S.length/3-1;x<M;x+=3){const R=x+0,w=x+1,A=x+2;u.push(R,w,w,A,A,R)}}else return;const m=new(ol(u)?dl:ul)(u,1);m.version=_;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Op(i,e,t,n){const s=n.isWebGL2;let r;function a(f){r=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function h(f,g){i.drawElements(r,g,o,f*c),t.update(g,r,1)}function d(f,g,_){if(_===0)return;let m,p;if(s)m=i,p="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,o,f*c,_),t.update(g,r,_)}function u(f,g,_){if(_===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<_;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,o,f,0,_);let p=0;for(let S=0;S<_;S++)p+=g[S];t.update(p,r,1)}}this.setMode=a,this.setIndex=l,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function Fp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function zp(i,e){return i[0]-e[0]}function Bp(i,e){return Math.abs(e[1])-Math.abs(i[1])}function kp(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new vt,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,h,d){const u=l.morphTargetInfluences;if(e.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==_){let O=function(){re.dispose(),r.delete(h),h.removeEventListener("dispose",O)};var f=O;m!==void 0&&m.texture.dispose();const x=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,R=h.morphAttributes.color!==void 0,w=h.morphAttributes.position||[],A=h.morphAttributes.normal||[],F=h.morphAttributes.color||[];let E=0;x===!0&&(E=1),M===!0&&(E=2),R===!0&&(E=3);let T=h.attributes.position.count*E,z=1;T>e.maxTextureSize&&(z=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const W=new Float32Array(T*z*4*_),re=new ll(W,T,z,_);re.type=bn,re.needsUpdate=!0;const L=E*4;for(let B=0;B<_;B++){const Y=w[B],j=A[B],K=F[B],Z=T*z*4*B;for(let ae=0;ae<Y.count;ae++){const ue=ae*L;x===!0&&(a.fromBufferAttribute(Y,ae),W[Z+ue+0]=a.x,W[Z+ue+1]=a.y,W[Z+ue+2]=a.z,W[Z+ue+3]=0),M===!0&&(a.fromBufferAttribute(j,ae),W[Z+ue+4]=a.x,W[Z+ue+5]=a.y,W[Z+ue+6]=a.z,W[Z+ue+7]=0),R===!0&&(a.fromBufferAttribute(K,ae),W[Z+ue+8]=a.x,W[Z+ue+9]=a.y,W[Z+ue+10]=a.z,W[Z+ue+11]=K.itemSize===4?a.w:1)}}m={count:_,texture:re,size:new he(T,z)},r.set(h,m),h.addEventListener("dispose",O)}let p=0;for(let x=0;x<u.length;x++)p+=u[x];const S=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(i,"morphTargetBaseInfluence",S),d.getUniforms().setValue(i,"morphTargetInfluences",u),d.getUniforms().setValue(i,"morphTargetsTexture",m.texture,t),d.getUniforms().setValue(i,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let _=n[h.id];if(_===void 0||_.length!==g){_=[];for(let M=0;M<g;M++)_[M]=[M,0];n[h.id]=_}for(let M=0;M<g;M++){const R=_[M];R[0]=M,R[1]=u[M]}_.sort(Bp);for(let M=0;M<8;M++)M<g&&_[M][1]?(o[M][0]=_[M][0],o[M][1]=_[M][1]):(o[M][0]=Number.MAX_SAFE_INTEGER,o[M][1]=0);o.sort(zp);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let S=0;for(let M=0;M<8;M++){const R=o[M],w=R[0],A=R[1];w!==Number.MAX_SAFE_INTEGER&&A?(m&&h.getAttribute("morphTarget"+M)!==m[w]&&h.setAttribute("morphTarget"+M,m[w]),p&&h.getAttribute("morphNormal"+M)!==p[w]&&h.setAttribute("morphNormal"+M,p[w]),s[M]=A,S+=A):(m&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),p&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),s[M]=0)}const x=h.morphTargetsRelative?1:1-S;d.getUniforms().setValue(i,"morphTargetBaseInfluence",x),d.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Gp(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;s.get(u)!==l&&(u.update(),s.set(u,l))}return d}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class _l extends Ft{constructor(e,t,n,s,r,a,o,c,l,h){if(h=h!==void 0?h:Vn,h!==Vn&&h!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Vn&&(n=yn),n===void 0&&h===Ai&&(n=Hn),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Rt,this.minFilter=c!==void 0?c:Rt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const xl=new Ft,vl=new _l(1,1);vl.compareFunction=rl;const Sl=new ll,Ml=new bu,El=new ml,Za=[],Ja=[],Qa=new Float32Array(16),ec=new Float32Array(9),tc=new Float32Array(4);function Pi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Za[s];if(r===void 0&&(r=new Float32Array(s),Za[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function cr(i,e){let t=Ja[e];t===void 0&&(t=new Int32Array(e),Ja[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Hp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function Xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;tc.set(n),i.uniformMatrix2fv(this.addr,!1,tc),gt(t,n)}}function qp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;ec.set(n),i.uniformMatrix3fv(this.addr,!1,ec),gt(t,n)}}function Yp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Qa.set(n),i.uniformMatrix4fv(this.addr,!1,Qa),gt(t,n)}}function jp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function Jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Qp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function im(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?vl:xl;t.setTexture2D(e||r,s)}function sm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Ml,s)}function rm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||El,s)}function om(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Sl,s)}function am(i){switch(i){case 5126:return Hp;case 35664:return Vp;case 35665:return Wp;case 35666:return $p;case 35674:return Xp;case 35675:return qp;case 35676:return Yp;case 5124:case 35670:return jp;case 35667:case 35671:return Kp;case 35668:case 35672:return Zp;case 35669:case 35673:return Jp;case 5125:return Qp;case 36294:return em;case 36295:return tm;case 36296:return nm;case 35678:case 36198:case 36298:case 36306:case 35682:return im;case 35679:case 36299:case 36307:return sm;case 35680:case 36300:case 36308:case 36293:return rm;case 36289:case 36303:case 36311:case 36292:return om}}function cm(i,e){i.uniform1fv(this.addr,e)}function lm(i,e){const t=Pi(e,this.size,2);i.uniform2fv(this.addr,t)}function hm(i,e){const t=Pi(e,this.size,3);i.uniform3fv(this.addr,t)}function um(i,e){const t=Pi(e,this.size,4);i.uniform4fv(this.addr,t)}function dm(i,e){const t=Pi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function fm(i,e){const t=Pi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function pm(i,e){const t=Pi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function mm(i,e){i.uniform1iv(this.addr,e)}function gm(i,e){i.uniform2iv(this.addr,e)}function _m(i,e){i.uniform3iv(this.addr,e)}function xm(i,e){i.uniform4iv(this.addr,e)}function vm(i,e){i.uniform1uiv(this.addr,e)}function Sm(i,e){i.uniform2uiv(this.addr,e)}function Mm(i,e){i.uniform3uiv(this.addr,e)}function Em(i,e){i.uniform4uiv(this.addr,e)}function ym(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||xl,r[a])}function bm(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Ml,r[a])}function Tm(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||El,r[a])}function Am(i,e,t){const n=this.cache,s=e.length,r=cr(t,s);mt(n,r)||(i.uniform1iv(this.addr,r),gt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Sl,r[a])}function wm(i){switch(i){case 5126:return cm;case 35664:return lm;case 35665:return hm;case 35666:return um;case 35674:return dm;case 35675:return fm;case 35676:return pm;case 5124:case 35670:return mm;case 35667:case 35671:return gm;case 35668:case 35672:return _m;case 35669:case 35673:return xm;case 5125:return vm;case 36294:return Sm;case 36295:return Mm;case 36296:return Em;case 35678:case 36198:case 36298:case 36306:case 35682:return ym;case 35679:case 36299:case 36307:return bm;case 35680:case 36300:case 36308:case 36293:return Tm;case 36289:case 36303:case 36311:case 36292:return Am}}class Cm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=am(t.type)}}class Rm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=wm(t.type)}}class Pm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const $r=/(\w+)(\])?(\[|\.)?/g;function nc(i,e){i.seq.push(e),i.map[e.id]=e}function Lm(i,e,t){const n=i.name,s=n.length;for($r.lastIndex=0;;){const r=$r.exec(n),a=$r.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){nc(t,l===void 0?new Cm(o,i,e):new Rm(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new Pm(o),nc(t,d)),t=d}}}class ks{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);Lm(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function ic(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Im=37297;let Dm=0;function Nm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Um(i){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i);let n;switch(e===t?n="":e===qs&&t===Xs?n="LinearDisplayP3ToLinearSRGB":e===Xs&&t===qs&&(n="LinearSRGBToLinearDisplayP3"),i){case mn:case ir:return[n,"LinearTransferOETF"];case Mt:case bo:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function sc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+Nm(i.getShaderSource(e),a)}else return s}function Om(i,e){const t=Um(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function Fm(i,e){let t;switch(e){case Xh:t="Linear";break;case qh:t="Reinhard";break;case Yh:t="OptimizedCineon";break;case jh:t="ACESFilmic";break;case Zh:t="AgX";break;case Kh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function zm(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(vi).join(`
`)}function Bm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(vi).join(`
`)}function km(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Gm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function vi(i){return i!==""}function rc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function oc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Hm=/^[ \t]*#include +<([\w\d./]+)>/gm;function _o(i){return i.replace(Hm,Wm)}const Vm=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Wm(i,e){let t=Ve[e];if(t===void 0){const n=Vm.get(e);if(n!==void 0)t=Ve[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return _o(t)}const $m=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ac(i){return i.replace($m,Xm)}function Xm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cc(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function qm(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===qc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Sh?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===un&&(e="SHADOWMAP_TYPE_VSM"),e}function Ym(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bi:case Ti:e="ENVMAP_TYPE_CUBE";break;case nr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function jm(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ti:e="ENVMAP_MODE_REFRACTION";break}return e}function Km(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Yc:e="ENVMAP_BLENDING_MULTIPLY";break;case Wh:e="ENVMAP_BLENDING_MIX";break;case $h:e="ENVMAP_BLENDING_ADD";break}return e}function Zm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Jm(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=qm(t),l=Ym(t),h=jm(t),d=Km(t),u=Zm(t),f=t.isWebGL2?"":zm(t),g=Bm(t),_=km(r),m=s.createProgram();let p,S,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(vi).join(`
`),p.length>0&&(p+=`
`),S=[f,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(vi).join(`
`),S.length>0&&(S+=`
`)):(p=[cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vi).join(`
`),S=[f,cc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Cn?"#define TONE_MAPPING":"",t.toneMapping!==Cn?Ve.tonemapping_pars_fragment:"",t.toneMapping!==Cn?Fm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,Om("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(vi).join(`
`)),a=_o(a),a=rc(a,t),a=oc(a,t),o=_o(o),o=rc(o,t),o=oc(o,t),a=ac(a),o=ac(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,S=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===Aa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Aa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+S);const M=x+p+a,R=x+S+o,w=ic(s,s.VERTEX_SHADER,M),A=ic(s,s.FRAGMENT_SHADER,R);s.attachShader(m,w),s.attachShader(m,A),t.index0AttributeName!==void 0?s.bindAttribLocation(m,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function F(W){if(i.debug.checkShaderErrors){const re=s.getProgramInfoLog(m).trim(),L=s.getShaderInfoLog(w).trim(),O=s.getShaderInfoLog(A).trim();let B=!0,Y=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,m,w,A);else{const j=sc(s,w,"vertex"),K=sc(s,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+re+`
`+j+`
`+K)}else re!==""?console.warn("THREE.WebGLProgram: Program Info Log:",re):(L===""||O==="")&&(Y=!1);Y&&(W.diagnostics={runnable:B,programLog:re,vertexShader:{log:L,prefix:p},fragmentShader:{log:O,prefix:S}})}s.deleteShader(w),s.deleteShader(A),E=new ks(s,m),T=Gm(s,m)}let E;this.getUniforms=function(){return E===void 0&&F(this),E};let T;this.getAttributes=function(){return T===void 0&&F(this),T};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(m,Im)),z},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Dm++,this.cacheKey=e,this.usedTimes=1,this.program=m,this.vertexShader=w,this.fragmentShader=A,this}let Qm=0;class eg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new tg(e),t.set(e,n)),n}}class tg{constructor(e){this.id=Qm++,this.code=e,this.usedTimes=0}}function ng(i,e,t,n,s,r,a){const o=new To,c=new eg,l=[],h=s.isWebGL2,d=s.logarithmicDepthBuffer,u=s.vertexTextures;let f=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return E===0?"uv":`uv${E}`}function m(E,T,z,W,re){const L=W.fog,O=re.geometry,B=E.isMeshStandardMaterial?W.environment:null,Y=(E.isMeshStandardMaterial?t:e).get(E.envMap||B),j=Y&&Y.mapping===nr?Y.image.height:null,K=g[E.type];E.precision!==null&&(f=s.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Z=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,ae=Z!==void 0?Z.length:0;let ue=0;O.morphAttributes.position!==void 0&&(ue=1),O.morphAttributes.normal!==void 0&&(ue=2),O.morphAttributes.color!==void 0&&(ue=3);let V,te,_e,Ae;if(K){const ut=Jt[K];V=ut.vertexShader,te=ut.fragmentShader}else V=E.vertexShader,te=E.fragmentShader,c.update(E),_e=c.getVertexShaderID(E),Ae=c.getFragmentShaderID(E);const Ee=i.getRenderTarget(),De=re.isInstancedMesh===!0,Fe=re.isBatchedMesh===!0,Te=!!E.map,Oe=!!E.matcap,P=!!Y,fe=!!E.aoMap,X=!!E.lightMap,ce=!!E.bumpMap,$=!!E.normalMap,we=!!E.displacementMap,xe=!!E.emissiveMap,y=!!E.metalnessMap,v=!!E.roughnessMap,N=E.anisotropy>0,se=E.clearcoat>0,ne=E.iridescence>0,Q=E.sheen>0,be=E.transmission>0,me=N&&!!E.anisotropyMap,Se=se&&!!E.clearcoatMap,Le=se&&!!E.clearcoatNormalMap,ke=se&&!!E.clearcoatRoughnessMap,ie=ne&&!!E.iridescenceMap,Ke=ne&&!!E.iridescenceThicknessMap,We=Q&&!!E.sheenColorMap,ze=Q&&!!E.sheenRoughnessMap,Pe=!!E.specularMap,ve=!!E.specularColorMap,C=!!E.specularIntensityMap,le=be&&!!E.transmissionMap,Ce=be&&!!E.thicknessMap,ye=!!E.gradientMap,oe=!!E.alphaMap,D=E.alphaTest>0,de=!!E.alphaHash,ge=!!E.extensions,Ne=!!O.attributes.uv1,Ie=!!O.attributes.uv2,Ye=!!O.attributes.uv3;let je=Cn;return E.toneMapped&&(Ee===null||Ee.isXRRenderTarget===!0)&&(je=i.toneMapping),{isWebGL2:h,shaderID:K,shaderType:E.type,shaderName:E.name,vertexShader:V,fragmentShader:te,defines:E.defines,customVertexShaderID:_e,customFragmentShaderID:Ae,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Fe,instancing:De,instancingColor:De&&re.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:Ee===null?i.outputColorSpace:Ee.isXRRenderTarget===!0?Ee.texture.colorSpace:mn,map:Te,matcap:Oe,envMap:P,envMapMode:P&&Y.mapping,envMapCubeUVHeight:j,aoMap:fe,lightMap:X,bumpMap:ce,normalMap:$,displacementMap:u&&we,emissiveMap:xe,normalMapObjectSpace:$&&E.normalMapType===lu,normalMapTangentSpace:$&&E.normalMapType===sl,metalnessMap:y,roughnessMap:v,anisotropy:N,anisotropyMap:me,clearcoat:se,clearcoatMap:Se,clearcoatNormalMap:Le,clearcoatRoughnessMap:ke,iridescence:ne,iridescenceMap:ie,iridescenceThicknessMap:Ke,sheen:Q,sheenColorMap:We,sheenRoughnessMap:ze,specularMap:Pe,specularColorMap:ve,specularIntensityMap:C,transmission:be,transmissionMap:le,thicknessMap:Ce,gradientMap:ye,opaque:E.transparent===!1&&E.blending===Mi,alphaMap:oe,alphaTest:D,alphaHash:de,combine:E.combine,mapUv:Te&&_(E.map.channel),aoMapUv:fe&&_(E.aoMap.channel),lightMapUv:X&&_(E.lightMap.channel),bumpMapUv:ce&&_(E.bumpMap.channel),normalMapUv:$&&_(E.normalMap.channel),displacementMapUv:we&&_(E.displacementMap.channel),emissiveMapUv:xe&&_(E.emissiveMap.channel),metalnessMapUv:y&&_(E.metalnessMap.channel),roughnessMapUv:v&&_(E.roughnessMap.channel),anisotropyMapUv:me&&_(E.anisotropyMap.channel),clearcoatMapUv:Se&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:Le&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ie&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:We&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:ze&&_(E.sheenRoughnessMap.channel),specularMapUv:Pe&&_(E.specularMap.channel),specularColorMapUv:ve&&_(E.specularColorMap.channel),specularIntensityMapUv:C&&_(E.specularIntensityMap.channel),transmissionMapUv:le&&_(E.transmissionMap.channel),thicknessMapUv:Ce&&_(E.thicknessMap.channel),alphaMapUv:oe&&_(E.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&($||N),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,vertexUv1s:Ne,vertexUv2s:Ie,vertexUv3s:Ye,pointsUvs:re.isPoints===!0&&!!O.attributes.uv&&(Te||oe),fog:!!L,useFog:E.fog===!0,fogExp2:L&&L.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:re.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ue,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:je,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&E.map.isVideoTexture===!0&&et.getTransfer(E.map.colorSpace)===nt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ht,flipSided:E.side===It,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionDerivatives:ge&&E.extensions.derivatives===!0,extensionFragDepth:ge&&E.extensions.fragDepth===!0,extensionDrawBuffers:ge&&E.extensions.drawBuffers===!0,extensionShaderTextureLOD:ge&&E.extensions.shaderTextureLOD===!0,extensionClipCullDistance:ge&&E.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()}}function p(E){const T=[];if(E.shaderID?T.push(E.shaderID):(T.push(E.customVertexShaderID),T.push(E.customFragmentShaderID)),E.defines!==void 0)for(const z in E.defines)T.push(z),T.push(E.defines[z]);return E.isRawShaderMaterial===!1&&(S(T,E),x(T,E),T.push(i.outputColorSpace)),T.push(E.customProgramCacheKey),T.join()}function S(E,T){E.push(T.precision),E.push(T.outputColorSpace),E.push(T.envMapMode),E.push(T.envMapCubeUVHeight),E.push(T.mapUv),E.push(T.alphaMapUv),E.push(T.lightMapUv),E.push(T.aoMapUv),E.push(T.bumpMapUv),E.push(T.normalMapUv),E.push(T.displacementMapUv),E.push(T.emissiveMapUv),E.push(T.metalnessMapUv),E.push(T.roughnessMapUv),E.push(T.anisotropyMapUv),E.push(T.clearcoatMapUv),E.push(T.clearcoatNormalMapUv),E.push(T.clearcoatRoughnessMapUv),E.push(T.iridescenceMapUv),E.push(T.iridescenceThicknessMapUv),E.push(T.sheenColorMapUv),E.push(T.sheenRoughnessMapUv),E.push(T.specularMapUv),E.push(T.specularColorMapUv),E.push(T.specularIntensityMapUv),E.push(T.transmissionMapUv),E.push(T.thicknessMapUv),E.push(T.combine),E.push(T.fogExp2),E.push(T.sizeAttenuation),E.push(T.morphTargetsCount),E.push(T.morphAttributeCount),E.push(T.numDirLights),E.push(T.numPointLights),E.push(T.numSpotLights),E.push(T.numSpotLightMaps),E.push(T.numHemiLights),E.push(T.numRectAreaLights),E.push(T.numDirLightShadows),E.push(T.numPointLightShadows),E.push(T.numSpotLightShadows),E.push(T.numSpotLightShadowsWithMaps),E.push(T.numLightProbes),E.push(T.shadowMapType),E.push(T.toneMapping),E.push(T.numClippingPlanes),E.push(T.numClipIntersection),E.push(T.depthPacking)}function x(E,T){o.disableAll(),T.isWebGL2&&o.enable(0),T.supportsVertexTextures&&o.enable(1),T.instancing&&o.enable(2),T.instancingColor&&o.enable(3),T.matcap&&o.enable(4),T.envMap&&o.enable(5),T.normalMapObjectSpace&&o.enable(6),T.normalMapTangentSpace&&o.enable(7),T.clearcoat&&o.enable(8),T.iridescence&&o.enable(9),T.alphaTest&&o.enable(10),T.vertexColors&&o.enable(11),T.vertexAlphas&&o.enable(12),T.vertexUv1s&&o.enable(13),T.vertexUv2s&&o.enable(14),T.vertexUv3s&&o.enable(15),T.vertexTangents&&o.enable(16),T.anisotropy&&o.enable(17),T.alphaHash&&o.enable(18),T.batching&&o.enable(19),E.push(o.mask),o.disableAll(),T.fog&&o.enable(0),T.useFog&&o.enable(1),T.flatShading&&o.enable(2),T.logarithmicDepthBuffer&&o.enable(3),T.skinning&&o.enable(4),T.morphTargets&&o.enable(5),T.morphNormals&&o.enable(6),T.morphColors&&o.enable(7),T.premultipliedAlpha&&o.enable(8),T.shadowMapEnabled&&o.enable(9),T.useLegacyLights&&o.enable(10),T.doubleSided&&o.enable(11),T.flipSided&&o.enable(12),T.useDepthPacking&&o.enable(13),T.dithering&&o.enable(14),T.transmission&&o.enable(15),T.sheen&&o.enable(16),T.opaque&&o.enable(17),T.pointsUvs&&o.enable(18),T.decodeVideoTexture&&o.enable(19),E.push(o.mask)}function M(E){const T=g[E.type];let z;if(T){const W=Jt[T];z=Fu.clone(W.uniforms)}else z=E.uniforms;return z}function R(E,T){let z;for(let W=0,re=l.length;W<re;W++){const L=l[W];if(L.cacheKey===T){z=L,++z.usedTimes;break}}return z===void 0&&(z=new Jm(i,T,E,r),l.push(z)),z}function w(E){if(--E.usedTimes===0){const T=l.indexOf(E);l[T]=l[l.length-1],l.pop(),E.destroy()}}function A(E){c.remove(E)}function F(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:M,acquireProgram:R,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:F}}function ig(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function sg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function lc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function hc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d,u,f,g,_,m){let p=i[e];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:_,group:m},i[e]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=_,p.group=m),e++,p}function o(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(d,u,f,g,_,m){const p=a(d,u,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(d,u){t.length>1&&t.sort(d||sg),n.length>1&&n.sort(u||lc),s.length>1&&s.sort(u||lc)}function h(){for(let d=e,u=i.length;d<u;d++){const f=i[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function rg(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new hc,i.set(n,[a])):s>=r.length?(a=new hc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function og(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new I,color:new Je};break;case"SpotLight":t={position:new I,direction:new I,color:new Je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Je,groundColor:new Je};break;case"RectAreaLight":t={color:new Je,position:new I,halfWidth:new I,halfHeight:new I};break}return i[e.id]=t,t}}}function ag(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let cg=0;function lg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function hg(i,e){const t=new og,n=ag(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new I);const r=new I,a=new ct,o=new ct;function c(h,d){let u=0,f=0,g=0;for(let W=0;W<9;W++)s.probe[W].set(0,0,0);let _=0,m=0,p=0,S=0,x=0,M=0,R=0,w=0,A=0,F=0,E=0;h.sort(lg);const T=d===!0?Math.PI:1;for(let W=0,re=h.length;W<re;W++){const L=h[W],O=L.color,B=L.intensity,Y=L.distance,j=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=O.r*B*T,f+=O.g*B*T,g+=O.b*B*T;else if(L.isLightProbe){for(let K=0;K<9;K++)s.probe[K].addScaledVector(L.sh.coefficients[K],B);E++}else if(L.isDirectionalLight){const K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),L.castShadow){const Z=L.shadow,ae=n.get(L);ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,s.directionalShadow[_]=ae,s.directionalShadowMap[_]=j,s.directionalShadowMatrix[_]=L.shadow.matrix,M++}s.directional[_]=K,_++}else if(L.isSpotLight){const K=t.get(L);K.position.setFromMatrixPosition(L.matrixWorld),K.color.copy(O).multiplyScalar(B*T),K.distance=Y,K.coneCos=Math.cos(L.angle),K.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),K.decay=L.decay,s.spot[p]=K;const Z=L.shadow;if(L.map&&(s.spotLightMap[A]=L.map,A++,Z.updateMatrices(L),L.castShadow&&F++),s.spotLightMatrix[p]=Z.matrix,L.castShadow){const ae=n.get(L);ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,s.spotShadow[p]=ae,s.spotShadowMap[p]=j,w++}p++}else if(L.isRectAreaLight){const K=t.get(L);K.color.copy(O).multiplyScalar(B),K.halfWidth.set(L.width*.5,0,0),K.halfHeight.set(0,L.height*.5,0),s.rectArea[S]=K,S++}else if(L.isPointLight){const K=t.get(L);if(K.color.copy(L.color).multiplyScalar(L.intensity*T),K.distance=L.distance,K.decay=L.decay,L.castShadow){const Z=L.shadow,ae=n.get(L);ae.shadowBias=Z.bias,ae.shadowNormalBias=Z.normalBias,ae.shadowRadius=Z.radius,ae.shadowMapSize=Z.mapSize,ae.shadowCameraNear=Z.camera.near,ae.shadowCameraFar=Z.camera.far,s.pointShadow[m]=ae,s.pointShadowMap[m]=j,s.pointShadowMatrix[m]=L.shadow.matrix,R++}s.point[m]=K,m++}else if(L.isHemisphereLight){const K=t.get(L);K.skyColor.copy(L.color).multiplyScalar(B*T),K.groundColor.copy(L.groundColor).multiplyScalar(B*T),s.hemi[x]=K,x++}}S>0&&(e.isWebGL2?i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=pe.LTC_FLOAT_1,s.rectAreaLTC2=pe.LTC_FLOAT_2):(s.rectAreaLTC1=pe.LTC_HALF_1,s.rectAreaLTC2=pe.LTC_HALF_2):i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=pe.LTC_FLOAT_1,s.rectAreaLTC2=pe.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=pe.LTC_HALF_1,s.rectAreaLTC2=pe.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=u,s.ambient[1]=f,s.ambient[2]=g;const z=s.hash;(z.directionalLength!==_||z.pointLength!==m||z.spotLength!==p||z.rectAreaLength!==S||z.hemiLength!==x||z.numDirectionalShadows!==M||z.numPointShadows!==R||z.numSpotShadows!==w||z.numSpotMaps!==A||z.numLightProbes!==E)&&(s.directional.length=_,s.spot.length=p,s.rectArea.length=S,s.point.length=m,s.hemi.length=x,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=R,s.pointShadowMap.length=R,s.spotShadow.length=w,s.spotShadowMap.length=w,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=R,s.spotLightMatrix.length=w+A-F,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=F,s.numLightProbes=E,z.directionalLength=_,z.pointLength=m,z.spotLength=p,z.rectAreaLength=S,z.hemiLength=x,z.numDirectionalShadows=M,z.numPointShadows=R,z.numSpotShadows=w,z.numSpotMaps=A,z.numLightProbes=E,s.version=cg++)}function l(h,d){let u=0,f=0,g=0,_=0,m=0;const p=d.matrixWorldInverse;for(let S=0,x=h.length;S<x;S++){const M=h[S];if(M.isDirectionalLight){const R=s.directional[u];R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),u++}else if(M.isSpotLight){const R=s.spot[g];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(p),g++}else if(M.isRectAreaLight){const R=s.rectArea[_];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),o.identity(),a.copy(M.matrixWorld),a.premultiply(p),o.extractRotation(a),R.halfWidth.set(M.width*.5,0,0),R.halfHeight.set(0,M.height*.5,0),R.halfWidth.applyMatrix4(o),R.halfHeight.applyMatrix4(o),_++}else if(M.isPointLight){const R=s.point[f];R.position.setFromMatrixPosition(M.matrixWorld),R.position.applyMatrix4(p),f++}else if(M.isHemisphereLight){const R=s.hemi[m];R.direction.setFromMatrixPosition(M.matrixWorld),R.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:s}}function uc(i,e){const t=new hg(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(d){n.push(d)}function o(d){s.push(d)}function c(d){t.setup(n,d)}function l(d){t.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function ug(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new uc(i,e),t.set(r,[c])):a>=o.length?(c=new uc(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class dg extends Zn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=au,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class fg extends Zn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const pg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,mg=`uniform sampler2D shadow_pass;
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
}`;function gg(i,e,t){let n=new Ao;const s=new he,r=new he,a=new vt,o=new dg({depthPacking:cu}),c=new fg,l={},h=t.maxTextureSize,d={[Pn]:It,[It]:Pn,[Ht]:Ht},u=new Yn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:pg,fragmentShader:mg}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Pt;g.setAttribute("position",new en(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new it(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qc;let p=this.type;this.render=function(w,A,F){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const E=i.getRenderTarget(),T=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),W=i.state;W.setBlending(wn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const re=p!==un&&this.type===un,L=p===un&&this.type!==un;for(let O=0,B=w.length;O<B;O++){const Y=w[O],j=Y.shadow;if(j===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(j.autoUpdate===!1&&j.needsUpdate===!1)continue;s.copy(j.mapSize);const K=j.getFrameExtents();if(s.multiply(K),r.copy(j.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/K.x),s.x=r.x*K.x,j.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/K.y),s.y=r.y*K.y,j.mapSize.y=r.y)),j.map===null||re===!0||L===!0){const ae=this.type!==un?{minFilter:Rt,magFilter:Rt}:{};j.map!==null&&j.map.dispose(),j.map=new Xn(s.x,s.y,ae),j.map.texture.name=Y.name+".shadowMap",j.camera.updateProjectionMatrix()}i.setRenderTarget(j.map),i.clear();const Z=j.getViewportCount();for(let ae=0;ae<Z;ae++){const ue=j.getViewport(ae);a.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),W.viewport(a),j.updateMatrices(Y,ae),n=j.getFrustum(),M(A,F,j.camera,Y,this.type)}j.isPointLightShadow!==!0&&this.type===un&&S(j,F),j.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(E,T,z)};function S(w,A){const F=e.update(_);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new Xn(s.x,s.y)),u.uniforms.shadow_pass.value=w.map.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(A,null,F,u,_,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(A,null,F,f,_,null)}function x(w,A,F,E){let T=null;const z=F.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(z!==void 0)T=z;else if(T=F.isPointLight===!0?c:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=T.uuid,re=A.uuid;let L=l[W];L===void 0&&(L={},l[W]=L);let O=L[re];O===void 0&&(O=T.clone(),L[re]=O,A.addEventListener("dispose",R)),T=O}if(T.visible=A.visible,T.wireframe=A.wireframe,E===un?T.side=A.shadowSide!==null?A.shadowSide:A.side:T.side=A.shadowSide!==null?A.shadowSide:d[A.side],T.alphaMap=A.alphaMap,T.alphaTest=A.alphaTest,T.map=A.map,T.clipShadows=A.clipShadows,T.clippingPlanes=A.clippingPlanes,T.clipIntersection=A.clipIntersection,T.displacementMap=A.displacementMap,T.displacementScale=A.displacementScale,T.displacementBias=A.displacementBias,T.wireframeLinewidth=A.wireframeLinewidth,T.linewidth=A.linewidth,F.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const W=i.properties.get(T);W.light=F}return T}function M(w,A,F,E,T){if(w.visible===!1)return;if(w.layers.test(A.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&T===un)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,w.matrixWorld);const re=e.update(w),L=w.material;if(Array.isArray(L)){const O=re.groups;for(let B=0,Y=O.length;B<Y;B++){const j=O[B],K=L[j.materialIndex];if(K&&K.visible){const Z=x(w,K,E,T);w.onBeforeShadow(i,w,A,F,re,Z,j),i.renderBufferDirect(F,null,re,Z,w,j),w.onAfterShadow(i,w,A,F,re,Z,j)}}}else if(L.visible){const O=x(w,L,E,T);w.onBeforeShadow(i,w,A,F,re,O,null),i.renderBufferDirect(F,null,re,O,w,null),w.onAfterShadow(i,w,A,F,re,O,null)}}const W=w.children;for(let re=0,L=W.length;re<L;re++)M(W[re],A,F,E,T)}function R(w){w.target.removeEventListener("dispose",R);for(const F in l){const E=l[F],T=w.target.uuid;T in E&&(E[T].dispose(),delete E[T])}}}function _g(i,e,t){const n=t.isWebGL2;function s(){let D=!1;const de=new vt;let ge=null;const Ne=new vt(0,0,0,0);return{setMask:function(Ie){ge!==Ie&&!D&&(i.colorMask(Ie,Ie,Ie,Ie),ge=Ie)},setLocked:function(Ie){D=Ie},setClear:function(Ie,Ye,je,lt,ut){ut===!0&&(Ie*=lt,Ye*=lt,je*=lt),de.set(Ie,Ye,je,lt),Ne.equals(de)===!1&&(i.clearColor(Ie,Ye,je,lt),Ne.copy(de))},reset:function(){D=!1,ge=null,Ne.set(-1,0,0,0)}}}function r(){let D=!1,de=null,ge=null,Ne=null;return{setTest:function(Ie){Ie?Fe(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(Ie){de!==Ie&&!D&&(i.depthMask(Ie),de=Ie)},setFunc:function(Ie){if(ge!==Ie){switch(Ie){case Fh:i.depthFunc(i.NEVER);break;case zh:i.depthFunc(i.ALWAYS);break;case Bh:i.depthFunc(i.LESS);break;case Ws:i.depthFunc(i.LEQUAL);break;case kh:i.depthFunc(i.EQUAL);break;case Gh:i.depthFunc(i.GEQUAL);break;case Hh:i.depthFunc(i.GREATER);break;case Vh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ge=Ie}},setLocked:function(Ie){D=Ie},setClear:function(Ie){Ne!==Ie&&(i.clearDepth(Ie),Ne=Ie)},reset:function(){D=!1,de=null,ge=null,Ne=null}}}function a(){let D=!1,de=null,ge=null,Ne=null,Ie=null,Ye=null,je=null,lt=null,ut=null;return{setTest:function(Qe){D||(Qe?Fe(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(Qe){de!==Qe&&!D&&(i.stencilMask(Qe),de=Qe)},setFunc:function(Qe,ft,Kt){(ge!==Qe||Ne!==ft||Ie!==Kt)&&(i.stencilFunc(Qe,ft,Kt),ge=Qe,Ne=ft,Ie=Kt)},setOp:function(Qe,ft,Kt){(Ye!==Qe||je!==ft||lt!==Kt)&&(i.stencilOp(Qe,ft,Kt),Ye=Qe,je=ft,lt=Kt)},setLocked:function(Qe){D=Qe},setClear:function(Qe){ut!==Qe&&(i.clearStencil(Qe),ut=Qe)},reset:function(){D=!1,de=null,ge=null,Ne=null,Ie=null,Ye=null,je=null,lt=null,ut=null}}}const o=new s,c=new r,l=new a,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,_=[],m=null,p=!1,S=null,x=null,M=null,R=null,w=null,A=null,F=null,E=new Je(0,0,0),T=0,z=!1,W=null,re=null,L=null,O=null,B=null;const Y=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let j=!1,K=0;const Z=i.getParameter(i.VERSION);Z.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(Z)[1]),j=K>=1):Z.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),j=K>=2);let ae=null,ue={};const V=i.getParameter(i.SCISSOR_BOX),te=i.getParameter(i.VIEWPORT),_e=new vt().fromArray(V),Ae=new vt().fromArray(te);function Ee(D,de,ge,Ne){const Ie=new Uint8Array(4),Ye=i.createTexture();i.bindTexture(D,Ye),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let je=0;je<ge;je++)n&&(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)?i.texImage3D(de,0,i.RGBA,1,1,Ne,0,i.RGBA,i.UNSIGNED_BYTE,Ie):i.texImage2D(de+je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Ie);return Ye}const De={};De[i.TEXTURE_2D]=Ee(i.TEXTURE_2D,i.TEXTURE_2D,1),De[i.TEXTURE_CUBE_MAP]=Ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(De[i.TEXTURE_2D_ARRAY]=Ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),De[i.TEXTURE_3D]=Ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),Fe(i.DEPTH_TEST),c.setFunc(Ws),xe(!1),y(Xo),Fe(i.CULL_FACE),$(wn);function Fe(D){u[D]!==!0&&(i.enable(D),u[D]=!0)}function Te(D){u[D]!==!1&&(i.disable(D),u[D]=!1)}function Oe(D,de){return f[D]!==de?(i.bindFramebuffer(D,de),f[D]=de,n&&(D===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=de),D===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=de)),!0):!1}function P(D,de){let ge=_,Ne=!1;if(D)if(ge=g.get(de),ge===void 0&&(ge=[],g.set(de,ge)),D.isWebGLMultipleRenderTargets){const Ie=D.texture;if(ge.length!==Ie.length||ge[0]!==i.COLOR_ATTACHMENT0){for(let Ye=0,je=Ie.length;Ye<je;Ye++)ge[Ye]=i.COLOR_ATTACHMENT0+Ye;ge.length=Ie.length,Ne=!0}}else ge[0]!==i.COLOR_ATTACHMENT0&&(ge[0]=i.COLOR_ATTACHMENT0,Ne=!0);else ge[0]!==i.BACK&&(ge[0]=i.BACK,Ne=!0);Ne&&(t.isWebGL2?i.drawBuffers(ge):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(ge))}function fe(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const X={[kn]:i.FUNC_ADD,[Eh]:i.FUNC_SUBTRACT,[yh]:i.FUNC_REVERSE_SUBTRACT};if(n)X[Ko]=i.MIN,X[Zo]=i.MAX;else{const D=e.get("EXT_blend_minmax");D!==null&&(X[Ko]=D.MIN_EXT,X[Zo]=D.MAX_EXT)}const ce={[bh]:i.ZERO,[Th]:i.ONE,[Ah]:i.SRC_COLOR,[ao]:i.SRC_ALPHA,[Ih]:i.SRC_ALPHA_SATURATE,[Ph]:i.DST_COLOR,[Ch]:i.DST_ALPHA,[wh]:i.ONE_MINUS_SRC_COLOR,[co]:i.ONE_MINUS_SRC_ALPHA,[Lh]:i.ONE_MINUS_DST_COLOR,[Rh]:i.ONE_MINUS_DST_ALPHA,[Dh]:i.CONSTANT_COLOR,[Nh]:i.ONE_MINUS_CONSTANT_COLOR,[Uh]:i.CONSTANT_ALPHA,[Oh]:i.ONE_MINUS_CONSTANT_ALPHA};function $(D,de,ge,Ne,Ie,Ye,je,lt,ut,Qe){if(D===wn){p===!0&&(Te(i.BLEND),p=!1);return}if(p===!1&&(Fe(i.BLEND),p=!0),D!==Mh){if(D!==S||Qe!==z){if((x!==kn||w!==kn)&&(i.blendEquation(i.FUNC_ADD),x=kn,w=kn),Qe)switch(D){case Mi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qo:i.blendFunc(i.ONE,i.ONE);break;case Yo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jo:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Mi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qo:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Yo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case jo:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}M=null,R=null,A=null,F=null,E.set(0,0,0),T=0,S=D,z=Qe}return}Ie=Ie||de,Ye=Ye||ge,je=je||Ne,(de!==x||Ie!==w)&&(i.blendEquationSeparate(X[de],X[Ie]),x=de,w=Ie),(ge!==M||Ne!==R||Ye!==A||je!==F)&&(i.blendFuncSeparate(ce[ge],ce[Ne],ce[Ye],ce[je]),M=ge,R=Ne,A=Ye,F=je),(lt.equals(E)===!1||ut!==T)&&(i.blendColor(lt.r,lt.g,lt.b,ut),E.copy(lt),T=ut),S=D,z=!1}function we(D,de){D.side===Ht?Te(i.CULL_FACE):Fe(i.CULL_FACE);let ge=D.side===It;de&&(ge=!ge),xe(ge),D.blending===Mi&&D.transparent===!1?$(wn):$(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),c.setFunc(D.depthFunc),c.setTest(D.depthTest),c.setMask(D.depthWrite),o.setMask(D.colorWrite);const Ne=D.stencilWrite;l.setTest(Ne),Ne&&(l.setMask(D.stencilWriteMask),l.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),l.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),N(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?Fe(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(D){W!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),W=D)}function y(D){D!==xh?(Fe(i.CULL_FACE),D!==re&&(D===Xo?i.cullFace(i.BACK):D===vh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),re=D}function v(D){D!==L&&(j&&i.lineWidth(D),L=D)}function N(D,de,ge){D?(Fe(i.POLYGON_OFFSET_FILL),(O!==de||B!==ge)&&(i.polygonOffset(de,ge),O=de,B=ge)):Te(i.POLYGON_OFFSET_FILL)}function se(D){D?Fe(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function ne(D){D===void 0&&(D=i.TEXTURE0+Y-1),ae!==D&&(i.activeTexture(D),ae=D)}function Q(D,de,ge){ge===void 0&&(ae===null?ge=i.TEXTURE0+Y-1:ge=ae);let Ne=ue[ge];Ne===void 0&&(Ne={type:void 0,texture:void 0},ue[ge]=Ne),(Ne.type!==D||Ne.texture!==de)&&(ae!==ge&&(i.activeTexture(ge),ae=ge),i.bindTexture(D,de||De[D]),Ne.type=D,Ne.texture=de)}function be(){const D=ue[ae];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function me(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Le(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ke(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ke(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function We(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ze(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ve(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function C(D){_e.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),_e.copy(D))}function le(D){Ae.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),Ae.copy(D))}function Ce(D,de){let ge=d.get(de);ge===void 0&&(ge=new WeakMap,d.set(de,ge));let Ne=ge.get(D);Ne===void 0&&(Ne=i.getUniformBlockIndex(de,D.name),ge.set(D,Ne))}function ye(D,de){const Ne=d.get(de).get(D);h.get(de)!==Ne&&(i.uniformBlockBinding(de,Ne,D.__bindingPointIndex),h.set(de,Ne))}function oe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ae=null,ue={},f={},g=new WeakMap,_=[],m=null,p=!1,S=null,x=null,M=null,R=null,w=null,A=null,F=null,E=new Je(0,0,0),T=0,z=!1,W=null,re=null,L=null,O=null,B=null,_e.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:Fe,disable:Te,bindFramebuffer:Oe,drawBuffers:P,useProgram:fe,setBlending:$,setMaterial:we,setFlipSided:xe,setCullFace:y,setLineWidth:v,setPolygonOffset:N,setScissorTest:se,activeTexture:ne,bindTexture:Q,unbindTexture:be,compressedTexImage2D:me,compressedTexImage3D:Se,texImage2D:Pe,texImage3D:ve,updateUBOMapping:Ce,uniformBlockBinding:ye,texStorage2D:We,texStorage3D:ze,texSubImage2D:Le,texSubImage3D:ke,compressedTexSubImage2D:ie,compressedTexSubImage3D:Ke,scissor:C,viewport:le,reset:oe}}function xg(i,e,t,n,s,r,a){const o=s.isWebGL2,c=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(y,v){return f?new OffscreenCanvas(y,v):js("canvas")}function _(y,v,N,se){let ne=1;if((y.width>se||y.height>se)&&(ne=se/Math.max(y.width,y.height)),ne<1||v===!0)if(typeof HTMLImageElement<"u"&&y instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&y instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&y instanceof ImageBitmap){const Q=v?go:Math.floor,be=Q(ne*y.width),me=Q(ne*y.height);d===void 0&&(d=g(be,me));const Se=N?g(be,me):d;return Se.width=be,Se.height=me,Se.getContext("2d").drawImage(y,0,0,be,me),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+y.width+"x"+y.height+") to ("+be+"x"+me+")."),Se}else return"data"in y&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+y.width+"x"+y.height+")."),y;return y}function m(y){return wa(y.width)&&wa(y.height)}function p(y){return o?!1:y.wrapS!==Yt||y.wrapT!==Yt||y.minFilter!==Rt&&y.minFilter!==kt}function S(y,v){return y.generateMipmaps&&v&&y.minFilter!==Rt&&y.minFilter!==kt}function x(y){i.generateMipmap(y)}function M(y,v,N,se,ne=!1){if(o===!1)return v;if(y!==null){if(i[y]!==void 0)return i[y];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+y+"'")}let Q=v;if(v===i.RED&&(N===i.FLOAT&&(Q=i.R32F),N===i.HALF_FLOAT&&(Q=i.R16F),N===i.UNSIGNED_BYTE&&(Q=i.R8)),v===i.RED_INTEGER&&(N===i.UNSIGNED_BYTE&&(Q=i.R8UI),N===i.UNSIGNED_SHORT&&(Q=i.R16UI),N===i.UNSIGNED_INT&&(Q=i.R32UI),N===i.BYTE&&(Q=i.R8I),N===i.SHORT&&(Q=i.R16I),N===i.INT&&(Q=i.R32I)),v===i.RG&&(N===i.FLOAT&&(Q=i.RG32F),N===i.HALF_FLOAT&&(Q=i.RG16F),N===i.UNSIGNED_BYTE&&(Q=i.RG8)),v===i.RGBA){const be=ne?$s:et.getTransfer(se);N===i.FLOAT&&(Q=i.RGBA32F),N===i.HALF_FLOAT&&(Q=i.RGBA16F),N===i.UNSIGNED_BYTE&&(Q=be===nt?i.SRGB8_ALPHA8:i.RGBA8),N===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),N===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function R(y,v,N){return S(y,N)===!0||y.isFramebufferTexture&&y.minFilter!==Rt&&y.minFilter!==kt?Math.log2(Math.max(v.width,v.height))+1:y.mipmaps!==void 0&&y.mipmaps.length>0?y.mipmaps.length:y.isCompressedTexture&&Array.isArray(y.image)?v.mipmaps.length:1}function w(y){return y===Rt||y===Jo||y===_r?i.NEAREST:i.LINEAR}function A(y){const v=y.target;v.removeEventListener("dispose",A),E(v),v.isVideoTexture&&h.delete(v)}function F(y){const v=y.target;v.removeEventListener("dispose",F),z(v)}function E(y){const v=n.get(y);if(v.__webglInit===void 0)return;const N=y.source,se=u.get(N);if(se){const ne=se[v.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&T(y),Object.keys(se).length===0&&u.delete(N)}n.remove(y)}function T(y){const v=n.get(y);i.deleteTexture(v.__webglTexture);const N=y.source,se=u.get(N);delete se[v.__cacheKey],a.memory.textures--}function z(y){const v=y.texture,N=n.get(y),se=n.get(v);if(se.__webglTexture!==void 0&&(i.deleteTexture(se.__webglTexture),a.memory.textures--),y.depthTexture&&y.depthTexture.dispose(),y.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(N.__webglFramebuffer[ne]))for(let Q=0;Q<N.__webglFramebuffer[ne].length;Q++)i.deleteFramebuffer(N.__webglFramebuffer[ne][Q]);else i.deleteFramebuffer(N.__webglFramebuffer[ne]);N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer[ne])}else{if(Array.isArray(N.__webglFramebuffer))for(let ne=0;ne<N.__webglFramebuffer.length;ne++)i.deleteFramebuffer(N.__webglFramebuffer[ne]);else i.deleteFramebuffer(N.__webglFramebuffer);if(N.__webglDepthbuffer&&i.deleteRenderbuffer(N.__webglDepthbuffer),N.__webglMultisampledFramebuffer&&i.deleteFramebuffer(N.__webglMultisampledFramebuffer),N.__webglColorRenderbuffer)for(let ne=0;ne<N.__webglColorRenderbuffer.length;ne++)N.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(N.__webglColorRenderbuffer[ne]);N.__webglDepthRenderbuffer&&i.deleteRenderbuffer(N.__webglDepthRenderbuffer)}if(y.isWebGLMultipleRenderTargets)for(let ne=0,Q=v.length;ne<Q;ne++){const be=n.get(v[ne]);be.__webglTexture&&(i.deleteTexture(be.__webglTexture),a.memory.textures--),n.remove(v[ne])}n.remove(v),n.remove(y)}let W=0;function re(){W=0}function L(){const y=W;return y>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+y+" texture units while this GPU supports only "+s.maxTextures),W+=1,y}function O(y){const v=[];return v.push(y.wrapS),v.push(y.wrapT),v.push(y.wrapR||0),v.push(y.magFilter),v.push(y.minFilter),v.push(y.anisotropy),v.push(y.internalFormat),v.push(y.format),v.push(y.type),v.push(y.generateMipmaps),v.push(y.premultiplyAlpha),v.push(y.flipY),v.push(y.unpackAlignment),v.push(y.colorSpace),v.join()}function B(y,v){const N=n.get(y);if(y.isVideoTexture&&we(y),y.isRenderTargetTexture===!1&&y.version>0&&N.__version!==y.version){const se=y.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{_e(N,y,v);return}}t.bindTexture(i.TEXTURE_2D,N.__webglTexture,i.TEXTURE0+v)}function Y(y,v){const N=n.get(y);if(y.version>0&&N.__version!==y.version){_e(N,y,v);return}t.bindTexture(i.TEXTURE_2D_ARRAY,N.__webglTexture,i.TEXTURE0+v)}function j(y,v){const N=n.get(y);if(y.version>0&&N.__version!==y.version){_e(N,y,v);return}t.bindTexture(i.TEXTURE_3D,N.__webglTexture,i.TEXTURE0+v)}function K(y,v){const N=n.get(y);if(y.version>0&&N.__version!==y.version){Ae(N,y,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,N.__webglTexture,i.TEXTURE0+v)}const Z={[uo]:i.REPEAT,[Yt]:i.CLAMP_TO_EDGE,[fo]:i.MIRRORED_REPEAT},ae={[Rt]:i.NEAREST,[Jo]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[kt]:i.LINEAR,[Jh]:i.LINEAR_MIPMAP_NEAREST,[ji]:i.LINEAR_MIPMAP_LINEAR},ue={[hu]:i.NEVER,[gu]:i.ALWAYS,[uu]:i.LESS,[rl]:i.LEQUAL,[du]:i.EQUAL,[mu]:i.GEQUAL,[fu]:i.GREATER,[pu]:i.NOTEQUAL};function V(y,v,N){if(N?(i.texParameteri(y,i.TEXTURE_WRAP_S,Z[v.wrapS]),i.texParameteri(y,i.TEXTURE_WRAP_T,Z[v.wrapT]),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,Z[v.wrapR]),i.texParameteri(y,i.TEXTURE_MAG_FILTER,ae[v.magFilter]),i.texParameteri(y,i.TEXTURE_MIN_FILTER,ae[v.minFilter])):(i.texParameteri(y,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(y,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(y===i.TEXTURE_3D||y===i.TEXTURE_2D_ARRAY)&&i.texParameteri(y,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(v.wrapS!==Yt||v.wrapT!==Yt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(y,i.TEXTURE_MAG_FILTER,w(v.magFilter)),i.texParameteri(y,i.TEXTURE_MIN_FILTER,w(v.minFilter)),v.minFilter!==Rt&&v.minFilter!==kt&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),v.compareFunction&&(i.texParameteri(y,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(y,i.TEXTURE_COMPARE_FUNC,ue[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(v.magFilter===Rt||v.minFilter!==_r&&v.minFilter!==ji||v.type===bn&&e.has("OES_texture_float_linear")===!1||o===!1&&v.type===Ki&&e.has("OES_texture_half_float_linear")===!1)return;(v.anisotropy>1||n.get(v).__currentAnisotropy)&&(i.texParameterf(y,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy)}}function te(y,v){let N=!1;y.__webglInit===void 0&&(y.__webglInit=!0,v.addEventListener("dispose",A));const se=v.source;let ne=u.get(se);ne===void 0&&(ne={},u.set(se,ne));const Q=O(v);if(Q!==y.__cacheKey){ne[Q]===void 0&&(ne[Q]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,N=!0),ne[Q].usedTimes++;const be=ne[y.__cacheKey];be!==void 0&&(ne[y.__cacheKey].usedTimes--,be.usedTimes===0&&T(v)),y.__cacheKey=Q,y.__webglTexture=ne[Q].texture}return N}function _e(y,v,N){let se=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(se=i.TEXTURE_3D);const ne=te(y,v),Q=v.source;t.bindTexture(se,y.__webglTexture,i.TEXTURE0+N);const be=n.get(Q);if(Q.version!==be.__version||ne===!0){t.activeTexture(i.TEXTURE0+N);const me=et.getPrimaries(et.workingColorSpace),Se=v.colorSpace===Vt?null:et.getPrimaries(v.colorSpace),Le=v.colorSpace===Vt||me===Se?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);const ke=p(v)&&m(v.image)===!1;let ie=_(v.image,ke,!1,s.maxTextureSize);ie=xe(v,ie);const Ke=m(ie)||o,We=r.convert(v.format,v.colorSpace);let ze=r.convert(v.type),Pe=M(v.internalFormat,We,ze,v.colorSpace,v.isVideoTexture);V(se,v,Ke);let ve;const C=v.mipmaps,le=o&&v.isVideoTexture!==!0&&Pe!==nl,Ce=be.__version===void 0||ne===!0,ye=R(v,ie,Ke);if(v.isDepthTexture)Pe=i.DEPTH_COMPONENT,o?v.type===bn?Pe=i.DEPTH_COMPONENT32F:v.type===yn?Pe=i.DEPTH_COMPONENT24:v.type===Hn?Pe=i.DEPTH24_STENCIL8:Pe=i.DEPTH_COMPONENT16:v.type===bn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),v.format===Vn&&Pe===i.DEPTH_COMPONENT&&v.type!==yo&&v.type!==yn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),v.type=yn,ze=r.convert(v.type)),v.format===Ai&&Pe===i.DEPTH_COMPONENT&&(Pe=i.DEPTH_STENCIL,v.type!==Hn&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),v.type=Hn,ze=r.convert(v.type))),Ce&&(le?t.texStorage2D(i.TEXTURE_2D,1,Pe,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Pe,ie.width,ie.height,0,We,ze,null));else if(v.isDataTexture)if(C.length>0&&Ke){le&&Ce&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,C[0].width,C[0].height);for(let oe=0,D=C.length;oe<D;oe++)ve=C[oe],le?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ve.width,ve.height,We,ze,ve.data):t.texImage2D(i.TEXTURE_2D,oe,Pe,ve.width,ve.height,0,We,ze,ve.data);v.generateMipmaps=!1}else le?(Ce&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,We,ze,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Pe,ie.width,ie.height,0,We,ze,ie.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){le&&Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Pe,C[0].width,C[0].height,ie.depth);for(let oe=0,D=C.length;oe<D;oe++)ve=C[oe],v.format!==jt?We!==null?le?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ve.width,ve.height,ie.depth,We,ve.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,oe,Pe,ve.width,ve.height,ie.depth,0,ve.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?t.texSubImage3D(i.TEXTURE_2D_ARRAY,oe,0,0,0,ve.width,ve.height,ie.depth,We,ze,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,oe,Pe,ve.width,ve.height,ie.depth,0,We,ze,ve.data)}else{le&&Ce&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,C[0].width,C[0].height);for(let oe=0,D=C.length;oe<D;oe++)ve=C[oe],v.format!==jt?We!==null?le?t.compressedTexSubImage2D(i.TEXTURE_2D,oe,0,0,ve.width,ve.height,We,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,oe,Pe,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,ve.width,ve.height,We,ze,ve.data):t.texImage2D(i.TEXTURE_2D,oe,Pe,ve.width,ve.height,0,We,ze,ve.data)}else if(v.isDataArrayTexture)le?(Ce&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ye,Pe,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,We,ze,ie.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,Pe,ie.width,ie.height,ie.depth,0,We,ze,ie.data);else if(v.isData3DTexture)le?(Ce&&t.texStorage3D(i.TEXTURE_3D,ye,Pe,ie.width,ie.height,ie.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,We,ze,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Pe,ie.width,ie.height,ie.depth,0,We,ze,ie.data);else if(v.isFramebufferTexture){if(Ce)if(le)t.texStorage2D(i.TEXTURE_2D,ye,Pe,ie.width,ie.height);else{let oe=ie.width,D=ie.height;for(let de=0;de<ye;de++)t.texImage2D(i.TEXTURE_2D,de,Pe,oe,D,0,We,ze,null),oe>>=1,D>>=1}}else if(C.length>0&&Ke){le&&Ce&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,C[0].width,C[0].height);for(let oe=0,D=C.length;oe<D;oe++)ve=C[oe],le?t.texSubImage2D(i.TEXTURE_2D,oe,0,0,We,ze,ve):t.texImage2D(i.TEXTURE_2D,oe,Pe,We,ze,ve);v.generateMipmaps=!1}else le?(Ce&&t.texStorage2D(i.TEXTURE_2D,ye,Pe,ie.width,ie.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,We,ze,ie)):t.texImage2D(i.TEXTURE_2D,0,Pe,We,ze,ie);S(v,Ke)&&x(se),be.__version=Q.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Ae(y,v,N){if(v.image.length!==6)return;const se=te(y,v),ne=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,y.__webglTexture,i.TEXTURE0+N);const Q=n.get(ne);if(ne.version!==Q.__version||se===!0){t.activeTexture(i.TEXTURE0+N);const be=et.getPrimaries(et.workingColorSpace),me=v.colorSpace===Vt?null:et.getPrimaries(v.colorSpace),Se=v.colorSpace===Vt||be===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Se);const Le=v.isCompressedTexture||v.image[0].isCompressedTexture,ke=v.image[0]&&v.image[0].isDataTexture,ie=[];for(let oe=0;oe<6;oe++)!Le&&!ke?ie[oe]=_(v.image[oe],!1,!0,s.maxCubemapSize):ie[oe]=ke?v.image[oe].image:v.image[oe],ie[oe]=xe(v,ie[oe]);const Ke=ie[0],We=m(Ke)||o,ze=r.convert(v.format,v.colorSpace),Pe=r.convert(v.type),ve=M(v.internalFormat,ze,Pe,v.colorSpace),C=o&&v.isVideoTexture!==!0,le=Q.__version===void 0||se===!0;let Ce=R(v,Ke,We);V(i.TEXTURE_CUBE_MAP,v,We);let ye;if(Le){C&&le&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,ve,Ke.width,Ke.height);for(let oe=0;oe<6;oe++){ye=ie[oe].mipmaps;for(let D=0;D<ye.length;D++){const de=ye[D];v.format!==jt?ze!==null?C?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D,0,0,de.width,de.height,ze,de.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D,ve,de.width,de.height,0,de.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):C?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D,0,0,de.width,de.height,ze,Pe,de.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D,ve,de.width,de.height,0,ze,Pe,de.data)}}}else{ye=v.mipmaps,C&&le&&(ye.length>0&&Ce++,t.texStorage2D(i.TEXTURE_CUBE_MAP,Ce,ve,ie[0].width,ie[0].height));for(let oe=0;oe<6;oe++)if(ke){C?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ie[oe].width,ie[oe].height,ze,Pe,ie[oe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ve,ie[oe].width,ie[oe].height,0,ze,Pe,ie[oe].data);for(let D=0;D<ye.length;D++){const ge=ye[D].image[oe].image;C?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D+1,0,0,ge.width,ge.height,ze,Pe,ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D+1,ve,ge.width,ge.height,0,ze,Pe,ge.data)}}else{C?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,ze,Pe,ie[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,ve,ze,Pe,ie[oe]);for(let D=0;D<ye.length;D++){const de=ye[D];C?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D+1,0,0,ze,Pe,de.image[oe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+oe,D+1,ve,ze,Pe,de.image[oe])}}}S(v,We)&&x(i.TEXTURE_CUBE_MAP),Q.__version=ne.version,v.onUpdate&&v.onUpdate(v)}y.__version=v.version}function Ee(y,v,N,se,ne,Q){const be=r.convert(N.format,N.colorSpace),me=r.convert(N.type),Se=M(N.internalFormat,be,me,N.colorSpace);if(!n.get(v).__hasExternalTextures){const ke=Math.max(1,v.width>>Q),ie=Math.max(1,v.height>>Q);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,Q,Se,ke,ie,v.depth,0,be,me,null):t.texImage2D(ne,Q,Se,ke,ie,0,be,me,null)}t.bindFramebuffer(i.FRAMEBUFFER,y),$(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ne,n.get(N).__webglTexture,0,ce(v)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,ne,n.get(N).__webglTexture,Q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function De(y,v,N){if(i.bindRenderbuffer(i.RENDERBUFFER,y),v.depthBuffer&&!v.stencilBuffer){let se=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(N||$(v)){const ne=v.depthTexture;ne&&ne.isDepthTexture&&(ne.type===bn?se=i.DEPTH_COMPONENT32F:ne.type===yn&&(se=i.DEPTH_COMPONENT24));const Q=ce(v);$(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Q,se,v.width,v.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,Q,se,v.width,v.height)}else i.renderbufferStorage(i.RENDERBUFFER,se,v.width,v.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,y)}else if(v.depthBuffer&&v.stencilBuffer){const se=ce(v);N&&$(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,v.width,v.height):$(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,y)}else{const se=v.isWebGLMultipleRenderTargets===!0?v.texture:[v.texture];for(let ne=0;ne<se.length;ne++){const Q=se[ne],be=r.convert(Q.format,Q.colorSpace),me=r.convert(Q.type),Se=M(Q.internalFormat,be,me,Q.colorSpace),Le=ce(v);N&&$(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,Se,v.width,v.height):$(v)?c.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,Se,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,Se,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Fe(y,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,y),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(v.depthTexture).__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),B(v.depthTexture,0);const se=n.get(v.depthTexture).__webglTexture,ne=ce(v);if(v.depthTexture.format===Vn)$(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(v.depthTexture.format===Ai)$(v)?c.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Te(y){const v=n.get(y),N=y.isWebGLCubeRenderTarget===!0;if(y.depthTexture&&!v.__autoAllocateDepthBuffer){if(N)throw new Error("target.depthTexture not supported in Cube render targets");Fe(v.__webglFramebuffer,y)}else if(N){v.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[se]),v.__webglDepthbuffer[se]=i.createRenderbuffer(),De(v.__webglDepthbuffer[se],y,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer=i.createRenderbuffer(),De(v.__webglDepthbuffer,y,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function Oe(y,v,N){const se=n.get(y);v!==void 0&&Ee(se.__webglFramebuffer,y,y.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),N!==void 0&&Te(y)}function P(y){const v=y.texture,N=n.get(y),se=n.get(v);y.addEventListener("dispose",F),y.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=v.version,a.memory.textures++);const ne=y.isWebGLCubeRenderTarget===!0,Q=y.isWebGLMultipleRenderTargets===!0,be=m(y)||o;if(ne){N.__webglFramebuffer=[];for(let me=0;me<6;me++)if(o&&v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer[me]=[];for(let Se=0;Se<v.mipmaps.length;Se++)N.__webglFramebuffer[me][Se]=i.createFramebuffer()}else N.__webglFramebuffer[me]=i.createFramebuffer()}else{if(o&&v.mipmaps&&v.mipmaps.length>0){N.__webglFramebuffer=[];for(let me=0;me<v.mipmaps.length;me++)N.__webglFramebuffer[me]=i.createFramebuffer()}else N.__webglFramebuffer=i.createFramebuffer();if(Q)if(s.drawBuffers){const me=y.texture;for(let Se=0,Le=me.length;Se<Le;Se++){const ke=n.get(me[Se]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&y.samples>0&&$(y)===!1){const me=Q?v:[v];N.__webglMultisampledFramebuffer=i.createFramebuffer(),N.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,N.__webglMultisampledFramebuffer);for(let Se=0;Se<me.length;Se++){const Le=me[Se];N.__webglColorRenderbuffer[Se]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,N.__webglColorRenderbuffer[Se]);const ke=r.convert(Le.format,Le.colorSpace),ie=r.convert(Le.type),Ke=M(Le.internalFormat,ke,ie,Le.colorSpace,y.isXRRenderTarget===!0),We=ce(y);i.renderbufferStorageMultisample(i.RENDERBUFFER,We,Ke,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Se,i.RENDERBUFFER,N.__webglColorRenderbuffer[Se])}i.bindRenderbuffer(i.RENDERBUFFER,null),y.depthBuffer&&(N.__webglDepthRenderbuffer=i.createRenderbuffer(),De(N.__webglDepthRenderbuffer,y,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),V(i.TEXTURE_CUBE_MAP,v,be);for(let me=0;me<6;me++)if(o&&v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Ee(N.__webglFramebuffer[me][Se],y,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Se);else Ee(N.__webglFramebuffer[me],y,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0);S(v,be)&&x(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Q){const me=y.texture;for(let Se=0,Le=me.length;Se<Le;Se++){const ke=me[Se],ie=n.get(ke);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),V(i.TEXTURE_2D,ke,be),Ee(N.__webglFramebuffer,y,ke,i.COLOR_ATTACHMENT0+Se,i.TEXTURE_2D,0),S(ke,be)&&x(i.TEXTURE_2D)}t.unbindTexture()}else{let me=i.TEXTURE_2D;if((y.isWebGL3DRenderTarget||y.isWebGLArrayRenderTarget)&&(o?me=y.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(me,se.__webglTexture),V(me,v,be),o&&v.mipmaps&&v.mipmaps.length>0)for(let Se=0;Se<v.mipmaps.length;Se++)Ee(N.__webglFramebuffer[Se],y,v,i.COLOR_ATTACHMENT0,me,Se);else Ee(N.__webglFramebuffer,y,v,i.COLOR_ATTACHMENT0,me,0);S(v,be)&&x(me),t.unbindTexture()}y.depthBuffer&&Te(y)}function fe(y){const v=m(y)||o,N=y.isWebGLMultipleRenderTargets===!0?y.texture:[y.texture];for(let se=0,ne=N.length;se<ne;se++){const Q=N[se];if(S(Q,v)){const be=y.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,me=n.get(Q).__webglTexture;t.bindTexture(be,me),x(be),t.unbindTexture()}}}function X(y){if(o&&y.samples>0&&$(y)===!1){const v=y.isWebGLMultipleRenderTargets?y.texture:[y.texture],N=y.width,se=y.height;let ne=i.COLOR_BUFFER_BIT;const Q=[],be=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=n.get(y),Se=y.isWebGLMultipleRenderTargets===!0;if(Se)for(let Le=0;Le<v.length;Le++)t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,me.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglFramebuffer);for(let Le=0;Le<v.length;Le++){Q.push(i.COLOR_ATTACHMENT0+Le),y.depthBuffer&&Q.push(be);const ke=me.__ignoreDepthValues!==void 0?me.__ignoreDepthValues:!1;if(ke===!1&&(y.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),y.stencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),Se&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,me.__webglColorRenderbuffer[Le]),ke===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[be]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[be])),Se){const ie=n.get(v[Le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ie,0)}i.blitFramebuffer(0,0,N,se,0,0,N,se,ne,i.NEAREST),l&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Q)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Se)for(let Le=0;Le<v.length;Le++){t.bindFramebuffer(i.FRAMEBUFFER,me.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.RENDERBUFFER,me.__webglColorRenderbuffer[Le]);const ke=n.get(v[Le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,me.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Le,i.TEXTURE_2D,ke,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,me.__webglMultisampledFramebuffer)}}function ce(y){return Math.min(s.maxSamples,y.samples)}function $(y){const v=n.get(y);return o&&y.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function we(y){const v=a.render.frame;h.get(y)!==v&&(h.set(y,v),y.update())}function xe(y,v){const N=y.colorSpace,se=y.format,ne=y.type;return y.isCompressedTexture===!0||y.isVideoTexture===!0||y.format===po||N!==mn&&N!==Vt&&(et.getTransfer(N)===nt?o===!1?e.has("EXT_sRGB")===!0&&se===jt?(y.format=po,y.minFilter=kt,y.generateMipmaps=!1):v=al.sRGBToLinear(v):(se!==jt||ne!==Rn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",N)),v}this.allocateTextureUnit=L,this.resetTextureUnits=re,this.setTexture2D=B,this.setTexture2DArray=Y,this.setTexture3D=j,this.setTextureCube=K,this.rebindTextures=Oe,this.setupRenderTarget=P,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=X,this.setupDepthRenderbuffer=Te,this.setupFrameBufferTexture=Ee,this.useMultisampledRTT=$}function vg(i,e,t){const n=t.isWebGL2;function s(r,a=Vt){let o;const c=et.getTransfer(a);if(r===Rn)return i.UNSIGNED_BYTE;if(r===Zc)return i.UNSIGNED_SHORT_4_4_4_4;if(r===Jc)return i.UNSIGNED_SHORT_5_5_5_1;if(r===Qh)return i.BYTE;if(r===eu)return i.SHORT;if(r===yo)return i.UNSIGNED_SHORT;if(r===Kc)return i.INT;if(r===yn)return i.UNSIGNED_INT;if(r===bn)return i.FLOAT;if(r===Ki)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===tu)return i.ALPHA;if(r===jt)return i.RGBA;if(r===nu)return i.LUMINANCE;if(r===iu)return i.LUMINANCE_ALPHA;if(r===Vn)return i.DEPTH_COMPONENT;if(r===Ai)return i.DEPTH_STENCIL;if(r===po)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===su)return i.RED;if(r===Qc)return i.RED_INTEGER;if(r===ru)return i.RG;if(r===el)return i.RG_INTEGER;if(r===tl)return i.RGBA_INTEGER;if(r===xr||r===vr||r===Sr||r===Mr)if(c===nt)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===xr)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===vr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Sr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Mr)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===xr)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===vr)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Sr)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Mr)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Qo||r===ea||r===ta||r===na)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===Qo)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ea)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===ta)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===na)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===nl)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ia||r===sa)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===ia)return c===nt?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===sa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===ra||r===oa||r===aa||r===ca||r===la||r===ha||r===ua||r===da||r===fa||r===pa||r===ma||r===ga||r===_a||r===xa)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===ra)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===oa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===aa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===ca)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===la)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===ha)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ua)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===da)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===fa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===pa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===ma)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ga)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===_a)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===xa)return c===nt?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Er||r===va||r===Sa)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===Er)return c===nt?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===va)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Sa)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===ou||r===Ma||r===Ea||r===ya)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===Er)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ma)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ea)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ya)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Hn?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class Sg extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Ot extends St{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Mg={type:"move"};class Xr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ot,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ot,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ot,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mg)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ot;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Eg extends Kn{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const _=t.getContextAttributes();let m=null,p=null;const S=[],x=[],M=new he;let R=null;const w=new qt;w.layers.enable(1),w.viewport=new vt;const A=new qt;A.layers.enable(2),A.viewport=new vt;const F=[w,A],E=new Sg;E.layers.enable(1),E.layers.enable(2);let T=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let te=S[V];return te===void 0&&(te=new Xr,S[V]=te),te.getTargetRaySpace()},this.getControllerGrip=function(V){let te=S[V];return te===void 0&&(te=new Xr,S[V]=te),te.getGripSpace()},this.getHand=function(V){let te=S[V];return te===void 0&&(te=new Xr,S[V]=te),te.getHandSpace()};function W(V){const te=x.indexOf(V.inputSource);if(te===-1)return;const _e=S[te];_e!==void 0&&(_e.update(V.inputSource,V.frame,l||a),_e.dispatchEvent({type:V.type,data:V.inputSource}))}function re(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",re),s.removeEventListener("inputsourceschange",L);for(let V=0;V<S.length;V++){const te=x[V];te!==null&&(x[V]=null,S[V].disconnect(te))}T=null,z=null,e.setRenderTarget(m),f=null,u=null,d=null,s=null,p=null,ue.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(V){l=V},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",re),s.addEventListener("inputsourceschange",L),_.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(M),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const te={antialias:s.renderState.layers===void 0?_.antialias:!0,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Xn(f.framebufferWidth,f.framebufferHeight,{format:jt,type:Rn,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil})}else{let te=null,_e=null,Ae=null;_.depth&&(Ae=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=_.stencil?Ai:Vn,_e=_.stencil?Hn:yn);const Ee={colorFormat:t.RGBA8,depthFormat:Ae,scaleFactor:r};d=new XRWebGLBinding(s,t),u=d.createProjectionLayer(Ee),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),p=new Xn(u.textureWidth,u.textureHeight,{format:jt,type:Rn,depthTexture:new _l(u.textureWidth,u.textureHeight,_e,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0});const De=e.properties.get(p);De.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ue.setContext(s),ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function L(V){for(let te=0;te<V.removed.length;te++){const _e=V.removed[te],Ae=x.indexOf(_e);Ae>=0&&(x[Ae]=null,S[Ae].disconnect(_e))}for(let te=0;te<V.added.length;te++){const _e=V.added[te];let Ae=x.indexOf(_e);if(Ae===-1){for(let De=0;De<S.length;De++)if(De>=x.length){x.push(_e),Ae=De;break}else if(x[De]===null){x[De]=_e,Ae=De;break}if(Ae===-1)break}const Ee=S[Ae];Ee&&Ee.connect(_e)}}const O=new I,B=new I;function Y(V,te,_e){O.setFromMatrixPosition(te.matrixWorld),B.setFromMatrixPosition(_e.matrixWorld);const Ae=O.distanceTo(B),Ee=te.projectionMatrix.elements,De=_e.projectionMatrix.elements,Fe=Ee[14]/(Ee[10]-1),Te=Ee[14]/(Ee[10]+1),Oe=(Ee[9]+1)/Ee[5],P=(Ee[9]-1)/Ee[5],fe=(Ee[8]-1)/Ee[0],X=(De[8]+1)/De[0],ce=Fe*fe,$=Fe*X,we=Ae/(-fe+X),xe=we*-fe;te.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(xe),V.translateZ(we),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert();const y=Fe+we,v=Te+we,N=ce-xe,se=$+(Ae-xe),ne=Oe*Te/v*y,Q=P*Te/v*y;V.projectionMatrix.makePerspective(N,se,ne,Q,y,v),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}function j(V,te){te===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(te.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;E.near=A.near=w.near=V.near,E.far=A.far=w.far=V.far,(T!==E.near||z!==E.far)&&(s.updateRenderState({depthNear:E.near,depthFar:E.far}),T=E.near,z=E.far);const te=V.parent,_e=E.cameras;j(E,te);for(let Ae=0;Ae<_e.length;Ae++)j(_e[Ae],te);_e.length===2?Y(E,w,A):E.projectionMatrix.copy(w.projectionMatrix),K(V,E,te)};function K(V,te,_e){_e===null?V.matrix.copy(te.matrixWorld):(V.matrix.copy(_e.matrixWorld),V.matrix.invert(),V.matrix.multiply(te.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(te.projectionMatrix),V.projectionMatrixInverse.copy(te.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=mo*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return E},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(V){c=V,u!==null&&(u.fixedFoveation=V),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=V)};let Z=null;function ae(V,te){if(h=te.getViewerPose(l||a),g=te,h!==null){const _e=h.views;f!==null&&(e.setRenderTargetFramebuffer(p,f.framebuffer),e.setRenderTarget(p));let Ae=!1;_e.length!==E.cameras.length&&(E.cameras.length=0,Ae=!0);for(let Ee=0;Ee<_e.length;Ee++){const De=_e[Ee];let Fe=null;if(f!==null)Fe=f.getViewport(De);else{const Oe=d.getViewSubImage(u,De);Fe=Oe.viewport,Ee===0&&(e.setRenderTargetTextures(p,Oe.colorTexture,u.ignoreDepthValues?void 0:Oe.depthStencilTexture),e.setRenderTarget(p))}let Te=F[Ee];Te===void 0&&(Te=new qt,Te.layers.enable(Ee),Te.viewport=new vt,F[Ee]=Te),Te.matrix.fromArray(De.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(De.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(Fe.x,Fe.y,Fe.width,Fe.height),Ee===0&&(E.matrix.copy(Te.matrix),E.matrix.decompose(E.position,E.quaternion,E.scale)),Ae===!0&&E.cameras.push(Te)}}for(let _e=0;_e<S.length;_e++){const Ae=x[_e],Ee=S[_e];Ae!==null&&Ee!==void 0&&Ee.update(Ae,te,l||a)}Z&&Z(V,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const ue=new gl;ue.setAnimationLoop(ae),this.setAnimationLoop=function(V){Z=V},this.dispose=function(){}}}function yg(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,fl(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,x,M){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,M)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===It&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===It&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p).envMap;if(S&&(m.envMap.value=S,m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const x=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*x,t(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=x*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),e.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===It&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function bg(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(S,x){const M=x.program;n.uniformBlockBinding(S,M)}function l(S,x){let M=s[S.id];M===void 0&&(g(S),M=h(S),s[S.id]=M,S.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(S,R);const w=e.render.frame;r[S.id]!==w&&(u(S),r[S.id]=w)}function h(S){const x=d();S.__bindingPointIndex=x;const M=i.createBuffer(),R=S.__size,w=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,R,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,M),M}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const x=s[S.id],M=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let w=0,A=M.length;w<A;w++){const F=Array.isArray(M[w])?M[w]:[M[w]];for(let E=0,T=F.length;E<T;E++){const z=F[E];if(f(z,w,E,R)===!0){const W=z.__offset,re=Array.isArray(z.value)?z.value:[z.value];let L=0;for(let O=0;O<re.length;O++){const B=re[O],Y=_(B);typeof B=="number"||typeof B=="boolean"?(z.__data[0]=B,i.bufferSubData(i.UNIFORM_BUFFER,W+L,z.__data)):B.isMatrix3?(z.__data[0]=B.elements[0],z.__data[1]=B.elements[1],z.__data[2]=B.elements[2],z.__data[3]=0,z.__data[4]=B.elements[3],z.__data[5]=B.elements[4],z.__data[6]=B.elements[5],z.__data[7]=0,z.__data[8]=B.elements[6],z.__data[9]=B.elements[7],z.__data[10]=B.elements[8],z.__data[11]=0):(B.toArray(z.__data,L),L+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(S,x,M,R){const w=S.value,A=x+"_"+M;if(R[A]===void 0)return typeof w=="number"||typeof w=="boolean"?R[A]=w:R[A]=w.clone(),!0;{const F=R[A];if(typeof w=="number"||typeof w=="boolean"){if(F!==w)return R[A]=w,!0}else if(F.equals(w)===!1)return F.copy(w),!0}return!1}function g(S){const x=S.uniforms;let M=0;const R=16;for(let A=0,F=x.length;A<F;A++){const E=Array.isArray(x[A])?x[A]:[x[A]];for(let T=0,z=E.length;T<z;T++){const W=E[T],re=Array.isArray(W.value)?W.value:[W.value];for(let L=0,O=re.length;L<O;L++){const B=re[L],Y=_(B),j=M%R;j!==0&&R-j<Y.boundary&&(M+=R-j),W.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=M,M+=Y.storage}}}const w=M%R;return w>0&&(M+=R-w),S.__size=M,S.__cache={},this}function _(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const M=a.indexOf(x.__bindingPointIndex);a.splice(M,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class yl{constructor(e={}){const{canvas:t=vu(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=e;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Mt,this._useLegacyLights=!1,this.toneMapping=Cn,this.toneMappingExposure=1;const x=this;let M=!1,R=0,w=0,A=null,F=-1,E=null;const T=new vt,z=new vt;let W=null;const re=new Je(0);let L=0,O=t.width,B=t.height,Y=1,j=null,K=null;const Z=new vt(0,0,O,B),ae=new vt(0,0,O,B);let ue=!1;const V=new Ao;let te=!1,_e=!1,Ae=null;const Ee=new ct,De=new he,Fe=new I,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Oe(){return A===null?Y:1}let P=n;function fe(b,U){for(let G=0;G<b.length;G++){const H=b[G],k=t.getContext(H,U);if(k!==null)return k}return null}try{const b={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Eo}`),t.addEventListener("webglcontextlost",oe,!1),t.addEventListener("webglcontextrestored",D,!1),t.addEventListener("webglcontextcreationerror",de,!1),P===null){const U=["webgl2","webgl","experimental-webgl"];if(x.isWebGL1Renderer===!0&&U.shift(),P=fe(U,b),P===null)throw fe(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&P instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),P.getShaderPrecisionFormat===void 0&&(P.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let X,ce,$,we,xe,y,v,N,se,ne,Q,be,me,Se,Le,ke,ie,Ke,We,ze,Pe,ve,C,le;function Ce(){X=new Np(P),ce=new Cp(P,X,e),X.init(ce),ve=new vg(P,X,ce),$=new _g(P,X,ce),we=new Fp(P),xe=new ig,y=new xg(P,X,$,xe,ce,ve,we),v=new Pp(x),N=new Dp(x),se=new Wu(P,ce),C=new Ap(P,X,se,ce),ne=new Up(P,se,we,C),Q=new Gp(P,ne,se,we),We=new kp(P,ce,y),ke=new Rp(xe),be=new ng(x,v,N,X,ce,C,ke),me=new yg(x,xe),Se=new rg,Le=new ug(X,ce),Ke=new Tp(x,v,N,$,Q,u,c),ie=new gg(x,Q,ce),le=new bg(P,we,ce,$),ze=new wp(P,X,we,ce),Pe=new Op(P,X,we,ce),we.programs=be.programs,x.capabilities=ce,x.extensions=X,x.properties=xe,x.renderLists=Se,x.shadowMap=ie,x.state=$,x.info=we}Ce();const ye=new Eg(x,P);this.xr=ye,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const b=X.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=X.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(b){b!==void 0&&(Y=b,this.setSize(O,B,!1))},this.getSize=function(b){return b.set(O,B)},this.setSize=function(b,U,G=!0){if(ye.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}O=b,B=U,t.width=Math.floor(b*Y),t.height=Math.floor(U*Y),G===!0&&(t.style.width=b+"px",t.style.height=U+"px"),this.setViewport(0,0,b,U)},this.getDrawingBufferSize=function(b){return b.set(O*Y,B*Y).floor()},this.setDrawingBufferSize=function(b,U,G){O=b,B=U,Y=G,t.width=Math.floor(b*G),t.height=Math.floor(U*G),this.setViewport(0,0,b,U)},this.getCurrentViewport=function(b){return b.copy(T)},this.getViewport=function(b){return b.copy(Z)},this.setViewport=function(b,U,G,H){b.isVector4?Z.set(b.x,b.y,b.z,b.w):Z.set(b,U,G,H),$.viewport(T.copy(Z).multiplyScalar(Y).floor())},this.getScissor=function(b){return b.copy(ae)},this.setScissor=function(b,U,G,H){b.isVector4?ae.set(b.x,b.y,b.z,b.w):ae.set(b,U,G,H),$.scissor(z.copy(ae).multiplyScalar(Y).floor())},this.getScissorTest=function(){return ue},this.setScissorTest=function(b){$.setScissorTest(ue=b)},this.setOpaqueSort=function(b){j=b},this.setTransparentSort=function(b){K=b},this.getClearColor=function(b){return b.copy(Ke.getClearColor())},this.setClearColor=function(){Ke.setClearColor.apply(Ke,arguments)},this.getClearAlpha=function(){return Ke.getClearAlpha()},this.setClearAlpha=function(){Ke.setClearAlpha.apply(Ke,arguments)},this.clear=function(b=!0,U=!0,G=!0){let H=0;if(b){let k=!1;if(A!==null){const Me=A.texture.format;k=Me===tl||Me===el||Me===Qc}if(k){const Me=A.texture.type,Re=Me===Rn||Me===yn||Me===yo||Me===Hn||Me===Zc||Me===Jc,Ue=Ke.getClearColor(),Be=Ke.getClearAlpha(),$e=Ue.r,Ge=Ue.g,He=Ue.b;Re?(f[0]=$e,f[1]=Ge,f[2]=He,f[3]=Be,P.clearBufferuiv(P.COLOR,0,f)):(g[0]=$e,g[1]=Ge,g[2]=He,g[3]=Be,P.clearBufferiv(P.COLOR,0,g))}else H|=P.COLOR_BUFFER_BIT}U&&(H|=P.DEPTH_BUFFER_BIT),G&&(H|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",oe,!1),t.removeEventListener("webglcontextrestored",D,!1),t.removeEventListener("webglcontextcreationerror",de,!1),Se.dispose(),Le.dispose(),xe.dispose(),v.dispose(),N.dispose(),Q.dispose(),C.dispose(),le.dispose(),be.dispose(),ye.dispose(),ye.removeEventListener("sessionstart",ut),ye.removeEventListener("sessionend",Qe),Ae&&(Ae.dispose(),Ae=null),ft.stop()};function oe(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function D(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const b=we.autoReset,U=ie.enabled,G=ie.autoUpdate,H=ie.needsUpdate,k=ie.type;Ce(),we.autoReset=b,ie.enabled=U,ie.autoUpdate=G,ie.needsUpdate=H,ie.type=k}function de(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function ge(b){const U=b.target;U.removeEventListener("dispose",ge),Ne(U)}function Ne(b){Ie(b),xe.remove(b)}function Ie(b){const U=xe.get(b).programs;U!==void 0&&(U.forEach(function(G){be.releaseProgram(G)}),b.isShaderMaterial&&be.releaseShaderCache(b))}this.renderBufferDirect=function(b,U,G,H,k,Me){U===null&&(U=Te);const Re=k.isMesh&&k.matrixWorld.determinant()<0,Ue=Jl(b,U,G,H,k);$.setMaterial(H,Re);let Be=G.index,$e=1;if(H.wireframe===!0){if(Be=ne.getWireframeAttribute(G),Be===void 0)return;$e=2}const Ge=G.drawRange,He=G.attributes.position;let dt=Ge.start*$e,Dt=(Ge.start+Ge.count)*$e;Me!==null&&(dt=Math.max(dt,Me.start*$e),Dt=Math.min(Dt,(Me.start+Me.count)*$e)),Be!==null?(dt=Math.max(dt,0),Dt=Math.min(Dt,Be.count)):He!=null&&(dt=Math.max(dt,0),Dt=Math.min(Dt,He.count));const _t=Dt-dt;if(_t<0||_t===1/0)return;C.setup(k,H,Ue,G,Be);let sn,rt=ze;if(Be!==null&&(sn=se.get(Be),rt=Pe,rt.setIndex(sn)),k.isMesh)H.wireframe===!0?($.setLineWidth(H.wireframeLinewidth*Oe()),rt.setMode(P.LINES)):rt.setMode(P.TRIANGLES);else if(k.isLine){let Xe=H.linewidth;Xe===void 0&&(Xe=1),$.setLineWidth(Xe*Oe()),k.isLineSegments?rt.setMode(P.LINES):k.isLineLoop?rt.setMode(P.LINE_LOOP):rt.setMode(P.LINE_STRIP)}else k.isPoints?rt.setMode(P.POINTS):k.isSprite&&rt.setMode(P.TRIANGLES);if(k.isBatchedMesh)rt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else if(k.isInstancedMesh)rt.renderInstances(dt,_t,k.count);else if(G.isInstancedBufferGeometry){const Xe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,fr=Math.min(G.instanceCount,Xe);rt.renderInstances(dt,_t,fr)}else rt.render(dt,_t)};function Ye(b,U,G){b.transparent===!0&&b.side===Ht&&b.forceSinglePass===!1?(b.side=It,b.needsUpdate=!0,os(b,U,G),b.side=Pn,b.needsUpdate=!0,os(b,U,G),b.side=Ht):os(b,U,G)}this.compile=function(b,U,G=null){G===null&&(G=b),m=Le.get(G),m.init(),S.push(m),G.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),b!==G&&b.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(m.pushLight(k),k.castShadow&&m.pushShadow(k))}),m.setupLights(x._useLegacyLights);const H=new Set;return b.traverse(function(k){const Me=k.material;if(Me)if(Array.isArray(Me))for(let Re=0;Re<Me.length;Re++){const Ue=Me[Re];Ye(Ue,G,k),H.add(Ue)}else Ye(Me,G,k),H.add(Me)}),S.pop(),m=null,H},this.compileAsync=function(b,U,G=null){const H=this.compile(b,U,G);return new Promise(k=>{function Me(){if(H.forEach(function(Re){xe.get(Re).currentProgram.isReady()&&H.delete(Re)}),H.size===0){k(b);return}setTimeout(Me,10)}X.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let je=null;function lt(b){je&&je(b)}function ut(){ft.stop()}function Qe(){ft.start()}const ft=new gl;ft.setAnimationLoop(lt),typeof self<"u"&&ft.setContext(self),this.setAnimationLoop=function(b){je=b,ye.setAnimationLoop(b),b===null?ft.stop():ft.start()},ye.addEventListener("sessionstart",ut),ye.addEventListener("sessionend",Qe),this.render=function(b,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ye.enabled===!0&&ye.isPresenting===!0&&(ye.cameraAutoUpdate===!0&&ye.updateCamera(U),U=ye.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,U,A),m=Le.get(b,S.length),m.init(),S.push(m),Ee.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),V.setFromProjectionMatrix(Ee),_e=this.localClippingEnabled,te=ke.init(this.clippingPlanes,_e),_=Se.get(b,p.length),_.init(),p.push(_),Kt(b,U,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(j,K),this.info.render.frame++,te===!0&&ke.beginShadows();const G=m.state.shadowsArray;if(ie.render(G,b,U),te===!0&&ke.endShadows(),this.info.autoReset===!0&&this.info.reset(),Ke.render(_,b),m.setupLights(x._useLegacyLights),U.isArrayCamera){const H=U.cameras;for(let k=0,Me=H.length;k<Me;k++){const Re=H[k];zo(_,b,Re,Re.viewport)}}else zo(_,b,U);A!==null&&(y.updateMultisampleRenderTarget(A),y.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,U),C.resetDefaultState(),F=-1,E=null,S.pop(),S.length>0?m=S[S.length-1]:m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Kt(b,U,G,H){if(b.visible===!1)return;if(b.layers.test(U.layers)){if(b.isGroup)G=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(U);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||V.intersectsSprite(b)){H&&Fe.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ee);const Re=Q.update(b),Ue=b.material;Ue.visible&&_.push(b,Re,Ue,G,Fe.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||V.intersectsObject(b))){const Re=Q.update(b),Ue=b.material;if(H&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Fe.copy(b.boundingSphere.center)):(Re.boundingSphere===null&&Re.computeBoundingSphere(),Fe.copy(Re.boundingSphere.center)),Fe.applyMatrix4(b.matrixWorld).applyMatrix4(Ee)),Array.isArray(Ue)){const Be=Re.groups;for(let $e=0,Ge=Be.length;$e<Ge;$e++){const He=Be[$e],dt=Ue[He.materialIndex];dt&&dt.visible&&_.push(b,Re,dt,G,Fe.z,He)}}else Ue.visible&&_.push(b,Re,Ue,G,Fe.z,null)}}const Me=b.children;for(let Re=0,Ue=Me.length;Re<Ue;Re++)Kt(Me[Re],U,G,H)}function zo(b,U,G,H){const k=b.opaque,Me=b.transmissive,Re=b.transparent;m.setupLightsView(G),te===!0&&ke.setGlobalState(x.clippingPlanes,G),Me.length>0&&Zl(k,Me,U,G),H&&$.viewport(T.copy(H)),k.length>0&&rs(k,U,G),Me.length>0&&rs(Me,U,G),Re.length>0&&rs(Re,U,G),$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),$.setPolygonOffset(!1)}function Zl(b,U,G,H){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;const Me=ce.isWebGL2;Ae===null&&(Ae=new Xn(1,1,{generateMipmaps:!0,type:X.has("EXT_color_buffer_half_float")?Ki:Rn,minFilter:ji,samples:Me?4:0})),x.getDrawingBufferSize(De),Me?Ae.setSize(De.x,De.y):Ae.setSize(go(De.x),go(De.y));const Re=x.getRenderTarget();x.setRenderTarget(Ae),x.getClearColor(re),L=x.getClearAlpha(),L<1&&x.setClearColor(16777215,.5),x.clear();const Ue=x.toneMapping;x.toneMapping=Cn,rs(b,G,H),y.updateMultisampleRenderTarget(Ae),y.updateRenderTargetMipmap(Ae);let Be=!1;for(let $e=0,Ge=U.length;$e<Ge;$e++){const He=U[$e],dt=He.object,Dt=He.geometry,_t=He.material,sn=He.group;if(_t.side===Ht&&dt.layers.test(H.layers)){const rt=_t.side;_t.side=It,_t.needsUpdate=!0,Bo(dt,G,H,Dt,_t,sn),_t.side=rt,_t.needsUpdate=!0,Be=!0}}Be===!0&&(y.updateMultisampleRenderTarget(Ae),y.updateRenderTargetMipmap(Ae)),x.setRenderTarget(Re),x.setClearColor(re,L),x.toneMapping=Ue}function rs(b,U,G){const H=U.isScene===!0?U.overrideMaterial:null;for(let k=0,Me=b.length;k<Me;k++){const Re=b[k],Ue=Re.object,Be=Re.geometry,$e=H===null?Re.material:H,Ge=Re.group;Ue.layers.test(G.layers)&&Bo(Ue,U,G,Be,$e,Ge)}}function Bo(b,U,G,H,k,Me){b.onBeforeRender(x,U,G,H,k,Me),b.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),k.onBeforeRender(x,U,G,H,b,Me),k.transparent===!0&&k.side===Ht&&k.forceSinglePass===!1?(k.side=It,k.needsUpdate=!0,x.renderBufferDirect(G,U,H,k,b,Me),k.side=Pn,k.needsUpdate=!0,x.renderBufferDirect(G,U,H,k,b,Me),k.side=Ht):x.renderBufferDirect(G,U,H,k,b,Me),b.onAfterRender(x,U,G,H,k,Me)}function os(b,U,G){U.isScene!==!0&&(U=Te);const H=xe.get(b),k=m.state.lights,Me=m.state.shadowsArray,Re=k.state.version,Ue=be.getParameters(b,k.state,Me,U,G),Be=be.getProgramCacheKey(Ue);let $e=H.programs;H.environment=b.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(b.isMeshStandardMaterial?N:v).get(b.envMap||H.environment),$e===void 0&&(b.addEventListener("dispose",ge),$e=new Map,H.programs=$e);let Ge=$e.get(Be);if(Ge!==void 0){if(H.currentProgram===Ge&&H.lightsStateVersion===Re)return Go(b,Ue),Ge}else Ue.uniforms=be.getUniforms(b),b.onBuild(G,Ue,x),b.onBeforeCompile(Ue,x),Ge=be.acquireProgram(Ue,Be),$e.set(Be,Ge),H.uniforms=Ue.uniforms;const He=H.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(He.clippingPlanes=ke.uniform),Go(b,Ue),H.needsLights=eh(b),H.lightsStateVersion=Re,H.needsLights&&(He.ambientLightColor.value=k.state.ambient,He.lightProbe.value=k.state.probe,He.directionalLights.value=k.state.directional,He.directionalLightShadows.value=k.state.directionalShadow,He.spotLights.value=k.state.spot,He.spotLightShadows.value=k.state.spotShadow,He.rectAreaLights.value=k.state.rectArea,He.ltc_1.value=k.state.rectAreaLTC1,He.ltc_2.value=k.state.rectAreaLTC2,He.pointLights.value=k.state.point,He.pointLightShadows.value=k.state.pointShadow,He.hemisphereLights.value=k.state.hemi,He.directionalShadowMap.value=k.state.directionalShadowMap,He.directionalShadowMatrix.value=k.state.directionalShadowMatrix,He.spotShadowMap.value=k.state.spotShadowMap,He.spotLightMatrix.value=k.state.spotLightMatrix,He.spotLightMap.value=k.state.spotLightMap,He.pointShadowMap.value=k.state.pointShadowMap,He.pointShadowMatrix.value=k.state.pointShadowMatrix),H.currentProgram=Ge,H.uniformsList=null,Ge}function ko(b){if(b.uniformsList===null){const U=b.currentProgram.getUniforms();b.uniformsList=ks.seqWithValue(U.seq,b.uniforms)}return b.uniformsList}function Go(b,U){const G=xe.get(b);G.outputColorSpace=U.outputColorSpace,G.batching=U.batching,G.instancing=U.instancing,G.instancingColor=U.instancingColor,G.skinning=U.skinning,G.morphTargets=U.morphTargets,G.morphNormals=U.morphNormals,G.morphColors=U.morphColors,G.morphTargetsCount=U.morphTargetsCount,G.numClippingPlanes=U.numClippingPlanes,G.numIntersection=U.numClipIntersection,G.vertexAlphas=U.vertexAlphas,G.vertexTangents=U.vertexTangents,G.toneMapping=U.toneMapping}function Jl(b,U,G,H,k){U.isScene!==!0&&(U=Te),y.resetTextureUnits();const Me=U.fog,Re=H.isMeshStandardMaterial?U.environment:null,Ue=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:mn,Be=(H.isMeshStandardMaterial?N:v).get(H.envMap||Re),$e=H.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Ge=!!G.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),He=!!G.morphAttributes.position,dt=!!G.morphAttributes.normal,Dt=!!G.morphAttributes.color;let _t=Cn;H.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(_t=x.toneMapping);const sn=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,rt=sn!==void 0?sn.length:0,Xe=xe.get(H),fr=m.state.lights;if(te===!0&&(_e===!0||b!==E)){const zt=b===E&&H.id===F;ke.setState(H,b,zt)}let ht=!1;H.version===Xe.__version?(Xe.needsLights&&Xe.lightsStateVersion!==fr.state.version||Xe.outputColorSpace!==Ue||k.isBatchedMesh&&Xe.batching===!1||!k.isBatchedMesh&&Xe.batching===!0||k.isInstancedMesh&&Xe.instancing===!1||!k.isInstancedMesh&&Xe.instancing===!0||k.isSkinnedMesh&&Xe.skinning===!1||!k.isSkinnedMesh&&Xe.skinning===!0||k.isInstancedMesh&&Xe.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Xe.instancingColor===!1&&k.instanceColor!==null||Xe.envMap!==Be||H.fog===!0&&Xe.fog!==Me||Xe.numClippingPlanes!==void 0&&(Xe.numClippingPlanes!==ke.numPlanes||Xe.numIntersection!==ke.numIntersection)||Xe.vertexAlphas!==$e||Xe.vertexTangents!==Ge||Xe.morphTargets!==He||Xe.morphNormals!==dt||Xe.morphColors!==Dt||Xe.toneMapping!==_t||ce.isWebGL2===!0&&Xe.morphTargetsCount!==rt)&&(ht=!0):(ht=!0,Xe.__version=H.version);let In=Xe.currentProgram;ht===!0&&(In=os(H,U,k));let Ho=!1,Li=!1,pr=!1;const bt=In.getUniforms(),Dn=Xe.uniforms;if($.useProgram(In.program)&&(Ho=!0,Li=!0,pr=!0),H.id!==F&&(F=H.id,Li=!0),Ho||E!==b){bt.setValue(P,"projectionMatrix",b.projectionMatrix),bt.setValue(P,"viewMatrix",b.matrixWorldInverse);const zt=bt.map.cameraPosition;zt!==void 0&&zt.setValue(P,Fe.setFromMatrixPosition(b.matrixWorld)),ce.logarithmicDepthBuffer&&bt.setValue(P,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&bt.setValue(P,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Li=!0,pr=!0)}if(k.isSkinnedMesh){bt.setOptional(P,k,"bindMatrix"),bt.setOptional(P,k,"bindMatrixInverse");const zt=k.skeleton;zt&&(ce.floatVertexTextures?(zt.boneTexture===null&&zt.computeBoneTexture(),bt.setValue(P,"boneTexture",zt.boneTexture,y)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}k.isBatchedMesh&&(bt.setOptional(P,k,"batchingTexture"),bt.setValue(P,"batchingTexture",k._matricesTexture,y));const mr=G.morphAttributes;if((mr.position!==void 0||mr.normal!==void 0||mr.color!==void 0&&ce.isWebGL2===!0)&&We.update(k,G,In),(Li||Xe.receiveShadow!==k.receiveShadow)&&(Xe.receiveShadow=k.receiveShadow,bt.setValue(P,"receiveShadow",k.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(Dn.envMap.value=Be,Dn.flipEnvMap.value=Be.isCubeTexture&&Be.isRenderTargetTexture===!1?-1:1),Li&&(bt.setValue(P,"toneMappingExposure",x.toneMappingExposure),Xe.needsLights&&Ql(Dn,pr),Me&&H.fog===!0&&me.refreshFogUniforms(Dn,Me),me.refreshMaterialUniforms(Dn,H,Y,B,Ae),ks.upload(P,ko(Xe),Dn,y)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(ks.upload(P,ko(Xe),Dn,y),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&bt.setValue(P,"center",k.center),bt.setValue(P,"modelViewMatrix",k.modelViewMatrix),bt.setValue(P,"normalMatrix",k.normalMatrix),bt.setValue(P,"modelMatrix",k.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const zt=H.uniformsGroups;for(let gr=0,th=zt.length;gr<th;gr++)if(ce.isWebGL2){const Vo=zt[gr];le.update(Vo,In),le.bind(Vo,In)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return In}function Ql(b,U){b.ambientLightColor.needsUpdate=U,b.lightProbe.needsUpdate=U,b.directionalLights.needsUpdate=U,b.directionalLightShadows.needsUpdate=U,b.pointLights.needsUpdate=U,b.pointLightShadows.needsUpdate=U,b.spotLights.needsUpdate=U,b.spotLightShadows.needsUpdate=U,b.rectAreaLights.needsUpdate=U,b.hemisphereLights.needsUpdate=U}function eh(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,U,G){xe.get(b.texture).__webglTexture=U,xe.get(b.depthTexture).__webglTexture=G;const H=xe.get(b);H.__hasExternalTextures=!0,H.__hasExternalTextures&&(H.__autoAllocateDepthBuffer=G===void 0,H.__autoAllocateDepthBuffer||X.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),H.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(b,U){const G=xe.get(b);G.__webglFramebuffer=U,G.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(b,U=0,G=0){A=b,R=U,w=G;let H=!0,k=null,Me=!1,Re=!1;if(b){const Be=xe.get(b);Be.__useDefaultFramebuffer!==void 0?($.bindFramebuffer(P.FRAMEBUFFER,null),H=!1):Be.__webglFramebuffer===void 0?y.setupRenderTarget(b):Be.__hasExternalTextures&&y.rebindTextures(b,xe.get(b.texture).__webglTexture,xe.get(b.depthTexture).__webglTexture);const $e=b.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Re=!0);const Ge=xe.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[U])?k=Ge[U][G]:k=Ge[U],Me=!0):ce.isWebGL2&&b.samples>0&&y.useMultisampledRTT(b)===!1?k=xe.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?k=Ge[G]:k=Ge,T.copy(b.viewport),z.copy(b.scissor),W=b.scissorTest}else T.copy(Z).multiplyScalar(Y).floor(),z.copy(ae).multiplyScalar(Y).floor(),W=ue;if($.bindFramebuffer(P.FRAMEBUFFER,k)&&ce.drawBuffers&&H&&$.drawBuffers(b,k),$.viewport(T),$.scissor(z),$.setScissorTest(W),Me){const Be=xe.get(b.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,Be.__webglTexture,G)}else if(Re){const Be=xe.get(b.texture),$e=U||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Be.__webglTexture,G||0,$e)}F=-1},this.readRenderTargetPixels=function(b,U,G,H,k,Me,Re){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=xe.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Re!==void 0&&(Ue=Ue[Re]),Ue){$.bindFramebuffer(P.FRAMEBUFFER,Ue);try{const Be=b.texture,$e=Be.format,Ge=Be.type;if($e!==jt&&ve.convert($e)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const He=Ge===Ki&&(X.has("EXT_color_buffer_half_float")||ce.isWebGL2&&X.has("EXT_color_buffer_float"));if(Ge!==Rn&&ve.convert(Ge)!==P.getParameter(P.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ge===bn&&(ce.isWebGL2||X.has("OES_texture_float")||X.has("WEBGL_color_buffer_float")))&&!He){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=b.width-H&&G>=0&&G<=b.height-k&&P.readPixels(U,G,H,k,ve.convert($e),ve.convert(Ge),Me)}finally{const Be=A!==null?xe.get(A).__webglFramebuffer:null;$.bindFramebuffer(P.FRAMEBUFFER,Be)}}},this.copyFramebufferToTexture=function(b,U,G=0){const H=Math.pow(2,-G),k=Math.floor(U.image.width*H),Me=Math.floor(U.image.height*H);y.setTexture2D(U,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,b.x,b.y,k,Me),$.unbindTexture()},this.copyTextureToTexture=function(b,U,G,H=0){const k=U.image.width,Me=U.image.height,Re=ve.convert(G.format),Ue=ve.convert(G.type);y.setTexture2D(G,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,G.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,G.unpackAlignment),U.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,H,b.x,b.y,k,Me,Re,Ue,U.image.data):U.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,H,b.x,b.y,U.mipmaps[0].width,U.mipmaps[0].height,Re,U.mipmaps[0].data):P.texSubImage2D(P.TEXTURE_2D,H,b.x,b.y,Re,Ue,U.image),H===0&&G.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),$.unbindTexture()},this.copyTextureToTexture3D=function(b,U,G,H,k=0){if(x.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Me=b.max.x-b.min.x+1,Re=b.max.y-b.min.y+1,Ue=b.max.z-b.min.z+1,Be=ve.convert(H.format),$e=ve.convert(H.type);let Ge;if(H.isData3DTexture)y.setTexture3D(H,0),Ge=P.TEXTURE_3D;else if(H.isDataArrayTexture||H.isCompressedArrayTexture)y.setTexture2DArray(H,0),Ge=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,H.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,H.unpackAlignment);const He=P.getParameter(P.UNPACK_ROW_LENGTH),dt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Dt=P.getParameter(P.UNPACK_SKIP_PIXELS),_t=P.getParameter(P.UNPACK_SKIP_ROWS),sn=P.getParameter(P.UNPACK_SKIP_IMAGES),rt=G.isCompressedTexture?G.mipmaps[k]:G.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,rt.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,rt.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,b.min.x),P.pixelStorei(P.UNPACK_SKIP_ROWS,b.min.y),P.pixelStorei(P.UNPACK_SKIP_IMAGES,b.min.z),G.isDataTexture||G.isData3DTexture?P.texSubImage3D(Ge,k,U.x,U.y,U.z,Me,Re,Ue,Be,$e,rt.data):G.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),P.compressedTexSubImage3D(Ge,k,U.x,U.y,U.z,Me,Re,Ue,Be,rt.data)):P.texSubImage3D(Ge,k,U.x,U.y,U.z,Me,Re,Ue,Be,$e,rt),P.pixelStorei(P.UNPACK_ROW_LENGTH,He),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,dt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Dt),P.pixelStorei(P.UNPACK_SKIP_ROWS,_t),P.pixelStorei(P.UNPACK_SKIP_IMAGES,sn),k===0&&H.generateMipmaps&&P.generateMipmap(Ge),$.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?y.setTextureCube(b,0):b.isData3DTexture?y.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?y.setTexture2DArray(b,0):y.setTexture2D(b,0),$.unbindTexture()},this.resetState=function(){R=0,w=0,A=null,$.reset(),C.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===bo?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===ir?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Mt?Wn:il}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Wn?Mt:mn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class Tg extends yl{}Tg.prototype.isWebGL1Renderer=!0;class Ag extends St{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class bl extends Zn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Je(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const dc=new I,fc=new I,pc=new ct,qr=new rr,Rs=new sr;class wg extends St{constructor(e=new Pt,t=new bl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)dc.fromBufferAttribute(t,s-1),fc.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=dc.distanceTo(fc);e.setAttribute("lineDistance",new st(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere),Rs.applyMatrix4(s),Rs.radius+=r,e.ray.intersectsSphere(Rs)===!1)return;pc.copy(s).invert(),qr.copy(e.ray).applyMatrix4(pc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=new I,h=new I,d=new I,u=new I,f=this.isLineSegments?2:1,g=n.index,m=n.attributes.position;if(g!==null){const p=Math.max(0,a.start),S=Math.min(g.count,a.start+a.count);for(let x=p,M=S-1;x<M;x+=f){const R=g.getX(x),w=g.getX(x+1);if(l.fromBufferAttribute(m,R),h.fromBufferAttribute(m,w),qr.distanceSqToSegment(l,h,u,d)>c)continue;u.applyMatrix4(this.matrixWorld);const F=e.ray.origin.distanceTo(u);F<e.near||F>e.far||t.push({distance:F,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else{const p=Math.max(0,a.start),S=Math.min(m.count,a.start+a.count);for(let x=p,M=S-1;x<M;x+=f){if(l.fromBufferAttribute(m,x),h.fromBufferAttribute(m,x+1),qr.distanceSqToSegment(l,h,u,d)>c)continue;u.applyMatrix4(this.matrixWorld);const w=e.ray.origin.distanceTo(u);w<e.near||w>e.far||t.push({distance:w,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}const mc=new I,gc=new I;class Cg extends wg{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)mc.fromBufferAttribute(t,s),gc.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+mc.distanceTo(gc);e.setAttribute("lineDistance",new st(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,s=this.getPoint(0),r=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),r+=n.distanceTo(s),t.push(r),s=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){const n=this.getLengths();let s=0;const r=n.length;let a;t?a=t:a=e*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);const h=n[s],u=n[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=t||(a.isVector2?new he:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){const n=new I,s=[],r=[],a=[],o=new I,c=new ct;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new I)}r[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Et(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(t===!0){let f=Math.acos(Et(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Ro extends nn{constructor(e=0,t=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t){const n=t||new he,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);const o=this.aStartAngle+e*r;let c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class Rg extends Ro{constructor(e,t,n,s,r,a){super(e,t,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function Po(){let i=0,e=0,t=0,n=0;function s(r,a,o,c){i=r,e=o,t=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,h,d){let u=(a-r)/l-(o-r)/(l+h)+(o-a)/h,f=(o-a)/h-(c-a)/(h+d)+(c-o)/d;u*=h,f*=h,s(a,o,u,f)},calc:function(r){const a=r*r,o=a*r;return i+e*r+t*a+n*o}}}const Ps=new I,Yr=new Po,jr=new Po,Kr=new Po;class $n extends nn{constructor(e=[],t=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=s}getPoint(e,t=new I){const n=t,s=this.points,r=s.length,a=(r-(this.closed?0:1))*e;let o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,h;this.closed||o>0?l=s[(o-1)%r]:(Ps.subVectors(s[0],s[1]).add(s[0]),l=Ps);const d=s[o%r],u=s[(o+1)%r];if(this.closed||o+2<r?h=s[(o+2)%r]:(Ps.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=Ps),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),_=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),Yr.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,_,m),jr.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,_,m),Kr.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(Yr.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),jr.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),Kr.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(Yr.calc(c),jr.calc(c),Kr.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new I().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function _c(i,e,t,n,s){const r=(n-e)*.5,a=(s-t)*.5,o=i*i,c=i*o;return(2*t-2*n+r+a)*c+(-3*t+3*n-2*r-a)*o+r*i+t}function Pg(i,e){const t=1-i;return t*t*e}function Lg(i,e){return 2*(1-i)*i*e}function Ig(i,e){return i*i*e}function Wi(i,e,t,n){return Pg(i,e)+Lg(i,t)+Ig(i,n)}function Dg(i,e){const t=1-i;return t*t*t*e}function Ng(i,e){const t=1-i;return 3*t*t*i*e}function Ug(i,e){return 3*(1-i)*i*i*e}function Og(i,e){return i*i*i*e}function $i(i,e,t,n,s){return Dg(i,e)+Ng(i,t)+Ug(i,n)+Og(i,s)}class Tl extends nn{constructor(e=new he,t=new he,n=new he,s=new he){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($i(e,s.x,r.x,a.x,o.x),$i(e,s.y,r.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Fg extends nn{constructor(e=new I,t=new I,n=new I,s=new I){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=s}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set($i(e,s.x,r.x,a.x,o.x),$i(e,s.y,r.y,a.y,o.y),$i(e,s.z,r.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Al extends nn{constructor(e=new he,t=new he){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new he){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new he){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zg extends nn{constructor(e=new I,t=new I){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new I){const n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new I){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wl extends nn{constructor(e=new he,t=new he,n=new he){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new he){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Wi(e,s.x,r.x,a.x),Wi(e,s.y,r.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Cl extends nn{constructor(e=new I,t=new I,n=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new I){const n=t,s=this.v0,r=this.v1,a=this.v2;return n.set(Wi(e,s.x,r.x,a.x),Wi(e,s.y,r.y,a.y),Wi(e,s.z,r.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Rl extends nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new he){const n=t,s=this.points,r=(s.length-1)*e,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],h=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(_c(o,c.x,l.x,h.x,d.x),_c(o,c.y,l.y,h.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const s=e.points[t];this.points.push(new he().fromArray(s))}return this}}var Ks=Object.freeze({__proto__:null,ArcCurve:Rg,CatmullRomCurve3:$n,CubicBezierCurve:Tl,CubicBezierCurve3:Fg,EllipseCurve:Ro,LineCurve:Al,LineCurve3:zg,QuadraticBezierCurve:wl,QuadraticBezierCurve3:Cl,SplineCurve:Rl});class Bg extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){const n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ks[n](t,e))}return this}getPoint(e,t){const n=e*this.getLength(),s=this.getCurveLengths();let r=0;for(;r<s.length;){if(s[r]>=n){const a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,t)}r++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let t=0;for(let n=0,s=this.curves.length;n<s;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){const t=[];let n;for(let s=0,r=this.curves;s<r.length;s++){const a=r[s],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(s.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){const s=this.curves[t];e.curves.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){const s=e.curves[t];this.curves.push(new Ks[s.type]().fromJSON(s))}return this}}class xc extends Bg{constructor(e){super(),this.type="Path",this.currentPoint=new he,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){const n=new Al(this.currentPoint.clone(),new he(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,s){const r=new wl(this.currentPoint.clone(),new he(e,t),new he(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(e,t,n,s,r,a){const o=new Tl(this.currentPoint.clone(),new he(e,t),new he(n,s),new he(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(e){const t=[this.currentPoint.clone()].concat(e),n=new Rl(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,s,r,a){const o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,s,r,a),this}absarc(e,t,n,s,r,a){return this.absellipse(e,t,n,n,s,r,a),this}ellipse(e,t,n,s,r,a,o,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,s,r,a,o,c),this}absellipse(e,t,n,s,r,a,o,c){const l=new Ro(e,t,n,s,r,a,o,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class lr extends Pt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new I,h=new he;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=t;d++,u+=3){const f=n+d/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/e+1)/2,h.y=(a[u+1]/e+1)/2,c.push(h.x,h.y)}for(let d=1;d<=t;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new st(a,3)),this.setAttribute("normal",new st(o,3)),this.setAttribute("uv",new st(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lr(e.radius,e.segments,e.thetaStart,e.thetaLength)}}const Ls=new I,Is=new I,Zr=new I,Ds=new Gt;class Pl extends Pt{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){const s=Math.pow(10,4),r=Math.cos(Hi*t),a=e.getIndex(),o=e.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],h=["a","b","c"],d=new Array(3),u={},f=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:_,b:m,c:p}=Ds;if(_.fromBufferAttribute(o,l[0]),m.fromBufferAttribute(o,l[1]),p.fromBufferAttribute(o,l[2]),Ds.getNormal(Zr),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(m.x*s)},${Math.round(m.y*s)},${Math.round(m.z*s)}`,d[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let S=0;S<3;S++){const x=(S+1)%3,M=d[S],R=d[x],w=Ds[h[S]],A=Ds[h[x]],F=`${M}_${R}`,E=`${R}_${M}`;E in u&&u[E]?(Zr.dot(u[E].normal)<=r&&(f.push(w.x,w.y,w.z),f.push(A.x,A.y,A.z)),u[E]=null):F in u||(u[F]={index0:l[S],index1:l[x],normal:Zr.clone()})}}for(const g in u)if(u[g]){const{index0:_,index1:m}=u[g];Ls.fromBufferAttribute(o,_),Is.fromBufferAttribute(o,m),f.push(Ls.x,Ls.y,Ls.z),f.push(Is.x,Is.y,Is.z)}this.setAttribute("position",new st(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class hr extends xc{constructor(e){super(e),this.uuid=Ci(),this.type="Shape",this.holes=[]}getPointsHoles(e){const t=[];for(let n=0,s=this.holes.length;n<s;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){const s=this.holes[t];e.holes.push(s.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){const s=e.holes[t];this.holes.push(new xc().fromJSON(s))}return this}}const kg={triangulate:function(i,e,t=2){const n=e&&e.length,s=n?e[0]*t:i.length;let r=Ll(i,0,s,t,!0);const a=[];if(!r||r.next===r.prev)return a;let o,c,l,h,d,u,f;if(n&&(r=$g(i,e,r,t)),i.length>80*t){o=l=i[0],c=h=i[1];for(let g=t;g<s;g+=t)d=i[g],u=i[g+1],d<o&&(o=d),u<c&&(c=u),d>l&&(l=d),u>h&&(h=u);f=Math.max(l-o,h-c),f=f!==0?32767/f:0}return Zi(r,a,t,o,c,f,0),a}};function Ll(i,e,t,n,s){let r,a;if(s===n_(i,e,t,n)>0)for(r=e;r<t;r+=n)a=vc(r,i[r],i[r+1],a);else for(r=t-n;r>=e;r-=n)a=vc(r,i[r],i[r+1],a);return a&&ur(a,a.next)&&(Qi(a),a=a.next),a}function jn(i,e){if(!i)return i;e||(e=i);let t=i,n;do if(n=!1,!t.steiner&&(ur(t,t.next)||at(t.prev,t,t.next)===0)){if(Qi(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Zi(i,e,t,n,s,r,a){if(!i)return;!a&&r&&Kg(i,n,s,r);let o=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?Hg(i,n,s,r):Gg(i)){e.push(c.i/t|0),e.push(i.i/t|0),e.push(l.i/t|0),Qi(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=Vg(jn(i),e,t),Zi(i,e,t,n,s,r,2)):a===2&&Wg(i,e,t,n,s,r):Zi(jn(i),e,t,n,s,r,1);break}}}function Gg(i){const e=i.prev,t=i,n=i.next;if(at(e,t,n)>=0)return!1;const s=e.x,r=t.x,a=n.x,o=e.y,c=t.y,l=n.y,h=s<r?s<a?s:a:r<a?r:a,d=o<c?o<l?o:l:c<l?c:l,u=s>r?s>a?s:a:r>a?r:a,f=o>c?o>l?o:l:c>l?c:l;let g=n.next;for(;g!==e;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Si(s,o,r,c,a,l,g.x,g.y)&&at(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Hg(i,e,t,n){const s=i.prev,r=i,a=i.next;if(at(s,r,a)>=0)return!1;const o=s.x,c=r.x,l=a.x,h=s.y,d=r.y,u=a.y,f=o<c?o<l?o:l:c<l?c:l,g=h<d?h<u?h:u:d<u?d:u,_=o>c?o>l?o:l:c>l?c:l,m=h>d?h>u?h:u:d>u?d:u,p=xo(f,g,e,t,n),S=xo(_,m,e,t,n);let x=i.prevZ,M=i.nextZ;for(;x&&x.z>=p&&M&&M.z<=S;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Si(o,h,c,d,l,u,x.x,x.y)&&at(x.prev,x,x.next)>=0||(x=x.prevZ,M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Si(o,h,c,d,l,u,M.x,M.y)&&at(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==s&&x!==a&&Si(o,h,c,d,l,u,x.x,x.y)&&at(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;M&&M.z<=S;){if(M.x>=f&&M.x<=_&&M.y>=g&&M.y<=m&&M!==s&&M!==a&&Si(o,h,c,d,l,u,M.x,M.y)&&at(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Vg(i,e,t){let n=i;do{const s=n.prev,r=n.next.next;!ur(s,r)&&Il(s,n,n.next,r)&&Ji(s,r)&&Ji(r,s)&&(e.push(s.i/t|0),e.push(n.i/t|0),e.push(r.i/t|0),Qi(n),Qi(n.next),n=i=r),n=n.next}while(n!==i);return jn(n)}function Wg(i,e,t,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&Qg(a,o)){let c=Dl(a,o);a=jn(a,a.next),c=jn(c,c.next),Zi(a,e,t,n,s,r,0),Zi(c,e,t,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function $g(i,e,t,n){const s=[];let r,a,o,c,l;for(r=0,a=e.length;r<a;r++)o=e[r]*n,c=r<a-1?e[r+1]*n:i.length,l=Ll(i,o,c,n,!1),l===l.next&&(l.steiner=!0),s.push(Jg(l));for(s.sort(Xg),r=0;r<s.length;r++)t=qg(s[r],t);return t}function Xg(i,e){return i.x-e.x}function qg(i,e){const t=Yg(i,e);if(!t)return e;const n=Dl(t,i);return jn(n,n.next),jn(t,t.next)}function Yg(i,e){let t=e,n=-1/0,s;const r=i.x,a=i.y;do{if(a<=t.y&&a>=t.next.y&&t.next.y!==t.y){const u=t.x+(a-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=r&&u>n&&(n=u,s=t.x<t.next.x?t:t.next,u===r))return s}t=t.next}while(t!==e);if(!s)return null;const o=s,c=s.x,l=s.y;let h=1/0,d;t=s;do r>=t.x&&t.x>=c&&r!==t.x&&Si(a<l?r:n,a,c,l,a<l?n:r,a,t.x,t.y)&&(d=Math.abs(a-t.y)/(r-t.x),Ji(t,i)&&(d<h||d===h&&(t.x>s.x||t.x===s.x&&jg(s,t)))&&(s=t,h=d)),t=t.next;while(t!==o);return s}function jg(i,e){return at(i.prev,i,e.prev)<0&&at(e.next,i,i.next)<0}function Kg(i,e,t,n){let s=i;do s.z===0&&(s.z=xo(s.x,s.y,e,t,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,Zg(s)}function Zg(i){let e,t,n,s,r,a,o,c,l=1;do{for(t=i,i=null,r=null,a=0;t;){for(a++,n=t,o=0,e=0;e<l&&(o++,n=n.nextZ,!!n);e++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||t.z<=n.z)?(s=t,t=t.nextZ,o--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;t=n}r.nextZ=null,l*=2}while(a>1);return i}function xo(i,e,t,n,s){return i=(i-t)*s|0,e=(e-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,i|e<<1}function Jg(i){let e=i,t=i;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==i);return t}function Si(i,e,t,n,s,r,a,o){return(s-a)*(e-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(r-o)>=(s-a)*(n-o)}function Qg(i,e){return i.next.i!==e.i&&i.prev.i!==e.i&&!e_(i,e)&&(Ji(i,e)&&Ji(e,i)&&t_(i,e)&&(at(i.prev,i,e.prev)||at(i,e.prev,e))||ur(i,e)&&at(i.prev,i,i.next)>0&&at(e.prev,e,e.next)>0)}function at(i,e,t){return(e.y-i.y)*(t.x-e.x)-(e.x-i.x)*(t.y-e.y)}function ur(i,e){return i.x===e.x&&i.y===e.y}function Il(i,e,t,n){const s=Us(at(i,e,t)),r=Us(at(i,e,n)),a=Us(at(t,n,i)),o=Us(at(t,n,e));return!!(s!==r&&a!==o||s===0&&Ns(i,t,e)||r===0&&Ns(i,n,e)||a===0&&Ns(t,i,n)||o===0&&Ns(t,e,n))}function Ns(i,e,t){return e.x<=Math.max(i.x,t.x)&&e.x>=Math.min(i.x,t.x)&&e.y<=Math.max(i.y,t.y)&&e.y>=Math.min(i.y,t.y)}function Us(i){return i>0?1:i<0?-1:0}function e_(i,e){let t=i;do{if(t.i!==i.i&&t.next.i!==i.i&&t.i!==e.i&&t.next.i!==e.i&&Il(t,t.next,i,e))return!0;t=t.next}while(t!==i);return!1}function Ji(i,e){return at(i.prev,i,i.next)<0?at(i,e,i.next)>=0&&at(i,i.prev,e)>=0:at(i,e,i.prev)<0||at(i,i.next,e)<0}function t_(i,e){let t=i,n=!1;const s=(i.x+e.x)/2,r=(i.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&s<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==i);return n}function Dl(i,e){const t=new vo(i.i,i.x,i.y),n=new vo(e.i,e.x,e.y),s=i.next,r=e.prev;return i.next=e,e.prev=i,t.next=s,s.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function vc(i,e,t,n){const s=new vo(i,e,t);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Qi(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function vo(i,e,t){this.i=i,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function n_(i,e,t,n){let s=0;for(let r=e,a=t-n;r<t;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}class Xi{static area(e){const t=e.length;let n=0;for(let s=t-1,r=0;r<t;s=r++)n+=e[s].x*e[r].y-e[r].x*e[s].y;return n*.5}static isClockWise(e){return Xi.area(e)<0}static triangulateShape(e,t){const n=[],s=[],r=[];Sc(e),Mc(n,e);let a=e.length;t.forEach(Sc);for(let c=0;c<t.length;c++)s.push(a),a+=t[c].length,Mc(n,t[c]);const o=kg.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}}function Sc(i){const e=i.length;e>2&&i[e-1].equals(i[0])&&i.pop()}function Mc(i,e){for(let t=0;t<e.length;t++)i.push(e[t].x),i.push(e[t].y)}class ts extends Pt{constructor(e=new hr([new he(.5,.5),new he(-.5,.5),new he(-.5,-.5),new he(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];const n=this,s=[],r=[];for(let o=0,c=e.length;o<c;o++){const l=e[o];a(l)}this.setAttribute("position",new st(s,3)),this.setAttribute("uv",new st(r,2)),this.computeVertexNormals();function a(o){const c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,d=t.depth!==void 0?t.depth:1;let u=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3;const p=t.extrudePath,S=t.UVGenerator!==void 0?t.UVGenerator:i_;let x,M=!1,R,w,A,F;p&&(x=p.getSpacedPoints(h),M=!0,u=!1,R=p.computeFrenetFrames(h,!1),w=new I,A=new I,F=new I),u||(m=0,f=0,g=0,_=0);const E=o.extractPoints(l);let T=E.shape;const z=E.holes;if(!Xi.isClockWise(T)){T=T.reverse();for(let P=0,fe=z.length;P<fe;P++){const X=z[P];Xi.isClockWise(X)&&(z[P]=X.reverse())}}const re=Xi.triangulateShape(T,z),L=T;for(let P=0,fe=z.length;P<fe;P++){const X=z[P];T=T.concat(X)}function O(P,fe,X){return fe||console.error("THREE.ExtrudeGeometry: vec does not exist"),P.clone().addScaledVector(fe,X)}const B=T.length,Y=re.length;function j(P,fe,X){let ce,$,we;const xe=P.x-fe.x,y=P.y-fe.y,v=X.x-P.x,N=X.y-P.y,se=xe*xe+y*y,ne=xe*N-y*v;if(Math.abs(ne)>Number.EPSILON){const Q=Math.sqrt(se),be=Math.sqrt(v*v+N*N),me=fe.x-y/Q,Se=fe.y+xe/Q,Le=X.x-N/be,ke=X.y+v/be,ie=((Le-me)*N-(ke-Se)*v)/(xe*N-y*v);ce=me+xe*ie-P.x,$=Se+y*ie-P.y;const Ke=ce*ce+$*$;if(Ke<=2)return new he(ce,$);we=Math.sqrt(Ke/2)}else{let Q=!1;xe>Number.EPSILON?v>Number.EPSILON&&(Q=!0):xe<-Number.EPSILON?v<-Number.EPSILON&&(Q=!0):Math.sign(y)===Math.sign(N)&&(Q=!0),Q?(ce=-y,$=xe,we=Math.sqrt(se)):(ce=xe,$=y,we=Math.sqrt(se/2))}return new he(ce/we,$/we)}const K=[];for(let P=0,fe=L.length,X=fe-1,ce=P+1;P<fe;P++,X++,ce++)X===fe&&(X=0),ce===fe&&(ce=0),K[P]=j(L[P],L[X],L[ce]);const Z=[];let ae,ue=K.concat();for(let P=0,fe=z.length;P<fe;P++){const X=z[P];ae=[];for(let ce=0,$=X.length,we=$-1,xe=ce+1;ce<$;ce++,we++,xe++)we===$&&(we=0),xe===$&&(xe=0),ae[ce]=j(X[ce],X[we],X[xe]);Z.push(ae),ue=ue.concat(ae)}for(let P=0;P<m;P++){const fe=P/m,X=f*Math.cos(fe*Math.PI/2),ce=g*Math.sin(fe*Math.PI/2)+_;for(let $=0,we=L.length;$<we;$++){const xe=O(L[$],K[$],ce);Ee(xe.x,xe.y,-X)}for(let $=0,we=z.length;$<we;$++){const xe=z[$];ae=Z[$];for(let y=0,v=xe.length;y<v;y++){const N=O(xe[y],ae[y],ce);Ee(N.x,N.y,-X)}}}const V=g+_;for(let P=0;P<B;P++){const fe=u?O(T[P],ue[P],V):T[P];M?(A.copy(R.normals[0]).multiplyScalar(fe.x),w.copy(R.binormals[0]).multiplyScalar(fe.y),F.copy(x[0]).add(A).add(w),Ee(F.x,F.y,F.z)):Ee(fe.x,fe.y,0)}for(let P=1;P<=h;P++)for(let fe=0;fe<B;fe++){const X=u?O(T[fe],ue[fe],V):T[fe];M?(A.copy(R.normals[P]).multiplyScalar(X.x),w.copy(R.binormals[P]).multiplyScalar(X.y),F.copy(x[P]).add(A).add(w),Ee(F.x,F.y,F.z)):Ee(X.x,X.y,d/h*P)}for(let P=m-1;P>=0;P--){const fe=P/m,X=f*Math.cos(fe*Math.PI/2),ce=g*Math.sin(fe*Math.PI/2)+_;for(let $=0,we=L.length;$<we;$++){const xe=O(L[$],K[$],ce);Ee(xe.x,xe.y,d+X)}for(let $=0,we=z.length;$<we;$++){const xe=z[$];ae=Z[$];for(let y=0,v=xe.length;y<v;y++){const N=O(xe[y],ae[y],ce);M?Ee(N.x,N.y+x[h-1].y,x[h-1].x+X):Ee(N.x,N.y,d+X)}}}te(),_e();function te(){const P=s.length/3;if(u){let fe=0,X=B*fe;for(let ce=0;ce<Y;ce++){const $=re[ce];De($[2]+X,$[1]+X,$[0]+X)}fe=h+m*2,X=B*fe;for(let ce=0;ce<Y;ce++){const $=re[ce];De($[0]+X,$[1]+X,$[2]+X)}}else{for(let fe=0;fe<Y;fe++){const X=re[fe];De(X[2],X[1],X[0])}for(let fe=0;fe<Y;fe++){const X=re[fe];De(X[0]+B*h,X[1]+B*h,X[2]+B*h)}}n.addGroup(P,s.length/3-P,0)}function _e(){const P=s.length/3;let fe=0;Ae(L,fe),fe+=L.length;for(let X=0,ce=z.length;X<ce;X++){const $=z[X];Ae($,fe),fe+=$.length}n.addGroup(P,s.length/3-P,1)}function Ae(P,fe){let X=P.length;for(;--X>=0;){const ce=X;let $=X-1;$<0&&($=P.length-1);for(let we=0,xe=h+m*2;we<xe;we++){const y=B*we,v=B*(we+1),N=fe+ce+y,se=fe+$+y,ne=fe+$+v,Q=fe+ce+v;Fe(N,se,ne,Q)}}}function Ee(P,fe,X){c.push(P),c.push(fe),c.push(X)}function De(P,fe,X){Te(P),Te(fe),Te(X);const ce=s.length/3,$=S.generateTopUV(n,s,ce-3,ce-2,ce-1);Oe($[0]),Oe($[1]),Oe($[2])}function Fe(P,fe,X,ce){Te(P),Te(fe),Te(ce),Te(fe),Te(X),Te(ce);const $=s.length/3,we=S.generateSideWallUV(n,s,$-6,$-3,$-2,$-1);Oe(we[0]),Oe(we[1]),Oe(we[3]),Oe(we[1]),Oe(we[2]),Oe(we[3])}function Te(P){s.push(c[P*3+0]),s.push(c[P*3+1]),s.push(c[P*3+2])}function Oe(P){r.push(P.x),r.push(P.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return s_(t,n,e)}static fromJSON(e,t){const n=[];for(let r=0,a=e.shapes.length;r<a;r++){const o=t[e.shapes[r]];n.push(o)}const s=e.options.extrudePath;return s!==void 0&&(e.options.extrudePath=new Ks[s.type]().fromJSON(s)),new ts(n,e.options)}}const i_={generateTopUV:function(i,e,t,n,s){const r=e[t*3],a=e[t*3+1],o=e[n*3],c=e[n*3+1],l=e[s*3],h=e[s*3+1];return[new he(r,a),new he(o,c),new he(l,h)]},generateSideWallUV:function(i,e,t,n,s,r){const a=e[t*3],o=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],d=e[n*3+2],u=e[s*3],f=e[s*3+1],g=e[s*3+2],_=e[r*3],m=e[r*3+1],p=e[r*3+2];return Math.abs(o-h)<Math.abs(a-l)?[new he(a,1-c),new he(l,1-d),new he(u,1-g),new he(_,1-p)]:[new he(o,1-c),new he(h,1-d),new he(f,1-g),new he(m,1-p)]}};function s_(i,e,t){if(t.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const r=i[n];t.shapes.push(r.uuid)}else t.shapes.push(i.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}class Lo extends Pt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let d=e;const u=(t-e)/s,f=new I,g=new he;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const S=p+m,x=S,M=S+n+1,R=S+n+2,w=S+1;o.push(x,M,w),o.push(M,R,w)}}this.setIndex(o),this.setAttribute("position",new st(c,3)),this.setAttribute("normal",new st(l,3)),this.setAttribute("uv",new st(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class ns extends Pt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new I,u=new I,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],x=p/n;let M=0;p===0&&a===0?M=.5/t:p===n&&c===Math.PI&&(M=-.5/t);for(let R=0;R<=t;R++){const w=R/t;d.x=-e*Math.cos(s+w*r)*Math.sin(a+x*o),d.y=e*Math.cos(a+x*o),d.z=e*Math.sin(s+w*r)*Math.sin(a+x*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),m.push(w+M,1-x),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<t;S++){const x=h[p][S+1],M=h[p][S],R=h[p+1][S],w=h[p+1][S+1];(p!==0||a>0)&&f.push(x,M,w),(p!==n-1||c<Math.PI)&&f.push(M,R,w)}this.setIndex(f),this.setAttribute("position",new st(g,3)),this.setAttribute("normal",new st(_,3)),this.setAttribute("uv",new st(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ns(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Zs extends Pt{constructor(e=new Cl(new I(-1,-1,0),new I(-1,1,0),new I(1,1,0)),t=64,n=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:s,closed:r};const a=e.computeFrenetFrames(t,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new I,c=new I,l=new he;let h=new I;const d=[],u=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new st(d,3)),this.setAttribute("normal",new st(u,3)),this.setAttribute("uv",new st(f,2));function _(){for(let x=0;x<t;x++)m(x);m(r===!1?t:0),S(),p()}function m(x){h=e.getPointAt(x/t,h);const M=a.normals[x],R=a.binormals[x];for(let w=0;w<=s;w++){const A=w/s*Math.PI*2,F=Math.sin(A),E=-Math.cos(A);c.x=E*M.x+F*R.x,c.y=E*M.y+F*R.y,c.z=E*M.z+F*R.z,c.normalize(),u.push(c.x,c.y,c.z),o.x=h.x+n*c.x,o.y=h.y+n*c.y,o.z=h.z+n*c.z,d.push(o.x,o.y,o.z)}}function p(){for(let x=1;x<=t;x++)for(let M=1;M<=s;M++){const R=(s+1)*(x-1)+(M-1),w=(s+1)*x+(M-1),A=(s+1)*x+M,F=(s+1)*(x-1)+M;g.push(R,w,F),g.push(w,A,F)}}function S(){for(let x=0;x<=t;x++)for(let M=0;M<=s;M++)l.x=x/t,l.y=M/s,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new Zs(new Ks[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class Tn extends Zn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=sl,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nl extends St{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Jr=new ct,Ec=new I,yc=new I;class r_{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ao,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ec.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ec),yc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yc),t.updateMatrixWorld(),Jr.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Jr)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class o_ extends r_{constructor(){super(new wo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class a_ extends Nl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(St.DEFAULT_UP),this.updateMatrix(),this.target=new St,this.shadow=new o_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class c_ extends Nl{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class l_{constructor(e,t,n=0,s=1/0){this.ray=new rr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new To,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return So(e,this,n,t),n.sort(bc),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)So(e[s],this,n,t);return n.sort(bc),n}}function bc(i,e){return i.distance-e.distance}function So(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)So(s[r],e,t,!0)}}class Tc{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Et(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Eo}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Eo);class h_ extends St{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new he(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof Element&&t.element.parentNode!==null&&t.element.parentNode.removeChild(t.element)})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}}const mi=new I,Ac=new ct,wc=new ct,Cc=new I,Rc=new I;class u_{constructor(e={}){const t=this;let n,s,r,a;const o={objects:new WeakMap},c=e.element!==void 0?e.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c,this.getSize=function(){return{width:n,height:s}},this.render=function(f,g){f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld(),g.parent===null&&g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),Ac.copy(g.matrixWorldInverse),wc.multiplyMatrices(g.projectionMatrix,Ac),l(f,f,g),u(f)},this.setSize=function(f,g){n=f,s=g,r=n/2,a=s/2,c.style.width=f+"px",c.style.height=g+"px"};function l(f,g,_){if(f.isCSS2DObject){mi.setFromMatrixPosition(f.matrixWorld),mi.applyMatrix4(wc);const m=f.visible===!0&&mi.z>=-1&&mi.z<=1&&f.layers.test(_.layers)===!0;if(f.element.style.display=m===!0?"":"none",m===!0){f.onBeforeRender(t,g,_);const S=f.element;S.style.transform="translate("+-100*f.center.x+"%,"+-100*f.center.y+"%)translate("+(mi.x*r+r)+"px,"+(-mi.y*a+a)+"px)",S.parentNode!==c&&c.appendChild(S),f.onAfterRender(t,g,_)}const p={distanceToCameraSquared:h(_,f)};o.objects.set(f,p)}for(let m=0,p=f.children.length;m<p;m++)l(f.children[m],g,_)}function h(f,g){return Cc.setFromMatrixPosition(f.matrixWorld),Rc.setFromMatrixPosition(g.matrixWorld),Cc.distanceToSquared(Rc)}function d(f){const g=[];return f.traverse(function(_){_.isCSS2DObject&&g.push(_)}),g}function u(f){const g=d(f).sort(function(m,p){if(m.renderOrder!==p.renderOrder)return p.renderOrder-m.renderOrder;const S=o.objects.get(m).distanceToCameraSquared,x=o.objects.get(p).distanceToCameraSquared;return S-x}),_=g.length;for(let m=0,p=g.length;m<p;m++)g[m].element.style.zIndex=_-m}}}const Pc={type:"change"},Qr={type:"start"},Lc={type:"end"},Os=new rr,Ic=new En,d_=Math.cos(70*xu.DEG2RAD);class f_ extends Kn{constructor(e,t){super(),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new I,this.cursor=new I,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:dn.ROTATE,MIDDLE:dn.DOLLY,RIGHT:dn.PAN},this.touches={ONE:Mn.ROTATE,TWO:Mn.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return o.phi},this.getAzimuthalAngle=function(){return o.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(C){C.addEventListener("keydown",Le),this._domElementKeyEvents=C},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Le),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(Pc),n.update(),r=s.NONE},this.update=function(){const C=new I,le=new qn().setFromUnitVectors(e.up,new I(0,1,0)),Ce=le.clone().invert(),ye=new I,oe=new qn,D=new I,de=2*Math.PI;return function(Ne=null){const Ie=n.object.position;C.copy(Ie).sub(n.target),C.applyQuaternion(le),o.setFromVector3(C),n.autoRotate&&r===s.NONE&&W(T(Ne)),n.enableDamping?(o.theta+=c.theta*n.dampingFactor,o.phi+=c.phi*n.dampingFactor):(o.theta+=c.theta,o.phi+=c.phi);let Ye=n.minAzimuthAngle,je=n.maxAzimuthAngle;isFinite(Ye)&&isFinite(je)&&(Ye<-Math.PI?Ye+=de:Ye>Math.PI&&(Ye-=de),je<-Math.PI?je+=de:je>Math.PI&&(je-=de),Ye<=je?o.theta=Math.max(Ye,Math.min(je,o.theta)):o.theta=o.theta>(Ye+je)/2?Math.max(Ye,o.theta):Math.min(je,o.theta)),o.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,o.phi)),o.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor),n.zoomToCursor&&w||n.object.isOrthographicCamera?o.radius=Z(o.radius):o.radius=Z(o.radius*l),C.setFromSpherical(o),C.applyQuaternion(Ce),Ie.copy(n.target).add(C),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0));let lt=!1;if(n.zoomToCursor&&w){let ut=null;if(n.object.isPerspectiveCamera){const Qe=C.length();ut=Z(Qe*l);const ft=Qe-ut;n.object.position.addScaledVector(M,ft),n.object.updateMatrixWorld()}else if(n.object.isOrthographicCamera){const Qe=new I(R.x,R.y,0);Qe.unproject(n.object),n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),lt=!0;const ft=new I(R.x,R.y,0);ft.unproject(n.object),n.object.position.sub(ft).add(Qe),n.object.updateMatrixWorld(),ut=C.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ut!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ut).add(n.object.position):(Os.origin.copy(n.object.position),Os.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Os.direction))<d_?e.lookAt(n.target):(Ic.setFromNormalAndCoplanarPoint(n.object.up,n.target),Os.intersectPlane(Ic,n.target))))}else n.object.isOrthographicCamera&&(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),lt=!0);return l=1,w=!1,lt||ye.distanceToSquared(n.object.position)>a||8*(1-oe.dot(n.object.quaternion))>a||D.distanceToSquared(n.target)>0?(n.dispatchEvent(Pc),ye.copy(n.object.position),oe.copy(n.object.quaternion),D.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",Ke),n.domElement.removeEventListener("pointerdown",y),n.domElement.removeEventListener("pointercancel",N),n.domElement.removeEventListener("wheel",Q),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",N),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Le),n._domElementKeyEvents=null)};const n=this,s={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let r=s.NONE;const a=1e-6,o=new Tc,c=new Tc;let l=1;const h=new I,d=new he,u=new he,f=new he,g=new he,_=new he,m=new he,p=new he,S=new he,x=new he,M=new I,R=new he;let w=!1;const A=[],F={};let E=!1;function T(C){return C!==null?2*Math.PI/60*n.autoRotateSpeed*C:2*Math.PI/60/60*n.autoRotateSpeed}function z(C){const le=Math.abs(C*.01);return Math.pow(.95,n.zoomSpeed*le)}function W(C){c.theta-=C}function re(C){c.phi-=C}const L=function(){const C=new I;return function(Ce,ye){C.setFromMatrixColumn(ye,0),C.multiplyScalar(-Ce),h.add(C)}}(),O=function(){const C=new I;return function(Ce,ye){n.screenSpacePanning===!0?C.setFromMatrixColumn(ye,1):(C.setFromMatrixColumn(ye,0),C.crossVectors(n.object.up,C)),C.multiplyScalar(Ce),h.add(C)}}(),B=function(){const C=new I;return function(Ce,ye){const oe=n.domElement;if(n.object.isPerspectiveCamera){const D=n.object.position;C.copy(D).sub(n.target);let de=C.length();de*=Math.tan(n.object.fov/2*Math.PI/180),L(2*Ce*de/oe.clientHeight,n.object.matrix),O(2*ye*de/oe.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(L(Ce*(n.object.right-n.object.left)/n.object.zoom/oe.clientWidth,n.object.matrix),O(ye*(n.object.top-n.object.bottom)/n.object.zoom/oe.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function Y(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function j(C){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=C:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function K(C,le){if(!n.zoomToCursor)return;w=!0;const Ce=n.domElement.getBoundingClientRect(),ye=C-Ce.left,oe=le-Ce.top,D=Ce.width,de=Ce.height;R.x=ye/D*2-1,R.y=-(oe/de)*2+1,M.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function Z(C){return Math.max(n.minDistance,Math.min(n.maxDistance,C))}function ae(C){d.set(C.clientX,C.clientY)}function ue(C){K(C.clientX,C.clientX),p.set(C.clientX,C.clientY)}function V(C){g.set(C.clientX,C.clientY)}function te(C){u.set(C.clientX,C.clientY),f.subVectors(u,d).multiplyScalar(n.rotateSpeed);const le=n.domElement;W(2*Math.PI*f.x/le.clientHeight),re(2*Math.PI*f.y/le.clientHeight),d.copy(u),n.update()}function _e(C){S.set(C.clientX,C.clientY),x.subVectors(S,p),x.y>0?Y(z(x.y)):x.y<0&&j(z(x.y)),p.copy(S),n.update()}function Ae(C){_.set(C.clientX,C.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),B(m.x,m.y),g.copy(_),n.update()}function Ee(C){K(C.clientX,C.clientY),C.deltaY<0?j(z(C.deltaY)):C.deltaY>0&&Y(z(C.deltaY)),n.update()}function De(C){let le=!1;switch(C.code){case n.keys.UP:C.ctrlKey||C.metaKey||C.shiftKey?re(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,n.keyPanSpeed),le=!0;break;case n.keys.BOTTOM:C.ctrlKey||C.metaKey||C.shiftKey?re(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(0,-n.keyPanSpeed),le=!0;break;case n.keys.LEFT:C.ctrlKey||C.metaKey||C.shiftKey?W(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(n.keyPanSpeed,0),le=!0;break;case n.keys.RIGHT:C.ctrlKey||C.metaKey||C.shiftKey?W(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):B(-n.keyPanSpeed,0),le=!0;break}le&&(C.preventDefault(),n.update())}function Fe(C){if(A.length===1)d.set(C.pageX,C.pageY);else{const le=ve(C),Ce=.5*(C.pageX+le.x),ye=.5*(C.pageY+le.y);d.set(Ce,ye)}}function Te(C){if(A.length===1)g.set(C.pageX,C.pageY);else{const le=ve(C),Ce=.5*(C.pageX+le.x),ye=.5*(C.pageY+le.y);g.set(Ce,ye)}}function Oe(C){const le=ve(C),Ce=C.pageX-le.x,ye=C.pageY-le.y,oe=Math.sqrt(Ce*Ce+ye*ye);p.set(0,oe)}function P(C){n.enableZoom&&Oe(C),n.enablePan&&Te(C)}function fe(C){n.enableZoom&&Oe(C),n.enableRotate&&Fe(C)}function X(C){if(A.length==1)u.set(C.pageX,C.pageY);else{const Ce=ve(C),ye=.5*(C.pageX+Ce.x),oe=.5*(C.pageY+Ce.y);u.set(ye,oe)}f.subVectors(u,d).multiplyScalar(n.rotateSpeed);const le=n.domElement;W(2*Math.PI*f.x/le.clientHeight),re(2*Math.PI*f.y/le.clientHeight),d.copy(u)}function ce(C){if(A.length===1)_.set(C.pageX,C.pageY);else{const le=ve(C),Ce=.5*(C.pageX+le.x),ye=.5*(C.pageY+le.y);_.set(Ce,ye)}m.subVectors(_,g).multiplyScalar(n.panSpeed),B(m.x,m.y),g.copy(_)}function $(C){const le=ve(C),Ce=C.pageX-le.x,ye=C.pageY-le.y,oe=Math.sqrt(Ce*Ce+ye*ye);S.set(0,oe),x.set(0,Math.pow(S.y/p.y,n.zoomSpeed)),Y(x.y),p.copy(S);const D=(C.pageX+le.x)*.5,de=(C.pageY+le.y)*.5;K(D,de)}function we(C){n.enableZoom&&$(C),n.enablePan&&ce(C)}function xe(C){n.enableZoom&&$(C),n.enableRotate&&X(C)}function y(C){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(C.pointerId),n.domElement.addEventListener("pointermove",v),n.domElement.addEventListener("pointerup",N)),We(C),C.pointerType==="touch"?ke(C):se(C))}function v(C){n.enabled!==!1&&(C.pointerType==="touch"?ie(C):ne(C))}function N(C){ze(C),A.length===0&&(n.domElement.releasePointerCapture(C.pointerId),n.domElement.removeEventListener("pointermove",v),n.domElement.removeEventListener("pointerup",N)),n.dispatchEvent(Lc),r=s.NONE}function se(C){let le;switch(C.button){case 0:le=n.mouseButtons.LEFT;break;case 1:le=n.mouseButtons.MIDDLE;break;case 2:le=n.mouseButtons.RIGHT;break;default:le=-1}switch(le){case dn.DOLLY:if(n.enableZoom===!1)return;ue(C),r=s.DOLLY;break;case dn.ROTATE:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enablePan===!1)return;V(C),r=s.PAN}else{if(n.enableRotate===!1)return;ae(C),r=s.ROTATE}break;case dn.PAN:if(C.ctrlKey||C.metaKey||C.shiftKey){if(n.enableRotate===!1)return;ae(C),r=s.ROTATE}else{if(n.enablePan===!1)return;V(C),r=s.PAN}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Qr)}function ne(C){switch(r){case s.ROTATE:if(n.enableRotate===!1)return;te(C);break;case s.DOLLY:if(n.enableZoom===!1)return;_e(C);break;case s.PAN:if(n.enablePan===!1)return;Ae(C);break}}function Q(C){n.enabled===!1||n.enableZoom===!1||r!==s.NONE||(C.preventDefault(),n.dispatchEvent(Qr),Ee(be(C)),n.dispatchEvent(Lc))}function be(C){const le=C.deltaMode,Ce={clientX:C.clientX,clientY:C.clientY,deltaY:C.deltaY};switch(le){case 1:Ce.deltaY*=16;break;case 2:Ce.deltaY*=100;break}return C.ctrlKey&&!E&&(Ce.deltaY*=10),Ce}function me(C){C.key==="Control"&&(E=!0,document.addEventListener("keyup",Se,{passive:!0,capture:!0}))}function Se(C){C.key==="Control"&&(E=!1,document.removeEventListener("keyup",Se,{passive:!0,capture:!0}))}function Le(C){n.enabled===!1||n.enablePan===!1||De(C)}function ke(C){switch(Pe(C),A.length){case 1:switch(n.touches.ONE){case Mn.ROTATE:if(n.enableRotate===!1)return;Fe(C),r=s.TOUCH_ROTATE;break;case Mn.PAN:if(n.enablePan===!1)return;Te(C),r=s.TOUCH_PAN;break;default:r=s.NONE}break;case 2:switch(n.touches.TWO){case Mn.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;P(C),r=s.TOUCH_DOLLY_PAN;break;case Mn.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;fe(C),r=s.TOUCH_DOLLY_ROTATE;break;default:r=s.NONE}break;default:r=s.NONE}r!==s.NONE&&n.dispatchEvent(Qr)}function ie(C){switch(Pe(C),r){case s.TOUCH_ROTATE:if(n.enableRotate===!1)return;X(C),n.update();break;case s.TOUCH_PAN:if(n.enablePan===!1)return;ce(C),n.update();break;case s.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;we(C),n.update();break;case s.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;xe(C),n.update();break;default:r=s.NONE}}function Ke(C){n.enabled!==!1&&C.preventDefault()}function We(C){A.push(C.pointerId)}function ze(C){delete F[C.pointerId];for(let le=0;le<A.length;le++)if(A[le]==C.pointerId){A.splice(le,1);return}}function Pe(C){let le=F[C.pointerId];le===void 0&&(le=new he,F[C.pointerId]=le),le.set(C.pageX,C.pageY)}function ve(C){const le=C.pointerId===A[0]?A[1]:A[0];return F[le]}n.domElement.addEventListener("contextmenu",Ke),n.domElement.addEventListener("pointerdown",y),n.domElement.addEventListener("pointercancel",N),n.domElement.addEventListener("wheel",Q,{passive:!1}),document.addEventListener("keydown",me,{passive:!0,capture:!0}),this.update()}}class p_ extends f_{constructor(e,t){super(e,t),this.screenSpacePanning=!1,this.mouseButtons={LEFT:dn.PAN,MIDDLE:dn.DOLLY,RIGHT:dn.ROTATE},this.touches={ONE:Mn.PAN,TWO:Mn.DOLLY_ROTATE}}}class m_{constructor(e){Ze(this,"scene");Ze(this,"camera");Ze(this,"renderer");Ze(this,"labelRenderer");Ze(this,"controls");Ze(this,"container");Ze(this,"trackGroup");Ze(this,"trainGroup");Ze(this,"labelGroup");Ze(this,"raycaster");Ze(this,"mouse");Ze(this,"onSwitchClick");Ze(this,"onSemaphoreClick");this.container=e,this.scene=new Ag,this.scene.background=new Je(16119285);const t=e.clientWidth/e.clientHeight,n=100;this.camera=new wo(-n*t/2,n*t/2,n/2,-n/2,.1,1e3),this.camera.position.set(0,100,0),this.camera.lookAt(0,0,0),this.renderer=new yl({antialias:!0}),this.renderer.setSize(e.clientWidth,e.clientHeight),this.renderer.setPixelRatio(window.devicePixelRatio),e.appendChild(this.renderer.domElement),this.labelRenderer=new u_,this.labelRenderer.setSize(e.clientWidth,e.clientHeight),this.labelRenderer.domElement.style.position="absolute",this.labelRenderer.domElement.style.top="0",this.labelRenderer.domElement.style.pointerEvents="none",this.labelRenderer.domElement.style.display="none",e.appendChild(this.labelRenderer.domElement);const s=new c_(16777215,.8);this.scene.add(s);const r=new a_(16777215,.6);r.position.set(50,100,50),this.scene.add(r),this.trackGroup=new Ot,this.scene.add(this.trackGroup),this.trainGroup=new Ot,this.scene.add(this.trainGroup),this.labelGroup=new Ot,this.labelGroup.visible=!1,this.scene.add(this.labelGroup);const a=new ar(1e3,1e3),o=new Tn({color:4881465,roughness:.9,metalness:0}),c=new it(a,o);c.rotation.x=-Math.PI/2,c.position.y=-.01,this.scene.add(c),this.raycaster=new l_,this.mouse=new he,this.controls=new p_(this.camera,this.renderer.domElement),this.controls.enableRotate=!1,this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.screenSpacePanning=!0,this.controls.minZoom=.1,this.controls.maxZoom=10,this.renderer.domElement.addEventListener("click",l=>this.onClick(l)),window.addEventListener("resize",()=>this.onResize())}setSwitchClickCallback(e){this.onSwitchClick=e}setSemaphoreClickCallback(e){this.onSemaphoreClick=e}onClick(e){const t=this.renderer.domElement.getBoundingClientRect();this.mouse.x=(e.clientX-t.left)/t.width*2-1,this.mouse.y=-((e.clientY-t.top)/t.height)*2+1,this.raycaster.setFromCamera(this.mouse,this.camera);const n=this.raycaster.intersectObjects(this.trackGroup.children,!0);for(const s of n){const r=s.object.userData;if(r&&r.isSwitchIndicator){this.onSwitchClick&&this.onSwitchClick(r.routeKey,r.connectionIndex);break}if(r&&r.isSemaphore){this.onSemaphoreClick&&this.onSemaphoreClick(r.pieceId);break}}}onResize(){const e=this.container.clientWidth/this.container.clientHeight,t=100;this.camera.left=-t*e/2,this.camera.right=t*e/2,this.camera.top=t/2,this.camera.bottom=-t/2,this.camera.updateProjectionMatrix(),this.renderer.setSize(this.container.clientWidth,this.container.clientHeight),this.labelRenderer.setSize(this.container.clientWidth,this.container.clientHeight),this.render()}render(){this.controls.update(),this.renderer.render(this.scene,this.camera),this.labelRenderer.render(this.scene,this.camera)}clearLayout(){const e=t=>{t instanceof it&&(t.geometry.dispose(),t.material instanceof Zn?t.material.dispose():Array.isArray(t.material)&&t.material.forEach(n=>n.dispose()));for(const n of t.children)e(n)};for(;this.trackGroup.children.length>0;){const t=this.trackGroup.children[0];this.trackGroup.remove(t),e(t)}for(;this.labelGroup.children.length>0;)this.labelGroup.remove(this.labelGroup.children[0])}addTrackGroup(e){this.trackGroup.add(e)}updateTrains(e){for(;this.trainGroup.children.length>0;)this.trainGroup.remove(this.trainGroup.children[0]);const t=[...e.children];for(const n of t)e.remove(n),this.trainGroup.add(n)}addLabel(e,t,n){const s=document.createElement("div");s.className="track-label",s.textContent=e,s.style.cssText=`
      background: rgba(255, 255, 255, 0.85);
      padding: 2px 6px;
      border-radius: 3px;
      font-family: monospace;
      font-size: 11px;
      color: #333;
      border: 1px solid #999;
      white-space: nowrap;
    `;const r=new h_(s);r.position.set(t,1,n),this.labelGroup.add(r)}setLabelsVisible(e){this.labelGroup.visible=e,this.labelRenderer.domElement.style.display=e?"block":"none"}getLabelsVisible(){return this.labelGroup.visible}fitToLayout(){if(this.trackGroup.children.length===0)return;const e=new Ri().setFromObject(this.trackGroup),t=e.getCenter(new I),n=e.getSize(new I),s=this.container.clientWidth/this.container.clientHeight,r=n.x/n.z;let a,o;r>s?(a=n.x/.9,o=a/s):(o=n.z/.9,a=o*s),this.camera.left=-a/2,this.camera.right=a/2,this.camera.top=o/2,this.camera.bottom=-o/2,this.camera.zoom=1,this.camera.position.set(t.x,100,t.z),this.camera.lookAt(t.x,0,t.z),this.camera.updateProjectionMatrix(),this.controls.target.set(t.x,0,t.z),this.controls.update()}}function Dc(i,e,t){return{x:i,y:e,z:t}}function q(i,e){return{x:i,y:0,z:e}}function Bn(i,e,t){const n=[],s=e*Math.PI/180;for(let r=0;r<t;r++){const o=r/(t-1)*s;n.push(q(i*Math.sin(o),i*(1-Math.cos(o))))}return n}function gi(i,e,t){return Bn(i,e,t).map(s=>q(s.x,-s.z))}function eo(i){const e=i*Math.PI/180;return q(Math.cos(e),Math.sin(e))}function to(i){const e=i*Math.PI/180;return q(Math.cos(e),-Math.sin(e))}const g_=[{code:"ph",aliases:["placeholder"],sections:[],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[]},{name:"out",position:q(0,0),direction:q(1,0),sectionIndices:[]}]},{code:"str9",aliases:["str"],sections:[{splinePoints:[q(0,0),q(9,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(9,0),direction:q(1,0),sectionIndices:[0]}]},{code:"str6",aliases:[],sections:[{splinePoints:[q(0,0),q(6,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(6,0),direction:q(1,0),sectionIndices:[0]}]},{code:"str3",aliases:[],sections:[{splinePoints:[q(0,0),q(3,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(3,0),direction:q(1,0),sectionIndices:[0]}]},{code:"str15",aliases:[],sections:[{splinePoints:[q(0,0),q(1.5,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(1.5,0),direction:q(1,0),sectionIndices:[0]}]},{code:"crvl18",aliases:[],sections:[{splinePoints:Bn(18,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:Bn(18,22.5,7)[6],direction:eo(22.5),sectionIndices:[0]}]},{code:"crvl22",aliases:["crvl","crv"],sections:[{splinePoints:Bn(22,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:Bn(22,22.5,7)[6],direction:eo(22.5),sectionIndices:[0]}]},{code:"crvl24",aliases:[],sections:[{splinePoints:Bn(24,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:Bn(24,22.5,7)[6],direction:eo(22.5),sectionIndices:[0]}]},{code:"crvr18",aliases:[],sections:[{splinePoints:gi(18,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:gi(18,22.5,7)[6],direction:to(22.5),sectionIndices:[0]}]},{code:"crvr22",aliases:["crvr"],sections:[{splinePoints:gi(22,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:gi(22,22.5,7)[6],direction:to(22.5),sectionIndices:[0]}]},{code:"crvr24",aliases:[],sections:[{splinePoints:gi(24,22.5,7)}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:gi(24,22.5,7)[6],direction:to(22.5),sectionIndices:[0]}]},{code:"bump",aliases:["bumper"],sections:[{splinePoints:[q(0,0),q(3,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]}]},{code:"gen",aliases:["generator"],sections:[{splinePoints:[q(-50,0),q(0,0)]}],connectionPoints:[{name:"in",position:q(-50,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(0,0),direction:q(1,0),sectionIndices:[0]}]},{code:"bin",aliases:[],sections:[],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[]},{name:"out",position:q(0,0),direction:q(1,0),sectionIndices:[]}]},{code:"tun",aliases:["tunnel"],sections:[],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[]},{name:"out",position:q(0,0),direction:q(1,0),sectionIndices:[]}]},{code:"sem",aliases:["semaphore"],sections:[],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[]},{name:"out",position:q(0,0),direction:q(1,0),sectionIndices:[]}]},{code:"x90",aliases:[],sections:[{splinePoints:[q(-3,0),q(3,0)]},{splinePoints:[q(0,-3),q(0,3)]}],connectionPoints:[{name:"in1",position:q(-3,0),direction:q(-1,0),sectionIndices:[0]},{name:"out1",position:q(3,0),direction:q(1,0),sectionIndices:[0]},{name:"in2",position:q(0,-3),direction:q(0,-1),sectionIndices:[1]},{name:"out2",position:q(0,3),direction:q(0,1),sectionIndices:[1]}]},{code:"x45",aliases:[],sections:[{splinePoints:[q(-3,0),q(3,0)]},{splinePoints:[q(-2.12,-2.12),q(2.12,2.12)]}],connectionPoints:[{name:"in1",position:q(-3,0),direction:q(-1,0),sectionIndices:[0]},{name:"out1",position:q(3,0),direction:q(1,0),sectionIndices:[0]},{name:"in2",position:q(-2.12,-2.12),direction:q(-.707,-.707),sectionIndices:[1]},{name:"out2",position:q(2.12,2.12),direction:q(.707,.707),sectionIndices:[1]}]}],Ul=new Map,Ol=new Map;for(const i of g_){Ul.set(i.code,i);for(const e of i.aliases)Ol.set(e,i)}const Fl=new Map;function hn(i){Fl.set(i.code.toLowerCase(),i)}function ot(i){const e=i.toLowerCase(),t=Fl.get(e);if(t)return t;const n=Ul.get(e)||Ol.get(e);if(!n)throw new Error(`Unknown track archetype: ${i}`);return n}var Qt=(i=>(i[i.DEBUG=0]="DEBUG",i[i.INFO=1]="INFO",i[i.WARNING=2]="WARNING",i[i.ERROR=3]="ERROR",i))(Qt||{});let Bi=2;function zl(i){Bi=i}const ee={debug(i,...e){Bi<=0&&console.log(`[DEBUG] ${i}`,...e)},info(i,...e){Bi<=1&&console.log(`[INFO] ${i}`,...e)},warn(i,...e){Bi<=2&&console.warn(`[WARN] ${i}`,...e)},error(i,...e){Bi<=3&&console.error(`[ERROR] ${i}`,...e)}},__=6045747,x_=6045747,v_=14211272,S_=13154464,Bl=16777215,M_=16711680,E_=2271778,y_=13378082,b_=4473924,T_=4868682,A_=65280,w_=16711680,kl=65280,Gl=16711680,C_=3355443,R_=1.045,no=.08,P_=1.45,io=.15,L_=.25,I_=1,D_=2,N_=2.4,Fs=.1,yi=new Map,Io=new Map,Do=new Map;function U_(i){yi.has(i)||yi.set(i,0);const e=yi.get(i);return ee.debug(`getSelectedRouteByKey: key="${i}" → ${e}`),e}function O_(i,e){const t=yi.get(i);ee.debug(`setSelectedRouteByKey: key="${i}" ${t} → ${e}`),yi.set(i,e)}function F_(){return yi}function z_(i,e){for(const[t,n]of Io)if(n.visible=e,e){const s=n.material,r=i.has(t);s.color.setHex(r?M_:Bl)}}function B_(i,e){const t=Do.get(i);t&&t.dot.material.color.setHex(e?Gl:kl)}function is(i,e){var s;i.clearLayout(),Io.clear(),Do.clear();const t=new Map;for(const r of e.pieces)t.set(r.id,r);const n=(s=e.randomSwitches)!=null?s:!1;for(const r of e.pieces){const a=ot(r.archetypeCode),o=k_(r,a,t,n);if(i.addTrackGroup(o),r.label){const c=X_(r,a),l=2,h=Math.cos(r.rotation+Math.PI/2)*l,d=-Math.sin(r.rotation+Math.PI/2)*l;i.addLabel(r.label,c.x+h,c.z+d)}}i.fitToLayout(),i.render()}function k_(i,e,t,n=!1){var h,d;const s=new Ot,r=Math.cos(i.rotation),a=Math.sin(i.rotation),o=u=>new I(i.position.x+(u.x*r-u.z*a),u.y,-(i.position.z+(u.x*a+u.z*r))),l=e.code==="gen"||e.code==="bin"||i.inTunnel;if(!l){for(const u of e.sections)if(u.splinePoints.length>=2){const f=u.splinePoints.map(_=>o(_)),g=G_(f);s.add(g)}}if(!l){for(const u of e.connectionPoints){const f=o({x:u.position.x,y:0,z:u.position.z}),g=`${i.id}.${u.name}`,_=i.connections.get(u.name)||[],m=Uc(f,g);if(s.add(m),ee.debug(`  ${i.id}.${u.name}: ${_.length} connections`),_.length>1&&!n){const p=ex(i,u.name,f,_,t);for(const S of p)s.add(S)}}if(i.internalConnectionPoints)for(const u of i.internalConnectionPoints){const f=new I(u.worldPosition.x,0,-u.worldPosition.z),g=Uc(f,u.id);s.add(g),ee.debug(`  Internal connection point ${u.id} at (${u.worldPosition.x.toFixed(1)}, ${u.worldPosition.z.toFixed(1)})`)}}if(e.code==="gen"){const u=o({x:0,y:0,z:0}),f=H_(u);s.add(f)}else if(e.code==="bin"){const u=o({x:0,y:0,z:0}),f=V_(u);s.add(f)}else if(e.code==="bump"||e.code==="bumper"){const u=q_(i,e,o);s.add(u)}else if(e.code==="tun"||e.code==="tunnel"){const u=$_(i);for(const f of u)s.add(f)}else if(e.code==="sem"||e.code==="semaphore"){const u=o({x:0,y:0,z:0}),f=(d=(h=i.semaphoreConfig)==null?void 0:h.locked)!=null?d:!1,g=W_(u,i.id,f);s.add(g)}return s}function G_(i){const e=new Ot,t=new $n(i),n=t.getLength(),s=Math.max(16,i.length*8),r=new Tn({color:__,roughness:.5,metalness:.2}),a=new Tn({color:x_,roughness:.9,metalness:0}),o=new Tn({color:v_,roughness:1,metalness:0}),c=new Tn({color:S_,roughness:.9,metalness:0}),l=Nc(t,s,N_,Fs),h=new it(l,c);h.position.y=.01,e.add(h);const d=Nc(t,s,D_,.08),u=new it(d,o);u.position.y=Fs+.02,e.add(u);const f=new Jn(L_,io,P_),g=Math.floor(n/I_);for(let T=0;T<=g;T++){const z=T/Math.max(g,1),W=t.getPointAt(z),re=t.getTangentAt(z),L=new it(f,a);L.position.set(W.x,Fs+.08+io/2,W.z);const O=Math.atan2(-re.z,re.x);L.rotation.y=O,e.add(L)}const _=R_/2,m=[],p=[],S=s;for(let T=0;T<=S;T++){const z=T/S,W=t.getPointAt(z),re=t.getTangentAt(z),L=-re.z,O=re.x;m.push(new I(W.x+L*_,W.y,W.z+O*_)),p.push(new I(W.x-L*_,W.y,W.z-O*_))}const x=new $n(m),M=new $n(p),R=new Zs(x,s,no,6,!1),w=new Zs(M,s,no,6,!1),A=new it(R,r),F=new it(w,r),E=Fs+.08+io+no;return A.position.y=E,F.position.y=E,e.add(A),e.add(F),e}function Nc(i,e,t,n){const s=t/2,r=[],a=[];for(let c=0;c<=e;c++){const l=c/e,h=i.getPointAt(l),d=i.getTangentAt(l),u=-d.z,f=d.x;r.push(h.x+u*s,0,h.z+f*s),r.push(h.x-u*s,0,h.z-f*s),r.push(h.x-u*s,n,h.z-f*s),r.push(h.x+u*s,n,h.z+f*s)}for(let c=0;c<e;c++){const l=c*4;a.push(l+3,l+2,l+6),a.push(l+3,l+6,l+7),a.push(l+0,l+3,l+7),a.push(l+0,l+7,l+4),a.push(l+2,l+1,l+5),a.push(l+2,l+5,l+6),a.push(l+0,l+4,l+5),a.push(l+0,l+5,l+1)}const o=new Pt;return o.setAttribute("position",new st(r,3)),o.setIndex(a),o.computeVertexNormals(),o}function Uc(i,e){const t=new ns(.25,16,16),n=new Ln({color:Bl}),s=new it(t,n);return s.position.set(i.x,.5,i.z),s.visible=!1,Io.set(e,s),s}function H_(i){const e=new lr(1.5,32),t=new Ln({color:E_,side:Ht}),n=new it(e,t);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.6,i.z),n}function V_(i){const e=new lr(1.5,32),t=new Ln({color:y_,side:Ht}),n=new it(e,t);return n.rotation.x=-Math.PI/2,n.position.set(i.x,.5,i.z),n}function W_(i,e,t){const n=new Ot,s=new Lo(1.3,1.5,32),r=new Ln({color:C_,side:Ht}),a=new it(s,r);a.rotation.x=-Math.PI/2,a.position.set(i.x,.55,i.z),n.add(a);const o=new ns(.6,16,16),c=t?Gl:kl,l=new Ln({color:c}),h=new it(o,l);return h.position.set(i.x,.7,i.z),h.userData={isSemaphore:!0,pieceId:e},n.add(h),Do.set(e,{dot:h,ring:a}),n}function $_(i){const e=[],a=new Tn({color:T_,roughness:.7,metalness:.2}),c=(()=>{const d=new hr,u=4.2/2,f=.3;d.moveTo(-u,0),d.lineTo(-u,.8),d.lineTo(-u+f,.8),d.lineTo(-u+f,f),d.lineTo(u-f,f),d.lineTo(u-f,.8),d.lineTo(u,.8),d.lineTo(u,0),d.lineTo(-u,0);const g={depth:1.5,bevelEnabled:!1};return new ts(d,g)})(),l=new it(c,a);l.rotation.order="YXZ",l.rotation.y=Math.PI/2,l.rotation.x=-Math.PI/2,l.rotation.z=Math.PI+i.rotation,l.position.set(i.position.x,0,-i.position.z),e.push(l);const h=new it(c,a);return h.rotation.order="YXZ",h.rotation.y=Math.PI/2,h.rotation.x=-Math.PI/2,h.rotation.z=i.rotation,h.position.set(i.position.x,0,-i.position.z),e.push(h),e}function X_(i,e){const t=Math.cos(i.rotation),n=Math.sin(i.rotation),s=o=>({x:i.position.x+(o.x*t-o.z*n),z:-(i.position.z+(o.x*n+o.z*t))}),r=e.connectionPoints.find(o=>o.name==="in"),a=e.connectionPoints.find(o=>o.name==="out");if(r&&a){const o=s(r.position),c=s(a.position);return{x:(o.x+c.x)/2,z:(o.z+c.z)/2}}if(e.sections.length>0&&e.sections[0].splinePoints.length>0){const o=e.sections[0].splinePoints,c=Math.floor(o.length/2);return s(o[c])}return{x:i.position.x,z:-i.position.z}}function q_(i,e,t){const n=e.sections[0];let s,r=i.rotation;if(!n||n.splinePoints.length<2)s=t({x:0,y:0,z:0});else{const l=n.splinePoints[n.splinePoints.length-1];s=t(l);const h=n.splinePoints[n.splinePoints.length-2],d=n.splinePoints[n.splinePoints.length-1],u={x:d.x-h.x,z:d.z-h.z},f=Math.cos(i.rotation),g=Math.sin(i.rotation),_={x:u.x*f-u.z*g,z:-(u.x*g+u.z*f)};r=Math.atan2(_.z,_.x)}const a=new Jn(.5,1,2),o=new Tn({color:b_}),c=new it(a,o);return c.position.set(s.x,.5,s.z),c.rotation.y=r,c}const Y_=30,j_=.4,K_=1,Z_=.75;function J_(i){return i==="in"||i==="in1"||i==="in2"}function Q_(i){return i==="out"||i==="out1"||i==="out2"}function ex(i,e,t,n,s){const r=[],a=n.filter(c=>J_(c.pointName)),o=n.filter(c=>Q_(c.pointName));if(a.length>1){const c=Oc(i,e,"fwd",a,s,n);r.push(...c)}if(o.length>1){const c=Oc(i,e,"bwd",o,s,n);r.push(...c)}return r}function Oc(i,e,t,n,s,r){const a=[],o=r.map(g=>`${g.pieceId}.${g.pointName}`);o.push(`${i.id}.${e}`),o.sort();const l=`junction.${o[0]}.${t}`,h=U_(l);ee.debug(`renderSwitchIndicators: ${l}, ${n.length} connections, selectedIndex=${h}`),n.forEach((g,_)=>ee.debug(`  route[${_}]: ${g.pieceId}.${g.pointName} ${g.isAutoConnect?"(auto)":""}`));const d=[];for(const g of n){const _=tx(g,s);d.push(_)}const u=d.map(g=>{if(!g)return null;const _=sx(g);return nx(g,_)});if(u.filter(g=>g!==null).length<=1)return a;for(let g=0;g<n.length;g++){const _=u[g];if(ee.debug(`  Indicator ${g}: pos=${_?`(${_.x.toFixed(2)}, ${_.z.toFixed(2)})`:"null"}, curveInfo=${d[g]?"valid":"null"}`),!_)continue;const m=g===h,p=m?A_:w_,S=new ns(.6,16,16),x=new Ln({color:p}),M=new it(S,x);M.position.set(_.x,.7,_.z),M.userData={isSwitchIndicator:!0,routeKey:l,connectionIndex:g},ee.debug(`  Created indicator ${g} at (${_.x.toFixed(2)}, 0.7, ${_.z.toFixed(2)}), selected=${m}, color=${m?"green":"red"}`),a.push(M)}return a}function Fc(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function tx(i,e){const t=e.get(i.pieceId);if(!t)return null;const n=ot(t.archetypeCode);if(!n||n.sections.length===0)return null;const s=n.sections[0];if(s.splinePoints.length<2)return null;const r=Math.cos(t.rotation),a=Math.sin(t.rotation),o=m=>new I(t.position.x+(m.x*r-m.z*a),m.y,-(t.position.z+(m.x*a+m.z*r))),c=s.splinePoints.map(m=>o(m)),l=new $n(c),h=l.getLength();if(h===0)return null;const d=i.pointName==="in"||i.pointName==="in1",u=Fc(i.pointName),f=t.connections.get(u)||[],g=f.length>1;let _=!1;if(f.length===1){const m=f[0],p=e.get(m.pieceId);if(p){const S=Fc(m.pointName),x=p.connections.get(S)||[];if(x.length>1)_=!0;else if(x.length===1){const M=x[0],R=e.get(M.pieceId);R&&(_=(R.connections.get(M.pointName)||[]).length>1)}}}return{curve:l,curveLength:h,isFromIn:d,farEndHasSwitch:g,farEndNextTrackHasSwitch:_}}function nx(i,e){const t=i.isFromIn?Math.min(e/i.curveLength,1):Math.max(1-e/i.curveLength,0),n=i.curve.getPointAt(t);return{x:n.x,z:n.z}}function ix(i){return i.farEndHasSwitch?j_:i.farEndNextTrackHasSwitch?Z_:K_}function sx(i){const e=ix(i);return Math.min(i.curveLength*e,Y_)}const Gs=4,Hs=3,zc=.5;function An(i,e){const t=ot(i.archetypeCode);if(!t||e>=t.sections.length)return 0;const n=t.sections[e];if(n.splinePoints.length<2)return 0;const s=Hl(n.splinePoints,i);return new $n(s).getLength()}function Hl(i,e){const t=Math.cos(e.rotation),n=Math.sin(e.rotation);return i.map(s=>new I(e.position.x+(s.x*t-s.z*n),s.y,e.position.z+(s.x*n+s.z*t)))}function rx(i,e,t){const n=ot(i.archetypeCode);if(!n||e>=n.sections.length)return null;const s=n.sections[e];if(s.splinePoints.length<2)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const r=Hl(s.splinePoints,i),a=new $n(r),o=a.getLength();if(o===0)return{position:{x:i.position.x,y:0,z:i.position.z},rotation:i.rotation};const c=Math.max(0,Math.min(1,t/o)),l=a.getPointAt(c),h=a.getTangentAt(c),d=Math.atan2(h.z,h.x);return{position:{x:l.x,y:0,z:l.z},rotation:d}}function Mo(i,e){const t=e.pieces.find(r=>r.id===i.currentPieceId);if(!t)return;const n=ki(i.entryPoint),s=rx(t,n,i.distanceAlongSection);s&&(i.worldPosition=s.position,i.rotation=s.rotation)}function es(i){return i==="in"||i==="in1"||i==="in2"}function No(i){return i==="out"||i==="out1"||i==="out2"}function ki(i){return i&&(i==="in2"||i==="out2")?1:0}function Vs(i,e,t,n,s,r,a,o){var M;const c=t.pieces.find(R=>R.id===i);if(!c)return null;const l=c.connections.get(e);if(!l||l.length===0)return null;const h=l.filter(R=>R.pieceId!==r);if(h.length===0)return null;if(h.length===1)return{pieceId:h[0].pieceId,entryPoint:h[0].pointName};const d=h.filter(R=>es(R.pointName)),u=h.filter(R=>No(R.pointName));let f,g;if(a==="backward"?u.length>0?(f=u,g="bwd"):(f=d,g="fwd"):d.length>0?(f=d,g="fwd"):(f=u,g="bwd"),f.length===0&&(f=h,g="fwd"),f.length===1)return{pieceId:f[0].pieceId,entryPoint:f[0].pointName};const _=l.map(R=>`${R.pieceId}.${R.pointName}`);_.push(`${i}.${e}`),_.sort();const p=`junction.${_[0]}.${g}`;let S;s!=null&&s.has(p)?(S=s.get(p),o&&o.add(p)):(t.randomSwitches?S=Math.floor(Math.random()*f.length):S=(M=n.get(p))!=null?M:0,s&&s.set(p,S));const x=f[Math.min(S,f.length-1)];return{pieceId:x.pieceId,entryPoint:x.pointName}}function Vl(i){return i==="in"?"out":i==="out"?"in":i==="in1"?"out1":i==="out1"?"in1":i==="in2"?"out2":i==="out2"?"in2":"out"}function ox(i,e,t,n,s,r){i.distanceAlongSection+=e;let a=t.pieces.find(h=>h.id===i.currentPieceId);if(!a)return;let o=ki(i.entryPoint),c=An(a,o),l=0;for(;c===0&&l<10;){l++;let h,d;i.entryPoint?(h=Vl(i.entryPoint),d=es(i.entryPoint)?"forward":"backward"):(h=i.distanceAlongSection>=0?"out":"in",d="forward");const u=Vs(i.currentPieceId,h,t,n,s,i.previousPieceId,d,r);if(!u){i.distanceAlongSection=0,Mo(i,t);return}if(i.previousPieceId=i.currentPieceId,i.currentPieceId=u.pieceId,i.entryPoint=u.entryPoint,a=t.pieces.find(f=>f.id===i.currentPieceId),!a)return;o=ki(i.entryPoint),c=An(a,o)}for(;i.distanceAlongSection>=c&&c>0;){const h=i.distanceAlongSection-c,u=Vs(i.currentPieceId,"out",t,n,s,i.previousPieceId,"forward",r);if(!u){i.distanceAlongSection=c;return}i.previousPieceId=i.currentPieceId,i.currentPieceId=u.pieceId,i.entryPoint=u.entryPoint;const f=t.pieces.find(g=>g.id===u.pieceId);if(f){const g=ki(u.entryPoint),_=An(f,g);No(u.entryPoint)?i.distanceAlongSection=_-h:i.distanceAlongSection=h,c=_}else{i.distanceAlongSection=h;break}}for(;i.distanceAlongSection<0&&c>0;){const d=Vs(i.currentPieceId,"in",t,n,s,i.previousPieceId,"backward",r);if(!d){i.distanceAlongSection=0;break}const u=t.pieces.find(f=>f.id===d.pieceId);if(u){const f=ki(d.entryPoint),g=An(u,f);if(g===0){i.distanceAlongSection=0;break}const _=-i.distanceAlongSection;i.previousPieceId=i.currentPieceId,i.currentPieceId=d.pieceId,i.entryPoint=d.entryPoint,es(d.entryPoint)?i.distanceAlongSection=_:i.distanceAlongSection=g-_,c=g}else break}Mo(i,t)}const Wl=2,Js=1.5,ax=16776960,$l=[16711680,255,65280,16711935,16776960],cx=[3158064,5263440,7368816,9474192,11579568];let Gi=null;function lx(i="gray"){if(i==="black")return 0;const e=i==="colorful"?$l:cx,t=e.map((r,a)=>Gi!==null&&a===Gi?2:1),n=t.reduce((r,a)=>r+a,0);let s=Math.random()*n;for(let r=0;r<t.length;r++)if(s-=t[r],s<=0)return Gi=r,e[r];return Gi=0,e[0]}function hx(){Gi=null}function ux(){const i=Gs/2,e=Wl/2,t=.25,n=.15,s=i*.35,r=e*.35,a=.15,o=new hr;return o.moveTo(-i+t,-e),o.quadraticCurveTo(-i,-e,-i,-e+t),o.lineTo(-i,e-t),o.quadraticCurveTo(-i,e,-i+t,e),o.lineTo(s,e),o.lineTo(i-a,r+n),o.quadraticCurveTo(i-a+n*.5,r,i,r),o.lineTo(i,-r),o.quadraticCurveTo(i-a+n*.5,-r,i-a,-r-n),o.lineTo(s,-e),o.lineTo(-i+t,-e),o}function dx(){const i=Hs/2,e=Wl/2,t=.2,n=new hr;return n.moveTo(-i+t,-e),n.quadraticCurveTo(-i,-e,-i,-e+t),n.lineTo(-i,e-t),n.quadraticCurveTo(-i,e,-i+t,e),n.lineTo(i-t,e),n.quadraticCurveTo(i,e,i,e-t),n.lineTo(i,-e+t),n.quadraticCurveTo(i,-e,i-t,-e),n.lineTo(-i+t,-e),n}let Fi=null,zi=null,so=null,ro=null;const Bc=new Map;let oo=null;function Xl(){if(!Fi){const i=ux();Fi=new ts(i,{depth:Js,bevelEnabled:!1}),Fi.rotateX(-Math.PI/2),Fi.translate(0,Js/2,0)}return Fi}function ql(){if(!zi){const i=dx();zi=new ts(i,{depth:Js,bevelEnabled:!1}),zi.rotateX(-Math.PI/2),zi.translate(0,Js/2,0)}return zi}function fx(){return so||(so=new Pl(Xl(),15)),so}function px(){return ro||(ro=new Pl(ql(),15)),ro}function mx(i){let e=Bc.get(i);return e||(e=new Tn({color:i,roughness:.5,metalness:.1}),Bc.set(i,e)),e}function gx(){return oo||(oo=new bl({color:0,linewidth:1})),oo}function _x(i){const e=new Ot;for(const t of i){const n=xx(t);e.add(n)}return e}function xx(i){const e=new Ot;e.name=i.id;for(const t of i.cars){const n=vx(t);e.add(n)}return e}function vx(i){var u;const e=i.type==="cab",t=e?Xl():ql(),n=e?fx():px(),s=e?ax:(u=i.color)!=null?u:$l[0],r=mx(s),a=new it(t,r),o=new Cg(n,gx()),c=new Ot;c.name=i.id,c.add(a),c.add(o);const l=i.worldPosition.x,h=-i.worldPosition.z,d=i.rotation;return Number.isNaN(l)||Number.isNaN(h)||Number.isNaN(d)?(ee.error(`NaN detected in car ${i.id}: pos=(${l}, ${h}), rot=${d}`),c.visible=!1):(c.position.set(l,0,h),c.rotation.y=d),c.visible=i.visible,c}var J=(i=>(i.IDENTIFIER="IDENTIFIER",i.LABEL_DEF="LABEL_DEF",i.LABEL_REF="LABEL_REF",i.DOT="DOT",i.REPETITION="REPETITION",i.NUMBER="NUMBER",i.RANGE="RANGE",i.STRING="STRING",i.NEW="NEW",i.LOOP_CLOSE="LOOP_CLOSE",i.TITLE="TITLE",i.DESCRIPTION="DESCRIPTION",i.LOCKAHEAD="LOCKAHEAD",i.DISTANCE="DISTANCE",i.COUNT="COUNT",i.DEGREES="DEGREES",i.OFFSET="OFFSET",i.BASE="BASE",i.SPLICE="SPLICE",i.USING="USING",i.CABS="CABS",i.CARS="CARS",i.SPEED="SPEED",i.EVERY="EVERY",i.COLORFUL="COLORFUL",i.GRAY="GRAY",i.BLACK="BLACK",i.RANDOM="RANDOM",i.MAX="MAX",i.TRAINS="TRAINS",i.FLEX="FLEX",i.CONNECT="CONNECT",i.CROSS="CROSS",i.DEFINE="DEFINE",i.LEFT="LEFT",i.RIGHT="RIGHT",i.STRAIGHT="STRAIGHT",i.RADIUS="RADIUS",i.ARC="ARC",i.LENGTH="LENGTH",i.LOG="LOG",i.EOF="EOF",i))(J||{});function Sx(i){const e=[],t=i.split(`
`);for(let n=0;n<t.length;n++){let s=t[n];const r=s.indexOf("#");r!==-1&&(s=s.substring(0,r));const a=s.split(";");for(const o of a){const c=Mx(o.trim(),n+1);e.push(...c)}}return e.push({type:"EOF",value:"",line:t.length,column:0}),e}function Mx(i,e){const t=[];let n=0;for(;n<i.length;){for(;n<i.length&&/\s/.test(i[n]);)n++;if(n>=i.length)break;const s=n,r=i[n];if(r==="$"){n++;const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;t.push({type:"LABEL_REF",value:i.substring(a,n),line:e,column:s+1});continue}if(r===">"){t.push({type:"LOOP_CLOSE",value:">",line:e,column:s+1}),n++;continue}if(r==="."){t.push({type:"DOT",value:".",line:e,column:s+1}),n++;continue}if(r==="*"){t.push({type:"REPETITION",value:"*",line:e,column:s+1}),n++;continue}if(/[0-9]/.test(r)||r==="-"&&n+1<i.length&&/[0-9]/.test(i[n+1])){const a=n;for(r==="-"&&n++;n<i.length&&/[0-9.]/.test(i[n]);)n++;if(r!=="-"&&n<i.length&&i[n]==="-"){const o=n;if(n++,n<i.length&&/[0-9]/.test(i[n])){for(;n<i.length&&/[0-9.]/.test(i[n]);)n++;t.push({type:"RANGE",value:i.substring(a,n),line:e,column:s+1});continue}else n=o}t.push({type:"NUMBER",value:i.substring(a,n),line:e,column:s+1});continue}if(/[a-zA-Z_]/.test(r)){const a=n;for(;n<i.length&&/[a-zA-Z0-9_]/.test(i[n]);)n++;const o=i.substring(a,n),c=o.toLowerCase();let l=n;for(;l<i.length&&/\s/.test(i[l]);)l++;if(l<i.length&&i[l]===":"){t.push({type:"LABEL_DEF",value:o,line:e,column:s+1}),n=l+1;continue}if(c==="new"){t.push({type:"NEW",value:o,line:e,column:s+1});continue}if(c==="title"){t.push({type:"TITLE",value:o,line:e,column:s+1});const h=i.substring(n).trim();return h.length>0&&t.push({type:"STRING",value:h,line:e,column:n+1}),t}if(c==="description"){t.push({type:"DESCRIPTION",value:o,line:e,column:s+1});const h=i.substring(n).trim();return h.length>0&&t.push({type:"STRING",value:h,line:e,column:n+1}),t}if(c==="lockahead"){t.push({type:"LOCKAHEAD",value:o,line:e,column:s+1});continue}if(c==="distance"){t.push({type:"DISTANCE",value:o,line:e,column:s+1});continue}if(c==="count"){t.push({type:"COUNT",value:o,line:e,column:s+1});continue}if(c==="degrees"){t.push({type:"DEGREES",value:o,line:e,column:s+1});continue}if(c==="offset"){t.push({type:"OFFSET",value:o,line:e,column:s+1});continue}if(c==="base"){t.push({type:"BASE",value:o,line:e,column:s+1});continue}if(c==="splice"){t.push({type:"SPLICE",value:o,line:e,column:s+1});continue}if(c==="using"){t.push({type:"USING",value:o,line:e,column:s+1});continue}if(c==="cabs"){t.push({type:"CABS",value:o,line:e,column:s+1});continue}if(c==="cars"){t.push({type:"CARS",value:o,line:e,column:s+1});continue}if(c==="speed"){t.push({type:"SPEED",value:o,line:e,column:s+1});continue}if(c==="every"){t.push({type:"EVERY",value:o,line:e,column:s+1});continue}if(c==="colorful"){t.push({type:"COLORFUL",value:o,line:e,column:s+1});continue}if(c==="gray"){t.push({type:"GRAY",value:o,line:e,column:s+1});continue}if(c==="black"){t.push({type:"BLACK",value:o,line:e,column:s+1});continue}if(c==="random"){t.push({type:"RANDOM",value:o,line:e,column:s+1});continue}if(c==="max"){t.push({type:"MAX",value:o,line:e,column:s+1});continue}if(c==="trains"){t.push({type:"TRAINS",value:o,line:e,column:s+1});continue}if(c==="flex"){t.push({type:"FLEX",value:o,line:e,column:s+1});continue}if(c==="connect"){t.push({type:"CONNECT",value:o,line:e,column:s+1});continue}if(c==="cross"){t.push({type:"CROSS",value:o,line:e,column:s+1});continue}if(c==="log"||c==="logging"){t.push({type:"LOG",value:o,line:e,column:s+1});continue}if(c==="define"||c==="def"){t.push({type:"DEFINE",value:o,line:e,column:s+1});continue}if(c==="left"||c==="l"){t.push({type:"LEFT",value:o,line:e,column:s+1});continue}if(c==="right"||c==="r"){t.push({type:"RIGHT",value:o,line:e,column:s+1});continue}if(c==="straight"||c==="s"){t.push({type:"STRAIGHT",value:o,line:e,column:s+1});continue}if(c==="radius"){t.push({type:"RADIUS",value:o,line:e,column:s+1});continue}if(c==="arc"){t.push({type:"ARC",value:o,line:e,column:s+1});continue}if(c==="length"){t.push({type:"LENGTH",value:o,line:e,column:s+1});continue}if(c==="x"){t.push({type:"REPETITION",value:"x",line:e,column:s+1});continue}t.push({type:"IDENTIFIER",value:o,line:e,column:s+1});continue}n++}return t}function Ex(i){const e=Sx(i);return new yx(e).parse()}class yx{constructor(e){Ze(this,"tokens");Ze(this,"pos",0);this.tokens=e}parse(){const e=[];for(;!this.isAtEnd();){const t=this.parseStatement();t&&e.push(t)}return e}parseStatement(){var t;switch(this.peek().type){case J.NEW:return this.parseNewStatement();case J.TITLE:return this.parseTitleStatement();case J.DESCRIPTION:return this.parseDescriptionStatement();case J.LOCKAHEAD:return this.parseLockAheadStatement();case J.RANDOM:return this.parseRandomStatement();case J.MAX:return this.parseMaxTrainsStatement();case J.FLEX:return this.parseFlexConnectStatement();case J.CROSS:return this.parseCrossConnectStatement();case J.DEFINE:return this.parseDefineStatement();case J.LOG:return this.parseLogStatement();case J.SPLICE:return this.parseSpliceStatement();case J.LABEL_DEF:return this.parseLabeledPiece();case J.LABEL_REF:return this.parseReference();case J.LOOP_CLOSE:return this.parseLoopClose();case J.IDENTIFIER:if(((t=this.peekNext())==null?void 0:t.type)===J.DOT){const n=this.tokens[this.pos+2];if((n==null?void 0:n.type)===J.LABEL_REF)return this.parsePointLabelReference()}return this.parsePieceOrExplicitConnection();case J.EOF:return null;default:return this.advance(),null}}parseNewStatement(){const e=this.advance();let t=0,n=0,s,r;for(;this.isNewModifier();)if(this.check(J.DEGREES))this.advance(),this.check(J.NUMBER)&&(t=parseFloat(this.advance().value));else if(this.check(J.OFFSET))this.advance(),this.check(J.NUMBER)&&(n=parseFloat(this.advance().value));else if(this.check(J.BASE)){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(J.NUMBER))t=parseFloat(this.advance().value);else if(this.check(J.IDENTIFIER)&&this.peek().value.toLowerCase()==="from"){this.advance();const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else if(this.check(J.LABEL_REF)){const a=this.parseConnectionPointRef();a&&(s=a.label,r=a.point)}else break;return{type:"new",degrees:t,offset:n,baseLabel:s,basePoint:r,line:e.line}}isNewModifier(){var n;const e=this.peek().type,t=this.peek().value;return e===J.DEGREES||e===J.OFFSET||e===J.BASE||e===J.NUMBER||e===J.LABEL_REF||e===J.IDENTIFIER&&t.toLowerCase()==="from"||e===J.IDENTIFIER&&((n=this.peekNext())==null?void 0:n.type)===J.DOT}parseConnectionPointRef(){var e;if(this.check(J.LABEL_REF)){const t=this.advance().value;let n;return this.check(J.DOT)&&(this.advance(),this.check(J.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{label:t,point:n}}else if(this.check(J.IDENTIFIER)&&((e=this.peekNext())==null?void 0:e.type)===J.DOT){const t=this.advance().value.toLowerCase();if(this.advance(),this.check(J.LABEL_REF))return{label:this.advance().value,point:t}}return null}parseTitleStatement(){const e=this.advance();let t="";return this.check(J.STRING)&&(t=this.advance().value),{type:"title",text:t,line:e.line}}parseDescriptionStatement(){const e=this.advance();let t="";return this.check(J.STRING)&&(t=this.advance().value),{type:"description",text:t,line:e.line}}parseLockAheadStatement(){const e=this.advance();let t,n;for(;this.check(J.DISTANCE)||this.check(J.COUNT)||this.check(J.NUMBER);)this.check(J.DISTANCE)?(this.advance(),this.check(J.NUMBER)&&(t=parseFloat(this.advance().value))):this.check(J.COUNT)?(this.advance(),this.check(J.NUMBER)&&(n=parseInt(this.advance().value,10))):this.check(J.NUMBER)&&(t=parseFloat(this.advance().value));return{type:"lockAhead",distance:t,count:n,line:e.line}}parseRandomStatement(){return{type:"random",line:this.advance().line}}parseMaxTrainsStatement(){const e=this.advance();this.check(J.TRAINS)&&this.advance();let t=1;return this.check(J.NUMBER)&&(t=parseInt(this.advance().value,10)),{type:"maxTrains",value:t,line:e.line}}parseFlexConnectStatement(){const e=this.advance();this.check(J.CONNECT)&&this.advance();const t=this.parseConnectionPointRef();if(!t)throw new Error(`Expected connection point reference after 'flex connect' at line ${e.line}`);const n=this.parseConnectionPointRef();if(!n)throw new Error(`Expected second connection point reference in 'flex connect' at line ${e.line}`);return{type:"flexConnect",point1Label:t.label,point1Name:t.point,point2Label:n.label,point2Name:n.point,line:e.line}}parseCrossConnectStatement(){const e=this.advance();if(this.check(J.CONNECT)&&this.advance(),!this.check(J.LABEL_REF))throw new Error(`Expected $label after 'cross connect' at line ${e.line}`);const t=this.advance().value;if(!this.check(J.LABEL_REF))throw new Error(`Expected second $label in 'cross connect' at line ${e.line}`);const n=this.advance().value;return{type:"crossConnect",label1:t,label2:n,line:e.line}}parseLogStatement(){const e=this.advance();if(!this.check(J.IDENTIFIER))throw new Error(`Expected log level (debug, info, warn, error) after 'log' at line ${e.line}`);const t=this.advance();let n=t.value.toLowerCase();if(n==="warning"&&(n="warn"),n!=="debug"&&n!=="info"&&n!=="warn"&&n!=="error")throw new Error(`Invalid log level '${t.value}' at line ${e.line}. Expected: debug, info, warn, or error`);return{type:"log",level:n,line:e.line}}parseDefineStatement(){const e=this.advance();if(!this.check(J.IDENTIFIER))throw new Error(`Expected archetype name after 'define' at line ${e.line}`);const t=this.advance().value.toLowerCase();let n;if(this.check(J.LEFT))this.advance(),n="left";else if(this.check(J.RIGHT))this.advance(),n="right";else if(this.check(J.STRAIGHT))this.advance(),n="straight";else throw new Error(`Expected direction (left, right, straight, l, r, or s) after archetype name at line ${e.line}`);let s,r,a;if(n==="left"||n==="right"){for(;this.check(J.RADIUS)||this.check(J.ARC);)if(this.check(J.RADIUS)){if(this.advance(),!this.check(J.NUMBER))throw new Error(`Expected number after 'radius' at line ${e.line}`);s=parseFloat(this.advance().value)}else if(this.check(J.ARC)){if(this.advance(),!this.check(J.NUMBER))throw new Error(`Expected number after 'arc' at line ${e.line}`);r=parseFloat(this.advance().value)}if(s===void 0)throw new Error(`Curve definition requires 'radius' at line ${e.line}`);if(r===void 0)throw new Error(`Curve definition requires 'arc' at line ${e.line}`);if(this.check(J.LENGTH))throw new Error(`'length' is not allowed for curve definitions at line ${e.line}`)}else{if(!this.check(J.LENGTH))throw new Error(`Straight definition requires 'length' at line ${e.line}`);if(this.advance(),!this.check(J.NUMBER))throw new Error(`Expected number after 'length' at line ${e.line}`);if(a=parseFloat(this.advance().value),this.check(J.RADIUS)||this.check(J.ARC))throw new Error(`'radius' and 'arc' are not allowed for straight definitions at line ${e.line}`)}return{type:"define",name:t,direction:n,radius:s,arc:r,length:a,line:e.line}}parseSpliceStatement(){const e=this.advance();this.check(J.USING)&&this.advance();const t=this.parseConnectionPointRef();return{type:"splice",label:t==null?void 0:t.label,point:t==null?void 0:t.point,line:e.line}}parseLabeledPiece(){const e=this.advance(),t=e.value,n=this.parsePieceOrExplicitConnection();if(n.type!=="piece")throw new Error(`Expected piece after label '${t}:' at line ${e.line}`);return n.label=t,n}parseReference(){const e=this.advance(),t=e.value;let n;return this.check(J.DOT)&&(this.advance(),this.check(J.IDENTIFIER)&&(n=this.advance().value.toLowerCase())),{type:"reference",label:t,point:n,line:e.line}}parsePointLabelReference(){const e=this.advance(),t=e.value.toLowerCase();if(this.advance(),!this.check(J.LABEL_REF))throw new Error(`Expected $label after '${t}.' at line ${e.line}`);return{type:"reference",label:this.advance().value,point:t,line:e.line}}parseLoopClose(){const e=this.advance();let t,n;if(this.check(J.IDENTIFIER)){if(t=this.advance().value.toLowerCase(),!this.check(J.DOT))throw new Error(`Expected "." after connection point in loop close at line ${e.line}`);if(this.advance(),!this.check(J.LABEL_REF))throw new Error(`Expected $label after "." in loop close at line ${e.line}`);n=this.advance().value}else if(this.check(J.LABEL_REF)){if(n=this.advance().value,!this.check(J.DOT))throw new Error(`Expected "." after $${n} in loop close at line ${e.line}`);if(this.advance(),!this.check(J.IDENTIFIER))throw new Error(`Expected connection point after "$${n}." in loop close at line ${e.line}`);t=this.advance().value.toLowerCase()}else throw new Error(`Expected connection point reference after ">" at line ${e.line}`);return{type:"loopClose",point:t,label:n,line:e.line}}parsePieceOrExplicitConnection(){let e,t;const n=this.advance();if(this.check(J.DOT)){if(e=n.value.toLowerCase(),this.advance(),!this.check(J.IDENTIFIER))throw new Error(`Expected piece code after '${e}.' at line ${n.line}`);t=this.advance().value.toLowerCase()}else t=n.value.toLowerCase();let s,r,a,o,c;if(t==="gen"||t==="generator")for(;this.isGenModifier();)if(this.check(J.CABS))this.advance(),s=this.parseNumberOrRange(!0);else if(this.check(J.CARS))this.advance(),r=this.parseNumberOrRange(!0);else if(this.check(J.SPEED))this.advance(),a=this.parseNumberOrRange(!1);else if(this.check(J.EVERY))this.advance(),o=this.parseNumberOrRange(!0);else if(this.check(J.COLORFUL))this.advance(),c="colorful";else if(this.check(J.GRAY))this.advance(),c="gray";else if(this.check(J.BLACK))this.advance(),c="black";else break;let l=1;return this.check(J.REPETITION)&&(this.advance(),this.check(J.NUMBER)&&(l=parseInt(this.advance().value,10))),{type:"piece",attachPoint:e,archetypeCode:t,count:l,line:n.line,genCabs:s,genCars:r,genSpeed:a,genEvery:o,genColorMode:c}}isGenModifier(){const e=this.peek().type;return e===J.CABS||e===J.CARS||e===J.SPEED||e===J.EVERY||e===J.COLORFUL||e===J.GRAY||e===J.BLACK}parseNumberOrRange(e){if(this.check(J.NUMBER)){const t=this.advance().value;return e?parseInt(t,10):parseFloat(t)}else if(this.check(J.RANGE)){const n=this.advance().value.split("-");if(n.length===2){const s=e?parseInt(n[0],10):parseFloat(n[0]),r=e?parseInt(n[1],10):parseFloat(n[1]);return{min:s,max:r}}}}peek(){return this.tokens[this.pos]||{type:J.EOF,value:"",line:0,column:0}}peekNext(){return this.tokens[this.pos+1]}advance(){return this.isAtEnd()||this.pos++,this.tokens[this.pos-1]}check(e){return this.peek().type===e}isAtEnd(){return this.peek().type===J.EOF}}function Uo(i){const e=Ex(i);return new bx().build(e)}class bx{constructor(){Ze(this,"state");this.state=this.createInitialState()}createInitialState(){const e={pieces:[],startPosition:q(0,0),startRotation:0};return{pieces:[],labeledPieces:new Map,segments:[],currentSegment:e,currentPosition:q(0,0),currentRotation:0,currentPiece:null,currentPointName:"out",nextPieceId:1,title:void 0,descriptions:[],pendingSplices:[],pendingFlexConnects:[],pendingCrossConnects:[]}}build(e){for(const t of e)this.processStatement(t);return this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment),this.processPendingSplices(),this.processPendingCrossConnects(),this.processPendingFlexConnects(),this.detectAutoConnections(),this.markTunnelSections(),{title:this.state.title||"Simulador de Tren",description:this.state.descriptions.length>0?this.state.descriptions.join(" "):void 0,lockAheadDistance:this.state.lockAheadDistance,lockAheadCount:this.state.lockAheadCount,randomSwitches:this.state.randomSwitches,maxTrains:this.state.maxTrains,logLevel:this.state.logLevel,pieces:this.state.pieces}}processStatement(e){switch(e.type){case"new":this.processNew(e);break;case"piece":this.processPiece(e);break;case"reference":this.processReference(e);break;case"loopClose":this.processLoopClose(e);break;case"title":this.processTitle(e);break;case"description":this.processDescription(e);break;case"lockAhead":this.processLockAhead(e);break;case"random":this.processRandom(e);break;case"maxTrains":this.processMaxTrains(e);break;case"splice":this.processSplice(e);break;case"flexConnect":this.processFlexConnect(e);break;case"crossConnect":this.processCrossConnect(e);break;case"define":this.processDefine(e);break;case"log":this.processLog(e);break}}processLog(e){this.state.logLevel=e.level;const t={debug:Qt.DEBUG,info:Qt.INFO,warn:Qt.WARNING,error:Qt.ERROR};zl(t[e.level])}processTitle(e){if(this.state.title!==void 0)throw new Error(`Duplicate title statement at line ${e.line}. Only one title allowed.`);this.state.title=e.text}processDescription(e){this.state.descriptions.push(e.text)}processLockAhead(e){e.distance!==void 0&&(this.state.lockAheadDistance=e.distance),e.count!==void 0&&(this.state.lockAheadCount=e.count)}processRandom(e){this.state.randomSwitches=!0}processMaxTrains(e){this.state.maxTrains=e.value}processDefine(e){let t;if(e.direction==="straight"){const n=e.length;t={code:e.name,aliases:[],sections:[{splinePoints:[q(0,0),q(n,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(n,0),direction:q(1,0),sectionIndices:[0]}]}}else{const n=e.radius,s=e.arc,r=s*Math.PI/180,a=Math.max(3,Math.ceil(s/15)+1),o=[];for(let h=0;h<a;h++){const u=h/(a-1)*r;e.direction==="left"?o.push(q(n*Math.sin(u),n*(1-Math.cos(u)))):o.push(q(n*Math.sin(u),-n*(1-Math.cos(u))))}const c=o[o.length-1];let l;e.direction==="left"?l=q(Math.cos(r),Math.sin(r)):l=q(Math.cos(r),-Math.sin(r)),t={code:e.name,aliases:[],sections:[{splinePoints:o}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:c,direction:l,sectionIndices:[0]}]}}hn(t),ee.debug(`Defined custom archetype '${e.name}': ${e.direction}, `+(e.direction==="straight"?`length=${e.length}`:`radius=${e.radius}, arc=${e.arc}°`))}processSplice(e){var t;this.state.pendingSplices.push({label:e.label,point:e.point,currentPieceId:(t=this.state.currentPiece)==null?void 0:t.id,currentPointName:this.state.currentPointName,line:e.line})}processFlexConnect(e){this.state.pendingFlexConnects.push({point1Label:e.point1Label,point1Name:e.point1Name||"out",point2Label:e.point2Label,point2Name:e.point2Name||"in",line:e.line})}processCrossConnect(e){this.state.pendingCrossConnects.push({label1:e.label1,label2:e.label2,line:e.line})}processNew(e){this.state.currentSegment.pieces.length>0&&this.state.segments.push(this.state.currentSegment);const t=e.degrees*Math.PI/180;if(e.baseLabel){const n=this.state.labeledPieces.get(e.baseLabel);if(!n)throw new Error(`Unknown label '${e.baseLabel}' in 'new' at line ${e.line}`);const s=ot(n.archetypeCode),r=e.basePoint||"out",a=this.getConnectionPoint(s,r);if(!a)throw new Error(`Connection point '${r}' not found on '${e.baseLabel}' at line ${e.line}`);const o=this.rotatePoint(a.position,n.rotation),c={x:n.position.x+o.x,z:n.position.z+o.z},l=this.rotatePoint(a.direction,n.rotation),h=Math.atan2(l.z,l.x),d=h+t,u={x:c.x+Math.cos(d)*e.offset,y:0,z:c.z+Math.sin(d)*e.offset};this.state.currentSegment={pieces:[],startPosition:u,startRotation:d},this.state.currentPosition=u,this.state.currentRotation=d,this.state.currentPiece=n,this.state.currentPointName=r,ee.debug(`Line ${e.line}: New segment from $${e.baseLabel}.${r}:`),ee.debug(`Line ${e.line}:   baseAngle: ${(h*180/Math.PI).toFixed(1)}°`),ee.debug(`Line ${e.line}:   degrees offset: ${e.degrees}°`),ee.debug(`Line ${e.line}:   currentRotation: ${(d*180/Math.PI).toFixed(1)}°`),ee.debug(`Line ${e.line}:   position: (${u.x.toFixed(2)}, ${u.z.toFixed(2)})`)}else{const n=t,s={x:Math.cos(n)*e.offset,y:0,z:Math.sin(n)*e.offset};this.state.currentSegment={pieces:[],startPosition:s,startRotation:n},this.state.currentPosition=s,this.state.currentRotation=n,this.state.currentPiece=null,this.state.currentPointName="out",ee.debug(`Line ${e.line}: New segment at origin:`),ee.debug(`Line ${e.line}:   degrees: ${e.degrees}°`),ee.debug(`Line ${e.line}:   currentRotation: ${(n*180/Math.PI).toFixed(1)}°`),ee.debug(`Line ${e.line}:   position: (${s.x.toFixed(2)}, ${s.z.toFixed(2)})`)}}processPiece(e){var n,s,r;const t=ot(e.archetypeCode);for(let a=0;a<e.count;a++){const o=this.placePiece(t,e.attachPoint,e.line,e.label);a===0&&e.label&&(o.label=e.label,this.state.labeledPieces.set(e.label,o)),t.code==="gen"&&a===0&&(o.genConfig={cabCount:(n=e.genCabs)!=null?n:1,carCount:(s=e.genCars)!=null?s:5,speed:e.genSpeed,frequency:e.genEvery,colorMode:(r=e.genColorMode)!=null?r:"gray",lastSpawnTime:-1/0,enabled:!0}),t.code==="sem"&&a===0&&(o.semaphoreConfig={locked:!1}),this.state.pieces.push(o),this.state.currentSegment.pieces.push(o),this.state.currentPiece=o}}placePiece(e,t,n,s){let r=t||"in",a=this.getConnectionPoint(e,r);if(!a)if(e.connectionPoints.length>0)a=e.connectionPoints[0],r=a.name;else throw new Error(`No connection points found on archetype '${e.code}'`);const o=this.getOppositePoint(e,r),c=o?this.getConnectionPoint(e,o):null,l=a.direction,h=Math.atan2(l.z,l.x),u=this.state.currentRotation+Math.PI-h,f=this.rotatePoint(a.position,u),g={x:this.state.currentPosition.x-f.x,y:0,z:this.state.currentPosition.z-f.z},_={id:`piece_${this.state.nextPieceId++}`,archetypeCode:e.code,position:g,rotation:u,connections:new Map};{const m=s?` "${s}"`:"",p=n!==void 0?`Line ${n}`:"Line ?";ee.debug(`${p}: Placed ${e.code}${m} (${_.id}):`),ee.debug(`${p}:   incomingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`),ee.debug(`${p}:   pieceRotation: ${(u*180/Math.PI).toFixed(1)}°`),ee.debug(`${p}:   position: (${g.x.toFixed(2)}, ${g.z.toFixed(2)})`)}if(c){const m=this.rotatePoint(c.position,u);this.state.currentPosition={x:g.x+m.x,y:0,z:g.z+m.z};const p=this.rotatePoint(c.direction,u);this.state.currentRotation=Math.atan2(p.z,p.x),this.state.currentPointName=o;{const S=n!==void 0?`Line ${n}`:"Line ?";ee.debug(`${S}:   outgoingRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}}return _}processReference(e){const t=this.state.labeledPieces.get(e.label);if(!t)throw new Error(`Unknown label reference: $${e.label} at line ${e.line}`);const n=ot(t.archetypeCode),s=e.point||"out",r=this.getConnectionPoint(n,s);if(!r)throw new Error(`Connection point '${s}' not found on labeled piece '${e.label}' at line ${e.line}`);const a=this.rotatePoint(r.position,t.rotation);this.state.currentPosition={x:t.position.x+a.x,y:0,z:t.position.z+a.z};const o=this.rotatePoint(r.direction,t.rotation);this.state.currentRotation=Math.atan2(o.z,o.x),this.state.currentPiece=t,this.state.currentPointName=s,ee.debug(`Line ${e.line}: Reference $${e.label}.${s}:`),ee.debug(`Line ${e.line}:   labeledPiece (${t.archetypeCode}) rotation: ${(t.rotation*180/Math.PI).toFixed(1)}°`),ee.debug(`Line ${e.line}:   point.direction (local): (${r.direction.x.toFixed(3)}, ${r.direction.z.toFixed(3)})`),ee.debug(`Line ${e.line}:   rotatedDir (world): (${o.x.toFixed(3)}, ${o.z.toFixed(3)})`),ee.debug(`Line ${e.line}:   new currentRotation: ${(this.state.currentRotation*180/Math.PI).toFixed(1)}°`)}processLoopClose(e){const t=this.state.labeledPieces.get(e.label);if(!t)throw new Error(`Unknown label reference in loop close: $${e.label} at line ${e.line}`);const n=ot(t.archetypeCode),s=this.getConnectionPoint(n,e.point);if(!s)throw new Error(`Connection point '${e.point}' not found on '${e.label}' at line ${e.line}`);const r=this.rotatePoint(s.position,t.rotation),a={x:t.position.x+r.x,z:t.position.z+r.z},o=this.rotatePoint(s.direction,t.rotation),c=Math.atan2(o.z,o.x),l=this.state.currentPosition,h=this.state.currentRotation,d=c+Math.PI,u=d-h,f=this.state.currentSegment.startPosition;for(const M of this.state.currentSegment.pieces){const R=M.position.x-f.x,w=M.position.z-f.z,A=this.rotatePoint({x:R,y:0,z:w},u);M.position.x=f.x+A.x,M.position.z=f.z+A.z,M.rotation+=u}const g=l.x-f.x,_=l.z-f.z,m=this.rotatePoint({x:g,y:0,z:_},u),p={x:f.x+m.x,z:f.z+m.z},S=a.x-p.x,x=a.z-p.z;for(const M of this.state.currentSegment.pieces)M.position.x+=S,M.position.z+=x;if(this.state.currentSegment.startPosition.x+=S,this.state.currentSegment.startPosition.z+=x,this.state.currentPosition={x:a.x,y:0,z:a.z},this.state.currentRotation=d,ee.debug(`Line ${e.line}: Loop close to $${e.label}.${e.point}:`),ee.debug(`Line ${e.line}:   rotationDelta: ${(u*180/Math.PI).toFixed(1)}°`),ee.debug(`Line ${e.line}:   new currentPosition: (${a.x.toFixed(2)}, ${a.z.toFixed(2)})`),ee.debug(`Line ${e.line}:   new currentRotation: ${(d*180/Math.PI).toFixed(1)}°`),this.state.currentPiece){const M=this.state.currentPiece.connections.get(this.state.currentPointName)||[];M.push({pieceId:t.id,pointName:e.point}),this.state.currentPiece.connections.set(this.state.currentPointName,M);const R=t.connections.get(e.point)||[];R.push({pieceId:this.state.currentPiece.id,pointName:this.state.currentPointName}),t.connections.set(e.point,R)}}getConnectionPoint(e,t){return e.connectionPoints.find(n=>n.name===t)}getOppositePoint(e,t){if(t==="in")return e.connectionPoints.find(n=>n.name==="out")?"out":void 0;if(t==="out")return e.connectionPoints.find(n=>n.name==="in")?"in":void 0;if(t==="in1")return"out1";if(t==="out1")return"in1";if(t==="in2")return"out2";if(t==="out2")return"in2"}rotatePoint(e,t){const n=Math.cos(t),s=Math.sin(t);return{x:e.x*n-e.z*s,y:e.y,z:e.x*s+e.z*n}}processPendingSplices(){for(const e of this.state.pendingSplices)this.performSplice(e)}processPendingFlexConnects(){ee.debug(`Processing ${this.state.pendingFlexConnects.length} flex connects`);for(const e of this.state.pendingFlexConnects)this.performFlexConnect(e)}processPendingCrossConnects(){this.state.pendingCrossConnects.length>0&&ee.debug(`Processing ${this.state.pendingCrossConnects.length} cross connects`);for(const e of this.state.pendingCrossConnects)this.performCrossConnect(e)}performCrossConnect(e){if(e.label1===e.label2)throw new Error(`Cross connect requires two different tracks at line ${e.line}`);const t=this.state.labeledPieces.get(e.label1),n=this.state.labeledPieces.get(e.label2);if(!t)throw new Error(`Unknown label '${e.label1}' in cross connect at line ${e.line}`);if(!n)throw new Error(`Unknown label '${e.label2}' in cross connect at line ${e.line}`);const s=this.findSplineIntersection(t,n);if(!s){ee.warn(`No intersection found between $${e.label1} and $${e.label2} at line ${e.line}`);return}const r=this.calculateSectionLength(t),a=this.calculateSectionLength(n),o=s.t1*r,c=s.t2*a;ee.debug(`Cross connect at line ${e.line}:`),ee.debug(`  Intersection at (${s.worldPos.x.toFixed(2)}, ${s.worldPos.z.toFixed(2)})`),ee.debug(`  piece1: t=${s.t1.toFixed(3)}, length=${r.toFixed(1)}, distance=${o.toFixed(1)}`),ee.debug(`  piece2: t=${s.t2.toFixed(3)}, length=${a.toFixed(1)}, distance=${c.toFixed(1)}`);const l=`cross_${t.id}_${n.id}`;t.internalConnectionPoints||(t.internalConnectionPoints=[]),t.internalConnectionPoints.push({id:l,t:s.t1,distance:o,worldPosition:{...s.worldPos}}),n.internalConnectionPoints||(n.internalConnectionPoints=[]),n.internalConnectionPoints.push({id:l,t:s.t2,distance:c,worldPosition:{...s.worldPos}}),ee.debug(`  Created shared internal connection point: ${l}`)}calculateSectionLength(e){const t=ot(e.archetypeCode);if(!t||t.sections.length===0)return 0;const n=t.sections[0];if(n.splinePoints.length<2)return 0;let s=0,r=null;for(const a of n.splinePoints){const o=this.rotatePoint(a,e.rotation),c={x:e.position.x+o.x,y:0,z:e.position.z+o.z};if(r){const l=c.x-r.x,h=c.z-r.z;s+=Math.sqrt(l*l+h*h)}r=c}return s}findSplineIntersection(e,t){const n=ot(e.archetypeCode),s=ot(t.archetypeCode),r=n.sections.length>0&&n.sections[0].splinePoints.length>=2,a=s.sections.length>0&&s.sections[0].splinePoints.length>=2;if(r&&a)return this.findSplineSplineIntersection(e,t,n,s);if(!r&&a){const c={x:e.position.x,y:0,z:e.position.z},l=this.findPointOnSpline(c,t,s);return l?{t1:.5,t2:l.t,worldPos:c}:null}if(r&&!a){const c={x:t.position.x,y:0,z:t.position.z},l=this.findPointOnSpline(c,e,n);return l?{t1:l.t,t2:.5,worldPos:c}:null}return Math.sqrt(Math.pow(e.position.x-t.position.x,2)+Math.pow(e.position.z-t.position.z,2))<.5?{t1:.5,t2:.5,worldPos:{x:e.position.x,y:0,z:e.position.z}}:null}findSplineSplineIntersection(e,t,n,s){const r=n.sections[0],a=s.sections[0],o=r.splinePoints.map(d=>{const u=this.rotatePoint(d,e.rotation);return{x:e.position.x+u.x,y:0,z:e.position.z+u.z}}),c=a.splinePoints.map(d=>{const u=this.rotatePoint(d,t.rotation);return{x:t.position.x+u.x,y:0,z:t.position.z+u.z}}),l=o.length-1,h=c.length-1;for(let d=0;d<l;d++){const u=o[d],f=o[d+1];for(let g=0;g<h;g++){const _=c[g],m=c[g+1],p=this.lineSegmentIntersection(u,f,_,m);if(p){const S=(d+p.s)/l,x=(g+p.t)/h;return{t1:S,t2:x,worldPos:p.point}}}}return null}findPointOnSpline(e,t,n){const a=n.sections[0].splinePoints.map(h=>{const d=this.rotatePoint(h,t.rotation);return{x:t.position.x+d.x,y:0,z:t.position.z+d.z}}),o=a.length-1;let c=-1,l=1/0;for(let h=0;h<o;h++){const d=a[h],u=a[h+1],f=u.x-d.x,g=u.z-d.z,_=f*f+g*g;let m=0;_>1e-4&&(m=Math.max(0,Math.min(1,((e.x-d.x)*f+(e.z-d.z)*g)/_)));const p=d.x+m*f,S=d.z+m*g,x=Math.sqrt(Math.pow(e.x-p,2)+Math.pow(e.z-S,2));x<l&&(l=x,c=(h+m)/o)}return l<=.5?{t:c,distance:l}:null}lineSegmentIntersection(e,t,n,s){const r=t.x-e.x,a=t.z-e.z,o=s.x-n.x,c=s.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=n.x-e.x,d=n.z-e.z,u=(h*c-d*o)/l,f=(h*a-d*r)/l;return u<0||u>1||f<0||f>1?null:{s:u,t:f,point:{x:e.x+u*r,y:0,z:e.z+u*a}}}performFlexConnect(e){const t=this.state.labeledPieces.get(e.point1Label),n=this.state.labeledPieces.get(e.point2Label);if(!t)throw new Error(`Unknown label '${e.point1Label}' in flex connect at line ${e.line}`);if(!n)throw new Error(`Unknown label '${e.point2Label}' in flex connect at line ${e.line}`);const s=ot(t.archetypeCode),r=ot(n.archetypeCode),a=this.getConnectionPoint(s,e.point1Name),o=this.getConnectionPoint(r,e.point2Name);if(!a)throw new Error(`Connection point '${e.point1Name}' not found on '${e.point1Label}' at line ${e.line}`);if(!o)throw new Error(`Connection point '${e.point2Name}' not found on '${e.point2Label}' at line ${e.line}`);const c=this.rotatePoint(a.position,t.rotation),l={x:t.position.x+c.x,y:0,z:t.position.z+c.z},h=this.rotatePoint(a.direction,t.rotation),d={x:h.x,y:0,z:h.z},u=this.rotatePoint(o.position,n.rotation),f={x:n.position.x+u.x,y:0,z:n.position.z+u.z},g=this.rotatePoint(o.direction,n.rotation),_={x:-g.x,y:0,z:-g.z};ee.debug(`Flex connect at line ${e.line}:`),ee.debug(`  P1: (${l.x.toFixed(2)}, ${l.z.toFixed(2)}), D1: (${d.x.toFixed(3)}, ${d.z.toFixed(3)}) angle=${(Math.atan2(d.z,d.x)*180/Math.PI).toFixed(1)}°`),ee.debug(`  P2: (${f.x.toFixed(2)}, ${f.z.toFixed(2)}), D2: (${_.x.toFixed(3)}, ${_.z.toFixed(3)}) angle=${(Math.atan2(_.z,_.x)*180/Math.PI).toFixed(1)}°`),ee.debug(`  Distance: ${Math.sqrt((f.x-l.x)**2+(f.z-l.z)**2).toFixed(2)}`);const m=this.solveFlexConnect(l,d,f,_,e.line);if(!m){ee.warn(`Could not find flex connect solution at line ${e.line}`);return}ee.debug(`  Solution: ${m.type}, straight=${m.straightLength.toFixed(2)}", radius=${m.radius.toFixed(2)}", direction=${m.curveDirection}`),this.createFlexPieces(m,t,e.point1Name,n,e.point2Name,e.point1Label,e.point2Label,e.line)}perpRight(e){return{x:e.z,y:0,z:-e.x}}solveFlexConnect(e,t,n,s,r){const a={x:n.x-e.x,y:0,z:n.z-e.z},o=Math.sqrt(a.x*a.x+a.z*a.z),c=5,l=.5,h=.02,d=.02;ee.debug(`  Solving with delta=(${a.x.toFixed(2)}, ${a.z.toFixed(2)}), length=${o.toFixed(2)}`);const u=t.x*s.x+t.z*s.z,f=Math.abs(u-1)<h;let g=!1,_=!1;if(o>.1){const w=Math.abs(a.x*t.z-a.z*t.x)/o,A=(a.x*t.x+a.z*t.z)/o;g=w<d,_=A>.98}if(ee.debug(`  Direction dot=${u.toFixed(4)}, aligned=${f}, collinear=${g}, deltaAlongD1=${_}`),f&&g&&_&&o>.1)return ee.debug(`  [straight-only] length=${o.toFixed(2)}"`),{type:"straight-only",straightLength:o,radius:1/0,curveDirection:"none",P1:e,D1:t,P2:n,D2:s};const m=Math.atan2(t.z,t.x);let S=Math.atan2(s.z,s.x)-m;for(;S>Math.PI;)S-=2*Math.PI;for(;S<-Math.PI;)S+=2*Math.PI;const x=270,M=x*Math.PI/180;ee.debug(`  Arc angle between D1 and D2: ${(S*180/Math.PI).toFixed(1)}°`);const R=[];{const w=this.perpRight(t),A=this.perpRight(s),F=this.solveStraightCurve(t,w,A,a);F&&F.L>=0&&Math.abs(F.R)>=c&&(Math.abs(S)<=M?(ee.debug(`  [str+curve] L=${F.L.toFixed(2)}, R=${F.R.toFixed(2)}`),F.L<l?R.push({type:"curve-only",straightLength:0,radius:Math.abs(F.R),curveDirection:F.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s}):R.push({type:"straight-curve",straightLength:F.L,radius:Math.abs(F.R),curveDirection:F.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s})):ee.debug(`  [str+curve] rejected: arc angle ${(S*180/Math.PI).toFixed(1)}° exceeds ${x}°`))}{const w=this.perpRight(t),A=this.perpRight(s),F=this.solveCurveStraight(s,w,A,a);F&&F.L>=0&&Math.abs(F.R)>=c&&(Math.abs(S)<=M?(ee.debug(`  [curve+str] L=${F.L.toFixed(2)}, R=${F.R.toFixed(2)}`),F.L<l?R.some(T=>T.type==="curve-only")||R.push({type:"curve-only",straightLength:0,radius:Math.abs(F.R),curveDirection:F.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s}):R.push({type:"curve-straight",straightLength:F.L,radius:Math.abs(F.R),curveDirection:F.R>0?"right":"left",P1:e,D1:t,P2:n,D2:s})):ee.debug(`  [curve+str] rejected: arc angle ${(S*180/Math.PI).toFixed(1)}° exceeds ${x}°`))}return R.length===0?(ee.debug(`No valid flex connect solution found at line ${r}`),ee.debug(`  P1: (${e.x.toFixed(2)}, ${e.z.toFixed(2)}), D1: (${t.x.toFixed(3)}, ${t.z.toFixed(3)})`),ee.debug(`  P2: (${n.x.toFixed(2)}, ${n.z.toFixed(2)}), D2: (${s.x.toFixed(3)}, ${s.z.toFixed(3)})`),null):(R.sort((w,A)=>w.type==="straight-only"?-1:A.type==="straight-only"?1:w.type==="curve-only"&&A.type!=="curve-only"?-1:A.type==="curve-only"&&w.type!=="curve-only"?1:A.radius-w.radius),R[0])}solveStraightCurve(e,t,n,s){const r=t.x-n.x,a=t.z-n.z,o=e.x*a-e.z*r;if(Math.abs(o)<1e-4)return null;const c=(s.x*a-s.z*r)/o,l=(e.x*s.z-e.z*s.x)/o;return{L:c,R:l}}solveCurveStraight(e,t,n,s){const r=e.x,a=e.z,o=t.x-n.x,c=t.z-n.z,l=r*c-a*o;if(Math.abs(l)<1e-4)return null;const h=(s.x*c-s.z*o)/l,d=(r*s.z-a*s.x)/l;return{L:h,R:d}}createFlexPieces(e,t,n,s,r,a,o,c){const l=`flex_${this.state.nextPieceId}`,h=`${a}_${o}_str`,d=`${a}_${o}_crv`;if(e.type==="straight-only"){const u=this.createFlexStraightArchetype(l+"_str",e.straightLength);hn(u);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:u.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:h};this.state.labeledPieces.set(h,f),this.addConnection(t,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),ee.debug(`Flex connect at line ${c}: straight-only(${e.straightLength.toFixed(2)}") labeled "${h}"`)}else if(e.type==="curve-only"){const u=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2);hn(u);const f={id:`piece_${this.state.nextPieceId++}`,archetypeCode:u.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:d};this.state.labeledPieces.set(d,f),this.addConnection(t,n,f,"in"),this.addConnection(f,"out",s,r),this.state.pieces.push(f),ee.debug(`Flex connect at line ${c}: curve-only(R=${e.radius.toFixed(2)}", ${e.curveDirection}) labeled "${d}"`)}else if(e.type==="straight-curve"){const u=this.createFlexStraightArchetype(l+"_str",e.straightLength),f=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2);hn(u),hn(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:u.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:h},_={x:e.P1.x+e.D1.x*e.straightLength,y:0,z:e.P1.z+e.D1.z*e.straightLength},m={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:d};this.state.labeledPieces.set(h,g),this.state.labeledPieces.set(d,m),this.addConnection(t,n,g,"in"),this.addConnection(g,"out",m,"in"),this.addConnection(m,"out",s,r),this.state.pieces.push(g,m),ee.debug(`Flex connect at line ${c}: straight(${e.straightLength.toFixed(2)}") labeled "${h}" + ${e.curveDirection} curve(R=${e.radius.toFixed(2)}") labeled "${d}"`)}else{const u=this.createFlexCurveArchetype(l+"_crv",e.radius,e.curveDirection,e.D1,e.D2),f=this.createFlexStraightArchetype(l+"_str",e.straightLength);hn(u),hn(f);const g={id:`piece_${this.state.nextPieceId++}`,archetypeCode:u.code,position:{...e.P1},rotation:Math.atan2(e.D1.z,e.D1.x),connections:new Map,label:d},_={x:e.P2.x-e.D2.x*e.straightLength,y:0,z:e.P2.z-e.D2.z*e.straightLength},m={id:`piece_${this.state.nextPieceId++}`,archetypeCode:f.code,position:{..._},rotation:Math.atan2(e.D2.z,e.D2.x),connections:new Map,label:h};this.state.labeledPieces.set(d,g),this.state.labeledPieces.set(h,m),this.addConnection(t,n,g,"in"),this.addConnection(g,"out",m,"in"),this.addConnection(m,"out",s,r),this.state.pieces.push(g,m),ee.debug(`Flex connect at line ${c}: ${e.curveDirection} curve(R=${e.radius.toFixed(2)}") labeled "${d}" + straight(${e.straightLength.toFixed(2)}") labeled "${h}"`)}}createFlexStraightArchetype(e,t){return{code:e,aliases:[],sections:[{splinePoints:[q(0,0),q(t,0)]}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:q(t,0),direction:q(1,0),sectionIndices:[0]}]}}createFlexCurveArchetype(e,t,n,s,r){const a=Math.atan2(s.z,s.x);let c=Math.atan2(r.z,r.x)-a;for(;c>Math.PI;)c-=2*Math.PI;for(;c<-Math.PI;)c+=2*Math.PI;const l=c>=0?"left":"right";n!==l&&Math.abs(c)<Math.PI/2||n!==l&&(n==="left"?c+=2*Math.PI:c-=2*Math.PI);const h=Math.abs(c*180/Math.PI),d=Math.max(3,Math.ceil(h/5)+1),u=[],f=Math.abs(c);for(let m=0;m<d;m++){const S=m/(d-1)*f;n==="left"?u.push(q(t*Math.sin(S),t*(1-Math.cos(S)))):u.push(q(t*Math.sin(S),-t*(1-Math.cos(S))))}const g=u[u.length-1];let _;return n==="left"?_=q(Math.cos(f),Math.sin(f)):_=q(Math.cos(f),-Math.sin(f)),{code:e,aliases:[],sections:[{splinePoints:u}],connectionPoints:[{name:"in",position:q(0,0),direction:q(-1,0),sectionIndices:[0]},{name:"out",position:g,direction:_,sectionIndices:[0]}]}}addConnection(e,t,n,s){const r=e.connections.get(t)||[];r.push({pieceId:n.id,pointName:s}),e.connections.set(t,r);const a=n.connections.get(s)||[];a.push({pieceId:e.id,pointName:t}),n.connections.set(s,a)}performSplice(e){let t,n;if(e.label){if(t=this.state.labeledPieces.get(e.label),!t)throw new Error(`Unknown label '${e.label}' in splice at line ${e.line}`);n=e.point||"out"}else{if(!e.currentPieceId)throw new Error(`No current piece for splice at line ${e.line}`);if(t=this.state.pieces.find(f=>f.id===e.currentPieceId),!t)throw new Error(`Current piece not found for splice at line ${e.line}`);n=e.currentPointName||"out"}const s=ot(t.archetypeCode),r=this.getConnectionPoint(s,n);if(!r)throw new Error(`Connection point '${n}' not found on piece at line ${e.line}`);const a=this.rotatePoint(r.position,t.rotation),o={x:t.position.x+a.x,y:0,z:t.position.z+a.z},c=this.rotatePoint(r.direction,t.rotation),l=2;let h=null,d=0,u=.5;for(const f of this.state.pieces){if(f.id===t.id)continue;const g=ot(f.archetypeCode);for(let _=0;_<g.sections.length;_++){const m=g.sections[_];if(m.splinePoints.length<2)continue;const p=m.splinePoints.map(x=>{const M=this.rotatePoint(x,f.rotation);return{x:f.position.x+M.x,y:0,z:f.position.z+M.z}}),S=this.findClosestPointOnSpline(p,o);if(S.distance<=l){h=f,d=_,u=S.t;break}}if(h)break}if(!h){const f=e.label?`$${e.label}.${n}`:`current piece .${n}`;ee.warn(`No track found at splice point ${f} (world pos: ${o.x.toFixed(2)}, ${o.z.toFixed(2)}) at line ${e.line}`),t.label=(t.label?t.label+" ":"")+"can't splice";return}this.splitPieceAt(h,d,u,o,c,e.line)}findClosestPointOnSpline(e,t){let n=0,s=1/0;const r=e.length-1;for(let a=0;a<r;a++){const o=e[a],c=e[a+1],l=c.x-o.x,h=c.z-o.z,d=l*l+h*h;if(d===0)continue;let u=((t.x-o.x)*l+(t.z-o.z)*h)/d;u=Math.max(0,Math.min(1,u));const f=o.x+u*l,g=o.z+u*h,_=Math.sqrt((t.x-f)**2+(t.z-g)**2);_<s&&(s=_,n=(a+u)/r)}return{t:n,distance:s}}splitPieceAt(e,t,n,s,r,a){const o=ot(e.archetypeCode),l=o.sections[t].splinePoints,h=l.length-1,d=Math.floor(n*h),u=n*h-d,f=l[Math.min(d,l.length-1)],g=l[Math.min(d+1,l.length-1)],_={x:f.x+u*(g.x-f.x),y:0,z:f.z+u*(g.z-f.z)},m={x:g.x-f.x,y:0,z:g.z-f.z},p=Math.sqrt(m.x**2+m.z**2);p>0&&(m.x/=p,m.z/=p);const S=[];for(let L=0;L<=d;L++)S.push({...l[L]});S.push(_);const x=[_];for(let L=d+1;L<l.length;L++)x.push({...l[L]});const M=o.connectionPoints.find(L=>L.name==="in"),R=o.connectionPoints.find(L=>L.name==="out");if(!M||!R)throw new Error(`Cannot splice piece without 'in' and 'out' connection points at line ${a}`);const w=`splice_${this.state.nextPieceId}`,A={code:`${w}_a`,aliases:[],sections:[{splinePoints:S}],connectionPoints:[{...M,sectionIndices:[0]},{name:"out",position:_,direction:m,sectionIndices:[0]}]},F={code:`${w}_b`,aliases:[],sections:[{splinePoints:x}],connectionPoints:[{name:"in",position:_,direction:{x:-m.x,y:0,z:-m.z},sectionIndices:[0]},{...R,sectionIndices:[0]}]};hn(A),hn(F);const E={id:`piece_${this.state.nextPieceId++}`,archetypeCode:A.code,position:{...e.position},rotation:e.rotation,connections:new Map},T={id:`piece_${this.state.nextPieceId++}`,archetypeCode:F.code,position:{...e.position},rotation:e.rotation,connections:new Map},z=e.connections.get("in");if(z){E.connections.set("in",[...z]);for(const L of z){const O=this.state.pieces.find(B=>B.id===L.pieceId);if(O){const B=O.connections.get(L.pointName);if(B)for(const Y of B)Y.pieceId===e.id&&(Y.pieceId=E.id)}}}const W=e.connections.get("out");if(W){T.connections.set("out",[...W]);for(const L of W){const O=this.state.pieces.find(B=>B.id===L.pieceId);if(O){const B=O.connections.get(L.pointName);if(B)for(const Y of B)Y.pieceId===e.id&&(Y.pieceId=T.id)}}}E.connections.set("out",[{pieceId:T.id,pointName:"in"}]),T.connections.set("in",[{pieceId:E.id,pointName:"out"}]),e.label&&(E.label=e.label,this.state.labeledPieces.set(e.label,E));const re=this.state.pieces.indexOf(e);re>=0&&this.state.pieces.splice(re,1,E,T)}detectAutoConnections(){const n=[];for(const o of this.state.pieces){const c=ot(o.archetypeCode);for(const l of c.connectionPoints){const h=this.rotatePoint(l.position,o.rotation),d=this.rotatePoint(l.direction,o.rotation);n.push({piece:o,pointName:l.name,worldPos:{x:o.position.x+h.x,y:0,z:o.position.z+h.z},worldDir:d})}}const s=[],r=new Map;for(const o of n){let c=null;for(const l of s){for(const h of l){const d=o.worldPos.x-h.worldPos.x,u=o.worldPos.z-h.worldPos.z;if(Math.sqrt(d*d+u*u)<=.5){c=l;break}}if(c)break}if(c)c.push(o),r.set(o,c);else{const l=[o];s.push(l),r.set(o,l)}}let a=!0;for(;a;){a=!1;for(let o=0;o<s.length&&!a;o++)for(let c=o+1;c<s.length&&!a;c++)e:for(const l of s[o])for(const h of s[c]){const d=l.worldPos.x-h.worldPos.x,u=l.worldPos.z-h.worldPos.z;if(Math.sqrt(d*d+u*u)<=.5){for(const g of s[c])s[o].push(g),r.set(g,s[o]);s.splice(c,1),a=!0;break e}}}for(const o of s)if(!(o.length<2))for(let c=0;c<o.length;c++)for(let l=c+1;l<o.length;l++){const h=o[c],d=o[l];if(h.piece.id===d.piece.id||(h.piece.connections.get(h.pointName)||[]).some(p=>p.pieceId===d.piece.id&&p.pointName===d.pointName)||h.worldDir.x*d.worldDir.x+h.worldDir.z*d.worldDir.z>-1+.1)continue;const _=h.piece.connections.get(h.pointName)||[];_.push({pieceId:d.piece.id,pointName:d.pointName,isAutoConnect:!0}),h.piece.connections.set(h.pointName,_);const m=d.piece.connections.get(d.pointName)||[];m.push({pieceId:h.piece.id,pointName:h.pointName,isAutoConnect:!0}),d.piece.connections.set(d.pointName,m)}}markTunnelSections(){const e=this.state.pieces.filter(n=>n.archetypeCode==="tun"||n.archetypeCode==="tunnel"),t=new Set;for(const n of e){if(t.has(n.id))continue;const s=[],r=this.findTunnelPath(n.id,"out",s,new Set);if(r&&r!==n.id){t.add(r);for(const a of s){const o=this.state.pieces.find(c=>c.id===a);o&&(o.inTunnel=!0)}}}}findTunnelPath(e,t,n,s){const r=this.state.pieces.find(o=>o.id===e);if(!r)return null;const a=r.connections.get(t);if(!a||a.length===0)return null;for(const o of a){const c=`${o.pieceId}.${o.pointName}`;if(s.has(c))continue;s.add(c);const l=this.state.pieces.find(u=>u.id===o.pieceId);if(!l)continue;if(l.archetypeCode==="tun"||l.archetypeCode==="tunnel")return l.id;n.push(o.pieceId);const h=o.pointName==="in"?"out":o.pointName==="out"?"in":o.pointName==="in1"?"out1":o.pointName==="out1"?"in1":o.pointName==="in2"?"out2":"in2",d=this.findTunnelPath(o.pieceId,h,n,s);if(d)return d;n.pop()}return null}}function _i(i,e){return`${i}.${e}`}function kc(i){const e=i.lastIndexOf(".");return{pieceId:i.substring(0,e),pointName:i.substring(e+1)}}class Tx{constructor(e=10,t=2){Ze(this,"locks",new Map);Ze(this,"trainStates",new Map);Ze(this,"minLockDistance");Ze(this,"minLockCount");this.minLockDistance=e,this.minLockCount=t}getTrainState(e){let t=this.trainStates.get(e);return t||(t={heldLocks:new Set},this.trainStates.set(e,t)),t}isLocked(e){return this.locks.has(e)}isLockedByOther(e,t){const n=this.locks.get(e);return n!==void 0&&n.trainId!==t}isBlockedBySemaphore(e,t){var r;const n=kc(e),s=t.pieces.find(a=>a.id===n.pieceId);return!!((r=s==null?void 0:s.semaphoreConfig)!=null&&r.locked)}getTrainLocks(e){return this.getTrainState(e).heldLocks}tryAcquireLocks(e,t,n,s){const r=[],a=this.getTrainState(e);for(const o of t){if(s&&this.isBlockedBySemaphore(o,s))return ee.debug(`Train ${e} blocked at ${o} by locked semaphore`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:"semaphore"};const c=this.locks.get(o);if(c&&c.trainId!==e)return ee.debug(`Train ${e} blocked at ${o} by ${c.trainId}`),{success:!1,acquired:r,requested:[],blocked:o,blockingTrainId:c.trainId};c||(this.locks.set(o,{trainId:e,acquiredAt:n}),a.heldLocks.add(o),r.push(o),ee.debug(`Train ${e} acquired lock on ${o}`))}return{success:!0,acquired:r,requested:[]}}releaseLock(e,t){const n=this.locks.get(t);if(n&&n.trainId===e){this.locks.delete(t);const s=this.trainStates.get(e);return s&&s.heldLocks.delete(t),ee.debug(`Train ${e} released lock on ${t}`),!0}return!1}releaseAllLocks(e){const t=this.trainStates.get(e);if(t){for(const n of t.heldLocks)this.locks.delete(n);t.heldLocks.clear(),ee.debug(`Train ${e} released all locks`)}}acquireLeadingLocks(e,t,n,s){const r=e.cars[0],a=t.pieces.find(S=>S.id===r.currentPieceId);if(!a)return ee.debug(`acquireLeadingLocks: No piece found for ${r.currentPieceId}`),{success:!1,acquired:[],requested:[]};const o=[];let c=0;const l=r.entryPoint&&No(r.entryPoint)?"backward":"forward";let h=r.currentPieceId,d=a,u=l==="forward"?"out":"in";const f=ot(a.archetypeCode);f&&(f.code==="x90"||f.code==="x45")&&(r.entryPoint==="in1"||r.entryPoint==="out1"?u=l==="forward"?"out1":"in1":(r.entryPoint==="in2"||r.entryPoint==="out2")&&(u=l==="forward"?"out2":"in2"));const g=An(d,0);let _;if(l==="forward"?_=Math.max(0,g-r.distanceAlongSection):_=Math.max(0,r.distanceAlongSection),ee.debug(`acquireLeadingLocks: train=${e.id}, leadCar on ${h}, entryPoint=${r.entryPoint}, travelDir=${l}, exitPoint=${u}, sectionLen=${g.toFixed(1)}, distAlong=${r.distanceAlongSection.toFixed(1)}, distOnCurrent=${_.toFixed(1)}`),d.internalConnectionPoints)for(const S of d.internalConnectionPoints)(l==="forward"?S.distance>r.distanceAlongSection:S.distance<r.distanceAlongSection)&&(o.push(S.id),ee.debug(`  Adding internal point ${S.id} at distance ${S.distance.toFixed(1)}`));o.push(_i(h,u));let m=0;for(ee.debug(`  Scan ahead: minDist=${this.minLockDistance}, minCount=${this.minLockCount}`);(c<this.minLockDistance||o.length<this.minLockCount)&&m<30;){m++,c+=_;const S=Vs(h,u,t,n,e.routesTaken,void 0,l);if(ee.debug(`  Loop ${m}: from ${h}.${u}, nextSection=${S?`${S.pieceId}.${S.entryPoint}`:"null"}, distCovered=${c.toFixed(1)}, points=${o.length}`),!S){ee.debug(`  Dead end at ${h}.${u}`);break}o.push(_i(S.pieceId,S.entryPoint));const x=t.pieces.find(w=>w.id===S.pieceId);if(!x)break;h=S.pieceId,d=x;const M=ot(x.archetypeCode);let R=!0;if(M&&(M.code==="x90"||M.code==="x45")?S.entryPoint==="in1"?(u="out1",R=!0):S.entryPoint==="out1"?(u="in1",R=!1):S.entryPoint==="in2"?(u="out2",R=!0):(u="in2",R=!1):(u=Vl(S.entryPoint),R=es(S.entryPoint)),x.internalConnectionPoints){const w=[...x.internalConnectionPoints].sort((A,F)=>R?A.distance-F.distance:F.distance-A.distance);for(const A of w)o.push(A.id),ee.debug(`  Adding internal point ${A.id} on piece ${h}`)}o.push(_i(h,u)),_=An(x,0)}ee.debug(`  Final pointsToLock (${o.length}): ${o.join(", ")}`);const p=this.tryAcquireLocks(e.id,o,s,t);return p.requested=o,ee.debug(`  Lock result: success=${p.success}, acquired=${p.acquired.length}, blocked=${p.blocked||"none"}`),p}calculateStraddledPoints(e,t){const n=new Set;for(const s of e.cars){const r=t.pieces.find(d=>d.id===s.currentPieceId);if(!r)continue;const a=ot(r.archetypeCode);if(!a)continue;const o=An(r,0),c=s.length/2,l=s.distanceAlongSection+c,h=s.distanceAlongSection-c;for(const d of a.connectionPoints){const u=es(d.name)?0:o;h<=u&&l>=u&&n.add(_i(r.id,d.name))}if(r.internalConnectionPoints)for(const d of r.internalConnectionPoints)h<=d.distance&&l>=d.distance&&n.add(d.id)}return Array.from(n)}releaseTrailingLocks(e,t,n,s){const r=this.getTrainState(e.id),a=new Set;for(const h of e.cars)a.add(h.currentPieceId);const o=new Set;for(const h of a){const d=t.pieces.find(f=>f.id===h);if(!d)continue;const u=ot(d.archetypeCode);if(u){for(const f of u.connectionPoints)o.add(_i(h,f.name));if(d.internalConnectionPoints)for(const f of d.internalConnectionPoints)o.add(f.id)}}const c=this.acquireLeadingLocks(e,t,n,s);for(const h of c.requested)o.add(h);const l=[];for(const h of r.heldLocks)o.has(h)||l.push(h);for(const h of l)this.releaseLock(e.id,h)}isJunctionLocked(e){const t=e.match(/^junction\.(.+)\.(fwd|bwd)$/);if(!t)return!1;const n=t[1],s=kc(n),r=_i(s.pieceId,s.pointName);return this.isLocked(r)}getAllLockedPoints(){return new Map(this.locks)}clear(){this.locks.clear(),this.trainStates.clear()}}const Ax=12,wx=6,Cx=24;function Yl(i){return i!==void 0&&typeof i=="object"&&"min"in i&&"max"in i}function zs(i,e){return i===void 0?e:Yl(i)?Math.floor(Math.random()*(i.max-i.min+1))+i.min:i}function Rx(i,e){return i===void 0?e:Yl(i)?Math.random()*(i.max-i.min)+i.min:i}class Px{constructor(e,t,n){Ze(this,"trains",[]);Ze(this,"layout");Ze(this,"running",!1);Ze(this,"lastTime",0);Ze(this,"animationId",null);Ze(this,"simulationTime",0);Ze(this,"onUpdate");Ze(this,"selectedRoutes");Ze(this,"nextTrainId",1);Ze(this,"nextCarId",1);Ze(this,"resolvedFrequencies",new Map);Ze(this,"lockManager");Ze(this,"animationLoop",e=>{if(!this.running)return;const t=(e-this.lastTime)/1e3;this.lastTime=e;const n=Math.min(t,.1);this.simulationTime+=n,this.checkSpawning(),this.updateTrains(n),this.checkRemovals(),this.onUpdate(),this.animationId=requestAnimationFrame(this.animationLoop)});var s,r;this.layout=e,this.selectedRoutes=t,this.onUpdate=n,this.lockManager=new Tx((s=e.lockAheadDistance)!=null?s:10,(r=e.lockAheadCount)!=null?r:2)}start(){this.running||(this.running=!0,this.lastTime=performance.now(),this.animationLoop(this.lastTime),ee.info("Simulation started"))}stop(){this.running=!1,this.animationId!==null&&(cancelAnimationFrame(this.animationId),this.animationId=null),ee.info("Simulation stopped")}getLockedPoints(){var t;const e=new Set(this.lockManager.getAllLockedPoints().keys());for(const n of this.layout.pieces)(t=n.semaphoreConfig)!=null&&t.locked&&(e.add(`${n.id}.in`),e.add(`${n.id}.out`));return ee.debug("Locked points:",Array.from(e)),e}reset(){this.trains=[],this.simulationTime=0,this.resolvedFrequencies.clear(),this.lockManager.clear();for(const e of this.layout.pieces)e.genConfig&&(e.genConfig.lastSpawnTime=-1/0,e.genConfig.enabled=!0);this.onUpdate(),ee.info("Simulation reset")}getTrains(){return this.trains}toggleGenerator(e){const t=this.layout.pieces.find(n=>n.id===e);t!=null&&t.genConfig&&(t.genConfig.enabled=!t.genConfig.enabled,ee.info(`Generator ${e} toggled: ${t.genConfig.enabled}`))}checkSpawning(){for(const e of this.layout.pieces){if(!e.genConfig||!e.genConfig.enabled)continue;const t=e.genConfig,n=this.simulationTime-t.lastSpawnTime;if(t.frequency===void 0)t.lastSpawnTime===-1/0&&(this.spawnTrain(e),t.lastSpawnTime=this.simulationTime,t.enabled=!1);else{let s=this.resolvedFrequencies.get(e.id);s===void 0&&(s=zs(t.frequency,10),this.resolvedFrequencies.set(e.id,s)),n>=s&&(this.spawnTrain(e),t.lastSpawnTime=this.simulationTime,this.resolvedFrequencies.set(e.id,zs(t.frequency,10)))}}}canSpawnTrain(){var t;const e=(t=this.layout.maxTrains)!=null?t:5;return this.trains.length<e}spawnTrain(e){var d;if(!e.genConfig)return!1;if(!this.canSpawnTrain())return ee.debug(`Cannot spawn train - at max trains limit (${this.layout.maxTrains})`),!1;const t=e.genConfig,n=zs(t.cabCount,1),s=zs(t.carCount,5),r=Rx(t.speed,Ax),a={id:`train_${this.nextTrainId++}`,cars:[],desiredSpeed:r,currentSpeed:0,generatorId:e.id,routesTaken:new Map},o=An(e,0);if(o===0)return ee.debug(`Generator ${e.id} has no internal section`),!1;let c=o;hx();for(let u=0;u<n;u++){c-=Gs/2;const f={id:`car_${this.nextCarId++}`,type:"cab",length:Gs,currentPieceId:e.id,distanceAlongSection:c,visible:!1,worldPosition:Dc(0,0,0),rotation:0};a.cars.push(f),c-=Gs/2+zc}const l=(d=t.colorMode)!=null?d:"gray";for(let u=0;u<s;u++){c-=Hs/2;const f={id:`car_${this.nextCarId++}`,type:"car",length:Hs,currentPieceId:e.id,distanceAlongSection:c,visible:!1,worldPosition:Dc(0,0,0),rotation:0,color:lx(l)};a.cars.push(f),c-=Hs/2+zc}for(const u of a.cars)Mo(u,this.layout);const h=this.lockManager.acquireLeadingLocks(a,this.layout,this.selectedRoutes,this.simulationTime);return h.success?(this.trains.push(a),ee.info(`Spawned train ${a.id} with ${a.cars.length} cars`),!0):(ee.debug(`Cannot spawn train - blocked at ${h.blocked} by ${h.blockingTrainId}`),!1)}updateTrains(e){for(const t of this.trains){this.lockManager.acquireLeadingLocks(t,this.layout,this.selectedRoutes,this.simulationTime).success?t.currentSpeed<t.desiredSpeed&&(t.currentSpeed=Math.min(t.desiredSpeed,t.currentSpeed+wx*e)):t.currentSpeed=Math.max(0,t.currentSpeed-Cx*e);const s=t.currentSpeed*e,r=new Set,a=t.cars.length-1;for(let o=0;o<t.cars.length;o++){const c=o===a;ox(t.cars[o],s,this.layout,this.selectedRoutes,t.routesTaken,c?r:void 0)}for(const o of r)t.routesTaken.delete(o),ee.debug(`Cleared route memory: ${o} for train ${t.id}`);this.lockManager.releaseTrailingLocks(t,this.layout,this.selectedRoutes,this.simulationTime);for(const o of t.cars)this.updateCarVisibility(o)}}updateCarVisibility(e){const t=this.layout.pieces.find(s=>s.id===e.currentPieceId);if(!t)return;const n=ot(t.archetypeCode);n&&(n.code==="gen"||n.code==="bin"||t.inTunnel?e.visible=!1:e.visible=!0)}checkRemovals(){this.trains=this.trains.filter(e=>e.cars.every(n=>{const s=this.layout.pieces.find(a=>a.id===n.currentPieceId);if(!s)return!1;const r=ot(s.archetypeCode);return(r==null?void 0:r.code)==="bin"})?(this.lockManager.releaseAllLocks(e.id),ee.info(`Removing train ${e.id} - all cars in bin`),!1):!0)}isJunctionLocked(e){return this.lockManager.isJunctionLocked(e)}}const Lx={"two-loops.txt":dh,"complex-layout.txt":fh,"flex-connect.txt":ph,"splice.txt":mh,"cross-connect.txt":gh,"semaphore.txt":_h},jl=document.getElementById("canvas-container");if(!jl)throw new Error("Canvas container not found");const yt=new m_(jl),Gc=document.getElementById("status");let wt=null,Zt=null;yt.setSwitchClickCallback((i,e)=>{if(ee.debug(`Switch click callback: ${i} -> ${e}`),Zt!=null&&Zt.isJunctionLocked(i)){tt("Switch locked - train in junction");return}O_(i,e),wt?(ee.debug(`Calling renderLayout with ${wt.pieces.length} pieces`),is(yt,wt),tt(`Switch toggled: ${i} → route ${e+1}`)):ee.debug("currentLayout is null!")});yt.setSemaphoreClickCallback(i=>{if(ee.debug(`Semaphore click callback: ${i}`),!wt)return;const e=wt.pieces.find(n=>n.id===i);if(!e||!e.semaphoreConfig){ee.debug(`Semaphore piece ${i} not found or has no config`);return}e.semaphoreConfig.locked=!e.semaphoreConfig.locked,B_(i,e.semaphoreConfig.locked);const t=e.semaphoreConfig.locked?"LOCKED (red)":"UNLOCKED (green)";tt(`Semaphore ${i}: ${t}`),yt.render()});function tt(i){Gc&&(Gc.textContent=i)}function Oo(i){const e={debug:Qt.DEBUG,info:Qt.INFO,warn:Qt.WARNING,error:Qt.ERROR};zl(i.logLevel?e[i.logLevel]:Qt.WARNING)}function Fo(i){Zt&&Zt.stop(),Zt=new Px(i,F_(),()=>{if(Zt){const e=_x(Zt.getTrains());yt.updateTrains(e),z_(Zt.getLockedPoints(),yt.getLabelsVisible()),yt.render()}}),Zt.start(),ee.debug("Simulation started")}async function Ix(){try{tt("Opening file dialog...");const i=await oh({filters:[{name:"Layout Files",extensions:["layout","txt"]}],multiple:!1});if(!i||typeof i!="string"){tt("Import cancelled");return}tt(`Loading: ${i}`);const e=await ch(i);tt("Parsing layout...");const t=Uo(e);wt=t,Oo(t),dr(),tt(`Rendering ${t.pieces.length} pieces...`),is(yt,t),Fo(t),ee.info(`Layout loaded: ${t.pieces.length} pieces`),tt(`Layout loaded: ${t.pieces.length} pieces - simulation running`)}catch(i){const e=i instanceof Error?i.message:String(i);tt(`Error: ${e}`),ee.error("Import error:",i)}}const Hc=document.getElementById("import-btn");Hc&&Hc.addEventListener("click",()=>{Ix()});const qi=document.getElementById("random-btn");function dr(){var i;qi&&(((i=wt==null?void 0:wt.randomSwitches)!=null?i:!1)?qi.classList.add("active"):qi.classList.remove("active"))}function Dx(){if(!wt){tt("No layout loaded");return}wt.randomSwitches=!wt.randomSwitches,dr(),is(yt,wt);const i=wt.randomSwitches?"ON":"OFF";tt(`Random switches: ${i}`)}qi&&qi.addEventListener("click",Dx);const Yi=document.getElementById("labels-btn");function Nx(){Yi&&(yt.getLabelsVisible()?Yi.classList.add("active"):Yi.classList.remove("active"))}function Ux(){const i=yt.getLabelsVisible();yt.setLabelsVisible(!i),Nx(),yt.render();const e=yt.getLabelsVisible()?"ON":"OFF";tt(`Labels: ${e}`)}Yi&&Yi.addEventListener("click",Ux);yt.render();tt('Ready - click "Import Layout" to load a layout file');document.addEventListener("paste",async i=>{var t;const e=(t=i.clipboardData)==null?void 0:t.getData("text");if(e&&e.trim())try{tt("Parsing pasted layout...");const n=Uo(e);wt=n,Oo(n),dr(),is(yt,n),Fo(n),ee.info(`Layout loaded from clipboard: ${n.pieces.length} pieces`),tt(`Layout loaded from clipboard: ${n.pieces.length} pieces - simulation running`)}catch(n){const s=n instanceof Error?n.message:String(n);tt(`Parse error: ${s}`)}});const Vc=document.getElementById("layouts-btn"),tn=document.getElementById("layouts-dialog"),Bs=document.getElementById("layouts-list"),Qs=document.getElementById("dialog-run-btn"),er=document.getElementById("dialog-save-btn"),Wc=document.getElementById("dialog-cancel-btn");let pn=null,$c=null;function Ox(){return uh}function Kl(i){const e=Lx[i];if(!e)throw new Error(`Layout not found: ${i}`);return e}function Fx(i){if(Bs){Bs.innerHTML="",pn=null,Xc();for(const e of i.layouts){const t=document.createElement("div");t.className="layout-item",t.dataset.file=e.file;const n=document.createElement("div");n.className="layout-item-title",n.textContent=e.title;const s=document.createElement("div");s.className="layout-item-description",s.textContent=e.description,t.appendChild(n),t.appendChild(s),t.addEventListener("click",()=>{Bs.querySelectorAll(".layout-item").forEach(r=>r.classList.remove("selected")),t.classList.add("selected"),pn=e.file,Xc()}),Bs.appendChild(t)}}}function Xc(){const i=pn!==null;Qs&&(Qs.disabled=!i),er&&(er.disabled=!i)}function zx(){if(tn)try{$c=Ox(),Fx($c),tn.style.display="flex",tt("")}catch(i){const e=i instanceof Error?i.message:String(i);tt(`Error: ${e}`)}}function ss(){tn&&(tn.style.display="none"),pn=null}function Bx(){if(!pn)return;const i=pn;try{tt(`Loading ${i}...`),ss();const e=Kl(i);tt("Parsing layout...");const t=Uo(e);wt=t,Oo(t),dr(),tt(`Rendering ${t.pieces.length} pieces...`),is(yt,t),Fo(t),ee.info(`Layout loaded: ${t.pieces.length} pieces`),tt(`Layout loaded: ${t.pieces.length} pieces - simulation running`)}catch(e){const t=e instanceof Error?e.message:String(e);tt(`Error: ${t}`),ee.error("Run layout error:",e)}}async function kx(){if(pn)try{const i=Kl(pn),e=await ah({filters:[{name:"Layout Files",extensions:["txt","layout"]}],defaultPath:pn});if(!e){tt("Save cancelled");return}await lh(e,i),ss(),tt(`Layout saved to: ${e}`)}catch(i){const e=i instanceof Error?i.message:String(i);tt(`Error: ${e}`),ee.error("Save layout error:",i)}}Vc&&Vc.addEventListener("click",zx);Qs&&Qs.addEventListener("click",Bx);er&&er.addEventListener("click",kx);Wc&&Wc.addEventListener("click",ss);tn&&tn.addEventListener("click",i=>{i.target===tn&&ss()});document.addEventListener("keydown",i=>{i.key==="Escape"&&(tn==null?void 0:tn.style.display)==="flex"&&ss()});
