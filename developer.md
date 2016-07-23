---
layout: pages
title: Developer Recommendations
permalink: developer
group: navigation
---

# TL;DR
* Do assume eventual compromise of your password database
* Do encrypt website traffic with TLS
* Do keep your servers are up-to-date (especially security critical software like OpenSSL)
* Do hash passwords with **Argon2**, scrypt, bcrypt or PBKDF2
* Do enforce passwords to a minimum of 8 characters
* Do enforce the use of all 4 character classes (upper case, lower case, digits and special characters)
* Do blacklist top used passwords ([123456](http://www.whatsmypass.com/the-top-500-worst-passwords-of-all-time)) / common password masks ([?u?l?l?l?l?d?d](https://blog.netspi.com/netspis-top-password-masks-for-2015/)) / keyboard patterns ([qwerty](https://digi.ninja/projects/passpat.php))
<!-- * Do limit dictionary words and repeated characters (aaaaaaaa) # debatable, should we allow passphrases and password padding? -->
<!-- * Do not enforce a password change policy  # debatable -->
<!-- * Do audit most common password mask on your website and limit those. (only allow one password per topology and increment when needed) # commented due to being impractical for most users for now -->
* **Do not** enforce a limited character set (allow all [ASCII](http://www.asciitable.com) and [Unicode](http://unicode-table.com/en/) characters)
* **Do not** enforce a maximum password length

## Resources
* [OWASP: Password Storage Cheat Sheet](https://www.owasp.org/index.php/Password_Storage_Cheat_Sheet)
* [Presentation: Your Password Complexity Requirements are Worthless - OWASP AppSecUSA 2014](https://www.youtube.com/watch?v=zUM7i8fsf0g) - [[slides]](https://www.korelogic.com/Resources/Presentations/bsidesavl_pathwell_2014-06.pdf)
* [Top 500 passwords - 2008](http://www.whatsmypass.com/the-top-500-worst-passwords-of-all-time)
* [OWASP: Brute force attack](https://www.owasp.org/index.php/Brute_force_attack)
* [OWASP: Forgot Password Cheat Sheet](https://www.owasp.org/index.php/Forgot_Password_Cheat_Sheet)
* [Scott Helme: Disclosing password storage policies on report-uri.io](https://scotthelme.co.uk/sites-tell-us-store-password/)
* [Passwords unmasked](http://wpengine.com/unmasked/)
* [PlainTextOffenders dev/FAQ](http://plaintextoffenders.com/faq/devs)
* [Dropbox: JS Password strength meter - zxcvbn](https://dl.dropboxusercontent.com/u/209/zxcvbn/test/index.html)
* [Kaspersky: JS Password strength meter](https://password.kaspersky.com)
* [JS topology test based KoreLogic's PathWell Password Data](http://www.genusa.com/test_password.html)
