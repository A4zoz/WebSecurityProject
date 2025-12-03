let isSecure = false;

function fillPayload() {
    const select = document.getElementById('payloadSelect');
    document.getElementById('userInput').value = select.value;
}

function postComment() {
    const input = document.getElementById('userInput').value;
    const outputDiv = document.getElementById('output');
    
    if (input.trim() === "") return;

    const timestamp = new Date().toLocaleTimeString();
    
    if (isSecure) {
      
// --- (Secure Mode) ---
        const safeSpan = document.createElement('span');
        safeSpan.textContent = input; 
        safeSpan.style.color = "green";
        
        outputDiv.innerHTML = "<strong>Safe Output:</strong> ";
        outputDiv.appendChild(safeSpan);
        
        addLog(timestamp, input, "BLOCKED 🛡️", "log-blocked");
        
    } else {
        
        // ---  (Vulnerable Mode) ---
        outputDiv.innerHTML = "<strong>Raw Output:</strong> " + input;
        
       
        addLog(timestamp, input, "EXECUTED ⚠️", "log-executed");
    }
}

function addLog(time, payload, action, cssClass) {
    const tbody = document.getElementById('logBody');
    const row = `<tr>
        <td>${time}</td>
        <td><code>${payload.substring(0, 30)}...</code></td>
        <td class="${cssClass}">${action}</td>
    </tr>`;
    tbody.innerHTML = row + tbody.innerHTML; 
}

function toggleSecurity() {
    isSecure = !isSecure;
    const statusBox = document.getElementById('statusIndicator');
    
    if (isSecure) {
        statusBox.innerText = "SYSTEM STATUS: SECURE (WAF & CSP Active) 🔒";
        statusBox.className = "status-box secure-mode";
    } else {
        statusBox.innerText = "SYSTEM STATUS: VULNERABLE (Protection OFF) 🔓";
        statusBox.className = "status-box vuln-mode";
    }

}
