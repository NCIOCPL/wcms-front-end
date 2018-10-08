# FEQ October 2018 Release

## [WCMSFEQ-###] Ticket Title
### (NO CONTENT CHANGES)

Include: reason for changes, description of changes, any relevant code examples, and  any manual/content changes required as part of this commit.

```javascript
// path/to/file/<filename>.js
let codeExample = this
```

## [WCMSFEQ-699] Fix sitewide search behavior when developing on local environments
### (NO CONTENT CHANGES)

At some point SWS stopped working on localhost. Turns out, recent (annoyingly undocumented) updates to the proxy library dependency version we were already using (express-http-proxy) fix this issue without any other code changes being necessary. (Under the hood, they improved their handling of non-GET http requests: SWS uses a POST). 

# Content Changes

## [WCMSFEQ-###] Updates to {percussion asset}

Requires update to...