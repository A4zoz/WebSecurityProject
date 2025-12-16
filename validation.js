/* ===============================
   Secure Input Validation Library
   Project 2 – Web Security
================================ */

// ---------- Email Validation ----------
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ---------- Strong Password ----------
function isStrongPassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return regex.test(password);
}

// ---------- Username Validation ----------
function isValidUsername(username) {
    const regex = /^[a-zA-Z0-9_]{4,15}$/;
    return regex.test(username);
}

// ---------- Numeric Range Validation ----------
function validateNumericRange(num, min, max) {
    return num >= min && num <= max;
}

// ---------- Length Validation ----------
function validateLength(input, min, max) {
    return input.length >= min && input.length <= max;
}

// ---------- XSS Detection ----------
function detectXSS(input) {
    const patterns = [
        /<script>/i,
        /onerror=/i,
        /onload=/i,
        /javascript:/i,
        /<img/i
    ];
    return patterns.some(p => p.test(input));
}

// ---------- Sanitization ----------
function sanitizeInput(input) {
    return input.replace(/[<>/"']/g, "");
}

// ---------- Whitelist Sanitization ----------
function sanitizeWithWhitelist(input) {
    return input.replace(/[^a-zA-Z0-9 _.-]/g, "");
}

// ---------- Security Logger ----------
function logSecurityEvent(type, input) {
    const time = new Date().toLocaleString();
    console.warn(`[${time}] ${type}: ${input}`);
}

// ---------- Master Validation ----------
function validateInput(input) {
    if (detectXSS(input)) {
        logSecurityEvent("XSS Attempt", input);
        return { valid: false, reason: "XSS detected" };
    }

    if (!validateLength(input, 3, 50)) {
        return { valid: false, reason: "Invalid length" };
    }

    return { valid: true, sanitized: sanitizeWithWhitelist(input) };
}
