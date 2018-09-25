# Frontend-2018: FEQ September Release

## [WCMSFEQ-192] Please Make Dictionary Search Results font styles Consistent with Sitewide Search Results
### (NO CONTENT CHANGES)

Description:
  * The dictionary results titles (Dictionary of Cancer Tersms, Drug Dictionary, Dictionary of Genetics Terms) need to be regular text instead of bold, however when you click to the page that shows the term page, it needs to be bold.
  * Targeted links that are in the definition of dictionary lists.

```css
// searchresults.scss
.dictionary-list {
		dfn {
			a {
				font-weight: 400;
			}
		}
	}
```
