# FEQ October 2018 Release

## [WCMSFEQ-###] Ticket Title
### (NO CONTENT CHANGES)

Include: reason for changes, description of changes, any relevant code examples, and  any manual/content changes required as part of this commit.

```javascript
// path/to/file/<filename>.js
let codeExample = this
```

## [WCMSFEQ-1159] Fix issue with megamenu functionality when initializes at tablet breakpoints
### (NO CONTENT CHANGES)

Since it's inception, there has been a bug in the megamenu that caused certain pieces of functionality to not be added to the module on instantiation at screen sizes below 1024px. This fix conditionally creates a self-expiring (cue the Mission Impossible theme song) media listener that will let the existing megamenu instance rerun it's setup functions when a user goes from tablet to desktop size for the first time. 

In addition, the throttle-debounce dependency was used and as such updated, so the package-lock is updated as well.

# Content Changes

## [WCMSFEQ-###] Updates to {percussion asset}

Requires update to...