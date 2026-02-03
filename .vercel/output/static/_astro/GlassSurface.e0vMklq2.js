import{j as t}from"./jsx-runtime.D_zvdyIk.js";import{r}from"./index.DiEladB3.js";/* empty css                        */const J=({children:D,width:l=200,height:o=80,borderRadius:a=20,borderWidth:d=.07,brightness:x=50,opacity:g=.9,blur:m=11,displace:$=1,backgroundOpacity:k=.2,saturation:z=1,distortionScale:h=-180,redOffset:v=0,greenOffset:b=10,blueOffset:y=20,xChannel:R="R",yChannel:j="G",mixBlendMode:w="difference",className:F="",style:_={}})=>{const p=r.useId(),c=`glass-filter-${p}`,G=`red-grad-${p}`,S=`blue-grad-${p}`,i=r.useRef(null),C=r.useRef(null),A=r.useRef(null),E=r.useRef(null),B=r.useRef(null),I=r.useRef(null),[N,M]=r.useState(!1),T=()=>{const e=i.current?.getBoundingClientRect(),s=e?.width||400,n=e?.height||200,f=Math.min(s,n)*(d*.5),O=`
      <svg viewBox="0 0 ${s} ${n}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${G}" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="red"/>
          </linearGradient>
          <linearGradient id="${S}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0000"/>
            <stop offset="100%" stop-color="blue"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="${s}" height="${n}" fill="black"></rect>
        <rect x="0" y="0" width="${s}" height="${n}" rx="${a}" fill="url(#${G})" />
        <rect x="0" y="0" width="${s}" height="${n}" rx="${a}" fill="url(#${S})" style="mix-blend-mode: ${w}" />
        <rect x="${f}" y="${f}" width="${s-f*2}" height="${n-f*2}" rx="${a}" fill="hsl(0 0% ${x}% / ${g})" style="filter:blur(${m}px)" />
      </svg>
    `;return`data:image/svg+xml,${encodeURIComponent(O)}`},u=()=>{C.current?.setAttribute("href",T())};r.useEffect(()=>{u(),[{ref:A,offset:v},{ref:E,offset:b},{ref:B,offset:y}].forEach(({ref:e,offset:s})=>{e.current&&(e.current.setAttribute("scale",(h+s).toString()),e.current.setAttribute("xChannelSelector",R),e.current.setAttribute("yChannelSelector",j))}),I.current?.setAttribute("stdDeviation",$.toString())},[l,o,a,d,x,g,m,$,h,v,b,y,R,j,w]),r.useEffect(()=>{if(!i.current)return;const e=new ResizeObserver(()=>{setTimeout(u,0)});return e.observe(i.current),()=>{e.disconnect()}},[]),r.useEffect(()=>{if(!i.current)return;const e=new ResizeObserver(()=>{setTimeout(u,0)});return e.observe(i.current),()=>{e.disconnect()}},[]),r.useEffect(()=>{setTimeout(u,0)},[l,o]),r.useEffect(()=>{const e=/Safari/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent),s=/Firefox/.test(navigator.userAgent);if(e||s){M(!1);return}const n=document.createElement("div");n.style.backdropFilter=`url(#${c})`,M(n.style.backdropFilter!=="")},[c]);const H={..._,width:typeof l=="number"?`${l}px`:l,height:typeof o=="number"?`${o}px`:o,borderRadius:`${a}px`,"--glass-frost":k,"--glass-saturation":z,"--filter-id":`url(#${c})`,boxShadow:"15px 15px 25px #000000c7"};return t.jsxs("div",{ref:i,className:`glass-surface ${N?"glass-surface--svg":"glass-surface--fallback"} ${F}`,style:H,children:[t.jsx("svg",{className:"glass-surface__filter",xmlns:"http://www.w3.org/2000/svg",children:t.jsx("defs",{children:t.jsxs("filter",{id:c,colorInterpolationFilters:"sRGB",x:"0%",y:"0%",width:"100%",height:"100%",children:[t.jsx("feImage",{ref:C,x:"0",y:"0",width:"100%",height:"100%",preserveAspectRatio:"none",result:"map"}),t.jsx("feDisplacementMap",{ref:A,in:"SourceGraphic",in2:"map",id:"redchannel",result:"dispRed"}),t.jsx("feColorMatrix",{in:"dispRed",type:"matrix",values:`1 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0`,result:"red"}),t.jsx("feDisplacementMap",{ref:E,in:"SourceGraphic",in2:"map",id:"greenchannel",result:"dispGreen"}),t.jsx("feColorMatrix",{in:"dispGreen",type:"matrix",values:`0 0 0 0 0\r
                      0 1 0 0 0\r
                      0 0 0 0 0\r
                      0 0 0 1 0`,result:"green"}),t.jsx("feDisplacementMap",{ref:B,in:"SourceGraphic",in2:"map",id:"bluechannel",result:"dispBlue"}),t.jsx("feColorMatrix",{in:"dispBlue",type:"matrix",values:`0 0 0 0 0\r
                      0 0 0 0 0\r
                      0 0 1 0 0\r
                      0 0 0 1 0`,result:"blue"}),t.jsx("feBlend",{in:"red",in2:"green",mode:"screen",result:"rg"}),t.jsx("feBlend",{in:"rg",in2:"blue",mode:"screen",result:"output"}),t.jsx("feGaussianBlur",{ref:I,in:"output",stdDeviation:"0.7"})]})})}),t.jsx("div",{className:"glass-surface__content",children:D})]})};export{J as default};
