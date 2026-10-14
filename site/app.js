/* Decoration Academy · CompanyStore.IO
   Everything on this page is data-driven from the objects below. */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const MARK = '<use href="#mark" width="512" height="512"/>';
const fixMark = h => h.replace(/<svg (?![^>]*viewBox)([^>]*)>(\s*<use href="#mark")/g, '<svg viewBox="0 0 512 512" $1>$2');

/* ------------------------------------------------------------------ */
/* Animation keyframes (kept with the scenes that use them)            */
/* ------------------------------------------------------------------ */
const style = document.createElement('style');
style.textContent = `
@keyframes squeegee{0%,10%{transform:translateX(0)}45%{transform:translateX(150px)}55%{transform:translateX(150px)}80%{transform:translateX(0)}100%{transform:translateX(0)}}
@keyframes inkReveal{0%,12%{width:0}45%{width:150px}100%{width:150px}}
@keyframes frameLift{0%,55%{transform:translateY(0);opacity:1}65%,100%{transform:translateY(-110px);opacity:.25}}
@keyframes flashOn{0%,68%{opacity:0}72%,86%{opacity:1}92%,100%{opacity:0}}
@keyframes heatWave{0%{opacity:0;transform:translateY(0)}50%{opacity:.8}100%{opacity:0;transform:translateY(-30px)}}
@keyframes stitch{0%,8%{stroke-dashoffset:var(--len)}80%,100%{stroke-dashoffset:0}}
@keyframes needle{0%,100%{transform:translateY(0)}50%{transform:translateY(8px)}}
@keyframes hoopMove{0%,8%{transform:translate(0,0)}30%{transform:translate(-14px,-10px)}55%{transform:translate(10px,8px)}80%,100%{transform:translate(0,0)}}
@keyframes filmIn{0%{transform:translate(-120px,-60px);opacity:0}20%{transform:translate(0,0);opacity:1}60%{transform:translate(0,0);opacity:1}78%{transform:translate(0,-90px) rotate(-18deg);opacity:1}90%,100%{transform:translate(0,-90px) rotate(-18deg);opacity:0}}
@keyframes platen{0%,22%{transform:translateY(-120px)}32%{transform:translateY(0)}58%{transform:translateY(0)}68%,100%{transform:translateY(-120px)}}
@keyframes appear{0%,60%{opacity:0}70%,100%{opacity:1}}
@keyframes appearEarly{0%,30%{opacity:0}45%,100%{opacity:1}}
@keyframes fadeIn{0%,35%{opacity:0}60%,100%{opacity:1}}
@keyframes paperWrap{0%,10%{opacity:1}55%{opacity:1}70%,100%{opacity:0}}
@keyframes mugHeat{0%,15%{opacity:0}30%,55%{opacity:1}70%,100%{opacity:0}}
@keyframes beam{0%{opacity:0}5%{opacity:1}85%{opacity:1}90%,100%{opacity:0}}
@keyframes trace{0%{offset-distance:0%}100%{offset-distance:100%}}
@keyframes headSweep{0%,5%{transform:translateX(-30px)}50%{transform:translateX(180px)}55%{transform:translateX(180px)}95%,100%{transform:translateX(-30px)}}
@keyframes wipeReveal{0%,8%{width:0}50%{width:170px}100%{width:170px}}
@keyframes padDown{0%,5%{transform:translate(0,0)}18%{transform:translate(0,40px)}28%{transform:translate(0,0)}45%{transform:translate(150px,0)}58%{transform:translate(150px,60px)}68%{transform:translate(150px,0)}85%,100%{transform:translate(0,0)}}
@keyframes padInk{0%,18%{opacity:0}22%,56%{opacity:1}60%,100%{opacity:0}}
@keyframes dieDown{0%,10%{transform:translateY(-90px)}25%{transform:translateY(0)}45%{transform:translateY(0)}60%,100%{transform:translateY(-90px)}}
@keyframes shine{0%{transform:translateX(-120px) skewX(-20deg)}100%{transform:translateX(220px) skewX(-20deg)}}
@keyframes cutter{0%{offset-distance:0%}60%{offset-distance:100%}100%{offset-distance:100%}}
@keyframes weed{0%,55%{opacity:1}75%,100%{opacity:0}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes rollerPass{0%,10%{transform:translateX(-20px)}60%{transform:translateX(200px)}100%{transform:translateX(200px)}}
@keyframes blink{0%,100%{opacity:.2}50%{opacity:1}}
@keyframes checkPop{0%,85%{opacity:0;transform:scale(.4)}92%,100%{opacity:1;transform:scale(1)}}
.anim *{transform-box:fill-box;transform-origin:center}
`;
document.head.appendChild(style);

