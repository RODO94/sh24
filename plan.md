# Plan

This is to help me plan the Technical Assessment for SH:24. I'll be completing it in between other responsibilities, so I'll be chunking up my time to do this across a few hours of sporadic working. To enable a train of thought piece of work, this documentation focuses on capturing thoughts and decisions.

## Task

A customer wants a simple web app to check if an inputted postcode is within their service area.

Create a form where the input is a UK postcode. When submitting the form, the response should tell the user if the postcode is allowed or not. There’s no need to add any styling.

> [!TIP]
> There needs to be an ALLOW_LIST of postcodes and LSOAs

### Service Area

This will be defined by [postcodes.io](<[http://postcodes.io](http://postcodes.io/)>)

The endpoints here return

```json
{
  "status": 200,
  "result": {
    "postcode": "SE1 7QD",
    "lsoa": "Southwark 034A"
  }
}
```

with the key `lsoa` defining the Service Area.

> [!IMPORTANT]
> We want to allow any `lsoa` starting **"SOUTHWARK** or **"LAMBETH"**

### Error Handling

We should still serve unknown inputs to the API and return useful errors. An example of an unknown input is **"SH24 1AA"**

Any postcode not in the LSOA allowed list or the Postcode allowed list is not servable

---

## Coding Standards

Use Git and a code formatter or linter

They want end to end tests, integration tests, unit tests.

## E2E Tests

Something like playwright to run through the local journey form a user putting in an input, something being returned on the network, and success or error displayed.

### Integration tests

Something like Mock Service Worker, Jest, and Supertest to mock the integrations with the frontend to backend, and the backend to API.

### Unit Tests

Something like Vitest / RTL to unit test the input, success messaging, and error messaging.

#### Why Vitest and Jest?

Incase in future I find it weird I'm using both.

I am using Jest on the backend since I can't use Vitest, and Vitest on the frontend since it's a more modern testing framework.
