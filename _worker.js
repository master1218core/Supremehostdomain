export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 🌍 1. GLOBAL AI ROUTING & GEO-LOCATION
    const country = request.cf?.country || "US";
    const clientIP = request.headers.get("cf-connecting-ip") || "Unknown IP";

    // 🛡️ 2. MILITARY-GRADE COMPLIANCE HEADERS
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

    // ======== 4. SUPREME AI PRICING ENGINE ========
    if (url.pathname === "/api/search") {
        let domainQuery = url.searchParams.get("domain") || "";
        domainQuery = domainQuery.toLowerCase().trim();
        const authCode = url.searchParams.get("token");
        const promoCode = url.searchParams.get("promo");
        
        if (!domainQuery) return new Response(JSON.stringify({ error: "Domain required" }), { status: 400, headers: apiHeaders });
        if (!domainQuery.includes(".")) domainQuery += ".com";

        let baseUSD = 14.99;
        if (domainQuery.endsWith(".in")) baseUSD = 5.99;
        else if (domainQuery.endsWith(".net") || domainQuery.endsWith(".org")) baseUSD = 12.99;
        else if (domainQuery.endsWith(".ai") || domainQuery.endsWith(".io")) baseUSD = 49.99;
        else if (domainQuery.endsWith(".co")) baseUSD = 24.99;

        let sym = "$"; let rate = 1; let currencyCode = "USD";
        if (country === "IN") { sym = "₹"; rate = 83.5; currencyCode = "INR"; }
        else if (country === "GB") { sym = "£"; rate = 0.79; currencyCode = "GBP"; }
        else if (["DE","FR","IT","ES","NL"].includes(country)) { sym = "€"; rate = 0.92; currencyCode = "EUR"; }

        let localPrice = (baseUSD * rate);
        let discountApplied = false;
        
        if (promoCode && (promoCode.toUpperCase() === "SUPREME10" || promoCode.toUpperCase() === "NEWUSER")) {
            localPrice = localPrice * 0.90; 
            discountApplied = true;
        }

        localPrice = localPrice.toFixed(2);
        const renewalPrice = (baseUSD * rate * 1.2).toFixed(2); 

        // 👑 CEO & FOUNDER MASTER OVERRIDE (Codes: 12, 18)
        if (authCode === "12" || authCode === "18") {
          return new Response(JSON.stringify({
            status: "success", domain: domainQuery, availability: "Master Asset Node Validated",
            priceValue: "0.00", priceDisplay: `${sym}0.00`, currency: currencyCode,
            action: "Deploy Master Node", note: "👑 Founder Access Active. System unlocked.", urgency: ""
          }), { headers: apiHeaders });
        }

        return new Response(JSON.stringify({
          status: "success", 
          domain: domainQuery, 
          availability: "Available for Instant Registration",
          priceValue: localPrice, 
          priceDisplay: `${sym}${localPrice}`, 
          currency: currencyCode,
          renewal: `Renews at ${sym}${renewalPrice}/yr`,
          discounted: discountApplied,
          action: "Secure Domain", 
          urgency: "🔥 High Demand: 4 AI nodes tracking this exact name right now."
        }), { headers: apiHeaders });
    }

    // ======== 5. 1000x% ENTERPRISE UI & RAZORPAY-STYLE MODALS ========
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>SupremeHostDomain | Supreme AI Technology</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
            body { background-color: #020617; font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
            
            /* Glass & Glow Effects */
            .glass-card { background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(255, 255, 255, 0.08); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
            .glow-input:focus-within { box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4), 0 0 20px rgba(16, 185, 129, 0.1); border-color: rgba(16, 185, 129, 0.5); }
            
            /* Animations */
            @keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            .modal-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
            @keyframes pulseGlow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            .ai-pulse { animation: pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
            
            ::-webkit-scrollbar { display: none; }
        </style>
    </head>
    <body class="text-slate-200 min-h-screen flex flex-col relative overflow-x-hidden">
        
        <!-- Ambient AI Background -->
        <div class="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
            <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen"></div>
        </div>

        <nav class="p-5 w-full flex justify-between items-center z-40 fixed top-0 glass-card border-t-0 border-l-0 border-r-0">
            <div class="flex items-center gap-2">
                <div class="w-3 h-3 bg-emerald-500 rounded-full ai-pulse shadow-[0_0_10px_#10b981]"></div>
                <h1 class="text-xl font-black text-white tracking-tight">SupremeHostDomain</h1>
            </div>
            <div class="hidden sm:flex gap-6 text-sm font-semibold text-slate-400">
                <a href="#" class="hover:text-emerald-400 transition-colors">AI Domains</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Cloud Hosting</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Supreme Engine</a>
            </div>
        </nav>
        
        <main class="flex-grow flex flex-col items-center justify-center py-32 px-4 w-full z-10">
            <div class="text-center max-w-3xl mb-10">
                <p class="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-3 flex items-center justify-center gap-2">
                    <span>Powered by AI</span> | <span>Global Infrastructure</span>
                </p>
                <h2 class="text-5xl sm:text-6xl font-black mb-6 text-white leading-tight tracking-tighter">Own the <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">Future.</span></h2>
            </div>
            
            <!-- Ultimate Search Bar -->
            <div class="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl flex items-center mb-10 border border-slate-700 glow-input transition-all">
                <span class="pl-4 text-slate-500">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </span>
                <input type="text" id="domainInput" placeholder="Enter your master domain..." class="w-full bg-transparent px-4 py-4 outline-none text-xl text-white font-semibold placeholder-slate-500" autocomplete="off">
                <button onclick="search()" id="searchBtn" class="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 font-black px-8 py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all text-white text-lg tracking-wide uppercase active:scale-95">Analyze</button>
            </div>

            <!-- AI Dynamic Results Card -->
            <div id="resultCard" class="hidden w-full max-w-2xl glass-card p-8 rounded-3xl relative overflow-hidden text-left">
                <div class="absolute top-0 right-0 bg-emerald-500/10 border-b border-l border-emerald-500/20 px-4 py-1 text-[10px] font-black text-emerald-400 uppercase tracking-widest rounded-bl-xl">AI Verified</div>
                
                <h3 id="resDomain" class="text-3xl font-black text-white break-all mb-1"></h3>
                <p id="resAvailability" class="text-sm font-semibold text-emerald-400 mb-6 flex items-center gap-2"><span class="w-2 h-2 bg-emerald-500 rounded-full"></span></p>
                
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end bg-slate-900/50 p-6 rounded-2xl border border-slate-800 mb-6">
                    <div>
                        <p class="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Total Investment</p>
                        <span id="resPrice" class="text-5xl font-black text-white tracking-tight"></span>
                        <p id="resRenewal" class="text-xs text-slate-500 mt-2 font-medium"></p>
                    </div>
                    <div class="mt-4 sm:mt-0 text-left sm:text-right w-full sm:w-auto">
                        <div class="flex items-center gap-2 bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                            <input type="text" id="promoInput" placeholder="Promo Code" class="bg-transparent text-sm px-2 py-1 outline-none w-24 text-white font-mono uppercase">
                            <button onclick="applyPromo()" class="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded text-xs font-bold transition-all text-emerald-400">Apply</button>
                        </div>
                    </div>
                </div>
                
                <p id="resUrgency" class="text-xs text-amber-400 font-bold mb-6 flex items-center gap-1.5 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20"></p>

                <button id="resBtn" class="w-full bg-white text-slate-950 hover:bg-slate-200 font-black py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-base active:scale-[0.98]"></button>
            </div>
        </main>

        <footer class="bg-slate-950/80 border-t border-slate-800 py-10 px-6 text-center text-xs text-slate-500 relative z-10">
            <div class="flex flex-wrap justify-center gap-4 mb-4 font-semibold uppercase tracking-wider">
                <a href="#" class="hover:text-emerald-400 transition-colors">Terms</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Privacy</a>
                <a href="#" class="hover:text-emerald-400 transition-colors">Refunds</a>
            </div>
            <p>&copy; 2026 Supreme Tech. All Rights Reserved.</p>
        </footer>

        <!-- 💳 RAZORPAY-STYLE PAYMENT GATEWAY (BOTTOM SHEET) -->
        <div id="paymentModal" class="hidden fixed inset-0 bg-slate-950/80 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 backdrop-blur-sm transition-opacity">
            <div class="bg-slate-900 w-full max-w-md rounded-t-[2rem] sm:rounded-3xl border border-slate-700 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden modal-slide-up flex flex-col max-h-[90vh]">
                
                <!-- Gateway Header -->
                <div class="bg-slate-800/50 p-6 border-b border-slate-700 flex justify-between items-center relative">
                    <div>
                        <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">Complete Order</h2>
                        <div class="text-2xl font-black text-white" id="checkoutAmount"></div>
                    </div>
                    <button onclick="closeModal('paymentModal')" class="bg-slate-800 text-slate-400 hover:text-white w-8 h-8 rounded-full flex items-center justify-center text-xl transition-colors">&times;</button>
                </div>

                <!-- Gateway Options -->
                <div class="p-6 space-y-4 overflow-y-auto">
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Select Payment Method</p>
                    
                    <button onclick="openQRModal()" class="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all group">
                        <div class="flex items-center gap-4">
                            <div class="bg-slate-800 p-2 rounded-xl text-2xl group-hover:scale-110 transition-transform">📱</div>
                            <div class="text-left">
                                <span class="text-white font-bold block text-sm">UPI & QR Code</span>
                                <span class="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">0% Processing Fee</span>
                            </div>
                        </div>
                        <span class="text-slate-600 group-hover:text-emerald-400 font-black">➔</span>
                    </button>

                    <button onclick="processGlobalPayment()" class="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-800 p-4 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all group">
                        <div class="flex items-center gap-4">
                            <div class="bg-slate-800 p-2 rounded-xl text-2xl group-hover:scale-110 transition-transform">💳</div>
                            <div class="text-left">
                                <span class="text-white font-bold block text-sm">Cards & Global</span>
                                <span class="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Stripe Secure</span>
                            </div>
                        </div>
                        <span class="text-slate-600 group-hover:text-blue-400 font-black">➔</span>
                    </button>
                </div>

                <!-- Trust Footer -->
                <div class="p-4 bg-slate-950/50 border-t border-slate-800 text-center flex items-center justify-center gap-2">
                    <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full ai-pulse"></span>
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secured by Supreme AI 256-bit SSL</span>
                </div>
            </div>
        </div>

        <!-- 📸 RAZORPAY-STYLE QR CODE INTERFACE -->
        <div id="qrModal" class="hidden fixed inset-0 bg-slate-950/90 z-[60] flex justify-center items-center p-4 backdrop-blur-md">
            <div class="glass-card w-full max-w-sm rounded-[2rem] p-8 text-center relative shadow-2xl modal-slide-up border-emerald-500/20">
                
                <h2 class="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Scan to Pay</h2>
                <div class="text-4xl font-black text-white tracking-tight mb-8" id="qrAmountDisplay"></div>
                
                <div class="bg-white p-3 rounded-3xl inline-block shadow-[0_0_40px_rgba(16,185,129,0.15)] mb-8 relative">
                    <!-- Scanner Corner Accents -->
                    <div class="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl"></div>
                    <div class="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                    <div class="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                    <div class="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-emerald-500 rounded-br-xl"></div>
                    
                    <img id="upiQRCode" src="" alt="Secure QR" class="w-48 h-48 object-contain rounded-xl">
                </div>

                <div class="bg-slate-900 p-4 rounded-2xl border border-slate-800 mb-6 flex justify-between items-center">
                    <div class="text-left">
                        <p class="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-0.5">Business</p>
                        <p class="text-sm font-black text-white">SupremeHostDomain</p>
                    </div>
                    <div class="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-xs font-bold">Verified</div>
                </div>
                
                <a id="payDirectBtn" href="#" class="block w-full bg-emerald-600 hover:bg-emerald-500 font-black text-white py-4 rounded-xl shadow-lg transition-all uppercase tracking-widest text-sm mb-4 active:scale-95">Open UPI App</a>
                <button onclick="closeModal('qrModal')" class="text-slate-500 font-bold text-xs hover:text-white transition-all uppercase tracking-widest">Cancel Transaction</button>
            </div>
        </div>

        <script>
            let currentPriceValue = 0;
            let currentCurrency = "USD";
            let currentAction = "";
            let currentNote = "";
            let lastDomain = "";

            async function fetchPricing(domain, promo = "") {
                const urlParams = new URLSearchParams(window.location.search);
                if(promo) urlParams.append("promo", promo);
                const res = await fetch('/api/search?domain=' + domain + '&' + urlParams.toString());
                return await res.json();
            }

            function updateUI(data) {
                document.getElementById('resDomain').innerText = data.domain;
                document.getElementById('resAvailability').innerHTML = '<span class="w-2 h-2 bg-emerald-500 rounded-full ai-pulse"></span> ' + data.availability;
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
                
                // Update Checkout Modal Amount
                document.getElementById('checkoutAmount').innerText = data.priceDisplay;
                
                document.getElementById('resBtn').innerText = currentAction;
                document.getElementById('resultCard').classList.remove('hidden');
            }

            async function search() {
                const domain = document.getElementById('domainInput').value;
                const btn = document.getElementById('searchBtn');
                if(!domain) return;
                
                btn.innerHTML = '<span class="animate-pulse">Analyzing...</span>';
                lastDomain = domain;
                
                const data = await fetchPricing(domain);
                updateUI(data);
                btn.innerText = "Analyze";
            }

            async function applyPromo() {
                const promo = document.getElementById('promoInput').value;
                if(!promo) return;
                const btn = document.querySelector('button[onclick="applyPromo()"]');
                btn.innerText = "...";
                const data = await fetchPricing(lastDomain, promo);
                updateUI(data);
                btn.innerText = "Applied";
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

                // ⚠️ REPLACE WITH YOUR ACTUAL MERCHANT UPI ID
                const MERCHANT_UPI_ID = "YOUR_MERCHANT_UPI@bank"; 
                const PAYEE_NAME = "SupremeHostDomain"; 
                
                const upiString = \`upi://pay?pa=\${MERCHANT_UPI_ID}&pn=\${encodeURIComponent(PAYEE_NAME)}&am=\${currentPriceValue}&cu=INR&tn=SupremeTech Asset\`;
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
