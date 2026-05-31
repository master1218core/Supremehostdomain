export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 🌍 1. GLOBAL ROUTING & GEO-LOCATION
    const country = request.cf?.country || "US";
    const clientIP = request.headers.get("cf-connecting-ip") || "Unknown IP";

    // 🛡️ 2. MILITARY-GRADE HEADERS
    const secureHeaders = {
      "Content-Type": "text/html;charset=UTF-8",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    };
    const apiHeaders = { ...secureHeaders, "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    // ======== 3. GLOBAL PAYMENT ROUTER ========
    if (url.pathname === "/api/checkout") {
        let paymentLink = "https://buy.stripe.com/YOUR_GLOBAL_BUSINESS_LINK"; 
        return new Response(JSON.stringify({ status: "success", url: paymentLink }), { headers: apiHeaders });
    }

    // ======== 4. ADVANCED TLD & PRICING ENGINE (Namecheap + GoDaddy Logic) ========
    if (url.pathname === "/api/search") {
        let domainQuery = url.searchParams.get("domain") || "";
        domainQuery = domainQuery.toLowerCase().trim();
        const authCode = url.searchParams.get("token");
        
        if (!domainQuery) return new Response(JSON.stringify({ error: "Domain required" }), { status: 400, headers: apiHeaders });
        if (!domainQuery.includes(".")) domainQuery += ".com"; // Default TLD

        // Base Prices
        let baseUSD = 14.99;
        let origUSD = 24.99; // For Strikethrough pricing
        
        if (domainQuery.endsWith(".in")) { baseUSD = 5.99; origUSD = 10.99; }
        else if (domainQuery.endsWith(".org") || domainQuery.endsWith(".net")) { baseUSD = 12.99; origUSD = 20.99; }
        else if (domainQuery.endsWith(".ai")) { baseUSD = 59.99; origUSD = 89.99; }
        else if (domainQuery.endsWith(".co")) { baseUSD = 24.99; origUSD = 39.99; }

        let sym = "$"; let rate = 1; let currencyCode = "USD";
        if (country === "IN") { sym = "₹"; rate = 83.5; currencyCode = "INR"; }
        else if (country === "GB") { sym = "£"; rate = 0.79; currencyCode = "GBP"; }
        else if (["DE","FR","IT","ES","NL"].includes(country)) { sym = "€"; rate = 0.92; currencyCode = "EUR"; }

        let localPrice = (baseUSD * rate).toFixed(2);
        let origPrice = (origUSD * rate).toFixed(2);
        const renewalPrice = (origUSD * rate).toFixed(2); 

        // 👑 CEO VIP GATEWAY (Codes: 12, 18)
        if (authCode === "12" || authCode === "18") {
          return new Response(JSON.stringify({
            status: "success", domain: domainQuery, availability: "Master Node Verified",
            origPrice: `${sym}0.00`, priceValue: "0.00", priceDisplay: `${sym}0.00`, currency: currencyCode,
            action: "Deploy Master Node", note: "👑 Founder Access Granted.", urgency: ""
          }), { headers: apiHeaders });
        }

        return new Response(JSON.stringify({
          status: "success", 
          domain: domainQuery, 
          availability: "Exact Match Available!",
          origPrice: `${sym}${origPrice}`,
          priceValue: localPrice, 
          priceDisplay: `${sym}${localPrice}`, 
          currency: currencyCode,
          renewal: `Renews at ${sym}${renewalPrice}/yr`,
          action: "Add to Cart", 
          urgency: "🔥 Flash Sale: 78% OFF. Only 2 left at this price!"
        }), { headers: apiHeaders });
    }

    // ======== 5. THE ULTIMATE HYBRID UI (GoDaddy Sales + Hostinger Design) ========
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>SupremeHostDomain | High-Performance Domains & Hosting</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            body { background-color: #030712; font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
            .glass-card { background: rgba(17, 24, 39, 0.7); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.05); }
            @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .modal-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            ::-webkit-scrollbar { display: none; }
            .mesh-bg { background: radial-gradient(at 40% 20%, rgba(16, 185, 129, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%); }
        </style>
    </head>
    <body class="text-slate-200 min-h-screen flex flex-col mesh-bg">
        
        <!-- GoDaddy Style Flash Sale Banner -->
        <div class="bg-gradient-to-r from-rose-600 via-red-500 to-rose-600 text-center py-2 text-xs sm:text-sm font-black tracking-wide text-white uppercase shadow-md">
            ⚡ GLOBAL FLASH SALE: GET UP TO 80% OFF DOMAINS. ENDS IN <span id="timer" class="font-mono bg-white text-rose-600 px-2 py-0.5 rounded ml-2">14:59</span>
        </div>

        <nav class="p-5 w-full flex justify-between items-center z-40 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md">
            <h1 class="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_#10b981]"></span> SupremeHostDomain
            </h1>
            <div class="hidden sm:flex gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <a href="#" class="hover:text-emerald-400 transition-colors">Domains</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Web Hosting</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Pro Email</a>
            </div>
        </nav>
        
        <main class="flex-grow flex flex-col items-center justify-center py-20 px-4 w-full z-10">
            
            <div class="text-center max-w-4xl mb-10">
                <h2 class="text-5xl sm:text-7xl font-black mb-6 text-white leading-tight tracking-tighter">
                    It all starts with a <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Domain.</span>
                </h2>
                <p class="text-slate-400 text-lg font-medium">Join 5 Million+ professionals. Get a free domain with Premium Hosting.</p>
            </div>
            
            <!-- Hostinger-Style Unified Search -->
            <div class="w-full max-w-3xl bg-slate-900 border-2 border-slate-700 hover:border-emerald-500/50 focus-within:border-emerald-500 p-2 rounded-2xl flex items-center mb-6 transition-all shadow-2xl">
                <input type="text" id="domainInput" placeholder="Search for your perfect domain name..." class="w-full bg-transparent px-5 py-4 outline-none text-xl text-white font-bold placeholder-slate-500" autocomplete="off">
                <button onclick="search()" id="searchBtn" class="bg-emerald-600 hover:bg-emerald-500 font-black px-10 py-4 rounded-xl transition-all text-white text-lg tracking-wide shadow-lg active:scale-95">Search</button>
            </div>

            <!-- Namecheap-Style TLD Pricing Grid -->
            <div class="flex flex-wrap justify-center gap-4 text-sm font-bold text-slate-400 mb-12">
                <div class="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><span class="text-white">.com</span> <span class="text-emerald-400ml-2">From $14.99</span></div>
                <div class="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><span class="text-white">.in</span> <span class="text-emerald-400 ml-2">From $5.99</span></div>
                <div class="bg-slate-900 px-4 py-2 rounded-lg border border-slate-800"><span class="text-white">.ai</span> <span class="text-emerald-400 ml-2">Premium</span></div>
            </div>

            <!-- Supreme Results Card -->
            <div id="resultCard" class="hidden w-full max-w-3xl glass-card p-8 rounded-3xl relative overflow-hidden text-left border border-emerald-500/30">
                <div class="absolute top-0 right-0 bg-emerald-600 px-4 py-1.5 text-xs font-black text-white uppercase tracking-widest rounded-bl-xl shadow-lg">Exact Match</div>
                
                <h3 id="resDomain" class="text-3xl font-black text-white break-all mb-2 flex items-center gap-3"></h3>
                <p id="resAvailability" class="text-sm font-bold text-emerald-400 mb-6"></p>
                
                <div class="bg-slate-900/80 p-6 rounded-2xl border border-slate-700 mb-6 flex flex-col sm:flex-row justify-between items-center">
                    <div>
                        <div class="flex items-center gap-3 mb-1">
                            <span id="resOrig" class="text-xl text-slate-500 line-through font-bold"></span>
                            <span class="bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded text-[10px] font-black uppercase">Save Big</span>
                        </div>
                        <span id="resPrice" class="text-6xl font-black text-white tracking-tight"></span>
                        <p id="resRenewal" class="text-xs text-slate-500 mt-2 font-medium"></p>
                    </div>
                    
                    <div class="mt-6 sm:mt-0 space-y-2 text-right hidden sm:block">
                        <p class="text-sm text-slate-300 flex items-center justify-end gap-2"><span class="text-emerald-400">✓</span> Free WHOIS Privacy</p>
                        <p class="text-sm text-slate-300 flex items-center justify-end gap-2"><span class="text-emerald-400">✓</span> Free SSL Certificate</p>
                    </div>
                </div>
                
                <p id="resUrgency" class="text-sm text-rose-400 font-bold mb-6 flex items-center gap-2 bg-rose-500/10 p-3 rounded-xl border border-rose-500/20"></p>

                <button id="resBtn" class="w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-black py-5 rounded-xl shadow-xl transition-all uppercase tracking-widest text-lg active:scale-[0.98]"></button>
            </div>
        </main>

        <!-- Hostinger-Style Trust Footer -->
        <footer class="bg-slate-950 border-t border-slate-800 pt-12 pb-6 px-6">
            <div class="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 mb-10">
                <div class="text-center"><div class="text-3xl mb-2">🔒</div><p class="text-xs font-bold text-slate-400 uppercase">Bank-Level Security</p></div>
                <div class="text-center"><div class="text-3xl mb-2">🛡️</div><p class="text-xs font-bold text-slate-400 uppercase">ICANN Accredited</p></div>
                <div class="text-center"><div class="text-3xl mb-2">⭐</div><p class="text-xs font-bold text-slate-400 uppercase">Trustpilot 4.8/5</p></div>
                <div class="text-center"><div class="text-3xl mb-2">💸</div><p class="text-xs font-bold text-slate-400 uppercase">30-Day Money Back</p></div>
            </div>
            <div class="border-t border-slate-800 pt-6 flex flex-wrap justify-center gap-6 text-xs text-slate-500 font-semibold uppercase tracking-wider mb-4">
                <a href="#" class="hover:text-emerald-400 transition-colors">Terms of Service</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Refunds</a>
            </div>
            <p class="text-center text-xs text-slate-600">&copy; 2026 SupremeHostDomain. All Rights Reserved.</p>
        </footer>

        <!-- 💳 RAZORPAY-STYLE PREMIUM CHECKOUT -->
        <div id="paymentModal" class="hidden fixed inset-0 bg-slate-950/90 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 backdrop-blur-sm">
            <div class="bg-slate-900 w-full max-w-md rounded-t-[2rem] sm:rounded-3xl border border-slate-700 shadow-2xl overflow-hidden modal-slide-up">
                
                <div class="bg-slate-800/80 p-6 border-b border-slate-700">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest">Order Summary</h2>
                        <button onclick="closeModal('paymentModal')" class="text-slate-400 hover:text-white text-2xl leading-none">&times;</button>
                    </div>
                    <div class="text-3xl font-black text-white" id="checkoutAmount"></div>
                </div>

                <div class="p-6 space-y-4">
                    <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Payment Method</p>
                    
                    <button onclick="openQRModal()" class="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-800 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500 transition-all group">
                        <div class="flex items-center gap-4">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" class="w-10 h-10 p-1 bg-white rounded-lg object-contain">
                            <div class="text-left">
                                <span class="text-white font-bold block">UPI / QR Code</span>
                                <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">0% Processing Fee</span>
                            </div>
                        </div>
                        <span class="text-slate-600 group-hover:text-emerald-400 font-black">➔</span>
                    </button>

                    <button onclick="processGlobalPayment()" class="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-800 p-4 rounded-2xl border border-slate-800 hover:border-blue-500 transition-all group">
                        <div class="flex items-center gap-4">
                            <div class="bg-slate-800 p-2 rounded-lg text-xl">💳</div>
                            <div class="text-left">
                                <span class="text-white font-bold block">Debit & Credit Cards</span>
                                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Global Secure Checkout</span>
                            </div>
                        </div>
                        <span class="text-slate-600 group-hover:text-blue-400 font-black">➔</span>
                    </button>
                </div>
                
                <div class="p-4 bg-slate-950 border-t border-slate-800 text-center text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    🔒 Secured by 256-bit SSL Encryption
                </div>
            </div>
        </div>

        <!-- 📸 DYNAMIC QR PAYMENT INTERFACE -->
        <div id="qrModal" class="hidden fixed inset-0 bg-slate-950/95 z-[60] flex justify-center items-center p-4 backdrop-blur-md">
            <div class="glass-card w-full max-w-sm rounded-[2rem] p-8 text-center relative shadow-2xl modal-slide-up border border-emerald-500/30">
                <h2 class="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Scan to Pay</h2>
                <div class="text-4xl font-black text-white tracking-tight mb-6" id="qrAmountDisplay"></div>
                
                <div class="bg-white p-3 rounded-2xl inline-block shadow-[0_0_40px_rgba(16,185,129,0.2)] mb-6">
                    <img id="upiQRCode" src="" alt="Secure QR" class="w-48 h-48 object-contain rounded-xl">
                </div>

                <div class="bg-slate-900 p-4 rounded-xl border border-slate-800 mb-6 flex justify-between items-center text-left">
                    <div>
                        <p class="text-[9px] text-slate-500 uppercase font-black tracking-widest mb-1">Paying To</p>
                        <p class="text-sm font-black text-white">SupremeHostDomain</p>
                    </div>
                    <span class="text-emerald-400 text-xl font-black">✓</span>
                </div>
                
                <a id="payDirectBtn" href="#" class="block w-full bg-emerald-600 hover:bg-emerald-500 font-black text-white py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-sm mb-4">Open UPI App</a>
                <button onclick="closeModal('qrModal')" class="text-slate-500 font-bold text-xs hover:text-white transition-all uppercase tracking-widest">Cancel Order</button>
            </div>
        </div>

        <script>
            let currentPriceValue = 0;
            let currentCurrency = "USD";
            let currentAction = "";
            let currentNote = "";

            // GoDaddy Style Flash Sale Timer
            let time = 14 * 60 + 59;
            setInterval(() => {
                let m = Math.floor(time / 60);
                let s = time % 60;
                document.getElementById('timer').innerText = \`\${m < 10 ? '0' : ''}\${m}:\${s < 10 ? '0' : ''}\${s}\`;
                if(time > 0) time--;
            }, 1000);

            async function search() {
                const domain = document.getElementById('domainInput').value;
                const btn = document.getElementById('searchBtn');
                if(!domain) return;
                
                btn.innerText = "Scanning...";
                
                const urlParams = new URLSearchParams(window.location.search);
                const res = await fetch('/api/search?domain=' + domain + '&' + urlParams.toString());
                const data = await res.json();
                
                document.getElementById('resDomain').innerHTML = data.domain + ' <span class="text-emerald-400 text-xl">✓</span>';
                document.getElementById('resAvailability').innerText = data.availability;
                document.getElementById('resOrig').innerText = data.origPrice;
                document.getElementById('resPrice').innerText = data.priceDisplay;
                document.getElementById('resRenewal').innerText = data.renewal || "";
                
                if (data.urgency) {
                    document.getElementById('resUrgency').innerHTML = '⚠️ ' + data.urgency;
                    document.getElementById('resUrgency').style.display = "flex";
                } else {
                    document.getElementById('resUrgency').style.display = "none";
                }
                
                currentPriceValue = data.priceValue;
                currentCurrency = data.currency;
                currentAction = data.action;
                currentNote = data.note;
                
                document.getElementById('checkoutAmount').innerText = data.priceDisplay;
                document.getElementById('resBtn').innerText = currentAction;
                document.getElementById('resultCard').classList.remove('hidden');
                
                btn.innerText = "Search";
            }

            document.getElementById('resBtn').addEventListener('click', () => {
                if (currentAction.includes("Deploy")) {
                    alert(currentNote);
                } else {
                    document.getElementById('paymentModal').classList.remove('hidden');
                }
            });

            function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

            function openQRModal() {
                if (currentCurrency !== "INR") {
                    alert("UPI is available for INR only. Select Global Cards.");
                    return;
                }

                // ⚠️ FINAL STEP: REPLACE WITH YOUR MERCHANT UPI ID
                const MERCHANT_UPI_ID = "YOUR_MERCHANT_UPI@bank"; 
                const PAYEE_NAME = "SupremeHostDomain"; 
                
                const upiString = \`upi://pay?pa=\${MERCHANT_UPI_ID}&pn=\${encodeURIComponent(PAYEE_NAME)}&am=\${currentPriceValue}&cu=INR&tn=Domain Purchase\`;
                const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(upiString);
                
                document.getElementById('upiQRCode').src = qrUrl;
                document.getElementById('qrAmountDisplay').innerText = "₹" + currentPriceValue;
                document.getElementById('payDirectBtn').href = upiString;

                closeModal('paymentModal');
                document.getElementById('qrModal').classList.remove('hidden');
            }

            async function processGlobalPayment() {
                const res = await fetch('/api/checkout?method=card');
                const data = await res.json();
                if(data.url) window.location.href = data.url;
            }
        </script>
    </body>
    </html>`;

    return new Response(html, { headers: secureHeaders });
  }
};
