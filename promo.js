/* NEN AUDIO 세일 일정 — 날짜가 되면 HUB·Set Monitor Lite 광고 칸과 사이트가 알아서 바뀜.
   Gumroad 할인(자동 적용)과 같은 일정: BF20 (전 제품 20%, Name Tag 제외), YEAREND15 (15%, 번들 제외) + YEARENDBUNDLE (번들 20%, 코드) */
(function(){
  var P = [
    { key:"bf", from:"2026-11-24T00:00:00+09:00", to:"2026-12-01T09:00:00+09:00", pct:20, bpct:20, bcode:"",
      exclude:[], special:{ nametag:30 },          // Name Tag: 출시 할인 30%(NAMETAG30)가 더 커서 그걸로 표시
      label:{ en:"Black Friday", ko:"블랙프라이데이", ja:"ブラックフライデー" },
      until:{ en:"Ends Nov 30, 4 PM PT", ko:"12월 1일 오전 9시까지", ja:"12月1日 9時まで" },
      line:{ en:"Every device and bundle 20% off. The price is already discounted at checkout, no code needed.",
             ko:"모든 디바이스와 번들 20% 할인. 결제 화면에 이미 할인 가격이 적용돼 있어요. 코드 필요 없음.",
             ja:"すべてのデバイスとバンドルが20%オフ。購入画面ですでに割引済み、コード不要。" } },
    { key:"ye", from:"2026-12-18T00:00:00+09:00", to:"2027-01-01T17:00:00+09:00", pct:15, bpct:20, bcode:"YEARENDBUNDLE",
      exclude:[],
      label:{ en:"Year-End Sale", ko:"연말 세일", ja:"年末セール" },
      until:{ en:"Ends Dec 31", ko:"12월 31일까지", ja:"12月31日まで" },
      line:{ en:"Every device 15% off, bundles 20% off. Discount applied at checkout.",
             ko:"모든 디바이스 15%, 번들 20% 할인. 결제 화면에서 바로 적용돼요.",
             ja:"すべてのデバイス15%オフ、バンドルは20%オフ。購入画面で自動適用。" } }
  ];
  var now = Date.now(), cur = null;
  var q = (location.search.match(/[?&]promo=(bf|ye|none)/)||[])[1];   // 미리보기용 ?promo=bf|ye|none
  for (var i = 0; i < P.length; i++) if (q ? P[i].key === q : (now >= Date.parse(P[i].from) && now < Date.parse(P[i].to))) cur = P[i];
  function money(n){ n = Math.round(n*100)/100; return "$" + (n % 1 ? n.toFixed(2) : String(n)); }
  /* price("$29", "setmonitor", isBundle) -> {was:"$29", now:"$23.20"} 또는 null */
  function price(p, id, bundle){
    if (!cur) return null;
    if (cur.exclude.indexOf(id) > -1) return null;
    var n = parseFloat(String(p).replace(/[^0-9.]/g,"")); if (!n) return null;
    var pct = (cur.special && cur.special[id]) || (bundle ? cur.bpct : cur.pct);
    return { was:p, now:money(n * (1 - pct/100)), pct:pct };
  }
  /* 번들 주소에 코드 붙이기 (연말 번들 20%는 코드로만) */
  function bundleUrl(u){ return cur && cur.bcode ? u.replace(/\/?(\?|$)/, "/" + cur.bcode + "$1") : u; }
  window.NEN_PROMO = cur ? { key:cur.key, pct:cur.pct, bpct:cur.bpct, label:cur.label, until:cur.until, line:cur.line, price:price, bundleUrl:bundleUrl } : null;
})();
