# Microsoft Store Listing Template for Portal do Associado ABIH-RJ

This document serves as a quick reference and template that you can copy/paste into the Microsoft
Partner Center when creating or updating the store listing for the PWA.  It also includes a sample
"deep link" you can use to prefill some fields (as allowed by the Partner Center) and a checklist of
information you'll want to keep handy.

---

## Pre‑filled URL (hidden/deep link)

Microsoft Partner Center unfortunately does not offer a fully public, documented URL scheme for
completing a new app submission.  However, you can often open the listing page for an existing
app and append query parameters to prepopulate certain form controls.  The general pattern is:

```
https://partner.microsoft.com/en-us/dashboard/apps/{your-app-Id}/properties/general?param1=value1&param2=value2
```

For a **new** app, sign in and start the "Create a new app" workflow, then replace sections of the
URL while the page is displayed.  Example placeholders below:

```
https://partner.microsoft.com/en-us/dashboard/apps/new?appName=Portal%20do%20Associado%20ABIH-RJ&appType=Progressive%20Web%20App&packageFamilyName=com.hoteisrio.portal&description=Portal%20de%20adic%...&shortDescription=Portal%20de%20associa%C3%A7%C3%B5es&publisherName=SindhoteisRJ
```

> **Note:** the exact parameters and their names are not officially advertised and may change; use
your browser's developer tools to inspect form field names after initiating a new submission and
append them to the URL.

The idea is: start with the URL above, then manually edit query parameters such as:
- `appName` = **Portal do Associado ABIH-RJ**
- `publisherName` = **SindhoteisRJ**
- `description` = long description (URL‑encoded)
- `shortDescription` = short blurb
- `packageFamilyName` = com.hoteisrio.portal
- `supportedPlatforms` = `Windows10,Windows11` etc.

Once you've constructed a stable deep link that works, save it and reuse it whenever you need to
republish or update the listing.

---

## Listing information checklist

- **App name:** Portal do Associado ABIH-RJ
- **Subtitle/short description:** Catálogo de benefícios e serviços para associados da rede
- **Long description:** (use marketing text from README or website) \* Provide full features list,
  gamification, CRM, integração com Gemini AI, etc.
- **Publisher display name:** SindhoteisRJ
- **Privacy policy URL:** https://sindhoteisrj.com.br/privacidade
- **Support URL:** https://sindhoteisrj.com.br/contato
- **Website URL:** https://hotelsrio.example.com (or actual production domain)
- **Logo assets:** 512×512 PNG, 1024×1024 etc. (see Store asset requirements)
- **Category:** Productivity / Business
- **Pricing & availability:** Free; brazil region only or include others?
- **Age rating:** Appropriate (probably All ages)
- **Capabilities:** Internet (Client), Location (if needed), Documents library (if offline data), etc.

## Example hidden deep link structure

Below is an example URL you can start from; replace the placeholder values with real ones.

```
https://partner.microsoft.com/en-us/dashboard/apps/{appId}/properties/general?
  appName=Portal%20do%20Associado%20ABIH-RJ&
  shortDescription=Benef%C3%ADcios%20para%20associados&
  description=O%20Portal%20do%20Associado%20ABIH-RJ%20%3A%20acesso%20%C3%A0%20benef%C3%ADcios%2C%20eventos%2C%20servi%C3%A7os%20e%20mais.&
  packageFamilyName=com.hoteisrio.portal&
  publisherName=SindhoteisRJ&
  websiteUrl=https%3A%2F%2Fsindhoteisrj.com.br
```

*(You will likely need to URL-encode values and remove line breaks.)*

---

## Using the template

1. Copy the above URL to a bookmark or document and keep it private (it contains no secrets, but it
   bypasses normal Partner Center navigation).
2. When preparing a release, paste the URL into your browser and adjust any text to match your
   latest marketing copy.
3. After the page loads with prefilled values, continue through the submission wizard as usual.
4. Update screenshots, binaries (the PWA package or MSIX), and any other assets via the portal.

> 🔒 **Security note:** the deep link will only work when you are authenticated with a Partner
> Center account that has access to your application's registration. Do not share publicly.

---

Feel free to edit this file whenever you need to change store presence data.  It saves time by
keeping all relevant fields and example links in one place.