/* ------------------------------------------------------------------ */
/* Scenes                                                              */
/* ------------------------------------------------------------------ */
const scenes = {
  screen: {
    dur: 7, caps: [[0, 'Screen lowered onto the tee'], [1, 'Squeegee pushes ink through the mesh'], [3.8, 'Screen lifts: wet print'], [4.8, 'Flash / conveyor dryer cures at 160 °C'], [6.2, 'Cured, cooled, ready']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#tee" x="60" y="20" width="300" height="300" style="--p:#F3EDE8"/>
      <clipPath id="scrClip"><rect x="135" y="110" width="0" height="150" style="animation:inkReveal 7s linear infinite"/></clipPath>
      <g clip-path="url(#scrClip)"><svg x="160" y="120" width="100" height="100" style="color:#E01E23">${MARK}</svg></g>
      <g style="animation:frameLift 7s ease-in-out infinite">
        <rect x="125" y="95" width="170" height="150" rx="6" fill="rgba(255,201,64,.18)" stroke="#121212" stroke-width="5"/>
        <rect x="135" y="105" width="150" height="130" fill="url(#mesh)" opacity=".35"/>
        <g style="animation:squeegee 7s ease-in-out infinite"><rect x="128" y="100" width="18" height="140" rx="4" fill="#121212"/><rect x="132" y="90" width="10" height="20" fill="#E01E23"/></g>
      </g>
      <g style="animation:flashOn 7s linear infinite"><rect x="100" y="40" width="220" height="30" rx="8" fill="#121212"/><rect x="110" y="70" width="200" height="8" fill="#FFC940"/><path d="M130 80 L120 110 M170 80 L160 110 M210 80 L200 110 M250 80 L240 110 M290 80 L280 110" stroke="#FF8A65" stroke-width="4" stroke-linecap="round"/></g>
      <defs><pattern id="mesh" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M0 0H6M0 0V6" stroke="#121212" stroke-width=".6"/></pattern></defs>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  embroidery: {
    dur: 7, caps: [[0, 'Garment hooped with backing'], [0.8, 'Needle sews the digitised path at ~900 stitches/min'], [5.6, 'Trim threads, remove backing'], [6.4, 'No curing: done']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#polo" x="60" y="20" width="300" height="300" style="--p:#DDEAFE"/>
      <g style="animation:hoopMove 7s ease-in-out infinite">
        <circle cx="210" cy="170" r="78" fill="none" stroke="#B45309" stroke-width="10"/><circle cx="210" cy="170" r="66" fill="none" stroke="#F59E0B" stroke-width="4"/>
        <svg x="160" y="120" width="100" height="100" viewBox="0 0 512 512" fill="none" stroke="#E01E23" stroke-width="22" stroke-linejoin="round" style="--len:4000;stroke-dasharray:4000;stroke-dashoffset:4000;animation:stitch 7s linear infinite">${$('#mark') ? $('#mark').innerHTML.replace(/fill="currentColor"/g, '') : ''}</svg>
      </g>
      <g style="animation:needle .25s ease-in-out infinite"><rect x="206" y="40" width="8" height="70" fill="#9CA3AF"/><rect x="196" y="20" width="28" height="30" rx="6" fill="#121212"/><rect x="209" y="110" width="2" height="24" fill="#121212"/></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  dtf: {
    dur: 7, caps: [[0, 'Printed, powdered and cured film arrives'], [1.4, 'Heat press 150–165 °C, 10–15 s'], [4.2, 'Peel film: ink stays on the fabric'], [5.5, 'Post-press 5–10 s, cool, rest 24 h before wash']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#tee" x="60" y="20" width="300" height="300" style="--p:#1F2937"/>
      <svg x="160" y="120" width="100" height="100" style="color:#fff;animation:appear 7s linear infinite">${MARK}</svg>
      <g style="animation:filmIn 7s ease-in-out infinite"><rect x="140" y="100" width="140" height="140" rx="6" fill="rgba(255,255,255,.55)" stroke="#9CA3AF" stroke-width="2"/><svg x="160" y="120" width="100" height="100" style="color:#fff">${MARK}</svg></g>
      <g style="animation:platen 7s ease-in-out infinite"><rect x="110" y="70" width="200" height="34" rx="6" fill="#121212"/><rect x="120" y="104" width="180" height="10" fill="#E01E23"/><rect x="190" y="30" width="40" height="40" fill="#374151"/></g>
      <g style="animation:heatWave 1.2s ease-out infinite"><path d="M150 95 q6 -10 0 -20 M190 95 q6 -10 0 -20 M230 95 q6 -10 0 -20 M270 95 q6 -10 0 -20" stroke="#FF8A65" stroke-width="3" fill="none" stroke-linecap="round"/></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  dtg: {
    dur: 7, caps: [[0, 'Pre-treat dark fabric, press to flatten'], [1.2, 'Print head lays white underbase then CMYK'], [4, 'Cure 2–3 min at ~160 °C'], [6, 'Rest 24 h before first wash']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#tee" x="60" y="20" width="300" height="300" style="--p:#374151"/>
      <clipPath id="dtgClip"><rect x="140" y="110" width="0" height="130" style="animation:wipeReveal 7s linear infinite"/></clipPath>
      <g clip-path="url(#dtgClip)"><svg x="160" y="120" width="100" height="100" style="color:#fff">${MARK}</svg></g>
      <g style="animation:headSweep 7s ease-in-out infinite"><rect x="130" y="80" width="46" height="26" rx="4" fill="#121212"/><rect x="138" y="106" width="30" height="6" fill="#3B82F6"/><rect x="100" y="84" width="40" height="8" fill="#9CA3AF"/></g>
      <rect x="90" y="86" width="240" height="6" fill="#D1D5DB"/>
      <g style="animation:flashOn 7s linear infinite"><rect x="120" y="250" width="180" height="26" rx="6" fill="#121212"/><rect x="130" y="276" width="160" height="6" fill="#FFC940"/></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  sublimation: {
    dur: 7, caps: [[0, 'Dye-sub paper taped onto the mug'], [1.2, 'Mug press 180–205 °C for 150–300 s'], [4.2, 'Dye turns to gas and bonds into the polymer coating'], [5.6, 'Paper off, mug cooled in water']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#mug" x="60" y="20" width="300" height="300" style="--p:#fff"/>
      <svg x="155" y="130" width="90" height="90" style="color:#E01E23;animation:fadeIn 7s linear infinite">${MARK}</svg>
      <g style="animation:paperWrap 7s linear infinite"><rect x="130" y="110" width="140" height="130" fill="#fff" stroke="#9CA3AF" stroke-width="2" opacity=".92"/><svg x="155" y="130" width="90" height="90" style="color:#F6A3A5">${MARK}</svg><rect x="120" y="105" width="30" height="12" fill="#FFC940"/><rect x="250" y="233" width="30" height="12" fill="#FFC940"/></g>
      <g style="animation:mugHeat 7s linear infinite"><path d="M110 100 q-40 70 0 140" fill="none" stroke="#E01E23" stroke-width="14" stroke-linecap="round" opacity=".8"/><path d="M90 150 q-8 -8 0 -16 M90 190 q-8 -8 0 -16" stroke="#FF8A65" stroke-width="4" fill="none" stroke-linecap="round"/><text x="40" y="170" font-family="Fredoka" font-size="16" fill="#E01E23">200 °C</text></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  htv: {
    dur: 7, caps: [[0, 'Plotter cuts the mirrored logo from vinyl'], [2.5, 'Weed away the excess vinyl'], [4.2, 'Press 150–160 °C, 10–15 s, peel carrier'], [6, 'Done']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#tote" x="60" y="20" width="300" height="300" style="--p:#F5E6C8"/>
      <rect x="130" y="110" width="160" height="130" fill="#F6A3A5" opacity=".9" style="animation:weed 7s linear infinite"/>
      <svg x="160" y="130" width="100" height="100" style="color:#E01E23">${MARK}</svg>
      <circle r="7" fill="#121212" style="offset-path:path('M160 130 L260 130 L260 230 L160 230 Z');animation:cutter 7s linear infinite"/>
      <g style="animation:platen 7s ease-in-out infinite;animation-delay:2s"><rect x="110" y="70" width="200" height="34" rx="6" fill="#121212"/><rect x="120" y="104" width="180" height="10" fill="#E01E23"/></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  laser: {
    dur: 7, caps: [[0, 'Bottle clamped in the rotary'], [0.6, 'Fibre laser removes the coating along the vector path'], [5.5, 'Wipe residue. No ink, no cure'], [6.3, 'Permanent']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#bottle" x="60" y="10" width="300" height="300" style="--p:#374151"/>
      <clipPath id="lasClip"><rect x="160" y="110" width="0" height="120" style="animation:wipeReveal 7s linear infinite"/></clipPath>
      <g clip-path="url(#lasClip)"><svg x="170" y="120" width="80" height="80" style="color:#D1D5DB">${MARK}</svg></g>
      <g style="animation:headSweep 7s linear infinite"><rect x="150" y="30" width="40" height="40" rx="6" fill="#121212"/><line x1="170" y1="70" x2="170" y2="150" stroke="#E01E23" stroke-width="3" style="animation:beam .3s linear infinite"/><circle cx="170" cy="150" r="6" fill="#FFC940" style="animation:blink .2s linear infinite"/></g>
      <g style="animation:spin 3s linear infinite;transform-origin:95px 250px"><circle cx="95" cy="250" r="22" fill="none" stroke="#121212" stroke-width="6" stroke-dasharray="10 8"/></g>
      <text x="70" y="235" font-family="Fredoka" font-size="13" fill="#6B6B6B">rotary</text>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  uv: {
    dur: 7, caps: [[0, 'Notebook sits in a jig on the flatbed'], [0.8, 'Head prints white + CMYK; UV lamp cures instantly behind it'], [4.5, 'Raised, glossy print the moment it leaves the bed'], [6, 'Full adhesion after 24 h']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <rect x="40" y="250" width="340" height="40" rx="6" fill="#D1D5DB"/>
      <use href="#notebook" x="60" y="20" width="300" height="260" style="--p:#5B3A29"/>
      <clipPath id="uvClip"><rect x="150" y="90" width="0" height="130" style="animation:wipeReveal 7s linear infinite"/></clipPath>
      <g clip-path="url(#uvClip)"><svg x="165" y="110" width="90" height="90" style="color:#fff">${MARK}</svg></g>
      <g style="animation:headSweep 7s linear infinite"><rect x="130" y="40" width="60" height="30" rx="4" fill="#121212"/><rect x="190" y="44" width="26" height="22" rx="3" fill="#8B5CF6"/><path d="M196 66 L190 90 M203 66 L203 90 M210 66 L216 90" stroke="#8B5CF6" stroke-width="3" opacity=".8"/></g>
      <rect x="80" y="48" width="260" height="6" fill="#9CA3AF"/>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  pad: {
    dur: 7, caps: [[0, 'Silicone pad presses onto the inked cliché plate'], [1.5, 'Pad lifts the image'], [3.2, 'Pad wraps the ink onto the curved pen'], [5, 'Air-dry to touch in minutes; full cure 24–72 h']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <rect x="60" y="150" width="120" height="30" rx="4" fill="#9CA3AF"/><rect x="70" y="150" width="100" height="6" fill="#E01E23" opacity=".7"/>
      <svg x="95" y="158" width="50" height="22" viewBox="0 0 512 512" preserveAspectRatio="none" style="color:#E01E23;opacity:.8">${MARK}</svg>
      <use href="#pen" x="150" y="100" width="260" height="220" style="--p:#1F2937"/>
      <svg x="256" y="186" width="34" height="34" style="color:#fff;animation:appear 7s linear infinite">${MARK}</svg>
      <g style="animation:padDown 7s ease-in-out infinite"><path d="M90 60 L150 60 L135 110 Q120 130 105 110 Z" fill="#F59E0B" stroke="#121212" stroke-width="3"/><rect x="100" y="30" width="40" height="30" fill="#121212"/><svg x="108" y="96" width="24" height="24" style="color:#E01E23;animation:padInk 7s linear infinite">${MARK}</svg></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  deboss: {
    dur: 7, caps: [[0, 'Brass die heated to 100–130 °C'], [0.8, 'Die presses into the cover for 2–5 s'], [3.2, 'Fibres compress: a permanent sunken logo'], [5.5, 'No ink, no cure']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#notebook" x="60" y="20" width="300" height="260" style="--p:#8B5E3C"/>
      <svg x="165" y="110" width="90" height="90" style="color:#5B3A29;animation:appearEarly 7s linear infinite">${MARK}</svg>
      <g style="animation:dieDown 7s ease-in-out infinite"><rect x="150" y="40" width="120" height="60" rx="4" fill="#121212"/><rect x="160" y="100" width="100" height="12" fill="#B8860B"/><svg x="178" y="76" width="64" height="40" viewBox="0 0 512 512" preserveAspectRatio="none" style="color:#FFC940">${MARK}</svg><text x="40" y="60" font-family="Fredoka" font-size="16" fill="#E01E23">die 120 °C</text></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  },
  foil: {
    dur: 7, caps: [[0, 'Foil ribbon runs between die and cover'], [0.8, 'Heated die bonds the foil where it touches'], [3.2, 'Ribbon advances; metallic logo left behind'], [5.5, 'Instant, no cure']],
    svg: `<svg viewBox="0 0 420 320" class="anim">
      <use href="#notebook" x="60" y="20" width="300" height="260" style="--p:#121212"/>
      <defs><linearGradient id="gold" x1="0" x2="1"><stop offset="0" stop-color="#B8860B"/><stop offset=".5" stop-color="#FFE08A"/><stop offset="1" stop-color="#B8860B"/></linearGradient><clipPath id="foilClip"><rect x="165" y="110" width="90" height="90"/></clipPath></defs>
      <g style="animation:appearEarly 7s linear infinite"><svg x="165" y="110" width="90" height="90" style="color:#FFD700">${MARK}</svg><g clip-path="url(#foilClip)"><rect x="120" y="100" width="40" height="120" fill="#fff" opacity=".5" style="animation:shine 2.4s linear infinite"/></g></g>
      <rect x="110" y="104" width="200" height="8" fill="url(#gold)" opacity=".9"/>
      <g style="animation:dieDown 7s ease-in-out infinite"><rect x="150" y="40" width="120" height="60" rx="4" fill="#121212"/><rect x="160" y="100" width="100" height="10" fill="#B8860B"/></g>
      <text x="380" y="300" font-size="40" style="animation:checkPop 7s ease infinite;transform-origin:380px 290px">✅</text>
    </svg>`
  }
};

/* ------------------------------------------------------------------ */
/* Methods data                                                        */
/* ------------------------------------------------------------------ */
/* stage: {n:name, t:type(setup|print|dry|cool|qc|wait), m:minutes, per:'job'|'piece', par:parallel pieces, note} */
const methods = [
  {
    id: 'screen', ico: '🖨️', name: 'Screen printing', tag: 'Ink pushed through a stencilled mesh. The workhorse for apparel and bags.',
    product: 'Tees, polos, hoodies, totes, drawstring bags, caps (flat panels), also flat plastics and paper',
    how: [
      ['Artwork separation', 'Each colour becomes its own film positive. Halftones are used for shading.'],
      ['Make the screen', 'Mesh coated with photo-emulsion, exposed through the film, washed out, dried. One screen per colour.'],
      ['Set up the press', 'Screens registered to each other, garments loaded on platens, ink matched to Pantone.'],
      ['Print', 'A squeegee pushes ink through the open mesh. Dark garments get a white underbase first, flashed between colours.'],
      ['Flash', 'A flash unit gels the ink (104–110 °C) in seconds so the next colour sits on top, not into it.'],
      ['Cure', 'Plastisol must reach about 160 °C through the whole ink film, typically a 60 s dwell in a conveyor dryer. Water-based needs 150–160 °C for 2–3 min with forced air to drive moisture out.'],
      ['Cool, QC, pack', 'Stacks are left to cool before boxing. An under-cured print washes off in the first laundry.']
    ],
    best: ['Runs of 50+', '1 to 6 spot colours', 'Bold shapes and text', 'Cotton, blends, polyester with low-bleed ink', 'Lowest unit cost at volume'],
    avoid: ['Photos and gradients', 'Runs under 25', 'Tiny text under 6 pt', 'Curved or rigid items', 'Nylon without special ink'],
    facts: [['Colours', 'Spot, up to 6–8'], ['Minimum detail', '0.5 pt line, 6 pt text'], ['Feel', 'Plastisol sits on top; water-based sinks in'], ['Durability', '50+ washes when cured'], ['Sweet spot', '50 to 5,000 pcs'], ['Setup cost', 'Per screen, per colour']],
    stages: [
      { n: 'Artwork & films', t: 'setup', m: 20, per: 'job' },
      { n: 'Coat, expose, wash, dry screen', t: 'setup', m: 60, per: 'job', note: 'Per colour' },
      { n: 'Press setup & registration', t: 'setup', m: 20, per: 'job' },
      { n: 'Test print & approval', t: 'qc', m: 10, per: 'job' },
      { n: 'Print one colour', t: 'print', m: 0.17, per: 'piece', note: '~10 s per pull' },
      { n: 'Conveyor cure 160 °C', t: 'dry', m: 1, per: 'piece', par: 6, note: '60 s dwell, 6 on the belt' },
      { n: 'Cool before stacking', t: 'cool', m: 2, per: 'piece', par: 20 },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' },
      { n: 'Reclaim screens', t: 'setup', m: 15, per: 'job' },
      { n: 'Water-based only: rest 24 h before wash', t: 'wait', m: 1440, per: 'job' }
    ],
    placement: 'Left chest 7.5–10 cm, centre chest up to 28 × 30 cm on adult tees, full back up to 30 × 35 cm, sleeve 6–8 cm wide. Keep 2.5 cm from seams. Tote: centre panel, 20 × 20 cm.',
    note: 'Every extra colour adds a screen, a flash and roughly 60 min of setup. Quote accordingly.'
  },
  {
    id: 'embroidery', ico: '🧵', name: 'Embroidery', tag: 'Thread stitched through the fabric. Premium, textured and permanent.',
    product: 'Polos, caps, jackets, fleece, towels, bags, beanies, patches',
    how: [
      ['Digitise', 'The vector logo is converted into a stitch file: stitch types, densities, angles and sequence. A one-time skilled job of 1–3 hours.'],
      ['Thread match', 'Pantone converted to a thread chart (Madeira, Isacord). Threads loaded, bobbin wound.'],
      ['Hoop', 'The garment and a stabiliser backing are clamped in a hoop so the fabric cannot move. Caps use a curved frame.'],
      ['Sew', 'The machine sews at about 900 stitches per minute. A 6,000-stitch left-chest logo takes 7–10 minutes. Multi-head machines sew 6 or 12 garments at once.'],
      ['Finish', 'Jump threads trimmed, backing torn or cut away, water-soluble topping removed, logo steamed flat.'],
      ['No drying', 'The only method here with no cure or dry time. Ready the moment it leaves the hoop.']
    ],
    best: ['Polos, caps, jackets', 'Logos 5–12 cm wide', 'Corporate, premium, long-life uniforms', 'Textured fabrics where print would fail', 'Any quantity, including 1'],
    avoid: ['Small text under 5 mm high', 'Fine lines under 1 mm', 'Gradients and photos', 'Very thin or stretchy fabric', 'Large fills (heavy, costly, puckers)'],
    facts: [['Colours', 'Up to 12–15 threads'], ['Minimum detail', '5 mm letter height, 1 mm line'], ['Feel', 'Raised, textured'], ['Durability', 'Outlasts the garment'], ['Sweet spot', '1 to 2,000 pcs'], ['Priced by', 'Stitch count (per 1,000)']],
    stages: [
      { n: 'Digitise logo (one time)', t: 'setup', m: 90, per: 'job' },
      { n: 'Thread & machine setup', t: 'setup', m: 20, per: 'job' },
      { n: 'Sew-out sample & approval', t: 'qc', m: 15, per: 'job' },
      { n: 'Hoop with backing', t: 'print', m: 0.75, per: 'piece' },
      { n: 'Sew 6,000 stitches', t: 'print', m: 7, per: 'piece', par: 6, note: '6-head machine' },
      { n: 'Trim, remove backing, steam', t: 'qc', m: 1, per: 'piece' },
      { n: 'Pack', t: 'qc', m: 0.25, per: 'piece' }
    ],
    placement: 'Left chest 6–10 cm wide, 7.5 cm below shoulder seam. Cap front 5–6 cm wide and max 5.5 cm high (the frame limit). Sleeve 5–7 cm. Collar and cuff tabs 2–3 cm.',
    note: 'Stitch count is the price. A dense 12 cm logo can be 20,000+ stitches; ask the digitiser for a count before quoting.'
  },
  {
    id: 'dtf', ico: '🎞️', name: 'DTF transfer', tag: 'Direct-to-film. Full colour printed on film, powdered, then heat-pressed onto almost any fabric.',
    product: 'Cotton, polyester, blends, nylon, canvas bags, caps, hi-vis, dark or light',
    how: [
      ['Print on film', 'A DTF printer lays CMYK then a white layer onto PET film, mirrored. Many logos are ganged on one sheet.'],
      ['Powder', 'Hot-melt adhesive powder is shaken over the wet ink and the excess removed.'],
      ['Cure the powder', 'Film is baked (typically 110–160 °C for 2–5 min) until the powder melts to an even matte skin. Under-cured powder peels later.'],
      ['Press', 'Film placed on the pre-pressed garment, 150–165 °C for 10–15 s with medium-firm pressure.'],
      ['Peel', 'Hot, warm or cold peel depending on the film. The ink and adhesive stay on the fabric.'],
      ['Post-press', '5–10 s with a sheet of parchment to set the finish. Cool, then rest 24 h before washing.']
    ],
    best: ['Full colour and gradients', 'Small runs and mixed sizes', 'Dark garments without an underbase screen', 'Awkward fabrics: nylon, polyester, caps', 'Fast turnaround'],
    avoid: ['Very large solid fills (plastic hand-feel)', 'Breathability-critical sportswear', 'Runs over 2,000 where screen print wins on cost', 'Heat-sensitive fabrics under 140 °C'],
    facts: [['Colours', 'Unlimited, photographic'], ['Minimum detail', '1 mm line, 5 pt text'], ['Feel', 'Thin film, slight stretch'], ['Durability', '30–50 washes'], ['Sweet spot', '1 to 500 pcs'], ['Setup cost', 'None, per-sheet consumable']],
    stages: [
      { n: 'Gang artwork & RIP', t: 'setup', m: 15, per: 'job' },
      { n: 'Print film (20 logos per sheet)', t: 'print', m: 3, per: 'piece', par: 20 },
      { n: 'Powder & shake', t: 'print', m: 1, per: 'piece', par: 20 },
      { n: 'Cure powder 110–160 °C', t: 'dry', m: 4, per: 'piece', par: 20 },
      { n: 'Cut transfers', t: 'print', m: 0.2, per: 'piece' },
      { n: 'Pre-press, press 15 s, peel, post-press', t: 'print', m: 0.75, per: 'piece' },
      { n: 'Cool', t: 'cool', m: 0.5, per: 'piece' },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' },
      { n: 'Rest 24 h before first wash', t: 'wait', m: 1440, per: 'job' }
    ],
    placement: 'Same zones as screen print. Because there is no screen, each piece can carry a different name or number at no extra setup.',
    note: 'DTF is what we reach for when a client wants 40 tees in full colour by Friday.'
  },
  {
    id: 'dtg', ico: '👕', name: 'DTG printing', tag: 'Direct-to-garment. An inkjet printer prints water-based ink straight into cotton.',
    product: 'Cotton tees, sweatshirts, totes. 100% cotton or high-cotton blends, light or dark',
    how: [
      ['Pre-treat', 'Dark garments are sprayed with a pre-treatment that lets white ink sit on top, then pressed flat for 20–30 s.'],
      ['Load', 'Garment stretched onto a platen; the print head height is set to the fabric.'],
      ['Print', 'White underbase then CMYK, 1–3 min depending on size and resolution.'],
      ['Cure', 'Heat press at ~160 °C for 90 s, or a conveyor dryer for 2–3 min, to bond the water-based ink.'],
      ['Rest', 'Prints keep curing; wait 24 h before the first wash.']
    ],
    best: ['One-offs, samples, personalisation', 'Photographic artwork on cotton', 'Soft hand-feel', 'Light garments (no pre-treat)'],
    avoid: ['Polyester and most blends', 'Bright colours on dark polyester', 'Runs over 100 (slow per piece)', 'Nylon, canvas, caps'],
    facts: [['Colours', 'Unlimited'], ['Minimum detail', '0.5 mm line'], ['Feel', 'Soft, in the fabric'], ['Durability', '25–40 washes'], ['Sweet spot', '1 to 100 pcs'], ['Setup cost', 'None']],
    stages: [
      { n: 'RIP artwork', t: 'setup', m: 10, per: 'job' },
      { n: 'Pre-treat & press (dark)', t: 'print', m: 1, per: 'piece' },
      { n: 'Print white + CMYK', t: 'print', m: 2, per: 'piece' },
      { n: 'Cure 160 °C', t: 'dry', m: 2.5, per: 'piece', par: 3 },
      { n: 'Cool', t: 'cool', m: 1, per: 'piece', par: 10 },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' },
      { n: 'Rest 24 h before first wash', t: 'wait', m: 1440, per: 'job' }
    ],
    placement: 'Centre chest and full front, up to about 35 × 40 cm. Left chest works but the pre-treat box on dark tees can show, so keep to light garments for small logos.',
    note: 'DTG on polyester fails. Check the fabric label before promising it.'
  },
  {
    id: 'sublimation', ico: '🌡️', name: 'Sublimation', tag: 'Dye turns into gas under heat and bonds inside a polymer. The only truly "in the surface" print.',
    product: 'White or light polyester apparel, mugs, bottles with a sub coating, mouse pads, coasters, metal plates, phone covers, lanyards, flags',
    how: [
      ['Print', 'Sublimation ink printed onto transfer paper, mirrored. Colours look dull on paper; they bloom under heat.'],
      ['Position', 'Paper taped onto the item with heat tape so it cannot shift.'],
      ['Press', 'Polyester fabric: ~205 °C for 45 s. Ceramic mug: 180–205 °C for 150–300 s in a mug press. Metal: ~205 °C for 60 s.'],
      ['Transfer', 'At temperature the dye becomes gas and enters the open polymer; as it cools the pores close and lock it in.'],
      ['Cool', 'Mugs are dunked in water immediately to stop ghosting. Fabric is peeled hot and laid flat.']
    ],
    best: ['Full-colour, edge-to-edge, all-over', 'White polyester sportswear', 'Mugs, coasters, name badges, lanyards', 'Zero hand-feel'],
    avoid: ['Cotton (nothing to bond to)', 'Dark substrates (dye is transparent)', 'Uncoated metal, glass or ceramic', 'Anything that cannot take 200 °C'],
    facts: [['Colours', 'Unlimited'], ['Minimum detail', '0.3 mm'], ['Feel', 'None, it is in the surface'], ['Durability', 'Permanent, fade-resistant'], ['Sweet spot', '1 to 1,000 pcs'], ['Setup cost', 'None']],
    stages: [
      { n: 'RIP & print paper', t: 'setup', m: 10, per: 'job' },
      { n: 'Print & tape paper to mug', t: 'print', m: 1.5, per: 'piece' },
      { n: 'Mug press 180–205 °C', t: 'dry', m: 3.5, per: 'piece', par: 2, note: '150–300 s, two-station press' },
      { n: 'Dunk & cool', t: 'cool', m: 1, per: 'piece' },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' }
    ],
    placement: 'Mug: 20 × 8 cm wrap, keep 1 cm from the handle. Polyester tee: anywhere, including all-over. Coaster and badge: full bleed with 3 mm trim.',
    note: 'The substrate must be polyester or carry a polymer coating. "Sublimation blank" on the SKU is not optional.'
  },
  {
    id: 'htv', ico: '✂️', name: 'Heat transfer vinyl', tag: 'A plotter cuts the logo from coloured vinyl; heat bonds it to the fabric.',
    product: 'Tees, bags, hi-vis vests, sportswear names and numbers, small-run uniforms',
    how: [
      ['Cut', 'The mirrored vector is cut into a sheet of vinyl by a plotter blade. 1–3 min per logo.'],
      ['Weed', 'All vinyl that is not the logo is picked away by hand. The slowest step; small letters are painful.'],
      ['Press', '150–160 °C for 10–15 s, medium pressure.'],
      ['Peel', 'The carrier sheet comes off hot or cold depending on the vinyl.'],
      ['Post-press', 'A second 5 s press through parchment flattens and seals.']
    ],
    best: ['One or two solid colours', 'Names and numbers', 'Metallic, glitter, reflective finishes', 'Runs of 1 to 50'],
    avoid: ['Fine detail and small text', 'Multi-colour artwork (layers stack)', 'Large runs (weeding cost)', 'Photos and gradients'],
    facts: [['Colours', '1–3 solid layers'], ['Minimum detail', '2 mm'], ['Feel', 'Smooth, slightly rubbery'], ['Durability', '40+ washes'], ['Sweet spot', '1 to 50 pcs'], ['Setup cost', 'None']],
    stages: [
      { n: 'Prepare cut file', t: 'setup', m: 10, per: 'job' },
      { n: 'Plotter cut', t: 'print', m: 2, per: 'piece', par: 6 },
      { n: 'Weed by hand', t: 'print', m: 3, per: 'piece' },
      { n: 'Press 150–160 °C, peel, post-press', t: 'print', m: 0.5, per: 'piece' },
      { n: 'Cool', t: 'cool', m: 0.3, per: 'piece' },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' }
    ],
    placement: 'Same zones as screen print. Ideal for back names (team kits) and sleeve flags.',
    note: 'Weeding time grows with every letter. Quote small text as extra labour.'
  },
  {
    id: 'laser', ico: '🔦', name: 'Laser engraving', tag: 'A focused beam removes or marks the surface. No ink, no cure, no wear.',
    product: 'Steel and aluminium bottles, tumblers, pens, keychains, wooden boxes, leather and PU notebooks, glass, anodised metal, acrylic',
    how: [
      ['Choose the laser', 'Fibre lasers mark bare stainless and aluminium. CO2 lasers engrave wood, leather, glass, acrylic and anodised or powder-coated surfaces.'],
      ['Fixture', 'Flat items go in a jig; cylinders go on a rotary attachment that turns the bottle as the beam moves.'],
      ['Test', 'Power, speed and focus are tuned on a sacrificial piece. Coated bottles reveal the metal underneath; bare steel is marked dark.'],
      ['Engrave', 'The beam follows the vector outline and fills. 1–5 min per bottle depending on area.'],
      ['Clean', 'Residue wiped off. The mark is part of the material now.']
    ],
    best: ['Metal drinkware, pens, tools', 'Wood, bamboo, cork, leather', 'Premium one-colour look', 'Any quantity, personalisation', 'Dishwasher-proof branding'],
    avoid: ['Colour (it is tonal only)', 'Plain plastics that melt or discolour', 'Soft fabrics', 'Deep engraving on thin-wall bottles'],
    facts: [['Colours', 'None: tone of the material'], ['Minimum detail', '0.1 mm'], ['Feel', 'Flush or slightly recessed'], ['Durability', 'Permanent'], ['Sweet spot', '1 to 1,000 pcs'], ['Setup cost', 'Minimal']],
    stages: [
      { n: 'File, power & fixture setup', t: 'setup', m: 15, per: 'job' },
      { n: 'Test piece & approval', t: 'qc', m: 10, per: 'job' },
      { n: 'Load on rotary & engrave', t: 'print', m: 2.5, per: 'piece' },
      { n: 'Wipe & inspect', t: 'qc', m: 0.5, per: 'piece' },
      { n: 'Pack', t: 'qc', m: 0.25, per: 'piece' }
    ],
    placement: 'Bottle: 5–7 cm wide, 4–6 cm high, centred 6–8 cm below the lid, opposite the seam. Pen: 40 × 6 mm on the barrel, away from the clip. Keychain: 2 × 2 cm.',
    note: 'Powder-coated bottles engrave to the silver metal beneath; that contrast is the whole look, so confirm the coating on the sample.'
  },
  {
    id: 'uv', ico: '💡', name: 'UV printing', tag: 'Inkjet onto rigid items, cured instantly by ultraviolet light. Full colour on almost anything flat.',
    product: 'Notebook covers, phone stands, power banks, acrylic, wood, metal plates, cardboard boxes, pens (rotary), bottles (rotary)',
    how: [
      ['Prepare', 'Items placed in a jig on a flatbed so dozens print in one pass. Some plastics, metal and glass get an adhesion promoter wiped on and flashed off (5–10 min).'],
      ['Print', 'The head lays white (for dark items), CMYK and optional clear varnish in one pass.'],
      ['Cure', 'A UV lamp follows the head; the ink hardens the instant it is lit. No drying stage.'],
      ['Rest', 'Handling is immediate, but full chemical adhesion takes about 24 h. Do not scratch-test on the day.']
    ],
    best: ['Full colour on rigid products', 'Textured or raised prints (layered varnish)', 'Short runs of many SKUs', 'Dark items via white underbase'],
    avoid: ['Soft fabrics', 'Flexible items that bend (ink can crack)', 'Untreated polypropylene and silicone', 'Dishwasher-exposed drinkware']
    , facts: [['Colours', 'Unlimited + white + varnish'], ['Minimum detail', '0.2 mm'], ['Feel', 'Slightly raised, glossy or matte'], ['Durability', 'Good; weak against abrasion'], ['Sweet spot', '1 to 1,000 pcs'], ['Setup cost', 'Jig only']],
    stages: [
      { n: 'RIP, jig layout', t: 'setup', m: 20, per: 'job' },
      { n: 'Adhesion promoter & flash-off', t: 'dry', m: 5, per: 'piece', par: 10 },
      { n: 'Print white + CMYK, UV cure inline', t: 'print', m: 1.5, per: 'piece', par: 4 },
      { n: 'QC & pack', t: 'qc', m: 0.25, per: 'piece' },
      { n: 'Full adhesion after 24 h', t: 'wait', m: 1440, per: 'job' }
    ],
    placement: 'Notebook: centre or bottom-right, 6 × 6 cm. Power bank: top face, 60 × 20 mm. Phone stand: base plate. Keep 3 mm from edges and away from curves or buttons.',
    note: 'Ask for the adhesion test on the sample. Different plastics behave differently and the promoter step is the difference between pass and fail.'
  },
  {
    id: 'pad', ico: '🖋️', name: 'Pad printing', tag: 'A silicone pad lifts ink from an etched plate and wraps it onto curved, small or odd surfaces.',
    product: 'Pens, USB drives, keychains, stress balls, golf balls, bottle caps, lighters, silicone bands, small plastic promos',
    how: [
      ['Cliché plate', 'The logo is etched into a steel or polymer plate, one per colour. 20–40 min to make.'],
      ['Ink', 'Solvent ink matched to Pantone, mixed with the right hardener for the plastic.'],
      ['Pick up', 'A doctor blade wipes the plate, leaving ink only in the etch. The silicone pad presses on and lifts the image.'],
      ['Transfer', 'The pad presses onto the product, conforming to the curve, and releases the ink. 1–3 s per impression.'],
      ['Dry', 'Air-dry to the touch in 5–15 min on racks. Full cure 24–72 h at room temperature, or oven assisted (for example 93 °C for 4–7 min on silicone).'],
      ['Multi-colour', 'Each colour is a separate plate and pass, registered on a jig.']
    ],
    best: ['Pens and small items', 'Curved and concave surfaces', '1 to 3 spot colours', 'Runs of 100 to 100,000', 'Lowest cost on small plastics'],
    avoid: ['Large areas over 10 × 10 cm', 'Gradients and photos', 'Very textured surfaces', 'Fabric'],
    facts: [['Colours', '1–4 spot'], ['Minimum detail', '0.2 mm line, 4 pt text'], ['Feel', 'Flat, thin ink'], ['Durability', 'Good; abrasion on pens over time'], ['Sweet spot', '100 to 50,000 pcs'], ['Setup cost', 'Plate per colour']],
    stages: [
      { n: 'Etch cliché plate', t: 'setup', m: 30, per: 'job', note: 'Per colour' },
      { n: 'Mix ink, set up pad & jig', t: 'setup', m: 30, per: 'job' },
      { n: 'Test & approval', t: 'qc', m: 10, per: 'job' },
      { n: 'Print (1–3 s per impression)', t: 'print', m: 0.05, per: 'piece' },
      { n: 'Air-dry on rack', t: 'dry', m: 10, per: 'piece', par: 50 },
      { n: 'QC & pack', t: 'qc', m: 0.1, per: 'piece' },
      { n: 'Full cure 24–72 h before heavy handling', t: 'wait', m: 2160, per: 'job' }
    ],
    placement: 'Pen barrel: 40–60 × 6–7 mm beside the clip. Pen clip: 25 × 4 mm. USB: 25 × 10 mm. Keychain: 20 × 20 mm. Golf ball: 22 mm circle.',
    note: 'Two-component inks on plastic look dry in minutes but scratch for a day. Rack them, do not box them.'
  },
  {
    id: 'deboss', ico: '📒', name: 'Debossing & embossing', tag: 'A heated die presses the logo into leather, PU, paper or wood. Elegant, tonal, permanent.',
    product: 'Leather and PU notebooks, diaries, card holders, passport covers, paper boxes, wooden lids, cork',
    how: [
      ['Make the die', 'A brass or magnesium die is machined from the vector. Lead time 2–3 days, reused for repeat orders.'],
      ['Heat', 'The die is mounted and brought to 100–130 °C depending on the material.'],
      ['Press', 'Die meets product for 2–5 s under firm pressure. Deboss sinks the logo in; emboss (with a counter die) raises it.'],
      ['Done', 'No ink, nothing to dry. Blind deboss is tonal; add a foil ribbon for colour.']
    ],
    best: ['Leather, PU, kraft, wood, cork', 'Premium corporate gifts', 'Simple bold logos', 'Any run size once the die exists'],
    avoid: ['Fine detail under 1 mm', 'Large solid areas (uneven pressure)', 'Thin or hollow products', 'Coloured output (use foil)'],
    facts: [['Colours', 'None (tonal)'], ['Minimum detail', '1 mm'], ['Feel', 'Recessed or raised'], ['Durability', 'Permanent'], ['Sweet spot', '50 to 5,000 pcs'], ['Setup cost', 'Die, one time']],
    stages: [
      { n: 'Die lead time 2–3 days (external)', t: 'wait', m: 3600, per: 'job' },
      { n: 'Mount die, heat, align', t: 'setup', m: 30, per: 'job' },
      { n: 'Test & approval', t: 'qc', m: 10, per: 'job' },
      { n: 'Press 2–5 s', t: 'print', m: 0.2, per: 'piece' },
      { n: 'QC & pack', t: 'qc', m: 0.2, per: 'piece' }
    ],
    placement: 'Notebook: centred, 5–7 cm wide, or bottom-right corner 3–4 cm. Card holder: front face centred. Keep 8 mm from edges and stitching.',
    note: 'Dies are an asset. Store them labelled by client; the second order has zero setup.'
  },
  {
    id: 'foil', ico: '✨', name: 'Foil stamping', tag: 'Same heated die, plus a metallic or pigment foil ribbon. Gold, silver, copper and more.',
    product: 'Leather and PU notebooks, paper boxes, gift bags, cards, pens (rotary foil), wooden boxes',
    how: [
      ['Die', 'Same brass die as debossing.'],
      ['Foil', 'A roll of foil (metallic, pigment or holographic) runs between the die and the product.'],
      ['Stamp', 'Die at 100–120 °C presses for 1–3 s; the heat releases the foil from its carrier only where the die touches.'],
      ['Advance', 'The ribbon moves on; the stamped area is finished instantly.']
    ],
    best: ['Metallic logos on dark covers', 'Luxury packaging and stationery', 'Simple, bold artwork', 'Pairs with a deboss for depth'],
    avoid: ['Fine detail and small text', 'Textured surfaces (foil skips)', 'Flexible silicone', 'Large fills'],
    facts: [['Colours', 'One foil per pass'], ['Minimum detail', '0.8 mm'], ['Feel', 'Flat or slightly recessed'], ['Durability', 'Good; wears on high-touch edges'], ['Sweet spot', '50 to 5,000 pcs'], ['Setup cost', 'Die + foil']],
    stages: [
      { n: 'Die lead time 2–3 days (external)', t: 'wait', m: 3600, per: 'job' },
      { n: 'Mount die, load foil, align', t: 'setup', m: 30, per: 'job' },
      { n: 'Test & approval', t: 'qc', m: 10, per: 'job' },
      { n: 'Stamp 1–3 s', t: 'print', m: 0.2, per: 'piece' },
      { n: 'QC & pack', t: 'qc', m: 0.2, per: 'piece' }
    ],
    placement: 'As debossing. Foil on the spine of a diary: 10 × 1.5 cm.',
    note: 'Foil colour on a sample looks different under warm office light. Approve under daylight.'
  }
];

/* ------------------------------------------------------------------ */
/* Surfaces matrix                                                     */
/* ------------------------------------------------------------------ */
const surfaces = [
  { id: 'cotton', n: 'Cotton & cotton blends', ico: '👕', why: 'Absorbs water-based ink, takes plastisol well, embroiders cleanly. Cannot sublimate.', fit: { screen: 'y', embroidery: 'y', dtf: 'y', dtg: 'y', sublimation: 'n', htv: 'y', laser: 'n', uv: 'n', pad: 'n', deboss: 'n', foil: 'm' } },
  { id: 'poly', n: 'Polyester & sportswear', ico: '🏃', why: 'Dye-migration risk above 150 °C; use low-bleed ink. The home of sublimation when white.', fit: { screen: 'm', embroidery: 'y', dtf: 'y', dtg: 'n', sublimation: 'y', htv: 'y', laser: 'n', uv: 'n', pad: 'n', deboss: 'n', foil: 'n' } },
  { id: 'nylon', n: 'Nylon, canvas, bags', ico: '🎒', why: 'Slippery nylon needs catalysed ink or DTF. Canvas totes love screen print.', fit: { screen: 'm', embroidery: 'y', dtf: 'y', dtg: 'n', sublimation: 'n', htv: 'y', laser: 'n', uv: 'n', pad: 'n', deboss: 'n', foil: 'n' } },
  { id: 'caps', n: 'Caps & headwear', ico: '🧢', why: 'Curved, seamed, structured. Embroidery rules; DTF and HTV on flat panels.', fit: { screen: 'm', embroidery: 'y', dtf: 'y', dtg: 'n', sublimation: 'm', htv: 'y', laser: 'n', uv: 'n', pad: 'n', deboss: 'n', foil: 'n' } },
  { id: 'steel', n: 'Stainless steel & aluminium', ico: '🍶', why: 'Bottles and tumblers. Laser for permanence, UV or pad for colour, sublimation only if coated.', fit: { screen: 'm', embroidery: 'n', dtf: 'n', dtg: 'n', sublimation: 'm', htv: 'n', laser: 'y', uv: 'y', pad: 'y', deboss: 'n', foil: 'n' } },
  { id: 'ceramic', n: 'Ceramic & glass', ico: '☕', why: 'Mugs and glasses. Sublimation on coated ceramic; pad or screen with ceramic ink; laser etches glass.', fit: { screen: 'm', embroidery: 'n', dtf: 'n', dtg: 'n', sublimation: 'y', htv: 'n', laser: 'm', uv: 'y', pad: 'y', deboss: 'n', foil: 'n' } },
  { id: 'plastic', n: 'Hard plastics (ABS, PC, PP)', ico: '🔌', why: 'Power banks, pens, USBs. Pad print is the default; UV for colour; PP needs flame or primer.', fit: { screen: 'm', embroidery: 'n', dtf: 'n', dtg: 'n', sublimation: 'n', htv: 'n', laser: 'm', uv: 'y', pad: 'y', deboss: 'n', foil: 'm' } },
  { id: 'leather', n: 'Leather, PU, vegan leather', ico: '📒', why: 'Notebooks and wallets. Deboss or foil for class; laser on real leather; UV on PU.', fit: { screen: 'n', embroidery: 'm', dtf: 'n', dtg: 'n', sublimation: 'n', htv: 'n', laser: 'y', uv: 'y', pad: 'm', deboss: 'y', foil: 'y' } },
  { id: 'wood', n: 'Wood, bamboo, cork', ico: '🪵', why: 'Laser is the natural fit. UV for colour. Deboss on cork and soft woods.', fit: { screen: 'm', embroidery: 'n', dtf: 'n', dtg: 'n', sublimation: 'n', htv: 'n', laser: 'y', uv: 'y', pad: 'm', deboss: 'y', foil: 'm' } },
  { id: 'paper', n: 'Paper, card, packaging', ico: '📦', why: 'Boxes, tags, sleeves. Foil and deboss for premium; UV or offset for colour.', fit: { screen: 'y', embroidery: 'n', dtf: 'n', dtg: 'n', sublimation: 'n', htv: 'n', laser: 'm', uv: 'y', pad: 'm', deboss: 'y', foil: 'y' } }
];

/* ------------------------------------------------------------------ */
/* Placement zones                                                     */
/* ------------------------------------------------------------------ */
const products = [
  { id: 'tee', n: 'T-shirt', p: '#F3EDE8', zones: [
    { n: 'Left chest', x: 170, y: 120, w: 36, h: 36, size: '7.5–10 cm', rule: '7–10 cm below the shoulder seam, centred on the pocket line. The default for corporate logos.' },
    { n: 'Centre chest', x: 118, y: 120, w: 84, h: 70, size: 'up to 28 × 30 cm', rule: '7–10 cm below the collar. For statements, events and big marks.' },
    { n: 'Full back', x: 112, y: 100, w: 96, h: 100, size: 'up to 30 × 35 cm', rule: 'Centred, 10 cm below the collar. Sponsors, team names, event art.' },
    { n: 'Sleeve', x: 240, y: 92, w: 34, h: 24, size: '6–8 cm wide', rule: '2–3 cm below the shoulder seam on the outer sleeve. Small marks and flags.' },
    { n: 'Nape', x: 146, y: 60, w: 28, h: 14, size: '5 × 2 cm', rule: 'Below the collar on the back. Replaces the label on premium tees.' }
  ]},
  { id: 'polo', n: 'Polo', p: '#DDEAFE', zones: [
    { n: 'Left chest', x: 170, y: 120, w: 36, h: 36, size: '6–10 cm', rule: '7.5 cm below the shoulder seam, in line with the placket edge. The polo standard.' },
    { n: 'Right chest', x: 114, y: 120, w: 36, h: 36, size: '6–10 cm', rule: 'Mirrors the left chest. Use for a second logo (partner or event).' },
    { n: 'Sleeve', x: 240, y: 92, w: 34, h: 24, size: '5–7 cm', rule: '2–3 cm below the shoulder seam. Embroidery works best here.' },
    { n: 'Back yoke', x: 136, y: 72, w: 48, h: 18, size: '12 × 4 cm', rule: 'Between the shoulder blades, below the collar. Website or tagline.' }
  ]},
  { id: 'hoodie', n: 'Hoodie', p: '#F3EDE8', zones: [
    { n: 'Left chest', x: 172, y: 122, w: 34, h: 34, size: '7.5–10 cm', rule: 'Above the pocket, 7–10 cm below the shoulder seam. Mind the drawstrings.' },
    { n: 'Centre chest', x: 120, y: 118, w: 80, h: 60, size: 'up to 25 × 20 cm', rule: 'Between the drawstrings and the pocket top. Height is limited by the pocket.' },
    { n: 'Hood', x: 130, y: 36, w: 60, h: 22, size: '10 × 4 cm', rule: 'Across the hood seam. Only for flat or simple marks.' },
    { n: 'Pocket', x: 150, y: 228, w: 30, h: 22, size: '6 × 4 cm', rule: 'On the kangaroo pocket. Avoid the pocket opening seam.' }
  ]},
  { id: 'cap', n: 'Cap', p: '#F3EDE8', zones: [
    { n: 'Front panel', x: 128, y: 110, w: 64, h: 44, size: '5–6 × max 5.5 cm', rule: 'Centred across the front two panels (6-panel) or the single panel (5-panel). Height is capped by the hoop frame.' },
    { n: 'Side panel', x: 72, y: 120, w: 30, h: 26, size: '4 × 3 cm', rule: 'Left or right side, above the ear. Small secondary mark.' },
    { n: 'Visor', x: 130, y: 196, w: 60, h: 14, size: '8 × 2 cm', rule: 'On the top of the peak. Sublimation or print only, not embroidery on structured peaks.' },
    { n: 'Back arc', x: 134, y: 76, w: 52, h: 16, size: '6 × 2 cm', rule: 'Above the closure on the back. Website or tagline.' }
  ]},
  { id: 'tote', n: 'Tote bag', p: '#F5E6C8', zones: [
    { n: 'Centre panel', x: 110, y: 140, w: 100, h: 100, size: '20 × 20 cm', rule: 'Centred, with the logo centre 1/3 down from the top edge so it sits above the fold when carried.' },
    { n: 'Bottom corner', x: 196, y: 236, w: 44, h: 30, size: '8 × 5 cm', rule: 'Bottom-right, 3 cm from the edges. Quiet branding.' },
    { n: 'Handle', x: 122, y: 44, w: 76, h: 12, size: '15 × 1.5 cm', rule: 'Along the handle strap. Print before stitching or use a label.' }
  ]},
  { id: 'bottle', n: 'Bottle', p: '#9CA3AF', zones: [
    { n: 'Front, upper', x: 128, y: 100, w: 64, h: 60, size: '5–7 × 4–6 cm', rule: '6–8 cm below the lid, opposite the seam. Standard for laser and pad print.' },
    { n: 'Wrap', x: 112, y: 170, w: 96, h: 60, size: 'up to 1/3 circumference', rule: 'Around the body. Full wraps only with rotary UV, rotary laser or sublimation.' },
    { n: 'Lid top', x: 140, y: 14, w: 40, h: 36, size: '25 mm circle', rule: 'On the cap. Laser or pad print. Mind the grip ridges.' },
    { n: 'Base rim', x: 118, y: 268, w: 84, h: 26, size: '6 × 1 cm', rule: 'Above the base. Good for a second, quieter mark.' }
  ]},
  { id: 'mug', n: 'Mug', p: '#fff', zones: [
    { n: 'Right of handle', x: 150, y: 120, w: 70, h: 80, size: '8 × 8 cm', rule: 'Visible when a right-handed person drinks. Keep 1 cm from the handle join.' },
    { n: 'Left of handle', x: 74, y: 120, w: 70, h: 80, size: '8 × 8 cm', rule: 'Visible to onlookers when a right-hander drinks. Often the client logo goes here.' },
    { n: 'Wrap', x: 70, y: 100, w: 160, h: 130, size: '20 × 8 cm', rule: 'Sublimation or screen wrap, stopping 1 cm either side of the handle.' },
    { n: 'Inside rim', x: 90, y: 60, w: 120, h: 22, size: '2 cm band', rule: 'Sublimation only. Reveals as the drink goes down.' }
  ]},
  { id: 'notebook', n: 'Notebook', p: '#5B3A29', zones: [
    { n: 'Centre', x: 128, y: 120, w: 70, h: 70, size: '5–7 cm', rule: 'Optically centred on the front cover (slightly above true centre).' },
    { n: 'Bottom right', x: 184, y: 236, w: 48, h: 36, size: '3–4 cm', rule: '12 mm from the bottom and right edges. Discreet corporate style.' },
    { n: 'Spine', x: 62, y: 40, w: 20, h: 240, size: '10 × 1.5 cm', rule: 'Foil or print along the spine. Read bottom to top.' },
    { n: 'Band / strap', x: 212, y: 40, w: 22, h: 240, size: '20 × 1.5 cm', rule: 'On the elastic closure. Woven or printed label.' }
  ]},
  { id: 'pen', n: 'Pen', p: '#1F2937', zones: [
    { n: 'Barrel', x: 120, y: 150, w: 110, h: 26, size: '40–60 × 6–7 mm', rule: 'On the barrel, beside the clip, reading from the tip. The default.' },
    { n: 'Clip', x: 70, y: 96, w: 40, h: 18, size: '25 × 4 mm', rule: 'Tiny; laser or pad print one-colour text only.' },
    { n: 'Cap / top', x: 44, y: 86, w: 30, h: 26, size: '10 × 6 mm', rule: 'On the push button or cap. Laser on metal pens.' }
  ]},
  { id: 'backpack', n: 'Backpack', p: '#374151', zones: [
    { n: 'Front pocket', x: 120, y: 190, w: 80, h: 50, size: '8 × 5 cm', rule: 'Centred on the front pocket face. Embroidery or DTF.' },
    { n: 'Top panel', x: 110, y: 90, w: 100, h: 60, size: '12 × 6 cm', rule: 'Above the pocket on the main body. Avoid the zip line.' },
    { n: 'Side', x: 72, y: 140, w: 30, h: 70, size: '3 × 8 cm', rule: 'Vertical on the side gusset. Small marks only.' }
  ]}
];

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */
const quiz = [
  { q: 'A client sends a JPG logo from their website for a 500-piece screen print. What do you do?', a: ['Print it, it looks fine on screen', 'Ask for a vector (AI, EPS, PDF, SVG) and Pantone references', 'Trace it yourself in Photoshop'], c: 1, why: 'Screens, plates and stitch files need clean vector outlines. A web JPG cannot scale and the colours are unverified.' },
  { q: 'Plastisol ink on a tee is cured when the ink film reaches about…', a: ['100 °C', '160 °C', '220 °C'], c: 1, why: 'Standard plastisols cure around 160 °C (320 °F) through the full ink film. Flash units gel at 104–110 °C; that is not a cure.' },
  { q: 'Which method has no drying or curing stage at all?', a: ['DTF', 'Embroidery', 'Pad printing'], c: 1, why: 'Thread is thread. Embroidery is ready the moment it leaves the hoop.' },
  { q: 'Full-colour logo, 40 pieces, dark polyester hi-vis vests, needed in 2 days. Best method?', a: ['Screen print with underbase', 'DTG', 'DTF transfer'], c: 2, why: 'DTF has no screen setup, prints full colour with its own white layer, and bonds to polyester. DTG fails on polyester; screen print needs screens for every colour.' },
  { q: 'Sublimation will work on…', a: ['A black cotton tee', 'A white polyester tee', 'An uncoated steel bottle'], c: 1, why: 'The dye is transparent and bonds only into polymer. White or light polyester, or a polymer-coated blank.' },
  { q: 'A 6,000-stitch left-chest logo on a single-head machine at 900 stitches per minute takes roughly…', a: ['1 minute', '7 minutes', '25 minutes'], c: 1, why: '6,000 ÷ 900 ≈ 6.7 min, plus hooping and trimming. Six-head machines sew six at once.' },
  { q: 'Pad-printed pens feel dry after 10 minutes. When can they be boxed in bulk?', a: ['Immediately', 'After full cure, typically 24–72 h', 'After 1 hour'], c: 1, why: 'Solvent and two-component inks dry to the touch fast but keep curing for a day or more. Rack them, do not box them.' },
  { q: 'The client guideline says clear space is 1x (the mark height). The logo is 20 mm tall on a pen barrel. The pen clip is 12 mm away. Is that compliant?', a: ['Yes', 'No', 'Only if the clip is black'], c: 1, why: 'Clear space must be at least 20 mm on every side. The clip at 12 mm intrudes; move or shrink the logo and get sign-off.' },
  { q: 'What makes a powder-coated steel bottle show a silver logo after laser engraving?', a: ['The laser adds silver ink', 'The laser removes the coating to reveal the metal', 'It is painted after'], c: 1, why: 'The beam ablates the coating where it hits, exposing the stainless beneath. No consumable, permanent.' },
  { q: 'Which stage is most often skipped and causes rejected batches?', a: ['QC after cure', 'Resting prints 24 h before washing or hard packing', 'Taping sublimation paper'], c: 1, why: 'Water-based screen, DTG, DTF, UV and pad inks all continue curing after the machine. Build the rest into the delivery date.' }
];

const glossary = [
  ['Clear space', 'The protected area around a logo, measured in units of the logo height (x). Nothing may enter it.'],
  ['Cliché', 'The etched plate that carries the image in pad printing. One per colour.'],
  ['Digitising', 'Converting vector artwork into an embroidery stitch file (DST, PES). Defines stitch type, density and sequence.'],
  ['Dwell time', 'How long an item is under heat or on the dryer belt. Cure depends on temperature and dwell together.'],
  ['Flash', 'A short heat burst that gels plastisol ink between colours. Not a full cure.'],
  ['Gang sheet', 'Many logos arranged on one DTF film sheet to use the full width.'],
  ['Halftone', 'Dots of varying size that simulate shading with a single ink colour.'],
  ['Hoop', 'The frame that holds fabric taut for embroidery.'],
  ['Imprint area', 'The maximum printable zone on a product, given by the supplier in mm.'],
  ['Pantone (PMS)', 'The spot-colour reference system used to match ink and thread.'],
  ['Plastisol', 'PVC-based screen ink that sits on the fabric and cures at ~160 °C. Bright, opaque, slightly raised.'],
  ['Pre-treatment', 'A liquid sprayed on dark cotton before DTG so white ink stays on top.'],
  ['Registration', 'Aligning multiple colours so they print exactly on top of each other.'],
  ['Rotary', 'An attachment that turns a cylindrical item under a laser or UV head.'],
  ['Stitch count', 'Number of stitches in an embroidery design. The main driver of embroidery price and time.'],
  ['Underbase', 'A white layer printed first on dark garments so colours on top stay bright.'],
  ['Vector', 'Artwork defined by mathematical paths (AI, EPS, SVG, PDF). Scales without loss. The only acceptable input for most methods.'],
  ['Water-based ink', 'Screen ink that soaks into fibres for a soft hand. Needs forced-air curing and a 24 h rest.']
];

/* ------------------------------------------------------------------ */
/* Render helpers                                                      */
/* ------------------------------------------------------------------ */
const fmt = m => m >= 1440 ? `${(m / 1440).toFixed(m % 1440 ? 1 : 0)} d` : m >= 60 ? `${(m / 60).toFixed(m % 60 ? 1 : 0)} h` : m >= 1 ? `${Math.round(m)} min` : `${Math.round(m * 60)} s`;
const typeName = { setup: 'Setup', print: 'Decorate', dry: 'Dry / cure', cool: 'Cool', qc: 'QC', wait: 'Rest' };

function jobMinutes(method, qty) {
  // returns [{stage, mins}] excluding wait
  return method.stages.filter(s => s.t !== 'wait').map(s => {
    const mins = s.per === 'job' ? s.m : (s.m * qty) / (s.par || 1);
    return { ...s, mins };
  });
}

/* Hero scene */
$('#heroStage').innerHTML = fixMark(scenes.screen.svg).replace(/scrClip/g, 'heroClip').replace(/id="mesh"/, 'id="heromesh"').replace(/url\(#mesh\)/, 'url(#heromesh)');

/* Confetti */
(() => {
  const c = $('#confetti'); const cols = ['#E01E23', '#FFC940', '#2BD4A4', '#3B82F6', '#8B5CF6'];
  for (let i = 0; i < 26; i++) { const s = document.createElement('i'); s.style.left = Math.random() * 100 + '%'; s.style.background = cols[i % cols.length]; s.style.animationDuration = 6 + Math.random() * 8 + 's'; s.style.animationDelay = -Math.random() * 12 + 's'; s.style.transform = `rotate(${Math.random() * 360}deg)`; c.appendChild(s); }
})();

/* Clear space demo */
(() => {
  const svg = $('#csSvg'), r = $('#csRange'), v = $('#csVal');
  const draw = () => {
    const x = +r.value; v.textContent = x.toFixed(1);
    const size = 90, cx = 200, cy = 150, pad = x * size;
    svg.innerHTML = fixMark(`
      <rect x="0" y="0" width="400" height="300" fill="#fff"/>
      <rect x="${cx - size / 2 - pad}" y="${cy - size / 2 - pad}" width="${size + pad * 2}" height="${size + pad * 2}" fill="rgba(255,201,64,.18)" stroke="#E01E23" stroke-dasharray="6 5" stroke-width="2"/>
      <svg x="${cx - size / 2}" y="${cy - size / 2}" width="${size}" height="${size}" style="color:#E01E23">${MARK}</svg>
      <text x="${cx}" y="${cy - size / 2 - pad - 8}" text-anchor="middle" font-family="Fredoka" font-size="13" fill="#E01E23">${x.toFixed(1)}x clear space</text>
      <text x="${cx + size / 2 + 6}" y="${cy + 4}" font-family="Fredoka" font-size="12" fill="#6B6B6B">x = ${size}px</text>
      <g opacity="${x < 0.6 ? 1 : 0}"><text x="40" y="270" font-family="Fredoka" font-size="14" fill="#E01E23">⚠ Too tight: a seam here would collide</text></g>
      <g opacity="${x >= 0.6 ? 1 : 0}"><text x="40" y="270" font-family="Fredoka" font-size="14" fill="#1a9d74">✓ Protected</text></g>`);
  };
  r.addEventListener('input', draw); draw();
  $('#colorSwatches').innerHTML = [
    ['#E01E23', 'CompanyStore Red<br>HEX E01E23 · RGB 224 30 35'],
    ['#121212', 'Ink Black<br>HEX 121212 · RGB 18 18 18'],
    ['#FFFFFF', 'White<br>Reverse on dark products']
  ].map(([c, t]) => `<div class="swatch"><i style="background:${c};${c === '#FFFFFF' ? 'border-bottom:1px solid #EEE' : ''}"></i><div>${t}</div></div>`).join('');
})();

/* Matrix */
(() => {
  const head = `<tr><th>Surface</th>${methods.map(m => `<th title="${m.name}">${m.ico}<br><span style="font-size:.7rem">${m.name.split(' ')[0]}</span></th>`).join('')}</tr>`;
  const rows = surfaces.map(s => `<tr><td>${s.ico} ${s.n}</td>${methods.map(m => { const f = s.fit[m.id]; return `<td><i class="dot ${f}">${f === 'y' ? '✓' : f === 'm' ? '~' : '×'}</i></td>`; }).join('')}</tr>`).join('');
  $('#matrix').innerHTML = `<table>${head}${rows}</table>`;
  $('#surfaceCards').innerHTML = surfaces.map(s => `<div class="card reveal"><h3>${s.ico} ${s.n}</h3><p style="font-size:.92rem;color:var(--ink-2)">${s.why}</p><div class="pill-list">${methods.filter(m => s.fit[m.id] === 'y').map(m => `<span class="pill">${m.ico} ${m.name}</span>`).join('')}</div></div>`).join('');
})();

/* Methods */
(() => {
  $('#statMethods').textContent = methods.length;
  $('#tabs').innerHTML = methods.map((m, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-id="${m.id}"><span class="ico">${m.ico}</span>${m.name}</button>`).join('');
  $('#methodPanels').innerHTML = methods.map((m, i) => {
    const waits = m.stages.filter(s => s.t === 'wait');
    return `<div class="method ${i === 0 ? 'active' : ''}" id="m-${m.id}">
      <div class="method-top">
        <div>
          <div class="stage"><div class="scene" data-scene="${m.id}"></div><button class="btn small replay" data-replay="${m.id}">↻ Replay</button><div class="caption" data-cap="${m.id}"></div></div>
          <div class="note" style="margin-top:14px"><b>Field note.</b> ${m.note}</div>
        </div>
        <div>
          <h3>${m.ico} ${m.name}</h3>
          <p class="lead" style="font-size:1.05rem">${m.tag}</p>
          <p style="font-size:.92rem"><b>Products:</b> ${m.product}</p>
          <div class="facts">${m.facts.map(([k, v]) => `<div class="fact"><small>${k}</small><b>${v}</b></div>`).join('')}</div>
          <h4 style="margin:12px 0 6px">How it works</h4>
          <ol class="steps">${m.how.map(([t, d]) => `<li><b>${t}</b><span>${d}</span></li>`).join('')}</ol>
        </div>
      </div>
      <div class="two">
        <div class="card tint-mint"><h3>💚 Loves</h3><div class="pill-list">${m.best.map(b => `<span class="pill">${b}</span>`).join('')}</div></div>
        <div class="card tint-red"><h3>🙅 Hates</h3><div class="pill-list">${m.avoid.map(b => `<span class="pill no">${b}</span>`).join('')}</div></div>
      </div>
      <div class="card" style="margin-top:18px"><h3>📍 Placement for this method</h3><p style="margin:0">${m.placement}</p></div>
      <div class="timeline">
        <div class="timeline-head">
          <div><h3 style="margin:0">⏱ Run the clock</h3><span style="font-size:.85rem;color:var(--ink-3)">One job of <select data-qty="${m.id}" style="font:inherit;border:1px solid var(--line);border-radius:8px;padding:2px 6px"><option value="1">1 piece</option><option value="25">25 pieces</option><option value="100" selected>100 pieces</option><option value="500">500 pieces</option><option value="2000">2,000 pieces</option></select>, one position, one colour</span></div>
          <div style="display:flex;gap:10px;align-items:center"><div class="clock" data-clock="${m.id}">0 min</div><button class="btn small red" data-play="${m.id}">▶ Play</button></div>
        </div>
        <div class="bar" data-bar="${m.id}"></div>
        <div class="stage-list" data-list="${m.id}"></div>
        ${waits.length ? `<div class="note" style="margin-top:12px">⏳ <b>Off the clock but on the calendar:</b> ${waits.map(w => w.n).join(' · ')}</div>` : ''}
      </div>
    </div>`;
  }).join('');

  const capTimers = {};
  function playScene(id) {
    const box = $(`.scene[data-scene="${id}"]`); const cap = $(`[data-cap="${id}"]`); const sc = scenes[id];
    if (!box || !sc) return;
    box.innerHTML = ''; void box.offsetWidth; box.innerHTML = fixMark(sc.svg).replace(/id="(\w+)"/g, (a, b) => `id="${b}_${id}"`).replace(/url\(#(\w+)\)/g, (a, b) => `url(#${b}_${id})`);
    (capTimers[id] || []).forEach(clearTimeout); capTimers[id] = [];
    const loop = () => { sc.caps.forEach(([t, text]) => capTimers[id].push(setTimeout(() => cap.textContent = text, t * 1000))); capTimers[id].push(setTimeout(loop, sc.dur * 1000)); };
    loop();
  }

  function renderBar(id) {
    const m = methods.find(x => x.id === id); const qty = +$(`[data-qty="${id}"]`).value;
    const st = jobMinutes(m, qty); const total = st.reduce((a, s) => a + s.mins, 0);
    $(`[data-bar="${id}"]`).innerHTML = st.map((s, i) => `<div class="seg ${s.t}" data-i="${i}" style="width:${(s.mins / total) * 100}%" title="${s.n}: ${fmt(s.mins)}">${(s.mins / total) > 0.07 ? fmt(s.mins) : ''}</div>`).join('') + `<div class="marker" style="display:none"></div>`;
    $(`[data-list="${id}"]`).innerHTML = st.map((s, i) => `<div class="stage-item ${s.t}" data-i="${i}"><b>${s.n}</b>${typeName[s.t]} · ${fmt(s.mins)}${s.note ? ` · ${s.note}` : ''}${s.per === 'piece' ? ` · ${fmt(s.m)} per piece${s.par ? `, ${s.par} at a time` : ''}` : ''}</div>`).join('');
    $(`[data-clock="${id}"]`).textContent = `Total ${fmt(total)}`;
    return { st, total };
  }

  const runners = {};
  function play(id) {
    if (runners[id]) { cancelAnimationFrame(runners[id]); runners[id] = null; }
    const { st, total } = renderBar(id); const bar = $(`[data-bar="${id}"]`); const marker = $('.marker', bar); marker.style.display = 'block';
    const segs = $$('.seg', bar); const items = $$('.stage-item', $(`[data-list="${id}"]`)); const clock = $(`[data-clock="${id}"]`);
    const dur = 6000; const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur); const mins = p * total;
      marker.style.left = `calc(${p * 100}% - 1px)`; clock.textContent = fmt(mins);
      let acc = 0, cur = 0; for (let i = 0; i < st.length; i++) { acc += st[i].mins; if (mins <= acc) { cur = i; break; } cur = i; }
      segs.forEach((s, i) => s.classList.toggle('active', i === cur)); items.forEach((s, i) => s.style.background = i === cur ? '#FFF3CC' : '');
      if (p < 1) runners[id] = requestAnimationFrame(step); else { clock.textContent = `Total ${fmt(total)}`; segs.forEach(s => s.classList.remove('active')); items.forEach(s => s.style.background = ''); }
    };
    runners[id] = requestAnimationFrame(step);
  }

  $$('.tab').forEach(t => t.addEventListener('click', () => {
    $$('.tab').forEach(x => x.classList.remove('active')); t.classList.add('active');
    $$('.method').forEach(x => x.classList.remove('active')); $(`#m-${t.dataset.id}`).classList.add('active');
    playScene(t.dataset.id); renderBar(t.dataset.id);
  }));
  $$('[data-replay]').forEach(b => b.addEventListener('click', () => playScene(b.dataset.replay)));
  $$('[data-play]').forEach(b => b.addEventListener('click', () => play(b.dataset.play)));
  $$('[data-qty]').forEach(s => s.addEventListener('change', () => renderBar(s.dataset.qty)));
  playScene(methods[0].id); renderBar(methods[0].id);

  /* Compare chart, 100 pcs */
  const rows = methods.map(m => { const st = jobMinutes(m, 100); return { m, st, total: st.reduce((a, s) => a + s.mins, 0) }; }).sort((a, b) => a.total - b.total);
  const max = Math.max(...rows.map(r => r.total));
  $('#compare').innerHTML = rows.map(r => `<div class="compare-row"><b>${r.m.ico} ${r.m.name}</b><div class="mini" title="${r.st.map(s => `${s.n}: ${fmt(s.mins)}`).join('\n')}" style="width:${(r.total / max) * 100}%">${r.st.map(s => `<i class="${s.t}" style="width:${(s.mins / r.total) * 100}%"></i>`).join('')}</div><em>${fmt(r.total)}</em></div>`).join('') + `<p style="font-size:.82rem;color:var(--ink-3);margin:12px 0 0">Setup is counted once per job, so the ranking flips at other quantities: screen print and pad print win at 1,000+, DTF and DTG win under 50. Use the quantity selector inside each method to see it move. Times exclude the 24–72 h rests and die lead times.</p>`;
})();

/* Placement */
(() => {
  const picker = $('#productPicker'), spots = $('#spots'), svg = $('#placeSvg'), cap = $('#placeCaption');
  let cur = products[0];
  picker.innerHTML = products.map((p, i) => `<button class="tab ${i === 0 ? 'active' : ''}" data-p="${p.id}">${p.n}</button>`).join('');
  function draw(zoneIdx = null) {
    svg.innerHTML = `<use href="#${cur.id}" width="320" height="320" style="--p:${cur.p}"/>` +
      cur.zones.map((z, i) => `<g><rect class="zone ${i === zoneIdx ? 'active' : ''}" data-z="${i}" x="${z.x}" y="${z.y}" width="${z.w}" height="${z.h}" rx="4"/><text class="zone-label" x="${z.x + z.w / 2}" y="${z.y - 4}" text-anchor="middle">${z.n}</text></g>`).join('') +
      (zoneIdx !== null ? (() => { const z = cur.zones[zoneIdx]; const s = Math.min(z.w, z.h) * 0.8; const dark = ['#1F2937', '#374151', '#5B3A29', '#9CA3AF', '#121212'].includes(cur.p); return `<svg class="landed" x="${z.x + (z.w - s) / 2}" y="${z.y + (z.h - s) / 2}" width="${s}" height="${s}" style="color:${dark ? '#fff' : '#E01E23'}">${MARK}</svg>`; })() : '');
    svg.innerHTML = fixMark(svg.innerHTML);
    spots.innerHTML = cur.zones.map((z, i) => `<button class="spot ${i === zoneIdx ? 'active' : ''}" data-z="${i}"><b>${z.n} · ${z.size}</b><span>${z.rule}</span></button>`).join('');
    cap.textContent = zoneIdx === null ? 'Click a zone' : `${cur.zones[zoneIdx].n}: ${cur.zones[zoneIdx].size}`;
    $$('.zone', svg).forEach(r => r.addEventListener('click', () => draw(+r.dataset.z)));
    $$('.spot', spots).forEach(b => b.addEventListener('click', () => draw(+b.dataset.z)));
  }
  picker.addEventListener('click', e => { const b = e.target.closest('[data-p]'); if (!b) return; $$('.tab', picker).forEach(x => x.classList.remove('active')); b.classList.add('active'); cur = products.find(p => p.id === b.dataset.p); draw(); });
  draw();
})();

/* Helper */
(() => {
  const sSel = $('#hSurface'); sSel.innerHTML = surfaces.map(s => `<option value="${s.id}">${s.ico} ${s.n}</option>`).join('');
  const score = () => {
    const s = surfaces.find(x => x.id === sSel.value), qty = $('#hQty').value, col = $('#hColors').value, prio = $('#hPrio').value;
    const res = methods.map(m => {
      let sc = { y: 10, m: 4, n: -100 }[s.fit[m.id]]; const why = [];
      if (col === 'full') { if (['dtf', 'dtg', 'sublimation', 'uv'].includes(m.id)) { sc += 6; why.push('prints full colour'); } else if (['screen', 'pad', 'htv'].includes(m.id)) sc -= 8; else sc -= 5; }
      if (col === '1') { if (['laser', 'deboss', 'foil', 'pad', 'screen', 'htv', 'embroidery'].includes(m.id)) { sc += 2; why.push('ideal for one colour'); } }
      if (col === '2') { if (['screen', 'pad', 'embroidery'].includes(m.id)) { sc += 2; why.push('spot colours'); } if (['laser', 'deboss'].includes(m.id)) sc -= 6; }
      if (qty === 's') { if (['screen', 'pad', 'deboss', 'foil'].includes(m.id)) { sc -= 5; } if (['dtf', 'dtg', 'laser', 'uv', 'sublimation', 'htv', 'embroidery'].includes(m.id)) { sc += 3; why.push('no setup cost at low volume'); } }
      if (qty === 'l' || qty === 'xl') { if (['screen', 'pad', 'embroidery', 'deboss', 'foil', 'laser'].includes(m.id)) { sc += 3; why.push('setup amortised over the run'); } if (['dtg', 'htv'].includes(m.id)) sc -= 5; if (qty === 'xl' && m.id === 'dtf') sc -= 3; }
      if (prio === 'premium') { if (['embroidery', 'laser', 'deboss', 'foil'].includes(m.id)) { sc += 4; why.push('premium finish'); } }
      if (prio === 'cost') { if (['screen', 'pad'].includes(m.id) && qty !== 's') { sc += 3; why.push('lowest unit cost'); } if (['dtf', 'htv'].includes(m.id) && qty === 's') { sc += 2; why.push('cheapest at this size'); } }
      if (prio === 'speed') { if (['dtf', 'htv', 'laser', 'sublimation', 'uv'].includes(m.id)) { sc += 3; why.push('fast turnaround'); } if (['deboss', 'foil', 'screen'].includes(m.id)) sc -= 3; }
      if (prio === 'durable') { if (['embroidery', 'laser', 'sublimation', 'deboss'].includes(m.id)) { sc += 4; why.push('long-lasting'); } if (['dtg', 'uv'].includes(m.id)) sc -= 2; }
      return { m, sc, why };
    }).filter(r => r.sc > 0).sort((a, b) => b.sc - a.sc);
    const top = res[0];
    $('#hResult').innerHTML = top ? `<span class="badge sun">Recommended</span><h3>${top.m.ico} ${top.m.name}</h3><p>${top.m.tag}</p><p><b>Because:</b> ${s.n.toLowerCase()} ${s.fit[top.m.id] === 'y' ? 'is an ideal surface' : 'works with care'}${top.why.length ? ', and it ' + top.why.join(', ') : ''}.</p>${res[1] ? `<p class="alt"><b>Runner-up:</b> ${res[1].m.ico} ${res[1].m.name}${res[2] ? ` · <b>Also:</b> ${res[2].m.ico} ${res[2].m.name}` : ''}</p>` : ''}<a class="btn small" style="background:var(--red)" href="#methods" data-jump="${top.m.id}">See how it works →</a>` : `<h3>No clean fit</h3><p>This surface and colour combination needs a conversation with production. Try a different colour option or surface.</p>`;
    const j = $('[data-jump]', $('#hResult')); if (j) j.addEventListener('click', () => $(`.tab[data-id="${j.dataset.jump}"]`).click());
  };
  ['#hSurface', '#hQty', '#hColors', '#hPrio'].forEach(id => $(id).addEventListener('change', score)); score();
})();

/* Quiz */
(() => {
  const box = $('#quizBox'); let i = 0, right = 0;
  const render = () => {
    if (i >= quiz.length) { box.innerHTML = `<div style="text-align:center"><div class="score">${right} / ${quiz.length}</div><h3>${right === quiz.length ? 'Flawless. You are production-ready.' : right >= 7 ? 'Strong. Re-read the ones you missed.' : 'Good start. Go back through the methods and try again.'}</h3><button class="btn red" id="againBtn">Try again</button></div>`; $('#againBtn').addEventListener('click', () => { i = 0; right = 0; render(); }); return; }
    const q = quiz[i];
    box.innerHTML = `<div class="quiz-q active"><span class="badge">Question ${i + 1} of ${quiz.length}</span><h3 style="margin-top:10px">${q.q}</h3><div class="opts">${q.a.map((a, k) => `<button class="opt" data-k="${k}">${a}</button>`).join('')}</div><div class="feedback" id="fb"></div><button class="btn small" id="nextBtn" style="display:none">Next →</button></div>`;
    $$('.opt', box).forEach(b => b.addEventListener('click', () => {
      if ($('#nextBtn').style.display === 'inline-flex') return;
      const k = +b.dataset.k; $$('.opt', box).forEach((o, kk) => o.classList.add(kk === q.c ? 'right' : (kk === k ? 'wrong' : '')));
      if (k === q.c) right++;
      $('#fb').innerHTML = `${k === q.c ? '🎉 Correct.' : '🤔 Not quite.'} ${q.why}`; $('#nextBtn').style.display = 'inline-flex';
    }));
    $('#nextBtn').addEventListener('click', () => { i++; render(); });
  };
  render();
})();

/* Glossary */
$('#glossaryList').innerHTML = glossary.map(([t, d]) => `<details><summary>${t}</summary><p style="margin:8px 0 0;font-size:.95rem">${d}</p></details>`).join('');

/* Scroll reveal + progress */
(() => {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  $$('.reveal').forEach(el => io.observe(el));
  const p = $('#progress'); addEventListener('scroll', () => { const h = document.documentElement; p.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%'; }, { passive: true });
})();
