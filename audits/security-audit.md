# Security Vulnerability and Configuration Audit

## Executive Summary
This audit focuses on the security configuration, dependencies, and code practices of the Aman Portfolio. A static analysis and dependency audit were performed. 

The security posture of this project is **exceptional** for a frontend static site. Dependency vulnerability checks returned 0 issues, and a highly restrictive Content Security Policy (CSP) is active. The application has implemented input sanitization and secure redirection configurations.

---

## 1. Dependency Analysis
Running `npm audit` returned **0 vulnerabilities**:
* **Total Packages:** Clean install (react 19.x, tailwindcss 4.x, vite 8.x).
* **Vulnerability Status:** Zero active advisories.

**Verdict:** Excellent. Keeping dependencies up to date minimizes the risk of supply chain vulnerabilities.

---

## 2. Content Security Policy (CSP)
The site configures its CSP via a `<meta http-equiv="Content-Security-Policy">` tag in `index.html`. 

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self'; 
  base-uri 'self'; 
  object-src 'none'; 
  frame-ancestors 'none'; 
  script-src 'self'; 
  script-src-attr 'none'; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com; 
  img-src 'self' data: https://*.picsum.photos https://picsum.photos; 
  connect-src 'self' https://formsubmit.co; 
  form-action 'self' https://formsubmit.co; 
  manifest-src 'self'; 
  upgrade-insecure-requests" 
/>
```

### Analysis:
* **Strong Defenses:**
  * `default-src 'self'` restricts resource loads to origin.
  * `object-src 'none'` blocks flash/plugins.
  * `frame-ancestors 'none'` prevents clickjacking by preventing the site from being framed.
  * `script-src 'self'` prevents Cross-Site Scripting (XSS) by disallowing inline scripts and eval.
  * `form-action 'self' https://formsubmit.co` restricts form submissions to safe domains.
* **Compromises Made:**
  * `style-src 'self' 'unsafe-inline' ...`: Allows inline styles. This is required for Tailwind CSS and Framer Motion's dynamic spring calculations, but theoretically increases exposure to CSS-based attacks. This is a common and acceptable compromise in React systems.

---

## 3. Data Leakage & Secrets
* ** plaintext Email Exposure:**
  * In `Contact.tsx`, the contact form fetch request sends data to:
    `https://formsubmit.co/ajax/amandeavor@gmail.com`
  * The raw Gmail address `amandeavor@gmail.com` is also exposed in the footer `mailto:` link.
  * *Risk:* Automated web crawlers harvest plaintext email addresses from frontend bundles, leading to spam.
  * *Recommendation:* FormSubmit supports using an encrypted/hashed endpoint (e.g. `https://formsubmit.co/ajax/your_unique_hash`). It is highly recommended to set this up to keep the raw email address hidden from the source code.

---

## 4. Code Security Practices
* **XSS Defenses:** No instances of `dangerouslySetInnerHTML` or `eval()` are present.
* **Input Sanitization:** In `Contact.tsx`, user inputs (name, email, message) are passed through strict sanitization helpers (`removeUnsafeCharacters`, `stripUnsafeText`, `stripUnsafeMessage`). This strips `<` and `>` tags, prevents buffer overflows by enforcing strict character length limits (`MAX_NAME_LENGTH`, `MAX_EMAIL_LENGTH`, `MAX_MESSAGE_LENGTH`), and checks email validation against a regex pattern before fetching the API.
* **Social Redirections:** In `Contact.tsx`, all external links use:
  ```tsx
  target="_blank" rel="noopener noreferrer"
  ```
  This is secure and prevents tab-nabbing attacks.
* **Image Context protection:** `onContextMenu` blocks saving or dragging images via right-click on the client container:
  ```tsx
  onContextMenu={(e) => {
    if ((e.target as HTMLElement).closest('img')) e.preventDefault()
  }}
  ```

---

## Recommendations
1. **Mask the FormSubmit Email:** Log into your FormSubmit account and copy your random token/hash. Replace the raw email endpoint in `Contact.tsx` line 80 with:
   `https://formsubmit.co/ajax/YOUR_FORMSUBMIT_HASH`
2. **Setup Sub-resource Integrity (SRI):** For stylesheets fetched from external CDNs (like Google Fonts, if not bundled locally), consider using subresource integrity hashes to prevent tampering.
