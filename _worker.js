export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 🌍 1. GLOBAL ROUTING & GEO-LOCATION
    const country = request.cf?.country || "US";
    const clientIP = request.headers.get("cf-connecting-ip") || "Unknown IP";

    // 🛡️ 2. COMPLIANCE & SECURITY HEADERS (Bank-Level)
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

    // ======== 4. REALISTIC PRICING & TLD ENGINE ========
    if (url.pathname === "/api/search") {
        let domainQuery = url.searchParams.get("domain") || "";
        domainQuery = domainQuery.toLowerCase().trim();
        const authCode = url.searchParams.get("token");
        const promoCode = url.searchParams.get("promo");
        
        if (!domainQuery) return new Response(JSON.stringify({ error: "Domain required" }), { status: 400, headers: apiHeaders });

        // Auto-append .com if no TLD provided
        if (!domainQuery.includes(".")) domainQuery += ".com";

        // Real Market Base Prices in USD
        let baseUSD = 14.99; // default .com
        if (domainQuery.endsWith(".in")) baseUSD = 5.99;
        else if (domainQuery.endsWith(".net") || domainQuery.endsWith(".org")) baseUSD = 12.99;
        else if (domainQuery.endsWith(".ai") || domainQuery.endsWith(".io")) baseUSD = 49.99;
        else if (domainQuery.endsWith(".co")) baseUSD = 24.99;

        // Currency Exchange Engine
        let sym = "$"; let rate = 1; let currencyCode = "USD";
        if (country === "IN") { sym = "₹"; rate = 83.5; currencyCode = "INR"; }
        else if (country === "GB") { sym = "£"; rate = 0.79; currencyCode = "GBP"; }
        else if (["DE","FR","IT","ES","NL"].includes(country)) { sym = "€"; rate = 0.92; currencyCode = "EUR"; }

        let localPrice = (baseUSD * rate);

        // Promo Code Logic (10% Off for valid codes)
        let discountApplied = false;
        if (promoCode && (promoCode.toUpperCase() === "SUPREME10" || promoCode.toUpperCase() === "NEWUSER")) {
            localPrice = localPrice * 0.90; // 10% discount
            discountApplied = true;
        }

        localPrice = localPrice.toFixed(2);
        const renewalPrice = (baseUSD * rate * 1.2).toFixed(2); // Show slightly higher renewal to look realistic

        // 👑 CEO & FOUNDER OVERRIDE
        if (authCode === "12" || authCode === "18") {
          return new Response(JSON.stringify({
            status: "success", domain: domainQuery, availability: "Exact Match Available",
            priceValue: "0.00", priceDisplay: `${sym}0.00`, currency: currencyCode,
            action: "Deploy Master Node", note: "👑 Master Asset Override Validated.", urgency: ""
          }), { headers: apiHeaders });
        }

        return new Response(JSON.stringify({
          status: "success", 
          domain: domainQuery, 
          availability: "Exact Match Available",
          priceValue: localPrice, 
          priceDisplay: `${sym}${localPrice}`, 
          currency: currencyCode,
          renewal: `Renews at ${sym}${renewalPrice}/yr`,
          discounted: discountApplied,
          action: "Continue to Cart", 
          urgency: "🔥 High Demand: 3 people are looking at this right now!"
        }), { headers: apiHeaders });
    }

    // ======== 5. ENTERPRISE UI (GoDaddy/Hostinger Hybrid) ========
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>SupremeHostDomain | Official Domain Registrar & Hosting</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            body { background-color: #0b1120; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
            .glass-panel { background: #1e293b; border: 1px solid #334155; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
            ::-webkit-scrollbar { display: none; }
            .hero-gradient { background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); }
            .trust-badge { display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.75rem; color: #94a3b8; }
        </style>
    </head>
    <body class="text-white min-h-screen flex flex-col">
        
        <!-- Flash Sale Banner -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-center py-2 text-xs sm:text-sm font-bold tracking-wide">
            ⚡ Flash Sale: Get 10% Off domains with code <span class="bg-white text-blue-700 px-1.5 rounded mx-1">SUPREME10</span>. Ends in <span id="timer" class="font-mono">14:59</span>
        </div>

        <nav class="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center z-40">
            <h1 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tight">SupremeHostDomain</h1>
            <div class="hidden sm:flex gap-4 text-sm font-semibold text-slate-300">
                <a href="#" class="hover:text-white">Domains</a>
                <a href="#" class="hover:text-white">Hosting</a>
                <a href="#" class="hover:text-white">Email</a>
            </div>
        </nav>
        
        <main class="hero-gradient flex-grow flex flex-col items-center justify-center py-16 px-4 w-full">
            <h2 class="text-4xl sm:text-5xl font-black mb-4 text-center tracking-tight text-white drop-shadow-lg">Bring Your Idea to Life.</h2>
            <p class="text-slate-400 text-center mb-8 text-lg">Claim your perfect domain and get your business online today.</p>
            
            <div class="w-full max-w-2xl bg-white p-2 rounded-xl flex items-center mb-6 shadow-2xl focus-within:ring-4 ring-blue-500/30 transition-all">
                <input type="text" id="domainInput" placeholder="Find your perfect domain..." class="w-full bg-transparent px-4 py-3 outline-none text-xl text-slate-900 font-medium placeholder-slate-400">
                <button onclick="search()" id="searchBtn" class="bg-blue-600 hover:bg-blue-700 font-bold px-8 py-3 rounded-lg shadow-lg transition-all text-white whitespace-nowrap">Search</button>
            </div>
            
            <div class="flex gap-6 text-slate-400 text-sm font-semibold mb-8">
                <span>.com <span class="text-emerald-400">$14.99</span></span>
                <span>.in <span class="text-emerald-400">$5.99</span></span>
                <span>.ai <span class="text-emerald-400">$49.99</span></span>
            </div>

            <div id="resultCard" class="hidden w-full max-w-2xl glass-panel p-6 rounded-xl relative border border-slate-700 text-left">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700 pb-4 mb-4">
                    <div>
                        <h3 id="resDomain" class="text-2xl font-black text-emerald-400 break-all flex items-center gap-2">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                        </h3>
                        <p id="resAvailability" class="text-sm font-bold text-slate-300 mt-1"></p>
                    </div>
                    <div class="text-right mt-4 sm:mt-0">
                        <span id="resPrice" class="text-4xl font-black text-white"></span>
                        <p id="resRenewal" class="text-xs text-slate-400 mt-1"></p>
                    </div>
                </div>
                
                <p id="resUrgency" class="text-sm text-amber-400 font-bold mb-4 flex items-center gap-1"></p>

                <div class="bg-slate-800/50 p-3 rounded-lg flex items-center gap-2 mb-4 border border-slate-700">
                    <input type="text" id="promoInput" placeholder="Have a promo code?" class="bg-slate-900 text-sm px-3 py-2 rounded-md outline-none border border-slate-700 w-full text-white">
                    <button onclick="applyPromo()" class="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm font-bold transition-all text-white">Apply</button>
                </div>
                
                <button id="resBtn" class="w-full bg-emerald-600 hover:bg-emerald-500 font-black text-white py-4 rounded-lg shadow-xl transition-all uppercase tracking-wide text-lg"></button>
            </div>
        </main>

        <!-- Trust & Features Section -->
        <div class="bg-slate-900 py-10 border-t border-slate-800 flex flex-wrap justify-center gap-10 px-4">
            <div class="trust-badge"><span class="text-xl">🔒</span> SSL Certificate Included</div>
            <div class="trust-badge"><span class="text-xl">🛡️</span> ICANN Accredited</div>
            <div class="trust-badge"><span class="text-xl">💰</span> 30-Day Money-Back Guarantee</div>
            <div class="trust-badge"><span class="text-xl">🎧</span> 24/7 Global Support</div>
        </div>

        <!-- ⚖️ PROVEN LEGAL FOOTER -->
        <footer class="bg-slate-950 py-10 border-t border-slate-800 text-center text-sm text-slate-500 px-4">
            <div class="flex flex-wrap justify-center gap-6 mb-6 font-semibold">
                <a href="#" class="hover:text-blue-400 transition-colors">About Us</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Terms of Service</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Refund & Cancellation</a>
                <a href="#" class="hover:text-blue-400 transition-colors">Contact</a>
            </div>
            <p class="mb-2">&copy; 2026 SupremeHostDomain Inc. All rights reserved.</p>
            <p class="text-xs text-slate-600 max-w-2xl mx-auto">Use of this site is subject to express terms of use. By using this site, you signify that you agree to be bound by these Universal Terms of Service.</p>
        </footer>

        <!-- PAYMENT METHOD MODAL -->
        <div id="paymentModal" class="hidden fixed inset-0 bg-slate-950/90 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 backdrop-blur-sm">
            <div class="bg-slate-900 w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 border border-slate-700 shadow-2xl">
                <div class="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
                    <h2 class="text-xl font-black text-white flex items-center gap-2">Secure Checkout 🔒</h2>
                    <button onclick="closeModal('paymentModal')" class="text-slate-400 hover:text-white text-3xl leading-none">&times;</button>
                </div>
                <div class="space-y-4">
                    <button onclick="openQRModal()" class="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-5 rounded-xl font-bold border border-emerald-500/30 transition-all group">
                        <div class="flex items-center gap-4">
                            <span class="text-3xl">📱</span> 
                            <div class="text-left">
                                <span class="group-hover:text-emerald-400 transition-colors block text-lg">UPI / QR Code</span>
                                <span class="text-xs text-slate-400 font-normal">GPay, PhonePe, Paytm (0% Fee)</span>
                            </div>
                        </div>
                        <span class="text-emerald-500 font-black text-xl">➔</span>
                    </button>
                    <button onclick="processGlobalPayment()" class="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-5 rounded-xl font-bold border border-slate-700 transition-all group">
                        <div class="flex items-center gap-4">
                            <span class="text-3xl">💳</span> 
                            <div class="text-left">
                                <span class="group-hover:text-blue-400 transition-colors block text-lg">Global Cards</span>
                                <span class="text-xs text-slate-400 font-normal">Visa, Mastercard, Stripe</span>
                            </div>
                        </div>
                        <span class="text-blue-500 font-black text-xl">➔</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- 📸 DYNAMIC QR CODE GENERATOR MODAL -->
        <div id="qrModal" class="hidden fixed inset-0 bg-slate-950/95 z-[60] flex justify-center items-center p-4 backdrop-blur-md">
            <div class="bg-slate-900 w-full max-w-sm rounded-2xl p-6 border border-emerald-500/50 text-center relative shadow-2xl">
                <div class="absolute top-0 w-full left-0 bg-emerald-600 text-white text-xs font-black py-1.5 uppercase tracking-widest rounded-t-2xl">Verified Gateway</div>
                
                <h2 class="text-xl font-black mt-6 text-white">Scan to Pay</h2>
                <p class="text-emerald-400 font-black text-4xl mb-6 mt-1" id="qrAmountDisplay"></p>
                
                <div class="bg-white p-4 rounded-xl inline-block shadow-lg mx-auto mb-6 border border-slate-700">
                    <img id="upiQRCode" src="" alt="Secure UPI QR" class="w-48 h-48 object-contain">
                </div>

                <div class="text-left bg-slate-800 p-4 rounded-lg border border-slate-700 mb-6 flex justify-between items-center">
                    <div>
                        <p class="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Paying To</p>
                        <p class="text-base font-black text-white tracking-wide">SupremeHostDomain</p>
                    </div>
                    <span class="text-emerald-400 text-2xl">✓</span>
                </div>
                
                <a id="payDirectBtn" href="#" class="block w-full bg-blue-600 hover:bg-blue-500 font-bold text-white py-3.5 rounded-lg transition-all uppercase text-sm mb-3 text-center">Open UPI App on Mobile</a>
                <button onclick="closeModal('qrModal')" class="text-slate-400 font-bold text-sm hover:text-white transition-all uppercase tracking-wide">Cancel Order</button>
            </div>
        </div>

        <script>
            let currentPriceValue = 0;
            let currentCurrency = "USD";
            let currentAction = "";
            let currentNote = "";
            let lastDomain = "";

            // Urgency Timer Logic
            let time = 14 * 60 + 59;
            setInterval(() => {
                let m = Math.floor(time / 60);
                let s = time % 60;
                document.getElementById('timer').innerText = \`\${m < 10 ? '0' : ''}\${m}:\${s < 10 ? '0' : ''}\${s}\`;
                if(time > 0) time--;
            }, 1000);

            async function fetchPricing(domain, promo = "") {
                const urlParams = new URLSearchParams(window.location.search);
                if(promo) urlParams.append("promo", promo);
                
                const res = await fetch('/api/search?domain=' + domain + '&' + urlParams.toString());
                return await res.json();
            }

            function updateUI(data) {
                document.getElementById('resDomain').innerHTML = data.domain + ' <svg class="w-6 h-6 inline text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
                document.getElementById('resAvailability').innerText = data.availability;
                document.getElementById('resPrice').innerText = data.priceDisplay;
                document.getElementById('resRenewal').innerText = data.renewal || "";
                document.getElementById('resUrgency').innerHTML = data.urgency ? '🔥 ' + data.urgency : "";
                
                if(data.discounted) {
                    document.getElementById('resPrice').classList.add('text-emerald-400');
                    document.getElementById('resPrice').classList.remove('text-white');
                }
                
                currentPriceValue = data.priceValue;
                currentCurrency = data.currency;
                currentAction = data.action;
                currentNote = data.note;
                
                document.getElementById('resBtn').innerText = currentAction;
                document.getElementById('resultCard').classList.remove('hidden');
            }

            async function search() {
                const domain = document.getElementById('domainInput').value;
                const btn = document.getElementById('searchBtn');
                if(!domain) return;
                
                btn.innerText = "Searching...";
                lastDomain = domain;
                
                const data = await fetchPricing(domain);
                updateUI(data);
                btn.innerText = "Search";
            }

            async function applyPromo() {
                const promo = document.getElementById('promoInput').value;
                if(!promo) return;
                
                const btn = document.querySelector('button[onclick="applyPromo()"]');
                btn.innerText = "Applying...";
                
                const data = await fetchPricing(lastDomain, promo);
                updateUI(data);
                btn.innerText = "Applied";
                btn.classList.replace('bg-slate-700', 'bg-emerald-600');
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
                    alert("UPI payment is available for INR only. Please select Global Cards.");
                    return;
                }

                // ⚠️ FINAL STEP: REPLACE WITH YOUR MERCHANT UPI ID
                const MERCHANT_UPI_ID = "YOUR_MERCHANT_UPI@bank"; 
                const PAYEE_NAME = "SupremeHostDomain"; 
                
                const upiString = \`upi://pay?pa=\${MERCHANT_UPI_ID}&pn=\${encodeURIComponent(PAYEE_NAME)}&am=\${currentPriceValue}&cu=INR&tn=Domain Registration\`;
                const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(upiString);
                
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
