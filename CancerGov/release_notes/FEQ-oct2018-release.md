# FEQ October 2018 Release

## [WCMSFEQ-###] Ticket Title
### (NO CONTENT CHANGES)

Include: reason for changes, description of changes, any relevant code examples, and  any manual/content changes required as part of this commit.

```javascript
// path/to/file/<filename>.js
let codeExample = this
```

## [WCMSFEQ-1105] Refactor AMD and UMD Modules into ES6 modules
### (NO CONTENT CHANGES)

This represents a massive refactor of some 75 js files. The idea is to deprecate the use of require.js/AMD style modules (and UMD where unnecessary) in favor of ES6 modules (import/export). This is not a full refactor, but many singletons needed to be fixed and in a few other cases (eg a lingering global assignment) code was cleaned up minorly. In addition, the API for some imports changed and this is reflected in the changes to Common.js most clearly. A few files have not been converted, either because they are already deprecated and awaiting deletion or because they are jquery-ui extensions and would be a more substantial undertaking for less obvious gains. 

## [WCMSFEQ-873] Replace jplayer with new custom module, linkAudioPlayer
### (NO CONTENT CHANGES)

The jplayer library previously being used to create audio elements from anchor tags with mp3 links has become unnecessary now that we no longer need to support browsers that do not support HTML5 audio elements. This release is a new custom module that replaces the heavier jquery/jplayer dependency.

# Content Changes

## [WCMSFEQ-###] Updates to {percussion asset}

Requires update to...