# @paulkre/gatsby-plugin-i18next

## 2.0.1

### Patch Changes

- fb9ceb9: Helper method "queryI18nFileNodes" has been fixed.

## 2.0.0

### Major Changes

- 59743c5: Option "siteUrl" has been removed.
- 97af4e3: Option "pages" for configuring specific pages has been removed.
- c13e17f: Option "generateDefaultLanguagePage" has been removed.

### Patch Changes

- 0147b74: Context types have been renamed.
- 381fb41: Missing field "originalPath" while querying file nodes is now fixed.

## 1.1.0

### Minor Changes

- fe7dd6b: Helper method added for creating i18n fields on file nodes. This is necessary to convert a file to a page.
- 389d64b: Helper method added for querying file nodes which support i18n.
- 4224068: The path of an automatically created i18n page (containing the language key) will now be included in the page's context. This simplifies the process of querying data for translated pages.

## 1.0.1

### Patch Changes

- 5a7bbea: Typescript build is fixed
- e427c10: Code was cleaned up.
- 6eeb3f8: Typescript declarations declarations are now fixed.

## 1.0.0

### Major Changes

- 73a0338: First release
