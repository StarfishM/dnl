### GET all

**Path:**`/api/companies.json`

**Summary:** get request to obtain all companies linked to a user account, so that the vuex store can be populated and the user’s dashboard can display all companies we have for a user in our database.

**Params:**

**optional:** 

- offset: limit of dataload
- tokenForNextPayload

**Headers:**

- session cookie for user id : string

**Response:** JSON, object JSON object, props: data, status & error, data containing payload: array of company objects

**Example Response**
```js
{
	data: [
    {
      companyId: 'id1',
      className: 'company-item',
      companyName: 'Company X',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2020: 'good',
    },
    {
      companyId: 'id2',
      className: 'company-item',
      companyName: 'Company Y',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'de',
      2021: 'bad',
    },
    {
      companyId: 'id3',
      className: 'company-item',
      companyName: 'Company Z',
      createdAt: 'string',
      updatedAt: 'string',
      language: 'en',
      2019: 'good',
    },
  ],
	status: 200,
	errors:[]
}
```