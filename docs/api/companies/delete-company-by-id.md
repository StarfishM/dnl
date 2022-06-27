### DELETE companyId

`/api/deleteCompany/:companyId`

**Summary:** deletes company record from db, based on uid from route params.

**Parameters:** companyId : string

**Response:** JSON object indicating whether deletion was successful, status code and any errors

```js
// ex
{
	data: "successOrFailMessage",
	status: 200,
	error: []
}
```