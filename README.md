# Hallouminet™ Status Page

A simple status page for Hallouminet™. 
Displays ping to services running on the network.

## Background

I wanted to make a simple website that displays the status of websites and 
services running on my network. I use [passportjs-oauth20](https://github.com/jaredhanson/passport-google-oauth2) to identify users.

The website is built in two parts: the first one is the sites part.
Here, a user can see the latency to all websites they have access to.
This is done client-side, by a script that runs a get-request to the site 
and times how long it takes to get a response.

The second part is the services.
Here, a user can see if a service is running or stopped.
A service in this case is a VM/container running on the local network.
If the server can't be pinger from the local network, it is considered to be stopped.

This makes it easy to give users outside of the local LAN a quick summary of 
the statuses of services that are running; if you can't connect to the server,
but the machine is accessible from the LAN, the problem is probably on the client's end.

To use this for yourself, all you need is to add `data/users.json` and `data/services.json`.

## Dependencies

As far as I know, this should work on all machines (haven't tested on Windows, but it should be OK).

## [Demo page](https://status.halim.se/demo)



<details>
<summary>Example data/users.json</summary>

```json
{
    "user@example.com": {
        "validSites": [
            "https://example.com/",
            "https:/another.example.com/"
        ],
        "validServices": ["exampleService", "anotherService"]
    }
},
```

</details>

<details>
<summary>Example data/services.json</summary>

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

