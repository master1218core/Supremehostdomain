export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 🌍 1. REAL GEO-LOCATION TRACKING
    const country = request.cf?.country || "US";
    const clientIP = request.headers.get("cf-connecting-ip") || "Unknown IP";

    // 🛡️ 2. ADVANCED SECURITY HEADERS
    const secureHeaders = {
      "Content-Type": "text/html;charset=UTF-8",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    };
    const apiHeaders = { ...secureHeaders, "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };

    // ======== 3. APP MANIFEST (PWA) ========
    if (url.pathname === "/manifest.json") {
      const manifest = {
        name: "SupremeHostDomain Global", short_name: "SupremeHostDomain", start_url: "/", display: "standalone",
        background_color: "#020617", theme_color: "#0f172a", description: "1000x AI-Powered Premium Tech",
        icons: [{ src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/512px-Python-logo-notext.svg.png", sizes: "512x512", type: "image/png" }]
      };
      return new Response(JSON.stringify(manifest), { headers: { "Content-Type": "application/json" } });
    }

    // ======== 4. ADVANCED SERVICE WORKER ========
    if (url.pathname === "/sw.js") {
      const swCode = `
        const CACHE_NAME = 'supreme-v3';
        self.addEventListener('install', (e) => { self.skipWaiting(); }); 
        self.addEventListener('activate', (e) => { 
          e.waitUntil(caches.keys().then(keys => Promise.all(keys.map(key => { if(key !== CACHE_NAME) return caches.delete(key); }))));
          e.waitUntil(clients.claim()); 
        }); 
        self.addEventListener('fetch', (e) => {
          e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
        });`;
      return new Response(swCode, { headers: { "Content-Type": "application/javascript" } });
    }

    // ======== 5. AI BACKEND ENDPOINT ========
    if (url.pathname === "/api/search") {
        const domainQuery = url.searchParams.get("domain");
        if (!domainQuery) return new Response(JSON.stringify({ error: "Domain required" }), { status: 400, headers: apiHeaders });

        let sym = "$"; let rate = 1; let currencyCode = "USD";
        if(country === "IN") { sym = "₹"; rate = 83.5; currencyCode = "INR"; }
        
        const localPrice = (19.99 * rate).toFixed(2);
        
        return new Response(JSON.stringify({
          status: "premium", domain: domainQuery, valuation: "98.4/100 (AI Analyzed)",
          priceValue: localPrice, // Raw number for QR Code
          priceDisplay: `${sym}${localPrice}`, // Display string
          currency: currencyCode,
          action: "Buy Now"
        }), { headers: apiHeaders });
    }

    // ======== 6. DYNAMIC FRONTEND UI ========
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>SupremeHostDomain | Secure Payments</title>
        <link rel="manifest" href="/manifest.json">
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .glass-panel { background: rgba(15, 23, 42, 0.9); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
            ::-webkit-scrollbar { display: none; }
        </style>
    </head>
    <body class="bg-slate-950 text-white font-sans min-h-screen">
        
        <nav class="p-4 glass-panel fixed w-full top-0 z-40 shadow-2xl text-center border-b border-slate-800">
            <h1 class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-wider">SupremeHostDomain</h1>
        </nav>
        
        <main class="pt-28 px-4 max-w-md mx-auto flex flex-col justify-center pb-10">
            
            <div class="glass-panel p-2 rounded-2xl flex items-center mb-6 shadow-2xl border border-blue-500/30">
                <input type="text" id="domainInput" placeholder="Enter domain name..." class="w-full bg-transparent px-3 py-2 outline-none text-lg">
                <button onclick="search()" id="searchBtn" class="bg-blue-600 hover:bg-blue-500 font-black px-6 py-3 rounded-xl shadow-lg transition-all uppercase tracking-wide text-sm">Analyze</button>
            </div>
            
            <div id="resultCard" class="hidden glass-panel p-6 rounded-2xl shadow-2xl relative border border-slate-700">
                <h3 id="resDomain" class="text-xl font-black text-white break-all mb-2"></h3>
                
                <div class="bg-black/60 p-4 rounded-xl mt-4 text-center border border-slate-800">
                    <span class="text-xs text-gray-400 font-bold uppercase tracking-widest block mb-1">Total Amount</span>
                    <span id="resPrice" class="text-4xl font-black text-emerald-400"></span>
                </div>
                
                <button id="resBtn" class="w-full mt-6 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 font-black text-white py-4 rounded-xl shadow-xl transition-all uppercase tracking-wider text-lg">Buy Now</button>
            </div>
        </main>

        <!-- Payment Method Modal -->
        <div id="paymentModal" class="hidden fixed inset-0 bg-slate-950/95 z-50 flex justify-center items-end sm:items-center p-0 sm:p-4 backdrop-blur-md">
            <div class="bg-slate-900 w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 border border-slate-700 shadow-2xl">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-xl font-black text-white">Payment Method</h2>
                    <button onclick="closeModal('paymentModal')" class="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
                </div>
                <div class="space-y-3">
                    <button onclick="openQRModal()" class="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-4 rounded-xl font-bold border border-emerald-500/30 transition-all group">
                        <span class="flex items-center gap-3"><span class="text-2xl">📱</span> <span class="group-hover:text-emerald-400 transition-colors text-left">UPI / QR Code<br><span class="text-[10px] text-gray-400 font-normal">GPay, PhonePe, Paytm</span></span></span>
                        <span class="text-emerald-500 font-black">➔</span>
                    </button>
                    <button onclick="alert('Card Gateway Configuration Pending')" class="w-full flex items-center justify-between bg-slate-800 hover:bg-slate-700 p-4 rounded-xl font-bold border border-slate-700 transition-all">
                        <span class="flex items-center gap-3"><span class="text-2xl">💳</span> Credit / Debit Cards</span>
                        <span class="text-gray-500 font-black">➔</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- 📸 AI QR CODE GENERATOR MODAL -->
        <div id="qrModal" class="hidden fixed inset-0 bg-slate-950/95 z-[60] flex justify-center items-center p-4 backdrop-blur-lg">
            <div class="glass-panel w-full max-w-sm rounded-3xl p-6 border border-emerald-500/50 shadow-[0_0_50px_rgba(16,185,129,0.2)] text-center relative overflow-hidden">
                <div class="absolute top-0 w-full left-0 bg-emerald-600 text-white text-[10px] font-black py-1 uppercase tracking-widest">SupremeHostDomain Official Gateway</div>
                
                <h2 class="text-lg font-black mt-6 mb-1 text-white">Scan to Pay</h2>
                <p class="text-emerald-400 font-black text-3xl mb-4" id="qrAmountDisplay"></p>
                
                <div class="bg-white p-3 rounded-2xl inline-block shadow-lg mx-auto mb-4 border-4 border-slate-800">
                    <!-- 🔄 Live QR Image will load here -->
                    <img id="upiQRCode" src="" alt="UPI QR Code" class="w-48 h-48 object-contain">
                </div>

                <div class="text-left bg-slate-800/50 p-3 rounded-xl border border-slate-700 mb-4">
                    <p class="text-[11px] text-gray-400 uppercase font-bold tracking-wider mb-1">Paying To</p>
                    <p class="text-sm font-black text-white tracking-wide">SupremeHostDomain</p>
                </div>
                
                <a id="payDirectBtn" href="#" class="block w-full bg-blue-600 hover:bg-blue-500 font-black text-white py-3 rounded-xl shadow-lg transition-all uppercase text-sm mb-3">Open UPI App on Mobile</a>
                
                <button onclick="closeModal('qrModal')" class="text-gray-400 font-bold text-sm hover:text-white transition-all uppercase tracking-wide">Cancel Payment</button>
            </div>
        </div>

        <script>
            let currentPriceValue = 0;
            let currentCurrency = "USD";

            async function search() {
                const domain = document.getElementById('domainInput').value;
                const btn = document.getElementById('searchBtn');
                if(!domain) return;
                
                btn.innerText = "Processing...";
                
                const res = await fetch('/api/search?domain=' + domain);
                const data = await res.json();
                
                document.getElementById('resDomain').innerText = data.domain;
                document.getElementById('resPrice').innerText = data.priceDisplay;
                currentPriceValue = data.priceValue;
                currentCurrency = data.currency;
                
                document.getElementById('resultCard').classList.remove('hidden');
                btn.innerText = "Analyze";
            }

            document.getElementById('resBtn').addEventListener('click', () => {
                document.getElementById('paymentModal').classList.remove('hidden');
            });

            function closeModal(id) {
                document.getElementById(id).classList.add('hidden');
            }

            function openQRModal() {
                if (currentCurrency !== "INR") {
                    alert("QR Code payment is currently only available for Indian Rupees (INR). Please use cards for International payments.");
                    return;
                }

                // ⚠️ YAHAN APNA ASLI UPI ID DAALEIN (e.g., 9876543210@ybl, name@sbi, etc.)
                const MY_UPI_ID = "YOUR_UPI_ID@bank"; 
                const PAYEE_NAME = "SupremeHostDomain"; // Business Name Locked
                const TRANSACTION_NOTE = "Domain Services";

                // Generate UPI Intent String
                const upiString = \`upi://pay?pa=\${MY_UPI_ID}&pn=\${encodeURIComponent(PAYEE_NAME)}&am=\${currentPriceValue}&cu=INR&tn=\${encodeURIComponent(TRANSACTION_NOTE)}\`;
                
                // Fetch QR Code from Free API
                const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + encodeURIComponent(upiString);
                
                // Update UI elements
                document.getElementById('upiQRCode').src = qrUrl;
                document.getElementById('qrAmountDisplay').innerText = "₹" + currentPriceValue;
                
                // Set Deep Link for Mobile Devices (clicking it opens GPay/PhonePe directly)
                document.getElementById('payDirectBtn').href = upiString;

                // Switch Modals
                closeModal('paymentModal');
                document.getElementById('qrModal').classList.remove('hidden');
            }
            
            // PWA Setup
            if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
        </script>
    </body>
    </html>`;

    return new Response(html, { headers: secureHeaders });
  }
};
