# Setup Notes

All documentation here is based upon descibed setup and running on a windows machine. Oter opoerating systems and/or development environments are possiblle, but not documented as this intended a personal reference guide.

## Development machine setup

### Prerequisites

* NPM
* VisualStudioCode

### Angular application setup

**Setup angular**
```
   npm install-g @angular/cli
```

This installed angular global, which made is command line usable. 

_Note: need to make this work with local installed package_

```
  ng new DartsToday
  Would you like to add Angular routing? Yes
  using SCSS
```

**Add bootstrap**

```
  npm install bootstrap --save
```

## Amazon static website hosting

### Prerequisites
* Setup account 
* creating bucket 

### Amazon S3 bucket setup notes

Set permissions, via website

* Properties tab: Add Static website hosting
* Permissions tab: 
    * Public acces settings: untick  2 options Manage public bucket policies
    * Bucket policy

``` 
{
    "Version": "2008-10-17",
    "Id": "PolicyForPublicWebsiteContent",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<bucket name>/*"
        }
    ]
}
```
    * after this set Public acces settings: block new policies to be set.
