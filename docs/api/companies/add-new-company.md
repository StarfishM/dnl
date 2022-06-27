### POST company

**Path:**`/api/addCompany.json`

**Summary:** insert new company into database and return values to clientside

**Headers**

- Content-Type : application/json

**Body**

**required**

- companyName: string

**optional**

- [balanceYear:key] : string
- language: string

**Example values:**

```js
// ex 1 with values only for company Name
	{
      companyName: 'New Company with super cool name',
      language: '',
      2019: '',
	}
// ex 2 with values for all inputs
	{
      companyName: 'Another super hip company',
      language: 'en',
      2019: 'good',
	}
```

**Response**: JSON object, props: data, status & error, containing newly created companyObject from the db, status code and any potential errors

**Example response:**

```jsx
// ex 1
{
	data: {
      companyId: 'id4',
      className: 'company-item',
      companyName: 'New Company with super cool name',
      createdAt: 'string',
      updatedAt: 'string',
      language: '',
      2019: '',
    },
	status: 200,
	errors:[]
}

// ex 2
{	
	data: {
      companyId: 'id5',
      className: 'company-item',
      companyName: 'Another super hip company',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'en',
      2019: 'good',
    },
	status: 200,
	errors:[]
}
```