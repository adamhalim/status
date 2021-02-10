# Hallouminet™ Status Page

A simple status page for Hallouminet™. 
Displays ping to services running on the network.

<details>
<summary>Example data/users.json</summary>

```json
{
    "user@example.com": {
        "validSites": [
            "https://example.com/",
            "https:/another.example.com/"
        ]
    }
},
```

</details>

<details>
<summary>Example data/lanSites.json</summary>

```json
{
    "firstService": {
        "ip": "10.0.0.1",
        "status": false
    },
    "apache": {
        "ip": "10.0.0.2",
        "status": false
    },
}
```

</details>