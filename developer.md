---
layout: pages
title: Developer Recommendations
permalink: developer
group: navigation
---

# TL;DR
* Do assume eventual compromise of your password database (this means prepare for the worst)
* Do encrypt website traffic with TLS
* Do keep your servers up-to-date (especially security critical software like OpenSSL)
* Do hash passwords with **[Argon2](https://en.wikipedia.org/wiki/Argon2)**, scrypt, bcrypt or PBKDF2 and set an appropriate high work factor (bcrypt: cost >=11).
* Do enforce passwords to a minimum of 8 characters (generally longer passwords are better, I prefer larger than 12)
* Do rate limit authentication attempts and block repeated bad actors.
* Do blacklist top used passwords ([123456](http://www.whatsmypass.com/the-top-500-worst-passwords-of-all-time)) / common password masks ([?u?l?l?l?l?d?d](https://blog.netspi.com/netspis-top-password-masks-for-2015/)) / keyboard patterns ([qwerty](https://digi.ninja/projects/passpat.php))
* Do offer Multi-factor Authentication ([Avoid](https://www.schneier.com/blog/archives/2012/02/the_failure_of_2.html) [the](http://www.zdnet.com/article/sms-tokens-are-vulnerable-to-interception-experts-warn/) [use](https://krebsonsecurity.com/2016/09/the-limits-of-sms-for-2-factor-authentication/) [of](https://pages.nist.gov/800-63-3/sp800-63b.html#513-out-of-band-devices) [SMS](https://github.com/usnistgov/800-63-3/issues/351))
<!-- * Do block passwords equal to username, email address, URL/domain or name of the website/app. -->
<!-- * Do limit dictionary words and repeated characters (aaaaaaaa) # debatable, should we allow passphrases and password padding? -->
<!-- * Do audit most common password mask on your website and limit those. (only allow one password per topology and increment when needed) # commented due to being impractical for most users for now -->
* **Do not** enforce a limited character set (allow all [ASCII](http://www.asciitable.com) and [Unicode](http://unicode-table.com/en/) characters, yes you should allow emoji as part of a password👌)
* **Do not** enforce a maximum password length (if you need to have it, set it a reasonable high number. OWASP suggests 160 and NIST up to 64 characters)
* **Do not** enforce the rotation of passwords
<!-- * **Do Not** enforce the use of all 4 character classes (upper case, lower case, digits and special characters) -->
<!-- * **Do not** enforce a password change policy  # debatable -->

Another option is [passwordless](https://encrypted.google.com/search?hl=en&q=passwordless)

## Resources
* [OWASP: Password Storage Cheat Sheet](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet)
* [NIST.gov Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html#5112-memorized-secret-verifiers)
* [Coding Horror Blog - Password Rules Are Bullshit](https://blog.codinghorror.com/password-rules-are-bullshit/)
* [Good Example Implementations](https://securepasswords.info/)
* [Presentation: Your Password Complexity Requirements are Worthless - OWASP AppSecUSA 2014](https://www.youtube.com/watch?v=zUM7i8fsf0g) - [[slides]](https://www.korelogic.com/Resources/Presentations/bsidesavl_pathwell_2014-06.pdf)
* [Top 500 passwords - 2008](http://www.whatsmypass.com/the-top-500-worst-passwords-of-all-time)
* [OWASP: Brute force attack](https://www.owasp.org/index.php/Brute_force_attack)
* [OWASP: Forgot Password Cheat Sheet](https://www.owasp.org/index.php/Forgot_Password_Cheat_Sheet)
* [Scott Helme: Disclosing password storage policies on report-uri.io](https://scotthelme.co.uk/sites-tell-us-store-password/)
* [Passwords unmasked](http://wpengine.com/unmasked/)
* [PlainTextOffenders dev/FAQ](http://plaintextoffenders.com/faq/devs)
* [GRC haystack: Brute Force Password "Search Space" Calculator](https://www.grc.com/haystack.htm)
* [Dropbox: JS Password strength meter - zxcvbn](https://dl.dropboxusercontent.com/u/209/zxcvbn/test/index.html)
* [Kaspersky: JS Password strength meter](https://password.kaspersky.com)
* [JS topology test based KoreLogic's PathWell Password Data](http://www.genusa.com/test_password.html)
* [Dropbox blog: How Dropbox securely stores your passwords](https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/)

## Example of what not to do

<style>
    #message{
        color:red;
    }
</style>
<form id="form">
    <div>
        Try to enter a valid Password: <input type="password" id="password" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off">
    </div>
    <br>
<!--     <div>
        Confirm Password: <input type="password" id="confirm-password" onselectstart="return false" onpaste="return false;" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="off">
    </div>
    <br> -->
    <div>
        <p id="message"></p>
    </div>
    <br>
    <div>
        <input type="submit">
    </div>
    <br>
</form>
<script>

    document.getElementById('password').addEventListener('keyup', validate);
    // document.getElementById('confirm-password').addEventListener('keyup', validate);
    document.getElementById('form').onsubmit = validate;

    function validate(e) {
        e.preventDefault();

        var passwordEl = document.getElementById('password');
        // var confirmPasswordEl = document.getElementById('confirm-password');
        var password = passwordEl.value;
        // var confirmPassword = confirmPasswordEl.value;

        if (password == '') {
            setMessage("Password must not be empty");
        // } else if (password != confirmPassword) {
        //     setMessage("Passwords must match");
        } else if (countSymbols(password) <= 8 ) {
            setMessage("Password must be longer than 8 characters");
        } else if (countSymbols(password) >= 10) {
            setMessage("Password must be shorter than 10 characters")
        } else if (!/[a-z]/.test(password)) {
            setMessage("Password must contain a lower-case letter");
        } else if (!/\d/.test(password)) {
            setMessage("Password must contain a number");
        } else if (/\d{2,}/.test(password)) {
            setMessage("Password must not contain numbers in sequence, next to each other");
        } else if (!/[A-Z]/.test(password)) {
            setMessage("Password must contain an upper-case letter");
        } else if (/[A-Z]{2,}/.test(password)) {
            setMessage("Password must not contain upper-case letters in sequence");
        } else if (/[~!@#$%^&*()_+{}|:"<>?`,./;''\[\]\\=\-´œ∑´®†¥¨ˆøπ“‘åß©˙∆˚¬…æΩ≈˜µ≤≥÷√]/.test(password)) {
            setMessage("Password must not contain any special characters");
        } else if (/\s/.test(password)) {
            setMessage("Password must not contain white-space characters e.g a space");
        } else if (/(\w)(?=\1+)/.test(password)) {
            setMessage("Password must not have consecutive repeated characters. e.g. aa");
        } else {
            setMessage("Congrats! You managed to pass all of the crazy restrictions.", 'green');
        }
    }

    function setMessage(str, colour) {
        if (typeof colour == 'undefined') {
            colour = 'red';
        }
        var messageEl = document.getElementById('message');
        messageEl.innerText = str;
        messageEl.style.color = colour;
    }

    // https://mathiasbynens.be/notes/javascript-unicode
    function countSymbols(string) {
        var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
        return string
            // Replace every surrogate pair with a BMP symbol.
            .replace(regexAstralSymbols, '_')
            // …and *then* get the length.
            .length;
    }

</script>
