
# Cornie Health Auth

Authentication flow and endpoints for Cornie Health


## API Reference

#### Create a user

```http
  POST /auth/signup
```

Request Body
```json
{
    "lname": "Core",
    "fname": "App",
    "dialCode": "234",
    "phoneNo": "7053052215",
    "email": "mail.soft0re@mail.com",
}
```
Response
```json
{
    "success": true,
    "userId": "a22b2363-2511-4ff3-b2a4-55c983535879",
    "email": "terv.ewee@1nknjojoss.com"
}
```

#### Verify email with code

```http
  POST /auth/code/verify
```

Request Body
```json
{
    "userId": "13b2f3ea-092f-4a47-95ff-bc451a4d4f0e",
    "emailVerificationCode": "277474"
}
```
200 Response
```json
{
    "success": true,
   
}
```
​
#### Activate account and set password

```http
  POST /auth/account/activate
```

Request Body
```json
 {
	"userId": "13b2f3ea-092f-4a47-95ff-bc451a4d4f0e", 
    "emailVerificationCode": "277474",
    "password":"12345678"
}
```
200 Response
```json
{
    "emailVerified": true,
    "requiresTwoFactorAuth": false,
    "requiresSecurityQuestion": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWQiOiI0Zjc1NzZiNy03NDc2LTRmZGYtOWI1Ny1kYzE3ZDEwOTY1ZWQiLCJpYXQiOjE2MjM0Mjg2MDQ1MzYsImV4cCI6MTYyMzY4NzgwNH0.3OVUrMVBxTuXcrtFvKALogU9svjF8ubOKAmeYhJZobk",
    "orgApps": [
        {
            "app": "Optima",
            "appSlug": "optima",
            "subscription": {
                "status": "paid",
                "duration": "Yearly",
                "expiryDate": "2024-03-26T10:56:53.120Z",
                "subscriptionDate": "2019-11-04T12:51:26.506Z",
                "isActive": true
            }
        },
        {
            "app": "HumanaR",
            "appSlug": "humanar",
            "subscription": {
                "status": "paid",
                "duration": "Yearly",
                "expiryDate": "2022-04-07T00:49:20.570Z",
                "subscriptionDate": "2021-03-12T10:56:53.167Z",
                "isActive": true
            }
        }
    ],
    "org": {
        "id": "7fe821a7-b331-49ad-8798-6a637b03af56",
        "ownerId": "7d9befdf-240c-407a-a78d-4e6ad486d3b5",
        "slug": "Cloudenly",
        "logoUrl": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/profile-photo/1622462031975-Screenshot%202021-04-23%20at%2012.45.57%20PM.png",
        "profile": "A brief ppdescription",
        "name": "Scelloo",
        "accountId": "385707026613",
        "isSetup": false,
        "alias": "cloudenly",
        "dialCode": "234",
        "phoneNo": "081301297150",
        "email": "terv.software@gmail.com", 
      
        "TIN": "4567757",
        "iso2": "NG",
        "orgSize": "500", 
 
        "isSuspended": false,
        "isBlocked": false, 
        "hasCoCeoOrgStructure": true,
        "hasTwoFactorAuth": false, 
        "enabledSecurityQuestion": false,
       
        "rcNumber": "2345",
        "businessNature": null,
        "isASolutionPartner": null,
        "isAPartner": false,
        "website": null,
        "facebook": null,
        "linkedIn": null,
        "twitter": null,
        "instagram": null,
        "youtube": null,
        "otherlink": null,
        "type": "uiyy",
        "timeZone": null,
        "language": null,
        "businessCoverage": null,
        "subscriptionStatus": {
            "optima": "paid",
            "hr": "paid"
        }
    },
    "user": {
        "id": "7d9befdf-240c-407a-a78d-4e6ad486d3b5", 
        "isActive": true, 
        "isRoot": true,
        "hasAccount": true,
        "isOrg": true,
        "functionId": "4ff23662-5d5f-4803-9c84-8531dd482852",
        "level": "46daa94d-9aed-4647-b1e8-16fdb61aa29e",
        "reportingTo": "7d9befdf-240c-407a-a78d-4e6ad486d3b5",
        "dottedReportingTo": null,
        "designation": "bf22b220-db3a-4984-9170-72584b27292e", 
        "fname": "Terver",
        "lname": "Timothy",
        "phoneNo": "08068808424",
        "mname": "David",
        "title": "Manager",
        "email": "terv.software@gmail.com",
        "orgId": "7fe821a7-b331-49ad-8798-6a637b07af66",
        "iso2": "34",
        "photo": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/profile-photo/1622471492113-Screenshot%202021-03-28%20at%207.52.49%20AM.png",
        "dialCode": "234",
        "country": "NGA",
        "state": "Enugu",
        "city": "Nsukka",
        "zip": "41101",
        "address": "9A New Creation Street Lekki",
        "dob": "2017-12-09T00:00:00.000Z",
        "gender": "male",
        "alternateEmail": "okwujihiious@gmail.com",
        "alternatePhoneNo": "09092026396",
        "referrerCode": null,
        "referralCode": null,
        
      
          
        "roles": {
            "humanar": {
                "roleId": "71a4f521-791c-44b9-9458-f40d4af64901",
                "name": "Root Admin",
                "isDefault": true,
                "isSuperAdmin": true
            }
        },
        
        
         
    },
 
  
    ]
}
```
#### Resend email verification code

```http
  POST /auth/signup/resend-verification
```

