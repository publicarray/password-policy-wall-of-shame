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
* Do hash passwords with **[Argon2](https://en.wikipedia.org/wiki/Argon2)**, Scrypt, Bcrypt or PBKDF2 and set an appropriate high work factor (bcrypt: cost >=11).
* Do enforce passwords to a minimum of 8 characters (generally longer passwords are better, I prefer larger than 12)
* Do rate limit authentication attempts and block repeated bad actors.
* Do blacklist top used passwords ([123456](http://www.whatsmypass.com/the-top-500-worst-passwords-of-all-time)) / common password masks ([?u?l?l?l?l?d?d](https://blog.netspi.com/netspis-top-password-masks-for-2015/)) / keyboard patterns ([qwerty](https://digi.ninja/projects/passpat.php))
* Do offer Multi-factor Authentication ([Avoid](https://www.schneier.com/blog/archives/2012/02/the_failure_of_2.html) [the](http://www.zdnet.com/article/sms-tokens-are-vulnerable-to-interception-experts-warn/) [use](https://krebsonsecurity.com/2016/09/the-limits-of-sms-for-2-factor-authentication/) [of](https://pages.nist.gov/800-63-3/sp800-63b.html#513-out-of-band-devices) [SMS](https://github.com/usnistgov/800-63-3/issues/351))
<!-- * Do block passwords equal to username, email address, URL/domain or name of the website/app. -->
<!-- * Do limit dictionary words and repeated characters (aaaaaaaa) # debatable, should we allow passphrases and password padding? -->
<!-- * Do audit most common password mask on your website and limit those. (only allow one password per topology and increment when needed) # commented due to being impractical for most users for now -->
* Do allow users to delete their accounts
* **Do not** enforce a limited character set (allow all [ASCII](http://www.asciitable.com) and [Unicode](http://unicode-table.com/en/) characters, yes you should allow emoji as part of a password👌)
* **Do not** enforce a maximum password length (if you need to have it, set it a reasonable high number. OWASP suggests 160 and NIST up to 64 characters)
* **Do not** enforce the rotation of passwords
* **Do not** block form auto-fill. Doing so unnecessarily restricts the recommended use of a password manager.
<!-- * **Do Not** enforce the use of all 4 character classes (upper case, lower case, digits and special characters) -->

Another option is [passwordless](https://encrypted.google.com/search?hl=en&q=passwordless)

## Resources
* [OWASP: Password Storage Cheat Sheet](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet)
* [NIST.gov Password Guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html#sec5)
* [Coding Horror Blog - Password Rules Are Bullshit](https://blog.codinghorror.com/password-rules-are-bullshit/)
* [Cloudflare - How Developers got Password Security so Wrong](https://blog.cloudflare.com/how-developers-got-password-security-so-wrong/)
* [Google GCP - 12 best practices for user account, authorization and password management](https://cloudplatform.googleblog.com/2018/01/12-best-practices-for-user-account.html)
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
        } else if (/[\[\]<>''!\\/]/.test(password)) {
            setMessage("Password must not contain these special characters []<>''!\\/");
        } else if (!/[~!@#$%^&*()_+{}|:"<>?`,./;''\[\]\\=\-´œ∑´®†¥¨ˆøπ“‘åß©˙∆˚¬…æΩ≈˜µ≤≥÷√]/.test(password)) {
            setMessage("Password must contain special characters");
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

## Hash speed

<p>
1 kH/s is 1,000 (one thousand) hashes per second. <br>
1 MH/s is 1,000,000 (one million) hashes per second. <br>
1 GH/s is 1,000,000,000 (one billion) hashes per second. <br>
1 TH/s is 1,000,000,000,000 (one trillion) hashes per second. <br>
1 PH/s is 1,000,000,000,000,000 (one quadrillion) hashes per second. <br>
1 EH/s is 1,000,000,000,000,000,000 (one quintillion) hashes per second. <br>
Source: <a href="https://bitcoin.stackexchange.com/questions/9219/what-is-the-difference-between-kh-s-mh-s-and-gh-s#9220">https://bitcoin.stackexchange.com/questions/9219/what-is-the-difference-between-kh-s-mh-s-and-gh-s#9220</a>
</p>

My 2012 laptop can hash 284.6 Million MD5 hashes per second (284.6 MH/s).

Now the guys that hash passwords for a living:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">In case you were wondering what 300 kg of <a href="https://twitter.com/NVIDIAGeForce">@NVIDIAGeForce</a> GPUs looks like. I love this job :) <a href="https://t.co/EgPK2o00a3">pic.twitter.com/EgPK2o00a3</a></p>&mdash; Jeremi M Gosney (@jmgosney) <a href="https://twitter.com/jmgosney/status/837050427300511749">March 1, 2017</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-conversation="none" data-lang="en"><p lang="en" dir="ltr"><a href="https://twitter.com/vortexau">@vortexau</a> <a href="https://twitter.com/NVIDIAGeForce">@NVIDIAGeForce</a> should be ~ 7 TH/s NTLM, 4 TH/s MD5</p>&mdash; Jeremi M Gosney (@jmgosney) <a href="https://twitter.com/jmgosney/status/837137128664543232">March 2, 2017</a></blockquote> <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

<br>
That is 4 Trillion MD5 hashes per second. Let's see how long it would take to retrieve passwords hashed with MD5 using brute-force:
<style type="text/css">
    .ui.table td.align-right {
        text-align: right;
    }
</style>
<table class="ui celled stackable structured table">
    <thead>
        <tr>
            <th>Description</th>
            <th>Example Password</th>
            <th>Example Password</th>
            <th>Duration</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>8 character password (lower-case letters)</td>
            <td>slrudowq</td>
            <td>password</td>
            <td>about 53 milliseconds</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">search space / hashes per second = brute-force time in seconds<br>217,180,147,158 / 4,000,000,000,000 = 0.05429503679 seconds = 54.3 milliseconds</td>
        </tr>
        <tr>
            <td>8 character password (numbers, letters)</td>
            <td>m7wY8sDs</td>
            <td>P4ssW0rd</td>
            <td>about 1 minute</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">221,919,451,578,090 / 4,000,000,000,000 = 55.4798628945 seconds</td>
        </tr>
        <tr>
            <td>8 character password (numbers, letters, symbols)</td>
            <td>$QWt+4V:</td>
            <td>P4$$W@rd</td>
            <td>about 30 minutes</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">6,704,780,954,517,120 / 4,000,000,000,000 = 1,676 seconds = 27 minutes 56 seconds</td>
        </tr>
        <tr>
            <td>10 character password (numbers, letters, symbols)</td>
            <td>FN*vX5t8=o</td>
            <td>P4$$W@rd10</td>
            <td>about half a year</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">60,510,648,114,517,017,120 / 4,000,000,000,000 = 15,127,662 seconds = 25.01 weeks</td>
        </tr>
        <tr>
            <td>14 character password (lower-case letters)</td>
            <td>guxpzsvhzpizgz</td>
            <td>passwordqwerty</td>
            <td>about half a year</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">67,090,373,691,429,037,014 / 4,000,000,000,000 = 16,772,593 seconds = 27.73 weeks</td>
        </tr>
        <tr>
            <td>12 character password (numbers, letters, symbols)</td>
            <td>Tc0rBVK,\s]9</td>
            <td>Tr0ub4dour&3</td>
            <td>about 43 centuries</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">546,108,599,233,516,079,517,120 / 4,000,000,000,000 = 136,527,149,808.379 seconds = 225,739 weeks</td>
        </tr>
        <tr>
            <td>28 character password (lower-case letters, symbols)<br>4 random words / <a href="http://world.std.com/~reinhold/diceware.html">diceware</a></td>
            <td>zorn snug woke stable jockey</td>
            <td>correct horse battery stable</td>
            <td>really long time if using brute-force</td>
        </tr>
        <tr>
            <td colspan="4" class="align-right">Brute-force: 3.90x10^49 / 4,000,000,000,000 = 9.75x10^36 seconds = 3,091,704,718,417,047,290,000,000,000 centuries
            <br><a href="http://world.std.com/~reinhold/dicewarewordlist.pdf">Diceware Dictionary</a>: <a href="http://world.std.com/~reinhold/dicewarefaq.html#someoneknows">7776 x 7776 x 7776 x 7776 x 7776</a> / 4,000,000,000,000 = 7,107,572.00748243 seconds = 11.75 weeks</td>
        </tr>
    </tbody>
</table>

Try it yourself at: [https://www.grc.com/haystack.htm](https://www.grc.com/haystack.htm)


Now most password cracking is not done with brute-force. It is done with password lists, mutations on the lists, rainbow tables and password masks. This reduces the time to guess the correct password considerably.

`Tr0ub4dour&3`, `password`, `P4ssW0rd`, `P4$$W@rd`, `P4$$W@rd10` and `passwordqwerty`, would all take less than a second with the same set-up. But `FN*vX5t8=o` and `guxpzsvhzpizgz` are completely random so it would still take about half a year with brute-force.

Try it yourself with [zxcvbn](https://dl.dropboxusercontent.com/u/209/zxcvbn/test/index.html)

<p></p>
