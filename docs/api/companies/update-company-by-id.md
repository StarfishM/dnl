### PATCH company

**Path:** `/api/updateCompany/:companyId.json`

**Summary:** update existing company in database and return values to clientside based on uid in route params. DB values to update: companyName, balance, language

**Parameters:** companyId : string

**Headers**

- Content-Type : application/json

**Body**

**required**

- companyName: string

**optional**

- balance: string
- language: string

**Example values:**

```jsx
// ex 1 with values only for company Name
{
	data:{
      companyId: 'id5',
      className: 'company-item',
      companyName: 'Another super hip company',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2019: 'bad',
    },
}
// ex 2 with values for all inputs
{	
	data: {
      companyId: 'id5',
      className: 'company-item',
      companyName: 'Another super hip company',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2019: '',
    },
}
```

**Response**: JSON object, props: data, status & error. Containing newly created companyObject from the db, and or if errors.

**Example response:**

```js
// ex 1 with values only for company Name
{	
	data: {
      companyId: 'id5',
      className: 'company-item',
      companyName: 'Another super hip company',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2019: 'bad',
    },
	status: 200,
	error:[]
}
// ex 2 with values for all inputs
{	
	data: {
      companyId: 'id5',
      className: 'company-item',
      companyName: 'Another super hip company',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2019: '',
    },
  status: 200,
	error:[]
}
```