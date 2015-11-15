# foofoo

To develop:
```
npm install
npm run watchify
```
then, in a new terminal
```
npm run start
```

To build production:
```
npm run build
```

```json
{
    "data": {
        "type": "sell_posts",
        "attributes": {
            "price": "5.00",
            "locations": [
                "WEINSTEIN",
                "RUBIN",
                "KIMMEL"
            ],
            "days_until_expiration": 10
        }
    },
    "links": {
        "seller": {
            "type": "people",
            "_id": "5647beede78cd5931a01d917"
        },
        "buyer": {}
    }
}
```