Request Body
```json
{
    "userId": "13b2f3ea-092f-4a47-95ff-bc451a4d4f0e"
}
```
200 Response
```json
{
    "success": true,
   
}
```
#### Log user in

```http
  POST /auth/login
```

Request Body
```json
{
  
    "email": "account@mail.com",
    "authPassword": "12@345",
}
```
200 Response
```
{
    "emailVerified": true,
    "requiresTwoFactorAuth": false,
    "requiresSecurityQuestion": false,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsaWQiOiI0Zjc1NzZiNy03NDc2LTRmZGYtOWI1Ny1kYzE3ZDEwOTY1ZWQiLCJpYXQiOjE2MjM0Mjg2MDQ1MzYsImV4cCI6MTYyMzY4NzgwNH0.3OVUrMVBxTuXcrtFvKALogU9svjF8ubOKAmeYhJZobk",
    "orgApps": [
        {
            "app": "Optima",
            "appSlug": "optima",
            "subscription": {
                "status": "paid",
                "duration": "Yearly",
                "expiryDate": "2024-03-26T10:56:53.120Z",
                "subscriptionDate": "2019-11-04T12:51:26.506Z",
                "isActive": true
            }
        },
        {
            "app": "HumanaR",
            "appSlug": "humanar",
            "subscription": {
                "status": "paid",
                "duration": "Yearly",
                "expiryDate": "2022-04-07T00:49:20.570Z",
                "subscriptionDate": "2021-03-12T10:56:53.167Z",
                "isActive": true
            }
        }
    ],
    "org": {
        "id": "7fe821a7-b331-49ad-8798-6a637b03af56",
        "ownerId": "7d9befdf-240c-407a-a78d-4e6ad486d3b5",
        "slug": "Cloudenly",
        "logoUrl": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/profile-photo/1622462031975-Screenshot%202021-04-23%20at%2012.45.57%20PM.png",
        "profile": "A brief ppdescription",
        "name": "Scelloo",
        "accountId": "385707026613",
        "isSetup": false,
        "alias": "cloudenly",
        "dialCode": "234",
        "phoneNo": "081301297150",
        "email": "terv.software@gmail.com", 
      
        "TIN": "4567757",
        "iso2": "NG",
        "orgSize": "500", 
 
        "isSuspended": false,
        "isBlocked": false, 
        "hasCoCeoOrgStructure": true,
        "hasTwoFactorAuth": false, 
        "enabledSecurityQuestion": false,
       
        "rcNumber": "2345",
        "businessNature": null,
        "isASolutionPartner": null,
        "isAPartner": false,
        "website": null,
        "facebook": null,
        "linkedIn": null,
        "twitter": null,
        "instagram": null,
        "youtube": null,
        "otherlink": null,
        "type": "uiyy",
        "timeZone": null,
        "language": null,
        "businessCoverage": null,
        "subscriptionStatus": {
            "optima": "paid",
            "hr": "paid"
        }
    },
    "user": {
        "id": "7d9befdf-240c-407a-a78d-4e6ad486d3b5", 
        "isActive": true, 
        "isRoot": true,
        "hasAccount": true,
        "isOrg": true,
        "functionId": "4ff23662-5d5f-4803-9c84-8531dd482852",
        "level": "46daa94d-9aed-4647-b1e8-16fdb61aa29e",
        "reportingTo": "7d9befdf-240c-407a-a78d-4e6ad486d3b5",
        "dottedReportingTo": null,
        "designation": "bf22b220-db3a-4984-9170-72584b27292e", 
        "fname": "Terver",
        "lname": "Timothy",
        "phoneNo": "08068808424",
        "mname": "David",
        "title": "Manager",
        "email": "terv.software@gmail.com",
        "orgId": "7fe821a7-b331-49ad-8798-6a637b07af66",
        "iso2": "34",
        "photo": "https://cloudenly-primary.s3.eu-west-2.amazonaws.com/profile-photo/1622471492113-Screenshot%202021-03-28%20at%207.52.49%20AM.png",
        "dialCode": "234",
        "country": "NGA",
        "state": "Enugu",
        "city": "Nsukka",
        "zip": "41101",
        "address": "9A New Creation Street Lekki",
        "dob": "2017-12-09T00:00:00.000Z",
        "gender": "male",
        "alternateEmail": "okwujihiious@gmail.com",
        "alternatePhoneNo": "09092026396",
        "referrerCode": null,
        "referralCode": null,
        
      
          
        "roles": {
            "humanar": {
                "roleId": "71a4f521-791c-44b9-9458-f40d4af64901",
                "name": "Root Admin",
                "isDefault": true,
                "isSuperAdmin": true
            }
        },
        
        
         
    },
 
  
    ]
}
```
#### Turn on 2FA

```http
  POST /org/security/2fa/setup
```

Request Body
```json
{
  "userId": "4d2686f4-38d7-4916-81ee-793606f670bb",
  "token": "22yK9X"
}
```

200 Response
```json
{}
```

#### Turn off 2FA

```http
  POST /org/security/2fa/status/off
```

Request Body
```json
{
  "userId": "4d2686f4-38d7-4916-81ee-793606f670bb",
  "password": "1234567"
}
```

200 Response
```json
{}
```

#### Change password

```http
  POST /auth/change-password
```

Request Body
```json
{
  "userId": "7d9befdf-240c-407a-a78d-4e6ad486d3b5",
  "previousPassword": "123ffd456",
  "newPassword": "123fddfd456"
}
```

200 Response
```json
{}
```
