# KC AFTs
These AFTs are run against a verify environment on circleCi.  Long term we can perform critical path smoke tests.
Current tests include:

- Creation of a subaward and verification of fdp forms

## Running locally
You will need to create a .env file with the following:
```
AWS_PROFILE=saml-res
PDF_SECRET=[shared service 2 service key running on target pdf service]
```

The profile chosen should be the one used when logging in to the aws cli via SAML2AWS.
The secret is required because we call the pdf service to flatten returned pdfs

You will also need to install GraphicsMagick:
```
brew install gs graphicsmagick
```

Run locally by calling the following *after logging into the aws cli*:
```
npm run cy:open
```
