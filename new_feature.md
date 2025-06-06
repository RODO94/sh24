# New Feature Implementation

## Overview

We use PostcodesIO for our external API but we have a paid backup service. In the cases where we don't want to hit our free PostcodesIO we want to hit this paid service.

Assume API can return info for multiple postcodes, but however we will only request one at a time.

## Requirements

Build another service which will query this data when all other options are exhausted.

PostcodeAddressLookup is the paid API endpoint.

`postcodeaddresslookup.com/postcodes` will be the made up end point.

If this comes back with an error we just come back with our normal error process.

Code it and chat through what I'm doing and I can ask for opinions.

`region` will act as our `lsoa`

### Response

```json
// success
{
  "pagination": {
    "page": 1,
    "total_pages": 1,
    "per_page": 20
  },
  "results": [
    {
      "postcode": "SE1 7QA",
      "region": "Lambeth"
    }
  ],
  "status": "ok"
}
```

```json
// error
{
  "pagination": {
    "page": 1,
    "total_pages": 1,
    "per_page": 20
  },
  "results": [],
  "status": "error"
}
```
